import { VIEWTYPE } from '../types';

const setViewType = viewType => (dispatch) => {
  dispatch({
    type: VIEWTYPE.SET,
    payload: viewType,
  });
};

export default setViewType;
