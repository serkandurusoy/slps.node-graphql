import { VIEWTYPE } from '../types';

const reducer = (state = '', { type, payload }) => {
  switch (type) {
    case VIEWTYPE.SET: {
      return payload;
    }
    default: {
      return state;
    }
  }
};

export default reducer;
