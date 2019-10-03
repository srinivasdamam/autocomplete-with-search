import {
  FETCH_USERS_FAILED,
  FETCH_USERS_SUCCESS,
} from '../actions/app-actions';

const initialState = {
  loading: true,
  users: [],
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.users,
      };
    case FETCH_USERS_FAILED:
      return { ...state, loading: false, error: action.message };
    default:
      return state;
  }
};
