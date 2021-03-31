import {
  createReducer,
  createSetValueAction,
  setValueReducer,
} from "../../common/createReducer";

export const types = {
  SET_LOADING: "user/SET_LOADING",
  SET_VALUE: "user/SET_VALUE",
  USER_LOGIN: "user/USER_LOGIN",
};

export const actions = {
  setLoading: (isLoading) => ({
    type: types.SET_LOADING,
    isLoading,
  }),
  setValue: createSetValueAction(types.SET_VALUE),

  userLogin: (userData) => ({ type: types.USER_LOGIN, userData }),
};

const INITIAL_STATE = {
  isLoading: false,
  error: "",
  userData: [],
};
const reducer = createReducer(INITIAL_STATE, {
  [types.SET_LOADING]: (state, action) => (state.isLoading = action.isLoading),
  [types.SET_VALUE]: setValueReducer,
  [types.USER_LOGIN]: (state, action) => (state.userData = action.userData),
});
export default reducer;
