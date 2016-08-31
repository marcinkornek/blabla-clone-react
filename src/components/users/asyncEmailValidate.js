import * as actions from '../../actions/users'

const asyncValidate = (values, dispatch) => {
  // This is workaround (TODO change this after fixing issue in redux-form)
  // https://github.com/erikras/redux-form/issues/1297
  // it still returns error in console 'Uncaught (in promise) Object {email: "This email is taken"}'
  return dispatch(actions.checkUserEmailUniqueness(values.email))
    .then((json) => {
      if (json.errors.length > 0) {
        throw { email: 'This email is taken' }
      }
    })
}

export default asyncValidate
