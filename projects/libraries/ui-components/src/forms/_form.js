import React from 'react';
import {
  reduxForm,
  getFormSyncErrors,
  getFormAsyncErrors,
  getFormSubmitErrors,
  SubmissionError,
  clearSubmitErrors,
} from 'redux-form';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Button from '../button';
import Icon from '../icon';

const ErrorListStyled = styled.ul`
  position: relative;
  background-color: #ff4949;
  color: #ffffff;
  font-family: "Open Sans";
  font-size: 12px;
  font-weight: 300;
  list-style-type: none;
  text-align: left;
  padding: 15px 15px 15px 50px;
  margin-top: 45px;
`;

const ErrorIconStyled = styled(Icon)`
  position: absolute;
  left: 5px;
  top: 10px;
`;

const FormActionsStyled = styled.div`
  margin-top: 50px;
  text-align: center;
  &::after,
  &::before {
    content: "";
    display: table;
  }
  &::after {
    clear: both;
  }
`;

const ErrorIcon = <ErrorIconStyled name="circled-x" color="#ffffff" size={35} />;

const ErrorFields = ({
  displayErrorList, // eslint-disable-line react/prop-types
  allErrors, // eslint-disable-line react/prop-types
  formError, // eslint-disable-line react/prop-types
}) => (
  <div>
    {
      displayErrorList && allErrors && (
        <ErrorListStyled>
          {
            Object.entries(allErrors).map(([field, message]) => (
              <li key={field}>
                {ErrorIcon} {message}
              </li>
            ))
          }
        </ErrorListStyled>
      )
    }
    {
      formError && (
        <ErrorListStyled>
          {
            <li>{ErrorIcon} {formError}</li>
          }
        </ErrorListStyled>
      )
    }
  </div>
);

const SuccessMessage = ({
  successMessage, // eslint-disable-line react/prop-types
}) => <div>{ successMessage }</div>;

const FormBody = ({
  displayErrorList, // eslint-disable-line react/prop-types
  FormFields, // eslint-disable-line react/prop-types
  submitLabel, // eslint-disable-line react/prop-types
  allErrors, // eslint-disable-line react/prop-types
  handleSubmit, // eslint-disable-line react/prop-types
  pristine, // eslint-disable-line react/prop-types
  submitting, // eslint-disable-line react/prop-types
  errors, // eslint-disable-line react/prop-types
  error, // eslint-disable-line react/prop-types
  submitSucceeded, // eslint-disable-line react/prop-types
  successMessage, // eslint-disable-line react/prop-types
  formId, // eslint-disable-line react/prop-types
  customButtons, // eslint-disable-line react/prop-types
  ...props
}) => (
  <form onSubmit={handleSubmit} id={formId} >
    <ErrorFields
      displayErrorList={displayErrorList}
      allErrors={allErrors}
      formError={error}
    />
    <FormFields {...props} allErrors={allErrors} />
    {
      submitSucceeded && successMessage && <SuccessMessage successMessage={successMessage} />
    }
    <FormActionsStyled>
      {
        customButtons && customButtons.length
          ? <div>{customButtons.map(button => button)}</div>
          : (
            <div>
              <Button
                type="submit"
                disabled={submitting}
                label={submitting ? 'Submitting' : submitLabel}
                large
              />
            </div>
          )
      }
    </FormActionsStyled>
  </form>
);

const Form = ({
  displayErrorList,
  formName,
  submitLabel,
  successMessage,
  schema,
  submitHandler,
  successHandler,
  errorHandler,
  formId,
  customButtons,
}) => FormFields => reduxForm({
  form: formName,
  fields: Object.keys(schema.fields),
  asyncValidate: async (values) => {
    clearSubmitErrors(formName);
    try {
      await schema.validate(values, {
        abortEarly: false,
        stripUnknown: true,
      });
      return undefined;
    } catch (errors) {
      return errors.inner.reduce((reduxFormErrors, error) => ({
        ...reduxFormErrors,
        [error.path]: error.message,
      }), {});
    }
  },
  onSubmit: async (values, dispatch, props) => {
    // TODO: #182 can we do this better?
    const trimmedValues = { ...values };
    Object.keys(trimmedValues).forEach((key) => {
      const value = trimmedValues[key];
      if (typeof value === 'string') {
        const newValue = value.trim();
        trimmedValues[key] = newValue;
      }
    });
    clearSubmitErrors(formName);
    const { error, result } = await submitHandler(trimmedValues, dispatch, props);
    if (error) throw new SubmissionError(error);
    return result;
  },
  onSubmitSuccess(result, dispatch, props) {
    successHandler(props.reset, result, dispatch, props);
  },
  onSubmitFail(error, dispatch) {
    const submissionError = error._error; // eslint-disable-line no-underscore-dangle
    if (submissionError) errorHandler(submissionError, dispatch);
  },
})(connect(
  state => ({
    allErrors: {
      ...getFormSyncErrors(formName)(state),
      ...getFormAsyncErrors(formName)(state),
      ...getFormSubmitErrors(formName)(state),
    },
  }),
  null,
)(props => (
  <FormBody
    displayErrorList={displayErrorList}
    submitLabel={submitLabel}
    successMessage={successMessage}
    FormFields={FormFields}
    formId={formId}
    customButtons={customButtons}
    {...props}
  />
)));

export default Form;
