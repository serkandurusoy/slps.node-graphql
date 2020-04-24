import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field } from 'redux-form';
import Select from 'react-select'; // eslint-disable-line
import { selectCommonStyles } from './constants';

const COLORS = {
  lightBlue: '#b9c3c8',
  red: '#ff4949',
  greenyBlue: '#4acba4',
};

const commonMinimalSelectStyles = `
  .Select-control {
    border: 0;
    background-color: transparent;
    color: ${COLORS.greenyBlue};
    .Select-value {
      color: ${COLORS.greenyBlue} !important;
    }
    &:hover {
      box-shadow: none;
    }
  }
  &.is-open {
    > .Select-control {
      background-color: transparent;
    }
    .Select-arrow {
      border-color: ${COLORS.greenyBlue} transparent transparent;
    }
  }
  .Select-clear-zone,
  .Select-placeholder {
    color: ${COLORS.greenyBlue};
  }
  .Select-arrow {
    border-color: ${COLORS.greenyBlue} transparent transparent;
  }
  .Select-menu-outer {
    border-radius: 0;
  }
`;

const commonSelectStyles = `
  ${selectCommonStyles}
  ${({ errorState }) => (errorState ? `
    &.Select .Select-control {
      border: 1px solid ${COLORS.red};
    }
  ` : '')}
`;

const SelectStyled = styled(Select)`
  ${commonSelectStyles}
  ${({ minimal }) => (minimal ? commonMinimalSelectStyles : '')}
`;

const SelectStyledAsync = styled(Select.Async)`
  ${commonSelectStyles}
  ${({ minimal }) => (minimal ? commonMinimalSelectStyles : '')}
`;

const ErrorMessageStyled = styled.div`
  font-family: "Open Sans";
  font-size: 12px;
  color: ${COLORS.red};
`;

const SelectLabelStyled = styled.label`
  display: inline-block;
  margin-bottom: 5px;
  text-transform: uppercase;
  font-family: 'Open Sans';
  font-size: 12px;
  color: ${COLORS.lightBlue};
`;

export class SelectFieldInput extends Component {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }),
    onChange: PropTypes.func,
    errorState: PropTypes.bool,
    errorMessage: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.func, PropTypes.array]).isRequired,
    async: PropTypes.bool,
    style: PropTypes.object, // eslint-disable-line
    reduxForm: PropTypes.object, // eslint-disable-line
    multi: PropTypes.bool,
    autoComplete: PropTypes.bool,
    minimal: PropTypes.bool,
    className: PropTypes.string,
    clearable: PropTypes.bool,
  }
  static defaultProps = {
    name: '',
    value: null,
    onChange: () => {},
    errorState: false,
    errorMessage: '',
    placeholder: 'Select...',
    disabled: false,
    label: '',
    style: {},
    async: false,
    multi: false,
    autoComplete: false,
    minimal: false,
    className: '',
    clearable: false,
  }
  static displayName = 'SelectFieldInput'
  state = {
    value: this.props.value,
  }
  handleSelectChange = (value) => {
    this.setState({ value });
    if (this.props.onChange) this.props.onChange(value);
  }
  render() {
    const {
      name,
      errorState,
      errorMessage,
      placeholder,
      disabled,
      label,
      async,
      options,
      style,
      multi,
      minimal,
      autoComplete,
      reduxForm,
      className,
      clearable,
      ...props
    } = this.props;
    return (
      <div className={className}>
        {label && <SelectLabelStyled>{label}</SelectLabelStyled>}
        {!async
          ? <SelectStyled
            name={name}
            options={options}
            value={this.state.value}
            onChange={this.handleSelectChange}
            placeholder={placeholder}
            disabled={disabled}
            style={style}
            multi={multi}
            minimal={minimal}
            searchable={autoComplete}
            errorState={errorState}
            backspaceToRemoveMessage=""
            simpleValue
            clearable={clearable}
            {...props}
            {...reduxForm && reduxForm.input}
          />
          : <SelectStyledAsync
            name={name}
            loadOptions={options}
            value={this.state.value}
            placeholder={placeholder}
            onChange={this.handleSelectChange}
            disabled={disabled}
            style={style}
            multi={multi}
            minimal={minimal}
            searchable={autoComplete}
            backspaceToRemoveMessage=""
            errorState={errorState}
            simpleValue
            clearable={clearable}
            {...props}
            {...reduxForm && reduxForm.input}
          />}
        {errorState && errorMessage && <ErrorMessageStyled>{ errorMessage }</ErrorMessageStyled>}
      </div>
    );
  }
}

const renderSelectInput = ({
  input, // eslint-disable-line react/prop-types
  meta, // eslint-disable-line react/prop-types
  errorState,
  errorMessage,
  ...props
}) => (
  <SelectFieldInput
    errorState={errorState || !!(meta.touched && meta.error)}
    errorMessage={errorMessage || (meta.touched && meta.error ? meta.error : '')}
    reduxForm={{ input, meta }}
    {...props}
  />
);

renderSelectInput.propTypes = {
  errorState: PropTypes.bool,
  errorMessage: PropTypes.string,
};

renderSelectInput.defaultProps = {
  errorState: false,
  errorMessage: '',
};

const SelectField = props => <Field component={renderSelectInput} {...props} />;

export default SelectField;
