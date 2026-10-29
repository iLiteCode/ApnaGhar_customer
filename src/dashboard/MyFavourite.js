// import React, { useState, useEffect, useRef } from "react";
// import { Heart, Building2 } from "lucide-react";
// import { PiShareNetworkLight, PiCubeFocus } from "react-icons/pi";
// import { MdApartment, MdFiberNew } from "react-icons/md";
// import { RiRuler2Line } from "react-icons/ri";
// import { AiOutlineClockCircle } from "react-icons/ai";
// import { FaMapMarkerAlt, FaHardHat, FaDownload, FaArrowRight, FaBed } from "react-icons/fa";
// import { FaBath, FaRupeeSign, FaWhatsapp, FaPhone } from "react-icons/fa";
// import axios from "axios";
// import ShareModal from "../containers/ShareModal";
// import { Link } from "react-router-dom";
// import Slider from "react-slick";
// import { AiOutlineUser } from "react-icons/ai";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
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

// /* ====================================================================
//    ConfigCarousel — ported as-is from Spotlights. Used ONLY on the
//    Favorite Project cards below. Renders one card per available
//    configuration (BHK/unit type + price), with small circular Prev/Next
//    buttons on the outer edges that auto-hide when there's just one config.
//    ==================================================================== */
// const ConfigCarousel = ({ units, formatAverageProjectPrice }) => {
//   const innerSliderRef = useRef(null);

//   if (!units || units.length === 0) return null;

//   const desktopVisible = Math.min(3, units.length);
//   const tabletVisible = Math.min(2, units.length);
//   const mobileVisible = Math.min(2, units.length);
//   const smallMobileVisible = Math.min(1, units.length);

//   const showNavButtons = units.length > 1;

//   /* Nav buttons should only ever be visible at a given screen width when
//      scrolling is actually required at that width — i.e. when units.length
//      exceeds the number of slides visible there (desktop: 3, tablet/mobile:
//      2, small mobile: 380px and below: 1). Since desktopVisible/tabletVisible/
//      mobileVisible/smallMobileVisible above are all Math.min(N, units.length),
//      scrolling is needed at a given breakpoint exactly when units.length is
//      still larger than that breakpoint's cap:
//        - units.length >= 4  -> more configs than fit anywhere -> always show
//        - units.length === 3 -> fits at desktop (cap 3), overflows at
//          tablet/mobile/small-mobile (cap 2/2/1) -> show only <=1024px
//        - units.length === 2 -> fits at desktop/tablet/mobile (cap 3/2/2),
//          overflows only at small mobile (cap 1) -> show only <=380px
//        - units.length <= 1  -> never overflows -> showNavButtons is false,
//          so this class is never applied
//      "hidden" as the base class plus a max-width variant means the buttons
//      stay out of the flow (and out of the tab order) until that width is
//      actually reached — swipe still works regardless of button visibility. */
//   const navVisibilityClass =
//     units.length >= 4
//       ? "flex"
//       : units.length === 3
//         ? "hidden max-[1024px]:flex"
//         : "hidden max-[380px]:flex";

//   const navButtonClass = `flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,0.18)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.28)] items-center justify-center transition-shadow duration-200 ${navVisibilityClass}`;

//   const sliderSettings = {
//     dots: false,
//     arrows: false,
//     infinite: units.length > smallMobileVisible,
//     speed: 400,
//     slidesToShow: desktopVisible,
//     slidesToScroll: 1,
//     swipe: true,
//     swipeToSlide: true,
//     touchThreshold: 8,
//     responsive: [
//       { breakpoint: 1024, settings: { slidesToShow: tabletVisible } },
//       { breakpoint: 640, settings: { slidesToShow: mobileVisible } },
//       { breakpoint: 380, settings: { slidesToShow: smallMobileVisible } },
//     ],
//   };

//   return (
//     <div className="w-full h-full flex items-center gap-1.5">
//       {showNavButtons && (
//         <button
//           type="button"
//           aria-label="Previous configuration"
//           onClick={(e) => {
//             e.preventDefault();
//             e.stopPropagation();
//             innerSliderRef.current?.slickPrev();
//           }}
//           className={navButtonClass}
//         >
//           <FaMapMarkerAlt className="hidden" />
//           <svg width="8" height="8" viewBox="0 0 320 512" className="text-[#A70D2A]" fill="currentColor">
//             <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
//           </svg>
//         </button>
//       )}

//       <div className="flex-1 min-w-0 h-full flex items-center [&_.slick-list]:overflow-hidden [&_.slick-track]:flex [&_.slick-track]:items-stretch [&_.slick-slide]:h-auto [&_.slick-slide>div]:h-full">
//         <Slider ref={innerSliderRef} {...sliderSettings} className="w-full">
//           {units.map((unit, i) => (
//             <div key={i} className="h-full px-1">
//               <div className="h-full flex flex-col items-center justify-center border border-gray-200 rounded-lg px-2 py-2.5 text-center bg-white">
//                 <FaBed className="text-sm mb-1 text-gray-700" />
//                 <h3 className="font-semibold text-[10.5px] sm:text-[11px] text-gray-900 truncate leading-tight">
//                   {unit.type}
//                 </h3>
//                 {unit.price ? (
//                   <h2 className="text-[#A70D2A] font-bold text-[15px] sm:text-base lg:text-[18px] mt-1.5 text-center truncate leading-tight">
//                     {formatAverageProjectPrice(unit.price)}
//                   </h2>
//                 ) : (
//                   <h2 className="text-gray-300 font-bold text-[15px] sm:text-base lg:text-[18px] mt-1.5 text-center">
//                     &nbsp;
//                   </h2>
//                 )}
//               </div>
//             </div>
//           ))}
//         </Slider>
//       </div>

//       {showNavButtons && (
//         <button
//           type="button"
//           aria-label="Next configuration"
//           onClick={(e) => {
//             e.preventDefault();
//             e.stopPropagation();
//             innerSliderRef.current?.slickNext();
//           }}
//           className={navButtonClass}
//         >
//           <svg width="8" height="8" viewBox="0 0 320 512" className="text-[#A70D2A]" fill="currentColor">
//             <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.6 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
//           </svg>
//         </button>
//       )}
//     </div>
//   );
// };

// const MyFavourite = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const propPerPage = 3;
//   const [prop, setProp] = useState([]);
//   const [projects, setProjects] = useState([]);
//   const [totalPages, setTotalPages] = useState(1);
//   const [currentShareUrl, setCurrentShareUrl] = useState("");
//   const [isShareModalOpen, setIsShareModalOpen] = useState(false);
//   const [activeShareId, setActiveShareId] = useState(null);
//   const [errorMsg, setErrorMsg] = useState("");
//   const [activeTab, setActiveTab] = useState("property");
//   const [activeIndexes, setActiveIndexes] = useState({});
//   const userId = sessionStorage.getItem("accessToken");

//   const fetchData = async () => {
//     if (!userId) {
//       setErrorMsg("User not logged in. Please login to view your favorites.");
//       if (activeTab === "property") setProp([]);
//       else setProjects([]);
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("user_id", userId);
//       formData.append("page", currentPage);
//       formData.append("page_size", propPerPage);

//       const endpoint =
//         activeTab === "property"
//           ? `${process.env.REACT_APP_API_URL}/cust_api/get_favorite_properties`
//           : `${process.env.REACT_APP_API_URL}/cust_api/get_favorite_projects`;

//       const response = await fetch(endpoint, {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();

//       if (data.status === 1 && Array.isArray(data.data)) {
//         if (activeTab === "property") {
//           setProp(data.data);
//           const totalCount = data.total_count || 0;
//           setTotalPages(Math.ceil(totalCount / propPerPage));
//         } else {
//           setProjects(data.data);
//           const totalCount = data.total_count || 0;
//           setTotalPages(Math.ceil(totalCount / propPerPage));
//         }

//         setErrorMsg("");
//       } else {
//         if (activeTab === "property") setProp([]);
//         else setProjects([]);
//         setTotalPages(1);
//         setErrorMsg("No favorites found.");
//       }
//     } catch (error) {
//       console.error(`Error fetching favorite ${activeTab}s:`, error);
//       setErrorMsg("Something went wrong while fetching data.");
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [currentPage, userId, activeTab]);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [currentPage, activeTab]);

//   const handleUnfavorite = async (favoriteId) => {
//     const formData = new FormData();
//     formData.append("favorite_id", favoriteId);

//     try {
//       const response = await axios.delete(
//         `${process.env.REACT_APP_API_URL}/cust_api/remove_from_favorite`,
//         { data: formData },
//       );

//       if (response.data.status === 1) {
//         fetchData();
//       } else {
//         console.error("Failed to remove:", response.data.message);
//       }
//     } catch (error) {
//       console.error("Error unfavoriting:", error);
//     }
//   };

//   const handleUnfavoriteProject = async (favoriteId) => {
//     const formData = new FormData();
//     formData.append("favorite_id", favoriteId);

//     try {
//       const response = await axios.delete(
//         `${process.env.REACT_APP_API_URL}/cust_api/remove_favorite_project`,
//         { data: formData },
//       );

//       if (response.data.status === 1) {
//         fetchData();
//       } else {
//         console.error("Failed to remove:", response.data.message);
//       }
//     } catch (error) {
//       console.error("Error unfavoriting:", error);
//     }
//   };

//   const openShareModal1 = (url, propertyId) => {
//     setCurrentShareUrl(url);
//     setActiveShareId(propertyId);
//     setIsShareModalOpen(true);
//   };

//   const handleCloseShareModal = () => {
//     setIsShareModalOpen(false);
//     setActiveShareId(null);
//   };

//   const formatPrice = (price) => {
//     if (!price) return "";

//     price = Number(price);

