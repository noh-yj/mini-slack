import React from "react";
import styled from "styled-components";
import { Avatar } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CheckSquareOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";

const Comment = (props) => {
  const dispatch = useDispatch();
  const [contents, setContents] = React.useState(props.content);
  const [isEdit, doEdit] = React.useState(false);

  const setEdit = () => {
    if (isEdit) {
      doEdit(false);
      return;
    }
    doEdit(true);
  };

  const changeContents = (e) => {
    setContents(e.target.value);
  };

  const updateComment = () => {
    dispatch(
      commentActions.updateCommentDB(props.post_id, props._id, contents)
    );
  };

  const deleteComment = () => {
    dispatch(commentActions.deleteCommentDB(props.post_id, props._id));
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
            src={props.user?.profile_img}
          >
            {props.user?.profile_img === " " ? props.user?.nickname[0] : null}
          </Avatar>
          <span>{props.user ? props.user.nickname : "User Name"}</span>
        </UserFrame>
        {isEdit ? (
          <>
            <ElTextarea rows={1} value={contents} onChange={changeContents} />
            <Btngroup>
              <button
                onClick={() => {
                  updateComment();
                  setEdit(false);
                }}
              >
                <CheckSquareOutlined />
              </button>
              <button
                onClick={() => {
                  setEdit(false);
                  setContents(props.content);
                }}
              >
                <RollbackOutlined />
              </button>
            </Btngroup>
          </>
        ) : (
          <>
            <CommentBox>
              {props.content}
              <CommentDate>{props.createdAt.split("T")[0]}</CommentDate>
            </CommentBox>
            {userId === props.user.userId ? (
              <Btngroup>
                <button onClick={setEdit}>
                  <EditOutlined />
                </button>
                <button onClick={deleteComment}>
                  <DeleteOutlined />
                </button>
              </Btngroup>
            ) : null}
          </>
        )}
      </CommentFrame>
    </>
  );
};

const CommentFrame = styled.div`
  width: 90%;
  background: white;
  border-radius: 10px;
  padding: 4px 10px;
  margin: 8px 0;
  display: flex;
  :hover {
    background: #ffffed;
  }
`;

const UserFrame = styled.div`
  width: 30%;
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

const CommentBox = styled.p`
  width: 70%;
  padding: 10px 0 12px;
  margin: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CommentDate = styled.span``;

const Btngroup = styled.div`
  display: inline-block;
  border-radius: 10px;
  & > button {
    background: none;
    border: none;
    border: 1px solid #ececec;
    border-radius: 10px;
    outline: none;
    :hover {
      background: #ececec;
      cursor: pointer;
    }
  }
`;

const InputBox = styled.input``;

const ElTextarea = styled.textarea`
  box-sizing: border-box;
  width: 50%;
  font-size: 1rem;
  border: none;
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
export default Comment;
