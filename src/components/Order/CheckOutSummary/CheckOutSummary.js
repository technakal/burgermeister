import React from 'react';
import { Burger } from './../../Burger/Burger';
import { Button } from './../../UI/Button/Button';
import classes from './CheckOutSummary.module.css';

export const CheckOutSummary = (props) => {
  return (
    <div className={classes.CheckOutSummary}>
      <h1>We Hope It Tastes Fucking Good</h1>
      <div style={{ width: '100%', maxHeight: '500px', margin: 'auto' }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button onClick={props.onCancel} buttonType="Danger">
        Cancel
      </Button>
      <Button onClick={props.onContinue} buttonType="Success">
        Continue
      </Button>
    </div>
  );
};
