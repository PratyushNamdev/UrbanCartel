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
   // Select relevant data from the Redux store
    const {userOrders  ,isLoading} = useSelector((store)=>store.Order);
    const { isLoggedIn } = useSelector((store) => store.authentication);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // useEffect to fetch user orders on component mount
    useEffect(()=>{
       // Redirect to login if not authenticated
    if(!localStorage.getItem("authToken") || !isLoggedIn){
      navigate("/login");
      return;
    }
 
 // Dispatch action to fetch user orders
      dispatch(getUserOrders(dispatch)); 

   // eslint-disable-next-line
  }, []);
// Loading state while fetching data
  if(isLoading){
    return (
        <div className={Style.loadingContainer}><CircularLoading/></div>
    )
  }
  // Server error message if unable to fetch data
  if(userOrders === null){
    return(
      <>
     <ServerErrorMessage/>
      </>
    );
  }
    // Display a message if the user has no orders
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
  // Display user orders if available
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
