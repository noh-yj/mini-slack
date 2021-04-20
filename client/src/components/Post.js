import React, { useState } from "react";
import styled from "styled-components";
import { Avatar, Image } from "antd";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import UserProfile from "./UserProfile";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as emojiActions } from "../redux/modules/emoji";
import {
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  CommentOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import EditPostModal from "./EditPostModal";
import "animate.css";

import { history } from "../redux/configureStore";

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

  const deletePost = () => {
    console.log(props.post_id);
    dispatch(postActions.deletePostDB(props.post_id));
  };
  // 유저 프로필 모달
  const [userprofile, setUserprofile] = useState(false);
  const OpenModal = () => {
    setUserprofile(true);
  };
  const CloseModal = () => {
    setUserprofile(false);
  };

  // Emoji button
  const [isOn, setBtn] = useState(false);

  const emojiBtn = () => {
    if (isOn) {
      setBtn(false);
      return;
    }
    setBtn(true);
  };

  // Emoji functions (update & delete)
  const onClick = (emoji, event) => {
    //  emoji_list.push({ emoji: emoji.native, user_name: "henry" });
    //  console.log(emoji_list);
    dispatch(emojiActions.updateEmojiDB(props.post_id, emoji.native));
  };

  const updateEmoji = () => {
    dispatch();
  };

  return (
    <>
      <PostFrame
        onClick={() => {
          if (isOpen) {
            setToggle(false);
          }
          if (isOn) {
            setBtn(false);
          }
        }}
      >
        {userInfo?.uid === props.user_id?.userId ? (
          <MoreBtn onClick={toggleBtn}>
            <MoreOutlined />
          </MoreBtn>
        ) : null}

        {userInfo?.uid === props.user_id?.userId && isOpen ? (
          <Btngroup>
            <button onClick={modalBtn}>
              <EditOutlined />
            </button>
            <button>
              <DeleteOutlined onClick={deletePost} />
            </button>
          </Btngroup>
        ) : null}
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
              src={props.user_id?.profile_img}
              onClick={OpenModal}
            >
              {props.user_id?.profile_img === " "
                ? props.user_id?.nickname[0]
                : null}
            </Avatar>
            <PostInfo>
              <UserInfo>
                <UserName onClick={OpenModal}>
                  {props.user_id?.nickname}
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
          <CommentFrame>
            <button
              onClick={() => {
                history.push(`/detail/${props.post_id}`);
              }}
            >
              <CommentOutlined />
            </button>
            <ToggleBtn onClick={emojiBtn}>
              {isOn ? (
                <SmileOutlined style={{ fontSize: "24px", color: "#08c" }} />
              ) : (
                <SmileOutlined style={{ fontSize: "24px", color: "gray" }} />
              )}
            </ToggleBtn>
            {/* <Picker onSelect={this.addEmoji} /> */}
            {isOn && (
              <PickerFrame>
                <Picker
                  className="pickerBtn"
                  title="Pick your emoji…"
                  emoji="point_up"
                  enableFrequentEmojiSort={true}
                  native={true}
                  onClick={onClick}
                />
              </PickerFrame>
            )}
          </CommentFrame>
        </PostBox>
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

// Emoji related styling
const ToggleBtn = styled.button`
  width: 50px;
  height: 50px;
  background: none;
  outline: none;
  border: none;
`;

const PickerFrame = styled.div`
  position: absolute;
  z-index: 5;
`;
export default Post;
