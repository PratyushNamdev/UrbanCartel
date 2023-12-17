import React, { useState , useEffect } from "react";
import OtpInput from "react-otp-input";
import Style from "../CSS/VerifyOTP.module.css";
import { verifyOTP } from "../Store/Slices/AuthenticationSlice";
import { useDispatch , useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "./Loading";
export default function VerifyOTP() {
    const {userId , isLoading} = useSelector((store)=>store.authentication)
    const navigate = useNavigate();
    const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
 const handleSubmit = async ()=>{
  try{const verifyOTPResponse = await dispatch(verifyOTP({otp , userId , dispatch}));
  if(verifyOTPResponse.payload.authToken){
    console.log(verifyOTPResponse)
    toast.success("SignUp Successfull !")
    navigate("/");
  }
  else{
    throw new Error("Error");
  }
}catch(e){
    toast.error("SignUp Failed !!!")
  }
  
 }
 
 useEffect(()=>{

  if(localStorage.getItem("authToken")){
    navigate("/");
  }
  // eslint-disable-next-line
},[])
  
  return (
    <>
    {isLoading && <Loading/>}
  
    <div className={Style.otpContainer}>
    <div className={Style.otpdiv}><img src="https://res.cloudinary.com/dgxvtemh2/image/upload/v1696196075/Urban%20Cartel/VerifyOTP_cq5qfs.png" alt="enter Otp"/></div>
    <header className={Style.otpheader}>
        <h3>Enter Verification Code</h3>
        <p>Code is sent on </p>
    </header>
      <div className={Style.otpInput}>
        <OtpInput 
          value={otp}
          onChange={setOtp}
          numInputs={4}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props} />}
          containerStyle={Style.otpinputcontainer}
      inputStyle={Style.otpinput}
        />
        <button onClick={handleSubmit} className={Style.otpbtn}>Done</button>
      </div>
    </div>
    </>
  );
}
