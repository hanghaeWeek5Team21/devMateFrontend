import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import 'moment';
import axios from 'axios';
import { config } from '../../shared/config';
import { getCookie } from '../../shared/Cookie';

const SET_COMMENT = 'SET_COMMENT';
const ADD_COMMENT = 'ADD_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';

const LOADING = 'LOADING';

const setComment = createAction(SET_COMMENT, (post_id, comment_list) => ({
  post_id,
  comment_list,
}));
const addComment = createAction(ADD_COMMENT, (post_id, comment) => ({
  post_id,
  comment,
}));
const deleteComment = createAction(DELETE_COMMENT, (post_id) => ({
  post_id,
}));

const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState = {
  list: {},
  is_loading: false,
};

// 댓글 작성
const postComment = (comment, user_id) => {
  if (user_id === getCookie('user')) {
    window.alert("본인의 글에는 댓글을 작성할 수 없습니다.");
    return;
  }

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
      window.alert(response.data.msg);
    });
};

const deleteCommentDB = (comment_id) => {
  console.log(comment_id);
  axios
    .delete(
      config.api + '/api/comment/' + comment_id,
      { withCredentials: true }
    )
    .then((response) => {
      window.alert(response.data.msg);
      document.location.reload();
    });
};

const getCommentFB = (post_id) => {
  return function (dispatch, getState, { history }) { };
};

export default handleActions(
  {
    [SET_COMMENT]: (state, action) => produce(state, (draft) => { }),
    [ADD_COMMENT]: (state, action) => produce(state, (draft) => { }),
    [DELETE_COMMENT]: (state, action) => produce(state, (draft) => { }),
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
  deleteComment,
  deleteCommentDB,
};

export { actionCreators };
