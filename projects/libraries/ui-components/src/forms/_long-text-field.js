import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

const COLORS = {
  lightGray: '#f7f7f7',
  lightBlue: '#b9c3c8',
  blue: '#657d95',
  red: '#ff4949',
};

const LongTextFieldWrapperStyled = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin: 15px 0;
`;

const LongTextFieldLabelStyled = styled.label`
  display: inline-block;
  margin-bottom: 5px;
  text-transform: uppercase;
  font-family: 'Open Sans';
  font-size: 12px;
  color: ${COLORS.lightBlue};
`;

const LongTextFieldTextareaStyled = styled.textarea`
  display: block;
  box-sizing: border-box;
  width: 100%;
  border-radius: 25px;
  background-color: #ffffff;
  border: solid 1px rgba(101, 125, 149, 0.2);
  padding: 10px 20px;
  font-family: 'Open Sans';
  font-size: 14px;
  color: ${COLORS.blue};
  background-clip: padding-box;
  transition: border-color ease-in-out .15s;
  outline: none;
  &:focus {
    border-color: #2854A2;
  }
  &:hover {
    border-color: #AEB8C7;
  }
  ${({ errorState }) => (errorState ? `
    border-color: ${COLORS.red};
    color: ${COLORS.red};
    &:focus {
      border-color: ${COLORS.red};
    }
    &:hover {
      border-color: ${COLORS.red};
    }
  ` : '')}
`;

const InputErrorMessage = styled.div`
  font-family: 'Open Sans';
  font-size: 12px;
  color: red;
`;

export const LongTextFieldInput = ({
  onChange,
  value,
  name,
  placeHolder,
  disabled,
  label,
  rows,
  errorState,
  errorMessage,
  reduxForm,
}) => (
  <LongTextFieldWrapperStyled>
    {
      label && (
        <LongTextFieldLabelStyled htmlFor={name}>
          {label}
        </LongTextFieldLabelStyled>
      )
    }
    <LongTextFieldTextareaStyled
      name={name}
      placeholder={placeHolder}
      value={value}
      onChange={event => onChange(event.target.value)}
      disabled={disabled}
      errorState={errorState}
      rows={rows}
      {...reduxForm && reduxForm.input}
    />
    { errorMessage && <InputErrorMessage>{ errorMessage }</InputErrorMessage> }
  </LongTextFieldWrapperStyled>
);

LongTextFieldInput.displayName = 'LongTextFieldInput';

LongTextFieldInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  placeHolder: PropTypes.string,
  errorState: PropTypes.bool,
  errorMessage: PropTypes.string,
  reduxForm: PropTypes.object, // eslint-disable-line
  rows: PropTypes.number,
};

LongTextFieldInput.defaultProps = {
  disabled: false,
  label: '',
  placeHolder: '',
  errorState: false,
  errorMessage: '',
  value: '',
  onChange: () => {},
  rows: 8,
};

const renderLongTextInput = ({
  input, // eslint-disable-line react/prop-types
  meta, // eslint-disable-line react/prop-types
  errorState,
  errorMessage,
  ...props
}) => (
  <LongTextFieldInput
    errorState={errorState || !!(meta.touched && meta.error)}
    errorMessage={errorMessage || (meta.touched && meta.error ? meta.error : '')}
    reduxForm={{ input, meta }}
    {...props}
  />
);

renderLongTextInput.propTypes = {
  errorState: PropTypes.bool,
  errorMessage: PropTypes.string,
};

renderLongTextInput.defaultProps = {
  errorState: false,
  errorMessage: '',
};

const LongTextField = props => <Field component={renderLongTextInput} {...props} />;

export default LongTextField;
