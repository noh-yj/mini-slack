import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Menu, Avatar, Input } from 'antd';
import {
  MessageOutlined,
  UserOutlined,
  CloseOutlined,
  FrownOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { config } from '../config';
// Post에 가야하는 컴포넌트 뷰 그리기위해 일시 적 위치
import UserProfile from './UserProfile';

const { SubMenu } = Menu;

const Sidebar = (props) => {
  const [userprofile, setUserprofile] = useState(false);
  const OpenModal = () => {
    setUserprofile(true);
  };
  const CloseModal = () => {
    setUserprofile(false);
  };

  let [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    axios({
      method: 'get',
      url: `${config.api}/member`,
    }).then((res) => {
      setUsers(res.data.users);
    });
  }, []);
  users = users.filter((val) => {
    return val.nickname.indexOf(search) > -1;
  });
  return (
    <>
      <UserProfile status={userprofile} close={CloseModal} />
      <PostListFrame>
        <Menu
          mode='inline'
          defaultOpenKeys={['sub1']}
          style={{ width: '100%' }}
        >
          <SubMenu key='sub1' icon={<UserOutlined />} title='유저 목록'>
            <Menu.Item key='search'>
              <Input
                placeholder='유저 검색하기'
                prefix={<SearchOutlined style={{ cursor: 'default' }} />}
                suffix={
                  <CloseOutlined
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setSearch('');
                    }}
                  />
                }
                style={{ padding: '10px 10px 10px 25px' }}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                value={search}
              />
            </Menu.Item>

            {users.map((val, idx) => {
              return (
                <Menu.Item key={idx}>
                  <Avatar
                    size={30}
                    style={{
                      backgroundColor: '#87d068',
                      cursor: 'pointer',
                      marginRight: '20px',
                    }}
                    src={val.profile_img}
                    onClick={OpenModal}
                  >
                    {val.profile_img === ' ' ? val.nickname[0] : null}
                  </Avatar>
                  {val.nickname}
                </Menu.Item>
              );
            })}
            {users.length === 0 ? (
              <Menu.Item style={{ textAlign: 'center' }}>
                유저 정보가 없습니다 &nbsp;
                <FrownOutlined />
              </Menu.Item>
            ) : null}
          </SubMenu>
          <SubMenu key='sub2' icon={<MessageOutlined />} title='채팅 하기'>
            {users.map((val, idx) => {
              return (
                <Menu.Item key={idx + 'msg'}>
                  <Avatar
                    size={30}
                    style={{
                      backgroundColor: '#87d068',
                      cursor: 'pointer',
                      marginRight: '20px',
                    }}
                    src={val.profile_img}
                  >
                    {val.profile_img === ' ' ? val.nickname[0] : null}
                  </Avatar>
                  {val.nickname}
                </Menu.Item>
              );
            })}
          </SubMenu>
        </Menu>
      </PostListFrame>
    </>
  );
};
const PostListFrame = styled.div`
  width: 100%;
  min-height: 80vh;
  background: #ffffff;
  padding: 8px 12px;
  height: 80vh;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 12px; /* width of the entire scrollbar */
  }

  ::-webkit-scrollbar-track {
    background: white; /* color of the tracking area */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #d8d9dc; /* color of the scroll thumb */
    border-radius: 20px; /* roundness of the scroll thumb */
  }
`;

export default Sidebar;
