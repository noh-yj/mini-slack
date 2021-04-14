import React from "react";
import styled from "styled-components";

const Post = (props) => {
  return (
    <>
      <PostFrame>
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
`;

const Postsub = styled.div`
  display: flex;
`;

const PostInfo = styled.div``;

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
