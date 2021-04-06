import { all, call, put, takeLeading } from 'redux-saga/effects';
import { actions, types } from './index';
import {
  callApiNewMovieList,
  callApiPopularMovieList,
  callApiContentMovieList,
  callApiRankMovieList,
  callApiGanreMovieList,
  callApiCountryMovieList,
  callApiKeywordMovieList,
  callApiSimilarMovieList,
  callApiMbtiMovieList
} from '../../common/api';

export function* contentData(action) {
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

export function* newData(action) {
  yield put(actions.setNewLoading(true));
  yield put(actions.setValue('error', ''));
  try {
    const data = yield call(callApiNewMovieList, action.pageNum, action.userNo);
    if (data !== undefined) {
      yield put(actions.setNewMovieList(data));
    }
  } catch(error) {
    yield put(actions.setValue('error', error));
  }
  yield put(actions.setNewLoading(false));
} 

export function* popularData(action) {
  yield put(actions.setPopularLoading(true));
  yield put(actions.setValue('error', ''));
  try {
    const data = yield call(callApiPopularMovieList, action.pageNum, action.userNo);
    if (data !== undefined) {
      yield put(actions.setPopularMovieList(data));
    }
  } catch(error) {
    yield put(actions.setValue('error', error));
  }
  yield put(actions.setPopularLoading(false));
} 

export function* mbtiData(action) {
  yield put(actions.setMbtiLoading(true));
  yield put(actions.setValue('error', ''));
  try {
    const data = yield call(callApiMbtiMovieList, action.pageNum, action.userNo);
    if (data !== undefined) {
      yield put(actions.setMbtiMovieList(data));
    }
  } catch(error) {
    yield put(actions.setValue('error', error));
  }
  yield put(actions.setMbtiLoading(false));
} 

export function* rankData(action) {
  yield put(actions.setRankLoading(true));
  yield put(actions.setValue('error', ''));
  try {
    const data = yield call(callApiRankMovieList, action.pageNum, action.userNo);
    if (data !== undefined) {
      yield put(actions.setRankMovieList(data));
    }
  } catch(error) {
    yield put(actions.setValue('error', error));
  }
  yield put(actions.setRankLoading(false));
}

export function* ganreData(action) {
  yield put(actions.setGanreLoading(true));
  yield put(actions.setValue('error', ''));
  try {
    const data = yield call(callApiGanreMovieList, action.ganre, action.pageNum, action.userNo);
    if (data !== undefined) {
      yield put(actions.setGanreMovieList(data));
    }
  } catch(error) {
    yield put(actions.setValue('error', error));
  }
  yield put(actions.setGanreLoading(false));
} 

export function* ganreData2(action) {
  yield put(actions.setGanreLoading2(true));
  try {
    const data = yield call(callApiGanreMovieList, action.ganre, action.pageNum, action.userNo);
    if (data !== undefined) {
      yield put(actions.setGanreMovieList2(data));
    }
  } catch(error) {
  }
  yield put(actions.setGanreLoading2(false));
} 

export function* ganreData3(action) {
  yield put(actions.setGanreLoading3(true));
  try {
    const data = yield call(callApiGanreMovieList, action.ganre, action.pageNum, action.userNo);
    if (data !== undefined) {
      yield put(actions.setGanreMovieList3(data));
    }
  } catch(error) {
  }
  yield put(actions.setGanreLoading3(false));
} 

export function* countryData(action) {
  yield put(actions.setCountryLoading(true));
  try {
    const data = yield call(callApiCountryMovieList, action.country, action.pageNum, action.userNo);
    if (data !== undefined) {
      yield put(actions.setCountryMovieList(data));
    }
  } catch(error) {
  }
  yield put(actions.setCountryLoading(false));
} 

export function* countryData2(action) {
  yield put(actions.setCountryLoading2(true));
  try {
    const data = yield call(callApiCountryMovieList, action.country, action.pageNum, action.userNo);
    if (data !== undefined) {
      yield put(actions.setCountryMovieList2(data));
    }
  } catch(error) {
  }
  yield put(actions.setCountryLoading2(false));
} 

export function* countryData3(action) {
  yield put(actions.setCountryLoading3(true));
  try {
    const data = yield call(callApiCountryMovieList, action.country, action.pageNum, action.userNo);
    if (data !== undefined) {
      yield put(actions.setCountryMovieList3(data));
    }
    } catch(error) {
  }
  yield put(actions.setCountryLoading3(false));
} 

export function* keywordData(action) {
  yield put(actions.setKeywordLoading(true));
  try {
    const data = yield call(callApiKeywordMovieList, action.keyword, action.pageNum, action.userNo);
    if (data !== undefined) {
      yield put(actions.setKeywordMovieList(data));
    }
  } catch(error) {
  }
  yield put(actions.setKeywordLoading(false));
} 

export function* keywordData2(action) {
  yield put(actions.setKeywordLoading2(true));
  try {
    const data = yield call(callApiKeywordMovieList, action.keyword, action.pageNum, action.userNo);
    if (data !== undefined) {
      yield put(actions.setKeywordMovieList2(data));
    }
  } catch(error) {
  }
  yield put(actions.setKeywordLoading2(false));
} 

export function* keywordData3(action) {
  yield put(actions.setKeywordLoading3(true));
  try {
    const data = yield call(callApiKeywordMovieList, action.keyword, action.pageNum, action.userNo);
    if (data !== undefined) {
      yield put(actions.setKeywordMovieList3(data));
    }
  } catch(error) {
  }
  yield put(actions.setKeywordLoading3(false));
} 

export function* similarData(action) {
  yield put(actions.setSimilarLoading(true));
  try {
    const data = yield call(callApiSimilarMovieList, action.movieNo, action.userNo);
    if (data !== undefined) {
      yield put(actions.setSimilarMovieList(data));
    }
  } catch(error) {
  }
  yield put(actions.setSimilarLoading(false));
} 

export default function* saga() {
  yield all([
    takeLeading(types.REQUEST_MOVIELIST, contentData),
    takeLeading(types.REQUEST_NEWMOVIELIST, newData),
    takeLeading(types.REQUEST_POPULARMOVIELIST, popularData),
    takeLeading(types.REQUEST_MBTIMOVIELIST, mbtiData),
    takeLeading(types.REQUEST_RANKMOVIELIST, rankData),
    takeLeading(types.REQUEST_GANREMOVIELIST, ganreData),
    takeLeading(types.REQUEST_GANREMOVIELIST2, ganreData2),
    takeLeading(types.REQUEST_GANREMOVIELIST3, ganreData3),
    takeLeading(types.REQUEST_COUNTRYMOVIELIST, countryData),
    takeLeading(types.REQUEST_COUNTRYMOVIELIST2, countryData2),
    takeLeading(types.REQUEST_COUNTRYMOVIELIST3, countryData3),
    takeLeading(types.REQUEST_KEYWORDMOVIELIST, keywordData),
    takeLeading(types.REQUEST_KEYWORDMOVIELIST2, keywordData2),
    takeLeading(types.REQUEST_KEYWORDMOVIELIST3, keywordData3),
    takeLeading(types.REQUEST_SIMILARMOVIELIST, similarData),
  ]);
}