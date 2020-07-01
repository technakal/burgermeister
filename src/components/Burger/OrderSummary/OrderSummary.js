import React, { Component } from 'react';
import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import { Button } from './../../UI/Button/Button';

export class OrderSummary extends Component {
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (x, i) => (
        <li key={i}>
          {x}:{' '}
          <span style={{ textTransform: 'capitalize' }}>
            {this.props.ingredients[x]}
          </span>
        </li>
      )
    );
    return (
      <Auxilliary>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: {this.props.totalPrice}</strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button buttonType={'Danger'} onClick={this.props.setShowModal}>
          Cancel
        </Button>
        <Button buttonType={'Success'} onClick={this.props.purchaseContinue}>
          Continue
        </Button>
      </Auxilliary>
    );
  }
}
