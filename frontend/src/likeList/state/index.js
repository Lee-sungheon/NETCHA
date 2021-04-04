import { createReducer, createSetValueAction, setValueReducer } from '../../common/createReducer';

export const types = {
  // 영화 인피니트 스크롤
  REQUEST_ADD_MOVIELIST: 'like/REQUEST_ADD_MOVIELIST',
  ADD_MOVIELIST: 'like/ADD_MOVIELIST',
  SET_INFINITE: 'like/SET_INFINITE',
  SET_END: 'like/SET_END',

  REQUEST_MOVIELIST: 'like/REQUEST_MOVIELIST',
  SET_MOVIELIST: 'like/SET_MOVIELIST',
  SET_LOADING: 'like/SET_LOADING',
  SET_VALUE: 'like/SET_VALUE',

  DELETE_LIKE: 'like/DELTE_LIKE'
};

export const likeactions = {
  requestMovieList: (pageNum, userNo) => ({ type: types.REQUEST_MOVIELIST, pageNum, userNo }),
  setMovieList: data => ({ type: types.SET_MOVIELIST, data }),
  setLoading: isLoading => ({
    type: types.SET_LOADING,
    isLoading,
  }),
  setValue: createSetValueAction(types.SET_VALUE),
  // 영화 인피니트 스크롤
  requestAddMovieList: (pageNum, userNo) => ({ type: types.REQUEST_ADD_MOVIELIST, pageNum, userNo }),
  addMovieList: data => ({ type: types.ADD_MOVIELIST, data }),
  setInfinite: isInfinite => ({
    type: types.SET_INFINITE,
    isInfinite,
  }),
  setEnd: infiniteEnd => ({
    type: types.SET_END,
    infiniteEnd,
  }),
  deleteLike: movieNo => ({ type: types.DELETE_LIKE, movieNo })
}

const INITIAL_STATE = { movieLists: [], isLoading: false, error: '', isInfinite: false, infiniteEnd: false,};
const reducer = createReducer(INITIAL_STATE, {
  [types.SET_MOVIELIST]: (state, action) => {
    state.movieLists = action.data
  },
  [types.SET_LOADING]: (state, action) => (state.isLoading = action.isLoading),
  [types.SET_VALUE]: setValueReducer,
  // 영화 인피니트 스크롤
  [types.ADD_MOVIELIST]: (state, action) => {
    state.movieLists = state.movieLists.concat(action.data)
  },
  [types.SET_INFINITE]: (state, action) => (state.isInfinite = action.isInfinite),
  [types.SET_END]: (state, action) => (state.infiniteEnd = action.infiniteEnd),

  [types.DELETE_LIKE]: (state, action) => {
    for (let i=0 ; i<state.movieLists.length ; i++){  
      if(state.movieLists[i].no === action.movieNo){
        state.movieLists.splice(i, 1);
        break;
      }
    }
  }
});
export default reducer;