import React, { useEffect, useState } from 'react'
import Style from "../CSS/AddressPicker.module.css";
import { useLocation, useNavigate } from 'react-router-dom';
import { addAddress , updateAddress } from '../Store/Slices/AddressSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
export default function AddressForm() {
    const { userId } = useSelector((state) => state.authentication);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [address , setAddress] = useState({ 
    name:"",
    mobileNumber:"",
    mainAddress:"",
    areaAddress:"",
    pincode:"",
    townOrCity:"",
    landmark:"",
    state:"",
    userId,
});
useEffect(()=>{
    if (!location.state?.entry) {
        return navigate("/");
      }
    if(!localStorage.getItem("authToken")){
      return navigate("/");
    }
    if(location.state.address){
        setAddress(location.state.address); 
    }
     // eslint-disable-next-line
},[])
const handleSubmit = async (e)=>{
 e.preventDefault();
 if(address._id){
    const oldaddress = location.state.address;
    let obj = {};
    for(let key in address){
        if(address[key] !== oldaddress[key]){
            obj[key] = address[key];
        }
    }
    obj.userId = address.userId;
    console.log(obj)
   const res = await dispatch(updateAddress({obj , id:address._id}));
  
   if(res.payload.success){

    //navigate to payment
    toast.success("DONE");
    
}


 }
 else{
   const res = await dispatch(addAddress(address));
   if(res.payload.address){
    navigate("/selectAddress" , {state:{entry:true}});
  }
  else{
    toast.error("eroro")
  }
 }
}
const handleChange = (e)=>{
    const { name  , value } = e.target;
    setAddress({
      ...address,
      [name]: value,
    });
} 

if(localStorage.getItem("authToken")){

    return (
        <div>
           <section className={Style.address_form_container}>
            <form onSubmit={handleSubmit} className={Style.address_form}>
            <h3 style={{ letterSpacing: "0" , textAlign:'center' , gridColumn:"1/span 2" , margin:"1em 0"}}>Enter delivery address</h3>
          <div className={Style.form_element_box}>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={address.name}
              onChange={handleChange}
              required
              min={4}
            />
          </div>
          <div className={Style.form_element_box}>
            <label htmlFor="mobileNumber">Phone Number</label>
            <input
              type="text"
              name="mobileNumber"
              id="mobileNumber"
              value={address.mobileNumber}
              onChange={handleChange}
              placeholder="May be used to assist delivery"
              required
              min={10}
            />
          </div>
          <div className={Style.form_element_box}>
            <label htmlFor="mainAddress">Flat, House no., Building, Company </label>
            <input
              type="text"
              name="mainAddress"
              id="mainAddress"
              value={address.mainAddress}
              onChange={handleChange}
              required
              min={5}
            />
          </div>
          <div className={Style.form_element_box}>
            <label htmlFor="areaAddress">Area, Street, Sector, Village</label>
            <input
              type="text"
              name="areaAddress"
              id="areaAddress"
              value={address.areaAddress}
              onChange={handleChange}
              required
              min={6}
            />
          </div>
          <div className={Style.form_element_box}>
            <label htmlFor="landmark">Landmark</label>
            <input
              type="text"
              name="landmark"
              id="landmark"
              value={address.landmark}
              onChange={handleChange}
            />
          </div>
          <div className={Style.form_element_box}>
            <label htmlFor="pincode">Pincode</label>
            <input
              type="text"
              name="pincode"
              id="pincode"
              value={address.pincode}
              onChange={handleChange}
              required
              min={6}
            />
          </div>
          <div className={Style.form_element_box}>
            <label htmlFor="townOrCity">Town/City</label>
            <input
              type="text"
              name="townOrCity"
              id="townOrCity"
              value={address.townOrCity}
              onChange={handleChange}
              required
              min={3}
            />
          </div>
          <div className={Style.form_element_box}>
          <label htmlFor="state">State</label>
            <select
              name="state"
              id="state"
              value={address.state}
              onChange={handleChange}
              required
            >
              <option value="Select State">Select</option>
    <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
    <option value="Andhra Pradesh">Andhra Pradesh</option>
    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
    <option value="Assam">Assam</option>
    <option value="Bihar">Bihar</option>
    <option value="Chandigarh">Chandigarh</option>
    <option value="Chhattisgarh">Chhattisgarh</option>
    <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
    <option value="Daman and Diu">Daman and Diu</option>
    <option value="Delhi">Delhi</option>
    <option value="Goa">Goa</option>
    <option value="Gujarat">Gujarat</option>
    <option value="Haryana">Haryana</option>
    <option value="Himachal Pradesh">Himachal Pradesh</option>
    <option value="Jharkhand">Jharkhand</option>
    <option value="Karnataka">Karnataka</option>
    <option value="Kerala">Kerala</option>
    <option value="Lakshadweep">Lakshadweep</option>
    <option value="Madhya Pradesh">Madhya Pradesh</option>
    <option value="Maharashtra">Maharashtra</option>
    <option value="Manipur">Manipur</option>
    <option value="Meghalaya">Meghalaya</option>
    <option value="Mizoram">Mizoram</option>
    <option value="Nagaland">Nagaland</option>
    <option value="Odisha">Odisha</option>
    <option value="Puducherry">Puducherry</option>
    <option value="Punjab">Punjab</option>
    <option value="Rajasthan">Rajasthan</option>
    <option value="Sikkim">Sikkim</option>
    <option value="Tamil Nadu">Tamil Nadu</option>
    <option value="Telangana">Telangana</option>
    <option value="Tripura">Tripura</option>
    <option value="Uttar Pradesh">Uttar Pradesh</option>
    <option value="Uttarakhand">Uttarakhand</option>
    <option value="West Bengal">West Bengal</option>
    
              {/* Add more state options as needed */}
            </select>
            
          </div>
          <button className={Style.address_submit_btn} type="submit">Procced</button>
        </form>
          </section>
        </div>
      )
}
}
