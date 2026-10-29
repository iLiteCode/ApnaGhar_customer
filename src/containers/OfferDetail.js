// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
// import { Heart } from "lucide-react";
// import {
//   FaBath,
//   FaWhatsapp,
//   FaPhone,
//   FaUser,
// } from "react-icons/fa";
// import { RiRuler2Line } from "react-icons/ri";
// import { MdApartment } from "react-icons/md";
// import { AiOutlineUser, AiOutlineClockCircle } from "react-icons/ai";
// import { FaMapMarkerAlt } from "react-icons/fa";
// import { PiShareNetworkLight, PiCubeFocus } from "react-icons/pi";
// import { Link, useLocation } from "react-router-dom";
// import { toast } from "react-toastify";
// import ShareModal from "./ShareModal";

// // Same distance helper used in AdvisorDashboard
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

// const userLocation = JSON.parse(sessionStorage.getItem("userLocation"));

// const OfferDetail = () => {
//   const location = useLocation();
//   const offer =
//     location.state?.offer ||
//     JSON.parse(localStorage.getItem("lastOffer") || "{}");

//   const accessToken = sessionStorage.getItem("accessToken");

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const OfferPropertyCard = () => {
//     const [showShareModal, setShowShareModal] = useState(false);
//     const [currentShareUrl, setCurrentShareUrl] = useState("");

//     const propertyData = offer.property_data || offer || {};

//     // local favorite state
//     const [isFavorite, setIsFavorite] = useState(
//       propertyData.is_favorite || false,
//     );

//     const BASE_URL = process.env.REACT_APP_API_URL;

//     const getValidImageUrl = (img) => {
//       if (typeof img !== "string" || !img.trim()) return null;
//       return img.startsWith("http") ? img : BASE_URL + img;
//     };

//     const coverImage =
//       getValidImageUrl(propertyData.cover_image) || "/image/property-search.jpg";

//     const phoneNumber =
//       propertyData.connect_to_no ||
//       propertyData.owner_mobile ||
//       propertyData.contact_number ||
//       propertyData.mobile_number ||
//       propertyData.property_owner_mobile;

//     // --- Add to favorites ---
//     const addToFavorites = async () => {
//       if (!accessToken) {
//         toast.error("Please login first");
//         return;
//       }
//       try {
//         await axios.post(
//           `${process.env.REACT_APP_API_URL}/cust_api/add_to_favorite`,
//           { user_id: accessToken, property_id: propertyData._id },
//         );
//         setIsFavorite(true);
//       } catch (error) {
//         console.error("Error adding property to favorites:", error);
//       }
//     };

//     // --- Remove from favorites ---
//     const removeFromFavorites = async () => {
//       const formData = new FormData();
//       formData.append("favorite_id", propertyData.favorite_id);

//       try {
//         const response = await axios.delete(
//           `${process.env.REACT_APP_API_URL}/cust_api/remove_from_favorite`,
//           { data: formData },
//         );

//         if (response.data.status === 1) {
//           setIsFavorite(false);
//         } else {
//           console.error("Failed to remove:", response.data.message);
//         }
//       } catch (error) {
//         console.error("Error unfavoriting:", error);
//       }
//     };

//     const handleFavoriteClick = (e) => {
//       e.preventDefault();
//       if (!accessToken) {
//         toast.error("Please login first");
//         return;
//       }
//       if (isFavorite) {
//         removeFromFavorites();
//       } else {
//         addToFavorites();
//       }
//     };

//     // --- Share ---
//     const openShareModal = () => {
//       setCurrentShareUrl(
//         `${window.location.origin}/propertydetails/${propertyData._id}`,
//       );
//       setShowShareModal(true);
//     };
//     const closeShareModal = () => setShowShareModal(false);
//     const copyLink = () => {
//       navigator.clipboard.writeText(currentShareUrl);
//     };

//     const formatPrice = (price) => {
//       if (!price) return "";

//       price = Number(price);

//       const formatNumber = (num) =>
//         num.toFixed(2).replace(/\.?0+$/, "");

//       if (price >= 10000000) return `₹ ${formatNumber(price / 10000000)} Cr`;
//       if (price >= 100000) return `₹ ${formatNumber(price / 100000)} L`;
//       if (price >= 1000) return `₹ ${formatNumber(price / 1000)} K`;

//       return `₹ ${price}`;
//     };

//     const handleCall = (e) => {
//       if (!phoneNumber) {
//         e.preventDefault();
//         toast.error("Contact number not available");
//       }
//     };

//     const handleWhatsApp = (e) => {
//       if (!phoneNumber) {
//         e.preventDefault();
//         toast.error("Contact number not available");
//       }
//     };

//     // Distance from user (same logic as AdvisorDashboard)
//     let distance = null;
//     if (
//       userLocation &&
//       propertyData.latitude &&
//       propertyData.longitude
//     ) {
//       distance = calculateDistance(
//         userLocation.latitude,
//         userLocation.longitude,
//         parseFloat(propertyData.latitude),
//         parseFloat(propertyData.longitude),
//       ).toFixed(1);
//     }

//     // Subtitle line (same logic as AdvisorDashboard)
//     const subtitle = (() => {
//       const area = propertyData.address_area || "";
//       const city = propertyData.city_name || "";

//       const loc = area.toLowerCase().includes(city.toLowerCase())
//         ? area
//         : `${area}${area && city ? ", " : ""}${city}`;

//       const type =
//         propertyData.property_type === "Office"
//           ? "Office Space"
//           : propertyData.property_type === "Retail"
//             ? "Retail Space"
//             : propertyData.property_type || "";

//       const category = propertyData.property_category_type || "";

//       if (category === "Commercial Buy" || category === "Commercial Lease") {
//         return `${type} for ${category === "Commercial Buy" ? "Sale" : "Lease"
//           } in ${loc}`;
//       }

//       if (
//         category.includes("PG") ||
//         category.includes("Co-Living") ||
//         category.includes("Coliving")
//       ) {
//         return `${type} for Rent in ${loc}`;
//       }

//       const action = category === "Buy" ? "Sale" : category;

//       return `${propertyData.bhk_type || ""} ${type} for ${action} in ${loc}`;
//     })();

//     // Bottom-left category badge (same logic as AdvisorDashboard)
//     const renderCategoryBadge = () => {
//       const rawCategory = propertyData.property_category_type || "";

//       const normalizedCategory = rawCategory
//         .replace(/\s+/g, " ")
//         .replace(/-/g, " ")
//         .replace(/\//g, " ")
//         .trim()
//         .toLowerCase();

//       let badgeText = "UNKNOWN";
//       let badgeColor = "bg-gray-500";

//       if (normalizedCategory === "buy") {
//         badgeText = "FOR BUY";
//         badgeColor = "bg-[#8B1E3F]";
//       } else if (normalizedCategory === "rent") {
//         badgeText = "FOR RENT";
//         badgeColor = "bg-[#8B1E3F]";
//       } else if (normalizedCategory.includes("commercial buy")) {
//         badgeText = "COMMERCIAL BUY";
//         badgeColor = "bg-[#8B1E3F]";
//       } else if (normalizedCategory.includes("commercial lease")) {
//         badgeText = "COMMERCIAL LEASE";
//         badgeColor = "bg-[#8B1E3F]";
//       } else if (
//         normalizedCategory.includes("pg") ||
//         normalizedCategory.includes("co living") ||
//         normalizedCategory.includes("coliving")
//       ) {
//         badgeText = "PG / CO-LIVING";
//         badgeColor = "bg-yellow-500";
//       } else if (normalizedCategory.includes("residential")) {
//         badgeText = "RESIDENTIAL";
//         badgeColor = "bg-pink-500";
//       }

//       return (
//         <span
//           className={`text-white text-xs px-3 py-1 rounded-se-lg ${badgeColor}`}
//         >
//           {badgeText}
//         </span>
//       );
//     };

//     return (
//       <div className="bg-white py-4 ml-10 mr-10 rounded-2xl">
//         <div className="flex items-center justify-between px-2 mb-4">
//           <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
//             Offer Property Details
//           </h2>
//         </div>

//         {/* Offer Details Banner - unchanged */}
//         {offer && (
//           <div className="mx-2 mb-6 overflow-hidden bg-white shadow-lg rounded-2xl">
//             <img
//               src={
//                 offer.property_data?.cover_image
//                   ? `${process.env.REACT_APP_API_URL}${offer.property_data.cover_image}`
//                   : "/image/property-search.jpg"
//               }
//               alt="Offer Property Cover"
//               className="object-cover w-full h-72"
//             />
//             <div className="p-4">
//               <h3 className="text-xl font-semibold text-gray-800">
//                 {offer.property_data?.property_name || "Property Name"}
//               </h3>
//               <p className="text-sm text-gray-600">
//                 {offer.property_data?.property_description ||
//                   "Property Description"}
//               </p>
//             </div>
//           </div>
//         )}

//         <div className="px-2">
//           <div
//             className={`w-full sm:w-[420px] shadow-md rounded-2xl overflow-hidden block no-underline hover:no-underline`}
//           >
//             {/* Image + overlays */}
//             <div className="relative">
//               <Link
//                 to={`/propertydetails/${propertyData._id}`}
//                 className="block overflow-hidden no-underline bg-white border-2 rounded-lg hover:no-underline"
//               >
//                 <img
//                   src={coverImage}
//                   alt="Property"
//                   className="object-cover w-full h-48 rounded-t-2xl"
//                 />
//               </Link>

//               {/* Virtual Tour & Favorite Button */}
//               <div className="absolute flex items-center space-x-2 top-2 right-2">
//                 {propertyData.virtual_tour_availability === "Yes" && (
//                   <span className="flex items-center gap-1 px-2 py-1 text-xs font-normal text-white rounded-full bg-gray-800/60 backdrop-blur-sm">
//                     <PiCubeFocus className="text-sm text-white" />
//                     Virtual Tour
//                   </span>
//                 )}
//                 <button
//                   className="bg-gray-800/60 backdrop-blur-sm p-1.5 rounded-full shadow"
//                   onClick={handleFavoriteClick}
//                 >
//                   <Heart
//                     size={20}
//                     stroke={isFavorite ? "none" : "white"}
//                     color={isFavorite ? "red" : "rgba(75, 85, 99, 0.4)"}
//                     fill={isFavorite ? "red" : "rgba(75, 85, 99, 0.4)"}
//                     strokeWidth={2}
//                   />
//                 </button>
//               </div>

//               {/* Category Tag (Bottom Left) */}
//               <div className="absolute bottom-0 left-0">
//                 {renderCategoryBadge()}
//               </div>

//               {/* FEATURED Tag (Bottom Right) */}
//               {propertyData.mark_as_featured === "Yes" && (
//                 <div className="absolute bottom-0 right-0">
//                   <span className="px-3 py-1 text-xs text-white bg-yellow-500 rounded-ss-lg">
//                     FEATURED
//                   </span>
//                 </div>
//               )}
//             </div>

//             {/* Property Details */}
//             <div className="flex flex-col flex-1 p-3 text-black bg-white">
//               <div className="flex items-start justify-between gap-3 mb-0">
//                 <h3
//                   className="flex-1 m-0 text-lg font-semibold leading-6 text-gray-900 truncate"
//                   title={propertyData.property_name}
//                 >
//                   {propertyData.property_name || "N/A"}
//                 </h3>
//                 <span
//                   className="flex-shrink-0 m-0 text-sm font-medium leading-6 text-black sm:text-base whitespace-nowrap"
//                   title={propertyData.furnished_type}
//                 >
//                   {propertyData.furnished_type || "Un-Furnished"}
//                 </span>
//               </div>

//               <p
//                 className="mt-0 mb-1 text-sm leading-5 text-gray-600 truncate"
//                 title={subtitle}
//               >
//                 {subtitle}
//               </p>

//               <div className="flex items-center justify-between mb-1">
//                 <div className="flex items-center">
//                   <span className="text-2xl font-bold">
//                     {propertyData.property_category_type === "Rent"
//                       ? formatPrice(propertyData.rent).replace("₹ ", "₹ ")
//                       : formatPrice(propertyData.property_price)}
//                   </span>
//                   {propertyData.property_category_type === "Rent" && (
//                     <span className="ml-1 text-sm text-gray-500">
//                       / {propertyData.rent_duration}
//                     </span>
//                   )}
//                   {propertyData.property_category_type?.includes("Buy") &&
//                     propertyData.possession_status === "Ready To Move" && (
//                       <div className="flex items-center gap-2 px-3 py-1 ml-6 text-white border rounded-full bg-[#8B1E3F] border-[#8B1E3F]">
//                         <MdApartment className="text-base text-white" />
//                         <span className="text-xs font-semibold text-white whitespace-nowrap">
//                           Ready to Move
//                         </span>
//                       </div>
//                     )}
//                 </div>
//                 <div className="text-sm font-medium whitespace-nowrap">
//                   {propertyData.property_category_type?.includes("Buy") &&
//                     propertyData.possession_status !== "Ready To Move" &&
//                     propertyData.possession_date && (
//                       <>
//                         <span className="text-gray-500">Possession:</span>
//                         <span className="ml-1 font-semibold">
//                           {new Date(
//                             propertyData.possession_date,
//                           ).toLocaleDateString("en-IN")}
//                         </span>
//                       </>
//                     )}
//                 </div>
//               </div>

//               {/* Features Grid */}
//               <div className="grid grid-cols-3 py-3 border-t border-b border-gray-100">
//                 <div className="flex items-center gap-2 px-3 min-w-0">
//                   <MdApartment className="text-[22px] text-gray-700 flex-shrink-0" />
//                   <div className="flex flex-col justify-center min-w-0">
//                     <p className="m-0 text-sm font-semibold leading-4 truncate">
//                       {propertyData.building_type === "Commercial"
//                         ? propertyData.property_type === "Office"
//                           ? "Office Space"
//                           : propertyData.property_type === "Retail"
//                             ? "Retail Space"
//                             : propertyData.property_type
//                         : propertyData.property_category_type?.includes("PG")
//                           ? `${propertyData.bathroom || 0} Bathrooms`
//                           : propertyData.bhk_type}
//                     </p>
//                     <p className="m-0 text-xs leading-4 text-gray-500 truncate">
//                       {propertyData.building_type === "Commercial"
//                         ? "Property Type"
//                         : propertyData.property_category_type?.includes("PG")
//                           ? "Bathrooms"
//                           : propertyData.property_type}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2 px-3 border-l border-gray-200 min-w-0">
//                   {propertyData.property_category_type?.includes("PG") ? (
//                     <FaUser className="text-[20px] text-gray-700 flex-shrink-0" />
//                   ) : (
//                     <FaBath className="text-[20px] text-gray-700 flex-shrink-0" />
//                   )}
//                   <div className="flex flex-col justify-center min-w-0">
//                     <p className="m-0 text-sm font-semibold leading-4 truncate">
//                       {propertyData.property_category_type?.includes("PG")
//                         ? propertyData.available_for
//                         : `${propertyData.bathroom || 0} Baths`}
//                     </p>
//                     <p className="m-0 text-xs leading-4 text-gray-500 truncate">
//                       {propertyData.property_category_type?.includes("PG")
//                         ? "Available For"
//                         : "Bathrooms"}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2 px-3 border-l border-gray-200 min-w-0">
//                   <RiRuler2Line className="text-[22px] text-gray-700 flex-shrink-0" />
//                   <div className="flex flex-col justify-center min-w-0">
//                     <p className="m-0 text-sm font-semibold leading-4 truncate">
//                       {propertyData.area
//                         ? `${propertyData.area} ${propertyData.area_in || ""}`
//                         : "N/A"}
//                     </p>
//                     <p className="m-0 text-xs leading-4 text-gray-500 truncate">
//                       Built Up Area
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <hr className="my-1 border-gray-100" />

//               {/* Posted By + Distance + Share (single line, no wrap) */}
//               <div className="flex items-center justify-between gap-2 pt-1 pb-2 text-[13px] text-gray-600">
//                 <div className="flex items-center flex-1 min-w-0 gap-1 overflow-hidden flex-nowrap">
//                   <AiOutlineClockCircle className="text-[15px] text-gray-700 flex-shrink-0" />
//                   <span className="truncate">
//                     {`Posted by ${propertyData.user_type ||
//                       propertyData.property_owner_type ||
//                       "Owner"
//                       }`}
//                   </span>
//                   {propertyData.days_since_created && (
//                     <span className="flex-shrink-0 whitespace-nowrap">
//                       &nbsp;• {propertyData.days_since_created} days ago
//                     </span>
//                   )}
//                   {distance && (
//                     <span className="flex items-center flex-shrink-0 whitespace-nowrap">
//                       &nbsp;•&nbsp;
//                       <FaMapMarkerAlt className="mr-1 text-red-500" />
//                       {distance} km from you
//                     </span>
//                   )}
//                 </div>
//                 <PiShareNetworkLight
//                   className="flex-shrink-0 ml-2 text-[20px] text-gray-500 cursor-pointer hover:text-blue-500"
//                   onClick={openShareModal}
//                 />
//               </div>

//               {/* Owner + Contact Buttons */}
//               <div className="flex items-center justify-between pt-3 gap-2">
//                 <div className="flex items-center min-w-0">
//                   <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 overflow-hidden rounded-full bg-blue-100">
//                     {propertyData.property_owner_image ? (
//                       <img
//                         src={`${BASE_URL}/media/${propertyData.property_owner_image}`}
//                         alt="Owner"
//                         className="object-cover w-full h-full rounded-full"
//                       />
//                     ) : (
//                       <AiOutlineUser className="text-blue-600" size={24} />
//                     )}
//                   </div>
//                   <div className="flex flex-col ml-3 min-w-0">
//                     <span
//                       className="text-sm font-semibold text-gray-900 truncate"
//                       title={propertyData.connect_to_name}
//                     >
//                       {propertyData.connect_to_name || "Owner"}
//                     </span>
//                     <span className="text-xs text-gray-500 truncate">
//                       {propertyData.user_type ||
//                         propertyData.property_owner_type ||
//                         "Owner"}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2 flex-shrink-0">
//                   <a
//                     href={phoneNumber ? `tel:${phoneNumber}` : "#"}
//                     onClick={handleCall}
//                     className="flex items-center justify-center px-4 h-9 text-sm font-semibold text-white bg-red-800 rounded-md hover:bg-red-900 whitespace-nowrap"
//                   >
//                     Contact
//                   </a>
//                   <a
//                     href={
//                       phoneNumber
//                         ? `https://wa.me/91${phoneNumber}?text=Hello, I am interested in your property`
//                         : "#"
//                     }
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     onClick={handleWhatsApp}
//                     className="flex items-center justify-center w-9 h-9 text-white bg-green-500 rounded-md hover:bg-green-600"
//                   >
//                     <FaWhatsapp />
//                   </a>
//                   <a
//                     href={phoneNumber ? `tel:${phoneNumber}` : "#"}
//                     onClick={handleCall}
//                     className="flex items-center justify-center w-9 h-9 text-white bg-blue-500 rounded-md hover:bg-blue-600"
//                   >
//                     <FaPhone />
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Share Modal */}
//         {showShareModal && (
//           <ShareModal
//             currentShareUrl={currentShareUrl}
//             closeShareModal={closeShareModal}
//             copyLink={copyLink}
//           />
//         )}
//       </div>
//     );
//   };

