import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { CheckboxFields, CheckboxField } from '../forms/_checkbox-field';

const stories = storiesOf('Forms/CheckboxField component', module);

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
}, {
  value: 'test-4',
  label: 'Test 4',
  checked: true,
}];

stories.add('checkbox group playground', withInfo('demonstrates changing checkbox group and properties')(() => (<CheckboxFields
  options={options}
  name={text('Name', 'checkbox')}
  buttonized={boolean('Buttonized', false)}
  onChange={action('Change Checkbox')}
/>)));

stories.add('buttonized checkbox group playground', withInfo('demonstrates changing checkbox group and properties, styled as buttons')(() => (<CheckboxFields
  options={options}
  name={text('Name', 'checkbox')}
  buttonized={boolean('Buttonized', true)}
  onChange={action('Change Checkbox')}
/>)));

stories.add('single checkbox field playground', withInfo('demonstrates changing single checkbox field and properties')(() => (<CheckboxField
  value={text('Value', 'test-value-1')}
  label={text('Label', 'Label for checkbox')}
  name={text('Name', 'checkbox')}
  disabled={boolean('Disabled', false)}
  checked={boolean('Checked', true)}
  buttonized={boolean('Buttonized', false)}
  onChange={action('Change Checkbox')}
/>)));

stories.add('single buttonized checkbox field playground', withInfo('demonstrates changing single buttonized checkbox field and properties')(() => (<CheckboxField
  value={text('Value', 'test-value-1')}
  label={text('Label', 'Label for checkbox')}
  name={text('Name', 'checkbox')}
  disabled={boolean('Disabled', false)}
  checked={boolean('Checked', true)}
  buttonized={boolean('Buttonized', true)}
  onChange={action('Change Checkbox')}
/>)));
