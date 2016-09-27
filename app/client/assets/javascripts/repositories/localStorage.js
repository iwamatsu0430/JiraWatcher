class LocalStorageRepository {

  get(key) {
    return new Promise((resolve, reject) => {
      const item = localStorage.getItem(key)
      item ? resolve(item) : reject()
    })
  }

  set(key, value) {
    localStorage.setItem(key, value)
  }

  remove(key) {
    localStorage.removeItem(key)
  }
}

module.exports = new LocalStorageRepository()
