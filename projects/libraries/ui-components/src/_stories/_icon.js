import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { select, color, number } from '@storybook/addon-knobs';
import { icons, iconNameOptions } from './constants';
import Icon from '../icon';

const stories = storiesOf('Icon component', module);

stories.add('all icons', withInfo('demonstrates all icons as a sprite sheet')(() => (
  <div>
    {
      icons.map(icon => (<Icon
        key={icon}
        name={icon}
        style={{
          border: '1px solid #ccc',
          padding: 6,
          float: 'left',
          margin: '20px 10px',
        }}
      />))
    }
  </div>
)));

stories.add('custom size', withInfo('demonstrates all icons as a sprite sheet')(() => (
  <Icon
    name={select('Type', iconNameOptions, 'cart')}
    size={number('Size', 150)}
  />
)));

stories.add('playground', withInfo('demonstrates changing icons and properties')(() => (
  <Icon
    name={select('Type', iconNameOptions, 'arrow-down')}
    size={select('Size', {
      small: 'small',
      medium: 'medium',
      large: 'large',
    }, 'medium')}
    color={color('Color', '#000')}
  />
)));
