import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../button';

const COLORS = {
  white: '#ffffff',
  matisse: '#1e62a1',
  frenchPass: '#bfdfff',
  submarine: '#b9c3c8',
  puertoRico: '#4acba4',
  sanMarino: '#3f70b5',
  sunsetOrange: '#ff4949',
};

const NavigationBarStyled = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  ${({ transparent }) => (transparent
    ? 'background-color: transparent;' : `background-color: ${COLORS.matisse};`)}
  color: ${COLORS.white};
  border-radius: 100px;
  margin: 0 30px;
  padding: 10px 20px;
  position: relative;
  z-index: 50;
  &:before,
  &:after {
    content: "";
    display: table;
  }
  &:after {
    clear: both;
  }
`;

const LogoStyled = styled.img`
  width: auto;
  max-width: 100%;
  max-height: 50px;
  margin-right: 15px;
  cursor: pointer;
`;

const InfoSectionPrimaryTextStyled = styled.span`
  font-family: 'Open Sans';
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  color: ${COLORS.white};
`;

const InfoSectionLabelStyled = styled.span`
  font-family: 'Open Sans';
  font-size: 12px;
  font-weight: normal;
  color: ${COLORS.submarine};
`;

const InfoSectionActionLinkStyled = styled.span`
  font-family: 'Open Sans';
  font-size: 12px;
  font-weight: normal;
  color: ${COLORS.puertoRico};
  cursor: pointer;
`;

const InfoSectionStyled = styled.div`
  padding-left: 22px;
  border-left: 1px solid ${COLORS.sanMarino};
`;

const ButtonWrapperStyled = styled.div`
  margin-left: 20px;
  height: 100%;
  margin-left: auto;
`;

const PromoSectionStyled = styled.div`
  background-color: ${COLORS.sunsetOrange};
  color: ${COLORS.white};
  font-family: 'Open Sans';
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
  padding: 11px;
  margin-left: 10px;
  border-radius: 100px;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    left: -7px;
    width: 0px;
    height: 0px;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid ${COLORS.sunsetOrange};
  }
`;

const ButtonFlatStyled = styled(Button)`
  margin-right: 20px;
`;

const NavigationBar = ({
  transparent,
  logoOnClick,
  leftButton,
  rightButton,
  infoSection,
  promoSection,
  ...props
}) => (
  <NavigationBarStyled transparent={transparent} {...props}>
    <div>
      <LogoStyled
        src="data:image/png;base64,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Ogs4usDQlMZDTrNfShpFkjjicOBHAWVLhzbju3OBByW94pPkGcAYM5uU4odpku70dzrBaXEByYGazzMmjp9IGuFCfhVwp5lNTdVXy+O/tNexQ8B7rwysWyDo/Zg3k6Z2jhVa0p4VxZv3+Kc79empqO5xkpZuZbvghzTe8TzgO+ao2ye6aitJN+UY4wZIusz79oWk43OemyjpXzO2TUMl/aZ2wMXV61EZqvufajeCBvTta36gY7EMA9q+rl5L0h0FxriRqdtDL8uhz/MeU/557bkcnlrGr7n+QtJGJe/eJekf3Bh4VM7nGwvMRQlt3rPv4kn2OxG3txLAE1Iuz43W5K0vZN0fH7BXtWbfvWASb/h9i/ruJ/PWL3quUfea20d+7pPR1JzPvZIWmd/kr9eu7E2p8Y+4MeZqwu7f6g30+Pbgpjqrdyu2CbIs5GXfZzFuSRll1VH/HunyeRdChATM5P2/rN9Z75v3nOMuUplQ8+orazNjnB/3bZ8KbDNziWh9ZU+t7se7Bbev0OM+2KVatexHtGe7FzH/DOoavheb2ctC/ju/JzsyV0REL63sXZKW9miquW0W8Dcl7VYzFEUhj4joG6EfJOnfPXvKtMCrfctSNb0r6X5JO0ThjlgQYZ0m8HXGo41Igl02BbYkOXixUkk13SS3nbxAclx2HDDWzD5IC3g8eRURBb3zBL4WUdVF4ikYShKQMpjEktpFEgf+PsnlgfLve7KszhERER2u4lfxTERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERETf4v8Bzup4UCvbC0AAAAAASUVORK5CYII="
        alt=""
        onClick={logoOnClick}
      />
    </div>
    {promoSection && promoSection.text &&
      <PromoSectionStyled>
        {promoSection.text}
      </PromoSectionStyled>
    }
    {infoSection && infoSection.primaryText &&
    <InfoSectionStyled>
      <InfoSectionPrimaryTextStyled>
        {infoSection.primaryText}
      </InfoSectionPrimaryTextStyled>
      <div>
        <InfoSectionLabelStyled>Your current location - </InfoSectionLabelStyled>
        <InfoSectionActionLinkStyled onClick={infoSection.onClick}>
          Change
        </InfoSectionActionLinkStyled>
      </div>
    </InfoSectionStyled>
    }
    <ButtonWrapperStyled>
      {leftButton && leftButton.label &&
      <ButtonFlatStyled
        flat
        label={leftButton.label}
        onClick={leftButton.onClick}
      />}
      <Button
        label={rightButton.label}
        onClick={rightButton.onClick}
      />
    </ButtonWrapperStyled>
  </NavigationBarStyled>
);

NavigationBar.displayName = 'NavigationBar';

NavigationBar.propTypes = {
  transparent: PropTypes.bool,
  logoOnClick: PropTypes.func.isRequired,
  leftButton: PropTypes.shape({
    label: PropTypes.string,
    onClick: PropTypes.func,
  }),
  rightButton: PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }).isRequired,
  infoSection: PropTypes.shape({
    primaryText: PropTypes.string,
    onClick: PropTypes.func,
  }),
  promoSection: PropTypes.shape({
    text: PropTypes.string,
  }),
};

NavigationBar.defaultProps = {
  transparent: false,
  leftButton: {
    label: '',
    onClick: () => {},
  },
  infoSection: {
    primaryText: '',
    onClick: () => {},
  },
  promoSection: {
    text: '',
  },
};

export default NavigationBar;
