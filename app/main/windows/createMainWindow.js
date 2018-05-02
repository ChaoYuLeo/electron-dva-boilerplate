import { BrowserWindow } from 'electron'
import MenuBuilder from '../../menu'
import { mainWinOptions } from '../config/win.conf.js'

export default function createMainWindow(wm) {
  const mainWindow = new BrowserWindow(mainWinOptions);
  mainWindow.loadURL(`${global.appFilePath}#home`);

  wm.add('mainWindow', mainWindow)

  mainWindow.on('closed', () => {
    global.confWindowShouldClose = true
    wm.close('confWindow')
  });

  mainWindow.webContents.on('did-finish-load', () => {
    wm.close('loginWindow')
    mainWindow.show();
    mainWindow.focus();
  })

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  return mainWindow
}
