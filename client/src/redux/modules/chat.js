import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import socketIOClient from 'socket.io-client';
import { config } from '../../config';

// 액션
const GET_MSG = 'GET_MSG';
const SET_MSG = 'SET_MSG';
const LOADING = 'LOADING';
const BADGE = 'BADGE';
const RECEIVE = 'RECEIVE';

// 액션 생성함수
const getMsg = createAction(GET_MSG, (msg) => ({ msg }));
const setMsg = createAction(SET_MSG, (msg) => ({ msg }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));
const badge = createAction(BADGE, (is_badge) => ({ is_badge }));
const receive = createAction(RECEIVE, (username) => ({ username }));

// initialState
const initialState = {
  chat_list: [],
  is_loading: false,
  is_badge: false,
  receive_username: '',
};

// 소켓 설정(전역으로 사용하기위해 export)
const socket = socketIOClient(`${config.api}/chat`);
const globalSocket = socketIOClient(`${config.api}/`);

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
  return function (dispatch, getState) {
    socket.on('receive', (res) => {
      dispatch(setMsg(res));
    });
  };
};

const globalAddChatList = () => {
  return function (dispatch, getState) {
    globalSocket.on('globalReceive', (res) => {
      // 알람 기능 다른사람일 때
      if (getState().user.user.nickname !== res.username) {
        // 테스트 중
        dispatch(badge(true));
        dispatch(receive(res.username));

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
        draft.is_badge = action.payload.is_badge;
      }),
    [RECEIVE]: (state, action) =>
      produce(state, (draft) => {
        draft.receive_username = action.payload.username;
      }),
  },
  initialState,
);

const actionCreators = {
  loadChatList,
  addChatList,
  globalAddChatList,
  badge,
  socket,
  globalSocket,
};

export { actionCreators };
