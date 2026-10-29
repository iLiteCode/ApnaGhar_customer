// import React, { useState, useEffect, useRef, useContext } from "react";
// import { Link, useHistory } from "react-router-dom";
// import axios from "axios";

// import {
//   FaSearch,
//   FaCity,
//   FaPlus,
//   FaPlusCircle,
//   FaMapMarkerAlt,
//   FaHome,
//   FaMicrophone,
// } from "react-icons/fa";

// import { FiSearch } from "react-icons/fi";
// import { MdOutlineAddLocation, MdMyLocation } from "react-icons/md";
// import { RiHomeLine } from "react-icons/ri";

// import { SearchContext } from "./SearchContext";


// // ==========================================================
// // NAVIGATION TABS
// // ==========================================================

// const NAV_TABS = [
//   { label: "BUY", key: "Buy", type: "Buy" },
//   { label: "RENT", key: "Rent", type: "Rent" },
//   { label: "PG", key: "PG", type: "PG/Co-living" },
//   { label: "Plots/Land", key: "Plot", type: "Plot/Land" },
//   { label: "COMMERCIAL", key: "Commercial", type: "Commercial" },
// ];


// const Search = () => {

//   const history = useHistory();

//   const {
//     searchCity,
//     setSearchCity
//   } = useContext(SearchContext);


//   // ==========================================================
//   // SEARCH STATES
//   // ==========================================================

//   const [searchQuery, setSearchQuery] = useState("");

//   const [suggestions, setSuggestions] = useState([]);

//   const [showSuggestions, setShowSuggestions] = useState(false);

//   const [type, setType] = useState("");

//   const [error, setError] = useState("");

//   const inputRef = useRef(null);


//   // ==========================================================
//   // VOICE SEARCH STATE
//   // ==========================================================

//   const [isListening, setIsListening] = useState(false);

//   const recognitionRef = useRef(null);


//   const GOOGLE_MAPS_API_KEY =
//     "AIzaSyAt8bj4UACvakZfiSy-0c1o_ivfplm7jEU";


//   // ==========================================================
//   // TAB INDICATOR
//   // ==========================================================

//   const tabRefs = useRef({});

//   const [indicatorStyle, setIndicatorStyle] = useState({
//     left: 0,
//     width: 0,
//     opacity: 0,
//   });


//   const moveIndicator = (key) => {

//     const el = tabRefs.current[key];

//     if (el) {

//       setIndicatorStyle({
//         left: el.offsetLeft,
//         width: el.offsetWidth,
//         opacity: 1,
//       });

//     }
//   };


//   const handleTabMouseEnter = (key) => {
//     moveIndicator(key);
//   };


//   const handleTabRowMouseLeave = () => {

//     setIndicatorStyle((prev) => ({
//       ...prev,
//       opacity: 0,
//     }));

//   };


//   // ==========================================================
//   // CITY CHANGE
//   // ==========================================================

//   const handleCityChange = (e) => {

//     const selectedCity = e.target.value;

//     setSearchCity(selectedCity);

//   };


//   // ==========================================================
//   // PLACEHOLDER
//   // ==========================================================

//   const placeholderTexts = [
//     "Search by City or Locality...",
//     "Search Properties by Location",
//     "Enter City, Area",
//     'Search "Pune"',
//     'Search "Mumbai"',
//   ];


//   const [placeholderIndex, setPlaceholderIndex] = useState(0);


//   useEffect(() => {

//     const intervalId = setInterval(() => {

//       setPlaceholderIndex(
//         (prev) =>
//           (prev + 1) % placeholderTexts.length
//       );

//     }, 3000);


//     return () => clearInterval(intervalId);

//   }, []);


//   // ==========================================================
//   // LOCATION LOADING
//   // ==========================================================

//   const [isLoadingLocation, setIsLoadingLocation] =
//     useState(false);


//   // ==========================================================
//   // VOICE SEARCH
//   // ==========================================================

//   const handleVoiceSearch = () => {

//     const SpeechRecognition =
//       window.SpeechRecognition ||
//       window.webkitSpeechRecognition;


//     if (!SpeechRecognition) {

//       setError(
//         "Voice search is not supported in this browser. Please use Google Chrome."
//       );

//       return;
//     }


//     // If already listening, stop it
//     if (isListening && recognitionRef.current) {

//       recognitionRef.current.stop();

//       setIsListening(false);

//       return;
//     }


//     const recognition = new SpeechRecognition();


//     recognition.lang = "en-IN";

//     recognition.interimResults = false;

//     recognition.continuous = false;

//     recognition.maxAlternatives = 1;


//     recognitionRef.current = recognition;


//     // ================= START =================

//     recognition.onstart = () => {

//       setIsListening(true);

//       setError("");

//     };


//     // ================= RESULT =================

//     recognition.onresult = (event) => {

//       const transcript =
//         event.results[0][0].transcript;


//       if (transcript) {

//         setSearchQuery(transcript);

//         setShowSuggestions(false);

//       }

//     };


//     // ================= ERROR =================

//     recognition.onerror = (event) => {

//       console.error(
//         "Voice recognition error:",
//         event.error
//       );


//       setIsListening(false);


//       if (event.error === "not-allowed") {

//         setError(
//           "Please allow microphone access to use voice search."
//         );

//       } else if (event.error === "no-speech") {

//         setError(
//           "No speech detected. Please try again."
//         );

//       } else {

//         setError(
//           "Voice search failed. Please try again."
//         );

//       }

//     };


//     // ================= END =================

//     recognition.onend = () => {

//       setIsListening(false);

//       recognitionRef.current = null;

//     };


//     recognition.start();

//   };


//   // ==========================================================
//   // NEAR ME SEARCH
//   // ==========================================================

//   const handleNearMeSearch = async (e) => {

//     e.preventDefault();


//     if (!navigator.geolocation) {

//       setError(
//         "Geolocation is not supported by your browser."
//       );

//       return;
//     }


//     setIsLoadingLocation(true);

//     setError("");


//     navigator.geolocation.getCurrentPosition(

//       async (position) => {

//         const lat = position.coords.latitude;

//         const lng = position.coords.longitude;


//         try {

//           const response = await fetch(
//             `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
//           );


//           const data = await response.json();


//           setIsLoadingLocation(false);


//           if (
//             data.status === "OK" &&
//             data.results.length > 0
//           ) {

//             let detectedCity = "";


//             const addressComponents =
//               data.results[0].address_components;


//             for (
//               let component of addressComponents
//             ) {

//               if (
//                 component.types.includes(
//                   "locality"
//                 )
//               ) {

//                 detectedCity =
//                   component.long_name;

//                 break;

//               }

//             }


//             if (detectedCity) {

//               setSearchCity(detectedCity);


//               history.push({

//                 pathname:
//                   "/searchdashboard",

//                 state: {

//                   searchCity:
//                     detectedCity,

//                   searchQuery: "",

//                   type: type,

//                 },

//               });

//             } else {

//               setError(
//                 "Unable to detect your city. Please enter it manually."
//               );

//             }

//           } else {

//             setError(
//               "Failed to fetch city details from your location."
//             );

//           }

//         } catch (error) {

//           setIsLoadingLocation(false);

//           setError(
//             "Network error. Please try again."
//           );

//         }

//       },


//       (err) => {

//         setIsLoadingLocation(false);


//         if (err.code === 1) {

//           setError(
//             "Please allow location access to use the 'Near Me' feature."
//           );

//         } else {

//           setError(
//             "Could not retrieve your location. Please try again."
//           );

//         }

//       }

//     );

//   };


//   // ==========================================================
//   // SEARCH CHANGE
//   // ==========================================================

//   const handleSearchChange = async (e) => {

//     const value = e.target.value;


//     setSearchQuery(value);


//     if (!value.trim()) {

//       setSuggestions([]);

//       setShowSuggestions(false);

//       return;

//     }


//     try {

//       const response = await axios.post(

//         `${process.env.REACT_APP_API_URL}/cust_api/search_suggestions`,

//         {
//           query: value,
//         }

//       );


//       if (response.data.status === 1) {

//         setSuggestions(
//           response.data.data
//         );

//         setShowSuggestions(true);

//       } else {

//         setSuggestions([]);

//         setShowSuggestions(false);

//       }

//     } catch (error) {

//       console.error(error);

//     }

//   };


//   // ==========================================================
//   // SEARCH
//   // ==========================================================

//   const handleSearch = () => {

//     if (
//       !searchQuery &&
//       !searchCity &&
//       !type
//     ) {

//       setError(
//         "Please enter what you're looking for."
//       );

//       return;

//     }


//     setError("");


//     history.push({

//       pathname: "/searchdashboard",

//       state: {

//         searchCity,

//         searchQuery,

//         type,

//       },

//     });

//   };


//   // ==========================================================
//   // CLEANUP VOICE RECOGNITION
//   // ==========================================================

//   useEffect(() => {

//     return () => {

//       if (recognitionRef.current) {

//         recognitionRef.current.stop();

//       }

//     };

//   }, []);


//   // ==========================================================
//   // UI
//   // ==========================================================

//   return (

//     <div className="relative flex items-center justify-center m-3 bg-white min-h-[200px] py-9 sm:py-18">

//       {/* Background */}

//       <div
//         className="absolute top-0 bottom-0 left-0 right-0 w-full h-full bg-center bg-cover rounded-3xl sm:rounded-3xl"
//         style={{
//           backgroundImage:
//             "url('/image/modern.jpg')",
//         }}
//       ></div>


//       <div className="relative w-full max-w-6xl p-2 bg-transparent rounded-3xl mx-auto sm:p-6">


//         {/* ==================================================
//             HEADING
//         ================================================== */}

//         <div className="mb-6 text-center sm:mb-11">

//           <h1 className="text-2xl font-semibold tracking-widest text-white sm:text-2xl lg:text-3xl">

//             Let's find your home

//             <br />

//             that's perfect for you

//           </h1>

//         </div>


//         {/* ==================================================
//             SEARCH FORM
//         ================================================== */}

//         <div className="flex flex-col w-full bg-white rounded-2xl shadow-lg">


//           {/* ==================================================
//               TOP TABS
//           ================================================== */}

//           <div
//             className="relative flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-16 text-gray-700 font-semibold tracking-wider border-b border-gray-100 p-3"
//             onMouseLeave={handleTabRowMouseLeave}
//           >

//             {NAV_TABS.map((tab) => (

//               <Link
//                 key={tab.key}

//                 ref={(el) => {
//                   tabRefs.current[tab.key] =
//                     el;
//                 }}

//                 to={{
//                   pathname: "/property",
//                   state: {
//                     propertyType:
//                       tab.type,
//                   },
//                 }}

//                 onMouseEnter={() =>
//                   handleTabMouseEnter(
//                     tab.key
//                   )
//                 }

//                 className="nav-tab text-lg font-medium tracking-wider text-gray-600 no-underline hover:no-underline"
//               >

//                 {tab.label}

//               </Link>

//             ))}


//             {/* Indicator */}

//             <span
//               className="nav-tab-indicator hidden sm:block"
//               style={{
//                 left:
//                   indicatorStyle.left,

//                 width:
//                   indicatorStyle.width,

//                 opacity:
//                   indicatorStyle.opacity,
//               }}
//             />

//           </div>


//           {/* ==================================================
//               TAB STYLE
//           ================================================== */}

//           <style>{`

//             .nav-tab {
//               position: relative;
//               transition: color 0.3s ease;
//             }

//             .nav-tab:hover {
//               color: #8B1E3F;
//             }

//             .nav-tab-indicator {
//               position: absolute;
//               bottom: 6px;
//               height: 3px;
//               background-color: #8B1E3F;
//               opacity: 0;
//               transition:
//                 left 0.3s ease,
//                 width 0.3s ease,
//                 opacity 0.2s ease;
//             }

//             /* ================= VOICE BUTTON ================= */

//             .voice-search-button {
//               width: 38px;
//               height: 38px;
//               min-width: 38px;

//               display: flex;
//               align-items: center;
//               justify-content: center;

//               border: none;
//               border-radius: 50%;

//               background: #fff8ed;
//               color: #c99a3e;

//               cursor: pointer;

//               transition: all 0.2s ease;
//             }

//             .voice-search-button:hover {
//               background: #fdf0d8;
//               color: #a87924;
//             }

//             .voice-search-button.listening {
//               background: #f7e2c0;
//               color: #8f641e;

//               animation:
//                 voicePulse 1.2s infinite;
//             }

//             @keyframes voicePulse {

//               0% {
//                 box-shadow:
//                   0 0 0 0
//                   rgba(201, 154, 62, 0.4);
//               }

//               70% {
//                 box-shadow:
//                   0 0 0 10px
//                   rgba(201, 154, 62, 0);
//               }

//               100% {
//                 box-shadow:
//                   0 0 0 0
//                   rgba(201, 154, 62, 0);
//               }

//             }

//           `}</style>


//           {/* ==================================================
//               BOTTOM SEARCH AREA
//           ================================================== */}

//           <div className="flex flex-col lg:flex-row items-stretch lg:items-center p-3 gap-3 lg:gap-2">


//             {/* ==================================================
//                 SEARCH + DROPDOWNS
//             ================================================== */}

//             <div className="flex flex-col md:flex-row items-stretch md:items-center w-full flex-1 gap-2 md:gap-0 md:divide-x md:divide-gray-100">


//               {/* ==================================================
//                   SEARCH FIELD
//               ================================================== */}

//               <div className="relative flex items-center w-full px-2 py-2 md:py-1 md:pr-3">


//                 {/* Search Icon */}

//                 <button
//                   type="button"
//                   className="p-1 my-text rounded-full focus:outline-none shrink-0"
//                 >

//                   <FiSearch size={22} />

//                 </button>


//                 {/* Search Input */}

//                 <input
//                   ref={inputRef}

//                   type="text"

//                   id="search"

//                   placeholder={
//                     placeholderTexts[
//                     placeholderIndex
//                     ]
//                   }

//                   className="w-full min-w-0 px-2 ml-2 text-sm text-gray-600 bg-transparent outline-none border-none sm:text-base"

//                   value={searchQuery}

//                   onChange={
//                     handleSearchChange
//                   }
//                 />


//                 {/* ==================================================
//                     VOICE BUTTON
//                 ================================================== */}

//                 <button
//                   type="button"

//                   onClick={
//                     handleVoiceSearch
//                   }

//                   title={
//                     isListening
//                       ? "Stop listening"
//                       : "Voice Search"
//                   }

//                   className={`voice-search-button ${isListening
//                       ? "listening"
//                       : ""
//                     }`}
//                 >

//                   <FaMicrophone size={16} />

//                 </button>


//                 {/* ==================================================
//                     SUGGESTIONS
//                 ================================================== */}

//                 {showSuggestions &&
//                   suggestions.length >
//                   0 && (

//                     <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">

//                       {suggestions.map(
//                         (item, index) => (

//                           <div
//                             key={index}

//                             className="px-4 py-3 cursor-pointer hover:bg-gray-100 border-b last:border-b-0"

//                             onClick={() => {

//                               setSearchQuery(
//                                 item.text
//                               );

//                               setShowSuggestions(
//                                 false
//                               );

//                             }}
//                           >

//                             {item.text}

//                           </div>

//                         )
//                       )}

//                     </div>

//                   )}

//               </div>


//               {/* ==================================================
//                   CITY DROPDOWN
//               ================================================== */}

//               <div className="flex items-center w-full md:w-[220px] lg:w-[230px] px-2 py-2 md:px-3">

//                 <MdOutlineAddLocation
//                   className="my-text shrink-0"
//                   size={22}
//                 />

//                 <select
//                   id="city"

//                   className="w-full min-w-0 ml-2 text-sm sm:text-base text-gray-600 bg-transparent outline-none border-none cursor-pointer"

//                   value={searchCity}

//                   onChange={
//                     handleCityChange
//                   }
//                 >

//                   <option value="">
//                     Select a City
//                   </option>

//                   <option value="Ahmedabad">
//                     Ahmedabad
//                   </option>

//                   <option value="Bengaluru">
//                     Bengaluru
//                   </option>

//                   <option value="Chennai">
//                     Chennai
//                   </option>

//                   <option value="Delhi">
//                     Delhi
//                   </option>

//                   <option value="Hyderabad">
//                     Hyderabad
//                   </option>

//                   <option value="Kolkata">
//                     Kolkata
//                   </option>

//                   <option value="Mumbai">
//                     Mumbai
//                   </option>

//                   <option value="Pune">
//                     Pune
//                   </option>

//                 </select>

//               </div>


//               {/* ==================================================
//                   PROPERTY TYPE
//               ================================================== */}

//               <div className="flex items-center w-full md:w-[190px] lg:w-[200px] px-2 py-2 md:px-3">

//                 <RiHomeLine
//                   className="my-text shrink-0"
//                   size={22}
//                 />

//                 <select
//                   id="type"

//                   className="w-full min-w-0 ml-2 text-sm sm:text-base text-gray-600 bg-transparent outline-none border-none cursor-pointer truncate"

//                   value={type}

//                   onChange={(e) =>
//                     setType(
//                       e.target.value
//                     )
//                   }
//                 >

//                   <option value="">
//                     Property Type
//                   </option>

//                   <option value="Residential">
//                     Residential
//                   </option>

//                   <option value="Commercial">
//                     Commercial
//                   </option>

//                 </select>

//               </div>


//               {/* ==================================================
//                   NEAR ME
//               ================================================== */}

//               <div className="flex items-center justify-center md:justify-start p-2 relative group shrink-0">

//                 <button

//                   onClick={
//                     handleNearMeSearch
//                   }

//                   disabled={
//                     isLoadingLocation
//                   }

//                   type="button"

//                   className={`flex items-center justify-center p-2 transition rounded-full focus:outline-none ${isLoadingLocation
//                       ? "bg-gray-100 text-gray-400 animate-pulse"
//                       : "bg-rose-50 my-text hover:bg-rose-100"
//                     }`}
//                 >

//                   <MdMyLocation
//                     size={20}
//                   />

//                 </button>


//                 {/* Tooltip */}

//                 <div className="absolute right-0 items-center hidden px-3 py-2 text-sm text-[#0f172a] whitespace-nowrap bg-white border border-gray-100 rounded shadow-lg top-12 group-hover:flex z-50">

//                   <div className="absolute top-[-5px] right-3 w-3 h-3 bg-white border-t border-l border-gray-100 transform rotate-45"></div>

//                   <MdMyLocation
//                     size={16}
//                     className="mr-1 my-text"
//                   />

//                   Search

//                   <span className="ml-1 font-bold">
//                     Near Me
//                   </span>

//                 </div>

//               </div>

//             </div>


//             {/* ==================================================
//                 SEARCH BUTTON
//             ================================================== */}

//             <button

//               className="flex items-center justify-center w-full lg:w-auto gap-2 px-6 py-2.5 text-white transition-all duration-300 my-bg rounded-lg hover:opacity-90 font-medium shrink-0"

//               onClick={
//                 handleSearch
//               }
//             >

//               <FiSearch size={20} />

//               <span className="inline">
//                 Search
//               </span>

//             </button>

//           </div>

//         </div>


//         {/* ==================================================
//             ERROR MESSAGE
//         ================================================== */}

//         {error && (

//           <div className="mt-3 text-center">

//             <span className="px-4 mt-4 text-sm text-center text-white bg-gray-800 rounded">

//               {error}

//             </span>

//           </div>

//         )}


//         {/* ==================================================
//             SUGGESTIONS
//         ================================================== */}

//         <div className="mt-6 text-center sm:mt-10">

//           <div className="flex flex-wrap justify-center gap-2 sm:justify-start">

//             <h3
//               className="w-full mt-2 sm:w-auto"
//               style={{
//                 fontSize: "1rem",
//                 color: "rgb(229, 231, 235)",
//                 marginBottom:
//                   "0.5rem",
//               }}
//             >

//               Suggestion:

//             </h3>


//             {[
//               "Ahmedabad",
//               "Bengaluru",
//               "Chennai",
//               "Delhi",
//               "Hyderabad",
//               "Kolkata",
//               "Mumbai",
//               "Pune",
//             ].map((location) => (

//               <Link
//                 key={location}

//                 to={`/citywiseproperties/${location}`}

//                 className="px-3 py-2 text-sm text-white no-underline rounded-full cursor-pointer bg-gray-900/20 backdrop-blur-sm bg-transparnt/70 bg-opacity-70 hover:bg-gray-600 hover:no-underline"
//               >

//                 {location}

//               </Link>

//             ))}

//           </div>

//         </div>

//       </div>

//     </div>

//   );

// };


// export default Search;



// import React, { useState, useEffect, useRef, useContext } from "react";
// import { Link, useHistory } from "react-router-dom";
// import axios from "axios";

// import {
//   FaSearch,
//   FaMapMarkerAlt,
//   FaMicrophone,
// } from "react-icons/fa";

// import { FiSearch, FiHome, FiDollarSign } from "react-icons/fi";
// import { MdMyLocation } from "react-icons/md";

// import { SearchContext } from "./SearchContext";


// // ==========================================================
// // NAVIGATION TABS
// // ==========================================================

// const NAV_TABS = [
//   { label: "Buy", key: "Buy", type: "Buy" },
//   { label: "Rent", key: "Rent", type: "Rent" },
//   { label: "PG", key: "PG", type: "PG/Co-living" },
//   { label: "Plots / Land", key: "Plot", type: "Plot/Land" },
//   { label: "Commercial", key: "Commercial", type: "Commercial" },
// ];


// // ==========================================================
// // PROPERTY TYPE OPTIONS
// // ==========================================================

// const PROPERTY_TYPES = [
//   "Apartment",
//   "Villa",
//   "Independent House",
//   "Plot",
//   "Office Space",
//   "Shop / Showroom",
// ];


// // ==========================================================
// // BUDGET OPTIONS
// // ==========================================================

// const BUDGET_RANGES = [
//   { label: "Any budget", value: "" },
//   { label: "Under ₹25 Lakh", value: "0-2500000" },
//   { label: "₹25 Lakh - ₹50 Lakh", value: "2500000-5000000" },
//   { label: "₹50 Lakh - ₹1 Crore", value: "5000000-10000000" },
//   { label: "₹1 Crore - ₹2 Crore", value: "10000000-20000000" },
//   { label: "Above ₹2 Crore", value: "20000000-" },
// ];


// const Search = () => {

//   const history = useHistory();

//   const {
//     searchCity,
//     setSearchCity
//   } = useContext(SearchContext);


//   // ==========================================================
//   // SEARCH STATES
//   // ==========================================================

//   const [searchQuery, setSearchQuery] = useState("");

//   const [suggestions, setSuggestions] = useState([]);

//   const [showSuggestions, setShowSuggestions] = useState(false);

//   const [type, setType] = useState("");

//   const [budget, setBudget] = useState("");

//   const [activeTab, setActiveTab] = useState("Buy");

//   const [error, setError] = useState("");

//   const inputRef = useRef(null);


//   // ==========================================================
//   // VOICE SEARCH STATE
//   // ==========================================================

//   const [isListening, setIsListening] = useState(false);

//   const recognitionRef = useRef(null);


//   const GOOGLE_MAPS_API_KEY =
//     "AIzaSyAt8bj4UACvakZfiSy-0c1o_ivfplm7jEU";


//   // ==========================================================
//   // PLACEHOLDER
//   // ==========================================================

//   const placeholderTexts = [
//     "Search city, locality or project",
//     "Search Properties by Location",
//     "Enter City, Area",
//     'Search "Pune"',
//     'Search "Mumbai"',
//   ];


//   const [placeholderIndex, setPlaceholderIndex] = useState(0);


//   useEffect(() => {

//     const intervalId = setInterval(() => {

//       setPlaceholderIndex(
//         (prev) => (prev + 1) % placeholderTexts.length
//       );

//     }, 3000);


//     return () => clearInterval(intervalId);

//   }, []);


//   // ==========================================================
//   // LOCATION LOADING
//   // ==========================================================

//   const [isLoadingLocation, setIsLoadingLocation] = useState(false);


//   // ==========================================================
//   // VOICE SEARCH
//   // ==========================================================

//   const handleVoiceSearch = () => {

//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;


//     if (!SpeechRecognition) {

//       setError(
//         "Voice search is not supported in this browser. Please use Google Chrome."
//       );

