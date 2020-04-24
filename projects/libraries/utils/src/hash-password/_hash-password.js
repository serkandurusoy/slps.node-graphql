import hash from 'hash.js';

const hashPassword = password => ({
  digest: hash.sha256().update(password).digest('hex'),
  algorithm: 'sha-256',
});

export default hashPassword;
