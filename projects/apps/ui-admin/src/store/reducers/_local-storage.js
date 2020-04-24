import { LOCALSTORAGE } from '../types';

const initialState = {
  initializing: true,
  working: false,
  error: false,
  storage: {},
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOCALSTORAGE.SET: {
      return {
        ...state,
        ...payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
