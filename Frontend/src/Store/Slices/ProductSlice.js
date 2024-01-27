import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {host} from "../../Helper/host";
const initialState = {
  productData: [],
  totalData: 0,
 //length of the data in the productData Array 
  length:null
};
// const host = process.env.REACT_APP_HOST;
// console.log(host)
export const getProducts = createAsyncThunk(
  "/products/getProducts",
  async (obj = {}) => {
    // let url = `http://localhost:5000/api/product/products?${obj.key}=${obj.value}`;

    try{
      const response = await fetch(`${host}/api/product/products?${obj.key}=${obj.value}&sort=${obj.sort}` , {
        headers:{
          'ngrok-skip-browser-warning': 'true'
        }
      });
    
      const data = await response.json();
      console.log(data)
      return data

    }catch(e){
  
      return {error:true}
    }
    // try {
    //   return await fetch(
    //     `http://192.168.165.122:5000/api/product/products?${obj.key}=${obj.value}&sort=${obj.sort}`
    //   ).then((data) => data.json());
    // } catch (e) {
    //   toast.error("Cannot Fetch Data ! Server Error");
    // }
  }
);
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getMoreProducts: (state, { payload }) => {
      const proxyData = state.productData.map((proxy) =>
        JSON.parse(JSON.stringify(proxy))
      );
      const newData = proxyData.concat(payload.data);
      state.productData = newData;
      state.totalData = payload.totalDocs;

      state.length = state.productData.length;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        console.log(action)
        state.isLoading = false;
        if(action.payload?.error){
          toast.error("Server Error");
        }
        if(action.payload?.success){
           console.log(action.payload.data)
          state.productData = action.payload?.data;
          state.totalData = action.payload?.totalDocs;
          state.length = state.productData?.length;
        }
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        toast.error("Some Error Occured");
        console.log(action.payload)
      });
  },
});
export const { getMoreProducts, setSort } = productSlice.actions;
export default productSlice.reducer;
