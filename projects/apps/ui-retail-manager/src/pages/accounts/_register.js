import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';
import { schemas } from '@sloops/library-utils';
import { uiApi, accountsApi } from '@sloops/library-ui-data-wrappers';
import { Icon, Layouts, Forms, Pages } from '@sloops/library-ui-components';
import { setLocalStorage } from '../../store/actions';

const Fields = () => (
  <div>
    <h2 className="login-register__title">Register an <span>account</span></h2>
    <Forms.TextField
      name="firstName"
      type="text"
      icon={<Icon
        name="user"
        style={{
          heigth: '18px',
          width: '18px',
        }}
      />}
      placeHolder="First Name"
    />
    <Forms.TextField
      name="lastName"
      type="text"
      icon={<Icon
        name="user"
        style={{
          heigth: '18px',
          width: '18px',
        }}
      />}
      placeHolder="Last Name"
    />
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
);

const formProvider = Forms.Form({
  displayErrorList: false,
  formName: 'registerAsRetailer',
  formId: 'register-form',
  submitLabel: 'Register As Retailer',
  schema: schemas.accounts.registerAsRetailer,
  submitHandler: async (
    {
      firstName, lastName, address, email, password,
    },
    dispatch,
    props,
  ) => props.makeApiCall({
    firstName, lastName, address, email, password,
  }),
  successHandler: (reset, result, dispatch, props) => {
    reset();
    props.localStorage.dispatch.set('token', result.token);
  },
  errorHandler: (error, dispatch) => {}, // eslint-disable-line no-unused-vars
});

const crossStorageUrl = CROSS_STORAGE_URL; // eslint-disable-line no-undef

const RegisterAsRetailerForm = compose(
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
  accountsApi.mutation.registerAsRetailer,
  formProvider,
)(Fields);

const RegisterPage = ({ history }) => (
  <Layouts.LoginRegisterLayout navigationBar={<Pages.AccountsHeader history={history} />}>
    <RegisterAsRetailerForm />
    <span className="login-register__button-subtext">
      Already have an account?
      <Link to="/login" className="login-register__button-subtext-link"> Login here</Link>
    </span>
  </Layouts.LoginRegisterLayout>
);

RegisterPage.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line
};

export default RegisterPage;
