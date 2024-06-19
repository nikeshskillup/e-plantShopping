import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeItem } from './redux/cartSlice';

function CartItems() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const totalCost = useSelector(state => state.cart.totalCost);

  const handleIncrement = (item) => {
    dispatch(incrementQuantity({ name: item.name }));
  };

  const handleDecrement = (item) => {
    dispatch(decrementQuantity({ name: item.name }));
  };

  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name }));
  };

  return (
    <div className="cart-items">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <div>{item.name}</div>
                <div>{item.cost}</div>
                <div>
                  <button onClick={() => handleDecrement(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item)}>+</button>
                </div>
                <div>Subtotal: ${(item.quantity * parseInt(item.cost.replace('$', ''), 10)).toFixed(2)}</div>
                <button onClick={() => handleRemove(item)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <div>Total Quantity: {totalQuantity}</div>
            <div>Total Cost: ${totalCost.toFixed(2)}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartItems;
