import React from 'react'
import Geosuggest from 'react-geosuggest'

export const renderGeoTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <Geosuggest
    inputClassName='form-control'
    placeholder={label}
    onSuggestSelect={input.onChange} />
)
