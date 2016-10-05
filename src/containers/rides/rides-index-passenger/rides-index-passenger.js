import React, { Component, PropTypes } from 'react'
import Router, { Link } from 'react-router'
import { Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import ReactPaginate from 'react-paginate'
import * as actions from '../../../actions/rides'
import RidesItem from '../../../components/rides/rides-index-item/rides-index-item'
import LoadingItem from '../../../components/shared/LoadingItem'

const per = 10

class RidesIndexPassenger extends Component {
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

  handlePageClick(e) {
    const { fetchRidesAsPassenger, currentUserId } = this.props
    var page = e.selected + 1

    fetchRidesAsPassenger(currentUserId, page, per)
  }

  renderRidesMain() {
    return(
      <Col xs={12}>
        <div className='heading'>
          <div className='heading-title'>My rides as passenger</div>
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
    isFetching: state.ridesPassenger.isFetching,
    rides: state.ridesPassenger.items,
    pagination: state.ridesPassenger.pagination,
    currentUserId: state.session.id
  }
}

const mapDispatchToProps = {
  fetchRidesAsPassenger: actions.fetchRidesAsPassenger
}

export default connect(mapStateToProps, mapDispatchToProps)(RidesIndexPassenger)
