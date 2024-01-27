import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../Store/Slices/AuthenticationSlice";
import { removeUser } from "../Store/Slices/UserInfoSlice";
import { emptyCart } from "../Store/Slices/CartSlice";
import { clearAddress } from "../Store/Slices/AddressSlice";
import { editProfile } from "../Store/Slices/UserInfoSlice";
import { ProfileIcon, EditIcon, CloseIcon } from "../Helper/icon";
import Style from "../CSS/UserProfile.module.css";
import toast from "react-hot-toast";
import CircularLoading from "./CircularLoading";
export default function UserProfile() {
  const { user , isLoading } = useSelector((store) => store.userInfo);
  const profileInputRef = useRef(null);
  const { profilePic, firstName, lastName, number, email } = user;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newProfileData, setNewProfileData] = useState({
    firstName,
    lastName,
    newProfilePic: [],
  });

  const [image, setImage] = useState(null);
  const handleLogout = async () => {
    await dispatch(LOGOUT());
    await dispatch(removeUser());
    await dispatch(emptyCart());
    await dispatch(clearAddress());
    navigate("/");

    toast.success("Logout Successful");
  };
  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/login");
      return;
    }
    // eslint-disable-next-line
  }, []);

  const [showSidebar, setShowSidebar] = useState(false);

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const closeSideBar = () => {
    setShowSidebar(false);
  };

  const setFileToBase = (file) => {
    // const reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onloadend = () =>{
    //     setNewProfileData(
    //       {...setNewProfileData,
    //       image: reader.result}
    //      )

    // }

    const imgname = file.name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setNewProfileData({ ...newProfileData, newProfilePic: reader.result });
     
      const img = new Image();

      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxSize = Math.max(img.width, img.height);
        canvas.width = maxSize;
        canvas.height = maxSize;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
          img,
          (maxSize - img.width) / 2,
          (maxSize - img.height) / 2
        );
        canvas.toBlob(
          (blob) => {
            const file = new File([blob], imgname, {
              type: "image/png",
              lastModified: Date.now(),
            });

            
            setImage(file);
            
          },
          "image/jpeg",
          0.8
        );
      };
    };
  };
  const handleProfileInput = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
   
  };
  const handleInputRefClick = () => {
    profileInputRef.current.click();
  };
  const handleChangeInTextFields = (e) =>{
    const{name , value} = e.target;
     setNewProfileData({...newProfileData , [name]:value})
  }
  const handleSubmit = async (e) =>{
    e.preventDefault();
    
    const res = await dispatch(editProfile({ dispatch ,firstName: newProfileData.firstName ,lastName: newProfileData.lastName , newProfilePic: newProfileData.newProfilePic}));
    if(res){
      setImage(null);
    }
  }
  return (
    <section className={Style.background}>
      <div className={Style.profileContainer}>
        <div>
          {profilePic === "" ? (
            <div className={Style.profileIcon}>
            <ProfileIcon />
          </div>
          ) : (
           <div className={Style.imageBox}>
             <img src={profilePic} alt="Profile Pic" />
           </div>
          )}
        </div>
        <div>
          <h2>
            {firstName}  {lastName}
          </h2>
          <p>Number: {number}</p>
          {email && <p> {email}</p>}

          <div className={Style.btnGroup}>
            <button
              className={Style.editProfileBtn}
              onClick={handleToggleSidebar}
            >
              Edit Profile
            </button>
            <button className={Style.logOutBtn} onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </div>
      </div>
      <div></div>

      {/* The below code is for edit Sidebar to edit profile */}

      <section
        className={`${Style.editSidebar} ${showSidebar && Style.active}`}
      >
        <div className={Style.closeIconWrapper}>
          <span onClick={closeSideBar}>
            <CloseIcon />
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          <div>
            {image !== null ? (
              <div className={Style.imageBox} >
                <img src={URL.createObjectURL(image)} alt="Profile Pic"/>
              </div>
            ) : (
              <>
                <div onClick={handleInputRefClick}>
                  <div className={Style.profileIcon}>
                    <ProfileIcon />
                  </div>
                  <div className={Style.editIcon}>
                    <EditIcon />
                  </div>
                </div>
                <input
                  type="file"
                  name="profilePic"
                  ref={profileInputRef}
                  onChange={handleProfileInput}
                  style={{ display: "none" }}
                />
              </>
            )}
          </div>
          <div className={Style.formTextFieldWrapper}>
            <div>
              <input type="text" value={newProfileData.firstName} name="firstName" placeholder="First Name" onChange={handleChangeInTextFields}/>
            </div>
            <div>
              <input type="text" value={newProfileData.lastName} name="lastName" placeholder="Last Name" onChange={handleChangeInTextFields}/>
            </div>
            <div>
            <input type="submit" value="Submit" />
            </div>
          </div>
          
        </form>
         {isLoading && (<div style={{margin:"1em auto"}}>
            <div><CircularLoading/></div>
            <div style={{
              margin:"1em 0 ",
              padding:"2em"
            }}>
              <em>Do not close the window it may take a little longer</em>
            </div>

          </div>)}
      </section>
    </section>
  );
}
