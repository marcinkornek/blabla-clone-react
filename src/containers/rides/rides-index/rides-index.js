// utils
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { autobind } from 'core-decorators'
import { Link } from 'react-router'
import ReactPaginate from 'react-paginate'
import Button from 'react-bootstrap/lib/Button'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Chip from 'material-ui/Chip'

// actions
import { fetchRides, loadSearchFormData, updateRidesSearch, updateRidesFilters } from '../../../actions/rides'

// components
import { AsyncContent } from '../../../components/shared/async-content/async-content'
import { RidesIndexItem } from '../../../components/rides/rides-index-item/rides-index-item'
import RideSearch from '../../../components/rides/ride-search/ride-search'
import RideFilters from '../../../components/rides/ride-filters/ride-filters'

const per = 10

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  }
}

export class RidesIndex extends Component {
  static propTypes = {
    rides: PropTypes.array.isRequired,
    isStarted: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    pagination: PropTypes.object.isRequired,
    currentUserId: PropTypes.number,
    filters: PropTypes.object.isRequired,
    search: PropTypes.object.isRequired,
  }

  state = {
    chipData: []
  }

  componentDidMount() {
    const { loadSearchFormData, fetchRides, location: { query } } = this.props
    var page = query.page || 1

    query.hide_full = query.hide_full || false
    loadSearchFormData(query)
    fetchRides(page, per, query)
  }

  componentWillReceiveProps() {
    const { location: { query } } = this.props

    this.showChips(query)
  }

  @autobind
  handleSubmit(data) {
    const { loadSearchFormData, fetchRides, location: { query } } = this.props
    var newQuery = {}
    var page = 1

    Object.keys(data).forEach((key) => {
      if (data[key] != undefined) {
        if (key == 'start_location' || key == 'destination_location') {
          _.merge(newQuery, { [key]: data[key].label || data[key] })
        } else {
          _.merge(newQuery, { [key]: data[key] })
        }
      }
    })
    var extended = _.extend(query, newQuery)
    this.showChips(extended)
    loadSearchFormData(extended)
    fetchRides(page, per, extended)
  }

  @autobind
  handlePageClick(e) {
    const { fetchRides, location: { query } } = this.props
    var page = query.page || 1

    fetchRides(page, per, query)
  }

  showChips(query) {
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
    fetchRides(1, per, query)
  }

  renderChip(data) {
    return (
      <Chip
        key={data.key}
        onRequestDelete={() => this.handleRequestDelete(data.key)}
        style={styles.chip}
      >
        {data.label}
      </Chip>
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

  renderHeadingButton() {
    const { currentUserId } = this.props

    if (currentUserId) {
      return (
        <div className='heading__button'>
          <Link to='/rides/new'><Button bsStyle='primary'>New ride</Button></Link>
        </div>
      )
    }
  }

  renderRidesSearch() {
    const { search } = this.props;

    return (
      <RideSearch
        onSubmit={this.searchRides.bind(this)}
        search={search}
      />
    )
  }

  renderRidesFilters() {
    const { filters } = this.props;

    return (
      <RideFilters
        onSubmit={this.filterRides.bind(this)}
        filters={filters}
      />
    )
  }

  renderRidesMain() {
    const { pagination, location: { query }, isFetching, isStarted } = this.props

    return (
      <Row>
        <Col xs={12}>
          {this.renderRidesFilters()}
          {this.renderRidesSearch()}
          <div className='heading'>
            <div className='heading__title'>{pagination.total_count} Rides</div>
            {this.renderHeadingButton()}
          </div>
          <AsyncContent
            isFetching={isFetching || !isStarted}
          >
            {this.renderRidesList()}
          </AsyncContent>
        </Col>
      </Row>
    )
  }

  renderRidesPagination() {
    const { pagination, location: { query } } = this.props

    if (pagination.total_pages > 1) {
      return (
        <div>
          <ReactPaginate previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={<a href="">...</a>}
            pageNum={pagination.total_pages}
            initialSelected={(query.page || 1) - 1}
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

  filterRides(data) {
    const { updateRidesFilters, fetchRides } = this.props;

    updateRidesFilters(data)
    fetchRides(1, per)
  }

  searchRides(data) {
    const { updateRidesSearch, fetchRides } = this.props;

    let search = { hide_full: data.hide_full }
    if (data.start_location) {
      search.start_location = {
        address: data.start_location.label,
        latitude: data.start_location.location.lat,
        longitude: data.start_location.location.lng,
      }
    }
    if (data.destination_location) {
      search.destination_location = {
        address: data.destination_location.label,
        latitude: data.destination_location.location.lat,
        longitude: data.destination_location.location.lng,
      }
    }
    updateRidesSearch(search)
    fetchRides(1, per)
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
    rides: state.rides.items,
    isStarted: state.rides.isStarted,
    isFetching: state.rides.isFetching,
    pagination: state.rides.pagination,
    currentUserId: state.session.id,
    filters: state.ridesFilters.filters,
    search: state.ridesFilters.search,
  }
}

const mapDispatchToProps = {
  loadSearchFormData,
  fetchRides,
  updateRidesSearch,
  updateRidesFilters,
}

export default connect(mapStateToProps, mapDispatchToProps)(RidesIndex)
