import { all, call, put, debounce, takeLeading } from "redux-saga/effects";
import { actions, types } from "./index";
import { callApiMovieList, callApiGanreMovieList, callApiCountryMovieList, callApiContentMovieList, callApiCastMovieList, callApiDirectorMovieList } from "../../common/api";

export function* fetchData() {
  yield put(actions.setEnd(false));
  yield put(actions.setLoading(true));
  yield put(actions.setValue("error", ""));
  try {
    const data = yield call(callApiMovieList);
    if (data !== undefined) {
      yield put(actions.setMovieList(data));
    }
  } catch (error) {
    yield put(actions.setValue("error", error));
  }
  yield put(actions.setLoading(false));
}

export function* trySetText(action) {
  yield put(actions.setValue("text", action.text));
}

export function* ganreData(action) {
  yield put(actions.setEnd(false));
  yield put(actions.setLoading(true));
  try {
    const data = yield call(callApiGanreMovieList, action.ganre, action.pageNum, action.userNo);
    if (data !== undefined) {
      yield put(actions.setMovieList(data));
    }
  } catch(error) {
  }
  yield put(actions.setLoading(false));
} 

export function* countryData(action) {
  yield put(actions.setEnd(false));
  yield put(actions.setLoading(true));
  try {
    const data = yield call(callApiCountryMovieList, action.country, action.pageNum, action.userNo);
    if (data !== undefined) {
      yield put(actions.setMovieList(data));
    }
  } catch(error) {
  }
  yield put(actions.setLoading(false));
} 

export function* directorData(action) {
  yield put(actions.setEnd(false));
  yield put(actions.setLoading(true));
  try {
    const data = yield call(callApiDirectorMovieList, action.director, action.userNo);
    if (data !== undefined) {
      yield put(actions.setMovieList(data));
    }
  } catch(error) {
  }
  yield put(actions.setLoading(false));
} 

export function* castData(action) {
  yield put(actions.setEnd(false));
  yield put(actions.setLoading(true));
  try {
    const data = yield call(callApiCastMovieList, action.cast, action.userNo);
    if (data !== undefined) {
      yield put(actions.setMovieList(data));
    }
  } catch(error) {
  }
  yield put(actions.setLoading(false));
} 

export function* addData(action) {
  yield put(actions.setInfinite(true));
  try {
    const data = yield call(callApiContentMovieList, action.pageNum, action.userNo);
    if (data !== undefined) {
      yield put(actions.addMovieList(data));
    } else {
      yield put(actions.setEnd(true));
    }
  } catch(error) {
  }
  yield put(actions.setInfinite(false));
}

export function* addCountryData(action) {
  yield put(actions.setInfinite(true));
  try {
    const data = yield call(callApiCountryMovieList, action.country, action.pageNum, action.userNo);
    if (data !== undefined) {
      yield put(actions.addMovieList(data));
    } else {
      yield put(actions.setEnd(true));
    }
  } catch(error) {
  }
  yield put(actions.setInfinite(false));
}

export function* addGanreData(action) {
  yield put(actions.setInfinite(true));
  try {
    const data = yield call(callApiGanreMovieList, action.ganre, action.pageNum, action.userNo);
    if (data !== undefined) {
      yield put(actions.addMovieList(data));
    } else {
      yield put(actions.setEnd(true));
    }
  } catch(error) {
  }
  yield put(actions.setInfinite(false));
}

export default function* () {
  yield all([
    debounce(1000, types.REQUEST_MOVIELIST, fetchData),
    takeLeading(types.TRY_SET_TEXT, trySetText),
    takeLeading(types.REQUEST_GANREMOVIELIST, ganreData),
    takeLeading(types.REQUEST_COUNTRYMOVIELIST, countryData),
    takeLeading(types.REQUEST_DIRECTORMOVIELIST, directorData),
    takeLeading(types.REQUEST_CASTMOVIELIST, castData),
    takeLeading(types.REQUEST_ADD_MOVIELIST, addData),
    takeLeading(types.REQUEST_ADD_COUNTRYMOVIELIST, addCountryData),
    takeLeading(types.REQUEST_ADD_GANREMOVIELIST, addGanreData),
  ]);
}
