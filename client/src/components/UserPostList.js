import React from 'react';
import styled from 'styled-components';
import { Empty } from 'antd';
import Post from './Post';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';

const UserPostList = (props) => {
  const id = props.match.params.id;
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  React.useEffect(() => {
    dispatch(postActions.getUserPostDB(id));
  }, [dispatch, id]);

  return (
    <PostListFrame>
      {post_list.length === 0 ? (
        <EmptyPost>
          <Empty />
        </EmptyPost>
      ) : null}
      {post_list?.map((p, idx) => {
        return <Post key={idx} {...p} />;
      })}
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
