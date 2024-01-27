import React, { useEffect, useState } from "react";
import Style from "../CSS/Signup.module.css";
import { signUp } from "../Store/Slices/AuthenticationSlice";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom"
import toast from "react-hot-toast";
import Loading from "./Loading";
export default function SignUp() {
  const {isLoading} = useSelector(store => store.authentication)
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    password: "",
  });
 
  useEffect(()=>{

    if(localStorage.getItem("authToken")){
      navigate("/");
    }
    // dispatch(off())
    // eslint-disable-next-line
  },[]);
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Dispatch the signUp action with formData
      const signupResponse = await dispatch(signUp(formData));
     console.log(signupResponse)
      // After successful sign-up, navigate to a different route
      if (signupResponse.payload.needVerificationstatus) {
          navigate("/verifyOTP")
      }
    } catch (error) {
      // Handle sign-up errors
      console.log("Cannot Sign Up!! An error occurred")
      toast.error("Cannot Sign Up!! An error occurred");
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
    {isLoading &&  <Loading/>}
    <section className={Style.container}>
      <div className={Style.signup_Container}>
        <form onSubmit={handleSignup} className={Style.form}>
          <div>
            <h1>Sign-up</h1>
          </div>
          <div className={Style.form_element}>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={Style.form_element}>
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={Style.form_element}>
            <input
              type="email"
              placeholder="E-mail"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={Style.form_element}>
            <input
              type="tel"
              placeholder="Phone no."
              name="number"
              value={formData.number}
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
            Sign Up
          </button>
        </form>
      </div>
    </section>
    </>
  );
}