//       return;
//     }


//     if (isListening && recognitionRef.current) {

//       recognitionRef.current.stop();

//       setIsListening(false);

//       return;
//     }


//     const recognition = new SpeechRecognition();

//     recognition.lang = "en-IN";
//     recognition.interimResults = false;
//     recognition.continuous = false;
//     recognition.maxAlternatives = 1;

//     recognitionRef.current = recognition;

//     recognition.onstart = () => {
//       setIsListening(true);
//       setError("");
//     };

//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript;

//       if (transcript) {
//         setSearchQuery(transcript);
//         setShowSuggestions(false);
//       }
//     };

//     recognition.onerror = (event) => {
//       console.error("Voice recognition error:", event.error);

//       setIsListening(false);

//       if (event.error === "not-allowed") {
//         setError("Please allow microphone access to use voice search.");
//       } else if (event.error === "no-speech") {
//         setError("No speech detected. Please try again.");
//       } else {
//         setError("Voice search failed. Please try again.");
//       }
//     };

//     recognition.onend = () => {
//       setIsListening(false);
//       recognitionRef.current = null;
//     };

//     recognition.start();

//   };


//   // ==========================================================
//   // NEAR ME SEARCH
//   // ==========================================================

//   const handleNearMeSearch = async (e) => {

//     e.preventDefault();

//     if (!navigator.geolocation) {
//       setError("Geolocation is not supported by your browser.");
//       return;
//     }

//     setIsLoadingLocation(true);
//     setError("");

//     navigator.geolocation.getCurrentPosition(

//       async (position) => {

//         const lat = position.coords.latitude;
//         const lng = position.coords.longitude;

//         try {

//           const response = await fetch(
//             `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
//           );

//           const data = await response.json();

//           setIsLoadingLocation(false);

//           if (data.status === "OK" && data.results.length > 0) {

//             let detectedCity = "";

//             const addressComponents = data.results[0].address_components;

//             for (let component of addressComponents) {
//               if (component.types.includes("locality")) {
//                 detectedCity = component.long_name;
//                 break;
//               }
//             }

//             if (detectedCity) {

//               setSearchCity(detectedCity);
//               setSearchQuery(detectedCity);

//               history.push({
//                 pathname: "/searchdashboard",
//                 state: {
//                   searchCity: detectedCity,
//                   searchQuery: "",
//                   type: type,
//                 },
//               });

//             } else {
//               setError("Unable to detect your city. Please enter it manually.");
//             }

//           } else {
//             setError("Failed to fetch city details from your location.");
//           }

//         } catch (error) {
//           setIsLoadingLocation(false);
//           setError("Network error. Please try again.");
//         }

//       },

//       (err) => {

//         setIsLoadingLocation(false);

//         if (err.code === 1) {
//           setError("Please allow location access to use the 'Near Me' feature.");
//         } else {
//           setError("Could not retrieve your location. Please try again.");
//         }

//       }

//     );

//   };


//   // ==========================================================
//   // SEARCH CHANGE
//   // ==========================================================

//   const handleSearchChange = async (e) => {

//     const value = e.target.value;

//     setSearchQuery(value);

//     if (!value.trim()) {
//       setSuggestions([]);
//       setShowSuggestions(false);
//       return;
//     }

//     try {

//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}/cust_api/search_suggestions`,
//         { query: value }
//       );

//       if (response.data.status === 1) {
//         setSuggestions(response.data.data);
//         setShowSuggestions(true);
//       } else {
//         setSuggestions([]);
//         setShowSuggestions(false);
//       }

//     } catch (error) {
//       console.error(error);
//     }

//   };


//   // ==========================================================
//   // SEARCH
//   // ==========================================================

//   const handleSearch = () => {

//     if (!searchQuery && !searchCity && !type) {
//       setError("Please enter what you're looking for.");
//       return;
//     }

//     setError("");

//     history.push({
//       pathname: "/searchdashboard",
//       state: {
//         searchCity,
//         searchQuery,
//         type,
//         budget,
//         listingType: activeTab,
//       },
//     });

//   };


//   // ==========================================================
//   // CLEANUP VOICE RECOGNITION
//   // ==========================================================

//   useEffect(() => {

//     return () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.stop();
//       }
//     };

//   }, []);


//   // ==========================================================
//   // UI
//   // ==========================================================

//   return (

//     <div className="relative flex items-center justify-center m-3 bg-white min-h-[200px] py-9 sm:py-18">

//       {/* Background */}

//       <div
//         className="absolute top-0 bottom-0 left-0 right-0 w-full h-full bg-center bg-cover rounded-3xl sm:rounded-3xl"
//         style={{ backgroundImage: "url('/image/modern.jpg')" }}
//       >
//         <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-slate-500/40 via-slate-600/50 to-slate-800/70"></div>
//       </div>


//       <div className="relative w-full max-w-6xl p-2 bg-transparent rounded-3xl mx-auto sm:p-6">


//         {/* ==================================================
//             BADGE
//         ================================================== */}

//         <div className="flex justify-center sm:justify-start mb-5">
//           <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-medium text-white rounded-full bg-white/15 backdrop-blur-sm border border-white/20">
//             <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
//             India's trusted zero-brokerage marketplace
//           </span>
//         </div>


//         {/* ==================================================
//             HEADING
//         ================================================== */}

//         <div className="mb-6 text-center sm:text-left sm:mb-8">

//           <h1
//             className="text-3xl sm:text-4xl lg:text-[42px] font-bold leading-tight text-white"
//             style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
//           >
//             Your <em className="italic text-amber-400">Perfect Home</em>
//             <br />
//             Is Closer Than You Think.
//           </h1>

//           <p className="max-w-xl mx-auto sm:mx-0 mt-4 text-sm sm:text-base text-gray-200">
//             Verified owners, AI-matched listings and a smoother way to
//             buy, rent or sell — across every major Indian city.
//           </p>

//         </div>


//         {/* ==================================================
//             SEARCH FORM
//         ================================================== */}

//         <div className="flex flex-col w-full bg-white rounded-2xl shadow-lg">


//           {/* ==================================================
//               TOP TABS
//           ================================================== */}

//           <div className="flex items-center gap-1 p-3 overflow-x-auto border-b border-gray-100 sm:gap-2">

//             {NAV_TABS.map((tab) => (

//               <button
//                 key={tab.key}
//                 type="button"
//                 onClick={() => setActiveTab(tab.key)}
//                 style={{
//                   padding: "8px 16px",
//                   border: "none",
//                   borderRadius: "8px",
//                   fontSize: "14px",
//                   fontWeight: 600,
//                   whiteSpace: "nowrap",
//                   cursor: "pointer",
//                   transition: "all 0.2s ease",
//                   background:
//                     activeTab === tab.key ? "#f3f4f6" : "transparent",
//                   color: activeTab === tab.key ? "#111827" : "#6b7280",
//                 }}
//               >
//                 {tab.label}
//               </button>

//             ))}

//           </div>


//           {/* ==================================================
//               TAB STYLE
//           ================================================== */}

//           <style>{`

//             /* ================= VOICE BUTTON ================= */

//             .voice-search-button {
//               width: 34px;
//               height: 34px;
//               min-width: 34px;

//               display: flex;
//               align-items: center;
//               justify-content: center;

//               border: none;
//               border-radius: 50%;

//               background: #fff8ed;
//               color: #c99a3e;

//               cursor: pointer;

//               transition: all 0.2s ease;
//             }

//             .voice-search-button:hover {
//               background: #fdf0d8;
//               color: #a87924;
//             }

//             .voice-search-button.listening {
//               background: #f7e2c0;
//               color: #8f641e;
//               animation: voicePulse 1.2s infinite;
//             }

//             @keyframes voicePulse {
//               0% { box-shadow: 0 0 0 0 rgba(201, 154, 62, 0.4); }
//               70% { box-shadow: 0 0 0 10px rgba(201, 154, 62, 0); }
//               100% { box-shadow: 0 0 0 0 rgba(201, 154, 62, 0); }
//             }

//             .search-field-label {
//               display: block;
//               font-size: 12px;
//               font-weight: 600;
//               color: #6b7280;
//               margin-bottom: 4px;
//             }

//           `}</style>


//           {/* ==================================================
//               BOTTOM SEARCH AREA
//           ================================================== */}

//           <div className="flex flex-col lg:flex-row items-stretch lg:items-center p-4 gap-4 lg:gap-0 lg:divide-x lg:divide-gray-100">


//             {/* ==================================================
//                 LOCATION
//             ================================================== */}

//             <div className="relative flex-1 lg:px-4">

//               <label className="search-field-label">Location</label>

//               <div className="flex items-center">

//                 <FaMapMarkerAlt className="shrink-0 text-amber-500" size={16} />

//                 <input
//                   ref={inputRef}
//                   type="text"
//                   id="search"
//                   placeholder={placeholderTexts[placeholderIndex]}
//                   className="w-full min-w-0 px-2 text-sm text-gray-800 bg-transparent outline-none border-none sm:text-[15px]"
//                   value={searchQuery}
//                   onChange={handleSearchChange}
//                 />

//                 <button
//                   type="button"
//                   onClick={handleVoiceSearch}
//                   title={isListening ? "Stop listening" : "Voice Search"}
//                   className={`voice-search-button ${isListening ? "listening" : ""}`}
//                 >
//                   <FaMicrophone size={14} />
//                 </button>

//                 <button
//                   type="button"
//                   onClick={handleNearMeSearch}
//                   disabled={isLoadingLocation}
//                   title="Search Near Me"
//                   className={`ml-1 flex items-center justify-center w-8 h-8 rounded-full transition ${isLoadingLocation
//                       ? "bg-gray-100 text-gray-400 animate-pulse"
//                       : "bg-rose-50 text-rose-500 hover:bg-rose-100"
//                     }`}
//                 >
//                   <MdMyLocation size={16} />
//                 </button>

//               </div>

//               {showSuggestions && suggestions.length > 0 && (

//                 <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">

//                   {suggestions.map((item, index) => (

//                     <div
//                       key={index}
//                       className="px-4 py-3 cursor-pointer hover:bg-gray-100 border-b last:border-b-0"
//                       onClick={() => {
//                         setSearchQuery(item.text);
//                         setShowSuggestions(false);
//                       }}
//                     >
//                       {item.text}
//                     </div>

//                   ))}

//                 </div>

//               )}

//             </div>


//             {/* ==================================================
//                 PROPERTY TYPE
//             ================================================== */}

//             <div className="flex-1 lg:px-4">

//               <label className="search-field-label">Property Type</label>

//               <div className="flex items-center">

//                 <FiHome className="shrink-0 text-amber-500" size={16} />

//                 <select
//                   id="type"
//                   className="w-full min-w-0 ml-2 text-sm sm:text-[15px] text-gray-800 bg-transparent outline-none border-none cursor-pointer"
//                   value={type}
//                   onChange={(e) => setType(e.target.value)}
//                 >
//                   <option value="">Property Type</option>

//                   {PROPERTY_TYPES.map((option) => (
//                     <option key={option} value={option}>
//                       {option}
//                     </option>
//                   ))}

//                 </select>

//               </div>

//             </div>


//             {/* ==================================================
//                 BUDGET
//             ================================================== */}

//             <div className="flex-1 lg:px-4">

//               <label className="search-field-label">Budget</label>

//               <div className="flex items-center">

//                 <FiDollarSign className="shrink-0 text-amber-500" size={16} />

//                 <select
//                   id="budget"
//                   className="w-full min-w-0 ml-2 text-sm sm:text-[15px] text-gray-800 bg-transparent outline-none border-none cursor-pointer"
//                   value={budget}
//                   onChange={(e) => setBudget(e.target.value)}
//                 >

//                   {BUDGET_RANGES.map((range) => (
//                     <option key={range.label} value={range.value}>
//                       {range.label}
//                     </option>
//                   ))}

//                 </select>

//               </div>

//             </div>


//             {/* ==================================================
//                 SEARCH BUTTON
//             ================================================== */}

//             <div className="lg:pl-4">

//               <button
//                 className="flex items-center justify-center w-full lg:w-auto gap-2 px-6 py-3 text-white transition-all duration-300 bg-slate-900 rounded-xl hover:bg-slate-800 font-medium shrink-0"
//                 onClick={handleSearch}
//               >
//                 <FiSearch size={18} />
//                 <span>Search</span>
//               </button>

//             </div>

//           </div>

//         </div>


//         {/* ==================================================
//             ERROR MESSAGE
//         ================================================== */}

//         {error && (

//           <div className="mt-3 text-center">
//             <span className="px-4 mt-4 text-sm text-center text-white bg-gray-800 rounded">
//               {error}
//             </span>
//           </div>

//         )}


//         {/* ==================================================
//             SUGGESTIONS
//         ================================================== */}

//         <div className="mt-6 text-center sm:mt-10">

//           <div className="flex flex-wrap justify-center gap-2 sm:justify-start">

//             <h3
//               className="w-full mt-2 sm:w-auto"
//               style={{
//                 fontSize: "1rem",
//                 color: "rgb(229, 231, 235)",
//                 marginBottom: "0.5rem",
//               }}
//             >
//               Suggestion:
//             </h3>

//             {[
//               "Ahmedabad",
//               "Bengaluru",
//               "Chennai",
//               "Delhi",
//               "Hyderabad",
//               "Kolkata",
//               "Mumbai",
//               "Pune",
//             ].map((location) => (

//               <Link
//                 key={location}
//                 to={`/citywiseproperties/${location}`}
//                 className="px-3 py-2 text-sm text-white no-underline rounded-full cursor-pointer bg-gray-900/20 backdrop-blur-sm bg-opacity-70 hover:bg-gray-600 hover:no-underline"
//               >
//                 {location}
//               </Link>

//             ))}

//           </div>

//         </div>

//       </div>

//     </div>

//   );

// };


// export default Search;


// ================================================3===========================

// import React, { useState, useEffect, useRef, useContext } from "react";
// import { Link, useHistory } from "react-router-dom";
// import axios from "axios";

// import {
//   FaSearch,
//   FaMapMarkerAlt,
//   FaMicrophone,
// } from "react-icons/fa";

// import { FiSearch, FiHome, FiDollarSign, FiChevronDown } from "react-icons/fi";
// import { MdMyLocation } from "react-icons/md";

// import { SearchContext } from "./SearchContext";


// // ==========================================================
// // NAVIGATION TABS
// // ==========================================================

// const NAV_TABS = [
//   { label: "Buy", key: "Buy", type: "Buy" },
//   { label: "Rent", key: "Rent", type: "Rent" },
//   { label: "PG", key: "PG", type: "PG/Co-living" },
//   { label: "Plots / Land", key: "Plot", type: "Plot/Land" },
//   { label: "Commercial", key: "Commercial", type: "Commercial" },
// ];


// // ==========================================================
// // PROPERTY TYPE OPTIONS
// // ==========================================================

// const PROPERTY_TYPES = [
//   "Apartment",
//   "Villa",
//   "Independent House",
//   "Plot",
//   "Office Space",
//   "Shop / Showroom",
// ];


// // ==========================================================
// // BUDGET OPTIONS
// // ==========================================================

// const BUDGET_RANGES = [
//   { label: "Any budget", value: "" },
//   { label: "Under ₹25 Lakh", value: "0-2500000" },
//   { label: "₹25 Lakh - ₹50 Lakh", value: "2500000-5000000" },
//   { label: "₹50 Lakh - ₹1 Crore", value: "5000000-10000000" },
//   { label: "₹1 Crore - ₹2 Crore", value: "10000000-20000000" },
//   { label: "Above ₹2 Crore", value: "20000000-" },
// ];


// const Search = () => {

//   const history = useHistory();

//   const {
//     searchCity,
//     setSearchCity
//   } = useContext(SearchContext);


//   // ==========================================================
//   // SEARCH STATES
//   // ==========================================================

//   const [searchQuery, setSearchQuery] = useState("");

//   const [suggestions, setSuggestions] = useState([]);

//   const [showSuggestions, setShowSuggestions] = useState(false);

//   const [type, setType] = useState("");

//   const [budget, setBudget] = useState("");

//   const [activeTab, setActiveTab] = useState("Buy");

//   const [error, setError] = useState("");

//   const inputRef = useRef(null);


//   // ==========================================================
//   // CUSTOM DROPDOWN STATES (Property Type / Budget)
//   // ==========================================================

//   const [propertyTypeOpen, setPropertyTypeOpen] = useState(false);

//   const [budgetOpen, setBudgetOpen] = useState(false);

//   const propertyTypeRef = useRef(null);

//   const budgetRef = useRef(null);


//   useEffect(() => {

//     const handleClickOutside = (e) => {

//       if (
//         propertyTypeRef.current &&
//         !propertyTypeRef.current.contains(e.target)
//       ) {
//         setPropertyTypeOpen(false);
//       }

//       if (
//         budgetRef.current &&
//         !budgetRef.current.contains(e.target)
//       ) {
//         setBudgetOpen(false);
//       }

//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () =>
//       document.removeEventListener("mousedown", handleClickOutside);

//   }, []);


//   // ==========================================================
//   // VOICE SEARCH STATE
//   // ==========================================================

//   const [isListening, setIsListening] = useState(false);

//   const recognitionRef = useRef(null);


//   const GOOGLE_MAPS_API_KEY =
//     "AIzaSyAt8bj4UACvakZfiSy-0c1o_ivfplm7jEU";


//   // ==========================================================
//   // PLACEHOLDER
//   // ==========================================================

//   const placeholderTexts = [
//     "Search city, locality or project",
//     "Search Properties by Location",
//     "Enter City, Area",
//     'Search "Pune"',
//     'Search "Mumbai"',
//   ];


//   const [placeholderIndex, setPlaceholderIndex] = useState(0);


//   useEffect(() => {

//     const intervalId = setInterval(() => {

//       setPlaceholderIndex(
//         (prev) => (prev + 1) % placeholderTexts.length
//       );

//     }, 3000);


//     return () => clearInterval(intervalId);

//   }, []);


//   // ==========================================================
//   // LOCATION LOADING
//   // ==========================================================

//   const [isLoadingLocation, setIsLoadingLocation] = useState(false);


//   // ==========================================================
//   // VOICE SEARCH
//   // ==========================================================

//   const handleVoiceSearch = () => {

//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;


//     if (!SpeechRecognition) {

//       setError(
//         "Voice search is not supported in this browser. Please use Google Chrome."
//       );

//       return;
//     }


//     if (isListening && recognitionRef.current) {

//       recognitionRef.current.stop();

//       setIsListening(false);

//       return;
//     }


//     const recognition = new SpeechRecognition();

//     recognition.lang = "en-IN";
//     recognition.interimResults = false;
//     recognition.continuous = false;
//     recognition.maxAlternatives = 1;

//     recognitionRef.current = recognition;

//     recognition.onstart = () => {
//       setIsListening(true);
//       setError("");
//     };

//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript;

//       if (transcript) {
//         setSearchQuery(transcript);
//         setShowSuggestions(false);
//       }
//     };

//     recognition.onerror = (event) => {
//       console.error("Voice recognition error:", event.error);

//       setIsListening(false);

//       if (event.error === "not-allowed") {
//         setError("Please allow microphone access to use voice search.");
//       } else if (event.error === "no-speech") {
//         setError("No speech detected. Please try again.");
//       } else {
//         setError("Voice search failed. Please try again.");
//       }
//     };

//     recognition.onend = () => {
//       setIsListening(false);
//       recognitionRef.current = null;
//     };

//     recognition.start();

//   };


//   // ==========================================================
//   // NEAR ME SEARCH
//   // ==========================================================

//   const handleNearMeSearch = async (e) => {

//     e.preventDefault();

//     if (!navigator.geolocation) {
//       setError("Geolocation is not supported by your browser.");
//       return;
//     }

//     setIsLoadingLocation(true);
//     setError("");

//     navigator.geolocation.getCurrentPosition(

//       async (position) => {

//         const lat = position.coords.latitude;
//         const lng = position.coords.longitude;

//         try {

//           const response = await fetch(
//             `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
//           );

//           const data = await response.json();

//           setIsLoadingLocation(false);

//           if (data.status === "OK" && data.results.length > 0) {

//             let detectedCity = "";

//             const addressComponents = data.results[0].address_components;

//             for (let component of addressComponents) {
//               if (component.types.includes("locality")) {
//                 detectedCity = component.long_name;
//                 break;
//               }
//             }

//             if (detectedCity) {

//               setSearchCity(detectedCity);
//               setSearchQuery(detectedCity);

//               history.push({
//                 pathname: "/searchdashboard",
//                 state: {
//                   searchCity: detectedCity,
//                   searchQuery: "",
//                   type: type,
//                 },
//               });

//             } else {
//               setError("Unable to detect your city. Please enter it manually.");
//             }

//           } else {
//             setError("Failed to fetch city details from your location.");
//           }

//         } catch (error) {
//           setIsLoadingLocation(false);
//           setError("Network error. Please try again.");
//         }

//       },

//       (err) => {

//         setIsLoadingLocation(false);

//         if (err.code === 1) {
//           setError("Please allow location access to use the 'Near Me' feature.");
//         } else {
//           setError("Could not retrieve your location. Please try again.");
//         }

//       }

//     );

//   };


//   // ==========================================================
//   // SEARCH CHANGE
//   // ==========================================================

//   const handleSearchChange = async (e) => {

//     const value = e.target.value;

//     setSearchQuery(value);

//     if (!value.trim()) {
//       setSuggestions([]);
//       setShowSuggestions(false);
//       return;
//     }

//     try {

//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}/cust_api/search_suggestions`,
//         { query: value }
//       );

//       if (response.data.status === 1) {
//         setSuggestions(response.data.data);
//         setShowSuggestions(true);
//       } else {
//         setSuggestions([]);
//         setShowSuggestions(false);
//       }

//     } catch (error) {
//       console.error(error);
//     }

//   };


//   // ==========================================================
//   // SEARCH
//   // ==========================================================

//   const handleSearch = () => {

//     if (!searchQuery && !searchCity && !type && !budget && !activeTab) {
//       setError("Please enter what you're looking for.");
//       return;
//     }

//     setError("");

//     history.push({
//       pathname: "/searchdashboard",
//       state: {
//         searchCity,
//         searchQuery,
//         type,
//         budget,
//         listingType: activeTab,
//       },
//     });

//   };


//   // ==========================================================
//   // CLEANUP VOICE RECOGNITION
//   // ==========================================================

//   useEffect(() => {

//     return () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.stop();
//       }
//     };

//   }, []);


//   // ==========================================================
//   // UI
//   // ==========================================================

//   return (

//     <div className="relative flex items-center justify-center m-3 bg-white min-h-[200px] py-9 sm:py-18">

//       {/* Background */}

//       <div
//         className="absolute top-0 bottom-0 left-0 right-0 w-full h-full bg-center bg-cover rounded-3xl sm:rounded-3xl"
//         style={{ backgroundImage: "url('/image/modern.jpg')" }}
//       >
//         <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-slate-500/40 via-slate-600/50 to-slate-800/70"></div>
//       </div>


//       <div className="relative w-full max-w-6xl p-2 bg-transparent rounded-3xl mx-auto sm:p-6">


//         {/* ==================================================
//             BADGE
//         ================================================== */}

//         <div className="flex justify-center sm:justify-start mb-5">
//           <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-medium text-white rounded-full bg-white/15 backdrop-blur-sm border border-white/20">
//             <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
//             India's trusted zero-brokerage marketplace
//           </span>
//         </div>


//         {/* ==================================================
//             HEADING
//         ================================================== */}

//         <div className="mb-6 text-center sm:text-left sm:mb-8">

//           <h1
//             className="text-3xl sm:text-4xl lg:text-[42px] font-bold leading-tight text-white"
//             style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
//           >
//             Your <em className="italic text-amber-400">Perfect Home</em>
//             <br />
//             Is Closer Than You Think.
//           </h1>

//           <p className="max-w-xl mx-auto sm:mx-0 mt-4 text-sm sm:text-base text-gray-200">
//             Verified owners, AI-matched listings and a smoother way to
//             buy, rent or sell — across every major Indian city.
//           </p>

//         </div>


//         {/* ==================================================
//             SEARCH FORM
//         ================================================== */}

