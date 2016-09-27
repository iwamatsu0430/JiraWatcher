const riotRepo  = require('../repositories/riot')

const constants = require('../utils/constants')

class Action {

  constructor(parent) {
    this.parent = parent
    this.initialize(this, parent)
  }

  initialize(action, parent) {}

  update(newState) {
    riotRepo.update(this.parent._riot_id, newState)
  }

  emit(key, newState) {
    riotRepo.emit(key, newState)
  }

  route(route) {
    this.emit(constants.riot.route, route)
  }
}

module.exports = Action
