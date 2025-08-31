// Updated for MUI v5

import { Checkbox, FormControlLabel } from '@mui/material'
import React from 'react'

const CheckboxField = ({ input, label, ...custom }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={!!input.value}
          onChange={input.onChange}
          {...custom}
        />
      }
      label={label}
    />
  )
}

export default CheckboxField
