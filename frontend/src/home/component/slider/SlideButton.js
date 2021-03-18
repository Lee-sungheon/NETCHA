import React from 'react';
import IconArrowDown from './../Icons/IconArrowDown'
import './SlideButton.scss'

const SlideButton = ({ onClick, type, showButton }) => (
  <button className={`slide-button slide-button--${type}`} onClick={onClick} style={showButton ? {visibility: 'visible'}: {visibility: 'hidden'}}>
    <span>
      <IconArrowDown />
    </span>
  </button>
);

export default SlideButton;