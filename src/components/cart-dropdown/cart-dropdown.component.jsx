import Button from "../button/button.component";

import CartItem from "../cart-item/cart-item.component";

import "./cart-drop-down.styles.scss";

const CartDropdown = () => {
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {[].map((item) => (
          <CartItem cartItem={item} />
        ))}
      </div>
      <Button>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
