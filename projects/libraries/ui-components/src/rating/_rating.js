import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon';

const list = [1, 2, 3, 4, 5];


const Rating = ({ value }) => (
  <div className="rating">
    {list.map((item, index) => (
      <Icon
        key={item}
        name={(index < value) ? 'star-filled' : 'star'}
        color={(index < value) ? '#4acba4' : '#979797'}
        size={25}
      />
    ))}
  </div>
);


Rating.propTypes = {
  value: PropTypes.number.isRequired,
};

export default Rating;
