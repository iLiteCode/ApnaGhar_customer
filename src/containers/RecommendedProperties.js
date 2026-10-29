// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useRef } from "react";
// import { MdApartment } from "react-icons/md";
// import { FaBath, FaUser } from "react-icons/fa";
// import { RiRuler2Line } from "react-icons/ri";
// import { AiOutlineClockCircle } from "react-icons/ai";
// import { FaMapMarkerAlt } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Slider from "react-slick";
// import { Heart, Camera, Home, Ruler } from "lucide-react";
// import { toast } from "react-toastify";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// import { FaRupeeSign } from "react-icons/fa";
// import { BsHouseDoorFill } from "react-icons/bs";
// import { BiShapeSquare } from "react-icons/bi";
// import { faChair } from "@fortawesome/free-solid-svg-icons";

// import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
// import { AiOutlineUser } from "react-icons/ai";
// import { GoArrowLeft } from "react-icons/go";
// import { GoArrowRight } from "react-icons/go";
// import { PiCubeFocus } from "react-icons/pi";
// import { useHistory } from "react-router-dom";
// import Login1 from "../auth/Login1";
// import SignUp1 from "../auth/SignUp1";
// import PropertyCardSkeleton from "./PropertyCardSkeleton";
// const userLocation = JSON.parse(sessionStorage.getItem("userLocation"));
// function calculateDistance(lat1, lon1, lat2, lon2) {
//   const R = 6371;

//   const dLat = (lat2 - lat1) * (Math.PI / 180);
//   const dLon = (lon2 - lon1) * (Math.PI / 180);

//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(lat1 * (Math.PI / 180)) *
//     Math.cos(lat2 * (Math.PI / 180)) *
//     Math.sin(dLon / 2) *
//     Math.sin(dLon / 2);

//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//   return R * c;
// }
// const RecommendedProperties = ({
//   openRecommendedShareModal,
//   closeShareModal,
//   copyLink,
//   currentShareUrl,
//   data,
//   fetchHomeData,
// }) => {
//   const [savedProperties, setSavedProperties] = useState([]);
//   const [properties, setProperties] = useState([]);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const sliderRef = useRef(null);
//   const history = useHistory();
//   const [isContactModalOpen] = useState(false);
//   const [openContactModalAfterLogin] = useState(false);
//   const accessToken = sessionStorage.getItem("accessToken");

//   // Modal open states
//   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
//   const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

//   useEffect(() => {
//     const userId = sessionStorage.getItem("AccessToken");
//     if (userId) {
//       setIsLoggedIn(true);
//       fetchSavedProperties(userId);
//     } else {
//       setIsLoggedIn(false);
//     }
//   }, []);

//   const fetchSavedProperties = async () => {
//     const userId = sessionStorage.getItem("AccessToken");
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}/cust_api/get_favorite_properties`,
//         {
//           user_id: userId,
//         },
//       );

//       if (response.data.status === 1 && Array.isArray(response.data.data)) {
//         const savedIds = response.data.data.map((prop) => prop._id);
//         setSavedProperties(savedIds);
//       } else {
//         setSavedProperties([]);
//         console.error("No saved properties found.");
//       }
//     } catch (error) {
//       console.error("Error fetching saved properties:", error);
//     }
//   };

//   // Fetch recommended properties
//   const fetchRecommendedProperties = async () => {
//     try {
//       if (data && data.status === 1 && Array.isArray(data.data)) {
//         setProperties(data.data);
//       } else {
//         setProperties([]);
//       }
//     } catch (error) {
//       console.error("Error fetching recommended properties:", error);
//     }
//   };


//   // {console.log(properties)}

//   useEffect(() => {
//     fetchRecommendedProperties();
//   }, [data]);

//   const handleClick = () => {
//     history.push("/featuredDashboard");
//   };

//   // Toggle save/unsave property
//   const toggleSaveProperty = async (propertyId) => {
//     if (savedProperties.includes(propertyId)) {
//       await removeFromFavorites(propertyId);
//       setSavedProperties(savedProperties.filter((id) => id !== propertyId));
//     } else {
//       await addToFavorites(propertyId);
//       setSavedProperties([...savedProperties, propertyId]);
//     }
//   };

//   //  Add to favorites
//   const addToFavorites = async (PropertyId) => {
//     if (!accessToken) {
//       setIsLoginModalOpen(true);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}/cust_api/add_to_favorite`,
//         {
//           user_id: accessToken,
//           property_id: PropertyId,
//         },
//       );
//       fetchHomeData();
//       // toast.success("Property added to favorites successfuly!");
//     } catch (error) {
//       console.error("Error adding property to favorites:", error);
//     }
//   };

//   //  Remove to favorites
//   const removeFromFavorites = async (favoriteId) => {
//     const formData = new FormData();
//     formData.append("favorite_id", favoriteId);

//     try {
//       const response = await axios.delete(
//         `${process.env.REACT_APP_API_URL}/cust_api/remove_from_favorite`,
//         { data: formData },
//       );

//       if (response.data.status === 1) {
//         fetchHomeData();
//         // toast.success("Property removed to favorites successfuly!");
//       } else {
//         fetchHomeData();
//         console.error("Failed to remove:", response.data.message);
//       }
//     } catch (error) {
//       console.error("Error unfavoriting:", error);
//     }
//   };

//   // Slider settings
//   const [activeIndexes, setActiveIndexes] = useState({});
//   const BASE_URL = process.env.REACT_APP_API_URL;
//   const settings = {
//     infinite: true,
//     lazyLoad: "ondemand",
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     arrows: false,
//     cssEase: "linear",
//     centerMode: false,
//     responsive: [
//       {
//         // Laptop: 1024px–1399px -> 3 cards (default slidesToShow: 4 covers 1400px+)
//         breakpoint: 1399,
//         settings: {
//           slidesToShow: 3,
//         },
//       },
//       {
//         // Tablet: 768px–1023px -> 2 cards
//         breakpoint: 1023,
//         settings: {
//           slidesToShow: 2,
//         },
//       },
//       {
//         // Mobile: <768px -> 1 card, full width
//         breakpoint: 767,
//         settings: {
//           slidesToShow: 1,
//           arrows: false,
//         },
//       },
//     ],
//   };
//   const formatPrice = (price) => {
//     if (!price) return "";

//     const formatNumber = (value, unit) => {
//       return (
//         (value % 1 === 0
//           ? parseInt(value)
//           : value.toFixed(2).replace(/\.?0+$/, "")) + unit
//       );
//     };

//     if (price >= 10000000) {
//       return formatNumber(price / 10000000, " Cr");
//     } else if (price >= 100000) {
//       return formatNumber(price / 100000, " L");
//     } else if (price >= 1000) {
//       return formatNumber(price / 1000, " K");
//     } else {
//       return price.toString();
//     }
//   };

//   const convertToSqFt = (area, unit) => {
//     if (!area || !unit) return null;
//     const areaNum = parseFloat(area);
//     if (isNaN(areaNum)) return null;

//     switch (unit.toLowerCase()) {
//       case "sq ft":
//       case "sqft":
//       case "square feet":
//         return areaNum;
//       case "sq yd":
//       case "sqyd":
//       case "square yards":
//         return areaNum * 9;
//       case "sq mt":
//       case "sqmt":
//       case "square meters":
//         return areaNum * 10.7639;
//       case "acre":
//       case "acres":
//         return areaNum * 43560;
//       default:
//         return areaNum; // Return as-is if unit is unknown
//     }
//   };

//   useEffect(() => {
//     if (isLoginModalOpen || isContactModalOpen || openContactModalAfterLogin) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }

//     // Cleanup when component unmounts
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [isLoginModalOpen, isContactModalOpen, openContactModalAfterLogin]);

//   return (
//     <div className="w-full px-3 py-8 bg-white sm:px-5 md:px-8 lg:px-10 xl:px-12 overflow-x-hidden">
//       <style>{`
//         .slider-container .slick-track {
//           display: flex !important;
//         }
//         .slider-container .slick-slide {
//           height: auto;
//           display: flex !important;
//         }
//         .slider-container .slick-slide > div {
//           width: 100%;
//         }
//       `}</style>
//       <div className="w-full bg-slate-50 rounded">
//         <div className="w-full sm:px-6 lg:px-4">
//           <div className="flex flex-col gap-4 px-4 pt-6 pb-4 sm:px-5 lg:flex-row lg:items-center lg:justify-between">
//             <div className="flex flex-col">
//               <h2 className="mb-2 text-xl font-bold tracking-wide text-gray-800 sm:text-2xl lg:text-3xl">
//                 Featured Properties
//               </h2>
//               <p className="text-sm text-gray-500 sm:text-base">Your dream property is just a few clicks away</p>
//             </div>

//             <div className="flex flex-wrap items-center gap-3 mt-2 lg:mt-0">
//               <button
//                 className="px-5 py-2.5 text-sm font-medium bg-white border rounded-lg transition hover:bg-gray-50 w-full sm:w-auto"
//                 onClick={handleClick}
//               >
//                 View All Properties
//               </button>

