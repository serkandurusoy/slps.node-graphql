import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import { boolean, object, text, select } from '@storybook/addon-knobs';
import Button from '../button';
import { iconNameOptions } from './constants';
import Icon from '../icon';

const stories = storiesOf('Button component', module);

const buttonWrapperStyles = {
  width: '600px',
  display: 'flex',
  justifyContent: 'center',
};

stories.add('Built-in Styles [withIcon]', withInfo('demonstrates changing button\'s built-in properties')(() => (
  <div style={buttonWrapperStyles}>
    <Button
      label={text('label', 'Test label')}
      secondary={boolean('secondary', false)}
      danger={boolean('danger', false)}
      large={boolean('large', false)}
      fullWidth={boolean('fullWidth', false)}
      icon={<Icon name={select('Icon Type', iconNameOptions, 'arrow-down')} />}
      minimal={boolean('minimal', false)}
      iconPosition={select('iconPosition', {
        left: 'left',
        right: 'right',
      }, 'left')}
      disabled={boolean('disabled', false)}
      onClick={action('onClick')}
    />
  </div>
)));

stories.add('Built-in Styles [No Icon]', withInfo('demonstrates changing button\'s built-in properties')(() => (
  <div style={buttonWrapperStyles}>
    <Button
      label={text('label', 'Test label')}
      secondary={boolean('secondary', false)}
      danger={boolean('danger', false)}
      flat={boolean('flat', false)}
      large={boolean('large', false)}
      fullWidth={boolean('fullWidth', false)}
      minimal={boolean('minimal', false)}
      disabled={boolean('disabled', false)}
      onClick={action('onClick')}
    />
  </div>
)));

stories.add('Flat Style [No Icon]', withInfo('demonstrates flat style on blue background')(() => (
  <div style={{ backgroundColor: '#1e62a1', padding: '15px 0', ...buttonWrapperStyles }}>
    <Button
      label="Blue background isn't included in component!"
      flat
    />
  </div>
)));

const customStyle = {
  backgroundColor: '#000',
  color: '#fff',
  border: 'none',
  borderRadius: 25,
  padding: '20px 50px',
  fontSize: 14,
  textTransform: 'uppercase',
  ':hover': {
    backgroundColor: '#ccc',
    color: '#000',
  },
};

stories.add('Custom Style', withInfo('demonstrates changing button\'s custom style')(() => (
  <Button
    label={text('label', '')}
    style={object('style', customStyle)}
    onClick={action('onClick')}
  >
    <Icon name="arrow-left" />
  </Button>
)));
