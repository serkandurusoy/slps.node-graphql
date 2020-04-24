import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { ToggleSwitchField } from '../forms/_toggle-switch-field';

const stories = storiesOf('Forms/ToggleSwitchField component', module);

stories.add('toggle switch playground', withInfo('demonstrates changing toggle switch and properties')(() => (<ToggleSwitchField
  disabled={boolean('Disabled', false)}
  checked={boolean('Checked', false)}
  name={text('Name', 'checkbox')}
  label={text('Label', 'label')}
  onChange={action('Change Switch')}
  value={text('Value', 'test-value-1')}
/>)));