//               <div className="hidden md:flex items-center gap-3">
//                 <button
//                   className="flex items-center justify-center w-11 h-11 bg-white rounded-full shadow-md transition hover:shadow-xl"
//                   onClick={() => sliderRef.current.slickPrev()}
//                 >
//                   <GoArrowLeft className="text-3xl text-black" />
//                 </button>

//                 <button
//                   className="p-2 text-lg font-semibold text-gray-700 bg-white rounded-full shadow-md sm:text-2xl hover:shadow-lg "
//                   onClick={() => sliderRef.current.slickNext()}
//                 >
//                   <GoArrowRight className="text-3xl text-black" />
//                 </button>
//               </div>
//             </div>
//           </div>
//           {data?.status === 0 ? (
//             <Slider {...settings} className="slider-container" ref={sliderRef}>
//               {[1, 2, 3, 4].map((item) => (
//                 <div key={item}>
//                   <PropertyCardSkeleton />
//                 </div>
//               ))}
//             </Slider>
//           ) : (
//             <Slider {...settings} className="slider-container" ref={sliderRef}>
//               {properties
//                 .filter((property) => property.available_status !== "Sold")
//                 .map((property) => {
//                   const getValidImageUrl = (img) => {
//                     if (typeof img !== "string" || !img.trim()) return null;
//                     return img.startsWith("http") ? img : BASE_URL + img;
//                   };

//                   const coverImage = getValidImageUrl(property.cover_image);
//                   const additionalImages = (property.property_images || [])
//                     .map((imgObj) => getValidImageUrl(imgObj?.image))
//                     .filter(Boolean);
//                   const allImages = [
//                     ...(coverImage ? [coverImage] : []),
//                     ...additionalImages,
//                   ];
//                   const subtitle = (() => {
//                     const area = property.address_area || "";
//                     const city = property.city_name || "";

//                     const location = area.toLowerCase().includes(city.toLowerCase())
//                       ? area
//                       : `${area}, ${city}`;

//                     const type =
//                       property.property_type === "Office"
//                         ? "Office Space"
//                         : property.property_type === "Retail"
//                           ? "Retail Space"
//                           : property.property_type || "";

//                     const category = property.property_category_type || "";

//                     if (
//                       category === "Commercial Buy" ||
//                       category === "Commercial Lease"
//                     ) {
//                       return `${type} for ${category === "Commercial Buy" ? "Sale" : "Lease"
//                         } in ${location}`;
//                     }
//                     return `${type} in ${location}`;
//                   })();
//                   let distance = null;

//                   if (userLocation && property.latitude && property.longitude) {
//                     distance = calculateDistance(
//                       parseFloat(userLocation.latitude),
//                       parseFloat(userLocation.longitude),
//                       parseFloat(property.latitude),
//                       parseFloat(property.longitude),
//                     ).toFixed(1);
//                   }

//                   return (
//                     <div key={property._id} className="h-full px-2 py-4">
//                       <div className="property-card flex flex-col h-full min-h-[480px] sm:min-h-[500px] lg:min-h-[520px] bg-white border border-gray-100 rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
//                         <div className="flex flex-col h-full w-full overflow-hidden rounded-xl">
//                           <div className="relative">
//                             <Link
//                               to={`/propertydetails/${property._id}`}
//                               className="block"
//                             >
//                               {allImages.length > 1 ? (
//                                 <Slider
//                                   key={`${property._id}-${activeIndexes[property._id] || 0}`}
//                                   dots
//                                   infinite
//                                   speed={500}
//                                   slidesToShow={1}
//                                   slidesToScroll={1}
//                                   arrows
//                                   autoplay
//                                   autoplaySpeed={2000}
//                                   beforeChange={(current, next) =>
//                                     setActiveIndexes((prev) => ({
//                                       ...prev,
//                                       [property._id]: next,
//                                     }))
//                                   }
//                                   initialSlide={activeIndexes[property._id] || 0}
//                                   customPaging={(i) => {
//                                     const activeSlide =
//                                       activeIndexes[property._id] || 0;
//                                     const isActive =
//                                       i === activeSlide % allImages.length;
//                                     return (
//                                       <div
//                                         style={{
//                                           width: "10px",
//                                           height: "10px",
//                                           borderRadius: "50%",
//                                           background: isActive ? "#fff" : "#888",
//                                           margin: "0 5px",
//                                           cursor: "pointer",
//                                         }}
//                                       />
//                                     );
//                                   }}
//                                   appendDots={(dots) => (
//                                     <div
//                                       style={{
//                                         position: "absolute",
//                                         bottom: "10px",
//                                         left: "50%",
//                                         transform: "translateX(-50%)",
//                                         display: "flex",
//                                         justifyContent: "center",
//                                         width: "100%",
//                                       }}
//                                     >
//                                       {dots}
//                                     </div>
//                                   )}
//                                   className="rounded-t-2xl"
//                                 >
//                                   {allImages.map((imgUrl, idx) => (
//                                     <div key={`${property._id}-${idx}`}>
//                                       <img
//                                         src={imgUrl}
//                                         alt="Property"
//                                         className="w-full h-[160px] sm:h-[190px] lg:h-[220px] object-cover rounded-t-2xl"
//                                       />
//                                     </div>
//                                   ))}
//                                 </Slider>
//                               ) : (
//                                 <img
//                                   src={allImages[0] || "/image/app.png"}
//                                   alt="Property"
//                                   className="w-full h-[160px] sm:h-[190px] lg:h-[220px] object-cover rounded-t-2xl"
//                                   loading="lazy"
//                                   onError={(e) => (e.target.style.display = "none")}
//                                 />
//                               )}
//                             </Link>
//                             {/* Days on Houzza */}
//                             {/* <span className="absolute px-2 py-1 text-xs font-normal text-white rounded-full top-2 left-2 bg-gray-800/60 backdrop-blur-sm">
//                           {property.days_since_created} days on NoWayBroker
//                         </span> */}


//                             {/* Admin Approval Badge */}
//                             {property.admin_approval === "Approved" && (
//                               <div className="absolute top-2 left-2 z-20">
//                                 <div className="flex items-center bg-[#8B1E3F] text-white rounded-sm shadow-md px-2 py-1">

//                                   {/* Tick Icon */}
//                                   <span className="text-white text-xs font-bold mr-2">
//                                     ✓
//                                   </span>

//                                   {/* Verified Text */}
//                                   <span className="text-[11px] font-semibold leading-none">
//                                     Verified
//                                   </span>

//                                 </div>
//                               </div>
//                             )}
//                             {/* Virtual Tour & Favorite Button */}
//                             <div className="absolute flex items-center space-x-2 top-2 right-2">
//                               {property.virtual_tour_availability === "Yes" && (
//                                 <span className="flex items-center gap-1 px-2 py-1 text-xs font-normal text-white rounded-full bg-gray-800/60 backdrop-blur-sm">
//                                   <PiCubeFocus className="text-sm text-white" />
//                                   Virtual Tour
//                                 </span>
//                               )}
//                               <button
//                                 className="flex items-center justify-center w-10 h-10 rounded-full shadow bg-gray-900/60 backdrop-blur-md"
//                                 onClick={() => {
//                                   if (!accessToken) {
//                                     setIsLoginModalOpen(true);
//                                     return;
//                                   }
//                                   if (property.is_favorite) {
//                                     removeFromFavorites(property.favorite_id);
//                                   } else {
//                                     addToFavorites(property._id);
//                                   }
//                                 }}
//                               >
//                                 <Heart
//                                   size={22}
//                                   stroke={property.is_favorite ? "none" : "white"}
//                                   color={
//                                     property.is_favorite
//                                       ? "red"
//                                       : "rgba(75, 85, 99, 0.4) "
//                                   }
//                                   fill={
//                                     property.is_favorite
//                                       ? "red"
//                                       : "rgba(75, 85, 99, 0.4) "
//                                   }
//                                   strokeWidth={2}
//                                 />
//                               </button>
//                             </div>

//                             {/* FOR BUY / RENT & FEATURED tags */}
//                             <div className="absolute bottom-0 left-0">
//                               {(() => {
//                                 const rawCategory =
//                                   property.property_category_type || "";

//                                 const normalizedCategory = rawCategory
//                                   .replace(/\s+/g, " ")
//                                   .replace(/-/g, " ")
//                                   .replace(/\//g, " ")
//                                   .trim()
//                                   .toLowerCase();

//                                 let badgeText = "UNKNOWN";
//                                 let badgeColor = "bg-[#8B1E3F]";

