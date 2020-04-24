import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
// import { action } from '@storybook/addon-actions';
import { DateTimeInput } from '../forms/_datetime-field';

const stories = storiesOf('Forms/Datepicker component', module);

stories.add('Datepicker field', withInfo('demonstrates chosing date time')(() => (
  <div style={{ width: '500px' }}>
    <DateTimeInput inputProps={{ placeholder: 'Date and Time select' }} />
  </div>)));

stories.add('Datepicker field with date format, without time', withInfo('demonstrates chosing date time')(() => (
  <div style={{ width: '500px' }}>
    <DateTimeInput inputProps={{ placeholder: 'Date and Time select' }} dateFormat="YYYY-MM-DD" timeFormat={false} />
  </div>)));

stories.add('Datepicker field with time format, without date', withInfo('demonstrates chosing date time')(() => (
  <div style={{ width: '500px' }}>
    <DateTimeInput inputProps={{ placeholder: 'Date and Time select' }} dateFormat={false} timeFormat="HH:mm:ss" />
  </div>)));
