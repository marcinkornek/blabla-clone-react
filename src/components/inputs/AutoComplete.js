// Updated for MUI v5

import { Autocomplete, TextField } from '@mui/material'
import React from 'react'

const AutoCompleteField = ({ input, label, options, meta: { touched, error }, ...custom }) => {
  const hasError = touched && error
  
  return (
    <Autocomplete
      {...custom}
      options={options || []}
      value={input.value || null}
      onChange={(event, newValue) => input.onChange(newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={hasError}
          helperText={hasError ? error : ''}
          fullWidth
        />
      )}
    />
  )
}

export default AutoCompleteField
