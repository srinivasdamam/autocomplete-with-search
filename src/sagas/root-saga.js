import { call, put, all, takeLatest } from 'redux-saga/effects';
import * as Api from '../api';
import * as Actions from '../actions/app-actions';
import { fetchUsersSuccess, fetchUsersFailed } from "../action-creators/app-action-creators";

function* fetchUsers() {
    try {
        const response = yield call(Api.fetchUsers);
        const users = response.data;
        yield put(fetchUsersSuccess(users));
    } catch (error) {
        yield put(fetchUsersFailed(error.message));
    }
}

function* rootSaga() {
    yield all([
        takeLatest(Actions.FETCH_USERS, fetchUsers)
    ])
}

export default rootSaga;