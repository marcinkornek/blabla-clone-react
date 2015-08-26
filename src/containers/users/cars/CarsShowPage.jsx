import React, { PropTypes }  from 'react'
import { connect }           from 'react-redux';
import Bootstrap             from 'react-bootstrap'
import { Link }              from 'react-router';
import Timestamp             from 'react-time'
import Icon                  from 'react-fa'
import styles                from '../../../stylesheets/users/Users'
import * as actions          from '../../../actions/cars';

export default class CarsShowPage extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  componentDidMount() {
    var carId = this.props.params.carId
    const { dispatch } = this.props;
    dispatch(actions.fetchCar(carId));
  }

  render() {
    const { isFetching, car, currentUserId } = this.props

    const tooltipComfort = (
      <Bootstrap.Tooltip>{this.props.car.comfort}</Bootstrap.Tooltip>
    );

    const tooltipEdit = (
      <Bootstrap.Tooltip>Edit</Bootstrap.Tooltip>
    );

    const tooltipDelete = (
      <Bootstrap.Tooltip>Delete</Bootstrap.Tooltip>
    );

    var starsIcons = []
    for (var i = 0; i < this.props.car.comfort_stars; i++) {
      starsIcons.push(<Icon name='star' />);
    }

    var stars =
      <Bootstrap.OverlayTrigger placement='top' overlay={tooltipComfort} delayShow={300} delayHide={150}>
        <div className='car-details__stars'>
          {starsIcons}
        </div>
      </Bootstrap.OverlayTrigger>

    var carMainInfoPhoto =
      <div className='main-info__photo'>
        car photo
      </div>

    var actions
    if (currentUserId === this.props.car.owner_id) {
      actions =
        <div className='car-actions'>
          <Link to={`/cars/${this.props.car.id}/edit`}>
            <Bootstrap.OverlayTrigger placement='top' overlay={tooltipEdit} delayShow={300} delayHide={150}>
              <Icon name='edit' />
            </Bootstrap.OverlayTrigger>
          </Link>
          <Bootstrap.OverlayTrigger placement='top' overlay={tooltipDelete} delayShow={300} delayHide={150}>
            <Icon name='trash' />
          </Bootstrap.OverlayTrigger>
        </div>
    }

    var carMainInfoDetails =
      <div className='main-info__details'>
        <div className='car-details'>
          <div className='car-details__name'>{car.full_name}</div>
          <div className='car-details__places'>{this.props.car.places_full}</div>
          {stars}
          <div className='car-details__year'>{car.production_year}</div>
          <div className='car-details__color'>{car.color}</div>
          <div className='car-details__category'>{car.category}</div>
        </div>
        {actions}
      </div>

    return (
      <Bootstrap.Grid className='car'>
        {carMainInfoPhoto}
        {carMainInfoDetails}
      </Bootstrap.Grid>
    )
  }
}

CarsShowPage.PropTypes = {
  car: PropTypes.array.isRequired
}

function select(state) {
  return {
    isFetching:    state.car['isFetching'],
    car:           state.car['car'],
    currentUserId: state.session.user.id
  };
}

export default connect(select)(CarsShowPage);
