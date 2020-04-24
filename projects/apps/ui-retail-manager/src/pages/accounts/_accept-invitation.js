import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose, withProps, branch, renderComponent } from 'recompose';
import { schemas } from '@sloops/library-utils';
import { Forms } from '@sloops/library-ui-components';
import { uiApi, accountsApi } from '@sloops/library-ui-data-wrappers';
import { setLocalStorage } from '../../store/actions';

const Fields = () => (
  <div>
    <Forms.TextField name="firstName" type="text" label="First name" />
    <Forms.TextField name="lastName" type="text" label="Last name" />
    <Forms.TextField name="password" type="password" label="Password" />
    <Forms.TextField name="passwordConfirm" type="password" label="Confirm password" />
  </div>
);

const formProvider = Forms.Form({
  displayErrorList: false,
  formName: 'acceptInvitation',
  submitLabel: 'Accept',
  schema: schemas.accounts.acceptInvitation,
  submitHandler: async (
    { firstName, lastName, password },
    dispatch,
    props,
  ) => props.makeApiCall({
    firstName,
    lastName,
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

const AcceptInvitation = () => (
  <div>
    <h2>Accept invitation</h2>
    <AcceptInvitationForm />
  </div>
);

export default AcceptInvitation;
