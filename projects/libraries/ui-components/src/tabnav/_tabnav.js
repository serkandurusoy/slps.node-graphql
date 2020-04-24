import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const COLORS = {
  greyBlue: '#657d95',
  greyBlueLighter: '#c1cbd4',
  greenyBlue: '#4acba4',
};

const borderBottomStyles = `
  &::after {
    content: ' ';
    display: block;
    position: absolute;
    top: 100%;
    bottom: -1px;
    left: 0;
    height: 1px;
    width: 100%;
    background-color: ${COLORS.greyBlueLighter};
    transition: all .3s;
  }
`;

const activeItemStyles = `
  color: ${COLORS.greenyBlue};
  &::after {
    bottom: auto;
    top: -3px;
    background-color: ${COLORS.greenyBlue};
    height: 3px;
  }
`;

const MenuWrapperStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
`;

const ListStyled = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const ListItemStyled = styled.li`
  display: inline-block;
  padding: 15px 3px;
  margin-right: 30px;
  font-family: 'Open Sans';
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${COLORS.greyBlue};
  position: relative;
  cursor: pointer;
  ${borderBottomStyles}
  &:hover {
    ${activeItemStyles}
  }
  ${({ active }) => (active ? activeItemStyles : '')}
`;

const EmptySpaceStyled = styled.div`
  flex: 1;
  padding: 15px 0;
  position: relative;
  ${borderBottomStyles}
`;

const TabNav = ({ items }) => (
  <MenuWrapperStyled>
    <ListStyled>
      {items.map(item => (
        <ListItemStyled
          active={item.active}
          key={item.label.replace(' ', '').toLowerCase()}
          onClick={item.onClick}
        >
          {item.label}
        </ListItemStyled>
      ))}
    </ListStyled>
    <EmptySpaceStyled />
  </MenuWrapperStyled>
);

TabNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    onClick: PropTypes.func,
    active: PropTypes.bool,
  })).isRequired,
};

export default TabNav;
