import React, { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Style from "../CSS/Home.module.css";
import { Link } from "react-router-dom";
import SearchProduct from "./SearchProduct";
import Footer from "./Footer";
//import CartItem from "./CartItem";
// import {  useDispatch  } from "react-redux";
// import { stayLogin  } from "../Store/Slices/AuthenticationSlice";
// import { setUser } from "../Store/Slices/UserInfoSlice";
export default function Home() {
  // const {user} = useSelector((state)=>state.authentication)
  // const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      // dispatch(stayLogin());
      // dispatch(setUser());
    }
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className={Style.searchBox_container}>
        <div>
          <SearchProduct />{" "}
        </div>
      </div>
      {/* <CartItem/> */}
      <div className={Style.container}>
        <div className={Style.sub_container}>
          <div className={Style.carousel_container}>
            <Carousel
              showThumbs={false}
              infiniteLoop={true}
              autoPlay={true}
              showStatus={false}
              dynamicHeight={true}
            >
              <Link to="/productCatalog/clothing&accessories">
                <div>
                  <img
                    src="https://res.cloudinary.com/dgxvtemh2/image/upload/v1695661208/Urban%20Cartel/Clothing_Accessories_d5obb8.jpg"
                    alt="img1"
                  />
                </div>
              </Link>

              <Link to="/productCatalog/bag&belts&wallets">
                <div>
                  <img
                    src="https://res.cloudinary.com/dgxvtemh2/image/upload/v1695661204/Urban%20Cartel/Bag_Belts_and_Wallets_ieudcl.jpg"
                    alt="img1"
                  />
                </div>
              </Link>
              <Link to="/productCatalog/t-shirts">
                <div>
                  <img
                    src="https://res.cloudinary.com/dgxvtemh2/image/upload/v1695661199/Urban%20Cartel/T-shirts_mapxf0.jpg"
                    alt="img1"
                  />
                </div>
              </Link>
              <Link to="/productCatalog/raincoat">
                <div>
                  <img
                    src="https://res.cloudinary.com/dgxvtemh2/image/upload/v1705856519/Urban%20Cartel/wepik-export-20240121170017U29E_vs454t.jpg"
                    alt="Raincoat"
                  />
                </div>
              </Link>
            </Carousel>
          </div>
          <div className={Style.category_container_I}>
            <div className={Style.img_box_I}>
              <Link to="/productCatalog/shirts">
                <img
                  src="https://res.cloudinary.com/dgxvtemh2/image/upload/v1695661194/Urban%20Cartel/shirt_uhjs6n.jpg"
                  alt="Shirts"
                />
                <figcaption>Shirts</figcaption>
              </Link>
            </div>
            <div className={Style.img_box_I}>
              <Link to="/productCatalog/t-shirts">
                <img
                  src="https://res.cloudinary.com/dgxvtemh2/image/upload/v1695661192/Urban%20Cartel/T_pthyfl.jpg"
                  alt="T-Shirts"
                />
                <figcaption>T-shirts</figcaption>
              </Link>
            </div>
            <div className={Style.img_box_I}>
              <Link to="/productCatalog/cap">
                <img
                  src="https://res.cloudinary.com/dgxvtemh2/image/upload/v1695661189/Urban%20Cartel/Cap_eyokjy.jpg"
                  alt="Caps"
                />
                <figcaption>Caps</figcaption>
              </Link>
            </div>
            <div className={Style.img_box_I}>
             
                <Link to="/productCatalog/Footwear">
                  <img
                    src="https://res.cloudinary.com/dgxvtemh2/image/upload/v1695661210/Urban%20Cartel/Footwear_suo9ba.jpg"
                    alt="img1"
                  />
                  <figcaption>Foot Wear</figcaption>
                </Link>
           
            </div>
          </div>
        </div>

        <div className={Style.category_container_II}>
          <div className={Style.img_box_II}>
            <Link to="/productCatalog/tracksuits">
              <img
                src="https://res.cloudinary.com/dgxvtemh2/image/upload/v1695661181/Urban%20Cartel/TrackSuit_ocapwj.jpg"
                alt="Track Suit"
              />
              <figcaption>Track Suit</figcaption>
            </Link>
          </div>
          <div className={Style.img_box_II}>
            <Link to="/productCatalog/winterwear">
              <img
                src="https://res.cloudinary.com/dgxvtemh2/image/upload/v1695661174/Urban%20Cartel/Winterwear_npcb1h.jpg"
                alt="Winterwear"
              />
              <figcaption>Winter wear</figcaption>
            </Link>
          </div>
          <div className={Style.img_box_II}>
            <img
              src="https://res.cloudinary.com/dgxvtemh2/image/upload/v1695670463/Urban%20Cartel/Trousers_qvzdmn.jpg"
              alt="Trousers"
            />
            <figcaption>Trousers</figcaption>
          </div>
          <div className={Style.img_box_II}>
            <Link to="/productCatalog/kurtas">
              <img
                src="https://res.cloudinary.com/dgxvtemh2/image/upload/v1695661141/Urban%20Cartel/Kurta_bdgl5o.jpg"
                alt="Kurtas"
              />
              <figcaption>Kurtas</figcaption>
            </Link>
          </div>
          <div className={Style.img_box_II}>
            <Link to="/productCatalog/sleepwear">
              <img
                src="https://res.cloudinary.com/dgxvtemh2/image/upload/v1695661183/Urban%20Cartel/Nightwear_sc1wfk.jpg"
                alt="Nightwear"
              />
              <figcaption>Night wear</figcaption>
            </Link>
          </div>
          <div className={Style.img_box_II}>
            <Link to="/productCatalog/jeans">
              <img
                src="https://res.cloudinary.com/dgxvtemh2/image/upload/v1695661186/Urban%20Cartel/Jeans_gjnnsd.jpg"
                alt="Jeans"
              />
              <figcaption>Jeans</figcaption>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
