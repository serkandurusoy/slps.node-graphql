import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-s-alert';
import { compose } from 'recompose';
import { schemas } from '@sloops/library-utils';
import { accountsApi } from '@sloops/library-ui-data-wrappers';
import { Icon, Layouts, Forms, Pages } from '@sloops/library-ui-components';

const Fields = () => (
  <div>
    <h2 className="login-register__title">Reset <span>password</span></h2>
    <div className="login-register__separator" />
    <div className="forms-field">
      <Forms.TextField
        name="email"
        type="text"
        icon={<Icon
          name="envelope"
          style={{
              heigth: '18px',
              width: '18px',
            }}
        />}
        placeHolder="Email"
      />
    </div>
  </div>
);

const formProvider = Forms.Form({
  displayErrorList: false,
  formName: 'forgotPassword',
  submitLabel: 'Send reset link',
  schema: schemas.accounts.forgotPassword,
  submitHandler: async (
    { email },
    dispatch,
    props,
  ) => props.makeApiCall(email),
  successHandler: (reset, result, dispatch, props) => { // eslint-disable-line no-unused-vars
    Alert.success('Please check your email to reset your password');
  },
  errorHandler: (error, dispatch) => {}, // eslint-disable-line no-unused-vars
});

const ForgotPasswordForm = compose(
  accountsApi.mutation.forgotPassword,
  formProvider,
)(Fields);

const ForgotPasswordPage = ({ history, noRegisterButton }) => (
  <Layouts.LoginRegisterLayout
    navigationBar={<Pages.AccountsHeader noRegisterButton={noRegisterButton} history={history} />}
  >
    <ForgotPasswordForm />
  </Layouts.LoginRegisterLayout>
);

ForgotPasswordPage.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line
  noRegisterButton: PropTypes.bool,
};

ForgotPasswordPage.defaultProps = {
  noRegisterButton: false,
};

export default ForgotPasswordPage;