//         <div className="flex flex-col w-full bg-white rounded-2xl shadow-lg">


//           {/* ==================================================
//               TOP TABS
//           ================================================== */}

//           <div className="flex items-center gap-1 p-3 overflow-x-auto border-b border-gray-100 sm:gap-2">

//             {NAV_TABS.map((tab) => (

//               <button
//                 key={tab.key}
//                 type="button"
//                 onClick={() => {
//                   setActiveTab(tab.key);

//                   history.push({
//                     pathname: "/property",
//                     state: { propertyType: tab.type },
//                   });
//                 }}
//                 style={{
//                   padding: "8px 16px",
//                   border: "none",
//                   borderRadius: "8px",
//                   fontSize: "14px",
//                   fontWeight: 600,
//                   whiteSpace: "nowrap",
//                   cursor: "pointer",
//                   transition: "all 0.2s ease",
//                   background:
//                     activeTab === tab.key ? "#f3f4f6" : "transparent",
//                   color: activeTab === tab.key ? "#111827" : "#6b7280",
//                 }}
//               >
//                 {tab.label}
//               </button>

//             ))}

//           </div>


//           {/* ==================================================
//               TAB STYLE
//           ================================================== */}

//           <style>{`

//             /* ================= VOICE BUTTON ================= */

//             .voice-search-button {
//               width: 34px;
//               height: 34px;
//               min-width: 34px;

//               display: flex;
//               align-items: center;
//               justify-content: center;

//               border: none;
//               border-radius: 50%;

//               background: #fff8ed;
//               color: #c99a3e;

//               cursor: pointer;

//               transition: all 0.2s ease;
//             }

//             .voice-search-button:hover {
//               background: #fdf0d8;
//               color: #a87924;
//             }

//             .voice-search-button.listening {
//               background: #f7e2c0;
//               color: #8f641e;
//               animation: voicePulse 1.2s infinite;
//             }

//             @keyframes voicePulse {
//               0% { box-shadow: 0 0 0 0 rgba(201, 154, 62, 0.4); }
//               70% { box-shadow: 0 0 0 10px rgba(201, 154, 62, 0); }
//               100% { box-shadow: 0 0 0 0 rgba(201, 154, 62, 0); }
//             }

//             .search-field-label {
//               display: block;
//               font-size: 12px;
//               font-weight: 600;
//               color: #6b7280;
//               margin-bottom: 4px;
//             }

//           `}</style>


//           {/* ==================================================
//               BOTTOM SEARCH AREA
//           ================================================== */}

//           <div className="flex flex-col lg:flex-row items-stretch lg:items-center p-4 gap-4 lg:gap-0 lg:divide-x lg:divide-gray-100">


//             {/* ==================================================
//                 LOCATION
//             ================================================== */}

//             <div className="relative flex-1 lg:px-4">

//               <label className="search-field-label">Location</label>

//               <div className="flex items-center">

//                 <FaMapMarkerAlt className="shrink-0 text-amber-500" size={16} />

//                 <input
//                   ref={inputRef}
//                   type="text"
//                   id="search"
//                   placeholder={placeholderTexts[placeholderIndex]}
//                   className="w-full min-w-0 px-2 text-sm text-gray-800 bg-transparent outline-none border-none sm:text-[15px]"
//                   value={searchQuery}
//                   onChange={handleSearchChange}
//                 />

//                 <button
//                   type="button"
//                   onClick={handleVoiceSearch}
//                   title={isListening ? "Stop listening" : "Voice Search"}
//                   className={`voice-search-button ${isListening ? "listening" : ""}`}
//                 >
//                   <FaMicrophone size={14} />
//                 </button>

//                 <button
//                   type="button"
//                   onClick={handleNearMeSearch}
//                   disabled={isLoadingLocation}
//                   title="Search Near Me"
//                   className={`ml-1 flex items-center justify-center w-8 h-8 rounded-full transition ${isLoadingLocation
//                     ? "bg-gray-100 text-gray-400 animate-pulse"
//                     : "bg-rose-50 text-rose-500 hover:bg-rose-100"
//                     }`}
//                 >
//                   <MdMyLocation size={16} />
//                 </button>

//               </div>

//               {showSuggestions && suggestions.length > 0 && (

//                 <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">

//                   {suggestions.map((item, index) => (

//                     <div
//                       key={index}
//                       className="px-4 py-3 cursor-pointer hover:bg-gray-100 border-b last:border-b-0"
//                       onClick={() => {
//                         setSearchQuery(item.text);
//                         setShowSuggestions(false);
//                       }}
//                     >
//                       {item.text}
//                     </div>

//                   ))}

//                 </div>

//               )}

//             </div>


//             {/* ==================================================
//                 PROPERTY TYPE
//             ================================================== */}

//             <div className="relative flex-1 lg:px-4" ref={propertyTypeRef}>

//               <label className="search-field-label">Property Type</label>

//               <button
//                 type="button"
//                 onClick={() => {
//                   setPropertyTypeOpen((open) => !open);
//                   setBudgetOpen(false);
//                 }}
//                 className="flex items-center w-full text-left"
//               >

//                 <FiHome className="shrink-0 text-amber-500" size={16} />

//                 <span className="flex-1 min-w-0 ml-2 text-sm sm:text-[15px] text-gray-800 truncate">
//                   {type || "Property Type"}
//                 </span>

//                 <FiChevronDown
//                   size={16}
//                   className={`shrink-0 text-gray-400 transition-transform ${propertyTypeOpen ? "rotate-180" : ""
//                     }`}
//                 />

//               </button>

//               {propertyTypeOpen && (

//                 <div className="absolute left-0 top-full z-50 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">

//                   <div
//                     onClick={() => {
//                       setType("");
//                       setPropertyTypeOpen(false);
//                     }}
//                     className={`px-4 py-2.5 text-sm cursor-pointer ${type === ""
//                       ? "bg-blue-600 text-white"
//                       : "text-gray-700 hover:bg-gray-100"
//                       }`}
//                   >
//                     Any Property Type
//                   </div>

//                   {PROPERTY_TYPES.map((option) => (

//                     <div
//                       key={option}
//                       onClick={() => {
//                         setType(option);
//                         setPropertyTypeOpen(false);
//                       }}
//                       className={`px-4 py-2.5 text-sm cursor-pointer ${type === option
//                         ? "bg-blue-600 text-white"
//                         : "text-gray-700 hover:bg-gray-100"
//                         }`}
//                     >
//                       {option}
//                     </div>

//                   ))}

//                 </div>

//               )}

//             </div>


//             {/* ==================================================
//                 BUDGET
//             ================================================== */}

//             <div className="relative flex-1 lg:px-4" ref={budgetRef}>

//               <label className="search-field-label">Budget</label>

//               <button
//                 type="button"
//                 onClick={() => {
//                   setBudgetOpen((open) => !open);
//                   setPropertyTypeOpen(false);
//                 }}
//                 className="flex items-center w-full text-left"
//               >

//                 <FiDollarSign className="shrink-0 text-amber-500" size={16} />

//                 <span className="flex-1 min-w-0 ml-2 text-sm sm:text-[15px] text-gray-800 truncate">
//                   {BUDGET_RANGES.find((range) => range.value === budget)
//                     ?.label || "Any budget"}
//                 </span>

//                 <FiChevronDown
//                   size={16}
//                   className={`shrink-0 text-gray-400 transition-transform ${budgetOpen ? "rotate-180" : ""
//                     }`}
//                 />

//               </button>

//               {budgetOpen && (

//                 <div className="absolute left-0 top-full z-50 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">

//                   {BUDGET_RANGES.map((range) => (

//                     <div
//                       key={range.label}
//                       onClick={() => {
//                         setBudget(range.value);
//                         setBudgetOpen(false);
//                       }}
//                       className={`px-4 py-2.5 text-sm cursor-pointer ${budget === range.value
//                         ? "bg-blue-600 text-white"
//                         : "text-gray-700 hover:bg-gray-100"
//                         }`}
//                     >
//                       {range.label}
//                     </div>

//                   ))}

//                 </div>

//               )}

//             </div>


//             {/* ==================================================
//                 SEARCH BUTTON
//             ================================================== */}

//             <div className="lg:pl-4">

//               <button
//                 className="flex items-center justify-center w-full lg:w-auto gap-2 px-6 py-3 text-white transition-all duration-300 bg-slate-900 rounded-xl hover:bg-slate-800 font-medium shrink-0"
//                 onClick={handleSearch}
//               >
//                 <FiSearch size={18} />
//                 <span>Search</span>
//               </button>

//             </div>

//           </div>

//         </div>


//         {/* ==================================================
//             ERROR MESSAGE
//         ================================================== */}

//         {error && (

//           <div className="mt-3 text-center">
//             <span className="px-4 mt-4 text-sm text-center text-white bg-gray-800 rounded">
//               {error}
//             </span>
//           </div>

//         )}


//         {/* ==================================================
//             SUGGESTIONS
//         ================================================== */}

//         <div className="mt-6 text-center sm:mt-10">

//           <div className="flex flex-wrap justify-center gap-2 sm:justify-start">

//             <h3
//               className="w-full mt-2 sm:w-auto"
//               style={{
//                 fontSize: "1rem",
//                 color: "rgb(229, 231, 235)",
//                 marginBottom: "0.5rem",
//               }}
//             >
//               Suggestion:
//             </h3>

//             {[
//               "Ahmedabad",
//               "Bengaluru",
//               "Chennai",
//               "Delhi",
//               "Hyderabad",
//               "Kolkata",
//               "Mumbai",
//               "Pune",
//             ].map((location) => (

//               <Link
//                 key={location}
//                 to={`/citywiseproperties/${location}`}
//                 className="px-3 py-2 text-sm text-white no-underline rounded-full cursor-pointer bg-gray-900/20 backdrop-blur-sm bg-opacity-70 hover:bg-gray-600 hover:no-underline"
//               >
//                 {location}
//               </Link>

//             ))}

//           </div>

//         </div>

//       </div>

//     </div>

//   );

// };


// export default Search;






// ==============================4141============================


// import React, { useState, useEffect, useRef, useContext } from "react";
// import { Link, useHistory } from "react-router-dom";
// import axios from "axios";

// import {
//   FaSearch,
//   FaCity,
//   FaPlus,
//   FaPlusCircle,
//   FaMapMarkerAlt,
//   FaHome,
//   FaMicrophone,
// } from "react-icons/fa";

// import { FiSearch } from "react-icons/fi";
// import { MdOutlineAddLocation, MdMyLocation } from "react-icons/md";
// import { RiHomeLine } from "react-icons/ri";
// import { BiRupee } from "react-icons/bi";

// import { SearchContext } from "./SearchContext";


// // ==========================================================
// // NAVIGATION TABS
// // ==========================================================

// const NAV_TABS = [
//   { label: "BUY", key: "Buy", type: "Buy" },
//   { label: "RENT", key: "Rent", type: "Rent" },
//   { label: "PG", key: "PG", type: "PG/Co-living" },
//   { label: "Plots/Land", key: "Plot", type: "Plot/Land" },
//   { label: "COMMERCIAL", key: "Commercial", type: "Commercial" },
// ];


// // ==========================================================
// // BUDGET OPTIONS
// // ==========================================================

// const BUDGET_RANGES = [
//   { label: "Any Budget", min: "", max: "" },
//   { label: "Under ₹25 Lakh", min: "", max: "2500000" },
//   { label: "₹25 Lakh - ₹50 Lakh", min: "2500000", max: "5000000" },
//   { label: "₹50 Lakh - ₹1 Crore", min: "5000000", max: "10000000" },
//   { label: "₹1 Crore - ₹2 Crore", min: "10000000", max: "20000000" },
//   { label: "Above ₹2 Crore", min: "20000000", max: "" },
// ];


// const Search = () => {

//   const history = useHistory();

//   const {
//     searchCity,
//     setSearchCity
//   } = useContext(SearchContext);


//   // ==========================================================
//   // SEARCH STATES
//   // ==========================================================

//   const [searchQuery, setSearchQuery] = useState("");

//   const [suggestions, setSuggestions] = useState([]);

//   const [showSuggestions, setShowSuggestions] = useState(false);

//   const [type, setType] = useState("");

//   const [error, setError] = useState("");

//   const inputRef = useRef(null);


//   // ==========================================================
//   // BUDGET STATE
//   // ==========================================================

//   const [budgetOpen, setBudgetOpen] = useState(false);

//   const [selectedBudget, setSelectedBudget] = useState(BUDGET_RANGES[0]);

//   const budgetRef = useRef(null);


//   // ==========================================================
//   // VOICE SEARCH STATE
//   // ==========================================================

//   const [isListening, setIsListening] = useState(false);

//   const recognitionRef = useRef(null);


//   const GOOGLE_MAPS_API_KEY =
//     "AIzaSyAt8bj4UACvakZfiSy-0c1o_ivfplm7jEU";


//   // ==========================================================
//   // TAB INDICATOR
//   // ==========================================================

//   const tabRefs = useRef({});

//   const [indicatorStyle, setIndicatorStyle] = useState({
//     left: 0,
//     width: 0,
//     opacity: 0,
//   });


//   const moveIndicator = (key) => {

//     const el = tabRefs.current[key];

//     if (el) {

//       setIndicatorStyle({
//         left: el.offsetLeft,
//         width: el.offsetWidth,
//         opacity: 1,
//       });

//     }
//   };


//   const handleTabMouseEnter = (key) => {
//     moveIndicator(key);
//   };


//   const handleTabRowMouseLeave = () => {

//     setIndicatorStyle((prev) => ({
//       ...prev,
//       opacity: 0,
//     }));

//   };


//   // ==========================================================
//   // CITY CHANGE
//   // ==========================================================

//   const handleCityChange = (e) => {

//     const selectedCity = e.target.value;

//     setSearchCity(selectedCity);

//   };


//   // ==========================================================
//   // CLOSE BUDGET DROPDOWN ON OUTSIDE CLICK
//   // ==========================================================

//   useEffect(() => {

//     const handleClickOutside = (e) => {

//       if (
//         budgetRef.current &&
//         !budgetRef.current.contains(e.target)
//       ) {
//         setBudgetOpen(false);
//       }

//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () =>
//       document.removeEventListener("mousedown", handleClickOutside);

//   }, []);


//   // ==========================================================
//   // PLACEHOLDER
//   // ==========================================================

//   const placeholderTexts = [
//     "Search by City or Locality...",
//     "Search Properties by Location",
//     "Enter City, Area",
//     'Search "Pune"',
//     'Search "Mumbai"',
//   ];


//   const [placeholderIndex, setPlaceholderIndex] = useState(0);


//   useEffect(() => {

//     const intervalId = setInterval(() => {

//       setPlaceholderIndex(
//         (prev) =>
//           (prev + 1) % placeholderTexts.length
//       );

//     }, 3000);


//     return () => clearInterval(intervalId);

//   }, []);


//   // ==========================================================
//   // LOCATION LOADING
//   // ==========================================================

//   const [isLoadingLocation, setIsLoadingLocation] =
//     useState(false);


//   // ==========================================================
//   // VOICE SEARCH
//   // ==========================================================

//   const handleVoiceSearch = () => {

//     const SpeechRecognition =
//       window.SpeechRecognition ||
//       window.webkitSpeechRecognition;


//     if (!SpeechRecognition) {

//       setError(
//         "Voice search is not supported in this browser. Please use Google Chrome."
//       );

//       return;
//     }


//     // If already listening, stop it
//     if (isListening && recognitionRef.current) {

//       recognitionRef.current.stop();

//       setIsListening(false);

//       return;
//     }


//     const recognition = new SpeechRecognition();


//     recognition.lang = "en-IN";

//     recognition.interimResults = false;

//     recognition.continuous = false;

//     recognition.maxAlternatives = 1;


//     recognitionRef.current = recognition;


//     // ================= START =================

//     recognition.onstart = () => {

//       setIsListening(true);

//       setError("");

//     };


//     // ================= RESULT =================

//     recognition.onresult = (event) => {

//       const transcript =
//         event.results[0][0].transcript;


//       if (transcript) {

//         setSearchQuery(transcript);

//         setShowSuggestions(false);

//       }

//     };


//     // ================= ERROR =================

//     recognition.onerror = (event) => {

//       console.error(
//         "Voice recognition error:",
//         event.error
//       );


//       setIsListening(false);


//       if (event.error === "not-allowed") {

//         setError(
//           "Please allow microphone access to use voice search."
//         );

//       } else if (event.error === "no-speech") {

//         setError(
//           "No speech detected. Please try again."
//         );

//       } else {

//         setError(
//           "Voice search failed. Please try again."
//         );

//       }

//     };


//     // ================= END =================

//     recognition.onend = () => {

//       setIsListening(false);

//       recognitionRef.current = null;

//     };


//     recognition.start();

//   };


//   // ==========================================================
//   // NEAR ME SEARCH
//   // ==========================================================

//   const handleNearMeSearch = async (e) => {

//     e.preventDefault();


//     if (!navigator.geolocation) {

//       setError(
//         "Geolocation is not supported by your browser."
//       );

//       return;
//     }


//     setIsLoadingLocation(true);

//     setError("");


//     navigator.geolocation.getCurrentPosition(

//       async (position) => {

//         const lat = position.coords.latitude;

//         const lng = position.coords.longitude;


//         try {

//           const response = await fetch(
//             `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
//           );


//           const data = await response.json();


//           setIsLoadingLocation(false);


//           if (
//             data.status === "OK" &&
//             data.results.length > 0
//           ) {

//             let detectedCity = "";


//             const addressComponents =
//               data.results[0].address_components;


//             for (
//               let component of addressComponents
//             ) {

//               if (
//                 component.types.includes(
//                   "locality"
//                 )
//               ) {

//                 detectedCity =
//                   component.long_name;

//                 break;

//               }

//             }


//             if (detectedCity) {

//               setSearchCity(detectedCity);


//               history.push({

//                 pathname:
//                   "/searchdashboard",

//                 state: {

//                   searchCity:
//                     detectedCity,

//                   searchQuery: "",

//                   type: type,

//                   min_price: selectedBudget.min || "",

//                   max_price: selectedBudget.max || "",

//                 },

//               });

//             } else {

//               setError(
//                 "Unable to detect your city. Please enter it manually."
//               );

//             }

//           } else {

//             setError(
//               "Failed to fetch city details from your location."
//             );

//           }

//         } catch (error) {

//           setIsLoadingLocation(false);

//           setError(
//             "Network error. Please try again."
//           );

//         }

//       },


//       (err) => {

//         setIsLoadingLocation(false);


//         if (err.code === 1) {

//           setError(
//             "Please allow location access to use the 'Near Me' feature."
//           );

//         } else {

//           setError(
//             "Could not retrieve your location. Please try again."
//           );

//         }

//       }

//     );

//   };


//   // ==========================================================
//   // SEARCH CHANGE
//   // ==========================================================

//   const handleSearchChange = async (e) => {

//     const value = e.target.value;


//     setSearchQuery(value);


//     if (!value.trim()) {

//       setSuggestions([]);

//       setShowSuggestions(false);

//       return;

//     }


//     try {

//       const response = await axios.post(

//         `${process.env.REACT_APP_API_URL}/cust_api/search_suggestions`,

//         {
//           query: value,
//         }

//       );


//       if (response.data.status === 1) {

//         setSuggestions(
//           response.data.data
//         );

//         setShowSuggestions(true);

//       } else {

//         setSuggestions([]);

//         setShowSuggestions(false);

//       }

//     } catch (error) {

//       console.error(error);

//     }

//   };


//   // ==========================================================
//   // SEARCH
//   // ==========================================================

//   const handleSearch = () => {

//     if (
//       !searchQuery &&
//       !searchCity &&
//       !type &&
//       !selectedBudget.min &&
//       !selectedBudget.max
//     ) {

//       setError(
//         "Please enter what you're looking for."
//       );

//       return;

//     }


//     setError("");


//     history.push({

//       pathname: "/searchdashboard",

//       state: {

//         searchCity,

//         searchQuery,

//         type,

//         min_price: selectedBudget.min || "",

//         max_price: selectedBudget.max || "",

//       },

//     });

//   };


//   // ==========================================================
//   // CLEANUP VOICE RECOGNITION
//   // ==========================================================

//   useEffect(() => {

//     return () => {

//       if (recognitionRef.current) {

//         recognitionRef.current.stop();

//       }

//     };

//   }, []);


//   // ==========================================================
//   // UI
//   // ==========================================================

//   return (

//     <div className="relative flex items-center justify-center m-3 bg-white min-h-[200px] py-9 sm:py-18">

//       {/* Background */}

//       <div
//         className="absolute top-0 bottom-0 left-0 right-0 w-full h-full bg-center bg-cover rounded-3xl sm:rounded-3xl"
//         style={{
//           backgroundImage:
//             "url('/image/modern.jpg')",
//         }}
//       ></div>


//       <div className="relative w-full max-w-6xl p-2 bg-transparent rounded-3xl mx-auto sm:p-6">


//         {/* ==================================================
//             HEADING
//         ================================================== */}

//         <div className="mb-6 text-center sm:mb-11">

//           <h1 className="text-2xl font-semibold tracking-widest text-white sm:text-2xl lg:text-3xl">

//             Your Perfect Home


//             <br />

//             Is Closer Than You Think.

//           </h1>

//         </div>


//         {/* ==================================================
//             SEARCH FORM
//         ================================================== */}

//         <div className="flex flex-col w-full bg-white rounded-2xl shadow-lg">


//           {/* ==================================================
//               TOP TABS
//           ================================================== */}

//           <div
//             className="relative flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-16 text-gray-700 font-semibold tracking-wider border-b border-gray-100 p-3"
//             onMouseLeave={handleTabRowMouseLeave}
//           >

//             {NAV_TABS.map((tab) => (

//               <Link
//                 key={tab.key}

//                 ref={(el) => {
//                   tabRefs.current[tab.key] =
//                     el;
//                 }}

//                 to={{
//                   pathname: "/property",
//                   state: {
//                     propertyType:
//                       tab.type,
//                   },
//                 }}

//                 onMouseEnter={() =>
//                   handleTabMouseEnter(
//                     tab.key
//                   )
//                 }

//                 className="nav-tab text-lg font-medium tracking-wider text-gray-600 no-underline hover:no-underline"
//               >

//                 {tab.label}

//               </Link>

//             ))}


//             {/* Indicator */}

//             <span
//               className="nav-tab-indicator hidden sm:block"
//               style={{
//                 left:
//                   indicatorStyle.left,

//                 width:
//                   indicatorStyle.width,

//                 opacity:
//                   indicatorStyle.opacity,
//               }}
//             />

//           </div>


//           {/* ==================================================
//               TAB STYLE
//           ================================================== */}

//           <style>{`

//             .nav-tab {
//               position: relative;
//               transition: color 0.3s ease;
//             }

//             .nav-tab:hover {
//               color: #8B1E3F;
//             }

//             .nav-tab-indicator {
//               position: absolute;
//               bottom: 6px;
//               height: 3px;
//               background-color: #8B1E3F;
//               opacity: 0;
//               transition:
//                 left 0.3s ease,
//                 width 0.3s ease,
//                 opacity 0.2s ease;
//             }

//             /* ================= VOICE BUTTON ================= */

//             .voice-search-button {
//               width: 38px;
//               height: 38px;
//               min-width: 38px;

//               display: flex;
//               align-items: center;
//               justify-content: center;

//               border: none;
//               border-radius: 50%;

//               background: #fff8ed;
//               color: #c99a3e;

//               cursor: pointer;

//               transition: all 0.2s ease;
//             }

//             .voice-search-button:hover {
//               background: #fdf0d8;
//               color: #a87924;
//             }

//             .voice-search-button.listening {
//               background: #f7e2c0;
//               color: #8f641e;

//               animation:
//                 voicePulse 1.2s infinite;
//             }

//             @keyframes voicePulse {

//               0% {
//                 box-shadow:
//                   0 0 0 0
//                   rgba(201, 154, 62, 0.4);
//               }

//               70% {
//                 box-shadow:
//                   0 0 0 10px
//                   rgba(201, 154, 62, 0);
//               }

//               100% {
//                 box-shadow:
//                   0 0 0 0
//                   rgba(201, 154, 62, 0);
//               }

