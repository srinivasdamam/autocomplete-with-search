import * as Actions from '../actions/app-actions';

export function setLoading(loading = true) {
  return { type: Actions.FETCH_USERS_FAILED, loading };
}

export function fetchUsers() {
  return { type: Actions.FETCH_USERS };
}

export function fetchUsersSuccess(users = []) {
  return { type: Actions.FETCH_USERS_SUCCESS, users };
}

export function fetchUsersFailed(message = '') {
  return { type: Actions.FETCH_USERS_FAILED, message };
}
