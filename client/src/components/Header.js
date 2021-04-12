import React, { useState } from 'react';
import { PageHeader, Avatar } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../redux/configureStore';
import { actionCreators as userActions } from '../redux/modules/user';
import { LogoutOutlined } from '@ant-design/icons';
import UpdateUser from './UpdateUser';

const Header = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
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
        <PageHeader className='site-page-header' title='🎨 Palette' />
        <UserFrame>
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

          <LogoutOutlined
            onClick={() => {
              dispatch(userActions.logOut());
              history.replace('/');
            }}
            style={{ cursor: 'pointer', marginLeft: '14px' }}
          />
        </UserFrame>
      </HeaderFrame>
      <UpdateUser status={userprofile} close={CloseModal} />
    </>
  );
};

const HeaderFrame = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: default;
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

export default Header;
