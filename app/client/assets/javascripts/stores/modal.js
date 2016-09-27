const Store = require('../infra/store')

class SearchStore extends Store {

  constructor(parent) {
    super(parent, {
      isShown: false,
      message: '',
      okText: '',
      onOk: () => {},
      ngText: '',
      onNg: () => {},
      isSelector: true
    })
  }
}

module.exports = SearchStore
