import React from 'react'
import Geosuggest from 'react-geosuggest'
import classNames from 'classnames'

export const renderGeoTextField = ({ input, label, meta: { touched, error }, initialValue, ...custom }) => {
  return (
    <div className={classNames('geosuggest__wrapper', {'geosuggest__wrapper--error' : touched && error})}>
      <Geosuggest
        placeholder={label}
        initialValue={initialValue ? initialValue : ''}
        onSuggestSelect={(value) => input.onChange(value)} />
        <div className="geosuggest__error">{touched && error}</div>
    </div>
  )
}
