import React from "react";
import styled from "styled-components";

const Comment = (props) => {
  return (
    <>
      <CommentFrame></CommentFrame>
    </>
  );
};

const CommentFrame = styled.div`
  width: 100%;
  background: white;
`;

export default Comment;
