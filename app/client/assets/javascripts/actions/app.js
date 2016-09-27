const Action            = require('../infra/action')

const electronRepo      = require('../repositories/electron')
const localStorageRepo  = require('../repositories/localStorage')
const jiraRepo          = require('../repositories/jira')

const constants         = require('../utils/constants')
const routes            = require('../utils/routes')
const validate          = require('../utils/validate')

class AppAction extends Action {

  constructor(parent) {
    super(parent)
  }

  initialize(action) {
    action.initializeWindowPosition()
    electronRepo.show()
    action.isSignIn()
  }

  initializeWindowPosition() {
    electronRepo.onMoved(() => {
      const position = electronRepo.getPosition()
      localStorageRepo.set(constants.localStorage.windowPosition, JSON.stringify(position))
    })
    localStorageRepo.get(constants.localStorage.windowPosition)
      .then(data => {
        const [x, y] = JSON.parse(data)
        electronRepo.setPosition(x, y)
      })
  }

  isSignIn() {
    this.emit(constants.riot.showLoading)
    return Promise.all([
      localStorageRepo.get(constants.localStorage.domain),
      localStorageRepo.get(constants.localStorage.cookie)
    ])
    .then(data => {
      const [domain, cookie] = data
      jiraRepo.setDomain(domain)
      jiraRepo.setCookie(cookie)
      return jiraRepo.getLoginName()
    })
    .then(loginName => {
      this.route(routes.issues)
      this.emit(constants.riot.searchJira, jiraRepo.createUserIssueJql())
      this.emit(constants.riot.getLoginName, loginName)
    })
    .catch(e => {
      this.route(routes.signIn)
      this.emit(constants.riot.hideLoading)
    })
  }
}

module.exports = AppAction
