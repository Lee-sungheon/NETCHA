// 루트 리듀서
import{combineReducers} from 'redux';
import { all } from 'redux-saga/effects';
import movie, {movieSaga} from './movie';

const rootReducer = combineReducers({
    movie,
});

export function* rootSaga() {
    yield all([movieSaga()]);
}

export default rootReducer;

