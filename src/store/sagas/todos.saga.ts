import { call, put, takeLatest } from 'redux-saga/effects';
import { Post } from '../../models/models.interface';
import { groupPostsByWeek } from '../group-by.service';

export const api = {
  getTodos() {
    return fetch('http://localhost:3001/api')
      .then((response) => response.json())
      .then((response) => {
        const withDate = response.map((post: Post) => ({
          ...post,
          date: new Date(parseInt(post.time)).toLocaleDateString('en-GB'),
        }));
        return groupPostsByWeek(withDate);
      });
  },
};
export const SET_INPUT_VALUE = '[Tree] Set input value';
export const SET_POSTS = '[Tree] Set grouped posts';
export const TODOS_FETCH_SUCCEEDED = 'TODOS_FETCH_SUCCEEDED';
export const TODOS_FETCH_REQUESTED = 'TODOS_FETCH_REQUESTED';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchTodos(action: any) {
  try {
    const posts: Post[] = yield call(api.getTodos);
    yield put({ type: TODOS_FETCH_SUCCEEDED, payload: posts });
  } catch (e) {
    console.log(e);
    yield put({ type: 'TODOS_FETCH_FAILED', message: e.message });
  }
}

/*
  Starts fetchUser on each dispatched `TODOS_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* todosSaga() {
  yield takeLatest(TODOS_FETCH_REQUESTED, fetchTodos);
}

export default todosSaga;
