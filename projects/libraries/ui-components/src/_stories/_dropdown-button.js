import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { DropdownButtonInput } from '../dropdown-button';

const stories = storiesOf('DropdownButton component', module);

const buttonWrapperStyles = {
  width: '600px',
  display: 'flex',
  justifyContent: 'center',
};

const options = [
  {
    label: 'Test 1',
    value: 'test-1',
  },
  {
    label: 'Test 2',
    value: 'test-2',
  },
  {
    label: 'Test 3',
    value: 'test-3',
  },
];

stories.add('Dropdown Button', withInfo('demonstrates changing dropdown button\'s built-in properties')(() => (
  <div style={buttonWrapperStyles}>
    <DropdownButtonInput options={options} value="test-1" />
  </div>
)));

stories.add('Dropdown Button Opened', withInfo('demonstrates changing dropdown button\'s built-in properties')(() => (
  <div style={buttonWrapperStyles}>
    <DropdownButtonInput isOpened options={options} value="test-2" />
  </div>
)));

stories.add('Dropdown Button without arrow', withInfo('demonstrates changing dropdown button\'s built-in properties')(() => (
  <div style={buttonWrapperStyles}>
    <DropdownButtonInput arrow={false} options={options} value="test-3" />
  </div>
)));
