import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field } from 'redux-form';
import Icon from '../icon';

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

const CheckboxStyled = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

const CheckboxItemStyled = styled.li`
  display: inline-block;
  margin-right: 10px;
  ${({ buttonized }) => (buttonized ? 'position: relative;' : '')}
`;

const InputStyled = styled.input`
  visibility: hidden;
  position: absolute;
  top: 0;
`;

const LabelStyled = styled.label`
  display: inline-block;
  position: relative;
  ${({ buttonized, checked, disabled }) => (buttonized ? `
    font-family: "Open Sans";
    text-align: center;
    padding: 11px 31px;
    width: auto;
    background-color: ${COLORS.light};
    border: solid 1px ${COLORS.blue};
    color: ${COLORS.blue};
    border-radius: 100px;
    font-size: 14px;
    cursor: pointer;
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

const StandardCheckboxStyled = styled.div`
  position: relative;
  cursor: pointer;
  width: 16px;
  height: 16px;
  border-radius: 3px;
  background-color: #f7f7f7;
  border: solid 1px rgba(101, 125, 149, 0.2);
  display: inline-block;
  margin-right: 5px;
  vertical-align: middle;
  margin-top: -3px;
  ${({ checked }) => (checked ? `
    border: solid 1px ${COLORS.green};
  ` : '')}
`;

const StandardCheckboxIconStyled = styled(Icon)`
  top: -4px;
  left: 1px;
  position: absolute;
`;

const ErrorMessageStyled = styled.div`
  font-family: "Open Sans";
  font-size: 12px;
  color: red;
`;

export const CheckboxFields = ({
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
    <CheckboxStyled
      {...props}
    >
      {options.map(item => (
        <CheckboxItemStyled key={item.value} buttonized={buttonized}>
          <LabelStyled
            key={item.value}
            htmlFor={item.value}
            buttonized={buttonized}
            checked={item.checked}
            disabled={item.disabled}
            onClick={() => onChange(item.value, item.checked || false)}
          >
            <InputStyled
              id={item.value}
              type="checkbox"
              name={name}
              value={item.value}
              checked={item.checked || false}
              disabled={item.disabled}
              onChange={() => onChange(item.value, item.checked || false)}
              buttonized={buttonized}
              {...reduxForm && reduxForm.input}
            />
            {
              !buttonized
                ? (
                  <StandardCheckboxStyled checked={item.checked || false}>
                    {
                      item.checked
                        ? <StandardCheckboxIconStyled name="ok" size={21} color="#4acba4" />
                        : null
                    }
                  </StandardCheckboxStyled>
                ) : null
            }
            {item.label}
          </LabelStyled>
        </CheckboxItemStyled>
      ))}
    </CheckboxStyled>
    { errorMessage && <ErrorMessageStyled>{ errorMessage }</ErrorMessageStyled> }
  </div>
);

CheckboxFields.displayName = 'CheckboxFields';

CheckboxFields.propTypes = {
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

CheckboxFields.defaultProps = {
  buttonized: false,
  errorState: false,
  errorMessage: '',
};

export const CheckboxField = ({
  name,
  buttonized,
  onChange,
  checked,
  disabled,
  value,
  label,
  errorState,
  errorMessage,
  reduxForm,
  ...props
}) => (
  <div>
    <CheckboxStyled
      {...props}
    >
      <CheckboxItemStyled key={value} buttonized={buttonized}>
        <LabelStyled
          key={value}
          htmlFor={value}
          buttonized={buttonized}
          checked={checked}
          disabled={disabled}
          onClick={() => onChange(value, checked || false)}
        >
          <InputStyled
            id={value}
            type="checkbox"
            name={name}
            value={value}
            checked={checked || false}
            disabled={disabled}
            onChange={() => onChange(value, checked || false)}
            buttonized={buttonized}
            {...reduxForm && reduxForm.input}
          />
          {
            !buttonized
              ? (
                <StandardCheckboxStyled checked={checked}>
                  {
                    checked
                      ? <StandardCheckboxIconStyled name="ok" size={21} color="#4acba4" />
                      : null
                  }
                </StandardCheckboxStyled>
              ) : null
          }
          {label}
        </LabelStyled>
      </CheckboxItemStyled>
    </CheckboxStyled>
    { errorMessage && <ErrorMessageStyled>{ errorMessage }</ErrorMessageStyled> }
  </div>
);

CheckboxField.displayName = 'CheckboxField';

CheckboxField.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  buttonized: PropTypes.bool,
  value: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  errorState: PropTypes.bool,
  errorMessage: PropTypes.string,
  reduxForm: PropTypes.object, // eslint-disable-line
};

CheckboxField.defaultProps = {
  buttonized: false,
  checked: false,
  disabled: false,
  errorState: false,
  errorMessage: '',
  name: '',
  value: '',
  label: '',
};

const renderCheckboxFields = ({
  input, // eslint-disable-line react/prop-types
  meta, // eslint-disable-line react/prop-types
  errorState,
  errorMessage,
  ...props
}) => (
  <CheckboxFields
    errorState={errorState || !!(meta.touched && meta.error)}
    errorMessage={errorMessage || (meta.touched && meta.error ? meta.error : '')}
    reduxForm={{ input, meta }}
    {...props}
  />
);

renderCheckboxFields.propTypes = {
  errorState: PropTypes.bool,
  errorMessage: PropTypes.string,
};

renderCheckboxFields.defaultProps = {
  errorState: false,
  errorMessage: '',
};

export const CheckboxGroup = props => <Field component={renderCheckboxFields} {...props} />;

const renderCheckboxField = ({
  input, // eslint-disable-line react/prop-types
  meta, // eslint-disable-line react/prop-types
  errorState,
  errorMessage,
  ...props
}) => (
  <CheckboxField
    errorState={errorState || !!(meta.touched && meta.error)}
    errorMessage={errorMessage || (meta.touched && meta.error ? meta.error : '')}
    reduxForm={{ input, meta }}
    {...props}
  />
);

renderCheckboxField.propTypes = {
  errorState: PropTypes.bool,
  errorMessage: PropTypes.string,
};

renderCheckboxField.defaultProps = {
  errorState: false,
  errorMessage: '',
};
export const Checkbox = props => <Field component={renderCheckboxField} {...props} />;
