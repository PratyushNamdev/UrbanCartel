import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../Store/Slices/AuthenticationSlice";
import { removeUser } from "../Store/Slices/UserInfoSlice";
import toast from "react-hot-toast";
export default function UserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await dispatch(LOGOUT());
    await dispatch(removeUser());
    navigate("/");
    toast.success("Logout Successful");
  };
  useEffect(()=>{
    if(!localStorage.getItem("authToken")){
      navigate("/login");
      return;
    }
    // eslint-disable-next-line
  },[])
  const style = {
    minWidth: "70px",
    borderRadius: "10px",
    margin: ".2em ",
    backgroundColor: "#FF0000",
    border: "0",
    outline: "1px solid rgb(0, 0, 0)",
    padding: ".5em",
    outlineOffset: " -7px",
  };
  return (
    <>
      <button style={style} onClick={handleLogout}>
        Log Out
      </button>
      
    </>
  );
}
