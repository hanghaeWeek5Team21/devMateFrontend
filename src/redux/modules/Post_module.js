import { createAction, handleActions } from "redux-actions";
import { actionCreators as imageActions } from "./Image_module";
import { produce } from "immer";
import { config } from "../../shared/config";
import { getCookie } from "../../shared/Cookie";

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
const toggleLike = createAction(TOGGLE_LIKE, (post, post_id) => ({
  post,
  post_id,
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
        if (response.data.result != null) {
          for (let user of response.data.result) {
            let initialPost = {
              name: user.name,
              image_url: user.imageUrl,
              skill: user.skill,
              introduce: user.introduce,
              comment_cnt: 0,
              like_cnt: 0,
              is_like: false,
              id: user.id,

              user_liked: false,
            };
            if (user.comments != null) {
              initialPost.comment_cnt = Object.keys(user.comments).length;
            }
            if (user.likes != null) {
              for (let like of user.likes) {
                let author_id = null;
                if (typeof like.author.id != "undefined") {
                  author_id = like.author.id;
                } else {
                  author_id = like.author;
                }
                if (author_id.toString() === getCookie("user")) {
                  console.log("일치합니다.");
                  initialPost.user_liked = true;
                  break;
                }
              }

              initialPost.like_cnt = Object.keys(user.likes).length;
            }
            post_list.push(initialPost);
          }
        }
        dispatch(getPost(post_list));
      });
  };
};

const toggleLikeDB = (post_id) => {
  return function (dispatch, getState) {
    const _idx = getState().post.list.findIndex((p) => p.id === post_id);
    let _post = getState().post.list[_idx];
    let like_cnt = _post.like_cnt;
    let is_like = _post.is_like;
    console.log(_post);

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
        like_cnt = is_like === true ? like_cnt + 1 : like_cnt - 1;

        const like_post = {
          like_cnt: like_cnt,
          is_like: is_like,
        };
        dispatch(toggleLike(like_post, post_id));
      });
  };
};

// reducer
export default handleActions(
  {
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
        console.log(draft.list);
      }),
    [TOGGLE_LIKE]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
        draft.list[idx].is_like = action.payload.post.is_like;
        draft.list[idx].like_cnt = action.payload.post.like_cnt;
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
