import React, { PropTypes }  from 'react'
import Router, { Link }      from 'react-router'
import { Col }             from 'react-bootstrap'
import { connect }           from 'react-redux';
import Icon                  from 'react-fa'
import ReactPaginate         from 'react-paginate'

import * as actions          from '../../actions/rides';
import styles                from '../../stylesheets/rides/Rides'
import sharedStyles          from '../../stylesheets/shared/Shared'
import RidesItem             from '../../components/rides/RidesIndexPageItem'

const per = 10

export default class RidesPassengerIndexPage extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  componentDidMount() {
    const { dispatch, currentUserId, session } = this.props;
    if (currentUserId) {
      dispatch(actions.fetchRidesAsPassenger(currentUserId, session, 1, per))
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, currentUserId } = this.props;
    if (nextProps.currentUserId && currentUserId === undefined) {
      console.log(nextProps.currentUserId);
      dispatch(actions.fetchRidesAsPassenger(nextProps.currentUserId, nextProps.session, 1, per))
    }
  }

  render() {
    const { isFetching, rides, pagination, currentUserId } = this.props
    var ridesMain, ridesList, ridesPagination

    if (isFetching || currentUserId === undefined) {
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

    ridesMain =
      <Col xs={10}>
        <div className='account__heading'>
          <div className='account__heading-title'>My rides as passenger</div>
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
    const { dispatch, currentUserId, session } = this.props;
    var page = e.selected + 1;
    dispatch(actions.fetchRidesAsPassenger(currentUserId, session, page, per))
  }
}

RidesPassengerIndexPage.PropTypes = {
  rides: PropTypes.array.isRequired
}

function select(state) {
  return {
    isFetching:    state.ridesPassenger.isFetching,
    rides:         state.ridesPassenger.rides,
    pagination:    state.ridesPassenger.pagination,
    currentUserId: state.session.user.id,
    session:       state.session.user
  };
}

export default connect(select)(RidesPassengerIndexPage);
