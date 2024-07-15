export interface IGlobStats {
  [key: string]: number | IStats
}

export interface IElectronAPI {
  getStats: (
    searchQuery: string,
    lang: string,
    area: Array<string>
  ) => Promise<IGlobStats>
  changeTheme: () => void
  terminate: () => void
}

export interface IDiagram {
  title: string
}

declare global {
  interface Window {
    api: IElectronAPI
  }
}
