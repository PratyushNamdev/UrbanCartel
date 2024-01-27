import React, { useEffect, useState } from "react";
import Style from "../CSS/CheckoutPage&OrdersCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Cash , Card } from "../Helper/icon";
import toast from "react-hot-toast";
import { proccedToPayment } from "../Services/onlinepaymet";
import { proccedToCODOrder } from "../Services/cashOnDelivey";
import {setLoadingProgress} from "../Store/Slices/LoadingBarSlice"
import { useLocation, useNavigate } from "react-router-dom";
export default function CheckoutPage() {
  const { selectedAddress } = useSelector((store) => store.address);
  const { cartItems, totalItems, totalPrice } = useSelector(
    (store) => store.cart
  );
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

   // State to manage the selected payment method and delivery cost
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [deliveryCost , setDeliveryCost] = useState(0);
   // Handler function for payment method change
  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };
// Handler function for placing the order
  const handlePlaceOrder = () => {
    // Validate selected payment method
    if(selectedPaymentMethod===""){
      return toast.error("Select Payment Option")
    }
    else if(selectedPaymentMethod === "cardOrUPI"){
      // Proceed to online payment
      proccedToPayment({dispatch , setLoadingProgress , cartItems , selectedAddress})
    }
    else{
      // Proceed to Cash on delivery
     proccedToCODOrder({dispatch ,  navigate,setLoadingProgress , cartItems , selectedAddress})
    }

  };
  // useEffect for initial checks and setting delivery cost
  useEffect(()=>{
    if(!localStorage.getItem("authToken")){
      return navigate("/");
    }
    if (!location.state?.entry) {
      return navigate("/");
    }
    // Set delivery cost based on total price
    if(totalPrice<=500){
      setDeliveryCost(40);
    }
     // eslint-disable-next-line
  },[])
  return (
    <section>
      <div className={Style.checkout_container}>
        <div>
          <h2>Order Now</h2>
          <div className= {`${Style.checkout_box} , ${Style.one}`}>
            <h5
              style={{
                margin: "0 0 .4em 0",
                fontSize: "1.2em",
                color: "rgb(34,139,34)",
              }}
            >
              Delivery to -
            </h5>
            <div className={Style.address_details}>
              <h6 style={{ margin: "0" }}>{selectedAddress.name}</h6>
              <p style={{ textAlign: "unset", margin: "0" }}>
                {selectedAddress.mainAddress}, {selectedAddress.areaAddress}{" "}
                {selectedAddress?.landmark}, {selectedAddress.townOrCity},{" "}
                {selectedAddress.state},{selectedAddress.pincode}
              </p>
              <span>Phone number: {selectedAddress.mobileNumber}</span>
            </div>
          </div>
        </div>

        <div className= {`${Style.checkout_box} , ${Style.two}`} >
        
          <h5
            style={{
              margin: "0 0 .4em 0",
              fontSize: "1.2em",
              color: "rgb(34,139,34)",
            }}
          >
            Shipping Items -
          </h5>
          {cartItems.map((item) => {
            return (
              <article key={item._id} className={Style.cartitem}>
                <img
                  style={{ objectFit: "contain", cursor: "pointer" }}
                  src={item.image}
                  alt={item.title}
                />
                <div>
                  <h4 style={{ cursor: "pointer" }}>{item.title}</h4>
                  <h4 className={Style.itemprice}>₹{item.price}</h4>
                  <h4
                    style={{
                      textAlign: "unset",
                      margin: "0.5em 0 0 0",
                      lineHeight: "8px",
                    }}
                  >
                    Quantity - {item.amount}
                  </h4>
                </div>
              </article>
            );
          })}
          <h4 style={{ fontSize: "1rem" }}>
            Total Items - <span style={{ color: "green" }}>{totalItems}</span>
          </h4>
          <h4 style={{ fontSize: "1rem" }}>
            Product Price - <span style={{ color: "green" }}>₹{totalPrice}</span>
          </h4>
          <h4 style={{ fontSize: "1rem" }}>
            Delivey Cost - <span style={{ color: totalPrice>500?'green':'red'}}>₹{deliveryCost}</span>
          </h4>
          <h4 style={{ fontSize: "1rem" }}>
            Total Cost - <span style={{ color: 'red'}}>₹{deliveryCost + totalPrice}</span>
          </h4>
        </div>

        <div className= {`${Style.checkout_box} , ${Style.three}`}>
          <h5
            style={{
              margin: "0 0 .4em 0",
              fontSize: "1.2em",
              color: "rgb(34,139,34)",
            }}
          >
            Select Payment Method -
          </h5>
          <form className={Style.payment_form}>
            <div>
              <input
                type="radio"
                id="cardOrUPI"
                name="paymentMethod"
                value="cardOrUPI"
                checked={selectedPaymentMethod === "cardOrUPI"}
                onChange={handlePaymentMethodChange}
              />
              <label htmlFor="cardOrUPI" >Card or UPI</label>
              <span  style={{ width: "24px", background: "transparent" }}>
                <Card />
              </span>
            </div>

            <div>
              <input
                type="radio"
                id="cashOnDelivery"
                name="paymentMethod"
                value="cashOnDelivery"
                checked={selectedPaymentMethod === "cashOnDelivery"}
                onChange={handlePaymentMethodChange}
              />
              <label htmlFor="cashOnDelivery">Cash on Delivery</label>
              <span  style={{ width: "24px", background: "transparent" }}>
                <Cash />
              </span>
            </div>

            <button type="button" className={Style.btn} onClick={handlePlaceOrder}>
              Place Your Order
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