//             }

//           `}</style>


//           {/* ==================================================
//               BOTTOM SEARCH AREA
//           ================================================== */}

//           <div className="flex flex-col lg:flex-row items-stretch lg:items-center p-3 gap-3 lg:gap-2">


//             {/* ==================================================
//                 SEARCH + DROPDOWNS
//             ================================================== */}

//             <div className="flex flex-col md:flex-row items-stretch md:items-center w-full flex-1 gap-2 md:gap-0 md:divide-x md:divide-gray-100">


//               {/* ==================================================
//                   SEARCH FIELD
//               ================================================== */}

//               <div className="relative flex items-center w-full px-2 py-2 md:py-1 md:pr-3">


//                 {/* Search Icon */}

//                 <button
//                   type="button"
//                   className="p-1 my-text rounded-full focus:outline-none shrink-0"
//                 >

//                   <FiSearch size={22} />

//                 </button>


//                 {/* Search Input */}

//                 <input
//                   ref={inputRef}

//                   type="text"

//                   id="search"

//                   placeholder={
//                     placeholderTexts[
//                     placeholderIndex
//                     ]
//                   }

//                   className="w-full min-w-0 px-2 ml-2 text-sm text-gray-600 bg-transparent outline-none border-none sm:text-base"

//                   value={searchQuery}

//                   onChange={
//                     handleSearchChange
//                   }
//                 />


//                 {/* ==================================================
//                     VOICE BUTTON
//                 ================================================== */}

//                 <button
//                   type="button"

//                   onClick={
//                     handleVoiceSearch
//                   }

//                   title={
//                     isListening
//                       ? "Stop listening"
//                       : "Voice Search"
//                   }

//                   className={`voice-search-button ${isListening
//                     ? "listening"
//                     : ""
//                     }`}
//                 >

//                   <FaMicrophone size={16} />

//                 </button>


//                 {/* ==================================================
//                     SUGGESTIONS
//                 ================================================== */}

//                 {showSuggestions &&
//                   suggestions.length >
//                   0 && (

//                     <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">

//                       {suggestions.map(
//                         (item, index) => (

//                           <div
//                             key={index}

//                             className="px-4 py-3 cursor-pointer hover:bg-gray-100 border-b last:border-b-0"

//                             onClick={() => {

//                               setSearchQuery(
//                                 item.text
//                               );

//                               setShowSuggestions(
//                                 false
//                               );

//                             }}
//                           >

//                             {item.text}

//                           </div>

//                         )
//                       )}

//                     </div>

//                   )}

//               </div>


//               {/* ==================================================
//                   CITY DROPDOWN
//               ================================================== */}

//               <div className="flex items-center w-full md:w-[220px] lg:w-[230px] px-2 py-2 md:px-3">

//                 <MdOutlineAddLocation
//                   className="my-text shrink-0"
//                   size={22}
//                 />

//                 <select
//                   id="city"

//                   className="w-full min-w-0 ml-2 text-sm sm:text-base text-gray-600 bg-transparent outline-none border-none cursor-pointer"

//                   value={searchCity}

//                   onChange={
//                     handleCityChange
//                   }
//                 >

//                   <option value="">
//                     Select a City
//                   </option>

//                   <option value="Ahmedabad">
//                     Ahmedabad
//                   </option>

//                   <option value="Bengaluru">
//                     Bengaluru
//                   </option>

//                   <option value="Chennai">
//                     Chennai
//                   </option>

//                   <option value="Delhi">
//                     Delhi
//                   </option>

//                   <option value="Hyderabad">
//                     Hyderabad
//                   </option>

//                   <option value="Kolkata">
//                     Kolkata
//                   </option>

//                   <option value="Mumbai">
//                     Mumbai
//                   </option>

//                   <option value="Pune">
//                     Pune
//                   </option>

//                 </select>

//               </div>


//               {/* ==================================================
//                   PROPERTY TYPE (Residential / Commercial only)
//               ================================================== */}

//               <div className="flex items-center w-full md:w-[190px] lg:w-[200px] px-2 py-2 md:px-3">

//                 <RiHomeLine
//                   className="my-text shrink-0"
//                   size={22}
//                 />

//                 <select
//                   id="type"

//                   className="w-full min-w-0 ml-2 text-sm sm:text-base text-gray-600 bg-transparent outline-none border-none cursor-pointer truncate"

//                   value={type}

//                   onChange={(e) =>
//                     setType(
//                       e.target.value
//                     )
//                   }
//                 >

//                   <option value="">
//                     Property Type
//                   </option>

//                   <option value="Residential">
//                     Residential
//                   </option>

//                   <option value="Commercial">
//                     Commercial
//                   </option>

//                 </select>

//               </div>


//               {/* ==================================================
//                   BUDGET DROPDOWN
//               ================================================== */}

//               <div
//                 className="relative flex items-center w-full md:w-[190px] lg:w-[200px] px-2 py-2 md:px-3"
//                 ref={budgetRef}
//               >

//                 <BiRupee
//                   className="my-text shrink-0"
//                   size={22}
//                 />

//                 <button
//                   type="button"
//                   onClick={() =>
//                     setBudgetOpen((open) => !open)
//                   }
//                   className="w-full min-w-0 ml-2 text-sm sm:text-base text-gray-600 bg-transparent outline-none border-none cursor-pointer truncate text-left"
//                 >
//                   {selectedBudget.label}
//                 </button>

//                 {budgetOpen && (
//                   <div className="absolute left-0 top-full z-50 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
//                     {BUDGET_RANGES.map((range) => (
//                       <div
//                         key={range.label}
//                         onClick={() => {
//                           setSelectedBudget(range);
//                           setBudgetOpen(false);
//                         }}
//                         className={`px-4 py-2.5 text-sm cursor-pointer ${selectedBudget.label === range.label
//                           ? "bg-blue-600 text-white"
//                           : "text-gray-700 hover:bg-gray-100"
//                           }`}
//                       >
//                         {range.label}
//                       </div>
//                     ))}
//                   </div>
//                 )}

//               </div>


//               {/* ==================================================
//                   NEAR ME
//               ================================================== */}

//               <div className="flex items-center justify-center md:justify-start p-2 relative group shrink-0">

//                 <button

//                   onClick={
//                     handleNearMeSearch
//                   }

//                   disabled={
//                     isLoadingLocation
//                   }

//                   type="button"

//                   className={`flex items-center justify-center p-2 transition rounded-full focus:outline-none ${isLoadingLocation
//                     ? "bg-gray-100 text-gray-400 animate-pulse"
//                     : "bg-rose-50 my-text hover:bg-rose-100"
//                     }`}
//                 >

//                   <MdMyLocation
//                     size={20}
//                   />

//                 </button>


//                 {/* Tooltip */}

//                 <div className="absolute right-0 items-center hidden px-3 py-2 text-sm text-[#0f172a] whitespace-nowrap bg-white border border-gray-100 rounded shadow-lg top-12 group-hover:flex z-50">

//                   <div className="absolute top-[-5px] right-3 w-3 h-3 bg-white border-t border-l border-gray-100 transform rotate-45"></div>

//                   <MdMyLocation
//                     size={16}
//                     className="mr-1 my-text"
//                   />

//                   Search

//                   <span className="ml-1 font-bold">
//                     Near Me
//                   </span>

//                 </div>

//               </div>

//             </div>


//             {/* ==================================================
//                 SEARCH BUTTON
//             ================================================== */}

//             <button

//               className="flex items-center justify-center w-full lg:w-auto gap-2 px-6 py-2.5 text-white transition-all duration-300 my-bg rounded-lg hover:opacity-90 font-medium shrink-0"

//               onClick={
//                 handleSearch
//               }
//             >

//               <FiSearch size={20} />

//               <span className="inline">
//                 Search
//               </span>

//             </button>

//           </div>

//         </div>


//         {/* ==================================================
//             ERROR MESSAGE
//         ================================================== */}

//         {error && (

//           <div className="mt-3 text-center">

//             <span className="px-4 mt-4 text-sm text-center text-white bg-gray-800 rounded">

//               {error}

//             </span>

//           </div>

//         )}


//         {/* ==================================================
//             SUGGESTIONS
//         ================================================== */}

//         <div className="mt-6 text-center sm:mt-10">

//           <div className="flex flex-wrap justify-center gap-2 sm:justify-start">

//             <h3
//               className="w-full mt-2 sm:w-auto"
//               style={{
//                 fontSize: "1rem",
//                 color: "rgb(229, 231, 235)",
//                 marginBottom:
//                   "0.5rem",
//               }}
//             >

//               Suggestion:

//             </h3>


//             {[
//               "Ahmedabad",
//               "Bengaluru",
//               "Chennai",
//               "Delhi",
//               "Hyderabad",
//               "Kolkata",
//               "Mumbai",
//               "Pune",
//             ].map((location) => (

//               <Link
//                 key={location}

//                 to={`/citywiseproperties/${location}`}

//                 className="px-3 py-2 text-sm text-white no-underline rounded-full cursor-pointer bg-gray-900/20 backdrop-blur-sm bg-transparnt/70 bg-opacity-70 hover:bg-gray-600 hover:no-underline"
//               >

//                 {location}

//               </Link>

//             ))}

//           </div>

//         </div>

//       </div>

//     </div>

//   );

// };

// export default Search;


// -------------------------1419----------------













// import React, { useState, useEffect, useRef, useContext } from "react";
// import { Link, useHistory } from "react-router-dom";
// import axios from "axios";

// import { FaMapMarkerAlt, FaMicrophone } from "react-icons/fa";
// import { FiSearch, FiHome, FiDollarSign, FiChevronDown } from "react-icons/fi";
// import { MdMyLocation } from "react-icons/md";

// import { SearchContext } from "./SearchContext";


// // ==========================================================
// // NAVIGATION TABS
// // ==========================================================

// const NAV_TABS = [
//   { label: "Buy", key: "Buy", type: "Buy" },
//   { label: "Rent", key: "Rent", type: "Rent" },
//   { label: "PG", key: "PG", type: "PG/Co-living" },
//   { label: "Plots / Land", key: "Plot", type: "Plot/Land" },
//   { label: "Commercial", key: "Commercial", type: "Commercial" },
// ];


// // ==========================================================
// // PROPERTY TYPE OPTIONS
// // ==========================================================

// const PROPERTY_TYPES = [
//   "Flat/Apartment",
//   "Home/Villa",
//   "Independent House/Villa",
//   "Plot/Land",
//   "Office Space",
//   "Retail Shops/Showrooms",
// ];


// // ==========================================================
// // BUDGET OPTIONS
// // ==========================================================

// const BUDGET_RANGES = [
//   { label: "Any Budget", min: "", max: "" },
//   { label: "Under ₹25 Lakh", min: "", max: "2500000" },
//   { label: "₹25 Lakh - ₹50 Lakh", min: "2500000", max: "5000000" },
//   { label: "₹50 Lakh - ₹1 Crore", min: "5000000", max: "10000000" },
//   { label: "₹1 Crore - ₹2 Crore", min: "10000000", max: "20000000" },
//   { label: "Above ₹2 Crore", min: "20000000", max: "" },
// ];


// const Search = () => {

//   const history = useHistory();

//   const { searchCity, setSearchCity } = useContext(SearchContext);


//   // ==========================================================
//   // SEARCH STATES
//   // ==========================================================

//   const [searchQuery, setSearchQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [type, setType] = useState("");
//   const [budget, setBudget] = useState("");
//   const [activeTab, setActiveTab] = useState("Buy");
//   const [error, setError] = useState("");
//   const inputRef = useRef(null);


//   // ==========================================================
//   // CUSTOM DROPDOWN STATES (Property Type / Budget)
//   // ==========================================================

//   const [propertyTypeOpen, setPropertyTypeOpen] = useState(false);
//   const [budgetOpen, setBudgetOpen] = useState(false);

//   const propertyTypeRef = useRef(null);
//   const budgetRef = useRef(null);


//   useEffect(() => {

//     const handleClickOutside = (e) => {

//       if (propertyTypeRef.current && !propertyTypeRef.current.contains(e.target)) {
//         setPropertyTypeOpen(false);
//       }

//       if (budgetRef.current && !budgetRef.current.contains(e.target)) {
//         setBudgetOpen(false);
//       }

//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);

//   }, []);


//   // ==========================================================
//   // VOICE SEARCH STATE
//   // ==========================================================

//   const [isListening, setIsListening] = useState(false);
//   const recognitionRef = useRef(null);

//   const GOOGLE_MAPS_API_KEY = "AIzaSyAt8bj4UACvakZfiSy-0c1o_ivfplm7jEU";


//   // ==========================================================
//   // PLACEHOLDER
//   // ==========================================================

//   const placeholderTexts = [
//     "Search city, locality or project",
//     "Search Properties by Location",
//     "Enter City, Area",
//     'Search "Pune"',
//     'Search "Mumbai"',
//   ];

//   const [placeholderIndex, setPlaceholderIndex] = useState(0);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setPlaceholderIndex((prev) => (prev + 1) % placeholderTexts.length);
//     }, 3000);
//     return () => clearInterval(intervalId);
//   }, []);


//   // ==========================================================
//   // LOCATION LOADING
//   // ==========================================================

//   const [isLoadingLocation, setIsLoadingLocation] = useState(false);


//   // ==========================================================
//   // VOICE SEARCH
//   // ==========================================================

//   const handleVoiceSearch = () => {

//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       setError("Voice search is not supported in this browser. Please use Google Chrome.");
//       return;
//     }

//     if (isListening && recognitionRef.current) {
//       recognitionRef.current.stop();
//       setIsListening(false);
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.lang = "en-IN";
//     recognition.interimResults = false;
//     recognition.continuous = false;
//     recognition.maxAlternatives = 1;

//     recognitionRef.current = recognition;

//     recognition.onstart = () => {
//       setIsListening(true);
//       setError("");
//     };

//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript;
//       if (transcript) {
//         setSearchQuery(transcript);
//         setShowSuggestions(false);
//       }
//     };

//     recognition.onerror = (event) => {
//       console.error("Voice recognition error:", event.error);
//       setIsListening(false);

//       if (event.error === "not-allowed") {
//         setError("Please allow microphone access to use voice search.");
//       } else if (event.error === "no-speech") {
//         setError("No speech detected. Please try again.");
//       } else {
//         setError("Voice search failed. Please try again.");
//       }
//     };

//     recognition.onend = () => {
//       setIsListening(false);
//       recognitionRef.current = null;
//     };

//     recognition.start();
//   };


//   // ==========================================================
//   // NEAR ME SEARCH
//   // ==========================================================

//   const handleNearMeSearch = async (e) => {

//     e.preventDefault();

//     if (!navigator.geolocation) {
//       setError("Geolocation is not supported by your browser.");
//       return;
//     }

//     setIsLoadingLocation(true);
//     setError("");

//     navigator.geolocation.getCurrentPosition(

//       async (position) => {

//         const lat = position.coords.latitude;
//         const lng = position.coords.longitude;

//         try {

//           const response = await fetch(
//             `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
//           );

//           const data = await response.json();

//           setIsLoadingLocation(false);

//           if (data.status === "OK" && data.results.length > 0) {

//             let detectedCity = "";
//             const addressComponents = data.results[0].address_components;

//             for (let component of addressComponents) {
//               if (component.types.includes("locality")) {
//                 detectedCity = component.long_name;
//                 break;
//               }
//             }

//             if (detectedCity) {

//               setSearchCity(detectedCity);
//               setSearchQuery(detectedCity);

//               history.push({
//                 pathname: "/searchdashboard",
//                 state: {
//                   searchCity: detectedCity,
//                   searchQuery: "",
//                   type: type,
//                   listingType: activeTab,
//                   min_price: budget ? budget.split("-")[0] : "",
//                   max_price: budget ? budget.split("-")[1] : "",
//                 },
//               });

//             } else {
//               setError("Unable to detect your city. Please enter it manually.");
//             }

//           } else {
//             setError("Failed to fetch city details from your location.");
//           }

//         } catch (error) {
//           setIsLoadingLocation(false);
//           setError("Network error. Please try again.");
//         }

//       },

//       (err) => {
//         setIsLoadingLocation(false);

//         if (err.code === 1) {
//           setError("Please allow location access to use the 'Near Me' feature.");
//         } else {
//           setError("Could not retrieve your location. Please try again.");
//         }
//       }

//     );

//   };


//   // ==========================================================
//   // SEARCH CHANGE
//   // ==========================================================

//   const handleSearchChange = async (e) => {

//     const value = e.target.value;
//     setSearchQuery(value);

//     if (!value.trim()) {
//       setSuggestions([]);
//       setShowSuggestions(false);
//       return;
//     }

//     try {

//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}/cust_api/search_suggestions`,
//         { query: value }
//       );

//       if (response.data.status === 1) {
//         setSuggestions(response.data.data);
//         setShowSuggestions(true);
//       } else {
//         setSuggestions([]);
//         setShowSuggestions(false);
//       }

//     } catch (error) {
//       console.error(error);
//     }

//   };


//   // ==========================================================
//   // SEARCH
//   // ==========================================================

//   const handleSearch = () => {

//     if (!searchQuery && !searchCity && !type && !budget && !activeTab) {
//       setError("Please enter what you're looking for.");
//       return;
//     }

//     setError("");

//     let min_price = "";
//     let max_price = "";

//     if (budget) {
//       const selected = BUDGET_RANGES.find((b) => `${b.min}-${b.max}` === budget);
//       if (selected) {
//         min_price = selected.min;
//         max_price = selected.max;
//       }
//     }

//     history.push({
//       pathname: "/searchdashboard",
//       state: {
//         searchCity,
//         searchQuery,
//         type,
//         listingType: activeTab,
//         min_price,
//         max_price,
//       },
//     });

//   };


//   // ==========================================================
//   // CLEANUP VOICE RECOGNITION
//   // ==========================================================

//   useEffect(() => {
//     return () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.stop();
//       }
//     };
//   }, []);


//   // ==========================================================
//   // UI
//   // ==========================================================

//   return (

//     <div className="relative flex items-center justify-center m-3 bg-white min-h-[200px] py-9 sm:py-18">

//       {/* Background */}

//       <div
//         className="absolute top-0 bottom-0 left-0 right-0 w-full h-full bg-center bg-cover rounded-3xl sm:rounded-3xl"
//         style={{ backgroundImage: "url('/image/modern.jpg')" }}
//       >
//         <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-slate-500/40 via-slate-600/50 to-slate-800/70"></div>
//       </div>


//       <div className="relative w-full max-w-6xl p-2 bg-transparent rounded-3xl mx-auto sm:p-6">


//         {/* ==================================================
//             BADGE
//         ================================================== */}

//         <div className="flex justify-center sm:justify-start mb-5">
//           <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-medium text-white rounded-full bg-white/15 backdrop-blur-sm border border-white/20">
//             <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
//             India's trusted zero-brokerage marketplace
//           </span>
//         </div>


//         {/* ==================================================
//             HEADING
//         ================================================== */}

//         <div className="mb-6 text-center sm:text-left sm:mb-8">

//           <h1
//             className="text-3xl sm:text-4xl lg:text-[42px] font-bold leading-tight text-white"
//             style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
//           >

//             <em className="italic text-amber-400">Your Perfect Home</em>
//             <br />
//             Is Closer Than You Think.
//           </h1>

//           <p className="max-w-xl mx-auto sm:mx-0 mt-4 text-sm sm:text-base text-gray-200">
//             Verified owners, AI-matched listings and a smoother way to
//             buy, rent or sell — across every major Indian city.
//           </p>

//         </div>


//         {/* ==================================================
//             SEARCH FORM
//         ================================================== */}

//         <div className="flex flex-col w-full bg-white rounded-2xl shadow-lg">


//           {/* ==================================================
//               TOP TABS
//           ================================================== */}

//           <div className="flex items-center gap-1 p-3 overflow-x-auto border-b border-gray-100 sm:gap-2">

//             {NAV_TABS.map((tab) => (

//               <button
//                 key={tab.key}
//                 type="button"
//                 onClick={() => {
//                   setActiveTab(tab.key);

//                   history.push({
//                     pathname: "/property",
//                     state: { propertyType: tab.type },
//                   });
//                 }}
//                 style={{
//                   padding: "8px 16px",
//                   border: "none",
//                   borderRadius: "8px",
//                   fontSize: "14px",
//                   fontWeight: 600,
//                   whiteSpace: "nowrap",
//                   cursor: "pointer",
//                   transition: "all 0.2s ease",
//                   background: activeTab === tab.key ? "#f3f4f6" : "transparent",
//                   color: activeTab === tab.key ? "#111827" : "#6b7280",
//                 }}
//               >
//                 {tab.label}
//               </button>

//             ))}

//           </div>


//           {/* ==================================================
//               STYLE
//           ================================================== */}

//           <style>{`

//             .voice-search-button {
//               width: 34px;
//               height: 34px;
//               min-width: 34px;
//               display: flex;
//               align-items: center;
//               justify-content: center;
//               border: none;
//               border-radius: 50%;
//               background: #fff8ed;
//               color: #c99a3e;
//               cursor: pointer;
//               transition: all 0.2s ease;
//             }

//             .voice-search-button:hover {
//               background: #fdf0d8;
//               color: #a87924;
//             }

//             .voice-search-button.listening {
//               background: #f7e2c0;
//               color: #8f641e;
//               animation: voicePulse 1.2s infinite;
//             }

//             @keyframes voicePulse {
//               0% { box-shadow: 0 0 0 0 rgba(201, 154, 62, 0.4); }
//               70% { box-shadow: 0 0 0 10px rgba(201, 154, 62, 0); }
//               100% { box-shadow: 0 0 0 0 rgba(201, 154, 62, 0); }
//             }

//             .search-field-label {
//               display: block;
//               font-size: 12px;
//               font-weight: 600;
//               color: #6b7280;
//               margin-bottom: 4px;
//             }

//           `}</style>


//           {/* ==================================================
//               BOTTOM SEARCH AREA
//           ================================================== */}

//           <div className="flex flex-col lg:flex-row items-stretch lg:items-center p-4 gap-4 lg:gap-0 lg:divide-x lg:divide-gray-100">


//             {/* ==================================================
//                 LOCATION
//             ================================================== */}

//             <div className="relative flex-1 lg:px-4">

//               <label className="search-field-label">Location</label>

//               <div className="flex items-center">

//                 <FaMapMarkerAlt className="shrink-0 text-amber-500" size={16} />

//                 <input
//                   ref={inputRef}
//                   type="text"
//                   id="search"
//                   placeholder={placeholderTexts[placeholderIndex]}
//                   className="w-full min-w-0 px-2 text-sm text-gray-800 bg-transparent outline-none border-none sm:text-[15px]"
//                   value={searchQuery}
//                   onChange={handleSearchChange}
//                 />

//                 <button
//                   type="button"
//                   onClick={handleVoiceSearch}
//                   title={isListening ? "Stop listening" : "Voice Search"}
//                   className={`voice-search-button ${isListening ? "listening" : ""}`}
//                 >
//                   <FaMicrophone size={14} />
//                 </button>

//                 <button
//                   type="button"
//                   onClick={handleNearMeSearch}
//                   disabled={isLoadingLocation}
//                   title="Search Near Me"
//                   className={`ml-1 flex items-center justify-center w-8 h-8 rounded-full transition ${isLoadingLocation
//                     ? "bg-gray-100 text-gray-400 animate-pulse"
//                     : "bg-rose-50 text-rose-500 hover:bg-rose-100"
//                     }`}
//                 >
//                   <MdMyLocation size={16} />
//                 </button>

//               </div>

//               {showSuggestions && suggestions.length > 0 && (

//                 <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">

//                   {suggestions.map((item, index) => (

//                     <div
//                       key={index}
//                       className="px-4 py-3 cursor-pointer hover:bg-gray-100 border-b last:border-b-0"
//                       onClick={() => {
//                         setSearchQuery(item.text);
//                         setShowSuggestions(false);
//                       }}
//                     >
//                       {item.text}
//                     </div>

//                   ))}

//                 </div>

//               )}

//             </div>


//             {/* ==================================================
//                 PROPERTY TYPE
//             ================================================== */}

//             <div className="relative flex-1 lg:px-4" ref={propertyTypeRef}>

