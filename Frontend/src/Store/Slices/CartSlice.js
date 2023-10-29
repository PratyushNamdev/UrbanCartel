import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
const host = process.env.REACT_APP_HOST;
const initialState = {
  cartItems: [],
  totalItems: 0,
  totalPrice: 0,
  isLoading: false,
};
export const getCartItems = createAsyncThunk("/api/fetchCartProducts", async () => {
    const response = await fetch(`${host}/api/cart/fetchCartProducts`, {
        method:"GET",
        headers:{
          
            "authToken": localStorage.getItem("authToken")
        },
       
    })
    const data = await response.json();
    return data;
});
export const addToCart = createAsyncThunk("/api/addToCart" , async (ProductData ={})=>{
    const response = await fetch(`${host}/api/cart/addToCart`, {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "authToken": localStorage.getItem("authToken")
        },
        body: JSON.stringify(ProductData)
       
    })
    const data = await response.json();
    if(ProductData.dispatch){
        if(data.success){
            ProductData.dispatch(getCartItems());
        }
    }
    return data;
})
export const removeFromCart = createAsyncThunk("/api/removeFromCart" , async (ProductData ={})=>{
    const response = await fetch(`${host}/api/cart/decreaseCartProduct`, {
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            "authToken": localStorage.getItem("authToken")
        },
        body: JSON.stringify(ProductData)
       
    })
    const data = await response.json();
    if(ProductData.dispatch){
        if(data.success){
            ProductData.dispatch(getCartItems());
        }
    }
    return data;
})
export const clearCart = createAsyncThunk("/api/clearCart" , async (ProductData ={})=>{
    const response = await fetch(`${host}/api/cart/clearCart`, {
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
            "authToken": localStorage.getItem("authToken")
        },
        body: JSON.stringify({userId : ProductData.userId})
       
    })
    const data = await response.json();
    if(ProductData.dispatch){
        if(data.success){
            ProductData.dispatch(getCartItems());
        }
    }
    console.log(data.clear)
    return data;
})
const CartSlice = createSlice({
    name:"Cart",
    initialState,
    reducers:{
        calculateTotals:(state)=>{
            let total=0;
            let amount = 0;
            state.cartItems.forEach((item)=>{
              total += item.price * item.amount;
              amount += item.amount;
            })
            state.totalItems = amount;
            state.totalPrice = total;
          },
          setLoading:(state, {payload})=>{
            state.isLoading = payload.value;
          }
    },
    extraReducers:(builder)=>{
        builder.addCase(getCartItems.pending , (state)=>{
            state.isLoading = true;
        })
        .addCase(getCartItems.fulfilled , (state , action)=>{
            state.isLoading = false;
            state.cartItems = action.payload.cartItems;
            console.log(state.cartItems)
            state.totalItems = state.cartItems.length
        })
        .addCase(getCartItems.rejected , (state )=>{
            state.isLoading = false;
            toast.error("Server Error");
        })
        builder.addCase(addToCart.pending , (state)=>{
            state.isLoading = true;
        })
        .addCase(addToCart.fulfilled , (state , action)=>{
            state.isLoading = false;
           if(action.payload.success){
            toast.success("Added to Cart")
            
           }
        })
        .addCase(addToCart.rejected , (state )=>{
            state.isLoading = false;
            toast.error("Server Error");
        })
        builder.addCase(removeFromCart.pending , (state)=>{
            state.isLoading = true;
        })
        .addCase(removeFromCart.fulfilled , (state , action)=>{
            state.isLoading = false;
           if(action.payload.success){
            toast.success("Product Removed")
            
           }
        })
        .addCase(removeFromCart.rejected , (state )=>{
            state.isLoading = false;
            toast.error("Server Error");
        })
        builder.addCase(clearCart.pending , (state)=>{
            state.isLoading = true;
        })
        .addCase(clearCart.fulfilled , (state , action)=>{
            state.isLoading = false;
           if(action.payload.success){
            toast.success(action.payload.clear.deletedCount + " items Cleared")
            
           }
        })
        .addCase(clearCart.rejected , (state )=>{
            state.isLoading = false;
            toast.error("Server Error");
        })

    }

})
export const {calculateTotals} = CartSlice.actions;
export default CartSlice.reducer;