import {  createSlice } from "@reduxjs/toolkit";
const initialState = {
  user :{
    firstName:"",
    lastName:"",
    email:"",
    number:null,
    profilePic:""

  }
};

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
            state.user.profilePic = action.payload.profilePic;

      },
      removeUser:(state)=>{
        state.user = {
         firstName : "",
          lastName : "",
          email :"",
          number :"",
          profilePic : ""
        };
      }
    }
})
export const{setUser , removeUser} = UserInfoSlice.actions;
export default UserInfoSlice.reducer;
