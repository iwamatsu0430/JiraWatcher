const Action            = require('../infra/action')

const jiraRepo          = require('../repositories/jira')
const localStorageRepo  = require('../repositories/localStorage')
const riotRepo          = require('../repositories/riot')

const constants         = require('../utils/constants')
const validate          = require('../utils/validate')

class SearchAction extends Action {

  constructor(parent) {
    super(parent)
  }

  initialize(action, parent) {
    localStorageRepo.get(constants.localStorage.jqlHistories)
      .then(historiesStr => {
        const histories = JSON.parse(historiesStr)
        const historiesByUser = histories[jiraRepo.loginName] || []
        action.update({ histories: historiesByUser })
      })
    riotRepo.onEmit(constants.riot.focusSearch, () => parent.search.focus())
  }

  inputJQL(e) {
    this.update({ searchValue: e.target.value })
  }

  search(e) {
    e.preventDefault()
    if (!validate.search(this.parent.searchValue)) {
      console.log('validation error')
      return
    }

    const newHistories = [{ jql: this.parent.searchValue }].concat(this.parent.histories)
    localStorageRepo.get(constants.localStorage.jqlHistories)
      .then(historiesStr => {
        const histories = JSON.parse(historiesStr)
        histories[jiraRepo.loginName] = newHistories
        localStorageRepo.set(constants.localStorage.jqlHistories, JSON.stringify(histories))
      })
      .catch(e => {
        const histories = {}
        histories[jiraRepo.loginName] = newHistories
        localStorageRepo.set(constants.localStorage.jqlHistories, JSON.stringify(histories))
      })
    this.update({ histories: newHistories })

    this.emit(constants.riot.searchJira, this.parent.searchValue)
    this.emit(constants.riot.hideMenu)
    this.update({ searchValue: '' })
  }

  setJqlByHistory(e) {
    e.preventDefault()
    this.update({ searchValue: e.item.jql })
    this.parent.search.focus()
  }
}

module.exports = SearchAction
