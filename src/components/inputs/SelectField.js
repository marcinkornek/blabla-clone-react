// Updated for MUI v5

import { Select, FormControl, InputLabel, FormHelperText } from '@mui/material'
import React from 'react'

const SelectField = ({ input, label, meta: { touched, error }, children, ...custom }) => {
  const hasError = touched && error
  
  return (
    <FormControl error={hasError} fullWidth>
      {label && <InputLabel>{label}</InputLabel>}
      <Select
        {...input}
        {...custom}
        label={label}
      >
        {children}
      </Select>
      {hasError && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}

export default SelectField
