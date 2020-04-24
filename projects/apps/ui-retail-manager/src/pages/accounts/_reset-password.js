import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from 'react-s-alert';
import { compose } from 'recompose';
import { schemas } from '@sloops/library-utils';
import { uiApi, accountsApi } from '@sloops/library-ui-data-wrappers';
import { Icon, Layouts, Forms, Pages } from '@sloops/library-ui-components';
import { setLocalStorage } from '../../store/actions';

const Fields = () => (
  <div>
    <h2 className="login-register__title">Set <span>password</span></h2>
    <div className="login-register__separator" />
    <div className="forms-field">
      <Forms.TextField
        name="password"
        type="password"
        icon={<Icon
          name="lock"
          style={{
              heigth: '18px',
              width: '18px',
            }}
        />}
        placeHolder="Password"
      />
    </div>
    <div className="forms-field">
      <Forms.TextField
        name="passwordConfirm"
        type="password"
        icon={<Icon
          name="lock"
          style={{
              heigth: '18px',
              width: '18px',
            }}
        />}
        placeHolder="Confirm Password"
      />
    </div>
  </div>
);

const formProvider = Forms.Form({
  displayErrorList: false,
  formName: 'resetPassword',
  submitLabel: 'Set password',
  schema: schemas.accounts.resetPassword,
  submitHandler: async (
    { password },
    dispatch,
    props,
  ) => props.makeApiCall({ password, resetToken: props.match.params.resetToken }),
  successHandler: (reset, result, dispatch, props) => { // eslint-disable-line no-unused-vars
    reset();
    props.localStorage.dispatch.set('token', result.token);
    Alert.success('New password has been set');
  },
  errorHandler: (error, dispatch) => {}, // eslint-disable-line no-unused-vars
});

const crossStorageUrl = CROSS_STORAGE_URL; // eslint-disable-line no-undef

const ResetPasswordForm = compose(
  connect(
    () => ({
      methodsOnly: true,
      pollInterval: 0,
    }),
    {
      syncToStore: setLocalStorage,
    },
  ),
  uiApi.mutation.syncLocalStorage(crossStorageUrl),
  accountsApi.mutation.resetPassword,
  formProvider,
)(Fields);

const ResetPassword = () => (
  <div>
    <ResetPasswordForm />
  </div>
);

const ResetPasswordPage = ({ history, noRegisterButton }) => (
  <Layouts.LoginRegisterLayout
    navigationBar={<Pages.AccountsHeader noRegisterButton={noRegisterButton} history={history} />}
  >
    <ResetPassword />
  </Layouts.LoginRegisterLayout>
);

ResetPasswordPage.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line
  noRegisterButton: PropTypes.bool,
};

ResetPasswordPage.defaultProps = {
  noRegisterButton: false,
};

export default ResetPasswordPage;
