/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';
import { compose, withProps } from 'recompose';
import Alert from 'react-s-alert';
import { schemas } from '@sloops/library-utils';
import { Forms, Button, Icon } from '@sloops/library-ui-components';
import { accountsApi, userApi } from '@sloops/library-ui-data-wrappers';

const invitationArrayRenderer = ({
  fields,
  meta: { error },
  allErrors,
}) => (
  <div>
    { error && <div>{ error }</div> }
    <table className="pages-table with-spacing valign-top">
      <thead>
        <tr style={{ textAlign: 'left' }}>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
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
                <td>
                  <Forms.TextField
                    type="text"
                    icon={<Icon
                      name="envelope"
                      color="#0e345e"
                      style={{
                        heigth: '18px',
                        width: '18px',
                      }}
                    />}
                    normalize={value => value && value.trim()}
                    placeHolder="Email"
                    errorMessage={emailError && emailError.split(`${invitation}.`)[1]}
                    name={email}
                    className="pages-table-td-text-field"
                  />
                </td>
                <td>
                  <Forms.TextField
                    type="text"
                    icon={<Icon
                      name="user"
                      color="#0e345e"
                      style={{
                        heigth: '18px',
                        width: '18px',
                      }}
                    />}
                    placeHolder="First Name"
                    errorMessage={firstNameError && firstNameError.split(`${invitation}.`)[1]}
                    name={firstName}
                    className="pages-table-td-text-field"
                  />
                </td>
                <td>
                  <Forms.TextField
                    type="text"
                    icon={<Icon
                      name="user"
                      color="#0e345e"
                      style={{
                        heigth: '18px',
                        width: '18px',
                      }}
                    />}
                    placeHolder="Last Name"
                    errorMessage={lastNameError && lastNameError.split(`${invitation}.`)[1]}
                    name={lastName}
                    className="pages-table-td-text-field"
                  />
                </td>
                {
                  fields.length > 1 &&
                  <td>
                    <Button
                      onClick={() => fields.remove(ix)}
                      icon={<Icon name="x" />}
                      iconPosition="right"
                    />
                  </td>
                }
                {
                  ix === fields.length - 1 &&
                  <td>
                    <Button
                      onClick={() => fields.push()}
                      icon={<Icon name="circled-add" />}
                      iconPosition="right"
                    />
                  </td>
                }
              </tr>
            );
          })
        }
      </tbody>
    </table>
  </div>
);

const managerForRepOptions = users => users
  .filter(user => user.isSalesManager)
  .map(user => (
    {
      value: user.id,
      label: `${user.firstName} ${user.lastName}`,
    }
  ));

const Fields = ({ allErrors, userList: { users }, invitationFor }) => (
  <div>
    {
      invitationFor === 'representative' && users
        ? (
          <Forms.SelectField
            label="Assign to Sales Manager"
            name="manager"
            options={managerForRepOptions(users)}
          />
        ) : null
    }
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
  submitLabel: 'Send Invitation',
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
    props.closeInvitationModal();
    Alert.success('Intivitations have been send');
  },
  errorHandler: (error, dispatch) => { // eslint-disable-line no-unused-vars
    Alert.success('Invitations cannot be send: ', error);
  },
});

const TeamAdminManagerInvitationForm = compose(
  withProps(({ closeInvitationModal, invitationFor }) => ({
    initialValues: {
      role: (invitationFor === 'manager' ? 'isSalesManager' : 'isSalesRepresentative'),
      invitations: [
        {
          firstName: '',
          lastName: '',
          email: '',
        },
      ],
    },
    closeInvitationModal,
    invitationFor,
  })),
  accountsApi.mutation.sendInvitations,
  formProvider,
  userApi.query.userList,
)(Fields);

export default TeamAdminManagerInvitationForm;
