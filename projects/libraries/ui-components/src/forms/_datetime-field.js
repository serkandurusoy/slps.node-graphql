import React, { Component } from 'react';
import DateTime from 'react-datetime';
import styled from 'styled-components';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import Button from '../button';
import Icon from '../icon';
import { datepickerCommonStyles } from './constants';

const COLORS = {
  blue: '#657d95',
  lightBlue: '#b9c3c8',
  white: '#ffffff',
};

const DateTimeWrapperStyled = styled.div`
  position: relative;
  float: left;
  width: 450px;
  max-width: 100%;
  &::after {
    content: '';
    display: table;
    clear: both;
  }
`;

const DateTimeButtonStyled = styled(Button)`
  position: absolute;
  right: 5px;
  top: 60%;
  transform: translateY(-50%);
  background-color: $green !important;
  width: 30px;
  height: 30px;
  padding: 5px !important;
  z-index: 1;
`;

const DateTimeStyled = styled(DateTime)`
  ${datepickerCommonStyles}
  &.rdt {
    > input[type=text] {
      width: 100%;
      outline: none;
      border-radius: 20px;
      background-color: ${COLORS.white};
      border: solid 1px rgba(101, 125, 149, 0.2);
      padding: 8px 10px;
      font-family: 'Open Sans';
      font-size: 14px;
      line-height: 24px;
      height: 40px;
      box-sizing: border-box;
      color: ${COLORS.blue};
      margin: 15px 0;
    }
  }
  .rdtPicker {
    font-family: "Open Sans";
    border-radius: 25px;
    background-color: ${COLORS.white};
    box-shadow: 0 0 100px 0 rgba(18, 43, 35, 0.1);
    padding: 30px;
  }
`;

const DateTimeLabelStyled = styled.label`
  display: block;
  margin-bottom: 5px;
  text-transform: uppercase;
  font-family: 'Open Sans';
  font-size: 12px;
  color: ${COLORS.lightBlue};
`;

const DateTimeErrorMessage = styled.div`
font-family: 'Open Sans';
font-size: 12px;
color: red;
`;

export class DateTimeInput extends Component {
  static propTypes = {
    errorMessage: PropTypes.string,
    label: PropTypes.string,
    reduxForm: PropTypes.object, // eslint-disable-line
  }
  static defaultProps = {
    errorMessage: '',
    label: '',
  }
  handleDatepickerToggle = () => {
    this.input.focus();
  }
  render() {
    const {
      errorMessage, reduxForm, label, ...props
    } = this.props;
    return (
      <DateTimeWrapperStyled>
        {label ? <DateTimeLabelStyled>{label}</DateTimeLabelStyled> : null}
        <DateTimeButtonStyled icon={<Icon name="calendar" />} onClick={this.handleDatepickerToggle} />
        <DateTimeStyled
          inputProps={{ ref: (input) => { this.input = input; } }}
          {...props}
          {...reduxForm && reduxForm.input}
        />
        { errorMessage && <DateTimeErrorMessage>{ errorMessage }</DateTimeErrorMessage> }
      </DateTimeWrapperStyled>
    );
  }
}

const renderDateTimeInput = ({
  input, // eslint-disable-line react/prop-types
  meta, // eslint-disable-line react/prop-types
  errorState,
  errorMessage,
  ...props
}) => (
  <DateTimeInput
    errorState={errorState || !!(meta.touched && meta.error)}
    errorMessage={errorMessage || (meta.touched && meta.error ? meta.error : '')}
    reduxForm={{ input, meta }}
    {...props}
  />
);

renderDateTimeInput.propTypes = {
  errorState: PropTypes.bool,
  errorMessage: PropTypes.string,
};

renderDateTimeInput.defaultProps = {
  errorState: false,
  errorMessage: '',
};

const DateTimeField = props => <Field component={renderDateTimeInput} {...props} />;

export default DateTimeField;
