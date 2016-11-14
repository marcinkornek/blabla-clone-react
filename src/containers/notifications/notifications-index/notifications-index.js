// utils
import React, { Component, PropTypes } from 'react'
import Router, { Link } from 'react-router'
import { connect } from 'react-redux'
import { Col } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'

// actions
import { fetchNotifications, markNotificationAsSeen } from '../../../actions/notifications'

// components
import { AsyncContent } from '../../../components/shared/async-content/async-content'
import { NotificationsItem } from '../../../components/notifications/notifications-item/notifications-item'

const per = 10

class NotificationsIndex extends Component {
  static propTypes = {
    notifications: PropTypes.array.isRequired,
    isStarted: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    pagination: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { isLoggedIn, fetchNotifications } = this.props

    if (isLoggedIn) fetchNotifications()
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
    const { isStarted, isFetching } = this.props

    return (
      <Col xs={12}>
        <div className='heading'>
          <div className='heading-title'>My Notifications</div>
        </div>
        <AsyncContent
          isFetching={isFetching || !isStarted}
        >
          {this.renderNotificationsList()}
        </AsyncContent>
      </Col>
    )
  }

  renderNotificationsList() {
    const { notifications } = this.props

    return (
      notifications.map((notification, i) =>
        <NotificationsItem
          key={i}
          notification={notification}
          markAsSeen={this.markAsSeen.bind(this)}
        />
      )
    )
  }

  renderNotificationsPagination() {
    const { pagination } = this.props

    if (pagination.total_pages > 1) {
      return (
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
    notifications: state.notifications.items,
    isStarted: state.notifications.isStarted,
    isFetching: state.notifications.isFetching,
    pagination: state.notifications.pagination,
    isLoggedIn: state.session.isLoggedIn,
  }
}

const mapDispatchToProps = {
  fetchNotifications,
  markNotificationAsSeen
}


export default connect(mapStateToProps, mapDispatchToProps)(NotificationsIndex)
