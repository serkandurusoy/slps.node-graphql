import { combineReducers } from 'redux';

import localStorage from './_local-storage';
import account from './_account';
import viewType from './_view-type';

const rootReducer = combineReducers({
  localStorage,
  account,
  viewType,
});

export default rootReducer;
