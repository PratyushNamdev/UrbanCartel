import toast from "react-hot-toast";
import { host } from "../Helper/host";
export const proccedToCODOrder = async ({dispatch , navigate, setLoadingProgress , cartItems , selectedAddress})=>{
    try{dispatch(setLoadingProgress(70))
        console.log(selectedAddress)
        const response = await fetch(`${host}/api/payment/cashOnDelivery` , {
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
            navigate("/success")
        }
        else if(data?.error){
            toast.error(data.message);
        }else{
            toast.error("Something went wrong")
        }
    }catch(e){
        dispatch(setLoadingProgress(100))
        toast.error("Something went wrong")
    
    }

}