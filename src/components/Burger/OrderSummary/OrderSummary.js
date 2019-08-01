import React from 'react';

import Aux from '../../../hoc/Auxiliary';

const orderSummary = (props) => {
    let ingredientsSummary = [];
    for (let key in props.ingredients) {
        ingredientsSummary.push(
            <li key={key}>
                <span style={{ textTransform: 'capitalize' }}>{key}</span>: {props.ingredients[key]}
            </li>);
    }

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p>Continue to Checkout?</p>

        </Aux>
    );
}

export default orderSummary;