import { createAction, handleActions } from "redux-actions";
// 불변성 관리 위한 친구
import { produce } from "immer";
import axios from "axios";
import swal from "sweetalert";
import { config } from "../../config";

// actions

const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const UPDATE_COMMENT = "UPDATE_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";

// action creator functions

const setComment = createAction(SET_COMMENT, (post_id, comment_list) => ({
  post_id,
  comment_list,
}));

const addComment = createAction(ADD_COMMENT, (post_id, comment) => ({
  post_id,
  comment,
}));

const updateComment = createAction(
  UPDATE_COMMENT,
  (post_id, comment_id, comment) => ({
    post_id,
    comment_id,
    comment,
  })
);

const deleteComment = createAction(DELETE_COMMENT, (post_id, comment_id) => ({
  post_id,
  comment_id,
}));

// contains objects that has post_id & comment info
const initialState = {
  list: {},
};

const addCommentDB = (post_id, contents) => {
  return function (dispatch, getState, { history }) {
    // generates data for sending a request to the server
    let comment_data = {
      content: contents,
    };
    console.log(comment_data);

    axios({
      method: "POST",
      url: `${config.api}/comment/${post_id}`,
      data: comment_data,
    })
      .then((res) => {
        console.log(res.data);
        swal({
          title: "코멘트 😎",
          text: "댓글을 달았습니다❕",
          icon: "success",
        });
        let comment_info = {
          _id: res.data.newComment._id,
          content: res.data.newComment.content,
          user: res.data.newComment.user,
          createdAt: res.data.newComment.createdAt.split("T")[0],
        };
        dispatch(addComment(post_id, comment_info));
      })
      .catch((err) => {
        swal({
          title: "코멘트 😥",
          text: "댓글을 달지 못했습니다❕",
          icon: "error",
        });
      });
  };
};

// enables to bring specific comment info about a certain post from the DB
const getCommentDB = (post_id) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) {
      console.log("HIHI");
      return;
    }
    axios({
      method: "GET",
      url: `${config.api}/comment/${post_id}`,
    })
      .then((res) => {
        let list = [];

        res.data.comments.forEach((rd) => {
          list.push({ ...rd });
        });

        dispatch(setComment(post_id, list));
      })
      .catch((err) => console.log("Get Error!", err));
  };
};

const updateCommentDB = (post_id, comment_id, comment) => {
  return function (dispatch, getState, { history }) {
    let comment_data = {
      commentId: comment_id,
      content: comment,
    };
    console.log(post_id, comment_data);

    axios({
      method: "PATCH",
      url: `${config.api}/comment/${post_id}`,
      data: comment_data,
    })
      .then((res) => {
        swal({
          title: "코멘트 수정😎",
          text: "댓글을 수정했습니다❕",
          icon: "success",
        });
        dispatch(updateComment(post_id, comment_id, comment));
      })
      .catch((err) => {
        swal({
          title: "코멘트 수정 실패 😥",
          text: "댓글을 수정하지 못했습니다❕",
          icon: "error",
        });
      });
  };
};

const deleteCommentDB = (post_id, comment_id) => {
  console.log(post_id, comment_id);
  return function (dispatch, getState, { history }) {
    axios({
      method: "DELETE",
      url: `${config.api}/comment/${post_id}`,
      data: { commentId: comment_id },
    })
      .then((res) => {
        console.log(res.data);
        swal({
          title: "코멘트 삭제😎",
          text: "댓글을 삭제했습니다❕",
          icon: "success",
        });
        dispatch(deleteComment(post_id, comment_id));
      })
      .catch((err) => {
        swal({
          title: "코멘트 삭제 실패 😥",
          text: "댓글을 삭제하지 못했습니다❕",
          icon: "error",
        });
      });
  };
};

export default handleActions(
  {
    [SET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.post_id] = action.payload.comment_list;
      }),
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        // when starts with an empty array
        if (!draft.list[action.payload.post_id]) {
          draft.list[action.payload.post_id] = [action.payload.comment];
          return;
        }
        draft.list[action.payload.post_id].unshift(action.payload.comment);
      }),
    [UPDATE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        let comment_list = state.list[action.payload.post_id];
        let index = comment_list.findIndex(
          (c) => c._id === action.payload.comment_id
        );
        draft.list[action.payload.post_id][index] = {
          ...comment_list[index],
          content: action.payload.comment,
        };
      }),
    [DELETE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        let comment_list = state.list[action.payload.post_id];
        let index = comment_list.findIndex(
          (c) => c._id === action.payload.comment_id
        );
        draft.list[action.payload.post_id].splice(index, 1);
      }),
  },
  initialState
);

const actionCreators = {
  setComment,
  addComment,
  getCommentDB,
  addCommentDB,
  updateCommentDB,
  deleteCommentDB,
};

export { actionCreators };
