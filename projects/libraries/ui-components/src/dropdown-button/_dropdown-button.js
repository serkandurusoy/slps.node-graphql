import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Icon from '../icon';

const COLORS = {
  greenyBlue: '#4acba4',
  greyBlue: '#657d95',
  concrete: '#f2f2f2',
  red: '#ff4949',
};

const DropdownWrapperStyled = styled.div`
  width: 100%;
  position: relative;
  box-sizing: border-box;
`;

const DropdownLabelStyled = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 45px;
  border-radius: 100px;
  background-color: ${COLORS.greenyBlue};
  box-shadow: 0 10px 20px 0 rgba(168, 168, 168, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Open Sans';
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  color: #ffffff;
  text-transform: uppercase;
  cursor: pointer;
  user-select: none;
  position: relative;
  z-index: 2;
  ${({ arrow }) => (arrow ? 'padding-left: 50px; padding-right: 50px;' : '')}
  ${({ isOpened }) => (isOpened ? 'background-color: #51dfb4;' : '')}
`;

const DropdownOptionsStyled = styled.ul`
  box-sizing: border-box;
  font-family: 'Open Sans';
  font-size: 16px;
  margin: 0;
  padding: 0;
  list-style-type: none;
  position: absolute;
  width: 100%;
  left: 0;
  top: 10px;
  border-radius: 25px;
  background-color: #ffffff;
  box-shadow: 0 0 100px 0 rgba(18, 43, 35, 0.1);
  padding: 50px 20px 20px;
  border: 8px solid ${COLORS.concrete};
  z-index: 1;
  ${({ isOpened }) => (isOpened ? 'display: block;' : 'display: none;')}
`;

const DropdownOptionStyled = styled.li`
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${COLORS.concrete};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  &:last-child {
    border: 0;
  }
  ${({ active }) => (active ? 'font-weight: bold;' : '')}
`;

const DropdownArrowStyled = styled.div`
  width: 32px;
  height: 32px;
  background: #ffffff;
  position: absolute;
  right: 8px;
  border-radius: 150px;
  box-shadow: 0 10px 20px 0 rgba(18, 43, 35, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ isOpened }) => (isOpened ? `
    > svg {
      transform: rotate(180deg);
    }
  ` : '')}
`;

const ErrorMessageStyled = styled.div`
  font-family: "Open Sans";
  font-size: 12px;
  color: ${COLORS.red};
`;

export class DropdownButtonInput extends React.Component {
  static propTypes = {
    isOpened: PropTypes.bool,
    value: PropTypes.string,
    name: PropTypes.string,
    arrow: PropTypes.bool,
    options: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    errorState: PropTypes.object, // eslint-disable-line
    errorMessage: PropTypes.object, // eslint-disable-line
    reduxForm: PropTypes.object, // eslint-disable-line
  }
  static defaultProps = {
    isOpened: false,
    value: '',
    name: '',
    arrow: true,
  }
  state = {
    isOpened: this.props.isOpened,
    selectedOptionValue: this.props.value,
  }
  getSelectedOptionLabel = (value) => {
    const option = this.props.options.find(o => (o.value === value));
    if (option) return option.label;
    return '';
  }
  toggleButton = () => {
    this.setState(prevState => ({ isOpened: !prevState.isOpened }));
  }
  selectOptionValue = optionValue => this.setState({
    selectedOptionValue: optionValue,
    isOpened: false,
  })
  render() {
    return (
      <DropdownWrapperStyled>
        <DropdownLabelStyled isOpened={this.state.isOpened} onClick={this.toggleButton}>
          <span>{this.getSelectedOptionLabel(this.state.selectedOptionValue)}</span>
          {this.props.arrow
            ? <DropdownArrowStyled isOpened={this.state.isOpened}><Icon name="arrow-down" size={18} color="#4acba4" /></DropdownArrowStyled>
            : null}
        </DropdownLabelStyled>
        <DropdownOptionsStyled isOpened={this.state.isOpened}>
          {this.props.options.map(option => (
            <DropdownOptionStyled
              key={option.value.replace(' ', '').toLowerCase()}
              active={this.state.selectedOptionValue === option.value}
              onClick={() => this.selectOptionValue(option.value)}
            >
              {option.label}
            </DropdownOptionStyled>
          ))}
        </DropdownOptionsStyled>
        <input type="hidden" name={this.props.name} value={this.state.selectedOptionValue} />
        {this.props.errorState && this.props.errorMessage
          && <ErrorMessageStyled>{ this.props.errorMessage }</ErrorMessageStyled>}
      </DropdownWrapperStyled>
    );
  }
}

const renderDropdownInput = ({
  input, // eslint-disable-line react/prop-types
  meta, // eslint-disable-line react/prop-types
  errorState,
  errorMessage,
  ...props
}) => (
  <DropdownButtonInput
    errorState={errorState || !!(meta.touched && meta.error)}
    errorMessage={errorMessage || (meta.touched && meta.error ? meta.error : '')}
    reduxForm={{ input, meta }}
    {...props}
  />
);

renderDropdownInput.propTypes = {
  errorState: PropTypes.bool,
  errorMessage: PropTypes.string,
};

renderDropdownInput.defaultProps = {
  errorState: false,
  errorMessage: '',
};

const DropdownButton = props => <Field component={renderDropdownInput} {...props} />;

export default DropdownButton;
