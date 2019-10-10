import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return Object.assign({}, state, { purchased: false });

    case actionTypes.PURCHASE_BURGER_START:
      return Object.assign({}, state, { loading: true });

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.id
      }
      return Object.assign({}, state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
      });

    case actionTypes.PURCHASE_BURGER_FAIL:
      return Object.assign({}, state, { loading: false });

    case actionTypes.FETCH_ORDERS_START:
      return Object.assign({}, state, { loading: true });

    case actionTypes.FETCH_ORDERS_SUCCESS:
      return Object.assign({}, state, {
        orders: action.orders,
        loading: false
      });

    case actionTypes.FETCH_ORDERS_FAIL:
      return Object.assign({}, state, { loading: false });

    default:
      return state;
  }
}

export default reducer;