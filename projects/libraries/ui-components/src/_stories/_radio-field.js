import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { RadioFields } from '../forms/_radio-field';

const stories = storiesOf('Forms/RadioField component', module);

const options = [{
  value: 'test-1',
  label: 'Test 1',
  checked: true,
}, {
  value: 'test-2',
  label: 'Test 2',
}, {
  value: 'test-3',
  label: 'Test 3',
  disabled: true,
}];

stories.add('radio field playground', withInfo('demonstrates changing radio field and properties')(() => (<RadioFields
  options={options}
  name={text('Name', 'radio')}
  buttonized={boolean('Buttonized', false)}
  onChange={action('Change Radio')}
/>)));

stories.add('buttonized radio field playground', withInfo('demonstrates changing radio field and properties, styled as buttons')(() => (<RadioFields
  options={options}
  name={text('Name', 'radio')}
  buttonized={boolean('Buttonized', true)}
  onChange={action('Change Radio')}
/>)));
