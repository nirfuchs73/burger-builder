import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc//Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as action from '../../store/actions/index';

class BurgerBuilder extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //   }
  // }
  state = {
    // ingredients: null,
    // totalPrice: 4,
    // isOrderEnable: false,
    orderButtonClicked: false,
    // loading: false,
    // error: false,
  }

  componentDidMount() {
    console.log(this.props);
    this.props.initIngredient();
  }

  setOrdering = () => {
    this.setState({ orderButtonClicked: true })
  }

  setOrderingCancel = () => {
    this.setState({ orderButtonClicked: false })
  }

  setOrderingContinue = () => {
    this.props.history.push('/checkout');
  }

  setIsOrderEnable = () => {
    var ingredients = { ...this.props.ingredients };
    let sum = 0;
    for (let key in ingredients) {
      sum += ingredients[key];
    }
    return sum > 0;
  }

  render() {
    const disabledInfo = { ...this.props.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            addIngredient={this.props.addIngredient}
            removeIngredient={this.props.removeIngredient}
            disabled={disabledInfo}
            isOrderEnable={this.setIsOrderEnable()}
            setOrdering={this.setOrdering}
            price={this.props.totalPrice} />
        </Aux>
      );

      orderSummary = <OrderSummary
        ingredients={this.props.ingredients}
        price={this.props.totalPrice}
        orderCancel={this.setOrderingCancel}
        orderContinue={this.setOrderingContinue} />;
    }

    // if (this.state.loading) {
    //   orderSummary = <Spinner />;
    // }

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

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addIngredient: (ingredient) => { dispatch(action.addIngredient(ingredient)) },
    removeIngredient: (ingredient) => { dispatch(action.removeIngredient(ingredient)) },
    initIngredient: () => { dispatch(action.initIngredient()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));