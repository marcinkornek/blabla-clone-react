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
import { fetchRides, loadSearchFormData } from '../../../actions/rides'

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
    filters: PropTypes.object.isRequired,
    currentUserId: PropTypes.number,
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

  renderActiveFilters() {
    return (
      <div style={styles.wrapper}>
        {this.state.chipData.map(this.renderChip, this)}
      </div>
    )
  }

  renderRidesMain() {
    const { filters, pagination, location: { query }, isFetching, isStarted } = this.props

    return (
      <Row>
        <Col xs={12}>
          <RideFilters
            query={query}
            filters={filters}
            onSubmit={this.handleSubmit}
          />
          <RideSearch
            query={query}
            onSubmit={this.handleSubmit}
          />
          {this.renderActiveFilters()}
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
    filters: state.rides.filters,
    currentUserId: state.session.id,
  }
}

const mapDispatchToProps = {
  loadSearchFormData,
  fetchRides,
}

export default connect(mapStateToProps, mapDispatchToProps)(RidesIndex)