//     const formatNumber = (num) => {
//       return num.toFixed(2).replace(/\.?0+$/, "");
//     };

//     if (price >= 10000000) {
//       return `₹ ${formatNumber(price / 10000000)} Cr`;
//     } else if (price >= 100000) {
//       return `₹ ${formatNumber(price / 100000)} L`;
//     } else if (price >= 1000) {
//       return `₹ ${formatNumber(price / 1000)} K`;
//     } else {
//       return `₹ ${price}`;
//     }
//   };

//   const formatAverageProjectPrice = (price) => {
//     if (!price) return "";
//     if (typeof price === "string" && price.includes("-")) {
//       const parts = price.split("-").map((p) => p.trim());
//       return (
//         <>
//           {parts.map((p, idx) => (
//             <span key={idx} className="inline-flex items-center">
//               <FaRupeeSign className="inline-block mr-1" />
//               {formatPrice(p).replace("₹ ", "")}
//               {idx === 0 && " - "}
//             </span>
//           ))}
//         </>
//       );
//     }

//     return (
//       <span className="inline-flex items-center">
//         <FaRupeeSign className="inline-block mr-1" />
//         {formatPrice(price).replace("₹ ", "")}
//       </span>
//     );
//   };

//   return (
//     <div className="px-4 py-8 mx-auto max-w-7xl">
//       <h2 className="mb-6 text-3xl font-bold">My Favourites</h2>
//       {errorMsg && <p className="mb-4 text-red-500">{errorMsg}</p>}

//       {/* Tabs */}
//       <div className="flex gap-4 mb-6 border-b">
//         <button
//           className={`px-4 py-2 font-semibold border-b-2 ${activeTab === "property"
//             ? "border-rose-600 my-text"
//             : "border-transparent text-gray-500"
//             }`}
//           onClick={() => {
//             setActiveTab("property");
//             setCurrentPage(1);
//           }}
//         >
//           Favorite Property
//         </button>
//         <button
//           className={`px-4 py-2 font-semibold border-b-2 ${activeTab === "project"
//             ? "border-rose-600 my-text"
//             : "border-transparent text-gray-500"
//             }`}
//           onClick={() => {
//             setActiveTab("project");
//             setCurrentPage(1);
//           }}
//         >
//           Favorite Project
//         </button>
//       </div>

//       <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
//         {/* ==================== Property Cards — ORIGINAL DESIGN, UNCHANGED ==================== */}
//         {activeTab === "property" &&
//           (prop.length > 0 ? (
//             prop.map((property) => {
//               let distance = null;

//               if (userLocation && property.latitude && property.longitude) {
//                 distance = calculateDistance(
//                   userLocation.latitude,
//                   userLocation.longitude,
//                   parseFloat(property.latitude),
//                   parseFloat(property.longitude),
//                 ).toFixed(1);
//               }

//               return (
//                 <div
//                   key={property._id}
//                   className="shadow-md rounded-2xl overflow-hidden block no-underline hover:no-underline"
//                 >
//                   <div className="relative">
//                     <Link
//                       to={`/propertydetails/${property._id}`}
//                       className="block overflow-hidden no-underline bg-white border-2 rounded-lg hover:no-underline"
//                     >
//                       {1 + (property?.property_images?.length || 0) > 1 ? (
//                         <Slider
//                           dots
//                           infinite
//                           speed={500}
//                           slidesToShow={1}
//                           slidesToScroll={1}
//                           arrows
//                           autoplay
//                           autoplaySpeed={2000}
//                           beforeChange={(current, next) =>
//                             setActiveIndexes((prev) => ({
//                               ...prev,
//                               [property._id]: next,
//                             }))
//                           }
//                           initialSlide={activeIndexes[property._id] || 0}
//                           customPaging={(i) => {
//                             const activeSlide =
//                               activeIndexes[property._id] || 0;
//                             const totalImages =
//                               1 + (property?.property_images?.length || 0);
//                             const isActive = i === activeSlide % totalImages;
//                             return (
//                               <div
//                                 style={{
//                                   width: "10px",
//                                   height: "10px",
//                                   borderRadius: "50%",
//                                   background: isActive ? "#fff" : "#888",
//                                   margin: "0 5px",
//                                   cursor: "pointer",
//                                 }}
//                               />
//                             );
//                           }}
//                           appendDots={(dots) => {
//                             const totalImages =
//                               1 + (property?.property_images?.length || 0);
//                             const visibleDots = dots.slice(0, totalImages);
//                             return (
//                               <div
//                                 style={{
//                                   position: "absolute",
//                                   bottom: "10px",
//                                   left: "50%",
//                                   transform: "translateX(-50%)",
//                                   display: "flex",
//                                   justifyContent: "center",
//                                   width: "100%",
//                                 }}
//                               >
//                                 {visibleDots}
//                               </div>
//                             );
//                           }}
//                           className="rounded-t-2xl"
//                         >
//                           <div key={`cover-${property._id}`}>
//                             <img
//                               src={property.cover_image}
//                               alt="Cover"
//                               className="object-cover w-full h-48 rounded-t-2xl"
//                             />
//                           </div>

//                           {(property?.property_images || []).map((imgObj) => (
//                             <div key={imgObj._id}>
//                               <img
//                                 src={imgObj.image}
//                                 alt="Property"
//                                 className="object-cover w-full h-48 rounded-t-2xl"
//                               />
//                             </div>
//                           ))}
//                         </Slider>
//                       ) : (
//                         <div>
//                           <img
//                             src={property.cover_image}
//                             alt="Cover"
//                             className="object-cover w-full h-48 rounded-t-2xl"
//                           />
//                         </div>
//                       )}
//                     </Link>

//                     {/* Days badge */}
//                     <div className="absolute flex items-center space-x-2 top-2 left-2">
//                       <span className="px-2 py-1 text-xs text-white rounded-full bg-black/50">
//                         {property?.days_since_created ?? 0} days ago
//                       </span>
//                     </div>

//                     {/* Admin Approval Badge */}
//                     {property.admin_approval === "Approved" && (
//                       <div className="absolute top-2 left-2 z-20">
//                         <div className="flex items-center bg-[#8B1E3F] text-white rounded-sm shadow-md px-2 py-1">

//                           {/* Tick Icon */}
//                           <span className="text-white text-xs font-bold mr-2">
//                             ✓
//                           </span>

//                           {/* Verified Text */}
//                           <span className="text-[11px] font-semibold leading-none">
//                             Verified
//                           </span>

//                         </div>
//                       </div>
//                     )}
//                     {/* Virtual Tour + Heart */}
//                     <div className="absolute flex items-center space-x-2 top-2 right-2">
//                       {property.virtual_tour_availability === "Yes" && (
//                         <span className="flex items-center gap-1 px-2 py-1 text-xs font-normal text-white rounded-full bg-gray-800/60 backdrop-blur-sm">
//                           <PiCubeFocus className="text-sm text-white" />
//                           Virtual Tour
//                         </span>
//                       )}
//                       <button
//                         className="p-1.5 text-xs font-normal text-white bg-opacity-50 rounded-full bg-gray-800/60 backdrop-blur-sm"
//                         onClick={() => handleUnfavorite(property.favorite_id)}
//                       >
//                         <Heart
//                           size={20}
//                           stroke={property.is_favorite ? "none" : "white"}
//                           color={
//                             property.is_favorite
//                               ? "red"
//                               : "rgba(75, 85, 99, 0.4) "
//                           }
//                           fill={
//                             property.is_favorite
//                               ? "red"
//                               : "rgba(75, 85, 99, 0.4) "
//                           }
//                           strokeWidth={2}
//                         />
//                       </button>
//                     </div>

//                     {/* FOR BUY / FOR RENT tag */}
//                     <div className="absolute bottom-0 left-0">
//                       <span
//                         className={`text-white text-xs px-3 py-1 rounded-se-lg ${property.property_category_type === "Buy"
//                           ? "bg-[#8B1E3F]"
//                           : property.property_category_type === "Rent"
//                             ? "bg-[#8B1E3F]"
//                             : "bg-[#8B1E3F]"
//                           }`}
//                       >
//                         {property.property_category_type === "Buy"
//                           ? "FOR BUY"
//                           : property.property_category_type === "Rent"
//                             ? "FOR RENT"
//                             : "UNKNOWN"}
//                       </span>
//                     </div>

//                     {/* FEATURED tag */}
//                     {property.mark_as_featured === "Yes" && (
//                       <div className="absolute bottom-0 right-0">
//                         <span className="px-3 py-1 text-xs text-white bg-yellow-500 rounded-ss-lg">
//                           FEATURED
//                         </span>
//                       </div>
//                     )}
//                   </div>

//                   {/* Property Description */}
//                   <div className="p-4 bg-white">
//                     {/* Row 1: Name + Furnished Type */}
//                     <div className="flex items-start justify-between gap-3 mb-0">
//                       <h3 className="flex-1 m-0 text-base font-bold leading-6 truncate">
//                         {property.property_name}
//                       </h3>
//                       {property.furnished_type && (
//                         <span className="flex-shrink-0 m-0 text-xs font-medium leading-6 text-black sm:text-sm whitespace-nowrap">
//                           {property.furnished_type}
//                         </span>
//                       )}
//                     </div>

//                     {/* Row 2: Subtitle */}
//                     <p className="mt-0 mb-2 text-sm leading-5 text-gray-500 truncate">
//                       {property.bhk_type ? `${property.bhk_type} ` : ""}
//                       {property.property_type ||
//                         property.building_type ||
//                         "Property"}{" "}
//                       for Sale in{" "}
//                       {property.address_area ||
//                         property.address ||
//                         "No Address Provided"}
//                     </p>

