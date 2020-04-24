import React from 'react';
import { compose } from 'recompose';
import Alert from 'react-s-alert';
import { schemas } from '@sloops/library-utils';
import { Forms, Icon } from '@sloops/library-ui-components';
import { accountsApi } from '@sloops/library-ui-data-wrappers';

const Fields = () => (
  <div className="user-account-inputs-wrapper">
    <h2 className="user-account-title">Password reset <span>old password</span></h2>
    <Forms.TextField
      name="oldPassword"
      type="password"
      icon={<Icon
        name="lock"
        color="#0e345e"
        style={{
          heigth: '18px',
          width: '18px',
        }}
      />}
      placeHolder="Old password"
    />
    <div className="user-account-form-subheader">New password</div>
    <Forms.TextField
      name="newPassword"
      type="password"
      icon={<Icon
        name="lock"
        color="#0e345e"
        style={{
          heigth: '18px',
          width: '18px',
        }}
      />}
      placeHolder="New password"
    />
    <Forms.TextField
      name="newPasswordConfirm"
      type="password"
      icon={<Icon
        name="lock"
        color="#0e345e"
        style={{
          heigth: '18px',
          width: '18px',
        }}
      />}
      placeHolder="Confirm new password"
    />
  </div>
);

const formProvider = Forms.Form({
  displayErrorList: false,
  formName: 'changePassword',
  submitLabel: 'Confirm',
  schema: schemas.accounts.changePassword,
  submitHandler: async (
    {
      oldPassword,
      newPassword,
    },
    dispatch,
    props,
  ) => props.makeApiCall({ oldPassword, newPassword }),
  successHandler: (reset, result, dispatch, props) => { // eslint-disable-line no-unused-vars
    reset();
    Alert.success('Password has been reset!');
  },
  errorHandler: (error, dispatch) => { // eslint-disable-line no-unused-vars
    Alert.error('Something went wrong! ', error);
  },
});

const ChangePasswordForm = compose(
  accountsApi.mutation.changePassword,
  formProvider,
)(Fields);

const PasswordReset = () => <ChangePasswordForm />;

export default PasswordReset;
