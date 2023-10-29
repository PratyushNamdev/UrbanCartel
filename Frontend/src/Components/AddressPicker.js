import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAddress } from "../Store/Slices/AddressSlice";
import { getAddress , addAddress } from "../Store/Slices/AddressSlice";
import { useLocation, useNavigate } from "react-router-dom";
import Style from "../CSS/AddressPicker.module.css";
import toast from "react-hot-toast";
export default function AddressPicker() {
  const { addresses, isLoading } = useSelector((store) => store.address);
  const { userId } = useSelector((state) => state.authentication);
  const [selectedAddress, setSelectedAddress] = useState({
    name:"",
    mobileNumber:"",
    mainAddress:"",
    areaAddress:"",
    pincode:"",
    townOrCity:"",
    landmark:"",
    state:"",
    saveAddress:false,
    userId
  });
  const [selectStatus, setSelectStatus] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    
    if (!location.state?.entry) {
      return navigate("/");
    }
    dispatch(getAddress());
    // eslint-disable-next-line
  }, []);
  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setSelectStatus(true);
    const windowHeight = window.innerHeight;
    const bodyHeight = document.body.scrollHeight;

    // Scroll to the end of the page
    window.scrollTo(0, bodyHeight - windowHeight);
   
  };

  //for address form 
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setSelectedAddress({
      ...selectedAddress,
      [name]: newValue,
    });
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(selectedAddress.saveAddress !== true){
      dispatch(selectAddress(selectedAddress));
      return ;
    }
    const res = await dispatch(addAddress(selectedAddress));
    if(res.payload.address){
      toast.success("Address selected");

    }
    else{
      toast.error("eroro")
    }
   
  };
  if (isLoading) {
    return <div>loading</div>;
  }
  if (addresses.length <= 0) {
    return (
      <section className={Style.address_form_container}>
        <form onSubmit={handleSubmit} className={Style.address_form}>
        <h3 style={{ letterSpacing: "0" , textAlign:'center' , gridColumn:"1/span 2" , margin:"1em 0"}}>Enter delivery address</h3>
      <div className={Style.form_element_box}>
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={selectedAddress.name}
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
          value={selectedAddress.mobileNumber}
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
          value={selectedAddress.mainAddress}
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
          value={selectedAddress.areaAddress}
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
          value={selectedAddress.landmark}
          onChange={handleChange}
        />
      </div>
      <div className={Style.form_element_box}>
        <label htmlFor="pincode">Pincode</label>
        <input
          type="text"
          name="pincode"
          id="pincode"
          value={selectedAddress.pincode}
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
          value={selectedAddress.townOrCity}
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
          value={selectedAddress.state}
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
      <div className={`${Style.form_element_box} ${Style.checkbox}`}>
          <input
            type="checkbox"
            name="saveAddress"
            id="saveAddress"
            checked={selectedAddress.saveAddress || false}
            onChange={handleChange}
          />
          <label htmlFor="saveAddress">Save this address for future use</label>
        </div>
      <button className={Style.address_submit_btn} type="submit">Procced to payment</button>
    </form>
      </section>
    );
  }



  return (
    <div className={Style.address_container}>
      <h3>Select an Address</h3>
      <ul>
        {addresses.map((address) => (
          <li key={address._id} className={Style.list_item}>
            <label className={Style.address_box}>
              <input
                type="radio"
                name="selectedAddress"
                value={address.id}
                checked={selectedAddress === address}
                onChange={() => handleAddressSelect(address)}
              />
              <div className={Style.address_details}>
                <h4 style={{ margin: "0" }}>{address.name}</h4>
                <div>
                  {address.mainAddress}, {address.areaAddress} {address?.landmark },  {address.townOrCity}, {address.state},
                  {address.pincode}
                </div>
                <div>Phone number: {address.mobileNumber}</div>
              </div>
            </label>
          </li>
        ))}
      </ul>
      <button className={Style.newAddressBtn} onClick={()=>{navigate("/selectAddress/addressForm" , {state:{entry:true}})}}>Add a New Address &#8594;</button>
      {selectStatus && (
        <div className={Style.btn_div}>
          <button className={`${Style.btn} ${Style.editBtn}`} onClick={()=>{navigate("/selectAddress/addressForm" , {state:{entry:true ,address : selectedAddress}})}}>
            Edit Address
          </button>
          <button className={`${Style.btn} ${Style.proccedBtn}`} >
            Use this address
          </button>
        </div>
      )}
    </div>
    //   <div>
    //   <h3>Select an Address</h3>
    //   <ul>
    //     {addresses.map((address) => (
    //       <li key={address.id}>
    //         <label>
    //           <input
    //             type="radio"
    //             name="selectedAddress"
    //             value={address.id}
    //             checked={selectedAddress === address}
    //             onChange={() => handleAddressSelect(address)}
    //           />
    //           {address.name}, {address.mainAddress}, {address.areaAddress}, {address.state}, {address.pincode}
    //         </label>
    //       </li>
    //     ))}
    //   </ul>
    //   {selectedAddress && (
    //     <div>
    //       <h4>Selected Address</h4>
    //       <p>
    //         {selectedAddress.name}, {selectedAddress.mainAddress}, {selectedAddress.areaAddress}, {selectedAddress.state}, {selectedAddress.pincode}
    //       </p>
    //     </div>
    //   )}
    // </div>
  );
}
