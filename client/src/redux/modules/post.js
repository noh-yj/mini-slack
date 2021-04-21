import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { getCookie } from "../../shared/Cookie";
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

// action creator functions
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
  is_loading: false,
  list: [],
  paging: { start: null, size: 5 },
};

// middleware communication
// Add Post to DB
const addPostDB = (content, item) => {
  return function (dispatch, getState, { history }) {
    let user = getState().user.user;
    console.log(content, item);
    let formData = new FormData();

    formData.append("content", content);
    formData.append("BoardImg", item);

    const postDB = {
      url: `${config.api}/board`,
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    axios(postDB)
      .then((res) => {
        console.log(res.data);
        let result = {
          user_id: {
            userId: user.uid,
            profile_img: user.profile_img,
            nickname: user.nickname,
          },

          comment_list: res.data.post.comment,
          content: res.data.post.content,
          imgUrl: res.data.post.imgUrl,
          profile_img: res.data.post.user?.profile_img,
          day: res.data.post.createdAt.split("T")[0],
          post_id: res.data.post._id,
        };

        //window.location.reload();
        dispatch(addPost(result));
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
    const jwtToken = getCookie("is_login");
    const options = {
      url: `${config.api}/board`,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        token: `${jwtToken}`,
      },
    };
    axios(options)
      .then((res) => {
        console.log(res.data);
        let post_data = [];
        //let emoji_data = [];

        res.data.posts.forEach((singleData) => {
          console.log(singleData.emoji);
          post_data.push({
            comment_list: singleData.post.comment,
            content: singleData.post.content,
            imgUrl: singleData.post.imgUrl,
            user_id: singleData.post.user,
            profile_img: singleData.post.user?.profile_img,
            day: singleData.post.createdAt.split("T")[0],
            post_id: singleData.post._id,
            emoticon: singleData.post.emoticon,
          });
        });
        console.log(post_data);
        dispatch(setPost(post_data));
      })
      .catch((error) => {
        if (error.res) {
          window.alert(error.res.data.errorMessage);
        }
      });
  };
};

// userPost 특정 유저가 작성한 게시물 조회
const getUserPostDB = (id) => {
  return function (dispatch, getState, { history }) {
    dispatch(loading(true));

    axios({
      method: "get",
      url: `${config.api}/member/${id}`,
    })
      .then((res) => {
        let post_data = [];

        res.data.posts.forEach((singleData) => {
          post_data.push({
            comment_list: singleData.comment,
            content: singleData.content,
            imgUrl: singleData.imgUrl,
            user_id: singleData.user,
            profile_img: singleData.user?.profile_img,
            day: singleData.createdAt.split("T")[0],
            post_id: singleData._id,
          });
        });
        dispatch(setPost(post_data));
      })
      .catch((error) => {
        if (error.res) {
          swal({
            title: error.res.data.errorMessage,
            icon: "error",
          });
        }
      });
  };
};

// UPDATE DB
const updatePostDB = (post_id, content, item) => {
  return function (dispatch, getState, { history }) {
    let formData = new FormData();

    formData.append("content", content);
    if (item !== null) {
      formData.append("BoardImg", item);
    }

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
        if (item !== null) {
          dispatch(
            updatePost(post_id, {
              content: content,
              imgUrl: res.data.post.imgUrl,
            })
          );
        } else {
          dispatch(updatePost(post_id, { content: content }));
        }
        swal({
          title: "수정 성공 ☺",
          text: "게시글 수정에 성공하였습니다❕",
          icon: "success",
        });
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
      headers: {
        // 백 분들과 맞춰보기
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    axios(options)
      .then((res) => {
        // 삭제할 건지 말지 한 번 더 물어볼까?
        dispatch(deletePost(post_id));
        swal({
          title: "삭제 성공 👋",
          closeOnClickOutside: false,
        });
        // window.location.reload();
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
        // draft.list.push(...action.payload.post_list);
        draft.list = action.payload.post_list;
        //draft.paging = action.payload.paging;
        //draft.likelist = action.payload.likelist;
        draft.is_loading = false;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
    [UPDATE_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex(
          (p) => p.post_id === action.payload.post_id
        );
        draft.list[idx] = { ...draft.list[idx], ...action.payload.content };
      }),
    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = draft.list.filter(
          (p) => p.post_id !== action.payload.post_id
        );
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
  getUserPostDB,
};

// export
export { actionCreators };
