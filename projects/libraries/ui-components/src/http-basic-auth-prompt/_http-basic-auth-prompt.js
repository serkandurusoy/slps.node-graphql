import React, { Children } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PromptStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #eee;
  font-family: sans-serif;
  font-size: 16px;
  line-height: 1;
`;

const PromptRejectedMsg = styled.div`
  flex: none;
  display: inline-block;
  padding: 12px 20px;
  background-color: #f11;
  font-size: 16px;
  line-height: 1;
  color: #fff;
  border: none;
  border-radius: 4px;
  width: 240px;
`;

const InputStyled = styled.input`
  flex: none;
  display: inline-block;
  padding: 12px 20px;
  background-color: #fff;
  font-size: 16px;
  line-height: 1;
  color: #000;
  border: none;
  border-radius: 4px;
  outline: none,
  width: 240px,
`;

const HttpBasicAuthPrompt = ({
  enabled,
  authenticated,
  rejected,
  loading,
  error,
  makeApiCall,
  children,
}) => (
  (!enabled || authenticated)
    ? Children.only(children)
    : (
      <PromptStyled>
        {
          loading
            ? <PromptRejectedMsg>Trying login...</PromptRejectedMsg>
            : error
              ? <PromptRejectedMsg>An error occured. Try again later.</PromptRejectedMsg>
              : rejected
                ? <PromptRejectedMsg>Wrong password.</PromptRejectedMsg>
                : <InputStyled
                  autoFocus
                  autoComplete="off"
                  type="password"
                  placeholder="Enter password and hit Enter."
                  onKeyPress={e => e.key === 'Enter' && makeApiCall(e.target.value.trim())}
                />
        }
      </PromptStyled>
    )
);

HttpBasicAuthPrompt.displayName = 'HttpBasicAuthPrompt';

HttpBasicAuthPrompt.propTypes = {
  makeApiCall: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  enabled: PropTypes.bool,
  authenticated: PropTypes.bool,
  rejected: PropTypes.bool,
  loading: PropTypes.bool,
  error: PropTypes.bool,
};

HttpBasicAuthPrompt.defaultProps = {
  enabled: false,
  authenticated: false,
  rejected: false,
  loading: false,
  error: false,
};

export default HttpBasicAuthPrompt;
