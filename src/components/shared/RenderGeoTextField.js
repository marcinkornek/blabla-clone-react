import React from 'react'
import Geosuggest from 'react-geosuggest'
import styles from '../../stylesheets/shared/Geosuggest'

export const renderGeoTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <Geosuggest
    inputClassName='form-control'
    placeholder={label}
    onSuggestSelect={input.onChange} />
)
