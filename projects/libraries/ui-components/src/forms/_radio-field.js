import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

const COLORS = {
  light: '#ffffff',
  blue: '#657d95',
  gray: '#cdcdcd',
  green: '#4acba4',
};

const stylesCheckedAndHovered = `
  color: ${COLORS.green};
  border: solid 2px ${COLORS.green};
  padding: 10px 30px;
`;

const stylesDisabledAndHovered = `
  color: ${COLORS.gray};
  border: solid 1px ${COLORS.gray};
  padding: 11px 30px;
`;

const RadioStyled = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

const RadioItemStyled = styled.li`
  display: inline-block;
  margin-right: 10px;
  ${({ buttonized }) => (buttonized ? 'position: relative;' : '')}
`;

const InputStyled = styled.input`
  ${({ buttonized }) => (buttonized ? `
    visibility: hidden;
    position: absolute;
    top: 0;
  ` : '')}
`;

const LabelStyled = styled.label`
  ${({ buttonized, checked, disabled }) => (buttonized ? `
    font-family: "Open Sans";
    display: inline-block;
    text-align: center;
    padding: 11px 31px;
    width: auto;
    background-color: ${COLORS.light};
    border: solid 1px ${COLORS.blue};
    color: ${COLORS.blue};
    border-radius: 100px;
    font-size: 14px;
    &:hover {
      ${stylesCheckedAndHovered}
    }
    ${checked ? stylesCheckedAndHovered : ''}
    ${disabled ? `
      ${stylesDisabledAndHovered}
      &:hover {
        ${stylesDisabledAndHovered}
      }
    ` : ''}
  ` : '')}
`;

const ErrorMessageStyled = styled.div`
  font-family: "Open Sans";
  font-size: 12px;
  color: red;
`;

export const RadioFields = ({
  name,
  buttonized,
  onChange,
  options,
  errorState,
  errorMessage,
  reduxForm,
  ...props
}) => (
  <div>
    <RadioStyled
      {...props}
    >
      {options.map(item => (
        <RadioItemStyled key={item.value} buttonized={buttonized}>
          <InputStyled
            id={item.value}
            type="radio"
            name={name}
            value={item.value}
            checked={item.checked || false}
            disabled={item.disabled}
            onChange={() => onChange(item.value, item.checked || false)}
            buttonized={buttonized}
            {...reduxForm && reduxForm.input}
          />
          <LabelStyled
            key={item.value}
            htmlFor={item.value}
            buttonized={buttonized}
            checked={item.checked}
            disabled={item.disabled}
          >
            {item.label}
          </LabelStyled>
        </RadioItemStyled>
      ))}
    </RadioStyled>
    { errorMessage && <ErrorMessageStyled>{ errorMessage }</ErrorMessageStyled> }
  </div>
);

RadioFields.displayName = 'RadioFields';

RadioFields.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  buttonized: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
  })).isRequired,
  errorState: PropTypes.bool,
  errorMessage: PropTypes.string,
  reduxForm: PropTypes.object, // eslint-disable-line
};

RadioFields.defaultProps = {
  buttonized: false,
  errorState: false,
  errorMessage: '',
};

const renderRadioFields = ({
  input, // eslint-disable-line react/prop-types
  meta, // eslint-disable-line react/prop-types
  errorState,
  errorMessage,
  ...props
}) => (
  <RadioFields
    errorState={errorState || !!(meta.touched && meta.error)}
    errorMessage={errorMessage || (meta.touched && meta.error ? meta.error : '')}
    reduxForm={{ input, meta }}
    {...props}
  />
);

renderRadioFields.propTypes = {
  errorState: PropTypes.bool,
  errorMessage: PropTypes.string,
};

renderRadioFields.defaultProps = {
  errorState: false,
  errorMessage: '',
};

const RadioGroup = props => <Field component={renderRadioFields} {...props} />;

export default RadioGroup;
