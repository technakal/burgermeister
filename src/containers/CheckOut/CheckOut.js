import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { CheckOutSummary } from './../../components/Order/CheckOutSummary/CheckOutSummary';
import { ContactData } from './ContactData/ContactData';

export class CheckOut extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
  };

  componentWillMount() {
    const queryParams = new URLSearchParams(this.props.location.search);
    const ingredients = {
      salad: queryParams.has('salad') ? Number(queryParams.get('salad')) : 0,
      bacon: queryParams.has('bacon') ? Number(queryParams.get('bacon')) : 0,
      cheese: queryParams.has('cheese') ? Number(queryParams.get('cheese')) : 0,
      meat: queryParams.has('meat') ? Number(queryParams.get('meat')) : 0,
    };
    const totalPrice = queryParams.has('totalPrice')
      ? Number(queryParams.get('totalPrice'))
      : 0;
    this.setState({ ingredients, totalPrice });
  }

  onCancel = () => this.props.history.goBack();

  onContinue = () => this.props.history.replace('/checkout/contact-data');

  render() {
    return (
      <div>
        <CheckOutSummary
          ingredients={this.state.ingredients}
          onCancel={this.onCancel}
          onContinue={this.onContinue}
        />
        <Route
          path={this.props.match.path + '/contact-data'}
          render={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}
