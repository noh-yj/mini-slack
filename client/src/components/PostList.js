import React from 'react';
import styled from 'styled-components';
import Post from './Post';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';

const PostList = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  console.log(post_list);

  React.useEffect(() => {
    // if (post_list.length === 0) {
    dispatch(postActions.getPostDB());
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PostListFrame>
      {post_list?.map((p, idx) => {
        return <Post key={idx} {...p} />;
      })}
    </PostListFrame>
  );
};

export default PostList;

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
    //border: 3px solid orange; /* creates padding around scroll thumb */
  }
`;
