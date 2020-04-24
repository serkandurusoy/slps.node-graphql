import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { text, boolean, select, color } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { TextFieldInput } from '../forms/_text-field';
import { iconNameOptions } from './constants';
import Icon from '../icon';

const stories = storiesOf('Forms/TextField component', module);

const TYPES = [
  'text',
  'password',
  'email',
];

stories.add('textfield field without icon', withInfo('demonstrates changing textfield field and properties without icon')(() => (<TextFieldInput
  name={text('Name', 'Text Field')}
  label={text('Label', 'Label')}
  onChange={action('Change text area')}
  value={text('Value')}
  type={select('Type', TYPES, 'text')}
  icon={null}
  button={null}
  placeHolder={text('PlaceHolder', 'Please provide a text')}
  errorState={boolean('ErrorState', false)}
/>)));

stories.add('textfield field with circle button', withInfo('demonstrates changing textfield field and properties with button')(() => (<TextFieldInput
  name={text('Name', 'Text Field')}
  label={text('Label', 'Label')}
  onChange={action('Change text area')}
  value={text('Value')}
  type={select('Type', TYPES, 'text')}
  icon={null}
  button
  placeHolder={text('PlaceHolder', 'Please provide a text')}
  errorState={boolean('ErrorState', false)}
/>)));

stories.add('textfield field with icon', withInfo('demonstrates changing textfield field and properties with icon')(() => (<TextFieldInput
  name={text('Name', 'Text Field')}
  onChange={action('Change text area')}
  value={text('Value')}
  placeHolder={text('PlaceHolder', 'Please provide a text')}
  errorState={boolean('ErrorState', false)}
  button={null}
  type={select('Type', TYPES, 'text')}
  label={text('Label', 'label')}
  icon={<Icon
    style={{ display: 'block' }}
    name={select('Icon Type', iconNameOptions, 'arrow-down')}
    size={select('Icon Size', {
      small: 'small',
      medium: 'medium',
      large: 'large',
    }, 'small')}
    color={color('Icon Color', '#000')}
  />}
/>)));
