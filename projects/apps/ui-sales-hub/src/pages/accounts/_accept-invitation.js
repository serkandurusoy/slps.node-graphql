import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose, withProps, branch, renderComponent } from 'recompose';
import { schemas } from '@sloops/library-utils';
import { Forms, Icon, Layouts, Pages } from '@sloops/library-ui-components';
import { uiApi, accountsApi } from '@sloops/library-ui-data-wrappers';
import { setLocalStorage } from '../../store/actions';

// eslint-disable-next-line react/prop-types
const Fields = ({ allErrors }) => (
  <div>
    <h2 className="login-register__title">Accept <span>Invitation</span></h2>
    <div className="login-register__separator" />
    <Forms.TextField
      icon={<Icon
        name="user"
        color="#0e345e"
        style={{
          heigth: '18px',
          width: '18px',
        }}
      />}
      placeHolder="First Name"
      name="firstName"
      type="text"
    />
    <Forms.TextField
      icon={<Icon
        name="user"
        color="#0e345e"
        style={{
          heigth: '18px',
          width: '18px',
        }}
      />}
      placeHolder="Last Name"
      name="lastName"
      type="text"
    />
    <Forms.AddressField
      name="address"
      apiKey="AIzaSyB_eudWv35hPw9D-epkWQs8mifT3bhTqpw"
      width={360}
      height={400}
      error={allErrors['address.number'] ? allErrors['address.number'].replace('address.number', 'Number') : ''}
    />
    <Forms.TextField
      icon={<Icon
        name="lock"
        style={{
          heigth: '18px',
          width: '18px',
        }}
      />}
      placeHolder="Password"
      name="password"
      type="password"
    />
    <Forms.TextField
      icon={<Icon
        name="lock"
        style={{
          heigth: '18px',
          width: '18px',
        }}
      />}
      placeHolder="Confirm Password"
      name="passwordConfirm"
      type="password"
    />
  </div>
);

const formProvider = Forms.Form({
  displayErrorList: false,
  formName: 'acceptInvitation',
  submitLabel: 'Accept',
  schema: schemas.accounts.acceptInvitationAsSalesRep,
  submitHandler: async (
    {
      firstName,
      lastName,
      address: {
        lat,
        lng,
        number,
        street,
        area,
        city,
        zip,
        state,
        country,
      },
      password,
    },
    dispatch,
    props,
  ) => props.makeApiCall({
    firstName,
    lastName,
    address: {
      lat,
      lng,
      number,
      street,
      area,
      city,
      zip,
      state,
      country,
    },
    password,
    pendingInvitation: props.match.params.pendingInvitation,
  }),
  successHandler: (reset, result, dispatch, props) => {
    reset();
    props.localStorage.dispatch.set('token', result.token);
  },
  errorHandler: (error, dispatch) => {}, // eslint-disable-line no-unused-vars
});

const crossStorageUrl = CROSS_STORAGE_URL; // eslint-disable-line no-undef

const AcceptInvitationForm = compose(
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
  withRouter,
  accountsApi.query.retrieveInvitation,
  accountsApi.mutation.acceptInvitation,
  withProps(({ retrieveInvitation }) => ({
    initialValues: {
      ...(retrieveInvitation && retrieveInvitation.retrieveInvitation),
    },
  })),
  branch(
    props => !props.retrieveInvitation || props.retrieveInvitation.loading,
    renderComponent(() => <div>loading...</div>),
  ),
  formProvider,
)(Fields);

const AcceptInvitation = ({ history }) => (
  <Layouts.LoginRegisterLayout
    navigationBar={
      <Pages.AccountsHeader
        history={history}
        noRegisterButton
      />
    }
  >
    <AcceptInvitationForm />
  </Layouts.LoginRegisterLayout>
);

AcceptInvitation.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line
};

export default AcceptInvitation;
