import helmet from 'helmet';
import cors from 'cors';
import corsDomains from './_cors-domains';

const whitelistedDomains = corsDomains();

const setupSecurity = (app) => {
  app.use(helmet({
    frameguard: false,
  }));

  app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", ...whitelistedDomains],
      scriptSrc: ["'unsafe-eval'", "'unsafe-inline'", "'self'", ...whitelistedDomains],
      styleSrc: ["'unsafe-inline'", "'self'", ...whitelistedDomains],
    },
  }));

  const corsOptions = {
    origin(origin, callback) {
      if (!origin || whitelistedDomains.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    allowedHeaders: ['Content-Type, Authorization, X-Requested-With', 'AppId'],
  };

  app.use(cors(corsOptions));

  app.options('*', cors(corsOptions));
};

export default setupSecurity;
