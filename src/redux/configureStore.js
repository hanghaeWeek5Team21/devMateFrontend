
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";
import Post from "./modules/Post_module";
import User from "./modules/User_module";
import Detail from "./modules/Detail_module";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  user: User,
  post: Post,
  // comment: Comment,
  detail: Detail,
  Router: connectRouter(history),
});

// 미들웨어 (thunk) 설정
const middlewares = [thunk.withExtraArgument({ history: history })];

// 현재의 환경(개발환경, 프로덕션(배포)환경 등)
const env = process.env.NODE_ENV;

// 개발환경 - logger 사용설정
if (env === 'development') {
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}

// 리덕스 데브툴 사용설정
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    })
    : compose;

// 미들웨어 적용
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// 스토어에 루트리듀서, 미들웨어, 리덕스 데브툴 적용된 enhancer 적용
let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
