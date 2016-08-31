// copied from https://github.com/erikras/redux-form-material-ui

import Toggle from 'material-ui/Toggle'
import createComponent from './createComponent'

export default createComponent(
  Toggle,
  ({
    input: {
      onChange,
      value,
      ...inputProps
    },
    meta, // eslint-disable-line no-unused-vars
    ...props
  }) => ({
    ...inputProps,
    ...props,
    toggled: value ? true : false,
    onToggle: onChange
  })
)
