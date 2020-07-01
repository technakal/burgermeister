import React, { Component } from 'react';
import Auxilliary from '../../hoc/Auxilliary/Auxilliary';
import { Burger } from './../../components/Burger/Burger';
import { BuildControls } from './../../components/Burger/BuildControls/BuildControls';
import { Modal } from './../../components/UI/Modal/Modal';
import { OrderSummary } from './../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import { Spinner } from './../../components/UI/Spinner/Spinner';
import { withErrorHandler } from './../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.5,
  bacon: 0.7,
  meat: 2,
};

class BurgerBuilder extends Component {
  state = {
    error: null,
    ingredients: null,
    isLoading: true,
    isOrderValid: false,
    showModal: false,
    totalPrice: 0,
  };

  componentDidMount() {
    axios
      .get('/ingredients.json')
      .then((res) => this.setState({ ingredients: res.data, isLoading: false }))
      .catch((error) => this.setState({ error: { error }, isLoading: false }));
  }

  addIngredient = (type) => {
    const updatedIngredients = {
      ...this.state.ingredients,
      [type]: this.state.ingredients[type] + 1,
    };
    const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice,
      isOrderValid: this.updateIsOrderValid(updatedIngredients),
    });
  };

  removeIngredient = (type) => {
    if (this.state.ingredients[type] > 0) {
      const updatedIngredients = {
        ...this.state.ingredients,
        [type]: this.state.ingredients[type] - 1,
      };
      const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
      this.setState({
        ingredients: updatedIngredients,
        totalPrice: updatedPrice,
        isOrderValid: this.updateIsOrderValid(updatedIngredients),
      });
    }
  };

  purchaseContinue = () => {
    const queryParams = Object.entries(this.state.ingredients).map(
      (x) => `${x[0]}=${x[1]}`
    );
    queryParams.push(`totalPrice=${this.state.totalPrice}`);
    this.props.history.push({
      pathname: '/checkout',
      search: queryParams.join('&'),
    });
  };

  setShowModal = () => {
    this.setState((prevState) => ({ showModal: !prevState.showModal }));
  };

  updateIsOrderValid(ingredients) {
    const totalIngredients = Object.values({
      ...ingredients,
    }).reduce((acc, x) => acc + x, 0);
    return totalIngredients > 0;
  }

  render() {
    const {
      error,
      ingredients,
      isLoading,
      isOrderValid,
      showModal,
      totalPrice,
    } = this.state;
    const disabledInfo = { ...ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = ingredients[key] <= 0;
    }
    const totalPriceDisplay = `$${totalPrice.toFixed(2)}`;
    let orderSummary = isLoading ? (
      <Spinner />
    ) : ingredients ? (
      <OrderSummary
        ingredients={ingredients}
        purchaseContinue={this.purchaseContinue}
        setShowModal={this.setShowModal}
        totalPrice={totalPriceDisplay}
      />
    ) : (
      <Spinner />
    );
    let burger = error ? (
      <h1>Ingredients can't be loaded!</h1>
    ) : ingredients ? (
      <Auxilliary>
        <Burger ingredients={ingredients} />
        <BuildControls
          addIngredient={this.addIngredient}
          disabledInfo={disabledInfo}
          isOrderValid={isOrderValid}
          removeIngredient={this.removeIngredient}
          setShowModal={this.setShowModal}
          totalPrice={totalPriceDisplay}
        />
      </Auxilliary>
    ) : (
      <Spinner />
    );
    return (
      <Auxilliary>
        <Modal showModal={showModal} setShowModal={this.setShowModal}>
          {orderSummary}
        </Modal>
        {burger}
      </Auxilliary>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
