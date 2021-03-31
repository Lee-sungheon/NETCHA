import { createReducer, createSetValueAction, setValueReducer } from '../../common/createReducer';

export const types = {
  REQUEST_MOVIELIST: 'search/REQUEST_MOVIELIST',
  SET_MOVIELIST: 'search/SET_MOVIELIST',
  SET_LOADING: 'search/SET_LOADING',
  SET_VALUE: 'search/SET_VALUE',
  TRY_SET_TEXT: 'search/TRY_SET_TEXT',
};

export const actions = {
  requestMovieList: () => ({ type: types.REQUEST_MOVIELIST }),
  setMovieList: data => ({ type: types.SET_MOVIELIST, data }),
  setLoading: isLoading => ({
    type: types.SET_LOADING,
    isLoading,
  }),
  setValue: createSetValueAction(types.SET_VALUE),
  trySetText: text => ({
    type: types.TRY_SET_TEXT,
    text,
  })
}

const INITIAL_STATE = { text: '', movieLists: [], isLoading: false, error: '', };
const reducer = createReducer(INITIAL_STATE, {
  [types.SET_MOVIELIST]: (state, action) => {
    state.movieLists = action.data
  },
  [types.SET_LOADING]: (state, action) => (state.isLoading = action.isLoading),
  [types.SET_VALUE]: setValueReducer,
});
export default reducer;