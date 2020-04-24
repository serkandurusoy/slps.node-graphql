import { clearAccount, setAccount } from './_account';
import { LOCALSTORAGE } from '../types';

const setLocalStorage = localStorage => (dispatch) => {
  dispatch({
    type: LOCALSTORAGE.SET,
    payload: localStorage,
  });

  if (localStorage.storage.token) {
    dispatch(setAccount(localStorage.storage.token));
  } else {
    dispatch(clearAccount());
  }
};

export default setLocalStorage;
