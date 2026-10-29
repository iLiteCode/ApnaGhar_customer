import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRef } from "react";
import { MdApartment } from "react-icons/md";
import { FaBath, FaUser } from "react-icons/fa";
import { RiRuler2Line } from "react-icons/ri";
import { AiOutlineClockCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Slider from "react-slick";
import { Ruler } from "lucide-react";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { CiHeart } from "react-icons/ci";
import { useHistory } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import "../styles/RecommendedProperties.css";
import { FaRupeeSign } from "react-icons/fa"; // Icon for price
import { BsHouseDoorFill, BsArrowsFullscreen } from "react-icons/bs"; // Icon for property type
import { faChair } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { AiOutlineUser } from "react-icons/ai";
import { GoArrowLeft } from "react-icons/go";
import { GoArrowRight } from "react-icons/go";
import { PiCubeFocus } from "react-icons/pi";
import { BiShapeSquare } from "react-icons/bi";
import { Heart, ShieldCheck, Star, Images, CalendarCheck, Sparkles, Crown, Cpu } from "lucide-react"; // NEW: ShieldCheck + Star for badges; Images + CalendarCheck for the image overlay; Sparkles/Crown/Cpu for the new AI Recommendation header
import { FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import Login1 from "../auth/Login1";
import SignUp1 from "../auth/SignUp1";
import PropertyCardSkeleton from "./PropertyCardSkeleton";

const userLocation = JSON.parse(sessionStorage.getItem("userLocation"));
// console.log(userLocation);

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
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

const ManyMore = ({
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [images, setImages] = useState([]);
  const history = useHistory();
  const defaultImage = "/image/appstore.png";
  const userId = sessionStorage.getItem("accessToken");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  // useEffect(() => {
  //   if (userId) {
  //     setIsLoggedIn(true);
  //     fetchSavedProperties(userId);
  //   } else {
  //     setIsLoggedIn(false);
  //   }
  // }, []);

  // const fetchSavedProperties = async () => {
  //   try {
  //     const response = await axios.post(
  //       `${process.env.REACT_APP_API_URL}/cust_api/get_favorite_properties`,
  //       {
  //         user_id: userId,
  //       }
  //     );
  //     if (response.data.status === 1 && Array.isArray(response.data.data)) {
  //       const savedIds = response.data.data.map((prop) => prop._id);
  //       setSavedProperties(savedIds);
  //     } else {
  //       setSavedProperties([]);
  //       toast.error("No saved properties found.");
  //     }
  //   } catch (error) {
  //     toast.error("Error fetching saved properties:", error);
  //   }
  // };

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

  useEffect(() => {
    fetchRecommendedProperties();
  }, [data]);

  const handleClick = () => {
    history.push("/recommendedpropertiesDashboard");
  };

  // Add property to favorites
  const addToFavorites = async (propertyId) => {
    if (!userId) {
      toast.error("Please log in to save properties to your favorites.");
      return;
    }
    const data = { user_id: userId, property_id: propertyId };

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/cust_api/add_to_favorite`,
        data,
      );
      fetchHomeData();
    } catch (error) {
      fetchHomeData();
    }
  };

  // Remove property from favorites
  const removeFromFavorites = async (FavoriteId) => {
    if (!userId) {
      toast.error("Please log in to remove properties from your favorites.");
      return;
    }
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/cust_api/remove_from_favorite`,
        { data: { favorite_id: FavoriteId } },
      );
      fetchHomeData();
    } catch (error) {
      toast.error("Failed to remove favorite. Please try again.");
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

  // Slider settings
  const [activeIndexes, setActiveIndexes] = useState({});
  const BASE_URL = process.env.REACT_APP_API_URL;

  const settings = {
    // UI ONLY: `dots` flipped false -> true and a `dotsClass` added so the
    // carousel shows the brand pagination dots. Every other key (infinite,
    // lazyLoad, speed, slidesToShow, slidesToScroll, autoplay, autoplaySpeed,
    // arrows and all three responsive breakpoints) is exactly as it was.
    dots: true,
    dotsClass: "slick-dots mm-dots",
    infinite: properties.length > 4,
    lazyLoad: "ondemand",
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };

  const formatPrice = (price) => {
    if (price === null || price === undefined || price === "") return "";
    price = Number(price);
    const formatNumber = (value, unit) => {
      return `${value.toFixed(2).replace(/\.?0+$/, "")}${unit}`;
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

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // 3000ms = 3 seconds for auto-slide
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [images.length]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full px-4 py-4 bg-white sm:px-6 lg:px-0">

      {/* ==================== NEW (UI ONLY): animations + brand dot styling ====================
          Purely presentational. Class names are `mm-` prefixed so they can never
          clash with the Featured Properties or Builder Projects sections when all
          three render on the same page. */}
      <style>{`
        @keyframes mmFadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .mm-fade-up { animation: mmFadeUp .55s cubic-bezier(.22,.61,.36,1) both; }
        .mm-delay-1 { animation-delay: .06s; }
        .mm-delay-2 { animation-delay: .12s; }
        .mm-delay-3 { animation-delay: .18s; }
        .mm-delay-4 { animation-delay: .24s; }

        /* Soft pulse on the AI chip icons */
        @keyframes mmPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(214,31,69,0.22); }
          50%      { box-shadow: 0 0 0 6px rgba(214,31,69,0); }
        }
        .mm-pulse { animation: mmPulse 2.6s ease-out infinite; }

        /* Carousel dots -> brand pink / red */
        .slider-container .mm-dots { bottom: -34px; }
        .slider-container .mm-dots li { width: 14px; height: 14px; margin: 0 3px; }
        .slider-container .mm-dots li button { width: 14px; height: 14px; padding: 0; }
        .slider-container .mm-dots li button:before {
          content: "";
          width: 8px; height: 8px; top: 3px; left: 3px;
          border-radius: 9999px;
          background: #F7C3CE;
          opacity: 1;
          transition: background .25s ease, width .25s ease, height .25s ease, top .25s ease, left .25s ease;
        }
        .slider-container .mm-dots li.slick-active button:before {
          background: #D61F45;
          width: 10px; height: 10px; top: 2px; left: 2px;
        }
      `}</style>

      {/* UI: the slate panel becomes the soft pink panel from the design.
          pb-14 leaves room for the new dots. */}
      <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-b from-[#FDF5F7] to-[#FBEEF1] pb-14">

        {/* NEW: faint skyline watermark behind the header (decorative) */}
        <svg
          aria-hidden="true"
          className="absolute top-0 right-0 pointer-events-none select-none w-[55%] h-[180px] sm:h-[200px]"
          viewBox="0 0 900 200"
          preserveAspectRatio="none"
        >
          <g fill="#D61F45" opacity="0.07">
            <rect x="30" y="118" width="32" height="82" />
            <rect x="70" y="84" width="24" height="116" />
            <rect x="102" y="130" width="38" height="70" />
            <rect x="148" y="68" width="22" height="132" />
            <rect x="178" y="106" width="34" height="94" />
            <rect x="220" y="138" width="28" height="62" />
            <rect x="256" y="90" width="30" height="110" />
            <rect x="294" y="120" width="40" height="80" />
            <rect x="342" y="76" width="24" height="124" />
            <rect x="374" y="126" width="34" height="74" />
            <rect x="416" y="100" width="26" height="100" />
            <rect x="450" y="142" width="42" height="58" />
            <rect x="500" y="112" width="28" height="88" />
            <rect x="536" y="80" width="22" height="120" />
            <rect x="566" y="134" width="38" height="66" />
            <rect x="612" y="104" width="26" height="96" />
            <rect x="646" y="124" width="34" height="76" />
            <rect x="688" y="72" width="20" height="128" />
            <rect x="716" y="114" width="40" height="86" />
            <rect x="764" y="146" width="28" height="54" />
            <rect x="800" y="96" width="32" height="104" />
          </g>
        </svg>

        {/* z-10 keeps the real content above the watermark */}
        <div className="relative z-10 w-full">

          <div className="flex flex-col gap-4 px-4 pt-6 mb-4 sm:px-6 lg:px-8 xl:flex-row xl:items-center xl:justify-between">

            {/* ---------- LEFT: eyebrow + headline + subtitle ---------- */}
            <div className="flex flex-col">

              {/* NEW: eyebrow with AI chip icon + trailing rule */}
              <div className="flex items-center gap-2 mb-2 mm-fade-up">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#D61F45] flex-shrink-0">
                  <Cpu size={13} className="text-white" strokeWidth={2.5} />
                </span>
                <span className="text-[11px] sm:text-xs font-bold tracking-[0.18em] text-[#D61F45] uppercase whitespace-nowrap">
                  AI Recommendation
                </span>
                <span className="hidden sm:block h-px w-12 bg-[#D61F45]/35" />
              </div>

              {/* UI: two-tone headline replaces the old single-tone
                  "Exclusive Recommended Properties" h2 */}
              <h2 className="mb-2 text-xl font-bold tracking-tight text-[#172033] sm:text-2xl lg:text-4xl mm-fade-up mm-delay-1">
                Properties{" "}
                <span className="text-[#D61F45]">Handpicked for You</span>
              </h2>

              <p className="text-sm text-[#64748B] sm:text-base mm-fade-up mm-delay-2">
                Our AI analyses your preferences to show the most suitable properties for you.
              </p>
            </div>

            {/* ---------- MIDDLE: three value chips ----------
                Static brand copy describing how this section works — it makes no
                claim about any individual property, so nothing here is derived
                from (or pretends to be) API data. */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 xl:gap-x-7 mm-fade-up mm-delay-3">
              <div className="flex items-center gap-2.5">
                <span className="flex items-center justify-center flex-shrink-0 rounded-full w-11 h-11 bg-[#FDE8EC] mm-pulse">
                  <Sparkles size={18} className="text-[#D61F45]" />
                </span>
                <div className="leading-tight">
                  <p className="m-0 text-[13px] sm:text-sm font-bold text-[#172033]">
                    AI Smart Match
                  </p>
                  <p className="m-0 text-[11px] sm:text-xs text-[#64748B]">
                    Based on your preferences
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="flex items-center justify-center flex-shrink-0 rounded-full w-11 h-11 bg-[#FDE8EC]">
                  <FaMapMarkerAlt className="text-[#D61F45] text-[17px]" />
                </span>
                <div className="leading-tight">
                  <p className="m-0 text-[13px] sm:text-sm font-bold text-[#172033]">
                    Better Locations
                  </p>
                  <p className="m-0 text-[11px] sm:text-xs text-[#64748B]">
                    Top rated areas
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="flex items-center justify-center flex-shrink-0 rounded-full w-11 h-11 bg-[#FDE8EC]">
                  <Crown size={18} className="text-[#D61F45] fill-[#D61F45]" />
                </span>
                <div className="leading-tight">
                  <p className="m-0 text-[13px] sm:text-sm font-bold text-[#172033]">
                    Best Value
                  </p>
                  <p className="m-0 text-[11px] sm:text-xs text-[#64748B]">
                    Verified listings
                  </p>
                </div>
              </div>
            </div>

            {/* ---------- RIGHT: CTA + arrows ---------- */}
            <div className="flex items-center w-full gap-3 sm:w-auto xl:flex-shrink-0 mm-fade-up mm-delay-4">

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

              {/* UI: pale pink circle. slickPrev() unchanged. */}
              <button
                className="hidden sm:flex items-center justify-center flex-shrink-0 rounded-full w-11 h-11 bg-[#D61F45]/10 transition-all duration-300 hover:bg-[#D61F45]/20 hover:scale-105 active:scale-95"
                onClick={() => sliderRef.current.slickPrev()}
              >
                <GoArrowLeft className="text-2xl text-[#D61F45]" />
              </button>

              {/* UI: solid brand circle. slickNext() unchanged. */}
              <button
                className="hidden sm:flex items-center justify-center flex-shrink-0 rounded-full w-11 h-11 bg-[#D61F45] shadow-md transition-all duration-300 hover:bg-[#B91C3C] hover:shadow-lg hover:scale-105 active:scale-95"
                onClick={() => sliderRef.current.slickNext()}
              >
                <GoArrowRight className="text-2xl text-white" />
              </button>
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
                  let distance = null;

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

                    // Commercial Properties
                    if (
                      category === "Commercial Buy" ||
                      category === "Commercial Lease"
                    ) {
                      return `${type} for ${category === "Commercial Buy" ? "Sale" : "Lease"
                        } in ${location}`;
                    }

                    // PG / Co-Living
                    if (
                      category.includes("PG") ||
                      category.includes("Co-Living") ||
                      category.includes("Coliving")
                    ) {
                      return `${type} for Rent in ${location}`;
                    }

                    // Residential
                    const action = category === "Buy" ? "Sale" : category;
                    return `${property.bhk_type} ${type} for ${action} in ${location}`;
                  })();

                  if (userLocation && property.latitude && property.longitude) {
                    distance = calculateDistance(
                      userLocation.latitude,
                      userLocation.longitude,
                      parseFloat(property.latitude),
                      parseFloat(property.longitude),
                    ).toFixed(1);
                  }

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

                  return (
                    <div key={property._id} className="box-border w-full h-full p-2">
                      {/* PREMIUM: white card bg, subtle border, soft shadow that lifts on hover. Original min-heights kept. */}
                      <div className="flex flex-col h-full min-h-[460px] sm:min-h-[500px] overflow-hidden bg-white border border-[#E2E8F0] shadow-md hover:shadow-xl transition-shadow duration-300 rounded-2xl">
                        <div className="w-full overflow-hidden rounded-t-2xl">
                          {/* PREMIUM: added `group` so the image can zoom on hover */}
                          <div className="relative group">
                            <Link
                              to={`/propertydetails/${property._id}`}
                              className="block overflow-hidden"
                              onClick={() =>
                                window.scrollTo({ top: 0, behavior: "smooth" })
                              }
                            >
                              {allImages.length > 1 ? (
                                <Slider
                                  key={`${property._id}-${allImages.length}-${Date.now()}`}
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
                                          width: "8px",
                                          height: "8px",
                                          borderRadius: "50%",
                                          background: isActive
                                            ? "#F5B800"
                                            : "rgba(255,255,255,0.6)",
                                          margin: "0 4px",
                                          cursor: "pointer",
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
                                        zIndex: 20,
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
                                        alt={property.property_name || "Property"}
                                        className="object-cover w-full h-[160px] sm:h-[200px] md:h-[220px] lg:h-[200px] transition-transform duration-500 ease-out group-hover:scale-105"
                                      />
                                    </div>
                                  ))}
                                </Slider>
                              ) : (
                                <img
                                  src={allImages[0] || "/image/app.png"}
                                  alt={property.property_name || "Property"}
                                  className="object-cover w-full h-[160px] sm:h-[200px] md:h-[220px] lg:h-[200px] transition-transform duration-500 ease-out group-hover:scale-105"
                                />
                              )}
                            </Link>

                            {/* PREMIUM IMAGE OVERLAY — gradient tuned for badges at the top and the counter at the bottom */}
                            <div className="absolute inset-0 z-[5] pointer-events-none bg-gradient-to-b from-black/50 via-black/0 to-black/40" />

                            {/* Days on nowaybroker */}
                            {/* <span className="absolute px-2 py-1 text-xs font-normal text-white rounded-full top-2 left-2 bg-gray-800/60 backdrop-blur-sm">
                          {property.days_since_created} days on NoWayBroker
                        </span> */}

                            {/* TOP-LEFT BADGE ROW — New Booking / Featured / Verified. All three are driven by existing API fields and wrap on narrow cards.
                                max-w keeps this row clear of the share/favorite buttons on the right. */}
                            <div className="absolute z-20 flex flex-col items-start gap-1.5 top-3 left-3 max-w-[58%]">

                              {/* NEW: "New Booking" pill. Condition uses the existing days_since_created field (listed within the last 7 days).
                                  If your API exposes a dedicated flag, swap ONLY this condition for it. */}
                              {property.days_since_created !== null &&
                                property.days_since_created !== undefined &&
                                Number(property.days_since_created) <= 7 && (
                                  <span className="flex items-center gap-1 px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold text-white rounded-full shadow-md bg-gradient-to-r from-[#D61F45] to-[#B91C3C]">
                                    <CalendarCheck size={12} strokeWidth={2.5} className="text-white" />
                                    New Booking
                                  </span>
                                )}

                              {/* Featured tag -> gold gradient pill with star icon. Same mark_as_featured condition, unchanged logic. Moved from bottom-right to this row. */}
                              {property.mark_as_featured === "Yes" && (
                                <span className="flex items-center gap-1 px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold text-[#172033] rounded-full shadow-md bg-gradient-to-r from-[#F5B800] to-[#D4A72C]">
                                  <Star size={12} className="fill-[#172033] text-[#172033]" />
                                  Featured
                                </span>
                              )}

                              {/* Admin Approval Badge -> Verified pill (green, shield-check icon). Same admin_approval condition, dynamic, unchanged logic. */}
                              {property.admin_approval === "Approved" && (
                                <span className="flex items-center gap-1 px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold text-white rounded-full shadow-md bg-[#16A34A]">
                                  <ShieldCheck size={12} strokeWidth={2.5} className="text-white" />
                                  Verified
                                </span>
                              )}
                            </div>

                            {/* Share & Favorite Buttons (Virtual Tour moved to the bottom row so it can't collide with the badges above) */}
                            <div className="absolute z-20 flex items-center space-x-2 top-3 right-3">
                              {/* NEW: Share button on the image, reuses existing openRecommendedShareModal handler */}
                              <button
                                type="button"
                                className="p-2 rounded-full shadow bg-[#0F2747]/60 backdrop-blur-sm hover:bg-[#0F2747]/80 transition-colors"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  openRecommendedShareModal(property._id);
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faShareNodes}
                                  className="text-white text-[13px]"
                                />
                              </button>

                              <button
                                type="button"
                                className="p-2 rounded-full shadow bg-[#0F2747]/60 backdrop-blur-sm hover:bg-[#0F2747]/80 transition-colors"
                                onClick={() => {
                                  if (!userId) {
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
                                  size={19}
                                  stroke={property.is_favorite ? "none" : "white"}
                                  color={
                                    property.is_favorite
                                      ? "#D61F45"
                                      : "rgba(255, 255, 255, 0.85)"
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

                            {/* NEW: brand tagline panel on the right of the image (decorative, pointer-events-none so the Link still works) */}
                            {/* <div className="absolute z-10 hidden sm:block right-0 top-1/2 -translate-y-1/2 pointer-events-none bg-[#0F2747]/55 backdrop-blur-[2px] rounded-l-md px-3 py-2">
                              <p className="m-0 text-[9px] leading-tight text-white/90">
                                A Better
                              </p>
                              <p className="m-0 text-sm font-bold leading-tight text-white">
                                Home
                              </p>
                              <p className="m-0 text-[9px] leading-tight text-white/90">
                                A Brighter
                              </p>
                              <p className="m-0 text-sm font-bold leading-tight text-[#F5B800]">
                                Tomorrow
                              </p>
                              <span className="block w-6 h-px mt-1 bg-[#D4A72C]" />
                            </div> */}

                            {/* FOR BUY/RENT tag -> PREMIUM: Price Accent red pill, same matching logic/condition, unchanged */}
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

                                let matchedType = "UNKNOWN";
                                let badgeColor = "bg-[#D61F45]";

                                if (normalizedCategory === "buy") {
                                  matchedType = "FOR SALE";
                                  badgeColor = "bg-[#D61F45]";
                                } else if (normalizedCategory === "rent") {
                                  matchedType = "FOR RENT";
                                  badgeColor = "bg-[#D61F45]";
                                } else if (
                                  normalizedCategory.includes("commercial buy")
                                ) {
                                  matchedType = "COMMERCIAL BUY";
                                  badgeColor = "bg-[#D61F45]";
                                } else if (
                                  normalizedCategory.includes("commercial lease")
                                ) {
                                  matchedType = "COMMERCIAL LEASE";
                                  badgeColor = "bg-[#D61F45]";
                                } else if (
                                  normalizedCategory.includes("pg") ||
                                  normalizedCategory.includes("co living") ||
                                  normalizedCategory.includes("coliving")
                                ) {
                                  matchedType = "PG/CO-LIVING";
                                  badgeColor = "bg-[#D61F45]";
                                }

                                return (
                                  <span
                                    className={`text-white text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full truncate block shadow-md ${badgeColor}`}
                                  >
                                    {matchedType}
                                  </span>
                                );
                              })()}
                            </div>

                            {/* NEW: image counter (1/8 style) built from the existing allImages array + activeIndexes state */}
                            {allImages.length > 0 && (
                              <div className="absolute z-20 bottom-3 right-3">
                                <span className="flex items-center gap-1 px-2.5 py-1 text-[10px] sm:text-xs font-medium text-white rounded-full bg-[#0F2747]/70 backdrop-blur-sm">
                                  <Images size={13} className="text-white" />
                                  {((activeIndexes[property._id] || 0) %
                                    allImages.length) + 1}
                                  /{allImages.length}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Property Details */}
                        {/* Property Details - Refined 99acres Style */}
                        <div className="flex flex-col justify-between flex-1 px-4 py-4 text-[#172033] bg-white sm:px-5">
                          {/* Price Section */}
                          <div>
                            <div className="flex items-start justify-between gap-2 mb-0 sm:gap-3">
                              {/* Property Name */}
                              <h3
                                className="flex-1 min-w-0 m-0 text-base font-bold leading-6 text-[#172033] truncate sm:text-lg"
                                title={property.property_name}
                              >
                                {property.property_name || "N/A"}
                              </h3>

                              {/* Furnishing -> PREMIUM pill */}
                              <span
                                className="flex-shrink-0 m-0 text-[11px] font-medium leading-none text-[#1E3A5F] bg-[#1E3A5F]/10 px-2.5 py-1.5 rounded-full sm:text-xs whitespace-nowrap"
                                title={property.furnished_type}
                              >
                                {property.furnished_type || "Un-Furnished"}
                              </span>
                            </div>

                            <p
                              className="mt-1 mb-1 text-sm leading-5 text-[#64748B] line-clamp-2 sm:truncate"
                              title={subtitle}
                            >
                              <FaMapMarkerAlt className="inline-block mr-1 text-[#D61F45] align-[-2px]" />
                              {subtitle}
                            </p>

                            <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                              {/* Left Side */}
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-xl font-extrabold text-[#D61F45] sm:text-2xl">
                                  ₹{" "}
                                  {property.property_category_type === "Rent" ||
                                    property.property_category_type ===
                                    "PG/Co-living"
                                    ? formatPrice(property.rent)
                                    : formatPrice(property.property_price)}
                                </span>
                                {(property.property_category_type === "Rent" ||
                                  property.property_category_type ===
                                  "PG/Co-living") && (
                                    <span className="text-sm text-[#64748B]">
                                      /{property.rent_duration || "Per Month"}
                                    </span>
                                  )}

                                {/* Ready to Move -> PREMIUM solid red pill, same condition, unchanged */}
                                {property.property_category_type?.includes("Buy") &&
                                  property.possession_status === "Ready To Move" && (
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 text-white bg-[#D61F45] rounded-full shadow-sm hover:bg-[#B91C3C] transition-colors cursor-pointer sm:px-4">
                                      <MdApartment className="text-base text-white" />
                                      <span className="text-xs font-semibold whitespace-nowrap">
                                        Get Best Deal
                                      </span>
                                    </div>
                                  )}
                              </div>

                              {/* Right Side */}
                              <div className="text-sm font-medium whitespace-nowrap">
                                {(property.property_category_type === "Rent" ||
                                  property.property_category_type ===
                                  "PG/Co-living") && (
                                    <>
                                      <span className="text-[#64748B]">
                                        Deposit:
                                      </span>
                                      <span className="ml-1 font-semibold text-[#172033]">
                                        ₹{" "}
                                        {property.custom_deposit_amount?.toLocaleString(
                                          "en-IN",
                                        )}
                                      </span>
                                    </>
                                  )}
                                {property.property_category_type?.includes(
                                  "Buy",
                                ) &&
                                  property.possession_status !==
                                  "Ready To Move" &&
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

                            {/* Features Row -> PREMIUM: same fields/logic, restyled colors + dividers */}
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
                                {property.property_category_type?.includes(
                                  "PG",
                                ) ? (
                                  <FaUser className="text-[16px] text-[#1E3A5F] flex-shrink-0" />
                                ) : (
                                  <FaBath className="text-[16px] text-[#1E3A5F] flex-shrink-0" />
                                )}
                                <div className="flex flex-col justify-center min-w-0">
                                  <p className="m-0 text-xs sm:text-[13px] font-semibold leading-4 truncate text-[#172033]">
                                    {property.property_category_type?.includes(
                                      "PG",
                                    )
                                      ? property.available_for
                                      : `${property.bathroom || 0} Baths`}
                                  </p>
                                  <p className="m-0 text-[10px] leading-4 text-[#64748B] truncate">
                                    {property.property_category_type?.includes(
                                      "PG",
                                    )
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

                            {/* Row 5: Posted By | Days | Distance | Share */}
                            <div className="flex items-center justify-between gap-2 pt-1 pb-2 text-[12px] sm:text-[13px] text-[#64748B]">
                              {/* Left */}
                              <div className="flex items-center flex-wrap min-w-0 gap-x-1">
                                {/* Posted By */}
                                <div className="flex items-center min-w-0">
                                  <AiOutlineClockCircle className="mr-1 text-[15px] text-[#64748B] flex-shrink-0" />
                                  <span className="truncate">
                                    Posted by {property.user_type || "Owner"}
                                  </span>
                                </div>
                                {/* Dot */}
                                <span className="mx-1 text-[#CBD5E1] sm:mx-2">
                                  •
                                </span>
                                {/* Days */}
                                <span className="whitespace-nowrap">
                                  {property.days_since_created
                                    ? `${property.days_since_created} days ago`
                                    : "Recently"}
                                </span>
                                {/* Distance */}
                                {distance && (
                                  <>
                                    <span className="mx-1 text-[#CBD5E1] sm:mx-2">
                                      •
                                    </span>
                                    <div className="flex items-center whitespace-nowrap">
                                      <FaMapMarkerAlt className="mr-1 text-[#D61F45]" />
                                      {distance} km from you
                                    </div>
                                  </>
                                )}
                              </div>
                              {/* Share */}
                              <FontAwesomeIcon
                                icon={faShareNodes}
                                className="ml-2 text-[17px] text-[#64748B] transition-colors cursor-pointer hover:text-[#1E3A5F] flex-shrink-0"
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

                            {/* Row 6: Owner Details -> PREMIUM: wrapped in a soft navy-tinted card */}
                            <div className="flex items-center pt-3">
                              <div className="flex items-center w-full gap-3 p-2.5 bg-[#F5F7FA] border border-[#E2E8F0] rounded-xl sm:gap-4">
                                {/* Avatar */}
                                <div className="flex items-center justify-center flex-shrink-0 w-9 h-9 overflow-hidden rounded-full ring-2 ring-white shadow bg-[#0F2747]/10 sm:w-10 sm:h-10">
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
                                          e.target.nextSibling.style.display =
                                            "flex";
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
                                <div className="flex items-center min-w-0">
                                  <span
                                    className="text-sm font-semibold text-[#172033] truncate whitespace-nowrap"
                                    title={property.connect_to_name}
                                  >
                                    {property.connect_to_name || "Owner"}
                                  </span>
                                  <div className="w-px h-4 mx-3 bg-[#E2E8F0] sm:mx-4"></div>
                                  <span className="text-sm text-[#64748B] whitespace-nowrap">
                                    {property.user_type || "Owner"}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Price Section */}
                            {/* <h4 className="h-[52px] overflow-hidden text-lg font-semibold leading-6 line-clamp-2">
                          {property.property_name}
                        </h4>
                        <div className="h-[38px] flex items-center mb-2">
                          <h3 className="flex items-center text-lg font-bold">
                            <FaRupeeSign className="mr-0.5 text-sm" />
                            {property.property_category_type === "Rent"
                              ? formatPrice(property.rent)
                              : formatPrice(property.property_price)}
                            {property.property_category_type === "Rent" &&
                              property.rent_duration && (
                                <span className="ml-1 text-xs font-normal text-gray-500">
                                  /{property.rent_duration}
                                </span>
                              )}
                          </h3>
                        </div> */}
                            {/* BHK and Property Type */}
                            {/* <div className="h-[48px] overflow-hidden mb-2">
                          <p className="text-sm font-semibold text-gray-800">
                            {property.bhk_type} {property.property_type},{" "}
                            {property.bathrooms || "2"} Baths
                          </p>
                        </div> */}
                            {/* Address / Locality */}
                            {/* <div className="h-[30px] flex items-start overflow-hidden">
                          <p className="text-xs text-gray-500 line-clamp-1">
                            In{" "}
                            <span className="font-medium text-gray-700">
                              {property.address_area || property.property_name}
                            </span>
                          </p>
                        </div> */}
                            {/* Divider */}
                            {/* <div className="flex-grow"></div>
                        <div className="mt-auto"></div>
                        <hr className="my-2 border-gray-100" /> */}
                            {/* Footer: Posted by & Share */}
                            {/* <div className="flex items-center justify-between pt-2">
                          <div className="flex flex-col">
                            <span className="text-[11px] text-gray-400 uppercase tracking-wide">
                              Posted by {property.user_type || "Owner"}
                            </span> */}
                            {/* Dynamic days or static time */}
                            {/* <span className="text-[11px] text-gray-400">
                              {property.days_since_created
                                ? `${property.days_since_created} days ago`
                                : "Recently"}
                            </span> */}
                            {/* </div> */}
                            {/* Share Icon */}
                            {/* <div className="flex space-x-2">
                            <FontAwesomeIcon
                              icon={faShareNodes}
                              className="p-1 text-gray-400 transition-colors cursor-pointer hover:text-blue-500"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                // Link trigger na ho isliye
                                openRecommendedShareModal(property._id);
                              }}
                            />
                          </div>
                          .
                        </div> */}
                            {/* <h4>{property.property_name}</h4> */}
                            {/* {distance && (
                          <p className="flex items-center mt-2 text-sm text-gray-500">
                            <FaMapMarkerAlt className="mr-1 text-red-500" />
                            {distance} km from you
                          </p>
                        )} */}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          )}

          {/* Mobile slider nav (arrows moved below the cards on small screens) */}
          <div className="flex items-center justify-center gap-4 pb-4 mt-3 sm:hidden">
            <button
              className="flex items-center justify-center rounded-full w-11 h-11 bg-[#D61F45]/10 transition-all duration-300 hover:bg-[#D61F45]/20 active:scale-95"
              onClick={() => sliderRef.current.slickPrev()}
            >
              <GoArrowLeft className="text-2xl text-[#D61F45]" />
            </button>
            <button
              className="flex items-center justify-center rounded-full w-11 h-11 bg-[#D61F45] shadow-md transition-all duration-300 hover:bg-[#B91C3C] active:scale-95"
              onClick={() => sliderRef.current.slickNext()}
            >
              <GoArrowRight className="text-2xl text-white" />
            </button>
          </div>
        </div>
      </div>

      <div
        id="shareModal"
        className="fixed bottom-0 right-0 z-50 items-center justify-center hidden px-4 bg-black bg-opacity-50"
      >
        <div className="w-full max-w-lg p-4 bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-bold">Share this link</h5>
            <button onClick={closeShareModal}>&times;</button>
          </div>
          <div className="flex flex-col items-stretch mb-4 sm:flex-row sm:items-center">
            <input
              type="text"
              className="flex-grow w-full p-2 border rounded form-control"
              value={currentShareUrl}
              readOnly
            />
            <button
              className="p-2 mt-2 bg-gray-200 rounded sm:mt-0 sm:ml-2"
              onClick={(e) => copyLink(e)}
            >
              Copy Link
            </button>
          </div>
          <div className="flex flex-wrap justify-around gap-2">
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
        }}
      />
    </div>
  );
};

export default ManyMore;