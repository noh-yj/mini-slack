import React from 'react';
import styled from 'styled-components';
import ChatList from './ChatList';

function ChatMain({ targetName }) {
  return (
    <>
      <PostListFrame>
        <ChatList targetName={targetName} />
      </PostListFrame>
    </>
  );
}

const PostListFrame = styled.div`
  width: 100%;
  min-height: 77.5vh;
  background: #ffffff;
  padding: 8px 12px;
  height: 77.5vh;
  overflow: auto;
  position: relative;
  ::-webkit-scrollbar {
    width: 12px; /* width of the entire scrollbar */
  }

  ::-webkit-scrollbar-track {
    background: white; /* color of the tracking area */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #d8d9dc; /* color of the scroll thumb */
    border-radius: 20px; /* roundness of the scroll thumb */
  }
`;

export default ChatMain;
