import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const buildControls = (props) => {
  const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
  ];

  let controlItems = controls.map(ctrl => {
    return <BuildControl
      key={ctrl.label}
      label={ctrl.label}
      added={() => props.addIngredient(ctrl.type)}
      removed={() => props.removeIngredient(ctrl.type)}
      disabled={props.disabled[ctrl.type]}
    />
  });

  return (
    <div className={classes.BuildControls}>
      <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
      {controlItems}
    </div>
  );
}

export default buildControls;