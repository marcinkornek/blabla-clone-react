import React, { Component, PropTypes } from 'react'
import Router, { Link } from 'react-router'
import Button from 'react-bootstrap/lib/Button'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import { connect } from 'react-redux'
import ReactPaginate from 'react-paginate'
import * as actions from '../../actions/rides'
import styles from '../../stylesheets/rides/Rides'
import sharedStyles from '../../stylesheets/shared/Shared'
import RidesItem from '../../components/rides/RidesIndexPageItem'
import RidesSearchItem from '../../components/rides/RidesSearchItem'
import RidesFilterItem from '../../components/rides/RidesFilterItem'
import LoadingItem from '../../components/shared/LoadingItem'

const per = 10

class RidesIndexPage extends Component {
  static PropTypes = {
    isFetching: PropTypes.bool.isRequired,
    rides: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired,
    filters: PropTypes.object.isRequired,
    currentUserId: PropTypes.number.isRequired
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentDidMount() {
    const { loadSearchFormData, fetchRides, currentUserId } = this.props
    let { query } = this.props.location
    var page = query.page || 1
    query.hide_full = query.hide_full || false
    loadSearchFormData(query)
    fetchRides(this.context.router, page, per, query)
  }

  handleSubmit(data) {
    const { loadSearchFormData, fetchRides } = this.props

    var query = {}
    Object.keys(data).forEach((key) => {
      if (data[key] != undefined) {
        if (key == 'start_city' || key == 'destination_city') {
          _.merge(query, { [key]: data[key].label || data[key] })
        } else {
          _.merge(query, { [key]: data[key] })
        }
      }
    })
    var query_from_location = this.props.location.query
    var page = 1
    var extended = _.extend(query_from_location, query)
    loadSearchFormData(extended)
    fetchRides(this.context.router, page, per, extended)
  }

  render() {
    const { isFetching, rides, pagination, filters, currentUserId } = this.props
    var ridesMain, ridesFilter, ridesList, headingButton, ridesPagination
    let { query } = this.props.location
    var page = (parseInt(query.page, 10) || 1) - 1

    if (isFetching) {
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
        <div className='heading__button'>
          <Link to='/rides/new'><Button bsStyle='primary'>New ride</Button></Link>
        </div>
    }

    if (pagination.total_pages > 1) {
      ridesPagination =
        <ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<a href="">...</a>}
                       pageNum={pagination.total_pages}
                       initialSelected={page}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       clickCallback={this.handlePageClick.bind(this)}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} />
    }

    ridesMain =
      <Row>
        <Col xs={12}>
          <RidesFilterItem query={query} filters={filters}
            onSubmit={this.handleSubmit.bind(this)} />
          <RidesSearchItem query={query}
            onSubmit={this.handleSubmit.bind(this)} />
          <div className='heading'>
            <div className='heading__title'>{pagination.total_count} Rides</div>
            {headingButton}
          </div>
          {ridesList}
        </Col>
      </Row>

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
    const { fetchRides } = this.props
    let { query } = this.props.location
    var page = query.page || 1
    fetchRides(this.context.router, page, per, query)
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.rides.isFetching,
    rides: state.rides.items,
    pagination: state.rides.pagination,
    filters: state.rides.filters,
    currentUserId: state.session.id
  }
}

const mapDispatchToProps = {
  loadSearchFormData: actions.loadSearchFormData,
  fetchRides: actions.fetchRides,
}

export default connect(mapStateToProps, mapDispatchToProps)(RidesIndexPage)
