import React from 'react';
import { storiesOf } from '@storybook/react';
import SalesLanding from './sales-landing';
import SalesShopDetails from './sales-shop-details';
import RetailLanding from './retail-landing';
import RegistrationPage from './register-page';
import RegistrationPageError from './register-page-error';
import LoginPage from './login-page';
import CustomerMyAccount from './customer-my-account';

const pagesWrapperStyles = { width: '100%', height: '100%' };
const PagesDecorator = storyFn => <div style={pagesWrapperStyles}>{storyFn()}</div>;

const stories = storiesOf('Pages', module).addDecorator(PagesDecorator);

stories.add(
  'Sales hub: Landing page',
  () => (<SalesLanding />),
);

stories.add(
  'Sales hub: Shop details page',
  () => (<SalesShopDetails />),
);

stories.add(
  'Retailer: Landing page',
  () => (<RetailLanding />),
);

stories.add(
  'Retailer: Registration Page',
  () => (<RegistrationPage />),
);

stories.add(
  'Retailer: Registration Page - error',
  () => (<RegistrationPageError />),
);

stories.add(
  'Retailer: Login Page',
  () => (<LoginPage />),
);

stories.add(
  'Customer: My Account',
  () => (<CustomerMyAccount />),
);
