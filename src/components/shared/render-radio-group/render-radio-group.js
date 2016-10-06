import React from 'react'
import { RadioButtonGroup } from 'material-ui/RadioButton'

export const renderRadioGroup = ({ input, ...rest }) => (
  <RadioButtonGroup {...input} {...rest}
    className="radio-input"
    valueSelected={input.value}
    onChange={(event, value) => input.onChange(value)}/>
)
