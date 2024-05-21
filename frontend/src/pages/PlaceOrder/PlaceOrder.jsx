import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import axios from 'axios'; // Import axios for making HTTP requests
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    province: "",
    postalCode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    const orderItems = food_list.reduce((acc, item) => {
      if (cartItems[item._id] > 0) {
        const itemInfo = { ...item, quantity: cartItems[item._id] };
        acc.push(itemInfo);
      }
      return acc;
    }, []);

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, { headers: { token } });
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error placing order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order. Please try again.");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/cart');
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token, getTotalCartAmount, navigate]);

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-field">
          <input
            required
            name='firstName'
            onChange={onChangeHandler}
            value={data.firstName}
            type='text'
            placeholder='First Name'
          />
          <input
            required
            name='lastName'
            onChange={onChangeHandler}
            value={data.lastName}
            type='text'
            placeholder='Last Name'
          />
        </div>
        <input
          required
          name='email'
          onChange={onChangeHandler}
          value={data.email}
          type='email'
          placeholder='Email Address'
        />
        <input
          required
          name='street'
          onChange={onChangeHandler}
          value={data.street}
          type='text'
          placeholder='Street'
        />
        <div className="multi-field">
          <input
            required
            name='city'
            onChange={onChangeHandler}
            value={data.city}
            type='text'
            placeholder='City'
          />
          <input
            required
            name='province'
            onChange={onChangeHandler}
            value={data.province}
            type='text'
            placeholder='Province'
          />
        </div>
        <div className="multi-field">
          <input
            required
            name='postalCode'
            onChange={onChangeHandler}
            value={data.postalCode}
            type='text'
            placeholder='Postal Code'
          />
          <input
            required
            name='country'
            onChange={onChangeHandler}
            value={data.country}
            type='text'
            placeholder='Country'
          />
        </div>
        <input
          required
          name='phone'
          onChange={onChangeHandler}
          value={data.phone}
          type='text'
          placeholder='Phone'
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
