let loginWinOptions = {
  title: '检测中心助手',
  width: 430,
  height: 330,
  resizable: false,
  maximizable: false,
  titleBarStyle: 'hiddenInset',
  webPreferences: {
    webSecurity: false
  },
  backgroundColor: '#fff'
}

let mainWinOptions = {
  title: '检测中心助手',
  show: false,
  width: 1000,
  height: 728,
  resizable: false,
  maximizable: false,
  titleBarStyle: 'hiddenInset',
  webPreferences: {
    webSecurity: false
  }
}

let confWinOptions = {
  title: '检测中心助手',
  show: false,
  width: 600,
  height: 400,
  resizable: false,
  maximizable: false,
  minimizable: false,
  titleBarStyle: 'hiddenInset',
  alwaysOnTop: true,
  webPreferences: {
    webSecurity: false
  }
}

if (process.platform === 'win32') { // 如果平台是win32，也即windows
  loginWindowOptions.frame = false // 创建一个frameless窗口，详情：https://electronjs.org/docs/api/frameless-window
  mainWindowOptions.frame = false
  confWindowOptions.frame = false
}

export default {
  loginWinOptions,
  mainWinOptions,
  confWinOptions
}
