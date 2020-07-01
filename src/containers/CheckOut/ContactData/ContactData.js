import React, { Component } from 'react';
import { trim } from 'ramda';
import {
  allPass,
  notEmptyOrNil,
  isMinLength,
  isMaxLength,
} from '../../../services/form.validation';
import { Button } from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import { Spinner } from './../../../components/UI/Spinner/Spinner';
import { Input } from './../../../components/UI/Input/Input';

const deliveryOptions = [
  {
    label: 'Regular',
    value: 'regular',
  },
  {
    label: 'Fast',
    value: 'fast',
  },
  {
    label: 'Fastest',
    value: 'fastest',
  },
];

export class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'text',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name',
          name: 'name',
          label: 'Name',
        },
        validation: {
          required: true,
        },
        value: '',
        valid: false,
        touched: false,
      },
      email: {
        elementType: 'text',
        elementConfig: {
          type: 'email',
          placeholder: 'Email address',
          name: 'email',
          label: 'Email',
        },
        validation: {
          required: true,
        },
        value: '',
        valid: false,
        touched: false,
      },
      street: {
        elementType: 'text',
        elementConfig: {
          type: 'text',
          placeholder: 'Street address',
          name: 'street',
          label: 'Street Address',
        },
        validation: {
          required: true,
        },
        value: '',
        valid: false,
        touched: false,
      },
      city: {
        elementType: 'text',
        elementConfig: {
          type: 'text',
          placeholder: 'City',
          name: 'city',
          label: 'City',
        },
        validation: {
          required: true,
        },
        value: '',
        valid: false,
        touched: false,
      },
      state: {
        elementType: 'text',
        elementConfig: {
          type: 'text',
          placeholder: 'State',
          name: 'state',
          label: 'State',
        },
        validation: {
          required: true,
        },
        value: '',
        valid: false,
        touched: false,
      },
      postalCode: {
        elementType: 'text',
        elementConfig: {
          type: 'text',
          placeholder: 'Postal code',
          name: 'postalCode',
          label: 'Postal Code',
        },
        validation: {
          required: true,
          minLength: isMinLength(5),
          maxLength: isMaxLength(10),
        },
        value: '',
        valid: false,
        touched: false,
      },
      deliveryType: {
        elementType: 'select',
        elementConfig: {
          name: 'deliveryType',
          label: 'Delivery Type',
          options: deliveryOptions,
        },
        value: 'regular',
        valid: true,
        touched: false,
      },
    },
    loading: false,
    isFormValid: false,
  };

  handleChange = (e) => {
    const orderForm = {
      ...this.state.orderForm,
      [e.target.name]: {
        ...this.state.orderForm[e.target.name],
        value: e.target.value,
        valid: this.checkValidity(
          e.target.value,
          this.state.orderForm[e.target.id].validation
        ),
        touched: true,
      },
    };
    console.log(orderForm);

    const formValidityChecks = Object.keys(orderForm).map(
      (x) => orderForm[x].valid
    );

    this.setState({
      orderForm,
      isFormValid: allPass(formValidityChecks),
    });
  };

  checkValidity = (value, rules) => {
    let isValid = [];
    if (rules) {
      if (rules.required) {
        isValid.push(notEmptyOrNil(trim(value)));
      }
      if (rules.maxLength) {
        isValid.push(rules.maxLength(trim(value)));
      }
      if (rules.minLength) {
        isValid.push(rules.minLength(trim(value)));
      }
      return allPass(isValid);
    }
    return true;
  };

  orderHandler = (e) => {
    e.preventDefault();
    if (this.isFormValid) {
      const order = Object.keys(this.state.orderForm).reduce(
        (a, c) => ({
          ...a,
          [c]: this.state.orderForm[c].value,
        }),
        {
          ingredients: this.props.ingredients,
          totalPrice: this.props.totalPrice,
        }
      );
      this.setState({ loading: true });
      axios
        .post('/orders.json', order)
        .then((res) => {
          this.setState({ loading: false });
          this.props.history.push('/');
        })
        .catch((error) => {
          this.setState({ loading: false });
          console.error(error);
        });
    }
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = this.state.loading ? (
      <Spinner />
    ) : (
      <form className={classes.Form} onSubmit={this.orderHandler}>
        {formElementsArray.map((x) => {
          return (
            <Input
              key={x.id}
              elementType={x.config.elementType}
              elementConfig={x.config.elementConfig}
              invalid={x.config.touched && !x.config.valid}
              value={x.config.value}
              onChange={this.handleChange}
            />
          );
        })}
        <Button
          type="submit"
          buttonType="Success"
          disabled={!this.state.isFormValid}
        >
          Place Order
        </Button>
      </form>
    );
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Data</h4>
        {form}
      </div>
    );
  }
}
