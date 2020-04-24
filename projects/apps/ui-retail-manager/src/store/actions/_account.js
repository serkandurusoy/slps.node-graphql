import { ACCOUNT } from '../types';

export const setAccount = token => (dispatch) => {
  dispatch({
    type: ACCOUNT.SET,
    payload: token,
  });
};

export const clearAccount = () => (dispatch) => {
  dispatch({
    type: ACCOUNT.CLEAR,
  });
};
