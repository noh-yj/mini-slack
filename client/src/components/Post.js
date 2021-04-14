import React, { useState } from "react";
import styled from "styled-components";
import { actionCreators as postActions } from "../redux/modules/post";
import { useSelector, useDispatch } from "react-redux";
import {
  MoreOutlined,
  DeleteOutlined,
  EditOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const Post = (props) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.user);
  const [isOpen, setToggle] = useState(false);
  const toggleBtn = () => {
    if (isOpen === false) {
      setToggle(true);
      return;
    }
    setToggle(false);
  };

  const closeToggle = () => {
    setToggle(false);
  };

  const deletePost = () => {
    console.log(props.post_id);
    dispatch(postActions.deletePostDB(props.post_id));
  };
  return (
    <>
      <PostFrame>
        <MoreBtn onClick={toggleBtn}>
          <MoreOutlined />
        </MoreBtn>

        {isOpen && (
          <Btngroup>
            <button>
              <EditOutlined />
            </button>
            <button>
              <DeleteOutlined onClick={deletePost} />
            </button>
            <button onClick={closeToggle}>
              <CloseOutlined />
            </button>
          </Btngroup>
        )}
        <Postsub>
          <UserImg src={props.profile_img} />
          <PostInfo>
            <UserInfo>
              <UserName>{props.user_id?.nickname}</UserName>
              <WritingDt>{props.day}</WritingDt>
            </UserInfo>
            <ContentBox>{props.content}</ContentBox>
          </PostInfo>
        </Postsub>
        <div>{props.imgUrl && <PostImg src={props.imgUrl} />}</div>
      </PostFrame>
    </>
  );
};

const PostFrame = styled.div`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ececec;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  position: relative;
`;

const Postsub = styled.div`
  display: flex;
`;

const PostInfo = styled.div``;

const MoreBtn = styled.button`
  background: none;
  border: none;
  position: absolute;
  right: 10px;
  outline: none;
  :hover {
    background: #ececec;
    border-radius: 50%;
  }
`;

const Btngroup = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 3rem;
  background: #ffffff;
  right: 10px;
  border: solid #ececec;
  border-radius: 10px;
  & > button {
    background: none;
    border: none;
    border-bottom: 1px solid #ececec;
    outline: none;
    :hover {
      background: #ececec;
    }
  }
`;

const UserImg = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 30%;
  margin-right: 0.5rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserName = styled.span`
  font-size: 18px;
  margin-right: 0.5rem;
`;

const WritingDt = styled.span``;

const ContentBox = styled.p``;

const PostImg = styled.img`
  width: 40%;
  height: 40%;
  border-radius: 10px;
`;

export default Post;
