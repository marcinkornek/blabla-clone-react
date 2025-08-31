// Updated for MUI v5

import { RadioGroup, FormControl, FormLabel, FormHelperText } from '@mui/material'
import React from 'react'

const RadioButtonGroup = ({ input, label, meta: { touched, error }, children, ...custom }) => {
  const hasError = touched && error
  
  return (
    <FormControl error={hasError}>
      {label && <FormLabel>{label}</FormLabel>}
      <RadioGroup
        {...input}
        {...custom}
      >
        {children}
      </RadioGroup>
      {hasError && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}

export default RadioButtonGroup
