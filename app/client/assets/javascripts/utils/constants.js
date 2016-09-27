module.exports = {
  app: {
    title: 'JIRA WATCHER'
  },
  window: {
    width:  320,
    height: 480
  },
  localStorage: {
    domain:         'signInDomain',
    email:          'signInEmail',
    cookie:         'signInCookie',
    windowPosition: 'windowPosition',
    jqlHistories:   'jqlHistories',
  },
  riot: {
    route:        'route',
    searchJira:   'serachJira',
    showLoading:  'showLoading',
    hideLoading:  'hideLoading',
    showMenu:     'showMenu',
    hideMenu:     'hideMenu',
    showModal:    'showModal',
    hideModal:    'hideModal',
    getLoginName: 'getLoginName',
    focusSearch:  'focusSearch',
  },
  schedule: {
    autoReflesh:  { code: 'autoReflesh', interval: 1000 * 60 * 10 }
  }
}
