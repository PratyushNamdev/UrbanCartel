import React from "react";
import Style from "../CSS/CarouselProductCard.module.css";
import { useNavigate } from "react-router-dom";
export default function CarouselProductCard(props) {
  const navigate = useNavigate();
  // Function to navigate to the product detail page when the card is clicked
  const navigateToProductDetail = () => {
    // Use the navigate function to redirect to the product detail page with the product ID
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Optional: Adds smooth scrolling animation
    });
    navigate(`/productDescription/${props.data._id}`, { state: { props } });
  };
  return (
    <div className={`${Style.card} `} onClick={navigateToProductDetail}>
      <div className={Style.card_img}>
        <img src={props.data.images[0]} alt="Product Img" />
      </div>
      <div>
        <h6 className={Style.heading}>{props.data.title}</h6>
        <p>Rating - {props.data.average_rating}</p>
        <h6 className={Style.heading}>
          ₹{props.data.selling_price_numeric}{" "}
          <strike>{props.data.actual_price}</strike> {props.data.discount}
        </h6>
      </div>
    </div>
  );
}
