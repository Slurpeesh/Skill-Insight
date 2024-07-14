export interface IElectronAPI {
  getStats: (
    searchQuery: string,
    lang: string,
    area: Array<string>
  ) => Promise<IStats>
  changeTheme: () => void
}

declare global {
  interface Window {
    api: IElectronAPI
  }
}
