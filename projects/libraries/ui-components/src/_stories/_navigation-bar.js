import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import NavigationBar from '../navigation-bar';

const stories = storiesOf('NavigationBar component', module);

stories.add('NavigationBar component playground', withInfo('demonstrates changing NavigationBar and properties')(() => (<NavigationBar
  style={{ width: '1000px' }} // just for storybook
  transparent={boolean('Transparent', false)}
  logoOnClick={action('Logo clicked')}
  leftButton={{
    label: text('Left Button', 'Left Button'),
    onClick: action('I am the left button'),
  }}
  rightButton={{
    label: text('Right Button', 'Right Button'),
    onClick: action('I am the right button'),
  }}
  infoSection={{
    primaryText: text('Primary Text', 'Straßburger Str. 10000, Berlin'),
    onClick: action('I will redirect you'),
  }}
/>)));

stories.add('NavigationBar component playground with promo badge', withInfo('demonstrates NavigationBar with promo badge')(() => (<NavigationBar
  transparent={boolean('Transparent', false)}
  logoOnClick={action('Logo clicked')}
  leftButton={{
    label: text('Left Button', 'Left Button'),
    onClick: action('I am the left button'),
  }}
  rightButton={{
    label: text('Right Button', 'Right Button'),
    onClick: action('I am the right button'),
  }}
  promoSection={{
    text: text('Promo Text', 'See promotions around you'),
  }}
/>)));
