import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import { LOGOUT } from "../Store/Slices/AuthenticationSlice";
// import { removeUser } from "../Store/Slices/UserInfoSlice";

export default function Navbar() {
  const style = {
    minWidth: "70px",
    borderRadius: "10px",
    margin: ".2em ",
    backgroundColor: "#ff9d00",
    border: "0",
    outline: "1px solid rgb(0, 0, 0)",
    padding: ".5em",
    outlineOffset: " -7px",
  };
  const { isLoggedIn } = useSelector((state) => state.authentication);
 
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const { isLoggedIn } = useSelector((state) => state.authentication);
  // const handleLogout = async () => {
  //   await dispatch(LOGOUT());
  //   await dispatch(removeUser());
  //   navigate("/");
  // };

  return (
    <div style={{maxWidth:"1400px" , margin:"0 auto"}}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand  text-dark" href="/">
          Urban Cartel
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">About</li>
          </ul>

          {!isLoggedIn && (
            <ul className="navbar-nav ">
              <li className="nav-item">
                <Link to="/login">
                  {" "}
                  <button style={style}>Login</button>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/signUp">
                  {" "}
                  <button style={style}>SignUp</button>
                </Link>
              </li>
            </ul>
          )}
          {isLoggedIn && (
            <ul className="navbar-nav ">
              {/* <li className="nav-item">
                <button style={style} onClick={handleLogout}>
                  Log Out
                </button>
              </li> */}
              <li className="nav-item">
                <Link to="/userProfile">
                  <div style={{ width: "30px", backgroundColor: "" }}>
                    <img
                      src="https://w7.pngwing.com/pngs/304/275/png-transparent-user-profile-computer-icons-profile-miscellaneous-logo-monochrome.png"
                      alt=""
                    />
                    <figcaption style={{fontSize:"10px"}}>Profile</figcaption>
                  </div>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
}
