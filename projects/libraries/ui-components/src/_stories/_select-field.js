import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { SelectFieldInput } from '../forms/_select-field';

const stories = storiesOf('Forms/SelectField component', module);

const options = [
  { value: 'one', label: 'One One One' },
  { value: 'two', label: 'Two Two Two' },
];

const getOptions = () =>
  new Promise(resolve => setTimeout(() => resolve({
    options: [
      { value: 'one', label: 'One One One' },
      { value: 'two', label: 'Two Two Two' },
    ],
  }), 600));

stories.add('Select field - Autocomplete with static options playground', withInfo('demonstrates Select Autocomplete field and properties')(() => (<SelectFieldInput
  name={text('Name', 'select')}
  options={options}
  autoComplete
  placeholder={text('Placeholder', 'Choose...')}
  disabled={boolean('Disabled', false)}
  errorState={boolean('Error', false)}
  errorMessage={text('ErrorMessage', 'Something went wrong!')}
  label={text('Label', 'Test label here')}
  style={{ width: '400px' }} // just demo purposes
  minimal={boolean('Minimal', false)}
/>)));

stories.add('Select field - Multiselect with static options playground', withInfo('demonstrates Multiselect field and properties')(() => (<SelectFieldInput
  name={text('Name', 'select')}
  options={options}
  multi
  placeholder={text('Placeholder', 'Choose...')}
  disabled={boolean('Disabled', false)}
  errorState={boolean('Error', false)}
  errorMessage={text('ErrorMessage', 'Something went wrong!')}
  label={text('Label', 'Test label here')}
  style={{ width: '400px' }} // just demo purposes
  minimal={boolean('Minimal', false)}
/>)));

stories.add('Select field with static options playground', withInfo('demonstrates Select field and properties')(() => (<SelectFieldInput
  name={text('Name', 'select')}
  options={options}
  placeholder={text('Placeholder', 'Choose...')}
  disabled={boolean('Disabled', false)}
  errorState={boolean('Error', false)}
  errorMessage={text('ErrorMessage', 'Something went wrong!')}
  label={text('Label', 'Test label here')}
  style={{ width: '400px' }} // just demo purposes
  minimal={boolean('Minimal', false)}
/>)));

stories.add('Select field - Autocomplete with async options playground', withInfo('demonstrates Select Autocomplete field and properties')(() => (<SelectFieldInput
  name={text('Name', 'select')}
  options={getOptions}
  async
  autoComplete
  placeholder={text('Placeholder', 'Choose...')}
  disabled={boolean('Disabled', false)}
  errorState={boolean('Error', false)}
  errorMessage={text('ErrorMessage', 'Something went wrong!')}
  label={text('Label', 'Test label here')}
  style={{ width: '400px' }} // just demo purposes
  minimal={boolean('Minimal', false)}
/>)));
