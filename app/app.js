const { app, BrowserWindow }  = require('electron')
const constants               = require('./client/assets/javascripts/utils/constants')

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on("ready", () => {
  let movedCallback = () => {}

  let mainWindow = new BrowserWindow({
    title: constants.app.title,
    width: constants.window.width,
    height: constants.window.height,
    transparent: false,
    frame: (process.platform === 'darwin') ? false : true,
    resizable: false,
    show: false,
  })
  mainWindow.setAlwaysOnTop(true)
  mainWindow.loadURL(`file://${__dirname}/client/app.html`)
  mainWindow.on('moved', () => movedCallback())
  mainWindow.on('closed', () => app.quit())

  exports.onMoved = f => {
    movedCallback = f
  }
  exports.log = msg => {
    console.log(msg)
  }
})
