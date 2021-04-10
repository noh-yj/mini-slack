import React from "react";
import styled from "styled-components";

const PostWrite = (props) => {
  return (
    <WriteFrame>
      <WritingSection>
        <WritingHeader>게시글 작성</WritingHeader>
        <div>1</div>
      </WritingSection>
    </WriteFrame>
  );
};

const WriteFrame = styled.div`
  display: flex;
  justify-content: center;
`;

const WritingSection = styled.section`
  width: 40%;
  border: 1px solid #ffb627;
  border-radius: 10px;
  background: yellow;
  box-sizing: border-box;
`;

const WritingHeader = styled.div`
  width: 100%;
  background: white;
  border-bottom: 1px solid #ffb627;
  font-size: 3rem;
`;

export default PostWrite;
