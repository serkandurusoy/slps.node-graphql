const corsDomains = () => {
  const {
    NODE_ENV_TARGET,
  } = process.env;

  if (NODE_ENV_TARGET === 'development') {
    return [
      'http://unpkg.com',
      'https://unpkg.com',
      'http://cdn.jsdelivr.net',
      'https://cdn.jsdelivr.net',
      'http://storage.googleapis.com',
      'https://storage.googleapis.com',
      'http://localhost:8080',
      'http://localhost:8181',
      'http://localhost:8282',
      'http://localhost:8383',
      'http://localhost:9001',
    ];
  }

  if (NODE_ENV_TARGET === 'staging') {
    return [
      'http://unpkg.com',
      'https://unpkg.com',
      'http://cdn.jsdelivr.net',
      'https://cdn.jsdelivr.net',
      'http://storage.googleapis.com',
      'https://storage.googleapis.com',
      'https://sloops.waat.eu',
      'https://api.sloops.waat.eu',
      'https://admin.sloops.waat.eu',
      'https://retailer.sloops.waat.eu',
      'https://sales.sloops.waat.eu',
    ];
  }

  if (NODE_ENV_TARGET === 'production') {
    return [
      'http://unpkg.com',
      'https://unpkg.com',
      'http://cdn.jsdelivr.net',
      'https://cdn.jsdelivr.net',
      'http://storage.googleapis.com',
      'https://storage.googleapis.com',
      'https://sloops.today',
      'https://api.sloops.today',
      'https://admin.sloops.today',
      'https://retailer.sloops.today',
      'https://sales.sloops.today',
    ];
  }

  return [];
};

export default corsDomains;
