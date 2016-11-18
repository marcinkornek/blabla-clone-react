// actions
import { checkUserEmailUniqueness } from '../../../actions/users'

export const asyncValidate = (values, dispatch) => {
  return dispatch(checkUserEmailUniqueness(values.email))
    .then((json) => {
      if (json.errors.length > 0) {
        throw { email: 'This email is taken' }
      }
    })
}
