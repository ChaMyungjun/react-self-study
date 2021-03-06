import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import * as postsAPI from "../lib/api/posts";
import { takeLatest } from "redux-saga/effects";

const [
  LIST_POST,
  LIST_POST_SUCCESS,
  LIST_POST_FAILURE,
] = createRequestActionTypes("posts/LIST_POST");

export const listPost = createAction(LIST_POST, ({ tag, username, page }) => ({
  tag,
  username,
  page,
}));

const listPostSaga = createRequestSaga(LIST_POST, postsAPI.listPosts);
export function* postsSaga() {
  yield takeLatest(LIST_POST, listPostSaga);
}

const initialState = {
  posts: null,
  error: null,
  lastPage: 1
};

const posts = handleActions(
  {
    [LIST_POST_SUCCESS]: (state, { payload: posts, meta: response }) => ({
      ...state,
      posts,
      lastPage: parseInt(response.headers['last-page'], 10)
    }),
    [LIST_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState
);

export default posts;
