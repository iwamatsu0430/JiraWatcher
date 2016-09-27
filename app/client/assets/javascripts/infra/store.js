const riotRepo = require('../repositories/riot')

class Store {

  constructor(parent, state) {
    this.parent = parent
    riotRepo.onUpdate(this.parent._riot_id, newState => this.update(newState))
    this.update(state)
  }

  update(newState) {
    Object.keys(newState).forEach(key => {
      this.parent[key] = newState[key]
    })
    this.parent.update()
  }
}

module.exports = Store
