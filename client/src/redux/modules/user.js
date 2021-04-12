import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { setCookie, getCookie, deleteCookie } from '../../shared/Cookie';
import axios from 'axios';
import { config } from '../../config';

// 액션
const SET_USER = 'SET_USER';
const UPDATE_USER = 'UPDATE_USER';
const LOG_OUT = 'LOG_OUT';

// 액션 생성함수
const setUser = createAction(SET_USER, (user) => ({ user }));
const updateUser = createAction(UPDATE_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, () => ({}));

// 초기 state값
const initialState = {
  user: null,
  is_login: false,
};

const getUserDB = () => {
  return function (dispatch, getState, { history }) {
    const jwtToken = getCookie('is_login');
    axios.defaults.headers.common['token'] = `${jwtToken}`;
    axios({
      method: 'get',
      url: `${config.api}/auth/user`,
    })
      .then((res) => {
        console.log(res);
        dispatch(
          setUser({
            email: res.data.email,
            uid: res.data.id,
            nickname: res.data.nickname,
          }),
        );
      })
      .catch((e) => {
        console.log('에러발생', e);
      });
  };
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
        const jwtToken = res.data.token;
        setCookie('is_login', jwtToken);
        axios.defaults.headers.common['token'] = `${jwtToken}`;
        dispatch(
          setUser({
            email: res.data.user.email,
            uid: res.data.user.id,
            nickname: res.data.user.nickname,
          }),
        );
        history.push('/main');
      })
      .catch((e) => {
        console.log('에러발생:', e);
      });
  };
};

const socialLoginDB = (id) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: 'post',
      url: `${config.api}/auth/me`,
      data: {
        id: id,
      },
    })
      .then((res) => {
        console.log(res);
        const jwtToken = res.data.token;
        setCookie('is_login', jwtToken);
        axios.defaults.headers.common['token'] = `${jwtToken}`;
        dispatch(
          setUser({
            email: res.data.user.email,
            uid: res.data.user.id,
            nickname: res.data.user.nickname,
          }),
        );
        history.push('/main');
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
        window.alert('회원가입이 완료되었습니다😊');
        history.push('/');
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

    [UPDATE_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie('is_login');
        draft.user = null;
        draft.is_login = false;
      }),
  },
  initialState,
);

const actionCreators = {
  signupDB,
  loginDB,
  getUserDB,
  socialLoginDB,
  logOut,
};

export { actionCreators };
