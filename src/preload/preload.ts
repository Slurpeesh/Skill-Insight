import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  getStats: (searchQuery: string) => ipcRenderer.invoke('stats', searchQuery),
  changeTheme: () => ipcRenderer.send('theme'),
})
