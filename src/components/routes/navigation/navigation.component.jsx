import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CartIcon from "../../cart-icon/cart-icon.component";
import CartDropdown from "../../cart-dropdown/cart-dropdown.component";

import { selectCurrentUser } from "../../../store/user/user.selector";
import { selectIsCartOpen } from "../../../store/cart/cart.selector";
import { signOutStart } from "../../../store/user/user.action";

import ShriSaiLogo from "../../../assets/Shri_Sai_Logo.png";

import "./navigation.styles.scss";

const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  const signOutUser = () => dispatch(signOutStart());
  return (
    <Fragment>
      <div className="navigation">
        <div>
          <Link className="logo-container" to="/">
            <img src={ShriSaiLogo} className="logo" alt="logo" />
          </Link>
        </div>

        <div className="name-of-project-with-orangeshade">
          <span className="name-of-project-purple">SHRI SAI</span> ACCESSORIES
        </div>

        <div className="nav-links-container">
          <div>
            <Link className="nav-link" to="/shop">
              SHOP
            </Link>
          </div>
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              SIGN-OUT
            </span>
          ) : (
            <div>
              <Link className="nav-link" to="/auth">
                SIGN-IN
              </Link>
            </div>
          )}
          <CartIcon />
        </div>
        {/* CART DROPDOWN AFTER CLICKING THE CART ICON */}

        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
