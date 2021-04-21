/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect } from 'react';
import _ from 'lodash';
import { Spin } from 'antd';

function InfinityScroll(props) {
  const { children, callNext, is_next, loading } = props;
  const height = document.getElementById('scroll');

  const _handleScroll = _.throttle(() => {
    if (loading) {
      return;
    }
    const offsetHeight = height.offsetHeight;
    const scrollHeight = height.scrollHeight;
    const scrollTop = height.scrollTop;

    if (scrollHeight - offsetHeight - scrollTop < 200) {
      console.log(scrollHeight, offsetHeight, scrollTop);
      callNext();
    }
  }, 300);
  const handleScroll = useCallback(_handleScroll, [loading]);
  useEffect(() => {
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
      {is_next && <Spin />}
    </>
  );
}

export default InfinityScroll;
