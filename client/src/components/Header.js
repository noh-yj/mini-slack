import React, { useState } from 'react';
import { PageHeader, Avatar } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';
import { ExportOutlined } from '@ant-design/icons';
import UpdateUser from './UpdateUser';
import { history } from '../redux/configureStore';

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
        <div
          onClick={() => {
            history.push('/main');
          }}
          style={{ cursor: 'pointer' }}
        >
          LOGO
        </div>
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
