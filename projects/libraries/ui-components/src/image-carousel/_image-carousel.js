/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import styled from 'styled-components';
import Slider from '@mygooder/react-slick';
import PropTypes from 'prop-types';
import Icon from '../icon';
import '../styles/_slider.sass';

const arrowsCommonStyles = `
  width: 40px;
  height: 40px;
  border-radius: 100px;
  box-shadow: 0 5px 10px 0 rgba(18, 43, 35, 0.2);
  background-color: #4acba4;
  position: absolute;
  top: calc(50% - 20px);
  display: flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  z-index: 1;
`;

const ImageCarouselItemWrapperStyled = styled.div`
  box-sizing: border-box;
  padding-left: 5px;
  padding-right: 5px;
  display: inline-block;
  width: 240px;
  height: 240px;
`;

const ImageCarouselItemStyled = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 25px;
  border: 10px solid #fff;
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: contain;
`;

const ImageCarouselLeftArrowStyled = styled.div`
  ${arrowsCommonStyles}
  left: -20px;
  padding-right: 3px;
`;

const ImageCarouselRightArrowStyled = styled.div`
  ${arrowsCommonStyles}
  right: -20px;
  padding-left: 3px;
`;

const LeftArrow = ({ onClick }) => ( // eslint-disable-line
  <ImageCarouselLeftArrowStyled onClick={onClick}>
    <Icon name="arrow-left" size={15} color="#fff" />
  </ImageCarouselLeftArrowStyled>
);

const RightArrow = ({ onClick }) => ( // eslint-disable-line
  <ImageCarouselRightArrowStyled onClick={onClick}>
    <Icon name="arrow-right" size={15} color="#fff" />
  </ImageCarouselRightArrowStyled>
);

class ImageCarousel extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired, // eslint-disable-line
    slidesToShow: PropTypes.number,
  }
  static defaultProps = {
    slidesToShow: 4,
  }
  state = {}
  render() {
    return (
      <div>
        <Slider
          prevArrow={<LeftArrow />}
          nextArrow={<RightArrow />}
          slidesToShow={this.props.slidesToShow}
          infinite={false}
          arrows={this.props.images && this.props.images.length > this.props.slidesToShow}
          {...this.props}
        >
          {this.props.images.map((image, index) => (
            <ImageCarouselItemWrapperStyled key={index}>
              <ImageCarouselItemStyled
                style={{ backgroundImage: `url(${image})` }}
              />
            </ImageCarouselItemWrapperStyled>
          ))}
        </Slider>
      </div>
    );
  }
}

export default ImageCarousel;
