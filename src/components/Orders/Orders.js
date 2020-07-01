import React, { Component } from 'react';
import { Order } from '../Order/Order';
import axios from '../../axios-orders';
import { withErrorHandler } from './../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };
  componentDidMount() {
    axios
      .get('/orders.json')
      .then((res) => {
        const orders = [];
        for (let key of Object.keys(res.data)) {
          orders.push({ ...res.data[key], id: key });
        }
        this.setState({ orders, loading: false });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });
  }

  render() {
    const { orders } = this.state;
    return (
      <div>
        {orders.map((x) => (
          <Order
            key={x.id}
            ingredients={x.ingredients}
            totalPrice={+x.totalPrice}
          />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
