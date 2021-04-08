import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { all } from "@redux-saga/core/effects";
import searchReducer from "../navbar/state";
import searchSaga from "../navbar/state/saga";
import filterReducer from "../moviefliter/state";
import filterSaga from "../moviefliter/state/saga";
import homeReducer from "../home/state";
import homeSaga from "../home/state/saga";
import likeReducer from "../likeList/state";
import likeSaga from "../likeList/state/saga";
import evaluationReducer from "../evaluation/state";
import evaluationSaga from "../evaluation/state/saga";
import userReducer from "../user/state";
// import userSaga from "../user/state/saga";
import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

const persistConfig = {
  key: "root",
  // localStorage에 저장합니다.
  storage: storageSession,
  // auth, board, studio 3개의 reducer 중에 auth reducer만 localstorage에 저장합니다.
  whitelist: ["user","search"],
  // blacklist -> 그것만 제외합니다
};

const reducer = combineReducers({
  search: searchReducer,
  home: homeReducer,
  like: likeReducer,
  evaluation: evaluationReducer,
  user: userReducer,
  filter: filterReducer,
});

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  persistReducer(persistConfig, reducer),
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

function* rootSaga() {
  yield all([searchSaga(), homeSaga(), likeSaga(), evaluationSaga(), filterSaga()]);
}
sagaMiddleware.run(rootSaga);

export default store;