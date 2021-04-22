import React from "react";
import styled from "styled-components";
import { Avatar, Image } from "antd";
import "animate.css";

import CommentList from "./CommentList";

const Detail = (props) => {
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
              >
                {props?.user_id.profile_img === " "
                  ? props?.user_id.nickname[0]
                  : null}
              </Avatar>
              <PostInfo>
                <UserInfo>
                  <UserName>{props?.user_id.nickname}</UserName>
                  <WritingDt>{props?.day}</WritingDt>
                </UserInfo>
              </PostInfo>
            </Postsub>
            <ContentBox>{props?.content}</ContentBox>
            {props?.imgUrl && (
              <PostBody>
                <Image
                  src={props?.imgUrl}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "10px",
                  }}
                />
              </PostBody>
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
  height: 80vh;
  overflow: auto;
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

export default Detail;
