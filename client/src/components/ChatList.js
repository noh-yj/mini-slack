import React, { useEffect, useState } from 'react';

function ChatList({ socket }) {
  const [msgList, setMsgList] = useState([]);
  useEffect(() => {
    socket.on('receive', (res) => {
      console.log(res);
      setMsgList.push(res);
    });
    socket.on('load', (res) => {
      console.log(res);
      setMsgList(...res);
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <>
      <div>채팅 리스트</div>
      {msgList.map((val) => {
        return (
          <>
            <div>{val.username}</div>
            <div>{val.msg}</div>
            <div>{val.createdAt}</div>
          </>
        );
      })}
    </>
  );
}

export default ChatList;