//               <label className="search-field-label">Property Type</label>

//               <button
//                 type="button"
//                 onClick={() => {
//                   setPropertyTypeOpen((open) => !open);
//                   setBudgetOpen(false);
//                 }}
//                 className="flex items-center w-full text-left"
//               >

//                 <FiHome className="shrink-0 text-amber-500" size={16} />

//                 <span className="flex-1 min-w-0 ml-2 text-sm sm:text-[15px] text-gray-800 truncate">
//                   {type || "Property Type"}
//                 </span>

//                 <FiChevronDown
//                   size={16}
//                   className={`shrink-0 text-gray-400 transition-transform ${propertyTypeOpen ? "rotate-180" : ""}`}
//                 />

//               </button>

//               {propertyTypeOpen && (

//                 <div className="absolute left-0 top-full z-50 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">

//                   <div
//                     onClick={() => {
//                       setType("");
//                       setPropertyTypeOpen(false);
//                     }}
//                     className={`px-4 py-2.5 text-sm cursor-pointer ${type === "" ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"}`}
//                   >
//                     Any Property Type
//                   </div>

//                   {PROPERTY_TYPES.map((option) => (

//                     <div
//                       key={option}
//                       onClick={() => {
//                         setType(option);
//                         setPropertyTypeOpen(false);
//                       }}
//                       className={`px-4 py-2.5 text-sm cursor-pointer ${type === option ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"}`}
//                     >
//                       {option}
//                     </div>

//                   ))}

//                 </div>

//               )}

//             </div>


//             {/* ==================================================
//                 BUDGET
//             ================================================== */}

//             <div className="relative flex-1 lg:px-4" ref={budgetRef}>

//               <label className="search-field-label">Budget</label>

//               <button
//                 type="button"
//                 onClick={() => {
//                   setBudgetOpen((open) => !open);
//                   setPropertyTypeOpen(false);
//                 }}
//                 className="flex items-center w-full text-left"
//               >

//                 <FiDollarSign className="shrink-0 text-amber-500" size={16} />

//                 <span className="flex-1 min-w-0 ml-2 text-sm sm:text-[15px] text-gray-800 truncate">
//                   {BUDGET_RANGES.find((range) => `${range.min}-${range.max}` === budget)?.label || "Any budget"}
//                 </span>

//                 <FiChevronDown
//                   size={16}
//                   className={`shrink-0 text-gray-400 transition-transform ${budgetOpen ? "rotate-180" : ""}`}
//                 />

//               </button>

//               {budgetOpen && (

//                 <div className="absolute left-0 top-full z-50 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">

//                   {BUDGET_RANGES.map((range) => {
//                     const value = `${range.min}-${range.max}`;
//                     return (
//                       <div
//                         key={range.label}
//                         onClick={() => {
//                           setBudget(value);
//                           setBudgetOpen(false);
//                         }}
//                         className={`px-4 py-2.5 text-sm cursor-pointer ${budget === value ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"}`}
//                       >
//                         {range.label}
//                       </div>
//                     );
//                   })}

//                 </div>

//               )}

//             </div>


//             {/* ==================================================
//                 SEARCH BUTTON
//             ================================================== */}

//             <div className="lg:pl-4">

//               <button
//                 className="flex items-center justify-center w-full lg:w-auto gap-2 px-6 py-3 text-white transition-all duration-300 bg-slate-900 rounded-xl hover:bg-slate-800 font-medium shrink-0"
//                 onClick={handleSearch}
//               >
//                 <FiSearch size={18} />
//                 <span>Search</span>
//               </button>

//             </div>

//           </div>

//         </div>


//         {/* ==================================================
//             ERROR MESSAGE
//         ================================================== */}

//         {error && (

//           <div className="mt-3 text-center">
//             <span className="px-4 mt-4 text-sm text-center text-white bg-gray-800 rounded">
//               {error}
//             </span>
//           </div>

//         )}


//         {/* ==================================================
//             SUGGESTIONS
//         ================================================== */}

//         <div className="mt-6 text-center sm:mt-10">

//           <div className="flex flex-wrap justify-center gap-2 sm:justify-start">

//             <h3
//               className="w-full mt-2 sm:w-auto"
//               style={{
//                 fontSize: "1rem",
//                 color: "rgb(229, 231, 235)",
//                 marginBottom: "0.5rem",
//               }}
//             >
//               Suggestion:
//             </h3>

//             {[
//               "Ahmedabad",
//               "Bengaluru",
//               "Chennai",
//               "Delhi",
//               "Hyderabad",
//               "Kolkata",
//               "Mumbai",
//               "Pune",
//             ].map((location) => (

//               <Link
//                 key={location}
//                 to={`/citywiseproperties/${location}`}
//                 className="px-3 py-2 text-sm text-white no-underline rounded-full cursor-pointer bg-gray-900/20 backdrop-blur-sm bg-opacity-70 hover:bg-gray-600 hover:no-underline"
//               >
//                 {location}
//               </Link>

//             ))}

//           </div>

//         </div>

//       </div>

//     </div>

//   );

// };

// export default Search;









// =========================+-+-+-+-0123=====================



// import React, { useState, useEffect, useRef, useContext } from "react";
// import { Link, useHistory } from "react-router-dom";
// import axios from "axios";

// import { FaMapMarkerAlt, FaMicrophone } from "react-icons/fa";
// import { FiSearch, FiHome, FiDollarSign, FiChevronDown } from "react-icons/fi";
// import { MdMyLocation } from "react-icons/md";

// import { SearchContext } from "./SearchContext";


// // ==========================================================
// // NAVIGATION TABS
// // ==========================================================

// const NAV_TABS = [
//   { label: "Buy", key: "Buy", type: "Buy" },
//   { label: "Rent", key: "Rent", type: "Rent" },
//   { label: "PG", key: "PG", type: "PG/Co-living" },
//   { label: "Plots / Land", key: "Plot", type: "Plot/Land" },
//   { label: "Commercial", key: "Commercial", type: "Commercial" },
// ];


// // ==========================================================
// // PROPERTY TYPE OPTIONS
// // ==========================================================
// const PROPERTY_TYPES = [
//   "Residential",
//   "Commercial",
// ];

// // ==========================================================
// // BUDGET OPTIONS
// // ==========================================================

// const BUDGET_RANGES = [
//   { label: "Any Budget", min: "", max: "" },
//   { label: "Under ₹25 Lakh", min: "", max: "2500000" },
//   { label: "₹25 Lakh - ₹50 Lakh", min: "2500000", max: "5000000" },
//   { label: "₹50 Lakh - ₹1 Crore", min: "5000000", max: "10000000" },
//   { label: "₹1 Crore - ₹2 Crore", min: "10000000", max: "20000000" },
//   { label: "Above ₹2 Crore", min: "20000000", max: "" },
// ];


// // ==========================================================
// // CITY OPTIONS (Location dropdown)
// // ==========================================================

// const CITIES = [
//   "Ahmedabad",
//   "Bengaluru",
//   "Chennai",
//   "Delhi",
//   "Hyderabad",
//   "Kolkata",
//   "Mumbai",
//   "Pune",
// ];


// const Search = () => {

//   const history = useHistory();

//   const { searchCity, setSearchCity } = useContext(SearchContext);


//   // ==========================================================
//   // SEARCH STATES
//   // ==========================================================

//   const [searchQuery, setSearchQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [type, setType] = useState("");
//   const [budget, setBudget] = useState("");
//   const [activeTab, setActiveTab] = useState("Buy");
//   const [error, setError] = useState("");
//   const inputRef = useRef(null);


//   // ==========================================================
//   // CUSTOM DROPDOWN STATES (Property Type / Budget / Location City)
//   // ==========================================================

//   const [propertyTypeOpen, setPropertyTypeOpen] = useState(false);
//   const [budgetOpen, setBudgetOpen] = useState(false);
//   const [cityDropdownOpen, setCityDropdownOpen] = useState(false); // NEW

//   const propertyTypeRef = useRef(null);
//   const budgetRef = useRef(null);
//   const locationFieldRef = useRef(null); // NEW


//   useEffect(() => {

//     const handleClickOutside = (e) => {

//       if (propertyTypeRef.current && !propertyTypeRef.current.contains(e.target)) {
//         setPropertyTypeOpen(false);
//       }

//       if (budgetRef.current && !budgetRef.current.contains(e.target)) {
//         setBudgetOpen(false);
//       }

//       // NEW: close city dropdown on outside click
//       if (locationFieldRef.current && !locationFieldRef.current.contains(e.target)) {
//         setCityDropdownOpen(false);
//       }

//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);

//   }, []);


//   // ==========================================================
//   // VOICE SEARCH STATE
//   // ==========================================================

//   const [isListening, setIsListening] = useState(false);
//   const recognitionRef = useRef(null);

//   const GOOGLE_MAPS_API_KEY = "AIzaSyAt8bj4UACvakZfiSy-0c1o_ivfplm7jEU";


//   // ==========================================================
//   // PLACEHOLDER
//   // ==========================================================

//   const placeholderTexts = [
//     "Search city, locality or project",
//     "Search Properties by Location",
//     "Enter City, Area",
//     'Search "Pune"',
//     'Search "Mumbai"',
//   ];

//   const [placeholderIndex, setPlaceholderIndex] = useState(0);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setPlaceholderIndex((prev) => (prev + 1) % placeholderTexts.length);
//     }, 3000);
//     return () => clearInterval(intervalId);
//   }, []);


//   // ==========================================================
//   // LOCATION LOADING
//   // ==========================================================

//   const [isLoadingLocation, setIsLoadingLocation] = useState(false);


//   // ==========================================================
//   // VOICE SEARCH
//   // ==========================================================

//   const handleVoiceSearch = () => {

//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       setError("Voice search is not supported in this browser. Please use Google Chrome.");
//       return;
//     }

//     if (isListening && recognitionRef.current) {
//       recognitionRef.current.stop();
//       setIsListening(false);
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.lang = "en-IN";
//     recognition.interimResults = false;
//     recognition.continuous = false;
//     recognition.maxAlternatives = 1;

//     recognitionRef.current = recognition;

//     recognition.onstart = () => {
//       setIsListening(true);
//       setError("");
//     };

//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript;
//       if (transcript) {
//         setSearchQuery(transcript);
//         setShowSuggestions(false);
//       }
//     };

//     recognition.onerror = (event) => {
//       console.error("Voice recognition error:", event.error);
//       setIsListening(false);

//       if (event.error === "not-allowed") {
//         setError("Please allow microphone access to use voice search.");
//       } else if (event.error === "no-speech") {
//         setError("No speech detected. Please try again.");
//       } else {
//         setError("Voice search failed. Please try again.");
//       }
//     };

//     recognition.onend = () => {
//       setIsListening(false);
//       recognitionRef.current = null;
//     };

//     recognition.start();
//   };


//   // ==========================================================
//   // NEAR ME SEARCH
//   // ==========================================================

//   const handleNearMeSearch = async (e) => {

//     e.preventDefault();

//     if (!navigator.geolocation) {
//       setError("Geolocation is not supported by your browser.");
//       return;
//     }

//     setIsLoadingLocation(true);
//     setError("");

//     navigator.geolocation.getCurrentPosition(

//       async (position) => {

//         const lat = position.coords.latitude;
//         const lng = position.coords.longitude;

//         try {

//           const response = await fetch(
//             `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
//           );

//           const data = await response.json();

//           setIsLoadingLocation(false);

//           if (data.status === "OK" && data.results.length > 0) {

//             let detectedCity = "";
//             const addressComponents = data.results[0].address_components;

//             for (let component of addressComponents) {
//               if (component.types.includes("locality")) {
//                 detectedCity = component.long_name;
//                 break;
//               }
//             }

//             if (detectedCity) {

//               setSearchCity(detectedCity);
//               setSearchQuery(detectedCity);

//               history.push({
//                 pathname: "/searchdashboard",
//                 state: {
//                   searchCity: detectedCity,
//                   searchQuery: "",
//                   type: type,
//                   listingType: activeTab,
//                   min_price: budget ? budget.split("-")[0] : "",
//                   max_price: budget ? budget.split("-")[1] : "",
//                 },
//               });

//             } else {
//               setError("Unable to detect your city. Please enter it manually.");
//             }

//           } else {
//             setError("Failed to fetch city details from your location.");
//           }

//         } catch (error) {
//           setIsLoadingLocation(false);
//           setError("Network error. Please try again.");
//         }

//       },

//       (err) => {
//         setIsLoadingLocation(false);

//         if (err.code === 1) {
//           setError("Please allow location access to use the 'Near Me' feature.");
//         } else {
//           setError("Could not retrieve your location. Please try again.");
//         }
//       }

//     );

//   };


//   // ==========================================================
//   // SEARCH CHANGE
//   // ==========================================================

//   const handleSearchChange = async (e) => {

//     const value = e.target.value;
//     setSearchQuery(value);

//     // NEW: typing closes the city dropdown so it doesn't overlap suggestions
//     setCityDropdownOpen(false);

//     if (!value.trim()) {
//       setSuggestions([]);
//       setShowSuggestions(false);
//       return;
//     }

//     try {

//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}/cust_api/search_suggestions`,
//         { query: value }
//       );

//       if (response.data.status === 1) {
//         setSuggestions(response.data.data);
//         setShowSuggestions(true);
//       } else {
//         setSuggestions([]);
//         setShowSuggestions(false);
//       }

//     } catch (error) {
//       console.error(error);
//     }

//   };


//   // ==========================================================
//   // SEARCH
//   // ==========================================================

//   const handleSearch = () => {

//     if (!searchQuery && !searchCity && !type && !budget && !activeTab) {
//       setError("Please enter what you're looking for.");
//       return;
//     }

//     setError("");

//     let min_price = "";
//     let max_price = "";

//     if (budget) {
//       const selected = BUDGET_RANGES.find((b) => `${b.min}-${b.max}` === budget);
//       if (selected) {
//         min_price = selected.min;
//         max_price = selected.max;
//       }
//     }

//     history.push({
//       pathname: "/searchdashboard",
//       state: {
//         searchCity,
//         searchQuery,
//         type,
//         listingType: activeTab,
//         min_price,
//         max_price,
//       },
//     });

//   };


//   // ==========================================================
//   // CLEANUP VOICE RECOGNITION
//   // ==========================================================

//   useEffect(() => {
//     return () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.stop();
//       }
//     };
//   }, []);


//   // ==========================================================
//   // UI
//   // ==========================================================

//   return (

//     <div className="relative flex items-center justify-center m-3 bg-white min-h-[200px] py-9 sm:py-18">

//       {/* Background */}

//       <div
//         className="absolute top-0 bottom-0 left-0 right-0 w-full h-full bg-center bg-cover rounded-3xl sm:rounded-3xl"
//         style={{ backgroundImage: "url('/image/modern.jpg')" }}
//       >
//         <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-slate-500/40 via-slate-600/50 to-slate-800/70"></div>
//       </div>


//       <div className="relative w-full max-w-6xl p-2 bg-transparent rounded-3xl mx-auto sm:p-6">


//         {/* ==================================================
//             BADGE
//         ================================================== */}

//         <div className="flex justify-center sm:justify-start mb-5">
//           <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-medium text-white rounded-full bg-white/15 backdrop-blur-sm border border-white/20">
//             <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
//             India's trusted zero-brokerage marketplace
//           </span>
//         </div>


//         {/* ==================================================
//             HEADING
//         ================================================== */}

//         <div className="mb-6 text-center sm:text-left sm:mb-8">

//           <h1
//             className="text-3xl sm:text-4xl lg:text-[42px] font-bold leading-tight text-white"
//             style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
//           >
//             Let's find your home
//             <br />
//             that's <em className="italic text-amber-400">perfect</em> for you.
//           </h1>

//           <p className="max-w-xl mx-auto sm:mx-0 mt-4 text-sm sm:text-base text-gray-200">
//             Verified owners, AI-matched listings and a smoother way to
//             buy, rent or sell — across every major Indian city.
//           </p>

//         </div>


//         {/* ==================================================
//             SEARCH FORM
//         ================================================== */}

//         <div className="flex flex-col w-full bg-white rounded-2xl shadow-lg">


//           {/* ==================================================
//               TOP TABS
//           ================================================== */}

//           <div className="flex items-center gap-1 p-3 overflow-x-auto border-b border-gray-100 sm:gap-2">

//             {NAV_TABS.map((tab) => (

//               <button
//                 key={tab.key}
//                 type="button"
//                 onClick={() => {
//                   setActiveTab(tab.key);

//                   history.push({
//                     pathname: "/property",
//                     state: { propertyType: tab.type },
//                   });
//                 }}
//                 style={{
//                   padding: "8px 16px",
//                   border: "none",
//                   borderRadius: "8px",
//                   fontSize: "14px",
//                   fontWeight: 600,
//                   whiteSpace: "nowrap",
//                   cursor: "pointer",
//                   transition: "all 0.2s ease",
//                   background: activeTab === tab.key ? "#f3f4f6" : "transparent",
//                   color: activeTab === tab.key ? "#111827" : "#6b7280",
//                 }}
//               >
//                 {tab.label}
//               </button>

//             ))}

//           </div>


//           {/* ==================================================
//               STYLE
//           ================================================== */}

//           <style>{`

//             .voice-search-button {
//               width: 34px;
//               height: 34px;
//               min-width: 34px;
//               display: flex;
//               align-items: center;
//               justify-content: center;
//               border: none;
//               border-radius: 50%;
//               background: #fff8ed;
//               color: #c99a3e;
//               cursor: pointer;
//               transition: all 0.2s ease;
//             }

//             .voice-search-button:hover {
//               background: #fdf0d8;
//               color: #a87924;
//             }

//             .voice-search-button.listening {
//               background: #f7e2c0;
//               color: #8f641e;
//               animation: voicePulse 1.2s infinite;
//             }

//             @keyframes voicePulse {
//               0% { box-shadow: 0 0 0 0 rgba(201, 154, 62, 0.4); }
//               70% { box-shadow: 0 0 0 10px rgba(201, 154, 62, 0); }
//               100% { box-shadow: 0 0 0 0 rgba(201, 154, 62, 0); }
//             }

//             .search-field-label {
//               display: block;
//               font-size: 12px;
//               font-weight: 600;
//               color: #6b7280;
//               margin-bottom: 4px;
//             }

//           `}</style>


//           {/* ==================================================
//               BOTTOM SEARCH AREA
//           ================================================== */}

//           <div className="flex flex-col lg:flex-row items-stretch lg:items-center p-4 gap-4 lg:gap-0 lg:divide-x lg:divide-gray-100">


//             {/* ==================================================
//                 LOCATION  (ONLY SECTION CHANGED)
//             ================================================== */}

//             {/* ==================================================
//     LOCATION (Search field + separate City dropdown)
// ================================================== */}

//             <div className="relative flex-1 lg:px-4">

//               <label className="search-field-label">Location</label>

//               <div className="flex items-center gap-3">

//                 {/* ---- Search Input ---- */}
//                 <div className="flex items-center flex-1 min-w-0">

//                   <FaMapMarkerAlt className="shrink-0 text-amber-500" size={16} />

//                   <input
//                     ref={inputRef}
//                     type="text"
//                     id="search"
//                     placeholder={placeholderTexts[placeholderIndex]}
//                     className="w-full min-w-0 px-2 text-sm text-gray-800 bg-transparent outline-none border-none sm:text-[15px]"
//                     value={searchQuery}
//                     onChange={handleSearchChange}
//                     onFocus={() => setCityDropdownOpen(false)}
//                   />

//                   <button
//                     type="button"
//                     onClick={handleVoiceSearch}
//                     title={isListening ? "Stop listening" : "Voice Search"}
//                     className={`voice-search-button ${isListening ? "listening" : ""}`}
//                   >
//                     <FaMicrophone size={14} />
//                   </button>

//                   <button
//                     type="button"
//                     onClick={handleNearMeSearch}
//                     disabled={isLoadingLocation}
//                     title="Search Near Me"
//                     className={`ml-1 flex items-center justify-center w-8 h-8 rounded-full transition ${isLoadingLocation
//                       ? "bg-gray-100 text-gray-400 animate-pulse"
//                       : "bg-rose-50 text-rose-500 hover:bg-rose-100"
//                       }`}
//                   >
//                     <MdMyLocation size={16} />
//                   </button>

//                 </div>

//                 {/* ---- City Dropdown (separate, matches image 1) ---- */}
//                 <div className="relative shrink-0" ref={locationFieldRef}>

//                   <button
//                     type="button"
//                     onClick={() => {
//                       setCityDropdownOpen((open) => !open);
//                       setShowSuggestions(false);
//                     }}
//                     className="flex items-center gap-1.5 text-sm sm:text-[15px] text-gray-800 whitespace-nowrap"
//                   >
//                     <FaMapMarkerAlt className="shrink-0 text-amber-500" size={14} />
//                     <span>{searchCity || "City"}</span>
//                     <FiChevronDown
//                       size={14}
//                       className={`shrink-0 text-gray-400 transition-transform ${cityDropdownOpen ? "rotate-180" : ""}`}
//                     />
//                   </button>

//                   {cityDropdownOpen && (

//                     <div className="absolute right-0 top-full z-50 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">

//                       {CITIES.map((city) => {
//                         const isSelected = searchCity === city;

//                         return (
//                           <div
//                             key={city}
//                             onClick={() => {
//                               setSearchCity(city);
//                               setCityDropdownOpen(false);
//                             }}
//                             className={`px-4 py-2.5 text-sm cursor-pointer ${isSelected
//                               ? "bg-blue-600 text-white"
//                               : "text-gray-700 hover:bg-gray-100"
//                               }`}
//                           >
//                             {city}
//                           </div>
//                         );
//                       })}

//                     </div>

//                   )}

//                 </div>

//               </div>

//               {/* Existing search-text suggestions (unchanged) */}
//               {showSuggestions && suggestions.length > 0 && (

//                 <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">

//                   {suggestions.map((item, index) => (

//                     <div
//                       key={index}
//                       className="px-4 py-3 cursor-pointer hover:bg-gray-100 border-b last:border-b-0"
//                       onClick={() => {
//                         setSearchQuery(item.text);
//                         setShowSuggestions(false);
//                       }}
//                     >
//                       {item.text}
//                     </div>

//                   ))}

//                 </div>

//               )}

//             </div>


//             {/* ==================================================
//                 PROPERTY TYPE
//             ================================================== */}

//             <div className="relative flex-1 lg:px-4" ref={propertyTypeRef}>

//               <label className="search-field-label">Property Type</label>

//               <button
//                 type="button"
//                 onClick={() => {
//                   setPropertyTypeOpen((open) => !open);
//                   setBudgetOpen(false);
//                 }}
//                 className="flex items-center w-full text-left"
//               >

//                 <FiHome className="shrink-0 text-amber-500" size={16} />

//                 <span className="flex-1 min-w-0 ml-2 text-sm sm:text-[15px] text-gray-800 truncate">
//                   {type || "Property Type"}
//                 </span>

//                 <FiChevronDown
//                   size={16}
//                   className={`shrink-0 text-gray-400 transition-transform ${propertyTypeOpen ? "rotate-180" : ""}`}
//                 />

//               </button>

//               {propertyTypeOpen && (

//                 <div className="absolute left-0 top-full z-50 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">

//                   <div
//                     onClick={() => {
//                       setType("");
//                       setPropertyTypeOpen(false);
//                     }}
//                     className={`px-4 py-2.5 text-sm cursor-pointer ${type === "" ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"}`}
//                   >
//                     Any Property Type
//                   </div>

//                   {PROPERTY_TYPES.map((option) => (

//                     <div
//                       key={option}
//                       onClick={() => {
//                         setType(option);
//                         setPropertyTypeOpen(false);
//                       }}
//                       className={`px-4 py-2.5 text-sm cursor-pointer ${type === option ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"}`}
//                     >
//                       {option}
//                     </div>

//                   ))}

//                 </div>

//               )}

//             </div>


//             {/* ==================================================
//                 BUDGET
//             ================================================== */}

//             <div className="relative flex-1 lg:px-4" ref={budgetRef}>

//               <label className="search-field-label">Budget</label>

