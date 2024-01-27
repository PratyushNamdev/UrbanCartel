import React, { useEffect } from "react";
import CartItem from "./CartItem";
import Style from "../CSS/CartContainer.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartItems,
  calculateTotals,
  clearCart,
} from "../Store/Slices/CartSlice";
import ServerErrorMessage from "./ServerErrorMessage";

import { useNavigate } from "react-router-dom";

export default function CartContainer() {
  // Select relevant data from the Redux store using the useSelector hook
  const { cartItems, totalItems, totalPrice } = useSelector(
    (store) => store.cart
  );
  const { userId, isLoggedIn } = useSelector((store) => store.authentication);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // useEffect to fetch cart items when the component mounts
  useEffect(() => {
    // Redirect to login page if user is not authenticated
    if (!localStorage.getItem("authToken") || !isLoggedIn) {
      navigate("/login");
      return;
    }
    dispatch(getCartItems(dispatch));
    // eslint-disable-next-line
  }, []);
  // useEffect to recalculate totals when cartItems change
  useEffect(() => {
    dispatch(calculateTotals());

    // eslint-disable-next-line
  }, [cartItems]);
  // If there is a server error, display a message
  if (totalItems === null) {
    return (
      <>
        <ServerErrorMessage />
      </>
    );
  }
  // If the cart is empty, display a message
  if (totalItems < 1) {
    return (
      <section className={Style.cart}>
        {/* cart header */}
        <header>
          <h2>your bag</h2>
          <h4 className={Style.emptycart}>is currently empty</h4>
        </header>
      </section>
    );
  }

  return (
    <section className={Style.cart}>
      {/* cart header */}
      <header>
        <h2>your bag</h2>
      </header>
      {/* cart items */}
      <div>
        {cartItems?.map((item) => {
          return <CartItem key={item.pId} data={item} />;
        })}
      </div>
      {/* cart footer */}
      <footer>
        <hr />
        <div className={Style.carttotal}>
          <h4>
            total <span>₹{totalPrice.toFixed(2)}</span>
          </h4>
        </div>
        <div className={Style.btn_div}>
          <button
            className={`${Style.btn} ${Style.clearbtn}`}
            onClick={() => {
              dispatch(clearCart({ userId, dispatch }));
            }}
          >
            Clear Cart
          </button>
          <button
            className={`${Style.btn} ${Style.buybtn}`}
            onClick={() => {
              navigate("/selectAddress", { state: { entry: true } });
            }}
          >
            Proceed to Buy
          </button>
        </div>
      </footer>
    </section>
  );
}
