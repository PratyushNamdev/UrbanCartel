import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Style from "../../CSS/OrdersDetail.module.css"
import { statusColorSelector } from '../../Helper/statusColorSelector';
export default function OrdersDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const {data} = location.state;
    let year = new Date(data.created_At).getFullYear();
    let day = new Date(data.created_At).getDate();
    let month = new Date(data.created_At).getMonth()+1;
    let deliveryStatusClr = statusColorSelector(data.deliveryStatus)
    let paymentStatusClr = statusColorSelector(data.paymentStatus)
    let itemCost = 0;
    let totalItems = 0;
   
  return (
    <section className={Style.container}>
      <div >
        <div >
          <h3>Order Details</h3>
          <div className={Style.orderBox}>
            <div>
              <span>Ordered on</span>  <span>{`${day}-${month}-${year}`}</span>
            </div>
            <div><span>Order#</span> <span>{data._id}</span></div>
            <div><span>Total Products</span> <span>{data.orderItems.length}</span></div>
          </div>
        </div>
        <div >
          <h3>Shipment Details</h3>
          <div className={Style.orderBox}>
            <div  className={Style.statusBox}>
              <span>Delivery Status</span><span style={{color:deliveryStatusClr}}> {data.deliveryStatus}</span>
            </div>
            <section>
            {data.orderItems.map((item) => {
              itemCost += item.amount * item.price;
              totalItems += item.amount;
              return (
        
                <article key={item._id} className={Style.orderItem} onClick={()=>{
                  navigate(`/productDescription/${item.productId}`);
                }}>
                  <img
                    style={{ objectFit: "contain", cursor: "pointer" }}
                    src={item.image}
                    alt={item.title}
                  />
                  <div>
                    <h4>{item.title}</h4>
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
            </section>
            <div><span>Total Items</span><span>{totalItems}</span></div>
          </div>
        </div>
      </div>

      <div>
        <div  >
          <h3>Payment Details</h3>
          <div className={Style.orderBox}>
          <div  className={Style.statusBox}>
              <span>Payment Status</span><span style={{color:paymentStatusClr}}> {data.paymentStatus}</span>
            </div>
              <h5>Shipping Address</h5>
              <p>
                {data.address.name} <br />
                {data.address.mainAddress} <br />
                {data.address.areaAddress} <br />
                {(data.address.landmark !== "" )?(<>{data.address.landmark} <br /></>) :""}
                {data.address.townOrCity} {data.address.state} {data.address.pincode}
              </p>
          </div>
        </div>
        <div >
          <h3>Order Summary</h3>
          <div className={Style.orderBox}>
          <div>
            <span>Items:</span> <span>{itemCost}</span>
          </div>
          <div>
            <span>Delivery Cost:</span> <span>{data.deliveryCost }</span>
          </div>
          <div>
            <h4>Order Total :</h4> <span style={{color:"red"}}>₹ {data.deliveryCost + itemCost}</span>
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}
