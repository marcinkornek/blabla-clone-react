// Updated for MUI v5 - using TextField with type="date"

import { TextField } from '@mui/material'
import React from 'react'

const DatePicker = ({ input, label, meta: { touched, error }, ...custom }) => {
  const hasError = touched && error
  
  return (
    <TextField
      {...input}
      {...custom}
      type="date"
      label={label}
      error={hasError}
      helperText={hasError ? error : ''}
      InputLabelProps={{
        shrink: true,
      }}
      fullWidth
    />
  )
}

export default DatePicker
