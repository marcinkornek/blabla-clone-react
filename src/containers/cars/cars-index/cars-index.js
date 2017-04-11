// utils
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Button, Col } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'

// actions
import { fetchCars } from '../../../actions/cars'

// components
import { AsyncContent } from '../../../components/shared/async-content/async-content'
import { CarsIndexItem } from '../../../components/cars/cars-index-item/cars-index-item'

const per = 10

class CarsIndex extends Component {
  static propTypes = {
    cars: PropTypes.array.isRequired,
    isStarted: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    pagination: PropTypes.object.isRequired,
    currentUserId: PropTypes.number,
  }

  componentDidMount() {
    const { fetchCars, currentUserId } = this.props

    if (currentUserId) fetchCars(currentUserId, 1, per)
  }

  handlePageClick(e) {
    const { fetchCars, currentUserId } = this.props
    const page = e.selected + 1

    fetchCars(currentUserId, page, per)
  }

  renderCarsMain() {
    const { isStarted, isFetching } = this.props

    return (
      <Col xs={12}>
        <div className='heading'>
          <div className='heading-title'>My cars</div>
          <div className='heading-button'>
            <Link to='/cars/new'><Button bsStyle='primary' bsSize='small'>New car</Button></Link>
          </div>
        </div>
        <AsyncContent
          isFetching={isFetching || !isStarted}
        >
          {this.renderCarsList()}
        </AsyncContent>
      </Col>
    )
  }

  renderCarsList() {
    const { cars, currentUserId } = this.props

    return (
      cars.map((car, i) =>
        <CarsIndexItem
          key={i}
          car={car}
          currentUserId={currentUserId}
        />
      )
    )
  }

  renderCarsPagination() {
    const { pagination } = this.props

    if (pagination.total_pages > 1) {
      return (
        <div>
          <ReactPaginate previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={<a href=''>...</a>}
            pageCount={pagination.total_pages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick.bind(this)}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
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
    cars: state.cars.items,
    isStarted: state.cars.isStarted,
    isFetching: state.cars.isFetching,
    pagination: state.cars.pagination,
    currentUserId: state.session.id,
  }
}

const mapDispatchToProps = {
  fetchCars
}

export default connect(mapStateToProps, mapDispatchToProps)(CarsIndex)
