import React from "react";
import styled from "styled-components";
import { Avatar } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const Comment = (props) => {
  // console.log(props);
  const [contents, setContents] = React.useState("");
  const [isEdit, doEdit] = React.useState(false);
  const changeContents = (e) => {
    setContents(e.target.value);
  };
  const userId = useSelector((state) => state.user.user.uid);

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
        {userId === props.user.userId ? (
          <Btngroup>
            <button>
              <EditOutlined />
            </button>
            <button>
              <DeleteOutlined />
            </button>
          </Btngroup>
        ) : null}
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

const Btngroup = styled.div`
  display: inline-block;
  background: #ffffff;
  border: solid #ececec;
  border-radius: 10px;
  & > button {
    background: none;
    border: none;
    border-bottom: 1px solid #ececec;
    outline: none;
    :hover {
      background: #ececec;
      cursor: pointer;
    }
  }
`;
export default Comment;
