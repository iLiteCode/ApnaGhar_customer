// import React, { useState, useEffect, useContext, useRef } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { SearchContext } from "../containers/SearchContext";
// import NavbarSearch from "../containers/NavbarSearch";
// import Login1 from "../auth/Login1";
// import SignUp1 from "../auth/SignUp1";
// import { useHistory } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import { IoCloseCircleOutline } from "react-icons/io5";

// import { FiUser, FiMenu, FiHeadphones, FiPhoneCall } from "react-icons/fi";
// const HorizontalNav = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
//   const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const dropdownRef = useRef(null); // Reference to the dropdown menu
//   const { propertyCity, setPropertyCity } = useContext(SearchContext);
//   const { searchCity, setSearchCity } = useContext(SearchContext);
//   const [inputValue, setInputValue] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [type, setType] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const location = useLocation();
//   const history = useHistory();
//   const isPropertyDashboard = location.pathname === "/property-dashboard";
//   const [profileImage, setProfileImage] = useState("");
//   const [showLogoPreview, setShowLogoPreview] = useState(false);
//   const [isContactOpen, setIsContactOpen] = useState(false);


//   const searchBarRoutes = [
//     "/property",
//     "/advisordashboard",
//     "/searchdashboard",
//     "/allproperties",
//   ];

//   const showSearchBar =
//     [

//       "/searchdashboard",
//       "/property",
//       "/advisordashboard",
//       "/featuredDashboard",
//       "/recommendedpropertiesDashboard",
//     ].includes(location.pathname) ||
//     location.pathname.startsWith("/citywiseproperties");

//   const hideTabLinks = showSearchBar;

//   // useEffect(() => {
//   //   if (!showSearchBar) {
//   //     setSearchCity("");
//   //     setInputValue("");
//   //   }
//   // }, [location.pathname]);

//   const checkLoginStatus = () => {
//     const userId = sessionStorage.getItem("accessToken");
//     setIsLoggedIn(!!userId);
//   };
//   useEffect(() => {
//     if (isContactOpen) {
//       const timer = setTimeout(() => {
//         setIsContactOpen(false);
//       }, 5000); // Closes after 5 seconds
//       return () => clearTimeout(timer);
//     }
//   }, [isContactOpen]);

//   useEffect(() => {
//     checkLoginStatus();
//     const intervalId = setInterval(checkLoginStatus, 1000);
//     return () => clearInterval(intervalId);
//   }, []);

//   const handleLogout = () => {
//     setShowModal(true); // open custom modal
//   };

//   const confirmLogout = () => {
//     sessionStorage.clear();
//     setShowModal(false);
//     toast.success("Logout Successfully");
//     setIsLoggedIn(false);
//     history.push("/");
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target)
//       ) {
//         setIsDropdownOpen(false);
//       }
//     };

//     if (isDropdownOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isDropdownOpen]);

//   const [freePostCount, setFreePostCount] = useState(0);
//   const userId = sessionStorage.getItem("accessToken");
//   const userType = sessionStorage.getItem("user_type");

//   useEffect(() => {
//     const checkPostLimits = async () => {
//       try {
//         const profileForm = new FormData();
//         profileForm.append("user_id", userId);

//         const profileResponse = await axios.post(
//           `${process.env.REACT_APP_API_URL}/cust_api/get_profile`,
//           profileForm,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           },
//         );

//         const countData = profileResponse?.data?.count_data;

//         if (countData) {
//           setFreePostCount(countData.free_post_count || 0);
//         }
//         setProfileImage(profileResponse?.data?.data?.profile_image || "");
//       } catch (error) {
//         console.error("Error checking post limits:", error);
//       }
//     };

//     if (userId) {
//       checkPostLimits();
//     }
//   }, [userId]);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   // Prevent background scrolling when modal is open
//   useEffect(() => {
//     if (isLoginModalOpen || isSignUpModalOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//     // Cleanup when component unmounts
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [isLoginModalOpen, isSignUpModalOpen]);

//   return (
//     <nav className="flex flex-wrap items-center justify-between px-4 py-3 text-sm font-light bg-white rounded-lg md:flex-nowrap lg:px-8 gap-y-4 md:gap-y-0 shadow-sm">

//       {/* 1. Left side: Logo */}
//       <div className="flex items-center justify-between w-full md:w-auto flex-shrink-0">
//         <Link to="/" className="cursor-pointer">
//           <img
//             src="/image/app.png"
//             alt="NoWayBroker Logo"
//             className="w-[120px] h-[115px]"
//           />
//         </Link>
//         {/* 1. Left side: Logo */}
//         {/* <div className="flex items-center justify-between w-full md:w-auto flex-shrink-0">
//         <Link to="/" className="flex items-center">
//           <img
//             src="/image/app.png"
//             alt="NoWayBroker Logo"
//             className="w-full h-auto object-contain min-w-[64px] max-w-[160px]"
//           />
//         </Link> */}
//         {/* Hamburger Menu for Mobile */}
//         <button
//           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//           className="md:hidden focus:outline-none"
//         >
//           <FiMenu className="text-2xl text-black" />
//         </button>
//       </div>

//       {/* --- DESKTOP WRAPPER (Forces Links & Buttons on ONE line) --- */}
//       <div
//         className={`${isMobileMenuOpen ? "flex" : "hidden"
//           } flex-col items-center w-full mt-2 space-y-4 md:space-y-0 md:mt-0 md:flex md:flex-row md:flex-1 md:justify-between md:ml-8`}
//       >

//         {/* 2. Middle: Navigation Tabs and Search Bar */}
//         <div className="flex justify-center w-full md:w-auto md:flex-1">
//           {showSearchBar && (
//             // <div className="flex items-center flex-wrap gap-2 my-border rounded-md px-3 py-2 w-full md:w-[300px] bg-white min-h-12">
//             //   {searchCity && (
//             //     <span className="flex items-center px-3 py-1 text-sm text-black bg-gray-200 rounded-full">
//             //       {searchCity}
//             //       <button
//             //         className="ml-2 text-black hover:text-gray-600 focus:outline-none"
//             //         onClick={() => setSearchCity("")}
//             //       >
//             //         ✕
//             //       </button>
//             //     </span>
//             //   )}

//             //   {searchQuery && (
//             //     <span className="flex items-center px-3 py-1 text-sm text-black bg-gray-200 rounded-full">
//             //       {searchQuery}
//             //       <button
//             //         className="ml-2 text-black hover:text-gray-600 focus:outline-none"
//             //         onClick={() => setSearchQuery("")}
//             //       >
//             //         ✕
//             //       </button>
//             //     </span>
//             //   )}

//             //   <input
//             //     type="text"
//             //     className="bg-transparent border-none outline-none"
//             //     placeholder="Search Location..."
//             //     value={inputValue}
//             //     onChange={(e) => setInputValue(e.target.value)}
//             //     onKeyDown={(e) => {
//             //       if (e.key === "Enter" && inputValue.trim() !== "") {
//             //         setSearchCity(inputValue.trim());
//             //         setInputValue("");
//             //       }
//             //     }}
//             //   />
//             // </div>
//             <NavbarSearch />
//           )}

