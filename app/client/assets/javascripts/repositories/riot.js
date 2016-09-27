const observer = riot.observable()

class RiotRepository {

  update(riotId, newState) {
    observer.trigger(`update-${riotId}`, newState)
  }

  emit(key, newState) {
    observer.trigger(`emit-${key}`, newState)
  }

  onUpdate(riotId, f) {
    observer.on(`update-${riotId}`, f)
  }

  onEmit(key, f) {
    observer.on(`emit-${key}`, f)
  }
}

module.exports = new RiotRepository()
