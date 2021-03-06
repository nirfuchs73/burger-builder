import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    id,
    orderData
  }
}

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error
  }
}

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
}

export const purchaseBurger = (orderData) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios.post('/orders.json', orderData)
      .then(res => {
        console.log(res.data);
        dispatch(purchaseBurgerSuccess(res.data.name, orderData))
      })
      .catch(error => {
        // console.log(error);
        dispatch(purchaseBurgerFail(error))
      })
      .finally(res => {
        // this.setState({ loading: false });
        // this.props.history.push('/');
      });

  }
}

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
}

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  }
}

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error,
  }
}

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  }
}

export const fetchOrders = () => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    axios.get('/orders.json')
      .then(res => {
        const orders = [];
        for (let key in res.data) {
          orders.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(fetchOrdersSuccess(orders));
      })
      .catch(err => {
        dispatch(fetchOrdersFail(err));
      })
      .finally(() => {
        // this.setState({ loading: false })
      });
  }


}