//                                 if (normalizedCategory === "buy") {
//                                   badgeText = "FOR BUY";
//                                   badgeColor = "bg-[#8B1E3F]";
//                                 } else if (normalizedCategory === "rent") {
//                                   badgeText = "FOR RENT";
//                                   badgeColor = "bg-[#8B1E3F]";
//                                 } else if (
//                                   normalizedCategory.includes("commercial buy")
//                                 ) {
//                                   badgeText = "COMMERCIAL BUY";
//                                   badgeColor = "bg-[#8B1E3F]";
//                                 } else if (
//                                   normalizedCategory.includes("commercial lease")
//                                 ) {
//                                   badgeText = "COMMERCIAL LEASE";
//                                   badgeColor = "bg-[#8B1E3F]";
//                                 } else if (
//                                   normalizedCategory.includes("pg") ||
//                                   normalizedCategory.includes("co living") ||
//                                   normalizedCategory.includes("coliving")
//                                 ) {
//                                   badgeText = "PG / CO-LIVING";
//                                   badgeColor = "bg-[#8B1E3F]";
//                                 }

//                                 return (
//                                   <span
//                                     className={`text-white text-xs px-3 py-1 rounded-se-lg ${badgeColor}`}
//                                   >
//                                     {badgeText}
//                                   </span>
//                                 );
//                               })()}
//                             </div>
//                             <div className="absolute bottom-0 right-0">
//                               {property.mark_as_featured === "Yes" && (
//                                 <span className="px-3 py-1 text-xs text-white bg-yellow-500 rounded-ss-lg">
//                                   FEATURED
//                                 </span>
//                               )}
//                             </div>
//                           </div>

//                           {/* Property Details */}
//                           {/* Property Details Wrapper */}
//                           <div className="flex flex-col flex-1 justify-between p-3 sm:p-4 bg-white">
//                             {/* Price Section */}
//                             <div className="flex items-start justify-between gap-2 sm:gap-3 mb-0">
//                               {/* Property Name */}
//                               <h3
//                                 className="flex-1 min-w-0 m-0 text-base sm:text-lg font-semibold leading-6 text-gray-900 truncate"
//                                 title={property.property_name}
//                               >
//                                 {property.property_name || "N/A"}
//                               </h3>

//                               {/* Furnishing */}
//                               <span
//                                 className="flex-shrink-0 m-0 text-xs font-medium leading-6 text-black sm:text-sm whitespace-nowrap"
//                                 title={property.furnished_type}
//                               >
//                                 {property.furnished_type || "Un-Furnished"}
//                               </span>
//                             </div>

//                             <p
//                               className="mt-0 mb-1 text-xs sm:text-sm leading-5 text-gray-600 break-words"
//                               title={subtitle}
//                             >
//                               {subtitle}
//                             </p>
//                             <div className="flex flex-wrap items-center justify-between gap-y-1 mb-1">
//                               {/* Left Side */}
//                               <div className="flex flex-wrap items-center gap-y-1">
//                                 <span className="text-xl sm:text-2xl font-bold">
//                                   ₹{" "}
//                                   {property.property_category_type === "Rent" ||
//                                     property.property_category_type === "PG/Co-living"
//                                     ? formatPrice(property.rent)
//                                     : formatPrice(property.property_price)}
//                                 </span>

//                                 {(property.property_category_type === "Rent" ||
//                                   property.property_category_type ===
//                                   "PG/Co-living") && (
//                                     <span className="ml-1 text-xs sm:text-sm text-gray-500">
//                                       / {property.rent_duration || "Per Month"}
//                                     </span>
//                                   )}

//                                 {/* Ready to Move - Keep close to price */}
//                                 {property.property_category_type?.includes("Buy") &&
//                                   property.possession_status === "Ready To Move" && (
//                                     <div className="flex items-center gap-2 px-3 py-1 ml-6 text-white border rounded-full bg-[#8B1E3F] border-[#8B1E3F]">
//                                       <MdApartment className="text-base text-white" />
//                                       <span className="text-xs font-semibold text-white whitespace-nowrap">
//                                         Ready to Move
//                                       </span>
//                                     </div>
//                                   )}
//                               </div>

//                               {/* Right Side */}
//                               <div className="text-xs sm:text-sm font-medium whitespace-nowrap">
//                                 {(property.property_category_type === "Rent" ||
//                                   property.property_category_type ===
//                                   "PG/Co-living") && (
//                                     <>
//                                       <span className="text-gray-500">Deposit:</span>
//                                       <span className="ml-1 font-semibold">
//                                         ₹{" "}
//                                         {property.custom_deposit_amount?.toLocaleString(
//                                           "en-IN",
//                                         )}
//                                       </span>
//                                     </>
//                                   )}

//                                 {property.property_category_type?.includes("Buy") &&
//                                   property.possession_status !== "Ready To Move" &&
//                                   property.possession_date && (
//                                     <>
//                                       <span className="text-gray-500">
//                                         Possession:
//                                       </span>
//                                       <span className="ml-1 font-semibold">
//                                         {new Date(
//                                           property.possession_date,
//                                         ).toLocaleDateString("en-IN")}
//                                       </span>
//                                     </>
//                                   )}
//                               </div>
//                             </div>
//                             {/* Features Row */}
//                             <div className="grid grid-cols-3 py-3 border-t border-b border-gray-100 gap-x-1">
//                               {/* First Column */}
//                               <div className="flex items-center gap-1.5 sm:gap-2 px-1 sm:px-3 min-w-0">
//                                 <MdApartment className="text-[22px] text-gray-700 flex-shrink-0" />

//                                 <div className="flex flex-col justify-center min-w-0">
//                                   <p className="m-0 text-sm font-semibold leading-4 truncate">
//                                     {property.building_type === "Commercial"
//                                       ? property.property_type === "Office"
//                                         ? "Office Space"
//                                         : property.property_type === "Retail"
//                                           ? "Retail Space"
//                                           : property.property_type
//                                       : property.property_category_type?.includes(
//                                         "PG",
//                                       )
//                                         ? `${property.bathroom || 0} Bathrooms`
//                                         : property.bhk_type}
//                                   </p>

//                                   <p className="m-0 text-xs leading-4 text-gray-500 truncate">
//                                     {property.building_type === "Commercial"
//                                       ? "Property Type"
//                                       : property.property_category_type?.includes(
//                                         "PG",
//                                       )
//                                         ? "Bathrooms"
//                                         : property.property_type}
//                                   </p>
//                                 </div>
//                               </div>

//                               {/* Second Column */}
//                               <div className="flex items-center gap-1.5 sm:gap-2 px-1 sm:px-3 border-l border-gray-200 min-w-0">
//                                 {property.property_category_type?.includes("PG") ? (
//                                   <FaUser className="text-[20px] text-gray-700 flex-shrink-0" />
//                                 ) : (
//                                   <FaBath className="text-[20px] text-gray-700 flex-shrink-0" />
//                                 )}

//                                 <div className="flex flex-col justify-center min-w-0">
//                                   <p className="m-0 text-sm font-semibold leading-4 truncate">
//                                     {property.property_category_type?.includes("PG")
//                                       ? property.available_for
//                                       : `${property.bathroom || 0} Baths`}
//                                   </p>

//                                   <p className="m-0 text-xs leading-4 text-gray-500 truncate">
//                                     {property.property_category_type?.includes("PG")
//                                       ? "Available For"
//                                       : "Bathrooms"}
//                                   </p>
//                                 </div>
//                               </div>

//                               {/* Third Column */}
//                               <div className="flex items-center gap-1.5 sm:gap-2 px-1 sm:px-3 border-l border-gray-200 min-w-0">
//                                 <RiRuler2Line className="text-[22px] text-gray-700 flex-shrink-0" />

//                                 <div className="flex flex-col justify-center min-w-0">
//                                   <p className="m-0 text-sm font-semibold leading-4 truncate">
//                                     {property.area} {property.area_in}
//                                   </p>

//                                   <p className="m-0 text-xs leading-4 text-gray-500 truncate">
//                                     Built Up Area
//                                   </p>
//                                 </div>
//                               </div>
//                             </div>
//                             {/* Divider */}
//                             <hr className="my-1 border-gray-100" />

//                             {/* Row 5 : Posted By | Days | Distance | Share */}
//                             <div className="flex items-center justify-between pt-1 pb-2 text-[13px] text-gray-600">
//                               {/* Left */}
//                               <div className="flex items-center flex-wrap min-w-0">
//                                 {/* Posted By */}
//                                 <div className="flex items-center">
//                                   <AiOutlineClockCircle className="mr-1 text-[15px] text-gray-700" />
//                                   <span className="truncate">
//                                     Posted by {property.user_type || "Owner"}
//                                   </span>
//                                 </div>

//                                 {/* Dot */}
//                                 <span className="mx-2 text-gray-400">•</span>

//                                 {/* Days */}
//                                 <span className="whitespace-nowrap">
//                                   {property.days_since_created
//                                     ? `${property.days_since_created} days ago`
//                                     : "Recently"}
//                                 </span>

//                                 {/* Distance */}
//                                 {distance && (
//                                   <>
//                                     <span className="mx-2 text-gray-400">•</span>

