import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.module.css';

export const NavigationItem = ({ children, link }) => (
  <li className={classes.NavigationItem}>
    <NavLink exact activeClassName={classes.active} to={link}>
      {children}
    </NavLink>
  </li>
);
