import { createAction, handleActions } from "redux-actions";
import { actionCreators as imageActions } from "./Image_module";
import { produce } from "immer";
import { config } from "../../shared/config";
import { getCookie } from "../../shared/Cookie";

import axios from "axios";
import { post } from "request";

// actions
const GET_DETAIL = "GET_DETAIL"; // 정보 불러오기

//action creators
const getDetail = createAction(GET_DETAIL, (detail) => ({
    detail
}));

const initialState = {
    info: {},
};

// middleWare
const getDetailDB = (page_id = 0) => {
    return function (dispatch, getState) {
        axios
            .get(config.api + "/api/user/" + page_id, { withCredentials: true })
            .then((response) => {
                let user = response.data.result;
                let cookie_user = getCookie("user");
                let detail = {
                    id: user.id,
                    name: user.name,
                    image_url: user.imageUrl,
                    introduce: user.introduce,
                    skill: user.skill,
                    username: user.username,
                    comments: user.comments,
                    comment_cnt: user.comments.length,
                    like_cnt: user.likes.length,
                    is_like: false,
                };
                for (let i in user.likes) {
                    if (user.likes[i].author.toString() == cookie_user) {
                        detail.is_like = true;
                        break;
                    }
                }
                dispatch(getDetail(detail));
            });
    };
};

// reducer
export default handleActions(
    {
        [GET_DETAIL]: (state, action) =>
            produce(state, (draft) => {
                draft.info = action.payload.detail;
            })
    },
    initialState
);

const actionCreators = {
    getDetail,
    getDetailDB,
};

export { actionCreators };
