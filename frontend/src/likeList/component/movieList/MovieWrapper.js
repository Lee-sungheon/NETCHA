import React from 'react'
import './MovieWrapper.scss'

const MovieWrapper = ({ children, idx }) => (
  <div className="slider-wrapper" id={`wrapperidx${idx}`}>
    {children}
  </div>
);

export default MovieWrapper;
