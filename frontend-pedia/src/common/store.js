import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from '@redux-saga/core/effects';
import searchMovieReducer from '../components/common/SearchMovie/state';
import searchMovieSaga from '../components/common/SearchMovie/state/saga'

const reducer = combineReducers({
  searchMovie: searchMovieReducer,
});

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);

function* rootSaga() {
  yield all([searchMovieSaga()]);
}
sagaMiddleware.run(rootSaga);

export default store;