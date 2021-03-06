import React from 'react';
import { withRouter } from 'react-router-dom';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  console.log(props);

  const {
    ingredients,
  } = props;

  let burgerIngredients = [];
  for (var key in ingredients) {
    for (let i = 0; i < ingredients[key]; i++) {
      burgerIngredients.push(<BurgerIngredient key={key + i} type={key} />)
    }
  }

  if (burgerIngredients.length === 0) {
    burgerIngredients = <p>Please start adding ingredients!</p>
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {burgerIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default withRouter(burger);