const Action        = require('../infra/action')

const electronRepo  = require('../repositories/electron')
const jiraRepo      = require('../repositories/jira')
const riotRepo      = require('../repositories/riot')

const constants     = require('../utils/constants')
const scheduler     = require('../utils/scheduler')

class IssuesAction extends Action {

  constructor(parent) {
    super(parent)
  }

  initialize(action, parent) {
    const autoReflesh = constants.schedule.autoReflesh
    scheduler.set(autoReflesh.code, autoReflesh.interval, () => action.emit(constants.riot.searchJira, parent.jql))
    riotRepo.onEmit(constants.riot.searchJira, jql => action.searchIssue(jql))
    riotRepo.onEmit(constants.riot.showMenu, () => action.update({ isMenuShown: true }))
    riotRepo.onEmit(constants.riot.hideMenu, () => action.update({ isMenuShown: false }))
  }

  searchIssue(jql) {
    this.update({ jql: jql })

    this.emit(constants.riot.showLoading)
    jiraRepo.search(jql)
      .then(result => {
        const newIssues = result.issues.map(issue => {
          return {
            key: issue.key,
            summary: issue.fields.summary,
            status: {
              color: issue.fields.status.statusCategory.colorName,
              name: issue.fields.status.statusCategory.name
            },
            issueType: {
              name: issue.fields.issuetype.name,
              iconUrl: issue.fields.issuetype.iconUrl,
            },
            priority: {
              iconUrl: issue.fields.priority.iconUrl,
              name: issue.fields.priority.name
            }
          }
        })
        this.update({ issues: newIssues })
        this.emit(constants.riot.hideLoading)
      })
      .catch(e => {
        this.emit(constants.riot.hideLoading)
      })
  }

  openIssue(e) {
    e.preventDefault()
    electronRepo.openLink(jiraRepo.craeteIssueUrl(e.item.key))
  }
}

module.exports = IssuesAction
