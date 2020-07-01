import React from 'react';
import classes from './BurgerIngredient.module.css';
import PropTypes from 'prop-types';

const Ingredient = ({ classes, children }) => (
  <div className={classes}>{children}</div>
);

const BreadBottom = () => <Ingredient classes={classes.BreadBottom} />;

const BreadTop = () => (
  <Ingredient classes={classes.BreadTop}>
    <div className={classes.Seeds1}></div>
    <div className={classes.Seeds2}></div>
  </Ingredient>
);

const Meat = () => <Ingredient classes={classes.Meat} />;

const Cheese = () => <Ingredient classes={classes.Cheese} />;

const Bacon = () => <Ingredient classes={classes.Bacon} />;

const Salad = () => <Ingredient classes={classes.Salad} />;

export const BurgerIngredient = ({ type }) => {
  let ingredient = null;

  switch (type) {
    case 'bread-bottom':
      ingredient = <BreadBottom />;
      break;
    case 'bread-top':
      ingredient = <BreadTop />;
      break;
    case 'meat':
      ingredient = <Meat />;
      break;
    case 'cheese':
      ingredient = <Cheese />;
      break;
    case 'bacon':
      ingredient = <Bacon />;
      break;
    case 'salad':
      ingredient = <Salad />;
      break;
    default:
      ingredient = null;
  }

  return ingredient;
};

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired,
};
