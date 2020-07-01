import {
  all,
  compose,
  equals,
  gte,
  isEmpty,
  isNil,
  length,
  lte,
  not,
  or,
} from 'ramda';

const isEmptyOrNil = or(isEmpty, isNil);
const notEmptyOrNil = compose(not, isEmptyOrNil);
const isMinLength = (check) => (v) => gte(length(v), check);
const isMaxLength = (check) => (v) => lte(length(v), check);
const allPass = all(equals(true));

export { allPass, isEmptyOrNil, notEmptyOrNil, isMinLength, isMaxLength };
