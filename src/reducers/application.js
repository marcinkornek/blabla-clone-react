import { LOGGED_IN } from '../constants/ActionTypes';
import { combineReducers } from 'redux';

const initialState = [{
  email: undefined,
  accessToken: undefined,
  id: 0
}];

export default function sessions(state = initialState, action) {
  switch (action.type) {
  case LOGGED_IN:
    console.log(action);
    return [{
      id: state.length,
      email: 'aaaaa',
      accessToken: '12121212'
    }, ...state];

  // case DELETE_TODO:
  //   return state.filter(todo =>
  //     todo.id !== action.id
  //   );

  // case EDIT_TODO:
  //   return state.map(todo =>
  //     todo.id === action.id ?
  //       Object.assign({}, todo, { text: action.text }) :
  //       todo
  //   );

  // case COMPLETE_TODO:
  //   return state.map(todo =>
  //     todo.id === action.id ?
  //       Object.assign({}, todo, { completed: !todo.completed }) :
  //       todo
  //   );

  // case COMPLETE_ALL:
  //   const areAllMarked = state.every(todo => todo.completed);
  //   return state.map(todo => Object.assign({}, todo, {
  //     completed: !areAllMarked
  //   }));

  // case CLEAR_COMPLETED:
  //   return state.filter(todo => todo.completed === false);

  default:
    return state;
  }
}
