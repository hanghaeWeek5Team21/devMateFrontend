import { createAction, handleActions } from 'redux-actions';
import { actionCreators as imageActions } from './Image_module';
import { produce } from 'immer';
import { config } from '../../shared/config';

import axios from 'axios';
import { setCookie, deleteCookie, getCookie } from '../../shared/Cookie';

// 액션 타입
const LOG_OUT = 'LOG_OUT';
const LOG_IN = 'LOG_IN';
const SET_USER = 'SET_USER';

// 액션 생성 함수
const logOut = createAction(LOG_OUT, (user) => ({
  user,
}));
const login = createAction(LOG_IN, () => ({}));
const setUser = createAction(SET_USER, (user) => ({ user }));

// initialState
const initialState = {
  user: null,
  is_login: false,
};

// middleware actions
const loginDB = (start = null, size = null) => {
  return function (dispatch, getState) {
    axios
      .get(config.api + '/api/user/id', { withCredentials: true })
      .then((response) => {
        setCookie('user', response.data.result);
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
  return function (dispatch, getState, { history }) {
    deleteCookie('user');
    deleteCookie('is_login');
    dispatch(logOut());
    history.replace('/');
  };
};

const signupDB = (username, password, name, skill) => {
  return function (dispatch, getState, { history }) {
    axios
      .post(
        'http://localhost/api/user',
        {
          username: username,
          password: password,
          name: name,
          skill: skill,
          introduce: '사진 들어갔나요?',
          image_url:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThBx8M3gzArY15Olr5TseLdHg8RNCH5Uc0SA&usqp=CAU',
        },
        { withCredentials: true }
      )
      .then((response) => {
        dispatch(
          setUser({
            username: username,
            password: password,
            name: name,
            skill: skill,
            introduce: '네 들어갔어요',
            image_url:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThBx8M3gzArY15Olr5TseLdHg8RNCH5Uc0SA&usqp=CAU',
          })
        );
        window.alert(response.data.msg);
        document.location.href = '/login';
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// reducer
export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        setCookie('user', action.payload.user);
        setCookie('is_login', 'true');
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie('user');
        deleteCookie('is_login');
        draft.user = null;
        draft.is_login = false;
      }),
  },
  initialState
);

// action creator export
const actionCreators = {
  login,
  logOut,
  loginDB,
  logoutDB,
  signupDB,
};

export { actionCreators };
