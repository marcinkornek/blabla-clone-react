// utils
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { autobind } from 'core-decorators'
import { Link } from 'react-router'
import { Col } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'

// actions
import { fetchNotifications, markNotificationAsSeen } from '../../../actions/notifications'

// components
import { AsyncContent } from '../../../components/shared/async-content/async-content'
import { NotificationsItem } from '../../../components/notifications/notifications-item/notifications-item'

const per = 10

export class NotificationsIndex extends Component {
  static propTypes = {
    notifications: PropTypes.array.isRequired,
    isStarted: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    pagination: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { isAuthenticated, fetchNotifications } = this.props

    if (isAuthenticated) fetchNotifications()
  }

  @autobind
  handlePageClick(e) {
    const { fetchNotifications } = this.props
    var page = e.selected + 1

    fetchNotifications(page, per)
  }

  @autobind
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
          markAsSeen={this.markAsSeen}
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
            clickCallback={this.handlePageClick}
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
    isAuthenticated: state.session.isAuthenticated,
  }
}

const mapDispatchToProps = {
  fetchNotifications,
  markNotificationAsSeen
}


export default connect(mapStateToProps, mapDispatchToProps)(NotificationsIndex)
