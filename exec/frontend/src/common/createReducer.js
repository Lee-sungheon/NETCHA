import produce from 'immer';

export function createReducer(initialState, handlerMap) {
  return function (state = initialState, action) {
    return produce(state, draft => {
      const handler = handlerMap[action.type];
      if (handler) {
        handler(draft, action);
      }
    });
  }; 
}


// 다양한 방법으로 활용 가능
export function createSetValueAction(type) {
  return (key, value) => ({ type, key, value });
}
export function setValueReducer(state, action) {
  state[action.key] = action.value;
}