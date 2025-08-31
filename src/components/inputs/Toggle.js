// Updated for MUI v5

import { Switch, FormControlLabel } from '@mui/material'
import React from 'react'

const ToggleField = ({ input, label, ...custom }) => {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={!!input.value}
          onChange={input.onChange}
          {...custom}
        />
      }
      label={label}
    />
  )
}

export default ToggleField
