import React, { PropTypes }  from 'react'
import Router, { Link }      from 'react-router'
import Button                from 'react-bootstrap/lib/Button'
import Row                   from 'react-bootstrap/lib/Row'
import Col                   from 'react-bootstrap/lib/Col'
import { connect }           from 'react-redux';
import Icon                  from 'react-fa'
import ReactPaginate         from 'react-paginate'

import * as actions          from '../../actions/rides';
import styles                from '../../stylesheets/rides/Rides'
import sharedStyles          from '../../stylesheets/shared/Shared'
import RidesItem             from '../../components/rides/RidesIndexPageItem'
import RidesSearchItem       from '../../components/rides/RidesSearchItem'
import RidesFilterItem       from '../../components/rides/RidesFilterItem'

const per = 10

export default class RidesIndexPage extends React.Component {
  componentDidMount() {
    const { dispatch, session, currentUserId } = this.props;
    let { query } = this.props.location
    var page = query.page || 1
    query.hide_full = query.hide_full || false
    dispatch(actions.loadSearchFormData(query))
    dispatch(actions.fetchRides(this.context.router, session, page, per, query))
  }

  handleSubmit(data) {
    var query = {}
    Object.keys(data).forEach((key) => {
      if (data[key] != undefined) {
        if (key == 'start_city' || key == 'destination_city') {
          _.merge(query, { [key]: data[key].label || data[key] })
        } else {
          _.merge(query, { [key]: data[key] })
        }
      }
    });
    const { dispatch, session } = this.props;
    var query_from_location = this.props.location.query
    var page = 1
    var extended = _.extend(query_from_location, query)
    dispatch(actions.loadSearchFormData(extended))
    dispatch(actions.fetchRides(this.context.router, session, page, per, extended))
  }

  render() {
    const { isFetching, rides, pagination, filters, currentUserId, dispatch, session } = this.props
    var ridesMain, ridesFilter, ridesList, headingButton, ridesPagination
    let { query } = this.props.location
    var page = (parseInt(query.page, 10) || 1) - 1

    if (isFetching) {
      ridesList =
        <div>
          <Icon spin name="spinner" />
          Fetching..
        </div>
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

    <RidesFilterItem query={query} filters={filters}
      onSubmit={this.handleSubmit.bind(this)} />

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
    const { dispatch, session } = this.props;
    let { query } = this.props.location
    var page = query.page || 1
    dispatch(actions.fetchRides(this.context.router, session, page, per, query))
  }
}

RidesIndexPage.PropTypes = {
  rides: PropTypes.array.isRequired
}

RidesIndexPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

function select(state) {
  return {
    isFetching:     state.rides.isFetching,
    rides:          state.rides.rides,
    pagination:     state.rides.pagination,
    filters:        state.rides.filters,
    currentUserId:  state.session.user.id,
    session:        state.session.user
  };
}

export default connect(select)(RidesIndexPage);
