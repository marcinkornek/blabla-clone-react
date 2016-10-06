import React, { Component, PropTypes } from 'react'
import Router, { Link } from 'react-router'
import { Button, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import ReactPaginate from 'react-paginate'
import * as actions from '../../../actions/notifications'
import NotificationsItem from '../../../components/notifications/notifications-item/notifications-item'
import LoadingItem from '../../../components/shared/loading-item/loading-item'

const per = 10

class NotificationsIndex extends Component {
  static PropTypes = {
    isFetching: PropTypes.bool.isRequired,
    notifications: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired
  }

  componentDidMount() {
    const { isLoggedIn, fetchNotifications } = this.props

    if (isLoggedIn) {
      fetchNotifications()
    }
  }

  handlePageClick(e) {
    const { fetchNotifications } = this.props
    var page = e.selected + 1

    fetchNotifications(page, per)
  }

  markAsSeen(notificationId) {
    const { markNotificationAsSeen } = this.props

    markNotificationAsSeen(notificationId)
  }

  renderNotificationsMain() {
    return(
      <Col xs={12}>
        <div className='heading'>
          <div className='heading-title'>My Notifications</div>
        </div>
        {this.renderNotificationsList()}
      </Col>
    )
  }

  renderNotificationsList() {
    const { isFetching, notifications } = this.props

    if (isFetching) {
      return(<LoadingItem />)
    } else if (_.isEmpty(notifications)) {
      return('No notifications')
    } else {
      return(
        notifications.map((notification, i) =>
          <NotificationsItem
            key={i}
            notification={notification}
            markAsSeen={this.markAsSeen.bind(this)}
          />
        )
      )
    }
  }

  renderNotificationsPagination() {
    const { pagination } = this.props

    if (pagination.total_pages > 1) {
      return(
        <div>
          <ReactPaginate
            previousLabel={"previous"}
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
        <div className='notifications'>
          {this.renderNotificationsMain()}
          {this.renderNotificationsPagination()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.notifications.isFetching,
    notifications: state.notifications.items,
    pagination: state.notifications.pagination,
    isLoggedIn: state.session.isLoggedIn
  }
}

const mapDispatchToProps = {
  fetchNotifications: actions.fetchNotifications,
  markNotificationAsSeen: actions.markNotificationAsSeen
}


export default connect(mapStateToProps, mapDispatchToProps)(NotificationsIndex)
