// utils
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Button, Col } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'

// actions
import { fetchRidesAsDriver } from '../../../actions/rides'

// components
import { AsyncContent } from '../../../components/shared/async-content/async-content'
import { RidesIndexSimpleItem } from '../../../components/rides/rides-index-simple-item/rides-index-simple-item'

const per = 10

class RidesIndexDriver extends Component {
  static propTypes = {
    rides: PropTypes.array.isRequired,
    isStarted: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    pagination: PropTypes.object.isRequired,
    currentUserId: PropTypes.number.isRequired,
  }

  componentDidMount() {
    const { fetchRidesAsDriver, currentUserId } = this.props

    if (currentUserId) fetchRidesAsDriver(currentUserId, 1, per)
  }

  handlePageClick(e) {
    const { fetchRidesAsDriver, currentUserId } = this.props
    var page = e.selected + 1

    fetchRidesAsDriver(currentUserId, page, per)
  }

  renderRidesMain() {
    const { isStarted, isFetching } = this.props

    return (
      <Col xs={12}>
        <div className='heading'>
          <div className='heading-title'>My rides as driver</div>
          {this.renderHeadingButton()}
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
        <RidesIndexSimpleItem
          key={i}
          ride={ride}
        />
      )
    )
  }

  renderHeadingButton() {
    const { currentUserId } = this.props

    if (currentUserId) {
      return (
        <div className='heading-button'>
          <Link to='/rides/new'><Button bsStyle='primary' bsSize='small'>New ride</Button></Link>
        </div>
      )
    }
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
    isStarted: state.ridesDriver.isStarted,
    isFetching: state.ridesDriver.isFetching,
    rides: state.ridesDriver.items,
    pagination: state.ridesDriver.pagination,
    currentUserId: state.session.id,
  }
}

const mapDispatchToProps = {
  fetchRidesAsDriver
}

export default connect(mapStateToProps, mapDispatchToProps)(RidesIndexDriver)
