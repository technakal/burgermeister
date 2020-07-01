import React from 'react';
import classes from './Button.module.css';

export const Button = ({ buttonType, disabled, ...props }) => (
  <button
    onClick={props.onClick}
    className={[classes.Button, classes[buttonType]].join(' ')}
    disabled={disabled}
    {...props}
  >
    {props.children}
  </button>
);
