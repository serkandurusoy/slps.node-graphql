import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { LongTextFieldInput } from '../forms/_long-text-field';

const stories = storiesOf('Forms/LongTextField component', module);

stories.add('longtext field playground', withInfo('demonstrates changing longtext field and properties')(() => (<LongTextFieldInput
  disabled={boolean('Disabled', false)}
  name={text('Name', 'radio')}
  label={text('Label', 'label')}
  onChange={action('Change text area')}
  value={text('Value')}
  placeHolder={text('Name', 'Please provide a text')}
  errorState={boolean('ErrorState', false)}
/>)));
