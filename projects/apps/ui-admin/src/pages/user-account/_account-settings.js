/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'react-redux';
import { compose, withProps, branch, renderComponent } from 'recompose';
import Alert from 'react-s-alert';
import { schemas } from '@sloops/library-utils';
import { Forms, Button, Icon } from '@sloops/library-ui-components';
import { accountsApi } from '@sloops/library-ui-data-wrappers';

/* eslint-disable react/prop-types */
const phoneNumberArrayRenderer = ({
  fields,
  error,
}) => (
  <div>
    {
      fields.map((phoneNumber, ix) => (
        <div key={ix} className="user-account-phone-field">
          {
            ix !== 0 &&
            <Button
              className="user-account-phone-remove-btn" // TODO: create text field with action buttons
              onClick={() => fields.remove(ix)}
              icon={<Icon name="bin" />}
              iconPosition="right"
            />
          }
          <Forms.TextField
            icon={<Icon
              name="phone-dial"
              color="#0e345e"
              style={{
                heigth: '18px',
                width: '18px',
              }}
            />}
            name={phoneNumber}
            type="text"
            placeHolder={`Phone number ${ix + 1}`}
            errorMessage={error[ix]}
          />
        </div>
      ))
    }
    <div>
      <Button label="Add new number" minimal onClick={() => fields.push()} className="user-account-array-field-add-btn" icon={<Icon name="circled-add" />} />
    </div>
  </div>
);

const Fields = ({ allErrors }) => (
  <div className="user-account-inputs-wrapper">
    <h2 className="user-account-title">My Account <span>details</span></h2>
    <Forms.TextField
      name="firstName"
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
    />
    <Forms.TextField
      name="lastName"
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
    />
    <Forms.TextField
      name="email"
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
    />
    <Forms.FieldArray
      name="phoneNumbers"
      error={
        Object
          .keys(allErrors)
          .filter(k => k.startsWith('phoneNumbers'))
          .reduce((error, k) => ({
            ...error,
            [parseInt(k.split('[')[1].split(']')[0], 10)]: `Phone number ${allErrors[k].split(']')[1]}`,
          }), {})
      }
      component={phoneNumberArrayRenderer}
    />
    <div className="user-account-form-subheader">location</div>
    <Forms.AddressField
      name="address"
      apiKey="AIzaSyB_eudWv35hPw9D-epkWQs8mifT3bhTqpw"
      width={360}
      height={400}
      error={allErrors['address.number'] ? allErrors['address.number'].replace('address.number', 'Number') : ''}
    />
  </div>
);

const formProvider = Forms.Form({
  displayErrorList: false,
  formName: 'updateAccountSettings',
  submitLabel: 'Confirm',
  schema: schemas.accounts.updateAccountSettings,
  submitHandler: async (
    {
      firstName,
      lastName,
      email,
      phoneNumbers,
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
    },
    dispatch,
    props,
  ) => props.makeApiCall({
    firstName,
    lastName,
    email,
    phoneNumbers,
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
  }),
  successHandler: (reset, result, dispatch, props) => { // eslint-disable-line no-unused-vars
    Alert.success('Successfully saved!');
  },
  errorHandler: (error, dispatch) => { // eslint-disable-line no-unused-vars
    Alert.error('There was an error! ', error);
  },
});

const UpdateAccountSettingsForm = compose(
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
  accountsApi.mutation.updateAccountSettings,
  withProps(({ me: { me } }) => ({
    initialValues: {
      ...(me && {
        firstName: me.firstName,
        lastName: me.lastName,
        email: me.email,
        phoneNumbers: me.profile.phoneNumbers || [''],
        address: me.profile.address,
      }),
    },
  })),
  branch(
    props => !props.me || props.me.loading,
    renderComponent(() => <div className="user-account-inputs-wrapper">loading...</div>),
  ),
  formProvider,
)(Fields);

const AccountSettings = () => <UpdateAccountSettingsForm />;

export default AccountSettings;
