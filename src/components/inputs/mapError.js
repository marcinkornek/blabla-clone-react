// copied from https://github.com/erikras/redux-form-material-ui

const mapError = ({ meta: { touched, error } = {}, input: { ...inputProps }, ...props }, errorProp = 'errorText') =>
  touched && error ? { ...props, ...inputProps, [errorProp]: error } : { ...inputProps, ...props }

export default mapError
