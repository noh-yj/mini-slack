import React from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';
import Post from './Post';
import InfinityScroll from '../shared/InfinityScroll';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';

const PostList = (props) => {
  const dispatch = useDispatch();
  // 게시물
  const post_list = useSelector((state) => state.post.list);
  // 페이지
  const paging = useSelector((state) => state.post.paging);
  // 무한스크롤 게시물 호출 시 로딩
  const scroll_loading = useSelector((state) => state.post.scroll_loading);
  // 랜더링 시 로딩
  const view_loading = useSelector((state) => state.post.view_loading);

  React.useEffect(() => {
    dispatch(postActions.getPostDB());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PostListFrame id='scroll'>
      {view_loading ? (
        <>
          <InfinityScroll
            callNext={() => {
              // 다음페이지 존재시 api 호출
              dispatch(postActions.getPostDB(paging.page));
            }}
            is_next={paging.page ? true : false}
            loading={scroll_loading}
          >
            {post_list?.map((p, idx) => {
              return <Post key={idx} {...p} />;
            })}
          </InfinityScroll>
        </>
      ) : (
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
      )}
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
