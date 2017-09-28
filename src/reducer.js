import {
  ERROR_FLASH,
  SUCCESS_FLASH,
  SHOW_FLASH,
  CLEAR_FLASH
} from './actions';

const initialState = {};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SUCCESS_FLASH:
    case ERROR_FLASH:
      return {
        type: SUCCESS_FLASH ? 'success' : 'error',
        message: action.message,
        isDelayed: action.isDelayed
      };
    case CLEAR_FLASH:
      return initialState;
    case SHOW_FLASH:
      if (!state.message) {
        return state;
      }
      return {
        ...state,
        isDelayed: false
      };
    default:
      return state;
  }
};
