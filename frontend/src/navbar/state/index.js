import { createReducer, createSetValueAction, setValueReducer } from '../../common/createReducer';

export const types = {
  SET_VALUE: 'search/SET_VALUE',
  TRY_SET_TEXT: 'search/TRY_SET_TEXT',
};

export const actions = {
  setValue: createSetValueAction(types.SET_VALUE),
  trySetText: text => ({
    type: types.TRY_SET_TEXT,
    text,
  })
}

const INITIAL_STATE = { text: '', };
const reducer = createReducer(INITIAL_STATE, {
  [types.SET_VALUE]: setValueReducer,
});
export default reducer;