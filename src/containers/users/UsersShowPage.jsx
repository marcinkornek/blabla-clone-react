import React, { PropTypes }  from 'react'
import { connect }           from 'react-redux';
import Bootstrap             from 'react-bootstrap'
import Timestamp             from 'react-time'
import Icon                  from 'react-fa'
import styles                from '../../stylesheets/users/Users'
import * as actions          from '../../actions/users';
import CarsItem              from '../../components/users/cars/CarsIndexPageItem'

export default class UsersShowPage extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  componentDidMount() {
    var userId = this.props.params.userId
    const { dispatch } = this.props;
    dispatch(actions.fetchUser(userId));
  }

  render() {
    const { isFetching, user, currentUserId } = this.props

    var userSidebarActivity =
      <div className='sidebar'>
        <div className='sidebar__title'>
          Activity
        </div>
        <div className='sidebar__details'>
          <div>
            <Icon name='clock-o' className='sidebar__details-icon'/>
              Last visit:
            <Timestamp value={user.last_visit} format="DD MMM YYYY" />
          </div>
          <div>
            <Icon name='calendar-times-o' className='sidebar__details-icon'/>
              Joined:
            <Timestamp value={user.created_at} format="DD MMM YYYY" />
          </div>
        </div>

      </div>

    var carsList
    if (user.cars) {
      carsList = user.cars.map((car, i) =>
        <CarsItem car={car} currentUserId={currentUserId} key={i} />
      )
    } else {
      carsList = 'No cars'
    }

    var userSidebarCar =
      <div className='sidebar'>
        <div className='sidebar__title'>
          Car
        </div>
        <div className='sidebar__details'>
          {carsList}
        </div>
      </div>

    var userMainInfoAvatar =
      <div className='main-info__avatar'>
        <img src={user.avatar}/>
      </div>

    if (user.age) {
      var age =
      <div className='main-info__details-age'>({user.age} years)</div>
    }

    var userMainInfoDetails =
      <div className='main-info__details'>
        <div className='main-info__details-name'>{user.full_name}</div>
        {age}
        <div className='main-info__details-email'>{user.email}</div>
      </div>

    var userSidebar =
      <Bootstrap.Col xs={3} className='sidebar__container'>
        {userSidebarActivity}
        {userSidebarCar}
      </Bootstrap.Col>

    var userMainInfo =
      <Bootstrap.Col xs={7} className='main-info__container'>
        {userMainInfoAvatar}
        {userMainInfoDetails}
      </Bootstrap.Col>

    var mainContent
    if (isFetching === true) {
      mainContent =
        <div>
          <Icon spin name="spinner" />
          Fetching...
        </div>
    } else {
      mainContent =
        <Bootstrap.Grid className='user'>
          {userSidebar}
          {userMainInfo}
        </Bootstrap.Grid>
    }

    return (
      <div>
        {mainContent}
      </div>
    )
  }
}

UsersShowPage.PropTypes = {
  user: PropTypes.array.isRequired
}

function select(state) {
  console.log('state', state.user['user'])
  return {
    isFetching:    state.user['isFetching'],
    user:          state.user['user'],
    currentUserId: state.session.user.id
  };
}

export default connect(select)(UsersShowPage);
