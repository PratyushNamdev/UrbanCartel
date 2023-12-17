import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { setUser } from "./UserInfoSlice";
import { setTotalItems } from "./CartSlice";
import {host} from "../../Helper/host";
// const host = process.env.REACT_APP_HOST;
const initialState = {
  userId: "",
  isLoggedIn: false,
  isLoading: false,

};
export const signUp = createAsyncThunk("/api/signUp", async (formData = {}) => {
  try {
    console.log(formData)
    const response = await fetch(
      `${host}/api/authentication/signup`,
      {
        method: "POST",
        headers: {
          'ngrok-skip-browser-warning': 'true',
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

   

    const data = await response.json();
     console.log("response data" +data)
    return data;
  } catch (e) {
    toast.error("An Error Occurred");
  
  }
});

export const verifyOTP = createAsyncThunk(
  "/api/verifyOTP",
  async (otpData = {}) => {
    try {
      console.log(otpData)
      const response = await fetch(
        `${host}/api/authentication/verifyOTP`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'ngrok-skip-browser-warning': 'true'
          },
          body: JSON.stringify(otpData),
        }
      );


      const data = await response.json();
      console.log(data)
      toast.success("daf" + data.authToken)
      if(data.authToken){
          otpData.dispatch(setUser(data.user))
         }
      return data;
    } catch (e) {
      toast.error("An Error Occurred");
      throw e;
    }
  }
);
export const logIn = createAsyncThunk("/api/login", async (formData = {}) => {
  try {
    console.log(formData)
    const response = await fetch(
      `${host}/api/authentication/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify(formData.formData),
      }
    );

    if (!response.ok) {
      throw new Error("Server responded with an error");
    }

    const data = await response.json();
    
    if(data.authToken){
   formData.dispatch(setTotalItems(data.totalItems))
    formData.dispatch(setUser(data.user))
     }
    return data;
  } catch (e) {
    toast.error("An Error Occurred");
    throw e;
  }
});

const AuthenticationSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    LOGOUT:(state)=>{
      state.isLoggedIn = false;
      state.userId = "";
      localStorage.removeItem("authToken");
     
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload.needVerificationstatus) {
          state.userId = action.payload.id;
        
        }
        else if(action.payload.error){
          toast.error("error message"+action.payload.message)
        }
         else if (action.payload.id === null || !action.payload.status) {
          toast.error("Cannot SignUP!! An error occurred");
        }
      })
      .addCase(signUp.rejected, (state) => {
        state.isLoading = false;
        toast.error("Cannot SignUP!! An error occurred");
      })
      .addCase(verifyOTP.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
       
        state.isLoading = false;
        if(action.payload.authToken){
          localStorage.setItem("authToken" , action.payload.authToken);
          console.log(action)
          state.isLoggedIn = true;
          state.userId = action.payload.user._id;
        }
        else if(action.payload.wrongOTP){
          toast.error("Wrong OTP")
        }
        else{
          toast.error(action.payload.error)
        }
       
      })
      .addCase(verifyOTP.rejected, (state) => {
        state.isLoading = false;
        toast.error("Cannot Login!! An error occurred");
      })
      .addCase(logIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload.needVerificationstatus) {
          state.userId = action.payload.id;
         
        } 
        else if (action.payload.authToken) {
            
            localStorage.setItem("authToken" , action.payload.authToken);
            state.isLoggedIn = true;
            state.userId = action.payload.user._id;
            
         
        }
        else{
            if(action.payload.wrongPassword){
              toast.error("Invalid Credentials ...!")
            }
            else{
              toast.error("someting went wrong ...!")

            }
        }
      })
      .addCase(logIn.rejected, (state) => {
        state.isLoading = false;
        toast.error("Cannot Login!! An error occurred");
      })

  },
});
export const {LOGOUT , stayLogin } = AuthenticationSlice.actions;
export default AuthenticationSlice.reducer;
