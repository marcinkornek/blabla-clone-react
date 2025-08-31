// Updated for MUI v5

const mapError = ({ meta: { touched, error } = {}, input: { ...inputProps }, ...props }, errorProp = 'helperText') => {
  const hasError = touched && error
  return {
    ...inputProps,
    ...props,
    error: hasError,
    [errorProp]: hasError ? error : props[errorProp]
  }
}

export default mapError