//   return (
//     <div>
//       <OfferPropertyCard />
//     </div>
//   );
// };

// export default OfferDetail;


// ===============================================================================



import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Heart, ChevronRight, ChevronLeft, X, Camera, Copy } from "lucide-react";
import { FaBath, FaWhatsapp, FaPhoneAlt, FaUser, FaHome } from "react-icons/fa";
import { RiRuler2Line, RiShareLine } from "react-icons/ri";
import { MdApartment } from "react-icons/md";
import { AiOutlineUser, AiOutlineClockCircle } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";
import { PiCubeFocus } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import ShareModal from "./ShareModal";

/* ------------------------------------------------------------------ */
/*  Brand tokens  (primary = #D61F45)                                  */
/* ------------------------------------------------------------------ */
// Tailwind needs literal class names, so the tokens are written inline:
//   primary        bg-[#D61F45] / text-[#D61F45] / border-[#D61F45]
//   primary hover  bg-[#B8183A]
//   primary soft   bg-[#FDECEF]

const BASE_URL = process.env.REACT_APP_API_URL;
const FALLBACK_IMAGE = "/image/property-search.jpg";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
    Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const safeParse = (value, fallback) => {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const toImageUrl = (img) => {
  if (!img) return null;
  const raw =
    typeof img === "string" ? img : img.image || img.url || img.path || "";
  if (typeof raw !== "string" || !raw.trim()) return null;
  return raw.startsWith("http") ? raw : `${BASE_URL}${raw}`;
};

const formatNumber = (num) => num.toFixed(2).replace(/\.?0+$/, "");

const formatPrice = (price) => {
  if (!price) return "";
  const p = Number(price);
  if (Number.isNaN(p)) return "";
  if (p >= 10000000) return `₹ ${formatNumber(p / 10000000)} Cr`;
  if (p >= 100000) return `₹ ${formatNumber(p / 100000)} L`;
  if (p >= 1000) return `₹ ${formatNumber(p / 1000)} K`;
  return `₹ ${p}`;
};

const buildSubtitle = (d) => {
  const area = d.address_area || "";
  const city = d.city_name || "";
  const loc = area.toLowerCase().includes(city.toLowerCase())
    ? area
    : `${area}${area && city ? ", " : ""}${city}`;

  const type =
    d.property_type === "Office"
      ? "Office Space"
      : d.property_type === "Retail"
        ? "Retail Space"
        : d.property_type || "";

  const category = d.property_category_type || "";

  if (category === "Commercial Buy" || category === "Commercial Lease") {
    return `${type} for ${category === "Commercial Buy" ? "Sale" : "Lease"} in ${loc}`;
  }
  if (
    category.includes("PG") ||
    category.includes("Co-Living") ||
    category.includes("Coliving")
  ) {
    return `${type} for Rent in ${loc}`;
  }
  const action = category === "Buy" ? "Sale" : category;
  return `${d.bhk_type || ""} ${type} for ${action} in ${loc}`.trim();
};

const getCategoryBadge = (rawCategory = "") => {
  const c = rawCategory
    .replace(/[\s\-/]+/g, " ")
    .trim()
    .toLowerCase();

  if (c === "buy") return { text: "FOR BUY", color: "bg-[#D61F45]" };
  if (c === "rent") return { text: "FOR RENT", color: "bg-[#D61F45]" };
  if (c.includes("commercial buy"))
    return { text: "COMMERCIAL BUY", color: "bg-[#D61F45]" };
  if (c.includes("commercial lease"))
    return { text: "COMMERCIAL LEASE", color: "bg-[#D61F45]" };
  if (c.includes("pg") || c.includes("co living") || c.includes("coliving"))
    return { text: "PG / CO-LIVING", color: "bg-amber-500" };
  if (c.includes("residential"))
    return { text: "RESIDENTIAL", color: "bg-pink-500" };
  return { text: "PROPERTY", color: "bg-gray-500" };
};

/* ------------------------------------------------------------------ */
/*  Page header                                                        */
/* ------------------------------------------------------------------ */
const PageHeader = () => (
  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#FDECEF] via-[#FFF5F7] to-[#FDECEF] px-5 py-6 sm:px-8">
    <div className="relative z-10 flex items-center gap-4">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#FDECEF] shadow-sm ring-1 ring-[#D61F45]/10 sm:h-16 sm:w-16">
        <FaHome className="text-2xl text-[#D61F45] sm:text-3xl" />
      </div>
      <div className="min-w-0">
        <h1 className="m-0 text-2xl font-extrabold text-gray-900 sm:text-4xl">
          Offer Property <span className="text-[#D61F45]">Details</span>
        </h1>
        <p className="m-0 mt-1 text-sm text-gray-600 sm:text-base">
          Explore detailed information about the selected property offer.
        </p>
      </div>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Hero banner slider                                                 */
/* ------------------------------------------------------------------ */
const BannerSlider = ({ images, title, description }) => {
  const [index, setIndex] = useState(0);
  const slides = images.slice(0, 5);

  useEffect(() => {
    if (slides.length < 2) return undefined;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      4000,
    );
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white p-1.5 shadow-lg ring-1 ring-black/5">
      <div className="relative h-56 overflow-hidden rounded-[20px] sm:h-72 lg:h-[340px]">
        {slides.map((src, i) => (
          <img
            key={src + i}
            src={src}
            alt={`${title} ${i + 1}`}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"
              }`}
          />
        ))}

        {/* Caption */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-white/80 px-5 py-3 backdrop-blur-md">
          <div className="min-w-0">
            <h3 className="m-0 truncate text-lg font-bold text-gray-900 sm:text-xl">
              {title}
            </h3>
            <p className="m-0 truncate text-sm text-gray-600">{description}</p>
          </div>

          {/* Indicators */}
          {slides.length > 1 && (
            <div className="flex shrink-0 items-center gap-2 pb-1">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 w-8 rounded-full transition-colors ${i === index ? "bg-[#D61F45]" : "bg-gray-300"
                    }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Lightbox                                                           */
/* ------------------------------------------------------------------ */
const Lightbox = ({ images, startIndex, onClose }) => {
  const [i, setI] = useState(startIndex);
  const prev = useCallback(
    () => setI((c) => (c - 1 + images.length) % images.length),
    [images.length],
  );
  const next = useCallback(
    () => setI((c) => (c + 1) % images.length),
    [images.length],
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full bg-white/20 p-2 text-white hover:bg-white/30"
      >
        <X size={22} />
      </button>
      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-4 rounded-full bg-white/20 p-2 text-white hover:bg-white/30"
          >
            <ChevronLeft size={26} />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-4 rounded-full bg-white/20 p-2 text-white hover:bg-white/30"
          >
            <ChevronRight size={26} />
          </button>
        </>
      )}
      <img
        src={images[i]}
        alt={`Property ${i + 1}`}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] max-w-full rounded-xl object-contain"
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Main page                                                          */
/* ------------------------------------------------------------------ */
const OfferDetail = () => {
  const location = useLocation();

  // Persist the offer so a refresh keeps working
  const offer = useMemo(() => {
    if (location.state?.offer) {
      try {
        localStorage.setItem("lastOffer", JSON.stringify(location.state.offer));
      } catch {
        /* storage full / blocked – ignore */
      }
      return location.state.offer;
    }
    return safeParse(localStorage.getItem("lastOffer"), {});
  }, [location.state]);

  const propertyData = offer.property_data || offer || {};
  const accessToken = sessionStorage.getItem("accessToken");
  const userLocation = safeParse(sessionStorage.getItem("userLocation"), null);

  const [isFavorite, setIsFavorite] = useState(!!propertyData.is_favorite);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [showNumber, setShowNumber] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* ----- images ----- */
  const gallery = useMemo(() => {
    const list = [
      propertyData.cover_image,
      ...(propertyData.images || []),
      ...(propertyData.property_images || []),
      ...(propertyData.gallery_images || []),
    ]
      .map(toImageUrl)
      .filter(Boolean);

    const unique = [...new Set(list)];
    return unique.length ? unique : [FALLBACK_IMAGE];
  }, [propertyData]);

  const THUMB_LIMIT = 4;
  const visibleThumbs = gallery.slice(0, THUMB_LIMIT);
  const extraPhotos = Math.max(gallery.length - THUMB_LIMIT, 0);

  /* ----- contact ----- */
  const phoneNumber = String(
    propertyData.connect_to_no ||
    propertyData.owner_mobile ||
    propertyData.contact_number ||
    propertyData.mobile_number ||
    propertyData.property_owner_mobile ||
    "",
  ).replace(/\D/g, "");

  const guardContact = (e) => {
    if (!phoneNumber) {
      e.preventDefault();
      toast.error("Contact number not available");
    }
  };

  const postedBy =
    propertyData.user_type || propertyData.property_owner_type || "Owner";

  // 9876543210 -> +91 98765 43210
  const displayNumber = (() => {
    const n = phoneNumber.length === 12 && phoneNumber.startsWith("91")
      ? phoneNumber.slice(2)
      : phoneNumber;
    return n.length === 10 ? `+91 ${n.slice(0, 5)} ${n.slice(5)}` : n;
  })();

  const handleShowNumber = () => {
    if (!phoneNumber) {
      toast.error("Contact number not available");
      return;
    }
    setShowNumber(true);
  };

  const copyNumber = () => {
    navigator.clipboard
      .writeText(displayNumber)
      .then(() => toast.success("Number copied"))
      .catch(() => toast.error("Could not copy number"));
  };

  /* ----- favorites ----- */
  const addToFavorites = async () => {
    try {
      await axios.post(`${BASE_URL}/cust_api/add_to_favorite`, {
        user_id: accessToken,
        property_id: propertyData._id,
      });
      setIsFavorite(true);
    } catch (error) {
      console.error("Error adding property to favorites:", error);
      toast.error("Could not add to favorites");
    }
  };

  const removeFromFavorites = async () => {
    const formData = new FormData();
    formData.append("favorite_id", propertyData.favorite_id);
    try {
      const response = await axios.delete(
        `${BASE_URL}/cust_api/remove_from_favorite`,
        { data: formData },
      );
      if (response.data.status === 1) setIsFavorite(false);
      else console.error("Failed to remove:", response.data.message);
    } catch (error) {
      console.error("Error unfavoriting:", error);
      toast.error("Could not remove from favorites");
    }
  };

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    if (!accessToken) {
      toast.error("Please login first");
      return;
    }
    if (isFavorite) removeFromFavorites();
    else addToFavorites();
  };

  /* ----- share ----- */
  const openShareModal = () => {
    setShareUrl(`${window.location.origin}/propertydetails/${propertyData._id}`);
    setShowShareModal(true);
  };
  const copyLink = () => {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => toast.success("Link copied"))
      .catch(() => toast.error("Could not copy link"));
  };

  /* ----- derived ----- */
  const distance =
    userLocation && propertyData.latitude && propertyData.longitude
      ? calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        parseFloat(propertyData.latitude),
        parseFloat(propertyData.longitude),
      ).toFixed(1)
      : null;

  const subtitle = buildSubtitle(propertyData);
  const badge = getCategoryBadge(propertyData.property_category_type);
  const isRent = propertyData.property_category_type === "Rent";
  const isBuy = propertyData.property_category_type?.includes("Buy");
  const isPG = propertyData.property_category_type?.includes("PG");
  const isCommercial = propertyData.building_type === "Commercial";

  const typeLabel = isCommercial
    ? propertyData.property_type === "Office"
      ? "Office Space"
      : propertyData.property_type === "Retail"
        ? "Retail Space"
        : propertyData.property_type
    : isPG
      ? `${propertyData.bathroom || 0} Bathrooms`
      : propertyData.bhk_type;

  const typeSubLabel = isCommercial
    ? "Property Type"
    : isPG
      ? "Bathrooms"
      : propertyData.property_type;

  const features = [
    {
      icon: <MdApartment className="text-2xl text-[#D61F45]" />,
      value: typeLabel || "N/A",
      label: typeSubLabel || "Property Type",
    },
    {
      icon: isPG ? (
        <FaUser className="text-xl text-[#D61F45]" />
      ) : (
        <FaBath className="text-xl text-[#D61F45]" />
      ),
      value: isPG
        ? propertyData.available_for || "N/A"
        : `${propertyData.bathroom || 0} Baths`,
      label: isPG ? "Available For" : "Bathrooms",
    },
    {
      icon: <RiRuler2Line className="text-2xl text-[#D61F45]" />,
      value: propertyData.area
        ? `${propertyData.area} ${propertyData.area_in || ""}`
        : "N/A",
      label: "Built Up Area",
    },
  ];

  /* ---------------------------------------------------------------- */
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF1F4] via-[#FFF8F9] to-white">
      <div className="mx-auto max-w-[1400px] space-y-5 px-4 py-6 sm:px-6 lg:px-10">
        <PageHeader />

        <BannerSlider
          images={gallery}
          title={propertyData.property_name || "Property Name"}
          description={
            propertyData.property_description || "Property Description"
          }
        />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_340px]">
          {/* ===================== MAIN PROPERTY CARD ===================== */}
          <section className="rounded-3xl bg-white p-4 shadow-md ring-1 ring-black/5 sm:p-5">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
              {/* ---------- Gallery ---------- */}
              <div>
                <div className="relative overflow-hidden rounded-2xl">
                  <Link to={`/propertydetails/${propertyData._id}`}>
                    <img
                      src={gallery[activeIndex]}
                      alt="Property"
                      className="h-60 w-full object-cover sm:h-72"
                    />
                  </Link>

                  {/* Category badge */}
                  <span
                    className={`absolute left-3 top-3 rounded-lg px-3 py-1.5 text-xs font-bold tracking-wide text-white ${badge.color}`}
                  >
                    {badge.text}
                  </span>

                  {/* Virtual tour + favourite */}
                  <div className="absolute right-3 top-3 flex items-center gap-2">
                    {propertyData.virtual_tour_availability === "Yes" && (
                      <span className="flex items-center gap-1 rounded-full bg-gray-900/60 px-2.5 py-1 text-xs text-white backdrop-blur-sm">
                        <PiCubeFocus className="text-sm" />
                        Virtual Tour
                      </span>
                    )}
                    <button
                      type="button"
                      aria-label={
                        isFavorite ? "Remove from favorites" : "Add to favorites"
                      }
                      onClick={handleFavoriteClick}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow"
                    >
                      <Heart
                        size={18}
                        stroke="#D61F45"
                        fill={isFavorite ? "#D61F45" : "none"}
                        strokeWidth={2}
                      />
                    </button>
                  </div>

                  {/* Featured */}
                  {propertyData.mark_as_featured === "Yes" && (
                    <span className="absolute bottom-3 right-3 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-bold text-white">
                      FEATURED
                    </span>
                  )}
                </div>

                {/* Thumbnails */}
                <div className="mt-3 grid grid-cols-5 gap-2">
                  {visibleThumbs.map((src, i) => (
                    <button
                      key={src + i}
                      type="button"
                      aria-label={`Show photo ${i + 1}`}
                      onClick={() => setActiveIndex(i)}
                      className={`overflow-hidden rounded-xl border-2 transition ${i === activeIndex
                          ? "border-[#D61F45]"
                          : "border-transparent hover:border-[#D61F45]/40"
                        }`}
                    >
                      <img
                        src={src}
                        alt=""
                        className="h-14 w-full object-cover sm:h-16"
                      />
                    </button>
                  ))}

                  {gallery.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(0)}
                      className="flex h-14 flex-col items-center justify-center rounded-xl bg-[#FDECEF] text-[#D61F45] transition hover:bg-[#FBD5DC] sm:h-16"
                    >
                      <Camera size={18} />
                      <span className="text-[11px] font-semibold leading-tight">
                        {extraPhotos > 0 ? `+${extraPhotos} Photos` : "View all"}
                      </span>
                    </button>
                  )}
                </div>
              </div>

              {/* ---------- Details ---------- */}
              <div className="flex min-w-0 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <h2
                    className="m-0 min-w-0 flex-1 truncate text-2xl font-bold text-gray-900"
                    title={propertyData.property_name}
                  >
                    {propertyData.property_name || "N/A"}
                  </h2>
                  <span className="shrink-0 whitespace-nowrap rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-700">
                    {propertyData.furnished_type || "Un-Furnished"}
                  </span>
                </div>

                <p
                  className="m-0 mt-1 truncate text-base text-gray-500"
                  title={subtitle}
                >
                  {subtitle}
                </p>

                {/* Price row */}
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-extrabold text-[#D61F45]">
                      {isRent
                        ? formatPrice(propertyData.rent)
                        : formatPrice(propertyData.property_price)}
                    </span>
                    {isRent && propertyData.rent_duration && (
                      <span className="ml-1 text-sm text-gray-500">
                        / {propertyData.rent_duration}
                      </span>
                    )}
                  </div>

                  {isBuy && propertyData.possession_status === "Ready To Move" && (
                    <span className="flex items-center gap-2 whitespace-nowrap rounded-full bg-[#D61F45] px-4 py-2 text-xs font-semibold text-white">
                      <MdApartment className="text-base" />
                      Ready to Move
                    </span>
                  )}

                  {isBuy &&
                    propertyData.possession_status !== "Ready To Move" &&
                    propertyData.possession_date && (
                      <span className="whitespace-nowrap text-sm font-medium">
                        <span className="text-gray-500">Possession:</span>
                        <span className="ml-1 font-semibold">
                          {new Date(
                            propertyData.possession_date,
                          ).toLocaleDateString("en-IN")}
                        </span>
                      </span>
                    )}
                </div>

                {/* Feature tiles */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {features.map((f) => (
                    <div
                      key={f.label}
                      className="flex min-w-0 items-center gap-2 rounded-xl border border-gray-100 bg-white px-3 py-3 shadow-sm"
                    >
                      <span className="shrink-0">{f.icon}</span>
                      <div className="min-w-0">
                        <p className="m-0 truncate text-sm font-bold leading-4 text-gray-900">
                          {f.value}
                        </p>
                        <p className="m-0 mt-0.5 truncate text-xs leading-4 text-gray-500">
                          {f.label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Meta row */}
                <div className="mt-4 flex items-center justify-between gap-2 border-t border-gray-100 pt-3 text-[13px] text-gray-600">
                  <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="flex items-center gap-1">
                      <AiOutlineClockCircle className="text-base text-gray-700" />
                      Posted by {postedBy}
                    </span>
                    {propertyData.days_since_created && (
                      <span>• {propertyData.days_since_created} days ago</span>
                    )}
                    {distance && (
                      <span className="flex items-center">
                        •
                        <FaMapMarkerAlt className="mx-1 text-[#D61F45]" />
                        {distance} km from you
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    aria-label="Share property"
                    onClick={openShareModal}
                    className="shrink-0 rounded-full p-2 text-gray-500 transition hover:bg-[#FDECEF] hover:text-[#D61F45]"
                  >
                    <RiShareLine className="text-xl" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ===================== POSTED BY CARD ===================== */}
          <aside className="h-fit overflow-hidden rounded-3xl bg-white shadow-md ring-1 ring-black/5">
            <div className="bg-gradient-to-r from-[#FDECEF] to-[#FFF5F7] px-5 py-4">
              <h3 className="m-0 text-lg font-bold text-gray-900">
                Posted by {postedBy}
              </h3>
            </div>

            <div className="p-5">
              <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#FDECEF]">
                    {propertyData.property_owner_image ? (
                      <img
                        src={`${BASE_URL}/media/${propertyData.property_owner_image}`}
                        alt="Owner"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <AiOutlineUser className="text-[#D61F45]" size={28} />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p
                      className="m-0 truncate text-base font-bold text-gray-900"
                      title={propertyData.connect_to_name}
                    >
                      {propertyData.connect_to_name || "Owner"}
                    </p>
                    <p className="m-0 truncate text-sm text-gray-500">
                      {postedBy}
                    </p>
                  </div>
                </div>
                <ChevronRight className="shrink-0 text-gray-400" size={20} />
              </div>

              {showNumber && phoneNumber ? (
                <div className="mt-4 flex gap-2">
                  <a
                    href={`tel:+91${phoneNumber.slice(-10)}`}
                    className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#D61F45] text-base font-semibold text-white no-underline transition hover:bg-[#B8183A] hover:text-white"
                  >
                    <FaPhoneAlt className="text-sm" />
                    {displayNumber}
                  </a>
                  <button
                    type="button"
                    aria-label="Copy number"
                    onClick={copyNumber}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FDECEF] text-[#D61F45] transition hover:bg-[#FBD5DC]"
                  >
                    <Copy size={18} />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleShowNumber}
                  className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#D61F45] text-base font-semibold text-white transition hover:bg-[#B8183A]"
                >
                  <FaPhoneAlt className="text-sm" />
                  Contact
                </button>
              )}

              <div className="mt-3 grid grid-cols-2 gap-3">
                <a
                  href={
                    phoneNumber
                      ? `https://wa.me/91${phoneNumber}?text=${encodeURIComponent(
                        "Hello, I am interested in your property",
                      )}`
                      : "#"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={guardContact}
                  aria-label="Chat on WhatsApp"
                  className="flex h-12 items-center justify-center rounded-xl bg-green-500 text-2xl text-white transition hover:bg-green-600 hover:text-white"
                >
                  <FaWhatsapp />
                </a>
                <a
                  href={phoneNumber ? `tel:${phoneNumber}` : "#"}
                  onClick={guardContact}
                  aria-label="Call"
                  className="flex h-12 items-center justify-center rounded-xl bg-blue-500 text-xl text-white transition hover:bg-blue-600 hover:text-white"
                >
                  <FaPhoneAlt />
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {showShareModal && (
        <ShareModal
          currentShareUrl={shareUrl}
          closeShareModal={() => setShowShareModal(false)}
          copyLink={copyLink}
        />
      )}

      {lightboxIndex !== null && (
        <Lightbox
          images={gallery}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
};

export default OfferDetail;