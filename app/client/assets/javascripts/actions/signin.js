const Action            = require('../infra/action')

const jiraRepo          = require('../repositories/jira')
const localStorageRepo  = require('../repositories/localStorage')

const constants         = require('../utils/constants')
const routes            = require('../utils/routes')
const validate          = require('../utils/validate')

class SignInAction extends Action {

  constructor(parent) {
    super(parent)
  }

  initialize(action) {
    localStorageRepo.get(constants.localStorage.domain)
      .then(domain => action.update({ domainValue: domain }))
    localStorageRepo.get(constants.localStorage.email)
      .then(email => action.update({ emailValue: email }))
  }

  signIn(e) {
    e.preventDefault()
    const [domain, email, password] = [
      this.parent.domain.value,
      this.parent.email.value,
      this.parent.password.value
    ]
    if (!validate.domain(domain) || !validate.email(email) || !validate.password(password)) {
      console.log('validation error')
      return
    }

    localStorageRepo.set(constants.localStorage.domain, domain)
    localStorageRepo.set(constants.localStorage.email, email)
    jiraRepo.setDomain(domain)

    this.emit(constants.riot.showLoading)
    jiraRepo.signIn(email, password)
      .then(cookie => {
        localStorageRepo.set(constants.localStorage.cookie, cookie)
        jiraRepo.setCookie(cookie)
        return jiraRepo.getLoginName()
      })
      .then(loginName => {
        this.route(routes.issues)
        this.emit(constants.riot.searchJira, jiraRepo.createUserIssueJql())
        this.emit(constants.riot.getLoginName, loginName)
      })
      .catch(e => {
        // TODO notify failure
        this.emit(constants.riot.hideLoading)
      })
  }
}

module.exports = SignInAction
