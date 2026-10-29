import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import Slider from "react-slick";
import axios from "axios";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast } from "react-toastify";
import {
  FaRupeeSign,
  FaMapMarkerAlt,
  FaDownload,
  FaStore,
  FaWarehouse,
  FaVideo,
  FaBed,
  FaHeart,
  FaHardHat,
  FaHotel,
  FaArrowRight,
  FaChevronLeft,   // 👈 new
  FaChevronRight,  // 👈 new
  FaRegCalendarCheck, // NEW (image section): calendar icon for the "New Booking" pill
  FaStar,             // NEW (image section): star icon for the "RERA Approved" pill
  FaRegImages,        // NEW (image section): icon for the 1/N image counter
} from "react-icons/fa";
import { BsBuildings } from "react-icons/bs";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { MdOutlineStoreMallDirectory, MdFiberNew } from "react-icons/md";
import Login1 from "../auth/Login1";
import SignUp1 from "../auth/SignUp1";
import PropertyCardSkeleton from "./PropertyCardSkeleton";
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

/* ====================================================================
   ConfigCarousel — dynamically renders one card per available residential
   configuration (BHK for residential, unit type for commercial) — never
   hardcoded, always driven by the `units` array's actual length. Built on
   react-slick so users can swipe/drag horizontally to reveal further
   configs beyond what's visible (e.g. swiping from 1/2/3 BHK to 2/3/4 BHK).
   No visible arrows, no dots — pure swipe. Visible count is responsive:
   3 on desktop, 2 on tablet, 1-2 on mobile depending on available width.
    ==================================================================== */
/* ====================================================================
ONLY CHANGE: inside ConfigCarousel in Spotlights.js
Replace the existing `showNavButtons` line + both <button> blocks with
the code below. Nothing else in the file (slider settings, card UI,
swipe behavior, spacing, styling) changes.
==================================================================== */

