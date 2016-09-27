const Action    = require('../infra/action')

const riotRepo  = require('../repositories/riot')

const constants = require('../utils/constants')

class RouterAction extends Action {

  constructor(parent) {
    super(parent)
  }

  initialize(action) {
    riotRepo.onEmit(constants.riot.route, route => action.renderTag(route))
  }

  renderTag(route) {
    const menu = route.menu ? `<menu></menu>` : ''
    this.parent.root.innerHTML = `<${route.code}></${route.code}>${menu}`
    riot.mount(route.code)
    if (route.menu) {
      riot.mount('menu')
    }
  }
}

module.exports = RouterAction
