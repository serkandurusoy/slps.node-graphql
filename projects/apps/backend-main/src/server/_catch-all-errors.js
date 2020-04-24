const catchAllErrors = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  res
    .status(500)
    .send({
      error: err.toString(),
      // TODO: error: 'There\'s been an api error. Please contact the system administrator.',
    });
};

export default catchAllErrors;
