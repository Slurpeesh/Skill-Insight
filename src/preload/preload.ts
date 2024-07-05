import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  getStats: (searchQuery: string) => ipcRenderer.invoke('stats', searchQuery),
})
