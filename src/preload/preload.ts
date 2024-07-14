import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  getStats: (searchQuery: string, locale: string, area: Array<string>) => {
    locale = locale.toUpperCase()
    return ipcRenderer.invoke('stats', searchQuery, locale, area)
  },
  changeTheme: () => ipcRenderer.send('theme'),
  terminate: () => ipcRenderer.send('terminate'),
})
