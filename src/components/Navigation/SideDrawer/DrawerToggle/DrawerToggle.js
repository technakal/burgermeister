import React from 'react';
import classes from './DrawerToggle.module.css';

export const DrawerToggle = ({ showSideDrawerHandler }) => (
  <div className={classes.DrawerToggle} onClick={showSideDrawerHandler}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);
