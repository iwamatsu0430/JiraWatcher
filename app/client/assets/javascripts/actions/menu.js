const Action            = require('../infra/action')

const electronRepo      = require('../repositories/electron')
const jiraRepo          = require('../repositories/jira')
const localStorageRepo  = require('../repositories/localStorage')
const riotRepo          = require('../repositories/riot')

const byte              = require('../utils/byte')
const constants         = require('../utils/constants')
const routes            = require('../utils/routes')

class MenuAction extends Action {

  constructor(parent) {
    super(parent)
  }

  initialize(action) {
    riotRepo.onEmit(constants.riot.getLoginName, loginName => {
      jiraRepo.getUserAvatar(loginName)
        .then(avatar => action.update({ avatar: `data:image/png;base64,${byte.toBase64(avatar)}` }))
    })
    riotRepo.onEmit(constants.riot.showMenu, () => action.update({ isShown: true }))
    riotRepo.onEmit(constants.riot.hideMenu, () => action.update({ isShown: false }))
  }

  showMenu(e) {
    e.preventDefault()
    this.emit(constants.riot.showMenu)
    this.emit(constants.riot.focusSearch)
  }

  hideMenu(e) {
    e.preventDefault()
    this.emit(constants.riot.hideMenu)
  }

  showYours(e) {
    e.preventDefault()
    this.route(routes.issues)
    this.emit(constants.riot.searchJira, jiraRepo.createUserIssueJql())
    this.emit(constants.riot.getLoginName, jiraRepo.loginName)
  }

  signOut(e) {
    e.preventDefault()
    const options = {
      message: 'Sign out?',
      okText: 'OK',
      onOk: () => {
        this.route(routes.signIn)
        jiraRepo.loginName = undefined
        localStorageRepo.remove(constants.localStorage.cookie)
      },
      ngText: 'CANCEL',
      isSelector: true
    }
    this.emit(constants.riot.showModal, options)
  }

  exit(e) {
    e.preventDefault()
    const options = {
      message: 'Exit app?',
      okText: 'OK',
      onOk: () => electronRepo.exitApp(),
      ngText: 'CANCEL',
      isSelector: true
    }
    this.emit(constants.riot.showModal, options)
  }
}

module.exports = MenuAction