const ConfigCarousel = ({
  units,
  isCommercial,
  formatAverageProjectPrice,
  getCommercialIcon,
}) => {
  const innerSliderRef = useRef(null);

  if (!units || units.length === 0) return null;

  const desktopVisible = Math.min(3, units.length);
  const tabletVisible = Math.min(2, units.length);
  const mobileVisible = Math.min(2, units.length);
  const smallMobileVisible = Math.min(1, units.length);

  const showNavButtons = units.length > 1;

  /* Nav buttons should only ever be visible at a given screen width when
     scrolling is actually required there — i.e. when units.length exceeds
     the number of slides visible at that breakpoint (desktop cap 3,
     tablet/mobile cap 2, small mobile ≤380px cap 1). Since
     desktopVisible/tabletVisible/mobileVisible/smallMobileVisible above
     are all Math.min(N, units.length), scrolling is needed at a given
     breakpoint exactly when units.length still exceeds that cap:
       - units.length >= 4  -> overflows everywhere -> always show
       - units.length === 3 -> fits at desktop (cap 3), overflows at
         tablet/mobile/small-mobile (cap 2/2/1) -> show only <=1024px
       - units.length === 2 -> fits at desktop/tablet/mobile (cap 3/2/2),
         overflows only at small mobile (cap 1) -> show only <=380px
       - units.length <= 1  -> never overflows -> showNavButtons is false,
         so this class never even gets applied
     Using "hidden" as the base class plus a max-width variant means the
     buttons are removed from layout/tab order until that width is
     actually reached — swipe still works regardless of button visibility. */
  const navVisibilityClass =
    units.length >= 4
      ? "flex"
      : units.length === 3
        ? "hidden max-[1024px]:flex"
        : "hidden max-[380px]:flex";

  const navButtonClass = `flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,0.18)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.28)] items-center justify-center transition-shadow duration-200 ${navVisibilityClass}`;

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
      { breakpoint: 640, settings: { slidesToShow: mobileVisible } },
      { breakpoint: 380, settings: { slidesToShow: smallMobileVisible } },
    ],
  };

  return (
    <div className="w-full h-full flex items-center gap-1.5">
      {/* ==================== LEFT NAV BUTTON (outer left edge) ==================== */}
      {showNavButtons && (
        <button
          type="button"
          aria-label="Previous configuration"
          onClick={(e) => {
            e.stopPropagation();
            innerSliderRef.current?.slickPrev();
          }}
          className={navButtonClass}
        >
          <FaChevronLeft className="text-[#D61F45] text-[10px] sm:text-xs" />
        </button>
      )}

      {/* Slider track sits between the two buttons via flex — cards can
          never be covered by the buttons since they're separate flex items,
          not absolutely positioned on top of the track. */}
      <div className="flex-1 min-w-0 h-full flex items-center [&_.slick-list]:overflow-hidden [&_.slick-track]:flex [&_.slick-track]:items-stretch [&_.slick-slide]:h-auto [&_.slick-slide>div]:h-full">
        <Slider ref={innerSliderRef} {...sliderSettings} className="w-full">
          {units.map((unit, i) => {
            const Icon = isCommercial ? getCommercialIcon(unit.type) : FaBed;
            return (
              <div key={i} className="h-full px-1">
                <div className="h-full flex flex-col items-center justify-center border border-gray-200 rounded-lg px-2 py-2.5 text-center bg-white">
                  <Icon className="text-sm mb-1 text-gray-700" />
                  <h3 className="font-semibold text-[10.5px] sm:text-[11px] text-gray-900 truncate leading-tight">
                    {unit.type}
                  </h3>
                  {unit.price ? (
                    <h2 className="text-[#D61F45] font-bold text-[15px] sm:text-base lg:text-[18px] mt-1.5 text-center truncate leading-tight">
                      {formatAverageProjectPrice(unit.price)}
                    </h2>
                  ) : (
                    <h2 className="text-gray-300 font-bold text-[15px] sm:text-base lg:text-[18px] mt-1.5 text-center">
                      &nbsp;
                    </h2>
                  )}
                </div>
              </div>
            );
          })}
        </Slider>
      </div>

      {/* ==================== RIGHT NAV BUTTON (outer right edge) ==================== */}
      {showNavButtons && (
        <button
          type="button"
          aria-label="Next configuration"
          onClick={(e) => {
            e.stopPropagation();
            innerSliderRef.current?.slickNext();
          }}
          className={navButtonClass}
        >
          <FaChevronRight className="text-[#D61F45] text-[10px] sm:text-xs" />
        </button>
      )}
    </div>
  );
};
const Spotlights = ({
  data,
  openSpotlightShareModal,
  closeShareModal,
  copyLink,
  currentShareUrl,
  fetchHomeData,
}) => {
  const sliderRef = useRef(null);
  const history = useHistory();
  const [projectList, setProjectList] = useState([]);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  let userLocation = null;
  try {
    userLocation = JSON.parse(sessionStorage.getItem("userLocation"));
  } catch (e) {
    userLocation = null;
  }

  useEffect(() => {
    if (data && data.status === 1 && Array.isArray(data.data)) {
      setProjectList(data.data);
    } else {
      setProjectList([]);
    }
  }, [data]);

  const handleClick = () => {
    history.push("/ProjectList");
  };

  const handleProjectClick = (projectId) => {
    history.push(`/projectdetail/${encodeURIComponent(projectId)}`);
  };

  // Outer project carousel — 4 cards on desktop/laptop, 2 on tablet, 1 on mobile.
  // Cards fill the slide width (no fixed max-width on the card itself), which is
  // what keeps the gap between cards tight and consistent, matching the
  // Featured Properties section.
  const settings = {
    infinite: true,
    lazyLoad: "ondemand",
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
    // UI ONLY: `dots` flipped false -> true and a `dotsClass` added so the
    // carousel shows the brand pagination dots from the reference design.
    // Every other key (infinite, lazyLoad, speed, slidesToShow, slidesToScroll,
    // autoplay, autoplaySpeed, arrows, adaptiveHeight and all five responsive
    // breakpoints) is exactly as it was.
    dots: true,
    dotsClass: "slick-dots spotlight-dots",
    adaptiveHeight: false,

    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  const formatPrice = (price) => {
    if (!price) return "";

    price = Number(price);

    if (price >= 10000000) {
      return `${(price / 10000000).toFixed(2).replace(/\.?0+$/, "")} Cr`;
    } else if (price >= 100000) {
      return `${(price / 100000).toFixed(2).replace(/\.?0+$/, "")} L`;
    } else if (price >= 1000) {
      return `${(price / 1000).toFixed(2).replace(/\.?0+$/, "")} K`;
    } else {
      return price.toString();
    }
  };

  const getProjectDistance = (project) => {
    const projLat =
      project.latitude ??
      project.lat ??
      project.Latitude ??
      project.project_latitude ??
      project.location?.latitude ??
      project.location?.lat;

    const projLng =
      project.longitude ??
      project.lng ??
      project.Longitude ??
      project.project_longitude ??
      project.location?.longitude ??
      project.location?.lng;

    if (
      userLocation &&
      userLocation.latitude &&
      userLocation.longitude &&
      projLat &&
      projLng &&
      !isNaN(Number(projLat)) &&
      !isNaN(Number(projLng)) &&
      Number(projLat) !== 0 &&
      Number(projLng) !== 0
    ) {
      const dist = calculateDistance(
        Number(userLocation.latitude),
        Number(userLocation.longitude),
        Number(projLat),
        Number(projLng),
      );
      return dist.toFixed(1);
    }
    return null;
  };

  const formatAverageProjectPrice = (price) => {
    if (!price) return "";

    // Price Range
    if (typeof price === "string" && price.includes("-")) {
      const parts = price.split("-").map((p) => p.trim());
      return (
        <>
          {parts.map((p, idx) => (
            <span key={idx} className="inline-flex items-center">
              <FaRupeeSign className="inline-block mr-1" />
              {formatPrice(p)}
              {idx === 0 && " - "}
            </span>
          ))}
        </>
      );
    }

    return (
      <span className="inline-flex items-center">
        <FaRupeeSign className="inline-block mr-1" />
        {formatPrice(Number(price))}
      </span>
    );
  };

  const addToFavoritesRecommendedProperty = async (projectId) => {
    if (!sessionStorage.getItem("accessToken")) {
      toast.error("Please login to add to favorites");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("user_id", sessionStorage.getItem("accessToken"));
      formData.append("project_id", projectId);

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/cust_api/add_favorite_project`,
        formData,
      );

      const favId = res.data?.favorite_id || projectId;
      setProjectList((prev) =>
        prev.map((proj) =>
          proj._id === projectId
            ? { ...proj, is_favorite: true, favorite_id: favId }
            : proj,
        ),
      );
      fetchHomeData();
    } catch (error) {
      toast.error("Failed to save the Project. Please try again.");
    }
  };

  const removeFromFavoritesRecommendedProperty = async (
    favoriteId,
    projectId,
  ) => {
    try {
      const formData = new FormData();
      formData.append("favorite_id", favoriteId);

      await axios.delete(
        `${process.env.REACT_APP_API_URL}/cust_api/remove_favorite_project`,
        {
          data: formData,
        },
      );

      setProjectList((prev) =>
        prev.map((proj) =>
          proj._id === projectId
            ? { ...proj, is_favorite: false, favorite_id: null }
            : proj,
        ),
      );
      fetchHomeData();
    } catch (error) {
      toast.error("Failed to remove the Project. Please try again.");
    }
  };

  // Maps a commercial unit "type" string to its React Icon, per spec
  const getCommercialIcon = (type = "") => {
    if (/office|co-?working/i.test(type)) return HiOutlineOfficeBuilding;
    if (/retail/i.test(type)) return MdOutlineStoreMallDirectory;
    if (/hotel/i.test(type)) return FaHotel;
    if (/shop/i.test(type)) return FaStore;
    if (/warehouse/i.test(type)) return FaWarehouse;
    return BsBuildings;
  };

  return (
    <div className="px-3 py-4 bg-white sm:px-4 md:px-6 lg:px-10">

      {/* ==================== NEW (UI ONLY): animations + brand dot styling ====================
          Purely presentational. No existing rule, handler or API call is affected.
          Class names are `sp-` prefixed so they can never clash with the styles in
          the Featured Properties section if both render on the same page. */}
      <style>{`
        @keyframes spFadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .sp-fade-up { animation: spFadeUp .55s cubic-bezier(.22,.61,.36,1) both; }
        .sp-delay-1 { animation-delay: .06s; }
        .sp-delay-2 { animation-delay: .12s; }
        .sp-delay-3 { animation-delay: .18s; }

        @keyframes spSweep { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .sp-sweep { transform-origin: left center; animation: spSweep .7s .25s ease-out both; }

        /* Carousel dots -> brand pink / red */
        .spotlight-dots { bottom: -38px; }
        .spotlight-dots li { width: 14px; height: 14px; margin: 0 3px; }
        .spotlight-dots li button { width: 14px; height: 14px; padding: 0; }
        .spotlight-dots li button:before {
          content: "";
          width: 8px; height: 8px; top: 3px; left: 3px;
          border-radius: 9999px;
          background: #F7C3CE;
          opacity: 1;
          transition: background .25s ease, width .25s ease, height .25s ease, top .25s ease, left .25s ease;
        }
        .spotlight-dots li.slick-active button:before {
          background: #D61F45;
          width: 10px; height: 10px; top: 2px; left: 2px;
        }
      `}</style>

      {/* ==================== NEW (UI ONLY): soft pink section panel ====================
          Wraps the header + carousel exactly as in the reference. Nothing inside
          it was reordered — the header, both Sliders and every card are unchanged
          apart from styling. pb-16 leaves room for the new dots. */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#FDF5F7] to-[#FBEEF1] px-3 pt-6 pb-16 sm:px-4 lg:px-6">

        {/* NEW: faint skyline watermark behind the header (decorative) */}
        <svg
          aria-hidden="true"
          className="absolute top-0 right-0 pointer-events-none select-none w-[62%] h-[190px] sm:h-[210px]"
          viewBox="0 0 900 210"
          preserveAspectRatio="none"
        >
          <g fill="#D61F45" opacity="0.08">
            <rect x="20" y="120" width="34" height="90" />
            <rect x="62" y="86" width="26" height="124" />
            <rect x="96" y="134" width="40" height="76" />
            <rect x="144" y="70" width="24" height="140" />
            <rect x="176" y="110" width="36" height="100" />
            <rect x="220" y="142" width="30" height="68" />
            <rect x="258" y="92" width="32" height="118" />
            <rect x="298" y="124" width="42" height="86" />
            <rect x="348" y="78" width="26" height="132" />
            <rect x="382" y="130" width="36" height="80" />
            <rect x="426" y="102" width="28" height="108" />
            <rect x="462" y="146" width="44" height="64" />
            <rect x="514" y="114" width="30" height="96" />
            <rect x="552" y="82" width="24" height="128" />
            <rect x="584" y="138" width="40" height="72" />
            <rect x="632" y="106" width="28" height="104" />
            <rect x="668" y="128" width="36" height="82" />
            <rect x="712" y="74" width="22" height="136" />
            <rect x="742" y="118" width="42" height="92" />
            <rect x="792" y="150" width="30" height="60" />
            <rect x="830" y="98" width="34" height="112" />
          </g>
          {/* birds */}
          <g stroke="#D61F45" strokeWidth="2" fill="none" opacity="0.16">
            <path d="M700 40 q7 -7 14 0 q7 -7 14 0" />
            <path d="M745 24 q5 -5 10 0 q5 -5 10 0" />
            <path d="M770 52 q6 -6 12 0 q6 -6 12 0" />
          </g>
        </svg>

        {/* z-10 keeps the real content above the watermark */}
        <div className="relative z-10">

          <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col text-center sm:text-left">

              {/* NEW: eyebrow with building icon + trailing rule */}
              <div className="flex items-center justify-center gap-2 mb-2 sm:justify-start sp-fade-up">
                <BsBuildings className="text-[#D61F45] text-[15px] flex-shrink-0" />
                <span className="text-[11px] sm:text-xs font-bold tracking-[0.18em] text-[#D61F45] uppercase whitespace-nowrap">
                  Builder Projects
                </span>
                <span className="hidden sm:block h-px w-12 bg-[#D61F45]/35" />
              </div>

              {/* UI: two-tone headline (navy + brand red).
                  The old "Builders Projects" h2 is replaced by this one. */}
              <h2 className="text-2xl font-bold tracking-tight text-[#172033] sm:text-3xl md:text-4xl sp-fade-up sp-delay-1">
                Trusted Builder Projects{" "}
                <span className="text-[#D61F45]">for a Better Tomorrow</span>
              </h2>

              <p className="mt-2 text-sm text-[#64748B] sm:text-base sp-fade-up sp-delay-2">
                Explore premium builder projects with modern amenities and the best
                investment opportunities.
              </p>
            </div>

            <div className="flex items-center justify-between w-full gap-2 md:w-auto md:gap-3 sp-fade-up sp-delay-3">

              {/* NEW: handwritten accent (decorative only) */}
              <div
                className="flex-shrink-0 hidden leading-tight text-right xl:block text-[#D61F45] mr-1"
                style={{
                  fontFamily:
                    "'Segoe Script','Bradley Hand','Brush Script MT',cursive",
                }}
              >
                <span className="block text-lg">Premium</span>
                <span className="block text-lg">Builder Projects</span>
                <span className="block w-28 h-px mt-1 ml-auto bg-[#D61F45]/60 sp-sweep" />
              </div>

              {/* UI: outlined brand pill + arrow. onClick={handleClick} unchanged. */}
              <button
                className="group flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#D61F45] bg-white border border-[#D61F45] rounded-full sm:text-sm md:text-base whitespace-nowrap transition-all duration-300 hover:bg-[#D61F45] hover:text-white hover:shadow-lg hover:shadow-[#D61F45]/25 sm:px-6"
                onClick={handleClick}
              >
                View All Projects
                <FaArrowRight
                  size={11}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              {/* UI: pale pink circle. slickPrev() unchanged. */}
              <button
                className="flex items-center justify-center flex-shrink-0 rounded-full w-11 h-11 bg-[#D61F45]/10 transition-all duration-300 hover:bg-[#D61F45]/20 hover:scale-105 active:scale-95"
                onClick={() => sliderRef.current.slickPrev()}
              >
                <GoArrowLeft className="text-2xl text-[#D61F45]" />
              </button>

              {/* UI: solid brand circle. slickNext() unchanged. */}
              <button
                className="flex items-center justify-center flex-shrink-0 rounded-full w-11 h-11 bg-[#D61F45] shadow-md transition-all duration-300 hover:bg-[#B91C3C] hover:shadow-lg hover:scale-105 active:scale-95"
                onClick={() => sliderRef.current.slickNext()}
              >
                <GoArrowRight className="text-2xl text-white" />
              </button>
            </div>
          </div>

          {/* slick-track uses flexbox here so every slide (and therefore every
          card wrapper) stretches to the row's tallest item automatically.
          -mx-2 / px-2 on the slide gives a tight, consistent 16px gap between
          cards (8px on each side) instead of the old, uneven wide gap. */}
          {data?.status === 0 ? (
            <Slider
              ref={sliderRef}
              {...settings}
              className="mx-auto -mx-2 [&_.slick-track]:flex [&_.slick-track]:items-stretch [&_.slick-slide]:h-auto [&_.slick-slide>div]:h-full"
            >
              {[1, 2, 3, 4].map((item) => (
                <div key={item}>
                  <PropertyCardSkeleton />
                </div>
              ))}
            </Slider>
          ) : (
            <Slider
              ref={sliderRef}
              {...settings}
              className="mx-auto -mx-2 [&_.slick-track]:flex [&_.slick-track]:items-stretch [&_.slick-slide]:h-auto [&_.slick-slide>div]:h-full"
            >
              {projectList.map((project, index) => {
                const isCommercial =
                  project.property_category === "Commercial" ||
                  (project.commercial_units && project.commercial_units.length > 0);

                const commercialUnits =
                  project.commercial_units && project.commercial_units.length > 0
                    ? project.commercial_units
                    : [];

                // Each card shows its own price exactly as provided by the API:
                // when `residential_units` includes a per-BHK price, that price is
                // used as-is (no two cards share a value unless the data does).
                // Only when the API sends just a comma list of BHK types with no
                // per-unit pricing do all cards fall back to the project's average
                // price — this is a data-availability fallback, not fabricated UI.
                // Resolves the project's overall/starting price from whichever
                // field name the backend actually sends — some responses use
                // average_project_price, others use starting_price / min_price /
                // avg_price. Tries each in order and returns the first real value.

                /* ====================================================================
                   FIX: Replace the price-resolution block inside the `visibleProjects.map(...)`
                   in ProjectList.js with this. The bug was that ProjectList.js read units
                   from `project.residential_units` (a field the API doesn't send) instead
                   of `project.project_properties` (the field Spotlights.js actually uses),
                   and it was missing the computed min–max range fallback for price.
                   ==================================================================== */

                // Each card shows its own price exactly as provided by the API:
                // when `project_properties` includes a per-BHK price, that price is
                // used as-is. Only when the API sends just a comma list of BHK
                // types with no per-unit pricing do all cards fall back to the
                // project's average price — a data-availability fallback, not
                // fabricated UI.

                // Fallback: if no top-level price field exists, compute a min–max
                // range from project_properties prices (same as Spotlights.js).
                const propertyPrices = (project.project_properties || [])
                  .map((p) => Number(p.price))
                  .filter((p) => !isNaN(p) && p > 0);

                const computedRangePrice =
                  propertyPrices.length === 0
                    ? null
                    : propertyPrices.length === 1
                      ? propertyPrices[0]
                      : `${Math.min(...propertyPrices)} - ${Math.max(...propertyPrices)}`;

                // Resolves the project's overall/starting price from whichever field
                // name the backend actually sends.
                const resolvedProjectPrice =
                  project.average_project_price ||
                  project.starting_price ||
                  project.min_price ||
                  project.avg_price ||
                  project.price ||
                  computedRangePrice ||
                  null;

                // 👇 THE ACTUAL FIX: use `project_properties`, not `residential_units`
                const residentialUnits =
                  project.project_properties && project.project_properties.length > 0
                    ? project.project_properties.map((u) => ({
                      ...u,
                      type: u.bhk_type || u.project_type,
                      price:
                        Number(
                          u.price ||
                          u.property_price ||
                          u.unit_price ||
                          u.configuration_price ||
                          u.amount ||
                          resolvedProjectPrice
                        ),
                    }))
                    : project.congfigurations
                      ? project.congfigurations.split(",").map((c) => ({
                        type: c.trim().includes("BHK")
                          ? c.trim()
                          : `${c.trim()} BHK`,
                        price: resolvedProjectPrice,
                      }))
                      : [];

                /* ====================================================================
                   Also update the ConfigCarousel call further down — it currently passes
                   `isCommercial ? commercialUnits : residentialUnits`, which is still
                   correct, but now residentialUnits will actually carry real prices.
                   No change needed there once the block above is swapped in.
                   ==================================================================== */
                const addressArea = project.address_area?.trim();
                const cityName = project.city_name?.trim();
                let locationText = "";
                if (addressArea && cityName) {
                  locationText = addressArea
                    .toLowerCase()
                    .includes(cityName.toLowerCase())
                    ? addressArea
                    : `${addressArea}, ${cityName}`;
                } else {
                  locationText = addressArea || cityName || "";
                }

                const distanceKm = getProjectDistance(project);

                /* NEW (image section only): gallery list behind the "1/8" counter.
                   Reads whichever gallery field the API actually sends and falls back
                   to just the cover image — in which case the counter stays hidden.
                   Point this at your real field name if it differs. */
                const projectImages = [
                  ...new Set(
                    [
                      project.cover_image,
                      ...(project.project_images ||
                        project.images ||
                        project.gallery ||
                        []
                      ).map((img) =>
                        typeof img === "string" ? img : img?.image || img?.url,
                      ),
                    ].filter(Boolean),
                  ),
                ];

                // Subtitle now carries the location inline, e.g.
                // "1,2,3,4 BHK Apartments in Baner, Pune"
                const subtitle = isCommercial
                  ? (() => {
                    const unitSummary =
                      [
                        ...new Set(
                          commercialUnits.map((u) => u.type).filter(Boolean),
                        ),
                      ].join(", ") ||
                      project.project_type ||
                      "Commercial Space";
                    return locationText
                      ? `${unitSummary} in ${locationText}`
                      : unitSummary;
                  })()
                  : project.congfigurations
                    ? (() => {
                      const bhkSummary = project.congfigurations
                        .split(",")
                        .map((c) => c.trim().replace(/\s*BHK/i, ""))
                        .join(",");
                      return locationText
                        ? `${bhkSummary} BHK Apartments in ${locationText}`
                        : `${bhkSummary} BHK Apartments`;
                    })()
                    : locationText
                      ? `Apartments in ${locationText}`
                      : "Apartments";

                return (
                  <div key={index} className="h-full px-2">
                    {/* ==================== CARD — equal height across the row, flex column ====================
                  No fixed pixel width / max-width / mx-auto on the card: it simply fills
                  the slide's width (driven by slidesToShow), which is what removes the
                  extra whitespace between cards. min-h keeps every card tall enough that
                  the builder row and both buttons are never clipped; slick's flex-stretch
                  (added on the Slider above) then equalizes every card in the row to the
                  tallest one. */}
                    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_6px_24px_rgba(17,24,39,0.08)] hover:shadow-[0_18px_48px_rgba(17,24,39,0.16)] transition-all duration-300 flex flex-col h-full min-h-[440px] sm:min-h-[460px] lg:min-h-[480px] w-full">
                      {/* ==================== IMAGE SECTION (fixed height) ==================== */}
                      <div className="relative overflow-hidden flex-shrink-0 h-[150px] sm:h-[165px] lg:h-[180px]">
                        <img
                          src={project.cover_image}
                          alt={project.project_name || ""}
                          className="w-full h-full object-cover cursor-pointer group-hover:scale-105 transition-transform duration-500 ease-out"
                          onClick={() => handleProjectClick(project._id)}
                        />

                        {/* NEW: gradient overlay so badge text stays legible over any photo */}
                        <div className="absolute inset-0 z-[5] pointer-events-none bg-gradient-to-b from-black/50 via-black/0 to-black/40" />

                        {/* Top Left badges — "New Booking" + "RERA Approved".
                        max-w keeps this row clear of the heart button on the right. */}
                        <div className="absolute top-2 left-2 z-20 flex flex-wrap items-center gap-1.5 max-w-[calc(100%-3.5rem)]">
                          {/* New Booking — same always-on behaviour as before, calendar icon per the design */}
                          <div className="bg-gradient-to-r from-[#D61F45] to-[#B91C3C] text-white pl-2 pr-2.5 py-1 rounded-full flex items-center gap-1 text-[9px] font-semibold shadow-[0_2px_10px_rgba(214,31,69,0.4)]">
                            <FaRegCalendarCheck size={9} />
                            <span>New Booking</span>
                          </div>

                          {/* RERA -> gold pill with star icon, per the design.
                          NOTE: this is still rendered unconditionally, exactly as in your
                          original code. If the API ever sends a RERA flag, wrap this in it. */}
                          <div className="bg-gradient-to-r from-[#F5B800] to-[#D4A72C] text-[#172033] px-2.5 py-1 rounded-full flex items-center gap-1 text-[9px] font-semibold shadow-[0_2px_10px_rgba(212,167,44,0.45)]">
                            <FaStar size={9} className="text-[#172033]" />
                            <span>RERA Approved</span>
                          </div>
                        </div>

                        {/* Wishlist Heart - Top Right */}
                        <button
                          className="absolute top-2 right-2 z-20 w-7 h-7 rounded-full bg-black/60 backdrop-blur flex items-center justify-center hover:scale-110 transition-transform duration-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!sessionStorage.getItem("accessToken")) {
                              setIsLoginModalOpen(true);
                              return;
                            }
                            if (project.is_favorite) {
                              removeFromFavoritesRecommendedProperty(
                                project.favorite_id,
                                project._id,
                              );
                            } else {
                              addToFavoritesRecommendedProperty(project._id);
                            }
                          }}
                        >
                          <FaHeart
                            size={11}
                            className={
                              project.is_favorite ? "text-[#D61F45]" : "text-white"
                            }
                          />
                        </button>

                        {/* NEW: brand tagline panel on the right of the image
                        (decorative — pointer-events-none so the image click still opens the project) */}
                        <div className="absolute z-10 hidden sm:block right-0 top-1/2 -translate-y-1/2 pointer-events-none bg-[#0F2747]/55 backdrop-blur-[2px] rounded-l-md px-3 py-2">
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
                        </div>

                        {/* BOTTOM-LEFT ROW — Property Type ribbon + Virtual Tour.
                        Virtual Tour moved down from the top-right so it can never
                        collide with the badges above; link + handler unchanged. */}
                        <div className="absolute bottom-2 left-2 z-20 flex flex-wrap items-center gap-1.5 max-w-[calc(100%-4.5rem)]">
                          {/* Property Type Ribbon */}
                          {project.property_for && (
                            <div className="bg-[#D61F45] text-white px-2.5 py-1 rounded-full text-[9px] font-semibold uppercase tracking-wide shadow-md">
                              {project.property_for}
                            </div>
                          )}

                          {/* Virtual Tour - Black Glassmorphism */}
                          {project.virtual_tour && (
                            <a
                              href={
                                typeof project.virtual_tour === "string"
                                  ? project.virtual_tour
                                  : undefined
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="bg-black/40 backdrop-blur-md border border-white/20 text-white px-2 py-1 rounded-full flex items-center gap-1 text-[9px] font-medium"
                            >
                              <FaVideo size={9} />
                              <span className="hidden sm:inline">Virtual Tour</span>
                            </a>
                          )}
                        </div>

                        {/* NEW: image counter (1/8 style), shown only when the project
                        actually has more than one photo */}
                        {projectImages.length > 1 && (
                          <div className="absolute bottom-2 right-2 z-20">
                            <span className="flex items-center gap-1 px-2.5 py-1 text-[9px] sm:text-[10px] font-medium text-white rounded-full bg-black/55 backdrop-blur-md">
                              <FaRegImages size={10} className="text-white" />
                              1/{projectImages.length}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* ==================== CARD BODY (fills remaining height) ==================== */}
                      <div
                        className="cursor-pointer flex flex-col flex-1 min-h-0"
                        onClick={() => handleProjectClick(project._id)}
                      >
                        {/* Project Name + Subtitle (BHK + location combined) */}
                        <div className="px-3.5 pt-3 flex-shrink-0">
                          <h2 className="text-xl sm:text-[22px] lg:text-2xl leading-tight font-bold text-[#111827] line-clamp-2">
                            {project.project_name || "No Project Name Available"}
                          </h2>
                          <p className="mt-1 text-gray-500 text-[11px] sm:text-xs lg:text-sm line-clamp-2">
                            {subtitle}
                          </p>
                        </div>

                        {/* Commercial Property label — only for commercial cards, sits
                      right above the configuration section */}
                        {isCommercial && (
                          <div className="px-3.5 mt-2 flex-shrink-0 flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-gray-700">
                            <HiOutlineOfficeBuilding className="text-[#D61F45]" size={13} />
                            <span>Commercial Property</span>
                          </div>
                        )}

                        {/* ==================== CONFIGURATION SECTION (fixed height, identical for both types) ====================
                      Three config cards visible at a time (BHK for residential, unit
                      type for commercial). No visible arrows/dots — swipe to reveal more. */}
                        <div
                          className={`px-3.5 flex-shrink-0 h-[74px] flex items-center ${isCommercial ? "mt-2" : "mt-2.5"
                            }`}
                        >
                          <ConfigCarousel
                            units={residentialUnits}
                            isCommercial={isCommercial}
                            formatAverageProjectPrice={formatAverageProjectPrice}
                            getCommercialIcon={getCommercialIcon}
                          />
                        </div>

                        {/* Spacer pushes builder + buttons to the bottom of the card (margin-top:auto) */}
                        <div className="mt-auto flex-shrink-0">
                          {/* ==================== BUILDER SECTION (fixed height) ====================
                        Builder name stays on the left; distance-from-you now replaces
                        the plain location line and sits on the right, vertically
                        centered with the builder block. flex-nowrap + truncation keeps
                        both sides from wrapping or clipping each other. */}
                          {/* ==================== BUILDER SECTION ====================
                        Icon + "Builder" label sit on their own line; the
                        Builder Name and the distance-from-you sit together on
                        the next line, aligned on the same baseline.

                        SPACING FIX: bottom padding reduced from `pb-3.5 sm:pb-4`
                        to `pb-2`. Together with the buttons wrapper now using
                        `pt-1` (was `py-3` -> 12px top padding), the gap between the
                        builder row and the Brochure / View Details buttons drops
                        from ~26-28px to ~12px. Top padding (`pt-3.5 sm:pt-4`) is
                        untouched so the divider above still has breathing room. */}
                          <div className="mx-3.5 pt-3.5 sm:pt-4 pb-2 border-t border-gray-100 flex items-center gap-3">
                            {/* UI ONLY: avatar fallback recoloured off the stray
                            yellow and onto the brand palette. Image logic unchanged. */}
                            <div className="w-7 h-7 rounded-full bg-[#FDE8EC] ring-1 ring-white shadow-sm flex items-center justify-center flex-shrink-0 overflow-hidden self-center">
                              {project.property_owner_image &&
                                !project.property_owner_image.includes(
                                  "default_profile",
                                ) ? (
                                <img
                                  src={`${process.env.REACT_APP_API_URL}/media/${project.property_owner_image}`}
                                  alt={project.connect_to_name || "Builder"}
                                  className="object-cover w-full h-full"
                                />
                              ) : (
                                <FaHardHat className="text-xs text-[#D61F45]" />
                              )}
                            </div>

                            <div className="min-w-0 flex-1 flex items-center justify-between gap-2">
                              <div className="min-w-0 flex flex-col justify-center">
                                <p className="text-xs text-gray-500 leading-none mb-0">
                                  Builder
                                </p>
                                <h3 className="text-base font-semibold leading-tight text-[#111827] mt-0.5 truncate">
                                  {project.connect_to_name || "Builder"}
                                </h3>
                              </div>

                              {distanceKm && (
                                <div className="flex items-center gap-1 flex-shrink-0">
                                  <FaMapMarkerAlt
                                    className="text-[#D61F45] flex-shrink-0"
                                    size={12}
                                  />
                                  <span className="text-gray-500 text-sm whitespace-nowrap">
                                    {distanceKm} km from you
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          {/* ==================== BOTTOM BUTTONS (fixed height, always pinned to bottom) ====================
                        grid-cols-2 keeps Brochure and View Details the same width and height
                        so they never overlap or get hidden.

                        SPACING FIX: wrapper padding changed from `py-3` to `pt-1 pb-3`.
                        Top padding shrinks 12px -> 4px; bottom padding stays 12px so the
                        buttons keep the same distance from the card's bottom edge. */}
                          <div className="grid grid-cols-2 gap-2 px-3.5 pt-1 pb-3">
                            <button
                              className="border-2 border-[#D61F45] text-[#D61F45] rounded-lg h-9 text-[11px] sm:text-xs font-semibold flex justify-center items-center gap-1.5 hover:bg-[#D61F45]/5 transition-colors duration-200"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (project.brochure) {
                                  window.open(
                                    project.brochure,
                                    "_blank",
                                    "noopener,noreferrer",
                                  );
                                }
                              }}
                            >
                              <FaDownload size={11} />
                              Brochure
                            </button>
                            <button
                              className="bg-[#D61F45] rounded-lg text-white text-[11px] sm:text-xs font-semibold flex justify-center items-center gap-1.5 h-9 hover:bg-[#B91C3C] hover:shadow-lg transition-all duration-200"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleProjectClick(project._id);
                              }}
                            >
                              View Details
                              <FaArrowRight size={11} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          )}

        </div>{/* /relative z-10 */}
      </div>{/* /NEW pink section panel */}

      <div
        id="shareModal"
        className="fixed bottom-0 right-0 items-center justify-center bg-black bg-opacity-50 z-50 hidden"
      >
        <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-lg">
          <div className="flex justify-between items-center mb-4">
            <h5 className="text-lg font-bold">Share this link</h5>
            <button onClick={closeShareModal}>&times;</button>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="text"
              className="form-control border p-2 rounded flex-grow"
              value={currentShareUrl}
              readOnly
            />
            <button
              className="ml-2 p-2 bg-gray-200 rounded"
              onClick={(e) => copyLink(e)}
            >
              Copy Link
            </button>
          </div>
          <div className="flex justify-around flex-wrap gap-2">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(currentShareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-success"
            >
              WhatsApp
            </a>

            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentShareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Facebook
            </a>

            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-danger"
            >
              Instagram
            </a>

            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentShareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-info"
            >
              Twitter
            </a>

            <a
              href={`mailto:?subject=Check out this page&body=${encodeURIComponent(currentShareUrl)}`}
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

export default Spotlights;