//               <button
//                 type="button"
//                 onClick={() => {
//                   setBudgetOpen((open) => !open);
//                   setPropertyTypeOpen(false);
//                 }}
//                 className="flex items-center w-full text-left"
//               >

//                 <FiDollarSign className="shrink-0 text-amber-500" size={16} />

//                 <span className="flex-1 min-w-0 ml-2 text-sm sm:text-[15px] text-gray-800 truncate">
//                   {BUDGET_RANGES.find((range) => `${range.min}-${range.max}` === budget)?.label || "Any budget"}
//                 </span>

//                 <FiChevronDown
//                   size={16}
//                   className={`shrink-0 text-gray-400 transition-transform ${budgetOpen ? "rotate-180" : ""}`}
//                 />

//               </button>

//               {budgetOpen && (

//                 <div className="absolute left-0 top-full z-50 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">

//                   {BUDGET_RANGES.map((range) => {
//                     const value = `${range.min}-${range.max}`;
//                     return (
//                       <div
//                         key={range.label}
//                         onClick={() => {
//                           setBudget(value);
//                           setBudgetOpen(false);
//                         }}
//                         className={`px-4 py-2.5 text-sm cursor-pointer ${budget === value ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"}`}
//                       >
//                         {range.label}
//                       </div>
//                     );
//                   })}

//                 </div>

//               )}

//             </div>


//             {/* ==================================================
//                 SEARCH BUTTON
//             ================================================== */}

//             <div className="lg:pl-4">

//               <button
//                 className="flex items-center justify-center w-full lg:w-auto gap-2 px-6 py-3 text-white transition-all duration-300 bg-slate-900 rounded-xl hover:bg-slate-800 font-medium shrink-0"
//                 onClick={handleSearch}
//               >
//                 <FiSearch size={18} />
//                 <span>Search</span>
//               </button>

//             </div>

//           </div>

//         </div>


//         {/* ==================================================
//             ERROR MESSAGE
//         ================================================== */}

//         {error && (

//           <div className="mt-3 text-center">
//             <span className="px-4 mt-4 text-sm text-center text-white bg-gray-800 rounded">
//               {error}
//             </span>
//           </div>

//         )}


//         {/* ==================================================
//             SUGGESTIONS
//         ================================================== */}

//         <div className="mt-6 text-center sm:mt-10">

//           <div className="flex flex-wrap justify-center gap-2 sm:justify-start">

//             <h3
//               className="w-full mt-2 sm:w-auto"
//               style={{
//                 fontSize: "1rem",
//                 color: "rgb(229, 231, 235)",
//                 marginBottom: "0.5rem",
//               }}
//             >
//               Suggestion:
//             </h3>

//             {[
//               "Ahmedabad",
//               "Bengaluru",
//               "Chennai",
//               "Delhi",
//               "Hyderabad",
//               "Kolkata",
//               "Mumbai",
//               "Pune",
//             ].map((location) => (

//               <Link
//                 key={location}
//                 to={`/citywiseproperties/${location}`}
//                 className="px-3 py-2 text-sm text-white no-underline rounded-full cursor-pointer bg-gray-900/20 backdrop-blur-sm bg-opacity-70 hover:bg-gray-600 hover:no-underline"
//               >
//                 {location}
//               </Link>

//             ))}

//           </div>

//         </div>

//       </div>

//     </div>

//   );

// };

// export default Search;



















// old code and new code are the same, so no changes needed here.
// import React, { useState, useEffect, useRef, useContext } from "react";
// import { Link, useHistory } from "react-router-dom";
// import axios from "axios";

// import { FaMapMarkerAlt, FaMicrophone } from "react-icons/fa";
// import { FiSearch, FiHome, FiDollarSign, FiChevronDown } from "react-icons/fi";
// import { MdMyLocation } from "react-icons/md";

// import { SearchContext } from "./SearchContext";


// // ==========================================================
// // NAVIGATION TABS
// // ==========================================================

// const NAV_TABS = [
//   { label: "Buy", key: "Buy", type: "Buy" },
//   { label: "Rent", key: "Rent", type: "Rent" },
//   { label: "PG", key: "PG", type: "PG/Co-living" },
//   { label: "Plots / Land", key: "Plot", type: "Plot/Land" },
//   { label: "Commercial", key: "Commercial", type: "Commercial" },
// ];


// // ==========================================================
// // PROPERTY TYPE OPTIONS
// // ==========================================================

// const PROPERTY_TYPES = [
//   "Residential",
//   "Commercial",
// ];


// // ==========================================================
// // BUDGET OPTIONS
// // ==========================================================

// const BUDGET_RANGES = [
//   { label: "Any Budget", min: "", max: "" },
//   { label: "Under ₹25 Lakh", min: "", max: "2500000" },
//   { label: "₹25 Lakh - ₹50 Lakh", min: "2500000", max: "5000000" },
//   { label: "₹50 Lakh - ₹1 Crore", min: "5000000", max: "10000000" },
//   { label: "₹1 Crore - ₹2 Crore", min: "10000000", max: "20000000" },
//   { label: "Above ₹2 Crore", min: "20000000", max: "" },
// ];


// // ==========================================================
// // CITY OPTIONS (Location dropdown)
// // ==========================================================

// const CITIES = [
//   "Select a City",
//   "Ahmedabad",
//   "Bengaluru",
//   "Chennai",
//   "Delhi",
//   "Hyderabad",
//   "Kolkata",
//   "Mumbai",
//   "Pune",
// ];


// const Search = () => {

//   const history = useHistory();

//   const { searchCity, setSearchCity } = useContext(SearchContext);


//   // ==========================================================
//   // SEARCH STATES
//   // ==========================================================

//   const [searchQuery, setSearchQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [type, setType] = useState("");
//   const [budget, setBudget] = useState("");
//   const [activeTab, setActiveTab] = useState("Buy");
//   const [error, setError] = useState("");
//   const inputRef = useRef(null);


//   // ==========================================================
//   // CUSTOM DROPDOWN STATES (Property Type / Budget / Location City)
//   // ==========================================================

//   const [propertyTypeOpen, setPropertyTypeOpen] = useState(false);
//   const [budgetOpen, setBudgetOpen] = useState(false);
//   const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

//   const propertyTypeRef = useRef(null);
//   const budgetRef = useRef(null);
//   const locationFieldRef = useRef(null);


//   useEffect(() => {

//     const handleClickOutside = (e) => {

//       if (propertyTypeRef.current && !propertyTypeRef.current.contains(e.target)) {
//         setPropertyTypeOpen(false);
//       }

//       if (budgetRef.current && !budgetRef.current.contains(e.target)) {
//         setBudgetOpen(false);
//       }

//       if (locationFieldRef.current && !locationFieldRef.current.contains(e.target)) {
//         setCityDropdownOpen(false);
//       }

//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);

//   }, []);


//   // ==========================================================
//   // VOICE SEARCH STATE
//   // ==========================================================

//   const [isListening, setIsListening] = useState(false);
//   const recognitionRef = useRef(null);

//   const GOOGLE_MAPS_API_KEY = "AIzaSyAt8bj4UACvakZfiSy-0c1o_ivfplm7jEU";


//   // ==========================================================
//   // PLACEHOLDER
//   // ==========================================================

//   const placeholderTexts = [
//     "Search city, locality or project",
//     "Search Properties by Location",
//     "Enter City, Area",
//     'Search "Pune"',
//     'Search "Mumbai"',
//   ];

//   const [placeholderIndex, setPlaceholderIndex] = useState(0);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setPlaceholderIndex((prev) => (prev + 1) % placeholderTexts.length);
//     }, 3000);
//     return () => clearInterval(intervalId);
//   }, []);


//   // ==========================================================
//   // LOCATION LOADING
//   // ==========================================================

//   const [isLoadingLocation, setIsLoadingLocation] = useState(false);


//   // ==========================================================
//   // VOICE SEARCH
//   // ==========================================================

//   const handleVoiceSearch = () => {

//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       setError("Voice search is not supported in this browser. Please use Google Chrome.");
//       return;
//     }

//     if (isListening && recognitionRef.current) {
//       recognitionRef.current.stop();
//       setIsListening(false);
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.lang = "en-IN";
//     recognition.interimResults = false;
//     recognition.continuous = false;
//     recognition.maxAlternatives = 1;

//     recognitionRef.current = recognition;

//     recognition.onstart = () => {
//       setIsListening(true);
//       setError("");
//     };

//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript;
//       if (transcript) {
//         setSearchQuery(transcript);
//         setShowSuggestions(false);
//       }
//     };

//     recognition.onerror = (event) => {
//       console.error("Voice recognition error:", event.error);
//       setIsListening(false);

//       if (event.error === "not-allowed") {
//         setError("Please allow microphone access to use voice search.");
//       } else if (event.error === "no-speech") {
//         setError("No speech detected. Please try again.");
//       } else {
//         setError("Voice search failed. Please try again.");
//       }
//     };

//     recognition.onend = () => {
//       setIsListening(false);
//       recognitionRef.current = null;
//     };

//     recognition.start();
//   };


//   // ==========================================================
//   // NEAR ME SEARCH
//   // ==========================================================

//   const handleNearMeSearch = async (e) => {

//     e.preventDefault();

//     if (!navigator.geolocation) {
//       setError("Geolocation is not supported by your browser.");
//       return;
//     }

//     setIsLoadingLocation(true);
//     setError("");

//     navigator.geolocation.getCurrentPosition(

//       async (position) => {

//         const lat = position.coords.latitude;
//         const lng = position.coords.longitude;

//         try {

//           const response = await fetch(
//             `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
//           );

//           const data = await response.json();

//           setIsLoadingLocation(false);

//           if (data.status === "OK" && data.results.length > 0) {

//             let detectedCity = "";
//             const addressComponents = data.results[0].address_components;

//             for (let component of addressComponents) {
//               if (component.types.includes("locality")) {
//                 detectedCity = component.long_name;
//                 break;
//               }
//             }

//             if (detectedCity) {

//               setSearchCity(detectedCity);
//               setSearchQuery(detectedCity);

//               history.push({
//                 pathname: "/searchdashboard",
//                 state: {
//                   searchCity: detectedCity,
//                   searchQuery: "",
//                   type: type,
//                   listingType: activeTab,
//                   min_price: budget ? budget.split("-")[0] : "",
//                   max_price: budget ? budget.split("-")[1] : "",
//                 },
//               });

//             } else {
//               setError("Unable to detect your city. Please enter it manually.");
//             }

//           } else {
//             setError("Failed to fetch city details from your location.");
//           }

//         } catch (error) {
//           setIsLoadingLocation(false);
//           setError("Network error. Please try again.");
//         }

//       },

//       (err) => {
//         setIsLoadingLocation(false);

//         if (err.code === 1) {
//           setError("Please allow location access to use the 'Near Me' feature.");
//         } else {
//           setError("Could not retrieve your location. Please try again.");
//         }
//       }

//     );

//   };


//   // ==========================================================
//   // SEARCH CHANGE
//   // ==========================================================

//   const handleSearchChange = async (e) => {

//     const value = e.target.value;
//     setSearchQuery(value);

//     setCityDropdownOpen(false);

//     if (!value.trim()) {
//       setSuggestions([]);
//       setShowSuggestions(false);
//       return;
//     }

//     try {

//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}/cust_api/search_suggestions`,
//         { query: value }
//       );

//       if (response.data.status === 1) {
//         setSuggestions(response.data.data);
//         setShowSuggestions(true);
//       } else {
//         setSuggestions([]);
//         setShowSuggestions(false);
//       }

//     } catch (error) {
//       console.error(error);
//     }

//   };


//   // ==========================================================
//   // SEARCH
//   // ==========================================================

//   const handleSearch = () => {

//     if (!searchQuery && !searchCity && !type && !budget && !activeTab) {
//       setError("Please enter what you're looking for.");
//       return;
//     }

//     setError("");

//     let min_price = "";
//     let max_price = "";

//     if (budget) {
//       const selected = BUDGET_RANGES.find((b) => `${b.min}-${b.max}` === budget);
//       if (selected) {
//         min_price = selected.min;
//         max_price = selected.max;
//       }
//     }

//     history.push({
//       pathname: "/searchdashboard",
//       state: {
//         searchCity,
//         searchQuery,
//         type,
//         listingType: activeTab,
//         min_price,
//         max_price,
//       },
//     });

//   };


//   // ==========================================================
//   // CLEANUP VOICE RECOGNITION
//   // ==========================================================

//   useEffect(() => {
//     return () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.stop();
//       }
//     };
//   }, []);


//   // ==========================================================
//   // UI
//   // ==========================================================

//   return (

//     <div className="relative flex items-center justify-center m-3 bg-white min-h-[200px] py-9 sm:py-18">

//       {/* Background */}

//       <div
//         className="absolute top-0 bottom-0 left-0 right-0 w-full h-full bg-center bg-cover rounded-3xl sm:rounded-3xl"
//         style={{ backgroundImage: "url('/image/modern.jpg')" }}
//       >
//         <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-slate-500/40 via-slate-600/50 to-slate-800/70"></div>
//       </div>


//       <div className="relative w-full max-w-6xl p-2 bg-transparent rounded-3xl mx-auto sm:p-6">


//         {/* ==================================================
//             BADGE
//         ================================================== */}

//         <div className="flex justify-center sm:justify-start mb-5">
//           <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-medium text-white rounded-full bg-white/15 backdrop-blur-sm border border-white/20">
//             <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
//             India's trusted zero-brokerage marketplace
//           </span>
//         </div>


//         {/* ==================================================
//             HEADING
//         ================================================== */}

//         <div className="mb-6 text-center sm:text-left sm:mb-8">

//           <h1
//             className="text-3xl sm:text-4xl lg:text-[42px] font-bold leading-tight text-white"
//             style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
//           >
//             <em className="italic text-amber-400">Your Perfect Home</em>
//             <br />
//             Is Closer Than You Think.
//           </h1>

//           <p className="max-w-xl mx-auto sm:mx-0 mt-4 text-sm sm:text-base text-gray-200">
//             Verified owners, AI-matched listings and a smoother way to
//             buy, rent or sell — across every major Indian city.
//           </p>

//         </div>


//         {/* ==================================================
//             SEARCH FORM
//         ================================================== */}

//         <div className="flex flex-col w-full bg-white rounded-2xl shadow-lg">


//           {/* ==================================================
//               TOP TABS
//           ================================================== */}

//           <div className="flex items-center gap-1 p-3 overflow-x-auto border-b border-gray-100 sm:gap-2">

//             {NAV_TABS.map((tab) => (

//               <button
//                 key={tab.key}
//                 type="button"
//                 onClick={() => {
//                   setActiveTab(tab.key);

//                   history.push({
//                     pathname: "/property",
//                     state: { propertyType: tab.type },
//                   });
//                 }}
//                 style={{
//                   padding: "8px 16px",
//                   border: "none",
//                   borderRadius: "8px",
//                   fontSize: "14px",
//                   fontWeight: 600,
//                   whiteSpace: "nowrap",
//                   cursor: "pointer",
//                   transition: "all 0.2s ease",
//                   background: activeTab === tab.key ? "#f3f4f6" : "transparent",
//                   color: activeTab === tab.key ? "#111827" : "#6b7280",
//                 }}
//               >
//                 {tab.label}
//               </button>

//             ))}

//           </div>


//           {/* ==================================================
//               STYLE
//           ================================================== */}

//           <style>{`

//             .voice-search-button {
//               width: 34px;
//               height: 34px;
//               min-width: 34px;
//               display: flex;
//               align-items: center;
//               justify-content: center;
//               border: none;
//               border-radius: 50%;
//               background: #fff8ed;
//               color: #c99a3e;
//               cursor: pointer;
//               transition: all 0.2s ease;
//             }

//             .voice-search-button:hover {
//               background: #fdf0d8;
//               color: #a87924;
//             }

//             .voice-search-button.listening {
//               background: #f7e2c0;
//               color: #8f641e;
//               animation: voicePulse 1.2s infinite;
//             }

//             @keyframes voicePulse {
//               0% { box-shadow: 0 0 0 0 rgba(201, 154, 62, 0.4); }
//               70% { box-shadow: 0 0 0 10px rgba(201, 154, 62, 0); }
//               100% { box-shadow: 0 0 0 0 rgba(201, 154, 62, 0); }
//             }

//             .search-field-label {
//               display: block;
//               font-size: 11px;
//               font-weight: 600;
//               color: #6b7280;
//               margin-bottom: 6px;
//               line-height: 1;
//             }

//           `}</style>


//           {/* ==================================================
//               BOTTOM SEARCH AREA
//           ================================================== */}

//           <div className="flex flex-col lg:flex-row items-stretch lg:items-center px-5 py-3.5 gap-4 lg:gap-0 lg:divide-x lg:divide-gray-100">


//             {/* ==================================================
//                 LOCATION (Search field + separate City dropdown)
//             ================================================== */}

//             <div className="relative flex-1 lg:flex-[1.6] lg:px-5">

//               <label className="search-field-label">Location</label>

//               <div className="flex items-center gap-2.5">

//                 {/* ---- Search Input ---- */}
//                 <div className="flex items-center flex-1 min-w-0">

//                   {/* <FaMapMarkerAlt className="shrink-0 text-amber-500" size={16} /> */}

//                   <input
//                     ref={inputRef}
//                     type="text"
//                     id="search"
//                     placeholder={placeholderTexts[placeholderIndex]}
//                     className="w-full min-w-0 pl-1.5 pr-1.5 text-sm text-gray-800 bg-transparent outline-none border-none sm:text-[15px]"
//                     value={searchQuery}
//                     onChange={handleSearchChange}
//                     onFocus={() => setCityDropdownOpen(false)}
//                   />

//                   <button
//                     type="button"
//                     onClick={handleVoiceSearch}
//                     title={isListening ? "Stop listening" : "Voice Search"}
//                     className={`voice-search-button ${isListening ? "listening" : ""}`}
//                   >
//                     <FaMicrophone size={14} />
//                   </button>

//                   <button
//                     type="button"
//                     onClick={handleNearMeSearch}
//                     disabled={isLoadingLocation}
//                     title="Search Near Me"
//                     className={`ml-1 flex items-center justify-center w-8 h-8 rounded-full transition ${isLoadingLocation
//                       ? "bg-gray-100 text-gray-400 animate-pulse"
//                       : "bg-rose-50 text-rose-500 hover:bg-rose-100"
//                       }`}
//                   >
//                     <MdMyLocation size={16} />
//                   </button>

//                 </div>

//                 {/* ---- City Dropdown (separate) ---- */}
//                 <div className="relative shrink-0" ref={locationFieldRef}>

//                   <button
//                     type="button"
//                     onClick={() => {
//                       setCityDropdownOpen((open) => !open);
//                       setShowSuggestions(false);
//                     }}
//                     className="flex items-center gap-1 text-sm sm:text-[15px] text-gray-800 whitespace-nowrap"
//                   >
//                     <FaMapMarkerAlt className="shrink-0 text-amber-500" size={14} />
//                     <span>{searchCity || "Select a City"}</span>
//                     <FiChevronDown
//                       size={14}
//                       className={`shrink-0 text-gray-400 transition-transform ${cityDropdownOpen ? "rotate-180" : ""}`}
//                     />
//                   </button>

//                   {cityDropdownOpen && (

//                     <div className="absolute right-0 top-full z-50 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">

//                       {CITIES.map((city) => {
//                         const isSelected = searchCity === city;

//                         return (
//                           <div
//                             key={city}
//                             onClick={() => {
//                               setSearchCity(city);
//                               setCityDropdownOpen(false);
//                             }}
//                             className={`px-4 py-2.5 text-sm cursor-pointer ${isSelected
//                               ? "bg-blue-600 text-white"
//                               : "text-gray-700 hover:bg-gray-100"
//                               }`}
//                           >
//                             {city}
//                           </div>
//                         );
//                       })}

//                     </div>

//                   )}

//                 </div>

//               </div>

//               {/* Existing search-text suggestions (unchanged) */}
//               {showSuggestions && suggestions.length > 0 && (

//                 <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">

//                   {suggestions.map((item, index) => (

//                     <div
//                       key={index}
//                       className="px-4 py-3 cursor-pointer hover:bg-gray-100 border-b last:border-b-0"
//                       onClick={() => {
//                         setSearchQuery(item.text);
//                         setShowSuggestions(false);
//                       }}
//                     >
//                       {item.text}
//                     </div>

//                   ))}

//                 </div>

//               )}

//             </div>


//             {/* ==================================================
//                 PROPERTY TYPE
//             ================================================== */}

//             <div className="relative flex-1 lg:flex-[0.7] lg:px-5" ref={propertyTypeRef}>

//               <label className="search-field-label">Property Type</label>

//               <button
//                 type="button"
//                 onClick={() => {
//                   setPropertyTypeOpen((open) => !open);
//                   setBudgetOpen(false);
//                 }}
//                 className="flex items-center gap-2 w-full text-left"
//               >

//                 <FiHome className="shrink-0 text-amber-500" size={16} />

//                 <span className="flex-1 min-w-0 text-sm sm:text-[15px] text-gray-800 truncate">
//                   {type || "Property Type"}
//                 </span>

//                 <FiChevronDown
//                   size={16}
//                   className={`shrink-0 text-gray-400 transition-transform ${propertyTypeOpen ? "rotate-180" : ""}`}
//                 />

//               </button>

//               {propertyTypeOpen && (

//                 <div className="absolute left-0 top-full z-50 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">

//                   <div
//                     onClick={() => {
//                       setType("");
//                       setPropertyTypeOpen(false);
//                     }}
//                     className={`px-4 py-2.5 text-sm cursor-pointer ${type === "" ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"}`}
//                   >
//                     Any Property Type
//                   </div>

//                   {PROPERTY_TYPES.map((option) => (

//                     <div
//                       key={option}
//                       onClick={() => {
//                         setType(option);
//                         setPropertyTypeOpen(false);
//                       }}
//                       className={`px-4 py-2.5 text-sm cursor-pointer ${type === option ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"}`}
//                     >
//                       {option}
//                     </div>

//                   ))}

//                 </div>

//               )}

//             </div>


//             {/* ==================================================
//                 BUDGET
//             ================================================== */}

//             <div className="relative flex-1 lg:flex-[0.7] lg:px-5" ref={budgetRef}>

//               <label className="search-field-label">Budget</label>

//               <button
//                 type="button"
//                 onClick={() => {
//                   setBudgetOpen((open) => !open);
//                   setPropertyTypeOpen(false);
//                 }}
//                 className="flex items-center gap-2 w-full text-left"
//               >

//                 <FiDollarSign className="shrink-0 text-amber-500" size={16} />

//                 <span className="flex-1 min-w-0 text-sm sm:text-[15px] text-gray-800 truncate">
//                   {BUDGET_RANGES.find((range) => `${range.min}-${range.max}` === budget)?.label || "Any budget"}
//                 </span>

//                 <FiChevronDown
//                   size={16}
//                   className={`shrink-0 text-gray-400 transition-transform ${budgetOpen ? "rotate-180" : ""}`}
//                 />

//               </button>

//               {budgetOpen && (

//                 <div className="absolute left-0 top-full z-50 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">

//                   {BUDGET_RANGES.map((range) => {
//                     const value = `${range.min}-${range.max}`;
//                     return (
//                       <div
//                         key={range.label}
//                         onClick={() => {
//                           setBudget(value);
//                           setBudgetOpen(false);
//                         }}
//                         className={`px-4 py-2.5 text-sm cursor-pointer ${budget === value ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"}`}
//                       >
//                         {range.label}
//                       </div>
//                     );
//                   })}

//                 </div>

//               )}

//             </div>


//             {/* ==================================================
//                 SEARCH BUTTON
//             ================================================== */}

//             <div className="lg:pl-4">

//               <button
//                 className="flex items-center justify-center w-full lg:w-auto gap-2 px-6 py-3 text-white transition-all duration-300 bg-slate-900 rounded-xl hover:bg-slate-800 font-medium shrink-0"
//                 onClick={handleSearch}
//               >
//                 <FiSearch size={18} />
//                 <span>Search</span>
//               </button>

//             </div>

//           </div>

//         </div>


//         {/* ==================================================
//             ERROR MESSAGE
//         ================================================== */}

//         {error && (

