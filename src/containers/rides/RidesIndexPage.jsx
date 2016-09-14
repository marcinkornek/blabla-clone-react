import React, { Component, PropTypes } from 'react'
import Router, { Link } from 'react-router'
import Button from 'react-bootstrap/lib/Button'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import { connect } from 'react-redux'
import ReactPaginate from 'react-paginate'
import * as actions from '../../actions/rides'
import RidesItem from '../../components/rides/RidesIndexPageItem'
import RidesSearchItem from '../../components/rides/RidesSearchItem'
import RidesFiltersContainer from '../../components/rides/RidesFiltersContainer'
import LoadingItem from '../../components/shared/LoadingItem'
import Chip from 'material-ui/Chip'

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

  constructor(props) {
    super(props)
    this.state = {chipData: []}
    this.styles = {
      chip: {
        margin: 4,
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      }
    }
  }

  componentDidMount() {
    const { loadSearchFormData, fetchRides, currentUserId } = this.props
    let { query } = this.props.location
    var page = query.page || 1
    query.hide_full = query.hide_full || false
    loadSearchFormData(query)
    fetchRides(this.context.router, page, per, query)
  }

  componentWillReceiveProps() {
    const { location: { query } } = this.props
    this.showChips(query)
  }

  handleSubmit(data) {
    const { loadSearchFormData, fetchRides, location: { query } } = this.props

    var newQuery = {}
    Object.keys(data).forEach((key) => {
      if (data[key] != undefined) {
        if (key == 'start_city' || key == 'destination_city') {
          _.merge(newQuery, { [key]: data[key].label || data[key] })
        } else {
          _.merge(newQuery, { [key]: data[key] })
        }
      }
    })
    var page = 1
    var extended = _.extend(query, newQuery)
    this.showChips(extended)
    loadSearchFormData(extended)
    fetchRides(this.context.router, page, per, extended)
  }

  handlePageClick(e) {
    const { fetchRides } = this.props
    let { query } = this.props.location
    var page = query.page || 1
    fetchRides(this.context.router, page, per, query)
  }

  showChips(query) {
    console.log('query.hide_full', query.hide_full);
    if (query.hide_full == "true") {
      this.setState({chipData: [
        {key: 'hide_full', label: 'Hide full'}
      ]})
    } else {
      this.setState({chipData: []})
    }
  }

  handleRequestDelete = (key) => {
    const { loadSearchFormData, fetchRides, location: { query } } = this.props
    delete query[key]
    loadSearchFormData(query)
    fetchRides(this.context.router, 1, per, query)
  }

  renderChip(data) {
    return (
      <Chip
        key={data.key}
        onRequestDelete={() => this.handleRequestDelete(data.key)}
        style={this.styles.chip}
      >
        {data.label}
      </Chip>
    )
  }

  render() {
    const { isFetching, rides, pagination, filters, currentUserId } = this.props
    var ridesMain, ridesFilter, ridesList, headingButton, ridesPagination, activeFilters
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

    activeFilters =
      <div style={this.styles.wrapper}>
        {this.state.chipData.map(this.renderChip, this)}
      </div>

    ridesMain =
      <Row>
        <Col xs={12}>
          <RidesFiltersContainer query={query} filters={filters}
            onSubmit={this.handleSubmit.bind(this)} />
          <RidesSearchItem query={query}
            onSubmit={this.handleSubmit.bind(this)} />
          {activeFilters}
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
