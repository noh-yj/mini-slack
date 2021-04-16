import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import socketIOClient from 'socket.io-client';
import { config } from '../../config';

// 액션
const GET_MSG = 'GET_MSG';
const SET_MSG = 'SET_MSG';

// 액션 생성함수
const getMsg = createAction(GET_MSG, (msg) => ({ msg }));
const setMsg = createAction(SET_MSG, (msg) => ({ msg }));

// initialState
const initialState = {
  chat_list: [],
};

// 소켓 설정
const socket = socketIOClient(`${config.api}/chat`);

const socketConnect = () => {
  return function () {
    socket.connect();
  };
};

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
      }),
    [SET_MSG]: (state, action) =>
      produce(state, (draft) => {
        draft.chat_list = [...draft.chat_list, action.payload.msg];
      }),
  },
  initialState,
);

const actionCreators = {
  socket,
  socketConnect,
  joinRoom,
  msgSubmit,
  loadChatList,
  addChatList,
};

export { actionCreators };
