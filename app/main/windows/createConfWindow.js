import { BrowserWindow } from 'electron'
import { confWinOptions } from '../config/win.conf.js'

export default function createConfWindow(wm) {
  const confWindow = new BrowserWindow(confWinOptions);
  confWindow.loadURL(`${global.appFilePath}#conf`);

  wm.add('confWindow', confWindow)

  confWindow.on('close', (event) => {
    if (!global.confWindowShouldClose) {
      event.preventDefault()
      confWindow && confWindow.hide()
    }
  })

  return confWindow
}
