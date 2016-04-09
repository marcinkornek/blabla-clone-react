import React, { PropTypes }  from 'react'
import Router, { Link }      from 'react-router'
import { Button, Col }       from 'react-bootstrap'
import { connect }           from 'react-redux';
import Icon                  from 'react-fa'
import ReactPaginate         from 'react-paginate'

import * as actions          from '../../actions/rides';
import styles                from '../../stylesheets/rides/Rides'
import sharedStyles          from '../../stylesheets/shared/Shared'
import RidesItem             from '../../components/rides/RidesIndexPageItem'

export default class RidesIndexPage extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  componentDidMount() {
    const { dispatch, session, currentUserId } = this.props;
    dispatch(actions.fetchRides(session))
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, currentUserId } = this.props;
    if (nextProps.currentUserId && currentUserId === undefined) {
      dispatch(actions.fetchRides(nextProps.session))
    }
  }

  render() {
    const { isFetching, rides, pagination, currentUserId } = this.props
    var ridesMain, ridesSearch, ridesList, headingButton, ridesPagination

    if (isFetching) {
      ridesList =
        <div>
          <Icon spin name="spinner" />
          Fetching..
        </div>
    } else {
      if (rides) {
        ridesList = rides.map((ride, i) =>
          <RidesItem ride={ride} key={i} />
        )
      } else {
        ridesList = 'No rides'
      }
    }

    if (currentUserId) {
      headingButton =
        <div className='heading__button'>
          <Link to='/rides/new'><Button bsStyle='primary'>New ride</Button></Link>
        </div>
    }

    ridesSearch =
      <Col xs={2}>
        Search
      </Col>

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

    ridesMain =
      <Col xs={10}>
        <div className='heading'>
          <div className='heading__title'>Rides</div>
          {headingButton}
        </div>
        {ridesList}
      </Col>

    return (
      <div className='show-grid'>
        <div className='rides'>
          {ridesSearch}
          {ridesMain}
          {ridesPagination}
        </div>
      </div>
    )
  }

  handlePageClick(e) {
    const { dispatch, session } = this.props;
    var page = e.selected + 1;
    dispatch(actions.fetchRides(session, page))
  }
}

RidesIndexPage.PropTypes = {
  rides: PropTypes.array.isRequired
}

function select(state) {
  return {
    isFetching:     state.rides.isFetching,
    rides:          state.rides.rides,
    pagination:     state.rides.pagination,
    currentUserId:  state.session.user.id,
    session:        state.session.user
  };
}

export default connect(select)(RidesIndexPage);
