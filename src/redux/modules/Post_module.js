import { createAction, handleActions } from "redux-actions";
import { actionCreators as imageActions } from "./Image_module";
import { produce } from "immer";
import { config } from "../../shared/config";

import axios from "axios";
import { post } from "request";

// actions
const GET_POST = "GET_POST"; // 정보 불러오기
const EDIT_POST = "EDIT_POST"; // 정보 수정하기
const LOADING = "LOADING"; // 로딩하기
const TOGGLE_LIKE = "TOGGLE_LIKE"; // 좋아요 토글

//action creators
const getPost = createAction(GET_POST, (post_list) => ({
  post_list,
}));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));
const loading = createAction(LOADING, (is_loading) => ({
  is_loading,
}));
const toggleLike = createAction(TOGGLE_LIKE, (post, is_like) => ({
  post,
  is_like,
}));

const initialState = {
  list: [],
  detail_list: [],
  is_loading: false,
  like_cnt: 0,
  is_like: false,
};

// middleWare

const getPostDB = (start = null, size = null) => {
  return function (dispatch, getState) {
    dispatch(loading(true));
    axios
      .get(config.api + "/api/user", { withCredentials: true })
      .then((response) => {
        let post_list = [];
        for (let i = 0; i < response.data.result.length - 1; i++) {
          let initialPost = {
            name: response.data.result[i].name,
            image_url: response.data.result[i].imageUrl,
            skill: response.data.result[i].skill,
            introduce: response.data.result[i].introduce,
            comment_cnt: Object.keys(response.data.result[i].comments).length,
            like_cnt: Object.keys(response.data.result[i].likes).length,
            is_like: false,
            id: response.data.result[i].id,
          };
          post_list.push(initialPost);
        }
        console.log(response);
        dispatch(getPost(post_list));
      });
  };
};

const toggleLikeDB = (post_id, is_like) => {
  return function (dispatch, getState) {
    let _post = getState().post;
    let like_cnt = _post.like_cnt;
    let is_like = _post.is_like;

    axios
      .post(
        config.api + "/api/likes",
        {
          user_id: post_id,
        },
        { withCredentials: true }
      )
      .then((response) => {
        is_like = is_like === false ? true : false;

        like_cnt = is_like ? like_cnt + 1 : like_cnt - 1;
        console.log(like_cnt);

        const like_post = {
          ...post,
          like_cnt: like_cnt,
        };
        console.log(like_post);
        dispatch(toggleLike(like_post, is_like));
      });

    console.log(_post);
    // let likeCnt = _post.like_cnt;

    axios.post(config.api + '/api/likes', {
      user_id: 1,
    },
      { withCredentials: true })
      .then(response => response.data);
  };
};

// reducer
export default handleActions(
  {
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
      }),
    [TOGGLE_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.post = action.payload.post;
        draft.is_like = action.payload.is_like;
        draft.like_cnt = action.payload.post.like_cnt;
      }),
  },
  initialState
);

const actionCreators = {
  getPost,
  getPostDB,
  toggleLikeDB,
};

export { actionCreators };
