import React, { useState } from 'react';
import { Avatar, Skeleton } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';
import { ExportOutlined } from '@ant-design/icons';
import UpdateUser from './UpdateUser';
import { history } from '../redux/configureStore';

const Header = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  // 유저 프로필 편집 모달
  const [userprofile, setUserprofile] = useState(false);
  const OpenModal = () => {
    setUserprofile(true);
  };
  const CloseModal = () => {
    setUserprofile(false);
  };

  return (
    <>
      <HeaderFrame>
        <Logo
          onClick={() => {
            history.push('/main');
          }}
          style={{ cursor: 'pointer' }}
        >
          🎨 Palette
        </Logo>
        <UserFrame>
          {!user ? (
            <>
              <Skeleton.Avatar active size={40} />
              <Skeleton.Input
                style={{ width: '52px', height: '22px', marginLeft: '14px' }}
                active
              />
            </>
          ) : (
            <>
              <Avatar
                size={40}
                style={{ backgroundColor: '#87d068', cursor: 'pointer' }}
                src={user?.profile_img}
                onClick={OpenModal}
              >
                {user?.profile_img === ' ' ? user?.nickname[0] : null}
              </Avatar>
              <p onClick={OpenModal} style={{ cursor: 'pointer' }}>
                {user?.nickname} 님
              </p>
            </>
          )}

          <LogOut>
            <ExportOutlined
              onClick={() => {
                dispatch(userActions.logOut());
                history.replace('/');
              }}
            />
          </LogOut>
        </UserFrame>
      </HeaderFrame>
      <UpdateUser status={userprofile} close={CloseModal} user={user} />
    </>
  );
};

const HeaderFrame = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: default;
`;

const Logo = styled.div`
  padding: 4px 12px 4px 28px;
  box-sizing: border-box;
  color: rgb(0, 0, 0, 0.85);
  font-size: 20px;
  font-weight: 600;
  line-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserFrame = styled.div`
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0 12px 0;
  & p {
    margin: 0 0 0 14px;
  }
`;
const LogOut = styled.div`
  cursor: pointer;
  margin-left: 14px;
  font-size: 20px;
  &:hover {
    color: #fe4a49;
  }
`;

export default Header;