//                                     <div className="flex items-center whitespace-nowrap">
//                                       <FaMapMarkerAlt className="mr-1 text-red-500" />
//                                       {distance} km from you
//                                     </div>
//                                   </>
//                                 )}
//                               </div>

//                               {/* Share */}
//                               <FontAwesomeIcon
//                                 icon={faShareNodes}
//                                 className="ml-2 text-[17px] text-gray-500 transition-colors cursor-pointer hover:text-blue-500"
//                                 onClick={(e) => {
//                                   e.preventDefault();
//                                   e.stopPropagation();
//                                   openRecommendedShareModal(property._id);
//                                 }}
//                               />
//                             </div>
//                             {/* {console.log(
//                             property.connect_to_name,
//                             property.property_owner_image,
//                           )} */}
//                             {/* Row 6 : Owner Details */}
//                             <div className="flex items-center pt-3">
//                               {/* Avatar */}
//                               <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 overflow-hidden rounded-full bg-blue-100">
//                                 {property.property_owner_image &&
//                                   !property.property_owner_image.includes(
//                                     "default_profile",
//                                   ) ? (
//                                   <>
//                                     <img
//                                       src={`${process.env.REACT_APP_API_URL}/media/${property.property_owner_image}`}
//                                       alt={property.connect_to_name || "Owner"}
//                                       className="object-cover w-full h-full rounded-full"
//                                       onError={(e) => {
//                                         e.target.style.display = "none";
//                                         e.target.nextSibling.style.display = "flex";
//                                       }}
//                                     />

//                                     {/* Fallback */}
//                                     <div className="items-center justify-center hidden w-full h-full">
//                                       <AiOutlineUser className="text-2xl text-blue-600" />
//                                     </div>
//                                   </>
//                                 ) : (
//                                   <div className="flex items-center justify-center w-full h-full">
//                                     <AiOutlineUser className="text-2xl text-blue-600" />
//                                   </div>
//                                 )}
//                               </div>

//                               {/* Name & User Type */}
//                               <div className="flex items-center flex-1 min-w-0 ml-3 sm:ml-4">
//                                 <span
//                                   className="text-sm font-semibold text-gray-900 truncate"
//                                   title={property.connect_to_name}
//                                 >
//                                   {property.connect_to_name || "Owner"}
//                                 </span>

//                                 <div className="w-px h-4 mx-3 sm:mx-4 bg-gray-300 flex-shrink-0"></div>

//                                 <span className="text-sm text-gray-500 truncate">
//                                   {property.user_type || "Owner"}
//                                 </span>
//                               </div>
//                             </div>
//                             {/* <h4 className="h-[56px] flex items-start text-lg font-semibold leading-7 text-gray-900 line-clamp-2">
//                           {property.property_name}
//                         </h4> */}

//                             {/* Price - Isko aap Image wale div ke andar 'absolute' position pe bhi daal sakte hain */}
//                             {/* <div className="flex items-center h-10 mb-2">
//                           <h3 className="flex items-center text-2xl font-bold text-gray-900">
//                             <FaRupeeSign className="mr-0.5 text-sm" />
//                             {property.property_category_type === "Rent"
//                               ? formatPrice(property.rent)
//                               : formatPrice(property.property_price)}
//                             {property.property_category_type === "Rent" &&
//                               property.rent_duration && (
//                                 <span className="ml-1 text-xs font-normal text-gray-500">
//                                   / {property.rent_duration}
//                                 </span>
//                               )}
//                           </h3>
//                         </div> */}

//                             {/* BHK and Property Type */}
//                             {/* <div className="h-[32px] mb-2">
//                           <p className="text-sm font-semibold text-gray-800 line-clamp-1">
//                             {property.bhk_type} {property.property_type},{" "}
//                             {property.bathrooms || "2"} Baths
//                           </p>
//                         </div> */}

//                             {/* Address / Locality */}
//                             {/* <div className="h-[46px] mb-3">
//                           <p className="text-xs text-gray-500 truncate sm:text-sm">
//                             In{" "}
//                             <span className="font-medium text-gray-700">
//                               {property.property_name || property.address_area}
//                             </span>
//                             , Pune
//                           </p>
//                         </div> */}

//                             {/* Divider (Optional) */}
//                             {/* <hr className="my-4 border-gray-100" /> */}

//                             {/* Footer: Posted by & Time */}
//                             {/* <div className="flex items-center justify-between pt-4 mt-auto border-t border-gray-100"> */}
//                             {/* <div className="flex flex-col"> */}
//                             {/* <span className="text-[10px] sm:text-[11px] text-gray-400 uppercase tracking-wide">
//                               Posted by {property.user_type || "Owner"}
//                             </span> */}
//                             {/* Time Ago - Static example like image */}
//                             {/* <span className="text-[11px] text-gray-400">
//                               1 month ago
//                             </span> */}
//                             {/* </div> */}

//                             {/* Share or Heart Icon */}
//                             {/* <div className="flex space-x-2">
//                             <FontAwesomeIcon
//                               icon={faShareNodes}
//                               className="text-xl text-gray-400 transition cursor-pointer hover:text-blue-600"
//                               onClick={(e) => {
//                                 e.preventDefault();
//                                 openRecommendedShareModal(property._id);
//                               }}
//                             />
//                           </div> */}
//                             {/* </div> */}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//             </Slider>
//           )}
//         </div>
//       </div>
//       <div
//         id="shareModal"
//         className="fixed bottom-0 right-0 z-50 items-center justify-center hidden bg-black bg-opacity-50"
//       >
//         <div className="w-full max-w-lg p-4 bg-white rounded-lg shadow-lg">
//           <div className="flex items-center justify-between mb-4">
//             <h5 className="text-lg font-bold">Share this link</h5>
//             <button onClick={closeShareModal}>&times;</button>
//           </div>
//           <div className="flex items-center mb-4">
//             <input
//               type="text"
//               className="flex-grow p-2 border rounded form-control"
//               value={currentShareUrl}
//               readOnly
//             />
//             <button
//               className="p-2 ml-2 bg-gray-200 rounded"
//               onClick={(e) => copyLink(e)}
//             >
//               Copy Link
//             </button>
//           </div>
//           <div className="flex justify-around">
//             <a
//               href={`https://wa.me/?text=${encodeURIComponent(
//                 currentShareUrl,
//               )}`}
//               className="btn btn-success"
//             >
//               WhatsApp
//             </a>
//             <a
//               href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
//                 currentShareUrl,
//               )}`}
//               className="btn btn-primary"
//             >
//               Facebook
//             </a>
//             <a href="https://www.instagram.com" className="btn btn-danger">
//               Instagram
//             </a>
//             <a
//               href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
//                 currentShareUrl,
//               )}`}
//               className="btn btn-info"
//             >
//               Twitter
//             </a>
//             <a
//               href={`mailto:?subject=Check out this page&body=${encodeURIComponent(
//                 currentShareUrl,
//               )}`}
//               className="btn btn-secondary"
//             >
//               Email
//             </a>
//           </div>
//         </div>
//       </div>

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
//           fetchHomeData();
//         }}
//       />
//     </div>
//   );
// };

// export default RecommendedProperties;



// ======================================================================================================================


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRef } from "react";
import { MdApartment } from "react-icons/md";
import { FaBath, FaUser } from "react-icons/fa";
import { RiRuler2Line } from "react-icons/ri";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Slider from "react-slick";
// UI ONLY: ShieldCheck + Star added to the EXISTING lucide-react import for the
// premium Verified / Featured badges. Heart, Camera, Home, Ruler are untouched.
import { Heart, Camera, Home, Ruler, ShieldCheck, Star } from "lucide-react";
import { toast } from "react-toastify";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FaRupeeSign } from "react-icons/fa";
import { BsHouseDoorFill } from "react-icons/bs";
import { BiShapeSquare } from "react-icons/bi";
import { faChair } from "@fortawesome/free-solid-svg-icons";

import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
// UI ONLY: arrow glyph for the "View All Properties" button (new import)
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { AiOutlineUser } from "react-icons/ai";
import { GoArrowLeft } from "react-icons/go";
import { GoArrowRight } from "react-icons/go";
import { PiCubeFocus } from "react-icons/pi";
import { useHistory } from "react-router-dom";
import Login1 from "../auth/Login1";
import SignUp1 from "../auth/SignUp1";
import PropertyCardSkeleton from "./PropertyCardSkeleton";
const userLocation = JSON.parse(sessionStorage.getItem("userLocation"));
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;

  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
    Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}
