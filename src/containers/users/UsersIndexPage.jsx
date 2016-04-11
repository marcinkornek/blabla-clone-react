import React, { PropTypes }  from 'react'
import { connect }           from 'react-redux';
import Bootstrap             from 'react-bootstrap'
import ReactPaginate         from 'react-paginate'

import * as actions          from '../../actions/users';
import styles                from '../../stylesheets/users/Users'
import UsersItem             from '../../components/users/UsersIndexPageItem'

const per = 10

export default class UsersIndexPage extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actions.fetchUsers(1, per));
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
      <div className='users'>
        {usersList}
        <div>{ridesPagination}</div>
      </div>
    )
  }

  handlePageClick(e) {
    const { dispatch } = this.props;
    var page = e.selected + 1;
    dispatch(actions.fetchUsers(page, per))
  }
}

UsersIndexPage.PropTypes = {
  users: PropTypes.array.isRequired
}

function select(state) {
  return {
    isFetching: state.users.isFetching,
    users:      state.users.users,
    pagination: state.users.pagination
  };
}

export default connect(select)(UsersIndexPage);
