import React from "react";
import styled from "styled-components";

const Comment = (props) => {
  return (
    <>
      <CommentFrame>나는 몰라요... </CommentFrame>
    </>
  );
};

const CommentFrame = styled.div`
  width: 100%;
  background: white;
  border-radius: 10px;
  padding: 4px 10px;
  margin-bottom: 8px;
`;

export default Comment;
