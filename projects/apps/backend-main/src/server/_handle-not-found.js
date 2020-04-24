const handleNotFound = (req, res) => {
  res
    .status(404)
    .send({
      error: 'Requested resource is not available.',
    });
};

export default handleNotFound;
