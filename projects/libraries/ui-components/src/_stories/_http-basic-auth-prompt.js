import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import Icon from '../icon';
import HttpBasicAuthPrompt from '../http-basic-auth-prompt';

const stories = storiesOf('Http basic auth prompt component', module);

stories.add('auth enabled', withInfo('demonstrates usage on staging')(() => (
  <HttpBasicAuthPrompt
    makeApiCall={action('try password login')}
    enabled={boolean('Enabled', true)}
    authenticated={boolean('Authenticated', false)}
    rejected={boolean('Rejected', false)}
  >
    <Icon
      name="arrow-down"
      size="medium"
      color="#000"
    />
  </HttpBasicAuthPrompt>
)));

stories.add('auth disabled', withInfo('demonstrates usage in production, should get out of the way and show its child (Bar)')(() => (
  <HttpBasicAuthPrompt
    makeApiCall={action('try password login')}
  >
    <Icon
      name="arrow-down"
      size="medium"
      color="#000"
    />
  </HttpBasicAuthPrompt>
)));
