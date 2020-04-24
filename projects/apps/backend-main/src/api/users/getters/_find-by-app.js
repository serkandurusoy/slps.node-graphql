const findByApp = async ({ appId }, { mysql }) => {
  let users = [];

  if (appId === 'admin') {
    users = await mysql
      .select('*')
      .from('users')
      .where('isAdministrator', true);
  }

  if (appId === 'retailer') {
    users = await mysql
      .select('*')
      .from('users')
      .where('isAdministrator', true)
      .orWhere('isRetailerAdministrator', true)
      .orWhere('isRetailer', true);
  }

  if (appId === 'sales') {
    users = await mysql
      .select('*')
      .from('users')
      .where('isAdministrator', true)
      .orWhere('isSalesManager', true)
      .orWhere('isSalesRepresentative', true);
  }

  return users;
};

export default findByApp;
