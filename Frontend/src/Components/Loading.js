import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading';
export default function Loading() {
  const [loadingClr , setLoadingClr] = useState("#FFF");
  const [loadingMessage , setLoadingMessage] = useState("Wanna know a random fact...")
  function getRandomHexColor() {
    // Generate random values for red, green, and blue components
    const r = Math.floor(Math.random() * 256); // 0 to 255
    const g = Math.floor(Math.random() * 256); // 0 to 255
    const b = Math.floor(Math.random() * 256); // 0 to 255
  
    // Convert the values to hexadecimal and format the color
    const hexColor = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
  
    return hexColor;
  }
  const ecommerceFacts = [
    "The first online sale ever made was a Sting CD in 1994.",
    "Ecommerce's secret weapon: the color red for impulse buying.",
    "Amazon's Prime Day started in 2015 for its 20th anniversary.",
    "Mobile commerce is booming with increased smartphone shopping.",
    "The QR code, essential for contactless payments, originated in Japan in 1994.",
    "Alibaba's Singles' Day is the world's largest shopping event.",
    "Cart abandonment plagues ecommerce, with around 70% of abandoned carts.",
    "Subscription box services are flourishing across various niches.",
    "User-generated content influences ecommerce purchasing decisions.",
    "Online grocery shopping has surged, particularly during the pandemic.",
    "Blockchain verifies product authenticity in luxury ecommerce.",
    "Shoppable social media posts allow direct product purchases.",
    "Personalized pricing in ecommerce adjusts based on user data.",
    "Cryptocurrencies are accepted by some ecommerce stores for payments.",
    "Rural areas benefit from ecommerce, expanding product access.",
    "E-commerce has brought about the rise of AI-powered product recommendations.",
    "Online shopping returns average a 30% return rate.",
    "E-commerce isn't just on Earth; an art auction was filmed in space.",
    "Ecommerce accommodates dynamic pricing strategies based on user data.",
      ];
  

  
 const setClr = ()=>{
  setLoadingClr(getRandomHexColor());
 }
 const setMessage = () =>{
  setLoadingMessage(ecommerceFacts[Math.floor(Math.random() * ecommerceFacts.length)])
 }
  
  useEffect(()=>{
   setMessage();
    setInterval(()=>{
     setClr();
  
    },2000);
    setInterval(()=>{
     setMessage();
  
    },5000)
    // eslint-disable-next-line
  },[])
  return (
   <div style={{
    position:"fixed",
    top:"0",
    left:"0",
    height:"100%",
    width:"100%",
    background:"rgba(0,0,0,0.8)",
    zIndex:'10',
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
   }}>
       <div style={{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
       }}>
         <ReactLoading type="cubes" color={loadingClr} height={'50px'} width={'50px'}/>
         <div style={{
          textAlign:'center',
          padding:"1em",
          color:"white",
          textTransform:"uppercase"
         }}>{loadingMessage}</div>
       </div>
   </div>
  )
}
