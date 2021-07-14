import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import 'moment';
import moment from 'moment';
import axios from 'axios';
import { config } from '../../shared/config';

const SET_COMMENT = 'SET_COMMENT';
const ADD_COMMENT = 'ADD_COMMENT';

const LOADING = 'LOADING';

const setComment = createAction(SET_COMMENT, (post_id, comment_list) => ({
  post_id,
  comment_list,
}));
const addComment = createAction(ADD_COMMENT, (post_id, comment) => ({
  post_id,
  comment,
}));

const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState = {
  list: {},
  is_loading: false,
};

// 댓글 작성
const postComment = (comment, user_id) => {
  console.log(comment);
  console.log(user_id);
  axios
    .post(
      config.api + '/api/comment',
      {
        user_id: user_id,
        contents: comment,
      },
      { withCredentials: true }
    )
    .then((response) => {
      console.log(response);
      console.log(response.data);
    });
};

const getCommentFB = (post_id) => {
  return function (dispatch, getState, { history }) { };
};

export default handleActions(
  {
    [SET_COMMENT]: (state, action) => produce(state, (draft) => { }),
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        // console.log(action.payload.post);
        // const new_comment = action.payload.post;
        // draft.list.unshift(new_comment);
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);

const actionCreators = {
  getCommentFB,
  setComment,
  addComment,
  postComment,
};

export { actionCreators };
