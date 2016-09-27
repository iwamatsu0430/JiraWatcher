const Action    = require('../infra/action')

const riotRepo  = require('../repositories/riot')

const constants = require('../utils/constants')

class ModalAction extends Action {

  constructor(parent) {
    super(parent)
  }

  initialize(action) {
    riotRepo.onEmit(constants.riot.showModal, options => {
      options.isShown = true;
      action.update(options)
    })
    riotRepo.onEmit(constants.riot.hideModal, () => action.update({ isShown: false }))
  }

  submitOk(e) {
    e.preventDefault()
    this.parent.onOk()
    riotRepo.emit(constants.riot.hideModal)
  }

  submitNg(e) {
    e.preventDefault()
    this.parent.onNg()
    riotRepo.emit(constants.riot.hideModal)
  }
}

module.exports = ModalAction
