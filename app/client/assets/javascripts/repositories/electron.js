const { remote, shell } = require('electron')
const { app }           = remote
const currentWindow     = remote.getCurrentWindow()
const main              = remote.require('./app')

class ElectronRepository {

  show() {
    currentWindow.show()
  }

  exitApp() {
    app.quit()
  }

  onMoved(f) {
    main.onMoved(f)
  }

  log(msg) {
    main.log(msg)
  }

  openLink(url) {
    shell.openExternal(url)
  }

  getPosition() {
    return currentWindow.getPosition()
  }

  setPosition(x, y) {
    currentWindow.setPosition(x, y)
  }
}

module.exports = new ElectronRepository()
