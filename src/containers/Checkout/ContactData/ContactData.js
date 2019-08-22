import React, { Component } from 'react';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
  }

  orderHandler = (event) => {
    event.preventDefault();
    console.log(this.props.ingredients);
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Nir Fuchs',
        address: {
          street: 'Hairus',
          zipCode: '7313500',
          country: 'Israel'
        },
        email: 'nirfuchs@hotmail.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(res => {
        this.setState({ loading: false });
        this.props.history.push('/');
      });
  }

  render() {
    let form = (
      <form>
        <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
        <input className={classes.Input} type="email" name="email" placeholder="Your Email" />
        <input className={classes.Input} type="text" name="street" placeholder="Street" />
        <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Eanter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;