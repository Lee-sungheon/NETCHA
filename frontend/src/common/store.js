import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { all } from "@redux-saga/core/effects";
import searchReducer from "../navbar/state";
import searchSaga from "../navbar/state/saga";
import homeReducer from "../home/state";
import homeSaga from "../home/state/saga";
import likeReducer from "../likeList/state";
import likeSaga from "../likeList/state/saga";
import evaluationReducer from "../evaluation/state";
import evaluationSaga from "../evaluation/state/saga";
import userReducer from "../user/state";
// import userSaga from "../user/state/saga";

const reducer = combineReducers({
  search: searchReducer,
  home: homeReducer,
  like: likeReducer,
  evaluation: evaluationReducer,
  user: userReducer,
});

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

function* rootSaga() {
  yield all([searchSaga(), homeSaga(), likeSaga(), evaluationSaga()]);
}
sagaMiddleware.run(rootSaga);

export default store;
