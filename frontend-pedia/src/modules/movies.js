import produce from "immer";
import { handleActions } from "redux-actions";

const CHANGE_SEARCH_KEYWORD = 'search/CHANGE_SEARCH_KEYWORD';
const INITIALIZE_INPUT = 'search/INITIALIZE_INPUT';

export const changeSearchKeyword = createAction(
  CHANGE_SEARCH_KEYWORD,
  (keyword) => ({keyword})
);

export const initializeInput = createAction(INITIALIZE_INPUT, keyword => keyword);

const initialState = {
  keyword: "",
  movies: [],
};

const movies = handleActions(
    {
        [CHANGE_SEARCH_KEYWORD]: (state, {payload: {keyword}}) => ({
            ...state,
            keyword,
        })
    },
    initialState
);

export default movies;
