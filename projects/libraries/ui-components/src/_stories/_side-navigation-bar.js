import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import SideNavigationBar from '../side-navigation-bar';

const stories = storiesOf('SideNavigationBar component', module);

const options = [
  {
    label: 'Dashboard',
    onClick: action('Clicked!'),
    icon: 'clusters',
    active: false,
  },
  {
    label: 'Orders',
    onClick: action('Clicked!'),
    icon: 'cart',
    active: false,
  },
  {
    label: 'Inventory',
    onClick: action('Clicked!'),
    icon: 'list-unordered',
    active: true,
    subOptions: [
      {
        label: 'Item 1',
        onClick: action('Clicked!'),
        active: false,
      },
      {
        label: 'Item 2',
        onClick: action('Clicked!'),
        active: true,
      },
      {
        label: 'Item 3',
        onClick: action('Clicked!'),
        active: false,
      },
    ],
  },
  {
    label: 'Promo campains',
    onClick: action('Clicked!'),
    icon: 'star',
    active: false,
  },
  {
    label: 'Shop details',
    onClick: action('Clicked!'),
    icon: 'shop',
    active: false,
    subOptions: [
      {
        label: 'Details',
        onClick: action('Clicked!'),
        active: false,
      },
      {
        label: 'Edit',
        onClick: action('Clicked!'),
        active: false,
      },
    ],
  },
];

stories.add('SideNavigationBar component playground', withInfo('demonstrates SideNavigationBar and properties')(() => (<SideNavigationBar
  options={options}
/>)));

stories.add('SideNavigationBar aditional custom styles', withInfo('demonstrates SideNavigationBar additional styles')(() => (<SideNavigationBar
  options={options}
  style={object('Styles', { minHeight: '100vh' })}
/>)));
