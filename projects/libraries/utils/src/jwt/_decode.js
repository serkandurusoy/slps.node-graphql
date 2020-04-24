import decode from 'jwt-decode';

const decodeJWT = token => decode(token);

export default decodeJWT;
