const Action    = require('../infra/action')

const riotRepo  = require('../repositories/riot')

const constants = require('../utils/constants')

class LoadingAction extends Action {

  constructor(parent) {
    super(parent)
  }

  initialize(action) {
    riotRepo.onEmit(constants.riot.showLoading, () => action.update({ isShown: true }))
    riotRepo.onEmit(constants.riot.hideLoading, () => action.update({ isShown: false }))
  }
}

module.exports = LoadingAction
