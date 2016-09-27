const Store = require('../infra/store')

class MenuStore extends Store {

  constructor(parent) {
    super(parent, {
      avatar:   '',
      isShown:  false,
    })
  }
}

module.exports = MenuStore
