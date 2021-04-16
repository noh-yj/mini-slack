import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { actionCreators as commentActions } from "../redux/modules/comment";
import Comment from "./Comment";

function CommentList({ post_id, comment_list }) {
  console.log(comment_list);
  const dispatch = useDispatch();
  // const userInfo = useSelector((state) => state.user.user);
  // contents upload
  const [contents, setContents] = React.useState("");
  const changeContents = (e) => {
    setContents(e.target.value);
  };

  const addComment = () => {
    dispatch(commentActions.addCommentDB(post_id, contents));
    setContents("");
  };

  return (
    <CommentListFrame>
      <CommentBox>
        {comment_list?.map((c) => {
          return <Comment key={c._id} {...c} />;
        })}
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
