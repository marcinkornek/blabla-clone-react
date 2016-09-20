import React from 'react'

const RenderUserAge = props => {
  if (props.user.age) {
    return(<div className='main-info__details-age'>({props.user.age} years)</div>)
  } else {
    return(null)
  }
}

export default RenderUserAge
