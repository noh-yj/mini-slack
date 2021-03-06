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
import { history } from '../redux/configureStore';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as chatActions } from '../redux/modules/chat';

const { SubMenu } = Menu;

const Sidebar = ({ room }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const uid = useSelector((state) => state.user.user?.uid);
  const users = useSelector((state) => state.chat.user_list);

  useEffect(() => {
    // 전체 유저 조회
    dispatch(chatActions.middlewareUsers());
    // 전역소켓 연결
    chatActions.globalSocket.connect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // 베지 및 알림
    dispatch(chatActions.globalAddChatList(room));
    return () => {
      // 언마운트 시 socket off
      chatActions.globalSocket.off();
    };
  }, [dispatch, room]);

  // 유저 검색 필터
  let searchUser = users.filter((val) => {
    return val.nickname.indexOf(search) > -1;
  });

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
                    // 유저가 작성한 게시물로 이동
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
                    // 채팅 페이지 이동
                    history.push(`/chat/${val.id}/${uid}/${val.nickname}`);
                    dispatch(chatActions.badgeOff(val.id));
                  }}
                >
                  <>
                    <Badge dot={val.is_badge}>
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
