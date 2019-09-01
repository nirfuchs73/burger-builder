import React, { Component } from 'react';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Order from '../../components/Order/Order/Order';

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  }
  componentDidMount() {
    axios.get('/orders.json')
      .then(res => {
        const orders = [];
        for (let key in res.data) {
          orders.push({
            ...res.data[key],
            id: key,
          });
        }
        // console.log(orders);

        this.setState({ orders: orders })
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.setState({ loading: false })
      });
  }

  render() {
    const orders = this.state.orders.map(order => {
      return <Order
        key={order.id}
        ingredients={order.ingredients}
        price={+order.price} />;
    })
    return (
      <div>
        {orders}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
