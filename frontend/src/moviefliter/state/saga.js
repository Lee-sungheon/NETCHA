import { all, call, put, takeLeading } from 'redux-saga/effects';
import { actions, types } from './index';
import {
  callApiContentMovieList,
  callApiGanreMovieList,
  callApiCountryMovieList,
  callApiCountryGanreMovieList,
} from '../../common/api';

export function* contentData(action) {
  yield put(actions.setEnd(false));
  yield put(actions.setLoading(true));
  yield put(actions.setValue('error', ''));
  try {
    const data = yield call(callApiContentMovieList, action.pageNum, action.userNo);
    if (data !== undefined) {
      yield put(actions.setMovieList(data));
    }
  } catch(error) {
    yield put(actions.setValue('error', error));
  }
  yield put(actions.setLoading(false));
} 

export function* filterCountryData(action) {
  yield put(actions.setEnd(false));
  yield put(actions.setLoading(true));
  try {
    const data = yield call(callApiCountryMovieList, action.country, action.pageNum, action.userNo);
    if (data !== undefined) {
      yield put(actions.setIsFilter(true));
      yield put(actions.setMovieList(data));
    }
  } catch(error) {
  }
  yield put(actions.setLoading(false));
} 

export function* filterGanreData(action) {
  yield put(actions.setEnd(false));
  yield put(actions.setLoading(true));
  try {
    const data = yield call(callApiGanreMovieList, action.ganre, action.pageNum, action.userNo);
    if (data !== undefined) {
      yield put(actions.setIsFilter(true));
      yield put(actions.setMovieList(data));
    }
  } catch(error) {
  }
  yield put(actions.setLoading(false));
} 

export function* filterCountryGanreData(action) {
  yield put(actions.setEnd(false));
  yield put(actions.setLoading(true));
  try {
    const data = yield call(callApiCountryGanreMovieList, action.country, action.ganre, action.pageNum, action.userNo);
    if (data !== undefined) {
      yield put(actions.setIsFilter(true));
      yield put(actions.setMovieList(data));
    }
  } catch(error) {
  }
  yield put(actions.setLoading(false));
} 

export function* addData(action) {
  yield put(actions.setInfinite(true));
  yield put(actions.setValue('error', ''));
  try {
    const data = yield call(callApiContentMovieList, action.pageNum, action.userNo);
    if (data !== undefined) {
      yield put(actions.addMovieList(data));
    } else {
      yield put(actions.setEnd(true));
    }
  } catch(error) {
    yield put(actions.setValue('error', error));
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

export function* addCountryGanreData(action) {
  yield put(actions.setInfinite(true));
  try {
    const data = yield call(callApiCountryGanreMovieList, action.country, action.ganre, action.pageNum, action.userNo);
    if (data !== undefined) {
      yield put(actions.addMovieList(data));
    } else {
      yield put(actions.setEnd(true));
    }
  } catch(error) {
  }
  yield put(actions.setInfinite(false));
}

export default function* saga() {
  yield all([
    takeLeading(types.REQUEST_MOVIELIST, contentData),
    takeLeading(types.REQUEST_FILTERCOUNTRYMOVIELIST, filterCountryData),
    takeLeading(types.REQUEST_FILTERGANREMOVIELIST, filterGanreData),
    takeLeading(types.REQUEST_FILTERCOUNTRYGANREMOVIELIST, filterCountryGanreData),
    takeLeading(types.REQUEST_ADD_MOVIELIST, addData),
    takeLeading(types.REQUEST_ADD_COUNTRYMOVIELIST, addCountryData),
    takeLeading(types.REQUEST_ADD_GANREMOVIELIST, addGanreData),
    takeLeading(types.REQUEST_ADD_COUNTRYGANREMOVIELIST, addCountryGanreData),
  ]);
}