import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';

import { calculateTotal, clearCart } from '../features/cart/cartSlice';

import CartItem from './CartItem';
import { openModal } from '../features/modal/modalSlice';

const CartContainer = () => {
  const dispatch = useDispatch();
  const { cartItems, total, amount } = useSelector(state => state.cart);

  useEffect(() => {
    dispatch(calculateTotal());
  }, [cartItems]);

  if (amount < 1) {
    return (
      <section className='cart'>
        <header>
          <h2>your bag</h2>
          <h4 className='empty-cart'>is currently empty</h4>
        </header>
      </section>
    );
  }

  const clearCartClickHandler = () => {
    dispatch(openModal());
  };

  return (
    <section className='cart'>
      <header>
        <h2>your bag</h2>
      </header>
      <div>
        {cartItems.map(item => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
      <footer>
        <hr />
        <div className='cart-total'>
          <h4>
            total <span>${total.toFixed(2)}</span>
          </h4>
        </div>
      </footer>
      <button className='btn clear-btn' onClick={clearCartClickHandler}>
        clear cart
      </button>
    </section>
  );
};

export default CartContainer;
