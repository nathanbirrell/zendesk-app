import React from 'react';

export default ({ children, htmlFor }) => (
  <label className="c-txt__label" htmlFor={htmlFor}>{children}</label>
);