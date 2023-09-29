import React from "react";
import { useLocation } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Style from "../CSS/ProductDetail.module.css";
export default function ProductDetail() {
  const location = useLocation();
  const { props } = location.state;
  const { data } = props;

  return (
    <section>
      <div className={Style.container}>
        <div className={Style.carousel_container}>
          <Carousel
            className={Style.carousel}
            infiniteLoop={true}
            autoPlay={true}
            showStatus={false}
           thumbWidth={60}
           
          >
            {data.images.map((img) => {
              return (
                <div key={img} className={Style.carousel_div}>
                  <img src={img} alt="img" />
                </div>
              );
            })}
          </Carousel>
        </div>
        <div className={Style.productdetails}>
          <h6 style={{padding:0, margin:0}}>Urban Cartel</h6>
          <h5>{data.title}</h5>
          <details>{data.description}</details>
          <div >
            <h6 style={{margin:0}}>
              ₹{data.selling_price_numeric} <strike>{data.actual_price}</strike>{" "}
              <span style={{ color: "green" }}>{data.discount}</span>
            </h6>
            <span style={{fontSize:"10px"}}>Inclusive of all taxes</span>
          </div>
          <div>
            <button className={`${Style.btn} ${Style.primary_btn}`}>Add to Cart</button>
            <button className={Style.btn}>WishList</button>
          </div>
        </div>
      </div>

      <div className={Style.table_container}>
      <table className={Style.responsivetable}>
  <thead>
    <tr>
      <th>Specification</th>
    </tr>
  </thead>
  <tbody>
    {data.product_details.map((item, index) => (
      <tr key={index}>
        {Object.keys(item).map((key) => (
          <React.Fragment key={key}>
            <td>{key}</td>
            <td>{item[key]}</td>
          </React.Fragment>
        ))}
      </tr>
    ))}
  </tbody>
</table>

      </div>
    </section>
  );
}
