import {
    createReducer,
    createSetValueAction,
    setValueReducer,
  } from '../../../../common/redux-helper';

export const Types = {
    SetValue: 'searchMovie/SetValue',
    FetchAutoComplete: 'searchMovie/FetchAutoComplete',
}

export const actions = {
    setValue: createSetValueAction(Types.SetValue),
    fetchAutoComplete: keyword => ({
        type: Types.FetchAutoComplete,
        keyword,
    })
}

const INITIAL_STATE = {
    keyword: '',
    autoCompletes: [],
}

const reducer = createReducer(INITIAL_STATE, {
    [Types.SetValue]: setValueReducer,
})

export default reducer;