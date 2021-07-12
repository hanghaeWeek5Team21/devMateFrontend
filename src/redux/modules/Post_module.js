import { createAction, handleActions } from "redux-actions";
import { actionCreators as imageActions } from "./Image_module";
import { produce } from "immer";
import { config } from "../../shared/config";

import axios from "axios";

// actions
const GET_POST = "GET_POST"; // 정보 불러오기
const EDIT_POST = "EDIT_POST"; // 정보 수정하기
const LOADING = "LOADING"; // 로딩하기
const LIKE_TOGGLE = "LIKE_TOGGLE"; // 좋아요 토글

//action creators
const getPost = createAction(GET_POST, (post_list, paging) => ({
  post_list,
  paging,
}));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));
const likeToggle = createAction(LIKE_TOGGLE, (post_id, is_like = null) => ({
  post_id,
  is_like,
}));

const initialState = {
  list: [],
  detail_list: [],
  is_loading: false,
  paging: { start: null, size: 5 },
};

const initialPost = {
  name: "shane",
  image_url: "https://spartacodingclub.kr/static/css/images/ogimage2.jpg",
  skill: "리액트",
  introduce: "안녕하세요. 향해 2기 shane입니다. 다함께 즐코해요~!",
  comment: "",
  like_cnt: 0,
  is_like: false,
};

// middleWare

const getPostDB = (start = null, size = null) => {
  return function (dispatch, getState) {
    let _paging = getState().post.paging;
    if (!_paging.page) {
      return;
    }
    dispatch(loading(true));
    const options = {
      url: "config.api",
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    };
    axios(options).then((response) => {
      console.log(response);
      let post_list = [];
    });
  };
};

// reducer
export default handleActions({
  [GET_POST]: (state, action) =>
    produce(state, (draft) => {
      draft.list.push(...action.payload.post_list);
      draft.paging = action.payload.paging;
      draft.list = draft.list.reduce((acc, cur) => {
        if (acc.findIndex((a) => a.id === cur.id) === -1) {
          return [...acc, cur];
        } else {
          acc[acc.findIndex((a) => a.id === cur.id)] = null;
          return acc;
        }
      }, []);
    }),
});

const actionCreators = {
  getPost,
  getPostDB,
};

export { actionCreators };
