// root application
import Application from './containers/application'

// routes
import rideRoutes from './rides/routes'
import sessionRoutes from './sessions/routes'
import userRoutes from './users/routes'
import carRoutes from './cars/routes'
import notificationRoutes from './notifications/routes'

export const rootRoutes = {
  childRoutes: [{
    path: '/',
    component: Application,
    childRoutes: [
      ...rideRoutes,
      ...sessionRoutes,
      ...userRoutes,
      ...carRoutes,
      ...notificationRoutes,
    ]
  }]
}
