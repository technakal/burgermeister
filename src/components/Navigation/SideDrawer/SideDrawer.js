import React from 'react';
import { Logo } from '../../Logo/Logo';
import { NavigationItems } from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import { Backdrop } from './../../UI/Backdrop/Backdrop';

export const SideDrawer = ({ showSideDrawer, showSideDrawerHandler }) => {
  const sideDrawerClasses = [
    classes.SideDrawer,
    showSideDrawer ? classes.Open : classes.Close,
  ].join(' ');
  return (
    <Auxilliary>
      <Backdrop show={showSideDrawer} setShow={showSideDrawerHandler} />
      <div className={sideDrawerClasses}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Auxilliary>
  );
};
