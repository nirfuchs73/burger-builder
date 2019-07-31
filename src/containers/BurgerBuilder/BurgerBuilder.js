import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
}

class BurgerBuilder extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //   }
  // }
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
  }

  addIngredient = (type) => {
    const ingredients = { ...this.state.ingredients };
    ingredients[type] = this.state.ingredients[type] + 1;
    const totalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({
      ingredients: ingredients,
      totalPrice: totalPrice,
    });
  }

  removeIngredient = (type) => {
    if (this.state.ingredients[type] <= 0) return;
    const ingredients = { ...this.state.ingredients };
    ingredients[type] = this.state.ingredients[type] - 1;
    const totalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({
      ingredients: ingredients,
      totalPrice: totalPrice,
    });
  }

  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredient={this.addIngredient}
          removeIngredient={this.removeIngredient}
          disabled={disabledInfo}
          price={this.state.totalPrice} />

      </Aux>
    );
  }
}

export default BurgerBuilder;