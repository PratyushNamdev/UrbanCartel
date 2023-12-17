import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { CartIcon } from "../Helper/icon";
import "../CSS/Navbar.css"
export default function Navbar() {
  const { totalItems } = useSelector((store) => store.cart);
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };
  const style = {
    minWidth: "70px",
    borderRadius: "10px",
    margin: ".2em ",
    backgroundColor: "#ff9d00",
    border: "0",
    outline: "1px solid rgb(0, 0, 0)",
    padding: ".8em",
    outlineOffset: " -7px",
  };
  const { isLoggedIn } = useSelector((state) => state.authentication);

const amt_container = {
  position: "absolute",
  top: "-0.4rem",
  right:" -0.3rem",
  width: "1.25rem",
  height:"1.25rem",
  borderRadius: "150%",
  background: "rgba(0,0,0,0.3)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}
  return (
    // <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
    //   <nav className="navbar navbar-expand-lg navbar-light bg-light">
    //     <a className="navbar-brand  text-dark" href="/">
    //       Urban Cartel
    //     </a>
    //     <button
    //       className="navbar-toggler"
    //       type="button"
    //       data-toggle="collapse"
    //       data-target="#navbarSupportedContent"
    //       aria-controls="navbarSupportedContent"
    //       aria-expanded="false"
    //       aria-label="Toggle navigation"
    //     >
    //       <span className="navbar-toggler-icon"></span>
    //     </button>

    //     <div className="collapse navbar-collapse" id="navbarSupportedContent">
    //       <ul className="navbar-nav mr-auto">
    //         <li className="nav-item"></li>
    //       </ul>

         
    //     </div>
    //   </nav>
    // </div>
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          Urban Cartel
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <Hamburger />
        </div>
        <div className={`nav-elements  ${showNavbar && "active"}`}>
          
        {!isLoggedIn && (
            <ul>
              <li>
                <Link to="/login">
                  {" "}
                  <button style={style}>Login</button>
                </Link>
              </li>
              <li>
                <Link to="/signUp">
                  {" "}
                  <button style={style}>SignUp</button>
                </Link>
              </li>
            </ul>
          )}
           {isLoggedIn && (
            <ul>
              <li   >
                <Link to="/cart">
                  <div style={{ width: "35px", margin: "3px" , position:"relative", display:"block" }}>
                    <CartIcon />
                    <div style={amt_container}>
                      <p
                      style={{
                        marginBottom: "3px",
                        fontSize: "1rem",
                        color:"black"
                      }}

                    >{totalItems}</p></div>
                  </div>
                  
                </Link>
              </li>
          
              <li className="nav-item ml-1" >
                <Link to="/userProfile">
                  <div style={{ width: "35px", margin: "2px" }}>
                    <img
                      src="https://w7.pngwing.com/pngs/304/275/png-transparent-user-profile-computer-icons-profile-miscellaneous-logo-monochrome.png"
                      alt=""
                    />
                   
                  </div>
                </Link>
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



