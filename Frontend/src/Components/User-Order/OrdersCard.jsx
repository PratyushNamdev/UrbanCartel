import React from 'react'
import Style from "../../CSS/CheckoutPage&OrdersCard.module.css";
import { useNavigate } from 'react-router-dom';
import { statusColorSelector } from '../../Helper/statusColorSelector';
export default function OrdersCard(props) {
    const {data} = props;
    const navigate = useNavigate();
    const navigateToOrderDetails = ()=>{
      navigate(`/orderDescription/${data._id}` , {state:{data}})
    }
    let textColor = statusColorSelector(data.deliveryStatus);
    let year = new Date(data.created_At).getFullYear();
    let day = new Date(data.created_At).getDate();
    let month = new Date(data.created_At).getMonth()+1;
    // Determine the text color based on the value of data.deliveryStatus
    
  
    return (
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
  
        // <div className="card">
        //   <h2>Order Information</h2>
        //   <p><strong>ID:</strong> {data._id}</p>
        //   <p><strong>User ID:</strong> {data.userId}</p>
    
        //   <h3>Order Items</h3>
        //   {data.orderItems.map((item, index) => (
        //     <div key={index} className="order-item">
        //       <img src={item.image} alt={item.title} />
        //       <p><strong>Title:</strong> {item.title}</p>
        //       <p><strong>Price:</strong> ${item.price}</p>
        //       <p><strong>Amount:</strong> {item.amount}</p>
        //     </div>
        //   ))}
    
        //   <h3>Order Status</h3>
        //   <p><strong>Payment Status:</strong> {data.paymentStatus}</p>
        //   <p><strong>Delivery Status:</strong> {data.deliveryStatus}</p>
        //   <p><strong>Delivery Cost:</strong> ${data.deliveryCost}</p>
    
        //   <h3>Address</h3>
        //   <p><strong>Created At:</strong> {data.address.created_At}</p>
        // </div>
      );
    };

   