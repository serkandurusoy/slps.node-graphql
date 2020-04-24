import React from 'react';
import { Button, Icon } from '../../../';
import { TextFieldInput } from '../../../forms/_text-field';
import LoginRegisterLayout from '../../../layouts/_login-register-layout';

export default () => (
  <LoginRegisterLayout>
    <div className="forms-box forms-box__login">
      <ul>
        <li>User
          <span> login</span>
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
      </ul>
    </div>
    <div className="button-box__login">
      <div className="button-box__text button-box__password">
        <a href="">Forgot your password?</a>
      </div>
      <div className="button-box__button">
        <Button
          large
          label="login"
          icon={<Icon name="vector-right" />}
          iconPosition="right"
        />
      </div>
      <div className="button-box__text">
        Do not have an account? <a href="">Sign up here</a>
      </div>
    </div>
  </LoginRegisterLayout>
);
