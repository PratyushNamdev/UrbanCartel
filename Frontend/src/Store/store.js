import { configureStore } from "@reduxjs/toolkit";
import ProductsReducer from "./Slices/ProductSlice";


const store = configureStore({
  reducer: {
    products:ProductsReducer,
  }
})
export default store;