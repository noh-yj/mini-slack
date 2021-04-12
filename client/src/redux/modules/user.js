import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { setCookie, getCookie, deleteCookie } from '../../shared/Cookie';
import axios from 'axios';
import { config } from '../../config';

// 액션
const SET_USER = 'SET_USER';
const GET_USER = 'GET_USER';
const UPDATE_USER = 'UPDATE_USER';

// 액션 생성함수
const setUser = createAction(SET_USER, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const updateUser = createAction(UPDATE_USER, (user) => ({ user }));

// 초기 state값
const initialState = {
  user: null,
  is_login: false,
};

const getUserDB = () => {
  return function (dispatch, getState, { history }) {};
};

const updateUserDB = () => {
  return function (dispatch, getState, { history }) {};
};

const loginDB = (user_id, password) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: 'post',
      url: `${config.api}/auth/login`,
      data: {
        email: user_id,
        password: password,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log('에러발생:', e);
      });
  };
};

const signupDB = (user_email, password, user_name) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: 'post',
      url: `${config.api}/auth/register`,
      data: {
        email: user_email,
        nickname: user_name,
        password: password,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log('에러발생:', e);
      });
  };
};

// 리듀서
// redux-actions와 immer를 사용
// user: 유저 정보, is_login: 로그인 상태

export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [GET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [UPDATE_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
  },
  initialState,
);

const actionCreators = {
  signupDB,
  loginDB,
};

export { actionCreators };
