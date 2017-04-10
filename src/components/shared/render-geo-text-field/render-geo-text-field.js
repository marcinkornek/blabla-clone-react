import React from 'react'
import Geosuggest from 'react-geosuggest'

export const renderGeoTextField = ({ input, label, meta: { touched, error }, initialValue, ...custom }) => {
  return (
    <Geosuggest
      inputClassName='form-control'
      placeholder={label}
      initialValue={initialValue ? initialValue : ''}
      onSuggestSelect={(value) => input.onChange(value)} />
  )
}
