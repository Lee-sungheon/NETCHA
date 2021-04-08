// import produce from "immer";
import { createAction, handleActions } from "redux-actions";
import * as countriesAPI from "../lib/api/userStatics";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import { takeLatest } from "redux-saga/effects";

const [
  LIST_COUNTRIES,
  LIST_COUNTRIES_SUCCESS,
  LIST_COUNTRIES_FAILURE,
] = createRequestActionTypes("countries/LIST_COUNTRIES");

export const listCountries = createAction(
    LIST_COUNTRIES, 
  ({ userId }) => ({ userId })
);

// 사용지별 선호 국가 사가 생성
const listCountriesSaga = createRequestSaga(LIST_COUNTRIES, countriesAPI.listCountries);
export function* countriesSaga() {
  yield takeLatest(LIST_COUNTRIES, listCountriesSaga);
}

const initialState = {
  countries: null,
  error: null,
};

const countries = handleActions(
  {
    [LIST_COUNTRIES_SUCCESS]: (state, { payload: countries }) => ({
      ...state,
      countries,
    }),
    [LIST_COUNTRIES_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState
);

export default countries;
