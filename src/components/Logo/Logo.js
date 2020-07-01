import React from 'react';
import logo from './../../assets/images/logo.png';
import classes from './Logo.module.css';
import { Link } from 'react-router-dom';

export const Logo = () => (
  <div className={classes.Logo}>
    <Link to="/">
      <img src={logo} alt="burgermeister-logo"></img>
    </Link>
  </div>
);
