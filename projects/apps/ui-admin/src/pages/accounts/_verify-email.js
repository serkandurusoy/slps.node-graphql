import React from 'react';

const VerifyEmail = ({
  match, // eslint-disable-line react/prop-types
}) => (
  <div>
    <h2>Verify email {match.params.verificationToken}</h2>
  </div>
);

export default VerifyEmail;
