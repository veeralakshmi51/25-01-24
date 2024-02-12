// import React, { useEffect, useState } from "react";
// import {
//   FaBars,
//   FaUserAlt,
//   FaSpellCheck,
//   FaBuilding,
//   FaSignOutAlt,
//   FaUserInjured,
//   FaUserNurse,
//   FaHospitalUser,
//   FaHouseUser,
//   FaUserFriends,
//   FaBroadcastTower,
//   FaReceipt,
//   FaBed,
// } from "react-icons/fa";
// import { NavLink, useNavigate } from "react-router-dom";
// import "./sidebar.css";
// import Header from "../header";
// import { Button } from "primereact/button";
// import { useDispatch, useSelector } from "react-redux";
// import { handleLogout } from "../../slices/thunk";
// interface SidebarProps {
//   children: any;
// }

// const Sidebar = (props: SidebarProps) => {
//     const { jwt, userType} = useSelector((state: any) => state.Login);
//     // const userType = useSelector((state: any) => state.Login.userType);
//     const username  = useSelector((state: any) => state.Login.userDetails);
//     // cont username = userDetails ? userDetails.username : null;

  
//     const { children } = props;
//     const [isOpen, setIsOpen] = useState(window.innerWidth > 768);
//     const navigate = useNavigate();
  
//     const toggle = () => setIsOpen(!isOpen);
  
//     const menuItem = [
//       {
//         path: "/organization-details",
//         name: "Organization Details",
//         icon: <FaBuilding />,
//         show: userType === "Super Admin",
//       },
//       {
//         path: "/q15-staff-configuration",
//         name: "Q15 Staff Configuration",
//         icon: <FaSpellCheck />,
//         show: userType === "Admin",
//       },
//       {
//         path: "/staff-table",
//         name: "Staff Creation",
//         icon: <FaHospitalUser />,
//         show: userType === "Admin",
//       },
//       {
//         path: "/patient-table",
//         name: "Patient Creation",
//         icon: <FaUserFriends />,
//         show: userType === "Admin",
//       },
//       {
//         path: "/Beacon-register",
//         name: "Beacon Devices",
//         icon: <FaBroadcastTower  />,
//         show: userType === "Admin",
//       },
//       {
//         path:'/bed-table',
//         name:"Bed Assign",
//         icon:<FaBed />,
//         show:userType==='Admin',
//       },
//       {
//         path:'/patient-assign',
//         name:"Patient Assign",
//         icon:<FaUserInjured/>,
//         show:userType==='Admin',
//       },
//       {
//         path: "/q15-report",
//         name: "Q15 Report",
//         icon: <FaReceipt  />,
//         show: userType === "Admin",
//       },
//     ];
  
//     useEffect(() => {
//       const handleResize = () => {
//         setIsOpen(window.innerWidth > 1068);
//       };
  
//       window.addEventListener("resize", handleResize);
  
//       return () => {
//         window.removeEventListener("resize", handleResize);
//       };
//     }, []);
  
//     // const handleLogoutClick = () => {
//     //   console.log(jwt, username);
//     //   const body = {
//     //     jwt,
//     //     username,
//     //   };
//     //   handleLogout(body, navigate);
//     // };

//   return (
//     <div className="container1">
//       <div style={{ width: isOpen ? "300px" : "50px" }} className="sidebar">
//         <div className="top_section">
//           <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
//             M H C
//           </h1>
//           <div style={{ marginLeft: isOpen ? "50px" : "0px"}} className="bars">
//             <FaBars onClick={toggle} style={{cursor:'pointer'}}/>
//           </div>
//         </div>
//         {menuItem.map(
//           (item, index) =>
//             item.show && (
//               <NavLink to={item.path} key={index} className="link">
//                 <div className="icon">{item.icon}</div>
//                 <div
//                   style={{ display: isOpen ? "block" : "none" }}
//                   className="link_text"
//                 >
//                   {item.name}
//                 </div>
//               </NavLink>
//             )
//         )}
//         {/* <div
//   className="button d-flex align-item-center justify-content-center"
//   // style={{ marginTop: "340px" }}
// >
//   {isOpen ? (
//     <Button
//       label="Logout"
//       className="w-50 h-20"
//       onClick={() => {
//         handleLogoutClick();
//       }}
//     ></Button>
//   ) : (
//     <div onClick={() =>  handleLogoutClick()}>
//       <FaSignOutAlt style={{cursor:'pointer'}}/>
//     </div>
//   )}
// </div> */}
//       </div>
//       <div
//         className="w-100"
//         style={{
//           marginLeft: isOpen ? "300px" : "50px",
//           marginTop: 0,
//           overflowY: "auto",
//         }}
//       >
//         <Header />
//         {children}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


