/* eslint @typescript-eslint/no-var-requires: "off" */
import { IGlobStats } from '@/global'
import { app, BrowserWindow, ipcMain, nativeTheme, shell } from 'electron'
import { setMaxListeners } from 'node:events'
import pLimit from 'p-limit'
import path from 'path'
import { updateElectronApp } from 'update-electron-app'
import { getVacancies, getVacancySkills } from './stats'

const isDev = !app.isPackaged

const isWindows = process.platform === 'win32'
const isMac = process.platform === 'darwin'
const isLinux = process.platform === 'linux'

if (!isMac) {
  updateElectronApp()
}

setMaxListeners(300)

// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

interface IStats {
  [key: string]: number
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit()
}

function getIconName() {
  if (isWindows) {
    return 'icon.ico'
  } else if (isMac) {
    return 'icon.icns'
  } else if (isLinux) {
    return 'icon.png'
  }
}

let setProgress: (
  value: number,
  mode?: Electron.ProgressBarOptions['mode']
) => void
let reloadWin: () => void
let flash: () => void

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, getIconName()),
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      devTools: isDev,
    },
  })

  mainWindow.setMinimumSize(600, 400)

  setProgress = (value: number, mode?: Electron.ProgressBarOptions['mode']) => {
    if (mode == 'error') {
      if (!mainWindow.isFocused()) {
        mainWindow.setProgressBar(value, { mode: mode })
        mainWindow.once('focus', () => mainWindow.setProgressBar(0))
      } else {
        mainWindow.setProgressBar(0)
      }
    } else {
      mainWindow.setProgressBar(value, { mode: mode })
    }
  }

  reloadWin = () => {
    mainWindow.reload()
  }

  flash = () => {
    if (!isMac) {
      if (!mainWindow.isFocused()) {
        mainWindow.flashFrame(true)
        mainWindow.once('focus', () => mainWindow.flashFrame(false))
      }
    } else {
      app.dock.bounce('informational')
    }
  }

  if (!isMac) {
    mainWindow.removeMenu()
  }

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: 'deny' }
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  // initialising nativeTheme helps to be independent of changes of system theme
  if (nativeTheme.shouldUseDarkColors) {
    nativeTheme.themeSource = 'dark'
  } else {
    nativeTheme.themeSource = 'light'
  }

  if (isDev) {
    const devToolsExt = require('electron-devtools-installer')

    devToolsExt
      .default([devToolsExt.REACT_DEVELOPER_TOOLS, devToolsExt.REDUX_DEVTOOLS])
      .then((name: string[]) => {
        console.log(`Added Extensions:  ${name}`)
        setTimeout(() => reloadWin(), 1500)
      })
      .catch((err: string) => console.log('An error occurred: ', err))
  }

  ipcMain.on('theme', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
    } else {
      nativeTheme.themeSource = 'dark'
    }
  })

  let controller: AbortController

  ipcMain.on('terminate', () => {
    controller.abort()
  })

  ipcMain.handle(
    'stats',
    async (
      e: Electron.IpcMainInvokeEvent,
      searchQuery: string,
      locale: string,
      area: Array<string>
    ) => {
      controller = new AbortController()
      const signal = controller.signal

      console.log(locale)
      console.log(searchQuery)
      console.log('Area ids:', area)

      setProgress(2)
      const stats: IGlobStats = {}
      let keySkillsStats: IStats = {}
      let areaStats: IStats = {}
      const data = await getVacancies(
        searchQuery,
        area,
        0,
        locale,
        process.env.ELECTRON_WEBPACK_APP_MAIL,
        process.env.ELECTRON_WEBPACK_APP_ACCESS_TOKEN,
        signal
      )

      if (data.terminated) {
        setProgress(0)
        return data
      }

      if (data.errors) {
        setProgress(0.01, 'error')
        return data
      }

      const pages = data.pages
      let found = data.found

      // limitations of hh.ru api
      if (found > 2000) {
        found = 2000
      }

      console.log(`Pages to be considered: ${pages}`)
      console.log(`Vacancies to be considered: ${found}`)

      const stepsAmount = found + pages
      let currentStep = 0

      const clusters = []

      const limit = pLimit(4)
      let chunks = []

      for (let page = 0; page < pages; page++) {
        chunks.push(
          limit(() =>
            getVacancies(
              searchQuery,
              area,
              page,
              locale,
              process.env.ELECTRON_WEBPACK_APP_MAIL,
              process.env.ELECTRON_WEBPACK_APP_ACCESS_TOKEN,
              signal
            ).then((res) => {
              if (res.terminated) {
                setProgress(0)
                return res
              }
              currentStep += 1
              if (currentStep / stepsAmount >= 0.01) {
                setProgress(currentStep / stepsAmount)
              }
              return res
            })
          )
        )
      }

      let results = await Promise.all(chunks)

      for (const result of results) {
        if (result.terminated) {
          setProgress(0)
          console.log('TERMINATED')
          return result
        }
        if (result.errors) {
          if (currentStep / stepsAmount >= 0.01) {
            setProgress(currentStep / stepsAmount, 'error')
          } else {
            setProgress(0.01, 'error')
          }
          return result
        }
        clusters.push(result.items)
      }

      chunks = []

      for (const vacancies of clusters) {
        for (const vacancy of vacancies) {
          const id = vacancy.id
          chunks.push(
            limit(() =>
              getVacancySkills(
                id,
                locale,
                process.env.ELECTRON_WEBPACK_APP_MAIL,
                process.env.ELECTRON_WEBPACK_APP_ACCESS_TOKEN,
                signal
              ).then((res) => {
                if (res.terminated) {
                  setProgress(0)
                  return res
                }
                currentStep += 1
                setProgress(currentStep / stepsAmount)
                return res
              })
            )
          )
        }
      }

      results = await Promise.all(chunks)

      for (const item of results) {
        if (item.terminated) {
          setProgress(0)
          console.log('TERMINATED')
          return item
        }
        if (item.errors) {
          if (currentStep / stepsAmount >= 0.01) {
            setProgress(currentStep / stepsAmount, 'error')
          } else {
            setProgress(0.01, 'error')
          }
          return item
        }
        if (item) {
          for (const skill of item.skills) {
            if (skill in keySkillsStats) {
              keySkillsStats[skill] += 1
            } else {
              keySkillsStats[skill] = 1
            }
          }
          if (item.area in areaStats) {
            areaStats[item.area] += 1
          } else {
            areaStats[item.area] = 1
          }
        }
      }

      keySkillsStats = Object.fromEntries(
        Object.entries(keySkillsStats).sort((a, b) => b[1] - a[1])
      )
      areaStats = Object.fromEntries(
        Object.entries(areaStats).sort((a, b) => b[1] - a[1])
      )
      // console.log(keySkillsStats)
      // console.log(areaStats)
      stats.keySkills = keySkillsStats
      stats.areas = areaStats
      setProgress(0)
      flash()
      console.log('Ended fetching data!!!')
      return stats
    }
  )
  createWindow()
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
