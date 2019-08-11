import React, { Component } from 'react';

import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  componentWillUpdate() {
    console.log('[OrderSummary] WillUpdate');
  }

  render() {
    let ingredientsSummary = [];
    for (let key in this.props.ingredients) {
      ingredientsSummary.push(
        <li key={key}>
          <span style={{ textTransform: 'capitalize' }}>{key}</span>: {this.props.ingredients[key]}
        </li>);
    }

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientsSummary}
        </ul>
        <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={this.props.orderCancel}>CANCEL</Button>
        <Button btnType="Success" clicked={this.props.orderContinue}>CONTINUE</Button>
      </Aux>
    );
  }
}

export default OrderSummary;