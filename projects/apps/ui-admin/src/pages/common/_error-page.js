import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Layouts } from '@sloops/library-ui-components';
import { accountsApi } from '@sloops/library-ui-data-wrappers';

const ErrorPage = ({ message, history, me: { me, loading } }) => {
  if (loading) return null;
  const rightButton = () => {
    if (me && Object.keys(me).length) {
      return { label: 'Logout', onClick: () => { history.push('/logout'); } };
    }
    return { label: 'Login', onClick: () => { history.push('/login'); } };
  };
  return (
    <Layouts.ErrorPageLayout history={history} message={message} rightButton={rightButton()} />
  );
};

ErrorPage.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  message: PropTypes.string.isRequired,
  me: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default compose(
  connect(
    ({
      ui: {
        account: {
          id,
        },
      },
    }) => ({
      userId: id,
    }),
    null,
  ),
  accountsApi.query.me,
)(ErrorPage);
