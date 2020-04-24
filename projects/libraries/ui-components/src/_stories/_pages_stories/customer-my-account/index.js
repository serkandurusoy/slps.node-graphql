import React from 'react';
import { Button, Icon } from '../../../';
import { TextFieldInput } from '../../../forms/_text-field';
import CustomerDashboardLayout from '../../../layouts/_customer-dashboard-layout';
import './_customer-my-account.sass';

export default () => (
  <CustomerDashboardLayout activeOption="retailers-list">
    <div className="forms-box__account">
      <ul>
        <li>My Account</li>
        <li>
          <span className="register-line" />
        </li>
        <li>details</li>
        <li className="forms-field__account">
          <TextFieldInput
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
        </li>
        <li className="forms-field__account">
          <TextFieldInput
            name="LastName"
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
        </li>
        <li className="forms-field__account">
          <TextFieldInput
            name="Email"
            type="text"
            icon={<Icon
              name="envelope"
              color="#0e345e"
              style={{
                heigth: '18px',
                width: '18px',
              }}
            />}
            placeHolder="Email"
          />
        </li>
        <li className="forms-field__account">
          <TextFieldInput
            name="phone"
            type="text"
            icon={<Icon
              name="phone-dial"
              color="#0e345e"
              style={{
                heigth: '18px',
                width: '18px',
              }}
            />}
            placeHolder="phone"
          />
          <div className="temporary-button">
            <a href="">
              <Icon
                name="bin"
                color="#fff"
              />
            </a>
          </div>
          <div>
            <a href="">
              <Icon
                name="circled-add"
                color="#4acba4"
              />
              <span>
                Add new number
              </span>
            </a>
          </div>
        </li>
        <li>location</li>
        <li className="forms-field__account">
          <TextFieldInput
            name="Adress"
            type="text"
            icon={<Icon
              name="compass"
              color="#0e345e"
              style={{
                heigth: '18px',
                width: '18px',
              }}
            />}
            placeHolder="Address - Google Autocomplete"
          />
        </li>
        <li className="forms-field__account">
          <TextFieldInput
            name="City"
            type="text"
            icon={<Icon
              name="compass"
              color="#0e345e"
              style={{
                heigth: '18px',
                width: '18px',
              }}
            />}
            placeHolder="City"
          />
        </li>
        <li className="forms-field__account">
          <TextFieldInput
            name="Postal code"
            type="text"
            icon={<Icon
              name="barcode"
              color="#0e345e"
              style={{
                heigth: '18px',
                width: '18px',
              }}
            />}
            placeHolder="Postal code"
          />
        </li>
        <li className="forms-field__account">
          <Button
            medium
            label="confirm"
          />
        </li>
      </ul>
    </div>
  </CustomerDashboardLayout>
);
