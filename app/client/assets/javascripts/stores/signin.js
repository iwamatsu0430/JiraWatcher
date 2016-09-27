const Store = require('../infra/store')

class SignInStore extends Store {

  constructor(parent) {
    super(parent, {
      domainValue: '',
      emailValue: ''
    })
  }
}

module.exports = SignInStore
