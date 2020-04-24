const exitIfNotExists = (variable) => {
  if (!variable) {
    console.log(`${variable} environment variable must be set.`); // eslint-disable-line no-console
    process.exit(1);
  }
};

// TODO: read from .env.example
const variablesToCheck = [
  'NODE_ENV',
  'NODE_ENV_TARGET',
  'PORT',
  'TZ',
];

const validateEnvironmentVariables = () => {
  const {
    NODE_ENV,
    NODE_ENV_TARGET,
    PORT,
    TZ,
  } = process.env;

  variablesToCheck.forEach(exitIfNotExists);

  if (!['production', 'development'].includes(NODE_ENV)) {
    console.log('A valid NODE_ENV must be provided.'); // eslint-disable-line no-console
    process.exit(1);
  }

  if (!['production', 'staging', 'development'].includes(NODE_ENV_TARGET)) {
    console.log('A valid NODE_ENV_TARGET must be provided.'); // eslint-disable-line no-console
    process.exit(1);
  }

  if (['production', 'staging'].includes(NODE_ENV_TARGET) && NODE_ENV !== 'production') {
    console.log('NODE_ENV must be set to production for staging and production deployments.'); // eslint-disable-line no-console
    process.exit(1);
  }

  if (!Number.isInteger(parseInt(PORT, 10))) {
    console.log('A valid PORT must be provided.'); // eslint-disable-line no-console
    process.exit(1);
  }

  if (TZ !== 'Etc/UTC') {
    console.log('TZ must be set to Etc/UTC.'); // eslint-disable-line no-console
    process.exit(1);
  }

  return true;
};

export default validateEnvironmentVariables;
