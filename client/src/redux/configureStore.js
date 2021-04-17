import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';
import user from './modules/user';
import Post from './modules/post';
import Comment from './modules/comment';
import chat from './modules/chat';

export const history = createBrowserHistory();

// 리듀서 합치기
const rootReducer = combineReducers({
  user: user,
  post: Post,
  comment: Comment,
  chat: chat,
  router: connectRouter(history),
});

// 미들웨어
const middlewares = [thunk.withExtraArgument({ history: history })];

// 리덕스-로거
const env = process.env.NODE_ENV;
if (env === 'development') {
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}
// redux-devtools
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));
// 스토어
let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
