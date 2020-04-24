import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { schemas } from '@sloops/library-utils';
import { uiApi, accountsApi } from '@sloops/library-ui-data-wrappers';
import { Icon, Layouts, Forms, Pages } from '@sloops/library-ui-components';
import { setLocalStorage } from '../../store/actions';

const Fields = () => (
  <div>
    <h2 className="login-register__title">User <span>login</span></h2>
    <div className="login-register__separator" />
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
      normalize={value => value && value.trim()}
      placeHolder="Email"
    />
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
    <Link to="/forgot-password" className="login-register__forgot">Forgot your password?</Link>
  </div>
);

const formProvider = Forms.Form({
  displayErrorList: false,
  formName: 'login',
  formId: 'login-form',
  submitLabel: 'Login',
  schema: schemas.accounts.login,
  submitHandler: async (
    { email, password },
    dispatch,
    props,
  ) => props.makeApiCall(email, password),
  successHandler: (reset, result, dispatch, props) => {
    reset();
    props.localStorage.dispatch.set('token', result.token);
  },
  errorHandler: (error, dispatch) => {}, // eslint-disable-line no-unused-vars
});

const crossStorageUrl = CROSS_STORAGE_URL; // eslint-disable-line no-undef

const LoginForm = compose(
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
  accountsApi.mutation.loginWithEmailAndPassword,
  formProvider,
)(Fields);

const LoginPage = ({ history }) => (
  <Layouts.LoginRegisterLayout
    navigationBar={
      <Pages.AccountsHeader
        history={history}
        noRegisterButton
      />
    }
  >
    <LoginForm />
  </Layouts.LoginRegisterLayout>
);

LoginPage.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line
};

export default LoginPage;
