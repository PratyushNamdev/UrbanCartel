import React from "react";
import Style from "../CSS/ProductCard.module.css";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
export default function ProductCard(props) {
  let a = `${Style[props.animation]}`;

  const navigate = useNavigate();
  const navigateToProductDetail = () => {
    navigate(`/productDescription/${props.data._id}`, { state: { props } });
  };
  return (
    <div className={`${Style.card} ${a}`} onClick={navigateToProductDetail}>
      <div className={Style.card_img}>
        <img src={props.data.images[0]} alt="Product Img" />
      </div>
      <div className={Style.card_text_wrapper}>
        <em>Urban Cartel</em>
         <br />
        <span>{props.data.title}</span>
        <div>
          <ReactStars
            count={5}
            value={parseInt(props.data.average_rating)}
            edit={false}
            size={25}
          /> <span>({props.data.average_rating})</span>
        </div>
        <span>₹<span className={Style.price}>{props.data.selling_price_numeric}</span> <strike>{props.data.actual_price}</strike> <span className={Style.discount}>{props.data.discount}</span></span> 
       {props.data.selling_price_numeric>=500? <span className={Style.free_delivery_box}>Free Delivery</span>: ""} <br />
      </div>
    </div>
  );
}
