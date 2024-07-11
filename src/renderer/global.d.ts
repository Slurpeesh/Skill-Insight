export interface IElectronAPI {
  getStats: (string, string) => Promise<IStats>
  changeTheme: () => void
}

declare global {
  interface Window {
    api: IElectronAPI
  }
}
