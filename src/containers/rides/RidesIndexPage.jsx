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

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  }
}

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
  }

  componentDidMount() {
    const { loadSearchFormData, fetchRides, location: { query } } = this.props
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
    var page = 1

    Object.keys(data).forEach((key) => {
      if (data[key] != undefined) {
        if (key == 'start_city' || key == 'destination_city') {
          _.merge(newQuery, { [key]: data[key].label || data[key] })
        } else {
          _.merge(newQuery, { [key]: data[key] })
        }
      }
    })
    var extended = _.extend(query, newQuery)
    this.showChips(extended)
    loadSearchFormData(extended)
    fetchRides(this.context.router, page, per, extended)
  }

  handlePageClick(e) {
    const { fetchRides, location: { query } } = this.props
    var page = query.page || 1

    fetchRides(this.context.router, page, per, query)
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
    fetchRides(this.context.router, 1, per, query)
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
    const { rides, isFetching } = this.props

    if (isFetching) {
      return(<LoadingItem />)
    } else  if (_.isEmpty(rides)) {
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
        <div className='heading__button'>
          <Link to='/rides/new'><Button bsStyle='primary'>New ride</Button></Link>
        </div>
      )
    }
  }

  renderActiveFilters() {
    return(
      <div style={styles.wrapper}>
        {this.state.chipData.map(this.renderChip, this)}
      </div>
    )
  }

  renderRidesMain() {
    const { filters, pagination, location: { query } } = this.props

    return(
      <Row>
        <Col xs={12}>
          <RidesFiltersContainer
            query={query}
            filters={filters}
            onSubmit={this.handleSubmit.bind(this)}
          />
          <RidesSearchItem
            query={query}
            onSubmit={this.handleSubmit.bind(this)}
          />
          {this.renderActiveFilters()}
          <div className='heading'>
            <div className='heading__title'>{pagination.total_count} Rides</div>
            {this.renderHeadingButton()}
          </div>
          {this.renderRidesList()}
        </Col>
      </Row>
    )
  }

  renderRidesPagination() {
    const { pagination, location: { query } } = this.props

    if (pagination.total_pages > 1) {
      return(
        <div>
          <ReactPaginate previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={<a href="">...</a>}
            pageNum={pagination.total_pages}
            initialSelected={(query.page || 1) - 1}
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
