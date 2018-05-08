import { app } from 'electron';
import path from 'path';
import fs from 'fs';

global.settingConfPath = path.join(app.getPath('appData'), 'electron-dva-setting.json')
global.confWindowShouldClose = false

global.appFilePath = `file://${__dirname}/app.html`

global.settingConfig = null