//           {!hideTabLinks && (
//             <ul className="flex flex-col items-center w-full p-0 m-0 space-y-4 md:flex-row md:space-y-0 md:space-x-4 lg:space-x-8 md:w-auto">
//               <li>
//                 <Link
//                   to={{
//                     pathname: "/property",
//                     state: {
//                       propertyType: "Buy",
//                       cityName: sessionStorage.getItem("cityName") || "",
//                     },
//                   }}
//                   className="text-base font-medium tracking-wider text-gray-600 no-underline transition lg:text-lg hover:my-text hover:no-underline whitespace-nowrap"
//                 >
//                   For Buyers
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to={{
//                     pathname: "/property",
//                     state: {
//                       propertyType: "Rent",
//                       cityName: sessionStorage.getItem("cityName") || "",
//                     },
//                   }}
//                   className="text-base font-medium tracking-wider text-gray-600 no-underline transition lg:text-lg hover:my-text hover:no-underline whitespace-nowrap"
//                 >
//                   For Tenants
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to={{
//                     pathname: "/advisordashboard",
//                     search: "?label=Owner",
//                     state: {
//                       cityName: sessionStorage.getItem("cityName") || "",
//                     },
//                   }}
//                   className="text-base font-medium tracking-wider text-gray-600 no-underline transition lg:text-lg hover:my-text hover:no-underline whitespace-nowrap"
//                 >
//                   For Owners
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to={{
//                     pathname: "/advisordashboard",
//                     search: "?label=Builder",
//                     state: {
//                       cityName: sessionStorage.getItem("cityName") || "",
//                     },
//                   }}
//                   className="text-base font-medium tracking-wider text-gray-600 no-underline transition lg:text-lg hover:my-text hover:no-underline whitespace-nowrap"
//                 >
//                   For Builders
//                 </Link>
//               </li>
//             </ul>
//           )}
//         </div>

//         {/* 3. Right side: Buttons and Icons */}
//         <div className="flex flex-col items-center w-full space-y-4 md:w-auto md:flex-row md:space-y-0 md:space-x-3 lg:space-x-4 flex-shrink-0">

//           <Link
//             to="/download"
//             className="px-3 py-2 text-sm font-medium no-underline transition border rounded lg:text-base my-text border-rose-500 hover:text-rose-700 hover:no-underline whitespace-nowrap"
//           >
//             Download Mobile App
//           </Link>

//           {isLoggedIn ? (
//             <Link
//               to="/add_new_property"
//               className="px-3 py-2 text-sm font-medium text-center text-white no-underline transition border border-gray-300 rounded lg:text-base my-bg hover:my-bg hover:no-underline whitespace-nowrap"
//             >
//               Post Property{" "}
//               {freePostCount > 0 && (
//                 <span className="px-2 py-0 ml-1 text-xs text-black bg-green-500 rounded-full">
//                   FREE
//                 </span>
//               )}
//             </Link>
//           ) : (
//             <button
//               onClick={() => setIsLoginModalOpen(true)}
//               className="px-3 py-2 text-sm font-medium text-center text-white transition border border-gray-300 rounded lg:text-base my-bg hover:my-bg hover:no-underline whitespace-nowrap"
//             >
//               Post Property{" "}
//               <span className="px-2 py-0 ml-1 text-xs text-black bg-green-500 rounded-full">
//                 FREE
//               </span>
//             </button>
//           )}

//           {isLoggedIn && userType !== "Owner" && (
//             <Link
//               to="/add_new_project"
//               className="no-underline hover:no-underline whitespace-nowrap"
//             >
//               <button className="px-3 py-2 text-sm font-medium text-center text-white transition border border-gray-300 rounded lg:text-base my-bg hover:my-bg">
//                 Post Project
//               </button>
//             </Link>
//           )}

//           {/* Icons Block (Headphones & Profile) */}
//           <div className="flex items-center space-x-3 lg:space-x-4">

//             {/* Contact Us Popover */}
//             <div className="relative flex items-center">
//               <button
//                 onClick={() => setIsContactOpen(!isContactOpen)}
//                 className="flex items-center justify-center p-2 text-black transition bg-gray-100 rounded-full focus:outline-none hover:bg-gray-200"
//               >
//                 <FiHeadphones className="text-2xl" />
//               </button>

//               {isContactOpen && (
//                 <div className="absolute right-0 z-50 p-6 mt-2 bg-white border border-gray-200 shadow-2xl top-12 rounded-xl w-[340px]">
//                   <h4 className="mb-5 text-[13px] font-bold tracking-wider text-[#0f172a] uppercase">
//                     Contact Us
//                   </h4>

//                   {/* Toll Free */}
//                   <div className="flex items-start mb-6">
//                     {/* Solid Phone Icon */}
//                     <svg className="w-[18px] h-[18px] mt-1 mr-4 text-[#334155] fill-current" viewBox="0 0 24 24">
//                       <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
//                     </svg>
//                     <div>
//                       <p className="mb-1 text-[13px] font-medium text-gray-500 leading-tight">
//                         Toll Free | 9:30 AM to 6:30 PM <br /> (Mon-Sun)
//                       </p>
//                       <p className="text-[19px] font-bold text-[#1e293b]">
//                         +91 8600199570
//                       </p>
//                     </div>
//                   </div>

//                   {/* International Users */}
//                   <div className="flex items-center justify-between mb-6">
//                     <div className="flex items-start">
//                       {/* Solid Phone Icon */}
//                       <svg className="w-[18px] h-[18px] mt-1 mr-4 text-[#334155] fill-current" viewBox="0 0 24 24">
//                         <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
//                       </svg>
//                       <div>
//                         <p className="mb-1 text-[13px] font-medium text-gray-500 leading-tight">
//                           For International Users
//                         </p>
//                         <p className="text-[19px] font-bold text-[#1e293b]">
//                           +91-120-6637501
//                         </p>
//                       </div>
//                     </div>
//                     {/* Small dark triangle arrow */}
//                     <div className="mb-2 text-xl text-[#1e293b]">
//                       ▸
//                     </div>
//                   </div>

//                   {/* Call Back Button */}
//                   <button className="flex items-center justify-center w-full py-2.5 mb-4 text-[15px] font-bold text-[#4064d7] transition bg-white border-[1.5px] border-[#4064d7] rounded-[4px] hover:bg-blue-50">
//                     <FiPhoneCall className="mr-2 text-lg" /> Request a Call Back
//                   </button>

//                   {/* FAQ Link */}
//                   <p className="m-0 text-[13px] text-gray-800">
//                     To check all the FAQ{" "}
//                     <Link to="/faq" className="text-[#4064d7] no-underline hover:underline">
//                       click here
//                     </Link>
//                   </p>
//                 </div>
//               )}
//             </div>

//             {/* Profile Dropdown */}
//             <div className="relative flex items-center" ref={dropdownRef}>
//               {isLoggedIn ? (
//                 <>
//                   <button
//                     onClick={() => setIsDropdownOpen((prev) => !prev)}
//                     className="focus:outline-none"
//                   >
//                     {profileImage &&
//                       profileImage !== "null" &&
//                       profileImage.trim() !== "" ? (
//                       <img
//                         src={profileImage}
//                         alt="Profile"
//                         className="object-cover w-10 h-10 border border-gray-300 rounded-full"
//                       />
//                     ) : (
//                       <FiUser
//                         className="p-2 text-black bg-gray-100 rounded-full"
//                         style={{ fontSize: "40px" }}
//                       />
//                     )}
//                   </button>

//                   {isDropdownOpen && (
//                     <div className="absolute right-0 z-50 mt-2 bg-white border border-gray-200 rounded-md shadow-lg top-12 w-44">
//                       <ul className="py-2 pl-0 m-0 list-none">
//                         <li>
//                           <Link
//                             to={{ pathname: "/dashboard", state: { page: "profile" } }}
//                             onClick={() => setIsDropdownOpen(false)}
//                             className="block px-4 py-2 text-gray-800 no-underline hover:bg-gray-100 hover:no-underline"
//                           >
//                             Profile
//                           </Link>
//                         </li>
//                         <li>
//                           <Link
//                             to={{ pathname: "/dashboard", state: { page: "myProperties" } }}
//                             onClick={() => setIsDropdownOpen(false)}
//                             className="block px-4 py-2 text-gray-800 no-underline hover:bg-gray-100 hover:no-underline"
//                           >
//                             My Properties
//                           </Link>
//                         </li>
//                         <li>
//                           <Link
//                             to={{ pathname: "/dashboard", state: { page: "myVirtualtour" } }}
//                             onClick={() => setIsDropdownOpen(false)}
//                             className="block px-4 py-2 text-gray-800 no-underline hover:bg-gray-100 hover:no-underline"
//                           >
//                             My Virtual Tour
//                           </Link>
//                         </li>
//                         <li>
//                           <Link
//                             to={{ pathname: "/dashboard", state: { page: "myFavourite" } }}
//                             onClick={() => setIsDropdownOpen(false)}
//                             className="block px-4 py-2 text-gray-800 no-underline hover:bg-gray-100 hover:no-underline"
//                           >
//                             My Favourites
//                           </Link>
//                         </li>
//                         <li>
//                           <Link
//                             to={{ pathname: "/dashboard", state: { page: "saveSerches" } }}
//                             onClick={() => setIsDropdownOpen(false)}
//                             className="block px-4 py-2 text-gray-800 no-underline hover:bg-gray-100 hover:no-underline"
//                           >
//                             Saved Searches
//                           </Link>
//                         </li>
//                         <li>
//                           <button
//                             onClick={() => {
//                               setIsDropdownOpen(false);
//                               handleLogout();
//                             }}
//                             className="w-full px-4 py-2 text-left text-gray-800 no-underline hover:bg-gray-100 hover:no-underline"
//                           >
//                             Logout
//                           </button>
//                         </li>
//                       </ul>
//                     </div>
//                   )}
//                 </>
//               ) : (
//                 <button
//                   onClick={() => setIsLoginModalOpen(true)}
//                   className="focus:outline-none"
//                 >
//                   <FiUser
//                     className="p-2 text-black bg-gray-100 rounded-full"
//                     style={{ fontSize: "40px" }}
//                   />
//                 </button>
//               )}
//             </div>

//           </div>
//         </div>
//       </div>

//       {/* Logout Warning Modal */}
//       {
//         showModal && (
//           <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-50">
//             <div className="relative p-6 text-center bg-white shadow-lg rounded-2xl w-96">
//               <button
//                 className="absolute text-2xl text-black top-2 right-2"
//                 onClick={() => setShowModal(false)}
//               >
//                 <IoCloseCircleOutline />
//               </button>
//               <h2 className="text-2xl font-semibold">Are you sure?</h2>
//               <p className="mt-2 text-gray-500">You will be logged out!</p>
//               <div className="flex justify-center gap-6 mt-4">
//                 <button
//                   className="px-8 py-2 text-white my-bg rounded-md hover:my-bg"
//                   onClick={confirmLogout}
//                 >
//                   Yes, logout!
//                 </button>
//                 <button
//                   className="px-8 py-2 text-black bg-white border border-black rounded-md hover:bg-gray-100"
//                   onClick={() => setShowModal(false)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )
//       }

//       {/* Auth & Image Modals */}
//       <Login1
//         isOpen={isLoginModalOpen}
//         onClose={() => setIsLoginModalOpen(false)}
//         onSwitchToSignUp={() => {
//           setIsLoginModalOpen(false);
//           setIsSignUpModalOpen(true);
//         }}
//       />
//       <SignUp1
//         isOpen={isSignUpModalOpen}
//         onClose={() => setIsSignUpModalOpen(false)}
//         onSwitchToLogin={() => {
//           setIsSignUpModalOpen(false);
//           setIsLoginModalOpen(true);
//         }}
//       />
//       {
//         showLogoPreview && (
//           <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-80">
//             <button
//               onClick={() => setShowLogoPreview(false)}
//               className="absolute text-4xl text-white top-5 right-5"
//             >
//               <IoCloseCircleOutline />
//             </button>
//             <img
//               src="/image/app.png"
//               alt="Logo Preview"
//               className="max-w-[90%] max-h-[90vh] object-contain rounded-xl"
//             />
//           </div>
//         )
//       }
//     </nav >
//   );
// };

// export default HorizontalNav;
// ===========================================2=================================================


// import React, { useState, useEffect, useLayoutEffect, useContext, useRef } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { SearchContext } from "../containers/SearchContext";
// import NavbarSearch from "../containers/NavbarSearch";
// import Login1 from "../auth/Login1";
// import SignUp1 from "../auth/SignUp1";
// import { useHistory } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import { IoCloseCircleOutline } from "react-icons/io5";

// import {
//   FiUser,
//   FiMenu,
//   FiHeadphones,
//   FiPhoneCall,
//   FiPlus,
//   // NEW (UI only): icons for the redesigned nav
//   FiHome,
//   FiKey,
//   FiUsers,
//   FiSmartphone,
//   FiBell,
//   FiChevronDown,
// } from "react-icons/fi";
// import { HiOutlineOfficeBuilding } from "react-icons/hi";

// const HorizontalNav = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
//   const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const dropdownRef = useRef(null); // Reference to the dropdown menu
//   const { propertyCity, setPropertyCity } = useContext(SearchContext);
//   const { searchCity, setSearchCity } = useContext(SearchContext);
//   const [inputValue, setInputValue] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [type, setType] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const location = useLocation();
//   const history = useHistory();
//   const isPropertyDashboard = location.pathname === "/property-dashboard";
//   const [profileImage, setProfileImage] = useState("");
//   const [showLogoPreview, setShowLogoPreview] = useState(false);
//   const [isContactOpen, setIsContactOpen] = useState(false);


//   // ==========================================================
//   // NEW: FIXED HEADER
//   // The header wrapper is position:fixed. A spacer with the header's real
//   // measured height sits where the header used to be, so page content starts
//   // exactly below it on every screen size — no hard-coded padding needed in
//   // the layout. ResizeObserver keeps the spacer correct when the header
//   // wraps (tablet) or the mobile menu opens.
//   // ==========================================================

//   const headerRef = useRef(null);
//   const [headerHeight, setHeaderHeight] = useState(0);

//   useLayoutEffect(() => {
//     const el = headerRef.current;
//     if (!el) return undefined;

//     const update = () => setHeaderHeight(el.offsetHeight);
//     update();

//     let observer;
//     if (typeof ResizeObserver !== "undefined") {
//       observer = new ResizeObserver(update);
//       observer.observe(el);
//     }
//     window.addEventListener("resize", update);

//     return () => {
//       if (observer) observer.disconnect();
//       window.removeEventListener("resize", update);
//     };
//   }, []);


//   const searchBarRoutes = [
//     "/property",
//     "/advisordashboard",
//     "/searchdashboard",
//     "/allproperties",
//   ];

//   const showSearchBar =
//     [

//       "/searchdashboard",
//       "/property",
//       "/advisordashboard",
//       "/featuredDashboard",
//       "/recommendedpropertiesDashboard",
//     ].includes(location.pathname) ||
//     location.pathname.startsWith("/citywiseproperties");

//   const hideTabLinks = showSearchBar;

//   const checkLoginStatus = () => {
//     const userId = sessionStorage.getItem("accessToken");
//     setIsLoggedIn(!!userId);
//   };

//   useEffect(() => {
//     if (isContactOpen) {
//       const timer = setTimeout(() => {
//         setIsContactOpen(false);
//       }, 5000); // Closes after 5 seconds
//       return () => clearTimeout(timer);
//     }
//   }, [isContactOpen]);

//   useEffect(() => {
//     checkLoginStatus();
//     const intervalId = setInterval(checkLoginStatus, 1000);
//     return () => clearInterval(intervalId);
//   }, []);

//   const handleLogout = () => {
//     setShowModal(true); // open custom modal
//   };

//   const confirmLogout = () => {
//     sessionStorage.clear();
//     setShowModal(false);
//     toast.success("Logout Successfully");
//     setIsLoggedIn(false);
//     history.push("/");
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target)
//       ) {
//         setIsDropdownOpen(false);
//       }
//     };

//     if (isDropdownOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isDropdownOpen]);

//   const [freePostCount, setFreePostCount] = useState(0);
//   const userId = sessionStorage.getItem("accessToken");
//   const userType = sessionStorage.getItem("user_type");

//   useEffect(() => {
//     const checkPostLimits = async () => {
//       try {
//         const profileForm = new FormData();
//         profileForm.append("user_id", userId);

//         const profileResponse = await axios.post(
//           `${process.env.REACT_APP_API_URL}/cust_api/get_profile`,
//           profileForm,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           },
//         );

//         const countData = profileResponse?.data?.count_data;

//         if (countData) {
//           setFreePostCount(countData.free_post_count || 0);
//         }
//         setProfileImage(profileResponse?.data?.data?.profile_image || "");
//       } catch (error) {
//         console.error("Error checking post limits:", error);
//       }
//     };

//     if (userId) {
//       checkPostLimits();
//     }
//   }, [userId]);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   // ==========================================================
//   // NEW (UI only): which nav tab is currently active.
//   // Derived from the route the existing links already push to, so no new
//   // state is introduced. Buyers/Tenants both land on /property, so they are
//   // told apart by the propertyType the link puts in location.state.
//   // ==========================================================

//   const navParams = new URLSearchParams(location.search);

//   const isNavActive = (kind) => {
//     switch (kind) {
//       case "Buy":
//         return location.pathname === "/property" && location.state?.propertyType === "Buy";
//       case "Rent":
//         return location.pathname === "/property" && location.state?.propertyType === "Rent";
//       case "Owner":
//         return location.pathname === "/advisordashboard" && navParams.get("label") === "Owner";
//       case "Builder":
//         return location.pathname === "/advisordashboard" && navParams.get("label") === "Builder";
//       case "Download":
//         return location.pathname === "/download";
//       default:
//         return false;
//     }
//   };

//   // Shared class for the stacked icon + label tabs.
//   const navTabClass = (active) =>
//     `group relative flex flex-col items-center gap-1 px-1 pb-2 text-[14px] font-medium no-underline transition-colors whitespace-nowrap hover:no-underline ${active ? "text-[#D61F45]" : "text-gray-600 hover:text-[#D61F45]"
//     }`;

//   // ==========================================================
//   // NEW (UI only): notifications bell.
//   //
//   // FIXED: the bell NO LONGER navigates anywhere. It opens a small panel
//   // right under the icon, exactly like the support panel and the profile
//   // dropdown already do. Nothing about /dashboard is touched — the
//   // dashboard routes, links and page states elsewhere in this file are
//   // completely unchanged.
//   //
//   // There is no notifications endpoint in this component, so `notifications`
//   // stays empty and the panel shows an empty state. Fill this array from
//   // your API when you have one and the list + red dot light up on their own.
//   // ==========================================================

//   const [notificationCount, setNotificationCount] = useState(0);
//   const [notifications, setNotifications] = useState([]); // NEW: [{ id, title, text, time }]
//   const [isNotificationOpen, setIsNotificationOpen] = useState(false); // NEW
//   const notificationRef = useRef(null); // NEW: anchor for click-outside

//   // NEW: keep the red dot in sync with the real list length.
//   useEffect(() => {
//     setNotificationCount(notifications.length);
//   }, [notifications]);

//   // NEW: close the notification panel on an outside click.
//   // This is a SEPARATE effect — the existing profile-dropdown
//   // click-outside effect above is untouched.
//   useEffect(() => {
//     const handleNotificationOutside = (event) => {
//       if (
//         notificationRef.current &&
//         !notificationRef.current.contains(event.target)
//       ) {
//         setIsNotificationOpen(false);
//       }
//     };

//     if (isNotificationOpen) {
//       document.addEventListener("mousedown", handleNotificationOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleNotificationOutside);
//     };
//   }, [isNotificationOpen]);


//   // Prevent background scrolling when modal is open
//   useEffect(() => {
//     if (isLoginModalOpen || isSignUpModalOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//     // Cleanup when component unmounts
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [isLoginModalOpen, isSignUpModalOpen]);

//   return (
//     <>

//       {/* NEW: fixed-header styles */}
//       <style>{`
//         .apnaghar-fixed-header {
//           position: fixed;
//           top: 0;
//           left: 0;
//           right: 0;
//           width: 100%;
//           z-index: 1000;
//           padding: 12px 12px 0;      /* keeps the pill off the screen edges */
//           box-sizing: border-box;
//           pointer-events: none;      /* the transparent gutter never blocks the page */
//         }

//         .apnaghar-fixed-header > * {
//           pointer-events: auto;      /* the header itself stays fully clickable */
//         }

//         /* Mobile: if the open hamburger menu is taller than the screen,
//            let it scroll instead of running off the bottom. */
//         @media (max-width: 767px) {
//           .apnaghar-fixed-header {
//             max-height: 100vh;
//             overflow-y: auto;
//           }
//         }
//       `}</style>

//       {/* NEW: spacer — reserves exactly the header's height in the page flow */}
//       <div aria-hidden="true" style={{ height: headerHeight }} />

//       {/* NEW: fixed wrapper — the existing <nav> below is unchanged */}
//       <div ref={headerRef} className="apnaghar-fixed-header" data-fixed-header="">

//         {/* UI: pill nav with a soft brand-tinted glow, per the reference */}
//         <nav className="relative flex flex-wrap items-center justify-between w-full px-5 py-3 text-sm font-light bg-white border border-gray-100 rounded-full md:flex-nowrap lg:px-7 gap-y-4 md:gap-y-0 shadow-[0_10px_40px_rgba(214,31,69,0.14)]">

//           {/* 1. Left side: Logo */}
//           <div className="flex items-center justify-between w-full md:w-auto flex-shrink-0">
//             <Link
//               to="/"
//               className="flex items-center gap-2.5 no-underline hover:no-underline group"
//             >
//               {/* UI: slate square "A" -> red house mark */}
//               <span className="flex items-center justify-center transition-transform duration-300 w-11 h-11 group-hover:scale-105">
//                 <svg viewBox="0 0 48 48" className="w-full h-full" aria-hidden="true">
//                   <path
//                     d="M24 5 3 23h6v18a2 2 0 0 0 2 2h26a2 2 0 0 0 2-2V23h6L24 5Z"
//                     fill="#D61F45"
//                   />
//                   <rect x="15" y="27" width="6.5" height="6.5" rx="1.4" fill="#fff" />
//                   <rect x="26.5" y="27" width="6.5" height="6.5" rx="1.4" fill="#fff" />
//                   <rect x="15" y="36" width="6.5" height="6.5" rx="1.4" fill="#fff" />
//                   <rect x="26.5" y="36" width="6.5" height="6.5" rx="1.4" fill="#fff" />
//                 </svg>
//               </span>

//               <span className="flex flex-col leading-none">
//                 <span
//                   className="text-[21px] font-bold text-[#17253a]"
//                   style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
//                 >
//                   {/* UI: amber -> brand red */}
//                   Apna<span className="text-[#D61F45]">Ghar</span>
//                 </span>
//                 {/* UI: new tagline from the reference */}
//                 <span className="mt-1 text-[11px] font-medium text-gray-400 tracking-wide">
//                   Find. Buy. Rent. Live Better.
//                 </span>
//               </span>
//             </Link>

//             {/* Hamburger Menu for Mobile */}
//             <button
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="md:hidden focus:outline-none"
//             >
//               <FiMenu className="text-2xl text-[#D61F45]" />
//             </button>
//           </div>

//           {/* --- DESKTOP WRAPPER (Forces Links & Buttons on ONE line) --- */}
//           <div
//             className={`${isMobileMenuOpen ? "flex" : "hidden"
//               } flex-col items-center w-full mt-2 space-y-4 md:space-y-0 md:mt-0 md:flex md:flex-row md:flex-1 md:justify-between md:ml-6`}
//           >

//             {/* 2. Middle: Navigation Tabs and Search Bar */}
//             <div className="flex justify-center w-full md:w-auto md:flex-1">
//               {showSearchBar && <NavbarSearch />}

//               {!hideTabLinks && (
//                 <ul className="flex flex-col items-center w-full p-0 m-0 space-y-4 md:flex-row md:space-y-0 md:space-x-6 lg:space-x-8 md:w-auto md:border-l md:border-gray-200 md:pl-6 lg:pl-8">
//                   <li>
//                     <Link
//                       to={{
//                         pathname: "/property",
//                         state: {
//                           propertyType: "Buy",
//                           cityName: sessionStorage.getItem("cityName") || "",
//                         },
//                       }}
//                       className={navTabClass(isNavActive("Buy"))}
//                     >
//                       {/* UI: icon above the label */}
//                       <FiHome size={19} />
//                       For Buyers
//                       {/* UI: active underline */}
//                       <span
//                         className={`absolute bottom-0 left-0 right-0 h-[3px] rounded-full bg-[#D61F45] transition-opacity ${isNavActive("Buy") ? "opacity-100" : "opacity-0"
//                           }`}
//                       />
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to={{
//                         pathname: "/property",
//                         state: {
//                           propertyType: "Rent",
//                           cityName: sessionStorage.getItem("cityName") || "",
//                         },
//                       }}
//                       className={navTabClass(isNavActive("Rent"))}
//                     >
//                       <FiKey size={19} />
//                       For Tenants
//                       <span
//                         className={`absolute bottom-0 left-0 right-0 h-[3px] rounded-full bg-[#D61F45] transition-opacity ${isNavActive("Rent") ? "opacity-100" : "opacity-0"
//                           }`}
//                       />
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to={{
//                         pathname: "/advisordashboard",
//                         search: "?label=Owner",
//                         state: {
//                           cityName: sessionStorage.getItem("cityName") || "",
//                         },
//                       }}
//                       className={navTabClass(isNavActive("Owner"))}
//                     >
//                       <FiUsers size={19} />
//                       For Owners
//                       <span
//                         className={`absolute bottom-0 left-0 right-0 h-[3px] rounded-full bg-[#D61F45] transition-opacity ${isNavActive("Owner") ? "opacity-100" : "opacity-0"
//                           }`}
//                       />
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to={{
//                         pathname: "/advisordashboard",
//                         search: "?label=Builder",
//                         state: {
//                           cityName: sessionStorage.getItem("cityName") || "",
//                         },
//                       }}
//                       className={navTabClass(isNavActive("Builder"))}
//                     >
//                       <HiOutlineOfficeBuilding size={20} />
//                       For Builders
//                       <span
//                         className={`absolute bottom-0 left-0 right-0 h-[3px] rounded-full bg-[#D61F45] transition-opacity ${isNavActive("Builder") ? "opacity-100" : "opacity-0"
//                           }`}
//                       />
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/download"
//                       className={navTabClass(isNavActive("Download"))}
//                     >
//                       <FiSmartphone size={19} />
//                       Download App
//                       <span
//                         className={`absolute bottom-0 left-0 right-0 h-[3px] rounded-full bg-[#D61F45] transition-opacity ${isNavActive("Download") ? "opacity-100" : "opacity-0"
//                           }`}
//                       />
//                     </Link>
//                   </li>
//                 </ul>
//               )}
//             </div>

//             {/* 3. Right side: Buttons and Icons */}
//             <div className="flex flex-col items-center w-full space-y-4 md:w-auto md:flex-row md:space-y-0 md:space-x-3 lg:space-x-4 flex-shrink-0 md:border-l md:border-gray-200 md:pl-4 lg:pl-6">

//               {/* UI: slate-900 -> brand red gradient pill */}
//               {isLoggedIn ? (
//                 <Link
//                   to="/add_new_property"
//                   className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-center text-white no-underline transition-all duration-200 bg-gradient-to-r from-[#D61F45] to-[#B91C3C] rounded-full shadow-[0_6px_18px_rgba(214,31,69,0.35)] hover:shadow-[0_10px_24px_rgba(214,31,69,0.45)] hover:-translate-y-0.5 hover:no-underline whitespace-nowrap"
//                 >
//                   <FiPlus size={16} />
//                   Post Property
//                   {freePostCount > 0 && (
//                     <span className="px-2 py-0.5 ml-1 text-[11px] font-bold text-white bg-green-500 rounded-full">
//                       FREE
//                     </span>
//                   )}
//                 </Link>
//               ) : (
//                 <button
//                   onClick={() => setIsLoginModalOpen(true)}
//                   className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-center text-white transition-all duration-200 bg-gradient-to-r from-[#D61F45] to-[#B91C3C] rounded-full shadow-[0_6px_18px_rgba(214,31,69,0.35)] hover:shadow-[0_10px_24px_rgba(214,31,69,0.45)] hover:-translate-y-0.5 hover:no-underline whitespace-nowrap"
//                 >
//                   <FiPlus size={16} />
//                   Post Property
//                   <span className="px-2 py-0.5 ml-1 text-[11px] font-bold text-white bg-green-500 rounded-full">
//                     FREE
//                   </span>
//                 </button>
//               )}

//               {/* UI: solid slate -> outlined red, same condition and route */}
//               {isLoggedIn && userType !== "Owner" && (
//                 <Link
//                   to="/add_new_project"
//                   className="no-underline hover:no-underline whitespace-nowrap"
//                 >
//                   <button className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-center text-[#D61F45] bg-white border-[1.5px] border-[#D61F45] rounded-full transition-all duration-200 hover:bg-[#D61F45] hover:text-white">
//                     <FiPlus size={16} />
//                     Post Project
//                   </button>
//                 </Link>
//               )}

//               {/* Icons Block (Headphones & Profile) */}
//               <div className="flex items-center space-x-3 lg:space-x-4">

//                 {/* Contact Us Popover */}
//                 <div className="relative flex items-center">
//                   {/* UI: grey circle -> soft pink circle with the brand red icon */}
//                   <button
//                     onClick={() => setIsContactOpen(!isContactOpen)}
//                     className="flex items-center justify-center w-10 h-10 text-[#D61F45] transition-all duration-200 bg-[#FDE8EC] rounded-full focus:outline-none hover:bg-[#FAD3DB] hover:scale-105"
//                   >
//                     <FiHeadphones className="text-xl" />
//                   </button>

//                   {isContactOpen && (
//                     <div className="absolute right-0 z-50 p-6 mt-2 bg-white border border-gray-200 shadow-2xl top-12 rounded-xl w-[340px]">
//                       <h4 className="mb-5 text-[13px] font-bold tracking-wider text-[#0f172a] uppercase">
//                         Contact Us
//                       </h4>

//                       {/* Toll Free */}
//                       <div className="flex items-start mb-6">
//                         <svg className="w-[18px] h-[18px] mt-1 mr-4 text-[#D61F45] fill-current" viewBox="0 0 24 24">
//                           <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
//                         </svg>
//                         <div>
//                           <p className="mb-1 text-[13px] font-medium text-gray-500 leading-tight">
//                             Toll Free | 9:30 AM to 6:30 PM <br /> (Mon-Sun)
//                           </p>
//                           <p className="text-[19px] font-bold text-[#1e293b]">
//                             +91 8127848127
//                             +91 8127288127

//                           </p>
//                         </div>
//                       </div>

//                       {/* International Users */}
//                       <div className="flex items-center justify-between mb-6">
//                         <div className="flex items-start">
//                           <svg className="w-[18px] h-[18px] mt-1 mr-4 text-[#D61F45] fill-current" viewBox="0 0 24 24">
//                             <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
//                           </svg>
//                           <div>
//                             <p className="mb-1 text-[13px] font-medium text-gray-500 leading-tight">
//                               For International Users
//                             </p>
//                             <p className="text-[19px] font-bold text-[#1e293b]">
//                               +91-120-6637501
//                             </p>
//                           </div>
//                         </div>
//                         <div className="mb-2 text-xl text-[#1e293b]">
//                           ▸
//                         </div>
//                       </div>

//                       {/* Call Back Button — UI: blue -> brand red */}
//                       <button className="flex items-center justify-center w-full py-2.5 mb-4 text-[15px] font-bold text-[#D61F45] transition bg-white border-[1.5px] border-[#D61F45] rounded-lg hover:bg-[#FDE8EC]">
//                         <FiPhoneCall className="mr-2 text-lg" /> Request a Call Back
//                       </button>

//                       {/* FAQ Link */}
//                       <p className="m-0 text-[13px] text-gray-800">
//                         To check all the FAQ{" "}
//                         <Link to="/faq" className="text-[#D61F45] no-underline hover:underline">
//                           click here
//                         </Link>
//                       </p>
//                     </div>
//                   )}
//                 </div>

//                 {/* ==================================================
//                     NEW (UI): notifications bell.

//                     FIXED: this is now a <button> that toggles the panel below.
//                     It does NOT navigate — clicking it no longer opens /dashboard
//                     or any other route, so the page you are on stays exactly where
//                     it is. Same absolute/z-50 pattern as the support panel and the
//                     profile dropdown already used in this file.
//                 ================================================== */}
//                 <div className="relative" ref={notificationRef}>
//                   <button
//                     type="button"
//                     onClick={() => setIsNotificationOpen((prev) => !prev)}
//                     title="Notifications"
//                     aria-haspopup="true"
//                     aria-expanded={isNotificationOpen}
//                     className={`relative flex items-center justify-center w-10 h-10 text-[#D61F45] transition-all duration-200 rounded-full focus:outline-none hover:scale-105 ${isNotificationOpen ? "bg-[#FAD3DB]" : "bg-[#FDE8EC] hover:bg-[#FAD3DB]"
//                       }`}
//                   >
//                     <FiBell className="text-xl" />
//                     {notificationCount > 0 && (
//                       <span className="absolute top-0 right-0 flex items-center justify-center min-w-[9px] h-[9px] bg-[#D61F45] rounded-full ring-2 ring-white" />
//                     )}
//                   </button>

//                   {/* Notification panel — opens in place, nothing is navigated */}
//                   {isNotificationOpen && (
//                     <div className="absolute right-0 z-50 mt-2 overflow-hidden bg-white border border-gray-200 shadow-2xl top-12 rounded-xl w-[320px]">

//                       {/* Panel header */}
//                       <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-[#FFF7F9]">
//                         <span className="text-[14px] font-bold text-[#17253a]">
//                           Notifications
//                         </span>
//                         {notificationCount > 0 && (
//                           <span className="px-2 py-0.5 text-[11px] font-bold text-white bg-[#D61F45] rounded-full">
//                             {notificationCount} new
//                           </span>
//                         )}
//                       </div>

//                       {/* Panel body */}
//                       <div className="max-h-[280px] overflow-y-auto">
//                         {notifications.length === 0 ? (
//                           /* Empty state — shown until you feed the array from your API */
//                           <div className="flex flex-col items-center justify-center px-4 py-8 text-center">
//                             <span className="flex items-center justify-center w-12 h-12 mb-3 rounded-full bg-[#FDE8EC] text-[#D61F45]">
//                               <FiBell className="text-xl" />
//                             </span>
//                             <p className="m-0 text-[13px] font-semibold text-[#17253a]">
//                               No new notifications
//                             </p>
//                             <p className="mt-1 mb-0 text-[12px] text-gray-500">
//                               Updates about your properties and enquiries will appear here.
//                             </p>
//                           </div>
//                         ) : (
//                           notifications.map((note) => (
//                             <div
//                               key={note.id}
//                               className="flex gap-3 px-4 py-3 transition-colors border-b border-gray-100 last:border-b-0 hover:bg-[#FFF7F9]"
//                             >
//                               <span className="flex items-center justify-center flex-shrink-0 w-8 h-8 mt-0.5 rounded-full bg-[#FDE8EC] text-[#D61F45]">
//                                 <FiBell className="text-sm" />
//                               </span>
//                               <div className="min-w-0">
//                                 <p className="m-0 text-[13px] font-semibold text-[#17253a] truncate">
//                                   {note.title}
//                                 </p>
//                                 {note.text && (
//                                   <p className="mt-0.5 mb-0 text-[12px] text-gray-600 line-clamp-2">
//                                     {note.text}
//                                   </p>
//                                 )}
//                                 {note.time && (
//                                   <p className="mt-1 mb-0 text-[11px] text-gray-400">
//                                     {note.time}
//                                   </p>
//                                 )}
//                               </div>
//                             </div>
//                           ))
//                         )}
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Profile Dropdown */}
//                 <div className="relative flex items-center md:border-l md:border-gray-200 md:pl-3 lg:pl-4" ref={dropdownRef}>
//                   {isLoggedIn ? (
//                     <>
//                       <button
//                         onClick={() => setIsDropdownOpen((prev) => !prev)}
//                         className="flex items-center gap-1.5 focus:outline-none group"
//                       >
//                         {profileImage &&
//                           profileImage !== "null" &&
//                           profileImage.trim() !== "" ? (
//                           <img
//                             src={profileImage}
//                             alt="Profile"
//                             className="object-cover w-10 h-10 border-2 border-[#FAD3DB] rounded-full transition-transform duration-200 group-hover:scale-105"
//                           />
//                         ) : (
//                           <span className="flex items-center justify-center w-10 h-10 text-[#D61F45] bg-[#FDE8EC] rounded-full transition-transform duration-200 group-hover:scale-105">
//                             <FiUser size={18} />
//                           </span>
//                         )}
//                         {/* UI: chevron from the reference */}
//                         <FiChevronDown
//                           size={16}
//                           className={`text-gray-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
//                         />
//                       </button>

//                       {isDropdownOpen && (
//                         <div className="absolute right-0 z-50 mt-2 overflow-hidden bg-white border border-gray-200 shadow-xl rounded-xl top-14 w-48">
//                           <ul className="py-2 pl-0 m-0 list-none">
//                             <li>
//                               <Link
//                                 to={{ pathname: "/dashboard", state: { page: "profile" } }}
//                                 onClick={() => setIsDropdownOpen(false)}
//                                 className="block px-4 py-2 text-gray-800 no-underline transition-colors hover:bg-[#FDE8EC] hover:text-[#D61F45] hover:no-underline"
//                               >
//                                 Profile
//                               </Link>
//                             </li>
//                             <li>
//                               <Link
//                                 to={{ pathname: "/dashboard", state: { page: "myProperties" } }}
//                                 onClick={() => setIsDropdownOpen(false)}
//                                 className="block px-4 py-2 text-gray-800 no-underline transition-colors hover:bg-[#FDE8EC] hover:text-[#D61F45] hover:no-underline"
//                               >
//                                 My Properties
//                               </Link>
//                             </li>
//                             <li>
//                               <Link
//                                 to={{ pathname: "/dashboard", state: { page: "myVirtualtour" } }}
//                                 onClick={() => setIsDropdownOpen(false)}
//                                 className="block px-4 py-2 text-gray-800 no-underline transition-colors hover:bg-[#FDE8EC] hover:text-[#D61F45] hover:no-underline"
//                               >
//                                 My Virtual Tour
//                               </Link>
//                             </li>
//                             <li>
//                               <Link
//                                 to={{ pathname: "/dashboard", state: { page: "myFavourite" } }}
//                                 onClick={() => setIsDropdownOpen(false)}
//                                 className="block px-4 py-2 text-gray-800 no-underline transition-colors hover:bg-[#FDE8EC] hover:text-[#D61F45] hover:no-underline"
//                               >
//                                 My Favourites
//                               </Link>
//                             </li>
//                             <li>
//                               <Link
//                                 to={{ pathname: "/dashboard", state: { page: "saveSerches" } }}
//                                 onClick={() => setIsDropdownOpen(false)}
//                                 className="block px-4 py-2 text-gray-800 no-underline transition-colors hover:bg-[#FDE8EC] hover:text-[#D61F45] hover:no-underline"
//                               >
//                                 Saved Searches
//                               </Link>
//                             </li>
//                             <li>
//                               <button
//                                 onClick={() => {
//                                   setIsDropdownOpen(false);
//                                   handleLogout();
//                                 }}
//                                 className="w-full px-4 py-2 text-left text-gray-800 no-underline transition-colors hover:bg-[#FDE8EC] hover:text-[#D61F45] hover:no-underline"
//                               >
//                                 Logout
//                               </button>
//                             </li>
//                           </ul>
//                         </div>
//                       )}
//                     </>
//                   ) : (
//                     <button
//                       onClick={() => setIsLoginModalOpen(true)}
//                       className="flex items-center gap-1.5 focus:outline-none group"
//                     >
//                       <span className="flex items-center justify-center w-10 h-10 text-[#D61F45] bg-[#FDE8EC] rounded-full transition-transform duration-200 group-hover:scale-105">
//                         <FiUser size={18} />
//                       </span>
//                       <FiChevronDown size={16} className="text-gray-400" />
//                     </button>
//                   )}
//                 </div>

//               </div>
//             </div>
//           </div>

//           {/* Logout Warning Modal */}
//           {
//             showModal && (
//               <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-50">
//                 <div className="relative p-6 text-center bg-white shadow-lg rounded-2xl w-96">
//                   <button
//                     className="absolute text-2xl text-black top-2 right-2"
//                     onClick={() => setShowModal(false)}
//                   >
//                     <IoCloseCircleOutline />
//                   </button>
//                   <h2 className="text-2xl font-semibold">Are you sure?</h2>
//                   <p className="mt-2 text-gray-500">You will be logged out!</p>
//                   <div className="flex justify-center gap-6 mt-4">
//                     {/* UI: slate -> brand red */}
//                     <button
//                       className="px-8 py-2 text-white bg-[#D61F45] rounded-md hover:bg-[#B91C3C] transition-colors"
//                       onClick={confirmLogout}
//                     >
//                       Yes, logout!
//                     </button>
//                     <button
//                       className="px-8 py-2 text-black bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
//                       onClick={() => setShowModal(false)}
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )
//           }

//           {/* Auth & Image Modals */}
//           <Login1
//             isOpen={isLoginModalOpen}
//             onClose={() => setIsLoginModalOpen(false)}
//             onSwitchToSignUp={() => {
//               setIsLoginModalOpen(false);
//               setIsSignUpModalOpen(true);
//             }}
//           />
//           <SignUp1
//             isOpen={isSignUpModalOpen}
//             onClose={() => setIsSignUpModalOpen(false)}
//             onSwitchToLogin={() => {
//               setIsSignUpModalOpen(false);
//               setIsLoginModalOpen(true);
//             }}
//           />
//           {
//             showLogoPreview && (
//               <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-80">
//                 <button
//                   onClick={() => setShowLogoPreview(false)}
//                   className="absolute text-4xl text-white top-5 right-5"
//                 >
//                   <IoCloseCircleOutline />
//                 </button>
//                 <img
//                   src="/image/app.png"
//                   alt="Logo Preview"
//                   className="max-w-[90%] max-h-[90vh] object-contain rounded-xl"
//                 />
//               </div>
//             )
//           }
//         </nav >

//       </div>

//     </>

//   );
// };

// export default HorizontalNav;



import React, { useState, useEffect, useLayoutEffect, useContext, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { SearchContext } from "../containers/SearchContext";
import NavbarSearch from "../containers/NavbarSearch";
import Login1 from "../auth/Login1";
import SignUp1 from "../auth/SignUp1";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { IoCloseCircleOutline } from "react-icons/io5";

import {
  FiUser,
  FiMenu,
  FiHeadphones,
  FiPhoneCall,
  FiPlus,
  // icons for the redesigned nav
  FiHome,
  FiKey,
  FiUsers,
  FiSmartphone,
  FiBell,
  FiChevronDown,
  // NEW: icons for the profile dropdown (same set as the Dashboard sidebar)
  FiBriefcase,
  FiVideo,
  FiCreditCard,
  FiHeart,
  FiSearch,
  FiTag,
  FiLogOut,
} from "react-icons/fi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";

// ==========================================================
// NEW: profile dropdown items — mirrors the Dashboard sidebar
// (same keys, labels and icons), so both menus stay in sync.
// `page` is the value Dashboard reads from location.state.page.
// ==========================================================
const PROFILE_MENU = [
  { page: "profile", label: "Profile", icon: FiUser },
  { page: "myProperties", label: "My Properties", icon: FiHome },
  { page: "myProjects", label: "My Projects", icon: FiBriefcase, hideFor: "Owner" },
  { page: "myLeads", label: "My Leads", icon: FiUsers },
  { page: "myVirtualtour", label: "My Virtual Tour", icon: FiVideo },
  { page: "mySubscriptions", label: "Subscriptions", icon: FiCreditCard },
  { page: "myFavourite", label: "My Favourites", icon: FiHeart },
  { page: "saveSerches", label: "Saved Searches", icon: FiSearch },
  { page: "offers", label: "Offers", icon: FiTag },
];

const HorizontalNav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null); // Reference to the dropdown menu
  const { propertyCity, setPropertyCity } = useContext(SearchContext);
  const { searchCity, setSearchCity } = useContext(SearchContext);
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [type, setType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const isPropertyDashboard = location.pathname === "/property-dashboard";
  const [profileImage, setProfileImage] = useState("");
  const [showLogoPreview, setShowLogoPreview] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);


  // ==========================================================
  // FIXED HEADER
  // The header wrapper is position:fixed. A spacer with the header's real
  // measured height sits where the header used to be, so page content starts
  // exactly below it on every screen size — no hard-coded padding needed in
  // the layout. ResizeObserver keeps the spacer correct when the header
  // wraps (tablet) or the mobile menu opens.
  // ==========================================================

  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return undefined;

    const update = () => setHeaderHeight(el.offsetHeight);
    update();

    let observer;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(update);
      observer.observe(el);
    }
    window.addEventListener("resize", update);

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);


  const searchBarRoutes = [
    "/property",
    "/advisordashboard",
    "/searchdashboard",
    "/allproperties",
  ];

  const showSearchBar =
    [

      "/searchdashboard",
      "/property",
      "/advisordashboard",
      "/featuredDashboard",
      "/recommendedpropertiesDashboard",
    ].includes(location.pathname) ||
    location.pathname.startsWith("/citywiseproperties");

  const hideTabLinks = showSearchBar;

  const checkLoginStatus = () => {
    const userId = sessionStorage.getItem("accessToken");
    setIsLoggedIn(!!userId);
  };

  useEffect(() => {
    if (isContactOpen) {
      const timer = setTimeout(() => {
        setIsContactOpen(false);
      }, 5000); // Closes after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [isContactOpen]);

  useEffect(() => {
    checkLoginStatus();
    const intervalId = setInterval(checkLoginStatus, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = () => {
    setShowModal(true); // open custom modal
  };

  const confirmLogout = () => {
    sessionStorage.clear();
    setShowModal(false);
    toast.success("Logout Successfully");
    setIsLoggedIn(false);
    history.push("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const [freePostCount, setFreePostCount] = useState(0);
  const userId = sessionStorage.getItem("accessToken");
  const userType = sessionStorage.getItem("user_type");

  useEffect(() => {
    const checkPostLimits = async () => {
      try {
        const profileForm = new FormData();
        profileForm.append("user_id", userId);

        const profileResponse = await axios.post(
          `${process.env.REACT_APP_API_URL}/cust_api/get_profile`,
          profileForm,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        const countData = profileResponse?.data?.count_data;

        if (countData) {
          setFreePostCount(countData.free_post_count || 0);
        }
        setProfileImage(profileResponse?.data?.data?.profile_image || "");
      } catch (error) {
        console.error("Error checking post limits:", error);
      }
    };

    if (userId) {
      checkPostLimits();
    }
  }, [userId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ==========================================================
  // Which nav tab is currently active.
  // Derived from the route the existing links already push to, so no new
  // state is introduced. Buyers/Tenants both land on /property, so they are
  // told apart by the propertyType the link puts in location.state.
  // ==========================================================

  const navParams = new URLSearchParams(location.search);

  const isNavActive = (kind) => {
    switch (kind) {
      case "Buy":
        return location.pathname === "/property" && location.state?.propertyType === "Buy";
      case "Rent":
        return location.pathname === "/property" && location.state?.propertyType === "Rent";
      case "Owner":
        return location.pathname === "/advisordashboard" && navParams.get("label") === "Owner";
      case "Builder":
        return location.pathname === "/advisordashboard" && navParams.get("label") === "Builder";
      case "Download":
        return location.pathname === "/download";
      default:
        return false;
    }
  };

  // Shared class for the stacked icon + label tabs.
  const navTabClass = (active) =>
    `group relative flex flex-col items-center gap-1 px-1 pb-2 text-[14px] font-medium no-underline transition-colors whitespace-nowrap hover:no-underline ${active ? "text-[#D61F45]" : "text-gray-600 hover:text-[#D61F45]"
    }`;

  // ==========================================================
  // NEW: profile dropdown styling — same look as the Dashboard sidebar
  // (icon + label, soft pink active/hover, brand-red text & icon).
  // An item is "active" when you're on /dashboard and that section is open.
  // ==========================================================
  const isMenuActive = (page) =>
    location.pathname === "/dashboard" && location.state?.page === page;

  const menuItemClass = (active) =>
    `group flex items-center w-full gap-3 px-3 py-2 text-[13px] font-medium text-left rounded-lg no-underline transition-colors duration-150 hover:no-underline ${active
      ? "bg-[#FDE8EC] text-[#D61F45]"
      : "text-gray-700 hover:bg-[#FDE8EC] hover:text-[#D61F45]"
    }`;

  const menuIconClass = (active) =>
    `text-[17px] flex-shrink-0 ${active ? "text-[#D61F45]" : "text-gray-500 group-hover:text-[#D61F45]"
    }`;

  // ==========================================================
  // Notifications bell — opens a panel in place, no navigation.
  // Fill `notifications` from your API and the list + red dot light up.
  // ==========================================================

  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState([]); // [{ id, title, text, time }]
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef(null); // anchor for click-outside

  // keep the red dot in sync with the real list length.
  useEffect(() => {
    setNotificationCount(notifications.length);
  }, [notifications]);

  // close the notification panel on an outside click.
  useEffect(() => {
    const handleNotificationOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationOpen(false);
      }
    };

    if (isNotificationOpen) {
      document.addEventListener("mousedown", handleNotificationOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleNotificationOutside);
    };
  }, [isNotificationOpen]);


  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isLoginModalOpen || isSignUpModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLoginModalOpen, isSignUpModalOpen]);

  return (
    <>

      {/* fixed-header styles */}
      <style>{`
        .apnaghar-fixed-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          z-index: 1000;
          padding: 12px 12px 0;      /* keeps the pill off the screen edges */
          box-sizing: border-box;
          pointer-events: none;      /* the transparent gutter never blocks the page */
        }

        .apnaghar-fixed-header > * {
          pointer-events: auto;      /* the header itself stays fully clickable */
        }

        /* Mobile: if the open hamburger menu is taller than the screen,
           let it scroll instead of running off the bottom. */
        @media (max-width: 767px) {
          .apnaghar-fixed-header {
            max-height: 100vh;
            overflow-y: auto;
          }
        }
      `}</style>

      {/* spacer — reserves exactly the header's height in the page flow */}
      <div aria-hidden="true" style={{ height: headerHeight }} />

      {/* fixed wrapper */}
      <div ref={headerRef} className="apnaghar-fixed-header" data-fixed-header="">

        {/* pill nav with a soft brand-tinted glow */}
        <nav className="relative flex flex-wrap items-center justify-between w-full px-5 py-3 text-sm font-light bg-white border border-gray-100 rounded-full md:flex-nowrap lg:px-7 gap-y-4 md:gap-y-0 shadow-[0_10px_40px_rgba(214,31,69,0.14)]">

          {/* 1. Left side: Logo */}
          <div className="flex items-center justify-between w-full md:w-auto flex-shrink-0">
            <Link
              to="/"
              className="flex items-center gap-2.5 no-underline hover:no-underline group"
            >
              <span className="flex items-center justify-center transition-transform duration-300 w-11 h-11 group-hover:scale-105">
                <svg viewBox="0 0 48 48" className="w-full h-full" aria-hidden="true">
                  <path
                    d="M24 5 3 23h6v18a2 2 0 0 0 2 2h26a2 2 0 0 0 2-2V23h6L24 5Z"
                    fill="#D61F45"
                  />
                  <rect x="15" y="27" width="6.5" height="6.5" rx="1.4" fill="#fff" />
                  <rect x="26.5" y="27" width="6.5" height="6.5" rx="1.4" fill="#fff" />
                  <rect x="15" y="36" width="6.5" height="6.5" rx="1.4" fill="#fff" />
                  <rect x="26.5" y="36" width="6.5" height="6.5" rx="1.4" fill="#fff" />
                </svg>
              </span>

              <span className="flex flex-col leading-none">
                <span
                  className="text-[21px] font-bold text-[#17253a]"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                  Apna<span className="text-[#D61F45]">Ghar</span>
                </span>
                <span className="mt-1 text-[11px] font-medium text-gray-400 tracking-wide">
                  Find. Buy. Rent. Live Better.
                </span>
              </span>
            </Link>

            {/* Hamburger Menu for Mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden focus:outline-none"
            >
              <FiMenu className="text-2xl text-[#D61F45]" />
            </button>
          </div>

          {/* --- DESKTOP WRAPPER (Forces Links & Buttons on ONE line) --- */}
          <div
            className={`${isMobileMenuOpen ? "flex" : "hidden"
              } flex-col items-center w-full mt-2 space-y-4 md:space-y-0 md:mt-0 md:flex md:flex-row md:flex-1 md:justify-between md:ml-6`}
          >

            {/* 2. Middle: Navigation Tabs and Search Bar */}
            <div className="flex justify-center w-full md:w-auto md:flex-1">
              {showSearchBar && <NavbarSearch />}

              {!hideTabLinks && (
                <ul className="flex flex-col items-center w-full p-0 m-0 space-y-4 md:flex-row md:space-y-0 md:space-x-6 lg:space-x-8 md:w-auto md:border-l md:border-gray-200 md:pl-6 lg:pl-8">
                  <li>
                    <Link
                      to={{
                        pathname: "/property",
                        state: {
                          propertyType: "Buy",
                          cityName: sessionStorage.getItem("cityName") || "",
                        },
                      }}
                      className={navTabClass(isNavActive("Buy"))}
                    >
                      <FiHome size={19} />
                      For Buyers
                      <span
                        className={`absolute bottom-0 left-0 right-0 h-[3px] rounded-full bg-[#D61F45] transition-opacity ${isNavActive("Buy") ? "opacity-100" : "opacity-0"
                          }`}
                      />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={{
                        pathname: "/property",
                        state: {
                          propertyType: "Rent",
                          cityName: sessionStorage.getItem("cityName") || "",
                        },
                      }}
                      className={navTabClass(isNavActive("Rent"))}
                    >
                      <FiKey size={19} />
                      For Tenants
                      <span
                        className={`absolute bottom-0 left-0 right-0 h-[3px] rounded-full bg-[#D61F45] transition-opacity ${isNavActive("Rent") ? "opacity-100" : "opacity-0"
                          }`}
                      />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={{
                        pathname: "/advisordashboard",
                        search: "?label=Owner",
                        state: {
                          cityName: sessionStorage.getItem("cityName") || "",
                        },
                      }}
                      className={navTabClass(isNavActive("Owner"))}
                    >
                      <FiUsers size={19} />
                      For Owners
                      <span
                        className={`absolute bottom-0 left-0 right-0 h-[3px] rounded-full bg-[#D61F45] transition-opacity ${isNavActive("Owner") ? "opacity-100" : "opacity-0"
                          }`}
                      />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={{
                        pathname: "/advisordashboard",
                        search: "?label=Builder",
                        state: {
                          cityName: sessionStorage.getItem("cityName") || "",
                        },
                      }}
                      className={navTabClass(isNavActive("Builder"))}
                    >
                      <HiOutlineOfficeBuilding size={20} />
                      For Builders
                      <span
                        className={`absolute bottom-0 left-0 right-0 h-[3px] rounded-full bg-[#D61F45] transition-opacity ${isNavActive("Builder") ? "opacity-100" : "opacity-0"
                          }`}
                      />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/download"
                      className={navTabClass(isNavActive("Download"))}
                    >
                      <FiSmartphone size={19} />
                      Download App
                      <span
                        className={`absolute bottom-0 left-0 right-0 h-[3px] rounded-full bg-[#D61F45] transition-opacity ${isNavActive("Download") ? "opacity-100" : "opacity-0"
                          }`}
                      />
                    </Link>
                  </li>
                </ul>
              )}
            </div>

            {/* 3. Right side: Buttons and Icons */}
            <div className="flex flex-col items-center w-full space-y-4 md:w-auto md:flex-row md:space-y-0 md:space-x-3 lg:space-x-4 flex-shrink-0 md:border-l md:border-gray-200 md:pl-4 lg:pl-6">

              {isLoggedIn ? (
                <Link
                  to="/add_new_property"
                  className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-center text-white no-underline transition-all duration-200 bg-gradient-to-r from-[#D61F45] to-[#B91C3C] rounded-full shadow-[0_6px_18px_rgba(214,31,69,0.35)] hover:shadow-[0_10px_24px_rgba(214,31,69,0.45)] hover:-translate-y-0.5 hover:no-underline whitespace-nowrap"
                >
                  <FiPlus size={16} />
                  Post Property
                  {freePostCount > 0 && (
                    <span className="px-2 py-0.5 ml-1 text-[11px] font-bold text-white bg-green-500 rounded-full">
                      FREE
                    </span>
                  )}
                </Link>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-center text-white transition-all duration-200 bg-gradient-to-r from-[#D61F45] to-[#B91C3C] rounded-full shadow-[0_6px_18px_rgba(214,31,69,0.35)] hover:shadow-[0_10px_24px_rgba(214,31,69,0.45)] hover:-translate-y-0.5 hover:no-underline whitespace-nowrap"
                >
                  <FiPlus size={16} />
                  Post Property
                  <span className="px-2 py-0.5 ml-1 text-[11px] font-bold text-white bg-green-500 rounded-full">
                    FREE
                  </span>
                </button>
              )}

              {isLoggedIn && userType !== "Owner" && (
                <Link
                  to="/add_new_project"
                  className="no-underline hover:no-underline whitespace-nowrap"
                >
                  <button className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-center text-[#D61F45] bg-white border-[1.5px] border-[#D61F45] rounded-full transition-all duration-200 hover:bg-[#D61F45] hover:text-white">
                    <FiPlus size={16} />
                    Post Project
                  </button>
                </Link>
              )}

              {/* Icons Block (Headphones, Bell & Profile) */}
              <div className="flex items-center space-x-3 lg:space-x-4">

                {/* Contact Us Popover */}
                <div className="relative flex items-center">
                  <button
                    onClick={() => setIsContactOpen(!isContactOpen)}
                    className="flex items-center justify-center w-10 h-10 text-[#D61F45] transition-all duration-200 bg-[#FDE8EC] rounded-full focus:outline-none hover:bg-[#FAD3DB] hover:scale-105"
                  >
                    <FiHeadphones className="text-xl" />
                  </button>

                  {isContactOpen && (
                    <div className="absolute right-0 z-50 p-6 mt-2 bg-white border border-gray-200 shadow-2xl top-12 rounded-xl w-[340px]">
                      <h4 className="mb-5 text-[13px] font-bold tracking-wider text-[#0f172a] uppercase">
                        Contact Us
                      </h4>

                      {/* Toll Free */}
                      <div className="flex items-start mb-6">
                        <svg className="w-[18px] h-[18px] mt-1 mr-4 text-[#D61F45] fill-current" viewBox="0 0 24 24">
                          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                        </svg>
                        <div>
                          <p className="mb-1 text-[13px] font-medium text-gray-500 leading-tight">
                            Toll Free | 9:30 AM to 6:30 PM <br /> (Mon-Sun)
                          </p>
                          <p className="text-[19px] font-bold text-[#1e293b]">
                            +91 8127848127
                            +91 8127288127

                          </p>
                        </div>
                      </div>

                      {/* International Users */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-start">
                          <svg className="w-[18px] h-[18px] mt-1 mr-4 text-[#D61F45] fill-current" viewBox="0 0 24 24">
                            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                          </svg>
                          <div>
                            <p className="mb-1 text-[13px] font-medium text-gray-500 leading-tight">
                              For International Users
                            </p>
                            <p className="text-[19px] font-bold text-[#1e293b]">
                              +91-120-6637501
                            </p>
                          </div>
                        </div>
                        <div className="mb-2 text-xl text-[#1e293b]">
                          ▸
                        </div>
                      </div>

                      {/* Call Back Button */}
                      <button className="flex items-center justify-center w-full py-2.5 mb-4 text-[15px] font-bold text-[#D61F45] transition bg-white border-[1.5px] border-[#D61F45] rounded-lg hover:bg-[#FDE8EC]">
                        <FiPhoneCall className="mr-2 text-lg" /> Request a Call Back
                      </button>

                      {/* FAQ Link */}
                      <p className="m-0 text-[13px] text-gray-800">
                        To check all the FAQ{" "}
                        <Link to="/faq" className="text-[#D61F45] no-underline hover:underline">
                          click here
                        </Link>
                      </p>
                    </div>
                  )}
                </div>

                {/* Notifications bell — toggles the panel, does not navigate */}
                <div className="relative" ref={notificationRef}>
                  <button
                    type="button"
                    onClick={() => setIsNotificationOpen((prev) => !prev)}
                    title="Notifications"
                    aria-haspopup="true"
                    aria-expanded={isNotificationOpen}
                    className={`relative flex items-center justify-center w-10 h-10 text-[#D61F45] transition-all duration-200 rounded-full focus:outline-none hover:scale-105 ${isNotificationOpen ? "bg-[#FAD3DB]" : "bg-[#FDE8EC] hover:bg-[#FAD3DB]"
                      }`}
                  >
                    <FiBell className="text-xl" />
                    {notificationCount > 0 && (
                      <span className="absolute top-0 right-0 flex items-center justify-center min-w-[9px] h-[9px] bg-[#D61F45] rounded-full ring-2 ring-white" />
                    )}
                  </button>

                  {isNotificationOpen && (
                    <div className="absolute right-0 z-50 mt-2 overflow-hidden bg-white border border-gray-200 shadow-2xl top-12 rounded-xl w-[320px]">

                      {/* Panel header */}
                      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-[#FFF7F9]">
                        <span className="text-[14px] font-bold text-[#17253a]">
                          Notifications
                        </span>
                        {notificationCount > 0 && (
                          <span className="px-2 py-0.5 text-[11px] font-bold text-white bg-[#D61F45] rounded-full">
                            {notificationCount} new
                          </span>
                        )}
                      </div>

                      {/* Panel body */}
                      <div className="max-h-[280px] overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="flex flex-col items-center justify-center px-4 py-8 text-center">
                            <span className="flex items-center justify-center w-12 h-12 mb-3 rounded-full bg-[#FDE8EC] text-[#D61F45]">
                              <FiBell className="text-xl" />
                            </span>
                            <p className="m-0 text-[13px] font-semibold text-[#17253a]">
                              No new notifications
                            </p>
                            <p className="mt-1 mb-0 text-[12px] text-gray-500">
                              Updates about your properties and enquiries will appear here.
                            </p>
                          </div>
                        ) : (
                          notifications.map((note) => (
                            <div
                              key={note.id}
                              className="flex gap-3 px-4 py-3 transition-colors border-b border-gray-100 last:border-b-0 hover:bg-[#FFF7F9]"
                            >
                              <span className="flex items-center justify-center flex-shrink-0 w-8 h-8 mt-0.5 rounded-full bg-[#FDE8EC] text-[#D61F45]">
                                <FiBell className="text-sm" />
                              </span>
                              <div className="min-w-0">
                                <p className="m-0 text-[13px] font-semibold text-[#17253a] truncate">
                                  {note.title}
                                </p>
                                {note.text && (
                                  <p className="mt-0.5 mb-0 text-[12px] text-gray-600 line-clamp-2">
                                    {note.text}
                                  </p>
                                )}
                                {note.time && (
                                  <p className="mt-1 mb-0 text-[11px] text-gray-400">
                                    {note.time}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile Dropdown */}
                <div className="relative flex items-center md:border-l md:border-gray-200 md:pl-3 lg:pl-4" ref={dropdownRef}>
                  {isLoggedIn ? (
                    <>
                      <button
                        onClick={() => setIsDropdownOpen((prev) => !prev)}
                        className="flex items-center gap-1.5 focus:outline-none group"
                        aria-haspopup="true"
                        aria-expanded={isDropdownOpen}
                      >
                        {profileImage &&
                          profileImage !== "null" &&
                          profileImage.trim() !== "" ? (
                          <img
                            src={profileImage}
                            alt="Profile"
                            className="object-cover w-10 h-10 border-2 border-[#FAD3DB] rounded-full transition-transform duration-200 group-hover:scale-105"
                          />
                        ) : (
                          <span className="flex items-center justify-center w-10 h-10 text-[#D61F45] bg-[#FDE8EC] rounded-full transition-transform duration-200 group-hover:scale-105">
                            <FiUser size={18} />
                          </span>
                        )}
                        <FiChevronDown
                          size={16}
                          className={`text-gray-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      {/* NEW: dropdown styled like the Dashboard sidebar */}
                      {isDropdownOpen && (
                        <div className="absolute right-0 z-50 mt-2 overflow-hidden bg-white border border-[#FDE8EC] shadow-[0_16px_40px_rgba(214,31,69,0.18)] rounded-2xl top-14 w-60">

                          {/* Header — red home badge + "Dashboard", like the sidebar */}
                          <div className="flex items-center gap-3 px-4 py-3 border-b border-[#FDE8EC] bg-[#FFF7F9]">
                            <span className="flex items-center justify-center w-9 h-9 text-white rounded-lg shadow bg-gradient-to-br from-[#D61F45] to-[#B91C3C]">
                              <FiHome size={16} />
                            </span>
                            <div className="leading-tight">
                              <p className="m-0 text-[14px] font-semibold text-[#17253a]">Dashboard</p>
                              <p className="m-0 text-[11px] text-gray-400">Manage your account</p>
                            </div>
                          </div>

                          <ul className="flex flex-col gap-0.5 p-2 m-0 list-none max-h-[60vh] overflow-y-auto">
                            {PROFILE_MENU.filter((item) => item.hideFor !== userType).map(
                              ({ page, label, icon: Icon }) => {
                                const active = isMenuActive(page);
                                return (
                                  <li key={page}>
                                    <Link
                                      to={{ pathname: "/dashboard", state: { page } }}
                                      onClick={() => setIsDropdownOpen(false)}
                                      className={menuItemClass(active)}
                                    >
                                      <Icon className={menuIconClass(active)} />
                                      <span>{label}</span>
                                    </Link>
                                  </li>
                                );
                              },
                            )}

                            <li className="my-1 border-t border-[#FDE8EC]" aria-hidden="true" />

                            <li>
                              <button
                                onClick={() => {
                                  setIsDropdownOpen(false);
                                  handleLogout();
                                }}
                                className={menuItemClass(false)}
                              >
                                <FiLogOut className={menuIconClass(false)} />
                                <span>Logout</span>
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => setIsLoginModalOpen(true)}
                      className="flex items-center gap-1.5 focus:outline-none group"
                    >
                      <span className="flex items-center justify-center w-10 h-10 text-[#D61F45] bg-[#FDE8EC] rounded-full transition-transform duration-200 group-hover:scale-105">
                        <FiUser size={18} />
                      </span>
                      <FiChevronDown size={16} className="text-gray-400" />
                    </button>
                  )}
                </div>

              </div>
            </div>
          </div>

          {/* NEW: Logout modal — same design as the Dashboard one */}
          {
            showModal && (
              <div className="fixed inset-0 z-[999] flex items-center justify-center px-4 bg-black bg-opacity-50">
                <div className="relative w-full max-w-sm p-6 text-center bg-white shadow-xl rounded-2xl">
                  <button
                    className="absolute text-2xl text-gray-400 top-3 right-3 hover:text-[#D61F45]"
                    onClick={() => setShowModal(false)}
                    aria-label="Close"
                  >
                    <IoCloseCircleOutline />
                  </button>

                  <div className="flex items-center justify-center mx-auto mb-3 rounded-full w-14 h-14 bg-[#FDE8EC]">
                    <FiLogOut className="text-2xl text-[#D61F45]" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">Are you sure?</h2>
                  <p className="mt-1 text-sm text-gray-500">You will be logged out!</p>

                  <div className="flex justify-center gap-3 mt-5">
                    <button
                      className="px-6 py-2 font-medium text-white rounded-lg shadow bg-[#D61F45] hover:bg-[#B91C3C] transition-colors"
                      onClick={confirmLogout}
                    >
                      Yes, logout!
                    </button>
                    <button
                      className="px-6 py-2 font-medium bg-white border rounded-lg border-[#FAD3DB] text-[#D61F45] hover:bg-[#FDE8EC] transition-colors"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )
          }

          {/* Auth & Image Modals */}
          <Login1
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
            onSwitchToSignUp={() => {
              setIsLoginModalOpen(false);
              setIsSignUpModalOpen(true);
            }}
          />
          <SignUp1
            isOpen={isSignUpModalOpen}
            onClose={() => setIsSignUpModalOpen(false)}
            onSwitchToLogin={() => {
              setIsSignUpModalOpen(false);
              setIsLoginModalOpen(true);
            }}
          />
          {
            showLogoPreview && (
              <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-80">
                <button
                  onClick={() => setShowLogoPreview(false)}
                  className="absolute text-4xl text-white top-5 right-5"
                >
                  <IoCloseCircleOutline />
                </button>
                <img
                  src="/image/app.png"
                  alt="Logo Preview"
                  className="max-w-[90%] max-h-[90vh] object-contain rounded-xl"
                />
              </div>
            )
          }
        </nav >

      </div>

    </>
  );
};

export default HorizontalNav;