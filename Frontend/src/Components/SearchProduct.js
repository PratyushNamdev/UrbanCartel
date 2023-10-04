import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

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
    <nav className="navbar navbar-light ">
    <form className="form-inline" onSubmit={handleSubmit}>
      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={query} onChange={(e)=>{
        setQuery(e.target.value)
      }} style={{
       
      }}/>
      <button className="btn btn-outline-success my-2 my-sm-0" style={{
        backgroundColor:"#ff9d00",
        color:"black",
        border:"1px solid black",
       
      }} type="submit">Search</button>
    </form>
  </nav>
  )
}

