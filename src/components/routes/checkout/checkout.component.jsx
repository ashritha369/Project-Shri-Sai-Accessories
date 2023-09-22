import { useContext } from "react";
import "./checkout.styles.scss";
import { CartContext } from "../../../contexts/cart.context";

const Checkout = () => {
  const { cartItems, addItemToCart, removeItemFromCart } = useContext(CartContext);
  return (
    <div>
      <h1>I am the checkout page</h1>
      {cartItems.map((cartItem) => {
        const { id, name, imageUrl, price, quantity } = cartItem;
        return (
          <div key={id}>
            <h2>{name}</h2>
            <span>{quantity}</span>
            <br />
            <span onClick={() => removeItemFromCart(cartItem)}>decrement</span>
            <br />
            <span onClick={() => addItemToCart(cartItem)}>increment</span>
          </div>
        );
      })}
    </div>
  );
};

export default Checkout;
