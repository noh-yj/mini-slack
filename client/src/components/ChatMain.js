import React from 'react';
import styled from 'styled-components';
import ChatList from './ChatList';
import ChatInput from './ChatInput';

function ChatMain({ socket, username, room }) {
  return (
    <>
      <PostListFrame>
        <ChatList socket={socket} />
        <ChatInput socket={socket} username={username} room={room} />
      </PostListFrame>
    </>
  );
}

const PostListFrame = styled.div`
  width: 100%;
  min-height: 80vh;
  background: #ffffff;
  padding: 8px 12px;
  height: 80vh;
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
    //border: 3px solid orange; /* creates padding around scroll thumb */
  }
`;

export default ChatMain;
