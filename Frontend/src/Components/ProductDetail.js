import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Style from "../CSS/ProductDetail.module.css";
import { addToCart } from "../Store/Slices/CartSlice";
import Footer from "./Footer";
// import {host} from "../Helper/host";
import { api } from "../Services/api";
import RelatedProductCarousel from "./RelatedProductCarousel";
// import Loading from "./Loading";
import { setLoadingProgress } from "../Store/Slices/LoadingBarSlice";
import { useDispatch, useSelector } from "react-redux";
export default function ProductDetail() {
  const { userId } = useSelector((store) => store.authentication);
  // const {isLoading } = useSelector((store)=>store.cart)
  const navigate = useNavigate();
  const location = useLocation();
  const { productId } = useParams();
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  // const host = process.env.REACT_APP_HOST;
  const handleAddTOCart = () => {
    if (!localStorage.getItem("authToken")) {
      navigate("/login");
      return;
    }

    dispatch(
      addToCart({
        title: data.title,
        price: data.selling_price_numeric,
        pId: data._id,
        userId,
        image: data.images[0],
        dispatch,
      })
    );
  };

  const getData = async () => {
    try {
      dispatch(setLoadingProgress(70));
      // const response = await fetch(`${host}/api/product/products?id=${productId}`);
      // const responseData = await response.json();
      const responseData = await api.get(
        `/api/product/products?id=${productId}`
      );
      console.log(responseData);
      setData(responseData.data);
      dispatch(setLoadingProgress(100));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    if (location.state?.props) {
      const { props } = location.state;

      setData(props.data);
    } else {
      getData();
    }
    // eslint-disable-next-line
  }, [location.state, productId]);

  if (!data || !data.title) {
    return <></>;
  }
  return (
    <>
      <section className={Style.container}>
        {/* <div className={Style.container}> */}
        <div className={Style.productDetail_wrapper}>
          <div className={Style.carousel_container}>
            <Carousel
              className={Style.carousel}
              infiniteLoop={true}
              autoPlay={true}
              showStatus={false}
              showThumbs={false}
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
          <div className={Style.productInfo_container}>
            <div className={Style.productdetails}>
              <h5 style={{ padding: 0, margin: 0 }}>Urban Cartel</h5>
              <h5 className={Style.title}>{data.title}</h5>
              <details>{data.description}</details>
              <div className={Style.priceBox}>
                <h6 style={{ margin: 0 }}>
                  ₹{data.selling_price_numeric}{" "}
                  <strike>{data.actual_price}</strike>{" "}
                  <span style={{ color: "green" }}>{data.discount}</span>
                </h6>
                <span style={{ fontSize: "10px" }}>Inclusive of all taxes *</span>
              </div>
              <div>
                <button
                  className={`${Style.btn} ${Style.primary_btn}`}
                  onClick={handleAddTOCart}
                >
                  Add to Cart
                </button>
                <button className={Style.btn}>WishList</button>
              </div>
            </div>
            {/* </div> */}
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
          </div>
        </div>

        <div className={Style.relatedProductCarouselContainer}>
          <h4>You may also like</h4>
          <RelatedProductCarousel sub_category={data.sub_category} />
        </div>
      </section>
      <Footer />
    </>
  );
}
