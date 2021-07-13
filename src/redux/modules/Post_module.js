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

const initialPost = {
  name: "shane",
  image_url: "https://spartacodingclub.kr/static/css/images/ogimage2.jpg",
  skill: "리액트",
  introduce: "안녕하세요. 향해 2기 shane입니다. 다함께 즐코해요~!",
  comment_cnt: "",
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
    let likeCnt = _post.like_cnt;
    console.log(likeCnt);

    axios
      .post(
        config.api + "/api/likes",
        {
          user_id: post_id,
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);
        console.log(response.data);
        likeCnt = response.res ? likeCnt + 1 : likeCnt - 1;
        console.log(likeCnt);

        is_like = response.res ? true : false;
        console.log(is_like);

        const like_post = {
          ...post,
          likeCnt: likeCnt,
        };
        console.log(like_post);
        dispatch(toggleLike(like_post, is_like));
      });
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
