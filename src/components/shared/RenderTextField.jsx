import React from 'react'
import TextField from 'material-ui/TextField'

export const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    className="text-input"
    errorText={touched && error}
    {...input}
    {...custom} />
)
