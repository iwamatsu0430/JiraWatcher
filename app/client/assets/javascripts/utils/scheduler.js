class Scheduler {

  constructor() {
    this.schedules = {}
  }

  set(id, interval, f) {
    const handler = this.schedules[id]
    if (handler) {
      clearInterval(handler)
    }
    this.schedules[id] = setInterval(f, interval)
  }
}

module.exports = new Scheduler()
