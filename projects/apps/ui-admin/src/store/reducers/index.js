import { combineReducers } from 'redux';

import localStorage from './_local-storage';
import account from './_account';

const rootReducer = combineReducers({
  localStorage,
  account,
});

export default rootReducer;
