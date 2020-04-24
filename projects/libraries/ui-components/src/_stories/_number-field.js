import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { text, boolean, select, color, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { NumberFieldInput } from '../forms/_number-field';
import { iconNameOptions } from './constants';
import Icon from '../icon';

const stories = storiesOf('Forms/NumberField component', module);

const POSITIONS = (name, initial) => select(name, {
  left: 'left',
  right: 'right',
}, initial);

stories.add('number field without icon with min 0 and max 20', withInfo('demonstrates changing textfield field and properties without icon')(() => (<NumberFieldInput
  name={text('Name', 'Text Field')}
  label={text('Label', 'Label')}
  onChange={action('Change text area')}
  icon={null}
  button={null}
  placeHolder={text('PlaceHolder', 'Please provide a text')}
  errorState={boolean('ErrorState', false)}
  min={number('Min', 0)}
  max={number('Max', 20)}
  precision={number('Precision', 1)}
  step={number('Step', 1)}
/>)));

stories.add('number field playground', withInfo('demonstrates changing properties and value of number field.')(() => (<NumberFieldInput
  disabled={boolean('Disabled', false)}
  errorState={boolean('Error State', false)}
  placeHolder={text('Name', 'Please enter a number')}
  name={text('Name', 'NumberField')}
  label={text('Label', 'label')}
  iconPosition={POSITIONS('Icon Position', 'left')}
  buttonPosition={POSITIONS('Button Position', 'left')}
  onChange={action('Change Value')}
  icon={<Icon
    name={select('Icon Type', iconNameOptions, 'cart')}
    size={select('Icon Size', {
      small: 'small',
      medium: 'medium',
      large: 'large',
    }, 'small')}
    color={color('Icon Color', '#000')}
  />}
/>)));
