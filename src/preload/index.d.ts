import { ElectronAPI, ipcRenderer } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    ipcRenderer: ipcRenderer
  }
}
