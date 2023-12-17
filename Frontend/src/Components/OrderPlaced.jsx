import React from 'react'
import Style from "../CSS/OrderPlaced.module.css"
import Footer from "./Footer"
import {  useNavigate} from "react-router-dom";
import {setTotalItems} from "../Store/Slices/CartSlice";
import { useDispatch } from 'react-redux';
//import { useSelector } from 'react-redux';
export default function OrderPlaced() {
 // const {userId} = useSelector((store)=>store.authetication);
  const navigate = useNavigate();
  const dispatch = useDispatch();
//   const {user} = useParams();
//   useEffect(()=>{
//     if(!userId || userId !== user ){
//       return navigate("/");
//     }
//  // eslint-disable-next-line
//   },[])
  return (
    <>
    <div className={Style.container}>
        <div >
        <div className={Style.img_box}><img src="https://res.cloudinary.com/dgxvtemh2/image/upload/v1699473629/Urban%20Cartel/orderplaced_zmijrf.png" alt="Order Placed" /></div>
        <div className={Style.text_box}>
            <h2 className={Style.heading}>Order placed successfully.</h2>
            <p className={Style.text}>Thank you for shopping with us.</p>
            <button onClick={()=>{
              dispatch(setTotalItems(0));
              navigate("/");
            }}>Continue Shopping</button>
        </div>
      </div>
    </div>
  <Footer/>
    </>
  )
}
