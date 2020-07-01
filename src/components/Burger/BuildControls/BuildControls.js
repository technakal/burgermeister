import React from 'react';
import classes from './BuildControls.module.css';
import { BuildControl } from './BuildControl/BuildControl';

export const BuildControls = ({
  addIngredient,
  disabledInfo,
  isOrderValid,
  removeIngredient,
  setShowModal,
  showModal,
  totalPrice,
}) => {
  const controls = [
    {
      label: 'Salad',
      type: 'salad',
      addIngredient: () => addIngredient('salad'),
      removeIngredient: () => removeIngredient('salad'),
    },
    {
      label: 'Bacon',
      type: 'bacon',
      addIngredient: () => addIngredient('bacon'),
      removeIngredient: () => removeIngredient('bacon'),
    },
    {
      label: 'Cheese',
      type: 'cheese',
      addIngredient: () => addIngredient('cheese'),
      removeIngredient: () => removeIngredient('cheese'),
    },
    {
      label: 'Meat',
      type: 'meat',
      addIngredient: () => addIngredient('meat'),
      removeIngredient: () => removeIngredient('meat'),
    },
  ];
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>{totalPrice}</strong>
      </p>
      {controls.map((x) => (
        <BuildControl
          key={x.label}
          label={x.label}
          addIngredient={x.addIngredient}
          removeIngredient={x.removeIngredient}
          disabled={disabledInfo[x.type]}
        />
      ))}
      <button
        className={classes.OrderButton}
        onClick={setShowModal}
        disabled={!isOrderValid}
      >
        Order Now
      </button>
    </div>
  );
};
