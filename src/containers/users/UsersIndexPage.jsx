import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate'
import * as actions from '../../actions/users';
import styles from '../../stylesheets/users/Users'
import UsersItem from '../../components/users/UsersIndexPageItem'
import List from 'material-ui/List/List'

const per = 10

class UsersIndexPage extends Component {
  static PropTypes = {
    isFetching: PropTypes.bool.isRequired,
    users: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired
  }

  componentDidMount() {
    const { fetchUsers } = this.props;
    fetchUsers(1, per)
  }

  render() {
    const { isFetching, users, pagination } = this.props

    var usersList, ridesPagination
    if (users) {
      usersList = users.map((user, i) =>
        <UsersItem user={user} key={i} />
      )
    } else {
      usersList = 'No users'
    }

    if (pagination.total_pages > 1) {
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
    }

    return (
      <List className='users'>
        {usersList}
        <div>{ridesPagination}</div>
      </List>
    )
  }

  handlePageClick(e) {
    const { fetchUsers } = this.props
    var page = e.selected + 1
    fetchUsers(page, per)
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.users.isFetching,
    users: state.users.items,
    pagination: state.users.pagination
  }
}

const mapDispatchToProps = {
  fetchUsers: actions.fetchUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersIndexPage)
