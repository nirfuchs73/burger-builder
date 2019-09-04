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


const reducer = (state = initialState, action) => {
  let ingredients;
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      ingredients = {
        ...state.ingredients,
        [action.ingredient]: state.ingredients[action.ingredient] + 1,
      }

      return Object.assign({}, state, { ingredients: ingredients });

    case actionTypes.REMOVE_INGREDIENT:
      ingredients = {
        ...state.ingredients,
        [action.ingredient]: state.ingredients[action.ingredient] - 1,
      }

      return Object.assign({}, state, { ingredients: ingredients });

    default:
      return state;
  }
}

export default reducer;