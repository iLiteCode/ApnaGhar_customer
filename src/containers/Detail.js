// // import { React, useState, useRef, useEffect } from "react";
// // import { FaBed, FaBath, FaRupeeSign } from "react-icons/fa";
// // import { ToWords } from "to-words";
// // import { MdLocationOn } from "react-icons/md";
// // import { FiShare2, FiHeart } from "react-icons/fi";
// // import { FaHome } from "react-icons/fa";
// // import { IoMdBed } from "react-icons/io";
// // import { BiArea } from "react-icons/bi";
// // import { MdOutlineLocationOn } from "react-icons/md";
// // import { GoArrowLeft, GoArrowRight } from "react-icons/go";
// // import { FaHeart } from "react-icons/fa";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import { FaUser } from "react-icons/fa";
// // import { faVideo } from "@fortawesome/free-solid-svg-icons";
// // import { AiOutlineGlobal } from "react-icons/ai";
// // import { FaRulerCombined } from "react-icons/fa";
// // import { faChair } from "@fortawesome/free-solid-svg-icons";
// // import { MdOutlineBedroomParent } from "react-icons/md";
// // import { AiOutlineUser, AiOutlineClockCircle } from "react-icons/ai";
// // import { BiShapeSquare } from "react-icons/bi";
// // import { PiShareNetworkLight } from "react-icons/pi";
// // import { FaPhoneAlt } from "react-icons/fa";
// // import axios from "axios";
// // import {
// //   HiOutlineBadgeCheck,
// //   HiOutlineCalendar,
// //   HiOutlineHome,
// //   HiOutlineClock,
// // } from "react-icons/hi";
// // import { FaMoneyBillWave } from "react-icons/fa";
// // import { Link } from "react-router-dom";
// // import Slider from "react-slick";
// // import "slick-carousel/slick/slick.css";
// // import "slick-carousel/slick/slick-theme.css";
// // import "../styles/RecommendedProperties.css";
// // import "../styles/DetailResponsive.css";
// // import { BsHouseDoorFill, BsArrowsFullscreen } from "react-icons/bs";
// // import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
// // import { useHistory } from "react-router-dom"; // import for routing
// // import { PiCubeFocus, PiCricketThin } from "react-icons/pi";
// // import { useParams, useLocation } from "react-router-dom";
// // import { useCity } from "./SearchContext";
// // import { toast } from "react-toastify";
// // import { FiUser } from "react-icons/fi";
// // import Login1 from "../auth/Login1";
// // import SignUp1 from "../auth/SignUp1";
// // import GetScheduleVTourproperty from "../containers/GetScheduleVTourproperty";
// // import { HiOutlineArrowRight } from "react-icons/hi"; // thinner arrow
// // import ShareModal from "../containers/ShareModal";
// // import ContactDetails from "../containers/ContactDetails";
// // import { Heart, Building2 } from "lucide-react";
// // import { RiRuler2Line } from "react-icons/ri";
// // import { MdApartment } from "react-icons/md";
// // import { FaWhatsapp, FaPhone } from "react-icons/fa";
// // import { FaMapMarkerAlt } from "react-icons/fa";

// // const defaultImage = "/image/appstore.png";
// // const userLocation = JSON.parse(sessionStorage.getItem("userLocation"));
// // const formatDateToDDMMYYYY = (dateVal, fallbackDate = null) => {
// //   if (!dateVal || dateVal.toString().trim() === "" || dateVal.toString().toLowerCase() === "null") {
// //     return dateVal;
// //   }

// //   let dateObj;
// //   if (dateVal.toString().trim().toLowerCase() === "immediately") {
// //     dateObj = fallbackDate ? new Date(fallbackDate) : new Date();
// //   } else {
// //     dateObj = new Date(dateVal);
// //   }

// //   if (isNaN(dateObj.getTime())) {
// //     return dateVal;
// //   }

// //   const day = String(dateObj.getDate()).padStart(2, "0");
// //   const month = String(dateObj.getMonth() + 1).padStart(2, "0");
// //   const year = dateObj.getFullYear();
// //   return `${day}/${month}/${year}`;
// // };

// // function calculateDistance(lat1, lon1, lat2, lon2) {
// //   const R = 6371;
// //   const dLat = (lat2 - lat1) * (Math.PI / 180);
// //   const dLon = (lon2 - lon1) * (Math.PI / 180);
// //   const a =
// //     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
// //     Math.cos(lat1 * (Math.PI / 180)) *
// //     Math.cos(lat2 * (Math.PI / 180)) *
// //     Math.sin(dLon / 2) *
// //     Math.sin(dLon / 2);
// //   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
// //   return R * c;
// // }
// // const Detail = ({ propertyData }) => {
// //   const toWords = new ToWords({
// //     localeCode: "en-IN",
// //     converterOptions: {
// //       currency: false,
// //       ignoreDecimal: true,
// //       ignoreZeroCurrency: true,
// //     },
// //   });
// //   // const [showAllImages, setShowAllImages] = useState(false);
// //   const [savedProperties, setSavedProperties] = useState([]);
// //   const [properties, setProperties] = useState([]);
// //   // const [isLoggedIn, setIsLoggedIn] = useState(false);
// //   const sliderRef = useRef(null);
// //   const overviewRef = useRef(null);
// //   const moreDetailsRef = useRef(null);
// //   const amenitiesRef = useRef(null);
// //   const aboutRef = useRef(null);
// //   const locationRef = useRef(null);
// //   const statusTimelineRef = useRef(null);
// //   const [activeSection, setActiveSection] = useState("overview");
// //   const [currentShareUrl1, setcurrentShareUrl1] = useState("");
// //   const [propertyDetails, setPropertyDetails] = useState({});
// //   const userId = sessionStorage.getItem("accessToken");
// //   const history = useHistory();
// //   const { searchCity } = useCity();
// //   const [currentShareUrl, setCurrentShareUrl] = useState("");
// //   const [activeShareId, setActiveShareId] = useState(null);
// //   const [tourSchedule, setTourSchedule] = useState([]);

// //   const [freeViewCount, setFreeViewCount] = useState(0);
// //   const [paidViewCount, setPaidViewCount] = useState(0);

// //   const formatArea = (area, unit) => {
// //     if (!area) return null;

// //     const formattedUnit = unit ? unit.trim().toLowerCase() : "";

// //     return `${area} ${formattedUnit}`;
// //   };
// //   const scrollToSection = (ref, key) => {
// //     setActiveSection(key);
// //     ref.current?.scrollIntoView({
// //       behavior: "smooth",
// //       block: "start",
// //     });
// //   };
// //   const checkPostLimits = async () => {
// //     try {
// //       const profileForm = new FormData();
// //       profileForm.append("user_id", userId);

// //       const profileResponse = await axios.post(
// //         `${process.env.REACT_APP_API_URL}/cust_api/get_profile`,
// //         profileForm,
// //         {
// //           headers: {
// //             "Content-Type": "multipart/form-data",
// //           },
// //         },
// //       );

// //       const countData = profileResponse?.data?.count_data;

// //       if (countData) {
// //         setFreeViewCount(countData.free_view_count || 0);
// //         setPaidViewCount(countData.paid_view_count || 0);
// //       }
// //     } catch (error) {
// //       console.error("Error checking post limits:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     if (userId) {
// //       checkPostLimits();
// //     }
// //   }, [userId]);

// //   const handleAddCount = async (updatedCount) => {
// //     try {
// //       const addCountFormData = new FormData();
// //       if (freeViewCount > 0) {
// //         addCountFormData.append("free_view_count", updatedCount);
// //       } else {
// //         addCountFormData.append("paid_view_count", updatedCount);
// //       }
// //       addCountFormData.append("user_id", userId);

// //       const response = await fetch(
// //         `${process.env.REACT_APP_API_URL}/cust_api/add_count`,
// //         {
// //           method: "POST",
// //           body: addCountFormData,
// //         },
// //       );

// //       const data = await response.json();

// //       if (response.ok) {
// //         checkPostLimits();
// //       } else {
// //         console.error("Failed to update count:", data.message);
// //       }
// //     } catch (error) {
// //       console.error("API error:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     // const userId = sessionStorage.getItem("AccessToken");
// //     if (userId) {
// //       setIsLoggedIn(true);
// //       fetchSavedProperties(userId);
// //     } else {
// //       setIsLoggedIn(false);
// //     }
// //   }, []);

// //   const fetchSavedProperties = async () => {
// //     // const userId = sessionStorage.getItem("AccessToken");
// //     try {
// //       const response = await axios.post(
// //         `${process.env.REACT_APP_API_URL}/cust_api/get_favorite_properties`,
// //         { user_id: userId },
// //       );
// //       if (response.data.status === 1 && Array.isArray(response.data.data)) {
// //         const savedIds = response.data.data.map((prop) => prop._id);
// //         setSavedProperties(savedIds);
// //       } else {
// //         setSavedProperties([]);
// //         console.error("No saved properties found.");
// //       }
// //     } catch (error) {
// //       console.error("Error fetching saved properties:", error);
// //     }
// //   };

// //   const fetchRecommendedProperties = async () => {
// //     try {
// //       const cityName =
// //         searchCity && searchCity.trim() !== ""
// //           ? searchCity.trim()
// //           : sessionStorage.getItem("cityName") || "";
// //       const response = await axios.post(
// //         `${process.env.REACT_APP_API_URL}/cust_api/get_featured_property`,
// //         {
// //           user_id: userId,
// //           city_name: cityName,
// //         },
// //       );
// //       if (response.data.status === 1 && Array.isArray(response.data.data)) {
// //         setProperties(response.data.data);
// //       } else {
// //         setProperties([]);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching recommended properties:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchRecommendedProperties();
// //   }, []);

// //   //add to favorite started
// //   const [isFavorite, setIsFavorite] = useState(false);
// //   const [favoriteId, setFavoriteId] = useState(null); // Store the favorite_id for removal

// //   // Check if the property is a favorite on page load or when propertyDetails changes
// //   const checkIfFavorite = async (propertyId) => {
// //     // const userId = sessionStorage.getItem("accessToken");
// //     if (!userId || !propertyId) return;

// //     try {
// //       const response = await axios.post(
// //         `${process.env.REACT_APP_API_URL}/cust_api/get_favorite_properties`,
// //         { user_id: userId },
// //       );

// //       const favoriteList = response.data.data || [];
// //       const matchedFavorite = favoriteList.find(
// //         (fav) => String(fav._id) === String(propertyId),
// //       );

// //       if (matchedFavorite) {
// //         setIsFavorite(true);
// //         setFavoriteId(matchedFavorite.favorite_id); // Save favorite_id for removal
// //       } else {
// //         setIsFavorite(false);
// //         setFavoriteId(null);
// //       }
// //     } catch (error) {
// //       console.error("Error checking favorite status:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     checkIfFavorite(propertyDetails?._id);
// //   }, [propertyDetails?._id]);

// //   //  Add to favorites
// //   const addToFavorites = async () => {
// //     if (!userId) {
// //       setIsLoginModalOpen(true);
// //       return;
// //     }

// //     try {
// //       const response = await axios.post(
// //         `${process.env.REACT_APP_API_URL}/cust_api/add_to_favorite`,
// //         {
// //           user_id: userId,
// //           property_id: propertyDetails._id,
// //         },
// //       );
// //       setIsFavorite(true); // Immediately set isFavorite to true
// //       checkIfFavorite(_id); // Save the favorite_id from the response
// //       toast.success("Property has been saved to your favorites!");
// //       fetchPropertyDetails(_id);
// //       fetchRecommendedProperties();
// //     } catch (error) {
// //       console.error("Error adding property to favorites:", error);
// //       toast.error("Failed to save the property. Please try again.");
// //     }
// //   };

// //   // Remove from favorites
// //   const removeFromFavorites = async () => {
// //     if (!favoriteId) return;

// //     try {
// //       await axios.delete(
// //         `${process.env.REACT_APP_API_URL}/cust_api/remove_from_favorite`,
// //         { data: { favorite_id: favoriteId } }, // DELETE request with body
// //       );

// //       toast.success("Property removed from your favorites.");
// //       checkIfFavorite(_id);
// //       fetchPropertyDetails(_id);
// //       fetchRecommendedProperties();
// //     } catch (error) {
// //       console.error("Error removing property from favorites:", error);
// //       toast.error("Failed to remove the property. Please try again.");
// //     }
// //   };

// //   //  Add to favorites
// //   const addToFavoritesRecommendedProperty = async (PropertyId) => {
// //     if (!userId) {
// //       setIsLoginModalOpen(true);
// //       return;
// //     }

// //     try {
// //       const response = await axios.post(
// //         `${process.env.REACT_APP_API_URL}/cust_api/add_to_favorite`,
// //         {
// //           user_id: userId,
// //           property_id: PropertyId,
// //         },
// //       );
// //       checkIfFavorite(_id);
// //       fetchPropertyDetails(_id);
// //       fetchRecommendedProperties();
// //     } catch (error) {
// //       console.log("Failed to save the property. Please try again.");
// //     }
// //   };

// //   // Remove from favorites
// //   const removeFromFavoritesRecommendedProperty = async (FavoriteId) => {
// //     try {
// //       await axios.delete(
// //         `${process.env.REACT_APP_API_URL}/cust_api/remove_from_favorite`,
// //         { data: { favorite_id: FavoriteId } },
// //       );

// //       checkIfFavorite(_id);
// //       fetchPropertyDetails(_id);
// //       fetchRecommendedProperties();
// //     } catch (error) {
// //       console.log("Failed to remove the property. Please try again.");
// //     }
// //   };

// //   // Slider settings
// //   const [activeIndexes, setActiveIndexes] = useState({});
// //   const BASE_URL = process.env.REACT_APP_API_URL;
// //   const settings = {
// //     infinite: true,
// //     slidesToShow: 4,
// //     lazyLoad: "ondemand",
// //     slidesToScroll: 1,
// //     autoplay: true,
// //     autoplaySpeed: 3000,
// //     arrows: false,
// //     cssEase: "linear",
// //     centerMode: false,
// //     centerPadding: "0px",
// //     responsive: [
// //       {
// //         breakpoint: 1399,
// //         settings: {
// //           slidesToShow: 3,
// //           slidesToScroll: 1,
// //         },
// //       },
// //       {
// //         breakpoint: 1023,
// //         settings: {
// //           slidesToShow: 2,
// //           slidesToScroll: 1,
// //         },
// //       },
// //       {
// //         breakpoint: 767,
// //         settings: {
// //           slidesToShow: 1,
// //           slidesToScroll: 1,
// //         },
// //       },
// //     ],
// //   };
// //   const openShareModal1 = (url) => {
// //     setcurrentShareUrl1(url);
// //     const modal = document.getElementById("shareModal1");
// //     if (modal) {
// //       modal.style.display = "block";
// //     }
// //   };

// //   const openShareModal = (url, propertyId) => {
// //     setCurrentShareUrl(url);
// //     setActiveShareId(propertyId);
// //     setIsShareModalOpen(true);
// //   };

// //   const formatPrice = (price) => {
// //     if (price === null || price === undefined || price === "") return "";

// //     price = Number(price);

// //     if (price >= 10000000) {
// //       return (price / 10000000).toFixed(2).replace(/\.?0+$/, "") + " Cr";
// //     } else if (price >= 100000) {
// //       return (price / 100000).toFixed(2).replace(/\.?0+$/, "") + " L";
// //     } else if (price >= 1000) {
// //       return (price / 1000).toFixed(2).replace(/\.?0+$/, "") + " K";
// //     } else {
// //       return price.toString();
// //     }
// //   };

// //   // for the image section with 'get_property_detail' api

// //   const { _id } = useParams();
// //   const location = useLocation();
// //   const property_owner_id = location.state?.property_owner_id;
// //   const [aboutPropertyText, setAboutPropertyText] = useState("");

// //   const [showAll, setShowAll] = useState(false);
// //   const [allAmenities, setAllAmenities] = useState([]);
// //   const visibleAmenities = showAll ? allAmenities : allAmenities.slice(0, 8);

// //   const [propertyImages, setPropertyImages] = useState([]);
// //   const [showAllImages, setShowAllImages] = useState(false);
// //   const [longitude, setLongitude] = useState(0);
// //   const [latitude, setLatitude] = useState(0);
// //   const [userDetails, setuserDetails] = useState({
// //     full_name: "",
// //     mobile_number: "",
// //     email: "",
// //   });

// //   const user_id = sessionStorage.getItem("accessToken");
// //   useEffect(() => {
// //     const customer_id = user_id;

// //     if (propertyDetails?._id && propertyDetails?.user_id && customer_id) {
// //       const formData = new FormData();
// //       formData.append("property_id", propertyDetails?._id);
// //       formData.append("user_id", propertyDetails?.user_id);
// //       formData.append("customer_id", customer_id);

// //       axios
// //         .post(
// //           `${process.env.REACT_APP_API_URL}/cust_api/add_view_property`,
// //           formData,
// //         )
// //         .then((res) => {
// //           if (res.data?.status === 1) {
// //             console.log("View property recorded");
// //           }
// //         })
// //         .catch((err) => {
// //           console.error("Failed to record property view:", err);
// //         });
// //     }
// //   }, [propertyDetails?._id, user_id]);

// //   useEffect(() => {
// //     window.scrollTo(0, 0);
// //   }, []);

// //   const fetchPropertyDetails = async (id) => {
// //     try {
// //       const res = await axios.post(
// //         `${process.env.REACT_APP_API_URL}/cust_api/get_property_details`,
// //         { property_id: id, user_id: userId },
// //       );

// //       const data = res.data?.data;
// //       console.log("API Response:", data);
// //       console.log("Price Onwards:", data.price_onwards);

// //       if (data?.property_images?.length > 0) {
// //         setPropertyImages(data.property_images);
// //       } else {
// //         setPropertyImages([]);
// //       }

// //       if (data?.amenities?.length > 0) {
// //         setAllAmenities(data.amenities);
// //       } else {
// //         setAllAmenities([]);
// //       }

// //       if (
// //         data?.tour_schedule?.length > 0 &&
// //         data.tour_schedule[0].status !== "Rejected" &&
// //         data.tour_schedule[0].status !== "Expired"
// //       ) {
// //         setTourSchedule(data.tour_schedule);
// //         const dateParts = data.tour_schedule[0].schedule_date.split("-");
// //         const year = dateParts[0].slice(-2); // "25"
// //         const month = parseInt(dateParts[1], 10) - 1; // month index
// //         const day = parseInt(dateParts[2], 10); // 24

// //         const monthName = new Date(0, month).toLocaleString("default", {
// //           month: "short",
// //         });

// //         const scheduledLabel = `Scheduled ${day} ${monthName} ${year}`;
// //         setScheduledDateLabel(scheduledLabel);
// //       } else {
// //         setTourSchedule([]);
// //         setScheduledDateLabel("Virtual Tour");
// //       }

// //       if (data?.property_details?.property_description) {
// //         setAboutPropertyText(data.property_details.property_description);
// //       } else {
// //         setAboutPropertyText("");
// //       }

// //       if (data?.property_details) {
// //         setPropertyDetails(data.property_details);
// //       } else {
// //         setPropertyDetails({});
// //       }

// //       if (
// //         data?.user_details &&
// //         Array.isArray(data.user_details) &&
// //         data.user_details.length > 0
// //       ) {
// //         setuserDetails(data.user_details[0]);
// //       } else {
// //         setuserDetails({
// //           full_name: "N/A",
// //           mobile_number: "N/A",
// //           email: "N/A",
// //         });
// //         console.warn("user_details is empty or invalid:", data?.user_details);
// //       }

// //       const pd = data.property_details;
// //       setLatitude(pd.latitude);
// //       setLongitude(pd.longitude);
// //     } catch (err) {
// //       console.error("Error fetching property details", err);
// //       setPropertyImages([]);
// //       setAllAmenities([]);
// //       setTourSchedule([]);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchPropertyDetails(_id);
// //   }, [_id]);

// //   // for send Enquiry 'add_property_enquiry' api

// //   const [name, setName] = useState("");
// //   const [message, setMessage] = useState("");
// //   const [contactNumber, setContactNumber] = useState("");
// //   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
// //   const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// //   const [enquiryStatus, setEnquiryStatus] = useState(null); // success or error

// //   // Existing useEffect (on mount)
// //   useEffect(() => {
// //     const mobileNumber = sessionStorage.getItem("Mobile_Number");
// //     if (mobileNumber) {
// //       setContactNumber(mobileNumber);
// //     }
// //   }, []);

// //   //  New useEffect to check sessionStorage and update contact number after login
// //   useEffect(() => {
// //     let interval;

// //     if (isLoginModalOpen === false && !contactNumber) {
// //       interval = setInterval(() => {
// //         const mobileNumber = sessionStorage.getItem("Mobile_Number");
// //         if (mobileNumber) {
// //           setContactNumber(mobileNumber);
// //           clearInterval(interval); // Stop checking once we have it
// //         }
// //       }, 500); // Check every 500ms
// //     }

// //     return () => clearInterval(interval); // Cleanup
// //   }, [isLoginModalOpen, contactNumber]);

// //   const userType = sessionStorage.getItem("user_type");
// //   // Handle Enquiry Form submission
// //   const handleEnquirySubmit = async (e) => {
// //     e.preventDefault();

// //     const accessToken = sessionStorage.getItem("accessToken");

// //     if (!accessToken) {
// //       setIsLoginModalOpen(true);
// //       return;
// //     }

// //     const enquiryData = {
// //       property_id: propertyDetails?._id,
// //       user_id: propertyDetails?.user_id,
// //       customer_id: accessToken,
// //       name,
// //       user_type: userType,
// //       contact_number: contactNumber,
// //       message,
// //     };

// //     try {
// //       const response = await axios.post(
// //         `${process.env.REACT_APP_API_URL}/cust_api/add_property_enquiry`,
// //         enquiryData,
// //       );

// //       if (response.data.status) {
// //         setEnquiryStatus({
// //           type: "success",
// //           message: "Enquiry sent successfully!",
// //         });
// //         setName("");
// //         setMessage("");
// //       } else {
// //         setEnquiryStatus({ type: "error", message: "Failed to send enquiry!" });
// //       }
// //     } catch (error) {
// //       setEnquiryStatus({ type: "error", message: "Something went wrong!" });
// //     }
// //   };

// //   // Trigger login modal on input if not logged in
// //   const handleFieldChange = () => {
// //     const accessToken = sessionStorage.getItem("accessToken");
// //     if (!accessToken) {
// //       setIsLoginModalOpen(true);
// //     }
// //   };

// //   const handleLoginSuccess = () => {
// //     const mobileNumber = sessionStorage.getItem("Mobile_Number");
// //     if (mobileNumber) {
// //       setIsLoggedIn(true);
// //       setContactNumber(mobileNumber);
// //       setIsLoginModalOpen(false);
// //     }
// //   };

// //   // for the schedule virtula tour
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [scheduledDateLabel, setScheduledDateLabel] = useState("Virtual Tour");
// //   const [openVirtualTourAfterLogin, setOpenVirtualTourAfterLogin] =
// //     useState(false);
// //   useEffect(() => {
// //     const token = sessionStorage.getItem("accessToken");
// //     if (token && openVirtualTourAfterLogin) {
// //       setIsModalOpen(true); // Open Virtual Tour
// //       setOpenVirtualTourAfterLogin(false); // Reset flag
// //     }
// //   }, [isLoggedIn]);

// //   // for share model
// //   const [openShareModalAfterLogin, setOpenShareModalAfterLogin] =
// //     useState(false);
// //   const [isShareModalOpen, setIsShareModalOpen] = useState(false);
// //   useEffect(() => {
// //     const token = sessionStorage.getItem("accessToken");
// //     if (token && openShareModalAfterLogin) {
// //       setIsShareModalOpen(true); // Open Share modal
// //       setOpenShareModalAfterLogin(false); // Reset flag
// //     }
// //   }, [isLoggedIn]);

// //   const handleCloseShareModal = () => {
// //     setIsShareModalOpen(false);
// //   };

// //   //for the contact details
// //   const [isContactModalOpen, setIsContactModalOpen] = useState(false);
// //   const [openContactModalAfterLogin, setOpenContactModalAfterLogin] =
// //     useState(false);

// //   const userName = sessionStorage.getItem("user_name");
// //   const userMobile = sessionStorage.getItem("Mobile_Number");

// //   useState(false);
// //   useEffect(() => {
// //     if (sessionStorage.getItem("accessToken") && openContactModalAfterLogin) {
// //       setIsContactModalOpen(true);
// //       setOpenContactModalAfterLogin(false);
// //     }
// //   }, [openContactModalAfterLogin]);

// //   // Add this line below all useState declarations or just before return:
// //   const overviewFields = [
// //     //["Status", propertyDetails?.available_status || null],
// //     ["Property Added Date", propertyDetails?.property_added_date || null],
// //     ["Property Name", propertyDetails?.property_name || null],
// //     // [
// //     //   "Address",
// //     //   propertyDetails?.address &&
// //     //   propertyDetails?.city_name &&
// //     //   propertyDetails?.state &&
// //     //   propertyDetails?.zip_code
// //     //     ? `${propertyDetails.address}, ${propertyDetails.city_name}, ${propertyDetails.state}, ${propertyDetails.zip_code}`
// //     //     : null,
// //     // ],
// //     [
// //       "Address",
// //       propertyDetails?.address || null,
// //     ],
// //     [
// //       "Area",
// //       propertyDetails?.area
// //         ? formatArea(propertyDetails.area, propertyDetails.area_in)
// //         : null,
// //     ],
// //     ["Area Type", propertyDetails?.area_type || null],
// //     [
// //       "Price",
// //       propertyDetails?.property_category_type === "Rent"
// //         ? propertyDetails?.rent
// //           ? `₹${formatPrice(propertyDetails.rent)}`
// //           : null
// //         : propertyDetails?.property_price
// //           ? `₹${formatPrice(propertyDetails.property_price)}`
// //           : null,
// //     ],
// //     [
// //       "Deposite",
// //       propertyDetails?.custom_deposit_amount
// //         ? `₹${formatPrice(propertyDetails.custom_deposit_amount)}`
// //         : null,
// //     ],
// //     ["Listing Type", propertyDetails?.property_category_type || null],
// //     // ["Developer", propertyDetails?.developer || null],
// //     ["Building Type", propertyDetails?.building_type || null],
// //     ["Property Type", propertyDetails?.property_type || null],
// //     [
// //       "Bhk Type",
// //       propertyDetails?.bhk_type === "Studio"
// //         ? "Studio/Single Room"
// //         : propertyDetails?.bhk_type || null,
// //     ],
// //     ["Furnishing", propertyDetails?.furnished_type || null],
// //     // ["Plot No.", propertyDetails?.plot_no || null],
// //     ["Operating Since", propertyDetails?.operating_since || null],
// //     [
// //       "Available for Company Lease",
// //       propertyDetails?.available_for_company_lease || null,
// //     ],
// //     ["Available For", propertyDetails?.available_for || null],
// //     ["Suited For", propertyDetails?.suited_for || null],
// //     ["Room Type", propertyDetails?.room_type || null],
// //     ["Food Charges Included", propertyDetails?.food_charges_included || null],
// //   ].filter(([_, value]) => value);

// //   //more details

// //   const moreDetailsFields = [
// //     ["Food Available", propertyDetails?.food_available || null],
// //     ["Notice Period", propertyDetails?.notice_period || null],
// //     [
// //       "Notice Period Other Days",
// //       propertyDetails?.notice_period_other_days || null,
// //     ],
// //     [
// //       "Electricity Charges Included",
// //       propertyDetails?.electricity_charges_included || null,
// //     ],
// //     ["Total Beds", propertyDetails?.total_beds || null],
// //     ["Additional Rooms", propertyDetails?.additional_rooms || null],
// //     ["PG Rules", propertyDetails?.pg_rules || null],
// //     ["Gate Closing Time", propertyDetails?.gate_closing_time || null],
// //     ["Gate Closing Hour", propertyDetails?.gate_closing_hour || null],
// //     ["PG Services", propertyDetails?.pg_services || null],
// //     ["Age of Property", propertyDetails?.age_of_property || null],
// //     ["Office Space Type", propertyDetails?.office_space_type || null],
// //     ["Pantry", propertyDetails?.pantry || null],
// //     ["Personal Washroom", propertyDetails?.personal_washroom || null],
// //     ["Bathroom", propertyDetails?.bathroom || null],
// //     ["Covered Parking", propertyDetails?.covered_parking || null],
// //     ["Uncovered Parking", propertyDetails?.uncovered_parking || null],
// //     ["Balcony", propertyDetails?.balcony || null],
// //     ["Power Backup", propertyDetails?.power_backup || null],
// //     ["Lift Availability", propertyDetails?.lift_availability || null],
// //     ["Water Source", propertyDetails?.water_source || null],
// //     ["View", propertyDetails?.view || null],
// //     ["Flooring", propertyDetails?.flooring || null],
// //     ["Total Floor", propertyDetails?.total_floor || null],
// //     ["Property Floor", propertyDetails?.property_floor || null],
// //     ["Facing", propertyDetails?.facing || null],
// //     ["Ceiling Height", propertyDetails?.ceiling_height || null],
// //     ["Parking Availability", propertyDetails?.parking_availability || null],
// //     ["Min Lockin Period", propertyDetails?.min_lockin_period || null],
// //     ["Seat Type", propertyDetails?.seat_type || null],
// //     [
// //       "Number of Seats Available",
// //       propertyDetails?.number_of_seats_available || null,
// //     ],
// //     ["Plot No.", propertyDetails?.plot_no || null],
// //     // ["Loan Availability", propertyDetails?.loan_availability || null],
// //     //some other fileds
// //     ["RERA ID", propertyDetails?.property_no || null],
// //     ["Landmarks", propertyDetails?.landmarks || null],
// //     ["Furnishing", propertyDetails?.furnished_type || null],
// //     ["Near Landmark", propertyDetails?.near_landmark || null],
// //     ["Flat Name", propertyDetails?.flat_name || null],
// //     ["Maintenance Frequency", propertyDetails?.maintenance_frequency || null],
// //     [
// //       "Maintenance Included",
// //       propertyDetails?.maintenance_included ? "Yes" : "No",
// //     ],
// //     ["Security Deposit Type", propertyDetails?.security_deposit_type || null],
// //     [
// //       "Available for Company Lease",
// //       propertyDetails?.available_for_company_lease || null,
// //     ],
// //     ["Available For", propertyDetails?.available_for || null],
// //     ["Suited For", propertyDetails?.suited_for || null],
// //     ["Room Type", propertyDetails?.room_type || null],
// //     ["Food Charges Included", propertyDetails?.food_charges_included || null],
// //     // [
// //     //   "Virtual Tour Availability",
// //     //   propertyDetails?.virtual_tour_availability || null,
// //     // ],
// //     ["Property Category Type", propertyDetails?.property_category_type || null],
// //     ["Rent", propertyDetails?.rent || null],
// //     ["Rent Duration", propertyDetails?.rent_duration || null],
// //     ["Property Added Date", propertyDetails?.property_added_date ? formatDateToDDMMYYYY(propertyDetails.property_added_date) : null],
// //     ["Possession Status", propertyDetails?.possession_status || null],
// //     ["Possession Date", propertyDetails?.possession_date ? formatDateToDDMMYYYY(propertyDetails.possession_date) : null],

// //     ["Area Type", propertyDetails?.area_type || null],
// //     ["Built up Area", propertyDetails?.area || null],
// //     [
// //       "Built-up Area Unit",
// //       propertyDetails?.area_in ? propertyDetails.area_in.toLowerCase() : null,
// //     ],
// //     ["Carpet Area", propertyDetails?.carpet_area || null],
// //     [
// //       "Carpet Area Unit",
// //       propertyDetails?.carpet_area_unit
// //         ? propertyDetails.carpet_area_unit.toLowerCase()
// //         : null,
// //     ],
// //     ["Available Status", propertyDetails?.available_status || null],
// //     ["Investment Options", propertyDetails?.investment_options || null],
// //     ["All Inclusive Price", propertyDetails?.all_inclusive_price || null],
// //     ["Price Onwards", propertyDetails?.price_onwards || null],
// //     ["Price Negotiable", propertyDetails?.price_negotiable || null],
// //     [
// //       "Tax And Goverment Charges",
// //       propertyDetails?.tax_and_goverment_charges || null,
// //     ],
// //     [
// //       "Electricity And Water Charges",
// //       propertyDetails?.electricity_and_water_charges || null,
// //     ],
// //     ["No Of Open Sides", propertyDetails?.no_of_open_sides || null],
// //     ["No Of Peoples", propertyDetails?.no_of_peoples || null],
// //     ["Type Of Construction", propertyDetails?.type_of_construction || null],
// //     ["Quality Rating", propertyDetails?.quality_rating || null],
// //     ["Central AC", propertyDetails?.central_AC || null],
// //     ["Total Number Parking", propertyDetails?.total_number_parking || null],
// //     ["Block", propertyDetails?.block || null],
// //     ["Developer", propertyDetails?.developer || null],
// //     ["Project Type", propertyDetails?.project_type || null],
// //     ["Transaction Type", propertyDetails?.transaction_type || null],
// //     ["Builder Floor Type", propertyDetails?.builder_floor_type || null],
// //     // ["Attached Bathroom", propertyDetails?.attached_bathroom || null],
// //     // ["Attached Balcony", propertyDetails?.attached_balcony || null],
// //     // ["Pantry Option", propertyDetails?.pantry_option || null],
// //     // ["Parking Types", propertyDetails?.parking_types || null],
// //     ["Possession By", propertyDetails?.possession_by || null],
// //     [
// //       "Property Dimensions Length",
// //       propertyDetails?.property_dimensions_length || null,
// //     ],
// //     [
// //       "Property Dimensions Breadth",
// //       propertyDetails?.property_dimensions_breadth || null,
// //     ],
// //     ["Length Of Land", propertyDetails?.length_of_land || null],
// //     ["Breadth Of Land", propertyDetails?.breadthOfLand || null],
// //     ["Open Sides Of Land", propertyDetails?.openSidesOfLand || null],
// //     ["Construction On Land", propertyDetails?.constructionOnLand || null],
// //     [
// //       "Selected Construction On Land",
// //       propertyDetails?.selectedConstructionOnLand || null,
// //     ],
// //     ["Commercial Washroom", propertyDetails?.commercial_washroom || null],
// //     [
// //       "Number Of Minimum Bathrooms",
// //       propertyDetails?.number_of_minimum_bathrooms || null,
// //     ],
// //     ["Maintenance Cost", propertyDetails?.maintenance_cost || null],
// //     ["Available Beds", propertyDetails?.available_beds || null],
// //     [
// //       "Available From",
// //       propertyDetails?.possession_date || propertyDetails?.available_from
// //         ? formatDateToDDMMYYYY(
// //           propertyDetails?.possession_date || propertyDetails?.available_from,
// //           propertyDetails?.property_added_date
// //         )
// //         : null,
// //     ],
// //     ["Available On", propertyDetails?.available_on ? formatDateToDDMMYYYY(propertyDetails.available_on) : null],

// //     ["No Of Cabines", propertyDetails?.no_of_cabines || null],
// //     ["No Of Meeting Rooms", propertyDetails?.no_of_meeting_Rooms || null],
// //     ["No Of Conference Room", propertyDetails?.no_of_conference_room || null],
// //     // ["Posted By Admin", propertyDetails?.posted_by_admin || null],
// //     // ["UPS", propertyDetails?.ups || null],
// //     // ["Oxygen Duct", propertyDetails?.oxygenDuct || null],
// //     // ["Central AC", propertyDetails?.central_AC || null],
// //     // ["Conference Room", propertyDetails?.conferenceRoom || null],
// //     // ["Washroom", propertyDetails?.washroom || null],
// //     // ["Washroom Check", propertyDetails?.washroom_Check || null],
// //     ["Reception Area", propertyDetails?.reception_area || null],
// //     // ["Created At",
// //     //   propertyDetails?.created_at
// //     //     ? new Date(propertyDetails.created_at).toLocaleDateString("en-GB")
// //     //     : null,
// //     // ],

// //     // ["Updated At",
// //     //   propertyDetails?.updated_at
// //     //     ? new Date(propertyDetails.updated_at).toLocaleDateString("en-GB")
// //     //     : null,
// //     // ],
// //   ].filter(([_, value]) => value);
// //   const statusTimelineItems = [];

// //   const addStatusItem = ({
// //     icon,
// //     title,
// //     value,
// //     bgColor,
// //     iconColor,
// //   }) => {
// //     if (
// //       !value ||
// //       value.toString().trim() === "" ||
// //       value.toString().toLowerCase() === "n/a" ||
// //       value.toString().toLowerCase() === "null"
// //     ) {
// //       return;
// //     }

// //     statusTimelineItems.push({
// //       icon,
// //       title,
// //       value,
// //       bgColor,
// //       iconColor,
// //     });
// //   };
// //   addStatusItem({
// //     icon: <HiOutlineBadgeCheck />,
// //     title: "Availability",
// //     value: propertyDetails?.available_status,
// //     bgColor: "bg-green-50",
// //     iconColor: "text-green-600",
// //   });
// //   addStatusItem({
// //     icon: <HiOutlineCalendar />,
// //     title: "Available From",
// //     value: formatDateToDDMMYYYY(
// //       propertyDetails?.possession_date || propertyDetails?.available_from,
// //       propertyDetails?.property_added_date
// //     ),
// //     bgColor: "bg-blue-50",
// //     iconColor: "text-blue-600",
// //   });

// //   addStatusItem({
// //     icon: <HiOutlineHome />,
// //     title: "Possession",
// //     value: propertyDetails?.possession_status,
// //     bgColor: "bg-orange-50",
// //     iconColor: "text-orange-600",
// //   });

// //   addStatusItem({
// //     icon: <HiOutlineClock />,
// //     title: "Last Updated",
// //     value: propertyDetails?.updated_at
// //       ? formatDateToDDMMYYYY(propertyDetails.updated_at)
// //       : formatDateToDDMMYYYY(propertyDetails?.property_added_date),
// //     bgColor: "bg-purple-50",
// //     iconColor: "text-purple-600",
// //   });

// //   addStatusItem({
// //     icon: <HiOutlineClock />,
// //     title: "Property Age",
// //     value: propertyDetails?.age_of_property,
// //     bgColor: "bg-amber-50",
// //     iconColor: "text-amber-700",
// //   });

// //   const handleClick = () => {
// //     history.push("/featuredDashboard");
// //   };

// //   useEffect(() => {
// //     window.scrollTo(0, 0);
// //   }, []);

// //   // Prevent background scrolling when modal is open
// //   useEffect(() => {
// //     if (
// //       isShareModalOpen ||
// //       isContactModalOpen ||
// //       showAllImages ||
// //       isModalOpen
// //     ) {
// //       document.body.style.overflow = "hidden";
// //     } else {
// //       document.body.style.overflow = "auto";
// //     }

// //     // Cleanup when component unmounts
// //     return () => {
// //       document.body.style.overflow = "auto";
// //     };
// //   }, [isShareModalOpen, isContactModalOpen, showAllImages, isModalOpen]);

// //   const getTimeAgo = (dateString) => {
// //     if (!dateString) return "";

// //     const now = new Date();
// //     const created = new Date(dateString);

// //     const diffMs = now - created;

// //     const minutes = Math.floor(diffMs / (1000 * 60));
// //     const hours = Math.floor(diffMs / (1000 * 60 * 60));
// //     const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

// //     if (minutes < 60) {
// //       return `${minutes} min ago`;
// //     }

// //     if (hours < 24) {
// //       return `${hours} hr${hours > 1 ? "s" : ""} ago`;
// //     }

// //     if (days < 30) {
// //       return `${days} day${days > 1 ? "s" : ""} ago`;
// //     }

// //     const months = Math.floor(days / 30);

// //     if (months < 12) {
// //       return `${months} month${months > 1 ? "s" : ""} ago`;
// //     }

// //     const years = Math.floor(months / 12);

// //     return `${years} year${years > 1 ? "s" : ""} ago`;
// //   };

// //   return (
// //     <>
// //       <div className="max-w-full px-4 mx-auto sm:px-16 detail-page-container">
// //         {/* Property Details Section */}
// //         <div className="relative w-full h-auto p-2 mb-4 rounded-lg shadow-sm bg-rose-50 detail-header-card">
// //           {(propertyDetails?.property_price || propertyDetails?.rent) && (
// //             <div className="absolute top-4 right-4 flex flex-col items-end detail-price-block">
// //               <p className="flex items-center mt-5 text-3xl font-bold my-text">
// //                 <FaRupeeSign className="mr-2" />
// //                 {propertyDetails?.property_category_type === "Rent" ||
// //                   propertyDetails?.property_category_type === "PG/Co-living" ? (
// //                   <>
// //                     {formatPrice(propertyDetails?.rent)}{" "}
// //                     <span className="ml-1 text-xl text-gray-700">
// //                       / {propertyDetails?.rent_duration || "Per Month"}
// //                     </span>
// //                   </>
// //                 ) : (
// //                   formatPrice(propertyDetails?.property_price)
// //                 )}
// //               </p>
// //               <p className="mt-1 text-sm font-medium text-gray-500">
// //                 {propertyDetails?.property_category_type === "Rent" ||
// //                   propertyDetails?.property_category_type === "PG/Co-living"
// //                   ? `${toWords.convert(Number(propertyDetails?.rent))} Only`
// //                   : `${toWords.convert(Number(propertyDetails?.property_price))} Only`}
// //               </p>
// //             </div>
// //           )}

// //           {/* <h2 className="mt-2 ml-6 text-3xl font-normal">
// //             {propertyDetails?.bhk_type ? `${propertyDetails.bhk_type} ` : ""}
// //             {propertyDetails?.area ? `${propertyDetails.area} Sq-ft ` : ""}
// //             {propertyDetails?.property_type
// //               ? `${propertyDetails.property_type} `
// //               : ""}
// //             for {propertyDetails?.property_category_type
// //               ? `${propertyDetails.property_category_type}`
// //               : ""}
// //           </h2> */}

// //           <h2 className="mt-2 ml-6 text-3xl font-normal detail-title">
// //             {propertyDetails?.property_name
// //               ? `${propertyDetails.property_name} `
// //               : ""}
// //           </h2>

// //           <p className="ml-6 text-xl font-bold text-gray-700 break-words whitespace-normal max-w-[80ch] detail-address">
// //             <img
// //               src="/image/address_icon.png"
// //               alt="Address Icon"
// //               className="inline-block w-5 h-5 mr-2"
// //             />
// //             {propertyDetails?.address || "Address N/A"}
// //           </p>
// //           <div className="flex items-center mt-6 ml-5 space-x-8 detail-info-row">
// //             {propertyDetails?.bhk_type && (
// //               <div className="flex items-center space-x-2">
// //                 <FaBed className="text-2xl my-text" />
// //                 <span className="text-lg font-bold">
// //                   {propertyDetails.bhk_type}
// //                 </span>
// //               </div>
// //             )}

// //             {propertyDetails?.area && (
// //               <div className="flex items-center space-x-2">
// //                 <FaRulerCombined className="text-2xl my-text" />
// //                 <span className="text-lg font-bold">
// //                   {formatArea(propertyDetails.area, propertyDetails.area_in)}
// //                 </span>
// //               </div>
// //             )}

// //             {propertyDetails?.bathroom && (
// //               <div className="flex items-center space-x-2">
// //                 <FaBath className="text-2xl my-text" />
// //                 <span className="text-lg font-bold">
// //                   {propertyDetails.bathroom} Bathroom
// //                 </span>
// //               </div>
// //             )}
// //           </div>

// //           <div className="flex justify-end mt-6 space-x-4 detail-actions-row">
// //             {propertyDetails.virtual_tour_availability === "Yes" && (
// //               <button
// //                 className={`px-6 py-2 text-lg flex items-center gap-2 w-full sm:w-auto justify-center detail-action-btn
// //       ${tourSchedule?.[0]?.status === "Accepted"
// //                     ? "bg-green-500 text-white rounded-full"
// //                     : scheduledDateLabel === "Virtual Tour"
// //                       ? "bg-white border my-text rounded-lg"
// //                       : "bg-[#FFD700] text-black rounded-full"
// //                   }`}
// //                 onClick={() => {
// //                   const token = sessionStorage.getItem("accessToken");

// //                   if (scheduledDateLabel !== "Virtual Tour") {
// //                     history.push({
// //                       pathname: "/dashboard",
// //                       state: { page: "myVirtualtour" },
// //                     });
// //                   } else {
// //                     if (token) {
// //                       setIsModalOpen(true);
// //                     } else {
// //                       setOpenVirtualTourAfterLogin(true);
// //                       setIsLoginModalOpen(true);
// //                     }
// //                   }
// //                 }}
// //               >
// //                 <PiCubeFocus size={20} />
// //                 {scheduledDateLabel}
// //                 {scheduledDateLabel !== "Virtual Tour" && (
// //                   <HiOutlineArrowRight size={16} />
// //                 )}
// //               </button>
// //             )}

// //             {isModalOpen && (
// //               <GetScheduleVTourproperty
// //                 onClose={() => setIsModalOpen(false)}
// //                 propertyDetails={propertyDetails}
// //                 setScheduledDateLabel={setScheduledDateLabel}
// //                 setIsModalOpen={setIsModalOpen}
// //               />
// //             )}
// //             <div
// //               className="w-full px-3 py-1 text-sm text-white my-bg rounded-lg cursor-pointer sm:px-4 sm:py-2 sm:text-lg sm:w-auto detail-action-btn detail-contact-btn"
// //               onClick={() => {
// //                 const token = sessionStorage.getItem("accessToken");
// //                 if (token) {
// //                   if (!userDetails) {
// //                     // Avoid opening the modal if user data is missing
// //                     toast.error("User data not found");
// //                     return;
// //                   }

// //                   if (freeViewCount > 0) {
// //                     const updatedCount = -1;
// //                     setFreeViewCount(updatedCount);
// //                     handleAddCount(updatedCount);
// //                   } else if (paidViewCount > 0) {
// //                     const updatedCount = -1;
// //                     setPaidViewCount(updatedCount);
// //                     handleAddCount(updatedCount);
// //                   }

// //                   setIsContactModalOpen(true);
// //                 } else {
// //                   setOpenContactModalAfterLogin(true);
// //                   setIsLoginModalOpen(true);
// //                 }
// //               }}
// //             >
// //               Contact Details
// //             </div>
// //             {isContactModalOpen &&
// //               userDetails &&
// //               !Array.isArray(userDetails) &&
// //               userDetails.full_name && (
// //                 <ContactDetails
// //                   onClose={() => setIsContactModalOpen(false)}
// //                   fullName={
// //                     freeViewCount <= 0 && paidViewCount <= 0
// //                       ? `****${userDetails.full_name.slice(-1) || "N/A"}`
// //                       : userDetails.full_name || "N/A"
// //                   }
// //                   mobile={
// //                     freeViewCount <= 0 && paidViewCount <= 0
// //                       ? `********${userDetails.mobile_number?.slice(-3) || "000"}`
// //                       : userDetails.mobile_number || "N/A"
// //                   }
// //                   userEmail={
// //                     freeViewCount <= 0 && paidViewCount <= 0
// //                       ? userDetails.email
// //                         ? `*******${userDetails.email.slice(-3)}`
// //                         : "N/A"
// //                       : userDetails.email || "N/A"
// //                   }
// //                   showUpgradePrompt={freeViewCount <= 0 && paidViewCount <= 0}
// //                 />
// //               )}
// //             <div
// //               className="flex items-center justify-center w-10 h-10 bg-white rounded-md cursor-pointer detail-icon-btn"
// //               onClick={() => {
// //                 if (propertyDetails.is_favorite) {
// //                   removeFromFavoritesRecommendedProperty(
// //                     propertyDetails.favorite_id,
// //                   );
// //                 } else {
// //                   addToFavoritesRecommendedProperty(propertyDetails._id);
// //                 }
// //               }}
// //             >
// //               <FiHeart
// //                 className={`text-2xl ${propertyDetails.is_favorite
// //                   ? "text-red-600 fill-red-600"
// //                   : "text-gray-600"
// //                   }`}
// //               />
// //             </div>

// //             <div
// //               className="flex items-center justify-center w-8 h-8 bg-white rounded-md cursor-pointer sm:w-10 sm:h-10 detail-icon-btn"
// //               onClick={() => {
// //                 setIsShareModalOpen(true);
// //               }}
// //             >
// //               <FiShare2 className="text-xl text-gray-600 sm:text-2xl" />
// //             </div>
// //           </div>
// //         </div>

// //         {/* Image Section & Contact Form */}
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-2 h-auto md:h-[550px] detail-main-grid">
// //           {/* Left Side Image Section */}
// //           <div className="grid grid-cols-1 col-span-2 gap-1 md:grid-cols-1 detail-left-col">
// //             {/* Image Section */}
// //             <div className="flex flex-col gap-2 mt-6 md:flex-row detail-image-row">
// //               {propertyImages.length === 0 ? (
// //                 <div className="w-full relative">
// //                   <img
// //                     src={propertyDetails?.cover_image}
// //                     alt="Main"
// //                     className="rounded-2xl w-full h-64 md:h-[400px] object-cover detail-cover-image"
// //                   />
// //                   {/* Watermark */}
// //                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
// //                     <span className="text-4xl md:text-3xl font-extrabold text-white rotate-[-30deg] opacity-40 select-none">
// //                       ApnaGhar
// //                     </span>
// //                   </div>
// //                 </div>
// //               ) : (
// //                 <>
// //                   {/* Left Side - Main Image */}
// //                   <div className="md:basis-[60%]">
// //                     <div className="relative">
// //                       <img
// //                         src={propertyDetails.cover_image}
// //                         alt="Main"
// //                         className="rounded-2xl w-full h-64 md:h-[400px] object-cover detail-cover-image"
// //                       />
// //                       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
// //                         <span className="text-4xl md:text-3xl font-extrabold text-white rotate-[-30deg] opacity-40 select-none">
// //                           ApnaGhar
// //                         </span>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* Right Side - Video on Top + One Image Below */}
// //                   <div className="md:basis-[40%] flex flex-col justify-start gap-2 px-2">
// //                     {/* Property Main Image Section */}
// //                     <div
// //                       className="relative cursor-pointer"
// //                       onClick={() => setShowAllImages(true)}
// //                     >
// //                       {propertyImages.length > 0 && (
// //                         <div className="relative">
// //                           <img
// //                             src={propertyImages[0].image}
// //                             alt="Preview"
// //                             className="rounded-2xl w-full h-48 md:h-[195px] object-cover detail-gallery-image"
// //                           />
// //                           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
// //                             <span className="text-4xl md:text-3xl font-extrabold text-white rotate-[-30deg] opacity-40 select-none">
// //                               ApnaGhar
// //                             </span>
// //                           </div>
// //                         </div>
// //                       )}
// //                     </div>

// //                     {/* Property Additional Images Section */}
// //                     {propertyImages.length > 1 && (
// //                       <div className="grid grid-cols-1 gap-2 mt-2">
// //                         {(() => {
// //                           const filteredImages = propertyImages.filter(
// //                             (img) => img.image !== propertyDetails.cover_image,
// //                           );

// //                           // Case 1: No images after filtering → Don’t render
// //                           if (filteredImages.length === 0) {
// //                             return null;
// //                           }

// //                           // Case 2: Only one image → Don’t render second section
// //                           if (filteredImages.length === 1) {
// //                             return null;
// //                           }

// //                           // Case 3: More than one image → Render the 2nd preview + overlay
// //                           return (
// //                             <div
// //                               className="relative cursor-pointer"
// //                               onClick={() => setShowAllImages(true)}
// //                             >
// //                               <div className="relative">
// //                                 <img
// //                                   src={filteredImages[1]?.image}
// //                                   alt="Preview"
// //                                   className="rounded-2xl w-full h-48 md:h-[190px] object-cover detail-gallery-image"
// //                                 />
// //                                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
// //                                   <span className="text-4xl md:text-3xl font-extrabold text-white rotate-[-30deg] opacity-40 select-none">
// //                                     ApnaGhar
// //                                   </span>
// //                                 </div>
// //                               </div>
// //                               {filteredImages.length > 1 && (
// //                                 <div className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-white bg-black bg-opacity-50 rounded-2xl">
// //                                   {(() => {
// //                                     const count =
// //                                       filteredImages.length -
// //                                       1 +
// //                                       (propertyDetails?.property_video ? 1 : 0);

// //                                     return count > 0 ? (
// //                                       <div className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-white bg-black bg-opacity-50 rounded-2xl">
// //                                         +{count} View All
// //                                       </div>
// //                                     ) : null;
// //                                   })()}
// //                                 </div>
// //                               )}
// //                             </div>
// //                           );
// //                         })()}
// //                       </div>
// //                     )}
// //                   </div>
// //                 </>
// //               )}
// //             </div>
// //             {/* Navigation Tabs */}
// //             <div className="sticky top-0 z-20 flex items-center gap-8 px-6 py-4 mb-4 bg-white rounded-lg shadow-sm detail-tabs">
// //               <button
// //                 onClick={() => scrollToSection(overviewRef, "overview")}
// //                 className={`relative font-medium pb-1 detail-tab-btn ${activeSection === "overview"
// //                   ? "text-red-600"
// //                   : "hover:text-[#8A2432]"
// //                   }`}
// //               >
// //                 Overview
// //                 {activeSection === "overview" && (
// //                   <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-red-500 rounded-full"></span>
// //                 )}
// //               </button>

// //               <button
// //                 onClick={() =>
// //                   scrollToSection(statusTimelineRef, "statusTimeline")
// //                 }
// //                 className={`relative font-medium pb-1 detail-tab-btn ${activeSection === "statusTimeline"
// //                   ? "text-red-600"
// //                   : "hover:text-[#8A2432]"
// //                   }`}
// //               >
// //                 Status & Timeline
// //                 {activeSection === "statusTimeline" && (
// //                   <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-red-500 rounded-full"></span>
// //                 )}
// //               </button>
// //               <button
// //                 onClick={() => scrollToSection(moreDetailsRef, "moreDetails")}
// //                 className={`relative font-medium pb-1 detail-tab-btn ${activeSection === "moreDetails"
// //                   ? "text-red-600"
// //                   : "hover:text-[#8A2432]"
// //                   }`}
// //               >
// //                 More Details
// //                 {activeSection === "moreDetails" && (
// //                   <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-red-500 rounded-full"></span>
// //                 )}
// //               </button>

// //               <button
// //                 onClick={() => scrollToSection(amenitiesRef, "amenities")}
// //                 className={`relative font-medium pb-1 detail-tab-btn ${activeSection === "amenities"
// //                   ? "text-red-600"
// //                   : "hover:text-[#8A2432]"
// //                   }`}
// //               >
// //                 Amenities
// //                 {activeSection === "amenities" && (
// //                   <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-red-500 rounded-full"></span>
// //                 )}
// //               </button>

// //               <button
// //                 onClick={() => scrollToSection(aboutRef, "about")}
// //                 className={`relative font-medium pb-1 detail-tab-btn ${activeSection === "about"
// //                   ? "text-red-600"
// //                   : "hover:text-[#8A2432]"
// //                   }`}
// //               >
// //                 About Property
// //                 {activeSection === "about" && (
// //                   <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-red-500 rounded-full"></span>
// //                 )}
// //               </button>

// //               <button
// //                 onClick={() => scrollToSection(locationRef, "location")}
// //                 className={`relative font-medium pb-1 detail-tab-btn ${activeSection === "location"
// //                   ? "text-red-600"
// //                   : "hover:text-[#8A2432]"
// //                   }`}
// //               >
// //                 Location
// //                 {activeSection === "location" && (
// //                   <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-red-500 rounded-full"></span>
// //                 )}
// //               </button>
// //             </div>
// //             {/* Add the Overview Component Below */}
// //             {overviewFields.length > 0 && (
// //               <div
// //                 ref={overviewRef}
// //                 className="w-full p-4 bg-white rounded-lg shadow-sm scroll-mt-20"
// //               >
// //                 <h3 className="mb-4 text-3xl font-semibold">Overview</h3>
// //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-[18px]">
// //                   {overviewFields.map(([key, value], index) => (
// //                     <div
// //                       key={index}
// //                       className="flex justify-start p-2 border-gray-200"
// //                     >
// //                       <span className="w-1/2 text-gray-500">{key}</span>
// //                       <span className="text-black">{value}</span>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}
// //             {statusTimelineItems.length > 0 && (
// //               <div
// //                 ref={statusTimelineRef}
// //                 className="w-full p-5 mt-4 bg-white rounded-lg shadow-sm scroll-mt-20"
// //               >
// //                 <h3 className="mb-5 text-2xl font-semibold text-gray-800">
// //                   Status & Timeline
// //                 </h3>

// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                   {statusTimelineItems.map((item, index) => (
// //                     <div
// //                       key={index}
// //                       className={`flex items-start p-4 rounded-xl border border-gray-200 ${item.bgColor}`}
// //                     >
// //                       {/* Icon */}
// //                       <div
// //                         className={`w-10 h-10 rounded-full flex items-center justify-center ${item.bgColor}`}
// //                       >
// //                         <span className={`text-xl ${item.iconColor}`}>
// //                           {item.icon}
// //                         </span>
// //                       </div>

// //                       {/* Content */}
// //                       <div className="ml-4 flex-1">
// //                         <p className="text-sm text-gray-500">
// //                           {item.title}
// //                         </p>

// //                         <p className="mt-1 text-base font-semibold text-gray-800 break-words">
// //                           {item.value}
// //                         </p>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}

// //             {/* More Details Section */}
// //             {/* {moreDetailsFields.length > 0 && (
// //               <div className="w-full p-4 mt-4 bg-white rounded-lg shadow-sm">
// //                 <h3 className="mb-4 ml-2 text-3xl font-semibold">
// //                   More Details
// //                 </h3>
// //                 <table className="min-w-full table-auto text-left text-[16px] text-black ml-2">
// //                   <tbody>
// //                     {moreDetailsFields.map(([label, value], index) => (
// //                       <tr key={index} className="align-top">
// //                         <td className="py-1 pr-2 text-gray-500 sm:pr-6 md:pr-12 lg:pr-20 whitespace-nowrap">
// //                           {label}:
// //                         </td>
// //                         <td className="py-1 pl-1 break-words">{value}</td>
// //                       </tr>
// //                     ))}
// //                   </tbody>
// //                 </table>
// //               </div>
// //             )} */}

// //             {moreDetailsFields.length > 0 && (
// //               <div
// //                 ref={moreDetailsRef}
// //                 className="w-full p-4 mt-4 bg-white rounded-lg shadow-sm scroll-mt-20"
// //               >
// //                 <h3 className="mb-4 text-xl font-semibold text-gray-800">
// //                   More Details
// //                 </h3>
// //                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4">
// //                   {moreDetailsFields.map(([label, value], index) => (
// //                     <div key={index} className="flex flex-col">
// //                       <span className="text-xs text-gray-500 uppercase tracking-wide">
// //                         {label}
// //                       </span>
// //                       <span className="text-sm font-semibold text-gray-800 mt-0.5">
// //                         {value}
// //                       </span>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}

// //             {/* Amenities Section */}
// //             <div
// //               ref={amenitiesRef}
// //               className="w-full p-3 mt-4 bg-white rounded-lg shadow-sm scroll-mt-20"
// //             >
// //               <h3 className="ml-4 font-semibold text-lm">Amenities</h3>
// //               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 mt-4 ml-4 text-[18px]">
// //                 {visibleAmenities.map((amenity, index) => (
// //                   <p key={index} className="flex items-center text-lg">
// //                     {amenity.icon ? (
// //                       <img
// //                         src={`${process.env.REACT_APP_API_URL}/media/${amenity.icon}`}
// //                         alt={amenity.name}
// //                         className="w-10 h-10 mr-2"
// //                       />
// //                     ) : (
// //                       <PiCricketThin className="mr-2 text-lg text-black" />
// //                     )}
// //                     {amenity.name}
// //                   </p>
// //                 ))}
// //               </div>
// //               {!showAll && allAmenities.length > 8 && (
// //                 <p
// //                   className="mt-2 ml-4 font-bold my-text cursor-pointer "
// //                   onClick={() => setShowAll(true)}
// //                 >
// //                   +{allAmenities.length - 8} More
// //                 </p>
// //               )}
// //             </div>

// //             {/* About Property Section */}
// //             <div
// //               ref={aboutRef}
// //               className="bg-white shadow-sm mt-4 rounded-2xl p-3 h-auto md:h-[250px] w-full scroll-mt-20"
// //             >
// //               <h2 className="justify-center ml-4 font-bold text-gray-700 text-ml">
// //                 About property
// //               </h2>
// //               <p className="mt-3 text-gray-700 justify-center ml-4 text-[18px]">
// //                 {aboutPropertyText}
// //               </p>
// //             </div>

// //             {/* Location Section with Map */}
// //             <div
// //               ref={locationRef}
// //               className="bg-white shadow-sm mt-4 rounded-2xl p-3 h-auto md:h-[600px] w-full scroll-mt-20"
// //             >
// //               <h2 className="ml-4 text-3xl font-bold text-gray-900">
// //                 Location
// //               </h2>
// //               <div className="mt-4 overflow-hidden rounded-lg">
// //                 <iframe
// //                   className="w-full h-48 md:h-[450px] rounded-2xl"
// //                   src={`https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
// //                   allowFullScreen
// //                   loading="lazy"
// //                 ></iframe>
// //               </div>
// //             </div>
// //           </div>
// //           {/* Right Side Contact Form with Increased Height */}
// //           <div className="sticky top-0 flex flex-col max-h-screen pt-4 overflow-auto detail-enquiry-col">
// //             <div className="bg-white shadow-lg rounded-2xl p-4 min-h-[650px] flex flex-col justify-between detail-enquiry-card">
// //               <div>
// //                 <h3 className="mb-5 text-xl font-semibold">Make an Enquiry</h3>
// //                 <div className="flex items-center pb-3 mb-6 space-x-6 border-b-2 border-black detail-agent-row">
// //                   <Link
// //                     to={`/agentdetail/${userDetails?._id}`}
// //                     onClick={() =>
// //                       window.scrollTo({ top: 0, behavior: "smooth" })
// //                     }
// //                     className="block overflow-hidden no-underline shadow-md rounded-2xl hover:no-underline"
// //                   >
// //                     <img
// //                       src={
// //                         userDetails?.profile_image
// //                           ? userDetails?.profile_image
// //                           : "/image/app.png"
// //                       }
// //                       alt="Agent"
// //                       className="object-contain w-16 h-16 rounded-full"
// //                     />
// //                   </Link>
// //                   <div className="flex flex-col items-center">
// //                     <span className="text-lg font-semibold">
// //                       {userDetails.full_name || "N/A"}
// //                     </span>
// //                     <span className="text-sm font-semibold">
// //                       {userDetails.user_type || "N/A"}
// //                     </span>
// //                   </div>
// //                 </div>

// //                 <form onSubmit={handleEnquirySubmit} className="flex flex-col">
// //                   <input
// //                     type="text"
// //                     placeholder="Name"
// //                     value={name}
// //                     onChange={(e) => {
// //                       setName(e.target.value);
// //                       handleFieldChange();
// //                     }}
// //                     className="w-full p-3 mb-4 text-lg border rounded-md outline-none focus:ring-2 focus:ring-rose-500"
// //                     required
// //                   />
// //                   <input
// //                     type="text"
// //                     placeholder="Phone Number"
// //                     value={contactNumber}
// //                     readOnly
// //                     className="w-full p-3 mb-4 text-lg border rounded-md outline-none focus:ring-2 focus:ring-rose-500"
// //                   />

// //                   {/* IMPORTANT: TextArea wrapper Div with 'relative' */}
// //                   <div className="relative w-full mb-4">
// //                     <textarea
// //                       placeholder="Message"
// //                       value={message}
// //                       maxLength={255}
// //                       onChange={(e) => {
// //                         setMessage(e.target.value);
// //                         handleFieldChange();
// //                       }}
// //                       className="w-full h-28 p-3 pb-7 pr-16 text-base border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-rose-500 resize-none block"
// //                       required
// //                     ></textarea>
// //                     {/* Counter inside the textarea box */}
// //                     <span className="absolute bottom-2 right-3 text-xs text-gray-400 pointer-events-none select-none z-10">
// //                       {message.length}/255
// //                     </span>
// //                   </div>

// //                   <button
// //                     type="submit"
// //                     className="w-full mt-2 py-4 text-lg text-white my-bg rounded-lg"
// //                   >
// //                     Send an Enquiry
// //                   </button>
// //                 </form>
// //               </div>

// //               {enquiryStatus && (
// //                 <div
// //                   className={`text-center mt-4 text-lg ${enquiryStatus.type === "success"
// //                     ? "text-green-600"
// //                     : "text-red-600"
// //                     }`}
// //                 >
// //                   {enquiryStatus.message}
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Modal for Viewing All Images */}
// //         {showAllImages && (
// //           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
// //             <div className="bg-white p-6 rounded-lg w-[80%] h-[80%] overflow-auto">
// //               <button
// //                 className="absolute text-3xl text-white top-4 right-4"
// //                 onClick={() => setShowAllImages(false)}
// //               >
// //                 ×
// //               </button>
// //               <h2 className="mb-4 text-2xl font-semibold">Gallery</h2>
// //               <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
// //                 {propertyImages.map((img, index) => (
// //                   <div className="relative">
// //                     <img
// //                       key={index}
// //                       src={img.image}
// //                       alt={`Room ${index + 1}`}
// //                       className="object-cover w-full h-48 rounded-lg"
// //                     />
// //                     <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
// //                       <span className="text-4xl md:text-3xl font-extrabold text-white rotate-[-30deg] opacity-40 select-none">
// //                         ApnaGhar
// //                       </span>
// //                     </div>
// //                   </div>
// //                 ))}

// //                 {/* Property  Video at the end */}
// //                 {propertyDetails?.property_video && (
// //                   <video
// //                     controls
// //                     className="rounded-2xl w-full h-48 md:h-[195px] object-cover"
// //                   >
// //                     <source
// //                       src={propertyDetails.property_video}
// //                       type="video/mp4"
// //                     />
// //                     Your browser does not support the video tag.
// //                   </video>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {/* Exclusive Recommended Section */}
// //         <div className="w-full px-2 sm:px-6 lg:px-4">
// //           <div className="flex flex-col items-start justify-between gap-3 px-2 sm:px-4 pt-3 mb-3 sm:flex-row sm:items-center">
// //             <div className="flex flex-col">
// //               <h2 className="mb-2 text-xl font-bold tracking-wide text-gray-800 sm:text-2xl lg:text-3xl">
// //                 Exclusive Recommended
// //               </h2>
// //               <p className="text-gray-500"></p>
// //             </div>

// //             <div className="flex items-center w-full sm:w-auto justify-between sm:justify-end mt-2 space-x-3 sm:space-x-5 sm:mt-0">
// //               <button
// //                 className="px-4 py-2 text-xs sm:text-sm text-rose-700 bg-white my-border rounded-lg sm:px-6"
// //                 onClick={handleClick}
// //               >
// //                 View All Properties
// //               </button>

// //               <div className="hidden sm:flex items-center space-x-3">
// //                 <button
// //                   className="p-2 text-lg font-semibold text-gray-700 bg-white rounded-full shadow-md sm:text-2xl hover:shadow-lg"
// //                   onClick={() => sliderRef.current.slickPrev()}
// //                 >
// //                   <GoArrowLeft className="text-2xl sm:text-3xl text-black" />
// //                 </button>

// //                 <button
// //                   className="p-2 text-lg font-semibold text-gray-700 bg-white rounded-full shadow-md sm:text-2xl hover:shadow-lg"
// //                   onClick={() => sliderRef.current.slickNext()}
// //                 >
// //                   <GoArrowRight className="text-2xl sm:text-3xl text-black" />
// //                 </button>
// //               </div>
// //             </div>
// //           </div>

// //           <Slider {...settings} className="slider-container" ref={sliderRef}>
// //             {properties.map((property) => {
// //               let distance = null;
// //               if (userLocation && property.latitude && property.longitude) {
// //                 distance = calculateDistance(
// //                   userLocation.latitude,
// //                   userLocation.longitude,
// //                   parseFloat(property.latitude),
// //                   parseFloat(property.longitude),
// //                 ).toFixed(1);
// //               }

// //               const subtitle = (() => {
// //                 const area = property.address_area || "";
// //                 const city = property.city_name || "";

// //                 const location =
// //                   area.toLowerCase().includes(city.toLowerCase())
// //                     ? area
// //                     : `${area}, ${city}`;

// //                 const type =
// //                   property.property_type === "Office"
// //                     ? "Office Space"
// //                     : property.property_type === "Retail"
// //                       ? "Retail Space"
// //                       : property.property_type || "";

// //                 const category = property.property_category_type || "";

// //                 if (
// //                   category === "Commercial Buy" ||
// //                   category === "Commercial Lease"
// //                 ) {
// //                   return `${type} for ${category === "Commercial Buy" ? "Sale" : "Lease"
// //                     } in ${location}`;
// //                 }

// //                 if (
// //                   category.includes("PG") ||
// //                   category.includes("Co-Living") ||
// //                   category.includes("Coliving")
// //                 ) {
// //                   return `${type} for Rent in ${location}`;
// //                 }

// //                 const action = category === "Buy" ? "Sale" : category;

// //                 return `${property.bhk_type} ${type} for ${action} in ${location}`;
// //               })();

// //               function getValidImageUrl(img) {
// //                 if (typeof img !== "string") return null;
// //                 if (img.trim() === "") return null;
// //                 return img.startsWith("http") ? img : BASE_URL + img;
// //               }

// //               const coverImage = getValidImageUrl(property.cover_image);
// //               const additionalImages = (property.property_images || [])
// //                 .map((imgObj) => getValidImageUrl(imgObj?.image))
// //                 .filter(Boolean);
// //               const allImages = [
// //                 ...(coverImage ? [coverImage] : []),
// //                 ...additionalImages,
// //               ];

// //               return (
// //                 <div key={property._id} className="box-border h-full px-1.5 sm:px-2 pb-2">
// //                   <div className="flex flex-col h-full overflow-hidden bg-white shadow-md rounded-2xl">
// //                     <div className="relative">
// //                       <Link
// //                         to={`/propertydetails/${property._id}?property_owner_id=${property.user_id}`}
// //                         onClick={() =>
// //                           window.scrollTo({ top: 0, behavior: "smooth" })
// //                         }
// //                         className="block overflow-hidden no-underline bg-white border-2 rounded-lg hover:no-underline"
// //                       >
// //                         {allImages.length > 1 ? (
// //                           <Slider
// //                             key={`${property._id}-${allImages.length}`}
// //                             dots
// //                             infinite
// //                             speed={500}
// //                             slidesToShow={1}
// //                             slidesToScroll={1}
// //                             arrows
// //                             autoplay
// //                             autoplaySpeed={2000}
// //                             beforeChange={(current, next) =>
// //                               setActiveIndexes((prev) => ({
// //                                 ...prev,
// //                                 [property._id]: next,
// //                               }))
// //                             }
// //                             initialSlide={activeIndexes[property._id] || 0}
// //                             customPaging={(i) => {
// //                               const activeSlide =
// //                                 activeIndexes[property._id] || 0;
// //                               const isActive =
// //                                 i === activeSlide % allImages.length;
// //                               return (
// //                                 <div
// //                                   style={{
// //                                     width: "10px",
// //                                     height: "10px",
// //                                     borderRadius: "50%",
// //                                     background: isActive ? "#fff" : "#888",
// //                                     margin: "0 5px",
// //                                     cursor: "pointer",
// //                                   }}
// //                                 />
// //                               );
// //                             }}
// //                             appendDots={(dots) => (
// //                               <div
// //                                 style={{
// //                                   position: "absolute",
// //                                   bottom: "10px",
// //                                   left: "50%",
// //                                   transform: "translateX(-50%)",
// //                                   display: "flex",
// //                                   justifyContent: "center",
// //                                   width: "100%",
// //                                 }}
// //                               >
// //                                 {dots}
// //                               </div>
// //                             )}
// //                             className="rounded-t-2xl"
// //                           >
// //                             {allImages.map((imgUrl, idx) => (
// //                               <div key={`${property._id}-${idx}`}>
// //                                 <img
// //                                   src={imgUrl}
// //                                   alt="Property"
// //                                   className="object-cover w-full h-40 sm:h-44 md:h-48 rounded-t-2xl"
// //                                 />
// //                               </div>
// //                             ))}
// //                           </Slider>
// //                         ) : (
// //                           <img
// //                             src={allImages[0] || defaultImage}
// //                             alt="Property"
// //                             className="object-cover w-full h-40 sm:h-44 md:h-48 rounded-t-2xl"
// //                           />
// //                         )}
// //                       </Link>

// //                       {/* Virtual Tour & Favorite Button */}
// //                       <div className="absolute flex items-center space-x-2 top-2 right-2">
// //                         {property.virtual_tour_availability === "Yes" && (
// //                           <span className="flex items-center gap-1 px-2 py-1 text-xs font-normal text-white rounded-full bg-gray-800/60 backdrop-blur-sm">
// //                             <PiCubeFocus className="text-sm text-white" />
// //                             <span className="hidden sm:inline">Virtual Tour</span>
// //                           </span>
// //                         )}
// //                         <button
// //                           className="bg-gray-800/60 backdrop-blur-sm p-1.5 rounded-full shadow"
// //                           onClick={() => {
// //                             if (property.is_favorite) {
// //                               removeFromFavoritesRecommendedProperty(
// //                                 property.favorite_id,
// //                               );
// //                             } else {
// //                               addToFavoritesRecommendedProperty(property._id);
// //                             }
// //                           }}
// //                         >
// //                           <Heart
// //                             size={20}
// //                             stroke={property.is_favorite ? "none" : "white"}
// //                             color={
// //                               property.is_favorite
// //                                 ? "red"
// //                                 : "rgba(75, 85, 99, 0.4) "
// //                             }
// //                             fill={
// //                               property.is_favorite
// //                                 ? "red"
// //                                 : "rgba(75, 85, 99, 0.4) "
// //                             }
// //                             strokeWidth={2}
// //                           />
// //                         </button>
// //                       </div>

// //                       {/* FOR BUY / RENT / UNKNOWN Tag (Bottom Left) */}
// //                       <div className="absolute bottom-0 left-0">
// //                         {(() => {
// //                           const rawCategory =
// //                             property.property_category_type || "";

// //                           const normalizedCategory = rawCategory
// //                             .replace(/\s+/g, " ")
// //                             .replace(/-/g, " ")
// //                             .replace(/\//g, " ")
// //                             .trim()
// //                             .toLowerCase();

// //                           let badgeText = "UNKNOWN";
// //                           let badgeColor = "bg-[#8B1E3F]";

// //                           if (normalizedCategory === "buy") {
// //                             badgeText = "FOR BUY";
// //                             badgeColor = "bg-[#8B1E3F]";
// //                           } else if (normalizedCategory === "rent") {
// //                             badgeText = "FOR RENT";
// //                             badgeColor = "bg-[#8B1E3F]";
// //                           } else if (
// //                             normalizedCategory.includes("commercial buy")
// //                           ) {
// //                             badgeText = "COMMERCIAL BUY";
// //                             badgeColor = "bg-[#8B1E3F]";
// //                           } else if (
// //                             normalizedCategory.includes("commercial lease")
// //                           ) {
// //                             badgeText = "COMMERCIAL LEASE";
// //                             badgeColor = "bg-[#8B1E3F]";
// //                           } else if (
// //                             normalizedCategory.includes("pg") ||
// //                             normalizedCategory.includes("co living") ||
// //                             normalizedCategory.includes("coliving")
// //                           ) {
// //                             badgeText = "PG / CO-LIVING";
// //                             badgeColor = "bg-[#8B1E3F]";
// //                           } else if (
// //                             normalizedCategory.includes("residential")
// //                           ) {
// //                             badgeText = "RESIDENTIAL";
// //                             badgeColor = "bg-[#8B1E3F]";
// //                           }

// //                           return (
// //                             <span
// //                               className={`text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-se-lg ${badgeColor}`}
// //                             >
// //                               {badgeText}
// //                             </span>
// //                           );
// //                         })()}
// //                       </div>

// //                       {/* FEATURED Tag (Bottom Right) */}
// //                       <div className="absolute bottom-0 right-0">
// //                         {property.mark_as_featured === "Yes" && (
// //                           <span className="px-2 sm:px-3 py-1 text-[10px] sm:text-xs text-white bg-yellow-500 rounded-ss-lg">
// //                             FEATURED
// //                           </span>
// //                         )}
// //                       </div>
// //                     </div>

// //                     {/* Property Details — same design as AdvisorDashboard */}
// //                     <div className="flex flex-col flex-1 p-3 text-black bg-white">
// //                       <div className="flex items-start justify-between gap-2 sm:gap-3 mb-0">
// //                         <h3
// //                           className="flex-1 min-w-0 m-0 text-base sm:text-lg font-semibold leading-6 text-gray-900 truncate"
// //                           title={property.property_name}
// //                         >
// //                           {property.property_name || "N/A"}
// //                         </h3>
// //                         <span
// //                           className="flex-shrink-0 m-0 text-xs font-medium leading-6 text-black sm:text-sm whitespace-nowrap"
// //                           title={property.furnished_type}
// //                         >
// //                           {property.furnished_type || "Un-Furnished"}
// //                         </span>
// //                       </div>

// //                       <p
// //                         className="mt-0 mb-1 text-xs sm:text-sm leading-5 text-gray-600 truncate"
// //                         title={subtitle}
// //                       >
// //                         {subtitle}
// //                       </p>

// //                       <div className="flex flex-wrap items-center justify-between gap-y-1 mb-1">
// //                         <div className="flex flex-wrap items-center gap-2">
// //                           <span className="text-xl sm:text-2xl font-bold">
// //                             ₹{" "}
// //                             {property.property_category_type === "Rent"
// //                               ? formatPrice(property.rent)
// //                               : formatPrice(property.property_price)}
// //                           </span>
// //                           {property.property_category_type === "Rent" && (
// //                             <span className="text-xs sm:text-sm text-gray-500">
// //                               / {property.rent_duration}
// //                             </span>
// //                           )}
// //                           {property.property_category_type?.includes("Buy") &&
// //                             property.possession_status === "Ready To Move" && (
// //                               <div className="flex items-center gap-2 px-2 py-1 text-white border rounded-full bg-[#8B1E3F] border-[#8B1E3F] sm:px-3">
// //                                 <MdApartment className="text-base text-white" />
// //                                 <span className="text-xs font-semibold text-white whitespace-nowrap">
// //                                   Ready to Move
// //                                 </span>
// //                               </div>
// //                             )}
// //                         </div>
// //                         <div className="text-xs sm:text-sm font-medium whitespace-nowrap">
// //                           {property.property_category_type?.includes("Buy") &&
// //                             property.possession_status !== "Ready To Move" &&
// //                             property.possession_date && (
// //                               <>
// //                                 <span className="text-gray-500">
// //                                   Possession:
// //                                 </span>
// //                                 <span className="ml-1 font-semibold">
// //                                   {new Date(
// //                                     property.possession_date,
// //                                   ).toLocaleDateString("en-IN")}
// //                                 </span>
// //                               </>
// //                             )}
// //                         </div>
// //                       </div>

// //                       <div className="grid grid-cols-3 py-3 border-t border-b border-gray-100">
// //                         <div className="flex items-center gap-1 sm:gap-2 px-1 sm:px-3 min-w-0">
// //                           <MdApartment className="text-lg sm:text-[22px] text-gray-700 flex-shrink-0" />
// //                           <div className="flex flex-col justify-center min-w-0">
// //                             <p className="m-0 text-xs sm:text-sm font-semibold leading-4 truncate">
// //                               {property.building_type === "Commercial"
// //                                 ? property.property_type === "Office"
// //                                   ? "Office Space"
// //                                   : property.property_type === "Retail"
// //                                     ? "Retail Space"
// //                                     : property.property_type
// //                                 : property.property_category_type?.includes(
// //                                   "PG",
// //                                 )
// //                                   ? `${property.bathroom || 0} Bathrooms`
// //                                   : property.bhk_type}
// //                             </p>
// //                             <p className="m-0 text-[10px] sm:text-xs leading-4 text-gray-500 truncate">
// //                               {property.building_type === "Commercial"
// //                                 ? "Property Type"
// //                                 : property.property_category_type?.includes(
// //                                   "PG",
// //                                 )
// //                                   ? "Bathrooms"
// //                                   : property.property_type}
// //                             </p>
// //                           </div>
// //                         </div>

// //                         <div className="flex items-center gap-1 sm:gap-2 px-1 sm:px-3 border-l border-gray-200 min-w-0">
// //                           {property.property_category_type?.includes("PG") ? (
// //                             <FaUser className="text-base sm:text-[20px] text-gray-700 flex-shrink-0" />
// //                           ) : (
// //                             <FaBath className="text-base sm:text-[20px] text-gray-700 flex-shrink-0" />
// //                           )}
// //                           <div className="flex flex-col justify-center min-w-0">
// //                             <p className="m-0 text-xs sm:text-sm font-semibold leading-4 truncate">
// //                               {property.property_category_type?.includes("PG")
// //                                 ? property.available_for
// //                                 : `${property.bathroom || 0} Baths`}
// //                             </p>
// //                             <p className="m-0 text-[10px] sm:text-xs leading-4 text-gray-500 truncate">
// //                               {property.property_category_type?.includes("PG")
// //                                 ? "Available For"
// //                                 : "Bathrooms"}
// //                             </p>
// //                           </div>
// //                         </div>

// //                         <div className="flex items-center gap-1 sm:gap-2 px-1 sm:px-3 border-l border-gray-200 min-w-0">
// //                           <RiRuler2Line className="text-lg sm:text-[22px] text-gray-700 flex-shrink-0" />
// //                           <div className="flex flex-col justify-center min-w-0">
// //                             <p className="m-0 text-xs sm:text-sm font-semibold leading-4 truncate">
// //                               {property.area} {property.area_in}
// //                             </p>
// //                             <p className="m-0 text-[10px] sm:text-xs leading-4 text-gray-500 truncate">
// //                               Built Up Area
// //                             </p>
// //                           </div>
// //                         </div>
// //                       </div>

// //                       <hr className="my-1 border-gray-100" />

// //                       <div className="flex flex-wrap items-center justify-between gap-y-1 pt-1 pb-2 text-[12px] sm:text-[13px] text-gray-600">
// //                         <div className="flex items-center flex-wrap min-w-0">
// //                           <div className="flex items-center">
// //                             <AiOutlineClockCircle className="mr-1 text-[15px] text-gray-700" />
// //                             <span className="truncate">
// //                               Posted by {property.user_type || "Owner"}
// //                             </span>
// //                           </div>
// //                           <span className="mx-2 text-gray-400">•</span>
// //                           <span className="whitespace-nowrap">
// //                             {property.days_since_created
// //                               ? `${property.days_since_created} days ago`
// //                               : "Recently"}
// //                           </span>
// //                           {distance && (
// //                             <>
// //                               <span className="mx-2 text-gray-400">•</span>
// //                               <div className="flex items-center whitespace-nowrap">
// //                                 <FaMapMarkerAlt className="mr-1 text-red-500" />
// //                                 {distance} km from you
// //                               </div>
// //                             </>
// //                           )}
// //                         </div>
// //                         <PiShareNetworkLight
// //                           className="ml-2 text-[20px] text-gray-500 cursor-pointer hover:text-blue-500"
// //                           onClick={() =>
// //                             openShareModal(
// //                               `${window.location.origin}/propertydetails/${property._id}`,
// //                               property._id,
// //                             )

// //                           }
// //                         />
// //                       </div>

// //                       <div className="flex flex-wrap items-center justify-between mt-auto pt-3 gap-2">
// //                         <div className="flex items-center min-w-0">
// //                           <div className="flex items-center justify-center flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 overflow-hidden rounded-full bg-blue-100">
// //                             {property.property_owner_image ? (
// //                               <img
// //                                 src={`${process.env.REACT_APP_API_URL}/media/${property.property_owner_image}`}
// //                                 alt="Owner"
// //                                 className="object-cover w-full h-full rounded-full"
// //                               />
// //                             ) : (
// //                               <AiOutlineUser className="text-blue-600" size={24} />
// //                             )}
// //                           </div>
// //                           <div className="flex flex-col ml-2 sm:ml-3 min-w-0">
// //                             <span
// //                               className="text-xs sm:text-sm font-semibold text-gray-900 truncate"
// //                               title={property.connect_to_name}
// //                             >
// //                               {property.connect_to_name || "Owner"}
// //                             </span>
// //                             <span className="text-[10px] sm:text-xs text-gray-500 truncate">
// //                               {property.user_type || "Owner"}
// //                             </span>
// //                           </div>
// //                         </div>

// //                         {/* RIGHT SIDE - Buttons */}
// //                         <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
// //                           {/* Contact */}
// //                           <div
// //                             className="flex items-center justify-center px-3 sm:px-4 h-8 sm:h-9 text-xs sm:text-sm font-semibold text-white bg-red-800 rounded-md cursor-pointer hover:bg-red-900 whitespace-nowrap"
// //                             onClick={() => {
// //                               const token =
// //                                 sessionStorage.getItem("accessToken");
// //                               if (token) {
// //                                 if (freeViewCount > 0) {
// //                                   handleAddCount(-1);
// //                                 } else if (paidViewCount > 0) {
// //                                   handleAddCount(-1);
// //                                 }
// //                                 setIsContactModalOpen(true);
// //                               } else {
// //                                 setOpenContactModalAfterLogin(true);
// //                                 setIsLoginModalOpen(true);
// //                               }
// //                             }}
// //                           >
// //                             Contact
// //                           </div>

// //                           {/* WhatsApp */}
// //                           <a
// //                             href={`https://wa.me/91${property.connect_to_no}?text=Hello, I am interested in your property`}
// //                             target="_blank"
// //                             rel="noopener noreferrer"
// //                             onClick={(e) => e.stopPropagation()}
// //                             className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 text-white bg-green-500 rounded-md hover:bg-green-600"
// //                           >
// //                             <FaWhatsapp />
// //                           </a>

// //                           {/* Call */}
// //                           <a
// //                             href={`tel:${property.connect_to_no}`}
// //                             onClick={(e) => e.stopPropagation()}
// //                             className="flex items-center justify-center w-9 h-9 flex-shrink-0 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
// //                           >
// //                             <FaPhoneAlt className="text-base" />
// //                           </a>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               );
// //             })}
// //           </Slider>
// //         </div>
// //         {isShareModalOpen && (
// //           <ShareModal
// //             currentShareUrl={window.location.href}
// //             closeShareModal={handleCloseShareModal}
// //             copyLink={() => {
// //               const url = window.location.href;

// //               if (navigator.clipboard && window.isSecureContext) {
// //                 navigator.clipboard
// //                   .writeText(url)
// //                   .then(() => alert("Link copied!"))
// //                   .catch((err) => {
// //                     console.error(err);
// //                     fallbackCopyTextToClipboard(url);
// //                   });
// //               } else {
// //                 fallbackCopyTextToClipboard(url);
// //               }

// //               function fallbackCopyTextToClipboard(text) {
// //                 const textArea = document.createElement("textarea");
// //                 textArea.value = text;
// //                 textArea.style.position = "fixed";
// //                 textArea.style.left = "-9999px";
// //                 document.body.appendChild(textArea);
// //                 textArea.focus();
// //                 textArea.select();

// //                 try {
// //                   const successful = document.execCommand("copy");
// //                   alert(successful ? "Link copied!" : "Copy failed");
// //                 } catch (err) {
// //                   console.error("Fallback: Could not copy text: ", err);
// //                   alert("Copy failed");
// //                 }

// //                 document.body.removeChild(textArea);
// //               }
// //             }}
// //           />
// //         )}

// //         {isShareModalOpen && (
// //           <div className="absolute right-0 z-50">
// //             <ShareModal
// //               currentShareUrl={currentShareUrl}
// //               closeShareModal={handleCloseShareModal}
// //               copyLink={() => {
// //                 navigator.clipboard.writeText(currentShareUrl);
// //                 alert("Link copied!");
// //               }}
// //             />
// //           </div>
// //         )}

// //         {/* Modals */}
// //         {isLoggedIn ? (
// //           <div>Welcome, {contactNumber}</div> // Display logged-in content
// //         ) : (
// //           <>
// //             <Login1
// //               isOpen={isLoginModalOpen}
// //               onClose={() => setIsLoginModalOpen(false)}
// //               onSwitchToSignUp={() => {
// //                 setIsLoginModalOpen(false);
// //                 setIsSignUpModalOpen(true); // Open sign-up modal
// //               }}
// //               onLoginSuccess={handleLoginSuccess} // Pass the callback to Login1 component
// //             />
// //             <SignUp1
// //               isOpen={isSignUpModalOpen}
// //               onClose={() => setIsSignUpModalOpen(false)}
// //               onSwitchToLogin={() => {
// //                 setIsSignUpModalOpen(false);
// //                 setIsLoginModalOpen(true); // Open login modal
// //               }}
// //             />
// //           </>
// //         )}
// //         {/* Share Modal */}
// //         {isShareModalOpen && (
// //           <ShareModal
// //             currentShareUrl={window.location.href}
// //             closeShareModal={handleCloseShareModal}
// //             copyLink={() => {
// //               navigator.clipboard.writeText(window.location.href);
// //               alert("Link copied!");
// //             }}
// //           />
// //         )}
// //       </div>
// //     </>
// //   );
// // };

// // export default Detail;


// // =======================2 Changes ====================


// // import { React, useState, useRef, useEffect } from "react";
// // import { FaBed, FaBath, FaRupeeSign } from "react-icons/fa";
// // import { ToWords } from "to-words";
// // import { MdLocationOn } from "react-icons/md";
// // import { FiShare2, FiHeart } from "react-icons/fi";
// // import { FaHome } from "react-icons/fa";
// // import { IoMdBed } from "react-icons/io";
// // import { BiArea } from "react-icons/bi";
// // import { MdOutlineLocationOn } from "react-icons/md";
// // import { GoArrowLeft, GoArrowRight } from "react-icons/go";
// // import { FaHeart } from "react-icons/fa";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import { FaUser } from "react-icons/fa";
// // import { faVideo } from "@fortawesome/free-solid-svg-icons";
// // import { AiOutlineGlobal } from "react-icons/ai";
// // import { FaRulerCombined } from "react-icons/fa";
// // import { faChair } from "@fortawesome/free-solid-svg-icons";
// // import { MdOutlineBedroomParent } from "react-icons/md";
// // import { AiOutlineUser, AiOutlineClockCircle } from "react-icons/ai";
// // import { BiShapeSquare } from "react-icons/bi";
// // import { PiShareNetworkLight } from "react-icons/pi";
// // import { FaPhoneAlt } from "react-icons/fa";
// // import axios from "axios";
// // import {
// //   HiOutlineBadgeCheck,
// //   HiOutlineCalendar,
// //   HiOutlineHome,
// //   HiOutlineClock,
// // } from "react-icons/hi";
// // import { FaMoneyBillWave } from "react-icons/fa";
// // import { Link } from "react-router-dom";
// // import Slider from "react-slick";
// // import "slick-carousel/slick/slick.css";
// // import "slick-carousel/slick/slick-theme.css";
// // import "../styles/RecommendedProperties.css";
// // import "../styles/DetailResponsive.css";
// // import { BsHouseDoorFill, BsArrowsFullscreen } from "react-icons/bs";
// // import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
// // import { useHistory } from "react-router-dom"; // import for routing
// // import { PiCubeFocus, PiCricketThin } from "react-icons/pi";
// // import { useParams, useLocation } from "react-router-dom";
// // import { useCity } from "./SearchContext";
// // import { toast } from "react-toastify";
// // import { FiUser } from "react-icons/fi";
// // import Login1 from "../auth/Login1";
// // import SignUp1 from "../auth/SignUp1";
// // import GetScheduleVTourproperty from "../containers/GetScheduleVTourproperty";
// // import { HiOutlineArrowRight } from "react-icons/hi"; // thinner arrow
// // import ShareModal from "../containers/ShareModal";
// // import ContactDetails from "../containers/ContactDetails";
// // import { Heart, Building2 } from "lucide-react";
// // import { RiRuler2Line } from "react-icons/ri";
// // import { MdApartment } from "react-icons/md";
// // import { FaWhatsapp, FaPhone } from "react-icons/fa";
// // import { FaMapMarkerAlt } from "react-icons/fa";

// // const defaultImage = "/image/appstore.png";
// // const userLocation = JSON.parse(sessionStorage.getItem("userLocation"));
// // const formatDateToDDMMYYYY = (dateVal, fallbackDate = null) => {
// //   if (!dateVal || dateVal.toString().trim() === "" || dateVal.toString().toLowerCase() === "null") {
// //     return dateVal;
// //   }

// //   let dateObj;
// //   if (dateVal.toString().trim().toLowerCase() === "immediately") {
// //     dateObj = fallbackDate ? new Date(fallbackDate) : new Date();
// //   } else {
// //     dateObj = new Date(dateVal);
// //   }

// //   if (isNaN(dateObj.getTime())) {
// //     return dateVal;
// //   }

// //   const day = String(dateObj.getDate()).padStart(2, "0");
// //   const month = String(dateObj.getMonth() + 1).padStart(2, "0");
// //   const year = dateObj.getFullYear();
// //   return `${day}/${month}/${year}`;
// // };

// // function calculateDistance(lat1, lon1, lat2, lon2) {
// //   const R = 6371;
// //   const dLat = (lat2 - lat1) * (Math.PI / 180);
// //   const dLon = (lon2 - lon1) * (Math.PI / 180);
// //   const a =
// //     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
// //     Math.cos(lat1 * (Math.PI / 180)) *
// //     Math.cos(lat2 * (Math.PI / 180)) *
// //     Math.sin(dLon / 2) *
// //     Math.sin(dLon / 2);
// //   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
// //   return R * c;
// // }
// // const Detail = ({ propertyData }) => {
// //   const toWords = new ToWords({
// //     localeCode: "en-IN",
// //     converterOptions: {
// //       currency: false,
// //       ignoreDecimal: true,
// //       ignoreZeroCurrency: true,
// //     },
// //   });
// //   // const [showAllImages, setShowAllImages] = useState(false);
// //   const [savedProperties, setSavedProperties] = useState([]);
// //   const [properties, setProperties] = useState([]);
// //   // const [isLoggedIn, setIsLoggedIn] = useState(false);
// //   const sliderRef = useRef(null);
// //   const overviewRef = useRef(null);
// //   const moreDetailsRef = useRef(null);
// //   const amenitiesRef = useRef(null);
// //   const aboutRef = useRef(null);
// //   const locationRef = useRef(null);
// //   const statusTimelineRef = useRef(null);
// //   const [activeSection, setActiveSection] = useState("overview");
// //   const [currentShareUrl1, setcurrentShareUrl1] = useState("");
// //   const [propertyDetails, setPropertyDetails] = useState({});
// //   const userId = sessionStorage.getItem("accessToken");
// //   const history = useHistory();
// //   const { searchCity } = useCity();
// //   const [currentShareUrl, setCurrentShareUrl] = useState("");
// //   const [activeShareId, setActiveShareId] = useState(null);
// //   const [tourSchedule, setTourSchedule] = useState([]);

// //   const [freeViewCount, setFreeViewCount] = useState(0);
// //   const [paidViewCount, setPaidViewCount] = useState(0);

// //   const formatArea = (area, unit) => {
// //     if (!area) return null;

// //     const formattedUnit = unit ? unit.trim().toLowerCase() : "";

// //     return `${area} ${formattedUnit}`;
// //   };
// //   const scrollToSection = (ref, key) => {
// //     setActiveSection(key);
// //     ref.current?.scrollIntoView({
// //       behavior: "smooth",
// //       block: "start",
// //     });
// //   };
// //   const checkPostLimits = async () => {
// //     try {
// //       const profileForm = new FormData();
// //       profileForm.append("user_id", userId);

// //       const profileResponse = await axios.post(
// //         `${process.env.REACT_APP_API_URL}/cust_api/get_profile`,
// //         profileForm,
// //         {
// //           headers: {
// //             "Content-Type": "multipart/form-data",
// //           },
// //         },
// //       );

// //       const countData = profileResponse?.data?.count_data;

// //       if (countData) {
// //         setFreeViewCount(countData.free_view_count || 0);
// //         setPaidViewCount(countData.paid_view_count || 0);
// //       }
// //     } catch (error) {
// //       console.error("Error checking post limits:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     if (userId) {
// //       checkPostLimits();
// //     }
// //   }, [userId]);

// //   const handleAddCount = async (updatedCount) => {
// //     try {
// //       const addCountFormData = new FormData();
// //       if (freeViewCount > 0) {
// //         addCountFormData.append("free_view_count", updatedCount);
// //       } else {
// //         addCountFormData.append("paid_view_count", updatedCount);
// //       }
// //       addCountFormData.append("user_id", userId);

// //       const response = await fetch(
// //         `${process.env.REACT_APP_API_URL}/cust_api/add_count`,
// //         {
// //           method: "POST",
// //           body: addCountFormData,
// //         },
// //       );

// //       const data = await response.json();

// //       if (response.ok) {
// //         checkPostLimits();
// //       } else {
// //         console.error("Failed to update count:", data.message);
// //       }
// //     } catch (error) {
// //       console.error("API error:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     // const userId = sessionStorage.getItem("AccessToken");
// //     if (userId) {
// //       setIsLoggedIn(true);
// //       fetchSavedProperties(userId);
// //     } else {
// //       setIsLoggedIn(false);
// //     }
// //   }, []);

// //   const fetchSavedProperties = async () => {
// //     // const userId = sessionStorage.getItem("AccessToken");
// //     try {
// //       const response = await axios.post(
// //         `${process.env.REACT_APP_API_URL}/cust_api/get_favorite_properties`,
// //         { user_id: userId },
// //       );
// //       if (response.data.status === 1 && Array.isArray(response.data.data)) {
// //         const savedIds = response.data.data.map((prop) => prop._id);
// //         setSavedProperties(savedIds);
// //       } else {
// //         setSavedProperties([]);
// //         console.error("No saved properties found.");
// //       }
// //     } catch (error) {
// //       console.error("Error fetching saved properties:", error);
// //     }
// //   };

// //   const fetchRecommendedProperties = async () => {
// //     try {
// //       const cityName =
// //         searchCity && searchCity.trim() !== ""
// //           ? searchCity.trim()
// //           : sessionStorage.getItem("cityName") || "";
// //       const response = await axios.post(
// //         `${process.env.REACT_APP_API_URL}/cust_api/get_featured_property`,
// //         {
// //           user_id: userId,
// //           city_name: cityName,
// //         },
// //       );
// //       if (response.data.status === 1 && Array.isArray(response.data.data)) {
// //         setProperties(response.data.data);
// //       } else {
// //         setProperties([]);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching recommended properties:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchRecommendedProperties();
// //   }, []);

// //   //add to favorite started
// //   const [isFavorite, setIsFavorite] = useState(false);
// //   const [favoriteId, setFavoriteId] = useState(null); // Store the favorite_id for removal

// //   // Check if the property is a favorite on page load or when propertyDetails changes
// //   const checkIfFavorite = async (propertyId) => {
// //     // const userId = sessionStorage.getItem("accessToken");
// //     if (!userId || !propertyId) return;

// //     try {
// //       const response = await axios.post(
// //         `${process.env.REACT_APP_API_URL}/cust_api/get_favorite_properties`,
// //         { user_id: userId },
// //       );

// //       const favoriteList = response.data.data || [];
// //       const matchedFavorite = favoriteList.find(
// //         (fav) => String(fav._id) === String(propertyId),
// //       );

// //       if (matchedFavorite) {
// //         setIsFavorite(true);
// //         setFavoriteId(matchedFavorite.favorite_id); // Save favorite_id for removal
// //       } else {
// //         setIsFavorite(false);
// //         setFavoriteId(null);
// //       }
// //     } catch (error) {
// //       console.error("Error checking favorite status:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     checkIfFavorite(propertyDetails?._id);
// //   }, [propertyDetails?._id]);

// //   //  Add to favorites
// //   const addToFavorites = async () => {
// //     if (!userId) {
// //       setIsLoginModalOpen(true);
// //       return;
// //     }

// //     try {
// //       const response = await axios.post(
// //         `${process.env.REACT_APP_API_URL}/cust_api/add_to_favorite`,
// //         {
// //           user_id: userId,
// //           property_id: propertyDetails._id,
// //         },
// //       );
// //       setIsFavorite(true); // Immediately set isFavorite to true
// //       checkIfFavorite(_id); // Save the favorite_id from the response
// //       toast.success("Property has been saved to your favorites!");
// //       fetchPropertyDetails(_id);
// //       fetchRecommendedProperties();
// //     } catch (error) {
// //       console.error("Error adding property to favorites:", error);
// //       toast.error("Failed to save the property. Please try again.");
// //     }
// //   };

// //   // Remove from favorites
// //   const removeFromFavorites = async () => {
// //     if (!favoriteId) return;

// //     try {
// //       await axios.delete(
// //         `${process.env.REACT_APP_API_URL}/cust_api/remove_from_favorite`,
// //         { data: { favorite_id: favoriteId } }, // DELETE request with body
// //       );

// //       toast.success("Property removed from your favorites.");
// //       checkIfFavorite(_id);
// //       fetchPropertyDetails(_id);
// //       fetchRecommendedProperties();
// //     } catch (error) {
// //       console.error("Error removing property from favorites:", error);
// //       toast.error("Failed to remove the property. Please try again.");
// //     }
// //   };

// //   //  Add to favorites
// //   const addToFavoritesRecommendedProperty = async (PropertyId) => {
// //     if (!userId) {
// //       setIsLoginModalOpen(true);
// //       return;
// //     }

// //     try {
// //       const response = await axios.post(
// //         `${process.env.REACT_APP_API_URL}/cust_api/add_to_favorite`,
// //         {
// //           user_id: userId,
// //           property_id: PropertyId,
// //         },
// //       );
// //       checkIfFavorite(_id);
// //       fetchPropertyDetails(_id);
// //       fetchRecommendedProperties();
// //     } catch (error) {
// //       console.log("Failed to save the property. Please try again.");
// //     }
// //   };

// //   // Remove from favorites
// //   const removeFromFavoritesRecommendedProperty = async (FavoriteId) => {
// //     try {
// //       await axios.delete(
// //         `${process.env.REACT_APP_API_URL}/cust_api/remove_from_favorite`,
// //         { data: { favorite_id: FavoriteId } },
// //       );

// //       checkIfFavorite(_id);
// //       fetchPropertyDetails(_id);
// //       fetchRecommendedProperties();
// //     } catch (error) {
// //       console.log("Failed to remove the property. Please try again.");
// //     }
// //   };

// //   // Slider settings
// //   const [activeIndexes, setActiveIndexes] = useState({});
// //   const BASE_URL = process.env.REACT_APP_API_URL;
// //   const settings = {
// //     infinite: true,
// //     slidesToShow: 4,
// //     lazyLoad: "ondemand",
// //     slidesToScroll: 1,
// //     autoplay: true,
// //     autoplaySpeed: 3000,
// //     arrows: false,
// //     cssEase: "linear",
// //     centerMode: false,
// //     centerPadding: "0px",
// //     responsive: [
// //       {
// //         breakpoint: 1399,
// //         settings: {
// //           slidesToShow: 3,
// //           slidesToScroll: 1,
// //         },
// //       },
// //       {
// //         breakpoint: 1023,
// //         settings: {
// //           slidesToShow: 2,
// //           slidesToScroll: 1,
// //         },
// //       },
// //       {
// //         breakpoint: 767,
// //         settings: {
// //           slidesToShow: 1,
// //           slidesToScroll: 1,
// //         },
// //       },
// //     ],
// //   };
// //   const openShareModal1 = (url) => {
// //     setcurrentShareUrl1(url);
// //     const modal = document.getElementById("shareModal1");
// //     if (modal) {
// //       modal.style.display = "block";
// //     }
// //   };

// //   const openShareModal = (url, propertyId) => {
// //     setCurrentShareUrl(url);
// //     setActiveShareId(propertyId);
// //     setIsShareModalOpen(true);
// //   };

// //   const formatPrice = (price) => {
// //     if (price === null || price === undefined || price === "") return "";

// //     price = Number(price);

// //     if (price >= 10000000) {
// //       return (price / 10000000).toFixed(2).replace(/\.?0+$/, "") + " Cr";
// //     } else if (price >= 100000) {
// //       return (price / 100000).toFixed(2).replace(/\.?0+$/, "") + " L";
// //     } else if (price >= 1000) {
// //       return (price / 1000).toFixed(2).replace(/\.?0+$/, "") + " K";
// //     } else {
// //       return price.toString();
// //     }
// //   };

// //   // for the image section with 'get_property_detail' api

// //   const { _id } = useParams();
// //   const location = useLocation();
// //   const property_owner_id = location.state?.property_owner_id;
// //   const [aboutPropertyText, setAboutPropertyText] = useState("");

// //   const [showAll, setShowAll] = useState(false);
// //   const [allAmenities, setAllAmenities] = useState([]);
// //   const visibleAmenities = showAll ? allAmenities : allAmenities.slice(0, 8);

// //   const [propertyImages, setPropertyImages] = useState([]);
// //   const [showAllImages, setShowAllImages] = useState(false);
// //   const [longitude, setLongitude] = useState(0);
// //   const [latitude, setLatitude] = useState(0);
// //   const [userDetails, setuserDetails] = useState({
// //     full_name: "",
// //     mobile_number: "",
// //     email: "",
// //   });

// //   const user_id = sessionStorage.getItem("accessToken");
// //   useEffect(() => {
// //     const customer_id = user_id;

// //     if (propertyDetails?._id && propertyDetails?.user_id && customer_id) {
// //       const formData = new FormData();
// //       formData.append("property_id", propertyDetails?._id);
// //       formData.append("user_id", propertyDetails?.user_id);
// //       formData.append("customer_id", customer_id);

// //       axios
// //         .post(
// //           `${process.env.REACT_APP_API_URL}/cust_api/add_view_property`,
// //           formData,
// //         )
// //         .then((res) => {
// //           if (res.data?.status === 1) {
// //             console.log("View property recorded");
// //           }
// //         })
// //         .catch((err) => {
// //           console.error("Failed to record property view:", err);
// //         });
// //     }
// //   }, [propertyDetails?._id, user_id]);

// //   useEffect(() => {
// //     window.scrollTo(0, 0);
// //   }, []);

// //   const fetchPropertyDetails = async (id) => {
// //     try {
// //       const res = await axios.post(
// //         `${process.env.REACT_APP_API_URL}/cust_api/get_property_details`,
// //         { property_id: id, user_id: userId },
// //       );

// //       const data = res.data?.data;
// //       console.log("API Response:", data);
// //       console.log("Price Onwards:", data.price_onwards);

// //       if (data?.property_images?.length > 0) {
// //         setPropertyImages(data.property_images);
// //       } else {
// //         setPropertyImages([]);
// //       }

// //       if (data?.amenities?.length > 0) {
// //         setAllAmenities(data.amenities);
// //       } else {
// //         setAllAmenities([]);
// //       }

// //       if (
// //         data?.tour_schedule?.length > 0 &&
// //         data.tour_schedule[0].status !== "Rejected" &&
// //         data.tour_schedule[0].status !== "Expired"
// //       ) {
// //         setTourSchedule(data.tour_schedule);
// //         const dateParts = data.tour_schedule[0].schedule_date.split("-");
// //         const year = dateParts[0].slice(-2); // "25"
// //         const month = parseInt(dateParts[1], 10) - 1; // month index
// //         const day = parseInt(dateParts[2], 10); // 24

// //         const monthName = new Date(0, month).toLocaleString("default", {
// //           month: "short",
// //         });

// //         const scheduledLabel = `Scheduled ${day} ${monthName} ${year}`;
// //         setScheduledDateLabel(scheduledLabel);
// //       } else {
// //         setTourSchedule([]);
// //         setScheduledDateLabel("Virtual Tour");
// //       }

// //       if (data?.property_details?.property_description) {
// //         setAboutPropertyText(data.property_details.property_description);
// //       } else {
// //         setAboutPropertyText("");
// //       }

// //       if (data?.property_details) {
// //         setPropertyDetails(data.property_details);
// //       } else {
// //         setPropertyDetails({});
// //       }

// //       if (
// //         data?.user_details &&
// //         Array.isArray(data.user_details) &&
// //         data.user_details.length > 0
// //       ) {
// //         setuserDetails(data.user_details[0]);
// //       } else {
// //         setuserDetails({
// //           full_name: "N/A",
// //           mobile_number: "N/A",
// //           email: "N/A",
// //         });
// //         console.warn("user_details is empty or invalid:", data?.user_details);
// //       }

// //       const pd = data.property_details;
// //       setLatitude(pd.latitude);
// //       setLongitude(pd.longitude);
// //     } catch (err) {
// //       console.error("Error fetching property details", err);
// //       setPropertyImages([]);
// //       setAllAmenities([]);
// //       setTourSchedule([]);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchPropertyDetails(_id);
// //   }, [_id]);

// //   // for send Enquiry 'add_property_enquiry' api

// //   const [name, setName] = useState("");
// //   const [message, setMessage] = useState("");
// //   const [contactNumber, setContactNumber] = useState("");
// //   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
// //   const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// //   const [enquiryStatus, setEnquiryStatus] = useState(null); // success or error

// //   // Existing useEffect (on mount)
// //   useEffect(() => {
// //     const mobileNumber = sessionStorage.getItem("Mobile_Number");
// //     if (mobileNumber) {
// //       setContactNumber(mobileNumber);
// //     }
// //   }, []);

// //   //  New useEffect to check sessionStorage and update contact number after login
// //   useEffect(() => {
// //     let interval;

// //     if (isLoginModalOpen === false && !contactNumber) {
// //       interval = setInterval(() => {
// //         const mobileNumber = sessionStorage.getItem("Mobile_Number");
// //         if (mobileNumber) {
// //           setContactNumber(mobileNumber);
// //           clearInterval(interval); // Stop checking once we have it
// //         }
// //       }, 500); // Check every 500ms
// //     }

// //     return () => clearInterval(interval); // Cleanup
// //   }, [isLoginModalOpen, contactNumber]);

// //   const userType = sessionStorage.getItem("user_type");
// //   // Handle Enquiry Form submission
// //   const handleEnquirySubmit = async (e) => {
// //     e.preventDefault();

// //     const accessToken = sessionStorage.getItem("accessToken");

// //     if (!accessToken) {
// //       setIsLoginModalOpen(true);
// //       return;
// //     }

// //     const enquiryData = {
// //       property_id: propertyDetails?._id,
// //       user_id: propertyDetails?.user_id,
// //       customer_id: accessToken,
// //       name,
// //       user_type: userType,
// //       contact_number: contactNumber,
// //       message,
// //     };

// //     try {
// //       const response = await axios.post(
// //         `${process.env.REACT_APP_API_URL}/cust_api/add_property_enquiry`,
// //         enquiryData,
// //       );

// //       if (response.data.status) {
// //         setEnquiryStatus({
// //           type: "success",
// //           message: "Enquiry sent successfully!",
// //         });
// //         setName("");
// //         setMessage("");
// //       } else {
// //         setEnquiryStatus({ type: "error", message: "Failed to send enquiry!" });
// //       }
// //     } catch (error) {
// //       setEnquiryStatus({ type: "error", message: "Something went wrong!" });
// //     }
// //   };

// //   // Trigger login modal on input if not logged in
// //   const handleFieldChange = () => {
// //     const accessToken = sessionStorage.getItem("accessToken");
// //     if (!accessToken) {
// //       setIsLoginModalOpen(true);
// //     }
// //   };

// //   const handleLoginSuccess = () => {
// //     const mobileNumber = sessionStorage.getItem("Mobile_Number");
// //     if (mobileNumber) {
// //       setIsLoggedIn(true);
// //       setContactNumber(mobileNumber);
// //       setIsLoginModalOpen(false);
// //     }
// //   };

// //   // for the schedule virtula tour
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [scheduledDateLabel, setScheduledDateLabel] = useState("Virtual Tour");
// //   const [openVirtualTourAfterLogin, setOpenVirtualTourAfterLogin] =
// //     useState(false);
// //   useEffect(() => {
// //     const token = sessionStorage.getItem("accessToken");
// //     if (token && openVirtualTourAfterLogin) {
// //       setIsModalOpen(true); // Open Virtual Tour
// //       setOpenVirtualTourAfterLogin(false); // Reset flag
// //     }
// //   }, [isLoggedIn]);

// //   // for share model
// //   const [openShareModalAfterLogin, setOpenShareModalAfterLogin] =
// //     useState(false);
// //   const [isShareModalOpen, setIsShareModalOpen] = useState(false);
// //   useEffect(() => {
// //     const token = sessionStorage.getItem("accessToken");
// //     if (token && openShareModalAfterLogin) {
// //       setIsShareModalOpen(true); // Open Share modal
// //       setOpenShareModalAfterLogin(false); // Reset flag
// //     }
// //   }, [isLoggedIn]);

// //   const handleCloseShareModal = () => {
// //     setIsShareModalOpen(false);
// //   };

// //   //for the contact details
// //   const [isContactModalOpen, setIsContactModalOpen] = useState(false);
// //   const [openContactModalAfterLogin, setOpenContactModalAfterLogin] =
// //     useState(false);

// //   const userName = sessionStorage.getItem("user_name");
// //   const userMobile = sessionStorage.getItem("Mobile_Number");

// //   useState(false);
// //   useEffect(() => {
// //     if (sessionStorage.getItem("accessToken") && openContactModalAfterLogin) {
// //       setIsContactModalOpen(true);
// //       setOpenContactModalAfterLogin(false);
// //     }
// //   }, [openContactModalAfterLogin]);

// //   // Add this line below all useState declarations or just before return:
// //   const overviewFields = [
// //     //["Status", propertyDetails?.available_status || null],
// //     ["Property Added Date", propertyDetails?.property_added_date || null],
// //     ["Property Name", propertyDetails?.property_name || null],
// //     // [
// //     //   "Address",
// //     //   propertyDetails?.address &&
// //     //   propertyDetails?.city_name &&
// //     //   propertyDetails?.state &&
// //     //   propertyDetails?.zip_code
// //     //     ? `${propertyDetails.address}, ${propertyDetails.city_name}, ${propertyDetails.state}, ${propertyDetails.zip_code}`
// //     //     : null,
// //     // ],
// //     [
// //       "Address",
// //       propertyDetails?.address || null,
// //     ],
// //     [
// //       "Area",
// //       propertyDetails?.area
// //         ? formatArea(propertyDetails.area, propertyDetails.area_in)
// //         : null,
// //     ],
// //     ["Area Type", propertyDetails?.area_type || null],
// //     [
// //       "Price",
// //       propertyDetails?.property_category_type === "Rent"
// //         ? propertyDetails?.rent
// //           ? `₹${formatPrice(propertyDetails.rent)}`
// //           : null
// //         : propertyDetails?.property_price
// //           ? `₹${formatPrice(propertyDetails.property_price)}`
// //           : null,
// //     ],
// //     [
// //       "Deposite",
// //       propertyDetails?.custom_deposit_amount
// //         ? `₹${formatPrice(propertyDetails.custom_deposit_amount)}`
// //         : null,
// //     ],
// //     ["Listing Type", propertyDetails?.property_category_type || null],
// //     // ["Developer", propertyDetails?.developer || null],
// //     ["Building Type", propertyDetails?.building_type || null],
// //     ["Property Type", propertyDetails?.property_type || null],
// //     [
// //       "Bhk Type",
// //       propertyDetails?.bhk_type === "Studio"
// //         ? "Studio/Single Room"
// //         : propertyDetails?.bhk_type || null,
// //     ],
// //     ["Furnishing", propertyDetails?.furnished_type || null],
// //     // ["Plot No.", propertyDetails?.plot_no || null],
// //     ["Operating Since", propertyDetails?.operating_since || null],
// //     [
// //       "Available for Company Lease",
// //       propertyDetails?.available_for_company_lease || null,
// //     ],
// //     ["Available For", propertyDetails?.available_for || null],
// //     ["Suited For", propertyDetails?.suited_for || null],
// //     ["Room Type", propertyDetails?.room_type || null],
// //     ["Food Charges Included", propertyDetails?.food_charges_included || null],
// //   ].filter(([_, value]) => value);

// //   //more details

// //   const moreDetailsFields = [
// //     ["Food Available", propertyDetails?.food_available || null],
// //     ["Notice Period", propertyDetails?.notice_period || null],
// //     [
// //       "Notice Period Other Days",
// //       propertyDetails?.notice_period_other_days || null,
// //     ],
// //     [
// //       "Electricity Charges Included",
// //       propertyDetails?.electricity_charges_included || null,
// //     ],
// //     ["Total Beds", propertyDetails?.total_beds || null],
// //     ["Additional Rooms", propertyDetails?.additional_rooms || null],
// //     ["PG Rules", propertyDetails?.pg_rules || null],
// //     ["Gate Closing Time", propertyDetails?.gate_closing_time || null],
// //     ["Gate Closing Hour", propertyDetails?.gate_closing_hour || null],
// //     ["PG Services", propertyDetails?.pg_services || null],
// //     ["Age of Property", propertyDetails?.age_of_property || null],
// //     ["Office Space Type", propertyDetails?.office_space_type || null],
// //     ["Pantry", propertyDetails?.pantry || null],
// //     ["Personal Washroom", propertyDetails?.personal_washroom || null],
// //     ["Bathroom", propertyDetails?.bathroom || null],
// //     ["Covered Parking", propertyDetails?.covered_parking || null],
// //     ["Uncovered Parking", propertyDetails?.uncovered_parking || null],
// //     ["Balcony", propertyDetails?.balcony || null],
// //     ["Power Backup", propertyDetails?.power_backup || null],
// //     ["Lift Availability", propertyDetails?.lift_availability || null],
// //     ["Water Source", propertyDetails?.water_source || null],
// //     ["View", propertyDetails?.view || null],
// //     ["Flooring", propertyDetails?.flooring || null],
// //     ["Total Floor", propertyDetails?.total_floor || null],
// //     ["Property Floor", propertyDetails?.property_floor || null],
// //     ["Facing", propertyDetails?.facing || null],
// //     ["Ceiling Height", propertyDetails?.ceiling_height || null],
// //     ["Parking Availability", propertyDetails?.parking_availability || null],
// //     ["Min Lockin Period", propertyDetails?.min_lockin_period || null],
// //     ["Seat Type", propertyDetails?.seat_type || null],
// //     [
// //       "Number of Seats Available",
// //       propertyDetails?.number_of_seats_available || null,
// //     ],
// //     ["Plot No.", propertyDetails?.plot_no || null],
// //     // ["Loan Availability", propertyDetails?.loan_availability || null],
// //     //some other fileds
// //     ["RERA ID", propertyDetails?.property_no || null],
// //     ["Landmarks", propertyDetails?.landmarks || null],
// //     ["Furnishing", propertyDetails?.furnished_type || null],
// //     ["Near Landmark", propertyDetails?.near_landmark || null],
// //     ["Flat Name", propertyDetails?.flat_name || null],
// //     ["Maintenance Frequency", propertyDetails?.maintenance_frequency || null],
// //     [
// //       "Maintenance Included",
// //       propertyDetails?.maintenance_included ? "Yes" : "No",
// //     ],
// //     ["Security Deposit Type", propertyDetails?.security_deposit_type || null],
// //     [
// //       "Available for Company Lease",
// //       propertyDetails?.available_for_company_lease || null,
// //     ],
// //     ["Available For", propertyDetails?.available_for || null],
// //     ["Suited For", propertyDetails?.suited_for || null],
// //     ["Room Type", propertyDetails?.room_type || null],
// //     ["Food Charges Included", propertyDetails?.food_charges_included || null],
// //     // [
// //     //   "Virtual Tour Availability",
// //     //   propertyDetails?.virtual_tour_availability || null,
// //     // ],
// //     ["Property Category Type", propertyDetails?.property_category_type || null],
// //     ["Rent", propertyDetails?.rent || null],
// //     ["Rent Duration", propertyDetails?.rent_duration || null],
// //     ["Property Added Date", propertyDetails?.property_added_date ? formatDateToDDMMYYYY(propertyDetails.property_added_date) : null],
// //     ["Possession Status", propertyDetails?.possession_status || null],
// //     ["Possession Date", propertyDetails?.possession_date ? formatDateToDDMMYYYY(propertyDetails.possession_date) : null],

// //     ["Area Type", propertyDetails?.area_type || null],
// //     ["Built up Area", propertyDetails?.area || null],
// //     [
// //       "Built-up Area Unit",
// //       propertyDetails?.area_in ? propertyDetails.area_in.toLowerCase() : null,
// //     ],
// //     ["Carpet Area", propertyDetails?.carpet_area || null],
// //     [
// //       "Carpet Area Unit",
// //       propertyDetails?.carpet_area_unit
// //         ? propertyDetails.carpet_area_unit.toLowerCase()
// //         : null,
// //     ],
// //     ["Available Status", propertyDetails?.available_status || null],
// //     ["Investment Options", propertyDetails?.investment_options || null],
// //     ["All Inclusive Price", propertyDetails?.all_inclusive_price || null],
// //     ["Price Onwards", propertyDetails?.price_onwards || null],
// //     ["Price Negotiable", propertyDetails?.price_negotiable || null],
// //     [
// //       "Tax And Goverment Charges",
// //       propertyDetails?.tax_and_goverment_charges || null,
// //     ],
// //     [
// //       "Electricity And Water Charges",
// //       propertyDetails?.electricity_and_water_charges || null,
// //     ],
// //     ["No Of Open Sides", propertyDetails?.no_of_open_sides || null],
// //     ["No Of Peoples", propertyDetails?.no_of_peoples || null],
// //     ["Type Of Construction", propertyDetails?.type_of_construction || null],
// //     ["Quality Rating", propertyDetails?.quality_rating || null],
// //     ["Central AC", propertyDetails?.central_AC || null],
// //     ["Total Number Parking", propertyDetails?.total_number_parking || null],
// //     ["Block", propertyDetails?.block || null],
// //     ["Developer", propertyDetails?.developer || null],
// //     ["Project Type", propertyDetails?.project_type || null],
// //     ["Transaction Type", propertyDetails?.transaction_type || null],
// //     ["Builder Floor Type", propertyDetails?.builder_floor_type || null],
// //     // ["Attached Bathroom", propertyDetails?.attached_bathroom || null],
// //     // ["Attached Balcony", propertyDetails?.attached_balcony || null],
// //     // ["Pantry Option", propertyDetails?.pantry_option || null],
// //     // ["Parking Types", propertyDetails?.parking_types || null],
// //     ["Possession By", propertyDetails?.possession_by || null],
// //     [
// //       "Property Dimensions Length",
// //       propertyDetails?.property_dimensions_length || null,
// //     ],
// //     [
// //       "Property Dimensions Breadth",
// //       propertyDetails?.property_dimensions_breadth || null,
// //     ],
// //     ["Length Of Land", propertyDetails?.length_of_land || null],
// //     ["Breadth Of Land", propertyDetails?.breadthOfLand || null],
// //     ["Open Sides Of Land", propertyDetails?.openSidesOfLand || null],
// //     ["Construction On Land", propertyDetails?.constructionOnLand || null],
// //     [
// //       "Selected Construction On Land",
// //       propertyDetails?.selectedConstructionOnLand || null,
// //     ],
// //     ["Commercial Washroom", propertyDetails?.commercial_washroom || null],
// //     [
// //       "Number Of Minimum Bathrooms",
// //       propertyDetails?.number_of_minimum_bathrooms || null,
// //     ],
// //     ["Maintenance Cost", propertyDetails?.maintenance_cost || null],
// //     ["Available Beds", propertyDetails?.available_beds || null],
// //     [
// //       "Available From",
// //       propertyDetails?.possession_date || propertyDetails?.available_from
// //         ? formatDateToDDMMYYYY(
// //           propertyDetails?.possession_date || propertyDetails?.available_from,
// //           propertyDetails?.property_added_date
// //         )
// //         : null,
// //     ],
// //     ["Available On", propertyDetails?.available_on ? formatDateToDDMMYYYY(propertyDetails.available_on) : null],

// //     ["No Of Cabines", propertyDetails?.no_of_cabines || null],
// //     ["No Of Meeting Rooms", propertyDetails?.no_of_meeting_Rooms || null],
// //     ["No Of Conference Room", propertyDetails?.no_of_conference_room || null],
// //     // ["Posted By Admin", propertyDetails?.posted_by_admin || null],
// //     // ["UPS", propertyDetails?.ups || null],
// //     // ["Oxygen Duct", propertyDetails?.oxygenDuct || null],
// //     // ["Central AC", propertyDetails?.central_AC || null],
// //     // ["Conference Room", propertyDetails?.conferenceRoom || null],
// //     // ["Washroom", propertyDetails?.washroom || null],
// //     // ["Washroom Check", propertyDetails?.washroom_Check || null],
// //     ["Reception Area", propertyDetails?.reception_area || null],
// //     // ["Created At",
// //     //   propertyDetails?.created_at
// //     //     ? new Date(propertyDetails.created_at).toLocaleDateString("en-GB")
// //     //     : null,
// //     // ],

// //     // ["Updated At",
// //     //   propertyDetails?.updated_at
// //     //     ? new Date(propertyDetails.updated_at).toLocaleDateString("en-GB")
// //     //     : null,
// //     // ],
// //   ].filter(([_, value]) => value);
// //   const statusTimelineItems = [];

// //   const addStatusItem = ({
// //     icon,
// //     title,
// //     value,
// //     bgColor,
// //     iconColor,
// //   }) => {
// //     if (
// //       !value ||
// //       value.toString().trim() === "" ||
// //       value.toString().toLowerCase() === "n/a" ||
// //       value.toString().toLowerCase() === "null"
// //     ) {
// //       return;
// //     }

// //     statusTimelineItems.push({
// //       icon,
// //       title,
// //       value,
// //       bgColor,
// //       iconColor,
// //     });
// //   };
// //   addStatusItem({
// //     icon: <HiOutlineBadgeCheck />,
// //     title: "Availability",
// //     value: propertyDetails?.available_status,
// //     bgColor: "bg-green-50",
// //     iconColor: "text-green-600",
// //   });
// //   addStatusItem({
// //     icon: <HiOutlineCalendar />,
// //     title: "Available From",
// //     value: formatDateToDDMMYYYY(
// //       propertyDetails?.possession_date || propertyDetails?.available_from,
// //       propertyDetails?.property_added_date
// //     ),
// //     bgColor: "bg-blue-50",
// //     iconColor: "text-blue-600",
// //   });

// //   addStatusItem({
// //     icon: <HiOutlineHome />,
// //     title: "Possession",
// //     value: propertyDetails?.possession_status,
// //     bgColor: "bg-orange-50",
// //     iconColor: "text-orange-600",
// //   });

// //   addStatusItem({
// //     icon: <HiOutlineClock />,
// //     title: "Last Updated",
// //     value: propertyDetails?.updated_at
// //       ? formatDateToDDMMYYYY(propertyDetails.updated_at)
// //       : formatDateToDDMMYYYY(propertyDetails?.property_added_date),
// //     bgColor: "bg-purple-50",
// //     iconColor: "text-purple-600",
// //   });

// //   addStatusItem({
// //     icon: <HiOutlineClock />,
// //     title: "Property Age",
// //     value: propertyDetails?.age_of_property,
// //     bgColor: "bg-amber-50",
// //     iconColor: "text-amber-700",
// //   });

// //   const handleClick = () => {
// //     history.push("/featuredDashboard");
// //   };

// //   useEffect(() => {
// //     window.scrollTo(0, 0);
// //   }, []);

// //   // Prevent background scrolling when modal is open
// //   useEffect(() => {
// //     if (
// //       isShareModalOpen ||
// //       isContactModalOpen ||
// //       showAllImages ||
// //       isModalOpen
// //     ) {
// //       document.body.style.overflow = "hidden";
// //     } else {
// //       document.body.style.overflow = "auto";
// //     }

// //     // Cleanup when component unmounts
// //     return () => {
// //       document.body.style.overflow = "auto";
// //     };
// //   }, [isShareModalOpen, isContactModalOpen, showAllImages, isModalOpen]);

// //   const getTimeAgo = (dateString) => {
// //     if (!dateString) return "";

// //     const now = new Date();
// //     const created = new Date(dateString);

// //     const diffMs = now - created;

// //     const minutes = Math.floor(diffMs / (1000 * 60));
// //     const hours = Math.floor(diffMs / (1000 * 60 * 60));
// //     const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

// //     if (minutes < 60) {
// //       return `${minutes} min ago`;
// //     }

// //     if (hours < 24) {
// //       return `${hours} hr${hours > 1 ? "s" : ""} ago`;
// //     }

// //     if (days < 30) {
// //       return `${days} day${days > 1 ? "s" : ""} ago`;
// //     }

// //     const months = Math.floor(days / 30);

// //     if (months < 12) {
// //       return `${months} month${months > 1 ? "s" : ""} ago`;
// //     }

// //     const years = Math.floor(months / 12);

// //     return `${years} year${years > 1 ? "s" : ""} ago`;
// //   };

// //   return (
// //     <>
// //       <div className="max-w-full px-4 mx-auto sm:px-16 detail-page-container">
// //         {/* Property Details Section */}
// //         <div className="relative w-full h-auto p-2 mb-4 rounded-lg shadow-sm bg-rose-50 detail-header-card">
// //           {(propertyDetails?.property_price || propertyDetails?.rent) && (
// //             <div className="absolute top-4 right-4 flex flex-col items-end detail-price-block">
// //               <p className="flex items-center mt-5 text-3xl font-bold my-text">
// //                 <FaRupeeSign className="mr-2" />
// //                 {propertyDetails?.property_category_type === "Rent" ||
// //                   propertyDetails?.property_category_type === "PG/Co-living" ? (
// //                   <>
// //                     {formatPrice(propertyDetails?.rent)}{" "}
// //                     <span className="ml-1 text-xl text-gray-700">
// //                       / {propertyDetails?.rent_duration || "Per Month"}
// //                     </span>
// //                   </>
// //                 ) : (
// //                   formatPrice(propertyDetails?.property_price)
// //                 )}
// //               </p>
// //               <p className="mt-1 text-sm font-medium text-gray-500">
// //                 {propertyDetails?.property_category_type === "Rent" ||
// //                   propertyDetails?.property_category_type === "PG/Co-living"
// //                   ? `${toWords.convert(Number(propertyDetails?.rent))} Only`
// //                   : `${toWords.convert(Number(propertyDetails?.property_price))} Only`}
// //               </p>
// //             </div>
// //           )}

// //           {/* <h2 className="mt-2 ml-6 text-3xl font-normal">
// //             {propertyDetails?.bhk_type ? `${propertyDetails.bhk_type} ` : ""}
// //             {propertyDetails?.area ? `${propertyDetails.area} Sq-ft ` : ""}
// //             {propertyDetails?.property_type
// //               ? `${propertyDetails.property_type} `
// //               : ""}
// //             for {propertyDetails?.property_category_type
// //               ? `${propertyDetails.property_category_type}`
// //               : ""}
// //           </h2> */}

// //           <h2 className="mt-2 ml-6 text-3xl font-normal detail-title">
// //             {propertyDetails?.property_name
// //               ? `${propertyDetails.property_name} `
// //               : ""}
// //           </h2>

// //           <p className="ml-6 text-xl font-bold text-gray-700 break-words whitespace-normal max-w-[80ch] detail-address">
// //             <img
// //               src="/image/address_icon.png"
// //               alt="Address Icon"
// //               className="inline-block w-5 h-5 mr-2"
// //             />
// //             {propertyDetails?.address || "Address N/A"}
// //           </p>
// //           <div className="flex items-center mt-6 ml-5 space-x-8 detail-info-row">
// //             {propertyDetails?.bhk_type && (
// //               <div className="flex items-center space-x-2">
// //                 <FaBed className="text-2xl my-text" />
// //                 <span className="text-lg font-bold">
// //                   {propertyDetails.bhk_type}
// //                 </span>
// //               </div>
// //             )}

// //             {propertyDetails?.area && (
// //               <div className="flex items-center space-x-2">
// //                 <FaRulerCombined className="text-2xl my-text" />
// //                 <span className="text-lg font-bold">
// //                   {formatArea(propertyDetails.area, propertyDetails.area_in)}
// //                 </span>
// //               </div>
// //             )}

// //             {propertyDetails?.bathroom && (
// //               <div className="flex items-center space-x-2">
// //                 <FaBath className="text-2xl my-text" />
// //                 <span className="text-lg font-bold">
// //                   {propertyDetails.bathroom} Bathroom
// //                 </span>
// //               </div>
// //             )}
// //           </div>

// //           <div className="flex justify-end mt-6 space-x-4 detail-actions-row">
// //             {propertyDetails.virtual_tour_availability === "Yes" && (
// //               <button
// //                 className={`px-6 py-2 text-lg flex items-center gap-2 w-full sm:w-auto justify-center detail-action-btn
// //       ${tourSchedule?.[0]?.status === "Accepted"
// //                     ? "bg-green-500 text-white rounded-full"
// //                     : scheduledDateLabel === "Virtual Tour"
// //                       ? "bg-white border my-text rounded-lg"
// //                       : "bg-[#FFD700] text-black rounded-full"
// //                   }`}
// //                 onClick={() => {
// //                   const token = sessionStorage.getItem("accessToken");

// //                   if (scheduledDateLabel !== "Virtual Tour") {
// //                     history.push({
// //                       pathname: "/dashboard",
// //                       state: { page: "myVirtualtour" },
// //                     });
// //                   } else {
// //                     if (token) {
// //                       setIsModalOpen(true);
// //                     } else {
// //                       setOpenVirtualTourAfterLogin(true);
// //                       setIsLoginModalOpen(true);
// //                     }
// //                   }
// //                 }}
// //               >
// //                 <PiCubeFocus size={20} />
// //                 {scheduledDateLabel}
// //                 {scheduledDateLabel !== "Virtual Tour" && (
// //                   <HiOutlineArrowRight size={16} />
// //                 )}
// //               </button>
// //             )}

// //             {isModalOpen && (
// //               <GetScheduleVTourproperty
// //                 onClose={() => setIsModalOpen(false)}
// //                 propertyDetails={propertyDetails}
// //                 setScheduledDateLabel={setScheduledDateLabel}
// //                 setIsModalOpen={setIsModalOpen}
// //               />
// //             )}
// //             <div
// //               className="w-full px-3 py-1 text-sm text-white my-bg rounded-lg cursor-pointer sm:px-4 sm:py-2 sm:text-lg sm:w-auto detail-action-btn detail-contact-btn"
// //               onClick={() => {
// //                 const token = sessionStorage.getItem("accessToken");
// //                 if (token) {
// //                   if (!userDetails) {
// //                     // Avoid opening the modal if user data is missing
// //                     toast.error("User data not found");
// //                     return;
// //                   }

// //                   if (freeViewCount > 0) {
// //                     const updatedCount = -1;
// //                     setFreeViewCount(updatedCount);
// //                     handleAddCount(updatedCount);
// //                   } else if (paidViewCount > 0) {
// //                     const updatedCount = -1;
// //                     setPaidViewCount(updatedCount);
// //                     handleAddCount(updatedCount);
// //                   }

// //                   setIsContactModalOpen(true);
// //                 } else {
// //                   setOpenContactModalAfterLogin(true);
// //                   setIsLoginModalOpen(true);
// //                 }
// //               }}
// //             >
// //               Contact Details
// //             </div>
// //             {isContactModalOpen &&
// //               userDetails &&
// //               !Array.isArray(userDetails) &&
// //               userDetails.full_name && (
// //                 <ContactDetails
// //                   onClose={() => setIsContactModalOpen(false)}
// //                   fullName={
// //                     freeViewCount <= 0 && paidViewCount <= 0
// //                       ? `****${userDetails.full_name.slice(-1) || "N/A"}`
// //                       : userDetails.full_name || "N/A"
// //                   }
// //                   mobile={
// //                     freeViewCount <= 0 && paidViewCount <= 0
// //                       ? `********${userDetails.mobile_number?.slice(-3) || "000"}`
// //                       : userDetails.mobile_number || "N/A"
// //                   }
// //                   userEmail={
// //                     freeViewCount <= 0 && paidViewCount <= 0
// //                       ? userDetails.email
// //                         ? `*******${userDetails.email.slice(-3)}`
// //                         : "N/A"
// //                       : userDetails.email || "N/A"
// //                   }
// //                   showUpgradePrompt={freeViewCount <= 0 && paidViewCount <= 0}
// //                 />
// //               )}
// //             <div
// //               className="flex items-center justify-center w-10 h-10 bg-white rounded-md cursor-pointer detail-icon-btn"
// //               onClick={() => {
// //                 if (propertyDetails.is_favorite) {
// //                   removeFromFavoritesRecommendedProperty(
// //                     propertyDetails.favorite_id,
// //                   );
// //                 } else {
// //                   addToFavoritesRecommendedProperty(propertyDetails._id);
// //                 }
// //               }}
// //             >
// //               <FiHeart
// //                 className={`text-2xl ${propertyDetails.is_favorite
// //                   ? "text-red-600 fill-red-600"
// //                   : "text-gray-600"
// //                   }`}
// //               />
// //             </div>

// //             <div
// //               className="flex items-center justify-center w-8 h-8 bg-white rounded-md cursor-pointer sm:w-10 sm:h-10 detail-icon-btn"
// //               onClick={() => {
// //                 setIsShareModalOpen(true);
// //               }}
// //             >
// //               <FiShare2 className="text-xl text-gray-600 sm:text-2xl" />
// //             </div>
// //           </div>
// //         </div>

// //         {/* Image Section & Contact Form */}
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-2 h-auto md:h-[550px] detail-main-grid">
// //           {/* Left Side Image Section */}
// //           <div className="grid grid-cols-1 col-span-2 gap-1 md:grid-cols-1 detail-left-col">
// //             {/* Image Section */}
// //             <div className="flex flex-col gap-2 mt-6 md:flex-row detail-image-row">
// //               {propertyImages.length === 0 ? (
// //                 <div className="w-full relative">
// //                   <img
// //                     src={propertyDetails?.cover_image}
// //                     alt="Main"
// //                     className="rounded-2xl w-full h-64 md:h-[400px] object-cover detail-cover-image"
// //                   />
// //                   {/* Watermark */}
// //                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
// //                     <span className="text-4xl md:text-3xl font-extrabold text-white rotate-[-30deg] opacity-40 select-none">
// //                       ApnaGhar
// //                     </span>
// //                   </div>
// //                 </div>
// //               ) : (
// //                 <>
// //                   {/* Left Side - Main Image */}
// //                   <div className="md:basis-[60%]">
// //                     <div className="relative">
// //                       <img
// //                         src={propertyDetails.cover_image}
// //                         alt="Main"
// //                         className="rounded-2xl w-full h-64 md:h-[400px] object-cover detail-cover-image"
// //                       />
// //                       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
// //                         <span className="text-4xl md:text-3xl font-extrabold text-white rotate-[-30deg] opacity-40 select-none">
// //                           ApnaGhar
// //                         </span>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* Right Side - Video on Top + One Image Below */}
// //                   <div className="md:basis-[40%] flex flex-col justify-start gap-2 px-2">
// //                     {/* Property Main Image Section */}
// //                     <div
// //                       className="relative cursor-pointer"
// //                       onClick={() => setShowAllImages(true)}
// //                     >
// //                       {propertyImages.length > 0 && (
// //                         <div className="relative">
// //                           <img
// //                             src={propertyImages[0].image}
// //                             alt="Preview"
// //                             className="rounded-2xl w-full h-48 md:h-[195px] object-cover detail-gallery-image"
// //                           />
// //                           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
// //                             <span className="text-4xl md:text-3xl font-extrabold text-white rotate-[-30deg] opacity-40 select-none">
// //                               ApnaGhar
// //                             </span>
// //                           </div>
// //                         </div>
// //                       )}
// //                     </div>

// //                     {/* Property Additional Images Section */}
// //                     {propertyImages.length > 1 && (
// //                       <div className="grid grid-cols-1 gap-2 mt-2">
// //                         {(() => {
// //                           const filteredImages = propertyImages.filter(
// //                             (img) => img.image !== propertyDetails.cover_image,
// //                           );

// //                           // Case 1: No images after filtering → Don’t render
// //                           if (filteredImages.length === 0) {
// //                             return null;
// //                           }

// //                           // Case 2: Only one image → Don’t render second section
// //                           if (filteredImages.length === 1) {
// //                             return null;
// //                           }

// //                           // Case 3: More than one image → Render the 2nd preview + overlay
// //                           return (
// //                             <div
// //                               className="relative cursor-pointer"
// //                               onClick={() => setShowAllImages(true)}
// //                             >
// //                               <div className="relative">
// //                                 <img
// //                                   src={filteredImages[1]?.image}
// //                                   alt="Preview"
// //                                   className="rounded-2xl w-full h-48 md:h-[190px] object-cover detail-gallery-image"
// //                                 />
// //                                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
// //                                   <span className="text-4xl md:text-3xl font-extrabold text-white rotate-[-30deg] opacity-40 select-none">
// //                                     ApnaGhar
// //                                   </span>
// //                                 </div>
// //                               </div>
// //                               {filteredImages.length > 1 && (
// //                                 <div className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-white bg-black bg-opacity-50 rounded-2xl">
// //                                   {(() => {
// //                                     const count =
// //                                       filteredImages.length -
// //                                       1 +
// //                                       (propertyDetails?.property_video ? 1 : 0);

// //                                     return count > 0 ? (
// //                                       <div className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-white bg-black bg-opacity-50 rounded-2xl">
// //                                         +{count} View All
// //                                       </div>
// //                                     ) : null;
// //                                   })()}
// //                                 </div>
// //                               )}
// //                             </div>
// //                           );
// //                         })()}
// //                       </div>
// //                     )}
// //                   </div>
// //                 </>
// //               )}
// //             </div>
// //             {/* Navigation Tabs */}
// //             <div className="sticky top-0 z-20 flex items-center gap-8 px-6 py-4 mb-4 bg-white rounded-lg shadow-sm detail-tabs">
// //               <button
// //                 onClick={() => scrollToSection(overviewRef, "overview")}
// //                 className={`relative font-medium pb-1 detail-tab-btn ${activeSection === "overview"
// //                   ? "text-red-600"
// //                   : "hover:text-[#8A2432]"
// //                   }`}
// //               >
// //                 Overview
// //                 {activeSection === "overview" && (
// //                   <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-red-500 rounded-full"></span>
// //                 )}
// //               </button>

// //               <button
// //                 onClick={() =>
// //                   scrollToSection(statusTimelineRef, "statusTimeline")
// //                 }
// //                 className={`relative font-medium pb-1 detail-tab-btn ${activeSection === "statusTimeline"
// //                   ? "text-red-600"
// //                   : "hover:text-[#8A2432]"
// //                   }`}
// //               >
// //                 Status & Timeline
// //                 {activeSection === "statusTimeline" && (
// //                   <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-red-500 rounded-full"></span>
// //                 )}
// //               </button>
// //               <button
// //                 onClick={() => scrollToSection(moreDetailsRef, "moreDetails")}
// //                 className={`relative font-medium pb-1 detail-tab-btn ${activeSection === "moreDetails"
// //                   ? "text-red-600"
// //                   : "hover:text-[#8A2432]"
// //                   }`}
// //               >
// //                 More Details
// //                 {activeSection === "moreDetails" && (
// //                   <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-red-500 rounded-full"></span>
// //                 )}
// //               </button>

// //               <button
// //                 onClick={() => scrollToSection(amenitiesRef, "amenities")}
// //                 className={`relative font-medium pb-1 detail-tab-btn ${activeSection === "amenities"
// //                   ? "text-red-600"
// //                   : "hover:text-[#8A2432]"
// //                   }`}
// //               >
// //                 Amenities
// //                 {activeSection === "amenities" && (
// //                   <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-red-500 rounded-full"></span>
// //                 )}
// //               </button>

// //               <button
// //                 onClick={() => scrollToSection(aboutRef, "about")}
// //                 className={`relative font-medium pb-1 detail-tab-btn ${activeSection === "about"
// //                   ? "text-red-600"
// //                   : "hover:text-[#8A2432]"
// //                   }`}
// //               >
// //                 About Property
// //                 {activeSection === "about" && (
// //                   <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-red-500 rounded-full"></span>
// //                 )}
// //               </button>

// //               <button
// //                 onClick={() => scrollToSection(locationRef, "location")}
// //                 className={`relative font-medium pb-1 detail-tab-btn ${activeSection === "location"
// //                   ? "text-red-600"
// //                   : "hover:text-[#8A2432]"
// //                   }`}
// //               >
// //                 Location
// //                 {activeSection === "location" && (
// //                   <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-red-500 rounded-full"></span>
// //                 )}
// //               </button>
// //             </div>
// //             {/* Add the Overview Component Below */}
// //             {overviewFields.length > 0 && (
// //               <div
// //                 ref={overviewRef}
// //                 className="w-full p-4 bg-white rounded-lg shadow-sm scroll-mt-20"
// //               >
// //                 <h3 className="mb-4 text-3xl font-semibold">Overview</h3>
// //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-[18px]">
// //                   {overviewFields.map(([key, value], index) => (
// //                     <div
// //                       key={index}
// //                       className="flex justify-start p-2 border-gray-200"
// //                     >
// //                       <span className="w-1/2 text-gray-500">{key}</span>
// //                       <span className="text-black">{value}</span>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}
// //             {statusTimelineItems.length > 0 && (
// //               <div
// //                 ref={statusTimelineRef}
// //                 className="w-full p-5 mt-4 bg-white rounded-lg shadow-sm scroll-mt-20"
// //               >
// //                 <h3 className="mb-5 text-2xl font-semibold text-gray-800">
// //                   Status & Timeline
// //                 </h3>

// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                   {statusTimelineItems.map((item, index) => (
// //                     <div
// //                       key={index}
// //                       className={`flex items-start p-4 rounded-xl border border-gray-200 ${item.bgColor}`}
// //                     >
// //                       {/* Icon */}
// //                       <div
// //                         className={`w-10 h-10 rounded-full flex items-center justify-center ${item.bgColor}`}
// //                       >
// //                         <span className={`text-xl ${item.iconColor}`}>
// //                           {item.icon}
// //                         </span>
// //                       </div>

// //                       {/* Content */}
// //                       <div className="ml-4 flex-1">
// //                         <p className="text-sm text-gray-500">
// //                           {item.title}
// //                         </p>

// //                         <p className="mt-1 text-base font-semibold text-gray-800 break-words">
// //                           {item.value}
// //                         </p>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}

// //             {/* More Details Section */}
// //             {/* {moreDetailsFields.length > 0 && (
// //               <div className="w-full p-4 mt-4 bg-white rounded-lg shadow-sm">
// //                 <h3 className="mb-4 ml-2 text-3xl font-semibold">
// //                   More Details
// //                 </h3>
// //                 <table className="min-w-full table-auto text-left text-[16px] text-black ml-2">
// //                   <tbody>
// //                     {moreDetailsFields.map(([label, value], index) => (
// //                       <tr key={index} className="align-top">
// //                         <td className="py-1 pr-2 text-gray-500 sm:pr-6 md:pr-12 lg:pr-20 whitespace-nowrap">
// //                           {label}:
// //                         </td>
// //                         <td className="py-1 pl-1 break-words">{value}</td>
// //                       </tr>
// //                     ))}
// //                   </tbody>
// //                 </table>
// //               </div>
// //             )} */}

// //             {moreDetailsFields.length > 0 && (
// //               <div
// //                 ref={moreDetailsRef}
// //                 className="w-full p-4 mt-4 bg-white rounded-lg shadow-sm scroll-mt-20"
// //               >
// //                 <h3 className="mb-4 text-xl font-semibold text-gray-800">
// //                   More Details
// //                 </h3>
// //                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4">
// //                   {moreDetailsFields.map(([label, value], index) => (
// //                     <div key={index} className="flex flex-col">
// //                       <span className="text-xs text-gray-500 uppercase tracking-wide">
// //                         {label}
// //                       </span>
// //                       <span className="text-sm font-semibold text-gray-800 mt-0.5">
// //                         {value}
// //                       </span>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}

// //             {/* Amenities Section */}
// //             <div
// //               ref={amenitiesRef}
// //               className="w-full p-3 mt-4 bg-white rounded-lg shadow-sm scroll-mt-20"
// //             >
// //               <h3 className="ml-4 font-semibold text-lm">Amenities</h3>
// //               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 mt-4 ml-4 text-[18px]">
// //                 {visibleAmenities.map((amenity, index) => (
// //                   <p key={index} className="flex items-center text-lg">
// //                     {amenity.icon ? (
// //                       <img
// //                         src={`${process.env.REACT_APP_API_URL}/media/${amenity.icon}`}
// //                         alt={amenity.name}
// //                         className="w-10 h-10 mr-2"
// //                       />
// //                     ) : (
// //                       <PiCricketThin className="mr-2 text-lg text-black" />
// //                     )}
// //                     {amenity.name}
// //                   </p>
// //                 ))}
// //               </div>
// //               {!showAll && allAmenities.length > 8 && (
// //                 <p
// //                   className="mt-2 ml-4 font-bold my-text cursor-pointer "
// //                   onClick={() => setShowAll(true)}
// //                 >
// //                   +{allAmenities.length - 8} More
// //                 </p>
// //               )}
// //             </div>

// //             {/* About Property Section */}
// //             <div
// //               ref={aboutRef}
// //               className="bg-white shadow-sm mt-4 rounded-2xl p-3 h-auto md:h-[250px] w-full scroll-mt-20"
// //             >
// //               <h2 className="justify-center ml-4 font-bold text-gray-700 text-ml">
// //                 About property
// //               </h2>
// //               <p className="mt-3 text-gray-700 justify-center ml-4 text-[18px]">
// //                 {aboutPropertyText}
// //               </p>
// //             </div>

// //             {/* Location Section with Map */}
// //             <div
// //               ref={locationRef}
// //               className="bg-white shadow-sm mt-4 rounded-2xl p-3 h-auto md:h-[600px] w-full scroll-mt-20"
// //             >
// //               <h2 className="ml-4 text-3xl font-bold text-gray-900">
// //                 Location
// //               </h2>
// //               <div className="mt-4 overflow-hidden rounded-lg">
// //                 <iframe
// //                   className="w-full h-48 md:h-[450px] rounded-2xl"
// //                   src={`https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
// //                   allowFullScreen
// //                   loading="lazy"
// //                 ></iframe>
// //               </div>
// //             </div>
// //           </div>
// //           {/* Right Side Contact Form with Increased Height */}
// //           <div className="sticky top-0 flex flex-col max-h-screen pt-4 overflow-auto detail-enquiry-col">
// //             <div className="bg-white shadow-lg rounded-2xl p-4 min-h-[650px] flex flex-col justify-between detail-enquiry-card">
// //               <div>
// //                 <h3 className="mb-5 text-xl font-semibold">Make an Enquiry</h3>
// //                 <div className="flex items-center pb-3 mb-6 space-x-6 border-b-2 border-black detail-agent-row">
// //                   <Link
// //                     to={`/agentdetail/${userDetails?._id}`}
// //                     onClick={() =>
// //                       window.scrollTo({ top: 0, behavior: "smooth" })
// //                     }
// //                     className="block overflow-hidden no-underline shadow-md rounded-2xl hover:no-underline"
// //                   >
// //                     <img
// //                       src={
// //                         userDetails?.profile_image
// //                           ? userDetails?.profile_image
// //                           : "/image/app.png"
// //                       }
// //                       alt="Agent"
// //                       className="object-contain w-16 h-16 rounded-full"
// //                     />
// //                   </Link>
// //                   <div className="flex flex-col items-center">
// //                     <span className="text-lg font-semibold">
// //                       {userDetails.full_name || "N/A"}
// //                     </span>
// //                     <span className="text-sm font-semibold">
// //                       {userDetails.user_type || "N/A"}
// //                     </span>
// //                   </div>
// //                 </div>

// //                 <form onSubmit={handleEnquirySubmit} className="flex flex-col">
// //                   <input
// //                     type="text"
// //                     placeholder="Name"
// //                     value={name}
// //                     onChange={(e) => {
// //                       setName(e.target.value);
// //                       handleFieldChange();
// //                     }}
// //                     className="w-full p-3 mb-4 text-lg border rounded-md outline-none focus:ring-2 focus:ring-rose-500"
// //                     required
// //                   />
// //                   <input
// //                     type="text"
// //                     placeholder="Phone Number"
// //                     value={contactNumber}
// //                     readOnly
// //                     className="w-full p-3 mb-4 text-lg border rounded-md outline-none focus:ring-2 focus:ring-rose-500"
// //                   />

// //                   {/* IMPORTANT: TextArea wrapper Div with 'relative' */}
// //                   <div className="relative w-full mb-4">
// //                     <textarea
// //                       placeholder="Message"
// //                       value={message}
// //                       maxLength={255}
// //                       onChange={(e) => {
// //                         setMessage(e.target.value);
// //                         handleFieldChange();
// //                       }}
// //                       className="w-full h-28 p-3 pb-7 pr-16 text-base border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-rose-500 resize-none block"
// //                       required
// //                     ></textarea>
// //                     {/* Counter inside the textarea box */}
// //                     <span className="absolute bottom-2 right-3 text-xs text-gray-400 pointer-events-none select-none z-10">
// //                       {message.length}/255
// //                     </span>
// //                   </div>

// //                   <button
// //                     type="submit"
// //                     className="w-full mt-2 py-4 text-lg text-white my-bg rounded-lg"
// //                   >
// //                     Send an Enquiry
// //                   </button>
// //                 </form>
// //               </div>

// //               {enquiryStatus && (
// //                 <div
// //                   className={`text-center mt-4 text-lg ${enquiryStatus.type === "success"
// //                     ? "text-green-600"
// //                     : "text-red-600"
// //                     }`}
// //                 >
// //                   {enquiryStatus.message}
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Modal for Viewing All Images */}
// //         {showAllImages && (
// //           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
// //             <div className="bg-white p-6 rounded-lg w-[80%] h-[80%] overflow-auto">
// //               <button
// //                 className="absolute text-3xl text-white top-4 right-4"
// //                 onClick={() => setShowAllImages(false)}
// //               >
// //                 ×
// //               </button>
// //               <h2 className="mb-4 text-2xl font-semibold">Gallery</h2>
// //               <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
// //                 {propertyImages.map((img, index) => (
// //                   <div className="relative">
// //                     <img
// //                       key={index}
// //                       src={img.image}
// //                       alt={`Room ${index + 1}`}
// //                       className="object-cover w-full h-48 rounded-lg"
// //                     />
// //                     <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
// //                       <span className="text-4xl md:text-3xl font-extrabold text-white rotate-[-30deg] opacity-40 select-none">
// //                         ApnaGhar
// //                       </span>
// //                     </div>
// //                   </div>
// //                 ))}

// //                 {/* Property  Video at the end */}
// //                 {propertyDetails?.property_video && (
// //                   <video
// //                     controls
// //                     className="rounded-2xl w-full h-48 md:h-[195px] object-cover"
// //                   >
// //                     <source
// //                       src={propertyDetails.property_video}
// //                       type="video/mp4"
// //                     />
// //                     Your browser does not support the video tag.
// //                   </video>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {/* Exclusive Recommended Section — "Top Picks for You" design */}
// //         <div className="w-full px-2 py-4 sm:px-6 lg:px-4">
// //           <style>{`
// //             .er-slider .slick-track { display: flex !important; }
// //             .er-slider .slick-slide { height: inherit !important; }
// //             .er-slider .slick-slide > div { height: 100%; }
// //             @keyframes erPulse {
// //               0%, 100% { box-shadow: 0 0 0 0 rgba(214,31,69,0.30); }
// //               50%      { box-shadow: 0 0 0 8px rgba(214,31,69,0); }
// //             }
// //             .er-pulse { animation: erPulse 2.6s ease-out infinite; }
// //           `}</style>

// //           <div className="relative w-full overflow-hidden bg-white border border-[#F7C3CE] rounded-2xl shadow-[0_0_28px_rgba(214,31,69,0.12)] pb-5">
// //             {/* ---------- HEADER ---------- */}
// //             <div className="flex flex-col gap-4 px-4 pt-5 mb-3 sm:px-6 md:flex-row md:items-center md:justify-between">
// //               <div className="flex items-center gap-3 sm:gap-4">
// //                 <span className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full shadow-lg sm:w-14 sm:h-14 bg-gradient-to-br from-[#E8335A] to-[#B91C3C] shadow-[#D61F45]/30 er-pulse">
// //                   <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor" aria-hidden="true">
// //                     <path d="M2 7l5 4 5-7 5 7 5-4-2 12H4L2 7z" />
// //                   </svg>
// //                 </span>
// //                 <div className="min-w-0">
// //                   <h2 className="m-0 text-xl font-extrabold tracking-tight text-[#172033] sm:text-2xl lg:text-3xl">
// //                     <span className="text-[#D61F45]">Top Picks</span> for You
// //                   </h2>
// //                   <p className="m-0 mt-1 text-sm text-[#64748B] sm:text-base">
// //                     Handpicked properties based on your preferences
// //                   </p>
// //                 </div>
// //               </div>

// //               <div className="flex items-center w-full gap-3 sm:w-auto md:flex-shrink-0">
// //                 <button
// //                   type="button"
// //                   className="group flex items-center justify-center w-full gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#D61F45] rounded-lg shadow-md shadow-[#D61F45]/25 transition-all duration-300 hover:bg-[#B91C3C] hover:shadow-lg sm:w-auto sm:px-6"
// //                   onClick={handleClick}
// //                 >
// //                   View All Properties
// //                   <HiOutlineArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-1" />
// //                 </button>

// //                 <button
// //                   type="button"
// //                   aria-label="Previous"
// //                   className="hidden sm:flex items-center justify-center flex-shrink-0 rounded-full w-11 h-11 bg-[#FDE8EC] transition-all duration-300 hover:bg-[#F9D3DB] hover:scale-105 active:scale-95"
// //                   onClick={() => sliderRef.current?.slickPrev()}
// //                 >
// //                   <GoArrowLeft className="text-xl text-[#D61F45]" />
// //                 </button>

// //                 <button
// //                   type="button"
// //                   aria-label="Next"
// //                   className="hidden sm:flex items-center justify-center flex-shrink-0 rounded-full w-11 h-11 bg-[#D61F45] shadow-md shadow-[#D61F45]/30 transition-all duration-300 hover:bg-[#B91C3C] hover:scale-105 active:scale-95"
// //                   onClick={() => sliderRef.current?.slickNext()}
// //                 >
// //                   <GoArrowRight className="text-xl text-white" />
// //                 </button>
// //               </div>
// //             </div>

// //             {/* ---------- CAROUSEL ---------- */}
// //             <div className="px-2 sm:px-4">
// //               <Slider {...settings} className="slider-container er-slider" ref={sliderRef}>
// //                 {properties.map((property) => {
// //                   let distance = null;
// //                   if (userLocation && property.latitude && property.longitude) {
// //                     distance = calculateDistance(
// //                       userLocation.latitude,
// //                       userLocation.longitude,
// //                       parseFloat(property.latitude),
// //                       parseFloat(property.longitude),
// //                     ).toFixed(1);
// //                   }

// //                   const subtitle = (() => {
// //                     const area = property.address_area || "";
// //                     const city = property.city_name || "";

// //                     const location = area.toLowerCase().includes(city.toLowerCase())
// //                       ? area
// //                       : `${area}, ${city}`;

// //                     const type =
// //                       property.property_type === "Office"
// //                         ? "Office Space"
// //                         : property.property_type === "Retail"
// //                           ? "Retail Space"
// //                           : property.property_type || "";

// //                     const category = property.property_category_type || "";

// //                     if (
// //                       category === "Commercial Buy" ||
// //                       category === "Commercial Lease"
// //                     ) {
// //                       return `${type} for ${category === "Commercial Buy" ? "Sale" : "Lease"
// //                         } in ${location}`;
// //                     }

// //                     if (
// //                       category.includes("PG") ||
// //                       category.includes("Co-Living") ||
// //                       category.includes("Coliving")
// //                     ) {
// //                       return `${type} for Rent in ${location}`;
// //                     }

// //                     const action = category === "Buy" ? "Sale" : category;

// //                     return `${property.bhk_type} ${type} for ${action} in ${location}`;
// //                   })();

// //                   const badgeText = (() => {
// //                     const normalizedCategory = (property.property_category_type || "")
// //                       .replace(/\s+/g, " ")
// //                       .replace(/-/g, " ")
// //                       .replace(/\//g, " ")
// //                       .trim()
// //                       .toLowerCase();

// //                     if (normalizedCategory === "buy") return "FOR BUY";
// //                     if (normalizedCategory === "rent") return "FOR RENT";
// //                     if (normalizedCategory.includes("commercial buy")) return "COMMERCIAL BUY";
// //                     if (normalizedCategory.includes("commercial lease")) return "COMMERCIAL LEASE";
// //                     if (
// //                       normalizedCategory.includes("pg") ||
// //                       normalizedCategory.includes("co living") ||
// //                       normalizedCategory.includes("coliving")
// //                     )
// //                       return "PG / CO-LIVING";
// //                     if (normalizedCategory.includes("residential")) return "RESIDENTIAL";
// //                     return "UNKNOWN";
// //                   })();

// //                   function getValidImageUrl(img) {
// //                     if (typeof img !== "string") return null;
// //                     if (img.trim() === "") return null;
// //                     return img.startsWith("http") ? img : BASE_URL + img;
// //                   }

// //                   const coverImage = getValidImageUrl(property.cover_image);
// //                   const additionalImages = (property.property_images || [])
// //                     .map((imgObj) => getValidImageUrl(imgObj?.image))
// //                     .filter(Boolean);
// //                   const allImages = [
// //                     ...(coverImage ? [coverImage] : []),
// //                     ...additionalImages,
// //                   ];

// //                   const isRentLike =
// //                     property.property_category_type === "Rent" ||
// //                     property.property_category_type === "PG/Co-living";
// //                   const isPG = property.property_category_type?.includes("PG");

// //                   const phoneDigits = String(property.connect_to_no || "").replace(/\D/g, "");
// //                   const phoneIntl =
// //                     phoneDigits.length === 10 ? `91${phoneDigits}` : phoneDigits;

// //                   return (
// //                     <div key={property._id} className="box-border h-full p-2">
// //                       <div className="flex flex-col h-full overflow-hidden bg-white border border-[#F1D5DC] rounded-2xl shadow-[0_6px_20px_rgba(214,31,69,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(214,31,69,0.18)]">
// //                         {/* ---------- IMAGE ---------- */}
// //                         <div className="relative group er-card-img">
// //                           <Link
// //                             to={`/propertydetails/${property._id}?property_owner_id=${property.user_id}`}
// //                             onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
// //                             className="block overflow-hidden no-underline hover:no-underline"
// //                           >
// //                             {allImages.length > 1 ? (
// //                               <Slider
// //                                 key={`${property._id}-${allImages.length}`}
// //                                 dots
// //                                 infinite
// //                                 speed={500}
// //                                 slidesToShow={1}
// //                                 slidesToScroll={1}
// //                                 arrows={false}
// //                                 autoplay
// //                                 autoplaySpeed={2500}
// //                                 beforeChange={(current, next) =>
// //                                   setActiveIndexes((prev) => ({
// //                                     ...prev,
// //                                     [property._id]: next,
// //                                   }))
// //                                 }
// //                                 initialSlide={activeIndexes[property._id] || 0}
// //                                 customPaging={(i) => {
// //                                   const activeSlide = activeIndexes[property._id] || 0;
// //                                   const isActive = i === activeSlide % allImages.length;
// //                                   return (
// //                                     <div
// //                                       style={{
// //                                         width: isActive ? "14px" : "6px",
// //                                         height: "6px",
// //                                         borderRadius: "9999px",
// //                                         background: isActive ? "#FFFFFF" : "rgba(255,255,255,0.6)",
// //                                         margin: "0 3px",
// //                                         cursor: "pointer",
// //                                         transition: "all .25s ease",
// //                                       }}
// //                                     />
// //                                   );
// //                                 }}
// //                                 appendDots={(dots) => (
// //                                   <div
// //                                     style={{
// //                                       position: "absolute",
// //                                       bottom: "24px",
// //                                       left: "50%",
// //                                       transform: "translateX(-50%)",
// //                                       display: "flex",
// //                                       justifyContent: "center",
// //                                       width: "100%",
// //                                       zIndex: 20,
// //                                     }}
// //                                   >
// //                                     <ul style={{ display: "flex", margin: 0, padding: 0, listStyle: "none" }}>
// //                                       {dots}
// //                                     </ul>
// //                                   </div>
// //                                 )}
// //                               >
// //                                 {allImages.map((imgUrl, idx) => (
// //                                   <div key={`${property._id}-${idx}`}>
// //                                     <img
// //                                       src={imgUrl}
// //                                       alt={property.property_name || "Property"}
// //                                       className="object-cover w-full h-[170px] sm:h-[190px] transition-transform duration-500 ease-out group-hover:scale-105"
// //                                     />
// //                                   </div>
// //                                 ))}
// //                               </Slider>
// //                             ) : (
// //                               <img
// //                                 src={allImages[0] || defaultImage}
// //                                 alt={property.property_name || "Property"}
// //                                 className="object-cover w-full h-[170px] sm:h-[190px] transition-transform duration-500 ease-out group-hover:scale-105"
// //                               />
// //                             )}
// //                           </Link>

// //                           {/* Soft top gradient so the pills stay readable */}
// //                           <div className="absolute inset-x-0 top-0 z-[5] h-20 pointer-events-none bg-gradient-to-b from-black/40 to-transparent" />

// //                           {/* Top-left: category pill + virtual tour */}
// //                           <div className="absolute z-20 flex flex-wrap items-center gap-1.5 top-3 left-3 max-w-[60%]">
// //                             <span className="px-3 py-1 text-[11px] sm:text-xs font-bold tracking-wide text-white uppercase rounded-full shadow-md bg-[#D61F45] truncate">
// //                               {badgeText}
// //                             </span>
// //                             {property.virtual_tour_availability === "Yes" && (
// //                               <span className="flex items-center gap-1 px-2 py-1 text-[10px] sm:text-[11px] font-semibold text-white rounded-full shadow-md bg-[#172033]/75 backdrop-blur-sm">
// //                                 <PiCubeFocus className="text-xs text-white" />
// //                                 <span className="hidden sm:inline">Virtual Tour</span>
// //                               </span>
// //                             )}
// //                           </div>

// //                           {/* Top-right: Featured pill + favorite */}
// //                           <div className="absolute z-20 flex items-center gap-2 top-3 right-3">
// //                             {property.mark_as_featured === "Yes" && (
// //                               <span className="px-2.5 py-1 text-[10px] sm:text-[11px] font-bold tracking-wide text-[#172033] uppercase rounded-full shadow-md bg-gradient-to-r from-[#FFD233] to-[#F5B800]">
// //                                 Featured
// //                               </span>
// //                             )}
// //                             <button
// //                               type="button"
// //                               aria-label={property.is_favorite ? "Remove from favorites" : "Add to favorites"}
// //                               className="flex items-center justify-center w-8 h-8 transition-transform rounded-full shadow-md bg-[#172033]/75 backdrop-blur-sm hover:scale-110"
// //                               onClick={(e) => {
// //                                 e.preventDefault();
// //                                 e.stopPropagation();
// //                                 if (property.is_favorite) {
// //                                   removeFromFavoritesRecommendedProperty(property.favorite_id);
// //                                 } else {
// //                                   addToFavoritesRecommendedProperty(property._id);
// //                                 }
// //                               }}
// //                             >
// //                               <Heart
// //                                 size={16}
// //                                 strokeWidth={2}
// //                                 stroke={property.is_favorite ? "#D61F45" : "white"}
// //                                 fill={property.is_favorite ? "#D61F45" : "white"}
// //                               />
// //                             </button>
// //                           </div>
// //                         </div>

// //                         {/* ---------- CONTENT (overlaps the image) ---------- */}
// //                         <div className="relative z-10 flex flex-col justify-between flex-1 px-4 pt-3 pb-4 -mt-4 bg-white rounded-t-2xl text-[#172033]">
// //                           <div>
// //                             <h3
// //                               className="m-0 text-base font-bold leading-6 truncate sm:text-[17px] text-[#172033]"
// //                               title={property.property_name}
// //                             >
// //                               {property.property_name || "N/A"}
// //                             </h3>

// //                             <p
// //                               className="m-0 text-[13px] sm:text-sm leading-5 text-[#475569] truncate"
// //                               title={subtitle}
// //                             >
// //                               {subtitle}
// //                             </p>

// //                             {/* Price row */}
// //                             <div className="flex flex-wrap items-center justify-between gap-1 mt-1.5 mb-2">
// //                               <div className="flex flex-wrap items-center gap-2">
// //                                 <span className="text-xl font-extrabold leading-none sm:text-[22px] text-[#172033]">
// //                                   ₹{" "}
// //                                   {isRentLike
// //                                     ? formatPrice(property.rent)
// //                                     : formatPrice(property.property_price)}
// //                                 </span>
// //                                 {isRentLike && (
// //                                   <span className="text-xs text-[#64748B]">
// //                                     / {property.rent_duration || "Per Month"}
// //                                   </span>
// //                                 )}
// //                                 {property.property_category_type?.includes("Buy") &&
// //                                   property.possession_status === "Ready To Move" && (
// //                                     <span className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-white rounded-full bg-[#D61F45] shadow-sm whitespace-nowrap">
// //                                       <Building2 size={12} strokeWidth={2.5} />
// //                                       Get Best Deal
// //                                     </span>
// //                                   )}
// //                               </div>
// //                               <div className="text-xs font-medium whitespace-nowrap">
// //                                 {property.property_category_type?.includes("Buy") &&
// //                                   property.possession_status !== "Ready To Move" &&
// //                                   property.possession_date && (
// //                                     <>
// //                                       <span className="text-[#64748B]">Possession:</span>
// //                                       <span className="ml-1 font-semibold text-[#172033]">
// //                                         {new Date(property.possession_date).toLocaleDateString("en-IN")}
// //                                       </span>
// //                                     </>
// //                                   )}
// //                               </div>
// //                             </div>

// //                             {/* Features row */}
// //                             <div className="grid grid-cols-3 gap-1 py-2">
// //                               <div className="flex items-center min-w-0 gap-1.5">
// //                                 <MdApartment className="text-[18px] text-[#172033] flex-shrink-0" />
// //                                 <div className="flex flex-col min-w-0">
// //                                   <p className="m-0 text-xs font-bold leading-4 truncate text-[#172033]">
// //                                     {property.building_type === "Commercial"
// //                                       ? property.property_type === "Office"
// //                                         ? "Office Space"
// //                                         : property.property_type === "Retail"
// //                                           ? "Retail Space"
// //                                           : property.property_type
// //                                       : isPG
// //                                         ? `${property.bathroom || 0} Bathrooms`
// //                                         : property.bhk_type}
// //                                   </p>
// //                                   <p className="m-0 text-[10px] leading-4 text-[#64748B] truncate">
// //                                     {property.building_type === "Commercial"
// //                                       ? "Property Type"
// //                                       : isPG
// //                                         ? "Bathrooms"
// //                                         : property.property_type}
// //                                   </p>
// //                                 </div>
// //                               </div>

// //                               <div className="flex items-center min-w-0 gap-1.5">
// //                                 {isPG ? (
// //                                   <FaUser className="text-[15px] text-[#172033] flex-shrink-0" />
// //                                 ) : (
// //                                   <FaBath className="text-[15px] text-[#172033] flex-shrink-0" />
// //                                 )}
// //                                 <div className="flex flex-col min-w-0">
// //                                   <p className="m-0 text-xs font-bold leading-4 truncate text-[#172033]">
// //                                     {isPG ? property.available_for : `${property.bathroom || 0} Baths`}
// //                                   </p>
// //                                   <p className="m-0 text-[10px] leading-4 text-[#64748B] truncate">
// //                                     {isPG ? "Available For" : "Bathrooms"}
// //                                   </p>
// //                                 </div>
// //                               </div>

// //                               <div className="flex items-center min-w-0 gap-1.5">
// //                                 <RiRuler2Line className="text-[17px] text-[#172033] flex-shrink-0" />
// //                                 <div className="flex flex-col min-w-0">
// //                                   <p className="m-0 text-xs font-bold leading-4 truncate text-[#172033]">
// //                                     {property.area} {property.area_in}
// //                                   </p>
// //                                   <p className="m-0 text-[10px] leading-4 text-[#64748B] truncate">
// //                                     Built Up Area
// //                                   </p>
// //                                 </div>
// //                               </div>
// //                             </div>

// //                             {/* Posted by · days · distance · share */}
// //                             <div className="flex items-center justify-between gap-2 py-1.5 text-[11px] sm:text-xs text-[#64748B]">
// //                               <div className="flex flex-wrap items-center min-w-0 gap-x-1.5">
// //                                 <span className="flex items-center min-w-0">
// //                                   <AiOutlineClockCircle className="mr-1 text-[13px] flex-shrink-0" />
// //                                   <span className="truncate">
// //                                     Posted by {property.user_type || "Owner"}
// //                                   </span>
// //                                 </span>
// //                                 <span className="text-[#CBD5E1]">•</span>
// //                                 <span className="whitespace-nowrap">
// //                                   {property.days_since_created
// //                                     ? `${property.days_since_created} days ago`
// //                                     : "Recently"}
// //                                 </span>
// //                                 {distance && (
// //                                   <>
// //                                     <span className="text-[#CBD5E1]">•</span>
// //                                     <span className="flex items-center whitespace-nowrap">
// //                                       <FaMapMarkerAlt className="mr-1 text-[#D61F45]" />
// //                                       {distance} km from you
// //                                     </span>
// //                                   </>
// //                                 )}
// //                               </div>
// //                               <PiShareNetworkLight
// //                                 title="Share"
// //                                 className="flex-shrink-0 text-[16px] text-[#94A3B8] transition-colors cursor-pointer hover:text-[#D61F45]"
// //                                 onClick={() =>
// //                                   openShareModal(
// //                                     `${window.location.origin}/propertydetails/${property._id}`,
// //                                     property._id,
// //                                   )
// //                                 }
// //                               />
// //                             </div>
// //                           </div>

// //                           {/* Owner + Contact / WhatsApp / Call */}
// //                           <div className="flex items-center justify-between gap-2 pt-3 mt-1 border-t border-[#F1F5F9]">
// //                             <div className="flex items-center min-w-0 gap-2">
// //                               <div className="flex items-center justify-center flex-shrink-0 overflow-hidden rounded-full shadow w-9 h-9 ring-2 ring-white bg-[#0F2747]/10">
// //                                 {property.property_owner_image ? (
// //                                   <img
// //                                     src={`${process.env.REACT_APP_API_URL}/media/${property.property_owner_image}`}
// //                                     alt={property.connect_to_name || "Owner"}
// //                                     className="object-cover w-full h-full rounded-full"
// //                                   />
// //                                 ) : (
// //                                   <AiOutlineUser className="text-xl text-[#0F2747]" />
// //                                 )}
// //                               </div>
// //                               <div className="flex flex-col min-w-0 leading-tight">
// //                                 <span
// //                                   className="text-[13px] font-bold text-[#172033] truncate"
// //                                   title={property.connect_to_name}
// //                                 >
// //                                   {property.connect_to_name || "Owner"}
// //                                 </span>
// //                                 <span className="text-[11px] text-[#64748B] truncate">
// //                                   {property.user_type || "Owner"}
// //                                 </span>
// //                               </div>
// //                             </div>

// //                             <div className="flex items-center flex-shrink-0 gap-1.5">
// //                               {/* Contact — same view-count + modal flow as before */}
// //                               <button
// //                                 type="button"
// //                                 className="flex items-center justify-center px-4 h-9 text-xs sm:text-[13px] font-semibold text-white rounded-lg bg-[#D61F45] shadow-sm transition-colors hover:bg-[#B91C3C] whitespace-nowrap"
// //                                 onClick={() => {
// //                                   const token = sessionStorage.getItem("accessToken");
// //                                   if (token) {
// //                                     if (freeViewCount > 0) {
// //                                       handleAddCount(-1);
// //                                     } else if (paidViewCount > 0) {
// //                                       handleAddCount(-1);
// //                                     }
// //                                     setIsContactModalOpen(true);
// //                                   } else {
// //                                     setOpenContactModalAfterLogin(true);
// //                                     setIsLoginModalOpen(true);
// //                                   }
// //                                 }}
// //                               >
// //                                 Contact
// //                               </button>

// //                               {/* WhatsApp */}
// //                               <a
// //                                 href={
// //                                   phoneIntl
// //                                     ? `https://wa.me/${phoneIntl}?text=${encodeURIComponent(
// //                                       `Hello, I am interested in your property ${property.property_name || ""}`,
// //                                     )}`
// //                                     : undefined
// //                                 }
// //                                 target="_blank"
// //                                 rel="noopener noreferrer"
// //                                 aria-label="WhatsApp"
// //                                 onClick={(e) => {
// //                                   e.stopPropagation();
// //                                   if (!phoneIntl) {
// //                                     e.preventDefault();
// //                                     toast.error("Contact number is not available for this property.");
// //                                   }
// //                                 }}
// //                                 className="flex items-center justify-center rounded-lg shadow-sm w-9 h-9 bg-[#22C55E] transition-colors hover:bg-[#16A34A]"
// //                               >
// //                                 <FaWhatsapp className="text-lg text-white" />
// //                               </a>

// //                               {/* Call */}
// //                               <a
// //                                 href={phoneIntl ? `tel:+${phoneIntl}` : undefined}
// //                                 aria-label="Call"
// //                                 onClick={(e) => {
// //                                   e.stopPropagation();
// //                                   if (!phoneIntl) {
// //                                     e.preventDefault();
// //                                     toast.error("Contact number is not available for this property.");
// //                                   }
// //                                 }}
// //                                 className="flex items-center justify-center rounded-lg shadow-sm w-9 h-9 bg-[#3B82F6] transition-colors hover:bg-[#2563EB]"
// //                               >
// //                                 <FaPhoneAlt className="text-sm text-white" />
// //                               </a>
// //                             </div>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   );
// //                 })}
// //               </Slider>
// //             </div>

// //             {/* Mobile arrows below the cards */}
// //             <div className="flex items-center justify-center gap-4 mt-3 sm:hidden">
// //               <button
// //                 type="button"
// //                 aria-label="Previous"
// //                 className="flex items-center justify-center rounded-full w-11 h-11 bg-[#FDE8EC] transition-all duration-300 active:scale-95"
// //                 onClick={() => sliderRef.current?.slickPrev()}
// //               >
// //                 <GoArrowLeft className="text-xl text-[#D61F45]" />
// //               </button>
// //               <button
// //                 type="button"
// //                 aria-label="Next"
// //                 className="flex items-center justify-center rounded-full w-11 h-11 bg-[#D61F45] shadow-md transition-all duration-300 active:scale-95"
// //                 onClick={() => sliderRef.current?.slickNext()}
// //               >
// //                 <GoArrowRight className="text-xl text-white" />
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //         {isShareModalOpen && (
// //           <ShareModal
// //             currentShareUrl={window.location.href}
// //             closeShareModal={handleCloseShareModal}
// //             copyLink={() => {
// //               const url = window.location.href;

// //               if (navigator.clipboard && window.isSecureContext) {
// //                 navigator.clipboard
// //                   .writeText(url)
// //                   .then(() => alert("Link copied!"))
// //                   .catch((err) => {
// //                     console.error(err);
// //                     fallbackCopyTextToClipboard(url);
// //                   });
// //               } else {
// //                 fallbackCopyTextToClipboard(url);
// //               }

// //               function fallbackCopyTextToClipboard(text) {
// //                 const textArea = document.createElement("textarea");
// //                 textArea.value = text;
// //                 textArea.style.position = "fixed";
// //                 textArea.style.left = "-9999px";
// //                 document.body.appendChild(textArea);
// //                 textArea.focus();
// //                 textArea.select();

// //                 try {
// //                   const successful = document.execCommand("copy");
// //                   alert(successful ? "Link copied!" : "Copy failed");
// //                 } catch (err) {
// //                   console.error("Fallback: Could not copy text: ", err);
// //                   alert("Copy failed");
// //                 }

// //                 document.body.removeChild(textArea);
// //               }
// //             }}
// //           />
// //         )}

// //         {isShareModalOpen && (
// //           <div className="absolute right-0 z-50">
// //             <ShareModal
// //               currentShareUrl={currentShareUrl}
// //               closeShareModal={handleCloseShareModal}
// //               copyLink={() => {
// //                 navigator.clipboard.writeText(currentShareUrl);
// //                 alert("Link copied!");
// //               }}
// //             />
// //           </div>
// //         )}

// //         {/* Modals */}
// //         {isLoggedIn ? (
// //           <div>Welcome, {contactNumber}</div> // Display logged-in content
// //         ) : (
// //           <>
// //             <Login1
// //               isOpen={isLoginModalOpen}
// //               onClose={() => setIsLoginModalOpen(false)}
// //               onSwitchToSignUp={() => {
// //                 setIsLoginModalOpen(false);
// //                 setIsSignUpModalOpen(true); // Open sign-up modal
// //               }}
// //               onLoginSuccess={handleLoginSuccess} // Pass the callback to Login1 component
// //             />
// //             <SignUp1
// //               isOpen={isSignUpModalOpen}
// //               onClose={() => setIsSignUpModalOpen(false)}
// //               onSwitchToLogin={() => {
// //                 setIsSignUpModalOpen(false);
// //                 setIsLoginModalOpen(true); // Open login modal
// //               }}
// //             />
// //           </>
// //         )}
// //         {/* Share Modal */}
// //         {isShareModalOpen && (
// //           <ShareModal
// //             currentShareUrl={window.location.href}
// //             closeShareModal={handleCloseShareModal}
// //             copyLink={() => {
// //               navigator.clipboard.writeText(window.location.href);
// //               alert("Link copied!");
// //             }}
// //           />
// //         )}
// //       </div>
// //     </>
// //   );
// // };

// // export default Detail;




// import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
// import {
//   House,
//   Crown,
//   MapPin,
//   Bed,
//   ArrowsOut,
//   Bathtub,
//   VideoCamera,
//   Phone,
//   Heart,
//   ShareNetwork,
//   CaretLeft,
//   CaretRight,
//   CaretDown,
//   Images,
//   ChatCircleText,
//   User,
//   PaperPlaneTilt,
//   CalendarBlank,
//   Info,
//   ListBullets,
//   SquaresFour,
//   Diamond,
//   FileText,
//   ClipboardText,
//   Clock,
//   CheckCircle,
//   Hourglass,
//   Tag,
//   CurrencyInr,
//   Buildings,
//   Armchair,
//   Car,
//   Stack,
//   Compass,
//   Lightning,
//   Drop,
//   ForkKnife,
//   Key,
//   SealCheck,
//   Users,
//   Receipt,
//   Star,
//   Snowflake,
//   HardHat,
//   CornersOut,
//   Hash,
//   ListChecks,
//   Sparkle,
//   ChartLineUp,
//   Wrench,
//   ShieldCheck,
//   UserCircle,
//   ArrowLeft,
//   ArrowRight,
//   X,
//   ArrowSquareOut,
//   ArrowsDownUp,
//   Sun,
//   Timer,
//   Train,
//   AirplaneTilt,
//   RoadHorizon,
//   MapTrifold,
//   NavigationArrow,
//   ArrowClockwise,
//   WarningCircle,
// } from "@phosphor-icons/react";
// import { FaBath } from "react-icons/fa";
// import { ToWords } from "to-words";
// import { GoArrowLeft, GoArrowRight } from "react-icons/go";
// import { FaUser } from "react-icons/fa";
// import { AiOutlineUser, AiOutlineClockCircle } from "react-icons/ai";
// import { PiShareNetworkLight } from "react-icons/pi";
// import { FaPhoneAlt } from "react-icons/fa";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import "../styles/RecommendedProperties.css";
// import "../styles/DetailResponsive.css";
// import { useHistory } from "react-router-dom"; // import for routing
// import { PiCubeFocus } from "react-icons/pi";
// import { useParams, useLocation } from "react-router-dom";
// import { useCity } from "./SearchContext";
// import { toast } from "react-toastify";
// import Login1 from "../auth/Login1";
// import SignUp1 from "../auth/SignUp1";
// import GetScheduleVTourproperty from "../containers/GetScheduleVTourproperty";
// import { HiOutlineArrowRight } from "react-icons/hi"; // thinner arrow
// import ShareModal from "../containers/ShareModal";
// import ContactDetails from "../containers/ContactDetails";
// import { Building2 } from "lucide-react";
// import { RiRuler2Line } from "react-icons/ri";
// import { MdApartment } from "react-icons/md";
// import { FaWhatsapp } from "react-icons/fa";
// import { FaMapMarkerAlt } from "react-icons/fa";

// const defaultImage = "/image/appstore.png";
// const formatDateToDDMMYYYY = (dateVal, fallbackDate = null) => {
//   if (!dateVal || dateVal.toString().trim() === "" || dateVal.toString().toLowerCase() === "null") {
//     return dateVal;
//   }

//   let dateObj;
//   if (dateVal.toString().trim().toLowerCase() === "immediately") {
//     dateObj = fallbackDate ? new Date(fallbackDate) : new Date();
//   } else {
//     dateObj = new Date(dateVal);
//   }

//   if (isNaN(dateObj.getTime())) {
//     return dateVal;
//   }

//   const day = String(dateObj.getDate()).padStart(2, "0");
//   const month = String(dateObj.getMonth() + 1).padStart(2, "0");
//   const year = dateObj.getFullYear();
//   return `${day}/${month}/${year}`;
// };

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

// // FIX: read the saved location when the page renders (it used to be read
// // once when the file loaded, so a location saved after login was ignored).
// const readUserLocation = () => {
//   try {
//     return JSON.parse(sessionStorage.getItem("userLocation"));
//   } catch {
//     return null;
//   }
// };

// // Height of the fixed HorizontalNav (it carries data-fixed-header), so the
// // sticky tabs / enquiry card sit just below it instead of under it.
// const useFixedHeaderHeight = () => {
//   const [height, setHeight] = useState(0);
//   useEffect(() => {
//     const el = document.querySelector("[data-fixed-header]");
//     if (!el) return undefined;
//     const update = () => setHeight(el.offsetHeight);
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
//   return height;
// };

// // Pick an icon for a detail row from words in its label.
// const LABEL_ICONS = [
//   [/date|updated|available on|available from/i, CalendarBlank],
//   [/address|landmark|location/i, MapPin],
//   [/name/i, Tag],
//   [/dimension|length|breadth|open sides/i, CornersOut],
//   [/area/i, ArrowsOut],
//   [/tax/i, Receipt],
//   [/electricity|power/i, Lightning],
//   [/water/i, Drop],
//   [/maintenance/i, Wrench],
//   [/price|rent|deposit|charges|cost/i, CurrencyInr],
//   [/listing|category|transaction/i, ListBullets],
//   [/building/i, Buildings],
//   [/bhk|room type|beds/i, Bed],
//   [/furnish|reception/i, Armchair],
//   [/bath|washroom/i, Bathtub],
//   [/parking/i, Car],
//   [/balcony|view/i, Sun],
//   [/lift/i, ArrowsDownUp],
//   [/floor|block/i, Stack],
//   [/facing/i, Compass],
//   [/pantry|food/i, ForkKnife],
//   [/possession/i, Key],
//   [/available status|status/i, CheckCircle],
//   [/rera/i, SealCheck],
//   [/age/i, Hourglass],
//   [/seat|people|cabine|meeting|conference/i, Users],
//   [/notice|lockin|gate/i, Timer],
//   [/rating/i, Star],
//   [/ac\b|central ac/i, Snowflake],
//   [/construction|developer|builder/i, HardHat],
//   [/plot|flat|no\./i, Hash],
//   [/rules/i, ListChecks],
//   [/services|additional/i, Sparkle],
//   [/investment/i, ChartLineUp],
//   [/security/i, ShieldCheck],
//   [/lease|suited|available for/i, UserCircle],
//   [/type/i, House],
// ];
// const iconForLabel = (label) =>
//   (LABEL_ICONS.find(([re]) => re.test(label)) || [null, Info])[1];

// // White section card with a two-tone title ("More Details").
// const SectionCard = ({ sectionRef, scrollMargin, icon: Icon, first, accent, subtitle, right, children }) => (
//   <section
//     ref={sectionRef}
//     style={{ scrollMarginTop: scrollMargin }}
//     className="relative w-full p-4 mt-5 overflow-hidden bg-white border border-[#FDE8EC] md:p-6 rounded-3xl shadow-[0_10px_30px_rgba(214,31,69,0.06)]"
//   >
//     <div
//       aria-hidden="true"
//       className="absolute top-0 right-0 hidden w-72 h-24 pointer-events-none md:block bg-gradient-to-l from-[#FDE8EC] to-transparent opacity-70"
//     />
//     <div className="relative flex items-center gap-4 mb-5">
//       <span className="flex items-center justify-center flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#FDE8EC] text-[#D61F45]">
//         <Icon size={26} weight="fill" />
//       </span>
//       <div className="flex-1 min-w-0">
//         <h3 className="m-0 text-xl font-bold md:text-2xl text-[#17253a]">
//           {first} {accent && <span className="text-[#D61F45]">{accent}</span>}
//         </h3>
//         {subtitle && <p className="m-0 mt-0.5 text-[13px] md:text-[14px] text-gray-500">{subtitle}</p>}
//       </div>
//       {right}
//     </div>
//     <div className="relative">{children}</div>
//   </section>
// );

// // Faint "ApnaGhar" watermark over property photos (same as before).
// const Watermark = ({ size = "text-3xl" }) => (
//   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//     <span className={`${size} font-extrabold text-white rotate-[-30deg] opacity-40 select-none`}>
//       ApnaGhar
//     </span>
//   </div>
// );

// // ==================================================================
// // Nearby Connectivity — Metro Stations, Airports and Main Roads
// // ------------------------------------------------------------------
// // Data   : OpenStreetMap (Overpass API) using the property's latitude /
// //          longitude. Metro also tries the backend first:
// //          GET {REACT_APP_API_URL}/cust_api/properties/<id>/nearby-connectivity
// // Speed  : browser cache (metro 24 h, airports & roads 7 days), staggered
// //          requests across 3 map servers (first answer wins).
// // Map    : Leaflet loaded on demand from a CDN (no npm install needed),
// //          shows the property, every place in the active tab and a line
// //          to the selected place. Falls back to a Google map if blocked.
// // ==================================================================

// const nearbyIsDev = process.env.NODE_ENV !== "production";

// const NEARBY_CACHE_PREFIX = "apnaghar:nearby:v3:";
// const NEARBY_API_TIMEOUT_MS = 8000;
// const NEARBY_MIRROR_TIMEOUT_MS = 15000;
// const NEARBY_HEDGE_DELAY_MS = 1200;
// const NEARBY_SKIP_API_KEY = "apnaghar:metro:skipApi";
// const HOUR = 60 * 60 * 1000;

// const NEARBY_OVERPASS_URLS = [
//   "https://overpass-api.de/api/interpreter",
//   "https://overpass.kumi.systems/api/interpreter",
//   "https://overpass.private.coffee/api/interpreter",
// ];

// const NEARBY_CATEGORIES = [
//   {
//     key: "metro",
//     label: "Metro",
//     icon: Train,
//     radius: 5000,
//     limit: 8,
//     ttl: 24 * HOUR,
//     travelMode: "transit",
//     emptyTitle: "No metro stations found nearby",
//     emptyText: "There is no metro station within 5 km of this property.",
//   },
//   {
//     key: "airport",
//     label: "Airports",
//     icon: AirplaneTilt,
//     radius: 60000,
//     limit: 3,
//     ttl: 7 * 24 * HOUR,
//     travelMode: "driving",
//     emptyTitle: "No airports found nearby",
//     emptyText: "There is no commercial airport within 200 km of this property.",
//   },
//   {
//     key: "road",
//     label: "Main Roads",
//     icon: RoadHorizon,
//     radius: 2000,
//     limit: 8,
//     ttl: 7 * 24 * HOUR,
//     travelMode: "driving",
//     emptyTitle: "No main roads found nearby",
//     emptyText: "There is no highway or main road within 2 km of this property.",
//   },
// ];

// /* ---------------- Cache (memory + localStorage, safe) ---------------- */

// const nearbyMemoryCache = new Map();

// const nearbyCacheRead = (key, ttl) => {
//   if (nearbyMemoryCache.has(key)) return nearbyMemoryCache.get(key);
//   try {
//     const raw = localStorage.getItem(NEARBY_CACHE_PREFIX + key);
//     if (!raw) return null;
//     const { t, data } = JSON.parse(raw);
//     if (!Array.isArray(data) || Date.now() - t > ttl) {
//       localStorage.removeItem(NEARBY_CACHE_PREFIX + key);
//       return null;
//     }
//     nearbyMemoryCache.set(key, data);
//     return data;
//   } catch (e) {
//     return null;
//   }
// };

// const nearbyCacheWrite = (key, data) => {
//   nearbyMemoryCache.set(key, data);
//   try {
//     localStorage.setItem(NEARBY_CACHE_PREFIX + key, JSON.stringify({ t: Date.now(), data }));
//   } catch (e) {
//     /* storage full or blocked — memory cache still works */
//   }
// };

// const nearbyApiSkipped = () => {
//   try {
//     return sessionStorage.getItem(NEARBY_SKIP_API_KEY) === "1";
//   } catch (e) {
//     return false;
//   }
// };

// const markNearbyApiMissing = () => {
//   try {
//     sessionStorage.setItem(NEARBY_SKIP_API_KEY, "1");
//   } catch (e) {
//     /* ignore */
//   }
// };

// /* ---------------- Geometry & formatting ---------------- */

// const nearbyToCoords = (lat, lon) => {
//   const a = parseFloat(lat);
//   const b = parseFloat(lon);
//   if (!Number.isFinite(a) || !Number.isFinite(b)) return null;
//   if (a < -90 || a > 90 || b < -180 || b > 180 || (a === 0 && b === 0)) return null;
//   return [a, b];
// };

// const nearbyHaversine = (lat1, lon1, lat2, lon2) => {
//   const R = 6371008.8;
//   const toRad = (d) => (d * Math.PI) / 180;
//   const dPhi = toRad(lat2 - lat1);
//   const dLmb = toRad(lon2 - lon1);
//   const h = Math.sin(dPhi / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLmb / 2) ** 2;
//   return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
// };

// const nearbyFormatDistance = (m) => {
//   if (m >= 10000) return `${Math.round(m / 1000)} km`;
//   const rounded = Math.max(10, Math.round(m / 10) * 10);
//   return rounded < 1000 ? `${rounded} m` : `${(m / 1000).toFixed(1)} km`;
// };

// const nearbyTitleCase = (s) =>
//   String(s || "")
//     .replace(/_/g, " ")
//     .replace(/\b\w/g, (c) => c.toUpperCase());

// const nearbyNameOf = (tags = {}) => String(tags["name:en"] || tags.name || tags.official_name || "").trim();

// const nearbyNormalize = (name) =>
//   (name || "")
//     .toLowerCase()
//     .replace(/\b(metro station|metro|station|stop|road|rd|marg)\b/g, " ")
//     .replace(/[^a-z0-9]+/g, "");

// // Closest point on a polyline to the origin (metres, local flat projection).
// const nearbyClosestOnLine = (origin, geometry) => {
//   const [lat0, lon0] = origin;
//   const kx = Math.cos((lat0 * Math.PI) / 180) * 111320;
//   const ky = 110540;
//   const toXY = (p) => [(p.lon - lon0) * kx, (p.lat - lat0) * ky];
//   let best = null;
//   for (let i = 0; i < geometry.length; i += 1) {
//     const A = toXY(geometry[i]);
//     const B = i + 1 < geometry.length ? toXY(geometry[i + 1]) : A;
//     const dx = B[0] - A[0];
//     const dy = B[1] - A[1];
//     const len2 = dx * dx + dy * dy;
//     const t = len2 ? Math.max(0, Math.min(1, -(A[0] * dx + A[1] * dy) / len2)) : 0;
//     const px = A[0] + t * dx;
//     const py = A[1] + t * dy;
//     const d = Math.sqrt(px * px + py * py);
//     if (!best || d < best.d) best = { d, lat: lat0 + py / ky, lon: lon0 + px / kx };
//   }
//   return best;
// };

// /* ---------------- Overpass: staggered requests, first answer wins ---------------- */

// const runOverpassQuery = (query) =>
//   new Promise((resolve, reject) => {
//     const body = `data=${encodeURIComponent(query)}`;
//     const controllers = [];
//     const timers = [];
//     let settled = false;
//     let failed = 0;
//     let next = 0;

//     const finish = (fn, value) => {
//       if (settled) return;
//       settled = true;
//       timers.forEach(clearTimeout);
//       controllers.forEach((c) => c.abort());
//       fn(value);
//     };

//     const startNext = () => {
//       if (settled || next >= NEARBY_OVERPASS_URLS.length) return;
//       const url = NEARBY_OVERPASS_URLS[next++];
//       const ctrl = new AbortController();
//       controllers.push(ctrl);
//       const kill = setTimeout(() => ctrl.abort(), NEARBY_MIRROR_TIMEOUT_MS);
//       timers.push(kill);

//       fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/x-www-form-urlencoded" },
//         body,
//         signal: ctrl.signal,
//       })
//         .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
//         .then((json) => {
//           if (!Array.isArray(json?.elements)) throw new Error("Bad response");
//           finish(resolve, json.elements);
//         })
//         .catch(() => {
//           clearTimeout(kill);
//           if (settled) return;
//           failed += 1;
//           if (failed >= NEARBY_OVERPASS_URLS.length) finish(reject, new Error("Map data unavailable"));
//           else startNext(); // a server failed fast: try the next one now
//         });

//       // If nothing has come back yet, start the next server too.
//       timers.push(setTimeout(startNext, NEARBY_HEDGE_DELAY_MS));
//     };

//     startNext();
//   });

// const nearbyAround = (r, [lat, lon]) => `(around:${Math.round(r)},${lat.toFixed(6)},${lon.toFixed(6)})`;

// /* ---------------- Metro ---------------- */

// const isMetroStation = (rawTags = {}) => {
//   const t = {};
//   Object.keys(rawTags).forEach((k) => (t[k] = String(rawTags[k]).trim().toLowerCase()));
//   const railway = t.railway || "";
//   if (railway === "subway_entrance" || railway === "platform") return false;
//   const modes = ["subway", "light_rail", "monorail"];
//   const isStation =
//     railway === "station" ||
//     railway === "halt" ||
//     (t.public_transport === "station" && [...modes, "train"].some((m) => t[m] === "yes"));
//   const text = ["network", "operator", "name", "name:en"].map((k) => t[k] || "").join(" ");
//   const metroHint = modes.includes(t.station) || modes.some((m) => t[m] === "yes") || text.includes("metro");
//   return isStation && metroHint;
// };

// const parseMetro = (elements, origin, radius, limit) => {
//   const out = [];
//   const seen = new Set();
//   (elements || []).forEach((el) => {
//     const uid = `${el.type}-${el.id}`;
//     if (seen.has(uid)) return;
//     seen.add(uid);
//     const tags = el.tags || {};
//     if (!isMetroStation(tags)) return;
//     const name = nearbyNameOf(tags);
//     const c = nearbyToCoords(el.lat ?? el.center?.lat, el.lon ?? el.center?.lon);
//     if (!name || !c) return;
//     const d = nearbyHaversine(origin[0], origin[1], c[0], c[1]);
//     if (d > radius) return;
//     const area =
//       ["addr:street", "addr:suburb", "addr:city"]
//         .map((k) => String(tags[k] || "").trim())
//         .filter((v, i, arr) => v && arr.indexOf(v) === i)
//         .join(", ") || null;
//     out.push({ name, subtitle: area, distanceMeters: Math.round(d), latitude: c[0], longitude: c[1] });
//   });
//   // Same station mapped twice (node + building): keep the nearest one.
//   const kept = [];
//   out
//     .sort((a, b) => a.distanceMeters - b.distanceMeters)
//     .forEach((it) => {
//       const n = nearbyNormalize(it.name) || it.name.toLowerCase();
//       if (!kept.some((k) => k._n === n && nearbyHaversine(k.latitude, k.longitude, it.latitude, it.longitude) <= 400)) {
//         kept.push({ ...it, _n: n });
//       }
//     });
//   return kept.slice(0, limit).map(({ _n, ...it }) => it);
// };

// const fetchMetro = async ({ propertyId, baseUrl, origin, radius, limit }) => {
//   // 1) Backend (server cache + address fallback), unless its route is missing.
//   if (baseUrl && propertyId && !nearbyApiSkipped()) {
//     const url = `${baseUrl.replace(/\/+$/, "")}/properties/${encodeURIComponent(propertyId)}/nearby-connectivity`;
//     try {
//       const res = await axios.get(url, { params: { radius, limit }, timeout: NEARBY_API_TIMEOUT_MS });
//       if (Array.isArray(res.data?.metroStations)) {
//         return res.data.metroStations.map((s) => ({
//           name: s.name,
//           subtitle: s.address || null,
//           distanceMeters: s.distanceMeters,
//           latitude: s.latitude,
//           longitude: s.longitude,
//         }));
//       }
//     } catch (err) {
//       const status = err?.response?.status;
//       const type = String(err?.response?.headers?.["content-type"] || "");
//       if (status === 404 && type.includes("text/html")) markNearbyApiMissing();
//       if (!origin && err?.response?.data?.error?.code === "MISSING_COORDINATES") {
//         throw Object.assign(new Error("no location"), { noLocation: true });
//       }
//     }
//   }
//   // 2) Direct lookup from the property's location.
//   if (!origin) throw Object.assign(new Error("no location"), { noLocation: true });
//   const a = nearbyAround(radius, origin);
//   const st = `["railway"~"^(station|halt)$"]`;
//   const q =
//     `[out:json][timeout:12];(` +
//     `nwr${st}["station"~"^(subway|light_rail|monorail)$"]${a};` +
//     `nwr${st}["subway"="yes"]${a};` +
//     `nwr${st}["light_rail"="yes"]${a};` +
//     `nwr${st}["monorail"="yes"]${a};` +
//     `nwr["public_transport"="station"]["subway"="yes"]${a};` +
//     `nwr["railway"="station"]["network"~"metro",i]${a};` +
//     `nwr["railway"="station"]["operator"~"metro",i]${a};` +
//     `nwr["railway"="station"]["name"~"metro",i]${a};` +
//     `);out center tags;`;
//   return parseMetro(await runOverpassQuery(q), origin, radius, limit);
// };

// /* ---------------- Airports ---------------- */

// const parseAirports = (elements, origin, limit) => {
//   const byCode = new Map();
//   (elements || []).forEach((el) => {
//     const tags = el.tags || {};
//     const iata = String(tags.iata || "").trim().toUpperCase();
//     const name = nearbyNameOf(tags);
//     const c = nearbyToCoords(el.lat ?? el.center?.lat, el.lon ?? el.center?.lon);
//     if (!iata || !name || !c) return;
//     if (tags.disused || tags.abandoned || String(tags["aerodrome:type"] || "").toLowerCase() === "military") return;
//     const d = nearbyHaversine(origin[0], origin[1], c[0], c[1]);
//     const type = tags["aerodrome:type"] || tags.aerodrome || "";
//     const item = {
//       name,
//       subtitle: [iata, type ? `${nearbyTitleCase(type)} airport` : null].filter(Boolean).join(" · "),
//       badge: iata,
//       distanceMeters: Math.round(d),
//       latitude: c[0],
//       longitude: c[1],
//       _score: Object.keys(tags).length,
//     };
//     // Same airport mapped twice: keep the better-described entry.
//     const prev = byCode.get(iata);
//     if (!prev || item._score > prev._score || (item._score === prev._score && item.distanceMeters < prev.distanceMeters)) {
//       byCode.set(iata, item);
//     }
//   });
//   return [...byCode.values()]
//     .sort((a, b) => a.distanceMeters - b.distanceMeters)
//     .slice(0, limit)
//     .map(({ _score, ...it }) => it);
// };

// const fetchAirports = async ({ origin, radius, limit }) => {
//   if (!origin) throw Object.assign(new Error("no location"), { noLocation: true });
//   const query = (r) =>
//     `[out:json][timeout:15];nwr["aeroway"="aerodrome"]["iata"]${nearbyAround(r, origin)};out center tags;`;
//   let items = parseAirports(await runOverpassQuery(query(radius)), origin, limit);
//   // Nothing close? Look further out once (smaller towns).
//   if (!items.length) items = parseAirports(await runOverpassQuery(query(200000)), origin, limit);
//   return items;
// };

// /* ---------------- Main roads ---------------- */

// const NEARBY_ROAD_CLASS = {
//   motorway: { rank: 4, label: "Expressway" },
//   trunk: { rank: 3, label: "Highway" },
//   primary: { rank: 2, label: "Main road" },
//   secondary: { rank: 1, label: "Arterial road" },
// };

// const parseRoads = (elements, origin, radius, limit) => {
//   const byRoad = new Map();
//   (elements || []).forEach((el) => {
//     const tags = el.tags || {};
//     const cls = NEARBY_ROAD_CLASS[tags.highway];
//     if (!cls || !Array.isArray(el.geometry) || !el.geometry.length) return;
//     const ref = String(tags.ref || "").trim();
//     const name = nearbyNameOf(tags) || ref;
//     if (!name) return;
//     const near = nearbyClosestOnLine(origin, el.geometry);
//     if (!near || near.d > radius) return;
//     const key = nearbyNormalize(name) || name.toLowerCase();
//     const prev = byRoad.get(key);
//     const bestCls = prev && prev.rank > cls.rank ? prev : { rank: cls.rank, label: cls.label };
//     if (!prev || near.d < prev.distanceMeters) {
//       byRoad.set(key, {
//         name,
//         subtitle: [bestCls.label, ref && ref !== name ? ref : null].filter(Boolean).join(" · "),
//         rank: bestCls.rank,
//         label: bestCls.label,
//         ref: ref || (prev && prev.ref) || "",
//         distanceMeters: Math.round(near.d),
//         latitude: near.lat,
//         longitude: near.lon,
//       });
//     } else if (cls.rank > prev.rank) {
//       prev.rank = cls.rank;
//       prev.label = cls.label;
//       prev.subtitle = [cls.label, prev.ref && prev.ref !== prev.name ? prev.ref : null].filter(Boolean).join(" · ");
//     }
//   });
//   return [...byRoad.values()]
//     .sort((a, b) => a.distanceMeters - b.distanceMeters)
//     .slice(0, limit)
//     .map(({ rank, label, ref, ...it }) => it);
// };

// const fetchRoads = async ({ origin, radius, limit }) => {
//   if (!origin) throw Object.assign(new Error("no location"), { noLocation: true });
//   const q =
//     `[out:json][timeout:15];` +
//     `way["highway"~"^(motorway|trunk|primary|secondary)$"]${nearbyAround(radius, origin)};` +
//     `out tags geom;`;
//   return parseRoads(await runOverpassQuery(q), origin, radius, limit);
// };

// const NEARBY_FETCHERS = { metro: fetchMetro, airport: fetchAirports, road: fetchRoads };

// /* ---------------- Leaflet map (loaded on demand, no npm install) ---------------- */

// let nearbyLeafletPromise = null;
// const loadLeaflet = () => {
//   if (typeof window === "undefined") return Promise.reject(new Error("no window"));
//   if (window.L && window.L.map) return Promise.resolve(window.L);
//   if (nearbyLeafletPromise) return nearbyLeafletPromise;
//   nearbyLeafletPromise = new Promise((resolve, reject) => {
//     if (!document.getElementById("leaflet-css")) {
//       const link = document.createElement("link");
//       link.id = "leaflet-css";
//       link.rel = "stylesheet";
//       link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
//       document.head.appendChild(link);
//     }
//     const script = document.createElement("script");
//     script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
//     script.async = true;
//     script.onload = () => (window.L ? resolve(window.L) : reject(new Error("Leaflet missing")));
//     script.onerror = () => {
//       nearbyLeafletPromise = null;
//       reject(new Error("Leaflet failed to load"));
//     };
//     document.body.appendChild(script);
//   });
//   return nearbyLeafletPromise;
// };

// const NEARBY_HOME_SVG =
//   '<svg viewBox="0 0 24 24" width="16" height="16" fill="#fff"><path d="M12 3 2.5 11.2h2.8V21h5.2v-6h3v6h5.2v-9.8h2.8z"/></svg>';

// const nearbyHomeIcon = (L) =>
//   L.divIcon({
//     className: "apnaghar-map-pin",
//     iconSize: [36, 44],
//     iconAnchor: [18, 42],
//     html:
//       '<div style="position:relative;width:36px;height:44px">' +
//       '<div style="position:absolute;left:2px;top:0;width:32px;height:32px;border-radius:50% 50% 50% 0;' +
//       "transform:rotate(-45deg);background:linear-gradient(135deg,#D61F45,#B91C3C);" +
//       'box-shadow:0 6px 14px rgba(214,31,69,.45);border:2px solid #fff"></div>' +
//       `<div style="position:absolute;left:10px;top:8px">${NEARBY_HOME_SVG}</div></div>`,
//   });

// const nearbyPlaceIcon = (L, n, selected) => {
//   const size = selected ? 32 : 26;
//   return L.divIcon({
//     className: "apnaghar-map-pin",
//     iconSize: [size, size],
//     iconAnchor: [size / 2, size / 2],
//     html:
//       `<div style="width:${size}px;height:${size}px;border-radius:50%;display:flex;align-items:center;` +
//       `justify-content:center;font:700 ${selected ? 13 : 12}px/1 system-ui,sans-serif;` +
//       `background:${selected ? "#D61F45" : "#fff"};color:${selected ? "#fff" : "#D61F45"};` +
//       `border:2px solid #D61F45;box-shadow:0 4px 10px rgba(23,37,58,.25)">${n}</div>`,
//   });
// };

// const NearbyMap = ({ origin, items, selected, onSelect }) => {
//   const elRef = useRef(null);
//   const mapRef = useRef(null);
//   const layerRef = useRef(null);
//   const lastItemsRef = useRef(null);
//   const [ready, setReady] = useState(false);
//   const [failed, setFailed] = useState(false);

//   // Create the map once.
//   useEffect(() => {
//     let cancelled = false;
//     loadLeaflet()
//       .then((L) => {
//         if (cancelled || !elRef.current || mapRef.current) return;
//         const map = L.map(elRef.current, { scrollWheelZoom: false, zoomControl: true });
//         L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
//           subdomains: "abcd",
//           maxZoom: 19,
//           attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; CARTO',
//         }).addTo(map);
//         layerRef.current = L.layerGroup().addTo(map);
//         mapRef.current = map;
//         setReady(true);
//         setTimeout(() => map.invalidateSize(), 50);
//       })
//       .catch(() => !cancelled && setFailed(true));
//     return () => {
//       cancelled = true;
//       if (mapRef.current) {
//         mapRef.current.remove();
//         mapRef.current = null;
//       }
//     };
//   }, []);

//   // Draw markers / line and frame the view.
//   useEffect(() => {
//     const map = mapRef.current;
//     const layer = layerRef.current;
//     const L = window.L;
//     if (!ready || !map || !layer || !L) return;

//     layer.clearLayers();
//     const all = [];
//     if (origin) {
//       L.marker(origin, { icon: nearbyHomeIcon(L), zIndexOffset: 1000 })
//         .bindTooltip("This property", { direction: "top", offset: [0, -40] })
//         .addTo(layer);
//       all.push(origin);
//     }
//     items.forEach((it, i) => {
//       const isSel = i === selected;
//       const pos = [it.latitude, it.longitude];
//       L.marker(pos, { icon: nearbyPlaceIcon(L, i + 1, isSel), zIndexOffset: isSel ? 900 : 0 })
//         .bindTooltip(`${it.name} · ${nearbyFormatDistance(it.distanceMeters)}`, {
//           direction: "top",
//           offset: [0, isSel ? -16 : -13],
//           permanent: isSel,
//         })
//         .on("click", () => onSelect(i))
//         .addTo(layer);
//       all.push(pos);
//     });

//     const sel = items[selected];
//     if (origin && sel) {
//       L.polyline([origin, [sel.latitude, sel.longitude]], {
//         color: "#D61F45",
//         weight: 3,
//         opacity: 0.9,
//         dashArray: "6 8",
//       }).addTo(layer);
//     }

//     const itemsChanged = lastItemsRef.current !== items;
//     lastItemsRef.current = items;
//     const frame = itemsChanged ? all : origin && sel ? [origin, [sel.latitude, sel.longitude]] : all;
//     if (frame.length === 1) map.setView(frame[0], 15);
//     else if (frame.length > 1) map.fitBounds(L.latLngBounds(frame), { padding: [40, 40], maxZoom: 16 });
//   }, [ready, origin, items, selected, onSelect]);

//   const sel = items[selected];

//   if (failed) {
//     // Fallback when the map library can't load: a Google map of the selected place.
//     const target = sel ? `${sel.latitude},${sel.longitude}` : origin ? `${origin[0]},${origin[1]}` : null;
//     return target ? (
//       <iframe
//         title="Nearby map"
//         className="block w-full h-64 md:h-80 border border-[#FDE8EC] rounded-2xl"
//         src={`https://maps.google.com/maps?q=${target}&z=14&output=embed`}
//         loading="lazy"
//         allowFullScreen
//       />
//     ) : null;
//   }

//   return (
//     <div
//       className="relative overflow-hidden border border-[#FDE8EC] rounded-2xl bg-[#FFF7F9]"
//       style={{ isolation: "isolate" }} // keeps map controls below the sticky header/tabs
//     >
//       <div ref={elRef} className="w-full h-64 md:h-80" />
//       {!ready && (
//         <div className="absolute inset-0 flex items-center justify-center text-[13px] text-gray-400 animate-pulse">
//           Loading map…
//         </div>
//       )}
//       <div className="absolute z-[500] flex items-center gap-3 px-3 py-1.5 text-[11.5px] font-medium text-gray-600 bg-white/95 border border-[#FDE8EC] rounded-xl shadow-sm left-3 top-3">
//         <span className="flex items-center gap-1.5">
//           <span className="inline-block w-3 h-3 rounded-full bg-[#D61F45]" /> Property
//         </span>
//         <span className="flex items-center gap-1.5">
//           <span className="inline-block w-3 h-3 bg-white border-2 border-[#D61F45] rounded-full" /> Nearby
//         </span>
//       </div>
//     </div>
//   );
// };

// /* ---------------- Cards & states ---------------- */

// const NearbySkeleton = () => (
//   <div className="grid grid-cols-1 gap-3 mt-4 sm:grid-cols-2 xl:grid-cols-3">
//     {Array.from({ length: 6 }).map((_, i) => (
//       <div key={i} className="p-4 bg-white border border-[#FDE8EC] rounded-2xl animate-pulse">
//         <div className="flex items-start gap-3">
//           <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#FFF1F4]" />
//           <div className="flex-1 space-y-2">
//             <div className="w-3/4 h-3.5 rounded bg-gray-100" />
//             <div className="w-1/3 h-3 rounded bg-gray-100" />
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
// );

// const NearbyStateBox = ({ icon: Icon, title, text, action }) => (
//   <div className="flex flex-col items-center justify-center px-4 py-10 mt-4 text-center rounded-2xl bg-[#FFF7F9] border border-dashed border-[#FAD3DB]">
//     <span className="flex items-center justify-center w-14 h-14 bg-white rounded-full text-[#D61F45] shadow-[0_6px_16px_rgba(214,31,69,0.1)]">
//       <Icon size={28} weight="fill" />
//     </span>
//     {title && <p className="m-0 mt-3 text-[15px] font-semibold text-[#17253a]">{title}</p>}
//     {text && <p className="m-0 mt-1 text-[13px] text-gray-500">{text}</p>}
//     {action}
//   </div>
// );

// const nearbyDirectionsUrl = (origin, item, mode) =>
//   `https://www.google.com/maps/dir/?api=1${origin ? `&origin=${origin[0]},${origin[1]}` : ""}` +
//   `&destination=${item.latitude},${item.longitude}&travelmode=${mode}`;

// const NearbyCard = ({ item, index, selected, onSelect, origin, category }) => {
//   const Icon = category.icon;
//   return (
//     <div
//       role="button"
//       tabIndex={0}
//       onClick={onSelect}
//       onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onSelect()}
//       className={`flex flex-col h-full p-4 bg-white border rounded-2xl cursor-pointer transition-all outline-none ${selected
//         ? "border-[#D61F45] shadow-[0_10px_24px_rgba(214,31,69,0.15)]"
//         : "border-[#FDE8EC] hover:border-[#FAD3DB] hover:shadow-[0_10px_24px_rgba(214,31,69,0.08)]"
//         }`}
//     >
//       <div className="flex items-start gap-3">
//         <span
//           className={`relative flex items-center justify-center flex-shrink-0 w-11 h-11 rounded-xl ${selected ? "bg-[#D61F45] text-white" : "bg-[#FDE8EC] text-[#D61F45]"
//             }`}
//         >
//           <Icon size={22} weight="fill" />
//           <span
//             className={`absolute -top-1.5 -right-1.5 flex items-center justify-center w-5 h-5 text-[10.5px] font-bold rounded-full border-2 border-white ${selected ? "bg-[#17253a] text-white" : "bg-[#D61F45] text-white"
//               }`}
//           >
//             {index + 1}
//           </span>
//         </span>
//         <div className="flex-1 min-w-0">
//           <div className="flex items-center gap-2">
//             <h4 className="m-0 text-[15px] font-semibold leading-snug text-[#17253a] truncate" title={item.name}>
//               {item.name}
//             </h4>
//             {index === 0 && (
//               <span className="flex-shrink-0 px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wide rounded-full bg-[#ECFDF3] text-[#15803D]">
//                 Nearest
//               </span>
//             )}
//           </div>
//           {item.subtitle && (
//             <p className="m-0 mt-1 text-[12.5px] text-gray-500 truncate" title={item.subtitle}>
//               {item.subtitle}
//             </p>
//           )}
//         </div>
//       </div>

//       <div className="flex items-center justify-between gap-2 pt-3 mt-auto">
//         <span
//           className="inline-flex items-center px-3 py-1 text-[12.5px] font-semibold rounded-full bg-[#FFF7F9] text-[#17253a] border border-[#FDE8EC]"
//           title="Straight-line distance from the property"
//         >
//           {nearbyFormatDistance(item.distanceMeters)}
//           <span className="ml-1 font-normal text-gray-500">away</span>
//         </span>
//         <a
//           href={nearbyDirectionsUrl(origin, item, category.travelMode)}
//           target="_blank"
//           rel="noopener noreferrer"
//           onClick={(e) => e.stopPropagation()}
//           className="inline-flex items-center gap-1.5 text-[13px] font-semibold no-underline text-[#D61F45] hover:underline"
//         >
//           <NavigationArrow size={15} weight="fill" />
//           Directions
//         </a>
//       </div>
//     </div>
//   );
// };

// const nearbySummary = (key, items) => {
//   const first = items[0];
//   if (!first) return null;
//   const d = nearbyFormatDistance(first.distanceMeters);
//   if (key === "metro")
//     return (
//       <>
//         {items.length} metro station{items.length > 1 ? "s" : ""} within 5 km · Nearest:{" "}
//         <b className="text-[#17253a]">{first.name}</b> ({d})
//       </>
//     );
//   if (key === "airport")
//     return (
//       <>
//         Nearest airport: <b className="text-[#17253a]">{first.name}</b>
//         {first.badge ? ` (${first.badge})` : ""} · {d}
//       </>
//     );
//   return (
//     <>
//       Nearest main road: <b className="text-[#17253a]">{first.name}</b> · {d}
//     </>
//   );
// };

// /* ---------------- Main component ---------------- */

// const NearbyConnectivity = ({ propertyId, baseUrl, latitude, longitude }) => {
//   const coordKey = (() => {
//     const c = nearbyToCoords(latitude, longitude);
//     return c ? `${c[0].toFixed(5)},${c[1].toFixed(5)}` : "";
//   })();
//   const origin = useMemo(() => (coordKey ? coordKey.split(",").map(Number) : null), [coordKey]);

//   const [activeKey, setActiveKey] = useState("metro");
//   const [selected, setSelected] = useState(0);
//   const [data, setData] = useState(() =>
//     Object.fromEntries(NEARBY_CATEGORIES.map((c) => [c.key, { loading: true, error: null, items: [] }])),
//   );

//   const loadCategory = useCallback(
//     async (cat, force = false) => {
//       const cacheKey = `${cat.key}|${cat.key === "metro" ? propertyId : ""}|${coordKey}`;
//       if (!force) {
//         const cached = nearbyCacheRead(cacheKey, cat.ttl);
//         if (cached) {
//           setData((d) => ({ ...d, [cat.key]: { loading: false, error: null, items: cached } }));
//           return;
//         }
//       }
//       setData((d) => ({ ...d, [cat.key]: { ...d[cat.key], loading: true, error: null } }));
//       try {
//         const items = await NEARBY_FETCHERS[cat.key]({
//           propertyId,
//           baseUrl,
//           origin,
//           radius: cat.radius,
//           limit: cat.limit,
//         });
//         nearbyCacheWrite(cacheKey, items);
//         setData((d) => ({ ...d, [cat.key]: { loading: false, error: null, items } }));
//       } catch (err) {
//         if (nearbyIsDev) console.warn(`[Nearby:${cat.key}]`, err?.message);
//         setData((d) => ({
//           ...d,
//           [cat.key]: {
//             loading: false,
//             items: [],
//             error: err?.noLocation
//               ? { message: "Location details aren't available for this property yet.", retryable: false }
//               : { message: `We couldn't load nearby ${cat.label.toLowerCase()} right now.`, retryable: true },
//           },
//         }));
//       }
//     },
//     [propertyId, baseUrl, coordKey, origin],
//   );

//   // Metro first (default tab), then airports and roads together.
//   useEffect(() => {
//     if (!propertyId) return undefined;
//     let cancelled = false;
//     (async () => {
//       await loadCategory(NEARBY_CATEGORIES[0]);
//       if (cancelled) return;
//       await Promise.all(NEARBY_CATEGORIES.slice(1).map((c) => loadCategory(c)));
//     })();
//     return () => {
//       cancelled = true;
//     };
//   }, [propertyId, loadCategory]);

//   const selectItem = useCallback((i) => setSelected(i), []);
//   const switchTab = (key) => {
//     setActiveKey(key);
//     setSelected(0);
//   };

//   if (!propertyId) return null;

//   const category = NEARBY_CATEGORIES.find((c) => c.key === activeKey) || NEARBY_CATEGORIES[0];
//   const current = data[category.key];
//   const items = current.items;

//   return (
//     <div>
//       {/* Tabs */}
//       <div className="flex gap-2 pb-1 overflow-x-auto" role="tablist" aria-label="Nearby connectivity">
//         {NEARBY_CATEGORIES.map((c) => {
//           const active = c.key === activeKey;
//           const st = data[c.key];
//           const Icon = c.icon;
//           return (
//             <button
//               key={c.key}
//               type="button"
//               role="tab"
//               aria-selected={active}
//               onClick={() => switchTab(c.key)}
//               className={`flex items-center flex-shrink-0 gap-2 px-4 py-2.5 text-[14px] font-semibold rounded-xl transition-all ${active
//                 ? "bg-gradient-to-r from-[#D61F45] to-[#B91C3C] text-white shadow-[0_6px_16px_rgba(214,31,69,0.3)]"
//                 : "text-gray-600 bg-white border border-[#FDE8EC] hover:text-[#D61F45] hover:bg-[#FFF1F4]"
//                 }`}
//             >
//               <Icon size={18} weight={active ? "fill" : "regular"} />
//               {c.label}
//               {st.loading ? (
//                 <span
//                   className={`w-3 h-3 border-2 rounded-full animate-spin ${active ? "border-white/40 border-t-white" : "border-[#FAD3DB] border-t-[#D61F45]"
//                     }`}
//                 />
//               ) : (
//                 !st.error && (
//                   <span
//                     className={`min-w-[22px] px-1.5 py-0.5 text-[11px] leading-none rounded-full ${active ? "bg-white/25 text-white" : "bg-[#FFF1F4] text-[#D61F45]"
//                       }`}
//                   >
//                     {st.items.length}
//                   </span>
//                 )
//               )}
//             </button>
//           );
//         })}
//       </div>

//       {/* Summary */}
//       {!current.loading && !current.error && items.length > 0 && (
//         <p className="m-0 mt-3 text-[13px] text-gray-600">{nearbySummary(category.key, items)}</p>
//       )}

//       {/* Map: property + every place in this tab */}
//       {(origin || items.length > 0) && (
//         <div className="mt-3">
//           <NearbyMap
//             origin={origin}
//             items={current.loading || current.error ? [] : items}
//             selected={selected}
//             onSelect={selectItem}
//           />
//         </div>
//       )}

//       {/* List */}
//       {current.loading && <NearbySkeleton />}

//       {!current.loading && current.error && (
//         <NearbyStateBox
//           icon={WarningCircle}
//           title={current.error.message}
//           text={current.error.retryable ? "Please check your connection and try again." : null}
//           action={
//             current.error.retryable && (
//               <button
//                 type="button"
//                 onClick={() => loadCategory(category, true)}
//                 className="inline-flex items-center gap-1.5 px-4 py-2 mt-4 text-[13px] font-semibold text-[#D61F45] bg-white border-[1.5px] border-[#D61F45] rounded-xl hover:bg-[#FDE8EC]"
//               >
//                 <ArrowClockwise size={15} weight="bold" />
//                 Try again
//               </button>
//             )
//           }
//         />
//       )}

//       {!current.loading && !current.error && items.length === 0 && (
//         <NearbyStateBox icon={category.icon} title={category.emptyTitle} text={category.emptyText} />
//       )}

//       {!current.loading && !current.error && items.length > 0 && (
//         <div className="grid grid-cols-1 gap-3 mt-4 sm:grid-cols-2 xl:grid-cols-3">
//           {items.map((item, i) => (
//             <NearbyCard
//               key={`${item.name}-${item.latitude}-${item.longitude}`}
//               item={item}
//               index={i}
//               selected={i === selected}
//               onSelect={() => setSelected(i)}
//               origin={origin}
//               category={category}
//             />
//           ))}
//         </div>
//       )}

//       <p className="m-0 mt-4 text-[11.5px] leading-relaxed text-gray-400">
//         Tap a place to see it on the map. Distances are straight-line from the property (for roads, to the nearest
//         point of the road); actual travel distance may be longer. Data © OpenStreetMap contributors.
//       </p>
//     </div>
//   );
// };

// const Detail = ({ propertyData }) => {
//   const toWords = new ToWords({
//     localeCode: "en-IN",
//     converterOptions: {
//       currency: false,
//       ignoreDecimal: true,
//       ignoreZeroCurrency: true,
//     },
//   });
//   // const [showAllImages, setShowAllImages] = useState(false);
//   const [savedProperties, setSavedProperties] = useState([]);
//   const [properties, setProperties] = useState([]);
//   // const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const sliderRef = useRef(null);
//   const overviewRef = useRef(null);
//   const moreDetailsRef = useRef(null);
//   const amenitiesRef = useRef(null);
//   const aboutRef = useRef(null);
//   const locationRef = useRef(null);
//   const statusTimelineRef = useRef(null);
//   const nearbyRef = useRef(null);
//   const [activeSection, setActiveSection] = useState("overview");
//   const [currentShareUrl1, setcurrentShareUrl1] = useState("");
//   const [propertyDetails, setPropertyDetails] = useState({});
//   const userId = sessionStorage.getItem("accessToken");
//   const history = useHistory();
//   const { searchCity } = useCity();
//   const [currentShareUrl, setCurrentShareUrl] = useState("");
//   const [activeShareId, setActiveShareId] = useState(null);
//   const [tourSchedule, setTourSchedule] = useState([]);

//   const [freeViewCount, setFreeViewCount] = useState(0);
//   const [paidViewCount, setPaidViewCount] = useState(0);

//   const formatArea = (area, unit) => {
//     if (!area) return null;

//     const formattedUnit = unit ? unit.trim().toLowerCase() : "";

//     return `${area} ${formattedUnit}`;
//   };
//   const scrollToSection = (ref, key) => {
//     setActiveSection(key);
//     ref.current?.scrollIntoView({
//       behavior: "smooth",
//       block: "start",
//     });
//   };
//   const checkPostLimits = async () => {
//     try {
//       const profileForm = new FormData();
//       profileForm.append("user_id", userId);

//       const profileResponse = await axios.post(
//         `${process.env.REACT_APP_API_URL}/cust_api/get_profile`,
//         profileForm,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         },
//       );

//       const countData = profileResponse?.data?.count_data;

//       if (countData) {
//         setFreeViewCount(countData.free_view_count || 0);
//         setPaidViewCount(countData.paid_view_count || 0);
//       }
//     } catch (error) {
//       console.error("Error checking post limits:", error);
//     }
//   };

//   useEffect(() => {
//     if (userId) {
//       checkPostLimits();
//     }
//   }, [userId]);

//   const handleAddCount = async (updatedCount) => {
//     try {
//       const addCountFormData = new FormData();
//       if (freeViewCount > 0) {
//         addCountFormData.append("free_view_count", updatedCount);
//       } else {
//         addCountFormData.append("paid_view_count", updatedCount);
//       }
//       addCountFormData.append("user_id", userId);

//       const response = await fetch(
//         `${process.env.REACT_APP_API_URL}/cust_api/add_count`,
//         {
//           method: "POST",
//           body: addCountFormData,
//         },
//       );

//       const data = await response.json();

//       if (response.ok) {
//         checkPostLimits();
//       } else {
//         console.error("Failed to update count:", data.message);
//       }
//     } catch (error) {
//       console.error("API error:", error);
//     }
//   };

//   useEffect(() => {
//     // const userId = sessionStorage.getItem("AccessToken");
//     if (userId) {
//       setIsLoggedIn(true);
//       fetchSavedProperties(userId);
//     } else {
//       setIsLoggedIn(false);
//     }
//   }, []);

//   const fetchSavedProperties = async () => {
//     // const userId = sessionStorage.getItem("AccessToken");
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}/cust_api/get_favorite_properties`,
//         { user_id: userId },
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

//   const fetchRecommendedProperties = async () => {
//     try {
//       const cityName =
//         searchCity && searchCity.trim() !== ""
//           ? searchCity.trim()
//           : sessionStorage.getItem("cityName") || "";
//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}/cust_api/get_featured_property`,
//         {
//           user_id: userId,
//           city_name: cityName,
//         },
//       );
//       if (response.data.status === 1 && Array.isArray(response.data.data)) {
//         setProperties(response.data.data);
//       } else {
//         setProperties([]);
//       }
//     } catch (error) {
//       console.error("Error fetching recommended properties:", error);
//     }
//   };

//   useEffect(() => {
//     fetchRecommendedProperties();
//   }, []);

//   //add to favorite started
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [favoriteId, setFavoriteId] = useState(null); // Store the favorite_id for removal

//   // Check if the property is a favorite on page load or when propertyDetails changes
//   const checkIfFavorite = async (propertyId) => {
//     // const userId = sessionStorage.getItem("accessToken");
//     if (!userId || !propertyId) return;

//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}/cust_api/get_favorite_properties`,
//         { user_id: userId },
//       );

//       const favoriteList = response.data.data || [];
//       const matchedFavorite = favoriteList.find(
//         (fav) => String(fav._id) === String(propertyId),
//       );

//       if (matchedFavorite) {
//         setIsFavorite(true);
//         setFavoriteId(matchedFavorite.favorite_id); // Save favorite_id for removal
//       } else {
//         setIsFavorite(false);
//         setFavoriteId(null);
//       }
//     } catch (error) {
//       console.error("Error checking favorite status:", error);
//     }
//   };

//   useEffect(() => {
//     checkIfFavorite(propertyDetails?._id);
//   }, [propertyDetails?._id]);

//   //  Add to favorites
//   const addToFavorites = async () => {
//     if (!userId) {
//       setIsLoginModalOpen(true);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}/cust_api/add_to_favorite`,
//         {
//           user_id: userId,
//           property_id: propertyDetails._id,
//         },
//       );
//       setIsFavorite(true); // Immediately set isFavorite to true
//       checkIfFavorite(_id); // Save the favorite_id from the response
//       toast.success("Property has been saved to your favorites!");
//       fetchPropertyDetails(_id);
//       fetchRecommendedProperties();
//     } catch (error) {
//       console.error("Error adding property to favorites:", error);
//       toast.error("Failed to save the property. Please try again.");
//     }
//   };

//   // Remove from favorites
//   const removeFromFavorites = async () => {
//     if (!favoriteId) return;

//     try {
//       await axios.delete(
//         `${process.env.REACT_APP_API_URL}/cust_api/remove_from_favorite`,
//         { data: { favorite_id: favoriteId } }, // DELETE request with body
//       );

//       toast.success("Property removed from your favorites.");
//       checkIfFavorite(_id);
//       fetchPropertyDetails(_id);
//       fetchRecommendedProperties();
//     } catch (error) {
//       console.error("Error removing property from favorites:", error);
//       toast.error("Failed to remove the property. Please try again.");
//     }
//   };

//   //  Add to favorites
//   const addToFavoritesRecommendedProperty = async (PropertyId) => {
//     if (!userId) {
//       setIsLoginModalOpen(true);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}/cust_api/add_to_favorite`,
//         {
//           user_id: userId,
//           property_id: PropertyId,
//         },
//       );
//       checkIfFavorite(_id);
//       fetchPropertyDetails(_id);
//       fetchRecommendedProperties();
//     } catch (error) {
//       console.log("Failed to save the property. Please try again.");
//     }
//   };

//   // Remove from favorites
//   const removeFromFavoritesRecommendedProperty = async (FavoriteId) => {
//     try {
//       await axios.delete(
//         `${process.env.REACT_APP_API_URL}/cust_api/remove_from_favorite`,
//         { data: { favorite_id: FavoriteId } },
//       );

//       checkIfFavorite(_id);
//       fetchPropertyDetails(_id);
//       fetchRecommendedProperties();
//     } catch (error) {
//       console.log("Failed to remove the property. Please try again.");
//     }
//   };

//   // Slider settings
//   const [activeIndexes, setActiveIndexes] = useState({});
//   const BASE_URL = process.env.REACT_APP_API_URL;
//   const settings = {
//     infinite: true,
//     slidesToShow: 4,
//     lazyLoad: "ondemand",
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     arrows: false,
//     cssEase: "linear",
//     centerMode: false,
//     centerPadding: "0px",
//     responsive: [
//       {
//         breakpoint: 1399,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 1023,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 767,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };
//   const openShareModal1 = (url) => {
//     setcurrentShareUrl1(url);
//     const modal = document.getElementById("shareModal1");
//     if (modal) {
//       modal.style.display = "block";
//     }
//   };

//   const openShareModal = (url, propertyId) => {
//     setCurrentShareUrl(url);
//     setActiveShareId(propertyId);
//     setIsShareModalOpen(true);
//   };

//   const formatPrice = (price) => {
//     if (price === null || price === undefined || price === "") return "";

//     price = Number(price);

//     if (price >= 10000000) {
//       return (price / 10000000).toFixed(2).replace(/\.?0+$/, "") + " Cr";
//     } else if (price >= 100000) {
//       return (price / 100000).toFixed(2).replace(/\.?0+$/, "") + " L";
//     } else if (price >= 1000) {
//       return (price / 1000).toFixed(2).replace(/\.?0+$/, "") + " K";
//     } else {
//       return price.toString();
//     }
//   };

//   // for the image section with 'get_property_detail' api

//   const { _id } = useParams();
//   const location = useLocation();
//   const property_owner_id = location.state?.property_owner_id;
//   const [aboutPropertyText, setAboutPropertyText] = useState("");

//   const [showAll, setShowAll] = useState(false);
//   const [allAmenities, setAllAmenities] = useState([]);
//   const visibleAmenities = showAll ? allAmenities : allAmenities.slice(0, 8);

//   const [propertyImages, setPropertyImages] = useState([]);
//   const [showAllImages, setShowAllImages] = useState(false);
//   const [longitude, setLongitude] = useState(0);
//   const [latitude, setLatitude] = useState(0);
//   const [userDetails, setuserDetails] = useState({
//     full_name: "",
//     mobile_number: "",
//     email: "",
//   });

//   const user_id = sessionStorage.getItem("accessToken");
//   useEffect(() => {
//     const customer_id = user_id;

//     if (propertyDetails?._id && propertyDetails?.user_id && customer_id) {
//       const formData = new FormData();
//       formData.append("property_id", propertyDetails?._id);
//       formData.append("user_id", propertyDetails?.user_id);
//       formData.append("customer_id", customer_id);

//       axios
//         .post(
//           `${process.env.REACT_APP_API_URL}/cust_api/add_view_property`,
//           formData,
//         )
//         .then((res) => {
//           if (res.data?.status === 1) {
//             console.log("View property recorded");
//           }
//         })
//         .catch((err) => {
//           console.error("Failed to record property view:", err);
//         });
//     }
//   }, [propertyDetails?._id, user_id]);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const fetchPropertyDetails = async (id) => {
//     try {
//       const res = await axios.post(
//         `${process.env.REACT_APP_API_URL}/cust_api/get_property_details`,
//         { property_id: id, user_id: userId },
//       );

//       const data = res.data?.data;
//       console.log("API Response:", data);
//       console.log("Price Onwards:", data.price_onwards);

//       if (data?.property_images?.length > 0) {
//         setPropertyImages(data.property_images);
//       } else {
//         setPropertyImages([]);
//       }

//       if (data?.amenities?.length > 0) {
//         setAllAmenities(data.amenities);
//       } else {
//         setAllAmenities([]);
//       }

//       if (
//         data?.tour_schedule?.length > 0 &&
//         data.tour_schedule[0].status !== "Rejected" &&
//         data.tour_schedule[0].status !== "Expired"
//       ) {
//         setTourSchedule(data.tour_schedule);
//         const dateParts = data.tour_schedule[0].schedule_date.split("-");
//         const year = dateParts[0].slice(-2); // "25"
//         const month = parseInt(dateParts[1], 10) - 1; // month index
//         const day = parseInt(dateParts[2], 10); // 24

//         const monthName = new Date(0, month).toLocaleString("default", {
//           month: "short",
//         });

//         const scheduledLabel = `Scheduled ${day} ${monthName} ${year}`;
//         setScheduledDateLabel(scheduledLabel);
//       } else {
//         setTourSchedule([]);
//         setScheduledDateLabel("Virtual Tour");
//       }

//       if (data?.property_details?.property_description) {
//         setAboutPropertyText(data.property_details.property_description);
//       } else {
//         setAboutPropertyText("");
//       }

//       if (data?.property_details) {
//         setPropertyDetails(data.property_details);
//       } else {
//         setPropertyDetails({});
//       }

//       if (
//         data?.user_details &&
//         Array.isArray(data.user_details) &&
//         data.user_details.length > 0
//       ) {
//         setuserDetails(data.user_details[0]);
//       } else {
//         setuserDetails({
//           full_name: "N/A",
//           mobile_number: "N/A",
//           email: "N/A",
//         });
//         console.warn("user_details is empty or invalid:", data?.user_details);
//       }

//       const pd = data.property_details;
//       setLatitude(pd.latitude);
//       setLongitude(pd.longitude);
//     } catch (err) {
//       console.error("Error fetching property details", err);
//       setPropertyImages([]);
//       setAllAmenities([]);
//       setTourSchedule([]);
//     }
//   };

//   useEffect(() => {
//     fetchPropertyDetails(_id);
//   }, [_id]);

//   // for send Enquiry 'add_property_enquiry' api

//   const [name, setName] = useState("");
//   const [message, setMessage] = useState("");
//   const [contactNumber, setContactNumber] = useState("");
//   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
//   const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [enquiryStatus, setEnquiryStatus] = useState(null); // success or error

//   // Existing useEffect (on mount)
//   useEffect(() => {
//     const mobileNumber = sessionStorage.getItem("Mobile_Number");
//     if (mobileNumber) {
//       setContactNumber(mobileNumber);
//     }
//   }, []);

//   //  New useEffect to check sessionStorage and update contact number after login
//   useEffect(() => {
//     let interval;

//     if (isLoginModalOpen === false && !contactNumber) {
//       interval = setInterval(() => {
//         const mobileNumber = sessionStorage.getItem("Mobile_Number");
//         if (mobileNumber) {
//           setContactNumber(mobileNumber);
//           clearInterval(interval); // Stop checking once we have it
//         }
//       }, 500); // Check every 500ms
//     }

//     return () => clearInterval(interval); // Cleanup
//   }, [isLoginModalOpen, contactNumber]);

//   const userType = sessionStorage.getItem("user_type");
//   // Handle Enquiry Form submission
//   const handleEnquirySubmit = async (e) => {
//     e.preventDefault();

//     const accessToken = sessionStorage.getItem("accessToken");

//     if (!accessToken) {
//       setIsLoginModalOpen(true);
//       return;
//     }

//     const enquiryData = {
//       property_id: propertyDetails?._id,
//       user_id: propertyDetails?.user_id,
//       customer_id: accessToken,
//       name,
//       user_type: userType,
//       contact_number: contactNumber,
//       message,
//     };

//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}/cust_api/add_property_enquiry`,
//         enquiryData,
//       );

//       if (response.data.status) {
//         setEnquiryStatus({
//           type: "success",
//           message: "Enquiry sent successfully!",
//         });
//         setName("");
//         setMessage("");
//       } else {
//         setEnquiryStatus({ type: "error", message: "Failed to send enquiry!" });
//       }
//     } catch (error) {
//       setEnquiryStatus({ type: "error", message: "Something went wrong!" });
//     }
//   };

//   // Trigger login modal on input if not logged in
//   const handleFieldChange = () => {
//     const accessToken = sessionStorage.getItem("accessToken");
//     if (!accessToken) {
//       setIsLoginModalOpen(true);
//     }
//   };

//   const handleLoginSuccess = () => {
//     const mobileNumber = sessionStorage.getItem("Mobile_Number");
//     if (mobileNumber) {
//       setIsLoggedIn(true);
//       setContactNumber(mobileNumber);
//       setIsLoginModalOpen(false);
//     }
//   };

//   // for the schedule virtula tour
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [scheduledDateLabel, setScheduledDateLabel] = useState("Virtual Tour");
//   const [openVirtualTourAfterLogin, setOpenVirtualTourAfterLogin] =
//     useState(false);
//   useEffect(() => {
//     const token = sessionStorage.getItem("accessToken");
//     if (token && openVirtualTourAfterLogin) {
//       setIsModalOpen(true); // Open Virtual Tour
//       setOpenVirtualTourAfterLogin(false); // Reset flag
//     }
//   }, [isLoggedIn]);

//   // for share model
//   const [openShareModalAfterLogin, setOpenShareModalAfterLogin] =
//     useState(false);
//   const [isShareModalOpen, setIsShareModalOpen] = useState(false);
//   useEffect(() => {
//     const token = sessionStorage.getItem("accessToken");
//     if (token && openShareModalAfterLogin) {
//       setIsShareModalOpen(true); // Open Share modal
//       setOpenShareModalAfterLogin(false); // Reset flag
//     }
//   }, [isLoggedIn]);

//   const handleCloseShareModal = () => {
//     setIsShareModalOpen(false);
//   };

//   //for the contact details
//   const [isContactModalOpen, setIsContactModalOpen] = useState(false);
//   const [openContactModalAfterLogin, setOpenContactModalAfterLogin] =
//     useState(false);

//   const userName = sessionStorage.getItem("user_name");
//   const userMobile = sessionStorage.getItem("Mobile_Number");

//   useState(false);
//   useEffect(() => {
//     if (sessionStorage.getItem("accessToken") && openContactModalAfterLogin) {
//       setIsContactModalOpen(true);
//       setOpenContactModalAfterLogin(false);
//     }
//   }, [openContactModalAfterLogin]);

//   // Add this line below all useState declarations or just before return:
//   const overviewFields = [
//     //["Status", propertyDetails?.available_status || null],
//     ["Property Added Date", propertyDetails?.property_added_date ? formatDateToDDMMYYYY(propertyDetails.property_added_date) : null],
//     ["Property Name", propertyDetails?.property_name || null],
//     // [
//     //   "Address",
//     //   propertyDetails?.address &&
//     //   propertyDetails?.city_name &&
//     //   propertyDetails?.state &&
//     //   propertyDetails?.zip_code
//     //     ? `${propertyDetails.address}, ${propertyDetails.city_name}, ${propertyDetails.state}, ${propertyDetails.zip_code}`
//     //     : null,
//     // ],
//     [
//       "Address",
//       propertyDetails?.address || null,
//     ],
//     [
//       "Area",
//       propertyDetails?.area
//         ? formatArea(propertyDetails.area, propertyDetails.area_in)
//         : null,
//     ],
//     ["Area Type", propertyDetails?.area_type || null],
//     [
//       "Price",
//       propertyDetails?.property_category_type === "Rent"
//         ? propertyDetails?.rent
//           ? `₹${formatPrice(propertyDetails.rent)}`
//           : null
//         : propertyDetails?.property_price
//           ? `₹${formatPrice(propertyDetails.property_price)}`
//           : null,
//     ],
//     [
//       "Deposit",
//       propertyDetails?.custom_deposit_amount
//         ? `₹${formatPrice(propertyDetails.custom_deposit_amount)}`
//         : null,
//     ],
//     ["Listing Type", propertyDetails?.property_category_type || null],
//     // ["Developer", propertyDetails?.developer || null],
//     ["Building Type", propertyDetails?.building_type || null],
//     ["Property Type", propertyDetails?.property_type || null],
//     [
//       "Bhk Type",
//       propertyDetails?.bhk_type === "Studio"
//         ? "Studio/Single Room"
//         : propertyDetails?.bhk_type || null,
//     ],
//     ["Furnishing", propertyDetails?.furnished_type || null],
//     // ["Plot No.", propertyDetails?.plot_no || null],
//     ["Operating Since", propertyDetails?.operating_since || null],
//     [
//       "Available for Company Lease",
//       propertyDetails?.available_for_company_lease || null,
//     ],
//     ["Available For", propertyDetails?.available_for || null],
//     ["Suited For", propertyDetails?.suited_for || null],
//     ["Room Type", propertyDetails?.room_type || null],
//     ["Food Charges Included", propertyDetails?.food_charges_included || null],
//   ].filter(([_, value]) => value);

//   //more details

//   const moreDetailsFields = [
//     ["Food Available", propertyDetails?.food_available || null],
//     ["Notice Period", propertyDetails?.notice_period || null],
//     [
//       "Notice Period Other Days",
//       propertyDetails?.notice_period_other_days || null,
//     ],
//     [
//       "Electricity Charges Included",
//       propertyDetails?.electricity_charges_included || null,
//     ],
//     ["Total Beds", propertyDetails?.total_beds || null],
//     ["Additional Rooms", propertyDetails?.additional_rooms || null],
//     ["PG Rules", propertyDetails?.pg_rules || null],
//     ["Gate Closing Time", propertyDetails?.gate_closing_time || null],
//     ["Gate Closing Hour", propertyDetails?.gate_closing_hour || null],
//     ["PG Services", propertyDetails?.pg_services || null],
//     ["Age of Property", propertyDetails?.age_of_property || null],
//     ["Office Space Type", propertyDetails?.office_space_type || null],
//     ["Pantry", propertyDetails?.pantry || null],
//     ["Personal Washroom", propertyDetails?.personal_washroom || null],
//     ["Bathroom", propertyDetails?.bathroom || null],
//     ["Covered Parking", propertyDetails?.covered_parking || null],
//     ["Uncovered Parking", propertyDetails?.uncovered_parking || null],
//     ["Balcony", propertyDetails?.balcony || null],
//     ["Power Backup", propertyDetails?.power_backup || null],
//     ["Lift Availability", propertyDetails?.lift_availability || null],
//     ["Water Source", propertyDetails?.water_source || null],
//     ["View", propertyDetails?.view || null],
//     ["Flooring", propertyDetails?.flooring || null],
//     ["Total Floor", propertyDetails?.total_floor || null],
//     ["Property Floor", propertyDetails?.property_floor || null],
//     ["Facing", propertyDetails?.facing || null],
//     ["Ceiling Height", propertyDetails?.ceiling_height || null],
//     ["Parking Availability", propertyDetails?.parking_availability || null],
//     ["Min Lockin Period", propertyDetails?.min_lockin_period || null],
//     ["Seat Type", propertyDetails?.seat_type || null],
//     [
//       "Number of Seats Available",
//       propertyDetails?.number_of_seats_available || null,
//     ],
//     ["Plot No.", propertyDetails?.plot_no || null],
//     // ["Loan Availability", propertyDetails?.loan_availability || null],
//     //some other fileds
//     ["RERA ID", propertyDetails?.property_no || null],
//     ["Landmarks", propertyDetails?.landmarks || null],
//     ["Furnishing", propertyDetails?.furnished_type || null],
//     ["Near Landmark", propertyDetails?.near_landmark || null],
//     ["Flat Name", propertyDetails?.flat_name || null],
//     ["Maintenance Frequency", propertyDetails?.maintenance_frequency || null],
//     [
//       "Maintenance Included",
//       propertyDetails?.maintenance_included ? "Yes" : "No",
//     ],
//     ["Security Deposit Type", propertyDetails?.security_deposit_type || null],
//     [
//       "Available for Company Lease",
//       propertyDetails?.available_for_company_lease || null,
//     ],
//     ["Available For", propertyDetails?.available_for || null],
//     ["Suited For", propertyDetails?.suited_for || null],
//     ["Room Type", propertyDetails?.room_type || null],
//     ["Food Charges Included", propertyDetails?.food_charges_included || null],
//     // [
//     //   "Virtual Tour Availability",
//     //   propertyDetails?.virtual_tour_availability || null,
//     // ],
//     ["Property Category Type", propertyDetails?.property_category_type || null],
//     ["Rent", propertyDetails?.rent || null],
//     ["Rent Duration", propertyDetails?.rent_duration || null],
//     ["Property Added Date", propertyDetails?.property_added_date ? formatDateToDDMMYYYY(propertyDetails.property_added_date) : null],
//     ["Possession Status", propertyDetails?.possession_status || null],
//     ["Possession Date", propertyDetails?.possession_date ? formatDateToDDMMYYYY(propertyDetails.possession_date) : null],

//     ["Area Type", propertyDetails?.area_type || null],
//     ["Built up Area", propertyDetails?.area || null],
//     [
//       "Built-up Area Unit",
//       propertyDetails?.area_in ? propertyDetails.area_in.toLowerCase() : null,
//     ],
//     ["Carpet Area", propertyDetails?.carpet_area || null],
//     [
//       "Carpet Area Unit",
//       propertyDetails?.carpet_area_unit
//         ? propertyDetails.carpet_area_unit.toLowerCase()
//         : null,
//     ],
//     ["Available Status", propertyDetails?.available_status || null],
//     ["Investment Options", propertyDetails?.investment_options || null],
//     ["All Inclusive Price", propertyDetails?.all_inclusive_price || null],
//     ["Price Onwards", propertyDetails?.price_onwards || null],
//     ["Price Negotiable", propertyDetails?.price_negotiable || null],
//     [
//       "Tax And Government Charges",
//       propertyDetails?.tax_and_goverment_charges || null,
//     ],
//     [
//       "Electricity And Water Charges",
//       propertyDetails?.electricity_and_water_charges || null,
//     ],
//     ["No Of Open Sides", propertyDetails?.no_of_open_sides || null],
//     ["No Of Peoples", propertyDetails?.no_of_peoples || null],
//     ["Type Of Construction", propertyDetails?.type_of_construction || null],
//     ["Quality Rating", propertyDetails?.quality_rating || null],
//     ["Central AC", propertyDetails?.central_AC || null],
//     ["Total Number Parking", propertyDetails?.total_number_parking || null],
//     ["Block", propertyDetails?.block || null],
//     ["Developer", propertyDetails?.developer || null],
//     ["Project Type", propertyDetails?.project_type || null],
//     ["Transaction Type", propertyDetails?.transaction_type || null],
//     ["Builder Floor Type", propertyDetails?.builder_floor_type || null],
//     // ["Attached Bathroom", propertyDetails?.attached_bathroom || null],
//     // ["Attached Balcony", propertyDetails?.attached_balcony || null],
//     // ["Pantry Option", propertyDetails?.pantry_option || null],
//     // ["Parking Types", propertyDetails?.parking_types || null],
//     ["Possession By", propertyDetails?.possession_by || null],
//     [
//       "Property Dimensions Length",
//       propertyDetails?.property_dimensions_length || null,
//     ],
//     [
//       "Property Dimensions Breadth",
//       propertyDetails?.property_dimensions_breadth || null,
//     ],
//     ["Length Of Land", propertyDetails?.length_of_land || null],
//     ["Breadth Of Land", propertyDetails?.breadthOfLand || null],
//     ["Open Sides Of Land", propertyDetails?.openSidesOfLand || null],
//     ["Construction On Land", propertyDetails?.constructionOnLand || null],
//     [
//       "Selected Construction On Land",
//       propertyDetails?.selectedConstructionOnLand || null,
//     ],
//     ["Commercial Washroom", propertyDetails?.commercial_washroom || null],
//     [
//       "Number Of Minimum Bathrooms",
//       propertyDetails?.number_of_minimum_bathrooms || null,
//     ],
//     ["Maintenance Cost", propertyDetails?.maintenance_cost || null],
//     ["Available Beds", propertyDetails?.available_beds || null],
//     [
//       "Available From",
//       propertyDetails?.possession_date || propertyDetails?.available_from
//         ? formatDateToDDMMYYYY(
//           propertyDetails?.possession_date || propertyDetails?.available_from,
//           propertyDetails?.property_added_date
//         )
//         : null,
//     ],
//     ["Available On", propertyDetails?.available_on ? formatDateToDDMMYYYY(propertyDetails.available_on) : null],

//     ["No Of Cabines", propertyDetails?.no_of_cabines || null],
//     ["No Of Meeting Rooms", propertyDetails?.no_of_meeting_Rooms || null],
//     ["No Of Conference Room", propertyDetails?.no_of_conference_room || null],
//     // ["Posted By Admin", propertyDetails?.posted_by_admin || null],
//     // ["UPS", propertyDetails?.ups || null],
//     // ["Oxygen Duct", propertyDetails?.oxygenDuct || null],
//     // ["Central AC", propertyDetails?.central_AC || null],
//     // ["Conference Room", propertyDetails?.conferenceRoom || null],
//     // ["Washroom", propertyDetails?.washroom || null],
//     // ["Washroom Check", propertyDetails?.washroom_Check || null],
//     ["Reception Area", propertyDetails?.reception_area || null],
//     // ["Created At",
//     //   propertyDetails?.created_at
//     //     ? new Date(propertyDetails.created_at).toLocaleDateString("en-GB")
//     //     : null,
//     // ],

//     // ["Updated At",
//     //   propertyDetails?.updated_at
//     //     ? new Date(propertyDetails.updated_at).toLocaleDateString("en-GB")
//     //     : null,
//     // ],
//   ].filter(([_, value]) => value);
//   const statusTimelineItems = [];

//   const addStatusItem = ({
//     icon,
//     title,
//     value,
//     bgColor,
//     iconColor,
//   }) => {
//     if (
//       !value ||
//       value.toString().trim() === "" ||
//       value.toString().toLowerCase() === "n/a" ||
//       value.toString().toLowerCase() === "null"
//     ) {
//       return;
//     }

//     statusTimelineItems.push({
//       icon,
//       title,
//       value,
//       bgColor,
//       iconColor,
//     });
//   };
//   addStatusItem({
//     icon: <CheckCircle weight="fill" />,
//     title: "Availability",
//     value: propertyDetails?.available_status,
//     bgColor: "bg-green-50",
//     iconColor: "text-green-600",
//   });
//   addStatusItem({
//     icon: <CalendarBlank weight="fill" />,
//     title: "Available From",
//     value: formatDateToDDMMYYYY(
//       propertyDetails?.possession_date || propertyDetails?.available_from,
//       propertyDetails?.property_added_date
//     ),
//     bgColor: "bg-blue-50",
//     iconColor: "text-blue-600",
//   });

//   addStatusItem({
//     icon: <House weight="fill" />,
//     title: "Possession",
//     value: propertyDetails?.possession_status,
//     bgColor: "bg-orange-50",
//     iconColor: "text-orange-600",
//   });

//   addStatusItem({
//     icon: <Clock weight="fill" />,
//     title: "Last Updated",
//     value: propertyDetails?.updated_at
//       ? formatDateToDDMMYYYY(propertyDetails.updated_at)
//       : formatDateToDDMMYYYY(propertyDetails?.property_added_date),
//     bgColor: "bg-purple-50",
//     iconColor: "text-purple-600",
//   });

//   addStatusItem({
//     icon: <Hourglass weight="fill" />,
//     title: "Property Age",
//     value: propertyDetails?.age_of_property,
//     bgColor: "bg-amber-50",
//     iconColor: "text-amber-700",
//   });

//   const handleClick = () => {
//     history.push("/featuredDashboard");
//   };

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   // Prevent background scrolling when modal is open
//   useEffect(() => {
//     if (
//       isShareModalOpen ||
//       isContactModalOpen ||
//       showAllImages ||
//       isModalOpen
//     ) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }

//     // Cleanup when component unmounts
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [isShareModalOpen, isContactModalOpen, showAllImages, isModalOpen]);

//   const getTimeAgo = (dateString) => {
//     if (!dateString) return "";

//     const now = new Date();
//     const created = new Date(dateString);

//     const diffMs = now - created;

//     const minutes = Math.floor(diffMs / (1000 * 60));
//     const hours = Math.floor(diffMs / (1000 * 60 * 60));
//     const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

//     if (minutes < 60) {
//       return `${minutes} min ago`;
//     }

//     if (hours < 24) {
//       return `${hours} hr${hours > 1 ? "s" : ""} ago`;
//     }

//     if (days < 30) {
//       return `${days} day${days > 1 ? "s" : ""} ago`;
//     }

//     const months = Math.floor(days / 30);

//     if (months < 12) {
//       return `${months} month${months > 1 ? "s" : ""} ago`;
//     }

//     const years = Math.floor(months / 12);

//     return `${years} year${years > 1 ? "s" : ""} ago`;
//   };

//   // ==========================================================
//   // New UI state + derived values (all hooks stay above `return`)
//   // ==========================================================
//   const headerHeight = useFixedHeaderHeight();
//   const tabsTop = headerHeight + 10;
//   const sectionScrollMargin = headerHeight + 96;
//   const userLocation = readUserLocation();
//   const [galleryIndex, setGalleryIndex] = useState(0);
//   const [aboutOpen, setAboutOpen] = useState(true);

//   useEffect(() => {
//     setGalleryIndex(0);
//   }, [_id]);

//   const isRentLikeMain =
//     propertyDetails?.property_category_type === "Rent" ||
//     propertyDetails?.property_category_type === "PG/Co-living";
//   const mainPriceRaw = isRentLikeMain ? propertyDetails?.rent : propertyDetails?.property_price;
//   const mainPriceNum = Number(mainPriceRaw);
//   // FIX: ToWords threw on an empty/invalid price and broke the page.
//   const priceWords =
//     Number.isFinite(mainPriceNum) && mainPriceNum > 0
//       ? `${toWords.convert(mainPriceNum)} Only`
//       : "";

//   const CATEGORY_BADGE = {
//     Buy: "For Buy",
//     Rent: "For Rent",
//     "Commercial Buy": "Commercial Buy",
//     "Commercial Lease": "Commercial Lease",
//     "PG/Co-living": "PG / Co-living",
//   };

//   // Cover first, then every other photo once.
//   const galleryImages = [
//     propertyDetails?.cover_image,
//     ...propertyImages.map((img) => img.image),
//   ].filter((src, i, arr) => src && arr.indexOf(src) === i);
//   const galleryTotal = galleryImages.length;
//   const currentImage = galleryTotal ? galleryImages[galleryIndex % galleryTotal] : null;
//   const thumbs = galleryImages.slice(1, 4);
//   const hiddenCount =
//     Math.max(0, galleryTotal - 4) + (propertyDetails?.property_video ? 1 : 0);

//   const stats = [
//     propertyDetails?.bhk_type && {
//       icon: Bed,
//       value: propertyDetails.bhk_type === "Studio" ? "Studio/Single Room" : propertyDetails.bhk_type,
//       label: "Configuration",
//     },
//     propertyDetails?.area && {
//       icon: ArrowsOut,
//       value: formatArea(propertyDetails.area, propertyDetails.area_in),
//       label: "Built Up Area",
//     },
//     propertyDetails?.bathroom && {
//       icon: Bathtub,
//       value: `${propertyDetails.bathroom} Bathroom${Number(propertyDetails.bathroom) > 1 ? "s" : ""}`,
//       label: "Bathrooms",
//     },
//   ].filter(Boolean);

//   const tabs = [
//     { key: "overview", label: "Overview", icon: House, ref: overviewRef, show: overviewFields.length > 0 },
//     { key: "statusTimeline", label: "Status & Timeline", icon: CalendarBlank, ref: statusTimelineRef, show: statusTimelineItems.length > 0 },
//     { key: "moreDetails", label: "More Details", icon: FileText, ref: moreDetailsRef, show: moreDetailsFields.length > 0 },
//     { key: "amenities", label: "Amenities", icon: SquaresFour, ref: amenitiesRef, show: true },
//     { key: "about", label: "About Property", icon: Info, ref: aboutRef, show: true },
//     { key: "location", label: "Location", icon: MapPin, ref: locationRef, show: true },
//     { key: "nearby", label: "Nearby", icon: MapTrifold, ref: nearbyRef, show: !!propertyDetails?._id },
//   ].filter((t) => t.show);

//   // Highlight the tab of the section you're looking at while scrolling.
//   useEffect(() => {
//     if (typeof IntersectionObserver === "undefined") return undefined;
//     const pairs = [
//       ["overview", overviewRef],
//       ["statusTimeline", statusTimelineRef],
//       ["moreDetails", moreDetailsRef],
//       ["amenities", amenitiesRef],
//       ["about", aboutRef],
//       ["location", locationRef],
//       ["nearby", nearbyRef],
//     ];
//     const observer = new IntersectionObserver(
//       (entries) => {
//         const visible = entries
//           .filter((e) => e.isIntersecting)
//           .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
//         if (visible.length) {
//           const hit = pairs.find(([, ref]) => ref.current === visible[0].target);
//           if (hit) setActiveSection(hit[0]);
//         }
//       },
//       { rootMargin: `-${headerHeight + 110}px 0px -55% 0px` },
//     );
//     pairs.forEach(([, ref]) => ref.current && observer.observe(ref.current));
//     return () => observer.disconnect();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [propertyDetails?._id, headerHeight, allAmenities.length]);

//   // Contact Details: uses one free (or paid) view, then opens the popup.
//   const handleContactClick = () => {
//     const token = sessionStorage.getItem("accessToken");
//     if (!token) {
//       setOpenContactModalAfterLogin(true);
//       setIsLoginModalOpen(true);
//       return;
//     }
//     if (!userDetails) {
//       toast.error("User data not found");
//       return;
//     }
//     // FIX: the count was being SET to -1 instead of reduced by one.
//     if (freeViewCount > 0) {
//       setFreeViewCount((c) => c - 1);
//       handleAddCount(-1);
//     } else if (paidViewCount > 0) {
//       setPaidViewCount((c) => c - 1);
//       handleAddCount(-1);
//     }
//     setIsContactModalOpen(true);
//   };

//   const handleVirtualTourClick = () => {
//     const token = sessionStorage.getItem("accessToken");
//     if (scheduledDateLabel !== "Virtual Tour") {
//       history.push({ pathname: "/dashboard", state: { page: "myVirtualtour" } });
//     } else if (token) {
//       setIsModalOpen(true);
//     } else {
//       setOpenVirtualTourAfterLogin(true);
//       setIsLoginModalOpen(true);
//     }
//   };

//   const toggleFavourite = () => {
//     if (propertyDetails.is_favorite) {
//       removeFromFavoritesRecommendedProperty(propertyDetails.favorite_id);
//     } else {
//       addToFavoritesRecommendedProperty(propertyDetails._id);
//     }
//   };

//   const shareThisProperty = () => openShareModal(window.location.href, propertyDetails?._id);

//   const copyShareLink = (url) => {
//     const fallback = (text) => {
//       const textArea = document.createElement("textarea");
//       textArea.value = text;
//       textArea.style.position = "fixed";
//       textArea.style.left = "-9999px";
//       document.body.appendChild(textArea);
//       textArea.focus();
//       textArea.select();
//       try {
//         alert(document.execCommand("copy") ? "Link copied!" : "Copy failed");
//       } catch (err) {
//         console.error("Fallback: Could not copy text: ", err);
//         alert("Copy failed");
//       }
//       document.body.removeChild(textArea);
//     };
//     if (navigator.clipboard && window.isSecureContext) {
//       navigator.clipboard
//         .writeText(url)
//         .then(() => alert("Link copied!"))
//         .catch(() => fallback(url));
//     } else {
//       fallback(url);
//     }
//   };

//   const tourBtnClass =
//     tourSchedule?.[0]?.status === "Accepted"
//       ? "bg-green-500 border-green-500 text-white hover:bg-green-600"
//       : scheduledDateLabel === "Virtual Tour"
//         ? "bg-white border-[#D61F45] text-[#D61F45] hover:bg-[#FDE8EC]"
//         : "bg-amber-400 border-amber-400 text-[#17253a] hover:bg-amber-500";

//   const iconBtn =
//     "flex items-center justify-center gap-2 flex-shrink-0 w-full sm:w-12 h-12 text-[14px] font-semibold bg-white border-[1.5px] border-[#FAD3DB] rounded-xl text-[#D61F45] transition-colors hover:bg-[#FDE8EC] hover:border-[#D61F45]";

//   return (
//     <>
//       <div className="w-full px-3 pt-4 pb-10 mx-auto max-w-[1440px] sm:px-6 lg:px-10 bg-[#FFF7F9] detail-page-container">
//         {/* ==================================================
//             HERO — name, address, price
//         ================================================== */}
//         <div className="relative overflow-hidden border border-[#FDE8EC] rounded-3xl bg-gradient-to-r from-white via-[#FFF1F4] to-[#FDE8EC] detail-header-card">
//           <div aria-hidden="true" className="absolute bottom-0 items-end hidden gap-1 pointer-events-none right-56 lg:flex text-[#D61F45] opacity-[0.12]">
//             <Buildings size={90} weight="fill" />
//             <Buildings size={140} weight="fill" />
//             <Buildings size={110} weight="fill" />
//           </div>

//           <div className="relative p-4 md:p-7">
//             <button
//               type="button"
//               onClick={() => (window.history.length > 1 ? history.goBack() : history.push("/"))}
//               className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-[14px] font-semibold text-[#D61F45] bg-white border border-[#FAD3DB] rounded-full shadow-sm hover:bg-[#FDE8EC] transition-colors"
//             >
//               <ArrowLeft size={16} weight="bold" />
//               Back to Listings
//             </button>

//             <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
//               <div className="flex items-start min-w-0 gap-4">
//                 <span className="flex items-center justify-center flex-shrink-0 text-white rounded-full w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#D61F45] to-[#B91C3C] shadow-[0_8px_20px_rgba(214,31,69,0.35)]">
//                   <House size={30} weight="fill" />
//                 </span>
//                 <div className="min-w-0">
//                   <div className="flex flex-wrap items-center gap-2">
//                     <h1 className="m-0 text-2xl font-extrabold leading-tight md:text-[38px] text-[#17253a] break-words detail-title">
//                       {propertyDetails?.property_name || "Property"}
//                     </h1>
//                     {propertyDetails?.mark_as_featured === "Yes" && (
//                       <span className="flex items-center gap-1.5 px-3 py-1 text-[13px] font-bold rounded-lg bg-[#FDE8EC] text-[#D61F45]">
//                         <Crown size={15} weight="fill" />
//                         Featured
//                       </span>
//                     )}
//                   </div>
//                   <p className="flex items-start gap-1.5 m-0 mt-2 text-[14px] md:text-[16px] text-gray-600 max-w-[80ch] detail-address">
//                     <MapPin size={20} weight="fill" className="flex-shrink-0 mt-0.5 text-[#D61F45]" />
//                     <span className="break-words">{propertyDetails?.address || "Address N/A"}</span>
//                   </p>
//                 </div>
//               </div>

//               {(propertyDetails?.property_price || propertyDetails?.rent) && (
//                 <div className="flex-shrink-0 pl-[4.5rem] lg:pl-0 lg:text-right detail-price-block">
//                   <p className="m-0 text-3xl font-extrabold md:text-[40px] leading-none text-[#D61F45]">
//                     ₹ {formatPrice(mainPriceRaw)}
//                     {isRentLikeMain && (
//                       <span className="ml-1 text-[16px] font-semibold text-gray-600">
//                         / {propertyDetails?.rent_duration || "Per Month"}
//                       </span>
//                     )}
//                   </p>
//                   {priceWords && (
//                     <p className="m-0 mt-1.5 text-[13px] font-medium text-gray-500">{priceWords}</p>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* ==================================================
//             Quick stats + actions
//         ================================================== */}
//         <div className="flex flex-col gap-4 p-3 mt-4 bg-white border border-[#FDE8EC] md:p-4 lg:flex-row lg:items-center lg:justify-between rounded-2xl shadow-[0_8px_24px_rgba(214,31,69,0.06)] detail-info-row">
//           {stats.length > 0 && (
//             <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:flex lg:gap-0">
//               {stats.map(({ icon: Icon, value, label }, i) => (
//                 <div
//                   key={label}
//                   className={`flex flex-col items-center gap-2 text-center sm:flex-row sm:gap-3 sm:text-left lg:px-6 ${i === 0 ? "lg:pl-1" : "lg:border-l lg:border-[#FDE8EC]"}`}
//                 >
//                   <span className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full bg-[#FDE8EC] text-[#D61F45]">
//                     <Icon size={24} weight="fill" />
//                   </span>
//                   <div className="leading-tight">
//                     <p className="m-0 text-[14px] sm:text-[16px] font-bold text-[#17253a]">{value}</p>
//                     <p className="m-0 text-[12px] text-gray-500">{label}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center detail-actions-row">
//             {propertyDetails.virtual_tour_availability === "Yes" && (
//               <button
//                 type="button"
//                 onClick={handleVirtualTourClick}
//                 className={`flex items-center justify-center gap-2 px-3 sm:px-5 h-12 text-[14px] sm:text-[15px] font-semibold whitespace-nowrap border-[1.5px] rounded-xl transition-colors detail-action-btn ${tourBtnClass}`}
//               >
//                 <VideoCamera size={20} weight="fill" />
//                 {scheduledDateLabel}
//                 {scheduledDateLabel !== "Virtual Tour" && <ArrowRight size={16} weight="bold" />}
//               </button>
//             )}
//             <button
//               type="button"
//               onClick={handleContactClick}
//               className="flex items-center justify-center gap-2 px-3 sm:px-6 h-12 text-[14px] sm:text-[15px] font-semibold whitespace-nowrap text-white rounded-xl bg-gradient-to-r from-[#D61F45] to-[#B91C3C] shadow-[0_6px_18px_rgba(214,31,69,0.35)] hover:shadow-[0_10px_24px_rgba(214,31,69,0.45)] transition-shadow detail-action-btn detail-contact-btn"
//             >
//               <Phone size={19} weight="fill" />
//               Contact Details
//             </button>
//             <button
//               type="button"
//               onClick={toggleFavourite}
//               title={propertyDetails.is_favorite ? "Remove from favourites" : "Save to favourites"}
//               aria-label={propertyDetails.is_favorite ? "Remove from favourites" : "Save to favourites"}
//               className={iconBtn + " detail-icon-btn"}
//             >
//               <Heart size={22} weight={propertyDetails.is_favorite ? "fill" : "bold"} />
//               <span className="sm:hidden">{propertyDetails.is_favorite ? "Saved" : "Save"}</span>
//             </button>
//             <button
//               type="button"
//               onClick={shareThisProperty}
//               title="Share"
//               aria-label="Share property"
//               className={iconBtn + " detail-icon-btn"}
//             >
//               <ShareNetwork size={22} weight="bold" />
//               <span className="sm:hidden">Share</span>
//             </button>
//           </div>
//         </div>

//         {isModalOpen && (
//           <GetScheduleVTourproperty
//             onClose={() => setIsModalOpen(false)}
//             propertyDetails={propertyDetails}
//             setScheduledDateLabel={setScheduledDateLabel}
//             setIsModalOpen={setIsModalOpen}
//           />
//         )}
//         {isContactModalOpen &&
//           userDetails &&
//           !Array.isArray(userDetails) &&
//           userDetails.full_name && (
//             <ContactDetails
//               onClose={() => setIsContactModalOpen(false)}
//               fullName={
//                 freeViewCount <= 0 && paidViewCount <= 0
//                   ? `****${userDetails.full_name.slice(-1) || "N/A"}`
//                   : userDetails.full_name || "N/A"
//               }
//               mobile={
//                 freeViewCount <= 0 && paidViewCount <= 0
//                   ? `********${userDetails.mobile_number?.slice(-3) || "000"}`
//                   : userDetails.mobile_number || "N/A"
//               }
//               userEmail={
//                 freeViewCount <= 0 && paidViewCount <= 0
//                   ? userDetails.email
//                     ? `*******${userDetails.email.slice(-3)}`
//                     : "N/A"
//                   : userDetails.email || "N/A"
//               }
//               showUpgradePrompt={freeViewCount <= 0 && paidViewCount <= 0}
//             />
//           )}

//         {/* ==================================================
//             Main grid: content (left) + enquiry (right)
//         ================================================== */}
//         <div className="grid grid-cols-1 gap-5 mt-5 lg:grid-cols-[minmax(0,1fr)_380px] detail-main-grid">
//           <div className="min-w-0 detail-left-col">
//             {/* ---------- Gallery ---------- */}
//             <div className="p-3 bg-white border border-[#FDE8EC] rounded-3xl shadow-[0_10px_30px_rgba(214,31,69,0.06)] detail-image-row">
//               <div className={`grid gap-3 ${thumbs.length ? "md:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)]" : ""}`}>
//                 {/* Main photo */}
//                 <div className="relative overflow-hidden rounded-2xl bg-[#FFF1F4] h-64 sm:h-80 md:h-[420px]">
//                   {currentImage ? (
//                     <img
//                       src={currentImage}
//                       alt={propertyDetails?.property_name || "Property"}
//                       className="object-cover w-full h-full cursor-pointer detail-cover-image"
//                       onClick={() => setShowAllImages(true)}
//                     />
//                   ) : (
//                     <div className="flex items-center justify-center w-full h-full text-[#D61F45]">
//                       <Images size={48} />
//                     </div>
//                   )}
//                   <Watermark size="text-4xl" />

//                   <div className="absolute flex flex-wrap gap-2 top-3 left-3">
//                     {CATEGORY_BADGE[propertyDetails?.property_category_type] && (
//                       <span className="px-3 py-1.5 text-[13px] font-semibold text-white rounded-lg shadow bg-[#17253a]/80 backdrop-blur-sm">
//                         {CATEGORY_BADGE[propertyDetails.property_category_type]}
//                       </span>
//                     )}
//                     {propertyDetails?.mark_as_featured === "Yes" && (
//                       <span className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-semibold text-white rounded-lg shadow bg-[#D61F45]">
//                         <Crown size={15} weight="fill" />
//                         Featured
//                       </span>
//                     )}
//                   </div>

//                   {galleryTotal > 1 && (
//                     <>
//                       <button
//                         type="button"
//                         aria-label="Previous photo"
//                         onClick={() => setGalleryIndex((i) => (i - 1 + galleryTotal) % galleryTotal)}
//                         className="absolute flex items-center justify-center -translate-y-1/2 bg-white rounded-full shadow-lg w-11 h-11 left-3 top-1/2 text-[#D61F45] hover:scale-105 transition-transform"
//                       >
//                         <CaretLeft size={20} weight="bold" />
//                       </button>
//                       <button
//                         type="button"
//                         aria-label="Next photo"
//                         onClick={() => setGalleryIndex((i) => (i + 1) % galleryTotal)}
//                         className="absolute flex items-center justify-center -translate-y-1/2 bg-white rounded-full shadow-lg w-11 h-11 right-3 top-1/2 text-[#D61F45] hover:scale-105 transition-transform"
//                       >
//                         <CaretRight size={20} weight="bold" />
//                       </button>
//                       <span className="absolute flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-semibold text-white rounded-lg bottom-3 left-3 bg-black/60 backdrop-blur-sm">
//                         <Images size={15} />
//                         {(galleryIndex % galleryTotal) + 1}/{galleryTotal}
//                       </span>
//                     </>
//                   )}
//                 </div>

//                 {/* Thumbnails */}
//                 {thumbs.length > 0 && (
//                   <div className="grid grid-cols-3 gap-3 md:grid-cols-1 md:grid-rows-3 md:h-[420px]">
//                     {thumbs.map((src, i) => {
//                       const isLast = i === thumbs.length - 1 && hiddenCount > 0;
//                       return (
//                         <button
//                           type="button"
//                           key={src}
//                           onClick={() => (isLast ? setShowAllImages(true) : setGalleryIndex(i + 1))}
//                           className={`relative h-24 overflow-hidden sm:h-28 md:h-auto rounded-2xl ring-offset-2 transition-shadow ${galleryIndex % galleryTotal === i + 1 ? "ring-2 ring-[#D61F45]" : ""
//                             }`}
//                         >
//                           <img src={src} alt={`Photo ${i + 2}`} className="object-cover w-full h-full detail-gallery-image" />
//                           <Watermark size="text-lg" />
//                           {isLast && (
//                             <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-white bg-black/55">
//                               <Images size={26} />
//                               <span className="text-[15px] font-bold">+{hiddenCount} Photos</span>
//                             </span>
//                           )}
//                         </button>
//                       );
//                     })}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* ---------- Section tabs (sticky) ---------- */}
//             <div
//               className="sticky z-20 pt-2 pb-1 mt-2 -mx-1 px-1 bg-[#FFF7F9] detail-tabs"
//               style={{ top: headerHeight }}
//             >
//               <div className="flex gap-1 p-2 overflow-x-auto bg-white border border-[#FDE8EC] rounded-2xl shadow-[0_8px_24px_rgba(214,31,69,0.08)]">
//                 {tabs.map(({ key, label, icon: Icon, ref }) => {
//                   const active = activeSection === key;
//                   return (
//                     <button
//                       key={key}
//                       type="button"
//                       onClick={() => scrollToSection(ref, key)}
//                       className={`flex items-center flex-shrink-0 gap-2 px-4 py-2.5 text-[14px] font-semibold rounded-xl transition-all detail-tab-btn ${active
//                         ? "bg-gradient-to-r from-[#D61F45] to-[#B91C3C] text-white shadow-[0_6px_16px_rgba(214,31,69,0.3)]"
//                         : "text-gray-600 hover:text-[#D61F45] hover:bg-[#FFF1F4]"
//                         }`}
//                     >
//                       <Icon size={18} weight={active ? "fill" : "regular"} />
//                       {label}
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* ---------- Overview ---------- */}
//             {overviewFields.length > 0 && (
//               <SectionCard
//                 sectionRef={overviewRef}
//                 scrollMargin={sectionScrollMargin}
//                 icon={ClipboardText}
//                 first="Basic"
//                 accent="Information"
//                 subtitle="Key facts about this property at a glance."
//               >
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
//                   {overviewFields.map(([key, value]) => {
//                     const Icon = iconForLabel(key);
//                     return (
//                       <div key={key} className="flex items-start gap-3 py-3 border-b border-[#FDE8EC]">
//                         <Icon size={20} className="flex-shrink-0 mt-0.5 text-[#D61F45]" />
//                         <span className="w-36 flex-shrink-0 text-[14px] text-gray-500">{key}</span>
//                         <span className="flex-1 min-w-0 text-[14px] font-medium text-[#17253a] break-words">{value}</span>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </SectionCard>
//             )}

//             {/* ---------- Status & Timeline ---------- */}
//             {statusTimelineItems.length > 0 && (
//               <SectionCard
//                 sectionRef={statusTimelineRef}
//                 scrollMargin={sectionScrollMargin}
//                 icon={Clock}
//                 first="Status &"
//                 accent="Timeline"
//                 subtitle="Track the current status and important timeline details of this property."
//               >
//                 <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
//                   {statusTimelineItems.map((item) => (
//                     <div
//                       key={item.title}
//                       className={`flex items-center gap-3 p-4 border border-black/5 rounded-2xl ${item.bgColor}`}
//                     >
//                       <span className={`flex items-center justify-center flex-shrink-0 w-12 h-12 bg-white rounded-full shadow-sm text-2xl ${item.iconColor}`}>
//                         {item.icon}
//                       </span>
//                       <div className="min-w-0">
//                         <p className="m-0 text-[12px] text-gray-500">{item.title}</p>
//                         <p className="m-0 mt-0.5 text-[16px] font-bold text-[#17253a] break-words">{item.value}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </SectionCard>
//             )}

//             {/* ---------- More Details ---------- */}
//             {moreDetailsFields.length > 0 && (
//               <SectionCard
//                 sectionRef={moreDetailsRef}
//                 scrollMargin={sectionScrollMargin}
//                 icon={FileText}
//                 first="More"
//                 accent="Details"
//                 subtitle="Complete specifications and additional information about this property."
//               >
//                 <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8">
//                   {moreDetailsFields.map(([label, value]) => {
//                     const Icon = iconForLabel(label);
//                     return (
//                       <div key={label} className="flex items-center gap-3 py-3 border-b border-[#FDE8EC]">
//                         <span className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-xl bg-[#FFF1F4] text-[#D61F45]">
//                           <Icon size={20} />
//                         </span>
//                         <div className="min-w-0">
//                           <p className="m-0 text-[11px] font-medium tracking-wide text-gray-500 uppercase">{label}</p>
//                           <p className="m-0 mt-0.5 text-[14px] font-bold text-[#17253a] break-words">{value}</p>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </SectionCard>
//             )}

//             {/* ---------- Amenities ---------- */}
//             <SectionCard
//               sectionRef={amenitiesRef}
//               scrollMargin={sectionScrollMargin}
//               icon={Diamond}
//               first="Property"
//               accent="Amenities"
//               subtitle="Features and facilities available with this property."
//             >
//               {allAmenities.length === 0 ? (
//                 <p className="m-0 text-[14px] text-gray-500">No amenities listed for this property.</p>
//               ) : (
//                 <>
//                   <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
//                     {visibleAmenities.map((amenity, index) => (
//                       <div
//                         key={amenity._id || amenity.name || index}
//                         className="flex items-center gap-3 px-3 py-3 bg-white border border-[#FDE8EC] rounded-2xl hover:border-[#FAD3DB] transition-colors"
//                       >
//                         <span className="flex items-center justify-center flex-shrink-0 overflow-hidden w-11 h-11 rounded-xl bg-[#FFF1F4] text-[#D61F45]">
//                           {amenity.icon ? (
//                             <img
//                               src={`${process.env.REACT_APP_API_URL}/media/${amenity.icon}`}
//                               alt={amenity.name}
//                               className="object-contain w-7 h-7"
//                             />
//                           ) : (
//                             <CheckCircle size={22} weight="fill" />
//                           )}
//                         </span>
//                         <span className="text-[15px] font-medium text-[#17253a]">{amenity.name}</span>
//                       </div>
//                     ))}
//                   </div>
//                   {allAmenities.length > 8 && (
//                     <button
//                       type="button"
//                       onClick={() => setShowAll((v) => !v)}
//                       className="inline-flex items-center gap-1.5 px-4 py-2 mt-4 text-[14px] font-semibold text-[#D61F45] bg-[#FFF1F4] rounded-xl hover:bg-[#FDE8EC]"
//                     >
//                       {showAll ? "Show less" : `+${allAmenities.length - 8} More`}
//                       <CaretDown size={14} weight="bold" className={showAll ? "rotate-180" : ""} />
//                     </button>
//                   )}
//                 </>
//               )}
//             </SectionCard>

//             {/* ---------- About Property (collapsible) ---------- */}
//             <SectionCard
//               sectionRef={aboutRef}
//               scrollMargin={sectionScrollMargin}
//               icon={FileText}
//               first="About"
//               accent="Property"
//               subtitle="Detailed information and description about this property."
//               right={
//                 <button
//                   type="button"
//                   onClick={() => setAboutOpen((v) => !v)}
//                   aria-expanded={aboutOpen}
//                   aria-label={aboutOpen ? "Collapse description" : "Expand description"}
//                   className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-white rounded-full shadow-md text-[#17253a] hover:text-[#D61F45]"
//                 >
//                   <CaretDown size={18} weight="bold" className={`transition-transform ${aboutOpen ? "rotate-180" : ""}`} />
//                 </button>
//               }
//             >
//               {aboutOpen && (
//                 <p className="m-0 text-[15px] leading-relaxed text-gray-700 whitespace-pre-line">
//                   {aboutPropertyText || "No description has been added for this property yet."}
//                 </p>
//               )}
//             </SectionCard>

//             {/* ---------- Location ---------- */}
//             <SectionCard
//               sectionRef={locationRef}
//               scrollMargin={sectionScrollMargin}
//               icon={MapPin}
//               first="Property"
//               accent="Location"
//               subtitle="View the exact location of this property on the map."
//               right={
//                 Number(latitude) && Number(longitude) ? (
//                   <a
//                     href={`https://www.google.com/maps?q=${latitude},${longitude}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="items-center flex-shrink-0 hidden gap-1.5 px-4 py-2 text-[13px] font-semibold no-underline text-[#D61F45] bg-white border-[1.5px] border-[#D61F45] rounded-xl sm:flex hover:bg-[#FDE8EC] hover:no-underline"
//                   >
//                     <ArrowSquareOut size={16} weight="bold" />
//                     Open in Maps
//                   </a>
//                 ) : null
//               }
//             >
//               {/* FIX: the map used to load at 0,0 (in the ocean) before the
//                   property's coordinates arrived. */}
//               {Number(latitude) && Number(longitude) ? (
//                 <iframe
//                   title="Property location"
//                   className="w-full h-64 md:h-[420px] rounded-2xl border border-[#FDE8EC]"
//                   src={`https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
//                   allowFullScreen
//                   loading="lazy"
//                 ></iframe>
//               ) : (
//                 <div className="flex flex-col items-center justify-center h-48 text-center rounded-2xl bg-[#FFF7F9] border border-dashed border-[#FAD3DB]">
//                   <MapPin size={36} weight="fill" className="text-[#D61F45]" />
//                   <p className="m-0 mt-2 text-[14px] text-gray-500">Location is not available for this property.</p>
//                 </div>
//               )}
//             </SectionCard>

//             {/* ---------- Nearby Connectivity (Metro, Airports, Main Roads) ---------- */}
//             {propertyDetails?._id && (
//               <SectionCard
//                 sectionRef={nearbyRef}
//                 scrollMargin={sectionScrollMargin}
//                 icon={MapTrifold}
//                 first="Nearby"
//                 accent="Connectivity"
//                 subtitle="Metro stations, airports and main roads around this property."
//               >
//                 <NearbyConnectivity
//                   propertyId={propertyDetails._id}
//                   baseUrl={`${process.env.REACT_APP_API_URL}/cust_api`}
//                   latitude={latitude}
//                   longitude={longitude}
//                 />
//               </SectionCard>
//             )}
//           </div>

//           {/* ==================================================
//               Enquiry card (sticky)
//           ================================================== */}
//           <aside className="detail-enquiry-col">
//             <div
//               className="lg:sticky"
//               style={{ top: tabsTop }}
//             >
//               <div className="p-5 bg-white border border-[#FDE8EC] rounded-3xl shadow-[0_14px_40px_rgba(214,31,69,0.1)] detail-enquiry-card">
//                 <div className="flex items-center gap-3">
//                   <span className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-white rounded-2xl bg-gradient-to-br from-[#D61F45] to-[#B91C3C] shadow-[0_6px_14px_rgba(214,31,69,0.35)]">
//                     <ChatCircleText size={24} weight="fill" />
//                   </span>
//                   <div className="min-w-0">
//                     <h3 className="m-0 text-[20px] font-bold text-[#17253a]">
//                       Make an <span className="text-[#D61F45]">Enquiry</span>
//                     </h3>
//                     <p className="m-0 text-[13px] text-gray-500">Get in touch with the owner for more details</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-3 py-4 mt-4 border-y border-[#FDE8EC] detail-agent-row">
//                   <Link
//                     to={`/agentdetail/${userDetails?._id}`}
//                     onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//                     className="flex-shrink-0 block overflow-hidden bg-white rounded-full shadow-md w-14 h-14 ring-2 ring-[#FDE8EC]"
//                   >
//                     <img
//                       src={userDetails?.profile_image ? userDetails.profile_image : "/image/app.png"}
//                       alt={userDetails?.full_name || "Owner"}
//                       className="object-contain w-full h-full"
//                     />
//                   </Link>
//                   <div className="min-w-0 leading-tight">
//                     <p className="m-0 text-[16px] font-bold text-[#17253a] truncate">{userDetails.full_name || "N/A"}</p>
//                     <p className="m-0 mt-0.5 text-[13px] text-gray-500">{userDetails.user_type || "N/A"}</p>
//                   </div>
//                 </div>

//                 <form onSubmit={handleEnquirySubmit} className="flex flex-col gap-3 mt-4">
//                   <label className="relative block">
//                     <User size={18} className="absolute -translate-y-1/2 pointer-events-none left-3.5 top-1/2 text-[#D61F45]" />
//                     <input
//                       type="text"
//                       placeholder="Name"
//                       value={name}
//                       onChange={(e) => {
//                         setName(e.target.value);
//                         handleFieldChange();
//                       }}
//                       className="w-full h-12 pl-11 pr-3 text-[15px] text-[#17253a] bg-white border border-gray-200 rounded-xl outline-none focus:border-[#D61F45] focus:ring-2 focus:ring-[#FDE8EC]"
//                       required
//                     />
//                   </label>
//                   <label className="relative block">
//                     <Phone size={18} className="absolute -translate-y-1/2 pointer-events-none left-3.5 top-1/2 text-[#D61F45]" />
//                     <input
//                       type="text"
//                       placeholder="Phone Number"
//                       value={contactNumber}
//                       readOnly
//                       className="w-full h-12 pl-11 pr-3 text-[15px] text-gray-600 bg-[#FFF7F9] border border-gray-200 rounded-xl outline-none"
//                     />
//                   </label>
//                   <label className="relative block">
//                     <ChatCircleText size={18} className="absolute pointer-events-none left-3.5 top-3.5 text-[#D61F45]" />
//                     <textarea
//                       placeholder="Message"
//                       value={message}
//                       maxLength={255}
//                       onChange={(e) => {
//                         setMessage(e.target.value);
//                         handleFieldChange();
//                       }}
//                       className="block w-full h-28 py-3 pl-11 pr-3 pb-7 text-[15px] text-[#17253a] bg-white border border-gray-200 rounded-xl outline-none resize-none focus:border-[#D61F45] focus:ring-2 focus:ring-[#FDE8EC]"
//                       required
//                     ></textarea>
//                     <span className="absolute text-[11px] text-gray-400 pointer-events-none select-none bottom-2 right-3">
//                       {message.length}/255
//                     </span>
//                   </label>

//                   <button
//                     type="submit"
//                     className="flex items-center justify-center w-full gap-2 h-12 mt-1 text-[16px] font-semibold text-white rounded-xl bg-gradient-to-r from-[#D61F45] to-[#B91C3C] shadow-[0_6px_18px_rgba(214,31,69,0.35)] hover:shadow-[0_10px_24px_rgba(214,31,69,0.45)] transition-shadow"
//                   >
//                     <PaperPlaneTilt size={19} weight="fill" />
//                     Send Enquiry
//                   </button>
//                 </form>

//                 {enquiryStatus && (
//                   <div
//                     className={`flex items-center gap-2 px-3 py-2.5 mt-3 text-[14px] font-medium rounded-xl ${enquiryStatus.type === "success"
//                       ? "bg-green-50 text-green-700 border border-green-100"
//                       : "bg-[#FFF1F4] text-[#D61F45] border border-[#FAD3DB]"
//                       }`}
//                   >
//                     {enquiryStatus.type === "success" ? (
//                       <CheckCircle size={18} weight="fill" />
//                     ) : (
//                       <Info size={18} weight="fill" />
//                     )}
//                     {enquiryStatus.message}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </aside>
//         </div>

//         {/* ==================================================
//             Gallery popup
//         ================================================== */}
//         {showAllImages && (
//           <div
//             className="fixed inset-0 z-[1100] flex items-center justify-center px-3 bg-black/75"
//             onMouseDown={(e) => e.target === e.currentTarget && setShowAllImages(false)}
//           >
//             <div className="relative flex flex-col w-full max-w-5xl max-h-[88vh] overflow-hidden bg-white rounded-3xl shadow-2xl">
//               <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-[#FDE8EC]">
//                 <div className="flex items-center gap-3">
//                   <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#FDE8EC] text-[#D61F45]">
//                     <Images size={22} weight="fill" />
//                   </span>
//                   <div>
//                     <h2 className="m-0 text-lg font-bold text-[#17253a]">
//                       Photo <span className="text-[#D61F45]">Gallery</span>
//                     </h2>
//                     <p className="m-0 text-[12px] text-gray-500">
//                       {galleryTotal} photo{galleryTotal === 1 ? "" : "s"}
//                       {propertyDetails?.property_video ? " · 1 video" : ""}
//                     </p>
//                   </div>
//                 </div>
//                 <button
//                   type="button"
//                   onClick={() => setShowAllImages(false)}
//                   aria-label="Close gallery"
//                   className="flex items-center justify-center w-9 h-9 text-gray-500 rounded-full hover:bg-[#FDE8EC] hover:text-[#D61F45]"
//                 >
//                   <X size={18} weight="bold" />
//                 </button>
//               </div>
//               <div className="grid grid-cols-1 gap-3 p-4 overflow-y-auto sm:grid-cols-2 md:grid-cols-3">
//                 {galleryImages.map((src, index) => (
//                   <button
//                     type="button"
//                     key={src}
//                     onClick={() => {
//                       setGalleryIndex(index);
//                       setShowAllImages(false);
//                     }}
//                     className="relative overflow-hidden rounded-2xl"
//                   >
//                     <img src={src} alt={`Photo ${index + 1}`} className="object-cover w-full h-48" />
//                     <Watermark />
//                   </button>
//                 ))}
//                 {propertyDetails?.property_video && (
//                   <video controls className="object-cover w-full h-48 rounded-2xl">
//                     <source src={propertyDetails.property_video} type="video/mp4" />
//                     Your browser does not support the video tag.
//                   </video>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Exclusive Recommended Section — "Top Picks for You" design */}
//         <div className="w-full mt-8">
//           <style>{`
//             .er-slider .slick-track { display: flex !important; }
//             .er-slider .slick-slide { height: inherit !important; }
//             .er-slider .slick-slide > div { height: 100%; }
//             @keyframes erPulse {
//               0%, 100% { box-shadow: 0 0 0 0 rgba(214,31,69,0.30); }
//               50%      { box-shadow: 0 0 0 8px rgba(214,31,69,0); }
//             }
//             .er-pulse { animation: erPulse 2.6s ease-out infinite; }
//           `}</style>

//           <div className="relative w-full overflow-hidden bg-white border border-[#F7C3CE] rounded-2xl shadow-[0_0_28px_rgba(214,31,69,0.12)] pb-5">
//             {/* ---------- HEADER ---------- */}
//             <div className="flex flex-col gap-4 px-4 pt-5 mb-3 sm:px-6 md:flex-row md:items-center md:justify-between">
//               <div className="flex items-center gap-3 sm:gap-4">
//                 <span className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full shadow-lg sm:w-14 sm:h-14 bg-gradient-to-br from-[#E8335A] to-[#B91C3C] shadow-[#D61F45]/30 er-pulse">
//                   <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor" aria-hidden="true">
//                     <path d="M2 7l5 4 5-7 5 7 5-4-2 12H4L2 7z" />
//                   </svg>
//                 </span>
//                 <div className="min-w-0">
//                   <h2 className="m-0 text-xl font-extrabold tracking-tight text-[#172033] sm:text-2xl lg:text-3xl">
//                     <span className="text-[#D61F45]">Top Picks</span> for You
//                   </h2>
//                   <p className="m-0 mt-1 text-sm text-[#64748B] sm:text-base">
//                     Handpicked properties based on your preferences
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center w-full gap-3 sm:w-auto md:flex-shrink-0">
//                 <button
//                   type="button"
//                   className="group flex items-center justify-center w-full gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#D61F45] rounded-lg shadow-md shadow-[#D61F45]/25 transition-all duration-300 hover:bg-[#B91C3C] hover:shadow-lg sm:w-auto sm:px-6"
//                   onClick={handleClick}
//                 >
//                   View All Properties
//                   <HiOutlineArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-1" />
//                 </button>

//                 <button
//                   type="button"
//                   aria-label="Previous"
//                   className="hidden sm:flex items-center justify-center flex-shrink-0 rounded-full w-11 h-11 bg-[#FDE8EC] transition-all duration-300 hover:bg-[#F9D3DB] hover:scale-105 active:scale-95"
//                   onClick={() => sliderRef.current?.slickPrev()}
//                 >
//                   <GoArrowLeft className="text-xl text-[#D61F45]" />
//                 </button>

//                 <button
//                   type="button"
//                   aria-label="Next"
//                   className="hidden sm:flex items-center justify-center flex-shrink-0 rounded-full w-11 h-11 bg-[#D61F45] shadow-md shadow-[#D61F45]/30 transition-all duration-300 hover:bg-[#B91C3C] hover:scale-105 active:scale-95"
//                   onClick={() => sliderRef.current?.slickNext()}
//                 >
//                   <GoArrowRight className="text-xl text-white" />
//                 </button>
//               </div>
//             </div>

//             {/* ---------- CAROUSEL ---------- */}
//             <div className="px-2 sm:px-4">
//               <Slider {...settings} className="slider-container er-slider" ref={sliderRef}>
//                 {properties.map((property) => {
//                   let distance = null;
//                   if (userLocation && property.latitude && property.longitude) {
//                     distance = calculateDistance(
//                       userLocation.latitude,
//                       userLocation.longitude,
//                       parseFloat(property.latitude),
//                       parseFloat(property.longitude),
//                     ).toFixed(1);
//                   }

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

//                     if (
//                       category.includes("PG") ||
//                       category.includes("Co-Living") ||
//                       category.includes("Coliving")
//                     ) {
//                       return `${type} for Rent in ${location}`;
//                     }

//                     const action = category === "Buy" ? "Sale" : category;

//                     return `${property.bhk_type} ${type} for ${action} in ${location}`;
//                   })();

//                   const badgeText = (() => {
//                     const normalizedCategory = (property.property_category_type || "")
//                       .replace(/\s+/g, " ")
//                       .replace(/-/g, " ")
//                       .replace(/\//g, " ")
//                       .trim()
//                       .toLowerCase();

//                     if (normalizedCategory === "buy") return "FOR BUY";
//                     if (normalizedCategory === "rent") return "FOR RENT";
//                     if (normalizedCategory.includes("commercial buy")) return "COMMERCIAL BUY";
//                     if (normalizedCategory.includes("commercial lease")) return "COMMERCIAL LEASE";
//                     if (
//                       normalizedCategory.includes("pg") ||
//                       normalizedCategory.includes("co living") ||
//                       normalizedCategory.includes("coliving")
//                     )
//                       return "PG / CO-LIVING";
//                     if (normalizedCategory.includes("residential")) return "RESIDENTIAL";
//                     return "UNKNOWN";
//                   })();

//                   function getValidImageUrl(img) {
//                     if (typeof img !== "string") return null;
//                     if (img.trim() === "") return null;
//                     return img.startsWith("http") ? img : BASE_URL + img;
//                   }

//                   const coverImage = getValidImageUrl(property.cover_image);
//                   const additionalImages = (property.property_images || [])
//                     .map((imgObj) => getValidImageUrl(imgObj?.image))
//                     .filter(Boolean);
//                   const allImages = [
//                     ...(coverImage ? [coverImage] : []),
//                     ...additionalImages,
//                   ];

//                   const isRentLike =
//                     property.property_category_type === "Rent" ||
//                     property.property_category_type === "PG/Co-living";
//                   const isPG = property.property_category_type?.includes("PG");

//                   const phoneDigits = String(property.connect_to_no || "").replace(/\D/g, "");
//                   const phoneIntl =
//                     phoneDigits.length === 10 ? `91${phoneDigits}` : phoneDigits;

//                   return (
//                     <div key={property._id} className="box-border h-full p-2">
//                       <div className="flex flex-col h-full overflow-hidden bg-white border border-[#F1D5DC] rounded-2xl shadow-[0_6px_20px_rgba(214,31,69,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(214,31,69,0.18)]">
//                         {/* ---------- IMAGE ---------- */}
//                         <div className="relative group er-card-img">
//                           <Link
//                             to={`/propertydetails/${property._id}?property_owner_id=${property.user_id}`}
//                             onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//                             className="block overflow-hidden no-underline hover:no-underline"
//                           >
//                             {allImages.length > 1 ? (
//                               <Slider
//                                 key={`${property._id}-${allImages.length}`}
//                                 dots
//                                 infinite
//                                 speed={500}
//                                 slidesToShow={1}
//                                 slidesToScroll={1}
//                                 arrows={false}
//                                 autoplay
//                                 autoplaySpeed={2500}
//                                 beforeChange={(current, next) =>
//                                   setActiveIndexes((prev) => ({
//                                     ...prev,
//                                     [property._id]: next,
//                                   }))
//                                 }
//                                 initialSlide={activeIndexes[property._id] || 0}
//                                 customPaging={(i) => {
//                                   const activeSlide = activeIndexes[property._id] || 0;
//                                   const isActive = i === activeSlide % allImages.length;
//                                   return (
//                                     <div
//                                       style={{
//                                         width: isActive ? "14px" : "6px",
//                                         height: "6px",
//                                         borderRadius: "9999px",
//                                         background: isActive ? "#FFFFFF" : "rgba(255,255,255,0.6)",
//                                         margin: "0 3px",
//                                         cursor: "pointer",
//                                         transition: "all .25s ease",
//                                       }}
//                                     />
//                                   );
//                                 }}
//                                 appendDots={(dots) => (
//                                   <div
//                                     style={{
//                                       position: "absolute",
//                                       bottom: "24px",
//                                       left: "50%",
//                                       transform: "translateX(-50%)",
//                                       display: "flex",
//                                       justifyContent: "center",
//                                       width: "100%",
//                                       zIndex: 20,
//                                     }}
//                                   >
//                                     <ul style={{ display: "flex", margin: 0, padding: 0, listStyle: "none" }}>
//                                       {dots}
//                                     </ul>
//                                   </div>
//                                 )}
//                               >
//                                 {allImages.map((imgUrl, idx) => (
//                                   <div key={`${property._id}-${idx}`}>
//                                     <img
//                                       src={imgUrl}
//                                       alt={property.property_name || "Property"}
//                                       className="object-cover w-full h-[170px] sm:h-[190px] transition-transform duration-500 ease-out group-hover:scale-105"
//                                     />
//                                   </div>
//                                 ))}
//                               </Slider>
//                             ) : (
//                               <img
//                                 src={allImages[0] || defaultImage}
//                                 alt={property.property_name || "Property"}
//                                 className="object-cover w-full h-[170px] sm:h-[190px] transition-transform duration-500 ease-out group-hover:scale-105"
//                               />
//                             )}
//                           </Link>

//                           {/* Soft top gradient so the pills stay readable */}
//                           <div className="absolute inset-x-0 top-0 z-[5] h-20 pointer-events-none bg-gradient-to-b from-black/40 to-transparent" />

//                           {/* Top-left: category pill + virtual tour */}
//                           <div className="absolute z-20 flex flex-wrap items-center gap-1.5 top-3 left-3 max-w-[60%]">
//                             <span className="px-3 py-1 text-[11px] sm:text-xs font-bold tracking-wide text-white uppercase rounded-full shadow-md bg-[#D61F45] truncate">
//                               {badgeText}
//                             </span>
//                             {property.virtual_tour_availability === "Yes" && (
//                               <span className="flex items-center gap-1 px-2 py-1 text-[10px] sm:text-[11px] font-semibold text-white rounded-full shadow-md bg-[#172033]/75 backdrop-blur-sm">
//                                 <PiCubeFocus className="text-xs text-white" />
//                                 <span className="hidden sm:inline">Virtual Tour</span>
//                               </span>
//                             )}
//                           </div>

//                           {/* Top-right: Featured pill + favorite */}
//                           <div className="absolute z-20 flex items-center gap-2 top-3 right-3">
//                             {property.mark_as_featured === "Yes" && (
//                               <span className="px-2.5 py-1 text-[10px] sm:text-[11px] font-bold tracking-wide text-[#172033] uppercase rounded-full shadow-md bg-gradient-to-r from-[#FFD233] to-[#F5B800]">
//                                 Featured
//                               </span>
//                             )}
//                             <button
//                               type="button"
//                               aria-label={property.is_favorite ? "Remove from favorites" : "Add to favorites"}
//                               className="flex items-center justify-center w-8 h-8 transition-transform rounded-full shadow-md bg-[#172033]/75 backdrop-blur-sm hover:scale-110"
//                               onClick={(e) => {
//                                 e.preventDefault();
//                                 e.stopPropagation();
//                                 if (property.is_favorite) {
//                                   removeFromFavoritesRecommendedProperty(property.favorite_id);
//                                 } else {
//                                   addToFavoritesRecommendedProperty(property._id);
//                                 }
//                               }}
//                             >
//                               <Heart
//                                 size={16}
//                                 weight="fill"
//                                 color={property.is_favorite ? "#D61F45" : "white"}
//                               />
//                             </button>
//                           </div>
//                         </div>

//                         {/* ---------- CONTENT (overlaps the image) ---------- */}
//                         <div className="relative z-10 flex flex-col justify-between flex-1 px-4 pt-3 pb-4 -mt-4 bg-white rounded-t-2xl text-[#172033]">
//                           <div>
//                             <h3
//                               className="m-0 text-base font-bold leading-6 truncate sm:text-[17px] text-[#172033]"
//                               title={property.property_name}
//                             >
//                               {property.property_name || "N/A"}
//                             </h3>

//                             <p
//                               className="m-0 text-[13px] sm:text-sm leading-5 text-[#475569] truncate"
//                               title={subtitle}
//                             >
//                               {subtitle}
//                             </p>

//                             {/* Price row */}
//                             <div className="flex flex-wrap items-center justify-between gap-1 mt-1.5 mb-2">
//                               <div className="flex flex-wrap items-center gap-2">
//                                 <span className="text-xl font-extrabold leading-none sm:text-[22px] text-[#172033]">
//                                   ₹{" "}
//                                   {isRentLike
//                                     ? formatPrice(property.rent)
//                                     : formatPrice(property.property_price)}
//                                 </span>
//                                 {isRentLike && (
//                                   <span className="text-xs text-[#64748B]">
//                                     / {property.rent_duration || "Per Month"}
//                                   </span>
//                                 )}
//                                 {property.property_category_type?.includes("Buy") &&
//                                   property.possession_status === "Ready To Move" && (
//                                     <span className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-white rounded-full bg-[#D61F45] shadow-sm whitespace-nowrap">
//                                       <Building2 size={12} strokeWidth={2.5} />
//                                       Get Best Deal
//                                     </span>
//                                   )}
//                               </div>
//                               <div className="text-xs font-medium whitespace-nowrap">
//                                 {property.property_category_type?.includes("Buy") &&
//                                   property.possession_status !== "Ready To Move" &&
//                                   property.possession_date && (
//                                     <>
//                                       <span className="text-[#64748B]">Possession:</span>
//                                       <span className="ml-1 font-semibold text-[#172033]">
//                                         {new Date(property.possession_date).toLocaleDateString("en-IN")}
//                                       </span>
//                                     </>
//                                   )}
//                               </div>
//                             </div>

//                             {/* Features row */}
//                             <div className="grid grid-cols-3 gap-1 py-2">
//                               <div className="flex items-center min-w-0 gap-1.5">
//                                 <MdApartment className="text-[18px] text-[#172033] flex-shrink-0" />
//                                 <div className="flex flex-col min-w-0">
//                                   <p className="m-0 text-xs font-bold leading-4 truncate text-[#172033]">
//                                     {property.building_type === "Commercial"
//                                       ? property.property_type === "Office"
//                                         ? "Office Space"
//                                         : property.property_type === "Retail"
//                                           ? "Retail Space"
//                                           : property.property_type
//                                       : isPG
//                                         ? `${property.bathroom || 0} Bathrooms`
//                                         : property.bhk_type}
//                                   </p>
//                                   <p className="m-0 text-[10px] leading-4 text-[#64748B] truncate">
//                                     {property.building_type === "Commercial"
//                                       ? "Property Type"
//                                       : isPG
//                                         ? "Bathrooms"
//                                         : property.property_type}
//                                   </p>
//                                 </div>
//                               </div>

//                               <div className="flex items-center min-w-0 gap-1.5">
//                                 {isPG ? (
//                                   <FaUser className="text-[15px] text-[#172033] flex-shrink-0" />
//                                 ) : (
//                                   <FaBath className="text-[15px] text-[#172033] flex-shrink-0" />
//                                 )}
//                                 <div className="flex flex-col min-w-0">
//                                   <p className="m-0 text-xs font-bold leading-4 truncate text-[#172033]">
//                                     {isPG ? property.available_for : `${property.bathroom || 0} Baths`}
//                                   </p>
//                                   <p className="m-0 text-[10px] leading-4 text-[#64748B] truncate">
//                                     {isPG ? "Available For" : "Bathrooms"}
//                                   </p>
//                                 </div>
//                               </div>

//                               <div className="flex items-center min-w-0 gap-1.5">
//                                 <RiRuler2Line className="text-[17px] text-[#172033] flex-shrink-0" />
//                                 <div className="flex flex-col min-w-0">
//                                   <p className="m-0 text-xs font-bold leading-4 truncate text-[#172033]">
//                                     {property.area} {property.area_in}
//                                   </p>
//                                   <p className="m-0 text-[10px] leading-4 text-[#64748B] truncate">
//                                     Built Up Area
//                                   </p>
//                                 </div>
//                               </div>
//                             </div>

//                             {/* Posted by · days · distance · share */}
//                             <div className="flex items-center justify-between gap-2 py-1.5 text-[11px] sm:text-xs text-[#64748B]">
//                               <div className="flex flex-wrap items-center min-w-0 gap-x-1.5">
//                                 <span className="flex items-center min-w-0">
//                                   <AiOutlineClockCircle className="mr-1 text-[13px] flex-shrink-0" />
//                                   <span className="truncate">
//                                     Posted by {property.user_type || "Owner"}
//                                   </span>
//                                 </span>
//                                 <span className="text-[#CBD5E1]">•</span>
//                                 <span className="whitespace-nowrap">
//                                   {property.days_since_created
//                                     ? `${property.days_since_created} days ago`
//                                     : "Recently"}
//                                 </span>
//                                 {distance && (
//                                   <>
//                                     <span className="text-[#CBD5E1]">•</span>
//                                     <span className="flex items-center whitespace-nowrap">
//                                       <FaMapMarkerAlt className="mr-1 text-[#D61F45]" />
//                                       {distance} km from you
//                                     </span>
//                                   </>
//                                 )}
//                               </div>
//                               <PiShareNetworkLight
//                                 title="Share"
//                                 className="flex-shrink-0 text-[16px] text-[#94A3B8] transition-colors cursor-pointer hover:text-[#D61F45]"
//                                 onClick={() =>
//                                   openShareModal(
//                                     `${window.location.origin}/propertydetails/${property._id}`,
//                                     property._id,
//                                   )
//                                 }
//                               />
//                             </div>
//                           </div>

//                           {/* Owner + Contact / WhatsApp / Call */}
//                           <div className="flex items-center justify-between gap-2 pt-3 mt-1 border-t border-[#F1F5F9]">
//                             <div className="flex items-center min-w-0 gap-2">
//                               <div className="flex items-center justify-center flex-shrink-0 overflow-hidden rounded-full shadow w-9 h-9 ring-2 ring-white bg-[#0F2747]/10">
//                                 {property.property_owner_image ? (
//                                   <img
//                                     src={`${process.env.REACT_APP_API_URL}/media/${property.property_owner_image}`}
//                                     alt={property.connect_to_name || "Owner"}
//                                     className="object-cover w-full h-full rounded-full"
//                                   />
//                                 ) : (
//                                   <AiOutlineUser className="text-xl text-[#0F2747]" />
//                                 )}
//                               </div>
//                               <div className="flex flex-col min-w-0 leading-tight">
//                                 <span
//                                   className="text-[13px] font-bold text-[#172033] truncate"
//                                   title={property.connect_to_name}
//                                 >
//                                   {property.connect_to_name || "Owner"}
//                                 </span>
//                                 <span className="text-[11px] text-[#64748B] truncate">
//                                   {property.user_type || "Owner"}
//                                 </span>
//                               </div>
//                             </div>

//                             <div className="flex items-center flex-shrink-0 gap-1.5">
//                               {/* FIX: Contact used to open THIS page's owner details
//                                   (and spend a view) instead of the card's owner.
//                                   It now opens that property's page. */}
//                               <Link
//                                 to={`/propertydetails/${property._id}`}
//                                 onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//                                 className="flex items-center justify-center px-4 h-9 text-xs sm:text-[13px] font-semibold text-white no-underline rounded-lg bg-[#D61F45] shadow-sm transition-colors hover:bg-[#B91C3C] hover:text-white hover:no-underline whitespace-nowrap"
//                               >
//                                 Contact
//                               </Link>

//                               {/* WhatsApp */}
//                               <a
//                                 href={
//                                   phoneIntl
//                                     ? `https://wa.me/${phoneIntl}?text=${encodeURIComponent(
//                                       `Hello, I am interested in your property ${property.property_name || ""}`,
//                                     )}`
//                                     : undefined
//                                 }
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 aria-label="WhatsApp"
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   if (!phoneIntl) {
//                                     e.preventDefault();
//                                     toast.error("Contact number is not available for this property.");
//                                   }
//                                 }}
//                                 className="flex items-center justify-center rounded-lg shadow-sm w-9 h-9 bg-[#22C55E] transition-colors hover:bg-[#16A34A]"
//                               >
//                                 <FaWhatsapp className="text-lg text-white" />
//                               </a>

//                               {/* Call */}
//                               <a
//                                 href={phoneIntl ? `tel:+${phoneIntl}` : undefined}
//                                 aria-label="Call"
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   if (!phoneIntl) {
//                                     e.preventDefault();
//                                     toast.error("Contact number is not available for this property.");
//                                   }
//                                 }}
//                                 className="flex items-center justify-center rounded-lg shadow-sm w-9 h-9 bg-[#3B82F6] transition-colors hover:bg-[#2563EB]"
//                               >
//                                 <FaPhoneAlt className="text-sm text-white" />
//                               </a>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </Slider>
//             </div>

//             {/* Mobile arrows below the cards */}
//             <div className="flex items-center justify-center gap-4 mt-3 sm:hidden">
//               <button
//                 type="button"
//                 aria-label="Previous"
//                 className="flex items-center justify-center rounded-full w-11 h-11 bg-[#FDE8EC] transition-all duration-300 active:scale-95"
//                 onClick={() => sliderRef.current?.slickPrev()}
//               >
//                 <GoArrowLeft className="text-xl text-[#D61F45]" />
//               </button>
//               <button
//                 type="button"
//                 aria-label="Next"
//                 className="flex items-center justify-center rounded-full w-11 h-11 bg-[#D61F45] shadow-md transition-all duration-300 active:scale-95"
//                 onClick={() => sliderRef.current?.slickNext()}
//               >
//                 <GoArrowRight className="text-xl text-white" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* ==================================================
//             Share — ONE popup (it used to render three at once)
//         ================================================== */}
//         {isShareModalOpen && (
//           <ShareModal
//             currentShareUrl={currentShareUrl || window.location.href}
//             closeShareModal={handleCloseShareModal}
//             copyLink={() => copyShareLink(currentShareUrl || window.location.href)}
//           />
//         )}

//         {/* Login / Sign-up — FIX: logged-in users used to see a stray
//             "Welcome, <phone>" line printed at the bottom of the page. */}
//         {!isLoggedIn && (
//           <>
//             <Login1
//               isOpen={isLoginModalOpen}
//               onClose={() => setIsLoginModalOpen(false)}
//               onSwitchToSignUp={() => {
//                 setIsLoginModalOpen(false);
//                 setIsSignUpModalOpen(true);
//               }}
//               onLoginSuccess={handleLoginSuccess}
//             />
//             <SignUp1
//               isOpen={isSignUpModalOpen}
//               onClose={() => setIsSignUpModalOpen(false)}
//               onSwitchToLogin={() => {
//                 setIsSignUpModalOpen(false);
//                 setIsLoginModalOpen(true);
//               }}
//             />
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default Detail;





// ===========================================================================




// import { React, useState, useRef, useEffect } from "react";
// import { FaBed, FaBath, FaRupeeSign } from "react-icons/fa";
// import { ToWords } from "to-words";
// import { MdLocationOn } from "react-icons/md";
// import { FiShare2, FiHeart } from "react-icons/fi";
// import { FaHome } from "react-icons/fa";
// import { IoMdBed } from "react-icons/io";
// import { BiArea } from "react-icons/bi";
// import { MdOutlineLocationOn } from "react-icons/md";
// import { GoArrowLeft, GoArrowRight } from "react-icons/go";
// import { FaHeart } from "react-icons/fa";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { FaUser } from "react-icons/fa";
// import { faVideo } from "@fortawesome/free-solid-svg-icons";
// import { AiOutlineGlobal } from "react-icons/ai";
// import { FaRulerCombined } from "react-icons/fa";
// import { faChair } from "@fortawesome/free-solid-svg-icons";
// import { MdOutlineBedroomParent } from "react-icons/md";
// import { AiOutlineUser, AiOutlineClockCircle } from "react-icons/ai";
// import { BiShapeSquare } from "react-icons/bi";
// import { PiShareNetworkLight } from "react-icons/pi";
// import { FaPhoneAlt } from "react-icons/fa";
// import axios from "axios";
// import {
//   HiOutlineBadgeCheck,
//   HiOutlineCalendar,
//   HiOutlineHome,
//   HiOutlineClock,
// } from "react-icons/hi";
// import { FaMoneyBillWave } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import "../styles/RecommendedProperties.css";
// import "../styles/DetailResponsive.css";
// import { BsHouseDoorFill, BsArrowsFullscreen } from "react-icons/bs";
// import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
// import { useHistory } from "react-router-dom"; // import for routing
// import { PiCubeFocus, PiCricketThin } from "react-icons/pi";
// import { useParams, useLocation } from "react-router-dom";
// import { useCity } from "./SearchContext";
// import { toast } from "react-toastify";
// import { FiUser } from "react-icons/fi";
// import Login1 from "../auth/Login1";
// import SignUp1 from "../auth/SignUp1";
// import GetScheduleVTourproperty from "../containers/GetScheduleVTourproperty";
// import { HiOutlineArrowRight } from "react-icons/hi"; // thinner arrow
// import ShareModal from "../containers/ShareModal";
// import ContactDetails from "../containers/ContactDetails";
// import { Heart, Building2 } from "lucide-react";
// import { RiRuler2Line } from "react-icons/ri";
// import { MdApartment } from "react-icons/md";
// import { FaWhatsapp, FaPhone } from "react-icons/fa";
// import { FaMapMarkerAlt } from "react-icons/fa";

// const defaultImage = "/image/appstore.png";
// const userLocation = JSON.parse(sessionStorage.getItem("userLocation"));
// const formatDateToDDMMYYYY = (dateVal, fallbackDate = null) => {
//   if (!dateVal || dateVal.toString().trim() === "" || dateVal.toString().toLowerCase() === "null") {
//     return dateVal;
//   }

//   let dateObj;
//   if (dateVal.toString().trim().toLowerCase() === "immediately") {
//     dateObj = fallbackDate ? new Date(fallbackDate) : new Date();
//   } else {
//     dateObj = new Date(dateVal);
//   }

//   if (isNaN(dateObj.getTime())) {
//     return dateVal;
//   }

//   const day = String(dateObj.getDate()).padStart(2, "0");
//   const month = String(dateObj.getMonth() + 1).padStart(2, "0");
//   const year = dateObj.getFullYear();
//   return `${day}/${month}/${year}`;
// };

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
// const Detail = ({ propertyData }) => {
//   const toWords = new ToWords({
//     localeCode: "en-IN",
//     converterOptions: {
//       currency: false,
//       ignoreDecimal: true,
//       ignoreZeroCurrency: true,
//     },
//   });
//   // const [showAllImages, setShowAllImages] = useState(false);
//   const [savedProperties, setSavedProperties] = useState([]);
//   const [properties, setProperties] = useState([]);
//   // const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const sliderRef = useRef(null);
//   const overviewRef = useRef(null);
//   const moreDetailsRef = useRef(null);
//   const amenitiesRef = useRef(null);
//   const aboutRef = useRef(null);
//   const locationRef = useRef(null);
//   const statusTimelineRef = useRef(null);
//   const [activeSection, setActiveSection] = useState("overview");
//   const [currentShareUrl1, setcurrentShareUrl1] = useState("");
//   const [propertyDetails, setPropertyDetails] = useState({});
//   const userId = sessionStorage.getItem("accessToken");
//   const history = useHistory();
//   const { searchCity } = useCity();
//   const [currentShareUrl, setCurrentShareUrl] = useState("");
//   const [activeShareId, setActiveShareId] = useState(null);
//   const [tourSchedule, setTourSchedule] = useState([]);

//   const [freeViewCount, setFreeViewCount] = useState(0);
//   const [paidViewCount, setPaidViewCount] = useState(0);

//   const formatArea = (area, unit) => {
//     if (!area) return null;

//     const formattedUnit = unit ? unit.trim().toLowerCase() : "";

//     return `${area} ${formattedUnit}`;
//   };
//   const scrollToSection = (ref, key) => {
//     setActiveSection(key);
//     ref.current?.scrollIntoView({
//       behavior: "smooth",
//       block: "start",
//     });
//   };
//   const checkPostLimits = async () => {
//     try {
//       const profileForm = new FormData();
//       profileForm.append("user_id", userId);

//       const profileResponse = await axios.post(
//         `${process.env.REACT_APP_API_URL}/cust_api/get_profile`,
//         profileForm,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         },
//       );

//       const countData = profileResponse?.data?.count_data;

//       if (countData) {
//         setFreeViewCount(countData.free_view_count || 0);
//         setPaidViewCount(countData.paid_view_count || 0);
//       }
//     } catch (error) {
//       console.error("Error checking post limits:", error);
//     }
//   };

//   useEffect(() => {
//     if (userId) {
//       checkPostLimits();
//     }
//   }, [userId]);

//   const handleAddCount = async (updatedCount) => {
//     try {
//       const addCountFormData = new FormData();
//       if (freeViewCount > 0) {
//         addCountFormData.append("free_view_count", updatedCount);
//       } else {
//         addCountFormData.append("paid_view_count", updatedCount);
//       }
//       addCountFormData.append("user_id", userId);

//       const response = await fetch(
//         `${process.env.REACT_APP_API_URL}/cust_api/add_count`,
//         {
//           method: "POST",
//           body: addCountFormData,
//         },
//       );

//       const data = await response.json();

//       if (response.ok) {
//         checkPostLimits();
//       } else {
//         console.error("Failed to update count:", data.message);
//       }
//     } catch (error) {
//       console.error("API error:", error);
//     }
//   };

//   useEffect(() => {
//     // const userId = sessionStorage.getItem("AccessToken");
//     if (userId) {
//       setIsLoggedIn(true);
//       fetchSavedProperties(userId);
//     } else {
//       setIsLoggedIn(false);
//     }
//   }, []);

//   const fetchSavedProperties = async () => {
//     // const userId = sessionStorage.getItem("AccessToken");
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}/cust_api/get_favorite_properties`,
//         { user_id: userId },
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

//   const fetchRecommendedProperties = async () => {
//     try {
//       const cityName =
//         searchCity && searchCity.trim() !== ""
//           ? searchCity.trim()
//           : sessionStorage.getItem("cityName") || "";
//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}/cust_api/get_featured_property`,
//         {
//           user_id: userId,
//           city_name: cityName,
//         },
//       );
//       if (response.data.status === 1 && Array.isArray(response.data.data)) {
//         setProperties(response.data.data);
//       } else {
//         setProperties([]);
//       }
//     } catch (error) {
//       console.error("Error fetching recommended properties:", error);
//     }
//   };

//   useEffect(() => {
//     fetchRecommendedProperties();
//   }, []);

//   //add to favorite started
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [favoriteId, setFavoriteId] = useState(null); // Store the favorite_id for removal

//   // Check if the property is a favorite on page load or when propertyDetails changes
//   const checkIfFavorite = async (propertyId) => {
//     // const userId = sessionStorage.getItem("accessToken");
//     if (!userId || !propertyId) return;

//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}/cust_api/get_favorite_properties`,
//         { user_id: userId },
//       );

//       const favoriteList = response.data.data || [];
//       const matchedFavorite = favoriteList.find(
//         (fav) => String(fav._id) === String(propertyId),
//       );

//       if (matchedFavorite) {
//         setIsFavorite(true);
//         setFavoriteId(matchedFavorite.favorite_id); // Save favorite_id for removal
//       } else {
//         setIsFavorite(false);
//         setFavoriteId(null);
//       }
//     } catch (error) {
//       console.error("Error checking favorite status:", error);
//     }
//   };

//   useEffect(() => {
//     checkIfFavorite(propertyDetails?._id);
//   }, [propertyDetails?._id]);

//   //  Add to favorites
//   const addToFavorites = async () => {
//     if (!userId) {
//       setIsLoginModalOpen(true);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}/cust_api/add_to_favorite`,
//         {
//           user_id: userId,
//           property_id: propertyDetails._id,
//         },
//       );
//       setIsFavorite(true); // Immediately set isFavorite to true
//       checkIfFavorite(_id); // Save the favorite_id from the response
//       toast.success("Property has been saved to your favorites!");
//       fetchPropertyDetails(_id);
//       fetchRecommendedProperties();
//     } catch (error) {
//       console.error("Error adding property to favorites:", error);
//       toast.error("Failed to save the property. Please try again.");
//     }
//   };

//   // Remove from favorites
//   const removeFromFavorites = async () => {
//     if (!favoriteId) return;

//     try {
//       await axios.delete(
//         `${process.env.REACT_APP_API_URL}/cust_api/remove_from_favorite`,
//         { data: { favorite_id: favoriteId } }, // DELETE request with body
//       );

//       toast.success("Property removed from your favorites.");
//       checkIfFavorite(_id);
//       fetchPropertyDetails(_id);
//       fetchRecommendedProperties();
//     } catch (error) {
//       console.error("Error removing property from favorites:", error);
//       toast.error("Failed to remove the property. Please try again.");
//     }
//   };

//   //  Add to favorites
//   const addToFavoritesRecommendedProperty = async (PropertyId) => {
//     if (!userId) {
//       setIsLoginModalOpen(true);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}/cust_api/add_to_favorite`,
//         {
//           user_id: userId,
//           property_id: PropertyId,
//         },
//       );
//       checkIfFavorite(_id);
//       fetchPropertyDetails(_id);
//       fetchRecommendedProperties();
//     } catch (error) {
//       console.log("Failed to save the property. Please try again.");
//     }
//   };

//   // Remove from favorites
//   const removeFromFavoritesRecommendedProperty = async (FavoriteId) => {
//     try {
//       await axios.delete(
//         `${process.env.REACT_APP_API_URL}/cust_api/remove_from_favorite`,
//         { data: { favorite_id: FavoriteId } },
//       );

//       checkIfFavorite(_id);
//       fetchPropertyDetails(_id);
//       fetchRecommendedProperties();
//     } catch (error) {
//       console.log("Failed to remove the property. Please try again.");
//     }
//   };

//   // Slider settings
//   const [activeIndexes, setActiveIndexes] = useState({});
//   const BASE_URL = process.env.REACT_APP_API_URL;
//   const settings = {
//     infinite: true,
//     slidesToShow: 4,
//     lazyLoad: "ondemand",
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     arrows: false,
//     cssEase: "linear",
//     centerMode: false,
//     centerPadding: "0px",
//     responsive: [
//       {
//         breakpoint: 1399,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 1023,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 767,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };
//   const openShareModal1 = (url) => {
//     setcurrentShareUrl1(url);
//     const modal = document.getElementById("shareModal1");
//     if (modal) {
//       modal.style.display = "block";
//     }
//   };

//   const openShareModal = (url, propertyId) => {
//     setCurrentShareUrl(url);
//     setActiveShareId(propertyId);
//     setIsShareModalOpen(true);
//   };

//   const formatPrice = (price) => {
//     if (price === null || price === undefined || price === "") return "";

//     price = Number(price);

//     if (price >= 10000000) {
//       return (price / 10000000).toFixed(2).replace(/\.?0+$/, "") + " Cr";
//     } else if (price >= 100000) {
//       return (price / 100000).toFixed(2).replace(/\.?0+$/, "") + " L";
//     } else if (price >= 1000) {
//       return (price / 1000).toFixed(2).replace(/\.?0+$/, "") + " K";
//     } else {
//       return price.toString();
//     }
//   };

//   // for the image section with 'get_property_detail' api

//   const { _id } = useParams();
//   const location = useLocation();
//   const property_owner_id = location.state?.property_owner_id;
//   const [aboutPropertyText, setAboutPropertyText] = useState("");

//   const [showAll, setShowAll] = useState(false);
//   const [allAmenities, setAllAmenities] = useState([]);
//   const visibleAmenities = showAll ? allAmenities : allAmenities.slice(0, 8);

//   const [propertyImages, setPropertyImages] = useState([]);
//   const [showAllImages, setShowAllImages] = useState(false);
//   const [longitude, setLongitude] = useState(0);
//   const [latitude, setLatitude] = useState(0);
//   const [userDetails, setuserDetails] = useState({
//     full_name: "",
//     mobile_number: "",
//     email: "",
//   });

//   const user_id = sessionStorage.getItem("accessToken");
//   useEffect(() => {
//     const customer_id = user_id;

//     if (propertyDetails?._id && propertyDetails?.user_id && customer_id) {
//       const formData = new FormData();
//       formData.append("property_id", propertyDetails?._id);
//       formData.append("user_id", propertyDetails?.user_id);
//       formData.append("customer_id", customer_id);

//       axios
//         .post(
//           `${process.env.REACT_APP_API_URL}/cust_api/add_view_property`,
//           formData,
//         )
//         .then((res) => {
//           if (res.data?.status === 1) {
//             console.log("View property recorded");
//           }
//         })
//         .catch((err) => {
//           console.error("Failed to record property view:", err);
//         });
//     }
//   }, [propertyDetails?._id, user_id]);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const fetchPropertyDetails = async (id) => {
//     try {
//       const res = await axios.post(
//         `${process.env.REACT_APP_API_URL}/cust_api/get_property_details`,
//         { property_id: id, user_id: userId },
//       );

//       const data = res.data?.data;
//       console.log("API Response:", data);
//       console.log("Price Onwards:", data.price_onwards);

//       if (data?.property_images?.length > 0) {
//         setPropertyImages(data.property_images);
//       } else {
//         setPropertyImages([]);
//       }

//       if (data?.amenities?.length > 0) {
//         setAllAmenities(data.amenities);
//       } else {
//         setAllAmenities([]);
//       }

//       if (
//         data?.tour_schedule?.length > 0 &&
//         data.tour_schedule[0].status !== "Rejected" &&
//         data.tour_schedule[0].status !== "Expired"
//       ) {
//         setTourSchedule(data.tour_schedule);
//         const dateParts = data.tour_schedule[0].schedule_date.split("-");
//         const year = dateParts[0].slice(-2); // "25"
//         const month = parseInt(dateParts[1], 10) - 1; // month index
//         const day = parseInt(dateParts[2], 10); // 24

//         const monthName = new Date(0, month).toLocaleString("default", {
//           month: "short",
//         });

//         const scheduledLabel = `Scheduled ${day} ${monthName} ${year}`;
//         setScheduledDateLabel(scheduledLabel);
//       } else {
//         setTourSchedule([]);
//         setScheduledDateLabel("Virtual Tour");
//       }

//       if (data?.property_details?.property_description) {
//         setAboutPropertyText(data.property_details.property_description);
//       } else {
//         setAboutPropertyText("");
//       }

//       if (data?.property_details) {
//         setPropertyDetails(data.property_details);
//       } else {
//         setPropertyDetails({});
//       }

//       if (
//         data?.user_details &&
//         Array.isArray(data.user_details) &&
//         data.user_details.length > 0
//       ) {
//         setuserDetails(data.user_details[0]);
//       } else {
//         setuserDetails({
//           full_name: "N/A",
//           mobile_number: "N/A",
//           email: "N/A",
//         });
//         console.warn("user_details is empty or invalid:", data?.user_details);
//       }

//       const pd = data.property_details;
//       setLatitude(pd.latitude);
//       setLongitude(pd.longitude);
//     } catch (err) {
//       console.error("Error fetching property details", err);
//       setPropertyImages([]);
//       setAllAmenities([]);
//       setTourSchedule([]);
//     }
//   };

//   useEffect(() => {
//     fetchPropertyDetails(_id);
//   }, [_id]);

//   // for send Enquiry 'add_property_enquiry' api

//   const [name, setName] = useState("");
//   const [message, setMessage] = useState("");
//   const [contactNumber, setContactNumber] = useState("");
//   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
//   const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [enquiryStatus, setEnquiryStatus] = useState(null); // success or error

//   // Existing useEffect (on mount)
//   useEffect(() => {
//     const mobileNumber = sessionStorage.getItem("Mobile_Number");
//     if (mobileNumber) {
//       setContactNumber(mobileNumber);
//     }
//   }, []);

//   //  New useEffect to check sessionStorage and update contact number after login
//   useEffect(() => {
//     let interval;

//     if (isLoginModalOpen === false && !contactNumber) {
//       interval = setInterval(() => {
//         const mobileNumber = sessionStorage.getItem("Mobile_Number");
//         if (mobileNumber) {
//           setContactNumber(mobileNumber);
//           clearInterval(interval); // Stop checking once we have it
//         }
//       }, 500); // Check every 500ms
//     }

//     return () => clearInterval(interval); // Cleanup
//   }, [isLoginModalOpen, contactNumber]);

//   const userType = sessionStorage.getItem("user_type");
//   // Handle Enquiry Form submission
//   const handleEnquirySubmit = async (e) => {
//     e.preventDefault();

//     const accessToken = sessionStorage.getItem("accessToken");

//     if (!accessToken) {
//       setIsLoginModalOpen(true);
//       return;
//     }

//     const enquiryData = {
//       property_id: propertyDetails?._id,
//       user_id: propertyDetails?.user_id,
//       customer_id: accessToken,
//       name,
//       user_type: userType,
//       contact_number: contactNumber,
//       message,
//     };

//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}/cust_api/add_property_enquiry`,
//         enquiryData,
//       );

//       if (response.data.status) {
//         setEnquiryStatus({
//           type: "success",
//           message: "Enquiry sent successfully!",
//         });
//         setName("");
//         setMessage("");
//       } else {
//         setEnquiryStatus({ type: "error", message: "Failed to send enquiry!" });
//       }
//     } catch (error) {
//       setEnquiryStatus({ type: "error", message: "Something went wrong!" });
//     }
//   };

//   // Trigger login modal on input if not logged in
//   const handleFieldChange = () => {
//     const accessToken = sessionStorage.getItem("accessToken");
//     if (!accessToken) {
//       setIsLoginModalOpen(true);
//     }
//   };

//   const handleLoginSuccess = () => {
//     const mobileNumber = sessionStorage.getItem("Mobile_Number");
//     if (mobileNumber) {
//       setIsLoggedIn(true);
//       setContactNumber(mobileNumber);
//       setIsLoginModalOpen(false);
//     }
//   };

//   // for the schedule virtula tour
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [scheduledDateLabel, setScheduledDateLabel] = useState("Virtual Tour");
//   const [openVirtualTourAfterLogin, setOpenVirtualTourAfterLogin] =
//     useState(false);
//   useEffect(() => {
//     const token = sessionStorage.getItem("accessToken");
//     if (token && openVirtualTourAfterLogin) {
//       setIsModalOpen(true); // Open Virtual Tour
//       setOpenVirtualTourAfterLogin(false); // Reset flag
//     }
//   }, [isLoggedIn]);

//   // for share model
//   const [openShareModalAfterLogin, setOpenShareModalAfterLogin] =
//     useState(false);
//   const [isShareModalOpen, setIsShareModalOpen] = useState(false);
//   useEffect(() => {
//     const token = sessionStorage.getItem("accessToken");
//     if (token && openShareModalAfterLogin) {
//       setIsShareModalOpen(true); // Open Share modal
//       setOpenShareModalAfterLogin(false); // Reset flag
//     }
//   }, [isLoggedIn]);

//   const handleCloseShareModal = () => {
//     setIsShareModalOpen(false);
//   };

//   //for the contact details
//   const [isContactModalOpen, setIsContactModalOpen] = useState(false);
//   const [openContactModalAfterLogin, setOpenContactModalAfterLogin] =
//     useState(false);

//   const userName = sessionStorage.getItem("user_name");
//   const userMobile = sessionStorage.getItem("Mobile_Number");

//   useState(false);
//   useEffect(() => {
//     if (sessionStorage.getItem("accessToken") && openContactModalAfterLogin) {
//       setIsContactModalOpen(true);
//       setOpenContactModalAfterLogin(false);
//     }
//   }, [openContactModalAfterLogin]);

//   // Add this line below all useState declarations or just before return:
//   const overviewFields = [
//     //["Status", propertyDetails?.available_status || null],
//     ["Property Added Date", propertyDetails?.property_added_date || null],
//     ["Property Name", propertyDetails?.property_name || null],
//     // [
//     //   "Address",
//     //   propertyDetails?.address &&
//     //   propertyDetails?.city_name &&
//     //   propertyDetails?.state &&
//     //   propertyDetails?.zip_code
//     //     ? `${propertyDetails.address}, ${propertyDetails.city_name}, ${propertyDetails.state}, ${propertyDetails.zip_code}`
//     //     : null,
//     // ],
//     [
//       "Address",
//       propertyDetails?.address || null,
//     ],
//     [
//       "Area",
//       propertyDetails?.area
//         ? formatArea(propertyDetails.area, propertyDetails.area_in)
//         : null,
//     ],
//     ["Area Type", propertyDetails?.area_type || null],
//     [
//       "Price",
//       propertyDetails?.property_category_type === "Rent"
//         ? propertyDetails?.rent
//           ? `₹${formatPrice(propertyDetails.rent)}`
//           : null
//         : propertyDetails?.property_price
//           ? `₹${formatPrice(propertyDetails.property_price)}`
//           : null,
//     ],
//     [
//       "Deposite",
//       propertyDetails?.custom_deposit_amount
//         ? `₹${formatPrice(propertyDetails.custom_deposit_amount)}`
//         : null,
//     ],
//     ["Listing Type", propertyDetails?.property_category_type || null],
//     // ["Developer", propertyDetails?.developer || null],
//     ["Building Type", propertyDetails?.building_type || null],
//     ["Property Type", propertyDetails?.property_type || null],
//     [
//       "Bhk Type",
//       propertyDetails?.bhk_type === "Studio"
//         ? "Studio/Single Room"
//         : propertyDetails?.bhk_type || null,
//     ],
//     ["Furnishing", propertyDetails?.furnished_type || null],
//     // ["Plot No.", propertyDetails?.plot_no || null],
//     ["Operating Since", propertyDetails?.operating_since || null],
//     [
//       "Available for Company Lease",
//       propertyDetails?.available_for_company_lease || null,
//     ],
//     ["Available For", propertyDetails?.available_for || null],
//     ["Suited For", propertyDetails?.suited_for || null],
//     ["Room Type", propertyDetails?.room_type || null],
//     ["Food Charges Included", propertyDetails?.food_charges_included || null],
//   ].filter(([_, value]) => value);

//   //more details

//   const moreDetailsFields = [
//     ["Food Available", propertyDetails?.food_available || null],
//     ["Notice Period", propertyDetails?.notice_period || null],
//     [
//       "Notice Period Other Days",
//       propertyDetails?.notice_period_other_days || null,
//     ],
//     [
//       "Electricity Charges Included",
//       propertyDetails?.electricity_charges_included || null,
//     ],
//     ["Total Beds", propertyDetails?.total_beds || null],
//     ["Additional Rooms", propertyDetails?.additional_rooms || null],
//     ["PG Rules", propertyDetails?.pg_rules || null],
//     ["Gate Closing Time", propertyDetails?.gate_closing_time || null],
//     ["Gate Closing Hour", propertyDetails?.gate_closing_hour || null],
//     ["PG Services", propertyDetails?.pg_services || null],
//     ["Age of Property", propertyDetails?.age_of_property || null],
//     ["Office Space Type", propertyDetails?.office_space_type || null],
//     ["Pantry", propertyDetails?.pantry || null],
//     ["Personal Washroom", propertyDetails?.personal_washroom || null],
//     ["Bathroom", propertyDetails?.bathroom || null],
//     ["Covered Parking", propertyDetails?.covered_parking || null],
//     ["Uncovered Parking", propertyDetails?.uncovered_parking || null],
//     ["Balcony", propertyDetails?.balcony || null],
//     ["Power Backup", propertyDetails?.power_backup || null],
//     ["Lift Availability", propertyDetails?.lift_availability || null],
//     ["Water Source", propertyDetails?.water_source || null],
//     ["View", propertyDetails?.view || null],
//     ["Flooring", propertyDetails?.flooring || null],
//     ["Total Floor", propertyDetails?.total_floor || null],
//     ["Property Floor", propertyDetails?.property_floor || null],
//     ["Facing", propertyDetails?.facing || null],
//     ["Ceiling Height", propertyDetails?.ceiling_height || null],
//     ["Parking Availability", propertyDetails?.parking_availability || null],
//     ["Min Lockin Period", propertyDetails?.min_lockin_period || null],
//     ["Seat Type", propertyDetails?.seat_type || null],
//     [
//       "Number of Seats Available",
//       propertyDetails?.number_of_seats_available || null,
//     ],
//     ["Plot No.", propertyDetails?.plot_no || null],
//     // ["Loan Availability", propertyDetails?.loan_availability || null],
//     //some other fileds
//     ["RERA ID", propertyDetails?.property_no || null],
//     ["Landmarks", propertyDetails?.landmarks || null],
//     ["Furnishing", propertyDetails?.furnished_type || null],
//     ["Near Landmark", propertyDetails?.near_landmark || null],
//     ["Flat Name", propertyDetails?.flat_name || null],
//     ["Maintenance Frequency", propertyDetails?.maintenance_frequency || null],
//     [
//       "Maintenance Included",
//       propertyDetails?.maintenance_included ? "Yes" : "No",
//     ],
//     ["Security Deposit Type", propertyDetails?.security_deposit_type || null],
//     [
//       "Available for Company Lease",
//       propertyDetails?.available_for_company_lease || null,
//     ],
//     ["Available For", propertyDetails?.available_for || null],
//     ["Suited For", propertyDetails?.suited_for || null],
//     ["Room Type", propertyDetails?.room_type || null],
//     ["Food Charges Included", propertyDetails?.food_charges_included || null],
//     // [
//     //   "Virtual Tour Availability",
//     //   propertyDetails?.virtual_tour_availability || null,
//     // ],
//     ["Property Category Type", propertyDetails?.property_category_type || null],
//     ["Rent", propertyDetails?.rent || null],
//     ["Rent Duration", propertyDetails?.rent_duration || null],
//     ["Property Added Date", propertyDetails?.property_added_date ? formatDateToDDMMYYYY(propertyDetails.property_added_date) : null],
//     ["Possession Status", propertyDetails?.possession_status || null],
//     ["Possession Date", propertyDetails?.possession_date ? formatDateToDDMMYYYY(propertyDetails.possession_date) : null],

//     ["Area Type", propertyDetails?.area_type || null],
//     ["Built up Area", propertyDetails?.area || null],
//     [
//       "Built-up Area Unit",
//       propertyDetails?.area_in ? propertyDetails.area_in.toLowerCase() : null,
//     ],
//     ["Carpet Area", propertyDetails?.carpet_area || null],
//     [
//       "Carpet Area Unit",
//       propertyDetails?.carpet_area_unit
//         ? propertyDetails.carpet_area_unit.toLowerCase()
//         : null,
//     ],
//     ["Available Status", propertyDetails?.available_status || null],
//     ["Investment Options", propertyDetails?.investment_options || null],
//     ["All Inclusive Price", propertyDetails?.all_inclusive_price || null],
//     ["Price Onwards", propertyDetails?.price_onwards || null],
//     ["Price Negotiable", propertyDetails?.price_negotiable || null],
//     [
//       "Tax And Goverment Charges",
//       propertyDetails?.tax_and_goverment_charges || null,
//     ],
//     [
//       "Electricity And Water Charges",
//       propertyDetails?.electricity_and_water_charges || null,
//     ],
//     ["No Of Open Sides", propertyDetails?.no_of_open_sides || null],
//     ["No Of Peoples", propertyDetails?.no_of_peoples || null],
//     ["Type Of Construction", propertyDetails?.type_of_construction || null],
//     ["Quality Rating", propertyDetails?.quality_rating || null],
//     ["Central AC", propertyDetails?.central_AC || null],
//     ["Total Number Parking", propertyDetails?.total_number_parking || null],
//     ["Block", propertyDetails?.block || null],
//     ["Developer", propertyDetails?.developer || null],
//     ["Project Type", propertyDetails?.project_type || null],
//     ["Transaction Type", propertyDetails?.transaction_type || null],
//     ["Builder Floor Type", propertyDetails?.builder_floor_type || null],
//     // ["Attached Bathroom", propertyDetails?.attached_bathroom || null],
//     // ["Attached Balcony", propertyDetails?.attached_balcony || null],
//     // ["Pantry Option", propertyDetails?.pantry_option || null],
//     // ["Parking Types", propertyDetails?.parking_types || null],
//     ["Possession By", propertyDetails?.possession_by || null],
//     [
//       "Property Dimensions Length",
//       propertyDetails?.property_dimensions_length || null,
//     ],
//     [
//       "Property Dimensions Breadth",
//       propertyDetails?.property_dimensions_breadth || null,
//     ],
//     ["Length Of Land", propertyDetails?.length_of_land || null],
//     ["Breadth Of Land", propertyDetails?.breadthOfLand || null],
//     ["Open Sides Of Land", propertyDetails?.openSidesOfLand || null],
//     ["Construction On Land", propertyDetails?.constructionOnLand || null],
//     [
//       "Selected Construction On Land",
//       propertyDetails?.selectedConstructionOnLand || null,
//     ],
//     ["Commercial Washroom", propertyDetails?.commercial_washroom || null],
//     [
//       "Number Of Minimum Bathrooms",
//       propertyDetails?.number_of_minimum_bathrooms || null,
//     ],
//     ["Maintenance Cost", propertyDetails?.maintenance_cost || null],
//     ["Available Beds", propertyDetails?.available_beds || null],
//     [
//       "Available From",
//       propertyDetails?.possession_date || propertyDetails?.available_from
//         ? formatDateToDDMMYYYY(
//           propertyDetails?.possession_date || propertyDetails?.available_from,
//           propertyDetails?.property_added_date
//         )
//         : null,
//     ],
//     ["Available On", propertyDetails?.available_on ? formatDateToDDMMYYYY(propertyDetails.available_on) : null],

//     ["No Of Cabines", propertyDetails?.no_of_cabines || null],
//     ["No Of Meeting Rooms", propertyDetails?.no_of_meeting_Rooms || null],
//     ["No Of Conference Room", propertyDetails?.no_of_conference_room || null],
//     // ["Posted By Admin", propertyDetails?.posted_by_admin || null],
//     // ["UPS", propertyDetails?.ups || null],
//     // ["Oxygen Duct", propertyDetails?.oxygenDuct || null],
//     // ["Central AC", propertyDetails?.central_AC || null],
//     // ["Conference Room", propertyDetails?.conferenceRoom || null],
//     // ["Washroom", propertyDetails?.washroom || null],
//     // ["Washroom Check", propertyDetails?.washroom_Check || null],
//     ["Reception Area", propertyDetails?.reception_area || null],
//     // ["Created At",
//     //   propertyDetails?.created_at
//     //     ? new Date(propertyDetails.created_at).toLocaleDateString("en-GB")
//     //     : null,
//     // ],

//     // ["Updated At",
//     //   propertyDetails?.updated_at
//     //     ? new Date(propertyDetails.updated_at).toLocaleDateString("en-GB")
//     //     : null,
//     // ],
//   ].filter(([_, value]) => value);
//   const statusTimelineItems = [];

//   const addStatusItem = ({
//     icon,
//     title,
//     value,
//     bgColor,
//     iconColor,
//   }) => {
//     if (
//       !value ||
//       value.toString().trim() === "" ||
//       value.toString().toLowerCase() === "n/a" ||
//       value.toString().toLowerCase() === "null"
//     ) {
//       return;
//     }

//     statusTimelineItems.push({
//       icon,
//       title,
//       value,
//       bgColor,
//       iconColor,
//     });
//   };
//   addStatusItem({
//     icon: <HiOutlineBadgeCheck />,
//     title: "Availability",
//     value: propertyDetails?.available_status,
//     bgColor: "bg-green-50",
//     iconColor: "text-green-600",
//   });
//   addStatusItem({
//     icon: <HiOutlineCalendar />,
//     title: "Available From",
//     value: formatDateToDDMMYYYY(
//       propertyDetails?.possession_date || propertyDetails?.available_from,
//       propertyDetails?.property_added_date
//     ),
//     bgColor: "bg-blue-50",
//     iconColor: "text-blue-600",
//   });

//   addStatusItem({
//     icon: <HiOutlineHome />,
//     title: "Possession",
//     value: propertyDetails?.possession_status,
//     bgColor: "bg-orange-50",
//     iconColor: "text-orange-600",
//   });

//   addStatusItem({
//     icon: <HiOutlineClock />,
//     title: "Last Updated",
//     value: propertyDetails?.updated_at
//       ? formatDateToDDMMYYYY(propertyDetails.updated_at)
//       : formatDateToDDMMYYYY(propertyDetails?.property_added_date),
//     bgColor: "bg-purple-50",
//     iconColor: "text-purple-600",
//   });

//   addStatusItem({
//     icon: <HiOutlineClock />,
//     title: "Property Age",
//     value: propertyDetails?.age_of_property,
//     bgColor: "bg-amber-50",
//     iconColor: "text-amber-700",
//   });

//   const handleClick = () => {
//     history.push("/featuredDashboard");
//   };

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   // Prevent background scrolling when modal is open
//   useEffect(() => {
//     if (
//       isShareModalOpen ||
//       isContactModalOpen ||
//       showAllImages ||
//       isModalOpen
//     ) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }

//     // Cleanup when component unmounts
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [isShareModalOpen, isContactModalOpen, showAllImages, isModalOpen]);

//   const getTimeAgo = (dateString) => {
//     if (!dateString) return "";

//     const now = new Date();
//     const created = new Date(dateString);

//     const diffMs = now - created;

//     const minutes = Math.floor(diffMs / (1000 * 60));
//     const hours = Math.floor(diffMs / (1000 * 60 * 60));
//     const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

//     if (minutes < 60) {
//       return `${minutes} min ago`;
//     }

//     if (hours < 24) {
//       return `${hours} hr${hours > 1 ? "s" : ""} ago`;
//     }

//     if (days < 30) {
//       return `${days} day${days > 1 ? "s" : ""} ago`;
//     }

//     const months = Math.floor(days / 30);

//     if (months < 12) {
//       return `${months} month${months > 1 ? "s" : ""} ago`;
//     }

//     const years = Math.floor(months / 12);

//     return `${years} year${years > 1 ? "s" : ""} ago`;
//   };

//   return (
//     <>
//       <div className="max-w-full px-4 mx-auto sm:px-16 detail-page-container">
//         {/* Property Details Section */}
//         <div className="relative w-full h-auto p-2 mb-4 rounded-lg shadow-sm bg-rose-50 detail-header-card">
//           {(propertyDetails?.property_price || propertyDetails?.rent) && (
//             <div className="absolute top-4 right-4 flex flex-col items-end detail-price-block">
//               <p className="flex items-center mt-5 text-3xl font-bold my-text">
//                 <FaRupeeSign className="mr-2" />
//                 {propertyDetails?.property_category_type === "Rent" ||
//                   propertyDetails?.property_category_type === "PG/Co-living" ? (
//                   <>
//                     {formatPrice(propertyDetails?.rent)}{" "}
//                     <span className="ml-1 text-xl text-gray-700">
//                       / {propertyDetails?.rent_duration || "Per Month"}
//                     </span>
//                   </>
//                 ) : (
//                   formatPrice(propertyDetails?.property_price)
//                 )}
//               </p>
//               <p className="mt-1 text-sm font-medium text-gray-500">
//                 {propertyDetails?.property_category_type === "Rent" ||
//                   propertyDetails?.property_category_type === "PG/Co-living"
//                   ? `${toWords.convert(Number(propertyDetails?.rent))} Only`
//                   : `${toWords.convert(Number(propertyDetails?.property_price))} Only`}
//               </p>
//             </div>
//           )}

//           {/* <h2 className="mt-2 ml-6 text-3xl font-normal">
//             {propertyDetails?.bhk_type ? `${propertyDetails.bhk_type} ` : ""}
//             {propertyDetails?.area ? `${propertyDetails.area} Sq-ft ` : ""}
//             {propertyDetails?.property_type
//               ? `${propertyDetails.property_type} `
//               : ""}
//             for {propertyDetails?.property_category_type
//               ? `${propertyDetails.property_category_type}`
//               : ""}
//           </h2> */}

//           <h2 className="mt-2 ml-6 text-3xl font-normal detail-title">
//             {propertyDetails?.property_name
//               ? `${propertyDetails.property_name} `
//               : ""}
//           </h2>

//           <p className="ml-6 text-xl font-bold text-gray-700 break-words whitespace-normal max-w-[80ch] detail-address">
//             <img
//               src="/image/address_icon.png"
//               alt="Address Icon"
//               className="inline-block w-5 h-5 mr-2"
//             />
//             {propertyDetails?.address || "Address N/A"}
//           </p>
//           <div className="flex items-center mt-6 ml-5 space-x-8 detail-info-row">
//             {propertyDetails?.bhk_type && (
//               <div className="flex items-center space-x-2">
//                 <FaBed className="text-2xl my-text" />
//                 <span className="text-lg font-bold">
//                   {propertyDetails.bhk_type}
//                 </span>
//               </div>
//             )}

//             {propertyDetails?.area && (
//               <div className="flex items-center space-x-2">
//                 <FaRulerCombined className="text-2xl my-text" />
//                 <span className="text-lg font-bold">
//                   {formatArea(propertyDetails.area, propertyDetails.area_in)}
//                 </span>
//               </div>
//             )}

//             {propertyDetails?.bathroom && (
//               <div className="flex items-center space-x-2">
//                 <FaBath className="text-2xl my-text" />
//                 <span className="text-lg font-bold">
//                   {propertyDetails.bathroom} Bathroom
//                 </span>
//               </div>
//             )}
//           </div>

//           <div className="flex justify-end mt-6 space-x-4 detail-actions-row">
//             {propertyDetails.virtual_tour_availability === "Yes" && (
//               <button
//                 className={`px-6 py-2 text-lg flex items-center gap-2 w-full sm:w-auto justify-center detail-action-btn
//       ${tourSchedule?.[0]?.status === "Accepted"
//                     ? "bg-green-500 text-white rounded-full"
//                     : scheduledDateLabel === "Virtual Tour"
//                       ? "bg-white border my-text rounded-lg"
//                       : "bg-[#FFD700] text-black rounded-full"
//                   }`}
//                 onClick={() => {
//                   const token = sessionStorage.getItem("accessToken");

//                   if (scheduledDateLabel !== "Virtual Tour") {
//                     history.push({
//                       pathname: "/dashboard",
//                       state: { page: "myVirtualtour" },
//                     });
//                   } else {
//                     if (token) {
//                       setIsModalOpen(true);
//                     } else {
//                       setOpenVirtualTourAfterLogin(true);
//                       setIsLoginModalOpen(true);
//                     }
//                   }
//                 }}
//               >
//                 <PiCubeFocus size={20} />
//                 {scheduledDateLabel}
//                 {scheduledDateLabel !== "Virtual Tour" && (
//                   <HiOutlineArrowRight size={16} />
//                 )}
//               </button>
//             )}

//             {isModalOpen && (
//               <GetScheduleVTourproperty
//                 onClose={() => setIsModalOpen(false)}
//                 propertyDetails={propertyDetails}
//                 setScheduledDateLabel={setScheduledDateLabel}
//                 setIsModalOpen={setIsModalOpen}
//               />
//             )}
//             <div
//               className="w-full px-3 py-1 text-sm text-white my-bg rounded-lg cursor-pointer sm:px-4 sm:py-2 sm:text-lg sm:w-auto detail-action-btn detail-contact-btn"
//               onClick={() => {
//                 const token = sessionStorage.getItem("accessToken");
//                 if (token) {
//                   if (!userDetails) {
//                     // Avoid opening the modal if user data is missing
//                     toast.error("User data not found");
//                     return;
//                   }

//                   if (freeViewCount > 0) {
//                     const updatedCount = -1;
//                     setFreeViewCount(updatedCount);
//                     handleAddCount(updatedCount);
//                   } else if (paidViewCount > 0) {
//                     const updatedCount = -1;
//                     setPaidViewCount(updatedCount);
//                     handleAddCount(updatedCount);
//                   }

//                   setIsContactModalOpen(true);
//                 } else {
//                   setOpenContactModalAfterLogin(true);
//                   setIsLoginModalOpen(true);
//                 }
//               }}
//             >
//               Contact Details
//             </div>
//             {isContactModalOpen &&
//               userDetails &&
//               !Array.isArray(userDetails) &&
//               userDetails.full_name && (
//                 <ContactDetails
//                   onClose={() => setIsContactModalOpen(false)}
//                   fullName={
//                     freeViewCount <= 0 && paidViewCount <= 0
//                       ? `****${userDetails.full_name.slice(-1) || "N/A"}`
//                       : userDetails.full_name || "N/A"
//                   }
//                   mobile={
//                     freeViewCount <= 0 && paidViewCount <= 0
//                       ? `********${userDetails.mobile_number?.slice(-3) || "000"}`
//                       : userDetails.mobile_number || "N/A"
//                   }
//                   userEmail={
//                     freeViewCount <= 0 && paidViewCount <= 0
//                       ? userDetails.email
//                         ? `*******${userDetails.email.slice(-3)}`
//                         : "N/A"
//                       : userDetails.email || "N/A"
//                   }
//                   showUpgradePrompt={freeViewCount <= 0 && paidViewCount <= 0}
//                 />
//               )}
//             <div
//               className="flex items-center justify-center w-10 h-10 bg-white rounded-md cursor-pointer detail-icon-btn"
//               onClick={() => {
//                 if (propertyDetails.is_favorite) {
//                   removeFromFavoritesRecommendedProperty(
//                     propertyDetails.favorite_id,
//                   );
//                 } else {
//                   addToFavoritesRecommendedProperty(propertyDetails._id);
//                 }
//               }}
//             >
//               <FiHeart
//                 className={`text-2xl ${propertyDetails.is_favorite
//                   ? "text-red-600 fill-red-600"
//                   : "text-gray-600"
//                   }`}
//               />
//             </div>

//             <div
//               className="flex items-center justify-center w-8 h-8 bg-white rounded-md cursor-pointer sm:w-10 sm:h-10 detail-icon-btn"
//               onClick={() => {
//                 setIsShareModalOpen(true);
//               }}
//             >
//               <FiShare2 className="text-xl text-gray-600 sm:text-2xl" />
//             </div>
//           </div>
//         </div>

//         {/* Image Section & Contact Form */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-2 h-auto md:h-[550px] detail-main-grid">
//           {/* Left Side Image Section */}
//           <div className="grid grid-cols-1 col-span-2 gap-1 md:grid-cols-1 detail-left-col">
//             {/* Image Section */}
//             <div className="flex flex-col gap-2 mt-6 md:flex-row detail-image-row">
//               {propertyImages.length === 0 ? (
//                 <div className="w-full relative">
//                   <img
//                     src={propertyDetails?.cover_image}
//                     alt="Main"
//                     className="rounded-2xl w-full h-64 md:h-[400px] object-cover detail-cover-image"
//                   />
//                   {/* Watermark */}
//                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                     <span className="text-4xl md:text-3xl font-extrabold text-white rotate-[-30deg] opacity-40 select-none">
//                       ApnaGhar
//                     </span>
//                   </div>
//                 </div>
//               ) : (
//                 <>
//                   {/* Left Side - Main Image */}
//                   <div className="md:basis-[60%]">
//                     <div className="relative">
//                       <img
//                         src={propertyDetails.cover_image}
//                         alt="Main"
//                         className="rounded-2xl w-full h-64 md:h-[400px] object-cover detail-cover-image"
//                       />
//                       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                         <span className="text-4xl md:text-3xl font-extrabold text-white rotate-[-30deg] opacity-40 select-none">
//                           ApnaGhar
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Right Side - Video on Top + One Image Below */}
//                   <div className="md:basis-[40%] flex flex-col justify-start gap-2 px-2">
//                     {/* Property Main Image Section */}
//                     <div
//                       className="relative cursor-pointer"
//                       onClick={() => setShowAllImages(true)}
//                     >
//                       {propertyImages.length > 0 && (
//                         <div className="relative">
//                           <img
//                             src={propertyImages[0].image}
//                             alt="Preview"
//                             className="rounded-2xl w-full h-48 md:h-[195px] object-cover detail-gallery-image"
//                           />
//                           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                             <span className="text-4xl md:text-3xl font-extrabold text-white rotate-[-30deg] opacity-40 select-none">
//                               ApnaGhar
//                             </span>
//                           </div>
//                         </div>
//                       )}
//                     </div>

//                     {/* Property Additional Images Section */}
//                     {propertyImages.length > 1 && (
//                       <div className="grid grid-cols-1 gap-2 mt-2">
//                         {(() => {
//                           const filteredImages = propertyImages.filter(
//                             (img) => img.image !== propertyDetails.cover_image,
//                           );

//                           // Case 1: No images after filtering → Don’t render
//                           if (filteredImages.length === 0) {
//                             return null;
//                           }

//                           // Case 2: Only one image → Don’t render second section
//                           if (filteredImages.length === 1) {
//                             return null;
//                           }

//                           // Case 3: More than one image → Render the 2nd preview + overlay
//                           return (
//                             <div
//                               className="relative cursor-pointer"
//                               onClick={() => setShowAllImages(true)}
//                             >
//                               <div className="relative">
//                                 <img
//                                   src={filteredImages[1]?.image}
//                                   alt="Preview"
//                                   className="rounded-2xl w-full h-48 md:h-[190px] object-cover detail-gallery-image"
//                                 />
//                                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                                   <span className="text-4xl md:text-3xl font-extrabold text-white rotate-[-30deg] opacity-40 select-none">
//                                     ApnaGhar
//                                   </span>
//                                 </div>
//                               </div>
//                               {filteredImages.length > 1 && (
//                                 <div className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-white bg-black bg-opacity-50 rounded-2xl">
//                                   {(() => {
//                                     const count =
//                                       filteredImages.length -
//                                       1 +
//                                       (propertyDetails?.property_video ? 1 : 0);

//                                     return count > 0 ? (
//                                       <div className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-white bg-black bg-opacity-50 rounded-2xl">
//                                         +{count} View All
//                                       </div>
//                                     ) : null;
//                                   })()}
//                                 </div>
//                               )}
//                             </div>
//                           );
//                         })()}
//                       </div>
//                     )}
//                   </div>
//                 </>
//               )}
//             </div>
//             {/* Navigation Tabs */}
//             <div className="sticky top-0 z-20 flex items-center gap-8 px-6 py-4 mb-4 bg-white rounded-lg shadow-sm detail-tabs">
//               <button
//                 onClick={() => scrollToSection(overviewRef, "overview")}
//                 className={`relative font-medium pb-1 detail-tab-btn ${activeSection === "overview"
//                   ? "text-red-600"
//                   : "hover:text-[#8A2432]"
//                   }`}
//               >
//                 Overview
//                 {activeSection === "overview" && (
//                   <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-red-500 rounded-full"></span>
//                 )}
//               </button>

//               <button
//                 onClick={() =>
//                   scrollToSection(statusTimelineRef, "statusTimeline")
//                 }
//                 className={`relative font-medium pb-1 detail-tab-btn ${activeSection === "statusTimeline"
//                   ? "text-red-600"
//                   : "hover:text-[#8A2432]"
//                   }`}
//               >
//                 Status & Timeline
//                 {activeSection === "statusTimeline" && (
//                   <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-red-500 rounded-full"></span>
//                 )}
//               </button>
//               <button
//                 onClick={() => scrollToSection(moreDetailsRef, "moreDetails")}
//                 className={`relative font-medium pb-1 detail-tab-btn ${activeSection === "moreDetails"
//                   ? "text-red-600"
//                   : "hover:text-[#8A2432]"
//                   }`}
//               >
//                 More Details
//                 {activeSection === "moreDetails" && (
//                   <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-red-500 rounded-full"></span>
//                 )}
//               </button>

//               <button
//                 onClick={() => scrollToSection(amenitiesRef, "amenities")}
//                 className={`relative font-medium pb-1 detail-tab-btn ${activeSection === "amenities"
//                   ? "text-red-600"
//                   : "hover:text-[#8A2432]"
//                   }`}
//               >
//                 Amenities
//                 {activeSection === "amenities" && (
//                   <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-red-500 rounded-full"></span>
//                 )}
//               </button>

//               <button
//                 onClick={() => scrollToSection(aboutRef, "about")}
//                 className={`relative font-medium pb-1 detail-tab-btn ${activeSection === "about"
//                   ? "text-red-600"
//                   : "hover:text-[#8A2432]"
//                   }`}
//               >
//                 About Property
//                 {activeSection === "about" && (
//                   <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-red-500 rounded-full"></span>
//                 )}
//               </button>

//               <button
//                 onClick={() => scrollToSection(locationRef, "location")}
//                 className={`relative font-medium pb-1 detail-tab-btn ${activeSection === "location"
//                   ? "text-red-600"
//                   : "hover:text-[#8A2432]"
//                   }`}
//               >
//                 Location
//                 {activeSection === "location" && (
//                   <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-red-500 rounded-full"></span>
//                 )}
//               </button>
//             </div>
//             {/* Add the Overview Component Below */}
//             {overviewFields.length > 0 && (
//               <div
//                 ref={overviewRef}
//                 className="w-full p-4 bg-white rounded-lg shadow-sm scroll-mt-20"
//               >
//                 <h3 className="mb-4 text-3xl font-semibold">Overview</h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-[18px]">
//                   {overviewFields.map(([key, value], index) => (
//                     <div
//                       key={index}
//                       className="flex justify-start p-2 border-gray-200"
//                     >
//                       <span className="w-1/2 text-gray-500">{key}</span>
//                       <span className="text-black">{value}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//             {statusTimelineItems.length > 0 && (
//               <div
//                 ref={statusTimelineRef}
//                 className="w-full p-5 mt-4 bg-white rounded-lg shadow-sm scroll-mt-20"
//               >
//                 <h3 className="mb-5 text-2xl font-semibold text-gray-800">
//                   Status & Timeline
//                 </h3>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {statusTimelineItems.map((item, index) => (
//                     <div
//                       key={index}
//                       className={`flex items-start p-4 rounded-xl border border-gray-200 ${item.bgColor}`}
//                     >
//                       {/* Icon */}
//                       <div
//                         className={`w-10 h-10 rounded-full flex items-center justify-center ${item.bgColor}`}
//                       >
//                         <span className={`text-xl ${item.iconColor}`}>
//                           {item.icon}
//                         </span>
//                       </div>

//                       {/* Content */}
//                       <div className="ml-4 flex-1">
//                         <p className="text-sm text-gray-500">
//                           {item.title}
//                         </p>

//                         <p className="mt-1 text-base font-semibold text-gray-800 break-words">
//                           {item.value}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* More Details Section */}
//             {/* {moreDetailsFields.length > 0 && (
//               <div className="w-full p-4 mt-4 bg-white rounded-lg shadow-sm">
//                 <h3 className="mb-4 ml-2 text-3xl font-semibold">
//                   More Details
//                 </h3>
//                 <table className="min-w-full table-auto text-left text-[16px] text-black ml-2">
//                   <tbody>
//                     {moreDetailsFields.map(([label, value], index) => (
//                       <tr key={index} className="align-top">
//                         <td className="py-1 pr-2 text-gray-500 sm:pr-6 md:pr-12 lg:pr-20 whitespace-nowrap">
//                           {label}:
//                         </td>
//                         <td className="py-1 pl-1 break-words">{value}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )} */}

//             {moreDetailsFields.length > 0 && (
//               <div
//                 ref={moreDetailsRef}
//                 className="w-full p-4 mt-4 bg-white rounded-lg shadow-sm scroll-mt-20"
//               >
//                 <h3 className="mb-4 text-xl font-semibold text-gray-800">
//                   More Details
//                 </h3>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4">
//                   {moreDetailsFields.map(([label, value], index) => (
//                     <div key={index} className="flex flex-col">
//                       <span className="text-xs text-gray-500 uppercase tracking-wide">
//                         {label}
//                       </span>
//                       <span className="text-sm font-semibold text-gray-800 mt-0.5">
//                         {value}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Amenities Section */}
//             <div
//               ref={amenitiesRef}
//               className="w-full p-3 mt-4 bg-white rounded-lg shadow-sm scroll-mt-20"
//             >
//               <h3 className="ml-4 font-semibold text-lm">Amenities</h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 mt-4 ml-4 text-[18px]">
//                 {visibleAmenities.map((amenity, index) => (
//                   <p key={index} className="flex items-center text-lg">
//                     {amenity.icon ? (
//                       <img
//                         src={`${process.env.REACT_APP_API_URL}/media/${amenity.icon}`}
//                         alt={amenity.name}
//                         className="w-10 h-10 mr-2"
//                       />
//                     ) : (
//                       <PiCricketThin className="mr-2 text-lg text-black" />
//                     )}
//                     {amenity.name}
//                   </p>
//                 ))}
//               </div>
//               {!showAll && allAmenities.length > 8 && (
//                 <p
//                   className="mt-2 ml-4 font-bold my-text cursor-pointer "
//                   onClick={() => setShowAll(true)}
//                 >
//                   +{allAmenities.length - 8} More
//                 </p>
//               )}
//             </div>

//             {/* About Property Section */}
//             <div
//               ref={aboutRef}
//               className="bg-white shadow-sm mt-4 rounded-2xl p-3 h-auto md:h-[250px] w-full scroll-mt-20"
//             >
//               <h2 className="justify-center ml-4 font-bold text-gray-700 text-ml">
//                 About property
//               </h2>
//               <p className="mt-3 text-gray-700 justify-center ml-4 text-[18px]">
//                 {aboutPropertyText}
//               </p>
//             </div>

//             {/* Location Section with Map */}
//             <div
//               ref={locationRef}
//               className="bg-white shadow-sm mt-4 rounded-2xl p-3 h-auto md:h-[600px] w-full scroll-mt-20"
//             >
//               <h2 className="ml-4 text-3xl font-bold text-gray-900">
//                 Location
//               </h2>
//               <div className="mt-4 overflow-hidden rounded-lg">
//                 <iframe
//                   className="w-full h-48 md:h-[450px] rounded-2xl"
//                   src={`https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
//                   allowFullScreen
//                   loading="lazy"
//                 ></iframe>
//               </div>
//             </div>
//           </div>
//           {/* Right Side Contact Form with Increased Height */}
//           <div className="sticky top-0 flex flex-col max-h-screen pt-4 overflow-auto detail-enquiry-col">
//             <div className="bg-white shadow-lg rounded-2xl p-4 min-h-[650px] flex flex-col justify-between detail-enquiry-card">
//               <div>
//                 <h3 className="mb-5 text-xl font-semibold">Make an Enquiry</h3>
//                 <div className="flex items-center pb-3 mb-6 space-x-6 border-b-2 border-black detail-agent-row">
//                   <Link
//                     to={`/agentdetail/${userDetails?._id}`}
//                     onClick={() =>
//                       window.scrollTo({ top: 0, behavior: "smooth" })
//                     }
//                     className="block overflow-hidden no-underline shadow-md rounded-2xl hover:no-underline"
//                   >
//                     <img
//                       src={
//                         userDetails?.profile_image
//                           ? userDetails?.profile_image
//                           : "/image/app.png"
//                       }
//                       alt="Agent"
//                       className="object-contain w-16 h-16 rounded-full"
//                     />
//                   </Link>
//                   <div className="flex flex-col items-center">
//                     <span className="text-lg font-semibold">
//                       {userDetails.full_name || "N/A"}
//                     </span>
//                     <span className="text-sm font-semibold">
//                       {userDetails.user_type || "N/A"}
//                     </span>
//                   </div>
//                 </div>

//                 <form onSubmit={handleEnquirySubmit} className="flex flex-col">
//                   <input
//                     type="text"
//                     placeholder="Name"
//                     value={name}
//                     onChange={(e) => {
//                       setName(e.target.value);
//                       handleFieldChange();
//                     }}
//                     className="w-full p-3 mb-4 text-lg border rounded-md outline-none focus:ring-2 focus:ring-rose-500"
//                     required
//                   />
//                   <input
//                     type="text"
//                     placeholder="Phone Number"
//                     value={contactNumber}
//                     readOnly
//                     className="w-full p-3 mb-4 text-lg border rounded-md outline-none focus:ring-2 focus:ring-rose-500"
//                   />

//                   {/* IMPORTANT: TextArea wrapper Div with 'relative' */}
//                   <div className="relative w-full mb-4">
//                     <textarea
//                       placeholder="Message"
//                       value={message}
//                       maxLength={255}
//                       onChange={(e) => {
//                         setMessage(e.target.value);
//                         handleFieldChange();
//                       }}
//                       className="w-full h-28 p-3 pb-7 pr-16 text-base border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-rose-500 resize-none block"
//                       required
//                     ></textarea>
//                     {/* Counter inside the textarea box */}
//                     <span className="absolute bottom-2 right-3 text-xs text-gray-400 pointer-events-none select-none z-10">
//                       {message.length}/255
//                     </span>
//                   </div>

//                   <button
//                     type="submit"
//                     className="w-full mt-2 py-4 text-lg text-white my-bg rounded-lg"
//                   >
//                     Send an Enquiry
//                   </button>
//                 </form>
//               </div>

//               {enquiryStatus && (
//                 <div
//                   className={`text-center mt-4 text-lg ${enquiryStatus.type === "success"
//                     ? "text-green-600"
//                     : "text-red-600"
//                     }`}
//                 >
//                   {enquiryStatus.message}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Modal for Viewing All Images */}
//         {showAllImages && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
//             <div className="bg-white p-6 rounded-lg w-[80%] h-[80%] overflow-auto">
//               <button
//                 className="absolute text-3xl text-white top-4 right-4"
//                 onClick={() => setShowAllImages(false)}
//               >
//                 ×
//               </button>
//               <h2 className="mb-4 text-2xl font-semibold">Gallery</h2>
//               <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
//                 {propertyImages.map((img, index) => (
//                   <div className="relative">
//                     <img
//                       key={index}
//                       src={img.image}
//                       alt={`Room ${index + 1}`}
//                       className="object-cover w-full h-48 rounded-lg"
//                     />
//                     <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                       <span className="text-4xl md:text-3xl font-extrabold text-white rotate-[-30deg] opacity-40 select-none">
//                         ApnaGhar
//                       </span>
//                     </div>
//                   </div>
//                 ))}

//                 {/* Property  Video at the end */}
//                 {propertyDetails?.property_video && (
//                   <video
//                     controls
//                     className="rounded-2xl w-full h-48 md:h-[195px] object-cover"
//                   >
//                     <source
//                       src={propertyDetails.property_video}
//                       type="video/mp4"
//                     />
//                     Your browser does not support the video tag.
//                   </video>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Exclusive Recommended Section */}
//         <div className="w-full px-2 sm:px-6 lg:px-4">
//           <div className="flex flex-col items-start justify-between gap-3 px-2 sm:px-4 pt-3 mb-3 sm:flex-row sm:items-center">
//             <div className="flex flex-col">
//               <h2 className="mb-2 text-xl font-bold tracking-wide text-gray-800 sm:text-2xl lg:text-3xl">
//                 Exclusive Recommended
//               </h2>
//               <p className="text-gray-500"></p>
//             </div>

//             <div className="flex items-center w-full sm:w-auto justify-between sm:justify-end mt-2 space-x-3 sm:space-x-5 sm:mt-0">
//               <button
//                 className="px-4 py-2 text-xs sm:text-sm text-rose-700 bg-white my-border rounded-lg sm:px-6"
//                 onClick={handleClick}
//               >
//                 View All Properties
//               </button>

//               <div className="hidden sm:flex items-center space-x-3">
//                 <button
//                   className="p-2 text-lg font-semibold text-gray-700 bg-white rounded-full shadow-md sm:text-2xl hover:shadow-lg"
//                   onClick={() => sliderRef.current.slickPrev()}
//                 >
//                   <GoArrowLeft className="text-2xl sm:text-3xl text-black" />
//                 </button>

//                 <button
//                   className="p-2 text-lg font-semibold text-gray-700 bg-white rounded-full shadow-md sm:text-2xl hover:shadow-lg"
//                   onClick={() => sliderRef.current.slickNext()}
//                 >
//                   <GoArrowRight className="text-2xl sm:text-3xl text-black" />
//                 </button>
//               </div>
//             </div>
//           </div>

//           <Slider {...settings} className="slider-container" ref={sliderRef}>
//             {properties.map((property) => {
//               let distance = null;
//               if (userLocation && property.latitude && property.longitude) {
//                 distance = calculateDistance(
//                   userLocation.latitude,
//                   userLocation.longitude,
//                   parseFloat(property.latitude),
//                   parseFloat(property.longitude),
//                 ).toFixed(1);
//               }

//               const subtitle = (() => {
//                 const area = property.address_area || "";
//                 const city = property.city_name || "";

//                 const location =
//                   area.toLowerCase().includes(city.toLowerCase())
//                     ? area
//                     : `${area}, ${city}`;

//                 const type =
//                   property.property_type === "Office"
//                     ? "Office Space"
//                     : property.property_type === "Retail"
//                       ? "Retail Space"
//                       : property.property_type || "";

//                 const category = property.property_category_type || "";

//                 if (
//                   category === "Commercial Buy" ||
//                   category === "Commercial Lease"
//                 ) {
//                   return `${type} for ${category === "Commercial Buy" ? "Sale" : "Lease"
//                     } in ${location}`;
//                 }

//                 if (
//                   category.includes("PG") ||
//                   category.includes("Co-Living") ||
//                   category.includes("Coliving")
//                 ) {
//                   return `${type} for Rent in ${location}`;
//                 }

//                 const action = category === "Buy" ? "Sale" : category;

//                 return `${property.bhk_type} ${type} for ${action} in ${location}`;
//               })();

//               function getValidImageUrl(img) {
//                 if (typeof img !== "string") return null;
//                 if (img.trim() === "") return null;
//                 return img.startsWith("http") ? img : BASE_URL + img;
//               }

//               const coverImage = getValidImageUrl(property.cover_image);
//               const additionalImages = (property.property_images || [])
//                 .map((imgObj) => getValidImageUrl(imgObj?.image))
//                 .filter(Boolean);
//               const allImages = [
//                 ...(coverImage ? [coverImage] : []),
//                 ...additionalImages,
//               ];

//               return (
//                 <div key={property._id} className="box-border h-full px-1.5 sm:px-2 pb-2">
//                   <div className="flex flex-col h-full overflow-hidden bg-white shadow-md rounded-2xl">
//                     <div className="relative">
//                       <Link
//                         to={`/propertydetails/${property._id}?property_owner_id=${property.user_id}`}
//                         onClick={() =>
//                           window.scrollTo({ top: 0, behavior: "smooth" })
//                         }
//                         className="block overflow-hidden no-underline bg-white border-2 rounded-lg hover:no-underline"
//                       >
//                         {allImages.length > 1 ? (
//                           <Slider
//                             key={`${property._id}-${allImages.length}`}
//                             dots
//                             infinite
//                             speed={500}
//                             slidesToShow={1}
//                             slidesToScroll={1}
//                             arrows
//                             autoplay
//                             autoplaySpeed={2000}
//                             beforeChange={(current, next) =>
//                               setActiveIndexes((prev) => ({
//                                 ...prev,
//                                 [property._id]: next,
//                               }))
//                             }
//                             initialSlide={activeIndexes[property._id] || 0}
//                             customPaging={(i) => {
//                               const activeSlide =
//                                 activeIndexes[property._id] || 0;
//                               const isActive =
//                                 i === activeSlide % allImages.length;
//                               return (
//                                 <div
//                                   style={{
//                                     width: "10px",
//                                     height: "10px",
//                                     borderRadius: "50%",
//                                     background: isActive ? "#fff" : "#888",
//                                     margin: "0 5px",
//                                     cursor: "pointer",
//                                   }}
//                                 />
//                               );
//                             }}
//                             appendDots={(dots) => (
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
//                                 {dots}
//                               </div>
//                             )}
//                             className="rounded-t-2xl"
//                           >
//                             {allImages.map((imgUrl, idx) => (
//                               <div key={`${property._id}-${idx}`}>
//                                 <img
//                                   src={imgUrl}
//                                   alt="Property"
//                                   className="object-cover w-full h-40 sm:h-44 md:h-48 rounded-t-2xl"
//                                 />
//                               </div>
//                             ))}
//                           </Slider>
//                         ) : (
//                           <img
//                             src={allImages[0] || defaultImage}
//                             alt="Property"
//                             className="object-cover w-full h-40 sm:h-44 md:h-48 rounded-t-2xl"
//                           />
//                         )}
//                       </Link>

//                       {/* Virtual Tour & Favorite Button */}
//                       <div className="absolute flex items-center space-x-2 top-2 right-2">
//                         {property.virtual_tour_availability === "Yes" && (
//                           <span className="flex items-center gap-1 px-2 py-1 text-xs font-normal text-white rounded-full bg-gray-800/60 backdrop-blur-sm">
//                             <PiCubeFocus className="text-sm text-white" />
//                             <span className="hidden sm:inline">Virtual Tour</span>
//                           </span>
//                         )}
//                         <button
//                           className="bg-gray-800/60 backdrop-blur-sm p-1.5 rounded-full shadow"
//                           onClick={() => {
//                             if (property.is_favorite) {
//                               removeFromFavoritesRecommendedProperty(
//                                 property.favorite_id,
//                               );
//                             } else {
//                               addToFavoritesRecommendedProperty(property._id);
//                             }
//                           }}
//                         >
//                           <Heart
//                             size={20}
//                             stroke={property.is_favorite ? "none" : "white"}
//                             color={
//                               property.is_favorite
//                                 ? "red"
//                                 : "rgba(75, 85, 99, 0.4) "
//                             }
//                             fill={
//                               property.is_favorite
//                                 ? "red"
//                                 : "rgba(75, 85, 99, 0.4) "
//                             }
//                             strokeWidth={2}
//                           />
//                         </button>
//                       </div>

//                       {/* FOR BUY / RENT / UNKNOWN Tag (Bottom Left) */}
//                       <div className="absolute bottom-0 left-0">
//                         {(() => {
//                           const rawCategory =
//                             property.property_category_type || "";

//                           const normalizedCategory = rawCategory
//                             .replace(/\s+/g, " ")
//                             .replace(/-/g, " ")
//                             .replace(/\//g, " ")
//                             .trim()
//                             .toLowerCase();

//                           let badgeText = "UNKNOWN";
//                           let badgeColor = "bg-[#8B1E3F]";

//                           if (normalizedCategory === "buy") {
//                             badgeText = "FOR BUY";
//                             badgeColor = "bg-[#8B1E3F]";
//                           } else if (normalizedCategory === "rent") {
//                             badgeText = "FOR RENT";
//                             badgeColor = "bg-[#8B1E3F]";
//                           } else if (
//                             normalizedCategory.includes("commercial buy")
//                           ) {
//                             badgeText = "COMMERCIAL BUY";
//                             badgeColor = "bg-[#8B1E3F]";
//                           } else if (
//                             normalizedCategory.includes("commercial lease")
//                           ) {
//                             badgeText = "COMMERCIAL LEASE";
//                             badgeColor = "bg-[#8B1E3F]";
//                           } else if (
//                             normalizedCategory.includes("pg") ||
//                             normalizedCategory.includes("co living") ||
//                             normalizedCategory.includes("coliving")
//                           ) {
//                             badgeText = "PG / CO-LIVING";
//                             badgeColor = "bg-[#8B1E3F]";
//                           } else if (
//                             normalizedCategory.includes("residential")
//                           ) {
//                             badgeText = "RESIDENTIAL";
//                             badgeColor = "bg-[#8B1E3F]";
//                           }

//                           return (
//                             <span
//                               className={`text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-se-lg ${badgeColor}`}
//                             >
//                               {badgeText}
//                             </span>
//                           );
//                         })()}
//                       </div>

//                       {/* FEATURED Tag (Bottom Right) */}
//                       <div className="absolute bottom-0 right-0">
//                         {property.mark_as_featured === "Yes" && (
//                           <span className="px-2 sm:px-3 py-1 text-[10px] sm:text-xs text-white bg-yellow-500 rounded-ss-lg">
//                             FEATURED
//                           </span>
//                         )}
//                       </div>
//                     </div>

//                     {/* Property Details — same design as AdvisorDashboard */}
//                     <div className="flex flex-col flex-1 p-3 text-black bg-white">
//                       <div className="flex items-start justify-between gap-2 sm:gap-3 mb-0">
//                         <h3
//                           className="flex-1 min-w-0 m-0 text-base sm:text-lg font-semibold leading-6 text-gray-900 truncate"
//                           title={property.property_name}
//                         >
//                           {property.property_name || "N/A"}
//                         </h3>
//                         <span
//                           className="flex-shrink-0 m-0 text-xs font-medium leading-6 text-black sm:text-sm whitespace-nowrap"
//                           title={property.furnished_type}
//                         >
//                           {property.furnished_type || "Un-Furnished"}
//                         </span>
//                       </div>

//                       <p
//                         className="mt-0 mb-1 text-xs sm:text-sm leading-5 text-gray-600 truncate"
//                         title={subtitle}
//                       >
//                         {subtitle}
//                       </p>

//                       <div className="flex flex-wrap items-center justify-between gap-y-1 mb-1">
//                         <div className="flex flex-wrap items-center gap-2">
//                           <span className="text-xl sm:text-2xl font-bold">
//                             ₹{" "}
//                             {property.property_category_type === "Rent"
//                               ? formatPrice(property.rent)
//                               : formatPrice(property.property_price)}
//                           </span>
//                           {property.property_category_type === "Rent" && (
//                             <span className="text-xs sm:text-sm text-gray-500">
//                               / {property.rent_duration}
//                             </span>
//                           )}
//                           {property.property_category_type?.includes("Buy") &&
//                             property.possession_status === "Ready To Move" && (
//                               <div className="flex items-center gap-2 px-2 py-1 text-white border rounded-full bg-[#8B1E3F] border-[#8B1E3F] sm:px-3">
//                                 <MdApartment className="text-base text-white" />
//                                 <span className="text-xs font-semibold text-white whitespace-nowrap">
//                                   Ready to Move
//                                 </span>
//                               </div>
//                             )}
//                         </div>
//                         <div className="text-xs sm:text-sm font-medium whitespace-nowrap">
//                           {property.property_category_type?.includes("Buy") &&
//                             property.possession_status !== "Ready To Move" &&
//                             property.possession_date && (
//                               <>
//                                 <span className="text-gray-500">
//                                   Possession:
//                                 </span>
//                                 <span className="ml-1 font-semibold">
//                                   {new Date(
//                                     property.possession_date,
//                                   ).toLocaleDateString("en-IN")}
//                                 </span>
//                               </>
//                             )}
//                         </div>
//                       </div>

//                       <div className="grid grid-cols-3 py-3 border-t border-b border-gray-100">
//                         <div className="flex items-center gap-1 sm:gap-2 px-1 sm:px-3 min-w-0">
//                           <MdApartment className="text-lg sm:text-[22px] text-gray-700 flex-shrink-0" />
//                           <div className="flex flex-col justify-center min-w-0">
//                             <p className="m-0 text-xs sm:text-sm font-semibold leading-4 truncate">
//                               {property.building_type === "Commercial"
//                                 ? property.property_type === "Office"
//                                   ? "Office Space"
//                                   : property.property_type === "Retail"
//                                     ? "Retail Space"
//                                     : property.property_type
//                                 : property.property_category_type?.includes(
//                                   "PG",
//                                 )
//                                   ? `${property.bathroom || 0} Bathrooms`
//                                   : property.bhk_type}
//                             </p>
//                             <p className="m-0 text-[10px] sm:text-xs leading-4 text-gray-500 truncate">
//                               {property.building_type === "Commercial"
//                                 ? "Property Type"
//                                 : property.property_category_type?.includes(
//                                   "PG",
//                                 )
//                                   ? "Bathrooms"
//                                   : property.property_type}
//                             </p>
//                           </div>
//                         </div>

//                         <div className="flex items-center gap-1 sm:gap-2 px-1 sm:px-3 border-l border-gray-200 min-w-0">
//                           {property.property_category_type?.includes("PG") ? (
//                             <FaUser className="text-base sm:text-[20px] text-gray-700 flex-shrink-0" />
//                           ) : (
//                             <FaBath className="text-base sm:text-[20px] text-gray-700 flex-shrink-0" />
//                           )}
//                           <div className="flex flex-col justify-center min-w-0">
//                             <p className="m-0 text-xs sm:text-sm font-semibold leading-4 truncate">
//                               {property.property_category_type?.includes("PG")
//                                 ? property.available_for
//                                 : `${property.bathroom || 0} Baths`}
//                             </p>
//                             <p className="m-0 text-[10px] sm:text-xs leading-4 text-gray-500 truncate">
//                               {property.property_category_type?.includes("PG")
//                                 ? "Available For"
//                                 : "Bathrooms"}
//                             </p>
//                           </div>
//                         </div>

//                         <div className="flex items-center gap-1 sm:gap-2 px-1 sm:px-3 border-l border-gray-200 min-w-0">
//                           <RiRuler2Line className="text-lg sm:text-[22px] text-gray-700 flex-shrink-0" />
//                           <div className="flex flex-col justify-center min-w-0">
//                             <p className="m-0 text-xs sm:text-sm font-semibold leading-4 truncate">
//                               {property.area} {property.area_in}
//                             </p>
//                             <p className="m-0 text-[10px] sm:text-xs leading-4 text-gray-500 truncate">
//                               Built Up Area
//                             </p>
//                           </div>
//                         </div>
//                       </div>

//                       <hr className="my-1 border-gray-100" />

//                       <div className="flex flex-wrap items-center justify-between gap-y-1 pt-1 pb-2 text-[12px] sm:text-[13px] text-gray-600">
//                         <div className="flex items-center flex-wrap min-w-0">
//                           <div className="flex items-center">
//                             <AiOutlineClockCircle className="mr-1 text-[15px] text-gray-700" />
//                             <span className="truncate">
//                               Posted by {property.user_type || "Owner"}
//                             </span>
//                           </div>
//                           <span className="mx-2 text-gray-400">•</span>
//                           <span className="whitespace-nowrap">
//                             {property.days_since_created
//                               ? `${property.days_since_created} days ago`
//                               : "Recently"}
//                           </span>
//                           {distance && (
//                             <>
//                               <span className="mx-2 text-gray-400">•</span>
//                               <div className="flex items-center whitespace-nowrap">
//                                 <FaMapMarkerAlt className="mr-1 text-red-500" />
//                                 {distance} km from you
//                               </div>
//                             </>
//                           )}
//                         </div>
//                         <PiShareNetworkLight
//                           className="ml-2 text-[20px] text-gray-500 cursor-pointer hover:text-blue-500"
//                           onClick={() =>
//                             openShareModal(
//                               `${window.location.origin}/propertydetails/${property._id}`,
//                               property._id,
//                             )

//                           }
//                         />
//                       </div>

//                       <div className="flex flex-wrap items-center justify-between mt-auto pt-3 gap-2">
//                         <div className="flex items-center min-w-0">
//                           <div className="flex items-center justify-center flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 overflow-hidden rounded-full bg-blue-100">
//                             {property.property_owner_image ? (
//                               <img
//                                 src={`${process.env.REACT_APP_API_URL}/media/${property.property_owner_image}`}
//                                 alt="Owner"
//                                 className="object-cover w-full h-full rounded-full"
//                               />
//                             ) : (
//                               <AiOutlineUser className="text-blue-600" size={24} />
//                             )}
//                           </div>
//                           <div className="flex flex-col ml-2 sm:ml-3 min-w-0">
//                             <span
//                               className="text-xs sm:text-sm font-semibold text-gray-900 truncate"
//                               title={property.connect_to_name}
//                             >
//                               {property.connect_to_name || "Owner"}
//                             </span>
//                             <span className="text-[10px] sm:text-xs text-gray-500 truncate">
//                               {property.user_type || "Owner"}
//                             </span>
//                           </div>
//                         </div>

//                         {/* RIGHT SIDE - Buttons */}
//                         <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
//                           {/* Contact */}
//                           <div
//                             className="flex items-center justify-center px-3 sm:px-4 h-8 sm:h-9 text-xs sm:text-sm font-semibold text-white bg-red-800 rounded-md cursor-pointer hover:bg-red-900 whitespace-nowrap"
//                             onClick={() => {
//                               const token =
//                                 sessionStorage.getItem("accessToken");
//                               if (token) {
//                                 if (freeViewCount > 0) {
//                                   handleAddCount(-1);
//                                 } else if (paidViewCount > 0) {
//                                   handleAddCount(-1);
//                                 }
//                                 setIsContactModalOpen(true);
//                               } else {
//                                 setOpenContactModalAfterLogin(true);
//                                 setIsLoginModalOpen(true);
//                               }
//                             }}
//                           >
//                             Contact
//                           </div>

//                           {/* WhatsApp */}
//                           <a
//                             href={`https://wa.me/91${property.connect_to_no}?text=Hello, I am interested in your property`}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             onClick={(e) => e.stopPropagation()}
//                             className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 text-white bg-green-500 rounded-md hover:bg-green-600"
//                           >
//                             <FaWhatsapp />
//                           </a>

//                           {/* Call */}
//                           <a
//                             href={`tel:${property.connect_to_no}`}
//                             onClick={(e) => e.stopPropagation()}
//                             className="flex items-center justify-center w-9 h-9 flex-shrink-0 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
//                           >
//                             <FaPhoneAlt className="text-base" />
//                           </a>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </Slider>
//         </div>
//         {isShareModalOpen && (
//           <ShareModal
//             currentShareUrl={window.location.href}
//             closeShareModal={handleCloseShareModal}
//             copyLink={() => {
//               const url = window.location.href;

//               if (navigator.clipboard && window.isSecureContext) {
//                 navigator.clipboard
//                   .writeText(url)
//                   .then(() => alert("Link copied!"))
//                   .catch((err) => {
//                     console.error(err);
//                     fallbackCopyTextToClipboard(url);
//                   });
//               } else {
//                 fallbackCopyTextToClipboard(url);
//               }

//               function fallbackCopyTextToClipboard(text) {
//                 const textArea = document.createElement("textarea");
//                 textArea.value = text;
//                 textArea.style.position = "fixed";
//                 textArea.style.left = "-9999px";
//                 document.body.appendChild(textArea);
//                 textArea.focus();
//                 textArea.select();

//                 try {
//                   const successful = document.execCommand("copy");
//                   alert(successful ? "Link copied!" : "Copy failed");
//                 } catch (err) {
//                   console.error("Fallback: Could not copy text: ", err);
//                   alert("Copy failed");
//                 }

//                 document.body.removeChild(textArea);
//               }
//             }}
//           />
//         )}

//         {isShareModalOpen && (
//           <div className="absolute right-0 z-50">
//             <ShareModal
//               currentShareUrl={currentShareUrl}
//               closeShareModal={handleCloseShareModal}
//               copyLink={() => {
//                 navigator.clipboard.writeText(currentShareUrl);
//                 alert("Link copied!");
//               }}
//             />
//           </div>
//         )}

//         {/* Modals */}
//         {isLoggedIn ? (
//           <div>Welcome, {contactNumber}</div> // Display logged-in content
//         ) : (
//           <>
//             <Login1
//               isOpen={isLoginModalOpen}
//               onClose={() => setIsLoginModalOpen(false)}
//               onSwitchToSignUp={() => {
//                 setIsLoginModalOpen(false);
//                 setIsSignUpModalOpen(true); // Open sign-up modal
//               }}
//               onLoginSuccess={handleLoginSuccess} // Pass the callback to Login1 component
//             />
//             <SignUp1
//               isOpen={isSignUpModalOpen}
//               onClose={() => setIsSignUpModalOpen(false)}
//               onSwitchToLogin={() => {
//                 setIsSignUpModalOpen(false);
//                 setIsLoginModalOpen(true); // Open login modal
//               }}
//             />
//           </>
//         )}
//         {/* Share Modal */}
//         {isShareModalOpen && (
//           <ShareModal
//             currentShareUrl={window.location.href}
//             closeShareModal={handleCloseShareModal}
//             copyLink={() => {
//               navigator.clipboard.writeText(window.location.href);
//               alert("Link copied!");
//             }}
//           />
//         )}
//       </div>
//     </>
//   );
// };

// export default Detail;


// =======================2 Changes ====================


// import { React, useState, useRef, useEffect } from "react";
// import { FaBed, FaBath, FaRupeeSign } from "react-icons/fa";
// import { ToWords } from "to-words";
// import { MdLocationOn } from "react-icons/md";
// import { FiShare2, FiHeart } from "react-icons/fi";
// import { FaHome } from "react-icons/fa";
// import { IoMdBed } from "react-icons/io";
// import { BiArea } from "react-icons/bi";
// import { MdOutlineLocationOn } from "react-icons/md";
// import { GoArrowLeft, GoArrowRight } from "react-icons/go";
// import { FaHeart } from "react-icons/fa";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { FaUser } from "react-icons/fa";
// import { faVideo } from "@fortawesome/free-solid-svg-icons";
// import { AiOutlineGlobal } from "react-icons/ai";
// import { FaRulerCombined } from "react-icons/fa";
// import { faChair } from "@fortawesome/free-solid-svg-icons";
// import { MdOutlineBedroomParent } from "react-icons/md";
// import { AiOutlineUser, AiOutlineClockCircle } from "react-icons/ai";
// import { BiShapeSquare } from "react-icons/bi";
// import { PiShareNetworkLight } from "react-icons/pi";
// import { FaPhoneAlt } from "react-icons/fa";
// import axios from "axios";
// import {
//   HiOutlineBadgeCheck,
//   HiOutlineCalendar,
//   HiOutlineHome,
//   HiOutlineClock,
// } from "react-icons/hi";
// import { FaMoneyBillWave } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import "../styles/RecommendedProperties.css";
// import "../styles/DetailResponsive.css";
// import { BsHouseDoorFill, BsArrowsFullscreen } from "react-icons/bs";
// import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
// import { useHistory } from "react-router-dom"; // import for routing
// import { PiCubeFocus, PiCricketThin } from "react-icons/pi";
// import { useParams, useLocation } from "react-router-dom";
// import { useCity } from "./SearchContext";
// import { toast } from "react-toastify";
// import { FiUser } from "react-icons/fi";
// import Login1 from "../auth/Login1";
// import SignUp1 from "../auth/SignUp1";
// import GetScheduleVTourproperty from "../containers/GetScheduleVTourproperty";
// import { HiOutlineArrowRight } from "react-icons/hi"; // thinner arrow
// import ShareModal from "../containers/ShareModal";
// import ContactDetails from "../containers/ContactDetails";
// import { Heart, Building2 } from "lucide-react";
// import { RiRuler2Line } from "react-icons/ri";
// import { MdApartment } from "react-icons/md";
// import { FaWhatsapp, FaPhone } from "react-icons/fa";
// import { FaMapMarkerAlt } from "react-icons/fa";

// const defaultImage = "/image/appstore.png";
// const userLocation = JSON.parse(sessionStorage.getItem("userLocation"));
// const formatDateToDDMMYYYY = (dateVal, fallbackDate = null) => {
//   if (!dateVal || dateVal.toString().trim() === "" || dateVal.toString().toLowerCase() === "null") {
//     return dateVal;
//   }

//   let dateObj;
//   if (dateVal.toString().trim().toLowerCase() === "immediately") {
//     dateObj = fallbackDate ? new Date(fallbackDate) : new Date();
//   } else {
//     dateObj = new Date(dateVal);
//   }

//   if (isNaN(dateObj.getTime())) {
//     return dateVal;
//   }

//   const day = String(dateObj.getDate()).padStart(2, "0");
//   const month = String(dateObj.getMonth() + 1).padStart(2, "0");
//   const year = dateObj.getFullYear();
//   return `${day}/${month}/${year}`;
// };

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
// const Detail = ({ propertyData }) => {
//   const toWords = new ToWords({
//     localeCode: "en-IN",
//     converterOptions: {
//       currency: false,
//       ignoreDecimal: true,
//       ignoreZeroCurrency: true,
//     },
//   });
//   // const [showAllImages, setShowAllImages] = useState(false);
//   const [savedProperties, setSavedProperties] = useState([]);
//   const [properties, setProperties] = useState([]);
//   // const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const sliderRef = useRef(null);
//   const overviewRef = useRef(null);
//   const moreDetailsRef = useRef(null);
//   const amenitiesRef = useRef(null);
//   const aboutRef = useRef(null);
//   const locationRef = useRef(null);
//   const statusTimelineRef = useRef(null);
//   const [activeSection, setActiveSection] = useState("overview");
//   const [currentShareUrl1, setcurrentShareUrl1] = useState("");
//   const [propertyDetails, setPropertyDetails] = useState({});
//   const userId = sessionStorage.getItem("accessToken");
//   const history = useHistory();
//   const { searchCity } = useCity();
//   const [currentShareUrl, setCurrentShareUrl] = useState("");
//   const [activeShareId, setActiveShareId] = useState(null);
//   const [tourSchedule, setTourSchedule] = useState([]);

//   const [freeViewCount, setFreeViewCount] = useState(0);
//   const [paidViewCount, setPaidViewCount] = useState(0);

//   const formatArea = (area, unit) => {
//     if (!area) return null;

//     const formattedUnit = unit ? unit.trim().toLowerCase() : "";

//     return `${area} ${formattedUnit}`;
//   };
//   const scrollToSection = (ref, key) => {
//     setActiveSection(key);
//     ref.current?.scrollIntoView({
//       behavior: "smooth",
//       block: "start",
//     });
//   };
//   const checkPostLimits = async () => {
//     try {
//       const profileForm = new FormData();
//       profileForm.append("user_id", userId);

//       const profileResponse = await axios.post(
//         `${process.env.REACT_APP_API_URL}/cust_api/get_profile`,
//         profileForm,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         },
//       );

//       const countData = profileResponse?.data?.count_data;

//       if (countData) {
//         setFreeViewCount(countData.free_view_count || 0);
//         setPaidViewCount(countData.paid_view_count || 0);
//       }
//     } catch (error) {
//       console.error("Error checking post limits:", error);
//     }
//   };

//   useEffect(() => {
//     if (userId) {
//       checkPostLimits();
//     }
//   }, [userId]);

//   const handleAddCount = async (updatedCount) => {
//     try {
//       const addCountFormData = new FormData();
//       if (freeViewCount > 0) {
//         addCountFormData.append("free_view_count", updatedCount);
//       } else {
//         addCountFormData.append("paid_view_count", updatedCount);
//       }
//       addCountFormData.append("user_id", userId);

//       const response = await fetch(
//         `${process.env.REACT_APP_API_URL}/cust_api/add_count`,
//         {
//           method: "POST",
//           body: addCountFormData,
//         },
//       );

//       const data = await response.json();

//       if (response.ok) {
//         checkPostLimits();
//       } else {
//         console.error("Failed to update count:", data.message);
//       }
//     } catch (error) {
//       console.error("API error:", error);
//     }
//   };

//   useEffect(() => {
//     // const userId = sessionStorage.getItem("AccessToken");
//     if (userId) {
//       setIsLoggedIn(true);
//       fetchSavedProperties(userId);
//     } else {
//       setIsLoggedIn(false);
//     }
//   }, []);

//   const fetchSavedProperties = async () => {
//     // const userId = sessionStorage.getItem("AccessToken");
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}/cust_api/get_favorite_properties`,
//         { user_id: userId },
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

//   const fetchRecommendedProperties = async () => {
//     try {
//       const cityName =
//         searchCity && searchCity.trim() !== ""
//           ? searchCity.trim()
//           : sessionStorage.getItem("cityName") || "";
//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}/cust_api/get_featured_property`,
//         {
//           user_id: userId,
//           city_name: cityName,
//         },
//       );
//       if (response.data.status === 1 && Array.isArray(response.data.data)) {
//         setProperties(response.data.data);
//       } else {
//         setProperties([]);
//       }
//     } catch (error) {
//       console.error("Error fetching recommended properties:", error);
//     }
//   };

//   useEffect(() => {
//     fetchRecommendedProperties();
//   }, []);

//   //add to favorite started
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [favoriteId, setFavoriteId] = useState(null); // Store the favorite_id for removal

//   // Check if the property is a favorite on page load or when propertyDetails changes
//   const checkIfFavorite = async (propertyId) => {
//     // const userId = sessionStorage.getItem("accessToken");
//     if (!userId || !propertyId) return;

//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}/cust_api/get_favorite_properties`,
//         { user_id: userId },
//       );

//       const favoriteList = response.data.data || [];
//       const matchedFavorite = favoriteList.find(
//         (fav) => String(fav._id) === String(propertyId),
//       );

//       if (matchedFavorite) {
//         setIsFavorite(true);
//         setFavoriteId(matchedFavorite.favorite_id); // Save favorite_id for removal
//       } else {
//         setIsFavorite(false);
//         setFavoriteId(null);
//       }
//     } catch (error) {
//       console.error("Error checking favorite status:", error);
//     }
//   };

//   useEffect(() => {
//     checkIfFavorite(propertyDetails?._id);
//   }, [propertyDetails?._id]);

//   //  Add to favorites
//   const addToFavorites = async () => {
//     if (!userId) {
//       setIsLoginModalOpen(true);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}/cust_api/add_to_favorite`,
//         {
//           user_id: userId,
//           property_id: propertyDetails._id,
//         },
//       );
//       setIsFavorite(true); // Immediately set isFavorite to true
//       checkIfFavorite(_id); // Save the favorite_id from the response
//       toast.success("Property has been saved to your favorites!");
//       fetchPropertyDetails(_id);
//       fetchRecommendedProperties();
//     } catch (error) {
//       console.error("Error adding property to favorites:", error);
//       toast.error("Failed to save the property. Please try again.");
//     }
//   };

//   // Remove from favorites
//   const removeFromFavorites = async () => {
//     if (!favoriteId) return;

//     try {
//       await axios.delete(
//         `${process.env.REACT_APP_API_URL}/cust_api/remove_from_favorite`,
//         { data: { favorite_id: favoriteId } }, // DELETE request with body
//       );

//       toast.success("Property removed from your favorites.");
//       checkIfFavorite(_id);
//       fetchPropertyDetails(_id);
//       fetchRecommendedProperties();
//     } catch (error) {
//       console.error("Error removing property from favorites:", error);
//       toast.error("Failed to remove the property. Please try again.");
//     }
//   };

//   //  Add to favorites
//   const addToFavoritesRecommendedProperty = async (PropertyId) => {
//     if (!userId) {
//       setIsLoginModalOpen(true);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}/cust_api/add_to_favorite`,
//         {
//           user_id: userId,
//           property_id: PropertyId,
//         },
//       );
//       checkIfFavorite(_id);
//       fetchPropertyDetails(_id);
//       fetchRecommendedProperties();
//     } catch (error) {
//       console.log("Failed to save the property. Please try again.");
//     }
//   };

//   // Remove from favorites
//   const removeFromFavoritesRecommendedProperty = async (FavoriteId) => {
//     try {
//       await axios.delete(
//         `${process.env.REACT_APP_API_URL}/cust_api/remove_from_favorite`,
//         { data: { favorite_id: FavoriteId } },
//       );

//       checkIfFavorite(_id);
//       fetchPropertyDetails(_id);
//       fetchRecommendedProperties();
//     } catch (error) {
//       console.log("Failed to remove the property. Please try again.");
//     }
//   };

//   // Slider settings
//   const [activeIndexes, setActiveIndexes] = useState({});
//   const BASE_URL = process.env.REACT_APP_API_URL;
//   const settings = {
//     infinite: true,
//     slidesToShow: 4,
//     lazyLoad: "ondemand",
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     arrows: false,
//     cssEase: "linear",
//     centerMode: false,
//     centerPadding: "0px",
//     responsive: [
//       {
//         breakpoint: 1399,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 1023,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 767,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };
//   const openShareModal1 = (url) => {
//     setcurrentShareUrl1(url);
//     const modal = document.getElementById("shareModal1");
//     if (modal) {
//       modal.style.display = "block";
//     }
//   };

//   const openShareModal = (url, propertyId) => {
//     setCurrentShareUrl(url);
//     setActiveShareId(propertyId);
//     setIsShareModalOpen(true);
//   };

//   const formatPrice = (price) => {
//     if (price === null || price === undefined || price === "") return "";

//     price = Number(price);

//     if (price >= 10000000) {
//       return (price / 10000000).toFixed(2).replace(/\.?0+$/, "") + " Cr";
//     } else if (price >= 100000) {
//       return (price / 100000).toFixed(2).replace(/\.?0+$/, "") + " L";
//     } else if (price >= 1000) {
//       return (price / 1000).toFixed(2).replace(/\.?0+$/, "") + " K";
//     } else {
//       return price.toString();
//     }
//   };

//   // for the image section with 'get_property_detail' api

//   const { _id } = useParams();
//   const location = useLocation();
//   const property_owner_id = location.state?.property_owner_id;
//   const [aboutPropertyText, setAboutPropertyText] = useState("");

//   const [showAll, setShowAll] = useState(false);
//   const [allAmenities, setAllAmenities] = useState([]);
//   const visibleAmenities = showAll ? allAmenities : allAmenities.slice(0, 8);

//   const [propertyImages, setPropertyImages] = useState([]);
//   const [showAllImages, setShowAllImages] = useState(false);
//   const [longitude, setLongitude] = useState(0);
//   const [latitude, setLatitude] = useState(0);
//   const [userDetails, setuserDetails] = useState({
//     full_name: "",
//     mobile_number: "",
//     email: "",
//   });

//   const user_id = sessionStorage.getItem("accessToken");
//   useEffect(() => {
//     const customer_id = user_id;

//     if (propertyDetails?._id && propertyDetails?.user_id && customer_id) {
//       const formData = new FormData();
//       formData.append("property_id", propertyDetails?._id);
//       formData.append("user_id", propertyDetails?.user_id);
//       formData.append("customer_id", customer_id);

//       axios
//         .post(
//           `${process.env.REACT_APP_API_URL}/cust_api/add_view_property`,
//           formData,
//         )
//         .then((res) => {
//           if (res.data?.status === 1) {
//             console.log("View property recorded");
//           }
//         })
//         .catch((err) => {
//           console.error("Failed to record property view:", err);
//         });
//     }
//   }, [propertyDetails?._id, user_id]);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const fetchPropertyDetails = async (id) => {
//     try {
//       const res = await axios.post(
//         `${process.env.REACT_APP_API_URL}/cust_api/get_property_details`,
//         { property_id: id, user_id: userId },
//       );

//       const data = res.data?.data;
//       console.log("API Response:", data);
//       console.log("Price Onwards:", data.price_onwards);

//       if (data?.property_images?.length > 0) {
//         setPropertyImages(data.property_images);
//       } else {
//         setPropertyImages([]);
//       }

//       if (data?.amenities?.length > 0) {
//         setAllAmenities(data.amenities);
//       } else {
//         setAllAmenities([]);
//       }

//       if (
//         data?.tour_schedule?.length > 0 &&
//         data.tour_schedule[0].status !== "Rejected" &&
//         data.tour_schedule[0].status !== "Expired"
//       ) {
//         setTourSchedule(data.tour_schedule);
//         const dateParts = data.tour_schedule[0].schedule_date.split("-");
//         const year = dateParts[0].slice(-2); // "25"
//         const month = parseInt(dateParts[1], 10) - 1; // month index
//         const day = parseInt(dateParts[2], 10); // 24

//         const monthName = new Date(0, month).toLocaleString("default", {
//           month: "short",
//         });

//         const scheduledLabel = `Scheduled ${day} ${monthName} ${year}`;
//         setScheduledDateLabel(scheduledLabel);
//       } else {
//         setTourSchedule([]);
//         setScheduledDateLabel("Virtual Tour");
//       }

//       if (data?.property_details?.property_description) {
//         setAboutPropertyText(data.property_details.property_description);
//       } else {
//         setAboutPropertyText("");
//       }

//       if (data?.property_details) {
//         setPropertyDetails(data.property_details);
//       } else {
//         setPropertyDetails({});
//       }

//       if (
//         data?.user_details &&
//         Array.isArray(data.user_details) &&
//         data.user_details.length > 0
//       ) {
//         setuserDetails(data.user_details[0]);
//       } else {
//         setuserDetails({
//           full_name: "N/A",
//           mobile_number: "N/A",
//           email: "N/A",
//         });
//         console.warn("user_details is empty or invalid:", data?.user_details);
//       }

//       const pd = data.property_details;
//       setLatitude(pd.latitude);
//       setLongitude(pd.longitude);
//     } catch (err) {
//       console.error("Error fetching property details", err);
//       setPropertyImages([]);
//       setAllAmenities([]);
//       setTourSchedule([]);
//     }
//   };

//   useEffect(() => {
//     fetchPropertyDetails(_id);
//   }, [_id]);

//   // for send Enquiry 'add_property_enquiry' api

//   const [name, setName] = useState("");
//   const [message, setMessage] = useState("");
//   const [contactNumber, setContactNumber] = useState("");
//   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
//   const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [enquiryStatus, setEnquiryStatus] = useState(null); // success or error

//   // Existing useEffect (on mount)
//   useEffect(() => {
//     const mobileNumber = sessionStorage.getItem("Mobile_Number");
//     if (mobileNumber) {
//       setContactNumber(mobileNumber);
//     }
//   }, []);

//   //  New useEffect to check sessionStorage and update contact number after login
//   useEffect(() => {
//     let interval;

//     if (isLoginModalOpen === false && !contactNumber) {
//       interval = setInterval(() => {
//         const mobileNumber = sessionStorage.getItem("Mobile_Number");
//         if (mobileNumber) {
//           setContactNumber(mobileNumber);
//           clearInterval(interval); // Stop checking once we have it
//         }
//       }, 500); // Check every 500ms
//     }

//     return () => clearInterval(interval); // Cleanup
//   }, [isLoginModalOpen, contactNumber]);

//   const userType = sessionStorage.getItem("user_type");
//   // Handle Enquiry Form submission
//   const handleEnquirySubmit = async (e) => {
//     e.preventDefault();

//     const accessToken = sessionStorage.getItem("accessToken");

//     if (!accessToken) {
//       setIsLoginModalOpen(true);
//       return;
//     }

//     const enquiryData = {
//       property_id: propertyDetails?._id,
//       user_id: propertyDetails?.user_id,
//       customer_id: accessToken,
//       name,
//       user_type: userType,
//       contact_number: contactNumber,
//       message,
//     };

//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}/cust_api/add_property_enquiry`,
//         enquiryData,
//       );

//       if (response.data.status) {
//         setEnquiryStatus({
//           type: "success",
//           message: "Enquiry sent successfully!",
//         });
//         setName("");
//         setMessage("");
//       } else {
//         setEnquiryStatus({ type: "error", message: "Failed to send enquiry!" });
//       }
//     } catch (error) {
//       setEnquiryStatus({ type: "error", message: "Something went wrong!" });
//     }
//   };

//   // Trigger login modal on input if not logged in
//   const handleFieldChange = () => {
//     const accessToken = sessionStorage.getItem("accessToken");
//     if (!accessToken) {
//       setIsLoginModalOpen(true);
//     }
//   };

//   const handleLoginSuccess = () => {
//     const mobileNumber = sessionStorage.getItem("Mobile_Number");
//     if (mobileNumber) {
//       setIsLoggedIn(true);
//       setContactNumber(mobileNumber);
//       setIsLoginModalOpen(false);
//     }
//   };

//   // for the schedule virtula tour
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [scheduledDateLabel, setScheduledDateLabel] = useState("Virtual Tour");
//   const [openVirtualTourAfterLogin, setOpenVirtualTourAfterLogin] =
//     useState(false);
//   useEffect(() => {
//     const token = sessionStorage.getItem("accessToken");
//     if (token && openVirtualTourAfterLogin) {
//       setIsModalOpen(true); // Open Virtual Tour
//       setOpenVirtualTourAfterLogin(false); // Reset flag
//     }
//   }, [isLoggedIn]);

//   // for share model
//   const [openShareModalAfterLogin, setOpenShareModalAfterLogin] =
//     useState(false);
//   const [isShareModalOpen, setIsShareModalOpen] = useState(false);
//   useEffect(() => {
//     const token = sessionStorage.getItem("accessToken");
//     if (token && openShareModalAfterLogin) {
//       setIsShareModalOpen(true); // Open Share modal
//       setOpenShareModalAfterLogin(false); // Reset flag
//     }
//   }, [isLoggedIn]);

//   const handleCloseShareModal = () => {
//     setIsShareModalOpen(false);
//   };

//   //for the contact details
//   const [isContactModalOpen, setIsContactModalOpen] = useState(false);
//   const [openContactModalAfterLogin, setOpenContactModalAfterLogin] =
//     useState(false);

//   const userName = sessionStorage.getItem("user_name");
//   const userMobile = sessionStorage.getItem("Mobile_Number");

//   useState(false);
//   useEffect(() => {
//     if (sessionStorage.getItem("accessToken") && openContactModalAfterLogin) {
//       setIsContactModalOpen(true);
//       setOpenContactModalAfterLogin(false);
//     }
//   }, [openContactModalAfterLogin]);

//   // Add this line below all useState declarations or just before return:
//   const overviewFields = [
//     //["Status", propertyDetails?.available_status || null],
//     ["Property Added Date", propertyDetails?.property_added_date || null],
//     ["Property Name", propertyDetails?.property_name || null],
//     // [
//     //   "Address",
//     //   propertyDetails?.address &&
//     //   propertyDetails?.city_name &&
//     //   propertyDetails?.state &&
//     //   propertyDetails?.zip_code
//     //     ? `${propertyDetails.address}, ${propertyDetails.city_name}, ${propertyDetails.state}, ${propertyDetails.zip_code}`
//     //     : null,
//     // ],
//     [
//       "Address",
//       propertyDetails?.address || null,
//     ],
//     [
//       "Area",
//       propertyDetails?.area
//         ? formatArea(propertyDetails.area, propertyDetails.area_in)
//         : null,
//     ],
//     ["Area Type", propertyDetails?.area_type || null],
//     [
//       "Price",
//       propertyDetails?.property_category_type === "Rent"
//         ? propertyDetails?.rent
//           ? `₹${formatPrice(propertyDetails.rent)}`
//           : null
//         : propertyDetails?.property_price
//           ? `₹${formatPrice(propertyDetails.property_price)}`
//           : null,
//     ],
//     [
//       "Deposite",
//       propertyDetails?.custom_deposit_amount
//         ? `₹${formatPrice(propertyDetails.custom_deposit_amount)}`
//         : null,
//     ],
//     ["Listing Type", propertyDetails?.property_category_type || null],
//     // ["Developer", propertyDetails?.developer || null],
//     ["Building Type", propertyDetails?.building_type || null],
//     ["Property Type", propertyDetails?.property_type || null],
//     [
//       "Bhk Type",
//       propertyDetails?.bhk_type === "Studio"
//         ? "Studio/Single Room"
//         : propertyDetails?.bhk_type || null,
//     ],
//     ["Furnishing", propertyDetails?.furnished_type || null],
//     // ["Plot No.", propertyDetails?.plot_no || null],
//     ["Operating Since", propertyDetails?.operating_since || null],
//     [
//       "Available for Company Lease",
//       propertyDetails?.available_for_company_lease || null,
//     ],
//     ["Available For", propertyDetails?.available_for || null],
//     ["Suited For", propertyDetails?.suited_for || null],
//     ["Room Type", propertyDetails?.room_type || null],
//     ["Food Charges Included", propertyDetails?.food_charges_included || null],
//   ].filter(([_, value]) => value);

//   //more details

//   const moreDetailsFields = [
//     ["Food Available", propertyDetails?.food_available || null],
//     ["Notice Period", propertyDetails?.notice_period || null],
//     [
//       "Notice Period Other Days",
//       propertyDetails?.notice_period_other_days || null,
//     ],
//     [
//       "Electricity Charges Included",
//       propertyDetails?.electricity_charges_included || null,
//     ],
//     ["Total Beds", propertyDetails?.total_beds || null],
//     ["Additional Rooms", propertyDetails?.additional_rooms || null],
//     ["PG Rules", propertyDetails?.pg_rules || null],
//     ["Gate Closing Time", propertyDetails?.gate_closing_time || null],
//     ["Gate Closing Hour", propertyDetails?.gate_closing_hour || null],
//     ["PG Services", propertyDetails?.pg_services || null],
//     ["Age of Property", propertyDetails?.age_of_property || null],
//     ["Office Space Type", propertyDetails?.office_space_type || null],
//     ["Pantry", propertyDetails?.pantry || null],
//     ["Personal Washroom", propertyDetails?.personal_washroom || null],
//     ["Bathroom", propertyDetails?.bathroom || null],
//     ["Covered Parking", propertyDetails?.covered_parking || null],
//     ["Uncovered Parking", propertyDetails?.uncovered_parking || null],
//     ["Balcony", propertyDetails?.balcony || null],
//     ["Power Backup", propertyDetails?.power_backup || null],
//     ["Lift Availability", propertyDetails?.lift_availability || null],
//     ["Water Source", propertyDetails?.water_source || null],
//     ["View", propertyDetails?.view || null],
//     ["Flooring", propertyDetails?.flooring || null],
//     ["Total Floor", propertyDetails?.total_floor || null],
//     ["Property Floor", propertyDetails?.property_floor || null],
//     ["Facing", propertyDetails?.facing || null],
//     ["Ceiling Height", propertyDetails?.ceiling_height || null],
//     ["Parking Availability", propertyDetails?.parking_availability || null],
//     ["Min Lockin Period", propertyDetails?.min_lockin_period || null],
//     ["Seat Type", propertyDetails?.seat_type || null],
//     [
//       "Number of Seats Available",
//       propertyDetails?.number_of_seats_available || null,
//     ],
//     ["Plot No.", propertyDetails?.plot_no || null],
//     // ["Loan Availability", propertyDetails?.loan_availability || null],
//     //some other fileds
//     ["RERA ID", propertyDetails?.property_no || null],
//     ["Landmarks", propertyDetails?.landmarks || null],
//     ["Furnishing", propertyDetails?.furnished_type || null],
//     ["Near Landmark", propertyDetails?.near_landmark || null],
//     ["Flat Name", propertyDetails?.flat_name || null],
//     ["Maintenance Frequency", propertyDetails?.maintenance_frequency || null],
//     [
//       "Maintenance Included",
//       propertyDetails?.maintenance_included ? "Yes" : "No",
//     ],
//     ["Security Deposit Type", propertyDetails?.security_deposit_type || null],
//     [
//       "Available for Company Lease",
//       propertyDetails?.available_for_company_lease || null,
//     ],
//     ["Available For", propertyDetails?.available_for || null],
//     ["Suited For", propertyDetails?.suited_for || null],
//     ["Room Type", propertyDetails?.room_type || null],
//     ["Food Charges Included", propertyDetails?.food_charges_included || null],
//     // [
//     //   "Virtual Tour Availability",
//     //   propertyDetails?.virtual_tour_availability || null,
//     // ],
//     ["Property Category Type", propertyDetails?.property_category_type || null],
//     ["Rent", propertyDetails?.rent || null],
//     ["Rent Duration", propertyDetails?.rent_duration || null],
//     ["Property Added Date", propertyDetails?.property_added_date ? formatDateToDDMMYYYY(propertyDetails.property_added_date) : null],
//     ["Possession Status", propertyDetails?.possession_status || null],
//     ["Possession Date", propertyDetails?.possession_date ? formatDateToDDMMYYYY(propertyDetails.possession_date) : null],

//     ["Area Type", propertyDetails?.area_type || null],
//     ["Built up Area", propertyDetails?.area || null],
//     [
//       "Built-up Area Unit",
//       propertyDetails?.area_in ? propertyDetails.area_in.toLowerCase() : null,
//     ],
//     ["Carpet Area", propertyDetails?.carpet_area || null],
//     [
//       "Carpet Area Unit",
//       propertyDetails?.carpet_area_unit
//         ? propertyDetails.carpet_area_unit.toLowerCase()
//         : null,
//     ],
//     ["Available Status", propertyDetails?.available_status || null],
//     ["Investment Options", propertyDetails?.investment_options || null],
//     ["All Inclusive Price", propertyDetails?.all_inclusive_price || null],
//     ["Price Onwards", propertyDetails?.price_onwards || null],
//     ["Price Negotiable", propertyDetails?.price_negotiable || null],
//     [
//       "Tax And Goverment Charges",
//       propertyDetails?.tax_and_goverment_charges || null,
//     ],
//     [
//       "Electricity And Water Charges",
//       propertyDetails?.electricity_and_water_charges || null,
//     ],
//     ["No Of Open Sides", propertyDetails?.no_of_open_sides || null],
//     ["No Of Peoples", propertyDetails?.no_of_peoples || null],
//     ["Type Of Construction", propertyDetails?.type_of_construction || null],
//     ["Quality Rating", propertyDetails?.quality_rating || null],
//     ["Central AC", propertyDetails?.central_AC || null],
//     ["Total Number Parking", propertyDetails?.total_number_parking || null],
//     ["Block", propertyDetails?.block || null],
//     ["Developer", propertyDetails?.developer || null],
//     ["Project Type", propertyDetails?.project_type || null],
//     ["Transaction Type", propertyDetails?.transaction_type || null],
//     ["Builder Floor Type", propertyDetails?.builder_floor_type || null],
//     // ["Attached Bathroom", propertyDetails?.attached_bathroom || null],
//     // ["Attached Balcony", propertyDetails?.attached_balcony || null],
//     // ["Pantry Option", propertyDetails?.pantry_option || null],
//     // ["Parking Types", propertyDetails?.parking_types || null],
//     ["Possession By", propertyDetails?.possession_by || null],
//     [
//       "Property Dimensions Length",
//       propertyDetails?.property_dimensions_length || null,
//     ],
//     [
//       "Property Dimensions Breadth",
//       propertyDetails?.property_dimensions_breadth || null,
//     ],
//     ["Length Of Land", propertyDetails?.length_of_land || null],
//     ["Breadth Of Land", propertyDetails?.breadthOfLand || null],
//     ["Open Sides Of Land", propertyDetails?.openSidesOfLand || null],
//     ["Construction On Land", propertyDetails?.constructionOnLand || null],
//     [
//       "Selected Construction On Land",
//       propertyDetails?.selectedConstructionOnLand || null,
//     ],
//     ["Commercial Washroom", propertyDetails?.commercial_washroom || null],
//     [
//       "Number Of Minimum Bathrooms",
//       propertyDetails?.number_of_minimum_bathrooms || null,
//     ],
//     ["Maintenance Cost", propertyDetails?.maintenance_cost || null],
//     ["Available Beds", propertyDetails?.available_beds || null],
//     [
//       "Available From",
//       propertyDetails?.possession_date || propertyDetails?.available_from
//         ? formatDateToDDMMYYYY(
//           propertyDetails?.possession_date || propertyDetails?.available_from,
//           propertyDetails?.property_added_date
//         )
//         : null,
//     ],
//     ["Available On", propertyDetails?.available_on ? formatDateToDDMMYYYY(propertyDetails.available_on) : null],

//     ["No Of Cabines", propertyDetails?.no_of_cabines || null],
//     ["No Of Meeting Rooms", propertyDetails?.no_of_meeting_Rooms || null],
//     ["No Of Conference Room", propertyDetails?.no_of_conference_room || null],
//     // ["Posted By Admin", propertyDetails?.posted_by_admin || null],
//     // ["UPS", propertyDetails?.ups || null],
//     // ["Oxygen Duct", propertyDetails?.oxygenDuct || null],
//     // ["Central AC", propertyDetails?.central_AC || null],
//     // ["Conference Room", propertyDetails?.conferenceRoom || null],
//     // ["Washroom", propertyDetails?.washroom || null],
//     // ["Washroom Check", propertyDetails?.washroom_Check || null],
//     ["Reception Area", propertyDetails?.reception_area || null],
//     // ["Created At",
//     //   propertyDetails?.created_at
//     //     ? new Date(propertyDetails.created_at).toLocaleDateString("en-GB")
//     //     : null,
//     // ],

//     // ["Updated At",
//     //   propertyDetails?.updated_at
//     //     ? new Date(propertyDetails.updated_at).toLocaleDateString("en-GB")
//     //     : null,
//     // ],
//   ].filter(([_, value]) => value);
//   const statusTimelineItems = [];

//   const addStatusItem = ({
//     icon,
//     title,
//     value,
//     bgColor,
//     iconColor,
//   }) => {
//     if (
//       !value ||
//       value.toString().trim() === "" ||
//       value.toString().toLowerCase() === "n/a" ||
//       value.toString().toLowerCase() === "null"
//     ) {
//       return;
//     }

//     statusTimelineItems.push({
//       icon,
//       title,
//       value,
//       bgColor,
//       iconColor,
//     });
//   };
//   addStatusItem({
//     icon: <HiOutlineBadgeCheck />,
//     title: "Availability",
//     value: propertyDetails?.available_status,
//     bgColor: "bg-green-50",
//     iconColor: "text-green-600",
//   });
//   addStatusItem({
//     icon: <HiOutlineCalendar />,
//     title: "Available From",
//     value: formatDateToDDMMYYYY(
//       propertyDetails?.possession_date || propertyDetails?.available_from,
//       propertyDetails?.property_added_date
//     ),
//     bgColor: "bg-blue-50",
//     iconColor: "text-blue-600",
//   });

//   addStatusItem({
//     icon: <HiOutlineHome />,
//     title: "Possession",
//     value: propertyDetails?.possession_status,
//     bgColor: "bg-orange-50",
//     iconColor: "text-orange-600",
//   });

//   addStatusItem({
//     icon: <HiOutlineClock />,
//     title: "Last Updated",
//     value: propertyDetails?.updated_at
//       ? formatDateToDDMMYYYY(propertyDetails.updated_at)
//       : formatDateToDDMMYYYY(propertyDetails?.property_added_date),
//     bgColor: "bg-purple-50",
//     iconColor: "text-purple-600",
//   });

//   addStatusItem({
//     icon: <HiOutlineClock />,
//     title: "Property Age",
//     value: propertyDetails?.age_of_property,
//     bgColor: "bg-amber-50",
//     iconColor: "text-amber-700",
//   });

//   const handleClick = () => {
//     history.push("/featuredDashboard");
//   };

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   // Prevent background scrolling when modal is open
//   useEffect(() => {
//     if (
//       isShareModalOpen ||
//       isContactModalOpen ||
//       showAllImages ||
//       isModalOpen
//     ) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }

//     // Cleanup when component unmounts
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [isShareModalOpen, isContactModalOpen, showAllImages, isModalOpen]);

//   const getTimeAgo = (dateString) => {
//     if (!dateString) return "";

//     const now = new Date();
//     const created = new Date(dateString);

//     const diffMs = now - created;

//     const minutes = Math.floor(diffMs / (1000 * 60));
//     const hours = Math.floor(diffMs / (1000 * 60 * 60));
//     const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

//     if (minutes < 60) {
//       return `${minutes} min ago`;
//     }

//     if (hours < 24) {
//       return `${hours} hr${hours > 1 ? "s" : ""} ago`;
//     }

//     if (days < 30) {
//       return `${days} day${days > 1 ? "s" : ""} ago`;
//     }

//     const months = Math.floor(days / 30);

//     if (months < 12) {
//       return `${months} month${months > 1 ? "s" : ""} ago`;
//     }

//     const years = Math.floor(months / 12);

//     return `${years} year${years > 1 ? "s" : ""} ago`;
//   };

//   return (
//     <>
//       <div className="max-w-full px-4 mx-auto sm:px-16 detail-page-container">
//         {/* Property Details Section */}
//         <div className="relative w-full h-auto p-2 mb-4 rounded-lg shadow-sm bg-rose-50 detail-header-card">
//           {(propertyDetails?.property_price || propertyDetails?.rent) && (
//             <div className="absolute top-4 right-4 flex flex-col items-end detail-price-block">
//               <p className="flex items-center mt-5 text-3xl font-bold my-text">
//                 <FaRupeeSign className="mr-2" />
//                 {propertyDetails?.property_category_type === "Rent" ||
//                   propertyDetails?.property_category_type === "PG/Co-living" ? (
//                   <>
//                     {formatPrice(propertyDetails?.rent)}{" "}
//                     <span className="ml-1 text-xl text-gray-700">
//                       / {propertyDetails?.rent_duration || "Per Month"}
//                     </span>
//                   </>
//                 ) : (
//                   formatPrice(propertyDetails?.property_price)
//                 )}
//               </p>
//               <p className="mt-1 text-sm font-medium text-gray-500">
//                 {propertyDetails?.property_category_type === "Rent" ||
//                   propertyDetails?.property_category_type === "PG/Co-living"
//                   ? `${toWords.convert(Number(propertyDetails?.rent))} Only`
//                   : `${toWords.convert(Number(propertyDetails?.property_price))} Only`}
//               </p>
//             </div>
//           )}

//           {/* <h2 className="mt-2 ml-6 text-3xl font-normal">
//             {propertyDetails?.bhk_type ? `${propertyDetails.bhk_type} ` : ""}
//             {propertyDetails?.area ? `${propertyDetails.area} Sq-ft ` : ""}
//             {propertyDetails?.property_type
//               ? `${propertyDetails.property_type} `
//               : ""}
//             for {propertyDetails?.property_category_type
//               ? `${propertyDetails.property_category_type}`
//               : ""}
//           </h2> */}

//           <h2 className="mt-2 ml-6 text-3xl font-normal detail-title">
//             {propertyDetails?.property_name
//               ? `${propertyDetails.property_name} `
//               : ""}
//           </h2>

//           <p className="ml-6 text-xl font-bold text-gray-700 break-words whitespace-normal max-w-[80ch] detail-address">
//             <img
//               src="/image/address_icon.png"
//               alt="Address Icon"
//               className="inline-block w-5 h-5 mr-2"
//             />
//             {propertyDetails?.address || "Address N/A"}
//           </p>
//           <div className="flex items-center mt-6 ml-5 space-x-8 detail-info-row">
//             {propertyDetails?.bhk_type && (
//               <div className="flex items-center space-x-2">
//                 <FaBed className="text-2xl my-text" />
//                 <span className="text-lg font-bold">
//                   {propertyDetails.bhk_type}
//                 </span>
//               </div>
//             )}

//             {propertyDetails?.area && (
//               <div className="flex items-center space-x-2">
//                 <FaRulerCombined className="text-2xl my-text" />
//                 <span className="text-lg font-bold">
//                   {formatArea(propertyDetails.area, propertyDetails.area_in)}
//                 </span>
//               </div>
//             )}

//             {propertyDetails?.bathroom && (
//               <div className="flex items-center space-x-2">
//                 <FaBath className="text-2xl my-text" />
//                 <span className="text-lg font-bold">
//                   {propertyDetails.bathroom} Bathroom
//                 </span>
//               </div>
//             )}
//           </div>

//           <div className="flex justify-end mt-6 space-x-4 detail-actions-row">
//             {propertyDetails.virtual_tour_availability === "Yes" && (
//               <button
//                 className={`px-6 py-2 text-lg flex items-center gap-2 w-full sm:w-auto justify-center detail-action-btn
//       ${tourSchedule?.[0]?.status === "Accepted"
//                     ? "bg-green-500 text-white rounded-full"
//                     : scheduledDateLabel === "Virtual Tour"
//                       ? "bg-white border my-text rounded-lg"
//                       : "bg-[#FFD700] text-black rounded-full"
//                   }`}
//                 onClick={() => {
//                   const token = sessionStorage.getItem("accessToken");

//                   if (scheduledDateLabel !== "Virtual Tour") {
//                     history.push({
//                       pathname: "/dashboard",
//                       state: { page: "myVirtualtour" },
//                     });
//                   } else {
//                     if (token) {
//                       setIsModalOpen(true);
//                     } else {
//                       setOpenVirtualTourAfterLogin(true);
//                       setIsLoginModalOpen(true);
//                     }
//                   }
//                 }}
//               >
//                 <PiCubeFocus size={20} />
//                 {scheduledDateLabel}
//                 {scheduledDateLabel !== "Virtual Tour" && (
//                   <HiOutlineArrowRight size={16} />
//                 )}
//               </button>
//             )}

//             {isModalOpen && (
//               <GetScheduleVTourproperty
//                 onClose={() => setIsModalOpen(false)}
//                 propertyDetails={propertyDetails}
//                 setScheduledDateLabel={setScheduledDateLabel}
//                 setIsModalOpen={setIsModalOpen}
//               />
//             )}
//             <div
//               className="w-full px-3 py-1 text-sm text-white my-bg rounded-lg cursor-pointer sm:px-4 sm:py-2 sm:text-lg sm:w-auto detail-action-btn detail-contact-btn"
//               onClick={() => {
//                 const token = sessionStorage.getItem("accessToken");
//                 if (token) {
//                   if (!userDetails) {
//                     // Avoid opening the modal if user data is missing
//                     toast.error("User data not found");
//                     return;
//                   }

//                   if (freeViewCount > 0) {
//                     const updatedCount = -1;
//                     setFreeViewCount(updatedCount);
//                     handleAddCount(updatedCount);
//                   } else if (paidViewCount > 0) {
//                     const updatedCount = -1;
//                     setPaidViewCount(updatedCount);
//                     handleAddCount(updatedCount);
//                   }

//                   setIsContactModalOpen(true);
//                 } else {
//                   setOpenContactModalAfterLogin(true);
//                   setIsLoginModalOpen(true);
//                 }
//               }}
//             >
//               Contact Details
//             </div>
//             {isContactModalOpen &&
//               userDetails &&
//               !Array.isArray(userDetails) &&
//               userDetails.full_name && (
//                 <ContactDetails
//                   onClose={() => setIsContactModalOpen(false)}
//                   fullName={
//                     freeViewCount <= 0 && paidViewCount <= 0
//                       ? `****${userDetails.full_name.slice(-1) || "N/A"}`
//                       : userDetails.full_name || "N/A"
//                   }
//                   mobile={
//                     freeViewCount <= 0 && paidViewCount <= 0
//                       ? `********${userDetails.mobile_number?.slice(-3) || "000"}`
//                       : userDetails.mobile_number || "N/A"
//                   }
//                   userEmail={
//                     freeViewCount <= 0 && paidViewCount <= 0
//                       ? userDetails.email
//                         ? `*******${userDetails.email.slice(-3)}`
//                         : "N/A"
//                       : userDetails.email || "N/A"
//                   }
//                   showUpgradePrompt={freeViewCount <= 0 && paidViewCount <= 0}
//                 />
//               )}
//             <div
//               className="flex items-center justify-center w-10 h-10 bg-white rounded-md cursor-pointer detail-icon-btn"
//               onClick={() => {
//                 if (propertyDetails.is_favorite) {
//                   removeFromFavoritesRecommendedProperty(
//                     propertyDetails.favorite_id,
//                   );
//                 } else {
//                   addToFavoritesRecommendedProperty(propertyDetails._id);
//                 }
//               }}
//             >
//               <FiHeart
//                 className={`text-2xl ${propertyDetails.is_favorite
//                   ? "text-red-600 fill-red-600"
//                   : "text-gray-600"
//                   }`}
//               />
//             </div>

//             <div
//               className="flex items-center justify-center w-8 h-8 bg-white rounded-md cursor-pointer sm:w-10 sm:h-10 detail-icon-btn"
//               onClick={() => {
//                 setIsShareModalOpen(true);
//               }}
//             >
//               <FiShare2 className="text-xl text-gray-600 sm:text-2xl" />
//             </div>
//           </div>
//         </div>

//         {/* Image Section & Contact Form */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-2 h-auto md:h-[550px] detail-main-grid">
//           {/* Left Side Image Section */}
//           <div className="grid grid-cols-1 col-span-2 gap-1 md:grid-cols-1 detail-left-col">
//             {/* Image Section */}
//             <div className="flex flex-col gap-2 mt-6 md:flex-row detail-image-row">
//               {propertyImages.length === 0 ? (
//                 <div className="w-full relative">
//                   <img
//                     src={propertyDetails?.cover_image}
//                     alt="Main"
//                     className="rounded-2xl w-full h-64 md:h-[400px] object-cover detail-cover-image"
//                   />
//                   {/* Watermark */}
//                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                     <span className="text-4xl md:text-3xl font-extrabold text-white rotate-[-30deg] opacity-40 select-none">
//                       ApnaGhar
//                     </span>
//                   </div>
//                 </div>
//               ) : (
//                 <>
//                   {/* Left Side - Main Image */}
//                   <div className="md:basis-[60%]">
//                     <div className="relative">
//                       <img
//                         src={propertyDetails.cover_image}
//                         alt="Main"
//                         className="rounded-2xl w-full h-64 md:h-[400px] object-cover detail-cover-image"
//                       />
//                       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                         <span className="text-4xl md:text-3xl font-extrabold text-white rotate-[-30deg] opacity-40 select-none">
//                           ApnaGhar
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Right Side - Video on Top + One Image Below */}
//                   <div className="md:basis-[40%] flex flex-col justify-start gap-2 px-2">
//                     {/* Property Main Image Section */}
//                     <div
//                       className="relative cursor-pointer"
//                       onClick={() => setShowAllImages(true)}
//                     >
//                       {propertyImages.length > 0 && (
//                         <div className="relative">
//                           <img
//                             src={propertyImages[0].image}
//                             alt="Preview"
//                             className="rounded-2xl w-full h-48 md:h-[195px] object-cover detail-gallery-image"
//                           />
//                           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                             <span className="text-4xl md:text-3xl font-extrabold text-white rotate-[-30deg] opacity-40 select-none">
//                               ApnaGhar
//                             </span>
//                           </div>
//                         </div>
//                       )}
//                     </div>

//                     {/* Property Additional Images Section */}
//                     {propertyImages.length > 1 && (
//                       <div className="grid grid-cols-1 gap-2 mt-2">
//                         {(() => {
//                           const filteredImages = propertyImages.filter(
//                             (img) => img.image !== propertyDetails.cover_image,
//                           );

//                           // Case 1: No images after filtering → Don’t render
//                           if (filteredImages.length === 0) {
//                             return null;
//                           }

//                           // Case 2: Only one image → Don’t render second section
//                           if (filteredImages.length === 1) {
//                             return null;
//                           }

//                           // Case 3: More than one image → Render the 2nd preview + overlay
//                           return (
//                             <div
//                               className="relative cursor-pointer"
//                               onClick={() => setShowAllImages(true)}
//                             >
//                               <div className="relative">
//                                 <img
//                                   src={filteredImages[1]?.image}
//                                   alt="Preview"
//                                   className="rounded-2xl w-full h-48 md:h-[190px] object-cover detail-gallery-image"
//                                 />
//                                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                                   <span className="text-4xl md:text-3xl font-extrabold text-white rotate-[-30deg] opacity-40 select-none">
//                                     ApnaGhar
//                                   </span>
//                                 </div>
//                               </div>
//                               {filteredImages.length > 1 && (
//                                 <div className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-white bg-black bg-opacity-50 rounded-2xl">
//                                   {(() => {
//                                     const count =
//                                       filteredImages.length -
//                                       1 +
//                                       (propertyDetails?.property_video ? 1 : 0);

//                                     return count > 0 ? (
//                                       <div className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-white bg-black bg-opacity-50 rounded-2xl">
//                                         +{count} View All
//                                       </div>
//                                     ) : null;
//                                   })()}
//                                 </div>
//                               )}
//                             </div>
//                           );
//                         })()}
//                       </div>
//                     )}
//                   </div>
//                 </>
//               )}
//             </div>
//             {/* Navigation Tabs */}
//             <div className="sticky top-0 z-20 flex items-center gap-8 px-6 py-4 mb-4 bg-white rounded-lg shadow-sm detail-tabs">
//               <button
//                 onClick={() => scrollToSection(overviewRef, "overview")}
//                 className={`relative font-medium pb-1 detail-tab-btn ${activeSection === "overview"
//                   ? "text-red-600"
//                   : "hover:text-[#8A2432]"
//                   }`}
//               >
//                 Overview
//                 {activeSection === "overview" && (
//                   <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-red-500 rounded-full"></span>
//                 )}
//               </button>

//               <button
//                 onClick={() =>
//                   scrollToSection(statusTimelineRef, "statusTimeline")
//                 }
//                 className={`relative font-medium pb-1 detail-tab-btn ${activeSection === "statusTimeline"
//                   ? "text-red-600"
//                   : "hover:text-[#8A2432]"
//                   }`}
//               >
//                 Status & Timeline
//                 {activeSection === "statusTimeline" && (
//                   <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-red-500 rounded-full"></span>
//                 )}
//               </button>
//               <button
//                 onClick={() => scrollToSection(moreDetailsRef, "moreDetails")}
//                 className={`relative font-medium pb-1 detail-tab-btn ${activeSection === "moreDetails"
//                   ? "text-red-600"
//                   : "hover:text-[#8A2432]"
//                   }`}
//               >
//                 More Details
//                 {activeSection === "moreDetails" && (
//                   <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-red-500 rounded-full"></span>
//                 )}
//               </button>

//               <button
//                 onClick={() => scrollToSection(amenitiesRef, "amenities")}
//                 className={`relative font-medium pb-1 detail-tab-btn ${activeSection === "amenities"
//                   ? "text-red-600"
//                   : "hover:text-[#8A2432]"
//                   }`}
//               >
//                 Amenities
//                 {activeSection === "amenities" && (
//                   <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-red-500 rounded-full"></span>
//                 )}
//               </button>

//               <button
//                 onClick={() => scrollToSection(aboutRef, "about")}
//                 className={`relative font-medium pb-1 detail-tab-btn ${activeSection === "about"
//                   ? "text-red-600"
//                   : "hover:text-[#8A2432]"
//                   }`}
//               >
//                 About Property
//                 {activeSection === "about" && (
//                   <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-red-500 rounded-full"></span>
//                 )}
//               </button>

//               <button
//                 onClick={() => scrollToSection(locationRef, "location")}
//                 className={`relative font-medium pb-1 detail-tab-btn ${activeSection === "location"
//                   ? "text-red-600"
//                   : "hover:text-[#8A2432]"
//                   }`}
//               >
//                 Location
//                 {activeSection === "location" && (
//                   <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-red-500 rounded-full"></span>
//                 )}
//               </button>
//             </div>
//             {/* Add the Overview Component Below */}
//             {overviewFields.length > 0 && (
//               <div
//                 ref={overviewRef}
//                 className="w-full p-4 bg-white rounded-lg shadow-sm scroll-mt-20"
//               >
//                 <h3 className="mb-4 text-3xl font-semibold">Overview</h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-[18px]">
//                   {overviewFields.map(([key, value], index) => (
//                     <div
//                       key={index}
//                       className="flex justify-start p-2 border-gray-200"
//                     >
//                       <span className="w-1/2 text-gray-500">{key}</span>
//                       <span className="text-black">{value}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//             {statusTimelineItems.length > 0 && (
//               <div
//                 ref={statusTimelineRef}
//                 className="w-full p-5 mt-4 bg-white rounded-lg shadow-sm scroll-mt-20"
//               >
//                 <h3 className="mb-5 text-2xl font-semibold text-gray-800">
//                   Status & Timeline
//                 </h3>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {statusTimelineItems.map((item, index) => (
//                     <div
//                       key={index}
//                       className={`flex items-start p-4 rounded-xl border border-gray-200 ${item.bgColor}`}
//                     >
//                       {/* Icon */}
//                       <div
//                         className={`w-10 h-10 rounded-full flex items-center justify-center ${item.bgColor}`}
//                       >
//                         <span className={`text-xl ${item.iconColor}`}>
//                           {item.icon}
//                         </span>
//                       </div>

//                       {/* Content */}
//                       <div className="ml-4 flex-1">
//                         <p className="text-sm text-gray-500">
//                           {item.title}
//                         </p>

//                         <p className="mt-1 text-base font-semibold text-gray-800 break-words">
//                           {item.value}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* More Details Section */}
//             {/* {moreDetailsFields.length > 0 && (
//               <div className="w-full p-4 mt-4 bg-white rounded-lg shadow-sm">
//                 <h3 className="mb-4 ml-2 text-3xl font-semibold">
//                   More Details
//                 </h3>
//                 <table className="min-w-full table-auto text-left text-[16px] text-black ml-2">
//                   <tbody>
//                     {moreDetailsFields.map(([label, value], index) => (
//                       <tr key={index} className="align-top">
//                         <td className="py-1 pr-2 text-gray-500 sm:pr-6 md:pr-12 lg:pr-20 whitespace-nowrap">
//                           {label}:
//                         </td>
//                         <td className="py-1 pl-1 break-words">{value}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )} */}

//             {moreDetailsFields.length > 0 && (
//               <div
//                 ref={moreDetailsRef}
//                 className="w-full p-4 mt-4 bg-white rounded-lg shadow-sm scroll-mt-20"
//               >
//                 <h3 className="mb-4 text-xl font-semibold text-gray-800">
//                   More Details
//                 </h3>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4">
//                   {moreDetailsFields.map(([label, value], index) => (
//                     <div key={index} className="flex flex-col">
//                       <span className="text-xs text-gray-500 uppercase tracking-wide">
//                         {label}
//                       </span>
//                       <span className="text-sm font-semibold text-gray-800 mt-0.5">
//                         {value}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Amenities Section */}
//             <div
//               ref={amenitiesRef}
//               className="w-full p-3 mt-4 bg-white rounded-lg shadow-sm scroll-mt-20"
//             >
//               <h3 className="ml-4 font-semibold text-lm">Amenities</h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 mt-4 ml-4 text-[18px]">
//                 {visibleAmenities.map((amenity, index) => (
//                   <p key={index} className="flex items-center text-lg">
//                     {amenity.icon ? (
//                       <img
//                         src={`${process.env.REACT_APP_API_URL}/media/${amenity.icon}`}
//                         alt={amenity.name}
//                         className="w-10 h-10 mr-2"
//                       />
//                     ) : (
//                       <PiCricketThin className="mr-2 text-lg text-black" />
//                     )}
//                     {amenity.name}
//                   </p>
//                 ))}
//               </div>
//               {!showAll && allAmenities.length > 8 && (
//                 <p
//                   className="mt-2 ml-4 font-bold my-text cursor-pointer "
//                   onClick={() => setShowAll(true)}
//                 >
//                   +{allAmenities.length - 8} More
//                 </p>
//               )}
//             </div>

//             {/* About Property Section */}
//             <div
//               ref={aboutRef}
//               className="bg-white shadow-sm mt-4 rounded-2xl p-3 h-auto md:h-[250px] w-full scroll-mt-20"
//             >
//               <h2 className="justify-center ml-4 font-bold text-gray-700 text-ml">
//                 About property
//               </h2>
//               <p className="mt-3 text-gray-700 justify-center ml-4 text-[18px]">
//                 {aboutPropertyText}
//               </p>
//             </div>

//             {/* Location Section with Map */}
//             <div
//               ref={locationRef}
//               className="bg-white shadow-sm mt-4 rounded-2xl p-3 h-auto md:h-[600px] w-full scroll-mt-20"
//             >
//               <h2 className="ml-4 text-3xl font-bold text-gray-900">
//                 Location
//               </h2>
//               <div className="mt-4 overflow-hidden rounded-lg">
//                 <iframe
//                   className="w-full h-48 md:h-[450px] rounded-2xl"
//                   src={`https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
//                   allowFullScreen
//                   loading="lazy"
//                 ></iframe>
//               </div>
//             </div>
//           </div>
//           {/* Right Side Contact Form with Increased Height */}
//           <div className="sticky top-0 flex flex-col max-h-screen pt-4 overflow-auto detail-enquiry-col">
//             <div className="bg-white shadow-lg rounded-2xl p-4 min-h-[650px] flex flex-col justify-between detail-enquiry-card">
//               <div>
//                 <h3 className="mb-5 text-xl font-semibold">Make an Enquiry</h3>
//                 <div className="flex items-center pb-3 mb-6 space-x-6 border-b-2 border-black detail-agent-row">
//                   <Link
//                     to={`/agentdetail/${userDetails?._id}`}
//                     onClick={() =>
//                       window.scrollTo({ top: 0, behavior: "smooth" })
//                     }
//                     className="block overflow-hidden no-underline shadow-md rounded-2xl hover:no-underline"
//                   >
//                     <img
//                       src={
//                         userDetails?.profile_image
//                           ? userDetails?.profile_image
//                           : "/image/app.png"
//                       }
//                       alt="Agent"
//                       className="object-contain w-16 h-16 rounded-full"
//                     />
//                   </Link>
//                   <div className="flex flex-col items-center">
//                     <span className="text-lg font-semibold">
//                       {userDetails.full_name || "N/A"}
//                     </span>
//                     <span className="text-sm font-semibold">
//                       {userDetails.user_type || "N/A"}
//                     </span>
//                   </div>
//                 </div>

//                 <form onSubmit={handleEnquirySubmit} className="flex flex-col">
//                   <input
//                     type="text"
//                     placeholder="Name"
//                     value={name}
//                     onChange={(e) => {
//                       setName(e.target.value);
//                       handleFieldChange();
//                     }}
//                     className="w-full p-3 mb-4 text-lg border rounded-md outline-none focus:ring-2 focus:ring-rose-500"
//                     required
//                   />
//                   <input
//                     type="text"
//                     placeholder="Phone Number"
//                     value={contactNumber}
//                     readOnly
//                     className="w-full p-3 mb-4 text-lg border rounded-md outline-none focus:ring-2 focus:ring-rose-500"
//                   />

//                   {/* IMPORTANT: TextArea wrapper Div with 'relative' */}
//                   <div className="relative w-full mb-4">
//                     <textarea
//                       placeholder="Message"
//                       value={message}
//                       maxLength={255}
//                       onChange={(e) => {
//                         setMessage(e.target.value);
//                         handleFieldChange();
//                       }}
//                       className="w-full h-28 p-3 pb-7 pr-16 text-base border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-rose-500 resize-none block"
//                       required
//                     ></textarea>
//                     {/* Counter inside the textarea box */}
//                     <span className="absolute bottom-2 right-3 text-xs text-gray-400 pointer-events-none select-none z-10">
//                       {message.length}/255
//                     </span>
//                   </div>

//                   <button
//                     type="submit"
//                     className="w-full mt-2 py-4 text-lg text-white my-bg rounded-lg"
//                   >
//                     Send an Enquiry
//                   </button>
//                 </form>
//               </div>

//               {enquiryStatus && (
//                 <div
//                   className={`text-center mt-4 text-lg ${enquiryStatus.type === "success"
//                     ? "text-green-600"
//                     : "text-red-600"
//                     }`}
//                 >
//                   {enquiryStatus.message}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Modal for Viewing All Images */}
//         {showAllImages && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
//             <div className="bg-white p-6 rounded-lg w-[80%] h-[80%] overflow-auto">
//               <button
//                 className="absolute text-3xl text-white top-4 right-4"
//                 onClick={() => setShowAllImages(false)}
//               >
//                 ×
//               </button>
//               <h2 className="mb-4 text-2xl font-semibold">Gallery</h2>
//               <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
//                 {propertyImages.map((img, index) => (
//                   <div className="relative">
//                     <img
//                       key={index}
//                       src={img.image}
//                       alt={`Room ${index + 1}`}
//                       className="object-cover w-full h-48 rounded-lg"
//                     />
//                     <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                       <span className="text-4xl md:text-3xl font-extrabold text-white rotate-[-30deg] opacity-40 select-none">
//                         ApnaGhar
//                       </span>
//                     </div>
//                   </div>
//                 ))}

//                 {/* Property  Video at the end */}
//                 {propertyDetails?.property_video && (
//                   <video
//                     controls
//                     className="rounded-2xl w-full h-48 md:h-[195px] object-cover"
//                   >
//                     <source
//                       src={propertyDetails.property_video}
//                       type="video/mp4"
//                     />
//                     Your browser does not support the video tag.
//                   </video>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Exclusive Recommended Section — "Top Picks for You" design */}
//         <div className="w-full px-2 py-4 sm:px-6 lg:px-4">
//           <style>{`
//             .er-slider .slick-track { display: flex !important; }
//             .er-slider .slick-slide { height: inherit !important; }
//             .er-slider .slick-slide > div { height: 100%; }
//             @keyframes erPulse {
//               0%, 100% { box-shadow: 0 0 0 0 rgba(214,31,69,0.30); }
//               50%      { box-shadow: 0 0 0 8px rgba(214,31,69,0); }
//             }
//             .er-pulse { animation: erPulse 2.6s ease-out infinite; }
//           `}</style>

//           <div className="relative w-full overflow-hidden bg-white border border-[#F7C3CE] rounded-2xl shadow-[0_0_28px_rgba(214,31,69,0.12)] pb-5">
//             {/* ---------- HEADER ---------- */}
//             <div className="flex flex-col gap-4 px-4 pt-5 mb-3 sm:px-6 md:flex-row md:items-center md:justify-between">
//               <div className="flex items-center gap-3 sm:gap-4">
//                 <span className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full shadow-lg sm:w-14 sm:h-14 bg-gradient-to-br from-[#E8335A] to-[#B91C3C] shadow-[#D61F45]/30 er-pulse">
//                   <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor" aria-hidden="true">
//                     <path d="M2 7l5 4 5-7 5 7 5-4-2 12H4L2 7z" />
//                   </svg>
//                 </span>
//                 <div className="min-w-0">
//                   <h2 className="m-0 text-xl font-extrabold tracking-tight text-[#172033] sm:text-2xl lg:text-3xl">
//                     <span className="text-[#D61F45]">Top Picks</span> for You
//                   </h2>
//                   <p className="m-0 mt-1 text-sm text-[#64748B] sm:text-base">
//                     Handpicked properties based on your preferences
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center w-full gap-3 sm:w-auto md:flex-shrink-0">
//                 <button
//                   type="button"
//                   className="group flex items-center justify-center w-full gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#D61F45] rounded-lg shadow-md shadow-[#D61F45]/25 transition-all duration-300 hover:bg-[#B91C3C] hover:shadow-lg sm:w-auto sm:px-6"
//                   onClick={handleClick}
//                 >
//                   View All Properties
//                   <HiOutlineArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-1" />
//                 </button>

//                 <button
//                   type="button"
//                   aria-label="Previous"
//                   className="hidden sm:flex items-center justify-center flex-shrink-0 rounded-full w-11 h-11 bg-[#FDE8EC] transition-all duration-300 hover:bg-[#F9D3DB] hover:scale-105 active:scale-95"
//                   onClick={() => sliderRef.current?.slickPrev()}
//                 >
//                   <GoArrowLeft className="text-xl text-[#D61F45]" />
//                 </button>

//                 <button
//                   type="button"
//                   aria-label="Next"
//                   className="hidden sm:flex items-center justify-center flex-shrink-0 rounded-full w-11 h-11 bg-[#D61F45] shadow-md shadow-[#D61F45]/30 transition-all duration-300 hover:bg-[#B91C3C] hover:scale-105 active:scale-95"
//                   onClick={() => sliderRef.current?.slickNext()}
//                 >
//                   <GoArrowRight className="text-xl text-white" />
//                 </button>
//               </div>
//             </div>

//             {/* ---------- CAROUSEL ---------- */}
//             <div className="px-2 sm:px-4">
//               <Slider {...settings} className="slider-container er-slider" ref={sliderRef}>
//                 {properties.map((property) => {
//                   let distance = null;
//                   if (userLocation && property.latitude && property.longitude) {
//                     distance = calculateDistance(
//                       userLocation.latitude,
//                       userLocation.longitude,
//                       parseFloat(property.latitude),
//                       parseFloat(property.longitude),
//                     ).toFixed(1);
//                   }

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

//                     if (
//                       category.includes("PG") ||
//                       category.includes("Co-Living") ||
//                       category.includes("Coliving")
//                     ) {
//                       return `${type} for Rent in ${location}`;
//                     }

//                     const action = category === "Buy" ? "Sale" : category;

//                     return `${property.bhk_type} ${type} for ${action} in ${location}`;
//                   })();

//                   const badgeText = (() => {
//                     const normalizedCategory = (property.property_category_type || "")
//                       .replace(/\s+/g, " ")
//                       .replace(/-/g, " ")
//                       .replace(/\//g, " ")
//                       .trim()
//                       .toLowerCase();

//                     if (normalizedCategory === "buy") return "FOR BUY";
//                     if (normalizedCategory === "rent") return "FOR RENT";
//                     if (normalizedCategory.includes("commercial buy")) return "COMMERCIAL BUY";
//                     if (normalizedCategory.includes("commercial lease")) return "COMMERCIAL LEASE";
//                     if (
//                       normalizedCategory.includes("pg") ||
//                       normalizedCategory.includes("co living") ||
//                       normalizedCategory.includes("coliving")
//                     )
//                       return "PG / CO-LIVING";
//                     if (normalizedCategory.includes("residential")) return "RESIDENTIAL";
//                     return "UNKNOWN";
//                   })();

//                   function getValidImageUrl(img) {
//                     if (typeof img !== "string") return null;
//                     if (img.trim() === "") return null;
//                     return img.startsWith("http") ? img : BASE_URL + img;
//                   }

//                   const coverImage = getValidImageUrl(property.cover_image);
//                   const additionalImages = (property.property_images || [])
//                     .map((imgObj) => getValidImageUrl(imgObj?.image))
//                     .filter(Boolean);
//                   const allImages = [
//                     ...(coverImage ? [coverImage] : []),
//                     ...additionalImages,
//                   ];

//                   const isRentLike =
//                     property.property_category_type === "Rent" ||
//                     property.property_category_type === "PG/Co-living";
//                   const isPG = property.property_category_type?.includes("PG");

//                   const phoneDigits = String(property.connect_to_no || "").replace(/\D/g, "");
//                   const phoneIntl =
//                     phoneDigits.length === 10 ? `91${phoneDigits}` : phoneDigits;

//                   return (
//                     <div key={property._id} className="box-border h-full p-2">
//                       <div className="flex flex-col h-full overflow-hidden bg-white border border-[#F1D5DC] rounded-2xl shadow-[0_6px_20px_rgba(214,31,69,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(214,31,69,0.18)]">
//                         {/* ---------- IMAGE ---------- */}
//                         <div className="relative group er-card-img">
//                           <Link
//                             to={`/propertydetails/${property._id}?property_owner_id=${property.user_id}`}
//                             onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//                             className="block overflow-hidden no-underline hover:no-underline"
//                           >
//                             {allImages.length > 1 ? (
//                               <Slider
//                                 key={`${property._id}-${allImages.length}`}
//                                 dots
//                                 infinite
//                                 speed={500}
//                                 slidesToShow={1}
//                                 slidesToScroll={1}
//                                 arrows={false}
//                                 autoplay
//                                 autoplaySpeed={2500}
//                                 beforeChange={(current, next) =>
//                                   setActiveIndexes((prev) => ({
//                                     ...prev,
//                                     [property._id]: next,
//                                   }))
//                                 }
//                                 initialSlide={activeIndexes[property._id] || 0}
//                                 customPaging={(i) => {
//                                   const activeSlide = activeIndexes[property._id] || 0;
//                                   const isActive = i === activeSlide % allImages.length;
//                                   return (
//                                     <div
//                                       style={{
//                                         width: isActive ? "14px" : "6px",
//                                         height: "6px",
//                                         borderRadius: "9999px",
//                                         background: isActive ? "#FFFFFF" : "rgba(255,255,255,0.6)",
//                                         margin: "0 3px",
//                                         cursor: "pointer",
//                                         transition: "all .25s ease",
//                                       }}
//                                     />
//                                   );
//                                 }}
//                                 appendDots={(dots) => (
//                                   <div
//                                     style={{
//                                       position: "absolute",
//                                       bottom: "24px",
//                                       left: "50%",
//                                       transform: "translateX(-50%)",
//                                       display: "flex",
//                                       justifyContent: "center",
//                                       width: "100%",
//                                       zIndex: 20,
//                                     }}
//                                   >
//                                     <ul style={{ display: "flex", margin: 0, padding: 0, listStyle: "none" }}>
//                                       {dots}
//                                     </ul>
//                                   </div>
//                                 )}
//                               >
//                                 {allImages.map((imgUrl, idx) => (
//                                   <div key={`${property._id}-${idx}`}>
//                                     <img
//                                       src={imgUrl}
//                                       alt={property.property_name || "Property"}
//                                       className="object-cover w-full h-[170px] sm:h-[190px] transition-transform duration-500 ease-out group-hover:scale-105"
//                                     />
//                                   </div>
//                                 ))}
//                               </Slider>
//                             ) : (
//                               <img
//                                 src={allImages[0] || defaultImage}
//                                 alt={property.property_name || "Property"}
//                                 className="object-cover w-full h-[170px] sm:h-[190px] transition-transform duration-500 ease-out group-hover:scale-105"
//                               />
//                             )}
//                           </Link>

//                           {/* Soft top gradient so the pills stay readable */}
//                           <div className="absolute inset-x-0 top-0 z-[5] h-20 pointer-events-none bg-gradient-to-b from-black/40 to-transparent" />

//                           {/* Top-left: category pill + virtual tour */}
//                           <div className="absolute z-20 flex flex-wrap items-center gap-1.5 top-3 left-3 max-w-[60%]">
//                             <span className="px-3 py-1 text-[11px] sm:text-xs font-bold tracking-wide text-white uppercase rounded-full shadow-md bg-[#D61F45] truncate">
//                               {badgeText}
//                             </span>
//                             {property.virtual_tour_availability === "Yes" && (
//                               <span className="flex items-center gap-1 px-2 py-1 text-[10px] sm:text-[11px] font-semibold text-white rounded-full shadow-md bg-[#172033]/75 backdrop-blur-sm">
//                                 <PiCubeFocus className="text-xs text-white" />
//                                 <span className="hidden sm:inline">Virtual Tour</span>
//                               </span>
//                             )}
//                           </div>

//                           {/* Top-right: Featured pill + favorite */}
//                           <div className="absolute z-20 flex items-center gap-2 top-3 right-3">
//                             {property.mark_as_featured === "Yes" && (
//                               <span className="px-2.5 py-1 text-[10px] sm:text-[11px] font-bold tracking-wide text-[#172033] uppercase rounded-full shadow-md bg-gradient-to-r from-[#FFD233] to-[#F5B800]">
//                                 Featured
//                               </span>
//                             )}
//                             <button
//                               type="button"
//                               aria-label={property.is_favorite ? "Remove from favorites" : "Add to favorites"}
//                               className="flex items-center justify-center w-8 h-8 transition-transform rounded-full shadow-md bg-[#172033]/75 backdrop-blur-sm hover:scale-110"
//                               onClick={(e) => {
//                                 e.preventDefault();
//                                 e.stopPropagation();
//                                 if (property.is_favorite) {
//                                   removeFromFavoritesRecommendedProperty(property.favorite_id);
//                                 } else {
//                                   addToFavoritesRecommendedProperty(property._id);
//                                 }
//                               }}
//                             >
//                               <Heart
//                                 size={16}
//                                 strokeWidth={2}
//                                 stroke={property.is_favorite ? "#D61F45" : "white"}
//                                 fill={property.is_favorite ? "#D61F45" : "white"}
//                               />
//                             </button>
//                           </div>
//                         </div>

//                         {/* ---------- CONTENT (overlaps the image) ---------- */}
//                         <div className="relative z-10 flex flex-col justify-between flex-1 px-4 pt-3 pb-4 -mt-4 bg-white rounded-t-2xl text-[#172033]">
//                           <div>
//                             <h3
//                               className="m-0 text-base font-bold leading-6 truncate sm:text-[17px] text-[#172033]"
//                               title={property.property_name}
//                             >
//                               {property.property_name || "N/A"}
//                             </h3>

//                             <p
//                               className="m-0 text-[13px] sm:text-sm leading-5 text-[#475569] truncate"
//                               title={subtitle}
//                             >
//                               {subtitle}
//                             </p>

//                             {/* Price row */}
//                             <div className="flex flex-wrap items-center justify-between gap-1 mt-1.5 mb-2">
//                               <div className="flex flex-wrap items-center gap-2">
//                                 <span className="text-xl font-extrabold leading-none sm:text-[22px] text-[#172033]">
//                                   ₹{" "}
//                                   {isRentLike
//                                     ? formatPrice(property.rent)
//                                     : formatPrice(property.property_price)}
//                                 </span>
//                                 {isRentLike && (
//                                   <span className="text-xs text-[#64748B]">
//                                     / {property.rent_duration || "Per Month"}
//                                   </span>
//                                 )}
//                                 {property.property_category_type?.includes("Buy") &&
//                                   property.possession_status === "Ready To Move" && (
//                                     <span className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-white rounded-full bg-[#D61F45] shadow-sm whitespace-nowrap">
//                                       <Building2 size={12} strokeWidth={2.5} />
//                                       Get Best Deal
//                                     </span>
//                                   )}
//                               </div>
//                               <div className="text-xs font-medium whitespace-nowrap">
//                                 {property.property_category_type?.includes("Buy") &&
//                                   property.possession_status !== "Ready To Move" &&
//                                   property.possession_date && (
//                                     <>
//                                       <span className="text-[#64748B]">Possession:</span>
//                                       <span className="ml-1 font-semibold text-[#172033]">
//                                         {new Date(property.possession_date).toLocaleDateString("en-IN")}
//                                       </span>
//                                     </>
//                                   )}
//                               </div>
//                             </div>

//                             {/* Features row */}
//                             <div className="grid grid-cols-3 gap-1 py-2">
//                               <div className="flex items-center min-w-0 gap-1.5">
//                                 <MdApartment className="text-[18px] text-[#172033] flex-shrink-0" />
//                                 <div className="flex flex-col min-w-0">
//                                   <p className="m-0 text-xs font-bold leading-4 truncate text-[#172033]">
//                                     {property.building_type === "Commercial"
//                                       ? property.property_type === "Office"
//                                         ? "Office Space"
//                                         : property.property_type === "Retail"
//                                           ? "Retail Space"
//                                           : property.property_type
//                                       : isPG
//                                         ? `${property.bathroom || 0} Bathrooms`
//                                         : property.bhk_type}
//                                   </p>
//                                   <p className="m-0 text-[10px] leading-4 text-[#64748B] truncate">
//                                     {property.building_type === "Commercial"
//                                       ? "Property Type"
//                                       : isPG
//                                         ? "Bathrooms"
//                                         : property.property_type}
//                                   </p>
//                                 </div>
//                               </div>

//                               <div className="flex items-center min-w-0 gap-1.5">
//                                 {isPG ? (
//                                   <FaUser className="text-[15px] text-[#172033] flex-shrink-0" />
//                                 ) : (
//                                   <FaBath className="text-[15px] text-[#172033] flex-shrink-0" />
//                                 )}
//                                 <div className="flex flex-col min-w-0">
//                                   <p className="m-0 text-xs font-bold leading-4 truncate text-[#172033]">
//                                     {isPG ? property.available_for : `${property.bathroom || 0} Baths`}
//                                   </p>
//                                   <p className="m-0 text-[10px] leading-4 text-[#64748B] truncate">
//                                     {isPG ? "Available For" : "Bathrooms"}
//                                   </p>
//                                 </div>
//                               </div>

//                               <div className="flex items-center min-w-0 gap-1.5">
//                                 <RiRuler2Line className="text-[17px] text-[#172033] flex-shrink-0" />
//                                 <div className="flex flex-col min-w-0">
//                                   <p className="m-0 text-xs font-bold leading-4 truncate text-[#172033]">
//                                     {property.area} {property.area_in}
//                                   </p>
//                                   <p className="m-0 text-[10px] leading-4 text-[#64748B] truncate">
//                                     Built Up Area
//                                   </p>
//                                 </div>
//                               </div>
//                             </div>

//                             {/* Posted by · days · distance · share */}
//                             <div className="flex items-center justify-between gap-2 py-1.5 text-[11px] sm:text-xs text-[#64748B]">
//                               <div className="flex flex-wrap items-center min-w-0 gap-x-1.5">
//                                 <span className="flex items-center min-w-0">
//                                   <AiOutlineClockCircle className="mr-1 text-[13px] flex-shrink-0" />
//                                   <span className="truncate">
//                                     Posted by {property.user_type || "Owner"}
//                                   </span>
//                                 </span>
//                                 <span className="text-[#CBD5E1]">•</span>
//                                 <span className="whitespace-nowrap">
//                                   {property.days_since_created
//                                     ? `${property.days_since_created} days ago`
//                                     : "Recently"}
//                                 </span>
//                                 {distance && (
//                                   <>
//                                     <span className="text-[#CBD5E1]">•</span>
//                                     <span className="flex items-center whitespace-nowrap">
//                                       <FaMapMarkerAlt className="mr-1 text-[#D61F45]" />
//                                       {distance} km from you
//                                     </span>
//                                   </>
//                                 )}
//                               </div>
//                               <PiShareNetworkLight
//                                 title="Share"
//                                 className="flex-shrink-0 text-[16px] text-[#94A3B8] transition-colors cursor-pointer hover:text-[#D61F45]"
//                                 onClick={() =>
//                                   openShareModal(
//                                     `${window.location.origin}/propertydetails/${property._id}`,
//                                     property._id,
//                                   )
//                                 }
//                               />
//                             </div>
//                           </div>

//                           {/* Owner + Contact / WhatsApp / Call */}
//                           <div className="flex items-center justify-between gap-2 pt-3 mt-1 border-t border-[#F1F5F9]">
//                             <div className="flex items-center min-w-0 gap-2">
//                               <div className="flex items-center justify-center flex-shrink-0 overflow-hidden rounded-full shadow w-9 h-9 ring-2 ring-white bg-[#0F2747]/10">
//                                 {property.property_owner_image ? (
//                                   <img
//                                     src={`${process.env.REACT_APP_API_URL}/media/${property.property_owner_image}`}
//                                     alt={property.connect_to_name || "Owner"}
//                                     className="object-cover w-full h-full rounded-full"
//                                   />
//                                 ) : (
//                                   <AiOutlineUser className="text-xl text-[#0F2747]" />
//                                 )}
//                               </div>
//                               <div className="flex flex-col min-w-0 leading-tight">
//                                 <span
//                                   className="text-[13px] font-bold text-[#172033] truncate"
//                                   title={property.connect_to_name}
//                                 >
//                                   {property.connect_to_name || "Owner"}
//                                 </span>
//                                 <span className="text-[11px] text-[#64748B] truncate">
//                                   {property.user_type || "Owner"}
//                                 </span>
//                               </div>
//                             </div>

//                             <div className="flex items-center flex-shrink-0 gap-1.5">
//                               {/* Contact — same view-count + modal flow as before */}
//                               <button
//                                 type="button"
//                                 className="flex items-center justify-center px-4 h-9 text-xs sm:text-[13px] font-semibold text-white rounded-lg bg-[#D61F45] shadow-sm transition-colors hover:bg-[#B91C3C] whitespace-nowrap"
//                                 onClick={() => {
//                                   const token = sessionStorage.getItem("accessToken");
//                                   if (token) {
//                                     if (freeViewCount > 0) {
//                                       handleAddCount(-1);
//                                     } else if (paidViewCount > 0) {
//                                       handleAddCount(-1);
//                                     }
//                                     setIsContactModalOpen(true);
//                                   } else {
//                                     setOpenContactModalAfterLogin(true);
//                                     setIsLoginModalOpen(true);
//                                   }
//                                 }}
//                               >
//                                 Contact
//                               </button>

//                               {/* WhatsApp */}
//                               <a
//                                 href={
//                                   phoneIntl
//                                     ? `https://wa.me/${phoneIntl}?text=${encodeURIComponent(
//                                       `Hello, I am interested in your property ${property.property_name || ""}`,
//                                     )}`
//                                     : undefined
//                                 }
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 aria-label="WhatsApp"
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   if (!phoneIntl) {
//                                     e.preventDefault();
//                                     toast.error("Contact number is not available for this property.");
//                                   }
//                                 }}
//                                 className="flex items-center justify-center rounded-lg shadow-sm w-9 h-9 bg-[#22C55E] transition-colors hover:bg-[#16A34A]"
//                               >
//                                 <FaWhatsapp className="text-lg text-white" />
//                               </a>

//                               {/* Call */}
//                               <a
//                                 href={phoneIntl ? `tel:+${phoneIntl}` : undefined}
//                                 aria-label="Call"
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   if (!phoneIntl) {
//                                     e.preventDefault();
//                                     toast.error("Contact number is not available for this property.");
//                                   }
//                                 }}
//                                 className="flex items-center justify-center rounded-lg shadow-sm w-9 h-9 bg-[#3B82F6] transition-colors hover:bg-[#2563EB]"
//                               >
//                                 <FaPhoneAlt className="text-sm text-white" />
//                               </a>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </Slider>
//             </div>

//             {/* Mobile arrows below the cards */}
//             <div className="flex items-center justify-center gap-4 mt-3 sm:hidden">
//               <button
//                 type="button"
//                 aria-label="Previous"
//                 className="flex items-center justify-center rounded-full w-11 h-11 bg-[#FDE8EC] transition-all duration-300 active:scale-95"
//                 onClick={() => sliderRef.current?.slickPrev()}
//               >
//                 <GoArrowLeft className="text-xl text-[#D61F45]" />
//               </button>
//               <button
//                 type="button"
//                 aria-label="Next"
//                 className="flex items-center justify-center rounded-full w-11 h-11 bg-[#D61F45] shadow-md transition-all duration-300 active:scale-95"
//                 onClick={() => sliderRef.current?.slickNext()}
//               >
//                 <GoArrowRight className="text-xl text-white" />
//               </button>
//             </div>
//           </div>
//         </div>
//         {isShareModalOpen && (
//           <ShareModal
//             currentShareUrl={window.location.href}
//             closeShareModal={handleCloseShareModal}
//             copyLink={() => {
//               const url = window.location.href;

//               if (navigator.clipboard && window.isSecureContext) {
//                 navigator.clipboard
//                   .writeText(url)
//                   .then(() => alert("Link copied!"))
//                   .catch((err) => {
//                     console.error(err);
//                     fallbackCopyTextToClipboard(url);
//                   });
//               } else {
//                 fallbackCopyTextToClipboard(url);
//               }

//               function fallbackCopyTextToClipboard(text) {
//                 const textArea = document.createElement("textarea");
//                 textArea.value = text;
//                 textArea.style.position = "fixed";
//                 textArea.style.left = "-9999px";
//                 document.body.appendChild(textArea);
//                 textArea.focus();
//                 textArea.select();

//                 try {
//                   const successful = document.execCommand("copy");
//                   alert(successful ? "Link copied!" : "Copy failed");
//                 } catch (err) {
//                   console.error("Fallback: Could not copy text: ", err);
//                   alert("Copy failed");
//                 }

//                 document.body.removeChild(textArea);
//               }
//             }}
//           />
//         )}

//         {isShareModalOpen && (
//           <div className="absolute right-0 z-50">
//             <ShareModal
//               currentShareUrl={currentShareUrl}
//               closeShareModal={handleCloseShareModal}
//               copyLink={() => {
//                 navigator.clipboard.writeText(currentShareUrl);
//                 alert("Link copied!");
//               }}
//             />
//           </div>
//         )}

//         {/* Modals */}
//         {isLoggedIn ? (
//           <div>Welcome, {contactNumber}</div> // Display logged-in content
//         ) : (
//           <>
//             <Login1
//               isOpen={isLoginModalOpen}
//               onClose={() => setIsLoginModalOpen(false)}
//               onSwitchToSignUp={() => {
//                 setIsLoginModalOpen(false);
//                 setIsSignUpModalOpen(true); // Open sign-up modal
//               }}
//               onLoginSuccess={handleLoginSuccess} // Pass the callback to Login1 component
//             />
//             <SignUp1
//               isOpen={isSignUpModalOpen}
//               onClose={() => setIsSignUpModalOpen(false)}
//               onSwitchToLogin={() => {
//                 setIsSignUpModalOpen(false);
//                 setIsLoginModalOpen(true); // Open login modal
//               }}
//             />
//           </>
//         )}
//         {/* Share Modal */}
//         {isShareModalOpen && (
//           <ShareModal
//             currentShareUrl={window.location.href}
//             closeShareModal={handleCloseShareModal}
//             copyLink={() => {
//               navigator.clipboard.writeText(window.location.href);
//               alert("Link copied!");
//             }}
//           />
//         )}
//       </div>
//     </>
//   );
// };

// export default Detail;



import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import {
  House,
  Crown,
  MapPin,
  Bed,
  ArrowsOut,
  Bathtub,
  VideoCamera,
  Phone,
  Heart,
  ShareNetwork,
  CaretLeft,
  CaretRight,
  CaretDown,
  Images,
  ChatCircleText,
  User,
  PaperPlaneTilt,
  CalendarBlank,
  Info,
  ListBullets,
  SquaresFour,
  Diamond,
  FileText,
  ClipboardText,
  Clock,
  CheckCircle,
  Hourglass,
  Tag,
  CurrencyInr,
  Buildings,
  Armchair,
  Car,
  Stack,
  Compass,
  Lightning,
  Drop,
  ForkKnife,
  Key,
  SealCheck,
  Users,
  Receipt,
  Star,
  Snowflake,
  HardHat,
  CornersOut,
  Hash,
  ListChecks,
  Sparkle,
  ChartLineUp,
  Wrench,
  ShieldCheck,
  UserCircle,
  ArrowLeft,
  ArrowRight,
  X,
  ArrowSquareOut,
  ArrowsDownUp,
  Sun,
  Timer,
  MapTrifold,
  Train,
  Bus,
  Hospital,
  GraduationCap,
  NavigationArrow,
  ArrowClockwise,
  WarningCircle,
  MapPinLine,
  Desktop,
  ShoppingBag,
  Storefront,
} from "@phosphor-icons/react";
import { FaBath } from "react-icons/fa";
import { ToWords } from "to-words";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { FaUser } from "react-icons/fa";
import { AiOutlineUser, AiOutlineClockCircle } from "react-icons/ai";
import { PiShareNetworkLight } from "react-icons/pi";
import { FaPhoneAlt } from "react-icons/fa";
import axios from "axios";
import * as GoogleMapsApi from "@react-google-maps/api";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/RecommendedProperties.css";
import "../styles/DetailResponsive.css";
import { useHistory } from "react-router-dom"; // import for routing
import { PiCubeFocus } from "react-icons/pi";
import { useParams, useLocation } from "react-router-dom";
import { useCity } from "./SearchContext";
import { toast } from "react-toastify";
import Login1 from "../auth/Login1";
import SignUp1 from "../auth/SignUp1";
import GetScheduleVTourproperty from "../containers/GetScheduleVTourproperty";
import { HiOutlineArrowRight } from "react-icons/hi"; // thinner arrow
import ShareModal from "../containers/ShareModal";
import ContactDetails from "../containers/ContactDetails";
import { Building2 } from "lucide-react";
import { RiRuler2Line } from "react-icons/ri";
import { MdApartment } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";

const defaultImage = "/image/appstore.png";
const formatDateToDDMMYYYY = (dateVal, fallbackDate = null) => {
  if (!dateVal || dateVal.toString().trim() === "" || dateVal.toString().toLowerCase() === "null") {
    return dateVal;
  }

  let dateObj;
  if (dateVal.toString().trim().toLowerCase() === "immediately") {
    dateObj = fallbackDate ? new Date(fallbackDate) : new Date();
  } else {
    dateObj = new Date(dateVal);
  }

  if (isNaN(dateObj.getTime())) {
    return dateVal;
  }

  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
};

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

// FIX: read the saved location when the page renders (it used to be read
// once when the file loaded, so a location saved after login was ignored).
const readUserLocation = () => {
  try {
    return JSON.parse(sessionStorage.getItem("userLocation"));
  } catch {
    return null;
  }
};

// Height of the fixed HorizontalNav (it carries data-fixed-header), so the
// sticky tabs / enquiry card sit just below it instead of under it.
const useFixedHeaderHeight = () => {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const el = document.querySelector("[data-fixed-header]");
    if (!el) return undefined;
    const update = () => setHeight(el.offsetHeight);
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
  return height;
};

// Pick an icon for a detail row from words in its label.
const LABEL_ICONS = [
  [/date|updated|available on|available from/i, CalendarBlank],
  [/address|landmark|location/i, MapPin],
  [/name/i, Tag],
  [/dimension|length|breadth|open sides/i, CornersOut],
  [/area/i, ArrowsOut],
  [/tax/i, Receipt],
  [/electricity|power/i, Lightning],
  [/water/i, Drop],
  [/maintenance/i, Wrench],
  [/price|rent|deposit|charges|cost/i, CurrencyInr],
  [/listing|category|transaction/i, ListBullets],
  [/building/i, Buildings],
  [/bhk|room type|beds/i, Bed],
  [/furnish|reception/i, Armchair],
  [/bath|washroom/i, Bathtub],
  [/parking/i, Car],
  [/balcony|view/i, Sun],
  [/lift/i, ArrowsDownUp],
  [/floor|block/i, Stack],
  [/facing/i, Compass],
  [/pantry|food/i, ForkKnife],
  [/possession/i, Key],
  [/available status|status/i, CheckCircle],
  [/rera/i, SealCheck],
  [/age/i, Hourglass],
  [/seat|people|cabine|meeting|conference/i, Users],
  [/notice|lockin|gate/i, Timer],
  [/rating/i, Star],
  [/ac\b|central ac/i, Snowflake],
  [/construction|developer|builder/i, HardHat],
  [/plot|flat|no\./i, Hash],
  [/rules/i, ListChecks],
  [/services|additional/i, Sparkle],
  [/investment/i, ChartLineUp],
  [/security/i, ShieldCheck],
  [/lease|suited|available for/i, UserCircle],
  [/type/i, House],
];
const iconForLabel = (label) =>
  (LABEL_ICONS.find(([re]) => re.test(label)) || [null, Info])[1];

// White section card with a two-tone title ("More Details").
const SectionCard = ({ sectionRef, scrollMargin, icon: Icon, first, accent, subtitle, right, children }) => (
  <section
    ref={sectionRef}
    style={{ scrollMarginTop: scrollMargin }}
    className="relative w-full p-4 mt-5 overflow-hidden bg-white border border-[#FDE8EC] md:p-6 rounded-3xl shadow-[0_10px_30px_rgba(214,31,69,0.06)]"
  >
    <div
      aria-hidden="true"
      className="absolute top-0 right-0 hidden w-72 h-24 pointer-events-none md:block bg-gradient-to-l from-[#FDE8EC] to-transparent opacity-70"
    />
    <div className="relative flex items-center gap-4 mb-5">
      <span className="flex items-center justify-center flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#FDE8EC] text-[#D61F45]">
        <Icon size={26} weight="fill" />
      </span>
      <div className="flex-1 min-w-0">
        <h3 className="m-0 text-xl font-bold md:text-2xl text-[#17253a]">
          {first} {accent && <span className="text-[#D61F45]">{accent}</span>}
        </h3>
        {subtitle && <p className="m-0 mt-0.5 text-[13px] md:text-[14px] text-gray-500">{subtitle}</p>}
      </div>
      {right}
    </div>
    <div className="relative">{children}</div>
  </section>
);

// Faint "ApnaGhar" watermark over property photos (same as before).
const Watermark = ({ size = "text-3xl" }) => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <span className={`${size} font-extrabold text-white rotate-[-30deg] opacity-40 select-none`}>
      ApnaGhar
    </span>
  </div>
);

// ==================================================================
// Nearby Connectivity — Property Details page
// ------------------------------------------------------------------
// Tabs       : 1) Metro + Bus Stops
//              2) Schools + Hospitals
//              3) IT Parks + Malls + Markets
// Data       : Google Places with the project's key (7 searches at the same
//              time, each list shown as soon as it arrives). Anything Google
//              can't answer comes from OpenStreetMap (one request for all).
//              Real places only — nothing is invented or hard-coded.
// Speed      : results are cached in the browser for 6 h per location and
//              shown instantly on the next visit (refreshed quietly after
//              30 min); map servers are asked one after another (first good
//              answer wins); the same request is never sent twice at once
//              and is cancelled when the page closes.
// Distances  : straight-line from the property (labelled as such).
// Map        : Google Maps (@react-google-maps/api, same key as the other pages).
// ==================================================================

const nearbyIsDev = process.env.NODE_ENV !== "production";
const NEARBY_VERSION = "nearby-v7";

const NEARBY_CACHE_PREFIX = "apnaghar:nearby:v6:";
const NEARBY_FRESH_MS = 30 * 60 * 1000; // younger than this: no refresh
const NEARBY_MAX_AGE_MS = 6 * 60 * 60 * 1000; // older than this: not shown
const NEARBY_MIRROR_TIMEOUT_MS = 18000;
const NEARBY_HEDGE_DELAY_MS = 5000;
const NEARBY_OVERPASS_URLS = [
  "https://overpass-api.de/api/interpreter",
  "https://maps.mail.ru/osm/tools/overpass/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
  "https://overpass.private.coffee/api/interpreter",
];

// Every list: search radius (m), max results, directions mode, and how close
// two entries with the same name must be to count as one place.
const NEARBY_CATEGORIES = {
  metroStations: { label: "Metro Stations", noun: "metro station", icon: Train, radius: 5000, limit: 8, mode: "transit", dedupe: 400 },
  busStops: { label: "Bus Stops", noun: "bus stop", icon: Bus, radius: 1500, limit: 8, mode: "walking", dedupe: 100 },
  schools: { label: "Schools", noun: "school", icon: GraduationCap, radius: 3000, limit: 8, mode: "driving", dedupe: 150 },
  hospitals: { label: "Hospitals", noun: "hospital", icon: Hospital, radius: 5000, limit: 8, mode: "driving", dedupe: 200 },
  itParks: { label: "IT Parks", noun: "IT park", icon: Desktop, radius: 10000, limit: 6, mode: "driving", dedupe: 500 },
  malls: { label: "Malls", noun: "mall", icon: ShoppingBag, radius: 7000, limit: 6, mode: "driving", dedupe: 300 },
  markets: { label: "Markets", noun: "market", icon: Storefront, radius: 3000, limit: 8, mode: "walking", dedupe: 150 },
};
const NEARBY_CATEGORY_KEYS = Object.keys(NEARBY_CATEGORIES);

// The three tabs.
const NEARBY_GROUPS = [
  { key: "transit", label: "Metro + Bus Stops", icon: Train, subs: ["metroStations", "busStops"] },
  { key: "education", label: "Schools + Hospitals", icon: GraduationCap, subs: ["schools", "hospitals"] },
  { key: "lifestyle", label: "IT Parks + Malls + Markets", icon: Storefront, subs: ["itParks", "malls", "markets"] },
];

/* ---------------- Helpers ---------------- */

const nearbyToCoords = (lat, lon) => {
  const a = parseFloat(lat);
  const b = parseFloat(lon);
  if (!Number.isFinite(a) || !Number.isFinite(b)) return null;
  if (a < -90 || a > 90 || b < -180 || b > 180 || (a === 0 && b === 0)) return null;
  return [a, b];
};

const nearbyHaversine = (lat1, lon1, lat2, lon2) => {
  const R = 6371008.8;
  const toRad = (d) => (d * Math.PI) / 180;
  const h =
    Math.sin(toRad(lat2 - lat1) / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(toRad(lon2 - lon1) / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
};

const nearbyFormatDistance = (m) => {
  if (m >= 10000) return `${Math.round(m / 1000)} km`;
  const rounded = Math.max(10, Math.round(m / 10) * 10);
  return rounded < 1000 ? `${rounded} m` : `${(m / 1000).toFixed(1)} km`;
};

const nearbyKmText = (m) => {
  const n = Number(m);
  if (!Number.isFinite(n) || n <= 0) return "";
  return n >= 1000 ? `${Number.isInteger(n / 1000) ? n / 1000 : (n / 1000).toFixed(1)} km` : `${n} m`;
};

const nearbyIsAbort = (err) => err?.name === "AbortError" || err?.name === "CanceledError" || err?.code === "ERR_CANCELED";

/* ---------------- Browser cache (memory + localStorage, safe) ---------------- */

const nearbyMemory = new Map();

const nearbyCacheRead = (key) => {
  let entry = nearbyMemory.get(key);
  if (!entry) {
    try {
      const raw = localStorage.getItem(NEARBY_CACHE_PREFIX + key);
      if (raw) entry = JSON.parse(raw);
    } catch (e) {
      entry = null;
    }
  }
  if (!entry || !entry.data || typeof entry.t !== "number") return null;
  const age = Date.now() - entry.t;
  if (age > NEARBY_MAX_AGE_MS) {
    nearbyMemory.delete(key);
    try {
      localStorage.removeItem(NEARBY_CACHE_PREFIX + key);
    } catch (e) {
      /* ignore */
    }
    return null;
  }
  nearbyMemory.set(key, entry);
  return { data: entry.data, age };
};

const nearbyCacheWrite = (key, data) => {
  const entry = { t: Date.now(), data };
  nearbyMemory.set(key, entry);
  try {
    localStorage.setItem(NEARBY_CACHE_PREFIX + key, JSON.stringify(entry));
  } catch (e) {
    /* storage full or blocked — memory cache still works */
  }
};

/* ---------------- OpenStreetMap (Overpass) ---------------- */

// Ask the first map server; if it is slow or fails, also ask the next one.
const nearbyRunOverpass = (query, signal) =>
  new Promise((resolve, reject) => {
    const body = `data=${encodeURIComponent(query)}`;
    const controllers = [];
    const timers = [];
    let settled = false;
    let failed = 0;
    let next = 0;
    const finish = (fn, value) => {
      if (settled) return;
      settled = true;
      timers.forEach(clearTimeout);
      controllers.forEach((c) => c.abort());
      fn(value);
    };
    if (signal) {
      if (signal.aborted) return finish(reject, Object.assign(new Error("aborted"), { name: "AbortError" }));
      signal.addEventListener("abort", () => finish(reject, Object.assign(new Error("aborted"), { name: "AbortError" })), {
        once: true,
      });
    }
    const startNext = () => {
      if (settled || next >= NEARBY_OVERPASS_URLS.length) return;
      const url = NEARBY_OVERPASS_URLS[next++];
      const ctrl = new AbortController();
      controllers.push(ctrl);
      const kill = setTimeout(() => ctrl.abort(), NEARBY_MIRROR_TIMEOUT_MS);
      timers.push(kill);
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
        signal: ctrl.signal,
      })
        .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
        .then((json) => {
          const remark = String(json?.remark || "").toLowerCase();
          if (!Array.isArray(json?.elements) || remark.includes("runtime error")) throw new Error("Bad response");
          finish(resolve, json.elements);
        })
        .catch(() => {
          clearTimeout(kill);
          if (settled) return;
          failed += 1;
          if (failed >= NEARBY_OVERPASS_URLS.length) finish(reject, new Error("Map data unavailable"));
          else startNext(); // this server failed fast: try the next one now
        });
      timers.push(setTimeout(startNext, NEARBY_HEDGE_DELAY_MS));
    };
    startNext();
  });

// Names used by IT parks / tech parks / business parks in OpenStreetMap.
const NEARBY_IT_NAME_OSM =
  "IT Park|I\\.T\\. Park|Tech Park|Technology Park|Techpark|Tech Hub|Tech City|Software Park|Software Technology|" +
  "Infotech|Info Park|Infopark|Cyber City|Cyber Park|Cybercity|Knowledge Park|Business Park|IT SEZ|IT Hub|IT City|Tech Centre|Tech Center";
const NEARBY_IT_NAME_RE =
  /\b(i\.?t\.?|tech|technology|techno|software|info|infotech|cyber|knowledge|business)\s*(park|parks|city|hub|sez|campus|centre|center|tower|towers)\b|\b(techpark|infopark|cybercity|infotech)\b|\bit\s*sez\b/i;

const nearbyBuildQuery = ([lat, lon]) => {
  const at = (key) => `(around:${NEARBY_CATEGORIES[key].radius},${lat.toFixed(6)},${lon.toFixed(6)})`;
  const it = `["name"~"${NEARBY_IT_NAME_OSM}",i]`;
  return (
    `[out:json][timeout:20];(` +
    // Metro (ordinary railway stations are filtered out by their tags)
    `nwr["railway"~"^(station|halt)$"]${at("metroStations")};` +
    `nwr["public_transport"="station"]["subway"="yes"]${at("metroStations")};` +
    `nwr["public_transport"="station"]["light_rail"="yes"]${at("metroStations")};` +
    // Bus
    `node["highway"="bus_stop"]${at("busStops")};` +
    `nwr["amenity"="bus_station"]${at("busStops")};` +
    // Schools & hospitals
    `nwr["amenity"="school"]${at("schools")};` +
    `nwr["amenity"="hospital"]${at("hospitals")};` +
    `nwr["healthcare"="hospital"]${at("hospitals")};` +
    // IT parks
    `nwr["landuse"~"^(commercial|industrial)$"]${it}${at("itParks")};` +
    // Malls & markets
    `nwr["shop"="mall"]${at("malls")};` +
    `nwr["amenity"="marketplace"]${at("markets")};` +
    `);out center tags;`
  );
};

const NEARBY_METRO_MODES = ["subway", "light_rail", "monorail"];

const nearbyNameOf = (tags) => String(tags["name:en"] || tags.name || tags.official_name || "").trim().slice(0, 120);

// Which list a place belongs to (or null).
const nearbyClassify = (rawTags = {}) => {
  const t = {};
  Object.keys(rawTags).forEach((k) => (t[k] = String(rawTags[k]).trim().toLowerCase()));
  if (t.disused === "yes" || t.abandoned === "yes" || "railway:preserved" in t || "disused:railway" in t || "disused:amenity" in t)
    return null;

  if (t.amenity === "hospital" || t.healthcare === "hospital") return "hospitals";
  if (t.amenity === "school") return "schools";
  if (t.shop === "mall") return "malls";
  if (t.amenity === "marketplace") return "markets";

  const railway = t.railway || "";
  const isRail =
    railway === "station" ||
    railway === "halt" ||
    (t.public_transport === "station" && [...NEARBY_METRO_MODES, "train"].some((m) => t[m] === "yes"));
  if (isRail) {
    if (["funicular", "miniature", "tram"].includes(t.station) || t.usage === "tourism") return null;
    const text = ["network", "operator", "name", "name:en"].map((k) => t[k] || "").join(" ");
    const metro = NEARBY_METRO_MODES.includes(t.station) || NEARBY_METRO_MODES.some((m) => t[m] === "yes") || text.includes("metro");
    return metro ? "metroStations" : null; // ordinary railway stations are not listed
  }
  if (t.highway === "bus_stop" || t.amenity === "bus_station") return "busStops";

  const itPlace = ["commercial", "industrial"].includes(t.landuse);
  if (itPlace && NEARBY_IT_NAME_RE.test(`${rawTags.name || ""} ${rawTags["name:en"] || ""}`)) return "itParks";
  return null;
};

const nearbyNormalizeName = (name) =>
  String(name || "")
    .toLowerCase()
    .replace(
      /\b(metro station|metro|station|bus stop|bus stand|bus depot|stop|hospital|school|mall|market|park|road|rd|marg)\b/g,
      " ",
    )
    .replace(/[^a-z0-9]+/g, "") || String(name || "").toLowerCase();

const nearbyParse = (elements, origin) => {
  const out = Object.fromEntries(NEARBY_CATEGORY_KEYS.map((k) => [k, []]));
  const seen = new Set();
  (elements || []).forEach((el) => {
    if (!el || typeof el !== "object") return;
    const uid = `${el.type}/${el.id}`;
    if (seen.has(uid)) return;
    seen.add(uid);
    const tags = el.tags && typeof el.tags === "object" ? el.tags : {};
    const cat = nearbyClassify(tags);
    if (!cat) return;
    const name = nearbyNameOf(tags);
    const c = nearbyToCoords(el.lat ?? el.center?.lat, el.lon ?? el.center?.lon);
    if (!name || !c) return;
    const d = nearbyHaversine(origin[0], origin[1], c[0], c[1]);
    if (d > NEARBY_CATEGORIES[cat].radius) return;
    const locality =
      String(tags["addr:full"] || "").trim() ||
      ["addr:street", "addr:suburb", "addr:neighbourhood", "addr:city"]
        .map((k) => String(tags[k] || "").trim())
        .filter((v, i, arr) => v && arr.indexOf(v) === i)
        .join(", ") ||
      null;
    let details = null;
    if (cat === "hospitals" && String(tags.emergency || "").toLowerCase() === "yes") details = "24x7 Emergency";
    out[cat].push({
      id: uid,
      name,
      latitude: c[0],
      longitude: c[1],
      locality,
      details,
      distanceMeters: Math.round(d),
      distanceText: nearbyFormatDistance(d),
      directionsUrl:
        `https://www.google.com/maps/dir/?api=1&origin=${origin[0].toFixed(6)},${origin[1].toFixed(6)}` +
        `&destination=${c[0].toFixed(6)},${c[1].toFixed(6)}&travelmode=${NEARBY_CATEGORIES[cat].mode}`,
      _score: Object.keys(tags).length,
    });
  });
  return out;
};

// Same place mapped twice (e.g. a point + a building outline): keep one,
// the better-described entry; nearest first.
const nearbyDedupe = (cat, items) => {
  const kept = [];
  [...items]
    .sort((a, b) => a.distanceMeters - b.distanceMeters || b._score - a._score)
    .forEach((it) => {
      const idx = kept.findIndex(
        (k) =>
          nearbyNormalizeName(k.name) === nearbyNormalizeName(it.name) &&
          nearbyHaversine(k.latitude, k.longitude, it.latitude, it.longitude) <= NEARBY_CATEGORIES[cat].dedupe,
      );
      if (idx === -1) kept.push(it);
      else if (it._score > kept[idx]._score) kept[idx] = it;
    });
  return kept
    .sort((a, b) => a.distanceMeters - b.distanceMeters)
    .slice(0, NEARBY_CATEGORIES[cat].limit)
    .map(({ _score, ...it }) => it);
};

/* ---------------- Google Map (uses the project's Google Maps API key) ----------------
   Same key and libraries as Add New Property / Add New Project, so the Google
   script is loaded once for the whole app (different options would make the
   loader throw "Loader must not be called again with different options"). */

const NEARBY_GOOGLE_MAPS_API_KEY =
  process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "AIzaSyAUCNwxnNo52kFWJNGhRVj-AnkoffmzYe0";
const NEARBY_GOOGLE_MAPS_LIBRARIES = ["places"]; // must match the other pages
const NearbyGMarker = GoogleMapsApi["MarkerF"] || GoogleMapsApi["Marker"];
const NearbyGInfoWindow = GoogleMapsApi["InfoWindowF"] || GoogleMapsApi["InfoWindow"];

const NEARBY_MAP_STYLE = { width: "100%", height: "100%" };
const NEARBY_MAP_OPTIONS = {
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: true,
  clickableIcons: false,
  gestureHandling: "cooperative",
  styles: [{ featureType: "poi.business", stylers: [{ visibility: "off" }] }],
};

/* ---------------- Google Places (fast, uses the project's Google key) ----------------
   Seven searches run at the same time; each list is shown as soon as it
   arrives. Works with the classic Places library and, if that is not enabled
   for the key, with the new Places API. Anything Google can't answer is
   filled from OpenStreetMap. */

const NEARBY_GOOGLE_TIMEOUT_MS = 8000;
const NEARBY_OSM_DEADLINE_MS = 25000; // the backup never keeps spinning longer than this
const NEARBY_OSM_COOLDOWN_MS = 3 * 60 * 1000; // after the backup is refused, wait before asking again
const NEARBY_OSM_COOLDOWN_KEY = "apnaghar:nearby:osmCooldownUntil";
const nearbyOsmCoolingDown = () => {
  try {
    return Number(sessionStorage.getItem(NEARBY_OSM_COOLDOWN_KEY) || 0) > Date.now();
  } catch (e) {
    return false;
  }
};
const nearbyStartOsmCooldown = () => {
  try {
    sessionStorage.setItem(NEARBY_OSM_COOLDOWN_KEY, String(Date.now() + NEARBY_OSM_COOLDOWN_MS));
  } catch (e) {
    /* ignore */
  }
};

// How each list is searched on Google.
const NEARBY_GOOGLE_QUERIES = {
  metroStations: { legacy: { type: "subway_station" }, types: ["subway_station", "light_rail_station"] },
  busStops: { legacy: { type: "bus_station" }, types: ["bus_stop", "bus_station"] },
  schools: { legacy: { type: "school" }, types: ["school", "primary_school", "secondary_school"] },
  hospitals: { legacy: { type: "hospital" }, types: ["hospital"] },
  itParks: { legacy: { keyword: "IT park" }, text: "IT park" },
  malls: { legacy: { type: "shopping_mall" }, types: ["shopping_mall"] },
  markets: { legacy: { keyword: "market" }, text: "market" },
};
// Keyword searches return some unrelated places: keep only matching names.
const NEARBY_GOOGLE_NAME_FILTER = {
  itParks: NEARBY_IT_NAME_RE,
  markets: /(market|mandi|bazaar|bazar|haat)/i,
};

// Google calls window.gm_authFailure when the key is rejected (billing,
// referrer or API not enabled). Remember it so the page can switch to the
// embedded map instead of Google's "Oops! Something went wrong" box.
if (typeof window !== "undefined" && !window.__nearbyAuthHooked) {
  window.__nearbyAuthHooked = true;
  const previous = window.gm_authFailure;
  window.gm_authFailure = () => {
    window.__nearbyGmAuthFailed = true;
    try {
      window.dispatchEvent(new Event("nearby-gm-auth-failure"));
    } catch (e) {
      /* ignore */
    }
    if (typeof previous === "function") previous();
  };
}
const nearbyGoogleAuthFailed = () => typeof window !== "undefined" && !!window.__nearbyGmAuthFailed;

const nearbyWithTimeout = (promise, ms) =>
  new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error("timeout")), ms);
    promise.then(
      (v) => {
        clearTimeout(t);
        resolve(v);
      },
      (e) => {
        clearTimeout(t);
        reject(e);
      },
    );
  });

const nearbyGoogleItem = (cat, origin, { id, name, lat, lng, address }) => {
  const c = nearbyToCoords(lat, lng);
  const cleanName = String(name || "").trim().slice(0, 120);
  if (!c || !cleanName) return null;
  const d = nearbyHaversine(origin[0], origin[1], c[0], c[1]);
  if (d > NEARBY_CATEGORIES[cat].radius) return null;
  const filter = NEARBY_GOOGLE_NAME_FILTER[cat];
  if (filter && !filter.test(cleanName)) return null;
  return {
    id: `g/${id || `${c[0]},${c[1]}`}`,
    name: cleanName,
    latitude: c[0],
    longitude: c[1],
    locality: address ? String(address).slice(0, 160) : null,
    details: null,
    distanceMeters: Math.round(d),
    distanceText: nearbyFormatDistance(d),
    directionsUrl:
      `https://www.google.com/maps/dir/?api=1&origin=${origin[0].toFixed(6)},${origin[1].toFixed(6)}` +
      `&destination=${c[0].toFixed(6)},${c[1].toFixed(6)}` +
      (id ? `&destination_place_id=${encodeURIComponent(id)}` : "") +
      `&travelmode=${NEARBY_CATEGORIES[cat].mode}`,
    _score: 0,
  };
};

let nearbyLegacyDenied = false; // classic Places not enabled for this key -> use the new API
let nearbyGoogleError = null; // last Google Places error (shown in the error box)

const nearbyGoogleHelp = (err) => {
  const msg = String(err?.message || err?.status || err || "");
  if (/REQUEST_DENIED|not authorized|disabled|has not been used|PERMISSION_DENIED|legacy/i.test(msg))
    return 'Google Places is not enabled for this API key. In Google Cloud Console enable "Places API (New)" (and "Places API" if listed) for this key, with billing on.';
  if (/OVER_QUERY_LIMIT|quota|RESOURCE_EXHAUSTED/i.test(msg)) return "Google Places quota exceeded for this API key.";
  if (/referer|referrer/i.test(msg)) return "This website address is not allowed for the Google API key (HTTP referrer restriction).";
  if (/timeout/i.test(msg)) return "Google Places did not answer in time.";
  return msg ? `Google Places error: ${msg.slice(0, 160)}` : null;
};

// Classic Places library (PlacesService.nearbySearch, nearest first).
const nearbyGoogleLegacy = (g, cat, origin) =>
  new Promise((resolve, reject) => {
    const svc = new g.places.PlacesService(document.createElement("div"));
    svc.nearbySearch(
      {
        location: new g.LatLng(origin[0], origin[1]),
        rankBy: g.places.RankBy.DISTANCE,
        ...NEARBY_GOOGLE_QUERIES[cat].legacy,
      },
      (results, status) => {
        const S = g.places.PlacesServiceStatus;
        if (status === S.OK || status === S.ZERO_RESULTS) {
          resolve(
            (results || []).map((p) => ({
              id: p.place_id,
              name: p.name,
              lat: p.geometry?.location?.lat(),
              lng: p.geometry?.location?.lng(),
              address: p.vicinity,
            })),
          );
        } else {
          if (status === S.REQUEST_DENIED) nearbyLegacyDenied = true;
          reject(Object.assign(new Error(`Places ${status}`), { status }));
        }
      },
    );
  });

// New Places API (Place.searchNearby / Place.searchByText).
const nearbyGoogleNew = async (g, cat, origin) => {
  const Place = g.places && g.places.Place;
  if (!Place) throw new Error("New Places API not available");
  const q = NEARBY_GOOGLE_QUERIES[cat];
  const center = { lat: origin[0], lng: origin[1] };
  const radius = NEARBY_CATEGORIES[cat].radius;
  const fields = ["id", "displayName", "location", "formattedAddress"];
  const res = q.text
    ? await Place.searchByText({ textQuery: q.text, fields, locationBias: { center, radius }, maxResultCount: 20 })
    : await Place.searchNearby({
      fields,
      locationRestriction: { center, radius },
      includedPrimaryTypes: q.types,
      maxResultCount: 20,
      rankPreference: g.places.SearchNearbyRankPreference ? g.places.SearchNearbyRankPreference.DISTANCE : undefined,
    });
  return (res?.places || []).map((p) => ({
    id: p.id,
    name: p.displayName,
    lat: p.location?.lat(),
    lng: p.location?.lng(),
    address: p.formattedAddress,
  }));
};

const nearbyGoogleSearch = async (g, cat, origin) => {
  let raw;
  if (!nearbyLegacyDenied && g.places.PlacesService) {
    try {
      raw = await nearbyWithTimeout(nearbyGoogleLegacy(g, cat, origin), NEARBY_GOOGLE_TIMEOUT_MS);
    } catch (e) {
      if (!nearbyLegacyDenied) throw e; // real error / timeout
    }
  }
  if (!raw) raw = await nearbyWithTimeout(nearbyGoogleNew(g, cat, origin), NEARBY_GOOGLE_TIMEOUT_MS);
  return nearbyDedupe(cat, raw.map((r) => nearbyGoogleItem(cat, origin, r)).filter(Boolean));
};

/* ---------------- Loading job: shared, progressive, cancellable ---------------- */

const nearbyJobs = new Map(); // coordKey -> job
const nearbyCoordKey = (origin) => `${origin[0].toFixed(4)},${origin[1].toFixed(4)}`;

// OpenStreetMap: all seven lists from one request.
const nearbyFetchOsm = async (origin, signal) => {
  const parsed = nearbyParse(await nearbyRunOverpass(nearbyBuildQuery(origin), signal), origin);
  const out = {};
  NEARBY_CATEGORY_KEYS.forEach((k) => {
    out[k] = nearbyDedupe(k, parsed[k]);
  });
  return out;
};

/**
 * Starts (or joins) loading for one location.
 * listener(event): { type: "category", key, items } | { type: "error", key }
 *                 | { type: "done", source }
 * Returns an unsubscribe function. Google is used when `useGoogle` is true,
 * OpenStreetMap otherwise and for anything Google could not answer.
 */
const nearbyLoad = (origin, useGoogle, listener) => {
  const key = nearbyCoordKey(origin);
  // FIX: one job per location AND source, so a Google load started after the
  // page fell back to OpenStreetMap doesn't silently reuse the OSM request.
  const jobKey = `${key}|${useGoogle ? "google" : "osm"}`;
  let job = nearbyJobs.get(jobKey);
  if (!job) {
    const controller = new AbortController();
    job = { listeners: new Set(), events: [], controller, done: false };
    const emit = (ev) => {
      job.events.push(ev);
      job.listeners.forEach((l) => l(ev));
    };
    nearbyJobs.set(jobKey, job);

    (async () => {
      const result = {};
      const g = useGoogle && !nearbyGoogleAuthFailed() && window.google && window.google.maps;
      let missing = NEARBY_CATEGORY_KEYS;
      let source = "osm";

      if (g && g.places) {
        source = "google";
        await Promise.all(
          NEARBY_CATEGORY_KEYS.map((cat) =>
            nearbyGoogleSearch(g, cat, origin).then(
              (items) => {
                result[cat] = items;
                if (!controller.signal.aborted) emit({ type: "category", key: cat, items });
              },
              (err) => {
                nearbyGoogleError = err;
                if (nearbyIsDev) console.warn(`[Nearby] Google ${cat}:`, err?.message);
              },
            ),
          ),
        );
        missing = NEARBY_CATEGORY_KEYS.filter((cat) => !result[cat]);
      }
      const googleFailed = source === "google" ? [...missing] : [];

      if (missing.length && !controller.signal.aborted && nearbyOsmCoolingDown()) {
        // The backup refused us a moment ago: don't ask again yet (it only makes the block longer).
        missing.forEach((cat) => emit({ type: "error", key: cat }));
        missing = [];
      }
      if (missing.length && !controller.signal.aborted) {
        try {
          const osm = await nearbyWithTimeout(nearbyFetchOsm(origin, controller.signal), NEARBY_OSM_DEADLINE_MS);
          missing.forEach((cat) => {
            result[cat] = osm[cat];
            emit({ type: "category", key: cat, items: osm[cat] });
          });
          if (source === "google" && missing.length === NEARBY_CATEGORY_KEYS.length) source = "osm";
          else if (source === "google") source = "mixed";
        } catch (err) {
          if (nearbyIsAbort(err)) return;
          nearbyStartOsmCooldown();
          if (nearbyIsDev) console.warn("[Nearby] OpenStreetMap:", err?.message);
          missing.forEach((cat) => emit({ type: "error", key: cat }));
        }
      }
      if (controller.signal.aborted) return;
      if (nearbyIsDev)
        console.info(
          `[Nearby ${NEARBY_VERSION}] source: ${source}; Google failed for: ${googleFailed.join(", ") || "none"}` +
          (nearbyGoogleError ? ` — ${nearbyGoogleHelp(nearbyGoogleError)}` : ""),
        );
      // Cache only complete results.
      if (NEARBY_CATEGORY_KEYS.every((cat) => result[cat])) {
        nearbyCacheWrite(key, { categories: result, source, fetchedAt: new Date().toISOString() });
      }
      job.done = true;
      emit({ type: "done", source });
      if (nearbyJobs.get(jobKey) === job) nearbyJobs.delete(jobKey);
    })();
  }

  const current = job;
  current.listeners.add(listener);
  current.events.forEach((ev) => listener(ev)); // replay what already arrived
  return () => {
    current.listeners.delete(listener);
    // Wait one tick: React StrictMode unmounts and remounts immediately.
    setTimeout(() => {
      if (!current.done && current.listeners.size === 0 && nearbyJobs.get(jobKey) === current) {
        current.controller.abort();
        nearbyJobs.delete(jobKey);
      }
    }, 0);
  };
};

const nearbySvgUrl = (svg) => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;

// Red map pin with a house: the property.
const NEARBY_HOME_PIN = nearbySvgUrl(
  '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="50" viewBox="0 0 40 50">' +
  '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#D61F45"/><stop offset="1" stop-color="#B91C3C"/></linearGradient></defs>' +
  '<path d="M20 48C20 48 4 30.5 4 19a16 16 0 0 1 32 0c0 11.5-16 29-16 29z" fill="url(#g)" stroke="#fff" stroke-width="3"/>' +
  '<path d="M20 10.5 11.5 18h2.5v8.5h4.5V21h3v5.5h4.5V18h2.5z" fill="#fff"/></svg>',
);

// Numbered circle: a nearby place (filled red when selected).
const nearbyNumberPin = (n, selected) => {
  const size = selected ? 34 : 28;
  const r = size / 2 - 2;
  return nearbySvgUrl(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">` +
    `<circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="${selected ? "#D61F45" : "#fff"}" stroke="#D61F45" stroke-width="2.5"/>` +
    `<text x="50%" y="50%" dy=".35em" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" ` +
    `font-size="${selected ? 14 : 12}" fill="${selected ? "#fff" : "#D61F45"}">${n}</text></svg>`,
  );
};

const NearbyMapFallback = ({ origin, sel }) => {
  // If Google Maps can't load (key/billing/network): a simple embedded map.
  const target = sel ? `${sel.latitude},${sel.longitude}` : origin ? `${origin[0]},${origin[1]}` : null;
  return target ? (
    <iframe
      title="Nearby map"
      className="block w-full h-64 md:h-80 border border-[#FDE8EC] rounded-2xl"
      src={`https://maps.google.com/maps?q=${target}&z=14&output=embed`}
      loading="lazy"
      allowFullScreen
    />
  ) : null;
};

const NearbyMap = ({ origin, items, selected, onSelect }) => {
  const { isLoaded, loadError } = GoogleMapsApi.useJsApiLoader({
    googleMapsApiKey: NEARBY_GOOGLE_MAPS_API_KEY,
    libraries: NEARBY_GOOGLE_MAPS_LIBRARIES,
  });
  const [map, setMap] = useState(null);
  const lastItemsRef = useRef(null);
  // FIX: if Google rejects the key, show the embedded map instead of
  // Google's "Oops! Something went wrong" box.
  const [authFailed, setAuthFailed] = useState(nearbyGoogleAuthFailed);
  useEffect(() => {
    const onFail = () => setAuthFailed(true);
    window.addEventListener("nearby-gm-auth-failure", onFail);
    return () => window.removeEventListener("nearby-gm-auth-failure", onFail);
  }, []);
  const sel = items[selected];

  const onLoad = useCallback((m) => setMap(m), []);
  const onUnmount = useCallback(() => setMap(null), []);

  // Frame the property + places (all of them when the list changes,
  // the property + selected place when only the selection changes).
  useEffect(() => {
    const g = window.google && window.google.maps;
    if (!map || !g) return;
    try {
      const itemsChanged = lastItemsRef.current !== items;
      lastItemsRef.current = items;
      const pts = [];
      if (origin) pts.push({ lat: origin[0], lng: origin[1] });
      if (itemsChanged || !sel) items.forEach((it) => pts.push({ lat: it.latitude, lng: it.longitude }));
      else pts.push({ lat: sel.latitude, lng: sel.longitude });
      if (pts.length === 1) {
        map.setCenter(pts[0]);
        map.setZoom(15);
      } else if (pts.length > 1) {
        const bounds = new g.LatLngBounds();
        pts.forEach((p) => bounds.extend(p));
        map.fitBounds(bounds, 48);
        g.event.addListenerOnce(map, "idle", () => {
          if (map.getZoom() > 16) map.setZoom(16);
        });
      }
    } catch (e) {
      // Never let a map problem break the property page.
      if (nearbyIsDev) console.warn("[Nearby] map framing skipped:", e?.message);
    }
  }, [map, origin, items, sel]);

  // Dashed red line: property -> selected place.
  // FIX: drawn directly with Google's API instead of the library's <Polyline>
  // component, whose setPath() call crashed with
  // "Cannot read properties of undefined (reading 'setAt')".
  // A new line is created for every change and the old one is removed.
  const selLat = sel ? sel.latitude : null;
  const selLng = sel ? sel.longitude : null;
  useEffect(() => {
    const g = window.google && window.google.maps;
    if (!map || !g || !origin || selLat === null || selLng === null) return undefined;
    let line = null;
    try {
      line = new g.Polyline({
        path: [
          { lat: origin[0], lng: origin[1] },
          { lat: selLat, lng: selLng },
        ],
        strokeOpacity: 0,
        clickable: false,
        icons: [
          {
            icon: { path: "M 0,-1 0,1", strokeOpacity: 0.9, strokeColor: "#D61F45", scale: 3 },
            offset: "0",
            repeat: "14px",
          },
        ],
        map,
      });
    } catch (e) {
      if (nearbyIsDev) console.warn("[Nearby] line skipped:", e?.message);
    }
    return () => {
      if (line) {
        try {
          line.setMap(null);
        } catch (e) {
          /* map already gone */
        }
      }
    };
  }, [map, origin, selLat, selLng]);

  if (loadError || authFailed) return <NearbyMapFallback origin={origin} sel={sel} />;

  const g = isLoaded && window.google && window.google.maps;
  const center = origin ? { lat: origin[0], lng: origin[1] } : sel ? { lat: sel.latitude, lng: sel.longitude } : null;

  return (
    <div className="relative overflow-hidden border border-[#FDE8EC] rounded-2xl bg-[#FFF7F9] h-64 md:h-80">
      {!g || !center ? (
        <div className="absolute inset-0 flex items-center justify-center text-[13px] text-gray-400 animate-pulse">
          Loading map…
        </div>
      ) : (
        <GoogleMapsApi.GoogleMap
          mapContainerStyle={NEARBY_MAP_STYLE}
          center={center}
          zoom={14}
          options={NEARBY_MAP_OPTIONS}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {origin && (
            <NearbyGMarker
              position={{ lat: origin[0], lng: origin[1] }}
              title="This property"
              zIndex={1000}
              icon={{
                url: NEARBY_HOME_PIN,
                scaledSize: new g.Size(40, 50),
                anchor: new g.Point(20, 48),
              }}
            />
          )}

          {items.map((it, i) => {
            const isSel = i === selected;
            const size = isSel ? 34 : 28;
            return (
              <NearbyGMarker
                key={`${it.id}-${isSel ? "s" : "n"}`}
                position={{ lat: it.latitude, lng: it.longitude }}
                title={`${it.name} · ${it.distanceText}`}
                zIndex={isSel ? 900 : 100 + i}
                onClick={() => onSelect(i)}
                icon={{
                  url: nearbyNumberPin(i + 1, isSel),
                  scaledSize: new g.Size(size, size),
                  anchor: new g.Point(size / 2, size / 2),
                }}
              />
            );
          })}

          {sel && (
            <NearbyGInfoWindow
              position={{ lat: sel.latitude, lng: sel.longitude }}
              options={{ pixelOffset: new g.Size(0, -18), disableAutoPan: true, headerDisabled: true }}
            >
              <div style={{ font: "600 12.5px/1.3 system-ui, sans-serif", color: "#17253a", padding: "2px 4px" }}>
                {sel.name} · {sel.distanceText}
              </div>
            </NearbyGInfoWindow>
          )}
        </GoogleMapsApi.GoogleMap>
      )}

      <div className="absolute z-[5] flex items-center gap-3 px-3 py-1.5 text-[11.5px] font-medium text-gray-600 bg-white/95 border border-[#FDE8EC] rounded-xl shadow-sm left-3 top-3 pointer-events-none">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-full bg-[#D61F45]" /> Property
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 bg-white border-2 border-[#D61F45] rounded-full" /> Nearby
        </span>
      </div>
    </div>
  );
};

/* ---------------- Cards & states ---------------- */

const NearbySkeleton = () => (
  <div className="grid grid-cols-1 gap-3 mt-4 sm:grid-cols-2 xl:grid-cols-3" aria-hidden="true">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="p-4 bg-white border border-[#FDE8EC] rounded-2xl animate-pulse">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#FFF1F4]" />
          <div className="flex-1 space-y-2">
            <div className="w-3/4 h-3.5 rounded bg-gray-100" />
            <div className="w-1/2 h-3 rounded bg-gray-100" />
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <div className="w-24 h-6 rounded-full bg-gray-100" />
          <div className="w-20 h-4 rounded bg-gray-100" />
        </div>
      </div>
    ))}
  </div>
);

const NearbyStateBox = ({ icon: Icon, title, text, action }) => (
  <div className="flex flex-col items-center justify-center px-4 py-10 mt-4 text-center rounded-2xl bg-[#FFF7F9] border border-dashed border-[#FAD3DB]">
    <span className="flex items-center justify-center w-14 h-14 bg-white rounded-full text-[#D61F45] shadow-[0_6px_16px_rgba(214,31,69,0.1)]">
      <Icon size={28} weight="fill" />
    </span>
    {title && <p className="m-0 mt-3 text-[15px] font-semibold text-[#17253a]">{title}</p>}
    {text && <p className="m-0 mt-1 text-[13px] text-gray-500">{text}</p>}
    {action}
  </div>
);

const NearbyCard = ({ item, index, selected, onSelect, icon: Icon }) => {
  const subtitle = [item.details, item.locality].filter(Boolean).join(" · ");
  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className={`flex flex-col h-full p-4 bg-white border rounded-2xl cursor-pointer transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#FAD3DB] ${selected
        ? "border-[#D61F45] shadow-[0_10px_24px_rgba(214,31,69,0.15)]"
        : "border-[#FDE8EC] hover:border-[#FAD3DB] hover:shadow-[0_10px_24px_rgba(214,31,69,0.08)]"
        }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`relative flex items-center justify-center flex-shrink-0 w-11 h-11 rounded-xl ${selected ? "bg-[#D61F45] text-white" : "bg-[#FDE8EC] text-[#D61F45]"
            }`}
        >
          <Icon size={22} weight="fill" />
          <span
            className={`absolute -top-1.5 -right-1.5 flex items-center justify-center w-5 h-5 text-[10.5px] font-bold rounded-full border-2 border-white ${selected ? "bg-[#17253a] text-white" : "bg-[#D61F45] text-white"
              }`}
          >
            {index + 1}
          </span>
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="m-0 text-[15px] font-semibold leading-snug text-[#17253a] truncate" title={item.name}>
              {item.name}
            </h4>
            {index === 0 && (
              <span className="flex-shrink-0 px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wide rounded-full bg-[#ECFDF3] text-[#15803D]">
                Nearest
              </span>
            )}
          </div>
          <p className="m-0 mt-1 text-[12.5px] text-gray-500 truncate" title={subtitle || undefined}>
            {subtitle || "Locality not listed"}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 pt-3 mt-auto">
        <span
          className="inline-flex items-center px-3 py-1 text-[12.5px] font-semibold rounded-full bg-[#FFF7F9] text-[#17253a] border border-[#FDE8EC]"
          title="Straight-line distance from the property"
        >
          {item.distanceText}
          <span className="ml-1 font-normal text-gray-500">straight-line</span>
        </span>
        {item.directionsUrl && (
          <a
            href={item.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold no-underline text-[#D61F45] hover:underline"
          >
            <NavigationArrow size={15} weight="fill" />
            Directions
          </a>
        )}
      </div>
    </div>
  );
};

const nearbyPlural = (n, noun) => `${n} ${noun}${n === 1 ? "" : "s"}`;

/* ---------------- Main component ---------------- */

const NEARBY_GOOGLE_WAIT_MS = 8000; // if Google Maps hasn't loaded by then, use OpenStreetMap (switches to Google if it loads later)

const nearbyEmptyState = () => ({ categories: {}, errors: {}, source: null, done: false, refreshing: false });

const NearbyConnectivity = ({ latitude, longitude }) => {
  const origin = useMemo(() => nearbyToCoords(latitude, longitude), [latitude, longitude]);
  const cacheKey = origin ? nearbyCoordKey(origin) : "";

  // Same loader options as the other pages (one Google script for the app).
  const { isLoaded: gmLoaded, loadError: gmLoadError } = GoogleMapsApi.useJsApiLoader({
    googleMapsApiKey: NEARBY_GOOGLE_MAPS_API_KEY,
    libraries: NEARBY_GOOGLE_MAPS_LIBRARIES,
  });
  const [gmWaitOver, setGmWaitOver] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGmWaitOver(true), NEARBY_GOOGLE_WAIT_MS);
    return () => clearTimeout(t);
  }, []);
  const googleReady = gmLoaded && !gmLoadError && !!(window.google && window.google.maps && window.google.maps.places);
  // Decide the source once Google is ready, failed, or took too long.
  const provider = googleReady ? "google" : gmLoadError || gmWaitOver ? "osm" : null;

  const [state, setState] = useState(() => {
    const cached = cacheKey ? nearbyCacheRead(cacheKey) : null;
    return cached
      ? { categories: cached.data.categories, errors: {}, source: cached.data.source, done: true, refreshing: false }
      : nearbyEmptyState();
  });
  const [reloadToken, setReloadToken] = useState(0);
  const [groupKey, setGroupKey] = useState(NEARBY_GROUPS[0].key);
  const [subKey, setSubKey] = useState(NEARBY_GROUPS[0].subs[0]);
  const [selected, setSelected] = useState(0);

  // Load: cached result at once; otherwise each list appears as it arrives.
  useEffect(() => {
    if (!origin) return undefined;
    const cached = reloadToken === 0 ? nearbyCacheRead(cacheKey) : null;
    if (cached) {
      setState({ categories: cached.data.categories, errors: {}, source: cached.data.source, done: true, refreshing: false });
      if (cached.age <= NEARBY_FRESH_MS) return undefined;
    }
    if (!provider) {
      if (!cached) setState(nearbyEmptyState()); // waiting for Google (max 4 s)
      return undefined;
    }
    let active = true;
    if (cached) setState((s) => ({ ...s, refreshing: true }));
    else setState(nearbyEmptyState());

    const fresh = { categories: {}, errors: {} };
    const unsubscribe = nearbyLoad(origin, provider === "google", (ev) => {
      if (!active) return;
      if (ev.type === "category") {
        fresh.categories[ev.key] = ev.items;
        if (!cached) setState((s) => ({ ...s, categories: { ...s.categories, [ev.key]: ev.items } }));
      } else if (ev.type === "error") {
        fresh.errors[ev.key] = true;
        if (!cached) setState((s) => ({ ...s, errors: { ...s.errors, [ev.key]: true } }));
      } else if (ev.type === "done") {
        if (cached) {
          // Background refresh: swap in only a complete new result.
          const complete = NEARBY_CATEGORY_KEYS.every((k) => fresh.categories[k]);
          setState((s) => (complete ? { categories: fresh.categories, errors: {}, source: ev.source, done: true, refreshing: false } : { ...s, refreshing: false }));
        } else {
          setState((s) => ({ ...s, source: ev.source, done: true }));
        }
      }
    });
    return () => {
      active = false;
      unsubscribe();
    };
  }, [origin, cacheKey, provider, reloadToken]);

  // New location -> back to the first tab.
  useEffect(() => {
    setGroupKey(NEARBY_GROUPS[0].key);
    setSubKey(NEARBY_GROUPS[0].subs[0]);
    setSelected(0);
  }, [cacheKey]);

  const selectItem = useCallback((i) => setSelected(i), []);

  const group = NEARBY_GROUPS.find((g) => g.key === groupKey) || NEARBY_GROUPS[0];
  const subId = group.subs.includes(subKey) ? subKey : group.subs[0];
  const sub = NEARBY_CATEGORIES[subId];
  const items = useMemo(() => state.categories[subId] || [], [state.categories, subId]);

  const switchGroup = (g) => {
    setGroupKey(g.key);
    setSubKey(g.subs[0]);
    setSelected(0);
  };
  const switchSub = (key) => {
    setSubKey(key);
    setSelected(0);
  };

  if (!origin) {
    return <NearbyStateBox icon={MapPinLine} title="Location details aren't available for this property yet." text={null} />;
  }

  const isLoadingCat = (k) => !state.categories[k] && !state.errors[k];
  const loading = isLoadingCat(subId);
  const failed = !!state.errors[subId] && !state.categories[subId];
  const radiusText = nearbyKmText(sub.radius);
  const retry = () => {
    try {
      sessionStorage.removeItem(NEARBY_OSM_COOLDOWN_KEY);
    } catch (e) {
      /* ignore */
    }
    nearbyGoogleError = null;
    setReloadToken((n) => n + 1);
  };

  return (
    <div>
      {/* Tabs (3 groups) */}
      <div className="flex gap-2 pb-1 -mx-1 overflow-x-auto px-1 [scrollbar-width:none]" role="tablist" aria-label="Nearby connectivity">
        {NEARBY_GROUPS.map((g) => {
          const active = g.key === group.key;
          const Icon = g.icon;
          const pending = g.subs.some(isLoadingCat);
          const count = g.subs.reduce((n, k) => n + (state.categories[k]?.length || 0), 0);
          return (
            <button
              key={g.key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => switchGroup(g)}
              className={`flex items-center flex-shrink-0 gap-2 px-4 py-2.5 text-[14px] font-semibold rounded-xl transition-all ${active
                ? "bg-[#D61F45] text-white shadow-[0_6px_16px_rgba(214,31,69,0.28)]"
                : "text-gray-600 bg-white border border-gray-200 hover:text-[#D61F45] hover:border-[#FAD3DB]"
                }`}
            >
              <Icon size={18} weight={active ? "fill" : "regular"} />
              {g.label}
              {pending ? (
                <span
                  className={`w-3 h-3 border-2 rounded-full animate-spin ${active ? "border-white/40 border-t-white" : "border-gray-200 border-t-[#D61F45]"
                    }`}
                />
              ) : (
                <span
                  className={`min-w-[22px] px-1.5 py-0.5 text-[11px] leading-none rounded-full ${active ? "bg-white/25 text-white" : "bg-gray-100 text-gray-600"
                    }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Sub-tabs inside the group */}
      <div className="inline-flex max-w-full gap-1 p-1 mt-3 overflow-x-auto align-top bg-gray-100 rounded-xl [scrollbar-width:none]" role="tablist" aria-label={group.label}>
        {group.subs.map((k) => {
          const c = NEARBY_CATEGORIES[k];
          const active = k === subId;
          const Icon = c.icon;
          const count = state.categories[k]?.length;
          return (
            <button
              key={k}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => switchSub(k)}
              className={`flex items-center flex-shrink-0 gap-1.5 px-4 py-2 text-[13px] font-semibold rounded-lg transition-all ${active ? "bg-white text-[#D61F45] shadow-sm" : "text-gray-600 hover:text-[#17253a]"
                }`}
            >
              <Icon size={16} weight={active ? "fill" : "regular"} />
              {c.label}
              {typeof count === "number" ? (
                <span className="text-[11.5px] font-medium text-gray-400">{count}</span>
              ) : (
                isLoadingCat(k) && <span className="w-2.5 h-2.5 border-2 rounded-full animate-spin border-gray-200 border-t-[#D61F45]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Summary */}
      {!loading && !failed && items.length > 0 && (
        <p className="flex flex-wrap items-center gap-x-1.5 m-0 mt-3 text-[13px] text-gray-600">
          <span>
            {nearbyPlural(items.length, sub.noun)} within {radiusText} · Nearest:
          </span>
          <b className="text-[#17253a]">{items[0].name}</b>
          <span>({items[0].distanceText})</span>
          {state.refreshing && <span className="ml-1 text-[11.5px] text-gray-400 animate-pulse">Updating…</span>}
        </p>
      )}

      {/* Map: property + every place in this list (shown at once) */}
      <div className="mt-3">
        <NearbyMap origin={origin} items={loading || failed ? [] : items} selected={selected} onSelect={selectItem} />
      </div>

      {/* List / states */}
      {loading && <NearbySkeleton />}

      {failed && (
        <NearbyStateBox
          icon={WarningCircle}
          title={`We couldn't load nearby ${sub.label.toLowerCase()}.`}
          text={nearbyGoogleHelp(nearbyGoogleError) || "The places service is busy or unreachable. Please try again in a minute."}
          action={
            <button
              type="button"
              onClick={retry}
              className="inline-flex items-center gap-1.5 px-4 py-2 mt-4 text-[13px] font-semibold text-[#D61F45] bg-white border-[1.5px] border-[#D61F45] rounded-xl hover:bg-[#FDE8EC]"
            >
              <ArrowClockwise size={15} weight="bold" />
              Try again
            </button>
          }
        />
      )}

      {!loading && !failed && items.length === 0 && (
        <NearbyStateBox
          icon={sub.icon}
          title={`No ${sub.noun}s found nearby`}
          text={`We couldn't find any ${sub.noun} within ${radiusText} of this property.`}
        />
      )}

      {!loading && !failed && items.length > 0 && (
        <div className="grid grid-cols-1 gap-3 mt-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item, i) => (
            <NearbyCard
              key={item.id}
              item={item}
              index={i}
              selected={i === selected}
              onSelect={() => setSelected(i)}
              icon={sub.icon}
            />
          ))}
        </div>
      )}

      <p className="m-0 mt-4 text-[11.5px] leading-relaxed text-gray-400">
        Tap a place to see it on the map. Distances are straight-line from the property, not walking or driving
        distance.{" "}
        {state.source === "osm"
          ? "Data © OpenStreetMap contributors."
          : state.source === "mixed"
            ? "Data: Google, © OpenStreetMap contributors."
            : state.source === "google"
              ? "Places data: Google."
              : ""}
      </p>
    </div>
  );
};

const Detail = ({ propertyData }) => {
  const toWords = new ToWords({
    localeCode: "en-IN",
    converterOptions: {
      currency: false,
      ignoreDecimal: true,
      ignoreZeroCurrency: true,
    },
  });
  // const [showAllImages, setShowAllImages] = useState(false);
  const [savedProperties, setSavedProperties] = useState([]);
  const [properties, setProperties] = useState([]);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const sliderRef = useRef(null);
  const overviewRef = useRef(null);
  const moreDetailsRef = useRef(null);
  const amenitiesRef = useRef(null);
  const aboutRef = useRef(null);
  const locationRef = useRef(null);
  const statusTimelineRef = useRef(null);
  const nearbyRef = useRef(null);
  const [activeSection, setActiveSection] = useState("overview");
  const [currentShareUrl1, setcurrentShareUrl1] = useState("");
  const [propertyDetails, setPropertyDetails] = useState({});
  const userId = sessionStorage.getItem("accessToken");
  const history = useHistory();
  const { searchCity } = useCity();
  const [currentShareUrl, setCurrentShareUrl] = useState("");
  const [activeShareId, setActiveShareId] = useState(null);
  const [tourSchedule, setTourSchedule] = useState([]);

  const [freeViewCount, setFreeViewCount] = useState(0);
  const [paidViewCount, setPaidViewCount] = useState(0);

  const formatArea = (area, unit) => {
    if (!area) return null;

    const formattedUnit = unit ? unit.trim().toLowerCase() : "";

    return `${area} ${formattedUnit}`;
  };
  const scrollToSection = (ref, key) => {
    setActiveSection(key);
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
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
        setFreeViewCount(countData.free_view_count || 0);
        setPaidViewCount(countData.paid_view_count || 0);
      }
    } catch (error) {
      console.error("Error checking post limits:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      checkPostLimits();
    }
  }, [userId]);

  const handleAddCount = async (updatedCount) => {
    try {
      const addCountFormData = new FormData();
      if (freeViewCount > 0) {
        addCountFormData.append("free_view_count", updatedCount);
      } else {
        addCountFormData.append("paid_view_count", updatedCount);
      }
      addCountFormData.append("user_id", userId);

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/cust_api/add_count`,
        {
          method: "POST",
          body: addCountFormData,
        },
      );

      const data = await response.json();

      if (response.ok) {
        checkPostLimits();
      } else {
        console.error("Failed to update count:", data.message);
      }
    } catch (error) {
      console.error("API error:", error);
    }
  };

  useEffect(() => {
    // const userId = sessionStorage.getItem("AccessToken");
    if (userId) {
      setIsLoggedIn(true);
      fetchSavedProperties(userId);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const fetchSavedProperties = async () => {
    // const userId = sessionStorage.getItem("AccessToken");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/cust_api/get_favorite_properties`,
        { user_id: userId },
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

  const fetchRecommendedProperties = async () => {
    try {
      const cityName =
        searchCity && searchCity.trim() !== ""
          ? searchCity.trim()
          : sessionStorage.getItem("cityName") || "";
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/cust_api/get_featured_property`,
        {
          user_id: userId,
          city_name: cityName,
        },
      );
      if (response.data.status === 1 && Array.isArray(response.data.data)) {
        setProperties(response.data.data);
      } else {
        setProperties([]);
      }
    } catch (error) {
      console.error("Error fetching recommended properties:", error);
    }
  };

  useEffect(() => {
    fetchRecommendedProperties();
  }, []);

  //add to favorite started
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null); // Store the favorite_id for removal

  // Check if the property is a favorite on page load or when propertyDetails changes
  const checkIfFavorite = async (propertyId) => {
    // const userId = sessionStorage.getItem("accessToken");
    if (!userId || !propertyId) return;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/cust_api/get_favorite_properties`,
        { user_id: userId },
      );

      const favoriteList = response.data.data || [];
      const matchedFavorite = favoriteList.find(
        (fav) => String(fav._id) === String(propertyId),
      );

      if (matchedFavorite) {
        setIsFavorite(true);
        setFavoriteId(matchedFavorite.favorite_id); // Save favorite_id for removal
      } else {
        setIsFavorite(false);
        setFavoriteId(null);
      }
    } catch (error) {
      console.error("Error checking favorite status:", error);
    }
  };

  useEffect(() => {
    checkIfFavorite(propertyDetails?._id);
  }, [propertyDetails?._id]);

  //  Add to favorites
  const addToFavorites = async () => {
    if (!userId) {
      setIsLoginModalOpen(true);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/cust_api/add_to_favorite`,
        {
          user_id: userId,
          property_id: propertyDetails._id,
        },
      );
      setIsFavorite(true); // Immediately set isFavorite to true
      checkIfFavorite(_id); // Save the favorite_id from the response
      toast.success("Property has been saved to your favorites!");
      fetchPropertyDetails(_id);
      fetchRecommendedProperties();
    } catch (error) {
      console.error("Error adding property to favorites:", error);
      toast.error("Failed to save the property. Please try again.");
    }
  };

  // Remove from favorites
  const removeFromFavorites = async () => {
    if (!favoriteId) return;

    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/cust_api/remove_from_favorite`,
        { data: { favorite_id: favoriteId } }, // DELETE request with body
      );

      toast.success("Property removed from your favorites.");
      checkIfFavorite(_id);
      fetchPropertyDetails(_id);
      fetchRecommendedProperties();
    } catch (error) {
      console.error("Error removing property from favorites:", error);
      toast.error("Failed to remove the property. Please try again.");
    }
  };

  //  Add to favorites
  const addToFavoritesRecommendedProperty = async (PropertyId) => {
    if (!userId) {
      setIsLoginModalOpen(true);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/cust_api/add_to_favorite`,
        {
          user_id: userId,
          property_id: PropertyId,
        },
      );
      checkIfFavorite(_id);
      fetchPropertyDetails(_id);
      fetchRecommendedProperties();
    } catch (error) {
      console.log("Failed to save the property. Please try again.");
    }
  };

  // Remove from favorites
  const removeFromFavoritesRecommendedProperty = async (FavoriteId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/cust_api/remove_from_favorite`,
        { data: { favorite_id: FavoriteId } },
      );

      checkIfFavorite(_id);
      fetchPropertyDetails(_id);
      fetchRecommendedProperties();
    } catch (error) {
      console.log("Failed to remove the property. Please try again.");
    }
  };

  // Slider settings
  const [activeIndexes, setActiveIndexes] = useState({});
  const BASE_URL = process.env.REACT_APP_API_URL;
  const settings = {
    infinite: true,
    slidesToShow: 4,
    lazyLoad: "ondemand",
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    cssEase: "linear",
    centerMode: false,
    centerPadding: "0px",
    responsive: [
      {
        breakpoint: 1399,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const openShareModal1 = (url) => {
    setcurrentShareUrl1(url);
    const modal = document.getElementById("shareModal1");
    if (modal) {
      modal.style.display = "block";
    }
  };

  const openShareModal = (url, propertyId) => {
    setCurrentShareUrl(url);
    setActiveShareId(propertyId);
    setIsShareModalOpen(true);
  };

  const formatPrice = (price) => {
    if (price === null || price === undefined || price === "") return "";

    price = Number(price);

    if (price >= 10000000) {
      return (price / 10000000).toFixed(2).replace(/\.?0+$/, "") + " Cr";
    } else if (price >= 100000) {
      return (price / 100000).toFixed(2).replace(/\.?0+$/, "") + " L";
    } else if (price >= 1000) {
      return (price / 1000).toFixed(2).replace(/\.?0+$/, "") + " K";
    } else {
      return price.toString();
    }
  };

  // for the image section with 'get_property_detail' api

  const { _id } = useParams();
  const location = useLocation();
  const property_owner_id = location.state?.property_owner_id;
  const [aboutPropertyText, setAboutPropertyText] = useState("");

  const [showAll, setShowAll] = useState(false);
  const [allAmenities, setAllAmenities] = useState([]);
  const visibleAmenities = showAll ? allAmenities : allAmenities.slice(0, 8);

  const [propertyImages, setPropertyImages] = useState([]);
  const [showAllImages, setShowAllImages] = useState(false);
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [userDetails, setuserDetails] = useState({
    full_name: "",
    mobile_number: "",
    email: "",
  });

  const user_id = sessionStorage.getItem("accessToken");
  useEffect(() => {
    const customer_id = user_id;

    if (propertyDetails?._id && propertyDetails?.user_id && customer_id) {
      const formData = new FormData();
      formData.append("property_id", propertyDetails?._id);
      formData.append("user_id", propertyDetails?.user_id);
      formData.append("customer_id", customer_id);

      axios
        .post(
          `${process.env.REACT_APP_API_URL}/cust_api/add_view_property`,
          formData,
        )
        .then((res) => {
          if (res.data?.status === 1) {
            console.log("View property recorded");
          }
        })
        .catch((err) => {
          console.error("Failed to record property view:", err);
        });
    }
  }, [propertyDetails?._id, user_id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchPropertyDetails = async (id) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/cust_api/get_property_details`,
        { property_id: id, user_id: userId },
      );

      const data = res.data?.data;
      console.log("API Response:", data);
      console.log("Price Onwards:", data.price_onwards);

      if (data?.property_images?.length > 0) {
        setPropertyImages(data.property_images);
      } else {
        setPropertyImages([]);
      }

      if (data?.amenities?.length > 0) {
        setAllAmenities(data.amenities);
      } else {
        setAllAmenities([]);
      }

      if (
        data?.tour_schedule?.length > 0 &&
        data.tour_schedule[0].status !== "Rejected" &&
        data.tour_schedule[0].status !== "Expired"
      ) {
        setTourSchedule(data.tour_schedule);
        const dateParts = data.tour_schedule[0].schedule_date.split("-");
        const year = dateParts[0].slice(-2); // "25"
        const month = parseInt(dateParts[1], 10) - 1; // month index
        const day = parseInt(dateParts[2], 10); // 24

        const monthName = new Date(0, month).toLocaleString("default", {
          month: "short",
        });

        const scheduledLabel = `Scheduled ${day} ${monthName} ${year}`;
        setScheduledDateLabel(scheduledLabel);
      } else {
        setTourSchedule([]);
        setScheduledDateLabel("Virtual Tour");
      }

      if (data?.property_details?.property_description) {
        setAboutPropertyText(data.property_details.property_description);
      } else {
        setAboutPropertyText("");
      }

      if (data?.property_details) {
        setPropertyDetails(data.property_details);
      } else {
        setPropertyDetails({});
      }

      if (
        data?.user_details &&
        Array.isArray(data.user_details) &&
        data.user_details.length > 0
      ) {
        setuserDetails(data.user_details[0]);
      } else {
        setuserDetails({
          full_name: "N/A",
          mobile_number: "N/A",
          email: "N/A",
        });
        console.warn("user_details is empty or invalid:", data?.user_details);
      }

      const pd = data.property_details;
      setLatitude(pd.latitude);
      setLongitude(pd.longitude);
    } catch (err) {
      console.error("Error fetching property details", err);
      setPropertyImages([]);
      setAllAmenities([]);
      setTourSchedule([]);
    }
  };

  useEffect(() => {
    fetchPropertyDetails(_id);
  }, [_id]);

  // for send Enquiry 'add_property_enquiry' api

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [enquiryStatus, setEnquiryStatus] = useState(null); // success or error

  // Existing useEffect (on mount)
  useEffect(() => {
    const mobileNumber = sessionStorage.getItem("Mobile_Number");
    if (mobileNumber) {
      setContactNumber(mobileNumber);
    }
  }, []);

  //  New useEffect to check sessionStorage and update contact number after login
  useEffect(() => {
    let interval;

    if (isLoginModalOpen === false && !contactNumber) {
      interval = setInterval(() => {
        const mobileNumber = sessionStorage.getItem("Mobile_Number");
        if (mobileNumber) {
          setContactNumber(mobileNumber);
          clearInterval(interval); // Stop checking once we have it
        }
      }, 500); // Check every 500ms
    }

    return () => clearInterval(interval); // Cleanup
  }, [isLoginModalOpen, contactNumber]);

  const userType = sessionStorage.getItem("user_type");
  // Handle Enquiry Form submission
  const handleEnquirySubmit = async (e) => {
    e.preventDefault();

    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
      setIsLoginModalOpen(true);
      return;
    }

    const enquiryData = {
      property_id: propertyDetails?._id,
      user_id: propertyDetails?.user_id,
      customer_id: accessToken,
      name,
      user_type: userType,
      contact_number: contactNumber,
      message,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/cust_api/add_property_enquiry`,
        enquiryData,
      );

      if (response.data.status) {
        setEnquiryStatus({
          type: "success",
          message: "Enquiry sent successfully!",
        });
        setName("");
        setMessage("");
      } else {
        setEnquiryStatus({ type: "error", message: "Failed to send enquiry!" });
      }
    } catch (error) {
      setEnquiryStatus({ type: "error", message: "Something went wrong!" });
    }
  };

  // Trigger login modal on input if not logged in
  const handleFieldChange = () => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken) {
      setIsLoginModalOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    const mobileNumber = sessionStorage.getItem("Mobile_Number");
    if (mobileNumber) {
      setIsLoggedIn(true);
      setContactNumber(mobileNumber);
      setIsLoginModalOpen(false);
    }
  };

  // for the schedule virtula tour
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scheduledDateLabel, setScheduledDateLabel] = useState("Virtual Tour");
  const [openVirtualTourAfterLogin, setOpenVirtualTourAfterLogin] =
    useState(false);
  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (token && openVirtualTourAfterLogin) {
      setIsModalOpen(true); // Open Virtual Tour
      setOpenVirtualTourAfterLogin(false); // Reset flag
    }
  }, [isLoggedIn]);

  // for share model
  const [openShareModalAfterLogin, setOpenShareModalAfterLogin] =
    useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (token && openShareModalAfterLogin) {
      setIsShareModalOpen(true); // Open Share modal
      setOpenShareModalAfterLogin(false); // Reset flag
    }
  }, [isLoggedIn]);

  const handleCloseShareModal = () => {
    setIsShareModalOpen(false);
  };

  //for the contact details
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [openContactModalAfterLogin, setOpenContactModalAfterLogin] =
    useState(false);

  const userName = sessionStorage.getItem("user_name");
  const userMobile = sessionStorage.getItem("Mobile_Number");

  useState(false);
  useEffect(() => {
    if (sessionStorage.getItem("accessToken") && openContactModalAfterLogin) {
      setIsContactModalOpen(true);
      setOpenContactModalAfterLogin(false);
    }
  }, [openContactModalAfterLogin]);

  // Add this line below all useState declarations or just before return:
  const overviewFields = [
    //["Status", propertyDetails?.available_status || null],
    ["Property Added Date", propertyDetails?.property_added_date ? formatDateToDDMMYYYY(propertyDetails.property_added_date) : null],
    ["Property Name", propertyDetails?.property_name || null],
    // [
    //   "Address",
    //   propertyDetails?.address &&
    //   propertyDetails?.city_name &&
    //   propertyDetails?.state &&
    //   propertyDetails?.zip_code
    //     ? `${propertyDetails.address}, ${propertyDetails.city_name}, ${propertyDetails.state}, ${propertyDetails.zip_code}`
    //     : null,
    // ],
    [
      "Address",
      propertyDetails?.address || null,
    ],
    [
      "Area",
      propertyDetails?.area
        ? formatArea(propertyDetails.area, propertyDetails.area_in)
        : null,
    ],
    ["Area Type", propertyDetails?.area_type || null],
    [
      "Price",
      propertyDetails?.property_category_type === "Rent"
        ? propertyDetails?.rent
          ? `₹${formatPrice(propertyDetails.rent)}`
          : null
        : propertyDetails?.property_price
          ? `₹${formatPrice(propertyDetails.property_price)}`
          : null,
    ],
    [
      "Deposit",
      propertyDetails?.custom_deposit_amount
        ? `₹${formatPrice(propertyDetails.custom_deposit_amount)}`
        : null,
    ],
    ["Listing Type", propertyDetails?.property_category_type || null],
    // ["Developer", propertyDetails?.developer || null],
    ["Building Type", propertyDetails?.building_type || null],
    ["Property Type", propertyDetails?.property_type || null],
    [
      "Bhk Type",
      propertyDetails?.bhk_type === "Studio"
        ? "Studio/Single Room"
        : propertyDetails?.bhk_type || null,
    ],
    ["Furnishing", propertyDetails?.furnished_type || null],
    // ["Plot No.", propertyDetails?.plot_no || null],
    ["Operating Since", propertyDetails?.operating_since || null],
    [
      "Available for Company Lease",
      propertyDetails?.available_for_company_lease || null,
    ],
    ["Available For", propertyDetails?.available_for || null],
    ["Suited For", propertyDetails?.suited_for || null],
    ["Room Type", propertyDetails?.room_type || null],
    ["Food Charges Included", propertyDetails?.food_charges_included || null],
  ].filter(([_, value]) => value);

  //more details

  const moreDetailsFields = [
    ["Food Available", propertyDetails?.food_available || null],
    ["Notice Period", propertyDetails?.notice_period || null],
    [
      "Notice Period Other Days",
      propertyDetails?.notice_period_other_days || null,
    ],
    [
      "Electricity Charges Included",
      propertyDetails?.electricity_charges_included || null,
    ],
    ["Total Beds", propertyDetails?.total_beds || null],
    ["Additional Rooms", propertyDetails?.additional_rooms || null],
    ["PG Rules", propertyDetails?.pg_rules || null],
    ["Gate Closing Time", propertyDetails?.gate_closing_time || null],
    ["Gate Closing Hour", propertyDetails?.gate_closing_hour || null],
    ["PG Services", propertyDetails?.pg_services || null],
    ["Age of Property", propertyDetails?.age_of_property || null],
    ["Office Space Type", propertyDetails?.office_space_type || null],
    ["Pantry", propertyDetails?.pantry || null],
    ["Personal Washroom", propertyDetails?.personal_washroom || null],
    ["Bathroom", propertyDetails?.bathroom || null],
    ["Covered Parking", propertyDetails?.covered_parking || null],
    ["Uncovered Parking", propertyDetails?.uncovered_parking || null],
    ["Balcony", propertyDetails?.balcony || null],
    ["Power Backup", propertyDetails?.power_backup || null],
    ["Lift Availability", propertyDetails?.lift_availability || null],
    ["Water Source", propertyDetails?.water_source || null],
    ["View", propertyDetails?.view || null],
    ["Flooring", propertyDetails?.flooring || null],
    ["Total Floor", propertyDetails?.total_floor || null],
    ["Property Floor", propertyDetails?.property_floor || null],
    ["Facing", propertyDetails?.facing || null],
    ["Ceiling Height", propertyDetails?.ceiling_height || null],
    ["Parking Availability", propertyDetails?.parking_availability || null],
    ["Min Lockin Period", propertyDetails?.min_lockin_period || null],
    ["Seat Type", propertyDetails?.seat_type || null],
    [
      "Number of Seats Available",
      propertyDetails?.number_of_seats_available || null,
    ],
    ["Plot No.", propertyDetails?.plot_no || null],
    // ["Loan Availability", propertyDetails?.loan_availability || null],
    //some other fileds
    ["RERA ID", propertyDetails?.property_no || null],
    ["Landmarks", propertyDetails?.landmarks || null],
    ["Furnishing", propertyDetails?.furnished_type || null],
    ["Near Landmark", propertyDetails?.near_landmark || null],
    ["Flat Name", propertyDetails?.flat_name || null],
    ["Maintenance Frequency", propertyDetails?.maintenance_frequency || null],
    [
      "Maintenance Included",
      propertyDetails?.maintenance_included ? "Yes" : "No",
    ],
    ["Security Deposit Type", propertyDetails?.security_deposit_type || null],
    [
      "Available for Company Lease",
      propertyDetails?.available_for_company_lease || null,
    ],
    ["Available For", propertyDetails?.available_for || null],
    ["Suited For", propertyDetails?.suited_for || null],
    ["Room Type", propertyDetails?.room_type || null],
    ["Food Charges Included", propertyDetails?.food_charges_included || null],
    // [
    //   "Virtual Tour Availability",
    //   propertyDetails?.virtual_tour_availability || null,
    // ],
    ["Property Category Type", propertyDetails?.property_category_type || null],
    ["Rent", propertyDetails?.rent || null],
    ["Rent Duration", propertyDetails?.rent_duration || null],
    ["Property Added Date", propertyDetails?.property_added_date ? formatDateToDDMMYYYY(propertyDetails.property_added_date) : null],
    ["Possession Status", propertyDetails?.possession_status || null],
    ["Possession Date", propertyDetails?.possession_date ? formatDateToDDMMYYYY(propertyDetails.possession_date) : null],

    ["Area Type", propertyDetails?.area_type || null],
    ["Built up Area", propertyDetails?.area || null],
    [
      "Built-up Area Unit",
      propertyDetails?.area_in ? propertyDetails.area_in.toLowerCase() : null,
    ],
    ["Carpet Area", propertyDetails?.carpet_area || null],
    [
      "Carpet Area Unit",
      propertyDetails?.carpet_area_unit
        ? propertyDetails.carpet_area_unit.toLowerCase()
        : null,
    ],
    ["Available Status", propertyDetails?.available_status || null],
    ["Investment Options", propertyDetails?.investment_options || null],
    ["All Inclusive Price", propertyDetails?.all_inclusive_price || null],
    ["Price Onwards", propertyDetails?.price_onwards || null],
    ["Price Negotiable", propertyDetails?.price_negotiable || null],
    [
      "Tax And Government Charges",
      propertyDetails?.tax_and_goverment_charges || null,
    ],
    [
      "Electricity And Water Charges",
      propertyDetails?.electricity_and_water_charges || null,
    ],
    ["No Of Open Sides", propertyDetails?.no_of_open_sides || null],
    ["No Of Peoples", propertyDetails?.no_of_peoples || null],
    ["Type Of Construction", propertyDetails?.type_of_construction || null],
    ["Quality Rating", propertyDetails?.quality_rating || null],
    ["Central AC", propertyDetails?.central_AC || null],
    ["Total Number Parking", propertyDetails?.total_number_parking || null],
    ["Block", propertyDetails?.block || null],
    ["Developer", propertyDetails?.developer || null],
    ["Project Type", propertyDetails?.project_type || null],
    ["Transaction Type", propertyDetails?.transaction_type || null],
    ["Builder Floor Type", propertyDetails?.builder_floor_type || null],
    // ["Attached Bathroom", propertyDetails?.attached_bathroom || null],
    // ["Attached Balcony", propertyDetails?.attached_balcony || null],
    // ["Pantry Option", propertyDetails?.pantry_option || null],
    // ["Parking Types", propertyDetails?.parking_types || null],
    ["Possession By", propertyDetails?.possession_by || null],
    [
      "Property Dimensions Length",
      propertyDetails?.property_dimensions_length || null,
    ],
    [
      "Property Dimensions Breadth",
      propertyDetails?.property_dimensions_breadth || null,
    ],
    ["Length Of Land", propertyDetails?.length_of_land || null],
    ["Breadth Of Land", propertyDetails?.breadthOfLand || null],
    ["Open Sides Of Land", propertyDetails?.openSidesOfLand || null],
    ["Construction On Land", propertyDetails?.constructionOnLand || null],
    [
      "Selected Construction On Land",
      propertyDetails?.selectedConstructionOnLand || null,
    ],
    ["Commercial Washroom", propertyDetails?.commercial_washroom || null],
    [
      "Number Of Minimum Bathrooms",
      propertyDetails?.number_of_minimum_bathrooms || null,
    ],
    ["Maintenance Cost", propertyDetails?.maintenance_cost || null],
    ["Available Beds", propertyDetails?.available_beds || null],
    [
      "Available From",
      propertyDetails?.possession_date || propertyDetails?.available_from
        ? formatDateToDDMMYYYY(
          propertyDetails?.possession_date || propertyDetails?.available_from,
          propertyDetails?.property_added_date
        )
        : null,
    ],
    ["Available On", propertyDetails?.available_on ? formatDateToDDMMYYYY(propertyDetails.available_on) : null],

    ["No Of Cabines", propertyDetails?.no_of_cabines || null],
    ["No Of Meeting Rooms", propertyDetails?.no_of_meeting_Rooms || null],
    ["No Of Conference Room", propertyDetails?.no_of_conference_room || null],
    // ["Posted By Admin", propertyDetails?.posted_by_admin || null],
    // ["UPS", propertyDetails?.ups || null],
    // ["Oxygen Duct", propertyDetails?.oxygenDuct || null],
    // ["Central AC", propertyDetails?.central_AC || null],
    // ["Conference Room", propertyDetails?.conferenceRoom || null],
    // ["Washroom", propertyDetails?.washroom || null],
    // ["Washroom Check", propertyDetails?.washroom_Check || null],
    ["Reception Area", propertyDetails?.reception_area || null],
    // ["Created At",
    //   propertyDetails?.created_at
    //     ? new Date(propertyDetails.created_at).toLocaleDateString("en-GB")
    //     : null,
    // ],

    // ["Updated At",
    //   propertyDetails?.updated_at
    //     ? new Date(propertyDetails.updated_at).toLocaleDateString("en-GB")
    //     : null,
    // ],
  ].filter(([_, value]) => value);
  const statusTimelineItems = [];

  const addStatusItem = ({
    icon,
    title,
    value,
    bgColor,
    iconColor,
  }) => {
    if (
      !value ||
      value.toString().trim() === "" ||
      value.toString().toLowerCase() === "n/a" ||
      value.toString().toLowerCase() === "null"
    ) {
      return;
    }

    statusTimelineItems.push({
      icon,
      title,
      value,
      bgColor,
      iconColor,
    });
  };
  addStatusItem({
    icon: <CheckCircle weight="fill" />,
    title: "Availability",
    value: propertyDetails?.available_status,
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
  });
  addStatusItem({
    icon: <CalendarBlank weight="fill" />,
    title: "Available From",
    value: formatDateToDDMMYYYY(
      propertyDetails?.possession_date || propertyDetails?.available_from,
      propertyDetails?.property_added_date
    ),
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  });

  addStatusItem({
    icon: <House weight="fill" />,
    title: "Possession",
    value: propertyDetails?.possession_status,
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
  });

  addStatusItem({
    icon: <Clock weight="fill" />,
    title: "Last Updated",
    value: propertyDetails?.updated_at
      ? formatDateToDDMMYYYY(propertyDetails.updated_at)
      : formatDateToDDMMYYYY(propertyDetails?.property_added_date),
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
  });

  addStatusItem({
    icon: <Hourglass weight="fill" />,
    title: "Property Age",
    value: propertyDetails?.age_of_property,
    bgColor: "bg-amber-50",
    iconColor: "text-amber-700",
  });

  const handleClick = () => {
    history.push("/featuredDashboard");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (
      isShareModalOpen ||
      isContactModalOpen ||
      showAllImages ||
      isModalOpen
    ) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isShareModalOpen, isContactModalOpen, showAllImages, isModalOpen]);

  const getTimeAgo = (dateString) => {
    if (!dateString) return "";

    const now = new Date();
    const created = new Date(dateString);

    const diffMs = now - created;

    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes} min ago`;
    }

    if (hours < 24) {
      return `${hours} hr${hours > 1 ? "s" : ""} ago`;
    }

    if (days < 30) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }

    const months = Math.floor(days / 30);

    if (months < 12) {
      return `${months} month${months > 1 ? "s" : ""} ago`;
    }

    const years = Math.floor(months / 12);

    return `${years} year${years > 1 ? "s" : ""} ago`;
  };

  // ==========================================================
  // New UI state + derived values (all hooks stay above `return`)
  // ==========================================================
  const headerHeight = useFixedHeaderHeight();
  const tabsTop = headerHeight + 10;
  const sectionScrollMargin = headerHeight + 96;
  const userLocation = readUserLocation();
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [aboutOpen, setAboutOpen] = useState(true);

  useEffect(() => {
    setGalleryIndex(0);
  }, [_id]);

  const isRentLikeMain =
    propertyDetails?.property_category_type === "Rent" ||
    propertyDetails?.property_category_type === "PG/Co-living";
  const mainPriceRaw = isRentLikeMain ? propertyDetails?.rent : propertyDetails?.property_price;
  const mainPriceNum = Number(mainPriceRaw);
  // FIX: ToWords threw on an empty/invalid price and broke the page.
  const priceWords =
    Number.isFinite(mainPriceNum) && mainPriceNum > 0
      ? `${toWords.convert(mainPriceNum)} Only`
      : "";

  const CATEGORY_BADGE = {
    Buy: "For Buy",
    Rent: "For Rent",
    "Commercial Buy": "Commercial Buy",
    "Commercial Lease": "Commercial Lease",
    "PG/Co-living": "PG / Co-living",
  };

  // Cover first, then every other photo once.
  const galleryImages = [
    propertyDetails?.cover_image,
    ...propertyImages.map((img) => img.image),
  ].filter((src, i, arr) => src && arr.indexOf(src) === i);
  const galleryTotal = galleryImages.length;
  const currentImage = galleryTotal ? galleryImages[galleryIndex % galleryTotal] : null;
  const thumbs = galleryImages.slice(1, 4);
  const hiddenCount =
    Math.max(0, galleryTotal - 4) + (propertyDetails?.property_video ? 1 : 0);

  const stats = [
    propertyDetails?.bhk_type && {
      icon: Bed,
      value: propertyDetails.bhk_type === "Studio" ? "Studio/Single Room" : propertyDetails.bhk_type,
      label: "Configuration",
    },
    propertyDetails?.area && {
      icon: ArrowsOut,
      value: formatArea(propertyDetails.area, propertyDetails.area_in),
      label: "Built Up Area",
    },
    propertyDetails?.bathroom && {
      icon: Bathtub,
      value: `${propertyDetails.bathroom} Bathroom${Number(propertyDetails.bathroom) > 1 ? "s" : ""}`,
      label: "Bathrooms",
    },
  ].filter(Boolean);

  const tabs = [
    { key: "overview", label: "Overview", icon: House, ref: overviewRef, show: overviewFields.length > 0 },
    { key: "statusTimeline", label: "Status & Timeline", icon: CalendarBlank, ref: statusTimelineRef, show: statusTimelineItems.length > 0 },
    { key: "moreDetails", label: "More Details", icon: FileText, ref: moreDetailsRef, show: moreDetailsFields.length > 0 },
    { key: "amenities", label: "Amenities", icon: SquaresFour, ref: amenitiesRef, show: true },
    { key: "about", label: "About Property", icon: Info, ref: aboutRef, show: true },
    { key: "location", label: "Location", icon: MapPin, ref: locationRef, show: true },
    { key: "nearby", label: "Nearby", icon: MapTrifold, ref: nearbyRef, show: !!propertyDetails?._id },
  ].filter((t) => t.show);

  // Highlight the tab of the section you're looking at while scrolling.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;
    const pairs = [
      ["overview", overviewRef],
      ["statusTimeline", statusTimelineRef],
      ["moreDetails", moreDetailsRef],
      ["amenities", amenitiesRef],
      ["about", aboutRef],
      ["location", locationRef],
      ["nearby", nearbyRef],
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) {
          const hit = pairs.find(([, ref]) => ref.current === visible[0].target);
          if (hit) setActiveSection(hit[0]);
        }
      },
      { rootMargin: `-${headerHeight + 110}px 0px -55% 0px` },
    );
    pairs.forEach(([, ref]) => ref.current && observer.observe(ref.current));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertyDetails?._id, headerHeight, allAmenities.length]);

  // Contact Details: uses one free (or paid) view, then opens the popup.
  const handleContactClick = () => {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      setOpenContactModalAfterLogin(true);
      setIsLoginModalOpen(true);
      return;
    }
    if (!userDetails) {
      toast.error("User data not found");
      return;
    }
    // FIX: the count was being SET to -1 instead of reduced by one.
    if (freeViewCount > 0) {
      setFreeViewCount((c) => c - 1);
      handleAddCount(-1);
    } else if (paidViewCount > 0) {
      setPaidViewCount((c) => c - 1);
      handleAddCount(-1);
    }
    setIsContactModalOpen(true);
  };

  const handleVirtualTourClick = () => {
    const token = sessionStorage.getItem("accessToken");
    if (scheduledDateLabel !== "Virtual Tour") {
      history.push({ pathname: "/dashboard", state: { page: "myVirtualtour" } });
    } else if (token) {
      setIsModalOpen(true);
    } else {
      setOpenVirtualTourAfterLogin(true);
      setIsLoginModalOpen(true);
    }
  };

  const toggleFavourite = () => {
    if (propertyDetails.is_favorite) {
      removeFromFavoritesRecommendedProperty(propertyDetails.favorite_id);
    } else {
      addToFavoritesRecommendedProperty(propertyDetails._id);
    }
  };

  const shareThisProperty = () => openShareModal(window.location.href, propertyDetails?._id);

  const copyShareLink = (url) => {
    const fallback = (text) => {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        alert(document.execCommand("copy") ? "Link copied!" : "Copy failed");
      } catch (err) {
        console.error("Fallback: Could not copy text: ", err);
        alert("Copy failed");
      }
      document.body.removeChild(textArea);
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(url)
        .then(() => alert("Link copied!"))
        .catch(() => fallback(url));
    } else {
      fallback(url);
    }
  };

  const tourBtnClass =
    tourSchedule?.[0]?.status === "Accepted"
      ? "bg-green-500 border-green-500 text-white hover:bg-green-600"
      : scheduledDateLabel === "Virtual Tour"
        ? "bg-white border-[#D61F45] text-[#D61F45] hover:bg-[#FDE8EC]"
        : "bg-amber-400 border-amber-400 text-[#17253a] hover:bg-amber-500";

  const iconBtn =
    "flex items-center justify-center gap-2 flex-shrink-0 w-full sm:w-12 h-12 text-[14px] font-semibold bg-white border-[1.5px] border-[#FAD3DB] rounded-xl text-[#D61F45] transition-colors hover:bg-[#FDE8EC] hover:border-[#D61F45]";

  return (
    <>
      <div className="w-full px-3 pt-4 pb-10 mx-auto max-w-[1440px] sm:px-6 lg:px-10 bg-[#FFF7F9] detail-page-container">
        {/* ==================================================
            HERO — name, address, price
        ================================================== */}
        <div className="relative overflow-hidden border border-[#FDE8EC] rounded-3xl bg-gradient-to-r from-white via-[#FFF1F4] to-[#FDE8EC] detail-header-card">
          <div aria-hidden="true" className="absolute bottom-0 items-end hidden gap-1 pointer-events-none right-56 lg:flex text-[#D61F45] opacity-[0.12]">
            <Buildings size={90} weight="fill" />
            <Buildings size={140} weight="fill" />
            <Buildings size={110} weight="fill" />
          </div>

          <div className="relative p-4 md:p-7">
            <button
              type="button"
              onClick={() => (window.history.length > 1 ? history.goBack() : history.push("/"))}
              className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-[14px] font-semibold text-[#D61F45] bg-white border border-[#FAD3DB] rounded-full shadow-sm hover:bg-[#FDE8EC] transition-colors"
            >
              <ArrowLeft size={16} weight="bold" />
              Back to Listings
            </button>

            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex items-start min-w-0 gap-4">
                <span className="flex items-center justify-center flex-shrink-0 text-white rounded-full w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#D61F45] to-[#B91C3C] shadow-[0_8px_20px_rgba(214,31,69,0.35)]">
                  <House size={30} weight="fill" />
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="m-0 text-2xl font-extrabold leading-tight md:text-[38px] text-[#17253a] break-words detail-title">
                      {propertyDetails?.property_name || "Property"}
                    </h1>
                    {propertyDetails?.mark_as_featured === "Yes" && (
                      <span className="flex items-center gap-1.5 px-3 py-1 text-[13px] font-bold rounded-lg bg-[#FDE8EC] text-[#D61F45]">
                        <Crown size={15} weight="fill" />
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="flex items-start gap-1.5 m-0 mt-2 text-[14px] md:text-[16px] text-gray-600 max-w-[80ch] detail-address">
                    <MapPin size={20} weight="fill" className="flex-shrink-0 mt-0.5 text-[#D61F45]" />
                    <span className="break-words">{propertyDetails?.address || "Address N/A"}</span>
                  </p>
                </div>
              </div>

              {(propertyDetails?.property_price || propertyDetails?.rent) && (
                <div className="flex-shrink-0 pl-[4.5rem] lg:pl-0 lg:text-right detail-price-block">
                  <p className="m-0 text-3xl font-extrabold md:text-[40px] leading-none text-[#D61F45]">
                    ₹ {formatPrice(mainPriceRaw)}
                    {isRentLikeMain && (
                      <span className="ml-1 text-[16px] font-semibold text-gray-600">
                        / {propertyDetails?.rent_duration || "Per Month"}
                      </span>
                    )}
                  </p>
                  {priceWords && (
                    <p className="m-0 mt-1.5 text-[13px] font-medium text-gray-500">{priceWords}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ==================================================
            Quick stats + actions
        ================================================== */}
        <div className="flex flex-col gap-4 p-3 mt-4 bg-white border border-[#FDE8EC] md:p-4 lg:flex-row lg:items-center lg:justify-between rounded-2xl shadow-[0_8px_24px_rgba(214,31,69,0.06)] detail-info-row">
          {stats.length > 0 && (
            <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:flex lg:gap-0">
              {stats.map(({ icon: Icon, value, label }, i) => (
                <div
                  key={label}
                  className={`flex flex-col items-center gap-2 text-center sm:flex-row sm:gap-3 sm:text-left lg:px-6 ${i === 0 ? "lg:pl-1" : "lg:border-l lg:border-[#FDE8EC]"}`}
                >
                  <span className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full bg-[#FDE8EC] text-[#D61F45]">
                    <Icon size={24} weight="fill" />
                  </span>
                  <div className="leading-tight">
                    <p className="m-0 text-[14px] sm:text-[16px] font-bold text-[#17253a]">{value}</p>
                    <p className="m-0 text-[12px] text-gray-500">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center detail-actions-row">
            {propertyDetails.virtual_tour_availability === "Yes" && (
              <button
                type="button"
                onClick={handleVirtualTourClick}
                className={`flex items-center justify-center gap-2 px-3 sm:px-5 h-12 text-[14px] sm:text-[15px] font-semibold whitespace-nowrap border-[1.5px] rounded-xl transition-colors detail-action-btn ${tourBtnClass}`}
              >
                <VideoCamera size={20} weight="fill" />
                {scheduledDateLabel}
                {scheduledDateLabel !== "Virtual Tour" && <ArrowRight size={16} weight="bold" />}
              </button>
            )}
            <button
              type="button"
              onClick={handleContactClick}
              className="flex items-center justify-center gap-2 px-3 sm:px-6 h-12 text-[14px] sm:text-[15px] font-semibold whitespace-nowrap text-white rounded-xl bg-gradient-to-r from-[#D61F45] to-[#B91C3C] shadow-[0_6px_18px_rgba(214,31,69,0.35)] hover:shadow-[0_10px_24px_rgba(214,31,69,0.45)] transition-shadow detail-action-btn detail-contact-btn"
            >
              <Phone size={19} weight="fill" />
              Contact Details
            </button>
            <button
              type="button"
              onClick={toggleFavourite}
              title={propertyDetails.is_favorite ? "Remove from favourites" : "Save to favourites"}
              aria-label={propertyDetails.is_favorite ? "Remove from favourites" : "Save to favourites"}
              className={iconBtn + " detail-icon-btn"}
            >
              <Heart size={22} weight={propertyDetails.is_favorite ? "fill" : "bold"} />
              <span className="sm:hidden">{propertyDetails.is_favorite ? "Saved" : "Save"}</span>
            </button>
            <button
              type="button"
              onClick={shareThisProperty}
              title="Share"
              aria-label="Share property"
              className={iconBtn + " detail-icon-btn"}
            >
              <ShareNetwork size={22} weight="bold" />
              <span className="sm:hidden">Share</span>
            </button>
          </div>
        </div>

        {isModalOpen && (
          <GetScheduleVTourproperty
            onClose={() => setIsModalOpen(false)}
            propertyDetails={propertyDetails}
            setScheduledDateLabel={setScheduledDateLabel}
            setIsModalOpen={setIsModalOpen}
          />
        )}
        {isContactModalOpen &&
          userDetails &&
          !Array.isArray(userDetails) &&
          userDetails.full_name && (
            <ContactDetails
              onClose={() => setIsContactModalOpen(false)}
              fullName={
                freeViewCount <= 0 && paidViewCount <= 0
                  ? `****${userDetails.full_name.slice(-1) || "N/A"}`
                  : userDetails.full_name || "N/A"
              }
              mobile={
                freeViewCount <= 0 && paidViewCount <= 0
                  ? `********${userDetails.mobile_number?.slice(-3) || "000"}`
                  : userDetails.mobile_number || "N/A"
              }
              userEmail={
                freeViewCount <= 0 && paidViewCount <= 0
                  ? userDetails.email
                    ? `*******${userDetails.email.slice(-3)}`
                    : "N/A"
                  : userDetails.email || "N/A"
              }
              showUpgradePrompt={freeViewCount <= 0 && paidViewCount <= 0}
            />
          )}

        {/* ==================================================
            Main grid: content (left) + enquiry (right)
        ================================================== */}
        <div className="grid grid-cols-1 gap-5 mt-5 lg:grid-cols-[minmax(0,1fr)_380px] detail-main-grid">
          <div className="min-w-0 detail-left-col">
            {/* ---------- Gallery ---------- */}
            <div className="p-3 bg-white border border-[#FDE8EC] rounded-3xl shadow-[0_10px_30px_rgba(214,31,69,0.06)] detail-image-row">
              <div className={`grid gap-3 ${thumbs.length ? "md:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)]" : ""}`}>
                {/* Main photo */}
                <div className="relative overflow-hidden rounded-2xl bg-[#FFF1F4] h-64 sm:h-80 md:h-[420px]">
                  {currentImage ? (
                    <img
                      src={currentImage}
                      alt={propertyDetails?.property_name || "Property"}
                      className="object-cover w-full h-full cursor-pointer detail-cover-image"
                      onClick={() => setShowAllImages(true)}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-[#D61F45]">
                      <Images size={48} />
                    </div>
                  )}
                  <Watermark size="text-4xl" />

                  <div className="absolute flex flex-wrap gap-2 top-3 left-3">
                    {CATEGORY_BADGE[propertyDetails?.property_category_type] && (
                      <span className="px-3 py-1.5 text-[13px] font-semibold text-white rounded-lg shadow bg-[#17253a]/80 backdrop-blur-sm">
                        {CATEGORY_BADGE[propertyDetails.property_category_type]}
                      </span>
                    )}
                    {propertyDetails?.mark_as_featured === "Yes" && (
                      <span className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-semibold text-white rounded-lg shadow bg-[#D61F45]">
                        <Crown size={15} weight="fill" />
                        Featured
                      </span>
                    )}
                  </div>

                  {galleryTotal > 1 && (
                    <>
                      <button
                        type="button"
                        aria-label="Previous photo"
                        onClick={() => setGalleryIndex((i) => (i - 1 + galleryTotal) % galleryTotal)}
                        className="absolute flex items-center justify-center -translate-y-1/2 bg-white rounded-full shadow-lg w-11 h-11 left-3 top-1/2 text-[#D61F45] hover:scale-105 transition-transform"
                      >
                        <CaretLeft size={20} weight="bold" />
                      </button>
                      <button
                        type="button"
                        aria-label="Next photo"
                        onClick={() => setGalleryIndex((i) => (i + 1) % galleryTotal)}
                        className="absolute flex items-center justify-center -translate-y-1/2 bg-white rounded-full shadow-lg w-11 h-11 right-3 top-1/2 text-[#D61F45] hover:scale-105 transition-transform"
                      >
                        <CaretRight size={20} weight="bold" />
                      </button>
                      <span className="absolute flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-semibold text-white rounded-lg bottom-3 left-3 bg-black/60 backdrop-blur-sm">
                        <Images size={15} />
                        {(galleryIndex % galleryTotal) + 1}/{galleryTotal}
                      </span>
                    </>
                  )}
                </div>

                {/* Thumbnails */}
                {thumbs.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 md:grid-cols-1 md:grid-rows-3 md:h-[420px]">
                    {thumbs.map((src, i) => {
                      const isLast = i === thumbs.length - 1 && hiddenCount > 0;
                      return (
                        <button
                          type="button"
                          key={src}
                          onClick={() => (isLast ? setShowAllImages(true) : setGalleryIndex(i + 1))}
                          className={`relative h-24 overflow-hidden sm:h-28 md:h-auto rounded-2xl ring-offset-2 transition-shadow ${galleryIndex % galleryTotal === i + 1 ? "ring-2 ring-[#D61F45]" : ""
                            }`}
                        >
                          <img src={src} alt={`Photo ${i + 2}`} className="object-cover w-full h-full detail-gallery-image" />
                          <Watermark size="text-lg" />
                          {isLast && (
                            <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-white bg-black/55">
                              <Images size={26} />
                              <span className="text-[15px] font-bold">+{hiddenCount} Photos</span>
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* ---------- Section tabs (sticky) ---------- */}
            <div
              className="sticky z-20 pt-2 pb-1 mt-2 -mx-1 px-1 bg-[#FFF7F9] detail-tabs"
              style={{ top: headerHeight }}
            >
              <div className="flex gap-1 p-2 overflow-x-auto bg-white border border-[#FDE8EC] rounded-2xl shadow-[0_8px_24px_rgba(214,31,69,0.08)]">
                {tabs.map(({ key, label, icon: Icon, ref }) => {
                  const active = activeSection === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => scrollToSection(ref, key)}
                      className={`flex items-center flex-shrink-0 gap-2 px-4 py-2.5 text-[14px] font-semibold rounded-xl transition-all detail-tab-btn ${active
                        ? "bg-gradient-to-r from-[#D61F45] to-[#B91C3C] text-white shadow-[0_6px_16px_rgba(214,31,69,0.3)]"
                        : "text-gray-600 hover:text-[#D61F45] hover:bg-[#FFF1F4]"
                        }`}
                    >
                      <Icon size={18} weight={active ? "fill" : "regular"} />
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ---------- Overview ---------- */}
            {overviewFields.length > 0 && (
              <SectionCard
                sectionRef={overviewRef}
                scrollMargin={sectionScrollMargin}
                icon={ClipboardText}
                first="Basic"
                accent="Information"
                subtitle="Key facts about this property at a glance."
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
                  {overviewFields.map(([key, value]) => {
                    const Icon = iconForLabel(key);
                    return (
                      <div key={key} className="flex items-start gap-3 py-3 border-b border-[#FDE8EC]">
                        <Icon size={20} className="flex-shrink-0 mt-0.5 text-[#D61F45]" />
                        <span className="w-36 flex-shrink-0 text-[14px] text-gray-500">{key}</span>
                        <span className="flex-1 min-w-0 text-[14px] font-medium text-[#17253a] break-words">{value}</span>
                      </div>
                    );
                  })}
                </div>
              </SectionCard>
            )}

            {/* ---------- Status & Timeline ---------- */}
            {statusTimelineItems.length > 0 && (
              <SectionCard
                sectionRef={statusTimelineRef}
                scrollMargin={sectionScrollMargin}
                icon={Clock}
                first="Status &"
                accent="Timeline"
                subtitle="Track the current status and important timeline details of this property."
              >
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {statusTimelineItems.map((item) => (
                    <div
                      key={item.title}
                      className={`flex items-center gap-3 p-4 border border-black/5 rounded-2xl ${item.bgColor}`}
                    >
                      <span className={`flex items-center justify-center flex-shrink-0 w-12 h-12 bg-white rounded-full shadow-sm text-2xl ${item.iconColor}`}>
                        {item.icon}
                      </span>
                      <div className="min-w-0">
                        <p className="m-0 text-[12px] text-gray-500">{item.title}</p>
                        <p className="m-0 mt-0.5 text-[16px] font-bold text-[#17253a] break-words">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>
            )}

            {/* ---------- More Details ---------- */}
            {moreDetailsFields.length > 0 && (
              <SectionCard
                sectionRef={moreDetailsRef}
                scrollMargin={sectionScrollMargin}
                icon={FileText}
                first="More"
                accent="Details"
                subtitle="Complete specifications and additional information about this property."
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8">
                  {moreDetailsFields.map(([label, value]) => {
                    const Icon = iconForLabel(label);
                    return (
                      <div key={label} className="flex items-center gap-3 py-3 border-b border-[#FDE8EC]">
                        <span className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-xl bg-[#FFF1F4] text-[#D61F45]">
                          <Icon size={20} />
                        </span>
                        <div className="min-w-0">
                          <p className="m-0 text-[11px] font-medium tracking-wide text-gray-500 uppercase">{label}</p>
                          <p className="m-0 mt-0.5 text-[14px] font-bold text-[#17253a] break-words">{value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </SectionCard>
            )}

            {/* ---------- Amenities ---------- */}
            <SectionCard
              sectionRef={amenitiesRef}
              scrollMargin={sectionScrollMargin}
              icon={Diamond}
              first="Property"
              accent="Amenities"
              subtitle="Features and facilities available with this property."
            >
              {allAmenities.length === 0 ? (
                <p className="m-0 text-[14px] text-gray-500">No amenities listed for this property.</p>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {visibleAmenities.map((amenity, index) => (
                      <div
                        key={amenity._id || amenity.name || index}
                        className="flex items-center gap-3 px-3 py-3 bg-white border border-[#FDE8EC] rounded-2xl hover:border-[#FAD3DB] transition-colors"
                      >
                        <span className="flex items-center justify-center flex-shrink-0 overflow-hidden w-11 h-11 rounded-xl bg-[#FFF1F4] text-[#D61F45]">
                          {amenity.icon ? (
                            <img
                              src={`${process.env.REACT_APP_API_URL}/media/${amenity.icon}`}
                              alt={amenity.name}
                              className="object-contain w-7 h-7"
                            />
                          ) : (
                            <CheckCircle size={22} weight="fill" />
                          )}
                        </span>
                        <span className="text-[15px] font-medium text-[#17253a]">{amenity.name}</span>
                      </div>
                    ))}
                  </div>
                  {allAmenities.length > 8 && (
                    <button
                      type="button"
                      onClick={() => setShowAll((v) => !v)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 mt-4 text-[14px] font-semibold text-[#D61F45] bg-[#FFF1F4] rounded-xl hover:bg-[#FDE8EC]"
                    >
                      {showAll ? "Show less" : `+${allAmenities.length - 8} More`}
                      <CaretDown size={14} weight="bold" className={showAll ? "rotate-180" : ""} />
                    </button>
                  )}
                </>
              )}
            </SectionCard>

            {/* ---------- About Property (collapsible) ---------- */}
            <SectionCard
              sectionRef={aboutRef}
              scrollMargin={sectionScrollMargin}
              icon={FileText}
              first="About"
              accent="Property"
              subtitle="Detailed information and description about this property."
              right={
                <button
                  type="button"
                  onClick={() => setAboutOpen((v) => !v)}
                  aria-expanded={aboutOpen}
                  aria-label={aboutOpen ? "Collapse description" : "Expand description"}
                  className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-white rounded-full shadow-md text-[#17253a] hover:text-[#D61F45]"
                >
                  <CaretDown size={18} weight="bold" className={`transition-transform ${aboutOpen ? "rotate-180" : ""}`} />
                </button>
              }
            >
              {aboutOpen && (
                <p className="m-0 text-[15px] leading-relaxed text-gray-700 whitespace-pre-line">
                  {aboutPropertyText || "No description has been added for this property yet."}
                </p>
              )}
            </SectionCard>

            {/* ---------- Location ---------- */}
            <SectionCard
              sectionRef={locationRef}
              scrollMargin={sectionScrollMargin}
              icon={MapPin}
              first="Property"
              accent="Location"
              subtitle="View the exact location of this property on the map."
              right={
                Number(latitude) && Number(longitude) ? (
                  <a
                    href={`https://www.google.com/maps?q=${latitude},${longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="items-center flex-shrink-0 hidden gap-1.5 px-4 py-2 text-[13px] font-semibold no-underline text-[#D61F45] bg-white border-[1.5px] border-[#D61F45] rounded-xl sm:flex hover:bg-[#FDE8EC] hover:no-underline"
                  >
                    <ArrowSquareOut size={16} weight="bold" />
                    Open in Maps
                  </a>
                ) : null
              }
            >
              {/* FIX: the map used to load at 0,0 (in the ocean) before the
                  property's coordinates arrived. */}
              {Number(latitude) && Number(longitude) ? (
                <iframe
                  title="Property location"
                  className="w-full h-64 md:h-[420px] rounded-2xl border border-[#FDE8EC]"
                  src={`https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 text-center rounded-2xl bg-[#FFF7F9] border border-dashed border-[#FAD3DB]">
                  <MapPin size={36} weight="fill" className="text-[#D61F45]" />
                  <p className="m-0 mt-2 text-[14px] text-gray-500">Location is not available for this property.</p>
                </div>
              )}
            </SectionCard>

            {/* ---------- Nearby Connectivity (Metro + Bus Stops · Schools + Hospitals · IT Parks + Malls + Markets) ---------- */}
            {propertyDetails?._id && (
              <SectionCard
                sectionRef={nearbyRef}
                scrollMargin={sectionScrollMargin}
                icon={MapTrifold}
                first="Nearby"
                accent="Connectivity"
                subtitle="Metro & bus stops, schools & hospitals, IT parks, malls and markets around this property."
              >
                <NearbyConnectivity
                  propertyId={propertyDetails._id}
                  baseUrl={`${process.env.REACT_APP_API_URL}/cust_api`}
                  latitude={latitude}
                  longitude={longitude}
                />
              </SectionCard>
            )}
          </div>

          {/* ==================================================
              Enquiry card (sticky)
          ================================================== */}
          <aside className="detail-enquiry-col">
            <div
              className="lg:sticky"
              style={{ top: tabsTop }}
            >
              <div className="p-5 bg-white border border-[#FDE8EC] rounded-3xl shadow-[0_14px_40px_rgba(214,31,69,0.1)] detail-enquiry-card">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-white rounded-2xl bg-gradient-to-br from-[#D61F45] to-[#B91C3C] shadow-[0_6px_14px_rgba(214,31,69,0.35)]">
                    <ChatCircleText size={24} weight="fill" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="m-0 text-[20px] font-bold text-[#17253a]">
                      Make an <span className="text-[#D61F45]">Enquiry</span>
                    </h3>
                    <p className="m-0 text-[13px] text-gray-500">Get in touch with the owner for more details</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 py-4 mt-4 border-y border-[#FDE8EC] detail-agent-row">
                  <Link
                    to={`/agentdetail/${userDetails?._id}`}
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="flex-shrink-0 block overflow-hidden bg-white rounded-full shadow-md w-14 h-14 ring-2 ring-[#FDE8EC]"
                  >
                    <img
                      src={userDetails?.profile_image ? userDetails.profile_image : "/image/app.png"}
                      alt={userDetails?.full_name || "Owner"}
                      className="object-contain w-full h-full"
                    />
                  </Link>
                  <div className="min-w-0 leading-tight">
                    <p className="m-0 text-[16px] font-bold text-[#17253a] truncate">{userDetails.full_name || "N/A"}</p>
                    <p className="m-0 mt-0.5 text-[13px] text-gray-500">{userDetails.user_type || "N/A"}</p>
                  </div>
                </div>

                <form onSubmit={handleEnquirySubmit} className="flex flex-col gap-3 mt-4">
                  <label className="relative block">
                    <User size={18} className="absolute -translate-y-1/2 pointer-events-none left-3.5 top-1/2 text-[#D61F45]" />
                    <input
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        handleFieldChange();
                      }}
                      className="w-full h-12 pl-11 pr-3 text-[15px] text-[#17253a] bg-white border border-gray-200 rounded-xl outline-none focus:border-[#D61F45] focus:ring-2 focus:ring-[#FDE8EC]"
                      required
                    />
                  </label>
                  <label className="relative block">
                    <Phone size={18} className="absolute -translate-y-1/2 pointer-events-none left-3.5 top-1/2 text-[#D61F45]" />
                    <input
                      type="text"
                      placeholder="Phone Number"
                      value={contactNumber}
                      readOnly
                      className="w-full h-12 pl-11 pr-3 text-[15px] text-gray-600 bg-[#FFF7F9] border border-gray-200 rounded-xl outline-none"
                    />
                  </label>
                  <label className="relative block">
                    <ChatCircleText size={18} className="absolute pointer-events-none left-3.5 top-3.5 text-[#D61F45]" />
                    <textarea
                      placeholder="Message"
                      value={message}
                      maxLength={255}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        handleFieldChange();
                      }}
                      className="block w-full h-28 py-3 pl-11 pr-3 pb-7 text-[15px] text-[#17253a] bg-white border border-gray-200 rounded-xl outline-none resize-none focus:border-[#D61F45] focus:ring-2 focus:ring-[#FDE8EC]"
                      required
                    ></textarea>
                    <span className="absolute text-[11px] text-gray-400 pointer-events-none select-none bottom-2 right-3">
                      {message.length}/255
                    </span>
                  </label>

                  <button
                    type="submit"
                    className="flex items-center justify-center w-full gap-2 h-12 mt-1 text-[16px] font-semibold text-white rounded-xl bg-gradient-to-r from-[#D61F45] to-[#B91C3C] shadow-[0_6px_18px_rgba(214,31,69,0.35)] hover:shadow-[0_10px_24px_rgba(214,31,69,0.45)] transition-shadow"
                  >
                    <PaperPlaneTilt size={19} weight="fill" />
                    Send Enquiry
                  </button>
                </form>

                {enquiryStatus && (
                  <div
                    className={`flex items-center gap-2 px-3 py-2.5 mt-3 text-[14px] font-medium rounded-xl ${enquiryStatus.type === "success"
                      ? "bg-green-50 text-green-700 border border-green-100"
                      : "bg-[#FFF1F4] text-[#D61F45] border border-[#FAD3DB]"
                      }`}
                  >
                    {enquiryStatus.type === "success" ? (
                      <CheckCircle size={18} weight="fill" />
                    ) : (
                      <Info size={18} weight="fill" />
                    )}
                    {enquiryStatus.message}
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>

        {/* ==================================================
            Gallery popup
        ================================================== */}
        {showAllImages && (
          <div
            className="fixed inset-0 z-[1100] flex items-center justify-center px-3 bg-black/75"
            onMouseDown={(e) => e.target === e.currentTarget && setShowAllImages(false)}
          >
            <div className="relative flex flex-col w-full max-w-5xl max-h-[88vh] overflow-hidden bg-white rounded-3xl shadow-2xl">
              <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-[#FDE8EC]">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#FDE8EC] text-[#D61F45]">
                    <Images size={22} weight="fill" />
                  </span>
                  <div>
                    <h2 className="m-0 text-lg font-bold text-[#17253a]">
                      Photo <span className="text-[#D61F45]">Gallery</span>
                    </h2>
                    <p className="m-0 text-[12px] text-gray-500">
                      {galleryTotal} photo{galleryTotal === 1 ? "" : "s"}
                      {propertyDetails?.property_video ? " · 1 video" : ""}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAllImages(false)}
                  aria-label="Close gallery"
                  className="flex items-center justify-center w-9 h-9 text-gray-500 rounded-full hover:bg-[#FDE8EC] hover:text-[#D61F45]"
                >
                  <X size={18} weight="bold" />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-3 p-4 overflow-y-auto sm:grid-cols-2 md:grid-cols-3">
                {galleryImages.map((src, index) => (
                  <button
                    type="button"
                    key={src}
                    onClick={() => {
                      setGalleryIndex(index);
                      setShowAllImages(false);
                    }}
                    className="relative overflow-hidden rounded-2xl"
                  >
                    <img src={src} alt={`Photo ${index + 1}`} className="object-cover w-full h-48" />
                    <Watermark />
                  </button>
                ))}
                {propertyDetails?.property_video && (
                  <video controls className="object-cover w-full h-48 rounded-2xl">
                    <source src={propertyDetails.property_video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Exclusive Recommended Section — "Top Picks for You" design */}
        <div className="w-full mt-8">
          <style>{`
            .er-slider .slick-track { display: flex !important; }
            .er-slider .slick-slide { height: inherit !important; }
            .er-slider .slick-slide > div { height: 100%; }
            @keyframes erPulse {
              0%, 100% { box-shadow: 0 0 0 0 rgba(214,31,69,0.30); }
              50%      { box-shadow: 0 0 0 8px rgba(214,31,69,0); }
            }
            .er-pulse { animation: erPulse 2.6s ease-out infinite; }
          `}</style>

          <div className="relative w-full overflow-hidden bg-white border border-[#F7C3CE] rounded-2xl shadow-[0_0_28px_rgba(214,31,69,0.12)] pb-5">
            {/* ---------- HEADER ---------- */}
            <div className="flex flex-col gap-4 px-4 pt-5 mb-3 sm:px-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full shadow-lg sm:w-14 sm:h-14 bg-gradient-to-br from-[#E8335A] to-[#B91C3C] shadow-[#D61F45]/30 er-pulse">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor" aria-hidden="true">
                    <path d="M2 7l5 4 5-7 5 7 5-4-2 12H4L2 7z" />
                  </svg>
                </span>
                <div className="min-w-0">
                  <h2 className="m-0 text-xl font-extrabold tracking-tight text-[#172033] sm:text-2xl lg:text-3xl">
                    <span className="text-[#D61F45]">Top Picks</span> for You
                  </h2>
                  <p className="m-0 mt-1 text-sm text-[#64748B] sm:text-base">
                    Handpicked properties based on your preferences
                  </p>
                </div>
              </div>

              <div className="flex items-center w-full gap-3 sm:w-auto md:flex-shrink-0">
                <button
                  type="button"
                  className="group flex items-center justify-center w-full gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#D61F45] rounded-lg shadow-md shadow-[#D61F45]/25 transition-all duration-300 hover:bg-[#B91C3C] hover:shadow-lg sm:w-auto sm:px-6"
                  onClick={handleClick}
                >
                  View All Properties
                  <HiOutlineArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <button
                  type="button"
                  aria-label="Previous"
                  className="hidden sm:flex items-center justify-center flex-shrink-0 rounded-full w-11 h-11 bg-[#FDE8EC] transition-all duration-300 hover:bg-[#F9D3DB] hover:scale-105 active:scale-95"
                  onClick={() => sliderRef.current?.slickPrev()}
                >
                  <GoArrowLeft className="text-xl text-[#D61F45]" />
                </button>

                <button
                  type="button"
                  aria-label="Next"
                  className="hidden sm:flex items-center justify-center flex-shrink-0 rounded-full w-11 h-11 bg-[#D61F45] shadow-md shadow-[#D61F45]/30 transition-all duration-300 hover:bg-[#B91C3C] hover:scale-105 active:scale-95"
                  onClick={() => sliderRef.current?.slickNext()}
                >
                  <GoArrowRight className="text-xl text-white" />
                </button>
              </div>
            </div>

            {/* ---------- CAROUSEL ---------- */}
            <div className="px-2 sm:px-4">
              <Slider {...settings} className="slider-container er-slider" ref={sliderRef}>
                {properties.map((property) => {
                  let distance = null;
                  if (userLocation && property.latitude && property.longitude) {
                    distance = calculateDistance(
                      userLocation.latitude,
                      userLocation.longitude,
                      parseFloat(property.latitude),
                      parseFloat(property.longitude),
                    ).toFixed(1);
                  }

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

                    if (
                      category.includes("PG") ||
                      category.includes("Co-Living") ||
                      category.includes("Coliving")
                    ) {
                      return `${type} for Rent in ${location}`;
                    }

                    const action = category === "Buy" ? "Sale" : category;

                    return `${property.bhk_type} ${type} for ${action} in ${location}`;
                  })();

                  const badgeText = (() => {
                    const normalizedCategory = (property.property_category_type || "")
                      .replace(/\s+/g, " ")
                      .replace(/-/g, " ")
                      .replace(/\//g, " ")
                      .trim()
                      .toLowerCase();

                    if (normalizedCategory === "buy") return "FOR BUY";
                    if (normalizedCategory === "rent") return "FOR RENT";
                    if (normalizedCategory.includes("commercial buy")) return "COMMERCIAL BUY";
                    if (normalizedCategory.includes("commercial lease")) return "COMMERCIAL LEASE";
                    if (
                      normalizedCategory.includes("pg") ||
                      normalizedCategory.includes("co living") ||
                      normalizedCategory.includes("coliving")
                    )
                      return "PG / CO-LIVING";
                    if (normalizedCategory.includes("residential")) return "RESIDENTIAL";
                    return "UNKNOWN";
                  })();

                  function getValidImageUrl(img) {
                    if (typeof img !== "string") return null;
                    if (img.trim() === "") return null;
                    return img.startsWith("http") ? img : BASE_URL + img;
                  }

                  const coverImage = getValidImageUrl(property.cover_image);
                  const additionalImages = (property.property_images || [])
                    .map((imgObj) => getValidImageUrl(imgObj?.image))
                    .filter(Boolean);
                  const allImages = [
                    ...(coverImage ? [coverImage] : []),
                    ...additionalImages,
                  ];

                  const isRentLike =
                    property.property_category_type === "Rent" ||
                    property.property_category_type === "PG/Co-living";
                  const isPG = property.property_category_type?.includes("PG");

                  const phoneDigits = String(property.connect_to_no || "").replace(/\D/g, "");
                  const phoneIntl =
                    phoneDigits.length === 10 ? `91${phoneDigits}` : phoneDigits;

                  return (
                    <div key={property._id} className="box-border h-full p-2">
                      <div className="flex flex-col h-full overflow-hidden bg-white border border-[#F1D5DC] rounded-2xl shadow-[0_6px_20px_rgba(214,31,69,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(214,31,69,0.18)]">
                        {/* ---------- IMAGE ---------- */}
                        <div className="relative group er-card-img">
                          <Link
                            to={`/propertydetails/${property._id}?property_owner_id=${property.user_id}`}
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                            className="block overflow-hidden no-underline hover:no-underline"
                          >
                            {allImages.length > 1 ? (
                              <Slider
                                key={`${property._id}-${allImages.length}`}
                                dots
                                infinite
                                speed={500}
                                slidesToShow={1}
                                slidesToScroll={1}
                                arrows={false}
                                autoplay
                                autoplaySpeed={2500}
                                beforeChange={(current, next) =>
                                  setActiveIndexes((prev) => ({
                                    ...prev,
                                    [property._id]: next,
                                  }))
                                }
                                initialSlide={activeIndexes[property._id] || 0}
                                customPaging={(i) => {
                                  const activeSlide = activeIndexes[property._id] || 0;
                                  const isActive = i === activeSlide % allImages.length;
                                  return (
                                    <div
                                      style={{
                                        width: isActive ? "14px" : "6px",
                                        height: "6px",
                                        borderRadius: "9999px",
                                        background: isActive ? "#FFFFFF" : "rgba(255,255,255,0.6)",
                                        margin: "0 3px",
                                        cursor: "pointer",
                                        transition: "all .25s ease",
                                      }}
                                    />
                                  );
                                }}
                                appendDots={(dots) => (
                                  <div
                                    style={{
                                      position: "absolute",
                                      bottom: "24px",
                                      left: "50%",
                                      transform: "translateX(-50%)",
                                      display: "flex",
                                      justifyContent: "center",
                                      width: "100%",
                                      zIndex: 20,
                                    }}
                                  >
                                    <ul style={{ display: "flex", margin: 0, padding: 0, listStyle: "none" }}>
                                      {dots}
                                    </ul>
                                  </div>
                                )}
                              >
                                {allImages.map((imgUrl, idx) => (
                                  <div key={`${property._id}-${idx}`}>
                                    <img
                                      src={imgUrl}
                                      alt={property.property_name || "Property"}
                                      className="object-cover w-full h-[170px] sm:h-[190px] transition-transform duration-500 ease-out group-hover:scale-105"
                                    />
                                  </div>
                                ))}
                              </Slider>
                            ) : (
                              <img
                                src={allImages[0] || defaultImage}
                                alt={property.property_name || "Property"}
                                className="object-cover w-full h-[170px] sm:h-[190px] transition-transform duration-500 ease-out group-hover:scale-105"
                              />
                            )}
                          </Link>

                          {/* Soft top gradient so the pills stay readable */}
                          <div className="absolute inset-x-0 top-0 z-[5] h-20 pointer-events-none bg-gradient-to-b from-black/40 to-transparent" />

                          {/* Top-left: category pill + virtual tour */}
                          <div className="absolute z-20 flex flex-wrap items-center gap-1.5 top-3 left-3 max-w-[60%]">
                            <span className="px-3 py-1 text-[11px] sm:text-xs font-bold tracking-wide text-white uppercase rounded-full shadow-md bg-[#D61F45] truncate">
                              {badgeText}
                            </span>
                            {property.virtual_tour_availability === "Yes" && (
                              <span className="flex items-center gap-1 px-2 py-1 text-[10px] sm:text-[11px] font-semibold text-white rounded-full shadow-md bg-[#172033]/75 backdrop-blur-sm">
                                <PiCubeFocus className="text-xs text-white" />
                                <span className="hidden sm:inline">Virtual Tour</span>
                              </span>
                            )}
                          </div>

                          {/* Top-right: Featured pill + favorite */}
                          <div className="absolute z-20 flex items-center gap-2 top-3 right-3">
                            {property.mark_as_featured === "Yes" && (
                              <span className="px-2.5 py-1 text-[10px] sm:text-[11px] font-bold tracking-wide text-[#172033] uppercase rounded-full shadow-md bg-gradient-to-r from-[#FFD233] to-[#F5B800]">
                                Featured
                              </span>
                            )}
                            <button
                              type="button"
                              aria-label={property.is_favorite ? "Remove from favorites" : "Add to favorites"}
                              className="flex items-center justify-center w-8 h-8 transition-transform rounded-full shadow-md bg-[#172033]/75 backdrop-blur-sm hover:scale-110"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (property.is_favorite) {
                                  removeFromFavoritesRecommendedProperty(property.favorite_id);
                                } else {
                                  addToFavoritesRecommendedProperty(property._id);
                                }
                              }}
                            >
                              <Heart
                                size={16}
                                weight="fill"
                                color={property.is_favorite ? "#D61F45" : "white"}
                              />
                            </button>
                          </div>
                        </div>

                        {/* ---------- CONTENT (overlaps the image) ---------- */}
                        <div className="relative z-10 flex flex-col justify-between flex-1 px-4 pt-3 pb-4 -mt-4 bg-white rounded-t-2xl text-[#172033]">
                          <div>
                            <h3
                              className="m-0 text-base font-bold leading-6 truncate sm:text-[17px] text-[#172033]"
                              title={property.property_name}
                            >
                              {property.property_name || "N/A"}
                            </h3>

                            <p
                              className="m-0 text-[13px] sm:text-sm leading-5 text-[#475569] truncate"
                              title={subtitle}
                            >
                              {subtitle}
                            </p>

                            {/* Price row */}
                            <div className="flex flex-wrap items-center justify-between gap-1 mt-1.5 mb-2">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-xl font-extrabold leading-none sm:text-[22px] text-[#172033]">
                                  ₹{" "}
                                  {isRentLike
                                    ? formatPrice(property.rent)
                                    : formatPrice(property.property_price)}
                                </span>
                                {isRentLike && (
                                  <span className="text-xs text-[#64748B]">
                                    / {property.rent_duration || "Per Month"}
                                  </span>
                                )}
                                {property.property_category_type?.includes("Buy") &&
                                  property.possession_status === "Ready To Move" && (
                                    <span className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-white rounded-full bg-[#D61F45] shadow-sm whitespace-nowrap">
                                      <Building2 size={12} strokeWidth={2.5} />
                                      Get Best Deal
                                    </span>
                                  )}
                              </div>
                              <div className="text-xs font-medium whitespace-nowrap">
                                {property.property_category_type?.includes("Buy") &&
                                  property.possession_status !== "Ready To Move" &&
                                  property.possession_date && (
                                    <>
                                      <span className="text-[#64748B]">Possession:</span>
                                      <span className="ml-1 font-semibold text-[#172033]">
                                        {new Date(property.possession_date).toLocaleDateString("en-IN")}
                                      </span>
                                    </>
                                  )}
                              </div>
                            </div>

                            {/* Features row */}
                            <div className="grid grid-cols-3 gap-1 py-2">
                              <div className="flex items-center min-w-0 gap-1.5">
                                <MdApartment className="text-[18px] text-[#172033] flex-shrink-0" />
                                <div className="flex flex-col min-w-0">
                                  <p className="m-0 text-xs font-bold leading-4 truncate text-[#172033]">
                                    {property.building_type === "Commercial"
                                      ? property.property_type === "Office"
                                        ? "Office Space"
                                        : property.property_type === "Retail"
                                          ? "Retail Space"
                                          : property.property_type
                                      : isPG
                                        ? `${property.bathroom || 0} Bathrooms`
                                        : property.bhk_type}
                                  </p>
                                  <p className="m-0 text-[10px] leading-4 text-[#64748B] truncate">
                                    {property.building_type === "Commercial"
                                      ? "Property Type"
                                      : isPG
                                        ? "Bathrooms"
                                        : property.property_type}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center min-w-0 gap-1.5">
                                {isPG ? (
                                  <FaUser className="text-[15px] text-[#172033] flex-shrink-0" />
                                ) : (
                                  <FaBath className="text-[15px] text-[#172033] flex-shrink-0" />
                                )}
                                <div className="flex flex-col min-w-0">
                                  <p className="m-0 text-xs font-bold leading-4 truncate text-[#172033]">
                                    {isPG ? property.available_for : `${property.bathroom || 0} Baths`}
                                  </p>
                                  <p className="m-0 text-[10px] leading-4 text-[#64748B] truncate">
                                    {isPG ? "Available For" : "Bathrooms"}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center min-w-0 gap-1.5">
                                <RiRuler2Line className="text-[17px] text-[#172033] flex-shrink-0" />
                                <div className="flex flex-col min-w-0">
                                  <p className="m-0 text-xs font-bold leading-4 truncate text-[#172033]">
                                    {property.area} {property.area_in}
                                  </p>
                                  <p className="m-0 text-[10px] leading-4 text-[#64748B] truncate">
                                    Built Up Area
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Posted by · days · distance · share */}
                            <div className="flex items-center justify-between gap-2 py-1.5 text-[11px] sm:text-xs text-[#64748B]">
                              <div className="flex flex-wrap items-center min-w-0 gap-x-1.5">
                                <span className="flex items-center min-w-0">
                                  <AiOutlineClockCircle className="mr-1 text-[13px] flex-shrink-0" />
                                  <span className="truncate">
                                    Posted by {property.user_type || "Owner"}
                                  </span>
                                </span>
                                <span className="text-[#CBD5E1]">•</span>
                                <span className="whitespace-nowrap">
                                  {property.days_since_created
                                    ? `${property.days_since_created} days ago`
                                    : "Recently"}
                                </span>
                                {distance && (
                                  <>
                                    <span className="text-[#CBD5E1]">•</span>
                                    <span className="flex items-center whitespace-nowrap">
                                      <FaMapMarkerAlt className="mr-1 text-[#D61F45]" />
                                      {distance} km from you
                                    </span>
                                  </>
                                )}
                              </div>
                              <PiShareNetworkLight
                                title="Share"
                                className="flex-shrink-0 text-[16px] text-[#94A3B8] transition-colors cursor-pointer hover:text-[#D61F45]"
                                onClick={() =>
                                  openShareModal(
                                    `${window.location.origin}/propertydetails/${property._id}`,
                                    property._id,
                                  )
                                }
                              />
                            </div>
                          </div>

                          {/* Owner + Contact / WhatsApp / Call */}
                          <div className="flex items-center justify-between gap-2 pt-3 mt-1 border-t border-[#F1F5F9]">
                            <div className="flex items-center min-w-0 gap-2">
                              <div className="flex items-center justify-center flex-shrink-0 overflow-hidden rounded-full shadow w-9 h-9 ring-2 ring-white bg-[#0F2747]/10">
                                {property.property_owner_image ? (
                                  <img
                                    src={`${process.env.REACT_APP_API_URL}/media/${property.property_owner_image}`}
                                    alt={property.connect_to_name || "Owner"}
                                    className="object-cover w-full h-full rounded-full"
                                  />
                                ) : (
                                  <AiOutlineUser className="text-xl text-[#0F2747]" />
                                )}
                              </div>
                              <div className="flex flex-col min-w-0 leading-tight">
                                <span
                                  className="text-[13px] font-bold text-[#172033] truncate"
                                  title={property.connect_to_name}
                                >
                                  {property.connect_to_name || "Owner"}
                                </span>
                                <span className="text-[11px] text-[#64748B] truncate">
                                  {property.user_type || "Owner"}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center flex-shrink-0 gap-1.5">
                              {/* FIX: Contact used to open THIS page's owner details
                                  (and spend a view) instead of the card's owner.
                                  It now opens that property's page. */}
                              <Link
                                to={`/propertydetails/${property._id}`}
                                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                                className="flex items-center justify-center px-4 h-9 text-xs sm:text-[13px] font-semibold text-white no-underline rounded-lg bg-[#D61F45] shadow-sm transition-colors hover:bg-[#B91C3C] hover:text-white hover:no-underline whitespace-nowrap"
                              >
                                Contact
                              </Link>

                              {/* WhatsApp */}
                              <a
                                href={
                                  phoneIntl
                                    ? `https://wa.me/${phoneIntl}?text=${encodeURIComponent(
                                      `Hello, I am interested in your property ${property.property_name || ""}`,
                                    )}`
                                    : undefined
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="WhatsApp"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (!phoneIntl) {
                                    e.preventDefault();
                                    toast.error("Contact number is not available for this property.");
                                  }
                                }}
                                className="flex items-center justify-center rounded-lg shadow-sm w-9 h-9 bg-[#22C55E] transition-colors hover:bg-[#16A34A]"
                              >
                                <FaWhatsapp className="text-lg text-white" />
                              </a>

                              {/* Call */}
                              <a
                                href={phoneIntl ? `tel:+${phoneIntl}` : undefined}
                                aria-label="Call"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (!phoneIntl) {
                                    e.preventDefault();
                                    toast.error("Contact number is not available for this property.");
                                  }
                                }}
                                className="flex items-center justify-center rounded-lg shadow-sm w-9 h-9 bg-[#3B82F6] transition-colors hover:bg-[#2563EB]"
                              >
                                <FaPhoneAlt className="text-sm text-white" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>

            {/* Mobile arrows below the cards */}
            <div className="flex items-center justify-center gap-4 mt-3 sm:hidden">
              <button
                type="button"
                aria-label="Previous"
                className="flex items-center justify-center rounded-full w-11 h-11 bg-[#FDE8EC] transition-all duration-300 active:scale-95"
                onClick={() => sliderRef.current?.slickPrev()}
              >
                <GoArrowLeft className="text-xl text-[#D61F45]" />
              </button>
              <button
                type="button"
                aria-label="Next"
                className="flex items-center justify-center rounded-full w-11 h-11 bg-[#D61F45] shadow-md transition-all duration-300 active:scale-95"
                onClick={() => sliderRef.current?.slickNext()}
              >
                <GoArrowRight className="text-xl text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* ==================================================
            Share — ONE popup (it used to render three at once)
        ================================================== */}
        {isShareModalOpen && (
          <ShareModal
            currentShareUrl={currentShareUrl || window.location.href}
            closeShareModal={handleCloseShareModal}
            copyLink={() => copyShareLink(currentShareUrl || window.location.href)}
          />
        )}

        {/* Login / Sign-up — FIX: logged-in users used to see a stray
            "Welcome, <phone>" line printed at the bottom of the page. */}
        {!isLoggedIn && (
          <>
            <Login1
              isOpen={isLoginModalOpen}
              onClose={() => setIsLoginModalOpen(false)}
              onSwitchToSignUp={() => {
                setIsLoginModalOpen(false);
                setIsSignUpModalOpen(true);
              }}
              onLoginSuccess={handleLoginSuccess}
            />
            <SignUp1
              isOpen={isSignUpModalOpen}
              onClose={() => setIsSignUpModalOpen(false)}
              onSwitchToLogin={() => {
                setIsSignUpModalOpen(false);
                setIsLoginModalOpen(true);
              }}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Detail;