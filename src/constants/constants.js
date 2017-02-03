var APIRoot, ActionCableURL
if (__DEVELOPMENT__) {
  APIRoot = 'http://localhost:3000/api/'
  ActionCableURL = 'ws://localhost:3000/cable'
} else {
  APIRoot = 'https://blabla-clone-api.herokuapp.com/api/'
  ActionCableURL = 'wss://blabla-clone-api.herokuapp.com/cable'
}

module.exports = {
  APIRoot: APIRoot,
  ActionCableURL: ActionCableURL,
  APIEndpoints: {
    USERS:         APIRoot + 'users',
    CARS:          APIRoot + 'cars',
    NOTIFICATIONS: APIRoot + 'notifications',
    RIDES:         APIRoot + 'rides',
    RIDE_REQUESTS: APIRoot + 'ride_requests',
    SESSIONS:      APIRoot + 'sessions',
    LOGIN_EMAIL:   APIRoot + 'sessions/login',
    LOGIN_FB:      APIRoot + 'sessions/oath_login'
  },

  Permissions: {
    'USER': 'user',
    'ADMIN': 'admin',
    'PUBLIC': 'public'
  }
};
