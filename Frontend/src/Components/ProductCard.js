import React from 'react'
import Style from '../CSS/ProductCard.module.css';
import { useNavigate } from 'react-router-dom';
export default function ProductCard(props) {
  let a = `${Style[props.animation]}`;
 
  const navigate  = useNavigate();
  const navigateToProductDetail = ()=>{
       navigate(`/productDescription/${props.data._id}` , {state:{props}})
      
  }
    return (
   
      <div className={`${Style.card} ${a}`} onClick={navigateToProductDetail}
      >
        <div className={Style.card_img}><img src={props.data.images[0]} alt="Product Img" /></div>
        <div>
            <h5 className={Style.heading}>{props.data.title}</h5>
            <p>Rating - {props.data.average_rating}</p>
            <h6 className={Style.heading}>₹{props.data.selling_price_numeric} <strike>{props.data.actual_price}</strike> {props.data.discount}</h6>
        </div>

      </div>
    
  )
}
