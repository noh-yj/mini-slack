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
} from "@ant-design/icons";
import EditPostModal from "./EditPostModal";

const Post = (props) => {
  // Modal control operations
  const [isModalOpen, setModal] = useState(false);

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
              <UserName onClick={OpenModal}>{props.user_id?.nickname}</UserName>
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
  flex-direction: column;
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

export default Post;
