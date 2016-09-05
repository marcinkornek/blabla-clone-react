import React, { Component, PropTypes } from 'react'
import Router, { Link } from 'react-router'
import { Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import ReactPaginate from 'react-paginate'
import * as actions from '../../actions/rides'
import styles from '../../stylesheets/rides/Rides'
import sharedStyles from '../../stylesheets/shared/Shared'
import RidesItem from '../../components/rides/RidesIndexPageItem'
import LoadingItem from '../../components/shared/LoadingItem'

const per = 10

class RidesPassengerIndexPage extends Component {
  static PropTypes = {
    isFetching: PropTypes.bool.isRequired,
    rides: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired,
    currentUserId: PropTypes.number.isRequired
  }

  componentDidMount() {
    const { fetchRidesAsPassenger, currentUserId } = this.props
    if (currentUserId) {
      fetchRidesAsPassenger(currentUserId, 1, per)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { fetchRidesAsPassenger, currentUserId } = this.props
    if (nextProps.currentUserId && currentUserId === undefined) {
      fetchRidesAsPassenger(nextProps.currentUserId, 1, per)
    }
  }

  render() {
    const { isFetching, rides, pagination, currentUserId } = this.props
    var ridesMain, ridesList, ridesPagination

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

    ridesMain =
      <Col xs={12}>
        <div className='heading'>
          <div className='heading-title'>My rides as passenger</div>
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
    const { fetchRidesAsPassenger, currentUserId } = this.props
    var page = e.selected + 1
    fetchRidesAsPassenger(currentUserId, page, per)
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.ridesPassenger.isFetching,
    rides: state.ridesPassenger.items,
    pagination: state.ridesPassenger.pagination,
    currentUserId: state.session.id
  }
}

const mapDispatchToProps = {
  fetchRidesAsPassenger: actions.fetchRidesAsPassenger
}

export default connect(mapStateToProps, mapDispatchToProps)(RidesPassengerIndexPage)