//                     {/* Row 3: Price + Status */}
//                     <div className="flex items-center gap-3 mb-2">
//                       <span className="flex items-center text-xl font-bold text-black">
//                         <FaRupeeSign className="mr-1 text-base" />
//                         {property.property_category_type === "Rent"
//                           ? `${formatPrice(property.rent).replace("₹ ", "")}${property.rent_duration &&
//                             property.rent_duration !== "N/A"
//                             ? ` / ${property.rent_duration}`
//                             : ""
//                           }`
//                           : formatPrice(property.property_price).replace(
//                             "₹ ",
//                             "",
//                           )}
//                       </span>

//                       {(property.possession_status === "Ready To Move" ||
//                         property.construction_status === "Ready To Move") && (
//                           <div className="flex items-center gap-2 px-3 py-1 text-white border rounded-full bg-[#8B1E3F] border-[#8B1E3F]">
//                             <MdApartment className="text-base text-white" />
//                             <span className="text-xs font-semibold text-white whitespace-nowrap">
//                               Ready to Move
//                             </span>
//                           </div>
//                         )}
//                     </div>

//                     {/* Row 4: Features Grid */}
//                     <div className="grid grid-cols-3 py-3 border-t border-b border-gray-100">
//                       <div className="flex items-center gap-2 px-1 min-w-0">
//                         <Building2
//                           size={20}
//                           className="text-gray-700 flex-shrink-0"
//                         />
//                         <div className="flex flex-col min-w-0 leading-tight">
//                           <p className="m-0 text-sm font-semibold leading-4 truncate text-black">
//                             {property.bhk_type || "-"}
//                           </p>
//                           <p className="m-0 text-xs leading-4 text-gray-500">
//                             {property.building_type || "Apartment"}
//                           </p>
//                         </div>
//                       </div>

//                       <div className="flex items-center gap-2 px-1 border-l border-gray-200 min-w-0">
//                         <FaBath
//                           size={18}
//                           className="text-gray-700 flex-shrink-0"
//                         />
//                         <div className="flex flex-col min-w-0 leading-tight">
//                           <p className="m-0 text-sm font-semibold text-black truncate">
//                             {property.bathroom || 0} Baths
//                           </p>
//                           <p className="m-0 text-xs text-gray-500 truncate">
//                             Bathrooms
//                           </p>
//                         </div>
//                       </div>

//                       <div className="flex items-center gap-2 px-3 border-l border-gray-200 min-w-0">
//                         <RiRuler2Line className="text-[22px] text-gray-700 flex-shrink-0" />
//                         <div className="flex flex-col justify-center min-w-0">
//                           <p className="m-0 text-sm font-semibold leading-4 truncate text-black">
//                             {property.area} {property.area_in}
//                           </p>
//                           <p className="m-0 text-xs leading-4 text-gray-500 truncate">
//                             Built Up Area
//                           </p>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Row 5 : Posted By | Days | | Share */}
//                     <div className="flex items-center justify-between pt-1 pb-2 text-[13px] text-gray-600">
//                       {/* Left */}
//                       <div className="flex items-center flex-wrap min-w-0">
//                         {/* Posted By */}
//                         <div className="flex items-center">
//                           <AiOutlineClockCircle className="mr-1 text-[15px] text-gray-700" />
//                           <span className="truncate">
//                             Posted by {property.user_type || "Owner"}
//                           </span>
//                         </div>

//                         {/* Dot */}
//                         <span className="mx-2 text-gray-400">•</span>

//                         {/* Days */}
//                         <span className="whitespace-nowrap">
//                           {property.days_since_created
//                             ? `${property.days_since_created} days ago`
//                             : "Recently"}
//                         </span>

//                         {/* Distance */}
//                         {distance && (
//                           <>
//                             <span className="mx-2 text-gray-400">•</span>

//                             <div className="flex items-center whitespace-nowrap">
//                               <FaMapMarkerAlt className="mr-1 text-red-500" />
//                               {distance} km from you
//                             </div>
//                           </>
//                         )}
//                       </div>

//                       {/* Share */}
//                       <FontAwesomeIcon
//                         icon={faShareNodes}
//                         className="ml-2 text-[17px] text-gray-500 transition-colors cursor-pointer hover:text-blue-500"
//                         onClick={(e) => {
//                           e.preventDefault();
//                           e.stopPropagation();
//                           openShareModal1(property._id);
//                         }}
//                       />
//                     </div>

//                     {isShareModalOpen && activeShareId === property._id && (
//                       <div className="absolute right-0 z-50">
//                         <ShareModal
//                           currentShareUrl={currentShareUrl}
//                           closeShareModal={handleCloseShareModal}
//                           copyLink={() => {
//                             navigator.clipboard.writeText(currentShareUrl);
//                             alert("Link copied!");
//                           }}
//                         />
//                       </div>
//                     )}

//                     {/* Row 6: Owner + Contact Buttons */}
//                     <div className="flex items-center justify-between pt-2 gap-2">
//                       <div className="flex items-center min-w-0">
//                         <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 overflow-hidden rounded-full bg-blue-100">
//                           {property.property_owner_image ? (
//                             <img
//                               src={`${process.env.REACT_APP_API_URL}/media/${property.property_owner_image}`}
//                               alt="Owner"
//                               className="object-cover w-full h-full rounded-full"
//                             />
//                           ) : (
//                             <AiOutlineUser
//                               className="text-gray-600"
//                               size={20}
//                             />
//                           )}
//                         </div>
//                         <div className="flex flex-col ml-2 min-w-0">
//                           <span className="text-sm font-semibold truncate">
//                             {property.connect_to_name}
//                           </span>
//                           <span className="text-xs text-gray-500 truncate">
//                             {property.user_type}
//                           </span>
//                         </div>
//                       </div>

//                       <div className="flex items-center gap-2 flex-shrink-0">
//                         <div className="flex items-center justify-center px-4 h-9 text-sm font-semibold text-white bg-red-800 rounded-md cursor-pointer hover:bg-red-900 whitespace-nowrap">
//                           Contact
//                         </div>

//                         <a
//                           href={`https://wa.me/91${property.connect_to_no}?text=Hello, I am interested in your property`}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           onClick={(e) => e.stopPropagation()}
//                           className="flex items-center justify-center w-9 h-9 text-white bg-green-500 rounded-md hover:bg-green-600"
//                         >
//                           <FaWhatsapp />
//                         </a>

//                         <a
//                           href={`tel:${property.connect_to_no}`}
//                           onClick={(e) => e.stopPropagation()}
//                           className="flex items-center justify-center w-9 h-9 text-white bg-blue-500 rounded-md hover:bg-blue-600"
//                         >
//                           <FaPhone />
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <div className="text-center text-black col-span-full">
//               <p>No favorite properties available.</p>
//             </div>
//           ))}

//         {/* ==================== Project Cards — SPOTLIGHTS DESIGN APPLIED HERE ONLY ==================== */}
//         {activeTab === "project" &&
//           (projects.length > 0 ? (
//             projects.map((project) => {
//               let distance = null;

//               if (userLocation && project.latitude && project.longitude) {
//                 distance = calculateDistance(
//                   userLocation.latitude,
//                   userLocation.longitude,
//                   parseFloat(project.latitude),
//                   parseFloat(project.longitude),
//                 ).toFixed(1);
//               }

//               /* ----------------------------------------------------------------
//                  PRICE FIX: previously this only checked
//                  `project.average_project_price`, and passed it straight into
//                  Number(...) with no fallback — so if the favorites API used a
//                  different field name (starting_price / min_price / avg_price /
//                  price) or sent nothing at all, Number(undefined) -> NaN, which
//                  is falsy, so ConfigCarousel rendered the blank placeholder
//                  instead of a price. This now mirrors the same resolution
//                  chain used on Spotlights/ProjectBuilder, and only converts to
//                  Number when that produces a real value — otherwise it keeps
//                  the original (possibly string/range) value so
//                  formatAverageProjectPrice can still render it.
//                  ---------------------------------------------------------------- */
//               const propertyPrices = (project.project_properties || [])
//                 .map((p) => Number(p.price))
//                 .filter((p) => !isNaN(p) && p > 0);

//               const computedRangePrice =
//                 propertyPrices.length === 0
//                   ? null
//                   : propertyPrices.length === 1
//                     ? propertyPrices[0]
//                     : `${Math.min(...propertyPrices)} - ${Math.max(...propertyPrices)}`;

//               const resolvedProjectPrice =
//                 project.average_project_price ||
//                 project.starting_price ||
//                 project.min_price ||
//                 project.avg_price ||
//                 project.price ||
//                 computedRangePrice ||
//                 null;

//               // Built the same way Spotlights builds its `units` array: one
//               // card per project_properties entry (falls back to a parsed
//               // congfigurations string when no per-unit pricing exists).
//               const units =
//                 project.project_properties && project.project_properties.length > 0
//                   ? project.project_properties.map((u) => {
//                     const rawPrice =
//                       u.price ||
//                       u.property_price ||
//                       u.unit_price ||
//                       u.configuration_price ||
//                       u.amount ||
//                       resolvedProjectPrice;
//                     const numPrice = Number(rawPrice);
//                     return {
//                       type: u.bhk_type || u.project_type,
//                       price:
//                         !isNaN(numPrice) && numPrice > 0 ? numPrice : rawPrice,
//                     };
//                   })
//                   : project.congfigurations
//                     ? project.congfigurations.split(",").map((c) => ({
//                       type: c.trim().includes("BHK") ? c.trim() : `${c.trim()} BHK`,
//                       price: resolvedProjectPrice,
//                     }))
//                     : [];

