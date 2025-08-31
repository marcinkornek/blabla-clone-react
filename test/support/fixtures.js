class User {
  constructor(attrs = {}) {
    this.id = attrs.id || 1
    this.email = attrs.email || 'user@example.com'
    this.first_name = attrs.first_name || 'First'
    this.last_name = attrs.last_name || 'Last'
  }
}

module.exports = { User }
