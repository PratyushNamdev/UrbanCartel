import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Style from "../CSS/SearchProduct.module.css"
export default function SearchProduct() {
 const navigate = useNavigate();
 const [query  , setQuery] = useState("");
 const handleSubmit =(e)=>{
    e.preventDefault();
    if(query.length > 0){

      navigate("/productCatalog/search" , {state:{category:"title" , value:query}})
    }
 }
  return (
 



<form className={Style.searchContainer} onSubmit={handleSubmit}>
    <input type="text" className={Style.searchBar} value={query} placeholder='Search' onChange={(e)=>{
        setQuery(e.target.value)
      }}/>
    <button type='submit' className={Style.searchIcon}><img  src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png" alt='search'/></button>
  </form>
  )
}

