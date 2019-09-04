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
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //   }
  // }
  state = {
    // ingredients: null,
    // totalPrice: 4,
    isOrderEnable: false,
    orderButtonClicked: false,
    loading: false,
    error: false,
  }

  componentDidMount() {
    console.log(this.props);

    // axios.get('/ingredients.json')
    //   .then(res => {
    //     console.log(res);
    //     this.setState({ ingredients: res.data });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     this.setState({ error: true });
    //   })
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
    queryParams.push('price=' + this.props.totalPrice)
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

  render() {
    const disabledInfo = { ...this.props.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            addIngredient={this.props.addIngredient}
            removeIngredient={this.props.removeIngredient}
            disabled={disabledInfo}
            isOrderEnable={this.state.isOrderEnable}
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

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addIngredient: (ingredient) => { dispatch({ type: actionTypes.ADD_INGREDIENT, ingredient: ingredient }) },
    removeIngredient: (ingredient) => { dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredient: ingredient }) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));