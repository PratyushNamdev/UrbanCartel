import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import img1 from "../images/Clothing & Accessories.jpeg";
import img2 from "../images/Footwear.jpeg";
import img3 from "../images/Bag , Belts and Wallets.jpeg";
import img4 from "../images/T-shirts.jpeg";
import Style from "../CSS/Home.module.css";
import { Link } from "react-router-dom";
import SearchProduct from "./SearchProduct";

export default function Home() {
 
  
  return (
    <div>
      <div className={Style.searchBox_container}>
        <SearchProduct/>
      </div>
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
                  <img src={img1} alt="img1" />
                </div>
              </Link>
              <Link to="/productCatalog/Footwear">
                <div>
                  <img src={img2} alt="img1" />
                </div>
              </Link>
              <Link to="/productCatalog/bag&belts&wallets">
                <div>
                  <img src={img3} alt="img1" />
                </div>
              </Link>
              <Link to="/productCatalog/t-shirts">
                <div>
                  <img src={img4} alt="img1" />
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
            <Link to="/productCatalog/trousers">
                <img
                  src="https://res.cloudinary.com/dgxvtemh2/image/upload/v1695670463/Urban%20Cartel/Trousers_qvzdmn.jpg"
                  alt="Trousers"
                />
                <figcaption>Trousers</figcaption>
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
          <Link to="/productCatalog/raincoat">
              <img
                src="https://res.cloudinary.com/dgxvtemh2/image/upload/v1695661170/Urban%20Cartel/RainCoat_cmrtzr.jpg"
                alt="Raincoat"
              />
              <figcaption>Raincoat</figcaption>
          </Link>
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
    </div>
  );
}
