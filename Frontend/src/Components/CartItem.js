import React from 'react'
import Style from "../CSS/CartItem.module.css";
import { ChevronDown , ChevronUp } from '../Helper/icon';
import { useDispatch } from 'react-redux';
import { addToCart , removeFromCart } from '../Store/Slices/CartSlice';
import { useNavigate } from 'react-router-dom';

export default function CartItem(props) {
 const navigate = useNavigate();
  const dispatch = useDispatch();
  const {image , title , price , amount , userId , pId} = props.data;
    return (
    <div>
      <article className={Style.cartitem}>
      <img style={{objectFit:"contain" , cursor:'pointer'}} src={image} alt={title}  onClick={()=>{
      navigate(`/productDescription/${pId}`);
    }}/>
      <div  >
        <h4 onClick={()=>{
      navigate(`/productDescription/${pId}`);
    }} style={{cursor:'pointer'}}>{title}</h4>
        <h4 className={Style.itemprice}>₹{price}</h4>
        {/* remove button */}
        <button className={Style.removebtn} onClick={()=>{
         dispatch(removeFromCart({pId , userId , dispatch , removeProduct:true} ))
          }}>remove</button>
      </div>
      <div>
        {/* increase amount */}
        <button className={Style.amountbtn} onClick={ ()=>{  dispatch(addToCart({ pId , userId , dispatch}));
       
      }}>
          <ChevronUp />
        </button>
        {/* amount */}
        <p className={Style.amount}>{amount}</p>
        {/* decrease amount */}
        <button className={Style.amountbtn} onClick={()=>{
         dispatch(removeFromCart({pId , userId , dispatch , removeProduct:false} ))
          }}>
          <ChevronDown />
        </button>
      </div>
    </article>
    </div>
  )
}
