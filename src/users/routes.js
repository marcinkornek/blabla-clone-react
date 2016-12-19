import requireAuth from '../containers/shared/require-auth/require-auth'
import UserNew from './containers/user-new/user-new'
import UserShow from './containers/user-show/user-show'
import UserEdit from './containers/user-edit/user-edit'
import UsersIndex from './containers/users-index/users-index'

export default [
  { path: '/users', component: requireAuth(UsersIndex) },
  { path: '/account/user', component: requireAuth(UserEdit) },
  { path: '/users/:userId', component: UserShow },
  { path: '/register', component: UserNew },
]
