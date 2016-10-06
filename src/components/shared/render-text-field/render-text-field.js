import React from 'react'
import TextField from 'material-ui/TextField'
import classNames from 'classnames'

export const renderTextField = ({ input, label, meta: { asyncValidating, touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    className={classNames('text-input', {'async-validating' : asyncValidating})}

    errorText={touched && error}
    {...input}
    {...custom} />
)
