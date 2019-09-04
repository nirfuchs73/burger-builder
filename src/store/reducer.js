import * as actionTypes from './actions';

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  },
  totalPrice: 4,
}
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
}

const reducer = (state = initialState, action) => {
  let ingredients;
  let totalPrice;
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      ingredients = {
        ...state.ingredients,
        [action.ingredient]: state.ingredients[action.ingredient] + 1,
      }
      totalPrice = state.totalPrice + INGREDIENT_PRICES[action.ingredient];

      return Object.assign({}, state, { ingredients: ingredients, totalPrice: totalPrice });

    case actionTypes.REMOVE_INGREDIENT:
      ingredients = {
        ...state.ingredients,
        [action.ingredient]: state.ingredients[action.ingredient] - 1,
      }
      totalPrice = state.totalPrice - INGREDIENT_PRICES[action.ingredient];

      return Object.assign({}, state, { ingredients: ingredients, totalPrice: totalPrice });

    default:
      return state;
  }
}

export default reducer;