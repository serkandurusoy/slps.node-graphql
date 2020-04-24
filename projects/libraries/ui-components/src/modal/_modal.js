/* eslint-disable jsx-a11y/no-static-element-interactions */

// TODO: #263 modal implementation uses portals from react-modal lib, here is styled wrapper for it

import React, { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from '../icon';

const customStyles = {
  overlay: {
    zIndex: 100,
    position: 'fixed',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
};

const ModalStyled = styled(Modal)`
  &.ReactModal__Content {
    outline: none;
    transition: all 400ms ease-in-out;
    opacity: 0;
    top: 20%;
    position: absolute;
    ${({ inLayout }) => (inLayout ? `
      left: calc(50% + 120px);
      @media (max-height: 860px) {
        top: calc(50% + 180px);
      }
    ` : `
      left: 50%;
    `)}
    right: auto;
    bottom: auto;
    margin-right: -50%;
    transform: translate(-50%, -70%);
    border-radius: 50px;
    background-color: #ffffff;
    box-shadow: 0 0 100px 0 rgba(18, 43, 35, 0.1);
    padding: 60px 40px;
    margin-bottom: 100px;
    border: 0;
    max-width: ${({ maxWidth }) => maxWidth || 'auto'};
    box-sizing: border-box;
    z-index: 999;
    &.ReactModal__Content--after-open {
      opacity: 1;
      transform: translate(-50%, -10%);
    }
    &.ReactModal__Content--before-close {
      opacity: 0;
      transform: translate(-50%, -50%);
    }
  }
`;

const CloseButtonStyled = styled.div`
  position: absolute;
  top: 25px;
  right: 25px;
  cursor: pointer;
`;

const TitleStyled = styled.div`
  font-family: 'Montserrat';
  font-size: 32px;
  text-align: center;
  color: #0e345e;
  padding-bottom: 30px;
  margin: 0 auto 30px;
  position: relative;
  max-width: 350px;
  width: 95%;
  &::after {
    content: ' ';
    display: block;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 103px;
    height: 2px;
    background-color: #4acba4;
  }
`;

const SubtitleStyled = styled.div`
  font-family: 'Montserrat';
  color: #0e345e;
  margin-bottom: 30px;
  font-size: 14px;
  text-align: center;
`;

class ModalWindow extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    noCloseButton: PropTypes.bool,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    maxWidth: PropTypes.string,
    inLayout: PropTypes.bool,
    onCloseModal: PropTypes.func,
  }
  static defaultProps = {
    noCloseButton: false,
    title: '',
    subtitle: '',
    maxWidth: '',
    inLayout: false,
    onCloseModal: () => {},
  }
  state = { isModalOpen: this.props.isOpen }
  componentWillReceiveProps(nextProps) {
    this.setState({ isModalOpen: nextProps.isOpen });
  }
  handleCloseModal = () => {
    this.setState({ isModalOpen: false });
    this.props.onCloseModal();
  }
  render() {
    const {
      children, noCloseButton, title, subtitle, maxWidth, inLayout,
    } = this.props;
    return (
      <ModalStyled
        isOpen={this.state.isModalOpen}
        contentLabel="Modal"
        maxWidth={maxWidth}
        closeTimeoutMS={400}
        inLayout={inLayout}
        style={customStyles}
      >
        {
          !noCloseButton
            ? (
              <CloseButtonStyled onClick={this.handleCloseModal}>
                <Icon name="x" color="#0e345e" size={20} />
              </CloseButtonStyled>
            )
            : null
        }
        {title ? <TitleStyled>{title}</TitleStyled> : null}
        {subtitle ? <SubtitleStyled>{subtitle}</SubtitleStyled> : null}
        {children}
      </ModalStyled>
    );
  }
}

export default ModalWindow;
