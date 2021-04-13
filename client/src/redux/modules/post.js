import { createAction, handleActions } from "redux-actions";
import produce from "immer";

import moment from "moment";
import "moment/locale/ko";

import axios from "axios";
import { config } from "../../config";
import swal from "sweetalert";

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
const addPostDB = (content, item) => {
  return function (getState, dispatch, { history }) {
    //let userId = getState().user.user.uid;
    let formData = new FormData();

    formData.append("content", content);
    //formData.append("boardImg", item);
    // it always returns empty
    console.log(formData);
    for (let key of formData.entries()) {
      console.log(key);
    }
    const postDB = {
      url: `${config.api}/board`,
      method: "POST",
      data: formData,
      headers: {
        // "Content-Type": "multipart/form-data",
      },
    };
    console.log(postDB);
    axios(postDB)
      .then((res) => {
        console.log(res);
        return;
        let result = {
          contents: content,
          day: moment(new Date()).fromNow(),
          img: item,
          //emoji: {},
          //uid: userId,
          post_id: res.data.post_list.post_id,
          comment_cnt: 0,
        };

        addPost(result);

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
        //     let idx = draft.list.findIndex(
        //       (p) => p._id === action.payload.post_idx
        //     );
        //     draft.list[idx].likeYn = action.payload.msg;
        //     if (action.payload.msg === "like") {
        //       draft.list[idx].like = parseInt(draft.list[idx].like) + 1;
        //     } else {
        //       draft.list[idx].like = parseInt(draft.list[idx].like) - 1;
        //     }
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
  updatePost,
};

// export
export { actionCreators };
