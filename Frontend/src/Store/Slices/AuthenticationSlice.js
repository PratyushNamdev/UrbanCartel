import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { setUser } from "./UserInfoSlice";
// import { useDispatch } from "react-redux";
const host = process.env.REACT_APP_HOST;
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
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

   

    const data = await response.json();
   console.log(data)
    return data;
  } catch (e) {
    toast.error("An Error Occurred");
  
  }
});

export const verifyOTP = createAsyncThunk(
  "/api/verifyOTP",
  async (otpData = {}) => {
    try {
      const response = await fetch(
        `${host}/api/authentication/verifyOTP`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(otpData),
        }
      );

      if (!response.ok) {
        throw new Error("Server responded with an error");
      }

      const data = await response.json();
      if(data.authToken){
   
        //   console.log("user" + data.payload.user)
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
        },
        body: JSON.stringify(formData.formData),
      }
    );

    if (!response.ok) {
      throw new Error("Server responded with an error");
    }

    const data = await response.json();
    console.log(data.user)
    
    if(data.authToken){
   
    //   console.log("user" + data.payload.user)
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
      localStorage.removeItem("authToken");
     
    },
    stayLogin:(state)=>{
      state.isLoggedIn = true;
      // state.user = JSON.parse( localStorage.getItem("user"));
     // console.log(JSON.parse( localStorage.getItem("user")));
    }
    
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
         console.log(action.payload)
        } else if (action.payload.id === null || !action.payload.status) {
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
       // const dispatch = useDispatch();
        state.isLoading = false;
        if(action.payload.authToken){
          localStorage.setItem("authToken" , action.payload.authToken);
          // dispatch(setUser(action.payload.user));
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
           // const dispatch = useDispatch();
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
