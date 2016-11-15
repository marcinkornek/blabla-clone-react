// utils
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { autobind } from 'core-decorators'
import { Link } from 'react-router'
import { Col } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'

// actions
import { fetchRidesAsPassenger } from '../../../actions/rides'

// components
import { AsyncContent } from '../../../components/shared/async-content/async-content'
import { RidesIndexItem } from '../../../components/rides/rides-index-item/rides-index-item'

const per = 10

class RidesIndexPassenger extends Component {
  static propTypes = {
    rides: PropTypes.array.isRequired,
    isStarted: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    pagination: PropTypes.object.isRequired,
    currentUserId: PropTypes.number.isRequired,
  }

  componentDidMount() {
    const { fetchRidesAsPassenger, currentUserId } = this.props

    if (currentUserId) fetchRidesAsPassenger(currentUserId, 1, per)
  }

  @autobind
  handlePageClick(e) {
    const { fetchRidesAsPassenger, currentUserId } = this.props
    let page = e.selected + 1

    fetchRidesAsPassenger(currentUserId, page, per)
  }

  renderRidesMain() {
    const { isFetching, isStarted } = this.props

    return (
      <Col xs={12}>
        <div className='heading'>
          <div className='heading-title'>My rides as passenger</div>
        </div>
        <AsyncContent
          isFetching={isFetching || !isStarted}
        >
          {this.renderRidesList()}
        </AsyncContent>
      </Col>
    )
  }

  renderRidesList() {
    const { rides } = this.props

    return (
      rides.map((ride, i) =>
        <RidesIndexItem
          key={i}
          ride={ride}
        />
      )
    )
  }

  renderRidesPagination() {
    const { pagination } = this.props

    if (pagination.total_pages > 1) {
      return (
        <div>
          <ReactPaginate previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={<a href="">...</a>}
            pageNum={pagination.total_pages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            clickCallback={this.handlePageClick}
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
    rides: state.ridesPassenger.items,
    isStarted: state.ridesPassenger.isStarted,
    isFetching: state.ridesPassenger.isFetching,
    pagination: state.ridesPassenger.pagination,
    currentUserId: state.session.id,
  }
}

const mapDispatchToProps = {
  fetchRidesAsPassenger
}

export default connect(mapStateToProps, mapDispatchToProps)(RidesIndexPassenger)
