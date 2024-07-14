export interface IElectronAPI {
  getStats: (
    searchQuery: string,
    lang: string,
    area: Array<string>
  ) => Promise<IStats>
  changeTheme: () => void
  terminate: () => void
}

declare global {
  interface Window {
    api: IElectronAPI
  }
}
