import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';
import Spinner from './Spinner';

function Social(props) {
  const id = props.match.params.id;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userActions.socialLoginDB(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Spinner />
    </>
  );
}

export default Social;
