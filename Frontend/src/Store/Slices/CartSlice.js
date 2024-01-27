import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { setLoadingProgress } from "./LoadingBarSlice";
// const host = process.env.REACT_APP_HOST;
import {host} from "../../Helper/host";
const initialState = {
  cartItems: [],
  totalItems: 0,
  totalPrice: 0,
  isLoading: false,
};
export const getCartItems = createAsyncThunk("/api/fetchCartProducts", async (dispatch) => {
  
   try{
    dispatch(setLoadingProgress(70))
    const response = await fetch(`${host}/api/cart/fetchCartProducts`, {
        method:"GET",
        headers:{
            'ngrok-skip-browser-warning': 'true',
            "authToken": localStorage.getItem("authToken")
        },
        
    });
    const data = await response.json();
    console.log(data)
    dispatch(setLoadingProgress(100))
    return data;
}catch(e){
    dispatch(setLoadingProgress(100))
    return({error:true , message:"Something went wrong"})
}
});
export const addToCart = createAsyncThunk("/api/addToCart" , async (ProductData ={})=>{
    
  try{  
    ProductData.dispatch(setLoadingProgress(70))
    const response = await fetch(`${host}/api/cart/addToCart`, {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "authToken": localStorage.getItem("authToken"),
            'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify(ProductData)
        
    })
    const data = await response.json();
    ProductData.dispatch(setLoadingProgress(100))
    return data;
}catch(e){
    ProductData.dispatch(setLoadingProgress(100))
    return({error:true , message:"Something went wrong"})
}
})
export const removeFromCart = createAsyncThunk("/api/removeFromCart" , async (ProductData ={})=>{
  
   try{ 
    ProductData.dispatch(setLoadingProgress(70))
    const response = await fetch(`${host}/api/cart/decreaseCartProduct`, {
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            "authToken": localStorage.getItem("authToken"),
            'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify(ProductData)
       
    })
    const data = await response.json();
    ProductData.dispatch(setLoadingProgress(100))
    return data;
}catch(e){
    ProductData.dispatch(setLoadingProgress(100))

    return({error:true , message:"Something went wrong"})
}
})
export const clearCart = createAsyncThunk("/api/clearCart" , async (ProductData ={})=>{
    
    try{ ProductData.dispatch(setLoadingProgress(70));
        const response = await fetch(`${host}/api/cart/clearCart`, {
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
            "authToken": localStorage.getItem("authToken"),
            'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify({userId : ProductData.userId})
        
    })
    const data = await response.json();
    ProductData.dispatch(setLoadingProgress(100))
    return data;
}catch(e){
    
    ProductData.dispatch(setLoadingProgress(100))
    return({error:true , message:"Something went wrong"})

}
})
const CartSlice = createSlice({
    name:"Cart",
    initialState,
    reducers:{
        calculateTotals:(state)=>{
            let total=0;
            let amount = 0;
            state.cartItems?.forEach((item)=>{
              total += item.price * item.amount;
              amount += item.amount;
            })
            state.totalItems = amount;
            state.totalPrice = total;
          },
          setLoading:(state, {payload})=>{
            state.isLoading = payload.value;
          },
          emptyCart:(state)=>{
            state.cartItems = [];
            state.totalItems = 0;
            state.totalPrice = 0;
        },
        setTotalItems:(state , action)=>{
            state.totalItems =  action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getCartItems.pending , (state)=>{
            state.isLoading = true;
        })
        .addCase(getCartItems.fulfilled , (state , action)=>{
            state.isLoading = false;
            if(action.payload?.error){
                toast.error(action.payload.message)
                state.totalItems = null;
            }
            else{
                state.cartItems = action.payload?.cartItems;            
                state.totalItems = state?.cartItems?.length;
            }

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
            if(action.payload?.error){
                toast.error(action.payload.message)
            }
            else{
                if(action.payload?.Added){
                    state.cartItems.push(action.payload.cartItem);
                    state.totalItems += 1;
                    toast.success("Added to Cart")
                   }
        
                   if(action.payload?.Updated){
                    const cartItem = state.cartItems.find((item) => item._id === action.payload.id);
                    cartItem.amount = cartItem.amount + 1;
                    state.totalItems += 1;
                       toast.success("Done");
                   }
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

            if(action.payload?.error){
              toast.error(action.payload.message)
            }
            else{
                if(action.payload?.Removed){
                    state.cartItems = state.cartItems.filter((item)=> item._id !== action.payload.id); 
                    toast.success("Done");
                }
                if(action.payload?.Decreased){
                    const cartItem = state.cartItems.find((item) => item._id === action.payload.id);
                    cartItem.amount = cartItem.amount - 1;
                    toast.success("Done");
                }
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
            if(action.payload?.error){
                toast.error(action.payload.message)
              }
              else{
                if(action.payload?.cleared){
                    state.cartItems = [];
                    toast.success(action.payload.clear.deletedCount + " items Cleared")
                    
                   }
              }
           
        })
        .addCase(clearCart.rejected , (state )=>{
            state.isLoading = false;
            toast.error("Server Error");
        })

    }

})
export const {calculateTotals , emptyCart , setTotalItems} = CartSlice.actions;
export default CartSlice.reducer;