//           <div className="mt-3 text-center">
//             <span className="px-4 mt-4 text-sm text-center text-white bg-gray-800 rounded">
//               {error}
//             </span>
//           </div>

//         )}


//         {/* ==================================================
//             SUGGESTIONS
//         ================================================== */}

//         <div className="mt-6 text-center sm:mt-10">

//           <div className="flex flex-wrap justify-center gap-2 sm:justify-start">

//             <h3
//               className="w-full mt-2 sm:w-auto"
//               style={{
//                 fontSize: "1rem",
//                 color: "rgb(229, 231, 235)",
//                 marginBottom: "0.5rem",
//               }}
//             >
//               Suggestion:
//             </h3>

//             {[
//               "Ahmedabad",
//               "Bengaluru",
//               "Chennai",
//               "Delhi",
//               "Hyderabad",
//               "Kolkata",
//               "Mumbai",
//               "Pune",
//             ].map((location) => (

//               <Link
//                 key={location}
//                 to={`/citywiseproperties/${location}`}
//                 className="px-3 py-2 text-sm text-white no-underline rounded-full cursor-pointer bg-gray-900/20 backdrop-blur-sm bg-opacity-70 hover:bg-gray-600 hover:no-underline"
//               >
//                 {location}
//               </Link>

//             ))}

//           </div>

//         </div>

//       </div>

//     </div>

//   );

// };

// export default Search;











//////=========123


import React, { useState, useEffect, useLayoutEffect, useRef, useContext } from "react";
import { createPortal } from "react-dom";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import {
  FaMapMarkerAlt,
  FaMicrophone,
  // NEW (UI only): icons used by the redesigned hero
  FaShieldAlt,
  FaBuilding,
  FaUsers,
  FaFire,
  FaKey,
  FaBed,
  FaMountain,
  FaRupeeSign,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { FiSearch, FiHome, FiDollarSign, FiChevronDown } from "react-icons/fi"; // FiDollarSign kept; budget now shows FaRupeeSign
import { MdMyLocation } from "react-icons/md";

import { SearchContext } from "./SearchContext";


// ==========================================================
// NAVIGATION TABS
// ==========================================================

const NAV_TABS = [
  // `Icon` is presentation only — label / key / type are unchanged.
  { label: "Buy", key: "Buy", type: "Buy", Icon: FiHome },
  { label: "Rent", key: "Rent", type: "Rent", Icon: FaKey },
  { label: "PG", key: "PG", type: "PG/Co-living", Icon: FaBed },
  { label: "Plots / Land", key: "Plot", type: "Plot/Land", Icon: FaMountain },
  { label: "Commercial", key: "Commercial", type: "Commercial", Icon: FaBuilding },
];


// ==========================================================
// NEW (UI only): HERO BACKGROUND SLIDES
// Seeded with the existing background image. Add more paths here and the
// crossfade + the 01 / 03 counter below switch on automatically; with a
// single image they stay hidden, so nothing changes today.
// ==========================================================

const HERO_SLIDES = [
  "/image/modern.jpg",
];


// ==========================================================
// NEW (UI only): HERO STATS — static marketing copy, not API data.
// These are claims about your business, so edit them here rather than
// leaving numbers buried in the markup.
// ==========================================================

const HERO_STATS = [
  { Icon: FaBuilding, value: "1000+", label: "Verified Properties" },
  { Icon: FaUsers, value: "500+", label: "Trusted Builders" },
  { Icon: FaShieldAlt, value: "Zero", label: "Brokerage" },
];


// ==========================================================
// PROPERTY TYPE OPTIONS
// ==========================================================

const PROPERTY_TYPES = [
  "Residential",
  "Commercial",
];


// ==========================================================
// BUDGET OPTIONS
// ==========================================================

const BUDGET_RANGES = [
  { label: "Any Budget", min: "", max: "" },
  { label: "Under ₹25 Lakh", min: "", max: "2500000" },
  { label: "₹25 Lakh - ₹50 Lakh", min: "2500000", max: "5000000" },
  { label: "₹50 Lakh - ₹1 Crore", min: "5000000", max: "10000000" },
  { label: "₹1 Crore - ₹2 Crore", min: "10000000", max: "20000000" },
  { label: "Above ₹2 Crore", min: "20000000", max: "" },
];


// ==========================================================
// CITY OPTIONS (Location dropdown)
// ==========================================================

const CITIES = [
  "Select a City",
  "Ahmedabad",
  "Bengaluru",
  "Chennai",
  "Delhi",
  "Hyderabad",
  "Kolkata",
  "Mumbai",
  "Pune",
];


// ==========================================================
// NEW: DROPDOWN PORTAL  (this is the actual fix)
//
// ROOT CAUSE of the clipping / overlap: an absolutely-positioned panel
// always lives inside its ancestors' stacking contexts and is clipped by
// any ancestor with overflow:hidden. No z-index value can escape either.
//
// Rendering the panel into document.body with position:fixed takes it out
// of every ancestor stacking context and clip region, so nothing anywhere
// on the page — header, global CSS, a transformed parent, an
// overflow:hidden wrapper — can cover or cut it. It also flips above the
// field when there is not enough room below, and never leaves the viewport.
//
// Options, selection logic, state and handlers are untouched; this only
// changes WHERE the panel is rendered in the DOM.
//
// NEW: `showScrollArrow` (off by default) adds a small scroll-down arrow.
// Only the City dropdown turns it on.
// ==========================================================

const DropdownPortal = ({ anchorRef, panelRef, align = "left", className = "", customScroll = false, children }) => {

  const [style, setStyle] = useState(null);

  useLayoutEffect(() => {

    const place = () => {

      const el = anchorRef.current;
      if (!el) return;

      const r = el.getBoundingClientRect();
      const GAP = 8;
      const MAX_H = 280;
      const MIN_W = 224;

      // NEW: never open upward underneath the fixed ApnaGhar header
      const header = document.querySelector("[data-fixed-header]");
      const headerBottom = header ? header.getBoundingClientRect().bottom : 0;

      const spaceBelow = window.innerHeight - r.bottom - GAP;
      const spaceAbove = r.top - GAP - headerBottom;
      const flipUp = spaceBelow < 170 && spaceAbove > spaceBelow;

      const next = {
        position: "fixed",
        zIndex: 2147483000,
        minWidth: Math.max(r.width, MIN_W),
        maxWidth: Math.min(320, window.innerWidth - 16),
        maxHeight: Math.max(150, Math.min(MAX_H, flipUp ? spaceAbove : spaceBelow)),
      };

      if (flipUp) {
        next.bottom = window.innerHeight - r.top + GAP;
      } else {
        next.top = r.bottom + GAP;
      }

      if (align === "right") {
        next.right = Math.max(8, window.innerWidth - r.right);
      } else {
        next.left = Math.max(8, Math.min(r.left, window.innerWidth - MIN_W - 8));
      }

      setStyle(next);
    };

    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);

  }, [anchorRef, align]);


  // ==========================================================
  // NEW (City only, via `customScroll`): right-side scroll rail.
  // A drawn track + draggable thumb + scroll-down button. It is built from
  // plain elements rather than the browser's native scrollbar, so global CSS
  // that hides scrollbars (common in Tailwind projects) cannot remove it.
  // ==========================================================

  const listRef = useRef(null);
  const trackRef = useRef(null);
  const dragRef = useRef(null);
  const [bar, setBar] = useState({ show: false, top: 0, height: 0, atBottom: true });

  const syncBar = () => {
    const list = listRef.current;
    if (!list) return;

    const { scrollTop, scrollHeight, clientHeight } = list;
    const scrollable = scrollHeight - clientHeight;

    if (scrollable <= 1) {
      setBar((b) => (b.show ? { show: false, top: 0, height: 0, atBottom: true } : b));
      return;
    }

    const trackH = trackRef.current ? trackRef.current.clientHeight : clientHeight;
    const height = Math.max(24, (clientHeight / scrollHeight) * trackH);
    const top = (scrollTop / scrollable) * Math.max(0, trackH - height);

    setBar({ show: true, top, height, atBottom: scrollTop >= scrollable - 2 });
  };

  useLayoutEffect(() => {
    if (customScroll) syncBar();
  }, [style, bar.show, customScroll]);

  // Drag the thumb (mouse + touch via pointer events)
  const onThumbDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const list = listRef.current;
    if (!list) return;
    dragRef.current = { y: e.clientY, start: list.scrollTop };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onThumbMove = (e) => {
    const drag = dragRef.current;
    const list = listRef.current;
    const track = trackRef.current;
    if (!drag || !list || !track) return;
    const scrollable = list.scrollHeight - list.clientHeight;
    const room = track.clientHeight - bar.height;
    if (room <= 0) return;
    list.scrollTop = drag.start + ((e.clientY - drag.y) * scrollable) / room;
  };

  const onThumbUp = (e) => {
    dragRef.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (err) {
      // pointer was already released
    }
  };

  // Click on the empty track: page up / page down toward the click
  const onTrackDown = (e) => {
    if (e.target !== e.currentTarget) return;
    e.preventDefault();
    const list = listRef.current;
    if (!list) return;
    const clickY = e.clientY - e.currentTarget.getBoundingClientRect().top;
    const dir = clickY < bar.top ? -1 : 1;
    list.scrollBy({ top: dir * list.clientHeight * 0.8, behavior: "smooth" });
  };

  // Scroll-down button
  const scrollDown = () => {
    const list = listRef.current;
    if (!list) return;
    list.scrollBy({ top: list.clientHeight * 0.7, behavior: "smooth" });
  };


  if (!style) return null;

  // Every other dropdown: unchanged
  if (!customScroll) {
    return createPortal(
      <div
        ref={panelRef}
        className={`hero-dd dd-anim ${className}`}
        style={style}
        role="listbox"
      >
        {children}
      </div>,
      document.body
    );
  }

  // City dropdown: list on the left, scroll rail on the right
  const { maxHeight, ...outerStyle } = style;

  return createPortal(
    <div
      ref={panelRef}
      className={`hero-dd dd-anim ${className}`}
      style={{ ...outerStyle, display: "flex", overflow: "hidden" }}
      role="listbox"
    >

      <div
        ref={listRef}
        className="city-dd-list"
        style={{ maxHeight: maxHeight - 10 }}   /* 10 = panel padding + border */
        onScroll={syncBar}
      >
        {children}
      </div>

      {bar.show && (
        <div className="city-dd-rail">

          <div ref={trackRef} className="city-dd-track" onPointerDown={onTrackDown}>
            <div
              className="city-dd-thumb"
              style={{ height: bar.height, transform: `translateY(${bar.top}px)` }}
              onPointerDown={onThumbDown}
              onPointerMove={onThumbMove}
              onPointerUp={onThumbUp}
              onPointerCancel={onThumbUp}
            />
          </div>

          <button
            type="button"
            aria-label="Scroll down for more cities"
            className="city-dd-down"
            disabled={bar.atBottom}
            onMouseDown={(e) => e.preventDefault()}
            onClick={scrollDown}
          >
            <FiChevronDown size={13} />
          </button>

        </div>
      )}

    </div>,
    document.body
  );
};


// ==========================================================
// NEW: SCROLL-DOWN ARROW for a dropdown list.
// Each list gets its own instance tied to its own ref, so the Location
// arrow scrolls only the Location list and the City arrow only the City
// list. The wrapper is sticky with zero height: it adds no size to the
// list and stays pinned to the bottom of the visible area.
// ==========================================================

const ListScrollArrow = ({ listRef, itemCount }) => {

  const [canScrollDown, setCanScrollDown] = useState(false);

  useEffect(() => {

    const el = listRef.current;
    if (!el) return undefined;

    const update = () => {
      setCanScrollDown(el.scrollTop + el.clientHeight < el.scrollHeight - 2);
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };

  }, [listRef, itemCount]);

  const scrollDown = () => {
    const el = listRef.current;
    if (!el) return;
    el.scrollBy({ top: el.clientHeight * 0.7, behavior: "smooth" });
  };

  if (!canScrollDown) return null;

  return (
    <div className="dd-scroll-arrow-wrap">
      <button
        type="button"
        aria-label="Scroll down for more options"
        className="dd-scroll-arrow"
        onMouseDown={(e) => e.preventDefault()}
        onClick={scrollDown}
      >
        <FiChevronDown size={14} />
      </button>
    </div>
  );
};


