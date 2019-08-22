import React, { Component } from 'react';
import Aux from '../../hoc//Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

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
    ingredients: null,
    totalPrice: 4,
    isOrderEnable: false,
    orderButtonClicked: false,
    loading: false,
    error: false,
  }

  componentDidMount() {
    console.log(this.props);

    axios.get('/ingredients.json')
      .then(res => {
        console.log(res);
        this.setState({ ingredients: res.data });
      })
      .catch(err => {
        console.log(err);
        this.setState({ error: true });
      })
  }

  setOrdering = () => {
    this.setState({ orderButtonClicked: true })
  }

  setOrderingCancel = () => {
    this.setState({ orderButtonClicked: false })
  }

  setOrderingContinue = () => {
    // alert('You continue!');

    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    }
    queryParams.push('price=' + this.state.totalPrice)
    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString,
    });
  }

  setIsOrderEnable = () => {
    var ingredients = { ...this.state.ingredients };
    let sum = 0;
    for (let key in ingredients) {
      sum += ingredients[key];
    }
    this.setState({ isOrderEnable: sum > 0 })
  }

  addIngredient = (type) => {
    const ingredients = { ...this.state.ingredients };
    ingredients[type] = this.state.ingredients[type] + 1;
    const totalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({
      ingredients: ingredients,
      totalPrice: totalPrice,
    }, () => {
      this.setIsOrderEnable();
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
    }, () => {
      this.setIsOrderEnable();
    });
  }

  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            addIngredient={this.addIngredient}
            removeIngredient={this.removeIngredient}
            disabled={disabledInfo}
            isOrderEnable={this.state.isOrderEnable}
            setOrdering={this.setOrdering}
            price={this.state.totalPrice} />
        </Aux>
      );

      orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        orderCancel={this.setOrderingCancel}
        orderContinue={this.setOrderingContinue} />;
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal show={this.state.orderButtonClicked} modalClosed={this.setOrderingCancel}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);