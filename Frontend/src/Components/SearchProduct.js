import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function SearchProduct() {
 const navigate = useNavigate();
 const [query  , setQuery] = useState("");
 const handleSubmit =(e)=>{
    e.preventDefault();
     navigate("/productCatalog/search" , {state:{category:"title" , value:query}})
 }
  return (
    <nav class="navbar navbar-light bg-light">
    <form class="form-inline" onSubmit={handleSubmit}>
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={query} onChange={(e)=>{
        setQuery(e.target.value)
      }} style={{
       
      }}/>
      <button class="btn btn-outline-success my-2 my-sm-0" style={{
        backgroundColor:"#d4b743",
        color:"black",
        border:"1px solid black",
       
      }} type="submit">Search</button>
    </form>
  </nav>
  )
}

