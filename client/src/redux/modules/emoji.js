import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { getCookie } from "../../shared/Cookie";
import axios from "axios";
import { config } from "../../config";
import swal from "sweetalert";

// actions
const SET_EMOJI = "SET_EMOJI";
const UPDATE_EMOJI = "UPDATE_EMOJI";
const DELETE_EMOJI = "DELETE_EMOJI";

// action creator functions
const setEmoji = createAction(SET_EMOJI, (post_id, emoji_list) => ({
  post_id,
  emoji_list,
}));

const updateEmoji = createAction(UPDATE_EMOJI, (post_id, emoticon_content) => ({
  post_id,
  emoticon_content,
}));
const deleteEmoji = createAction(DELETE_EMOJI, (post_id, emoji_id) => ({
  post_id,
  emoji_id,
}));

//initial state
const initialState = {
  list: {},
};

// middleware communication

// Update emoji in DB
const updateEmojiDB = (post_id, emoji) => {
  return function (dispatch, getState, { history }) {
    console.log(post_id, emoji);
    let emoji_content = {
      emoji: emoji,
    };

    const emojiDB = {
      url: `${config.api}/emoticon/${post_id}`,
      method: "PATCH",
      data: emoji_content,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    };

    axios(emojiDB)
      .then((res) => {
        let emoticon_content = {
          emoji: emoji,
          user: { userId: res.data.post.user },
          _id: res.data.emoticon._id,
        };
        dispatch(updateEmoji(post_id, emoticon_content));
      })
      .catch((error) => {
        swal({
          title: "업로드 실패 🙄",
          text: "뭔가.. 잘못됐어요!",
          icon: "error",
        });
      });
  };
};

// Delete DB
const deleteEmojiDB = (post_id, emoji_id) => {
  return function (dispatch, getState, { history }) {
    const options = {
      url: `${config.api}/emoticon/${post_id}`,
      method: "DELETE",
      data: { emojiId: emoji_id },
      headers: {
        // 백 분들과 맞춰보기
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    axios(options)
      .then((res) => {
        // 삭제할 건지 말지 한 번 더 물어볼까?
        dispatch(deleteEmoji(post_id, emoji_id));
      })
      .catch((error) => {
        swal({
          title: "삭제 실패 🙄",
          text: "뭔가.. 잘못됐어요!",
          icon: "error",
        });
      });
  };
};

// reducer
export default handleActions(
  {
    [SET_EMOJI]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.post_id] = action.payload.emoji_list;
        //draft.paging = action.payload.paging;
        //draft.likelist = action.payload.likelist;
      }),
    [UPDATE_EMOJI]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.post_id].push(
          action.payload.emoticon_content
        );
      }),
    [DELETE_EMOJI]: (state, action) =>
      produce(state, (draft) => {
        let emoji_list = state.list[action.payload.post_id];
        let index = emoji_list.findIndex(
          (e) => e._id === action.payload.emoji_id
        );
        draft.list[action.payload.post_id].splice(index, 1);
      }),
  },
  initialState
);

// action creator

const actionCreators = {
  //getPostDB,
  setEmoji,
  updateEmojiDB,
  deleteEmojiDB,
};

// export
export { actionCreators };
