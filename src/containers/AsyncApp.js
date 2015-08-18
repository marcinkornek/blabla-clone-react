// import React, { Component, PropTypes } from 'react';
// import { connect } from 'react-redux';
// import * as actions from '../actions/users';
// import UsersPage from '../components/javascripts/users/UsersPage';

// class AsyncApp extends Component {
//   constructor(props) {
//     super(props);
//     const { dispatch } = this.props;
//   }

//   componentDidMount() {
//     dispatch(actions.fetchUsers())
//   }

//   // componentWillReceiveProps(nextProps) {
//   //   const { dispatch } = nextProps;
//   //   dispatch(fetchUsers());
//   // }

//   render () {
//     const { users, isFetching, lastUpdated } = this.props;
//     return (
//       <div>
//         <UsersPage />
//       </div>
//     );
//   }
// }

// AsyncApp.propTypes = {
//   // users: PropTypes.array.isRequired,
//   // isFetching: PropTypes.bool.isRequired,
//   lastUpdated: PropTypes.number,
//   dispatch: PropTypes.func.isRequired
// };

// function mapDispatchToProps(dispatch) {
//   return {
//     onIncrement: () => dispatch(fetchUsers())
//   };
// }

// export default connect(
//   mapDispatchToProps
// )(AsyncApp);
