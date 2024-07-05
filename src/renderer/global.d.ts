export interface IElectronAPI {
  getStats: (string) => Promise<IStats>
}

declare global {
  interface Window {
    api: IElectronAPI
  }
}
