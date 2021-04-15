import React, { useState } from "react";
import styled from "styled-components";
import { Avatar, Image } from "antd";
import UserProfile from "./UserProfile";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import {
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  RedoOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import EditPostModal from "./EditPostModal";
import "animate.css";

import CommentList from "./CommentList";

const Post = (props) => {
  // Modal control operations
  const [isModalOpen, setModal] = useState(false);
  const [isCommentOpen, openCommentBox] = useState(false);

  const modalBtn = () => {
    setModal(true);
  };

  const closeModal = (event) => {
    if (event === undefined) {
      setModal(false);
      return;
    }
    // 현재 함수가 걸려있는 target 과 구분해주기 위함.
    if (event.target !== event.currentTarget) {
      return;
    }
    setModal(false);
  };

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

  const [userprofile, setUserprofile] = useState(false);
  const OpenModal = () => {
    setUserprofile(true);
  };
  const CloseModal = () => {
    setUserprofile(false);
  };

  const commentOn = () => {
    if (!isCommentOpen) {
      openCommentBox(true);
      return;
    }
    openCommentBox(false);
  };

  return (
    <>
      <PostFrame>
        {userInfo?.uid === props.user_id.userId ? (
          <MoreBtn onClick={toggleBtn}>
            <MoreOutlined />
          </MoreBtn>
        ) : null}

        {isOpen && (
          <Btngroup>
            <button onClick={modalBtn}>
              <EditOutlined />
            </button>
            <button>
              <DeleteOutlined onClick={deletePost} />
            </button>
            <button onClick={closeToggle}>
              <RedoOutlined />
            </button>
          </Btngroup>
        )}
        <PostBox>
          <Postsub>
            <Avatar
              style={{
                backgroundColor: "#87d068",
                cursor: "pointer",
                width: "3rem",
                height: "3rem",
                borderRadius: "30%",
                marginRight: "0.5rem",
                fontSize: "25px",
                display: "flex",
                alignItems: "center",
              }}
              src={props.profile_img}
              onClick={OpenModal}
            >
              {props.profile_img === " " ? props.user_id?.nickname[0] : null}
            </Avatar>
            <PostInfo>
              <UserInfo>
                <UserName onClick={OpenModal}>
                  {props.user_id?.nickname}
                </UserName>
                <WritingDt>{props.day}</WritingDt>
              </UserInfo>
              <ContentBox>{props.content}</ContentBox>
            </PostInfo>
          </Postsub>
          <ImgBox style={{ width: "40%", height: "40%" }}>
            {props.imgUrl && (
              <Image
                src={props.imgUrl}
                style={{ width: "100%", height: "100%", borderRadius: "10px" }}
              />
            )}{" "}
          </ImgBox>
          <CommentFrame>
            <button onClick={commentOn}>
              <CommentOutlined />
            </button>
          </CommentFrame>
        </PostBox>
        {isCommentOpen && <CommentList post_id={props.post_id} />}
      </PostFrame>
      <UserProfile status={userprofile} close={CloseModal} user={props} />
      <EditPostModal
        status={isModalOpen}
        close={closeModal}
        post_info={props}
      />
    </>
  );
};

const PostFrame = styled.div`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ececec;
  border-radius: 10px;
  display: flex;
  margin-bottom: 10px;
  position: relative;
  cursor: default;
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
  z-index: 5;
  :hover {
    background: #d8d9dc;
    border-radius: 50%;
    cursor: pointer;
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
  z-index: 5;
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

// const UserImg = styled.img`
//   width: 3rem;
//   height: 3rem;
//   border-radius: 30%;
//   margin-right: 0.5rem;
// `;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserName = styled.span`
  font-size: 18px;
  margin-right: 0.5rem;
  cursor: pointer;
`;

const WritingDt = styled.span``;

const ContentBox = styled.p``;

const ImgBox = styled.div`
  width: 40%;
  height: 40%;
  border-radius: 10px;
`;

// const PostImg = styled.img`
//   width: 40%;
//   height: 40%;
//   border-radius: 10px;
// `;

// 포스트와 댓글 박스를 구별해주기 위함
// 포스트 박스
const PostBox = styled.div`
  position: relative;
  flex-basis: 50%;
`;

const CommentFrame = styled.div`
  position: absolute;
  right: 36%;
  top: 50%;
  & > button {
    border: none;
    outline: none;
    background: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #c1c1c1;
    :hover {
      /* animation: bounce; /* referring directly to the animation's @keyframe declaration */
      /* animation-duration: 1s; don't forget to set a duration! */
      color: #262626;
      transform: scale(1.1);
      transition: all 200ms ease-in-out;
    }
  }
`;

export default Post;
