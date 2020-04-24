/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import { schemas } from '@sloops/library-utils';
import { Forms, Layouts, Button, Icon } from '@sloops/library-ui-components';
import { accountsApi } from '@sloops/library-ui-data-wrappers';

// TODO: not used anymore?

const invitationArrayRenderer = ({
  fields,
  meta: { error },
  allErrors,
}) => (
  <div>
    { error && <div>{ error }</div> }
    <table style={{ width: '100%' }}>
      <thead>
        <tr style={{ textAlign: 'left' }}>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {
          fields.map((invitation, ix) => {
            const firstName = `${invitation}.firstName`;
            const firstNameError = allErrors && allErrors[firstName];

            const lastName = `${invitation}.lastName`;
            const lastNameError = allErrors && allErrors[lastName];

            const email = `${invitation}.email`;
            const emailError = allErrors && allErrors[email];

            return (
              <tr key={ix}>
                <td><Forms.TextField errorMessage={firstNameError && firstNameError.split(`${invitation}.`)[1]} name={firstName} /></td>
                <td><Forms.TextField errorMessage={lastNameError && lastNameError.split(`${invitation}.`)[1]} name={lastName} /></td>
                <td><Forms.TextField errorMessage={emailError && emailError.split(`${invitation}.`)[1]} name={email} /></td>
                <td>
                  {
                    fields.length > 1 &&
                    <Button
                      onClick={() => fields.remove(ix)}
                      icon={<Icon name="x" />}
                      iconPosition="right"
                    />
                  }
                  {
                    ix === fields.length - 1 &&
                    <Button
                      onClick={() => fields.push()}
                      icon={<Icon name="circled-add" />}
                      iconPosition="right"
                    />
                  }
                </td>
              </tr>
            );
          })
        }
      </tbody>
    </table>
  </div>
);

const Fields = ({ allErrors }) => (
  <div>
    <Forms.FieldArray
      name="invitations"
      allErrors={allErrors}
      component={invitationArrayRenderer}
    />
  </div>
);

const formProvider = Forms.Form({
  displayErrorList: false,
  formName: 'sendInvitations',
  submitLabel: 'Send',
  schema: schemas.accounts.sendInvitations,
  submitHandler: async (
    {
      role,
      manager,
      invitations,
    },
    dispatch,
    props,
  ) => props.makeApiCall({
    role,
    manager,
    invitations: invitations.map(({
      firstName,
      lastName,
      email,
    }) => ({
      firstName,
      lastName,
      email,
    })),
  }),
  successHandler: (reset, result, dispatch, props) => { // eslint-disable-line no-unused-vars
    reset();
  },
  errorHandler: (error, dispatch) => {}, // eslint-disable-line no-unused-vars
});

const SendInvitationsForm = compose(
  withProps(() => ({
    initialValues: {
      role: 'isAdministrator',
      invitations: [
        {
          firstName: '',
          lastName: '',
          email: '',
        },
      ],
    },
  })),
  accountsApi.mutation.sendInvitations,
  formProvider,
)(Fields);

const SendInvitations = ({ history }) => (
  <Layouts.AdminDashboardLayout history={history}>
    <h2>Send invitations</h2>
    <SendInvitationsForm />
  </Layouts.AdminDashboardLayout>
);

SendInvitations.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default SendInvitations;
