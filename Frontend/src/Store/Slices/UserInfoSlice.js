import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setLoadingProgress } from "./LoadingBarSlice";
import { host } from "../../Helper/host";
import toast from "react-hot-toast";
const initialState = {
  isLoading :false,
  user :{
    firstName:"",
    lastName:"",
    email:"",
    number:null,
    profilePic: null,
  
  }
};
export const editProfile = createAsyncThunk("/user/editProfile" , async (formData = {})=>{
  const {firstName , lastName , newProfilePic , dispatch} = formData;
  console.log(firstName )
dispatch(setLoadingProgress(40));
try{
  const response = await fetch(`${host}/user/editProfile` , {
    method:"PUT",
    headers:{
      'ngrok-skip-browser-warning': 'true',
            "authToken": localStorage.getItem("authToken"),
            "Content-Type": "application/json"
    },
    body: JSON.stringify({firstName , lastName , newProfilePic})
        
  });

  dispatch(setLoadingProgress(70));
  const data = await response.json();
  console.log(data)
  dispatch(setLoadingProgress(100));
  return data;
}
catch(e){
  dispatch(setLoadingProgress(100));
 return ({error:true , message:"Something went wrong."})
}
})
const UserInfoSlice = createSlice({
    name : "UserInfo",
    initialState,
    reducers:{
      setUser:(state , action)=>{
        console.log(action.payload.firstName)
            state.user.firstName = action.payload.firstName;
            state.user.lastName = action.payload.lastName;
            state.user.email = action.payload.email;
            state.user.number = action.payload.number;
            state.user.profilePic = action.payload.profilePic.url;

      },
      removeUser:(state)=>{
        state.user = {
         firstName : "",
          lastName : "",
          email :"",
          number :"",
          profilePic : null
        };
      }
    },
    extraReducers:(builder)=>{
      builder
      .addCase(editProfile.pending , (state)=>{
        state.isLoading = true;
      })
    .addCase(editProfile.fulfilled , (state , action)=>{
      state.isLoading = false;
       if(action.payload?.error){
        toast.error(action.payload.message);
       }
        if(action.payload?.success){
          console.log(action.payload.updatedProfile)
         state.user.firstName = action.payload.updatedProfile.firstName;
         state.user.lastName = action.payload.updatedProfile.lastName;
         state.user.profilePic = action.payload.updatedProfile.profilePic.url;
          toast.success("Profile Updated")
        }
        

    })
    .addCase(editProfile.rejected , (state )=>{
        state.isLoading = false;
        toast.error("Server Error");
    })

    }
})
export const{setUser , removeUser} = UserInfoSlice.actions;
export default UserInfoSlice.reducer;
