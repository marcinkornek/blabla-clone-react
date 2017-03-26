// utils
import React from 'react'

export const RenderUserAge = props => {
  if (props.user.age) {
    return(<div className='main-info__details-age'>({props.user.age} years)</div>)
  } else {
    return(null)
  }
}
