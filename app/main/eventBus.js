import { ipcMain } from 'electron'
import fs from 'fs'
import WindowManager from './WindowManager'
import createMainWindow from './windows/createMainWindow'

export default function() {
  const wm = WindowManager.getInstance()

  ipcMain.on('login', (event, user) => {
    if (user.username === 'admin' && user.password === 'admin') {
      global.mainWindowIsOpen = true
      createMainWindow(wm)
    } else {
      event.sender.send('login-fail')
    }
  })

  ipcMain.on('window-close', (event, windowName) => {
    const loginWindow = wm.get('loginWindow')
    const mainWindow = wm.get('mainWindow')
    const confWindow = wm.get('confWindow')
    const windows = {
      loginWindow,
      mainWindow,
      confWindow
    }
    if (windows[windowName]) {
      windows[windowName].close()
    }
  })

  ipcMain.on('window-minus', (event, windowName) => {
    const loginWindow = wm.get('loginWindow')
    const mainWindow = wm.get('mainWindow')
    const confWindow = wm.get('confWindow')
    const windows = {
      loginWindow,
      mainWindow,
      confWindow
    }
    if (windows[windowName]) {
      windows[windowName].minimize()
    }
  })

  ipcMain.on('get-mode-info', (event) => {
    event.returnValue = global.getConf()
  })

  ipcMain.on('save-config', (event, config) => {
    const confWindow = wm.get('confWindow')
    fs.writeFileSync(settingConfPath, JSON.stringify(config, null, 2))
    event.sender.send('start-reload-page')
    confWindow.close()
  })

  ipcMain.on('open-conf-window', (event) => {
    const confWindow = wm.get('confWindow')
    if (!confWindow) {
      throw new Error('"mainWindow" is not defined');
    } else {
      confWindow.show()
      confWindow.focus()
    }
  })
}
