import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { actionCreators as commentActions } from "../redux/modules/comment";
import Comment from "./Comment";

function CommentList({ post_id }) {
  const dispatch = useDispatch();
  const commentList = useSelector((state) => state.comment.list);

  // contents upload
  const [contents, setContents] = React.useState("");
  const changeContents = (e) => {
    setContents(e.target.value);
  };

  const addComment = () => {
    dispatch(commentActions.addCommentDB(post_id, contents));
    setContents("");
  };

  React.useEffect(() => {
    dispatch(commentActions.getCommentDB(post_id));
  }, []);

  return (
    <CommentListFrame>
      <WritingBox>
        <ElTextarea
          wrap="hard"
          placeholder="클린한 댓글을 작성해주세요!"
          autoFocus
          autoComplete="true"
          onChange={changeContents}
          value={contents}
        />
        <WriteCommentBtn onClick={addComment}>작 성</WriteCommentBtn>
      </WritingBox>
      <CommentBox>
        {commentList[post_id]?.map((c) => {
          return <Comment key={c._id} post_id={post_id} {...c} />;
        })}
      </CommentBox>
    </CommentListFrame>
  );
}

const CommentListFrame = styled.div`
  padding: 8px 12px;
  border: 1px solid #ececec;
  border-radius: 10px;
  background: #f0f2f5;
`;

const CommentBox = styled.div`
  width: 100%;
  max-height: 60vh;
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