//               const addressArea = project.address_area?.trim();
//               const cityName = project.city_name?.trim();
//               let locationText = "";
//               if (addressArea && cityName) {
//                 locationText = addressArea.toLowerCase().includes(cityName.toLowerCase())
//                   ? addressArea
//                   : `${addressArea}, ${cityName}`;
//               } else {
//                 locationText = addressArea || cityName || "";
//               }

//               const unitSummary =
//                 [...new Set(units.map((u) => u.type).filter(Boolean))].join(", ") ||
//                 project.project_type ||
//                 "Apartments";

//               const subtitle = locationText
//                 ? `${unitSummary} in ${locationText}`
//                 : unitSummary;

//               return (
//                 <div key={project._id} className="h-full">
//                   {/* ==================== CARD (Spotlights shell) ==================== */}
//                   <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_6px_24px_rgba(17,24,39,0.08)] hover:shadow-[0_18px_48px_rgba(17,24,39,0.16)] transition-all duration-300 flex flex-col h-full min-h-[440px] sm:min-h-[460px] lg:min-h-[480px] w-full">
//                     {/* ==================== IMAGE SECTION (fixed height) ==================== */}
//                     <div className="relative overflow-hidden flex-shrink-0 h-[150px] sm:h-[165px] lg:h-[180px]">
//                       <Link to={`/projectdetail/${project._id}`} className="block w-full h-full">
//                         <img
//                           src={project.cover_image}
//                           alt={project.project_name || ""}
//                           className="w-full h-full object-cover cursor-pointer group-hover:scale-105 transition-transform duration-500 ease-out"
//                         />
//                       </Link>

//                       {/* Top Left badge — always "New Booking", premium green-gradient pill */}
//                       <div className="absolute top-2 left-2 z-10 flex items-center gap-2">
//                         {/* New Booking */}
//                         <div className="bg-gradient-to-r from-[#8B1E3F] to-[#6D1732] text-white pl-2 pr-2.5 py-1 rounded-full flex items-center gap-1 text-[9px] font-semibold shadow-[0_2px_10px_rgba(139,30,63,0.4)]">
//                           <MdFiberNew size={11} />
//                           <span>New Booking</span>
//                         </div>

//                         {/* RERA */}
//                         <div className="bg-gradient-to-r from-[#8B1E3F] to-[#6D1732] text-white px-2.5 py-1 rounded-full flex items-center text-[9px] font-semibold shadow-[0_2px_10px_rgba(139,30,63,0.4)]">
//                           RERA
//                         </div>
//                       </div>
//                       {/* Wishlist Heart - Top Right */}
//                       <button
//                         className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 backdrop-blur flex items-center justify-center hover:scale-110 transition-transform duration-200 z-10"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleUnfavoriteProject(project.favorite_id);
//                         }}
//                       >
//                         <Heart
//                           size={13}
//                           stroke={project.is_favorite ? "none" : "white"}
//                           color={project.is_favorite ? "red" : "white"}
//                           fill={project.is_favorite ? "red" : "none"}
//                           strokeWidth={2}
//                         />
//                       </button>

//                     </div>

//                     {/* ==================== CARD BODY ==================== */}
//                     <div className="cursor-pointer flex flex-col flex-1 min-h-0">
//                       {/* Title + Subtitle */}
//                       <Link
//                         to={`/projectdetail/${project._id}`}
//                         className="px-3.5 pt-3 flex-shrink-0 no-underline hover:no-underline"
//                       >
//                         <h2 className="text-xl sm:text-[22px] lg:text-2xl leading-tight font-bold text-[#111827] line-clamp-2">
//                           {project.project_name || "No Project Name Available"}
//                         </h2>
//                         <p className="mt-1 text-gray-500 text-[11px] sm:text-xs lg:text-sm line-clamp-2">
//                           {subtitle}
//                         </p>
//                       </Link>

//                       {/* ==================== CONFIGURATION SECTION (identical to Spotlights) ==================== */}
//                       <div className="px-3.5 flex-shrink-0 h-[74px] flex items-center mt-2.5">
//                         <ConfigCarousel
//                           units={units}
//                           formatAverageProjectPrice={formatAverageProjectPrice}
//                         />
//                       </div>

//                       {/* Spacer pushes builder + buttons to the bottom of the card */}
//                       <div className="mt-auto flex-shrink-0">
//                         {/* ==================== BUILDER SECTION ==================== */}
//                         <div className="mx-3.5 pt-3.5 sm:pt-4 pb-3.5 sm:pb-4 border-t border-gray-100 flex items-center gap-3">
//                           <div className="w-7 h-7 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0 overflow-hidden self-center">
//                             {project.property_owner_image &&
//                               !project.property_owner_image.includes("default_profile") ? (
//                               <img
//                                 src={`${process.env.REACT_APP_API_URL}/media/${project.property_owner_image}`}
//                                 alt={project.connect_to_name || "Builder"}
//                                 className="object-cover w-full h-full"
//                               />
//                             ) : (
//                               <FaHardHat className="text-xs text-yellow-700" />
//                             )}
//                           </div>

//                           <div className="min-w-0 flex-1 flex items-center justify-between gap-2">
//                             <div className="min-w-0 flex flex-col justify-center">
//                               <p className="text-xs text-gray-500 leading-none mb-0">
//                                 Builder
//                               </p>
//                               <h3 className="text-base font-semibold leading-tight text-[#111827] mt-0.5 truncate">
//                                 {project.connect_to_name || "Builder"}
//                               </h3>
//                             </div>

//                             {distance && (
//                               <div className="flex items-center gap-1 flex-shrink-0">
//                                 <FaMapMarkerAlt className="text-red-600 flex-shrink-0" size={12} />
//                                 <span className="text-gray-500 text-sm whitespace-nowrap">
//                                   {distance} km from you
//                                 </span>
//                               </div>
//                             )}
//                           </div>
//                         </div>

//                         {/* Posted / Share row */}
//                         <div className="px-3.5 pb-2 flex items-center justify-between text-[11px] text-gray-500">
//                           <div className="flex items-center flex-wrap min-w-0">
//                             <AiOutlineClockCircle className="mr-1 text-[13px] text-gray-500" />
//                             <span className="whitespace-nowrap">
//                               {project.days_since_created
//                                 ? `${project.days_since_created} days ago`
//                                 : "Recently"}
//                             </span>
//                           </div>
//                           <FontAwesomeIcon
//                             icon={faShareNodes}
//                             className="text-[15px] text-gray-500 transition-colors cursor-pointer hover:text-[#A70D2A]"
//                             onClick={(e) => {
//                               e.preventDefault();
//                               e.stopPropagation();
//                               openShareModal1(
//                                 `${window.location.origin}/projectdetail/${project._id}`,
//                                 project._id,
//                               );
//                             }}
//                           />
//                         </div>

//                         {isShareModalOpen && activeShareId === project._id && (
//                           <div className="absolute right-0 z-50">
//                             <ShareModal
//                               currentShareUrl={currentShareUrl}
//                               closeShareModal={handleCloseShareModal}
//                               copyLink={() => {
//                                 navigator.clipboard.writeText(currentShareUrl);
//                                 alert("Link copied!");
//                               }}
//                             />
//                           </div>
//                         )}

//                         {/* ==================== BOTTOM BUTTONS — Brochure / View Details (matches Spotlights) ==================== */}
//                         <div className="grid grid-cols-2 gap-2 px-3.5 py-3">
//                           {project.brochure ? (
//                             <button
//                               className="border-2 border-[#A70D2A] text-[#A70D2A] rounded-lg h-9 text-[11px] sm:text-xs font-semibold flex justify-center items-center gap-1.5 hover:bg-[#A70D2A]/5 transition-colors duration-200"
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 window.open(project.brochure, "_blank", "noopener,noreferrer");
//                               }}
//                             >
//                               <FaDownload size={11} />
//                               Brochure
//                             </button>
//                           ) : (
//                             <button
//                               className="border-2 border-[#A70D2A] text-[#A70D2A] rounded-lg h-9 text-[11px] sm:text-xs font-semibold flex justify-center items-center gap-1.5 hover:bg-[#A70D2A]/5 transition-colors duration-200"
//                               onClick={(e) => {
//                                 e.stopPropagation();

//                                 if (project.brochure) {
//                                   window.open(project.brochure, "_blank", "noopener,noreferrer");
//                                 } else {
//                                   alert("Brochure not available");
//                                 }
//                               }}
//                             >
//                               <FaDownload size={11} />
//                               Download Brochure
//                             </button>
//                           )}

//                           <Link
//                             to={`/projectdetail/${project._id}`}
//                             className="bg-[#A70D2A] rounded-lg text-white text-[11px] sm:text-xs font-semibold flex justify-center items-center gap-1.5 h-9 hover:bg-[#8a0a22] hover:shadow-lg transition-all duration-200 no-underline hover:no-underline"
//                           >
//                             View Details
//                             <FaArrowRight size={11} />
//                           </Link>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <div className="text-center text-black col-span-full">
//               <p>No favorite projects available.</p>
//             </div>
//           ))}

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="xl:col-span-2 flex items-center justify-center mt-8 space-x-2">
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className="flex items-center justify-center w-10 h-10 text-gray-600 border border-gray-400 rounded-full disabled:opacity-50"
//             >
//               {"<"}
//             </button>
//             {Array.from({ length: totalPages }, (_, index) => (
//               <button
//                 key={index + 1}
//                 onClick={() => setCurrentPage(index + 1)}
//                 className={`w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-200 ${currentPage === index + 1
//                   ? "border-rose-600 my-text font-semibold"
//                   : "border-gray-400 text-gray-600"
//                   }`}
//               >
//                 {index + 1}
//               </button>
//             ))}
//             <button
//               onClick={() =>
//                 setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//               }
//               disabled={currentPage === totalPages}
//               className="flex items-center justify-center w-10 h-10 text-gray-600 border border-gray-400 rounded-full disabled:opacity-50"
//             >
//               {">"}
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyFavourite;



