import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import TabNav from '../tabnav';

const stories = storiesOf('TabNav component', module);

const menuItems = [
  {
    label: 'Menu item 1',
    onClick: action('Menu 1 clicked!'),
    active: true,
  },
  {
    label: 'Menu item 2',
    onClick: action('Menu 2 clicked!'),
  },
  {
    label: 'Menu item 3',
    onClick: action('Menu 3 clicked!'),
  },
];

stories.add('Tab Navigation field', withInfo('demonstrates tabular navigation used inside the pages')(() => (
  <div style={{ width: '800px' }}>
    <TabNav items={menuItems} />
  </div>
)));