import React, { useEffect, useState } from "react";
import {
  FaBars,
  FaSpellCheck,
  FaBuilding,
  FaHospitalUser,
  FaUserFriends,
  FaBroadcastTower,
  FaReceipt,
  FaBed,
  FaUserCog,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import "./sidebar.css";
import Header from "../header";
import { useSelector } from "react-redux";
interface SidebarProps {
  children: any;
}

const Sidebar = (props: SidebarProps) => {
    const { jwt, userType} = useSelector((state: any) => state.Login);
    // const userType = useSelector((state: any) => state.Login.userType);
    const username  = useSelector((state: any) => state.Login.userDetails);
    // cont username = userDetails ? userDetails.username : null;
    const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  
    const { children } = props;
    const [isOpen, setIsOpen] = useState(window.innerWidth > 768);
    const navigate = useNavigate();
  
    const toggle = () => setIsOpen(!isOpen);
  
    const menuItem = [
      {
        path: "/organization-details",
        name: "Organization Details",
        icon: <FaBuilding />,
        show: userType === "Super Admin",
      },
      {
        path: "/q15-staff-configuration",
        name: "Q15 Staff Configuration",
        icon: <FaSpellCheck />,
        show: userType === "Admin",
      },
      {
        path: "/staff-table",
        name: "Staff Creation",
        icon: <FaHospitalUser />,
        show: userType === "System Admin",
      },      
      {
        path: "/beacon-table",
        name: "Beacon Devices",
        icon: <FaBroadcastTower />,
        show: userType === "System Admin",
      },
      {
        name: "Management",
        icon: <FaUserCog />,
        show: userType === "Admin",
        submenu: [
          {
            path: "/patient-table",
            name: "Patient Creation",
            icon: <FaUserFriends />,
            show: userType === "Admin",
          },
          {
            path: "/bed-table",
            name: "Bed Assign",
            icon: <FaBed />,
            show: userType === "Admin",
          }
        ],
      },
      {
        path: "/q15-report",
        name: "Q15 Report",
        icon: <FaReceipt />,
        show: userType === "Admin",
      },
    ];
    
  
    useEffect(() => {
      const handleResize = () => {
        setIsOpen(window.innerWidth > 1068);
      };
  
      window.addEventListener("resize", handleResize);
  
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);
 
    const handleSubMenuClick = (index: number) => {
      setActiveSubmenu((prevActiveSubmenu) => {
        // Close the submenu if it's already open, or if the clicked item doesn't have a submenu
        return prevActiveSubmenu === index || !menuItem[index].submenu ? null : index;
      });
    };
    
  return (
    <div className="container1">
      <div style={{ width: isOpen ? "300px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            M H C
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px"}} className="bars">
            <FaBars onClick={toggle} style={{cursor:'pointer'}}/>
          </div>
        </div>
        {menuItem.map((item, index) =>
  item.show ? (
    <React.Fragment key={index}>
      {item.submenu ? (
        <div
          onClick={() => handleSubMenuClick(index)}
          className="link"
        >
          <div className="icon" title={item.name}>{item.icon}</div>
          <div
            style={{ display: isOpen ? "block" : "none" }}
            className="link_text"
          >
            {item.name}
          </div>
        </div>
      ) : (
        <NavLink to={item.path} key={index}  className="link">
          <div className="icon" title={item.name}>{item.icon}</div>
          <div
            style={{ display: isOpen ? "block" : "none" }}
            className="link_text"
          >
            {item.name}
          </div>
        </NavLink>
      )}
      {
        activeSubmenu === index &&
        item.submenu &&
        item.submenu.length > 0 && (
          <div className="submenu">
            {item.submenu.map((subItem, subIndex) => (
              <NavLink style={{height: isOpen? "" : "3em"}}
                to={subItem.path}
                key={subIndex}
                className="link"
              >
                <div className="icon" title={subItem.name}style={{ marginLeft: isOpen ? "15%":"-37%",display:isOpen ?"":'flex' }}>
                  <span style={{position:'relative',top:'-8px'}}>{isOpen? "" : "→"}</span>{subItem.icon}
                </div>
                <div className="link_text">{subItem.name}</div>
              </NavLink>
            ))}
          </div>
        )}
    </React.Fragment>
  ) : null
)}

      </div>
      <div
        className="w-100"
        style={{
          marginLeft: isOpen ? "300px" : "50px",
          marginTop: 0,
          overflowY: "auto",
        }}
      >
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Sidebar;

