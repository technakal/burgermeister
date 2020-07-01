import React, { Component } from 'react';
import Auxilliary from '../Auxilliary/Auxilliary';
import classes from './Layout.module.css';
import { Toolbar } from '../../components/Navigation/Toolbar/Toolbar';
import { SideDrawer } from '../../components/Navigation/SideDrawer/SideDrawer';

export class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  showSideDrawerHandler = () => {
    this.setState((prevState) => ({
      showSideDrawer: !prevState.showSideDrawer,
    }));
  };

  render() {
    const { showSideDrawer } = this.state;
    return (
      <Auxilliary>
        <div>
          <Toolbar showSideDrawerHandler={this.showSideDrawerHandler} />
          <SideDrawer
            showSideDrawer={showSideDrawer}
            showSideDrawerHandler={this.showSideDrawerHandler}
          />
        </div>
        <main className={classes.Content}>{this.props.children}</main>
      </Auxilliary>
    );
  }
}
