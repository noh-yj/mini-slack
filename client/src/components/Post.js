import React, { useState } from 'react';
import styled from 'styled-components';
import { Avatar, Image } from 'antd';
import UserProfile from './UserProfile';

const Post = (props) => {
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
        <Postsub>
          <Avatar
            style={{
              backgroundColor: '#87d068',
              cursor: 'pointer',
              width: '3rem',
              height: '3rem',
              borderRadius: '30%',
              marginRight: '0.5rem',
            }}
            src={props?.profile_img}
            onClick={OpenModal}
          >
            {props?.profile_img === ' ' ? props?.nickname[0] : null}
          </Avatar>
          <PostInfo>
            <UserInfo>
              <UserName onClick={OpenModal}>{props.user_id?.nickname}</UserName>
              <WritingDt>{props.day}</WritingDt>
            </UserInfo>
            <ContentBox>{props.content}</ContentBox>
          </PostInfo>
        </Postsub>
        <ImgBox style={{ width: '40%', height: '40%' }}>
          {props.imgUrl && (
            <Image
              src={props.imgUrl}
              style={{ width: '100%', height: '100%', borderRadius: '10px' }}
            />
          )}{' '}
        </ImgBox>
      </PostFrame>
      <UserProfile status={userprofile} close={CloseModal} user={props} />
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

const ImgBox = styled.div`
  width: 40%;
  height: 40%;
  border-radius: 10px;
`;

const PostImg = styled.img`
  width: 40%;
  height: 40%;
  border-radius: 10px;
`;

export default Post;
