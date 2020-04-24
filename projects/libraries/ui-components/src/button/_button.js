import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const COLORS = {
  white: '#ffffff',
  silver: '#ccc',
  gallery: '#eee',
  lynch: '#657d95',
  sunsetOrange: '#ff4949',
  scarlet: '#ff1616',
  puertoRico: '#4acba4',
  jungleGreen: '#32b08a',
  matisse: '#1e62a1',
  funBlue: '#1561a6',
};

const buttonCommonStyles = `
  cursor: pointer;
  font-family: Open Sans;
  outline: none;
`;

const buttonDisabledStyled = `
  cursor: none;
  color: ${COLORS.gallery};
  background-color: ${COLORS.silver};
  pointer-events: none;
  &:hover {
    cursor: none;
    color: ${COLORS.gallery};
    background-color: ${COLORS.silver};
  }
`;

const buttonSecondaryStyled = `
  background-color: transparent;
  border: solid 1px ${COLORS.lynch};
  color: ${COLORS.lynch};
  border-radius: 100px;
  padding: 10px 20px;
  font-size: 14px;
  text-transform: uppercase;
  &:hover {
    background-color: ${COLORS.lynch};
    color: ${COLORS.white};
  }
`;

const buttonDangerStyled = `
  background-color: ${COLORS.sunsetOrange};
  border: none;
  border-radius: 100px;
  box-shadow: 0 10px 20px 0 rgba(18, 43, 35, 0.1);
  color: ${COLORS.white};
  font-size: 14px;
  font-weight: 600;
  padding: 12px 20px;
  text-transform: uppercase;
  &:hover {
    background-color: ${COLORS.scarlet};
  }
`;

const buttonMinimalStyled = disabled => `
  background-color: transparent;
  border: none;
  border-radius: 0;
  box-shadow: none;
  color: ${disabled ? COLORS.gallery : COLORS.puertoRico};
  font-size: 12;
  text-transform: none;
  padding: 12px 20px;
  font-weight: 400;
  outline: none;
  &:hover {
    background-color: transparent;
  }
`;

const ButtonStyled = styled.button`
  ${buttonCommonStyles}
  background-color: ${COLORS.puertoRico};
  border: none;
  border-radius: 100px;
  box-shadow: 0 10px 20px 0 rgba(18, 43, 35, 0.1);
  color: ${COLORS.white};
  font-size: 14px;
  font-weight: 600;
  padding: 12px 20px;
  text-transform: uppercase;
  &:hover {
    background-color: ${COLORS.jungleGreen};
  }
  ${({ disabled }) => (disabled ? buttonDisabledStyled : '')}
  ${({ secondary }) => (secondary ? buttonSecondaryStyled : '')}
  ${({ danger }) => (danger ? buttonDangerStyled : '')}
  ${({ iconComponent }) => (iconComponent ? `
    box-shadow: 0 10px 20px 0 rgba(18, 43, 35, 0.05);
    padding: 10px;
  ` : '')}
  ${({ minimal, disabled }) => (minimal ? buttonMinimalStyled(disabled) : '')}
  ${({ fullWidth }) => (fullWidth ? 'width: 100%;' : '')}
  ${({ large }) => (large ? `
    font-size: 18px;
    padding: 18px 40px;
    min-width: 220px;
  ` : '')}
  ${({ tiny }) => (tiny ? `
    padding: 5px;
    > svg {
      width: 15px !important;
      height: 15px !important;
    }
  ` : '')}
`;

const ButtonFlatStyled = styled.button`
  ${buttonCommonStyles}
  background-color: transparent;
  border: none;
  border-bottom: 2px transparent solid;
  border-top: 2px transparent solid;
  color: ${COLORS.white};
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  padding: 10px 0;
  letter-spacing: 0.9;
  outline: none;
  text-transform: uppercase;
  &:hover {
    border-bottom: 2px ${COLORS.puertoRico} solid;
  }
  ${({ disabled }) => (disabled ? buttonDisabledStyled : '')}
`;

const ButtonLabelStyled = styled.span`
  ${({ iconComponent }) => (iconComponent ? `
    line-height: 1;
    margin-left: 10px;
    margin-right: 10px;
  ` : '')}
  ${({ fullWidth, iconComponent, iconPosition }) => (!fullWidth && iconComponent ? `
    line-height: 1;
    margin-left: 10px;
    margin-right: 10px;
    ${iconPosition === 'left' ? `
      float: right;
      margin-left: 10px;
      margin-right: 10px;
    ` : ''}
    ${iconPosition === 'right' ? `
      float: left;
      margin-left: 10px;
      margin-right: 10px;
    ` : ''}
  ` : '')}
  ${({ large, iconComponent }) => (large && iconComponent ? `
    line-height: 1;
  ` : '')}
  ${({ minimal, iconComponent }) => (minimal && iconComponent ? `
    float: left;
  ` : '')}
`;

