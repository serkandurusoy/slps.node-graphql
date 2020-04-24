import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field } from 'redux-form';
import Icon from '../icon';

const COLORS = {
  lightGray: '#f7f7f7',
  lightBlue: '#b9c3c8',
  blue: '#657d95',
  darkGray: '#464a4c',
  red: '#ff4949',
};

const commonFlexBoxProperties = `
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const commonErrorStyles = `
  border-color: ${COLORS.red};
  color: ${COLORS.red};
  &:focus {
    border-color: ${COLORS.red};
    + div {
      border-color: ${COLORS.red};
    }
  }
  &:hover {
    border-color: ${COLORS.red};
    + div {
      border-color: ${COLORS.red};
    }
  }
`;

const InputParentStyled = styled.div`
  width: 500px;
  box-sizing: border-box;
`;

const InputGroupStyled = styled.div`
  position: relative;
  display: flex;
  width: 100%;
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
  border: solid 1px rgba(101, 125, 149, 0.2);
  border-radius: 100px;
  white-space: nowrap;
  vertical-align: middle;
  ${({ right }) => (right ? `
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
    border-left: 0;
    padding: 10px 15px 10px 0;
  ` : `
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
    border-right: 0;
    padding: 10px 0 10px 15px;
  `)}
  ${({ errorState }) => (errorState ? commonErrorStyles : '')}
`;

const InputGroupAddonInnerStyled = styled.div`
  ${({ right }) => (right ? `
    border-left: 1px solid #d4d4d4;
    padding: 3px 0 3px 15px;
  ` : `
    border-right: 1px solid #d4d4d4;
    padding: 3px 15px 3px 0;
  `)}
  ${({ errorState }) => (errorState ? commonErrorStyles : '')}
`;

const InputErrorMessage = styled.div`
  font-family: 'Open Sans';
  font-size: 12px;
  color: red;
`;

const InputStyled = styled.input`
  display: block;
  width: 100%;
  background-color: ${COLORS.lightGray};
  border: solid 1px rgba(101, 125, 149, 0.2);
  border-radius: 25px;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  border-right: 0;
  padding: 10px 20px;
  font-family: 'Open Sans';
  font-size: 14px;
  color: ${COLORS.blue};
  background-clip: padding-box;
  transition: border-color ease-in-out .15s;
  outline: none;
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

export class NumberFieldInput extends Component {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.number,
    onChange: PropTypes.func,
    icon: PropTypes.node,
    iconPosition: PropTypes.oneOf(['left', 'right']),
    button: PropTypes.node,
    buttonPosition: PropTypes.oneOf(['left', 'right']),
    errorState: PropTypes.bool,
    errorMessage: PropTypes.string,
    placeHolder: PropTypes.string,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    max: PropTypes.number,
    min: PropTypes.number,
    step: PropTypes.number,
    precision: PropTypes.number,
    reduxForm: PropTypes.object, // eslint-disable-line
  }
  static defaultProps = {
    name: '',
    value: 0,
    onChange: () => {},
    icon: null,
    iconPosition: 'left',
    button: null,
    buttonPosition: 'left',
    errorState: false,
    errorMessage: '',
    placeHolder: '',
    disabled: false,
    label: '',
    max: 9007199254740991,
    min: -9007199254740991,
    step: 1,
    precision: 2,
  }
  static displayName = 'NumberFieldInput'
  state = {
    inputValue: this.props.value,
  }
  handlePlus = () => {
    if (this.props.disabled) return;
    let val = parseFloat(this.state.inputValue);
    if (Number.isNaN(val)) val = 0;
    if (val < this.props.max) {
      const value = parseFloat((val + this.props.step).toFixed(this.props.precision));
      this.setState({
        inputValue: value,
      });
      this.props.onChange(value);
    }
  }
  handleMinus = () => {
    if (this.props.disabled) return;
    let val = parseFloat(this.state.inputValue);
    if (Number.isNaN(val)) val = 0;
    if (val > this.props.min) {
      const value = parseFloat((val - this.props.step).toFixed(this.props.precision));
      this.setState({
        inputValue: value,
      });
      this.props.onChange(value);
    }
  }
  handleOnChange = (e) => {
    let val = e.currentTarget.value;
    const { min, max } = this.props;
    if (val.indexOf(',') !== -1) val = val.replace(',', '.');
    if (val.length > 1 && val.indexOf('.') !== val.length - 1) val = parseFloat(val);
    if (Number.isNaN(val) && val !== '-') {
      return;
    }
    if (val === '-' && min >= 0) {
      return;
    }
    if ((val === '-') || val === '.' || val === ',' || (val >= min && val <= max)) {
      this.setState({
        inputValue: val,
      });
      this.props.onChange(e);
    }
  }
  handleOnBlur = (e) => {
    const { value } = e.currentTarget;
    if (value) {
      this.setState({
        inputValue: parseFloat(value),
      });
    }
  }
  render() {
    const {
      name,
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
    } = this.props;
    return (
      <InputParentStyled>
        {
          label && (
            <InputLabelStyled label={label} htmlFor={name}>
              {label}
            </InputLabelStyled>
          )
        }
        <InputGroupStyled iconPosition={iconPosition}>
          {icon && iconPosition === 'left' &&
          <InputGroupAddonStyled errorState={errorState}>
            <InputGroupAddonInnerStyled errorState={errorState}>
              {icon}
            </InputGroupAddonInnerStyled>
          </InputGroupAddonStyled>}
          <InputStyled
            type="text"
            name={name}
            value={this.state.inputValue}
            placeholder={placeHolder}
            disabled={disabled}
            onChange={event => this.handleOnChange(event)}
            onBlur={event => this.handleOnBlur(event)}
            icon={icon}
            iconPosition={iconPosition}
            errorState={errorState}
            {...reduxForm && reduxForm.input}
          />
          <InputGroupAddonStyled right errorState={errorState}>
            <InputGroupAddonInnerStyled right errorState={errorState}>
              <Icon
                name="arrow-left"
                size={{ width: 15, height: 15 }}
                color="#000000"
                style={{ marginRight: '5px', cursor: 'pointer', userSelect: 'none' }}
                onClick={this.handleMinus}
              />
              <Icon
                name="arrow-right"
                size={{ width: 15, height: 15 }}
                color="#000000"
                style={{ marginLeft: '5px', cursor: 'pointer', userSelect: 'none' }}
                onClick={this.handlePlus}
              />
            </InputGroupAddonInnerStyled>
          </InputGroupAddonStyled>
          {button && buttonPosition === 'left' && button}
        </InputGroupStyled>
        { errorMessage && <InputErrorMessage>{ errorMessage }</InputErrorMessage> }
      </InputParentStyled>
    );
  }
}

const renderNumberInput = ({
  input, // eslint-disable-line react/prop-types
  meta, // eslint-disable-line react/prop-types
  errorState,
  errorMessage,
  ...props
}) => (
  <NumberFieldInput
    errorState={errorState || !!(meta.touched && meta.error)}
    errorMessage={errorMessage || (meta.touched && meta.error ? meta.error : '')}
    reduxForm={{ input, meta }}
    {...props}
  />
);

renderNumberInput.propTypes = {
  errorState: PropTypes.bool,
  errorMessage: PropTypes.string,
};

renderNumberInput.defaultProps = {
  errorState: false,
  errorMessage: '',
};

const NumberField = props => <Field component={renderNumberInput} {...props} />;

export default NumberField;
