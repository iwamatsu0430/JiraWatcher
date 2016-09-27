class ValidateUtils {

  domain(domain) {
    return /.+/.test(domain.trim()) // TODO fix regex
  }

  email(email) {
    return /[\w\d\.\_\-\@]+/.test(email) // TODO fix regex
  }

  password(password) {
    return /.+/.test(password) // TODO fix regex
  }

  search(jql) {
    return /.+/.test(jql.trim()) // TODO fix regex
  }
}

module.exports = new ValidateUtils()
