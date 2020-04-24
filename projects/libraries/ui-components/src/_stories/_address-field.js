import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { AddressFieldInput } from '../forms/_address-field';

const stories = storiesOf('Forms/AddressField input component', module);

const apiKey = 'AIzaSyB_eudWv35hPw9D-epkWQs8mifT3bhTqpw';

const emptyAddress = {};
const defaultAddress = {
  lat: 51.53146786381789,
  lng: -0.2511208529784881,
  number: 1234567890,
};

stories.add('Without address', withInfo('demonstrates AddressField and properties')(() => (<AddressFieldInput
  apiKey={apiKey}
  debug={boolean('Debug address data', true)}
  value={emptyAddress}
  onChange={action('address changed')}
  error=""
/>)));

stories.add('With default address', withInfo('demonstrates AddressField and properties')(() => (<AddressFieldInput
  apiKey={apiKey}
  debug={boolean('Debug address data', true)}
  value={defaultAddress}
  onChange={action('address changed')}
  error=""
/>)));