const Search = () => {

  const history = useHistory();

  const { searchCity, setSearchCity } = useContext(SearchContext);


  // ==========================================================
  // SEARCH STATES
  // ==========================================================

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [type, setType] = useState("");
  const [budget, setBudget] = useState("");
  const [activeTab, setActiveTab] = useState("Buy");
  const [error, setError] = useState("");
  const inputRef = useRef(null);


  // ==========================================================
  // CUSTOM DROPDOWN STATES (Property Type / Budget / Location City)
  // ==========================================================

  const [propertyTypeOpen, setPropertyTypeOpen] = useState(false);
  const [budgetOpen, setBudgetOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

  const propertyTypeRef = useRef(null);
  const budgetRef = useRef(null);
  const locationFieldRef = useRef(null);

  // NEW: refs to the portaled panels. The panel now lives in document.body,
  // so it is no longer a DOM child of its field — the outside-click check
  // below must also treat it as "inside", otherwise the mousedown that
  // selects an option would close the panel before the click landed and
  // selection would silently stop working.
  const propertyTypePanelRef = useRef(null);
  const budgetPanelRef = useRef(null);
  const cityPanelRef = useRef(null);

  // NEW: ref to the Location suggestions list (for its scroll-down arrow)
  const suggestionsListRef = useRef(null);


  useEffect(() => {

    const handleClickOutside = (e) => {

      // MODIFIED: each original condition is unchanged — a second clause is
      // simply ANDed on so the portaled panel counts as "inside" too.

      if (
        propertyTypeRef.current &&
        !propertyTypeRef.current.contains(e.target) &&
        !(propertyTypePanelRef.current && propertyTypePanelRef.current.contains(e.target))
      ) {
        setPropertyTypeOpen(false);
      }

      if (
        budgetRef.current &&
        !budgetRef.current.contains(e.target) &&
        !(budgetPanelRef.current && budgetPanelRef.current.contains(e.target))
      ) {
        setBudgetOpen(false);
      }

      if (
        locationFieldRef.current &&
        !locationFieldRef.current.contains(e.target) &&
        !(cityPanelRef.current && cityPanelRef.current.contains(e.target))
      ) {
        setCityDropdownOpen(false);
      }

    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);

  }, []);


  // ==========================================================
  // FIX: dropdowns also close on Escape and on scroll / resize, so they
  // can never be left floating detached from their field.
  // ==========================================================

  useEffect(() => {

    const closeAll = () => {
      setPropertyTypeOpen(false);
      setBudgetOpen(false);
      setCityDropdownOpen(false);
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeAll();
    };

    // FIX: close only when the PAGE scrolls. Scrolling inside the City list,
    // or any other element that scrolls on its own (e.g. a moving strip of
    // city chips), must not close the dropdown.
    const handleScroll = (e) => {
      const t = e.target;
      const isPageScroll =
        t === document || t === document.documentElement || t === document.body;
      if (!isPageScroll) return;
      closeAll();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", closeAll);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", closeAll);
    };

  }, []);


  // ==========================================================
  // VOICE SEARCH STATE
  // ==========================================================

  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const GOOGLE_MAPS_API_KEY = "AIzaSyAt8bj4UACvakZfiSy-0c1o_ivfplm7jEU";


  // ==========================================================
  // PLACEHOLDER
  // ==========================================================

  const placeholderTexts = [
    "Search city, locality or project",
    "Search Properties by Location",
    "Enter City, Area",
    'Search "Pune"',
    'Search "Mumbai"',
  ];

  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholderTexts.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);


  // ==========================================================
  // NEW (UI only): HERO SLIDE INDEX — only advances when more than one
  // image is listed in HERO_SLIDES above.
  // ==========================================================

  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    if (HERO_SLIDES.length < 2) return undefined;
    const id = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const goToPrevSlide = () =>
    setSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  const goToNextSlide = () =>
    setSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);


  // ==========================================================
  // NEW: is any dropdown open?
  // Used purely to fade out the decorative / overlapping blocks below so
  // they can never appear on top of an open panel.
  // ==========================================================

  const anyDropdownOpen = propertyTypeOpen || budgetOpen || cityDropdownOpen;


  // ==========================================================
  // LOCATION LOADING
  // ==========================================================

  const [isLoadingLocation, setIsLoadingLocation] = useState(false);


  // ==========================================================
  // VOICE SEARCH
  // ==========================================================

  const handleVoiceSearch = () => {

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError("Voice search is not supported in this browser. Please use Google Chrome.");
      return;
    }

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;

    recognitionRef.current = recognition;

    recognition.onstart = () => {
      setIsListening(true);
      setError("");
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (transcript) {
        setSearchQuery(transcript);
        setShowSuggestions(false);
      }
    };

    recognition.onerror = (event) => {
      console.error("Voice recognition error:", event.error);
      setIsListening(false);

      if (event.error === "not-allowed") {
        setError("Please allow microphone access to use voice search.");
      } else if (event.error === "no-speech") {
        setError("No speech detected. Please try again.");
      } else {
        setError("Voice search failed. Please try again.");
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };

    recognition.start();
  };


  // ==========================================================
  // NEAR ME SEARCH
  // ==========================================================

  const handleNearMeSearch = async (e) => {

    e.preventDefault();

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setIsLoadingLocation(true);
    setError("");

    navigator.geolocation.getCurrentPosition(

      async (position) => {

        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {

          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
          );

          const data = await response.json();

          setIsLoadingLocation(false);

          if (data.status === "OK" && data.results.length > 0) {

            let detectedCity = "";
            const addressComponents = data.results[0].address_components;

            for (let component of addressComponents) {
              if (component.types.includes("locality")) {
                detectedCity = component.long_name;
                break;
              }
            }

            if (detectedCity) {

              setSearchCity(detectedCity);
              setSearchQuery(detectedCity);

              history.push({
                pathname: "/searchdashboard",
                state: {
                  searchCity: detectedCity,
                  searchQuery: "",
                  type: type,
                  listingType: activeTab,
                  min_price: budget ? budget.split("-")[0] : "",
                  max_price: budget ? budget.split("-")[1] : "",
                },
              });

            } else {
              setError("Unable to detect your city. Please enter it manually.");
            }

          } else {
            setError("Failed to fetch city details from your location.");
          }

        } catch (error) {
          setIsLoadingLocation(false);
          setError("Network error. Please try again.");
        }

      },

      (err) => {
        setIsLoadingLocation(false);

        if (err.code === 1) {
          setError("Please allow location access to use the 'Near Me' feature.");
        } else {
          setError("Could not retrieve your location. Please try again.");
        }
      }

    );

  };


  // ==========================================================
  // SEARCH CHANGE
  // ==========================================================

  const handleSearchChange = async (e) => {

    const value = e.target.value;
    setSearchQuery(value);

    setCityDropdownOpen(false);

    if (!value.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/cust_api/search_suggestions`,
        { query: value }
      );

      if (response.data.status === 1) {
        setSuggestions(response.data.data);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }

    } catch (error) {
      console.error(error);
    }

  };


  // ==========================================================
  // SEARCH
  // ==========================================================

  const handleSearch = () => {

    if (!searchQuery && !searchCity && !type && !budget && !activeTab) {
      setError("Please enter what you're looking for.");
      return;
    }

    setError("");

    let min_price = "";
    let max_price = "";

    if (budget) {
      const selected = BUDGET_RANGES.find((b) => `${b.min}-${b.max}` === budget);
      if (selected) {
        min_price = selected.min;
        max_price = selected.max;
      }
    }

    history.push({
      pathname: "/searchdashboard",
      state: {
        searchCity,
        searchQuery,
        type,
        listingType: activeTab,
        min_price,
        max_price,
      },
    });

  };


  // ==========================================================
  // CLEANUP VOICE RECOGNITION
  // ==========================================================

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);


  // ==========================================================
  // UI
  // ==========================================================

  return (

    <div className="relative z-30 flex items-center justify-center m-3 bg-white min-h-[200px] py-9 sm:py-18">

      {/* Background */}
      {/* UI: its own overflow-hidden layer so the slow zoom cannot bleed past the
          rounded corners, and cannot clip the dropdowns inside the search card. */}

      <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full overflow-hidden rounded-3xl sm:rounded-3xl">

        {HERO_SLIDES.map((image, i) => (
          <div
            key={image}
            className={`absolute inset-0 w-full h-full bg-center bg-cover hero-bg-zoom transition-opacity duration-[1200ms] ${i === slideIndex ? "opacity-100" : "opacity-0"}`}
            style={{ backgroundImage: `url('${image}')` }}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/45 via-slate-900/40 to-slate-900/85"></div>

        {/* UI: brand wash so the hero ties into the #D61F45 palette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(75% 85% at 50% 115%, rgba(214,31,69,0.42) 0%, rgba(214,31,69,0) 62%)",
          }}
        />

      </div>


      {/* ==================================================
          UI: FLOATING STATS CARD (left) — copy lives in HERO_STATS
      ================================================== */}

      <div className={`absolute z-20 hidden -translate-y-1/2 xl:block left-8 top-1/2 hero-anim hero-d3 ${anyDropdownOpen ? "invisible pointer-events-none" : "visible"} hero-hideable`}>
        <div className="p-4 border rounded-2xl bg-slate-900/45 backdrop-blur-md border-white/10 shadow-2xl">
          {HERO_STATS.map(({ Icon, value, label }, i) => (
            <div
              key={label}
              className={`flex items-center gap-3 ${i > 0 ? "mt-4 pt-4 border-t border-white/10" : ""}`}
            >
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 text-[#FF5C7A] shrink-0">
                <Icon size={17} />
              </span>
              <div className="leading-tight">
                <p className="m-0 text-base font-bold text-white">{value}</p>
                <p className="m-0 text-[11px] text-gray-300">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* ==================================================
          UI: FLOATING VALUES CARD (right)
      ================================================== */}

      <div className={`absolute z-20 hidden -translate-y-1/2 xl:block right-8 top-1/2 hero-anim hero-d4 ${anyDropdownOpen ? "invisible pointer-events-none" : "visible"} hero-hideable`}>
        <div className="px-5 py-4 border rounded-2xl bg-slate-900/40 backdrop-blur-md border-white/10 shadow-2xl">
          <span className="block w-8 h-0.5 mb-3 bg-[#D61F45]" />
          <p className="m-0 text-sm leading-7 text-gray-200">
            Homes
            <br />
            Communities
            <br />
            Better Living
          </p>
        </div>
      </div>


      <div className="relative z-10 w-full max-w-6xl p-2 bg-transparent rounded-3xl mx-auto sm:p-6">


        {/* ==================================================
            BADGE  +  UI: script accent
        ================================================== */}

        <div className="flex items-start justify-between gap-4 mb-5">

          <div className="flex justify-center flex-1 sm:justify-start hero-anim hero-d1">
            <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white border rounded-full bg-slate-900/45 backdrop-blur-md border-white/15 transition-colors duration-300 hover:bg-slate-900/60">
              <FaShieldAlt className="text-[#FF5C7A]" size={13} />
              India's trusted zero-brokerage marketplace
            </span>
          </div>

          {/* UI: handwritten accent (decorative) */}
          <div
            className="flex-shrink-0 hidden leading-tight text-right text-white lg:block hero-anim hero-d2"
            style={{
              fontFamily: "'Segoe Script','Bradley Hand','Brush Script MT',cursive",
            }}
          >
            <span className="block text-lg">Better Homes</span>
            <span className="block text-lg">Brighter Lives</span>
            <span className="block w-24 h-0.5 mt-1 ml-auto rounded-full bg-[#D61F45]" />
          </div>

        </div>


        {/* ==================================================
            HEADING
        ================================================== */}

        <div className="mb-6 text-center sm:mb-8">

          {/* UI: eyebrow with rules either side */}
          <div className="inline-flex items-center gap-3 mb-3 hero-anim hero-d2">
            <span className="hidden w-12 h-px sm:block bg-white/30" />
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.3em] text-gray-200 uppercase">
              Find <span className="text-[#FF5C7A]">•</span> Explore{" "}
              <span className="text-[#FF5C7A]">•</span> Invest
            </span>
            <span className="hidden w-12 h-px sm:block bg-white/30" />
          </div>

          <h1
            className="text-3xl sm:text-4xl lg:text-[46px] font-bold leading-tight text-white hero-anim hero-d3"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Your <span className="text-[#D61F45]">Perfect Home</span>
            <br />
            Is Closer Than You Think.
          </h1>

          <p className="max-w-xl mx-auto mt-4 text-sm sm:text-base text-gray-200 hero-anim hero-d4">
            Verified owners, AI-matched listings and a smoother way to
            buy, rent or sell — across every major Indian city.
          </p>

        </div>


        {/* ==================================================
            SEARCH FORM
        ================================================== */}

        <div className="relative z-30 flex flex-col w-full bg-white rounded-3xl shadow-[0_22px_60px_rgba(15,23,42,0.35)] hero-anim hero-d5">


          {/* ==================================================
              TOP TABS
          ================================================== */}

          <div className="flex items-center gap-1 p-3 overflow-x-auto border-b border-gray-100 sm:gap-2">

            {NAV_TABS.map((tab) => (

              <button
                key={tab.key}
                type="button"
                className="hero-tab"
                onClick={() => {
                  setActiveTab(tab.key);

                  history.push({
                    pathname: "/property",
                    state: { propertyType: tab.type },
                  });
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 18px",
                  border: "none",
                  borderRadius: "9999px",
                  fontSize: "14px",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  // UI: active pill now uses the brand red instead of grey
                  background: activeTab === tab.key ? "#D61F45" : "transparent",
                  color: activeTab === tab.key ? "#ffffff" : "#6b7280",
                  boxShadow:
                    activeTab === tab.key
                      ? "0 6px 18px rgba(214,31,69,0.35)"
                      : "none",
                }}
              >
                <tab.Icon size={15} />
                {tab.label}
              </button>

            ))}

          </div>


          {/* ==================================================
              STYLE
          ================================================== */}

          <style>{`

            .voice-search-button {
              width: 34px;
              height: 34px;
              min-width: 34px;
              display: flex;
              align-items: center;
              justify-content: center;
              border: none;
              border-radius: 50%;
              background: #FDE8EC;
              color: #D61F45;
              cursor: pointer;
              transition: all 0.2s ease;
            }

            .voice-search-button:hover {
              background: #FAD3DB;
              color: #B91C3C;
              transform: scale(1.08);
            }

            .voice-search-button.listening {
              background: #D61F45;
              color: #ffffff;
              animation: voicePulse 1.2s infinite;
            }

            @keyframes voicePulse {
              0%   { box-shadow: 0 0 0 0 rgba(214, 31, 69, 0.45); }
              70%  { box-shadow: 0 0 0 10px rgba(214, 31, 69, 0); }
              100% { box-shadow: 0 0 0 0 rgba(214, 31, 69, 0); }
            }

            .search-field-label {
              display: block;
              font-size: 11px;
              font-weight: 600;
              color: #6b7280;
              margin-bottom: 6px;
              line-height: 1;
            }

            /* ---------- UI: entrance animation ---------- */

            @keyframes heroFadeUp {
              from { opacity: 0; transform: translateY(18px); }
              to   { opacity: 1; transform: none; }
            }

            .hero-anim {
              animation: heroFadeUp 0.75s cubic-bezier(0.22, 0.61, 0.36, 1) both;
            }

            .hero-d1 { animation-delay: 0.05s; }
            .hero-d2 { animation-delay: 0.15s; }
            .hero-d3 { animation-delay: 0.25s; }
            .hero-d4 { animation-delay: 0.35s; }
            .hero-d5 { animation-delay: 0.45s; }
            .hero-d6 { animation-delay: 0.55s; }

            /* ---------- UI: slow background zoom ---------- */

            @keyframes heroZoom {
              from { transform: scale(1); }
              to   { transform: scale(1.10); }
            }

            .hero-bg-zoom {
              animation: heroZoom 24s ease-out forwards;
              will-change: transform;
            }

            /* ---------- UI: dropdown open animation ---------- */

            @keyframes ddIn {
              from { opacity: 0; transform: translateY(-6px) scale(0.98); }
              to   { opacity: 1; transform: none; }
            }

            .dd-anim {
              animation: ddIn 0.16s ease-out both;
              transform-origin: top;
            }

            /* ---------- FIX: hardened dropdown panel ---------- */

            /* MODIFIED: geometry (position / offsets / width / max-height) is
               now set inline by DropdownPortal, so this rule carries only the
               appearance. */
            .hero-dd {
              overflow-y: auto;
              overflow-x: hidden;
              background: #ffffff;
              border: 1px solid #E5E7EB;
              border-radius: 14px;
              box-shadow: 0 18px 44px rgba(15, 23, 42, 0.18);
              padding: 4px;
              overscroll-behavior: contain;
            }

            .hero-dd-right { left: auto; right: 0; }

            /* Reset-proof option row: global styles cannot make these
               inline, pill-shaped, centred or partially sized. */
            .hero-dd-item {
              display: block !important;
              width: 100% !important;
              box-sizing: border-box !important;
              text-align: left !important;
              padding: 10px 14px !important;
              margin: 0 !important;
              border: none !important;
              border-radius: 10px !important;
              background: transparent;
              font-size: 14px;
              line-height: 1.35;
              color: #374151;
              white-space: nowrap;
              cursor: pointer;
              transition: background-color 0.15s ease, color 0.15s ease;
            }

            .hero-dd-item:hover,
            .hero-dd-item:focus-visible {
              background: #FDE8EC;
              color: #D61F45;
              outline: none;
            }

            .hero-dd-item.is-selected {
              background: #D61F45;
              color: #ffffff;
            }

            .hero-dd::-webkit-scrollbar { width: 6px; }
            .hero-dd::-webkit-scrollbar-thumb {
              background: #E5E7EB;
              border-radius: 9999px;
            }

            /* ---------- NEW: right-side vertical scrollbar
                          (Location suggestions + City only) ---------- */

            .dd-scrollbar {
              overflow-y: auto;
              overflow-x: hidden;
              overscroll-behavior: contain;
              scrollbar-width: thin;                  /* Firefox */
              scrollbar-color: #F3C3CE transparent;   /* Firefox: thumb / track */
            }

            .dd-scrollbar::-webkit-scrollbar {
              width: 6px;
            }

            .dd-scrollbar::-webkit-scrollbar-track {
              background: transparent;
              margin: 6px 0;          /* keeps the thumb inside the rounded corners */
            }

            .dd-scrollbar::-webkit-scrollbar-thumb {
              background: #F3C3CE;
              border-radius: 9999px;
            }

            .dd-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #D61F45;
            }

            /* ---------- NEW: scroll-down arrow (Location + City lists) ---------- */

            .dd-scroll-arrow-wrap {
              position: sticky;
              bottom: 0;
              height: 0;              /* adds no size to the list */
              pointer-events: none;   /* never blocks clicks on items */
            }

            .dd-scroll-arrow {
              position: absolute;
              right: 8px;
              bottom: 6px;
              width: 26px;
              height: 26px;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 0;
              margin: 0;
              border: none;
              border-radius: 50%;
              background: #D61F45;
              color: #ffffff;
              box-shadow: 0 4px 10px rgba(214, 31, 69, 0.35);
              cursor: pointer;
              pointer-events: auto;
              transition: background-color 0.15s ease, transform 0.15s ease;
            }

            .dd-scroll-arrow:hover {
              background: #B91C3C;
              transform: translateY(1px);
            }

            @media (max-width: 640px) {
              .dd-scroll-arrow {
                width: 30px;          /* easier to tap on mobile */
                height: 30px;
              }
            }

            /* ---------- NEW: City dropdown right-side scroll rail ---------- */

            .city-dd-list {
              flex: 1 1 auto;
              min-width: 0;
              overflow-y: auto;
              overflow-x: hidden;
              overscroll-behavior: contain;       /* page does not scroll with the list */
              -webkit-overflow-scrolling: touch;
              scrollbar-width: none;              /* native bar hidden; rail replaces it */
              -ms-overflow-style: none;
            }

            .city-dd-list::-webkit-scrollbar {
              display: none;
              width: 0;
              height: 0;
            }

            .city-dd-rail {
              flex: 0 0 20px;
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 5px;
              margin-left: 4px;
              padding: 4px 0 2px;
            }

            .city-dd-track {
              position: relative;
              flex: 1 1 auto;
              min-height: 0;
              width: 6px;
              border-radius: 9999px;
              background: #FDE8EC;
              cursor: pointer;
              touch-action: none;
            }

            .city-dd-thumb {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              border-radius: 9999px;
              background: #E88AA0;
              cursor: grab;
              touch-action: none;
              transition: background-color 0.15s ease;
            }

            .city-dd-thumb:hover,
            .city-dd-thumb:active {
              background: #D61F45;
            }

            .city-dd-thumb:active { cursor: grabbing; }

            .city-dd-down {
              flex: 0 0 auto;
              width: 20px !important;
              height: 20px !important;
              display: flex !important;
              align-items: center;
              justify-content: center;
              padding: 0 !important;
              margin: 0 !important;
              border: none !important;
              border-radius: 50% !important;
              background: #D61F45;
              color: #ffffff;
              cursor: pointer;
              transition: background-color 0.15s ease, opacity 0.15s ease;
            }

            .city-dd-down:hover { background: #B91C3C; }

            .city-dd-down:disabled {
              opacity: 0.35;
              cursor: default;
            }

            @media (max-width: 640px) {
              .city-dd-rail { flex-basis: 26px; }
              .city-dd-track { width: 8px; }
              .city-dd-down {
                width: 24px !important;   /* easier to tap on mobile */
                height: 24px !important;
              }
            }

            /* ---------- UI: micro-interactions ---------- */

            .hero-tab:hover { color: #D61F45 !important; }

            /* NEW: blocks that step out of the way while a dropdown is open.
               Uses visibility (not opacity) because .hero-anim's
               animation-fill-mode: both keeps opacity:1 applied, and animated
               values beat normal declarations in the cascade. */
            .hero-hideable {
              transition: visibility 0s linear 0s, opacity 0.18s ease;
            }

            .hero-hideable.invisible { opacity: 0; }

            .hero-chip { transition: transform 0.25s ease, background-color 0.25s ease, border-color 0.25s ease; }
            .hero-chip:hover { transform: translateY(-2px); }

            .hero-search-btn {
              background: linear-gradient(135deg, #D61F45 0%, #B91C3C 100%);
              box-shadow: 0 8px 22px rgba(214, 31, 69, 0.40);
              transition: transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease;
            }

            .hero-search-btn:hover {
              transform: translateY(-2px);
              box-shadow: 0 12px 30px rgba(214, 31, 69, 0.52);
              filter: brightness(1.06);
            }

            .hero-search-btn:active { transform: translateY(0); }

            .hero-search-btn .hero-search-arrow { transition: transform 0.25s ease; }
            .hero-search-btn:hover .hero-search-arrow { transform: translateX(4px); }

            /* ---------- UI: field wells ---------- */

            .hero-field {
              border: 1px solid #E5E7EB;
              border-radius: 14px;
              padding: 10px 14px;
              transition: border-color 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease;
            }

            .hero-field:hover { border-color: #F3C3CE; }

            /* FIX: a field with an open panel outranks its siblings */
            .hero-field { position: relative; }
            .hero-field:has(.hero-dd) { z-index: 40; }

            .hero-field:focus-within {
              border-color: #D61F45;
              background-color: #FFF7F9;
              box-shadow: 0 0 0 3px rgba(214, 31, 69, 0.12);
            }

            /* ---------- UI: slide nav ---------- */

            .hero-slide-btn { transition: transform 0.25s ease, background-color 0.25s ease; }
            .hero-slide-btn:hover { transform: scale(1.1); }

            /* ---------- Respect reduced-motion preferences ---------- */

            @media (prefers-reduced-motion: reduce) {
              .hero-anim,
              .hero-bg-zoom,
              .dd-anim,
              .voice-search-button.listening {
                animation: none !important;
              }
              .hero-chip:hover,
              .hero-search-btn:hover,
              .hero-slide-btn:hover,
              .voice-search-button:hover {
                transform: none !important;
              }
            }

          `}</style>


          {/* ==================================================
              BOTTOM SEARCH AREA
          ================================================== */}

          <div className="grid grid-cols-1 gap-3 px-4 py-4 sm:px-5 md:grid-cols-2 lg:grid-cols-[1.9fr_1fr_1fr_1fr_auto] lg:items-end">


            {/* ==================================================
                LOCATION (Search field + separate City dropdown)
            ================================================== */}

            <div className="relative hero-field">

              <label className="search-field-label">Location</label>

              <div className="flex items-center gap-2">

                {/* ---- Search Input ---- */}
                <div className="flex items-center flex-1 min-w-0">

                  {/* <FaMapMarkerAlt className="shrink-0 text-amber-500" size={16} /> */}

                  <FaMapMarkerAlt className="shrink-0 text-[#D61F45] mr-2" size={15} />

                  <input
                    ref={inputRef}
                    type="text"
                    id="search"
                    placeholder={placeholderTexts[placeholderIndex]}
                    className="w-full min-w-0 pl-0.5 pr-1.5 text-sm text-gray-800 bg-transparent outline-none border-none sm:text-[15px]"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={() => setCityDropdownOpen(false)}
                  />

                  <button
                    type="button"
                    onClick={handleVoiceSearch}
                    title={isListening ? "Stop listening" : "Voice Search"}
                    className={`voice-search-button ${isListening ? "listening" : ""}`}
                  >
                    <FaMicrophone size={14} />
                  </button>

                </div>

              </div>

              {/* Existing search-text suggestions (unchanged) */}
              {showSuggestions && suggestions.length > 0 && (

                <div
                  ref={suggestionsListRef}
                  className="hero-dd dd-anim dd-scrollbar"
                  style={{ width: "100%", maxHeight: "280px" }}
                  role="listbox"
                >

                  {suggestions.map((item, index) => (

                    <button
                      type="button"
                      key={index}
                      role="option"
                      aria-selected={false}
                      className="hero-dd-item"
                      style={{ whiteSpace: "normal" }}
                      onClick={() => {
                        setSearchQuery(item.text);
                        setShowSuggestions(false);
                      }}
                    >
                      {item.text}
                    </button>

                  ))}

                  {/* NEW: scroll-down arrow — Location list only */}
                  <ListScrollArrow listRef={suggestionsListRef} itemCount={suggestions.length} />

                </div>

              )}

            </div>


            {/* ==================================================
                UI: CITY — now its own field well. Same state, same ref,
                and the Near Me button keeps its original handler.
            ================================================== */}

            <div className="relative hero-field" ref={locationFieldRef}>

              <label className="search-field-label">City</label>

              <div className="flex items-center gap-2">

                <button
                  type="button"
                  onClick={handleNearMeSearch}
                  disabled={isLoadingLocation}
                  title="Search Near Me"
                  className={`shrink-0 flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200 ${isLoadingLocation
                    ? "bg-gray-100 text-gray-400 animate-pulse"
                    : "bg-[#FDE8EC] text-[#D61F45] hover:bg-[#FAD3DB] hover:scale-110"
                    }`}
                >
                  <MdMyLocation size={15} />
                </button>

                <button
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={cityDropdownOpen}
                  onClick={() => {
                    setCityDropdownOpen((open) => !open);
                    setShowSuggestions(false);
                  }}
                  className="flex items-center flex-1 min-w-0 gap-1 text-sm sm:text-[15px] text-gray-800 whitespace-nowrap transition-colors duration-200 hover:text-[#D61F45]"
                >
                  <span className="flex-1 min-w-0 text-left truncate">
                    {searchCity || "Select a City"}
                  </span>
                  <FiChevronDown
                    size={15}
                    className={`shrink-0 text-gray-400 transition-transform duration-200 ${cityDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

              </div>

              {cityDropdownOpen && (

                <DropdownPortal
                  anchorRef={locationFieldRef}
                  panelRef={cityPanelRef}
                  align="left"
                  customScroll
                >

                  {CITIES.map((city) => {
                    // FIX: the first entry is a placeholder, not a real city.
                    const isPlaceholder = city === CITIES[0];
                    const isSelected = isPlaceholder
                      ? !searchCity
                      : searchCity === city;

                    return (
                      <button
                        type="button"
                        key={city}
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => {
                          // FIX: choosing the placeholder clears the city so the
                          // string "Select a City" is never sent as a filter.
                          setSearchCity(isPlaceholder ? "" : city);
                          setCityDropdownOpen(false);
                        }}
                        className={`hero-dd-item ${isSelected ? "is-selected" : ""}`}
                      >
                        {city}
                      </button>
                    );
                  })}

                </DropdownPortal>

              )}

            </div>


            {/* ==================================================
                PROPERTY TYPE
            ================================================== */}

            <div className="relative hero-field" ref={propertyTypeRef}>

              <label className="search-field-label">Property Type</label>

              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={propertyTypeOpen}
                onClick={() => {
                  setPropertyTypeOpen((open) => !open);
                  setBudgetOpen(false);
                  setCityDropdownOpen(false);
                }}
                className="flex items-center gap-2 w-full text-left transition-colors duration-200 hover:text-[#D61F45] group"
              >

                <FiHome className="shrink-0 text-[#D61F45] transition-transform duration-200 group-hover:scale-110" size={16} />

                <span className="flex-1 min-w-0 text-sm sm:text-[15px] text-gray-800 truncate">
                  {type || "Property Type"}
                </span>

                <FiChevronDown
                  size={16}
                  className={`shrink-0 text-gray-400 transition-transform duration-200 ${propertyTypeOpen ? "rotate-180" : ""}`}
                />

              </button>

              {propertyTypeOpen && (

                <DropdownPortal anchorRef={propertyTypeRef} panelRef={propertyTypePanelRef} align="left">

                  <button
                    type="button"
                    role="option"
                    aria-selected={type === ""}
                    onClick={() => {
                      setType("");
                      setPropertyTypeOpen(false);
                    }}
                    className={`hero-dd-item ${type === "" ? "is-selected" : ""}`}
                  >
                    Any Property Type
                  </button>

                  {PROPERTY_TYPES.map((option) => (

                    <button
                      type="button"
                      key={option}
                      role="option"
                      aria-selected={type === option}
                      onClick={() => {
                        setType(option);
                        setPropertyTypeOpen(false);
                      }}
                      className={`hero-dd-item ${type === option ? "is-selected" : ""}`}
                    >
                      {option}
                    </button>

                  ))}

                </DropdownPortal>

              )}

            </div>


            {/* ==================================================
                BUDGET
            ================================================== */}

            <div className="relative hero-field" ref={budgetRef}>

              <label className="search-field-label">Budget</label>

              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={budgetOpen}
                onClick={() => {
                  setBudgetOpen((open) => !open);
                  setPropertyTypeOpen(false);
                  setCityDropdownOpen(false);
                }}
                className="flex items-center gap-2 w-full text-left transition-colors duration-200 hover:text-[#D61F45] group"
              >

                {/* UI: ₹ reads better than $ for these ranges */}
                <FaRupeeSign className="shrink-0 text-[#D61F45] transition-transform duration-200 group-hover:scale-110" size={14} />

                <span className="flex-1 min-w-0 text-sm sm:text-[15px] text-gray-800 truncate">
                  {BUDGET_RANGES.find((range) => `${range.min}-${range.max}` === budget)?.label || "Any budget"}
                </span>

                <FiChevronDown
                  size={16}
                  className={`shrink-0 text-gray-400 transition-transform duration-200 ${budgetOpen ? "rotate-180" : ""}`}
                />

              </button>

              {budgetOpen && (

                <DropdownPortal anchorRef={budgetRef} panelRef={budgetPanelRef} align="left">

                  {BUDGET_RANGES.map((range) => {
                    const value = `${range.min}-${range.max}`;
                    return (
                      <button
                        type="button"
                        key={range.label}
                        role="option"
                        aria-selected={budget === value}
                        onClick={() => {
                          setBudget(value);
                          setBudgetOpen(false);
                        }}
                        className={`hero-dd-item ${budget === value ? "is-selected" : ""}`}
                      >
                        {range.label}
                      </button>
                    );
                  })}

                </DropdownPortal>

              )}

            </div>


            {/* ==================================================
                SEARCH BUTTON
            ================================================== */}

            <div>

              {/* UI: slate-900 -> brand red gradient, with a lift on hover */}
              <button
                className="hero-search-btn flex items-center justify-center w-full lg:w-auto gap-2 px-8 py-[14px] text-white rounded-2xl font-semibold shrink-0"
                onClick={handleSearch}
              >
                <FiSearch size={18} />
                <span>Search</span>
                <FaArrowRight size={13} className="hero-search-arrow" />
              </button>

            </div>

          </div>

        </div>


        {/* ==================================================
            ERROR MESSAGE
        ================================================== */}

        {error && (

          <div className="relative z-20 mt-3 text-center dd-anim">
            <span className="inline-block px-4 py-2 mt-4 text-sm text-center text-white rounded-lg bg-[#D61F45] shadow-lg">
              {error}
            </span>
          </div>

        )}


        {/* ==================================================
            SUGGESTIONS
        ================================================== */}

        <div className={`relative z-10 mt-6 text-center sm:mt-8 hero-anim hero-d6 ${anyDropdownOpen ? "invisible pointer-events-none" : "visible"} hero-hideable`}>

          <div className="flex flex-wrap items-center justify-center gap-2">

            <h3
              className="flex items-center gap-2 mt-2 mr-1"
              style={{
                fontSize: "0.95rem",
                fontWeight: 600,
                color: "rgb(229, 231, 235)",
                marginBottom: "0.5rem",
              }}
            >
              <FaFire className="text-[#D61F45]" size={15} />
              Popular Cities :
            </h3>

            {[
              "Ahmedabad",
              "Bengaluru",
              "Chennai",
              "Delhi",
              "Hyderabad",
              "Kolkata",
              "Mumbai",
              "Pune",
            ].map((location) => (

              <Link
                key={location}
                to={`/citywiseproperties/${location}`}
                className="px-4 py-2 text-sm font-medium text-white no-underline border rounded-full cursor-pointer hero-chip bg-slate-900/45 backdrop-blur-md border-white/15 hover:bg-[#D61F45] hover:border-[#D61F45] hover:no-underline"
              >
                {location}
              </Link>

            ))}

          </div>

        </div>


        {/* ==================================================
            UI: FOOTER ACCENTS — script line + slide nav.
            The nav only appears once HERO_SLIDES holds more than one image.
        ================================================== */}

        <div className={`relative z-10 flex items-end justify-between gap-4 mt-6 sm:mt-8 ${anyDropdownOpen ? "invisible pointer-events-none" : "visible"} hero-hideable`}>

          <div
            className="hidden leading-tight text-white sm:block hero-anim hero-d6"
            style={{
              fontFamily: "'Segoe Script','Bradley Hand','Brush Script MT',cursive",
            }}
          >
            <span className="block text-base">Live the</span>
            <span className="block text-base">Life You Deserve</span>
            <span className="block w-20 h-0.5 mt-1 rounded-full bg-[#D61F45]" />
          </div>

          {HERO_SLIDES.length > 1 && (

            <div className="flex items-center gap-3 ml-auto hero-anim hero-d6">

              <button
                type="button"
                aria-label="Previous slide"
                onClick={goToPrevSlide}
                className="flex items-center justify-center w-10 h-10 text-white border rounded-full hero-slide-btn bg-slate-900/50 backdrop-blur-md border-white/15 hover:bg-slate-900/70"
              >
                <FaArrowLeft size={14} />
              </button>

              <span className="text-sm text-white tabular-nums">
                {String(slideIndex + 1).padStart(2, "0")}
                <span className="mx-1 text-gray-400">/</span>
                <span className="text-gray-400">
                  {String(HERO_SLIDES.length).padStart(2, "0")}
                </span>
              </span>

              <button
                type="button"
                aria-label="Next slide"
                onClick={goToNextSlide}
                className="flex items-center justify-center w-10 h-10 text-white rounded-full hero-slide-btn bg-[#D61F45] hover:bg-[#B91C3C] shadow-lg"
              >
                <FaArrowRight size={14} />
              </button>

            </div>

          )}

        </div>

      </div>

    </div>

  );

};

export default Search;