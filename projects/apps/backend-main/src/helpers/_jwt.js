import jsonwebtoken from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

const jwt = {
  verify(token) {
    try {
      // TODO: fix this properly by correct json parsing
      let useToken = token;
      const testForQuotes = token.split('"');
      if (testForQuotes.length === 3) {
        // we're'disabling here because this cannot be destructured, this is to be refactored anyway
        // eslint-disable-next-line prefer-destructuring
        useToken = testForQuotes[1];
      }
      return jsonwebtoken.verify(useToken, JWT_SECRET);
    } catch (e) {
      return undefined;
    }
  },
  create({ id }) {
    return jsonwebtoken.sign(
      { id },
      JWT_SECRET,
      {
        algorithm: 'HS256',
        expiresIn: 60 * 60 * 24, // 1 day
      },
    );
  },
  refresh(token) {
    const user = this.verify(token);
    if (user) return this.create(user);
    return undefined;
  },
};

export default jwt;
