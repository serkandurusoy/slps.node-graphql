import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field } from 'redux-form';

const COLORS = {
  lightGray: '#f7f7f7',
  lightBlue: '#b9c3c8',
  blue: '#657d95',
  darkGray: '#0e345e',
  red: '#ff4949',
  white: '#ffffff',
};

const commonFlexBoxProperties = `
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const commonErrorStyles = `
  border-color: ${COLORS.red};
  color: ${COLORS.red};
  + div {
    border-color: ${COLORS.red};
    > div > svg path {
      fill: ${COLORS.red} !important;
    }
  }
  &:focus {
    border-color: ${COLORS.red};
    + div {
      border-color: ${COLORS.red};
      > div > svg path {
        fill: ${COLORS.red} !important;
      }
    }
  }
  &:hover {
    border-color: ${COLORS.red};
    + div {
      border-color: ${COLORS.red};
      > div > svg path {
        fill: ${COLORS.red} !important;
      }
    }
  }
`;

const InputParentStyled = styled.div`
  margin-bottom: 20px;
`;

const InputGroupStyled = styled.div`
  ${({ icon, iconPosition }) => (icon && iconPosition ? `
    position: relative;
    display: flex;
    width: 100%;
  ` : 'margin: 15px 0;')}
`;

const InputLabelStyled = styled.label`
  ${({ label }) => (label ? `
    display: block;
    margin-bottom: 5px;
    text-transform: uppercase;
    font-family: 'Open Sans';
    font-size: 12px;
    color: ${COLORS.lightBlue};
  ` : '')}
`;

const InputGroupAddonStyled = styled.div`
  ${commonFlexBoxProperties}
  color: ${COLORS.darkGray};
  text-align: center;
  background-color: ${COLORS.lightGray};
  box-sizing: border-box;
  width: 47px;
  height: 40px;
  border-radius: 100px;
  white-space: nowrap;
  vertical-align: middle;
  border: solid 1px rgba(101, 125, 149, 0.2);
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  border-right-width: 0;
  order: 1;
  ${({ errorState }) => (errorState ? commonErrorStyles : '')}
`;

const InputGroupAddonInnerStyled = styled.div`
  text-align: center;
  padding-left: 3px;
  position: relative;
  ${({ errorState }) => (errorState ? commonErrorStyles : '')}
  &:after {
    content: '';
    display: block;
    width: 1px;
    height: 18px;
    background-color: rgba(101, 125, 149, 0.2);
    position: absolute;
    right: 0;
    top: 9px;
  }
`;

const InputErrorMessage = styled.div`
  font-family: 'Open Sans';
  font-size: 12px;
  color: red;
`;

const InputStyled = styled.input`
  display: block;
  width: 100%;
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
  background-clip: padding-box;
  transition: border-color ease-in-out .15s;
  outline: none;
  order: 2;
  ${({ icon, iconPosition }) => (icon && iconPosition ? `
    ${commonFlexBoxProperties}
    justify-content: center;
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
    border-left: 0;
  ` : '')}
  &:focus {
    border-color: #2854A2;
    + div {
      border-color: #2854A2;
      > div > svg path {
        fill: #2854A2 !important;
      }
    }
  }
  &:hover {
    border-color: #AEB8C7;
    + div {
      border-color: #AEB8C7;
    }
  }
  ${({ errorState }) => (errorState ? commonErrorStyles : '')}
`;

export const TextFieldInput = ({
  onChange,
  value,
  name,
  type,
  icon,
  iconPosition,
  button,
  buttonPosition,
  errorState,
  errorMessage,
  placeHolder,
  disabled,
  label,
  reduxForm,
  className,
}) => (
  <InputParentStyled className={className}>
    {
      label && (
        <InputLabelStyled label={label} htmlFor={name}>
          {label}
        </InputLabelStyled>
      )
    }
    <InputGroupStyled icon={icon} iconPosition={iconPosition}>
      <InputStyled
        type={type}
        name={name}
        value={value}
        placeholder={placeHolder}
        disabled={disabled}
        onChange={event => onChange(event.target.value)}
        icon={icon}
        iconPosition={iconPosition}
        errorState={errorState}
        {...reduxForm && reduxForm.input}
      />
      {icon && iconPosition === 'left' &&
      <InputGroupAddonStyled errorState={errorState}>
        <InputGroupAddonInnerStyled errorState={errorState}>
          {icon}
        </InputGroupAddonInnerStyled>
      </InputGroupAddonStyled>}
      {button && buttonPosition === 'left' && <button>Click Me</button>}
    </InputGroupStyled>
    { errorMessage && <InputErrorMessage>{ errorMessage }</InputErrorMessage> }
  </InputParentStyled>
);

TextFieldInput.displayName = 'TextFieldInput';

TextFieldInput.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.oneOf(['text', 'password', 'email']),
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  button: PropTypes.node,
  buttonPosition: PropTypes.oneOf(['left', 'right']),
  errorState: PropTypes.bool,
  errorMessage: PropTypes.string,
  placeHolder: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  className: PropTypes.string,
  reduxForm: PropTypes.object, // eslint-disable-line
};

TextFieldInput.defaultProps = {
  name: '',
  value: '',
  onChange: () => {},
  type: 'text',
  icon: null,
  iconPosition: 'left',
  button: null,
  buttonPosition: 'left',
  errorState: false,
  errorMessage: '',
  placeHolder: '',
  disabled: false,
  label: '',
  className: '',
};

const renderTextInput = ({
  input, // eslint-disable-line react/prop-types
  meta, // eslint-disable-line react/prop-types
  errorState,
  errorMessage,
  ...props
}) => (
  <TextFieldInput
    errorState={errorState || !!(meta.touched && meta.error)}
    errorMessage={errorMessage || (meta.touched && meta.error ? meta.error : '')}
    reduxForm={{ input, meta }}
    {...props}
  />
);

renderTextInput.propTypes = {
  errorState: PropTypes.bool,
  errorMessage: PropTypes.string,
};

renderTextInput.defaultProps = {
  errorState: false,
  errorMessage: '',
};

const TextField = props => <Field component={renderTextInput} {...props} />;

export default TextField;
