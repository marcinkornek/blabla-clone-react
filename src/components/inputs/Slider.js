// Updated for MUI v5

import { Slider } from '@mui/material'
import React from 'react'

const SliderField = ({ input, ...custom }) => {
  return (
    <Slider
      {...input}
      {...custom}
      value={input.value || 0}
      onChange={(event, value) => input.onChange(value)}
    />
  )
}

export default SliderField
