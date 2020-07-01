import React from 'react';
import classes from './BuildControl.module.css';

export const BuildControl = ({
  label,
  type,
  addIngredient,
  removeIngredient,
  showModal,
  disabled,
}) => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{label}</div>
    <button
      className={classes.Less}
      onClick={() => removeIngredient(type)}
      disabled={disabled}
    >
      Less
    </button>
    <button className={classes.More} onClick={() => addIngredient(type)}>
      More
    </button>
  </div>
);
