const {
  NODE_ENV_TARGET,
} = process.env;

const production = NODE_ENV_TARGET === 'production';
const staging = NODE_ENV_TARGET === 'staging';

const appUrls = {
  admin: production ? 'https://admin.sloops.today' : staging ? 'https://admin.sloops.waat.eu' : 'http://localhost:8181',
  retailer: production ? 'https://retailer.sloops.today' : staging ? 'https://retailer.sloops.waat.eu' : 'http://localhost:8282',
  sales: production ? 'https://sales.sloops.today' : staging ? 'https://sales.sloops.waat.eu' : 'http://localhost:8383',
};

export default appUrls;
