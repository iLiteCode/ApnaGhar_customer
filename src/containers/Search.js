import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import {
  FaSearch,
  FaCity,
  FaPlus,
  FaPlusCircle,
  FaMapMarkerAlt,
  FaHome,
  FaMicrophone,
} from "react-icons/fa";

import { FiSearch } from "react-icons/fi";
import { MdOutlineAddLocation, MdMyLocation } from "react-icons/md";
import { RiHomeLine } from "react-icons/ri";

import { SearchContext } from "./SearchContext";


// ==========================================================
// NAVIGATION TABS
// ==========================================================

const NAV_TABS = [
  { label: "BUY", key: "Buy", type: "Buy" },
  { label: "RENT", key: "Rent", type: "Rent" },
  { label: "PG", key: "PG", type: "PG/Co-living" },
  { label: "Plots/Land", key: "Plot", type: "Plot/Land" },
  { label: "COMMERCIAL", key: "Commercial", type: "Commercial" },
];


const Search = () => {

  const history = useHistory();

  const {
    searchCity,
    setSearchCity
  } = useContext(SearchContext);


  // ==========================================================
  // SEARCH STATES
  // ==========================================================

  const [searchQuery, setSearchQuery] = useState("");

  const [suggestions, setSuggestions] = useState([]);

  const [showSuggestions, setShowSuggestions] = useState(false);

  const [type, setType] = useState("");

  const [error, setError] = useState("");

  const inputRef = useRef(null);


  // ==========================================================
  // VOICE SEARCH STATE
  // ==========================================================

  const [isListening, setIsListening] = useState(false);

  const recognitionRef = useRef(null);


  const GOOGLE_MAPS_API_KEY =
    "AIzaSyAt8bj4UACvakZfiSy-0c1o_ivfplm7jEU";


  // ==========================================================
  // TAB INDICATOR
  // ==========================================================

  const tabRefs = useRef({});

  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });


  const moveIndicator = (key) => {

    const el = tabRefs.current[key];

    if (el) {

      setIndicatorStyle({
        left: el.offsetLeft,
        width: el.offsetWidth,
        opacity: 1,
      });

    }
  };


  const handleTabMouseEnter = (key) => {
    moveIndicator(key);
  };


  const handleTabRowMouseLeave = () => {

    setIndicatorStyle((prev) => ({
      ...prev,
      opacity: 0,
    }));

  };


  // ==========================================================
  // CITY CHANGE
  // ==========================================================

  const handleCityChange = (e) => {

    const selectedCity = e.target.value;

    setSearchCity(selectedCity);

  };


  // ==========================================================
  // PLACEHOLDER
  // ==========================================================

  const placeholderTexts = [
    "Search by City or Locality...",
    "Search Properties by Location",
    "Enter City, Area",
    'Search "Pune"',
    'Search "Mumbai"',
  ];


  const [placeholderIndex, setPlaceholderIndex] = useState(0);


  useEffect(() => {

    const intervalId = setInterval(() => {

      setPlaceholderIndex(
        (prev) =>
          (prev + 1) % placeholderTexts.length
      );

    }, 3000);


    return () => clearInterval(intervalId);

  }, []);


  // ==========================================================
  // LOCATION LOADING
  // ==========================================================

  const [isLoadingLocation, setIsLoadingLocation] =
    useState(false);


  // ==========================================================
  // VOICE SEARCH
  // ==========================================================

  const handleVoiceSearch = () => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

      setError(
        "Voice search is not supported in this browser. Please use Google Chrome."
      );

      return;
    }


    // If already listening, stop it
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


    // ================= START =================

    recognition.onstart = () => {

      setIsListening(true);

      setError("");

    };


    // ================= RESULT =================

    recognition.onresult = (event) => {

      const transcript =
        event.results[0][0].transcript;


      if (transcript) {

        setSearchQuery(transcript);

        setShowSuggestions(false);

      }

    };


    // ================= ERROR =================

    recognition.onerror = (event) => {

      console.error(
        "Voice recognition error:",
        event.error
      );


      setIsListening(false);


      if (event.error === "not-allowed") {

        setError(
          "Please allow microphone access to use voice search."
        );

      } else if (event.error === "no-speech") {

        setError(
          "No speech detected. Please try again."
        );

      } else {

        setError(
          "Voice search failed. Please try again."
        );

      }

    };


    // ================= END =================

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

      setError(
        "Geolocation is not supported by your browser."
      );

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


          if (
            data.status === "OK" &&
            data.results.length > 0
          ) {

            let detectedCity = "";


            const addressComponents =
              data.results[0].address_components;


            for (
              let component of addressComponents
            ) {

              if (
                component.types.includes(
                  "locality"
                )
              ) {

                detectedCity =
                  component.long_name;

                break;

              }

            }


            if (detectedCity) {

              setSearchCity(detectedCity);


              history.push({

                pathname:
                  "/searchdashboard",

                state: {

                  searchCity:
                    detectedCity,

                  searchQuery: "",

                  type: type,

                },

              });

            } else {

              setError(
                "Unable to detect your city. Please enter it manually."
              );

            }

          } else {

            setError(
              "Failed to fetch city details from your location."
            );

          }

        } catch (error) {

          setIsLoadingLocation(false);

          setError(
            "Network error. Please try again."
          );

        }

      },


      (err) => {

        setIsLoadingLocation(false);


        if (err.code === 1) {

          setError(
            "Please allow location access to use the 'Near Me' feature."
          );

        } else {

          setError(
            "Could not retrieve your location. Please try again."
          );

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


    if (!value.trim()) {

      setSuggestions([]);

      setShowSuggestions(false);

      return;

    }


    try {

      const response = await axios.post(

        `${process.env.REACT_APP_API_URL}/cust_api/search_suggestions`,

        {
          query: value,
        }

      );


      if (response.data.status === 1) {

        setSuggestions(
          response.data.data
        );

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

    if (
      !searchQuery &&
      !searchCity &&
      !type
    ) {

      setError(
        "Please enter what you're looking for."
      );

      return;

    }


    setError("");


    history.push({

      pathname: "/searchdashboard",

      state: {

        searchCity,

        searchQuery,

        type,

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

    <div className="relative flex items-center justify-center m-3 bg-white min-h-[200px] py-9 sm:py-18">

      {/* Background */}

      <div
        className="absolute top-0 bottom-0 left-0 right-0 w-full h-full bg-center bg-cover rounded-3xl sm:rounded-3xl"
        style={{
          backgroundImage:
            "url('/image/modern.jpg')",
        }}
      ></div>


      <div className="relative w-full max-w-6xl p-2 bg-transparent rounded-3xl mx-auto sm:p-6">


        {/* ==================================================
            HEADING
        ================================================== */}

        <div className="mb-6 text-center sm:mb-11">

          <h1 className="text-2xl font-semibold tracking-widest text-white sm:text-2xl lg:text-3xl">

            Let's find your home

            <br />

            that's perfect for you

          </h1>

        </div>


        {/* ==================================================
            SEARCH FORM
        ================================================== */}

        <div className="flex flex-col w-full bg-white rounded-2xl shadow-lg">


          {/* ==================================================
              TOP TABS
          ================================================== */}

          <div
            className="relative flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-16 text-gray-700 font-semibold tracking-wider border-b border-gray-100 p-3"
            onMouseLeave={handleTabRowMouseLeave}
          >

            {NAV_TABS.map((tab) => (

              <Link
                key={tab.key}

                ref={(el) => {
                  tabRefs.current[tab.key] =
                    el;
                }}

                to={{
                  pathname: "/property",
                  state: {
                    propertyType:
                      tab.type,
                  },
                }}

                onMouseEnter={() =>
                  handleTabMouseEnter(
                    tab.key
                  )
                }

                className="nav-tab text-lg font-medium tracking-wider text-gray-600 no-underline hover:no-underline"
              >

                {tab.label}

              </Link>

            ))}


            {/* Indicator */}

            <span
              className="nav-tab-indicator hidden sm:block"
              style={{
                left:
                  indicatorStyle.left,

                width:
                  indicatorStyle.width,

                opacity:
                  indicatorStyle.opacity,
              }}
            />

          </div>


          {/* ==================================================
              TAB STYLE
          ================================================== */}

          <style>{`

            .nav-tab {
              position: relative;
              transition: color 0.3s ease;
            }

            .nav-tab:hover {
              color: #8B1E3F;
            }

            .nav-tab-indicator {
              position: absolute;
              bottom: 6px;
              height: 3px;
              background-color: #8B1E3F;
              opacity: 0;
              transition:
                left 0.3s ease,
                width 0.3s ease,
                opacity 0.2s ease;
            }

            /* ================= VOICE BUTTON ================= */

            .voice-search-button {
              width: 38px;
              height: 38px;
              min-width: 38px;

              display: flex;
              align-items: center;
              justify-content: center;

              border: none;
              border-radius: 50%;

              background: #fff8ed;
              color: #c99a3e;

              cursor: pointer;

              transition: all 0.2s ease;
            }

            .voice-search-button:hover {
              background: #fdf0d8;
              color: #a87924;
            }

            .voice-search-button.listening {
              background: #f7e2c0;
              color: #8f641e;

              animation:
                voicePulse 1.2s infinite;
            }

            @keyframes voicePulse {

              0% {
                box-shadow:
                  0 0 0 0
                  rgba(201, 154, 62, 0.4);
              }

              70% {
                box-shadow:
                  0 0 0 10px
                  rgba(201, 154, 62, 0);
              }

              100% {
                box-shadow:
                  0 0 0 0
                  rgba(201, 154, 62, 0);
              }

            }

          `}</style>


          {/* ==================================================
              BOTTOM SEARCH AREA
          ================================================== */}

          <div className="flex flex-col lg:flex-row items-stretch lg:items-center p-3 gap-3 lg:gap-2">


            {/* ==================================================
                SEARCH + DROPDOWNS
            ================================================== */}

            <div className="flex flex-col md:flex-row items-stretch md:items-center w-full flex-1 gap-2 md:gap-0 md:divide-x md:divide-gray-100">


              {/* ==================================================
                  SEARCH FIELD
              ================================================== */}

              <div className="relative flex items-center w-full px-2 py-2 md:py-1 md:pr-3">


                {/* Search Icon */}

                <button
                  type="button"
                  className="p-1 my-text rounded-full focus:outline-none shrink-0"
                >

                  <FiSearch size={22} />

                </button>


                {/* Search Input */}

                <input
                  ref={inputRef}

                  type="text"

                  id="search"

                  placeholder={
                    placeholderTexts[
                    placeholderIndex
                    ]
                  }

                  className="w-full min-w-0 px-2 ml-2 text-sm text-gray-600 bg-transparent outline-none border-none sm:text-base"

                  value={searchQuery}

                  onChange={
                    handleSearchChange
                  }
                />


                {/* ==================================================
                    VOICE BUTTON
                ================================================== */}

                <button
                  type="button"

                  onClick={
                    handleVoiceSearch
                  }

                  title={
                    isListening
                      ? "Stop listening"
                      : "Voice Search"
                  }

                  className={`voice-search-button ${isListening
                      ? "listening"
                      : ""
                    }`}
                >

                  <FaMicrophone size={16} />

                </button>


                {/* ==================================================
                    SUGGESTIONS
                ================================================== */}

                {showSuggestions &&
                  suggestions.length >
                  0 && (

                    <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">

                      {suggestions.map(
                        (item, index) => (

                          <div
                            key={index}

                            className="px-4 py-3 cursor-pointer hover:bg-gray-100 border-b last:border-b-0"

                            onClick={() => {

                              setSearchQuery(
                                item.text
                              );

                              setShowSuggestions(
                                false
                              );

                            }}
                          >

                            {item.text}

                          </div>

                        )
                      )}

                    </div>

                  )}

              </div>


              {/* ==================================================
                  CITY DROPDOWN
              ================================================== */}

              <div className="flex items-center w-full md:w-[220px] lg:w-[230px] px-2 py-2 md:px-3">

                <MdOutlineAddLocation
                  className="my-text shrink-0"
                  size={22}
                />

                <select
                  id="city"

                  className="w-full min-w-0 ml-2 text-sm sm:text-base text-gray-600 bg-transparent outline-none border-none cursor-pointer"

                  value={searchCity}

                  onChange={
                    handleCityChange
                  }
                >

                  <option value="">
                    Select a City
                  </option>

                  <option value="Ahmedabad">
                    Ahmedabad
                  </option>

                  <option value="Bengaluru">
                    Bengaluru
                  </option>

                  <option value="Chennai">
                    Chennai
                  </option>

                  <option value="Delhi">
                    Delhi
                  </option>

                  <option value="Hyderabad">
                    Hyderabad
                  </option>

                  <option value="Kolkata">
                    Kolkata
                  </option>

                  <option value="Mumbai">
                    Mumbai
                  </option>

                  <option value="Pune">
                    Pune
                  </option>

                </select>

              </div>


              {/* ==================================================
                  PROPERTY TYPE
              ================================================== */}

              <div className="flex items-center w-full md:w-[190px] lg:w-[200px] px-2 py-2 md:px-3">

                <RiHomeLine
                  className="my-text shrink-0"
                  size={22}
                />

                <select
                  id="type"

                  className="w-full min-w-0 ml-2 text-sm sm:text-base text-gray-600 bg-transparent outline-none border-none cursor-pointer truncate"

                  value={type}

                  onChange={(e) =>
                    setType(
                      e.target.value
                    )
                  }
                >

                  <option value="">
                    Property Type
                  </option>

                  <option value="Residential">
                    Residential
                  </option>

                  <option value="Commercial">
                    Commercial
                  </option>

                </select>

              </div>


              {/* ==================================================
                  NEAR ME
              ================================================== */}

              <div className="flex items-center justify-center md:justify-start p-2 relative group shrink-0">

                <button

                  onClick={
                    handleNearMeSearch
                  }

                  disabled={
                    isLoadingLocation
                  }

                  type="button"

                  className={`flex items-center justify-center p-2 transition rounded-full focus:outline-none ${isLoadingLocation
                      ? "bg-gray-100 text-gray-400 animate-pulse"
                      : "bg-rose-50 my-text hover:bg-rose-100"
                    }`}
                >

                  <MdMyLocation
                    size={20}
                  />

                </button>


                {/* Tooltip */}

                <div className="absolute right-0 items-center hidden px-3 py-2 text-sm text-[#0f172a] whitespace-nowrap bg-white border border-gray-100 rounded shadow-lg top-12 group-hover:flex z-50">

                  <div className="absolute top-[-5px] right-3 w-3 h-3 bg-white border-t border-l border-gray-100 transform rotate-45"></div>

                  <MdMyLocation
                    size={16}
                    className="mr-1 my-text"
                  />

                  Search

                  <span className="ml-1 font-bold">
                    Near Me
                  </span>

                </div>

              </div>

            </div>


            {/* ==================================================
                SEARCH BUTTON
            ================================================== */}

            <button

              className="flex items-center justify-center w-full lg:w-auto gap-2 px-6 py-2.5 text-white transition-all duration-300 my-bg rounded-lg hover:opacity-90 font-medium shrink-0"

              onClick={
                handleSearch
              }
            >

              <FiSearch size={20} />

              <span className="inline">
                Search
              </span>

            </button>

          </div>

        </div>


        {/* ==================================================
            ERROR MESSAGE
        ================================================== */}

        {error && (

          <div className="mt-3 text-center">

            <span className="px-4 mt-4 text-sm text-center text-white bg-gray-800 rounded">

              {error}

            </span>

          </div>

        )}


        {/* ==================================================
            SUGGESTIONS
        ================================================== */}

        <div className="mt-6 text-center sm:mt-10">

          <div className="flex flex-wrap justify-center gap-2 sm:justify-start">

            <h3
              className="w-full mt-2 sm:w-auto"
              style={{
                fontSize: "1rem",
                color: "rgb(229, 231, 235)",
                marginBottom:
                  "0.5rem",
              }}
            >

              Suggestion:

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

                className="px-3 py-2 text-sm text-white no-underline rounded-full cursor-pointer bg-gray-900/20 backdrop-blur-sm bg-transparnt/70 bg-opacity-70 hover:bg-gray-600 hover:no-underline"
              >

                {location}

              </Link>

            ))}

          </div>

        </div>

      </div>

    </div>

  );

};


export default Search;