import React from 'react'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import ContentFilter from 'material-ui/svg-icons/content/filter-list'
import RidesFilters from './RidesFilters'

export default class RideFiltersContainer extends React.Component {
  // constructor(props) {
  //   super(props)

  //   this.state = {
  //     valueSingle: [],
  //   }
  // }

  // handleChange = (event, value) => {
  //   const { query } = this.props
  //   this.setState({
  //     valueSingle: value
  //   })
  // }

  render() {
    const { handleSubmit, filters } = this.props
    return (
      <div className='rides-filters__button'>
        <IconMenu
          iconButtonElement={<IconButton><ContentFilter /></IconButton>}
          multiple={false}
        >
          <RidesFilters {...this.props} />
        </IconMenu>
      </div>
    )
  }
}
