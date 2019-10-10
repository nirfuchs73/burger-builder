import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  ingredients: null,
  // ingredients: {
  //   salad: 0,
  //   bacon: 0,
  //   cheese: 0,
  //   meat: 0,
  // },
  totalPrice: 4,
  error: false,
}
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
}

const addIngredient = (state, action) => {
  const ingredients = updateObject(state.ingredients, { [action.ingredient]: state.ingredients[action.ingredient] + 1 })
  const upatedState = {
    ingredients: ingredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient],
  }
  return updateObject(state, upatedState);
};

const removeIngredient = (state, action) => {
  const ingredients = updateObject(state.ingredients, { [action.ingredient]: state.ingredients[action.ingredient] - 1, })
  const upatedState = {
    ingredients: ingredients,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient],
  }
  return updateObject(state, upatedState);
};

const setIngredients = (state, action) => {
  const upatedState = {
    ingredients: {
      salad: action.ingredients.salad,
      cheese: action.ingredients.cheese,
      bacon: action.ingredients.bacon,
      meat: action.ingredients.meat,
    },
    totalPrice: 4,
    error: false
  }
  return updateObject(state, upatedState);
};

const fetchIngredientsFailed = (state, action) => {
  return updateObject(state, { error: true });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
    default: return state;
  }
}

export default reducer;