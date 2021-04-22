/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect } from 'react';
import _ from 'lodash';
import { Spin } from 'antd';

function InfinityScroll(props) {
  const { children, callNext, is_next, loading } = props;
  // 메인 div 지정
  const height = document.getElementById('scroll');

  // throttle 300ms 지정 (300ms동안 일어난 이벤트를 모아 주기적으로 1번 실행)
  const _handleScroll = _.throttle(() => {
    // 로딩중일때는 리턴
    if (loading) {
      return;
    }
    // 스크롤 전체 영역
    const scrollHeight = height.scrollHeight;
    // 뷰 영역
    const offsetHeight = height.offsetHeight;
    // 스크롤바 수직 위치
    const scrollTop = height.scrollTop;

    if (scrollHeight - offsetHeight - scrollTop < 200) {
      // 영역이 200남으면 api 호출
      callNext();
    }
  }, 300);
  const handleScroll = useCallback(_handleScroll, [loading]);
  useEffect(() => {
    // 로딩중일때는 리턴
    if (loading) {
      return;
    }

    if (is_next) {
      height?.addEventListener('scroll', handleScroll);
    } else {
      height?.removeEventListener('scroll', handleScroll);
    }
    return () => {
      height?.removeEventListener('scroll', handleScroll);
    };
  }, [is_next, loading]);

  return (
    <>
      {children}
      {is_next && (
        <Spin
          size='large'
          tip='Loading...'
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}
    </>
  );
}

export default InfinityScroll;
