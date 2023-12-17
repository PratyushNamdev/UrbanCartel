import {host} from "../Helper/host";
import toast from "react-hot-toast";
export const proccedToPayment = async ({dispatch , setLoadingProgress , cartItems , selectedAddress})=>{

    try{dispatch(setLoadingProgress(70))
    const response = await fetch(`${host}/api/payment/checkout-session` , {
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "authToken": localStorage.getItem("authToken"),
        'ngrok-skip-browser-warning': 'true'
      },
      body: JSON.stringify({cartItems , selectedAddress})
    });
    const data = await response.json();
    
    dispatch(setLoadingProgress(100))
    if(data?.success){
        window.location = data.url;
    }
    else if(data?.error){
        toast.error(data.message);
    }else{
        toast.error("Something went wrong")
    }
}catch(e){
    toast.error("Something went wrong")

}
    }