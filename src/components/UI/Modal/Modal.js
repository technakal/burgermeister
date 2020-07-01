import React, { Component } from 'react';
import classes from './Modal.module.css';
import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import { Backdrop } from '../Backdrop/Backdrop';

export class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.showModal !== this.props.showModal ||
      nextProps.children !== this.props.children
    );
  }
  render() {
    return (
      <Auxilliary>
        <Backdrop
          show={this.props.showModal}
          setShow={this.props.setShowModal}
        ></Backdrop>
        <div
          className={classes.Modal}
          style={{
            transform: this.props.showModal
              ? 'translateY(0)'
              : 'translateY(-100vh)',
            opacity: this.props.showModal ? '1' : '0',
          }}
        >
          {this.props.children}
        </div>
      </Auxilliary>
    );
  }
}
