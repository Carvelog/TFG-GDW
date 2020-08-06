import { createStore } from 'redux'

interface idReducerState {
  id: string
}

const idReducer = (state: idReducerState = {id: ''}, action: any) => {
  switch (action.type) {
    case 'SAVE_ID':
      return {
        ...state,
        id: action.value
      }
    default:
      return state;
  }
}

export default createStore(idReducer)
