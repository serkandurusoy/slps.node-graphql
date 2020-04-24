import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const COLORS = {
  white: '#ffffff',
  matisse: '#1e62a1',
  funBlue: '#1561a6',
};

const commonWrapperStyled = `
  font-family: 'Open Sans';
  display: inline-block;
  padding: 0 10px;
  min-height: 56px;
  border-radius: 15px;
  @media (min-width: 768px) {
    padding: 0 15px;
    min-height: 95px;
    border-radius: 25px;
  }
  @media (min-width: 1024px) {
    padding: 0 15px;
    min-height: 126px;
    border-radius: 25px;
  }
`;

const WrapperStyled = styled.div`
  display: flex;
  align-items: stretch;
  margin-bottom: 30px;
`;

const WrapperWhiteStyled = styled.div`
  ${commonWrapperStyled}
  position: relative;
  background-color: ${COLORS.white};
  box-shadow: 0 10px 20px 0 rgba(18, 43, 35, 0.05);
  z-index: 2;
  width: 65%;
  @media (min-width: 1600px) {
    width: 75%;
  }
`;

const WrapperBlueStyled = styled.div`
  ${commonWrapperStyled}
  position: relative;
  width: 38%;
  background-image: linear-gradient(105deg, ${COLORS.matisse}, ${COLORS.funBlue});
  margin-left: -50px;
  z-index: 1;
  @media (min-width: 768px) {
    background-image: linear-gradient(105deg, ${COLORS.matisse}, ${COLORS.funBlue});
    margin-left: -50px;
    z-index: 1;
  }
  @media (min-width: 1024px) {
    margin-left: -100px;
  }
  @media (min-width: 1600px) {
    width: 28%;
  }
`;

const InfoListItem = ({ whiteSection, blueSection, ...props }) => (
  <WrapperStyled {...props}>
    <WrapperWhiteStyled>
      {whiteSection}
    </WrapperWhiteStyled>
    <WrapperBlueStyled>
      {blueSection}
    </WrapperBlueStyled>
  </WrapperStyled>
);

InfoListItem.propTypes = {
  whiteSection: PropTypes.element,
  blueSection: PropTypes.element,
};

InfoListItem.defaultProps = {
  whiteSection: null,
  blueSection: null,
};

export default InfoListItem;
