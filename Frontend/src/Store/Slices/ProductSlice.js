import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
const initialState = {
    productData : [],
    totalData:0,
   
   
}

export const getProducts = createAsyncThunk(
    "/products/getProducts",
    async (obj = {})=>{
       // let url = `http://localhost:5000/api/product/products?${obj.key}=${obj.value}`;
    
     return await fetch(`http://localhost:5000/api/product/products?${obj.key}=${obj.value}&sort=${obj.sort}`)
     .then((data)=>data.json()) 
     .catch((e)=>{
        console.log("error  "+ e)
     })
    }
)
const productSlice = createSlice({
    name:"products",
    initialState,
    reducers:{
     getMoreProducts:  (state, {payload}) => {
        const proxyData = state.productData.map((proxy) => JSON.parse(JSON.stringify(proxy)));
        const newData = proxyData.concat(payload.data);
        state.productData = newData;
        state.totalData = payload.totalDocs;
        
        state.length = state.productData.length

    
      }
    },
    extraReducers:(builder)=>{
       builder
       .addCase(getProducts.pending , (state)=>{
        
       })
       .addCase(getProducts.fulfilled , (state , action)=>{
        state.isLoading = false;
        state.productData = action.payload.data;
        state.totalData = action.payload.totalDocs;
        state.length = state.productData.length
       
        
       })
       .addCase(getProducts.rejected , (state , action)=>{
        
        console.log(action)
       })
    }

})
export const { getMoreProducts , setSort} = productSlice.actions;
export default productSlice.reducer;