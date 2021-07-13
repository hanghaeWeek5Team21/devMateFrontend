import { createAction, handleActions } from "redux-actions";
import { actionCreators as imageActions } from "./Image_module";
import { produce } from "immer";
import { config } from "../../shared/config";

import axios from "axios";
import { setCookie, deleteCookie } from '../../shared/Cookie';


// 액션 타입
const LOG_OUT = 'LOG_OUT';
const LOG_IN = 'LOG_IN';

// 액션 생성 함수
const logOut = createAction(LOG_OUT, (user) => ({
  user,
}));
const login = createAction(LOG_IN, () => ({}));

// initialState
const initialState = {
  user: null,
  is_login: false,
};

// middleware actions
const loginDB = (start = null, size = null) => {
  return function (dispatch, getState) {
    axios.get(config.api + '/api/user/id',
      { withCredentials: true })
      .then((response) => {
        setCookie("user", response.data.result);
        setCookie('is_login', 'true');
        dispatch(login(response.data.result));
      })
      .catch((error) => {
        console.log(error);
        window.alert('로그인 실패!');
      });
  };
};

const logoutDB = (start = null, size = null) => {
  return function (dispatch, getState) {
    deleteCookie("user");
    deleteCookie('is_login');
    dispatch(logOut());
  };
};

// reducer
export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        setCookie("user", action.payload.user);
        setCookie('is_login', 'true');
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("user");
        deleteCookie('is_login');
        draft.user = null;
        draft.is_login = false;
      })
  },
  initialState
);

// action creator export
const actionCreators = {
  login,
  logOut,
  loginDB,
};

export { actionCreators };
