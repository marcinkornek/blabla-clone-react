import React, { Component, PropTypes } from 'react'
import Router, { Link } from 'react-router'
import { Button, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import ReactPaginate from 'react-paginate'
import * as actions from '../../../actions/cars'
import CarsIndexItem from '../../../components/cars/cars-index-item/cars-index-item'
import LoadingItem from '../../../components/shared/loading-item/loading-item'

const per = 10

class CarsIndex extends Component {
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

  handlePageClick(e) {
    const { fetchCars, currentUserId } = this.props
    var page = e.selected + 1

    fetchCars(currentUserId, page, per)
  }

  renderCarsMain() {
    return(
      <Col xs={12}>
        <div className='heading'>
          <div className='heading-title'>My cars</div>
          <div className='heading-button'>
            <Link to='/cars/new'><Button bsStyle='primary' bsSize='small'>New car</Button></Link>
          </div>
        </div>
        {this.renderCarsList()}
      </Col>
    )
  }

  renderCarsList() {
    const { isFetching, cars, currentUserId } = this.props

    if (isFetching) {
      return(<LoadingItem />)
    } else if (_.isEmpty(cars)) {
      return('No cars')
    } else {
      return(
        cars.map((car, i) =>
          <CarsIndexItem
            key={i}
            car={car}
            currentUserId={currentUserId}
          />
        )
      )
    }
  }

  renderCarsPagination() {
    const { pagination } = this.props

    if (pagination.total_pages > 1) {
      return(
        <div>
          <ReactPaginate previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={<a href="">...</a>}
            pageNum={pagination.total_pages}
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
        <div className='cars'>
          {this.renderCarsMain()}
          {this.renderCarsPagination()}
        </div>
      </div>
    )
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


export default connect(mapStateToProps, mapDispatchToProps)(CarsIndex)
