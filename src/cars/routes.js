import requireAuth from '../containers/shared/require-auth/require-auth'
import CarNew from './containers/car-new/car-new'
import CarShow from './containers/car-show/car-show'
import CarEdit from './containers/car-edit/car-edit'
import CarsIndex from './containers/cars-index/cars-index'

export default [
  { path: '/account/cars', component: requireAuth(CarsIndex) },
  { path: '/account/cars/:carId/edit', component: requireAuth(CarEdit) },
  { path: '/cars/new', component: requireAuth(CarNew) },
  { path: '/cars/:carId', component: CarShow }
]
