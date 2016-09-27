const request = require('request')

class JiraRepository {

  constructor() {
    this.domain = undefined
    this.cookie = undefined
    this.loginName = undefined
    this.avatars = {}
  }

  setDomain(domain) {
    this.domain = domain
  }

  setCookie(cookie) {
    this.cookie = cookie
  }

  craeteUrl(path) {
    return `https://${this.domain}${path}`
  }

  craeteIssueUrl(key) {
    return this.craeteUrl(`/browse/${key}`)
  }

  createUserIssueJql() {
    return `assignee = '${this.loginName}' and status in (Open, 'In Progress') order by priority, Sprint`
  }

  doRequest(options, expectStatus, onSuccess) {
    return new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        if (error) {
          reject(error)
        } else {
          if (response.statusCode === expectStatus) {
            onSuccess(resolve, reject, response.headers, body)
          } else {
            reject(`Error: statusCode=${response.statusCode}`)
          }
        }
      })
    })
  }

  getLoginName(domain, cookie) {
    return this.doRequest({
      url: this.craeteUrl(`/rest/auth/1/session`),
      method: 'GET',
      headers: { Cookie: this.cookie }
    }, 200, (resolve, reject, headers, body) => {
      this.loginName = JSON.parse(body).name
      resolve(this.loginName)
    })
  }

  getUserAvatar(loginName) {
    if (this.avatars[loginName]) {
      return Promise.resolve(this.avatars[loginName])
    }
    return this.doRequest({
      url: this.craeteUrl(`/rest/api/2/universal_avatar/type/user/owner/${loginName}`),
      method: 'GET',
      headers: { Cookie: this.cookie }
    }, 200, (resolve, reject, headers, body) => {
      const customAvatars = JSON.parse(body).custom
      if (customAvatars.length > 0) {
        return resolve(customAvatars[0].urls['48x48'])
      } else {
        return reject(`Avatar not found. Perhaps loginName is wrong. loginName=${loginName}`)
      }
    }).then(avatarUrl => {
      return this.doRequest({
        url: avatarUrl,
        method: 'GET',
        encoding: null,
        headers: { Cookie: this.cookie }
      }, 200, (resolve, reject, headers, body) => {
        this.avatars[loginName] = body // NOTE: cache avatar image
        resolve(body)
      })
    })
  }

  signIn(email, password) {
    return this.doRequest({
      url: this.craeteUrl(`/login`),
      method: 'POST',
      form: {
        username: email,
        password: password
      }
    }, 303, (resolve, reject, headers, body) => {
      this.cookie = headers['set-cookie'].join(';')
      resolve(this.cookie)
    })
  }

  search(jql) {
    return this.doRequest({
      url: this.craeteUrl(`/rest/api/2/search`),
      method: 'POST',
      headers: { Cookie: this.cookie },
      json: true,
      body: { jql: jql }
    }, 200, (resolve, reject, headers, body) => resolve(body))
  }
}

module.exports = new JiraRepository()
