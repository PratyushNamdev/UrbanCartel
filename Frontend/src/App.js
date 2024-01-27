import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import ProductCatalog from "./Components/ProductCatalog";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetail from "./Components/ProductDetail";
import {Toaster} from 'react-hot-toast'
import SignUp from "./Components/SignUp";
import VerifyOTP from "./Components/VerifyOTP";
import Login from "./Components/Login";
import UserProfile from "./Components/UserProfile";
import CartContainer from "./Components/CartContainer";
import AddressPicker from "./Components/AddressPicker";
import AddressForm from "./Components/AddressForm";
import LoadingBar from 'react-top-loading-bar'
import { useSelector , useDispatch } from "react-redux";
import { setLoadingProgress } from "./Store/Slices/LoadingBarSlice";
import OrderPlaced from "./Components/OrderPlaced";
import CheckoutPage from "./Components/CheckoutPage";
import OrdersCatalog from "./Components/User-Order/OrdersCatalog";
import OrdersDetail from "./Components/User-Order/OrdersDetail";


function App() {
  const dispatch = useDispatch();
 const {loadingProgress} = useSelector((store)=>store.loadingBar)
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Toaster/>
        <LoadingBar
        color='#f11946'
        progress={loadingProgress}
        onLoaderFinished={() => dispatch(setLoadingProgress(0))}
        shadow={true}
        height={3}
      />
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/productCatalog/search" element={<ProductCatalog/>} />
          <Route path="/productCatalog/clothing&accessories" element={<ProductCatalog category="category" value="Clothing and Accessories"/>} />
          <Route path="/productCatalog/Footwear" element={<ProductCatalog category="category" value="Footwear"/>} />
          <Route path="/productCatalog/bag&belts&wallets" element={<ProductCatalog category="category" value="Bags,Wallets,Belts"/>} />
          <Route path="/productCatalog/t-shirts" element={<ProductCatalog category="title" value="t-shirt"/>} />
          <Route path="/productCatalog/shirts" element={<ProductCatalog category="title" value="shirt"/>} />
          <Route path="/productCatalog/cap" element={<ProductCatalog category="title" value="cap"/>} />
          <Route path="/productCatalog/trousers" element={<ProductCatalog category="title" value="trousers"/>} />
          <Route path="/productCatalog/tracksuits" element={<ProductCatalog category="sub_category" value="Tracksuits"/>} />
          <Route path="/productCatalog/winterwear" element={<ProductCatalog category="sub_category" value="Winter Wear"/>} />
          <Route path="/productCatalog/raincoat" element={<ProductCatalog category="sub_category" value="Raincoats"/>} />
          <Route path="/productCatalog/kurtas" element={<ProductCatalog category="title" value="kurta"/>} />
          <Route path="/productCatalog/sleepwear" element={<ProductCatalog category="sub_category" value="Sleepwear"/>} />
          <Route path="/productCatalog/jeans" element={<ProductCatalog category="title" value="Jeans"/>} />
          <Route path="/productDescription/:productId" element={<ProductDetail/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/verifyOTP" element={<VerifyOTP/>}/>
          <Route path="/userProfile" element={<UserProfile/>}/>
          <Route path="/cart" element={<CartContainer/>}/>
          <Route path="/selectAddress" element={<AddressPicker/>}/>
          <Route path="/selectAddress/addressForm" element={<AddressForm/>}/>
          <Route path="/success" element={<OrderPlaced/>}/>
          <Route path="/checkout" element={<CheckoutPage/>}/>
          <Route path="/orders-Catalog" element={<OrdersCatalog/>}/>
          <Route path="/orderDescription/:orderId" element={<OrdersDetail/>}/>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
