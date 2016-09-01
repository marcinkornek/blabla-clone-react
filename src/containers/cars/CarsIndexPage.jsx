import React, { PropTypes }  from 'react'
import Router, { Link }      from 'react-router'
import { Button, Col }       from 'react-bootstrap'
import { connect }           from 'react-redux';
import Icon                  from 'react-fa'
import ReactPaginate         from 'react-paginate'

import * as actions          from '../../actions/cars';
import styles                from '../../stylesheets/users/Users'
import CarsItem              from '../../components/cars/CarsIndexPageItem'

const per = 10

export default class CarsIndexPage extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  componentDidMount() {
    const { dispatch, currentUserId } = this.props;
    if (currentUserId) {
      dispatch(actions.fetchCars(currentUserId, 1, per));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, currentUserId } = this.props;
    if (nextProps.currentUserId && currentUserId === undefined) {
      dispatch(actions.fetchCars(nextProps.currentUserId, 1, per))
    }
  }

  render() {
    const { isFetching, cars, currentUserId, pagination } = this.props

    var carsList, carsPagination
    if (isFetching || currentUserId === undefined) {
      carsList =
        <div>
          <Icon spin name="spinner" />
          Fetching..
        </div>
    } else {
      if (_.isEmpty(cars)) {
        carsList = 'No cars'
      } else {
        carsList = cars.map((car, i) =>
          <CarsItem car={car} currentUserId={currentUserId} key={i} />
        )
      }
    }

    var carsMain =
      <Col xs={12}>
        <div className='heading'>
          <div className='heading-title'>My cars</div>
          <div className='heading-button'>
            <Link to='/cars/new'><Button bsStyle='primary' bsSize='small'>New car</Button></Link>
          </div>
        </div>
        {carsList}
      </Col>

    if (pagination.total_pages > 1) {
      carsPagination =
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
        <div className='cars'>
          {carsMain}
          {carsPagination}
        </div>
      </div>
    )
  }

  handlePageClick(e) {
    const { dispatch, currentUserId } = this.props;
    var page = e.selected + 1;
    dispatch(actions.fetchCars(currentUserId, page, per))
  }
}

CarsIndexPage.PropTypes = {
  cars: PropTypes.array.isRequired
}

function select(state) {
  return {
    isFetching:    state.cars.isFetching,
    cars:          state.cars.cars,
    pagination:    state.cars.pagination,
    currentUserId: state.session.user.id
  };
}

export default connect(select)(CarsIndexPage);
