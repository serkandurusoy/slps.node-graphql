import { Users } from '../api';
import { jwt } from '../helpers';

const parseToken = async databases => async (req, res, next) => {
  const {
    authorization: token,
    appid,
  } = req.headers;
  if (appid && ['admin', 'retailer', 'sales'].includes(appid)) {
    req.appId = appid;
  }
  // TODO: implement better parsing and handling for 'undefined'
  if (req.appId && token && token !== 'undefined' && token !== "'undefined'") {
    const tokenDoc = jwt.verify(token);
    const id = tokenDoc && tokenDoc.id;
    const currentUser = await Users.findById({ id }, databases);
    req.currentUser = currentUser;
  }
  next();
};

export default parseToken;
