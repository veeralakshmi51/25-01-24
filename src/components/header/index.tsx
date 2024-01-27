import "./header.css";
import LogoImg from "../../assets/images/mettlerTitle.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { handleLogout } from "../../slices/thunk";
// import { Chip } from '@mui/material';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from "react";
import avatar from "../../assets/images/avatar.png";
import { DropdownItem, DropdownMenu } from "reactstrap";
import { Logout } from "@mui/icons-material";
import { Security } from "@mui/icons-material";
import { FaUserCircle } from "react-icons/fa";
const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === "/login";
  const isSecretKeyPage = location.pathname === "/secret-key";
  const { jwt, userType } = useSelector((state: any) => state.Login);
  const username = useSelector((state: any) => state.Login.userDetails);

  // Check if the current page is neither login nor secret-key
  const showLogoImg = !isLoginPage && !isSecretKeyPage;
  const showAvatar = !isLoginPage && !isSecretKeyPage;

  const showHeader = !isLoginPage && !isSecretKeyPage;
  const handleMenuOpen = () => {
    setOpen(!open);
  };
  if (!showHeader) {
    return null; // Do not render the header on login and secret-key pages
  }
  const handleLogoutClick = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");

    if (confirmLogout) {
      console.log(jwt, username);
      const body = {
        jwt,
        username,
      };
      handleLogout(body, navigate);
      setOpen(false);
    }
  };

  const DropDownItem=(props: any) =>{
    return (
      <li className="dropdownItem" onClick={props.onClick}>
        <img
          src={props.img}
          alt=""
          style={{
            maxWidth: "20px",
            marginRight: "10px",
            opacity: 1,
            transition: "var(--speed)",
          }}
        ></img>
        <a href={props.href}>{props.children}</a>
      </li>
    );
  }

  return (
    <div
      className={'row mHeader d-flex justify-content-center align-items-center'}
    >
      {showLogoImg && (
        <img
          src={LogoImg}
          alt="Logo"
          className="img-fluid"
          style={{ width: "200px", height: "25px" }}
        />
      )}

      {/* {showAvatar && (
        <div className="avatar-container" style={{ right: '20px', zIndex: '1' }}>
          <Chip
      icon={<FontAwesomeIcon icon={faCircleUser} size='2xl' style={{color:'#fff'}} />}
      label="Logout"
      onClick={handleLogoutClick}
      variant="outlined"
      style={{color:'#fff'}}
    />
        </div>
      )} */}
      <div className="menu-container">
        <div className='menu-trigger' onClick={()=>{
          // e.stopPropagation();
          setOpen(!open);
          }}>
          <img src={avatar} alt='avatar'></img>
        </div>
        {/* <div className="menu-trigger" onClick={() => setOpen(!open)}>
          <img src={avatar} alt="avatar"></img>
        </div> */}

        <div className={`dropdown-menu ${open ? "active" : "inactive"}`} >
          <h4 style={{color:'green',textAlign:'center'}}>{username}</h4>
          <p style={{color:'red',textAlign:'center'}}>{userType}</p>
          <ul>
            {/* <DropdownItem img={<FaUserCircle/>}>My Profile</DropdownItem> */}
            {/* <DropdownItem img={<PasswordRounded />} href="/recreatePassword">
              Change Password
            </DropdownItem>
            <DropdownItem img={<Logout />} onClick={handleLogoutClick}>
              Logout
            </DropdownItem> */}
              <li>
              <a href="/recreatePassword"  style={{color:'darkblue'}}>
                <Security />
                Change Password
              </a>
            </li>
            <li onClick={handleLogoutClick} style={{color:'darkblue',cursor:'pointer'}}>
             <Logout />
              Logout
              
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
