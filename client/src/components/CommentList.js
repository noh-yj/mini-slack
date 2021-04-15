import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { actionCreators as commentActions } from "../redux/modules/comment";
import Comment from "./Comment";

function CommentList({ post_id }) {
  const dispatch = useDispatch();
  const comment_list = useSelector((state) => state.comment.list);
  // 서버에 줄 데이터: user_id (리덕스에서 보내기), content, post_id
  // 서버에서 받을 데이터: user_id, user's nicname, user's profile img, content, post_id, comment's id
  const userInfo = useSelector((state) => state.user.user);
  // contents upload
  const [contents, setContents] = React.useState("");
  const changeContents = (e) => {
    setContents(e.target.value);
  };

  const addComment = () => {
    dispatch(commentActions.addCommentDB(post_id, contents));
    setContents("");
  };

  // React.useEffect(() => {
  //   // have this method start when not having a certain item of the list
  //   if (!comment_list[post_id]) {
  //     dispatch(commentActions.getCommentDB(post_id));
  //   }
  // }, []);
  return (
    <CommentListFrame>
      <CommentBox>
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </CommentBox>
      <WritingBox>
        <ElTextarea
          wrap="hard"
          placeholder="클린한 댓글을 작성해주세요!"
          autoFocus
          autoComplete="true"
          onChange={changeContents}
          value={contents}
        />
        <WriteCommentBtn onClick={addComment}>
          작<br />성
        </WriteCommentBtn>
      </WritingBox>
    </CommentListFrame>
  );
}

const CommentListFrame = styled.div`
  flex-basis: 50%;
  padding: 8px 12px;
  border: 1px solid #ececec;
  border-radius: 10px;
  background: #f0f2f5;
  position: relative;
  max-height: 80%;
`;

const CommentBox = styled.div`
  width: 100%;
  max-height: 80%;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 12px; /* width of the entire scrollbar */
  }

  ::-webkit-scrollbar-track {
    background: white; /* color of the tracking area */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #d8d9dc; /* color of the scroll thumb */
    border-radius: 20px; /* roundness of the scroll thumb */
    //border: 3px solid orange; /* creates padding around scroll thumb */
  }
`;

const WritingBox = styled.div`
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
`;

const ElTextarea = styled.textarea`
  box-sizing: border-box;
  flex-basis: 90%;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  overflow: auto;
  outline: none;

  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;

  resize: none; /*remove the resize handle on the bottom right*/

  & :focus {
    border: none;
  }
`;

const WriteCommentBtn = styled.button`
  flex-basis: 10%;
  border: none;
  border-radius: 10px;
  outline: none;
  background: #d8d9dc;
  color: white;
  cursor: pointer;
  :hover {
    background: #1890ff;
    transition: all 200ms ease-in-out;
  }
`;
export default CommentList;
