import { app, BrowserWindow, ipcMain } from 'electron';

export default class WindowManager {
  constructor(windows = {}) {
    this.windows = {}
    for (let key in windows) {
      this.windows[key] = windows[key]
    }
    this.instance = null
  }

  static getInstance(windows) {
    if (!this.instance) {
        this.instance = new WindowManager(windows)
    }
    return this.instance
  }

  initWindowEvent() {
    for (let key in this.windows) {
      this.addWindowEvent(key, 'closed', (event, win) => {
        win = null;
      })
    }
  }

  addWindowEvent(name, eventName, callback) {
    this.windows[name] && this.windows[name].on(eventName, (event = null) => callback(event, this.windows[name]))
  }

  add(name, win) {
    this.windows[name] = win
  }

  get(name) {
    return this.windows[name]
  }

  close(name) {
    this.windows[name] && this.windows[name].close()
    this.windows[name] = null
    return true
  }
}
