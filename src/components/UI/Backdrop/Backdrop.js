import React from 'react';
import classes from './Backdrop.module.css';

export const Backdrop = ({ setShow, show }) =>
  show ? <div onClick={setShow} className={classes.Backdrop}></div> : null;
