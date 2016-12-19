import requireAuth from '../containers/shared/require-auth/require-auth'
import NotificationsIndex from './containers/notifications-index/notifications-index'

export default [
  { path: '/notifications', component: requireAuth(NotificationsIndex) }
]
