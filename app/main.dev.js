/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 *
 */
import { app, BrowserWindow, ipcMain } from 'electron';
import fs from 'fs';
import path from 'path';
import WindowManager from './main/WindowManager'
import createLoginWindow from './main/windows/createLoginWindow'
import createConfWindow from './main/windows/createConfWindow'
import eventBus from './main/eventBus'
import globals from './globals'
import { fsExistsSync } from './utils/common'

const wm = WindowManager.getInstance()

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')();
  const path = require('path');
  const p = path.join(__dirname, '..', 'app', 'node_modules') ;
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
  ];

  return Promise
    .all(extensions.map(name => installer.default(installer[name], forceDownload)))
    .catch(console.log);
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  global.confWindowShouldClose = false
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (wm.get('mainWindow') == null && wm.get('loginWindow') == null) {
    createLoginWindow(wm)
    createConfWindow(wm)
  }
})

if (process.platform != 'win32') {
  app.dock.bounce('critical')
}

app.on('ready', async () => {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions();
  }

  if (!fsExistsSync(global.settingConfPath)) {
    const tempConfPath = `${__dirname}/config/setting.json`
    const tempConfig = JSON.parse(fs.readFileSync(tempConfPath))
    fs.writeFileSync(global.settingConfPath, JSON.stringify(tempConfig, null, 2))
  }

  createLoginWindow(wm)
  createConfWindow(wm)

  eventBus()
});
