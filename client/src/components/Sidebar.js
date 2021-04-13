import React, { useEffect, useState } from 'react';
import { Menu, Avatar, Input } from 'antd';
import {
  MessageOutlined,
  UserOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { config } from '../config';

const { SubMenu } = Menu;

const Sidebar = (props) => {
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
    <Menu mode='inline' defaultOpenKeys={['sub1']} style={{ width: '100%' }}>
      <SubMenu key='sub1' icon={<UserOutlined />} title='유저 목록'>
        <Menu.Item key='search'>
          <Input
            placeholder='유저 검색하기'
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
              >
                {val.profile_img === ' ' ? val.nickname[0] : null}
              </Avatar>
              {val.nickname}
            </Menu.Item>
          );
        })}
      </SubMenu>
      <SubMenu key='sub2' icon={<MessageOutlined />} title='채팅 하기'>
        {users.map((val, idx) => {
          return (
            <Menu.Item key={idx + 'a'}>
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
  );
};

export default Sidebar;
