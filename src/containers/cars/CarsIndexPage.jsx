import React, { Component, PropTypes } from 'react'
import Router, { Link } from 'react-router'
import { Button, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import Icon from 'react-fa'
import ReactPaginate from 'react-paginate'
import * as actions from '../../actions/cars'
import styles from '../../stylesheets/users/Users'
import CarsItem from '../../components/cars/CarsIndexPageItem'

const per = 10

class CarsIndexPage extends Component {
  static PropTypes = {
    isFetching: PropTypes.bool.isRequired,
    cars: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired,
    currentUserId: PropTypes.number
  }

  componentDidMount() {
    const { fetchCars, currentUserId } = this.props
    if (currentUserId) {
      fetchCars(currentUserId, 1, per)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { fetchCars, currentUserId } = this.props
    if (nextProps.currentUserId && currentUserId === undefined) {
      fetchCars(nextProps.currentUserId, 1, per)
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
    const { fetchCars, currentUserId } = this.props
    var page = e.selected + 1
    fetchCars(currentUserId, page, per)
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.cars.isFetching,
    cars: state.cars.items,
    pagination: state.cars.pagination,
    currentUserId: state.session.id
  }
}

const mapDispatchToProps = {
  fetchCars: actions.fetchCars
}


export default connect(mapStateToProps, mapDispatchToProps)(CarsIndexPage)
