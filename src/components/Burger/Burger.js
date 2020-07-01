import React from 'react';
import { BurgerIngredient } from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

export const Burger = ({ ingredients }) => {
  let transformedIngredients = Object.keys(ingredients)
    .map((x, i) => {
      return [...Array(ingredients[x])].map((_, i) => (
        <BurgerIngredient key={x + i} type={x} />
      ));
    })
    .reduce((arr, el) => arr.concat(el), []);
  if (!transformedIngredients.length) {
    transformedIngredients = <p>Please start adding ingredients.</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};
