import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingredient) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredient: ingredient
  }
}

export const removeIngredient = (ingredient) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredient: ingredient
  }
}

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients
  }
}

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  }
}

export const initIngredient = () => {
  return (dispatch) => {
    axios.get('/ingredients.json')
      .then(res => {
        // console.log(res);
        dispatch(setIngredients(res.data));
      })
      .catch(err => {
        // console.log(err);
        dispatch(fetchIngredientsFailed());
      })
  }
}