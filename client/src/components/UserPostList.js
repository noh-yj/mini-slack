import React from 'react';
import styled from 'styled-components';
import { Empty, Spin } from 'antd';
import Post from './Post';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';

const UserPostList = (props) => {
  const id = props.match.params.id;
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.user_post_list);
  const loading = useSelector((state) => state.post.is_loading);

  React.useEffect(() => {
    dispatch(postActions.getUserPostDB(id));
  }, [dispatch, id]);
  console.log(post_list);
  return (
    <PostListFrame>
      {loading ? (
        <Spin
          size='large'
          tip='Loading...'
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ) : (
        <>
          {post_list.length === 0 ? (
            <EmptyPost>
              <Empty />
            </EmptyPost>
          ) : (
            <>
              {post_list?.map((p, idx) => {
                return <Post key={idx} {...p} is_user />;
              })}
            </>
          )}
        </>
      )}
    </PostListFrame>
  );
};

const PostListFrame = styled.div`
  width: 100%;
  min-height: 80vh;
  background: #ffffff;
  padding: 8px 12px;
  height: 80vh;
  overflow: auto;
  position: relative;
  ::-webkit-scrollbar {
    width: 12px; /* width of the entire scrollbar */
  }

  ::-webkit-scrollbar-track {
    background: white; /* color of the tracking area */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #d8d9dc; /* color of the scroll thumb */
    border-radius: 20px; /* roundness of the scroll thumb */
    //border: 3px solid orange; /* creates padding around scroll thumb */
  }
`;
const EmptyPost = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: default;
`;

export default UserPostList;
