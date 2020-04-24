import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from '../icon';
import circlesFooter from './_images/Circles-footer-left_half@1x.png';

const COLORS = {
  white: '#ffffff',
  puertoRico: '#4acba4',
  chambray: '#334f94',
  congressBlue: '#003c7e',
  toreaBay: '#0f4684',
  submarine: '#b9c3c8',
};

const menuItemActive = `
  background-color: ${COLORS.chambray};
  box-shadow: 0 10px 20px 0 ${COLORS.congressBlue};
  font-weight: 600;
  color: ${COLORS.white};
`;

const menuSubitemActive = `
  font-weight: 600;
  color: ${COLORS.white};
`;

const WrapperStyled = styled.div`
  height: 100%;
  width: 246px;
  max-width: 100%;
  padding: 163px 30px;
  box-sizing: border-box;
  position: relative;
  z-index: 20;
  background: ${COLORS.toreaBay} url(${circlesFooter}) bottom right no-repeat;
  & * {
    box-sizing: border-box;
  }
`;

const MenuItemWrapperStyled = styled.div`
  margin-bottom: 40px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const MenuItemStyled = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 190px;
  border-radius: 100px;
  padding: 16px 21px;
  font-family: 'Open Sans';
  font-size: 14px;
  text-align: left;
  color: ${COLORS.submarine};
  cursor: pointer;
  user-select: none;
  text-transform: uppercase;
  ${({ active }) => (active ? menuItemActive : '')}
  &:hover {
    ${menuItemActive};
  }
`;

const MenuSubitemWrapperStyled = styled.div`
  margin-top: 10px;
  margin-left: 20px;
`;

const MenuSubitemStyled = styled.div`
  position: relative;
  font-family: 'Open Sans';
  font-size: 13px;
  text-align: left;
  color: ${COLORS.submarine};
  cursor: pointer;
  text-transform: uppercase;
  padding-left: 23px;
  margin-bottom: 24px;
  ${({ active }) => (active ? menuSubitemActive : '')}
  &:hover {
    ${menuSubitemActive};
  }
  &::before {
    content: '';
    width: 15px;
    height: 0;
    border-bottom: 1px dashed ${COLORS.puertoRico};
    display: block;
    position: absolute;
    left: 0;
    top: 50%;
  }
  &::after {
    content: '';
    content: '';
    position: absolute;
    left: -2px;
    top: -30px;
    display: block;
    width: 0;
    height: 40px;
    border-right: 1px dashed ${COLORS.puertoRico};
  }
  &:first-child {
    margin-top: 30px;
    &::after {
      top: -20px;
      height: 30px;
    }
  }
  &:last-child {
    margin-bottom: 0;
  }
`;

const IconStyled = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  background-color: ${COLORS.puertoRico};
  width: 48px;
  height: 48px;
  border-radius: 100px;
  margin-right: 8px;
`;

const menuItemKey = label => label.replace(' ', '').toLowerCase();

const SideNavigationBar = ({ options, ...props }) => {
  const iconComponent = (iconElem) => {
    if (typeof iconElem === 'string') {
      return (
        <IconStyled>
          <Icon name={iconElem} color={COLORS.white} size={28} />
        </IconStyled>
      );
    }
    return iconElem;
  };
  return (
    <WrapperStyled {...props}>
      {options.map(({
        active, icon, onClick, label, subOptions,
      }) => (
        <MenuItemWrapperStyled key={menuItemKey(label)}>
          <MenuItemStyled
            active={active}
            onClick={onClick}
          >
            {icon && iconComponent(icon)} {label}
          </MenuItemStyled>
          {
            subOptions && subOptions.length && active && (
              <MenuSubitemWrapperStyled>
                {subOptions.map(suboption => (
                  <MenuSubitemStyled
                    active={suboption.active}
                    key={menuItemKey(suboption.label)}
                    onClick={suboption.onClick}
                  >
                    {suboption.label}
                  </MenuSubitemStyled>
                ))}
              </MenuSubitemWrapperStyled>
            )
          }
        </MenuItemWrapperStyled>
      ))}
    </WrapperStyled>
  );
};

SideNavigationBar.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    onClick: PropTypes.func,
    icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    active: PropTypes.bool,
    subOptions: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      onClick: PropTypes.func,
      active: PropTypes.bool,
    })),
  })).isRequired,
};

export default SideNavigationBar;
