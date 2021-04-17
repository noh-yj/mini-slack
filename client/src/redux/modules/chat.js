import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import socketIOClient from 'socket.io-client';
import { config } from '../../config';

// 액션
const GET_MSG = 'GET_MSG';
const SET_MSG = 'SET_MSG';
const LOADING = 'LOADING';

// 액션 생성함수
const getMsg = createAction(GET_MSG, (msg) => ({ msg }));
const setMsg = createAction(SET_MSG, (msg) => ({ msg }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

// initialState
const initialState = {
  chat_list: [],
  is_loading: false,
};

// 소켓 설정
const socket = socketIOClient(`${config.api}/chat`);

// 소캣 연결
const socketConnect = () => {
  return function () {
    socket.connect();
  };
};
// 소캣 연결 해제
const socketDisConnect = () => {
  return function () {
    socket.disconnect();
  };
};

// emit: 서버로 보내는 느낌, on: 서버에서 받는 느낌

// 방 생성하기
const joinRoom = (Info) => {
  return function () {
    socket.emit('join', Info);
  };
};
// 메세지 보내기
const msgSubmit = (Info) => {
  return function () {
    socket.emit('send', {
      room: Info.room,
      username: Info.username,
      profile_img: Info.profile_img,
      msg: Info.msg,
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
  },
  initialState,
);

const actionCreators = {
  socketDisConnect,
  socketConnect,
  joinRoom,
  msgSubmit,
  loadChatList,
  addChatList,
  socket,
};

export { actionCreators };
