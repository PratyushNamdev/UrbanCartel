import React, { useEffect } from 'react'
import { getUserOrders } from '../../Store/Slices/OrderSlice';
import Style from "../../CSS/OrdersCatalog.module.css"
import {useDispatch , useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';
import OrdersCard from './OrdersCard';
import Footer from "../Footer";
import CircularLoading from "../CircularLoading";
import ServerErrorMessage from '../ServerErrorMessage';
export default function OrdersCatalog() {
    const {userOrders  ,isLoading} = useSelector((store)=>store.Order);
    const { isLoggedIn } = useSelector((store) => store.authentication);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
    if(!localStorage.getItem("authToken") || !isLoggedIn){
      navigate("/login");
      return;
    }
 

      dispatch(getUserOrders(dispatch)); 

   // eslint-disable-next-line
  }, []);

  if(isLoading){
    return (
        <div className={Style.loadingContainer}><CircularLoading/></div>
    )
  }
  if(userOrders === null){
    return(
      <>
     <ServerErrorMessage/>
      </>
    );
  }
  if(!isLoading && userOrders.length < 1){
    return (
      <section className={Style.noOrderContainer}>
      <div  className={Style.noOrderWrapper}>
        <div className={Style.noOrderImgWrapper}>
          <img src="https://res.cloudinary.com/dgxvtemh2/image/upload/v1703804027/Urban%20Cartel/6028969_qkoun8.jpg" alt="No orders yet" />
        </div>
        <div className={Style.noOrderTextBox}>
          <h3>No Orders Yet</h3>
          <p><span>Warning:</span> Your Orders section is practicing invisibility! Let's summon some items and make it reappear in grandeur!</p>
        </div>
      </div>
      <Footer/>
      </section>
    )
  }
  if(!isLoading && userOrders.length > 0){
  return (
    <div className={Style.orderCatalogContainer}>
      <h2 className={Style.heading}>Your Orders</h2>
      <div>
       {userOrders.map((data)=>{
        return <OrdersCard key={data._id} data = {data}/>
       })}
      </div>
    </div>
  )}
}
