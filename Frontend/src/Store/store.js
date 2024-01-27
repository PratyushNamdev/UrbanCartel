import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import ProductsReducer from "./Slices/ProductSlice";
import AuthenticationSlice from "./Slices/AuthenticationSlice";
import UserInfoSlice from "./Slices/UserInfoSlice";
import CartSlice from "./Slices/CartSlice";
import AddressSlice from "./Slices/AddressSlice";
import LoadingBarSlice from "./Slices/LoadingBarSlice";
import OrderSlice from "./Slices/OrderSlice";
const rootReducer = combineReducers({
  cart: CartSlice,
  products: ProductsReducer,
  authentication: AuthenticationSlice,
  userInfo: UserInfoSlice,
  address: AddressSlice,
  loadingBar:LoadingBarSlice,
  Order:OrderSlice
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["products" , "loadingBar"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
});
const persistor = persistStore(store);
export { store, persistor };

// reducer: {
//   products:ProductsReducer,
//   authentication:AuthenticationSlice,
//   userInfo:UserInfoSlice
// }
