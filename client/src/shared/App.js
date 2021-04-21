import React, { useEffect } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configureStore';
import { useDispatch } from 'react-redux';
import { getCookie } from './Cookie';
import { actionCreators as userActions } from '../redux/modules/user';
import Test from '../pages/Test';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Main from '../pages/Main';
import UserPost from '../pages/UserPost';
import Social from './Social';
import Chat from '../pages/Chat';
import PostDetail from '../pages/PostDetail';

function App() {
  const dispatch = useDispatch();
  const cookie = getCookie('is_login') ? true : false;
  useEffect(() => {
    // 쿠키(토큰) 값이 존재하면 회원정보를 불러옴(새로고침 시 회원 정보 날라갈때)
    if (cookie) {
      dispatch(userActions.getUserDB());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ConnectedRouter history={history}>
        <Route path='/test' exact component={Test} />
        <Route path='/' exact component={Login} />
        <Route exact path='/main' component={Main} />
        <Route path='/signup' exact component={Signup} />
        <Route path='/social/:id' exact component={Social} />
        <Route path='/user/post/:id' exact component={UserPost} />
        <Route path='/chat/:otherId/:myId/:otherName' exact component={Chat} />
        <Route exact path='/detail/:id' component={PostDetail} />
      </ConnectedRouter>
    </>
  );
}

export default App;
