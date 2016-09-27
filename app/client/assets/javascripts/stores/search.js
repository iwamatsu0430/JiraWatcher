const Store = require('../infra/store')

class SearchStore extends Store {

  constructor(parent) {
    super(parent, {
      histories: [],
      searchValue: '',
    })
  }
}

module.exports = SearchStore
