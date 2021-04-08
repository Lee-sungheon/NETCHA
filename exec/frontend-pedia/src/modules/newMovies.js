// import produce from "immer";
import { createAction, handleActions } from "redux-actions";
import * as moviesAPI from "../lib/api/movies";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import { takeLatest } from "redux-saga/effects";

// 최신 개봉 영화
const [
    LIST_NEW_MOVIES,
    LIST_NEW_MOVIES_SUCCESS,
    LIST_NEW_MOVIES_FAILURE,
  ] = createRequestActionTypes("newMovies/LIST_NEW_MOVIES");
  
  export const listNewMovies = createAction(
    LIST_NEW_MOVIES,
  );
  
  // 최신 개봉 영화 사가 생성
  const listNewMoviesSaga = createRequestSaga(
    LIST_NEW_MOVIES,
    moviesAPI.listNewMovies
  );
  export function* newMoviesSaga() {
    yield takeLatest(LIST_NEW_MOVIES, listNewMoviesSaga);
  }

  const initialState = {
    newMovies: null,
    error: null,
  };

  const newMovies = handleActions(
    {
      [LIST_NEW_MOVIES_SUCCESS]: (state, { payload: newMovies }) => ({
        ...state,
        newMovies,
      }),
      [LIST_NEW_MOVIES_FAILURE]: (state, { payload: error }) => ({
        ...state,
        error,
      }),
    },
    initialState
  );
  
  export default newMovies;
  