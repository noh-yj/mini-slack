import React from "react";
import styled from "styled-components";
import { Avatar } from "antd";

const Comment = (props) => {
  return (
    <>
      <CommentFrame>
        <UserFrame>
          <Avatar
            size={40}
            style={{
              backgroundColor: "#87d068",
              cursor: "pointer",
              margin: "0 8px 0 0",
            }}
            src={props.user.profile_img}
          >
            {props.user.profile_img === " " ? props.user.nickname[0] : null}
          </Avatar>
          <span>{props.user ? props.user.nickname : "User Name"}</span>
        </UserFrame>
        <CommentBox>{props.content}</CommentBox>
      </CommentFrame>
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

const UserFrame = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 0 12px 0;
  & img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    margin-right: 8px;
  }
`;

const CommentBox = styled.p``;
export default Comment;