const iconStyles = {
  button: {
    Icon: {
      style: {
        display: 'block',
        width: 14,
        height: 14,
      },
    },
    span: {
      lineHeight: 1,
      marginLeft: 10,
      marginRight: 10,
    },
  },
  buttonDefault: {
    Icon: {
      color: '#fff',
    },
  },
  buttonSecondary: {
    Icon: {
      color: '#657d95',
    },
  },
  buttonDanger: {
    Icon: {
      color: '#fff',
    },
  },
  buttonIcon: {
    base: {
      Icon: {
        style: {
          width: 20,
          height: 20,
        },
      },
    },
    left: {
      Icon: {
        style: {
          float: 'left',
        },
      },
      span: {
        float: 'right',
        marginLeft: 14,
        marginRight: 10,
      },
    },
    right: {
      Icon: {
        style: {
          float: 'right',
          marginRight: 0,
        },
      },
      span: {
        float: 'left',
        marginRight: 10,
      },
    },
  },
  buttonLarge: {
    Icon: {
      style: {
        width: 18,
        height: 18,
      },
    },
    IconNoLabel: {
      style: {
        width: 36,
        height: 36,
      },
    },
    span: {
      lineHeight: 1,
    },
  },
  buttonMinimal: {
    Icon: {
      style: {
        width: 13,
        height: 13,
        marginTop: 0,
      },
      color: '#4acba4',
    },
    span: {
      float: 'left',
      marginLeft: 5,
    },
  },
  buttonFullWidth: {
    right: {
      Icon: {
        style: {
          width: 16,
          height: 16,
          marginRight: 15,
          marginTop: 2,
        },
      },
    },
    left: {
      Icon: {
        style: {
          width: 16,
          height: 16,
          marginLeft: 15,
          marginTop: 2,
        },
      },
    },
  },
  buttonDisabled: {
    Icon: {
      color: '#eee',
    },
  },
};

class Button extends Component {
  static displayName = 'Button'
  static propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    secondary: PropTypes.bool,
    danger: PropTypes.bool,
    flat: PropTypes.bool,
    large: PropTypes.bool,
    fullWidth: PropTypes.bool,
    minimal: PropTypes.bool,
    iconPosition: PropTypes.oneOf(['left', 'right']),
    disabled: PropTypes.bool,
    style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    onClick: PropTypes.func,
    icon: PropTypes.node,
    tiny: PropTypes.bool,
  }
  static defaultProps = {
    type: 'button',
    label: '',
    secondary: false,
    danger: false,
    flat: false,
    large: false,
    fullWidth: false,
    minimal: false,
    iconPosition: 'left',
    disabled: false,
    style: {},
    onClick: () => {},
    icon: null,
    tiny: false,
  }
  state = {
    buttonHovered: false,
  }
  iconComponent = () => (this.props.icon && this.props.icon.props && this.props.icon.props.name);
  flatOnly = () => (this.props.flat && Object.keys(this.props.style).length === 0);
  handleMouseEnter = () => {
    this.setState({ buttonHovered: true });
  };
  handleMouseLeave = () => {
    this.setState({ buttonHovered: false });
  };
  render() {
    const {
      type,
      icon,
      label,
      secondary,
      danger,
      large,
      fullWidth,
      minimal,
      disabled,
      style,
      iconPosition,
      onClick,
      tiny,
      ...props
    } = this.props;
    return (
      this.flatOnly()
        ? (
          <ButtonFlatStyled
            type={type}
            disabled={disabled}
            onClick={onClick}
            style={style}
            {...props}
          >
            <span>{label}</span>
          </ButtonFlatStyled>
        ) : (
          <ButtonStyled
            type={type}
            onClick={onClick}
            style={style}
            secondary={secondary}
            danger={danger}
            iconComponent={this.iconComponent()}
            minimal={minimal}
            fullWidth={fullWidth}
            large={large}
            tiny={tiny}
            disabled={disabled}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            {...props}
          >
            {this.iconComponent() && React.cloneElement(icon, {
              style: {
                ...iconStyles.button.Icon.style,
                ...(secondary && iconStyles.buttonSecondary.Icon.style),
                ...(danger && iconStyles.buttonDanger.Icon.style),
                ...(!label && iconStyles.buttonIcon.base.Icon.style),
                ...(iconStyles.buttonIcon[iconPosition].Icon.style),
                ...(fullWidth && iconStyles.buttonFullWidth[iconPosition].Icon.style),
                ...(minimal && iconStyles.buttonMinimal.Icon.style),
                ...(large && { ...iconStyles.buttonLarge.IconNoLabel.style, ...(label && label !== '' && iconStyles.buttonLarge.Icon.style) }),
              },
              color: [
                COLORS.white,
                secondary && (this.state.buttonHovered ? COLORS.white : COLORS.lynch),
                danger && COLORS.white,
                minimal && COLORS.puertoRico,
                disabled && COLORS.gallery,
              ].filter(c => c && typeof c === 'string' && c.length > 0).reverse()[0],
            })}
            {
              label && label !== ''
                ? (
                  <ButtonLabelStyled
                    iconPosition={iconPosition}
                    iconComponent={this.iconComponent()}
                    fullWidth={fullWidth}
                    large={large}
                    minimal={minimal}
                  >
                    {label}
                  </ButtonLabelStyled>
                ) : null
            }
          </ButtonStyled>
        )
    );
  }
}

export default Button;
