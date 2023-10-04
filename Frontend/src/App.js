import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import ProductCatalog from "./Components/ProductCatalog";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetail from "./Components/ProductDetail";
import SearchProduct from "./Components/SearchProduct";
import {Toaster} from 'react-hot-toast'
import SignUp from "./Components/SignUp";
import VerifyOTP from "./Components/VerifyOTP";
import Login from "./Components/Login";
import UserProfile from "./Components/UserProfile";
function App() {
 
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Toaster/>
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
          <Route path="/search" element={<SearchProduct/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/verifyOTP" element={<VerifyOTP/>}/>
          <Route path="/userProfile" element={<UserProfile/>}/>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
