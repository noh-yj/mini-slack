import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { setCookie, getCookie, deleteCookie } from '../../shared/Cookie';
import axios from 'axios';
import { config } from '../../config';
import swal from 'sweetalert';

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
// 회원 정보 조회
const getUserDB = () => {
  return function (dispatch, getState, { history }) {
    const jwtToken = getCookie('is_login');
    // 헤더에 토큰 default
    axios.defaults.headers.common['token'] = `${jwtToken}`;

    axios({
      method: 'get',
      url: `${config.api}/auth/user`,
    })
      .then((res) => {
        dispatch(
          setUser({
            email: res.data.userInfo.email,
            uid: res.data.userInfo.id,
            nickname: res.data.userInfo.nickname,
            profile_img: res.data.userInfo.profile_img,
            comment_myself: res.data.userInfo.comment_myself,
            snsId: res.data.userInfo.snsId,
          }),
        );
      })
      .catch((e) => {
        console.log('에러발생', e);
      });
  };
};
// 회원 정보 수정
const updateUserDB = (file, comment_myself, pwd) => {
  return function (dispatch, getState, { history }) {
    // 회원정보 수정 시 비밀번호 변경하지 않는 경우 str null로 보냄 (서버랑 약속)
    if (pwd === '') {
      pwd = 'null';
    }
    // 회원정보 수정 시 프로필 사진 변경하지 않는 경우 기존 img_url 보냄 (서버랑 약속)
    if (file === null) {
      file = getState().user.user.profile_img;
    }
    // 변경된 값을 FormData에 담음
    let formData = new FormData();
    formData.append('profile_img', file);
    formData.append('comment_myself', comment_myself);
    formData.append('password', pwd);

    axios({
      method: 'patch',
      url: `${config.api}/auth/myProfile`,
      data: formData,
    })
      .then((res) => {
        dispatch(
          updateUser({
            email: res.data.newUserInfo.email,
            uid: res.data.newUserInfo.id,
            nickname: res.data.newUserInfo.nickname,
            profile_img: res.data.newUserInfo.profile_img,
            comment_myself: res.data.newUserInfo.comment_myself,
            snsId: res.data.newUserInfo.snsId,
          }),
        );
        swal({
          title: '회원정보가 변경되었습니다😊',
          icon: 'success',
        });
        // 회원 정보 변경 시 최신화를 위해 새로고침
        setTimeout(() => {
          window.location.reload();
        }, 550);
      })
      .catch((e) => {
        console.log('에러발생', e);
        swal({
          title: '회원정보 변경에 실패했습니다 😞',
          icon: 'error',
        });
      });
  };
};
// 로그인
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
        // 발급 받은 토큰
        const jwtToken = res.data.token;
        // 쿠키에 저장
        setCookie('is_login', jwtToken);
        // 헤더에 토큰 default
        axios.defaults.headers.common['token'] = `${jwtToken}`;
        dispatch(
          setUser({
            email: res.data.user.email,
            uid: res.data.user.id,
            nickname: res.data.user.nickname,
            profile_img: res.data.user.profile_img,
            comment_myself: res.data.user.comment_myself,
            snsId: res.data.user.snsId,
          }),
        );
        // 뒤로가기 시 main이 보이게 끔 replace 사용(사용자 경험 개선)
        history.replace('/main');
      })
      .catch((e) => {
        console.log('에러발생:', e);
        if (e.response) {
          swal({
            title: e.response.data.err,
            icon: 'error',
          });
        }
      });
  };
};
// 소셜로그인
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
        // 발급 받은 토큰
        const jwtToken = res.data.token;
        // 쿠키에 저장
        setCookie('is_login', jwtToken);
        // 헤더에 토큰 default
        axios.defaults.headers.common['token'] = `${jwtToken}`;
        dispatch(
          setUser({
            email: res.data.user.email,
            uid: res.data.user.id,
            nickname: res.data.user.nickname,
            profile_img: res.data.user.profile_img,
            comment_myself: res.data.user.comment_myself,
            snsId: res.data.user.snsId,
          }),
        );
        // 뒤로가기 시 main이 보이게 끔 replace 사용(사용자 경험 개선)
        history.replace('/main');
      })
      .catch((e) => {
        console.log('에러발생:', e);
      });
  };
};
// 회원가입
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
        swal({
          title: '회원가입이 완료되었습니다😊',
          icon: 'success',
        });
        // 뒤로가기 시 login쪽이 보이게 끔 replace 사용(사용자 경험 개선)
        history.replace('/');
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
        // 로그아웃 시 쿠키 삭제
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
  updateUserDB,
  logOut,
};

export { actionCreators };
