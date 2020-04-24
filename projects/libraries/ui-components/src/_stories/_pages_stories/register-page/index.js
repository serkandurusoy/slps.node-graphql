import React from 'react';
import { Button, Icon } from '../../../';
import { TextFieldInput } from '../../../forms/_text-field';
import LoginRegisterLayout from '../../../layouts/_login-register-layout';

export default () => (
  <LoginRegisterLayout>
    <div className="forms-box">
      <ul>
        <li>Register an <span>account</span></li>
        <li className="forms-field">
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
        <li className="forms-field">
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
        <li>
          <span className="register-line" />
        </li>
        <li className="forms-field">
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
        <li className="forms-field">
          <TextFieldInput
            name="Password"
            type="password"
            icon={<Icon
              name="lock"
              color="#0e345e"
              style={{
                heigth: '18px',
                width: '18px',
              }}
            />}
            placeHolder="Password"
          />
        </li>
        <li className="forms-field">
          <TextFieldInput
            name="Confirm"
            type="password"
            icon={<Icon
              name="lock"
              color="#0e345e"
              style={{
                heigth: '18px',
                width: '18px',
              }}
            />}
            placeHolder="Confirm Password"
          />
        </li>
      </ul>
    </div>
    <div className="button-box">
      <div className="button-box__button">
        <Button
          large
          label="register"
          icon={<Icon name="vector-right" />}
          iconPosition="right"
        />
      </div>
      <div className="button-box__text">
        Already have an account? <a href="">Login here</a>
      </div>
    </div>
  </LoginRegisterLayout>
);
