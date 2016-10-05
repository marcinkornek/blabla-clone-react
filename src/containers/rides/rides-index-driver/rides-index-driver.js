import React, { Component, PropTypes } from 'react'
import Router, { Link } from 'react-router'
import { Button, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import ReactPaginate from 'react-paginate'
import * as actions from '../../../actions/rides'
import RidesItem from '../../../components/rides/rides-index-simple-item/rides-index-simple-item'
import LoadingItem from '../../../components/shared/LoadingItem'

const per = 10

class RidesIndexDriver extends Component {
  static PropTypes = {
    rides: PropTypes.array.isRequired
  }

  componentDidMount() {
    const { fetchRidesAsDriver, currentUserId } = this.props

    if (currentUserId) {
      fetchRidesAsDriver(currentUserId, 1, per)
    }
  }

  handlePageClick(e) {
    const { fetchRidesAsDriver, currentUserId } = this.props
    var page = e.selected + 1

    fetchRidesAsDriver(currentUserId, page, per)
  }

  renderRidesMain() {
    return(
      <Col xs={12}>
        <div className='heading'>
          <div className='heading-title'>My rides as driver</div>
          {this.renderHeadingButton()}
        </div>
        {this.renderRidesList()}
      </Col>
    )
  }

  renderRidesList() {
    const { isFetching, rides, currentUserId } = this.props

    if (isFetching || currentUserId === undefined) {
      return(<LoadingItem />)
    } else if (_.isEmpty(rides)) {
      return('No rides')
    } else {
      return(
        rides.map((ride, i) =>
          <RidesItem
            key={i}
            ride={ride}
          />
        )
      )
    }
  }

  renderHeadingButton() {
    const { currentUserId } = this.props

    if (currentUserId) {
      return(
        <div className='heading-button'>
          <Link to='/rides/new'><Button bsStyle='primary' bsSize='small'>New ride</Button></Link>
        </div>
      )
    }
  }

  renderRidesPagination() {
    const { pagination } = this.props

    if (pagination.total_pages > 1) {
      return(
        <div>
          <ReactPaginate previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={<a href="">...</a>}
            pageNum={pagination.total_pages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            clickCallback={this.handlePageClick.bind(this)}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
      )
    }
  }

  render() {
    return (
      <div className='show-grid'>
        <div className='rides'>
          {this.renderRidesMain()}
          {this.renderRidesPagination()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.ridesDriver.isFetching,
    rides: state.ridesDriver.items,
    pagination: state.ridesDriver.pagination,
    currentUserId: state.session.id
  }
}

const mapDispatchToProps = {
  fetchRidesAsDriver: actions.fetchRidesAsDriver
}

export default connect(mapStateToProps, mapDispatchToProps)(RidesIndexDriver)
