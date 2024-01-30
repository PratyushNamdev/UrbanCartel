import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  CartIcon,
  ProfileIcon,
  OrderSuccessIcon,
  HomeIcon,
} from "../Helper/icon";
import Style from "../CSS/Navbar.module.css";
export default function Navbar() {
  const { totalItems } = useSelector((store) => store.cart);
  const [showNavbar, setShowNavbar] = useState(false);
  const { user } = useSelector((store) => store.userInfo);
  const { profilePic } = user;

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
    document.body.style.overflow = showNavbar ? 'auto' : 'hidden';
  };
  const hideSideBar = ()=>{
    setShowNavbar(false);
    document.body.style.overflow = 'auto';
  }
 
  const { isLoggedIn } = useSelector((state) => state.authentication);

  const amt_container = {
    position: "absolute",
    top: "-0.4rem",
    right: " -0.3rem",
    width: "1.25rem",
    height: "1.25rem",
    borderRadius: "150%",
    background: "rgba(0,0,0,0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  return (
    <nav className={Style.navbar}>
      <div className={Style.container}>
          <Link to="/">
        <div className={Style.logo}>
            <img
              src="https://res.cloudinary.com/dgxvtemh2/image/upload/v1705860267/Urban%20Cartel/ss_rbhojr.png"
              alt=""
            />
        </div>
          </Link>
        <div className={Style.menuIcon} onClick={handleShowNavbar}>
          <Hamburger />
        </div>
        <div className={`${Style.navElements} ${showNavbar && Style.active}`}>
          {!isLoggedIn && (
            <ul>
              <li  className={Style.bigScreen}>
                <Link to="/login">
                  {" "}
                  <span className={Style.btn}>Login</span>
                </Link>
              </li>
              <li  className={Style.bigScreen}>
                <Link to="/signUp">
                  {" "}
                  <span className={Style.btn}>SignUp</span>
                </Link>
              </li>
              <li className={Style.smallScreen} onClick={hideSideBar}>
                <Link to="/login">
                  <div className={Style.navItemWrapper} >
                    
                    <span className={Style.navIconText} style={{
                      margin:"1em"
                    }}>Login</span>
                  </div>
                </Link>
              </li>
              <li className={Style.smallScreen} onClick={hideSideBar}>
                <Link to="/signup">
                  <div className={Style.navItemWrapper}>
                   
                    <span className={Style.navIconText} style={{
                      margin:"1em"
                    }}>SignUp</span>
                  </div>
                </Link>
              </li>
            </ul>
          )}
          {isLoggedIn && (
            <ul>
              <li className={Style.smallScreen} onClick={hideSideBar}>
                <Link to="/">
                  <div className={Style.navItemWrapper}>
                    <div style={{ margin: "2px", width: "37px" }}>
                      <HomeIcon/>
                    </div>
                    <span className={Style.navIconText}>Home</span>
                  </div>
                </Link>
              </li>
              <li onClick={hideSideBar}>
                <Link to="/cart">
                  <div className={Style.navItemWrapper}>
                    <div
                      style={{
                        width: "40px",
                        margin: "2px",
                        position: "relative",
                        display: "block",
                      }}
                    >
                      <CartIcon />
                      <div style={amt_container}>
                        <p
                          style={{
                            marginBottom: "3px",
                            fontSize: "1rem",
                            color: "black",
                          }}
                        >
                          {totalItems}
                        </p>
                      </div>
                    </div>
                    <span className={Style.navIconText}>Cart</span>
                  </div>
                </Link>
              </li>

              <li className={Style.smallScreen} onClick={hideSideBar}>
                <Link to="/userProfile">
                  <div className={Style.navItemWrapper}>
                    <div style={{ margin: "2px", width: "37px" , height:"37px" }}>
                      {profilePic ? (
                        <img className={Style.profilePic} src={profilePic} alt="Profile" />
                      ) : (
                        <ProfileIcon />
                      )}
                    </div>
                    <span className={Style.navIconText}>Your Profile</span>
                  </div>
                </Link>
              </li>
              <li className={Style.smallScreen} onClick={hideSideBar}>
                <Link to="/orders-Catalog">
                  <div className={Style.navItemWrapper}>
                    <div style={{ margin: "2px", width: "37px" }}>
                      <OrderSuccessIcon />
                    </div>
                    <span className={Style.navIconText}>Your Orders</span>
                  </div>
                </Link>
              </li>

              <li className={Style.bigScreen}>
                <div className={Style.dropdown}>
                  <div className={Style.dropbtn}>
                    {profilePic ? (
                      <img className={Style.profilePic} src={profilePic} alt="Profile" />
                    ) : (
                      <ProfileIcon />
                    )}
                  </div>
                  <div className={Style.dropdownContent}>
                    <Link to="/userProfile">
                      <div className={Style.navItemWrapper}>
                        <div style={{ margin: "2px", width: "37px" , height:"37px"}}>
                          {profilePic ? (
                            <img className={Style.profilePic} src={profilePic} alt="Profile" />
                          ) : (
                            <ProfileIcon />
                          )}
                        </div>
                        <span>Your Profile</span>
                      </div>
                    </Link>
                    <Link to="/orders-Catalog">
                      <div className={Style.navItemWrapper}>
                        <div style={{ margin: "2px", width: "37px" }}>
                          <OrderSuccessIcon />
                        </div>
                        <span>Your Orders</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

const Hamburger = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="52"
    height="24"
    viewBox="0 0 52 24"
  >
    <g id="Group_9" data-name="Group 9" transform="translate(-294 -47)">
      <rect
        id="Rectangle_3"
        data-name="Rectangle 3"
        width="42"
        height="4"
        rx="2"
        transform="translate(304 47)"
        fill="#574c4c"
      />
      <rect
        id="Rectangle_5"
        data-name="Rectangle 5"
        width="42"
        height="4"
        rx="2"
        transform="translate(304 67)"
        fill="#574c4c"
      />
      <rect
        id="Rectangle_4"
        data-name="Rectangle 4"
        width="52"
        height="4"
        rx="2"
        transform="translate(294 57)"
        fill="#574c4c"
      />
    </g>
  </svg>
);
