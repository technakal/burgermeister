import React from 'react';
import classes from './Order.module.css';

export const Order = ({ ingredients, totalPrice }) => {
  const ingredientArray = Object.keys(ingredients).map((x) => ({
    name: x,
    quantity: ingredients[x],
  }));

  return (
    <div className={classes.Order}>
      <p>
        Ingredients:{' '}
        {ingredientArray.map((x) => (
          <span
            className={classes.Ingredient}
            key={x.name}
          >{`${x.name}(${x.quantity})`}</span>
        ))}
      </p>
      <p>
        Price: <strong>${totalPrice.toFixed(2)}</strong>
      </p>
    </div>
  );
};
