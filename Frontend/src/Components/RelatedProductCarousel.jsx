import React, { useEffect, useState } from "react";
import CarouselProductCard from "./CarouselProductCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { api } from "../Services/api";
import toast from "react-hot-toast";
import CircularLoading from "./CircularLoading";
export default function RelatedProductCarousel({ sub_category }) {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
      partialVisibilityGutter: 40 
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      partialVisibilityGutter: 40 
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      partialVisibilityGutter: 40 
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      partialVisibilityGutter: 20 
    }
  };
  const [loading , setLoading] = useState(false);
  const [page , setPage] = useState(2);
  const [data , setData] = useState({
    productData :[],
    totalDocs :0,
    // * the length is the total length of productData Array
    length:null
  })
  const initialCall = async (sub_category) =>{
    setLoading(true);
    try{ const result = await api.get(`/api/product/products?sub_category=${sub_category}`);
    if(result.success){
      setData({
        productData:result.data,
        totalDocs:result.totalDocs,
        length:result.data.length
      })
      
    }
    setLoading(false);
  }catch(e){
      setLoading(!loading);
      toast.error("Internal server error on getting suggestion")
    }
  }
  const nextCall = async(sub_category)=>{
    setPage((prevPage)=>prevPage+1);
    try{ const result = await api.get(`/api/product/products?sub_category=${sub_category}&page=${page}`);
    if (result.success) {
      setData((prevData) => ({
        productData: [...prevData.productData, ...result.data],
        totalDocs: result.totalDocs,
        length: prevData.productData.length + result.data.length // Update the length accordingly
      }));
      console.log(result)
      
    }}catch(e){
      toast.error("Internal server error on getting suggestion")
    }
  }
  useEffect(() => {
      initialCall(sub_category);
      // eslint-disable-next-line
  },[]);



  const handleSlideChange = (previousSlide, { currentSlide, onMove }) => {
    
    if(data.length - currentSlide <= 5 ){
      nextCall(sub_category)
    }
    console.log(data.length - currentSlide )
   
  };


  if(loading){
    return(
      <>
      <CircularLoading/>
      </>
    )
  }
  if(data.productData.length>1){
    return(
    
        <Carousel
        responsive={responsive}
        swipeable={true}
        draggable={true}
        showDots={false}
        partialVisible={true}
        removeArrowOnDeviceType={['mobile']}
        afterChange={handleSlideChange}
        >
       {
        // eslint-disable-next-line
        data.productData.map((data)=>{
          if (data.images.length >= 1) {
            return <CarouselProductCard key={Math.random()} data={data} />;
          }
        })
       }
        </Carousel>
      
    );
  }
  return <div>{sub_category}</div>;
}
