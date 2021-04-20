import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import socketIOClient from 'socket.io-client';
import axios from 'axios';
import { config } from '../../config';

// 액션
const GET_MSG = 'GET_MSG';
const SET_MSG = 'SET_MSG';
const LOADING = 'LOADING';
const BADGE = 'BADGE';
const RECEIVEBADGE = 'RECEIVEBADGE';
const USERS = 'USERS';

// 액션 생성함수
const getMsg = createAction(GET_MSG, (msg) => ({ msg }));
const setMsg = createAction(SET_MSG, (msg) => ({ msg }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));
const badgeOff = createAction(BADGE, (uid) => ({ uid }));
const receiveBadge = createAction(RECEIVEBADGE, (uid) => ({
  uid,
}));
const user_list = createAction(USERS, (user_list) => ({ user_list }));

// initialState
const initialState = {
  chat_list: [],
  is_loading: false,
  is_badge: false,
  receive_info: '',
  user_list: [],
};

// 소켓 설정(전역으로 사용하기위해 export)
const socket = socketIOClient(`${config.api}/chat`);
const globalSocket = socketIOClient(`${config.api}/`);

const middlewareUsers = () => {
  return function (dispatch, getState) {
    axios({
      method: 'get',
      url: `${config.api}/member`,
    })
      .then((res) => {
        const users = res.data.users.map((val) => {
          return { ...val, is_badge: false };
        });
        dispatch(user_list(users));
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

// 채팅 목록 불러오기
const loadChatList = () => {
  return function (dispatch) {
    dispatch(loading(true));

    socket.on('load', (res) => {
      dispatch(getMsg(res));
    });
  };
};

// 채팅 내용 추가하기
const addChatList = () => {
  return function (dispatch) {
    socket.on('receive', (res) => {
      dispatch(setMsg(res));
    });
  };
};

const globalAddChatList = (room) => {
  return function (dispatch, getState) {
    globalSocket.on('globalReceive', (res) => {
      // 알람 기능 다른사람일 때
      if (getState().user.user.nickname !== res.username) {
        // 해당 채팅방이 아닌 곳에서 알람
        if (room !== res.room) {
          dispatch(receiveBadge(res.uid));
          // 알랍 권한 허용일 경우
          if (Notification.permission === 'granted') {
            new Notification(res.username, {
              body: res.msg,
              icon: res.profile_img,
            });
            // 알람 권한이 허용이 아닐 경우
          } else if (Notification.permission !== 'denied') {
            Notification.requestPermission(function (permission) {
              if (permission === 'granted') {
                new Notification(res.username, {
                  body: res.msg,
                  icon: res.profile_img,
                });
              }
            });
          }
        }
      }
    });
  };
};

// 리듀서
export default handleActions(
  {
    [GET_MSG]: (state, action) =>
      produce(state, (draft) => {
        draft.chat_list = action.payload.msg;
        draft.is_loading = false;
      }),
    [SET_MSG]: (state, action) =>
      produce(state, (draft) => {
        draft.chat_list = [...draft.chat_list, action.payload.msg];
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
    [BADGE]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.user_list.findIndex(
          (val) => val.userId === action.payload.uid,
        );
        draft.user_list[idx].is_badge = false;
      }),
    [RECEIVEBADGE]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.user_list.findIndex(
          (val) => val.userId === action.payload.uid,
        );
        draft.user_list[idx].is_badge = true;
      }),
    [USERS]: (state, action) =>
      produce(state, (draft) => {
        draft.user_list = action.payload.user_list;
      }),
  },
  initialState,
);

const actionCreators = {
  loadChatList,
  addChatList,
  globalAddChatList,
  badgeOff,
  middlewareUsers,
  socket,
  globalSocket,
};

export { actionCreators };
