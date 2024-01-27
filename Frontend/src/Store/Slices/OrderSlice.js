import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { setLoadingProgress } from "./LoadingBarSlice";
// const host = process.env.REACT_APP_HOST;
import {host} from "../../Helper/host";
const initialState = {
  userOrders: [],
  isLoading : false
};
export const getUserOrders = createAsyncThunk("/api/order/getOrderItems" , async(dispatch)=>{
    try{
        dispatch(setLoadingProgress(70));
        const response = await fetch(`${host}/api/order/getOrderItems` , {
          method:"GET",
            headers:{
            'ngrok-skip-browser-warning': 'true',
            authToken : localStorage.getItem("authToken")
          }
        });
  
        const data = await response.json();
        console.log(data);
        dispatch(setLoadingProgress(100));
        return data;
        
    }catch(e){
        dispatch(setLoadingProgress(100));
        return({error:true , message:"Something went wrong"});
      }
})
const OrderSlice = createSlice({
    name:"Order",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(getUserOrders.pending , (state , action)=>{
         state.isLoading = true;
        })
        .addCase(getUserOrders.fulfilled , (state , action)=>{
            
            state.isLoading = false;
            if(action.payload?.success){
                state.userOrders = action.payload.orderItems;
                console.log(state.userOrders)
            }
            else if(action.payload?.error){
                toast.error(action.payload.message);
                state.userOrders = null;
            }
            else{
                toast.error("Something went Wrong ")
            }
        })
        .addCase(getUserOrders.rejected , (state , action)=>{
            state.isLoading = false;
           })
       

    }
})

export default OrderSlice.reducer;
