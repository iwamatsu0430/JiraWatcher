const Store = require('../infra/store')

class SignInStore extends Store {

  constructor(parent) {
    super(parent, {
      loginNmae: undefined,
      issues: [],
      isMenuShown: false,
    })
  }
}

module.exports = SignInStore
