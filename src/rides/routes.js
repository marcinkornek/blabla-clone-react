import requireAuth from '../containers/shared/require-auth/require-auth'
import RideNew from './containers/ride-new/ride-new'
import RideShow from './containers/ride-show/ride-show'
import RideEdit from './containers/ride-edit/ride-edit'
import RidesIndex from './containers/rides-index/rides-index'
import RidesIndexDriver from './containers/rides-index-driver/rides-index-driver'
import RidesIndexPassenger from './containers/rides-index-passenger/rides-index-passenger'

export default [
  { path: '/rides/new', component: RideNew },
  { path: '/rides', component: RidesIndex },
  { path: '/rides/:rideId', component: RideShow },
  { path: '/account/rides_as_driver', component: requireAuth(RidesIndexDriver) },
  { path: '/account/rides_as_passenger', component: requireAuth(RidesIndexPassenger) },
  { path: '/account/rides_as_driver/:rideId/edit', component: requireAuth(RideEdit) },
]
