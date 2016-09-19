import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate'
import * as actions from '../../actions/users';
import UsersItem from '../../components/users/UsersIndexPageItem'
import List from 'material-ui/List/List'
import LoadingItem from '../../components/shared/LoadingItem'

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

  handlePageClick(e) {
    const { fetchUsers } = this.props
    var page = e.selected + 1

    fetchUsers(page, per)
  }

  renderUsersList() {
    const { isFetching, users } = this.props

    if (isFetching) {
      return(<LoadingItem />)
    } else if (_.isEmpty(users)) {
      return('No users')
    } else {
      return(
        users.map((user, i) =>
          <UsersItem
            key={i}
            user={user}
          />
        )
      )
    }
  }

  renderRidesPagination() {
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
    return(
      <List className='users'>
        {this.renderUsersList()}
        {this.renderRidesPagination()}
      </List>
    )
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
