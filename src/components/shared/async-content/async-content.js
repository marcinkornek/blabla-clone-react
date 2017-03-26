// utils
import React, { PropTypes } from 'react'

// components
import { LoadingItem } from '../loading-item/loading-item'

export const AsyncContent = ({isFetching, error, children}) => {
  if (isFetching) {
    return (
      <LoadingItem />
    )
  } else if (error) {
    return (
      <div>
        {error}
      </div>
    )
  } else {
    return (
      <div>
        {children}
      </div>
    )
  }
}

AsyncContent.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string,
  children: PropTypes.node,
}
