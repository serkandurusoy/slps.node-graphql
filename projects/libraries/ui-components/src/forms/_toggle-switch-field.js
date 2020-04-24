import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field } from 'redux-form';

const SwitchWrapper = styled.label`
  font-family: "Open Sans";
  display: block;
  margin: 0;
  text-transform: none;
  position: relative;
  display: inline-block;
  width: 96px;
  height: 40px;
  > input[type=checkbox] {
    display: none
  }
  ${({ disabled }) => (disabled ? 'opacity: 0.5' : '')}
`;

const SwitchSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 4px;
  bottom: 0;
  background-color: ${({ checked }) => (checked ? '#4acba4' : '#ff4949')};
  border-radius: 100px;
  transition: 0.4s;
  z-index: 18;
`;

const SwitchToggle = styled.span`
  position: absolute;
  cursor: pointer;
  height: 46px;
  width: 46px;
  left: 0;
  top: -5px;
  border-radius: 100px;
  background-image: radial-gradient(circle at 50% 50%, #f0f0f0, #ffffff);
  box-shadow: 0 10px 20px 0 rgba(18, 43, 35, 0.2);
  border: solid 2px ${({ checked }) => (checked ? '#4acba4' : '#ff4949')};
  background-color: white;
  transition: 0.4s;
  z-index: 20;
  ${({ checked }) => (checked ? 'transform: translateX(46px);' : '')}
`;

const SwitchYes = styled.span`
  position: absolute;
  display: block;
  color: #FFF;
  top: 11px;
  left: 14px;
  font-size: 14px;
  font-family: "Open Sans";
  text-transform: uppercase;
`;

const SwitchNo = styled.span`
  position: absolute;
  color: #FFF;
  top: 11px;
  right: 14px;
  font-size: 14px;
  font-family: "Open Sans";
  text-transform: uppercase;
`;

const SwitchLineToggleWrapper = styled.span`
  position: absolute;
  top: 12px;
  left: 14px;
`;

const SwitchLineToggle = styled.span`
  width: 3px;
  height: 13.1px;
  border: solid 1px #657d95;
  margin-left: 3px;
`;

const SwitchErrorMessage = styled.div`
  font-family: "Open Sans";
  font-size: 12px;
  color: red;
`;

export const ToggleSwitchField = ({
  checked,
  name,
  value,
  disabled,
  onChange,
  errorMessage,
  reduxForm,
}) => {
  const finalValue = !!(value || checked || (reduxForm && reduxForm.input.value));
  const finalOnChange = onChange || (reduxForm && reduxForm.input.onChange) || (() => {});
  return (
    <div>
      <SwitchWrapper disabled={disabled}>
        <input
          type="checkbox"
          name={name}
          disabled={disabled}
          {...reduxForm && reduxForm.input}
          checked={finalValue}
          value={finalValue}
          onChange={() => finalOnChange(!finalValue)}
        />
        <span>
          <SwitchSlider checked={finalValue}>
            {finalValue
              ? <SwitchYes>Yes</SwitchYes>
              : <SwitchNo>No</SwitchNo>}
          </SwitchSlider>
          <SwitchToggle checked={finalValue}>
            <SwitchLineToggleWrapper>
              <SwitchLineToggle />
              <SwitchLineToggle />
              <SwitchLineToggle />
            </SwitchLineToggleWrapper>
          </SwitchToggle>
        </span>
      </SwitchWrapper>
      { errorMessage && <SwitchErrorMessage>{ errorMessage }</SwitchErrorMessage> }
    </div>
  );
};

ToggleSwitchField.displayName = 'ToggleSwitchField';

ToggleSwitchField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string, // eslint-disable-line
  onChange: PropTypes.func, // eslint-disable-line
  disabled: PropTypes.bool,
  checked: PropTypes.bool, // eslint-disable-line
  errorMessage: PropTypes.string,
  reduxForm: PropTypes.object, // eslint-disable-line
  label: PropTypes.string,
};

ToggleSwitchField.defaultProps = {
  name: '',
  disabled: false,
  label: '',
  errorMessage: '',
};


const renderToggleSwitchField = ({
  input, // eslint-disable-line react/prop-types
  meta, // eslint-disable-line react/prop-types
  errorState,
  errorMessage,
  ...props
}) => (
  <ToggleSwitchField
    errorState={errorState || !!(meta.touched && meta.error)}
    errorMessage={errorMessage || (meta.touched && meta.error ? meta.error : '')}
    reduxForm={{ input, meta }}
    {...props}
  />
);

renderToggleSwitchField.propTypes = {
  errorState: PropTypes.bool,
  errorMessage: PropTypes.string,
};

renderToggleSwitchField.defaultProps = {
  errorState: false,
  errorMessage: '',
};

const ToggleSwitch = props => <Field component={renderToggleSwitchField} {...props} />;

export default ToggleSwitch;
