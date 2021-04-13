import { createAction, handleActions } from "redux-actions";
import produce from "immer";

import moment from "moment";
import "moment/locale/ko";

import axios from "axios";
import { config } from "../../config";
import swal from "sweetalert";
// import comment from "./comment";
// import user from "./user";

// actions
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const LOADING = "LOADING";
const UPDATE_POST = "UPDATE_POST";
const DELETE_POST = "DELETE_POST";

// action creator functions\
// paging parameter will be added for infinity scroll
const setPost = createAction(SET_POST, (post_list) => ({
  post_list,
}));

const addPost = createAction(ADD_POST, (post) => ({ post }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));
const updatePost = createAction(UPDATE_POST, (post_id, content) => ({
  post_id,
  content,
}));
const deletePost = createAction(DELETE_POST, (post_id) => ({ post_id }));

//initial state
const initialState = {
  is_loading: true,
  list: [],
  paging: { start: null, size: 5 },
};

// middleware communication
// Add Post to DB
const addPostDB = (content, item) => {
  return function (dispatch, getState, { history }) {
    let userId = getState().user.user.uid;
    console.log(content, item);
    let formData = new FormData();

    formData.append("content", content);
    formData.append("BoardImg", item);

    for (let key of formData.entries()) {
      console.log(`formData key`, key);
    }
    const postDB = {
      url: `${config.api}/board`,
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    console.log(postDB);
    axios(postDB)
      .then((res) => {
        console.log(`res: `, res);
        let result = {
          content: content,
          day: moment(new Date()).fromNow(),
          img: item,
          emoticon: [],
          uid: userId,
          post_id: res.data.post._id,
          comment_cnt: 0,
        };
        console.log(`result: `, result);
        dispatch(addPost(result));

        swal({
          title: "성공 ☺",
          text: "업로드에 성공하였습니다❕",
          icon: "success",
        });
        history.replace("/main");
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

// GET All Posts From DB
const getPostDB = () => {
  return function (dispatch, getState, { history }) {
    const options = {
      url: `${config.api}/board`,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    axios(options)
      .then((res) => {
        console.log(res.data);
        let post_data = [];
        let emoji_data = [];

        res.data.forEach((singleData) => {
          post_data.push({
            comment_list: singleData.comment,
            content: singleData.content,
            // img url 도 들어가야겠지?
            user_id: singleData.user,
            post_id: singleData._id,
          });
        });

        dispatch(addPost(post_data));
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          window.alert(error.response.data.errorMessage);
        }
      });
  };
};

// UPDATE DB
const updatePostDB = (post_id, content, item) => {
  return function (dispatch, getState, { history }) {
    const _post_idx = getState().post.list.findIndex((p) => p.id === post_id);
    const _post = getState().post.list[_post_idx];

    let formData = new FormData();

    formData.append("content", content);
    formData.append("BoardImg", item);

    const options = {
      url: `${config.api}/board/${post_id}`,
      method: "PATCH",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    axios(options)
      .then((res) => {
        console.log(res.data);
        dispatch(updatePost(post_id, { content: content, BoardImg: item }));
        swal({
          title: "수정 성공 ☺",
          text: "게시글 수정에 성공하였습니다❕",
          icon: "success",
        });
        history.replace("/main");
      })
      .catch((error) => {
        swal({
          title: "수정 실패 🙄",
          text: "뭔가.. 잘못됐어요!",
          icon: "error",
        });
      });
  };
};

// Delete DB
const deletePostDB = (post_id) => {
  return function (dispatch, getState, { history }) {
    const options = {
      url: `${config.api}/board/${post_id}`,
      method: "DELETE",
      data: post_id,
      headers: {
        // 백 분들과 맞춰보기
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    axios(options)
      .then((res) => {
        console.log(res.data);
        dispatch(deletePost(post_id));
        swal({
          title: "삭제 성공 👋",
          text: "게시글을 삭제하셨습니다❕",
          icon: "success",
        });
        history.replace("/main");
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
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.post_list);
        //draft.paging = action.payload.paging;
        draft.likelist = action.payload.likelist;
        draft.is_loading = false;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
    [UPDATE_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p._id === action.payload.post_id);
        draft.list[idx] = { ...draft.list[idx], ...action.payload.content };
      }),
    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = draft.list.filter((p) => p._id !== action.payload.post_id);
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);

// action creator

const actionCreators = {
  //getPostDB,
  setPost,
  addPostDB,
  getPostDB,
  updatePost,
  updatePostDB,
  deletePostDB,
};

// export
export { actionCreators };
