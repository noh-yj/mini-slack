import React, { useState } from "react";
import styled from "styled-components";
import { Avatar, Image } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import "animate.css";

import CommentList from "./CommentList";

const Detail = (props) => {
  console.log(props);
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
  // 유저 프로필 모달
  const [userprofile, setUserprofile] = useState(false);
  const OpenModal = () => {
    setUserprofile(true);
  };

  return (
    <>
      {props && (
        <PostFrame>
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
                src={props?.user_id.profile_img}
                onClick={OpenModal}
              >
                {props?.user_id.profile_img === " "
                  ? props?.user_id.nickname[0]
                  : null}
              </Avatar>
              <PostInfo>
                <UserInfo>
                  <UserName onClick={OpenModal}>
                    {props?.user_id.nickname}
                  </UserName>
                  <WritingDt>{props?.day}</WritingDt>
                </UserInfo>
              </PostInfo>
            </Postsub>
            <ContentBox>{props?.content}</ContentBox>
            {props?.imgUrl && (
              <Image
                src={props?.imgUrl}
                style={{ width: "100%", height: "100%", borderRadius: "10px" }}
              />
            )}
          </PostBox>

          <CommentList post_id={props.post_id} />
        </PostFrame>
      )}
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
  background: white;
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

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const UserName = styled.span`
  font-size: 18px;
  margin-right: 0.5rem;
  cursor: pointer;
`;

const WritingDt = styled.span``;

const ContentBox = styled.p`
  margin: 16px 0;
  font-size: 1.2rem;
`;

// 포스트와 댓글 박스를 구별해주기 위함
// 포스트 박스
const PostBox = styled.div``;

const CommentFrame = styled.div`
  & > button {
    border: none;
    outline: none;
    background: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #c1c1c1;
    :hover {
      color: #262626;
      transform: scale(1.1);
      transition: all 200ms ease-in-out;
    }
  }
`;

export default Detail;
