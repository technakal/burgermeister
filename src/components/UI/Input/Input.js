import React from 'react';
import { cond, equals, T } from 'ramda';
import classes from './Input.module.css';

const GenericInput = (props) => (
  <input
    className={props.classes}
    id={props.name}
    onChange={props.onChange}
    {...props}
  />
);

const TextArea = (props) => (
  <textarea
    className={props.classes}
    id={props.name}
    onChange={props.onChange}
    {...props}
  />
);

const Select = ({ options, label, ...props }) => (
  <select
    className={props.classes}
    id={props.name}
    onChange={props.onChange}
    {...props}
  >
    {options.map((x, i) => (
      <option key={i} value={x.value}>
        {x.label}
      </option>
    ))}
  </select>
);

export const Input = (props) => {
  const inputClasses = [
    classes.InputElement,
    props.invalid ? classes.Invalid : '',
  ].join(' ');

  return (
    <div className={classes.Input}>
      {props.elementConfig.label && (
        <label htmlFor={props.elementConfig.label}>
          {props.elementConfig.label}
        </label>
      )}
      {cond([
        [
          equals('textarea'),
          () => (
            <TextArea
              classes={inputClasses}
              onChange={props.onChange}
              {...props.elementConfig}
            />
          ),
        ],
        [
          equals('select'),
          () => (
            <Select
              classes={inputClasses}
              onChange={props.onChange}
              {...props.elementConfig}
            />
          ),
        ],
        [
          T,
          () => (
            <GenericInput
              classes={inputClasses}
              onChange={props.onChange}
              {...props.elementConfig}
            />
          ),
        ],
      ])(props.elementType)}
    </div>
  );
};
