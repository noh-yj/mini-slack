import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Menu, Avatar, Input, Badge } from 'antd';
import {
  MessageOutlined,
  UserOutlined,
  CloseOutlined,
  FrownOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { config } from '../config';
import { history } from '../redux/configureStore';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as chatActions } from '../redux/modules/chat';

const { SubMenu } = Menu;

const Sidebar = ({ room }) => {
  const dispatch = useDispatch();
  let [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const uid = useSelector((state) => state.user.user?.uid);
  const is_badge = useSelector((state) => state.chat.is_badge);
  const alert_user = useSelector((state) => state.chat.receive_info);

  useEffect(() => {
    axios({
      method: 'get',
      url: `${config.api}/member`,
    }).then((res) => {
      setUsers(res.data.users);
    });
    // 전역소켓 연결
    chatActions.globalSocket.connect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // 검색 필터
  let searchUser = users.filter((val) => {
    return val.nickname.indexOf(search) > -1;
  });

  useEffect(() => {
    // 베지 및 알림
    dispatch(chatActions.globalAddChatList(room));

    return () => {
      // 언마운트 시 socket off
      chatActions.globalSocket.off();
    };
  }, [dispatch, room]);

  return (
    <>
      <PostListFrame>
        <Menu
          mode='inline'
          defaultOpenKeys={['sub1', 'sub2']}
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

            {searchUser.map((val, idx) => {
              return (
                <Menu.Item
                  key={idx}
                  onClick={() => {
                    history.push(`/user/post/${val.id}`);
                  }}
                >
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
            {searchUser.length === 0 ? (
              <Menu.Item style={{ textAlign: 'center' }}>
                유저 정보가 없습니다 &nbsp;
                <FrownOutlined />
              </Menu.Item>
            ) : null}
          </SubMenu>
          <SubMenu key='sub2' icon={<MessageOutlined />} title='채팅 하기'>
            {users.map((val, idx) => {
              return (
                <Menu.Item
                  key={idx + 'msg'}
                  onClick={() => {
                    history.push(`/chat/${val.id}/${uid}/${val.nickname}`);
                    if (val.nickname === alert_user.username) {
                      dispatch(chatActions.badge(false));
                    }
                  }}
                >
                  {/* 배지 테스트 중 */}
                  {val.nickname === alert_user.username ? (
                    <>
                      <Badge dot={is_badge}>
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
                      </Badge>
                      {val.nickname}
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
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
