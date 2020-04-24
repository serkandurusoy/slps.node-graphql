import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from '@sloops/library-ui-components';
import logoWhite from './_home-logo-white.png';
import phoneWithMap from './_home-phone-with-map@1x.png';
import whiteCurve from './_home-white-curve@1x.png';

// eslint-disable-next-line react/prop-types
const Home = ({ history }) => (
  <div>
    <header className="header">
      <div className="header-image">
        <div className="container header-container">
          <div className="header-nav">
            <div className="header-buttons">
              <ul>
                <li>
                  <Button label="REGISTER" minimal onClick={() => history.push('/register')} />
                </li>
                <li>
                  <Button label="LOGIN" onClick={() => history.push('/login')} />
                </li>
              </ul>
            </div>
            <div className="header-logo">
              <Link to="/"><img src={logoWhite} alt="logo" /></Link>
            </div>
          </div>
          <div className="header-title-wrapper">
            <div className="title-text">
              Join our <br />
              high street <br /> <span>revolution</span>
            </div>
            <div className="title-button">
              <Button label="register your shop" onClick={() => history.push('/register')} />
            </div>
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
    <footer>
      <div className="footer-image" />
      <div className="container footer-container">
        <div className="footer-nav">
          <div className="footer-menu">
            <ul>
              <li>
                <Link to="/">Home</Link>
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
          <div className="footer-button">
            <Button icon={<Icon name="edit" color="#fff" />} />
          </div>
        </div>
      </div>
    </footer>
  </div>
);

export default Home;
