import React from 'react'
import ReactLoading from 'react-loading';
export default function Loading() {
  
  return (
  <div style={{
    zIndex:"1000",
    position:"absolute",
    left:"50%"
  }}>
     <ReactLoading type="spin" color={"black"} height={'30px'} width={'30px'}/>
  </div>
  )
}
