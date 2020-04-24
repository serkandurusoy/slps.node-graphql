import React from 'react';
import PropTypes from 'prop-types';
import { action } from '@storybook/addon-actions';
import { Button, Icon } from '../';
import NavigationBar from '../navigation-bar';
import phoneWithMap from './_images/phone-with-map@1x.png';
import whiteCurve from './_images/white-curve@1x.png';

const LandingLayout = ({ showRegister }) => (
  <div>
    <header className="header">
      <div className="header-image">
        <div className="container header-container">
          { showRegister ?
            <NavigationBar
              transparent
              logoOnClick={action('Logo clicked')}
              leftButton={{
                label: 'Register',
                onClick: action('I am the left button'),
              }}
              rightButton={{
                label: 'Login',
                onClick: action('I am the right button'),
              }}
            />
            :
            <NavigationBar
              transparent
              logoOnClick={action('Logo clicked')}
              rightButton={{
                label: 'Login',
                onClick: action('I am the right button'),
              }}
            />
          }
          <div className="header-title-wrapper">
            <div className="title-text">
              Join our <br />
              high street <br /> <span>revolution</span>
            </div>
            { showRegister &&
              <div className="title-button">
                <Button
                  large
                  label="register your shop"
                  icon={<Icon name="vector-right" />}
                  iconPosition="right"
                />
              </div>
            }
          </div>
          <div className="header-media-wrapper">
            <div className="media-phone">
              <img src={phoneWithMap} alt="" />
            </div>
            <div className="media-pocket">
              <img className="pocket" src={whiteCurve} alt="" />
            </div>
          </div>
        </div>
      </div>
    </header>
    <footer className="footer footer__landing">
      <div className="footer-image" />
      <div className="footer-gray-block" />
      <div className="container footer-container">
        <div className="footer-nav">
          <div className="footer-menu">
            <ul>
              <li>
                <a>Home</a>
              </li>
              <li>
                <a>Contact</a>
              </li>
              <li>
                <a>Legal Disclaimer</a>
              </li>
              <li>
                <a>Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
);

LandingLayout.propTypes = {
  showRegister: PropTypes.bool.isRequired,
};

export default LandingLayout;
