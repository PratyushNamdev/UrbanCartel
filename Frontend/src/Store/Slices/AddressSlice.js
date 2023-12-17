import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { setLoadingProgress } from "./LoadingBarSlice";
// const host = process.env.REACT_APP_HOST;
import {host} from "../../Helper/host";
const initialState = {
  addresses: [],
  selectedAddress:{},
  isLoading: false,
};
export const getAddress = createAsyncThunk(
  "/address/fetchAddress",
  async (dispatch) => {
    dispatch(setLoadingProgress(70))
    try {
      const response = await fetch(`${host}/api/address/fetchAddress`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authToken: localStorage.getItem("authToken"),
          'ngrok-skip-browser-warning': 'true'
        },
      });
      const data = await response.json();
      dispatch(setLoadingProgress(100))
      return data;
    } catch (e) {
      toast.error("Something went wrong");
    }
  }
);
export const addAddress = createAsyncThunk("/address/addNewAddress" , async(address = {} )=>{
  console.log(address)
   address.dispatch(setLoadingProgress(70))
   try{
     const response = await fetch(`${host}/api/address/addNewAddress` , {
       method:"POST",
       headers:{
         "Content-Type": "application/json",
         authToken: localStorage.getItem("authToken"),
         'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify(address.selectedAddress)
      });
    const data = await response.json();
    
    address.dispatch(setLoadingProgress(100))
    return data;
  }catch(e){
    toast.error("something went wrong");
  }
})
export const updateAddress = createAsyncThunk("/address/updateAddress" , async(address = {})=>{
  address.dispatch(setLoadingProgress(70))
  try{
    const response = await fetch(`${host}/api/address/updateAddress/${address.id}` , {
      method:"PUT",
      headers:{
        "Content-Type": "application/json",
        authToken: localStorage.getItem("authToken"),
        'ngrok-skip-browser-warning': 'true'
      },
      body: JSON.stringify(address.obj)
    });
    const data = await response.json();
    
    address.dispatch(setLoadingProgress(100))
    return data;
  }catch(e){
    toast.error("something went wrong");
  }
})
const AddressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    selectAddress:(state , action)=>{
      console.log(action.payload)
      
        state.selectedAddress = action.payload;
      
    },
    clearAddress:(state)=>{
      state.addresses = [];
      state.selectedAddress = {};
      state.address = []
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAddress.pending , (state)=>{
        state.isLoading = true;
    })
    .addCase(getAddress.fulfilled , (state , action)=>{
        state.isLoading = false;
        if(action.payload?.error){
            toast.error("Someting went wrong");
        }
        if(action.payload?.address){
            state.addresses = action.payload.address;
           
        }
       
    })
    .addCase(getAddress.rejected , (state)=>{
        state.isLoading = false;
        toast.error("Something went wrong");
    })
  
   .addCase(addAddress.pending , (state)=>{
        state.isLoading = true;
    })
    .addCase(addAddress.fulfilled , (state , action)=>{
        state.isLoading = false;
        if(action.payload.error){
           if(Array.isArray(action.payload.message)){
             toast.error(action.payload.message[0].msg);
            }
            else{
             toast.error(action.payload.message);

           }
        }
        if(action.payload.address){
            state.selectedAddress = action.payload.address;
          
        }
       
    })
    .addCase(addAddress.rejected , (state)=>{
        state.isLoading = false;
        toast.error("Something went wrong");
    })
   .addCase(updateAddress.pending , (state)=>{
        state.isLoading = true;
    })
    .addCase(updateAddress.fulfilled , (state , action)=>{
        state.isLoading = false;
        if(action.payload.error){
            toast.error(action.payload.message);
        }
        if(action.payload.success){
          state.selectedAddress = action.payload.address;
        }
       
    })
    .addCase(updateAddress.rejected , (state)=>{
        state.isLoading = false;
        toast.error("Something went wrong");
    })
  },
});
export const {selectAddress , clearAddress} = AddressSlice.actions;
export default AddressSlice.reducer;
