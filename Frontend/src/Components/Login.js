import React, { useEffect, useState } from "react";
import Style from "../CSS/Signup.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { logIn } from "../Store/Slices/AuthenticationSlice";
import Loading from "./Loading";
export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isLoading} = useSelector(store => store.authentication)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);
  const handleLogin = async (e) => {
    e.preventDefault();
  try{
      // Dispatch the signUp action with formData
      const loginResponse = await dispatch(logIn({formData , dispatch}));
      console.log(loginResponse)
      // After successful sign-up, navigate to a different route
      if (loginResponse.payload?.needVerificationstatus) {
        navigate("/verifyOTP");
      }
      else if(loginResponse.payload.authToken){
          toast.success("Login Successful !")
          navigate("/")
      }
      else{
        throw Error("Error occured in the login Process")
      }
    } catch (error) {
      
      console.log(error)
     }
  };

  // Function to handle changes in form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <>
      {isLoading && <Loading/>}
    <section className={Style.container}>
      <div className={Style.signup_Container}>
        <form onSubmit={handleLogin} className={Style.form}>
          <div>
            <h1>Log-In</h1>
          </div>
          <div className={Style.form_element}>
            <input
              type="email"
              placeholder="E-Mail"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={Style.form_element}>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              autoComplete="on"
            />
          </div>
          <button className={Style.btn} type="submit">
            Log In
          </button>
        </form>
      </div>
    </section>
    </>
  );
}
