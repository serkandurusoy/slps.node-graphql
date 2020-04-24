import { decodeJWT } from '@sloops/library-utils';
import { ACCOUNT } from '../types';

const initialState = {
  token: '',
  id: 0,
  eat: 0,
  exp: 0,
  firstHit: true,
  clearedBefore: false,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACCOUNT.SET: {
      const account = decodeJWT(payload);
      const {
        id,
        eat,
        exp,
      } = account;
      return {
        ...state,
        id,
        eat,
        exp,
        token: payload,
        firstHit: false,
      };
    }

    case ACCOUNT.CLEAR: {
      return {
        ...initialState,
        clearedBefore: true,
        firstHit: !state.clearedBefore && state.token === '',
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
