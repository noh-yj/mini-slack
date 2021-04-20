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

const updateEmoji = createAction(UPDATE_EMOJI, (post_id, emoji) => ({
  post_id,
  emoji,
}));
const deleteEmoji = createAction(DELETE_EMOJI, (emoji_id) => ({ emoji_id }));

//initial state
const initialState = {
  list: [],
};

// middleware communication
// Update emoji in DB
const updateEmojiDB = (post_id, emoji) => {
  return function (dispatch, getState, { history }) {
    let emoji_content = {
      emoji: emoji,
    };

    const emojiDB = {
      url: `${config.api}/emoticon/${post_id}`,
      method: "PATCH",
      data: emoji_content,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    axios(emojiDB)
      .then((res) => {
        console.log(res.data);
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

// // GET All Posts From DB
// const getPostDB = () => {
//   return function (dispatch, getState, { history }) {
//     const jwtToken = getCookie("is_login");
//     const options = {
//       url: `${config.api}/board`,
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json;charset=UTF-8",
//         token: `${jwtToken}`,
//       },
//     };
//     axios(options)
//       .then((res) => {
//         let post_data = [];
//         //let emoji_data = [];

//         res.data.posts.forEach((singleData) => {
//           post_data.push({
//             comment_list: singleData.comment,
//             content: singleData.content,
//             imgUrl: singleData.imgUrl,
//             user_id: singleData.user,
//             profile_img: singleData.user?.profile_img,
//             day: singleData.createdAt.split("T")[0],
//             post_id: singleData._id,
//           });
//         });
//         console.log(post_data);
//         dispatch(setPost(post_data));
//       })
//       .catch((error) => {
//         if (error.res) {
//           window.alert(error.res.data.errorMessage);
//         }
//       });
//   };
// };

// // userPost 특정 유저가 작성한 게시물 조회
// const getUserPostDB = (id) => {
//   return function (dispatch, getState, { history }) {
//     dispatch(loading(true));

//     axios({
//       method: "get",
//       url: `${config.api}/member/${id}`,
//     })
//       .then((res) => {
//         let post_data = [];

//         res.data.posts.forEach((singleData) => {
//           post_data.push({
//             comment_list: singleData.comment,
//             content: singleData.content,
//             imgUrl: singleData.imgUrl,
//             user_id: singleData.user,
//             profile_img: singleData.user?.profile_img,
//             day: singleData.createdAt.split("T")[0],
//             post_id: singleData._id,
//           });
//         });
//         dispatch(setPost(post_data));
//       })
//       .catch((error) => {
//         if (error.res) {
//           swal({
//             title: error.res.data.errorMessage,
//             icon: "error",
//           });
//         }
//       });
//   };
// };

// // UPDATE DB
// const updatePostDB = (post_id, content, item) => {
//   return function (dispatch, getState, { history }) {
//     let formData = new FormData();

//     formData.append("content", content);
//     if (item !== null) {
//       formData.append("BoardImg", item);
//     }

//     const options = {
//       url: `${config.api}/board/${post_id}`,
//       method: "PATCH",
//       data: formData,
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     };
//     axios(options)
//       .then((res) => {
//         console.log(res.data);
//         if (item !== null) {
//           dispatch(
//             updatePost(post_id, {
//               content: content,
//               imgUrl: res.data.post.imgUrl,
//             })
//           );
//         } else {
//           dispatch(updatePost(post_id, { content: content }));
//         }
//         swal({
//           title: "수정 성공 ☺",
//           text: "게시글 수정에 성공하였습니다❕",
//           icon: "success",
//         });
//       })
//       .catch((error) => {
//         swal({
//           title: "수정 실패 🙄",
//           text: "뭔가.. 잘못됐어요!",
//           icon: "error",
//         });
//       });
//   };
// };

// // Delete DB
// const deletePostDB = (post_id) => {
//   return function (dispatch, getState, { history }) {
//     const options = {
//       url: `${config.api}/board/${post_id}`,
//       method: "DELETE",
//       headers: {
//         // 백 분들과 맞춰보기
//         Accept: "application/json",
//         "Content-Type": "application/json;charset=UTF-8",
//       },
//     };
//     axios(options)
//       .then((res) => {
//         // 삭제할 건지 말지 한 번 더 물어볼까?
//         dispatch(deletePost(post_id));
//         swal({
//           title: "삭제 성공 👋",
//           closeOnClickOutside: false,
//         });
//         // window.location.reload();
//       })
//       .catch((error) => {
//         swal({
//           title: "삭제 실패 🙄",
//           text: "뭔가.. 잘못됐어요!",
//           icon: "error",
//         });
//       });
//   };
// };

// reducer
export default handleActions(
  {
    [SET_EMOJI]: (state, action) =>
      produce(state, (draft) => {
        // draft.list.push(...action.payload.post_list);
        draft.list = action.payload.emoji_list;
        //draft.paging = action.payload.paging;
        //draft.likelist = action.payload.likelist;
      }),
    [UPDATE_EMOJI]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex(
          (p) => p.post_id === action.payload.post_id
        );
        draft.list[idx] = { ...draft.list[idx], ...action.payload.emoji };
      }),
  },
  initialState
);

// action creator

const actionCreators = {
  //getPostDB,
  setEmoji,
  updateEmojiDB,
};

// export
export { actionCreators };
