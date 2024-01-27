import React from 'react'
import Style from "../../CSS/CheckoutPage&OrdersCard.module.css";
import { useNavigate } from 'react-router-dom';
import { statusColorSelector } from '../../Helper/statusColorSelector';
export default function OrdersCard(props) {
    // Destructure data from props
    const {data} = props;
     // Initialize navigate function from react-router-dom
    const navigate = useNavigate();
    // Function to navigate to order details page
    const navigateToOrderDetails = ()=>{
      navigate(`/orderDescription/${data._id}` , {state:{data}})
    }
    // Determine text color based on the value of data.deliveryStatus
    let textColor = statusColorSelector(data.deliveryStatus);
    // Extract year, day, and month from created_At date
    let year = new Date(data.created_At).getFullYear();
    let day = new Date(data.created_At).getDate();
    let month = new Date(data.created_At).getMonth()+1;
   
    
  
    return (
        // Container for the order card with click event to navigate to order details
      <div className= {`${Style.checkout_box} , ${Style.two}`} onClick={navigateToOrderDetails} >
      {data.orderItems.map((item) => {
        return (
          <article key={item._id} className={Style.cartitem}>
            <img
              style={{ objectFit: "contain", cursor: "pointer" }}
              src={item.image}
              alt={item.title}
            />
            <div>
              <h4 style={{ cursor: "pointer" }}>{item.title}</h4>
              
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
            <div>

            </div>
          </article>
        );
      })}
     <div>
       <h4 className={Style.card_info_heading}>Ordered on - <small style={{color:"green"}}>{`${day}-${month}-${year}`}</small> </h4>
       <h4 className={Style.card_info_heading}>Delivery Status - <small style={{color:textColor}}>{data.deliveryStatus}</small> </h4>
     </div>
    </div>
  
      );
    };

   