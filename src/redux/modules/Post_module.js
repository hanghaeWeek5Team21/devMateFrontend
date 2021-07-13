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
const getPost = createAction(GET_POST, (post_list) => ({
  post_list,
}));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));
const loading = createAction(LOADING, (is_loading) => ({
  is_loading
}));
const likeToggle = createAction(LIKE_TOGGLE, (post_id, is_like = null) => ({
  post_id,
  is_like,
}));

const initialState = {
  list: [],
  detail_list: [],
  is_loading: false,
};

const initialPost = {
  name: "shane",
  image_url: "https://spartacodingclub.kr/static/css/images/ogimage2.jpg",
  skill: "리액트",
  introduce: "안녕하세요. 향해 2기 shane입니다. 다함께 즐코해요~!",
  comment_cnt: "",
  like_cnt: 0,
  is_like: false,
};

// middleWare


const getPostDB = (start = null, size = null) => {
  return function (dispatch, getState) {
    // let _paging = getState().post.paging;
    // 페이지가 없으면 로딩이 되게끔
    // if (!_paging.page) {
    //   return;
    // }
    dispatch(loading(true));
    axios.get(config.api + '/api/user',
      { withCredentials: true })
      .then(response => {
        let post_list = [];
        for (let i = 0; i < response.data.result.length; i++) {
          let initialPost = {
            name: response.data.result[i].name,
            image_url: response.data.result[i].imageUrl,
            skill: response.data.result[i].skill,
            introduce: response.data.result[i].introduce,
            comment_cnt: Object.keys(response.data.result[i].comments).length,
            like_cnt: Object.keys(response.data.result[i].likes).length,
            is_like: false,
          }
          post_list.push(initialPost);
        }
        dispatch(getPost(post_list));
      }
      );
  };
};

// reducer
export default handleActions(
  {
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
      }),
  },
  initialState
);

const actionCreators = {
  getPost,
  getPostDB,
};

export { actionCreators };