// ==================================================================================================================





import React, { useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { FaWhatsapp } from "react-icons/fa";
import {
  Heart,
  House,
  Buildings,
  MagnifyingGlass,
  X,
  ArrowsDownUp,
  CaretDown,
  SquaresFour,
  ListBullets,
  MapPin,
  Bathtub,
  Ruler,
  User,
  Phone,
  ShareNetwork,
  Clock,
  SealCheck,
  Cube,
  Armchair,
  Bed,
  HardHat,
  DownloadSimple,
  ArrowRight,
  CaretLeft,
  CaretRight,
  Sparkle,
} from "@phosphor-icons/react";
import ShareModal from "../containers/ShareModal";

// ==========================================================
// Helpers (outside the component so they never remount)
// ==========================================================

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
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// FIX: read the location when the page renders, not once when the file
// loads — otherwise a location saved after login was never picked up.
const readUserLocation = () => {
  try {
    return JSON.parse(sessionStorage.getItem("userLocation"));
  } catch {
    return null;
  }
};

const distanceTo = (loc, item) =>
  loc && item.latitude && item.longitude
    ? calculateDistance(
      loc.latitude,
      loc.longitude,
      parseFloat(item.latitude),
      parseFloat(item.longitude),
    ).toFixed(1)
    : null;

// 1500000 -> "₹ 15 L", 22000 -> "₹ 22 K"
const formatPrice = (price) => {
  if (!price) return "";
  const n = Number(price);
  if (Number.isNaN(n)) return "";
  const trim = (v) => v.toFixed(2).replace(/\.?0+$/, "");
  if (n >= 10000000) return `₹ ${trim(n / 10000000)} Cr`;
  if (n >= 100000) return `₹ ${trim(n / 100000)} L`;
  if (n >= 1000) return `₹ ${trim(n / 1000)} K`;
  return `₹ ${n}`;
};

// Single price or "min - max" range -> "₹ 45 L" / "₹ 45 L - ₹ 1.2 Cr"
const formatAverageProjectPrice = (price) => {
  if (!price) return "";
  if (typeof price === "string" && price.includes("-")) {
    return price
      .split("-")
      .map((p) => formatPrice(p.trim()))
      .filter(Boolean)
      .join(" - ");
  }
  return formatPrice(price);
};

const CATEGORY = {
  Buy: { badge: "For Buy", deal: "Sale" },
  Rent: { badge: "For Rent", deal: "Rent" },
  "Commercial Buy": { badge: "Commercial Buy", deal: "Sale" },
  "Commercial Lease": { badge: "Commercial Lease", deal: "Lease" },
  "PG/Co-living": { badge: "PG / Co-living", deal: "Rent" },
};

const isRentLike = (cat) => cat === "Rent" || cat === "PG/Co-living";

const propertyPriceText = (p) =>
  isRentLike(p.property_category_type)
    ? `${formatPrice(p.rent)}${p.rent_duration && p.rent_duration !== "N/A" ? ` / ${p.rent_duration}` : ""}`
    : formatPrice(p.property_price);

const propertyPriceValue = (p) =>
  Number(isRentLike(p.property_category_type) ? p.rent : p.property_price) || 0;

// Status pills shown next to the price
const propertyPills = (p) => {
  const pills = [];
  const status = (p.possession_status || p.construction_status || "").toLowerCase();
  if (status === "ready to move") pills.push({ icon: Buildings, label: "Ready to Move" });
  else if (status.includes("under construction")) pills.push({ icon: HardHat, label: "Under Construction" });
  if (p.furnished_type) pills.push({ icon: Armchair, label: p.furnished_type });
  return pills;
};

// Project price + unit list (same rules as before)
const projectPricing = (project) => {
  const propertyPrices = (project.project_properties || [])
    .map((p) => Number(p.price))
    .filter((p) => !isNaN(p) && p > 0);

  const computedRangePrice =
    propertyPrices.length === 0
      ? null
      : propertyPrices.length === 1
        ? propertyPrices[0]
        : `${Math.min(...propertyPrices)} - ${Math.max(...propertyPrices)}`;

  const resolvedProjectPrice =
    project.average_project_price ||
    project.starting_price ||
    project.min_price ||
    project.avg_price ||
    project.price ||
    computedRangePrice ||
    null;

  // FIX: also read the correctly spelled "configurations" field.
  const configString = project.congfigurations || project.configurations;

  const units =
    project.project_properties && project.project_properties.length > 0
      ? project.project_properties.map((u) => {
        const rawPrice =
          u.price ||
          u.property_price ||
          u.unit_price ||
          u.configuration_price ||
          u.amount ||
          resolvedProjectPrice;
        const numPrice = Number(rawPrice);
        return {
          type: u.bhk_type || u.project_type,
          price: !isNaN(numPrice) && numPrice > 0 ? numPrice : rawPrice,
        };
      })
      : configString
        ? configString.split(",").map((c) => ({
          type: c.trim().includes("BHK") ? c.trim() : `${c.trim()} BHK`,
          price: resolvedProjectPrice,
        }))
        : [];

  return {
    units,
    minPrice: propertyPrices.length ? Math.min(...propertyPrices) : Number(resolvedProjectPrice) || 0,
  };
};

const projectLocation = (project) => {
  const area = project.address_area?.trim();
  const city = project.city_name?.trim();
  if (area && city) return area.toLowerCase().includes(city.toLowerCase()) ? area : `${area}, ${city}`;
  return area || city || "";
};

// ==========================================================
// Configuration carousel (project cards)
// ==========================================================
const ConfigCarousel = ({ units }) => {
  const innerSliderRef = useRef(null);
  if (!units || units.length === 0) return null;

  const desktopVisible = Math.min(3, units.length);
  const tabletVisible = Math.min(2, units.length);
  const smallMobileVisible = Math.min(1, units.length);
  const showNavButtons = units.length > 1;

  // Only show arrows at widths where the configs don't all fit.
  const navVisibilityClass =
    units.length >= 4 ? "flex" : units.length === 3 ? "hidden max-[1024px]:flex" : "hidden max-[380px]:flex";

  const navButtonClass = `flex-shrink-0 w-7 h-7 rounded-full bg-white border border-[#FDE8EC] shadow-sm items-center justify-center text-[#D61F45] hover:bg-[#FDE8EC] transition-colors ${navVisibilityClass}`;

  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: units.length > smallMobileVisible,
    speed: 400,
    slidesToShow: desktopVisible,
    slidesToScroll: 1,
    swipe: true,
    swipeToSlide: true,
    touchThreshold: 8,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: tabletVisible } },
      { breakpoint: 640, settings: { slidesToShow: tabletVisible } },
      { breakpoint: 380, settings: { slidesToShow: smallMobileVisible } },
    ],
  };

  const nav = (dir) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (dir === "prev") innerSliderRef.current?.slickPrev();
    else innerSliderRef.current?.slickNext();
  };

  return (
    <div className="flex items-center w-full h-full gap-1.5">
      {showNavButtons && (
        <button type="button" aria-label="Previous configuration" onClick={nav("prev")} className={navButtonClass}>
          <CaretLeft size={12} weight="bold" />
        </button>
      )}

      <div className="flex-1 min-w-0 h-full flex items-center [&_.slick-list]:overflow-hidden [&_.slick-track]:flex [&_.slick-track]:items-stretch [&_.slick-slide]:h-auto [&_.slick-slide>div]:h-full">
        <Slider ref={innerSliderRef} {...sliderSettings} className="w-full">
          {units.map((unit, i) => (
            <div key={i} className="h-full px-1">
              <div className="flex flex-col items-center justify-center h-full px-2 py-2.5 text-center bg-[#FFF7F9] border border-[#FDE8EC] rounded-xl">
                <Bed size={16} weight="fill" className="mb-1 text-[#D61F45]" />
                <h3 className="m-0 font-semibold text-[11px] text-[#17253a] truncate leading-tight max-w-full">
                  {unit.type}
                </h3>
                <p className="m-0 mt-1 text-[15px] lg:text-[16px] font-bold text-[#D61F45] truncate leading-tight max-w-full">
                  {unit.price ? formatAverageProjectPrice(unit.price) : " "}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {showNavButtons && (
        <button type="button" aria-label="Next configuration" onClick={nav("next")} className={navButtonClass}>
          <CaretRight size={12} weight="bold" />
        </button>
      )}
    </div>
  );
};

// ==========================================================
// Property card
// ==========================================================
const PropertyCard = ({
  property,
  listView,
  distance,
  activeIndex,
  onSlideChange,
  onUnfavorite,
  onShare,
  shareOpen,
  shareUrl,
  onCloseShare,
}) => {
  const cat = CATEGORY[property.property_category_type];
  const images = [
    property.cover_image,
    ...(property.property_images || []).map((i) => i.image),
  ].filter(Boolean);
  const pills = propertyPills(property);
  const details = `/propertydetails/${property._id}`;
  const phone = property.connect_to_no;

  return (
    <div
      className={`relative flex overflow-hidden bg-white border border-[#FDE8EC] rounded-2xl shadow-[0_8px_24px_rgba(214,31,69,0.06)] transition-all duration-300 hover:border-[#FAD3DB] hover:shadow-[0_16px_40px_rgba(214,31,69,0.14)] ${listView ? "flex-col md:flex-row" : "flex-col"
        }`}
    >
      {/* ---------- Image ---------- */}
      <div className={`relative flex-shrink-0 ${listView ? "md:w-80" : ""}`}>
        <Link
          to={details}
          className={`block overflow-hidden no-underline bg-[#FFF1F4] hover:no-underline [&_.slick-slide_img]:block ${listView ? "h-52 md:h-full" : "h-52"
            }`}
        >
          {images.length > 1 ? (
            <Slider
              dots
              infinite
              speed={500}
              slidesToShow={1}
              slidesToScroll={1}
              arrows={false}
              autoplay
              autoplaySpeed={2500}
              beforeChange={(current, next) => onSlideChange(next)}
              initialSlide={activeIndex || 0}
              customPaging={(i) => (
                <span
                  className="block rounded-full"
                  style={{
                    width: i === (activeIndex || 0) % images.length ? 16 : 7,
                    height: 7,
                    background: i === (activeIndex || 0) % images.length ? "#D61F45" : "rgba(255,255,255,0.9)",
                    transition: "width .2s",
                  }}
                />
              )}
              appendDots={(dots) => (
                <div className="!absolute !bottom-2.5 left-0 right-0 flex justify-center">
                  <ul className="flex items-center gap-1 p-0 m-0 list-none [&_li]:m-0 [&_li]:w-auto [&_li]:h-auto">
                    {dots.slice(0, images.length)}
                  </ul>
                </div>
              )}
            >
              {images.map((src, i) => (
                <div key={i}>
                  <img
                    src={src}
                    alt={property.property_name || "Property"}
                    className={`object-cover w-full ${listView ? "h-52 md:h-[290px]" : "h-52"}`}
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <img
              src={images[0] || "https://via.placeholder.com/400x300?text=No+Image"}
              alt={property.property_name || "Property"}
              className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
            />
          )}
        </Link>

        {/* Top-left badges — FIX: these used to sit on top of each other */}
        <div className="absolute z-10 flex flex-wrap items-center gap-1.5 top-3 left-3 right-14">
          <span className="px-2.5 py-1 text-[12px] font-semibold text-white rounded-lg shadow bg-[#D61F45]">
            {cat?.badge || property.property_category_type || "Property"}
          </span>
          {property.admin_approval === "Approved" && (
            <span className="flex items-center gap-1 px-2 py-1 text-[11px] font-semibold text-[#17253a] bg-white rounded-lg shadow">
              <SealCheck size={13} weight="fill" className="text-green-600" />
              Verified
            </span>
          )}
          {property.virtual_tour_availability === "Yes" && (
            <span className="flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-white rounded-lg bg-black/55 backdrop-blur-sm">
              <Cube size={13} />
              Virtual Tour
            </span>
          )}
        </div>

        {/* Remove from favourites */}
        <button
          type="button"
          onClick={() => onUnfavorite(property.favorite_id)}
          title="Remove from favourites"
          aria-label="Remove from favourites"
          className="absolute z-10 flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md top-3 right-3 hover:scale-110 transition-transform"
        >
          <Heart size={22} weight="fill" className="text-[#D61F45]" />
        </button>

        {property.mark_as_featured === "Yes" && (
          <span className="absolute z-10 px-2.5 py-1 text-[11px] font-bold tracking-wide text-white rounded-md shadow bottom-3 right-3 bg-amber-500">
            FEATURED
          </span>
        )}
      </div>

      {/* ---------- Body ---------- */}
      <div className="flex flex-col flex-1 min-w-0 p-4">
        <Link
          to={details}
          className="block text-[17px] font-bold text-[#17253a] no-underline truncate hover:text-[#D61F45] hover:no-underline"
        >
          {property.property_name}
        </Link>
        <p className="flex items-center gap-1 m-0 mt-1 text-[13px] text-gray-500 min-w-0">
          <MapPin size={15} weight="fill" className="flex-shrink-0 text-[#D61F45]" />
          <span className="truncate">
            {property.bhk_type ? `${property.bhk_type} ` : ""}
            {property.property_type || property.building_type || "Property"} for {cat?.deal || "Sale"} in{" "}
            {property.address_area || property.address || "No Address Provided"}
          </span>
        </p>

        <div className="flex flex-wrap items-center justify-between gap-2 mt-2.5">
          <span className="text-[20px] font-extrabold text-[#D61F45]">
            {propertyPriceText(property) || "Price on request"}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {pills.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-1.5 px-3 py-1 text-[12px] font-semibold rounded-full bg-[#FDE8EC] text-[#D61F45]"
              >
                <Icon size={14} weight="fill" />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 py-3 mt-3 border-y border-[#FDE8EC]">
          {[
            { icon: Buildings, top: property.bhk_type || "-", sub: property.building_type || "Apartment" },
            { icon: Bathtub, top: `${property.bathroom || 0} Baths`, sub: "Bathrooms" },
            { icon: Ruler, top: `${property.area || "-"} ${property.area_in || ""}`, sub: "Built Up Area" },
          ].map(({ icon: Icon, top, sub }, i) => (
            <div
              key={sub}
              className={`flex items-center gap-2 min-w-0 ${i > 0 ? "pl-2 border-l border-[#FDE8EC]" : "pr-1"}`}
            >
              <Icon size={20} className="flex-shrink-0 text-gray-600" />
              <div className="min-w-0 leading-tight">
                <p className="m-0 text-[13px] font-bold text-[#17253a] truncate">{top}</p>
                <p className="m-0 text-[11px] text-gray-500 truncate">{sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Posted / distance / share */}
        <div className="relative flex items-center justify-between gap-2 pt-2.5 text-[12px] text-gray-500">
          <div className="flex flex-wrap items-center min-w-0 gap-x-2">
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {property.days_since_created ? `${property.days_since_created} days ago` : "Recently"}
            </span>
            {distance && (
              <span className="flex items-center gap-1 whitespace-nowrap">
                <MapPin size={13} weight="fill" className="text-[#D61F45]" />
                {distance} km from you
              </span>
            )}
          </div>
          <button
            type="button"
            title="Share"
            aria-label="Share property"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onShare(`${window.location.origin}${details}`, property._id);
            }}
            className="flex items-center justify-center flex-shrink-0 w-8 h-8 text-gray-500 rounded-full hover:bg-[#FDE8EC] hover:text-[#D61F45]"
          >
            <ShareNetwork size={17} />
          </button>

          {shareOpen && (
            <div className="absolute right-0 z-50 top-10">
              <ShareModal
                currentShareUrl={shareUrl}
                closeShareModal={onCloseShare}
                copyLink={() => {
                  navigator.clipboard.writeText(shareUrl);
                  alert("Link copied!");
                }}
              />
            </div>
          )}
        </div>

        {/* Owner + contact */}
        <div className="flex items-center justify-between gap-2 pt-3 mt-auto">
          <div className="flex items-center min-w-0 gap-2">
            <span className="flex items-center justify-center flex-shrink-0 overflow-hidden rounded-full w-9 h-9 bg-[#FDE8EC] text-[#D61F45]">
              {property.property_owner_image ? (
                <img
                  src={`${process.env.REACT_APP_API_URL}/media/${property.property_owner_image}`}
                  alt="Owner"
                  className="object-cover w-full h-full"
                />
              ) : (
                <User size={18} weight="fill" />
              )}
            </span>
            <div className="min-w-0 leading-tight">
              <p className="m-0 text-[13px] font-bold text-[#17253a] truncate">
                {property.connect_to_name || "Owner"}
              </p>
              <p className="m-0 text-[11px] text-gray-500 truncate">{property.user_type || "Owner"}</p>
            </div>
          </div>

          <div className="flex items-center flex-shrink-0 gap-1.5">
            {/* FIX: "Contact" was a plain div that did nothing — it now opens the listing */}
            <Link
              to={details}
              className="flex items-center justify-center px-4 h-9 text-[13px] font-semibold text-white no-underline rounded-lg bg-gradient-to-r from-[#D61F45] to-[#B91C3C] shadow-[0_4px_12px_rgba(214,31,69,0.3)] hover:no-underline hover:text-white whitespace-nowrap"
            >
              Contact
            </Link>
            {phone && (
              <>
                <a
                  href={`https://wa.me/91${phone}?text=Hello, I am interested in your property`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="WhatsApp"
                  aria-label="WhatsApp owner"
                  className="flex items-center justify-center text-white bg-green-500 rounded-lg w-9 h-9 hover:bg-green-600"
                >
                  <FaWhatsapp size={17} />
                </a>
                <a
                  href={`tel:${phone}`}
                  title="Call"
                  aria-label="Call owner"
                  className="flex items-center justify-center text-white bg-blue-500 rounded-lg w-9 h-9 hover:bg-blue-600"
                >
                  <Phone size={17} weight="fill" />
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================================
// Project card
// ==========================================================
const ProjectCard = ({ project, distance, onUnfavorite, onShare, shareOpen, shareUrl, onCloseShare }) => {
  const { units } = projectPricing(project);
  const locationText = projectLocation(project);
  const unitSummary =
    [...new Set(units.map((u) => u.type).filter(Boolean))].join(", ") || project.project_type || "Apartments";
  const details = `/projectdetail/${project._id}`;

  return (
    <div className="relative flex flex-col h-full overflow-hidden bg-white border border-[#FDE8EC] rounded-2xl shadow-[0_8px_24px_rgba(214,31,69,0.06)] transition-all duration-300 hover:border-[#FAD3DB] hover:shadow-[0_16px_40px_rgba(214,31,69,0.14)] group">
      <div className="relative flex-shrink-0 overflow-hidden h-48 bg-[#FFF1F4]">
        <Link to={details} className="block w-full h-full">
          <img
            src={project.cover_image || "https://via.placeholder.com/400x300?text=No+Image"}
            alt={project.project_name || "Project"}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        <div className="absolute z-10 flex items-center gap-1.5 top-3 left-3">
          <span className="flex items-center gap-1 px-2.5 py-1 text-[12px] font-semibold text-white rounded-lg shadow bg-[#D61F45]">
            <Sparkle size={13} weight="fill" />
            New Booking
          </span>
          <span className="px-2.5 py-1 text-[11px] font-bold text-[#17253a] bg-white rounded-lg shadow">RERA</span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onUnfavorite(project.favorite_id);
          }}
          title="Remove from favourites"
          aria-label="Remove from favourites"
          className="absolute z-10 flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md top-3 right-3 hover:scale-110 transition-transform"
        >
          <Heart size={22} weight="fill" className="text-[#D61F45]" />
        </button>
      </div>

      <div className="flex flex-col flex-1 min-h-0 p-4">
        <Link to={details} className="block no-underline hover:no-underline">
          <h3 className="m-0 text-[18px] font-bold leading-tight text-[#17253a] line-clamp-2 group-hover:text-[#D61F45]">
            {project.project_name || "No Project Name Available"}
          </h3>
          <p className="flex items-center gap-1 m-0 mt-1 text-[13px] text-gray-500 min-w-0">
            <MapPin size={15} weight="fill" className="flex-shrink-0 text-[#D61F45]" />
            <span className="truncate">{locationText ? `${unitSummary} in ${locationText}` : unitSummary}</span>
          </p>
        </Link>

        <div className="flex items-center flex-shrink-0 h-[80px] mt-3">
          <ConfigCarousel units={units} />
        </div>

        <div className="mt-auto">
          <div className="relative flex items-center gap-3 pt-3 mt-3 border-t border-[#FDE8EC]">
            <span className="flex items-center justify-center flex-shrink-0 overflow-hidden rounded-full w-9 h-9 bg-[#FDE8EC] text-[#D61F45]">
              {project.property_owner_image && !project.property_owner_image.includes("default_profile") ? (
                <img
                  src={`${process.env.REACT_APP_API_URL}/media/${project.property_owner_image}`}
                  alt={project.connect_to_name || "Builder"}
                  className="object-cover w-full h-full"
                />
              ) : (
                <HardHat size={18} weight="fill" />
              )}
            </span>
            <div className="flex-1 min-w-0 leading-tight">
              <p className="m-0 text-[11px] text-gray-500">Builder</p>
              <p className="m-0 text-[14px] font-bold text-[#17253a] truncate">{project.connect_to_name || "Builder"}</p>
            </div>
            <div className="flex flex-col items-end flex-shrink-0 text-[11px] text-gray-500 leading-tight">
              <span className="flex items-center gap-1">
                <Clock size={13} />
                {project.days_since_created ? `${project.days_since_created} days ago` : "Recently"}
              </span>
              {distance && (
                <span className="flex items-center gap-1 mt-0.5">
                  <MapPin size={12} weight="fill" className="text-[#D61F45]" />
                  {distance} km
                </span>
              )}
            </div>
            <button
              type="button"
              title="Share"
              aria-label="Share project"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onShare(`${window.location.origin}${details}`, project._id);
              }}
              className="flex items-center justify-center flex-shrink-0 w-8 h-8 text-gray-500 rounded-full hover:bg-[#FDE8EC] hover:text-[#D61F45]"
            >
              <ShareNetwork size={17} />
            </button>

            {shareOpen && (
              <div className="absolute right-0 z-50 top-12">
                <ShareModal
                  currentShareUrl={shareUrl}
                  closeShareModal={onCloseShare}
                  copyLink={() => {
                    navigator.clipboard.writeText(shareUrl);
                    alert("Link copied!");
                  }}
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (project.brochure) window.open(project.brochure, "_blank", "noopener,noreferrer");
                else alert("Brochure not available");
              }}
              className="flex items-center justify-center gap-1.5 h-10 text-[13px] font-semibold text-[#D61F45] bg-white border-[1.5px] border-[#D61F45] rounded-lg hover:bg-[#FDE8EC] transition-colors"
            >
              <DownloadSimple size={15} weight="bold" />
              {project.brochure ? "Brochure" : "Download Brochure"}
            </button>
            <Link
              to={details}
              className="flex items-center justify-center gap-1.5 h-10 text-[13px] font-semibold text-white no-underline rounded-lg bg-gradient-to-r from-[#D61F45] to-[#B91C3C] shadow-[0_4px_12px_rgba(214,31,69,0.3)] hover:no-underline hover:text-white"
            >
              View Details
              <ArrowRight size={15} weight="bold" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================================
// Page
// ==========================================================
const SORTS = [
  { key: "newest", label: "Newest First" },
  { key: "oldest", label: "Oldest First" },
  { key: "price_asc", label: "Price: Low to High" },
  { key: "price_desc", label: "Price: High to Low" },
];

const MyFavourite = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const propPerPage = 3;
  const [prop, setProp] = useState([]);
  const [projects, setProjects] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentShareUrl, setCurrentShareUrl] = useState("");
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [activeShareId, setActiveShareId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [activeTab, setActiveTab] = useState("property");
  const [activeIndexes, setActiveIndexes] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [view, setView] = useState("grid");
  const userId = sessionStorage.getItem("accessToken");
  const userLocation = useMemo(readUserLocation, []);

  const fetchData = async () => {
    if (!userId) {
      setErrorMsg("User not logged in. Please login to view your favorites.");
      if (activeTab === "property") setProp([]);
      else setProjects([]);
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("user_id", userId);
      formData.append("page", currentPage);
      formData.append("page_size", propPerPage);

      const endpoint =
        activeTab === "property"
          ? `${process.env.REACT_APP_API_URL}/cust_api/get_favorite_properties`
          : `${process.env.REACT_APP_API_URL}/cust_api/get_favorite_projects`;

      const response = await fetch(endpoint, { method: "POST", body: formData });
      const data = await response.json();

      if (data.status === 1 && Array.isArray(data.data)) {
        if (activeTab === "property") setProp(data.data);
        else setProjects(data.data);
        setTotalPages(Math.max(1, Math.ceil((data.total_count || 0) / propPerPage)));
        setErrorMsg("");
      } else {
        if (activeTab === "property") setProp([]);
        else setProjects([]);
        setTotalPages(1);
        setErrorMsg(""); // the empty state below explains it — no red error
      }
    } catch (error) {
      console.error(`Error fetching favorite ${activeTab}s:`, error);
      setErrorMsg("Something went wrong while fetching data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, userId, activeTab]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, activeTab]);

  // After removing the last card on a page, step back a page instead of
  // showing an empty page.
  const refreshAfterRemove = (listLength) => {
    if (listLength <= 1 && currentPage > 1) setCurrentPage((p) => p - 1);
    else fetchData();
  };

  const handleUnfavorite = async (favoriteId) => {
    const formData = new FormData();
    formData.append("favorite_id", favoriteId);
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/cust_api/remove_from_favorite`,
        { data: formData },
      );
      if (response.data.status === 1) refreshAfterRemove(prop.length);
      else console.error("Failed to remove:", response.data.message);
    } catch (error) {
      console.error("Error unfavoriting:", error);
    }
  };

  const handleUnfavoriteProject = async (favoriteId) => {
    const formData = new FormData();
    formData.append("favorite_id", favoriteId);
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/cust_api/remove_favorite_project`,
        { data: formData },
      );
      if (response.data.status === 1) refreshAfterRemove(projects.length);
      else console.error("Failed to remove:", response.data.message);
    } catch (error) {
      console.error("Error unfavoriting:", error);
    }
  };

  // FIX: property share passed only the id (as the URL) and no id to match,
  // so the share popup never opened on property cards.
  const openShareModal = (url, id) => {
    setCurrentShareUrl(url);
    setActiveShareId(id);
    setIsShareModalOpen(true);
  };

  const handleCloseShareModal = () => {
    setIsShareModalOpen(false);
    setActiveShareId(null);
  };

  const switchTab = (tab) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setCurrentPage(1);
    setSearch("");
    handleCloseShareModal();
  };

  // Search + sort the cards on this page
  const q = search.trim().toLowerCase();
  const visibleProperties = useMemo(() => {
    const list = prop.filter(
      (p) =>
        !q ||
        [p.property_name, p.address_area, p.address, p.bhk_type, p.connect_to_name]
          .filter(Boolean)
          .some((v) => v.toString().toLowerCase().includes(q)),
    );
    return [...list].sort((a, b) => {
      if (sortBy === "price_asc") return propertyPriceValue(a) - propertyPriceValue(b);
      if (sortBy === "price_desc") return propertyPriceValue(b) - propertyPriceValue(a);
      const d = (a.days_since_created ?? 0) - (b.days_since_created ?? 0);
      return sortBy === "oldest" ? -d : d;
    });
  }, [prop, q, sortBy]);

  const visibleProjects = useMemo(() => {
    const list = projects.filter(
      (p) =>
        !q ||
        [p.project_name, p.address_area, p.city_name, p.connect_to_name]
          .filter(Boolean)
          .some((v) => v.toString().toLowerCase().includes(q)),
    );
    return [...list].sort((a, b) => {
      if (sortBy === "price_asc") return projectPricing(a).minPrice - projectPricing(b).minPrice;
      if (sortBy === "price_desc") return projectPricing(b).minPrice - projectPricing(a).minPrice;
      const d = (a.days_since_created ?? 0) - (b.days_since_created ?? 0);
      return sortBy === "oldest" ? -d : d;
    });
  }, [projects, q, sortBy]);

  const isProperty = activeTab === "property";
  const rawCount = isProperty ? prop.length : projects.length;
  const visible = isProperty ? visibleProperties : visibleProjects;

  const tabClass = (tab) =>
    `flex items-center justify-center gap-2 px-5 py-2.5 text-[14px] font-semibold rounded-xl transition-all ${activeTab === tab
      ? "bg-gradient-to-r from-[#D61F45] to-[#B91C3C] text-white shadow-[0_6px_16px_rgba(214,31,69,0.3)]"
      : "text-gray-600 hover:text-[#D61F45] hover:bg-[#FFF1F4]"
    }`;

  const viewBtn = (v) =>
    `flex items-center justify-center flex-shrink-0 w-11 h-11 rounded-xl border transition-colors ${view === v
      ? "bg-[#D61F45] border-[#D61F45] text-white shadow-[0_6px_16px_rgba(214,31,69,0.3)]"
      : "bg-white border-[#FDE8EC] text-gray-600 hover:border-[#D61F45] hover:text-[#D61F45]"
    }`;

  const gridClass = isProperty
    ? view === "grid"
      ? "grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
      : "grid grid-cols-1 gap-5"
    : view === "grid"
      ? "grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
      : "grid grid-cols-1 gap-5 lg:grid-cols-2";

  return (
    <div className="w-full">
      {/* ==================================================
          Header banner — "My Favourites"
      ================================================== */}
      <div className="relative flex items-center gap-4 p-5 overflow-hidden border border-[#FDE8EC] rounded-2xl bg-gradient-to-r from-[#FFF1F4] via-[#FDE8EC] to-[#FAD3DB] md:px-6">
        <div aria-hidden="true" className="absolute bottom-0 items-end hidden gap-1 pointer-events-none right-6 md:flex text-[#D61F45] opacity-20">
          <House size={90} weight="fill" />
          <House size={130} weight="fill" />
          <Heart size={60} weight="fill" className="self-start mt-3" />
        </div>

        <span className="relative flex items-center justify-center flex-shrink-0 w-16 h-16 text-white rounded-full md:w-20 md:h-20 bg-gradient-to-br from-[#D61F45] to-[#B91C3C] shadow-[0_8px_20px_rgba(214,31,69,0.35)]">
          <Heart size={34} weight="fill" />
        </span>
        <div className="relative min-w-0">
          <h2 className="m-0 text-2xl font-bold text-[#17253a] md:text-[32px]">
            My <span className="text-[#D61F45]">Favourites</span>
          </h2>
          <p className="m-0 mt-0.5 text-[13px] md:text-[15px] text-gray-600">
            Your saved properties and projects, all in one place.
          </p>
        </div>
      </div>

      {errorMsg && (
        <p className="px-4 py-3 mt-4 text-[13px] font-medium text-[#D61F45] bg-[#FFF1F4] border border-[#FAD3DB] rounded-xl">
          {errorMsg}
        </p>
      )}

      {/* ==================================================
          Tabs + search / sort / view
      ================================================== */}
      <div className="flex flex-col gap-3 p-3 mt-4 bg-white border border-[#FDE8EC] rounded-2xl shadow-[0_8px_24px_rgba(214,31,69,0.06)]">
        <div className="flex gap-1 p-1 rounded-2xl bg-[#FFF7F9] sm:self-start">
          <button type="button" className={`${tabClass("property")} flex-1 sm:flex-none`} onClick={() => switchTab("property")}>
            <House size={18} weight="fill" />
            <span><span className="hidden sm:inline">Favourite </span>Properties</span>
          </button>
          <button type="button" className={`${tabClass("project")} flex-1 sm:flex-none`} onClick={() => switchTab("project")}>
            <Buildings size={18} weight="fill" />
            <span><span className="hidden sm:inline">Favourite </span>Projects</span>
          </button>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <MagnifyingGlass
              size={18}
              weight="bold"
              className="absolute text-gray-400 -translate-y-1/2 pointer-events-none left-3.5 top-1/2"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search your favourite ${isProperty ? "properties" : "projects"}...`}
              className="w-full h-11 pl-11 pr-9 text-[14px] text-[#17253a] bg-[#FFF7F9] border border-[#FDE8EC] rounded-xl outline-none placeholder:text-gray-400 transition-colors focus:bg-white focus:border-[#D61F45] focus:ring-2 focus:ring-[#FDE8EC]"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute flex items-center justify-center w-6 h-6 text-gray-500 -translate-y-1/2 rounded-full right-2 top-1/2 hover:bg-[#FDE8EC] hover:text-[#D61F45]"
                aria-label="Clear search"
              >
                <X size={14} weight="bold" />
              </button>
            )}
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1 sm:w-56 sm:flex-none">
              <ArrowsDownUp
                size={17}
                weight="bold"
                className="absolute -translate-y-1/2 pointer-events-none left-3 top-1/2 text-[#D61F45]"
              />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort by"
                className="w-full h-11 pl-9 pr-8 text-[14px] font-medium text-[#17253a] bg-white border border-[#FDE8EC] rounded-xl outline-none appearance-none cursor-pointer focus:border-[#D61F45] focus:ring-2 focus:ring-[#FDE8EC]"
              >
                {SORTS.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </select>
              <CaretDown
                size={14}
                weight="bold"
                className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2"
              />
            </div>
            <button type="button" className={viewBtn("grid")} onClick={() => setView("grid")} title="Grid view" aria-label="Grid view">
              <SquaresFour size={20} weight="fill" />
            </button>
            <button type="button" className={viewBtn("list")} onClick={() => setView("list")} title="List view" aria-label="List view">
              <ListBullets size={20} weight="bold" />
            </button>
          </div>
        </div>
      </div>

      {/* ==================================================
          Cards
      ================================================== */}
      <div className="mt-4">
        {isLoading && rawCount === 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="overflow-hidden bg-white border border-[#FDE8EC] rounded-2xl animate-pulse">
                <div className="h-48 bg-[#FDE8EC]" />
                <div className="p-4 space-y-3">
                  <div className="w-2/3 h-5 rounded bg-[#FDE8EC]" />
                  <div className="w-1/2 h-4 rounded bg-[#FFF1F4]" />
                  <div className="h-12 rounded-xl bg-[#FFF1F4]" />
                </div>
              </div>
            ))}
          </div>
        ) : visible.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-4 py-14 text-center bg-white border border-[#FDE8EC] rounded-3xl">
            <span className="relative flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-[#FDE8EC]">
              <Heart size={38} weight="fill" className="text-[#D61F45]" />
              <span className="absolute w-3 h-3 rounded-full -top-1 -right-1 bg-[#F4A7B6]" />
              <span className="absolute w-2 h-2 rounded-full bottom-1 -left-2 bg-[#D61F45]" />
            </span>
            <h3 className="m-0 text-xl font-bold text-[#17253a] md:text-2xl">
              {rawCount > 0 ? (
                <>No <span className="text-[#D61F45]">matches</span></>
              ) : (
                <>No favourite {isProperty ? "properties" : "projects"} <span className="text-[#D61F45]">yet</span></>
              )}
            </h3>
            <p className="max-w-md m-0 mt-2 text-[14px] text-gray-500">
              {rawCount > 0
                ? "Nothing on this page matches your search."
                : `Tap the heart on any ${isProperty ? "property" : "project"} to save it here.`}
            </p>
            {rawCount === 0 && (
              <Link
                to="/"
                className="flex items-center gap-2 px-6 py-2.5 mt-5 text-[14px] font-semibold text-white no-underline rounded-xl bg-gradient-to-r from-[#D61F45] to-[#B91C3C] shadow-[0_6px_18px_rgba(214,31,69,0.35)] hover:no-underline hover:text-white"
              >
                <MagnifyingGlass size={16} weight="bold" />
                Explore {isProperty ? "Properties" : "Projects"}
              </Link>
            )}
          </div>
        ) : (
          <div className={gridClass}>
            {isProperty
              ? visibleProperties.map((property) => (
                <PropertyCard
                  key={property._id}
                  property={property}
                  listView={view === "list"}
                  distance={distanceTo(userLocation, property)}
                  activeIndex={activeIndexes[property._id]}
                  onSlideChange={(next) =>
                    setActiveIndexes((prev) => ({ ...prev, [property._id]: next }))
                  }
                  onUnfavorite={handleUnfavorite}
                  onShare={openShareModal}
                  shareOpen={isShareModalOpen && activeShareId === property._id}
                  shareUrl={currentShareUrl}
                  onCloseShare={handleCloseShareModal}
                />
              ))
              : visibleProjects.map((project) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  distance={distanceTo(userLocation, project)}
                  onUnfavorite={handleUnfavoriteProject}
                  onShare={openShareModal}
                  shareOpen={isShareModalOpen && activeShareId === project._id}
                  shareUrl={currentShareUrl}
                  onCloseShare={handleCloseShareModal}
                />
              ))}
          </div>
        )}
      </div>

      {/* ==================================================
          Pagination
      ================================================== */}
      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
            className={`flex items-center justify-center w-10 h-10 rounded-full border transition-colors ${currentPage === 1
              ? "text-gray-300 border-gray-200 cursor-not-allowed"
              : "text-[#D61F45] border-[#FAD3DB] hover:bg-[#FDE8EC]"
              }`}
          >
            <CaretLeft size={16} weight="bold" />
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`w-10 h-10 flex items-center justify-center rounded-full text-[14px] font-semibold transition-colors ${currentPage === index + 1
                ? "text-white bg-gradient-to-br from-[#D61F45] to-[#B91C3C] shadow-[0_4px_12px_rgba(214,31,69,0.3)]"
                : "text-gray-600 hover:bg-[#FDE8EC] hover:text-[#D61F45]"
                }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            aria-label="Next page"
            className={`flex items-center justify-center w-10 h-10 rounded-full border transition-colors ${currentPage === totalPages
              ? "text-gray-300 border-gray-200 cursor-not-allowed"
              : "text-[#D61F45] border-[#FAD3DB] hover:bg-[#FDE8EC]"
              }`}
          >
            <CaretRight size={16} weight="bold" />
          </button>
        </div>
      )}
    </div>
  );
};

export default MyFavourite;