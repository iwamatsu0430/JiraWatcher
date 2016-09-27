const Store = require('../infra/store')

class LoadingStore extends Store {

  constructor(parent) {
    super(parent, {
      isShown: true,
    })
  }
}

module.exports = LoadingStore
