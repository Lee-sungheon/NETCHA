import { createReducer, createSetValueAction, setValueReducer } from '../../common/createReducer';

export const types = {
  REQUEST_MOVIELIST: 'home/REQUEST_MOVIELIST',
  SET_MOVIELIST: 'home/SET_MOVIELIST',
  SET_LOADING: 'home/SET_LOADING',
  SET_VALUE: 'home/SET_VALUE',
};

export const actions = {
  requestMovieList: () => ({ type: types.REQUEST_MOVIELIST }),
  setMovieList: data => ({ type: types.SET_MOVIELIST, data }),
  setLoading: isLoading => ({
    type: types.SET_LOADING,
    isLoading,
  }),
  setValue: createSetValueAction(types.SET_VALUE),
}

const INITIAL_STATE = { movieLists: [], isLoading: false, error: '', };
const reducer = createReducer(INITIAL_STATE, {
  [types.SET_MOVIELIST]: (state, action) => {
    state.movieLists = action.data
  },
  [types.SET_LOADING]: (state, action) => (state.isLoading = action.isLoading),
  [types.SET_VALUE]: setValueReducer,
});
export default reducer;