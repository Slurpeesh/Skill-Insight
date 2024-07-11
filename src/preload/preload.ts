import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  getStats: (searchQuery: string, locale: string) => {
    locale = locale.toUpperCase()
    return ipcRenderer.invoke('stats', searchQuery, locale)
  },
  changeTheme: () => ipcRenderer.send('theme'),
})