const RecommendedProperties = ({
  openRecommendedShareModal,
  closeShareModal,
  copyLink,
  currentShareUrl,
  data,
  fetchHomeData,
}) => {
  const [savedProperties, setSavedProperties] = useState([]);
  const [properties, setProperties] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const sliderRef = useRef(null);
  const history = useHistory();
  const [isContactModalOpen] = useState(false);
  const [openContactModalAfterLogin] = useState(false);
  const accessToken = sessionStorage.getItem("accessToken");

  // Modal open states
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  useEffect(() => {
    const userId = sessionStorage.getItem("AccessToken");
    if (userId) {
      setIsLoggedIn(true);
      fetchSavedProperties(userId);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const fetchSavedProperties = async () => {
    const userId = sessionStorage.getItem("AccessToken");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/cust_api/get_favorite_properties`,
        {
          user_id: userId,
        },
      );

      if (response.data.status === 1 && Array.isArray(response.data.data)) {
        const savedIds = response.data.data.map((prop) => prop._id);
        setSavedProperties(savedIds);
      } else {
        setSavedProperties([]);
        console.error("No saved properties found.");
      }
    } catch (error) {
      console.error("Error fetching saved properties:", error);
    }
  };

  // Fetch recommended properties
  const fetchRecommendedProperties = async () => {
    try {
      if (data && data.status === 1 && Array.isArray(data.data)) {
        setProperties(data.data);
      } else {
        setProperties([]);
      }
    } catch (error) {
      console.error("Error fetching recommended properties:", error);
    }
  };


  // {console.log(properties)}

  useEffect(() => {
    fetchRecommendedProperties();
  }, [data]);

  const handleClick = () => {
    history.push("/featuredDashboard");
  };

  // Toggle save/unsave property
  const toggleSaveProperty = async (propertyId) => {
    if (savedProperties.includes(propertyId)) {
      await removeFromFavorites(propertyId);
      setSavedProperties(savedProperties.filter((id) => id !== propertyId));
    } else {
      await addToFavorites(propertyId);
      setSavedProperties([...savedProperties, propertyId]);
    }
  };

  //  Add to favorites
  const addToFavorites = async (PropertyId) => {
    if (!accessToken) {
      setIsLoginModalOpen(true);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/cust_api/add_to_favorite`,
        {
          user_id: accessToken,
          property_id: PropertyId,
        },
      );
      fetchHomeData();
      // toast.success("Property added to favorites successfuly!");
    } catch (error) {
      console.error("Error adding property to favorites:", error);
    }
  };

  //  Remove to favorites
  const removeFromFavorites = async (favoriteId) => {
    const formData = new FormData();
    formData.append("favorite_id", favoriteId);

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/cust_api/remove_from_favorite`,
        { data: formData },
      );

      if (response.data.status === 1) {
        fetchHomeData();
        // toast.success("Property removed to favorites successfuly!");
      } else {
        fetchHomeData();
        console.error("Failed to remove:", response.data.message);
      }
    } catch (error) {
      console.error("Error unfavoriting:", error);
    }
  };

  // Slider settings
  const [activeIndexes, setActiveIndexes] = useState({});
  const BASE_URL = process.env.REACT_APP_API_URL;
  const settings = {
    infinite: true,
    lazyLoad: "ondemand",
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    // UI ONLY: `dots` ADDED to match the reference design (pagination dots under
    // the carousel). No existing key was removed or changed — infinite, lazyLoad,
    // slidesToShow, slidesToScroll, autoplay, autoplaySpeed, arrows, cssEase,
    // centerMode and every responsive breakpoint below are exactly as before.
    dots: true,
    dotsClass: "slick-dots premium-dots",
    cssEase: "linear",
    centerMode: false,
    responsive: [
      {
        // Laptop: 1024px–1399px -> 3 cards (default slidesToShow: 4 covers 1400px+)
        breakpoint: 1399,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        // Tablet: 768px–1023px -> 2 cards
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        // Mobile: <768px -> 1 card, full width
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };
  const formatPrice = (price) => {
    if (!price) return "";

    const formatNumber = (value, unit) => {
      return (
        (value % 1 === 0
          ? parseInt(value)
          : value.toFixed(2).replace(/\.?0+$/, "")) + unit
      );
    };

    if (price >= 10000000) {
      return formatNumber(price / 10000000, " Cr");
    } else if (price >= 100000) {
      return formatNumber(price / 100000, " L");
    } else if (price >= 1000) {
      return formatNumber(price / 1000, " K");
    } else {
      return price.toString();
    }
  };

  const convertToSqFt = (area, unit) => {
    if (!area || !unit) return null;
    const areaNum = parseFloat(area);
    if (isNaN(areaNum)) return null;

    switch (unit.toLowerCase()) {
      case "sq ft":
      case "sqft":
      case "square feet":
        return areaNum;
      case "sq yd":
      case "sqyd":
      case "square yards":
        return areaNum * 9;
      case "sq mt":
      case "sqmt":
      case "square meters":
        return areaNum * 10.7639;
      case "acre":
      case "acres":
        return areaNum * 43560;
      default:
        return areaNum; // Return as-is if unit is unknown
    }
  };

  useEffect(() => {
    if (isLoginModalOpen || isContactModalOpen || openContactModalAfterLogin) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLoginModalOpen, isContactModalOpen, openContactModalAfterLogin]);

  return (
    <div className="w-full px-3 py-8 bg-white sm:px-5 md:px-8 lg:px-10 xl:px-12 overflow-x-hidden">
      <style>{`
        .slider-container .slick-track {
          display: flex !important;
        }
        .slider-container .slick-slide {
          height: auto;
          display: flex !important;
        }
        .slider-container .slick-slide > div {
          width: 100%;
        }

        /* ================= UI ONLY: premium animation + dot styling =================
           Everything below is NEW presentation. No existing rule above was changed. */

        /* Header entry animation (runs once on mount, never on slide change) */
        @keyframes rpFadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .rp-fade-up { animation: rpFadeUp .55s cubic-bezier(.22,.61,.36,1) both; }
        .rp-delay-1 { animation-delay: .06s; }
        .rp-delay-2 { animation-delay: .12s; }
        .rp-delay-3 { animation-delay: .18s; }

        /* Underline sweep on the script accent */
        @keyframes rpSweep { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .rp-sweep { transform-origin: left center; animation: rpSweep .7s .25s ease-out both; }

        /* Carousel dots -> brand pink / red, matching the reference */
        .slider-container .premium-dots { bottom: -34px; }
        .slider-container .premium-dots li { width: 14px; height: 14px; margin: 0 3px; }
        .slider-container .premium-dots li button { width: 14px; height: 14px; padding: 0; }
        .slider-container .premium-dots li button:before {
          content: "";
          width: 8px;
          height: 8px;
          top: 3px;
          left: 3px;
          border-radius: 9999px;
          background: #F7C3CE;
          opacity: 1;
          transition: background .25s ease, width .25s ease, height .25s ease, top .25s ease, left .25s ease;
        }
        .slider-container .premium-dots li.slick-active button:before {
          background: #D61F45;
          width: 10px;
          height: 10px;
          top: 2px;
          left: 2px;
        }

        /* Inner image-slider dots sit above the gradient overlay */
        .rp-media .slick-dots { z-index: 21; }
      `}</style>

      {/* UI: soft pink panel replaces the flat slate panel, matching the design.
          pb-14 leaves room for the new carousel dots. */}
      <div className="w-full bg-gradient-to-b from-[#FDF5F7] to-[#FBEEF1] rounded-2xl pb-14">
        <div className="w-full sm:px-6 lg:px-4">
          <div className="flex flex-col gap-4 px-4 pt-6 pb-4 sm:px-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col">

              {/* UI NEW: eyebrow with star + trailing rule */}
              <div className="flex items-center gap-2 mb-2 rp-fade-up">
                <Star size={13} className="fill-[#D61F45] text-[#D61F45] flex-shrink-0" />
                <span className="text-[11px] sm:text-xs font-bold tracking-[0.18em] text-[#D61F45] uppercase whitespace-nowrap">
                  Featured Properties
                </span>
                <span className="hidden sm:block h-px w-12 bg-[#D61F45]/35" />
              </div>

              {/* UI: two-tone headline (navy + brand red) */}
              <h2 className="mb-2 text-xl font-bold tracking-tight text-[#172033] sm:text-2xl lg:text-4xl rp-fade-up rp-delay-1">
                Handpicked Homes for a{" "}
                <span className="text-[#D61F45]">Better Tomorrow</span>
              </h2>

              <p className="text-sm text-[#64748B] sm:text-base rp-fade-up rp-delay-2">
                Explore verified properties with modern amenities, great locations and the best value.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-2 lg:mt-0 rp-fade-up rp-delay-3">

              {/* UI NEW: handwritten accent (decorative only) */}
              <div
                className="flex-shrink-0 hidden leading-tight text-right xl:block text-[#D61F45] mr-1"
                style={{
                  fontFamily:
                    "'Segoe Script','Bradley Hand','Brush Script MT',cursive",
                }}
              >
                <span className="block text-lg">Featured</span>
                <span className="block text-lg">Properties</span>
                <span className="block w-24 h-px mt-1 ml-auto bg-[#D61F45]/60 rp-sweep" />
              </div>

              {/* UI: outlined brand pill + arrow. onClick={handleClick} unchanged. */}
              <button
                className="group flex items-center justify-center w-full gap-2 px-5 py-2.5 text-sm font-semibold text-[#D61F45] bg-white border border-[#D61F45] rounded-full transition-all duration-300 hover:bg-[#D61F45] hover:text-white hover:shadow-lg hover:shadow-[#D61F45]/25 sm:w-auto sm:px-6"
                onClick={handleClick}
              >
                View All Properties
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-[11px] transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              <div className="hidden md:flex items-center gap-3">
                {/* UI: pale pink circle. slickPrev() unchanged. */}
                <button
                  className="flex items-center justify-center w-11 h-11 rounded-full bg-[#D61F45]/10 transition-all duration-300 hover:bg-[#D61F45]/20 hover:scale-105 active:scale-95"
                  onClick={() => sliderRef.current.slickPrev()}
                >
                  <GoArrowLeft className="text-2xl text-[#D61F45]" />
                </button>

                {/* UI: solid brand circle. slickNext() unchanged. */}
                <button
                  className="flex items-center justify-center w-11 h-11 rounded-full bg-[#D61F45] shadow-md transition-all duration-300 hover:bg-[#B91C3C] hover:shadow-lg hover:scale-105 active:scale-95"
                  onClick={() => sliderRef.current.slickNext()}
                >
                  <GoArrowRight className="text-2xl text-white" />
                </button>
              </div>
            </div>
          </div>
          {data?.status === 0 ? (
            <Slider {...settings} className="slider-container" ref={sliderRef}>
              {[1, 2, 3, 4].map((item) => (
                <div key={item}>
                  <PropertyCardSkeleton />
                </div>
              ))}
            </Slider>
          ) : (
            <Slider {...settings} className="slider-container" ref={sliderRef}>
              {properties
                .filter((property) => property.available_status !== "Sold")
                .map((property) => {
                  const getValidImageUrl = (img) => {
                    if (typeof img !== "string" || !img.trim()) return null;
                    return img.startsWith("http") ? img : BASE_URL + img;
                  };

                  const coverImage = getValidImageUrl(property.cover_image);
                  const additionalImages = (property.property_images || [])
                    .map((imgObj) => getValidImageUrl(imgObj?.image))
                    .filter(Boolean);
                  const allImages = [
                    ...(coverImage ? [coverImage] : []),
                    ...additionalImages,
                  ];
                  const subtitle = (() => {
                    const area = property.address_area || "";
                    const city = property.city_name || "";

                    const location = area.toLowerCase().includes(city.toLowerCase())
                      ? area
                      : `${area}, ${city}`;

                    const type =
                      property.property_type === "Office"
                        ? "Office Space"
                        : property.property_type === "Retail"
                          ? "Retail Space"
                          : property.property_type || "";

                    const category = property.property_category_type || "";

                    if (
                      category === "Commercial Buy" ||
                      category === "Commercial Lease"
                    ) {
                      return `${type} for ${category === "Commercial Buy" ? "Sale" : "Lease"
                        } in ${location}`;
                    }
                    return `${type} in ${location}`;
                  })();
                  let distance = null;

                  if (userLocation && property.latitude && property.longitude) {
                    distance = calculateDistance(
                      parseFloat(userLocation.latitude),
                      parseFloat(userLocation.longitude),
                      parseFloat(property.latitude),
                      parseFloat(property.longitude),
                    ).toFixed(1);
                  }

                  return (
                    <div key={property._id} className="h-full px-2 py-4">
                      {/* UI: crisper border, rounded-2xl, deeper lift on hover */}
                      <div className="property-card flex flex-col h-full min-h-[480px] sm:min-h-[500px] lg:min-h-[520px] bg-white border border-[#E2E8F0] rounded-2xl shadow-[0_2px_10px_rgba(17,24,39,0.06)] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(214,31,69,0.14)] hover:border-[#F7C3CE]">
                        <div className="flex flex-col h-full w-full overflow-hidden rounded-xl">
                          {/* UI: `group` added so the photo can zoom on card hover */}
                          <div className="relative group rp-media">
                            <Link
                              to={`/propertydetails/${property._id}`}
                              className="block overflow-hidden"
                            >
                              {allImages.length > 1 ? (
                                <Slider
                                  key={`${property._id}-${activeIndexes[property._id] || 0}`}
                                  dots
                                  infinite
                                  speed={500}
                                  slidesToShow={1}
                                  slidesToScroll={1}
                                  arrows
                                  autoplay
                                  autoplaySpeed={2000}
                                  beforeChange={(current, next) =>
                                    setActiveIndexes((prev) => ({
                                      ...prev,
                                      [property._id]: next,
                                    }))
                                  }
                                  initialSlide={activeIndexes[property._id] || 0}
                                  customPaging={(i) => {
                                    const activeSlide =
                                      activeIndexes[property._id] || 0;
                                    const isActive =
                                      i === activeSlide % allImages.length;
                                    return (
                                      <div
                                        style={{
                                          /* UI: smaller dots, brand red when active */
                                          width: "8px",
                                          height: "8px",
                                          borderRadius: "50%",
                                          background: isActive
                                            ? "#fff"
                                            : "rgba(255,255,255,0.45)",
                                          margin: "0 4px",
                                          cursor: "pointer",
                                          transition: "background .25s ease",
                                        }}
                                      />
                                    );
                                  }}
                                  appendDots={(dots) => (
                                    <div
                                      style={{
                                        position: "absolute",
                                        bottom: "10px",
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        display: "flex",
                                        justifyContent: "center",
                                        width: "100%",
                                      }}
                                    >
                                      {dots}
                                    </div>
                                  )}
                                  className="rounded-t-2xl"
                                >
                                  {allImages.map((imgUrl, idx) => (
                                    <div key={`${property._id}-${idx}`}>
                                      <img
                                        src={imgUrl}
                                        alt="Property"
                                        className="w-full h-[160px] sm:h-[190px] lg:h-[220px] object-cover rounded-t-2xl transition-transform duration-500 ease-out group-hover:scale-105"
                                      />
                                    </div>
                                  ))}
                                </Slider>
                              ) : (
                                <img
                                  src={allImages[0] || "/image/app.png"}
                                  alt="Property"
                                  className="w-full h-[160px] sm:h-[190px] lg:h-[220px] object-cover rounded-t-2xl transition-transform duration-500 ease-out group-hover:scale-105"
                                  loading="lazy"
                                  onError={(e) => (e.target.style.display = "none")}
                                />
                              )}
                            </Link>

                            {/* UI NEW: gradient scrim so badge text stays legible on any photo */}
                            <div className="absolute inset-0 z-[5] pointer-events-none bg-gradient-to-t from-black/55 via-black/0 to-black/15" />

                            {/* Days on Houzza */}
                            {/* <span className="absolute px-2 py-1 text-xs font-normal text-white rounded-full top-2 left-2 bg-gray-800/60 backdrop-blur-sm">
                          {property.days_since_created} days on NoWayBroker
                        </span> */}


                            {/* UI: TOP-LEFT BADGE ROW.
                                Both badges keep their ORIGINAL conditions —
                                mark_as_featured === "Yes" and admin_approval === "Approved".
                                Nothing is shown unless the API says so. */}
                            {/* FIX: stacked vertically (not wrapped in a row) so a card
                                with BOTH Featured and Verified can never collide with the
                                Virtual Tour pill / heart in the opposite corner. */}
                            <div className="absolute z-20 flex flex-col items-start gap-1.5 top-3 left-3 max-w-[52%]">
                              {property.mark_as_featured === "Yes" && (
                                <span className="flex items-center gap-1 px-2.5 py-1 text-[10px] sm:text-[11px] font-bold tracking-wide text-[#172033] uppercase rounded-full shadow-md bg-gradient-to-r from-[#F5B800] to-[#D4A72C]">
                                  <Star size={11} className="fill-[#172033] text-[#172033]" />
                                  Featured
                                </span>
                              )}

                              {/* Admin Approval Badge -> premium green Verified pill.
                                  Same admin_approval === "Approved" condition as before. */}
                              {property.admin_approval === "Approved" && (
                                <span className="flex items-center gap-1 px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold text-white rounded-full shadow-md bg-[#16A34A]">
                                  <ShieldCheck size={12} strokeWidth={2.5} className="text-white" />
                                  Verified
                                </span>
                              )}
                            </div>

                            {/* Virtual Tour & Favorite Button */}
                            <div className="absolute z-20 flex items-center space-x-2 top-3 right-3">
                              {property.virtual_tour_availability === "Yes" && (
                                <span className="flex items-center gap-1 px-2.5 py-1.5 text-[10px] sm:text-xs font-medium text-white rounded-full bg-[#0F2747]/70 backdrop-blur-sm">
                                  <PiCubeFocus className="text-sm text-white" />
                                  Virtual Tour
                                </span>
                              )}
                              {/* UI: same handler, same accessToken guard, same
                                  is_favorite / favorite_id logic — restyled only. */}
                              <button
                                className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full shadow bg-[#0F2747]/55 backdrop-blur-md transition-all duration-200 hover:bg-[#0F2747]/75 hover:scale-110 active:scale-95"
                                onClick={() => {
                                  if (!accessToken) {
                                    setIsLoginModalOpen(true);
                                    return;
                                  }
                                  if (property.is_favorite) {
                                    removeFromFavorites(property.favorite_id);
                                  } else {
                                    addToFavorites(property._id);
                                  }
                                }}
                              >
                                <Heart
                                  size={20}
                                  stroke={property.is_favorite ? "none" : "white"}
                                  color={
                                    property.is_favorite
                                      ? "#D61F45"
                                      : "rgba(255,255,255,0.9)"
                                  }
                                  fill={
                                    property.is_favorite
                                      ? "#D61F45"
                                      : "none"
                                  }
                                  strokeWidth={2}
                                />
                              </button>
                            </div>

                            {/* FOR BUY / RENT & FEATURED tags */}
                            {/* UI: moved off the corner + turned into a pill.
                                The matching logic below is byte-for-byte the original. */}
                            <div className="absolute z-20 bottom-3 left-3 max-w-[60%]">
                              {(() => {
                                const rawCategory =
                                  property.property_category_type || "";

                                const normalizedCategory = rawCategory
                                  .replace(/\s+/g, " ")
                                  .replace(/-/g, " ")
                                  .replace(/\//g, " ")
                                  .trim()
                                  .toLowerCase();

                                let badgeText = "UNKNOWN";
                                let badgeColor = "bg-[#D61F45]";

                                if (normalizedCategory === "buy") {
                                  badgeText = "FOR BUY";
                                  badgeColor = "bg-[#D61F45]";
                                } else if (normalizedCategory === "rent") {
                                  badgeText = "FOR RENT";
                                  badgeColor = "bg-[#D61F45]";
                                } else if (
                                  normalizedCategory.includes("commercial buy")
                                ) {
                                  badgeText = "COMMERCIAL BUY";
                                  badgeColor = "bg-[#D61F45]";
                                } else if (
                                  normalizedCategory.includes("commercial lease")
                                ) {
                                  badgeText = "COMMERCIAL LEASE";
                                  badgeColor = "bg-[#D61F45]";
                                } else if (
                                  normalizedCategory.includes("pg") ||
                                  normalizedCategory.includes("co living") ||
                                  normalizedCategory.includes("coliving")
                                ) {
                                  badgeText = "PG / CO-LIVING";
                                  badgeColor = "bg-[#D61F45]";
                                }

                                return (
                                  <span
                                    className={`block text-white text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full shadow-md truncate ${badgeColor}`}
                                  >
                                    {badgeText}
                                  </span>
                                );
                              })()}
                            </div>

                            {/* UI NEW: photo counter — derived from the real
                                allImages array, so it only renders when there is
                                genuinely more than one photo. Uses the already
                                imported (previously unused) lucide `Camera`. */}
                            {allImages.length > 1 && (
                              <span className="absolute z-20 bottom-3 right-3 flex items-center gap-1 px-2 py-1 text-[10px] sm:text-[11px] font-semibold text-white rounded-md bg-black/55 backdrop-blur-sm">
                                <Camera size={12} />
                                {((activeIndexes[property._id] || 0) % allImages.length) + 1}/
                                {allImages.length}
                              </span>
                            )}
                          </div>

                          {/* Property Details */}
                          {/* Property Details Wrapper */}
                          <div className="flex flex-col flex-1 justify-between p-3 sm:p-4 bg-white">
                            {/* Price Section */}
                            <div className="flex items-start justify-between gap-2 sm:gap-3 mb-0">
                              {/* Property Name */}
                              <h3
                                className="flex-1 min-w-0 m-0 text-base sm:text-lg font-bold leading-6 text-[#172033] truncate"
                                title={property.property_name}
                              >
                                {property.property_name || "N/A"}
                              </h3>

                              {/* Furnishing -> UI: soft navy pill */}
                              <span
                                className="flex-shrink-0 m-0 text-[11px] sm:text-xs font-medium leading-none text-[#1E3A5F] bg-[#1E3A5F]/10 px-2.5 py-1.5 rounded-full whitespace-nowrap"
                                title={property.furnished_type}
                              >
                                {property.furnished_type || "Un-Furnished"}
                              </span>
                            </div>

                            {/* UI: red location pin added ahead of the same subtitle */}
                            <p
                              className="mt-1.5 mb-1 text-xs sm:text-sm leading-5 text-[#64748B] break-words"
                              title={subtitle}
                            >
                              <FaMapMarkerAlt className="inline-block mr-1 text-[#D61F45] align-[-2px]" />
                              {subtitle}
                            </p>
                            <div className="flex flex-wrap items-center justify-between gap-y-1 mb-1">
                              {/* Left Side */}
                              <div className="flex flex-wrap items-center gap-2 gap-y-1">
                                {/* UI: price in brand red */}
                                <span className="text-xl sm:text-2xl font-extrabold text-[#D61F45]">
                                  ₹{" "}
                                  {property.property_category_type === "Rent" ||
                                    property.property_category_type === "PG/Co-living"
                                    ? formatPrice(property.rent)
                                    : formatPrice(property.property_price)}
                                </span>

                                {(property.property_category_type === "Rent" ||
                                  property.property_category_type ===
                                  "PG/Co-living") && (
                                    <span className="ml-1 text-xs sm:text-sm text-[#64748B]">
                                      / {property.rent_duration || "Per Month"}
                                    </span>
                                  )}

                                {/* Ready to Move - Keep close to price */}
                                {/* UI: solid brand pill. Condition unchanged. */}
                                {property.property_category_type?.includes("Buy") &&
                                  property.possession_status === "Ready To Move" && (
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 text-white rounded-full bg-[#D61F45] shadow-sm transition-colors duration-200 hover:bg-[#B91C3C]">
                                      <MdApartment className="text-base text-white" />
                                      <span className="text-xs font-semibold text-white whitespace-nowrap">
                                        Get Best Deal
                                      </span>
                                    </div>
                                  )}
                              </div>

                              {/* Right Side */}
                              <div className="text-xs sm:text-sm font-medium whitespace-nowrap">
                                {(property.property_category_type === "Rent" ||
                                  property.property_category_type ===
                                  "PG/Co-living") && (
                                    <>
                                      <span className="text-[#64748B]">Deposit:</span>
                                      <span className="ml-1 font-semibold text-[#172033]">
                                        ₹{" "}
                                        {property.custom_deposit_amount?.toLocaleString(
                                          "en-IN",
                                        )}
                                      </span>
                                    </>
                                  )}

                                {property.property_category_type?.includes("Buy") &&
                                  property.possession_status !== "Ready To Move" &&
                                  property.possession_date && (
                                    <>
                                      <span className="text-[#64748B]">
                                        Possession:
                                      </span>
                                      <span className="ml-1 font-semibold text-[#172033]">
                                        {new Date(
                                          property.possession_date,
                                        ).toLocaleDateString("en-IN")}
                                      </span>
                                    </>
                                  )}
                              </div>
                            </div>
                            {/* Features Row */}
                            {/* UI: same three fields + same fallbacks, recoloured.
                                gap/padding tightened so 4-up never truncates. */}
                            <div className="grid grid-cols-3 py-3 border-t border-b border-[#E2E8F0] gap-x-0.5">
                              {/* First Column */}
                              <div className="flex items-center gap-1 px-0.5 min-w-0">
                                <MdApartment className="text-[18px] text-[#1E3A5F] flex-shrink-0" />

                                <div className="flex flex-col justify-center min-w-0">
                                  <p className="m-0 text-xs sm:text-[13px] font-semibold leading-4 truncate text-[#172033]">
                                    {property.building_type === "Commercial"
                                      ? property.property_type === "Office"
                                        ? "Office Space"
                                        : property.property_type === "Retail"
                                          ? "Retail Space"
                                          : property.property_type
                                      : property.property_category_type?.includes(
                                        "PG",
                                      )
                                        ? `${property.bathroom || 0} Bathrooms`
                                        : property.bhk_type}
                                  </p>

                                  <p className="m-0 text-[10px] leading-4 text-[#64748B] truncate">
                                    {property.building_type === "Commercial"
                                      ? "Property Type"
                                      : property.property_category_type?.includes(
                                        "PG",
                                      )
                                        ? "Bathrooms"
                                        : property.property_type}
                                  </p>
                                </div>
                              </div>

                              {/* Second Column */}
                              <div className="flex items-center gap-1 px-0.5 border-l border-[#E2E8F0] min-w-0">
                                {property.property_category_type?.includes("PG") ? (
                                  <FaUser className="text-[16px] text-[#1E3A5F] flex-shrink-0" />
                                ) : (
                                  <FaBath className="text-[16px] text-[#1E3A5F] flex-shrink-0" />
                                )}

                                <div className="flex flex-col justify-center min-w-0">
                                  <p className="m-0 text-xs sm:text-[13px] font-semibold leading-4 truncate text-[#172033]">
                                    {property.property_category_type?.includes("PG")
                                      ? property.available_for
                                      : `${property.bathroom || 0} Baths`}
                                  </p>

                                  <p className="m-0 text-[10px] leading-4 text-[#64748B] truncate">
                                    {property.property_category_type?.includes("PG")
                                      ? "Available For"
                                      : "Bathrooms"}
                                  </p>
                                </div>
                              </div>

                              {/* Third Column */}
                              <div className="flex items-center gap-1 px-0.5 border-l border-[#E2E8F0] min-w-0">
                                <RiRuler2Line className="text-[18px] text-[#1E3A5F] flex-shrink-0" />

                                <div className="flex flex-col justify-center min-w-0">
                                  <p className="m-0 text-xs sm:text-[13px] font-semibold leading-4 truncate text-[#172033]">
                                    {property.area} {property.area_in}
                                  </p>

                                  <p className="m-0 text-[10px] leading-4 text-[#64748B] truncate">
                                    Built Up Area
                                  </p>
                                </div>
                              </div>
                            </div>
                            {/* Divider */}
                            <hr className="my-1 border-[#E2E8F0]" />

                            {/* Row 5 : Posted By | Days | Distance | Share */}
                            <div className="flex items-center justify-between pt-1 pb-2 text-[12px] sm:text-[13px] text-[#64748B]">
                              {/* Left */}
                              <div className="flex items-center flex-wrap min-w-0">
                                {/* Posted By */}
                                <div className="flex items-center min-w-0">
                                  <AiOutlineClockCircle className="mr-1 text-[15px] text-[#64748B] flex-shrink-0" />
                                  <span className="truncate">
                                    Posted by {property.user_type || "Owner"}
                                  </span>
                                </div>

                                {/* Dot */}
                                <span className="mx-2 text-[#CBD5E1]">•</span>

                                {/* Days */}
                                <span className="whitespace-nowrap">
                                  {property.days_since_created
                                    ? `${property.days_since_created} days ago`
                                    : "Recently"}
                                </span>

                                {/* Distance */}
                                {distance && (
                                  <>
                                    <span className="mx-2 text-[#CBD5E1]">•</span>

                                    <div className="flex items-center whitespace-nowrap">
                                      <FaMapMarkerAlt className="mr-1 text-[#D61F45]" />
                                      {distance} km from you
                                    </div>
                                  </>
                                )}
                              </div>

                              {/* Share */}
                              {/* UI: colour only. openRecommendedShareModal unchanged. */}
                              <FontAwesomeIcon
                                icon={faShareNodes}
                                className="ml-2 text-[17px] text-[#64748B] transition-colors cursor-pointer hover:text-[#D61F45] flex-shrink-0"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  openRecommendedShareModal(property._id);
                                }}
                              />
                            </div>
                            {/* {console.log(
                            property.connect_to_name,
                            property.property_owner_image,
                          )} */}
                            {/* Row 6 : Owner Details */}
                            {/* UI: wrapped in a soft tinted card */}
                            <div className="flex items-center pt-3 mt-auto">
                              <div className="flex items-center w-full gap-3 p-2.5 bg-[#F5F7FA] border border-[#E2E8F0] rounded-xl sm:gap-4">
                                {/* Avatar */}
                                <div className="flex items-center justify-center flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 overflow-hidden rounded-full ring-2 ring-white shadow bg-[#0F2747]/10">
                                  {property.property_owner_image &&
                                    !property.property_owner_image.includes(
                                      "default_profile",
                                    ) ? (
                                    <>
                                      <img
                                        src={`${process.env.REACT_APP_API_URL}/media/${property.property_owner_image}`}
                                        alt={property.connect_to_name || "Owner"}
                                        className="object-cover w-full h-full rounded-full"
                                        onError={(e) => {
                                          e.target.style.display = "none";
                                          e.target.nextSibling.style.display = "flex";
                                        }}
                                      />

                                      {/* Fallback */}
                                      <div className="items-center justify-center hidden w-full h-full">
                                        <AiOutlineUser className="text-2xl text-[#0F2747]" />
                                      </div>
                                    </>
                                  ) : (
                                    <div className="flex items-center justify-center w-full h-full">
                                      <AiOutlineUser className="text-2xl text-[#0F2747]" />
                                    </div>
                                  )}
                                </div>

                                {/* Name & User Type */}
                                <div className="flex items-center flex-1 min-w-0">
                                  <span
                                    className="text-sm font-semibold text-[#172033] truncate"
                                    title={property.connect_to_name}
                                  >
                                    {property.connect_to_name || "Owner"}
                                  </span>

                                  <div className="w-px h-4 mx-3 sm:mx-4 bg-[#E2E8F0] flex-shrink-0"></div>

                                  <span className="text-sm text-[#64748B] truncate">
                                    {property.user_type || "Owner"}
                                  </span>
                                </div>
                              </div>
                            </div>
                            {/* <h4 className="h-[56px] flex items-start text-lg font-semibold leading-7 text-gray-900 line-clamp-2">
                          {property.property_name}
                        </h4> */}

                            {/* Price - Isko aap Image wale div ke andar 'absolute' position pe bhi daal sakte hain */}
                            {/* <div className="flex items-center h-10 mb-2">
                          <h3 className="flex items-center text-2xl font-bold text-gray-900">
                            <FaRupeeSign className="mr-0.5 text-sm" />
                            {property.property_category_type === "Rent"
                              ? formatPrice(property.rent)
                              : formatPrice(property.property_price)}
                            {property.property_category_type === "Rent" &&
                              property.rent_duration && (
                                <span className="ml-1 text-xs font-normal text-gray-500">
                                  / {property.rent_duration}
                                </span>
                              )}
                          </h3>
                        </div> */}

                            {/* BHK and Property Type */}
                            {/* <div className="h-[32px] mb-2">
                          <p className="text-sm font-semibold text-gray-800 line-clamp-1">
                            {property.bhk_type} {property.property_type},{" "}
                            {property.bathrooms || "2"} Baths
                          </p>
                        </div> */}

                            {/* Address / Locality */}
                            {/* <div className="h-[46px] mb-3">
                          <p className="text-xs text-gray-500 truncate sm:text-sm">
                            In{" "}
                            <span className="font-medium text-gray-700">
                              {property.property_name || property.address_area}
                            </span>
                            , Pune
                          </p>
                        </div> */}

                            {/* Divider (Optional) */}
                            {/* <hr className="my-4 border-gray-100" /> */}

                            {/* Footer: Posted by & Time */}
                            {/* <div className="flex items-center justify-between pt-4 mt-auto border-t border-gray-100"> */}
                            {/* <div className="flex flex-col"> */}
                            {/* <span className="text-[10px] sm:text-[11px] text-gray-400 uppercase tracking-wide">
                              Posted by {property.user_type || "Owner"}
                            </span> */}
                            {/* Time Ago - Static example like image */}
                            {/* <span className="text-[11px] text-gray-400">
                              1 month ago
                            </span> */}
                            {/* </div> */}

                            {/* Share or Heart Icon */}
                            {/* <div className="flex space-x-2">
                            <FontAwesomeIcon
                              icon={faShareNodes}
                              className="text-xl text-gray-400 transition cursor-pointer hover:text-blue-600"
                              onClick={(e) => {
                                e.preventDefault();
                                openRecommendedShareModal(property._id);
                              }}
                            />
                          </div> */}
                            {/* </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          )}
        </div>
      </div>
      <div
        id="shareModal"
        className="fixed bottom-0 right-0 z-50 items-center justify-center hidden bg-black bg-opacity-50"
      >
        <div className="w-full max-w-lg p-4 bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-bold">Share this link</h5>
            <button onClick={closeShareModal}>&times;</button>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="text"
              className="flex-grow p-2 border rounded form-control"
              value={currentShareUrl}
              readOnly
            />
            <button
              className="p-2 ml-2 bg-gray-200 rounded"
              onClick={(e) => copyLink(e)}
            >
              Copy Link
            </button>
          </div>
          <div className="flex justify-around">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                currentShareUrl,
              )}`}
              className="btn btn-success"
            >
              WhatsApp
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                currentShareUrl,
              )}`}
              className="btn btn-primary"
            >
              Facebook
            </a>
            <a href="https://www.instagram.com" className="btn btn-danger">
              Instagram
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                currentShareUrl,
              )}`}
              className="btn btn-info"
            >
              Twitter
            </a>
            <a
              href={`mailto:?subject=Check out this page&body=${encodeURIComponent(
                currentShareUrl,
              )}`}
              className="btn btn-secondary"
            >
              Email
            </a>
          </div>
        </div>
      </div>

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
          fetchHomeData();
        }}
      />
    </div>
  );
};

export default RecommendedProperties;