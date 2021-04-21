import React, { useState } from "react";
import styled from "styled-components";
import { Avatar, Image } from "antd";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import UserProfile from "./UserProfile";
import { useDispatch, useSelector } from "react-redux";
import post, { actionCreators as postActions } from "../redux/modules/post";
import emoji, { actionCreators as emojiActions } from "../redux/modules/emoji";
import {
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  CommentOutlined,
  SmileOutlined,
  ConsoleSqlOutlined,
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
  const post_list = useSelector((state) => state.post.list);
  const index = post_list.findIndex((p) => p.post_id === props.post_id);
  const _post = post_list[index];
  // console.log(_post.emoticon);

  let emoji_list = useSelector((state) => state.emoji.list[props.post_id]);
  let emoji_subList = emoji_list;
  emoji_list = [emoji_list];

  React.useEffect(() => {
    dispatch(emojiActions.setEmoji(props.post_id, _post.emoji));
  }, []);

  const onClick = (emoji, event) => {
    let index = emoji_subList.findIndex((e) => e.emoticon === emoji.native);
    if (
      index !== -1 &&
      emoji_subList[index][emoji.native].includes(userInfo?.uid)
    ) {
      dispatch(emojiActions.deleteEmojiDB(props.post_id, emoji.native));
      return;
    }
    dispatch(emojiActions.updateEmojiDB(props.post_id, emoji.native));
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
            <PostBody>
              <Image
                src={props?.imgUrl}
                style={{ width: "100%", height: "100%", borderRadius: "10px" }}
              />
            </PostBody>
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
                  showSearchBar={false}
                  onClick={onClick}
                />
              </PickerFrame>
            )}

            {emoji_list?.map((e, idx) => {
              {
                return e?.map((i, index) => {
                  if (i[i.emoticon]?.includes(userInfo?.uid) === true) {
                    return (
                      <Me_EmojiBtn
                        onClick={() => {
                          if (i[i.emoticon]?.includes(userInfo?.uid) === true) {
                            dispatch(
                              emojiActions.deleteEmojiDB(
                                props.post_id,
                                i.emoticon
                              )
                            );
                          }
                        }}
                        key={idx}
                      >
                        {i?.emoticon} {i[i.emoticon]?.length}
                      </Me_EmojiBtn>
                    );
                  }
                  return (
                    <Not_Me_EmojiBtn
                      key={index}
                      onClick={() => {
                        dispatch(
                          emojiActions.updateEmojiDB(props.post_id, i.emoticon)
                        );
                        console.log(props.post_id, i.emoticon);
                      }}
                    >
                      {i?.emoticon} {i[i.emoticon]?.length}
                    </Not_Me_EmojiBtn>
                  );
                });
              }
            })}
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

const PostBody = styled.div`
  width: 40%;
  @media only screen and (max-width: 375px) {
    width: 100%;
  }
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
  z-index: 1000;
`;

const Me_EmojiBtn = styled.button`
  border-radius: 10px !important;
  color: #1890ff !important;
  border: 2px solid #1890ff !important;
  margin-right: 4px;
`;

const Not_Me_EmojiBtn = styled.button`
  border-radius: 10px !important;
  color: #ececec !important;
  border: 2px solid #ececec !important;
  margin-right: 4px;
`;
export default Post;
