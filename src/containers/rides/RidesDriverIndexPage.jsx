import React, { Component, PropTypes } from 'react'
import Router, { Link } from 'react-router'
import { Button, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import ReactPaginate from 'react-paginate'
import * as actions from '../../actions/rides'
import styles from '../../stylesheets/rides/Rides'
import sharedStyles from '../../stylesheets/shared/Shared'
import RidesItem from '../../components/rides/RidesIndexSimplePageItem'
import LoadingItem from '../../components/shared/LoadingItem'

const per = 10

class RidesDriverIndexPage extends Component {
  static PropTypes = {
    rides: PropTypes.array.isRequired
  }

  componentDidMount() {
    const { fetchRidesAsDriver, currentUserId } = this.props
    if (currentUserId) {
      fetchRidesAsDriver(currentUserId, 1, per)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { fetchRidesAsDriver, currentUserId } = this.props
    if (nextProps.currentUserId && currentUserId === undefined) {
      fetchRidesAsDriver(nextProps.currentUserId, 1, per)
    }
  }

  render() {
    const { isFetching, rides, pagination, currentUserId } = this.props
    var ridesMain, ridesList, headingButton, ridesPagination

    if (isFetching || currentUserId === undefined) {
      ridesList =
        <LoadingItem />
    } else {
      if (_.isEmpty(rides)) {
        ridesList = 'No rides'
      } else {
        ridesList = rides.map((ride, i) =>
          <RidesItem ride={ride} key={i} />
        )
      }
    }

    if (currentUserId) {
      headingButton =
        <div className='heading-button'>
          <Link to='/rides/new'><Button bsStyle='primary' bsSize='small'>New ride</Button></Link>
        </div>
    }

    ridesMain =
      <Col xs={12}>
        <div className='heading'>
          <div className='heading-title'>My rides as driver</div>
          {headingButton}
        </div>
        {ridesList}
      </Col>

    if (pagination.total_pages > 1) {
      ridesPagination =
        <ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<a href="">...</a>}
                       pageNum={pagination.total_pages}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       clickCallback={this.handlePageClick.bind(this)}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} />
    }

    return (
      <div className='show-grid'>
        <div className='rides'>
          {ridesMain}
          {ridesPagination}
        </div>
      </div>
    )
  }

  handlePageClick(e) {
    const { fetchRidesAsDriver, currentUserId } = this.props
    var page = e.selected + 1
    fetchRidesAsDriver(currentUserId, page, per)
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

export default connect(mapStateToProps, mapDispatchToProps)(RidesDriverIndexPage)
