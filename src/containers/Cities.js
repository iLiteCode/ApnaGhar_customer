import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useHistory } from "react-router-dom";
import Slider from "react-slick";
// NEW: icons for the redesigned city cards / header / nav
import {
  FaMapMarkerAlt,
  FaArrowRight,
  FaCrown,
  FaStar,
  FaHeart,
  FaChartLine,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { BsBuildings } from "react-icons/bs";

const Cities = React.memo(({ data }) => {
  const [citiesData, setCitiesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  // NEW: ref for the header prev/next buttons
  const sliderRef = useRef(null);

  // useEffect(() => {
  //   if (Array.isArray(data.data) && data.data.length > 0) {
  //     setCitiesData(data.data);
  //   } else {
  //     setCitiesData([{ city_name: "Default City", property_count: 0 }]);
  //   }
  // }, [data]);


  useEffect(() => {
    if (Array.isArray(data.data) && data.data.length > 0) {
      setCitiesData(data.data);
      setLoading(false);
    } else {
      setCitiesData([]);
      setLoading(true);
    }
  }, [data]);

  const cities = useMemo(() => [
    { name: "Mumbai", imageUrl: "/image/mumbai.jpg", properties: "0" },
    { name: "Delhi", imageUrl: "/image/delhi.jpg", properties: "0" },
    { name: "Bengaluru", imageUrl: "/image/banglore.jpg", properties: "0" },
    // {
    //   name: "Bengaluru",
    //   apiName: "Bangalore",
    //   imageUrl: "/image/banglore.jpg",
    //   properties: "0",
    // },
    { name: "Chennai", imageUrl: "/image/chennai.jpg", properties: "0" },
    { name: "Hyderabad", imageUrl: "/image/hyderabad.jpg", properties: "0" },
    { name: "Kolkata", imageUrl: "/image/kolkatta.jpg", properties: "0" },
    { name: "Pune", imageUrl: "/image/pune.jpg", properties: "0" },
    { name: "Ahmedabad", imageUrl: "/image/ahemdabad.jpg", properties: "0" },
  ], []);

  const updatedCities = useMemo(() => {
    return cities
      .map((city) => {
        const cityData = citiesData.find(
          (apiCity) => apiCity.city_name === city.name
        );
        return {
          ...city,
          propertyCount: cityData ? cityData.property_count : 0, // keep raw number
          properties: cityData ? `${cityData.property_count}+` : city.properties,
        };
      })
      .sort((a, b) => b.propertyCount - a.propertyCount); // sort descending
  }, [cities, citiesData]);

  /* ====================================================================
     NEW: rank badges ("Popular" / "Trending" / "Hot" / "Loved").
     There is no badge field in the API, so these are NOT hardcoded per
     city — they are derived from the ranking `updatedCities` already
     produces (descending property_count). Only cities that actually
     have properties get a badge; everything below the top four gets
     none, exactly as in the design.
  ==================================================================== */
  const RANK_BADGES = useMemo(
    () => [
      { label: "Popular", Icon: FaCrown },
      { label: "Trending", Icon: FaStar },
      { label: "Hot", Icon: FaChartLine },
      { label: "Loved", Icon: FaHeart },
    ],
    []
  );

  const getRankBadge = useCallback(
    (city, index) => {
      if (loading) return null;
      if (!city.propertyCount || city.propertyCount <= 0) return null;
      return RANK_BADGES[index] || null;
    },
    [loading, RANK_BADGES]
  );

  // const handleCityClick = useCallback((cityName) => {
  //   history.push({
  //     pathname: `/citywiseproperties/${encodeURIComponent(cityName)}`
  //   });
  // }, [history]);

  const handleCityClick = useCallback((cityName) => {
    sessionStorage.setItem("selectedCity", cityName);

    history.push({
      pathname: `/citywiseproperties/${encodeURIComponent(cityName)}`
    });
  }, [history]);
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6, // NEW: matches the six-across layout in the design
    slidesToScroll: 1,
    // NEW: autoplay + swipe so the strip moves on its own like the mock
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
    swipeToSlide: true,
    responsive: [
      // NEW breakpoints above the two originals
      {
        breakpoint: 1536,
        settings: { slidesToShow: 5, slidesToScroll: 1 },
      },
      {
        breakpoint: 1280,
        settings: { slidesToShow: 4, slidesToScroll: 1 },
      },
      {
        breakpoint: 1023,
        settings: { slidesToShow: 3, slidesToScroll: 1 },
      },
      {
        breakpoint: 767,
        settings: { slidesToShow: 2, slidesToScroll: 1, arrows: false },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false },
      },
    ],
  };

  return (
    <section className="px-4 sm:px-6 lg:px-10 pt-2 pb-4 sm:pt-3 sm:pb-5 mx-auto bg-white lg:max-w-full">
      {/* NEW: soft pink panel + skyline watermark, replacing the flat slate panel */}
      <div className="relative p-4 sm:p-5 lg:p-7 overflow-hidden rounded-2xl bg-gradient-to-b from-[#FDF5F7] to-[#FBEEF1]">

        {/* NEW: decorative skyline watermark along the bottom edge */}
        <svg
          className="absolute bottom-0 right-0 w-full h-24 pointer-events-none select-none"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <g fill="#D61F45" opacity="0.07">
            <rect x="620" y="60" width="38" height="60" />
            <rect x="666" y="34" width="30" height="86" />
            <rect x="704" y="72" width="44" height="48" />
            <rect x="756" y="20" width="26" height="100" />
            <rect x="790" y="56" width="40" height="64" />
            <rect x="838" y="78" width="32" height="42" />
            <rect x="878" y="40" width="34" height="80" />
            <rect x="920" y="66" width="46" height="54" />
            <rect x="974" y="28" width="28" height="92" />
            <rect x="1010" y="70" width="40" height="50" />
            <rect x="1058" y="48" width="30" height="72" />
            <rect x="1096" y="80" width="48" height="40" />
            <rect x="1152" y="58" width="34" height="62" />
          </g>
        </svg>

        {/* ==================== HEADER ==================== */}
        <div className="relative z-10 flex flex-col gap-4 mb-5 lg:flex-row lg:items-start lg:justify-between">

          <div className="min-w-0">
            {/* NEW: eyebrow */}
            <p className="mb-1 text-[11px] sm:text-xs font-bold tracking-[0.18em] text-[#D61F45] uppercase">
              Top Locations
            </p>

            <h1 className="text-xl sm:text-2xl font-bold text-[#17253a] lg:text-3xl">
              Find Your Perfect Home in{" "}
              <span className="text-[#D61F45]">Top Cities</span>
            </h1>
            <p className="pb-0 mt-1 text-sm sm:text-base text-gray-500">
              Discover prime locations with the best properties, great
              infrastructure and a better lifestyle.
            </p>
          </div>

          <div className="flex items-center gap-3 sm:gap-5 flex-shrink-0">

            {/* NEW: script accent */}
            <div
              className="hidden xl:block text-right leading-tight text-[#D61F45]"
              style={{
                fontFamily:
                  "'Segoe Script','Bradley Hand','Brush Script MT',cursive",
              }}
            >
              <span className="block text-lg">Cities</span>
              <span className="block text-sm">Build Better Lives</span>
              <span className="block w-20 h-px ml-auto mt-1 bg-[#D61F45]/50" />
            </div>

            {/* NEW: prev / next */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous cities"
                onClick={() => sliderRef.current?.slickPrev()}
                className="flex items-center justify-center w-9 h-9 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <FaChevronLeft className="text-[#D61F45]" size={13} />
              </button>
              <button
                type="button"
                aria-label="Next cities"
                onClick={() => sliderRef.current?.slickNext()}
                className="flex items-center justify-center w-9 h-9 bg-[#D61F45] hover:bg-[#B91C3C] rounded-full shadow-md transition-colors duration-200"
              >
                <FaChevronRight className="text-white" size={13} />
              </button>
            </div>

          </div>
        </div>

        {/* ==================== CITY CARD CAROUSEL ==================== */}
        <div className="relative z-10 cities-slider">
          <Slider ref={sliderRef} {...sliderSettings}>
            {updatedCities.map((city, index) => {
              const badge = getRankBadge(city, index);
              const BadgeIcon = badge?.Icon;

              return (
                <div key={city.name} className="px-1.5 sm:px-2">
                  <div
                    className="relative h-[260px] sm:h-[300px] lg:h-[320px] overflow-hidden transition-shadow duration-300 cursor-pointer group rounded-2xl shadow-[0_6px_20px_rgba(17,24,39,0.10)] hover:shadow-[0_16px_40px_rgba(17,24,39,0.20)]"
                    onClick={() => handleCityClick(city.name)}
                  >
                    <img
                      src={city.imageUrl}
                      alt={city.name}
                      className="absolute inset-0 object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-110"
                      loading="lazy"
                    />

                    {/* readability scrim */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/85 via-black/15 to-black/5" />

                    {/* NEW: rank badge — derived from property_count, see getRankBadge */}
                    {badge && (
                      <span className="absolute z-10 flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-[#17253a] bg-white rounded-full shadow-md top-3 right-3">
                        <BadgeIcon className="text-[#D61F45]" size={11} />
                        {badge.label}
                      </span>
                    )}

                    {/* name + count + arrow */}
                    <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-2 p-3 sm:p-4">
                      <div className="min-w-0">
                        <h3 className="flex items-center gap-1.5 mb-0 text-base sm:text-lg font-bold text-white truncate">
                          <FaMapMarkerAlt className="flex-shrink-0" size={13} />
                          {city.name}
                        </h3>
                        <p className="flex items-center gap-1.5 mt-1 mb-0 text-[11px] sm:text-xs text-white/85 truncate">
                          <BsBuildings className="flex-shrink-0" size={12} />
                          {loading ? "Loading..." : `${city.properties} properties`}
                        </p>
                      </div>

                      <span className="flex items-center justify-center flex-shrink-0 transition-transform duration-300 rounded-full w-9 h-9 bg-[#D61F45] group-hover:scale-110">
                        <FaArrowRight className="text-white" size={13} />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>

        {/* ==================== FOOTER ACCENTS ==================== */}
        <div className="relative z-10 flex items-end justify-between gap-4 mt-6">

          {/* NEW: script accent */}
          <div
            className="hidden leading-tight sm:block text-[#D61F45]"
            style={{
              fontFamily:
                "'Segoe Script','Bradley Hand','Brush Script MT',cursive",
            }}
          >
            <span className="block text-base">New Cities</span>
            <span className="block text-sm">New Opportunities</span>
            <span className="block w-20 h-px mt-1 bg-[#D61F45]/50" />
          </div>

          {/* NEW: keyword strip */}
          <p className="mb-0 ml-auto text-[10px] sm:text-xs font-semibold tracking-[0.18em] text-[#D61F45]/80 uppercase whitespace-nowrap">
            Explore <span className="mx-1 opacity-60">•</span> Invest
            <span className="mx-1 opacity-60">•</span> Live
            <span className="mx-1 opacity-60">•</span> Grow
          </p>
        </div>

      </div>

      {/* ==================== SLIDER STYLE (scoped to .cities-slider) ==================== */}
      <style>{`
        .cities-slider .slick-list {
          margin: 0 -6px;
          padding-bottom: 4px;
        }

        .cities-slider .slick-track {
          display: flex;
        }

        .cities-slider .slick-slide {
          height: auto;
        }

        .cities-slider .slick-slide > div {
          height: 100%;
        }

        .cities-slider .slick-dots {
          position: static;
          margin-top: 16px;
        }

        .cities-slider .slick-dots li,
        .cities-slider .slick-dots li button {
          width: 9px;
          height: 9px;
          padding: 0;
        }

        .cities-slider .slick-dots li button:before {
          content: "";
          width: 9px;
          height: 9px;
          border-radius: 9999px;
          background: #D61F45;
          opacity: 0.28;
          transition: opacity .2s ease, transform .2s ease;
        }

        .cities-slider .slick-dots li.slick-active button:before {
          opacity: 1;
          transform: scale(1.15);
        }

        @media (max-width: 767px) {
          .cities-slider .slick-list {
            margin: 0 -4px;
          }
        }
      `}</style>
    </section>
  );
});

export default Cities;