// import React, { useEffect, useState, useRef } from "react";
// import { useHistory, Link } from "react-router-dom";
// import Slider from "react-slick";
// import axios from "axios";
// import { GoArrowLeft, GoArrowRight } from "react-icons/go";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const OffersForYou = ({ data }) => {
//   const sliderRef = useRef(null);
//   const history = useHistory();
//   const [offers, setOffers] = useState([]);

//   useEffect(() => {
//     if (data && data.status === 1 && Array.isArray(data.data)) {
//       setOffers(data.data);
//     } else {
//       setOffers([]);
//     }
//   }, [data]);

//   // Slider settings
//   const settings = {
//     infinite: true,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     arrows: false,
//     cssEase: "linear",
//     centerMode: false,
//     centerPadding: "0px",
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <div className="bg-white py-4 ml-4 mr-4 sm:ml-10 sm:mr-10 rounded-2xl">
//       <div className="flex flex-col sm:flex-row items-center justify-between px-2">
//         {/* Title and Subtitle */}
//         <div className="flex flex-col sm:text-left">
//           <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
//             Hot, Deals, Discount & Offers
//           </h2>
//           <p className="text-gray-500 text-md">Go from browsing to buying</p>
//         </div>

//         {/* Navigation Buttons */}
//         <div className="flex items-center space-x-3 mt-4 sm:mt-0 w-full sm:w-auto">
//           {/* Mobile View Button */}
//           <button
//             className="bg-white text-rose-700 my-border py-2 px-4 sm:px-6 text-sm rounded-lg w-full sm:hidden"
//             onClick={() => history.push("/all-offers")}
//           >
//             View Offers
//           </button>

//           {/* Desktop View Button */}
//           <button
//             className="bg-white my-text my-border py-2 px-4 sm:px-6 text-sm rounded-lg hidden sm:block"
//             onClick={() => history.push("/all-offers")}
//           >
//             View All Offers
//           </button>

//           <button
//             className="bg-white text-gray-700 rounded-full text-lg sm:text-2xl font-semibold p-2 shadow-md hover:shadow-lg"
//             onClick={() => sliderRef.current.slickPrev()}
//           >
//             <GoArrowLeft className="text-black text-3xl" />
//           </button>

//           <button
//             className="bg-white text-gray-700 rounded-full text-lg sm:text-2xl font-semibold p-2 shadow-md hover:shadow-lg"
//             onClick={() => sliderRef.current.slickNext()}
//           >
//             <GoArrowRight className="text-black text-3xl" />
//           </button>
//         </div>
//       </div>

//       <div className="pt-6 px-0">
//         <Slider ref={sliderRef} {...settings}>
//           {offers.map((offer) => (
//             <Link
//               to={{
//                 pathname: `/offerdetail/${offer?.property_id || "#"}`,
//                 state: { offer },
//               }}
//               key={offer?._id}
//               className="w-full no-underline hover:no-underline"
//             >
//               <div className="relative w-full h-64 sm:h-96">
//                 <img
//                   src={
//                     offer?.offer_img
//                       ? `${process.env.REACT_APP_API_URL}${offer.offer_img}`
//                       : "/image/property-search.jpg"
//                   }
//                   alt={offer?.offer_name || "Project"}
//                   className="w-full h-full object-cover rounded-t-2xl"
//                 />
//                 <span className="absolute top-2 left-2 bg-gray-600/70 text-white text-xs font-bold py-1 px-2 rounded-full">
//                   {offer?.offer_name || "Hot Deals, Discount & Offers"}
//                 </span>
//               </div>
//               <div className="w-full bg-white p-4 text-gray-800 rounded-b-2xl">
//                 <h3 className="text-xl font-semibold no-underline hover:no-underline">
//                   {offer?.offer_name || "Hot Deals, Discount & Offers"}
//                 </h3>
//                 {/* <p className="text-md no-underline hover:no-underline">
//                   {offer?.offer_description ||
//                     "Offers on exclusive properties, Warehouses, Villas, and Independent Houses."}
//                 </p> */}
//               </div>
//             </Link>
//           ))}
//         </Slider>
//       </div>
//     </div>
//   );
// };

// export default OffersForYou;


import React, { useEffect, useState, useRef } from "react";
import { useHistory, Link } from "react-router-dom";
import Slider from "react-slick";
import axios from "axios";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { toast } from "react-toastify"; // NEW: used by the favourite button
import {
  FaFire,              // NEW: section heading + "% OFF" badge
  FaBolt,              // NEW: "Special Offer" badge
  FaGift,              // NEW: "Free Registration" / "Festive Offer" badge
  FaCrown,             // NEW: "Premium Deal" pill
  FaRegClock,          // NEW: "Limited Time" pill + trust bar
  FaShieldAlt,         // NEW: trust bar
  FaHandshake,         // NEW: trust bar
  FaPercent,           // NEW: trust bar
  FaBed,               // NEW: BHK spec
  FaCar,               // NEW: parking spec
  FaRegCalendarCheck,  // NEW: "Book Now" button
  FaArrowRight,        // NEW: "View Details" button
  FaHeart,             // NEW: favourite button
  FaRegImages,         // NEW: image counter
  FaMapMarkerAlt,      // NEW: location line
} from "react-icons/fa";
import { RiRuler2Line } from "react-icons/ri"; // NEW: built-up area spec

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const OffersForYou = ({ data }) => {
  const sliderRef = useRef(null);
  const history = useHistory();

  const [offers, setOffers] = useState([]);

  // NEW: needed by the favourite button below
  const userId = sessionStorage.getItem("accessToken");

  useEffect(() => {
    if (
      data &&
      data.status === 1 &&
      Array.isArray(data.data)
    ) {
      setOffers(data.data);
    } else {
      setOffers([]);
    }
  }, [data]);


  /* =====================================================
     SLIDER SETTINGS
  ===================================================== */

  const settings = {
    infinite: offers.length > 3,
    slidesToShow: 3,
    slidesToScroll: 1,

    autoplay: true,
    autoplaySpeed: 3000,

    arrows: false,

    dots: false,

    speed: 500,

    cssEase: "ease-in-out",

    centerMode: false,

    centerPadding: "0px",

    swipeToSlide: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const getOfferImageUrl = (imagePath) => {
    const fallback = "/image/property-search.jpg";

    if (!imagePath) {
      return fallback;
    }

    // Already complete URL
    if (
      imagePath.startsWith("http://") ||
      imagePath.startsWith("https://")
    ) {
      return imagePath;
    }

    const baseUrl = process.env.REACT_APP_API_URL || "";

    // Remove extra slashes
    const cleanBaseUrl = baseUrl.replace(/\/+$/, "");
    const cleanImagePath = imagePath.replace(/^\/+/, "");

    return `${cleanBaseUrl}/${cleanImagePath}`;
  };


  /* =====================================================
     NEW: price formatter — same Cr / L / K rules used by
     the property cards elsewhere in the app.
  ===================================================== */

  const formatPrice = (price) => {
    if (price === null || price === undefined || price === "") return "";
    const value = Number(price);
    if (isNaN(value)) return "";

    const fmt = (v, unit) =>
      `${v.toFixed(2).replace(/\.?0+$/, "")}${unit}`;

    if (value >= 10000000) return fmt(value / 10000000, " Cr");
    if (value >= 100000) return fmt(value / 100000, " L");
    if (value >= 1000) return fmt(value / 1000, " K");
    return value.toString();
  };


  /* =====================================================
     NEW: favourite (wishlist) handlers.
     These call the SAME endpoints the property cards use.
     The heart only renders when the offer carries a
     property_id — remove this block and the button in the
     card if offers are not favouritable in your backend.
  ===================================================== */

  const addToFavorites = async (offerId, propertyId) => {
    if (!userId) {
      toast.error("Please log in to save offers to your favorites.");
      return;
    }

    // Optimistic update
    setOffers((prev) =>
      prev.map((item) =>
        item._id === offerId ? { ...item, is_favorite: true } : item,
      ),
    );

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/cust_api/add_to_favorite`,
        {
          user_id: userId,
          property_id: propertyId,
        },
      );

      if (response.data.status === 1) {
        setOffers((prev) =>
          prev.map((item) =>
            item._id === offerId
              ? {
                ...item,
                is_favorite: true,
                favorite_id: response.data.favorite_id,
              }
              : item,
          ),
        );
      } else {
        setOffers((prev) =>
          prev.map((item) =>
            item._id === offerId ? { ...item, is_favorite: false } : item,
          ),
        );
      }
    } catch (error) {
      setOffers((prev) =>
        prev.map((item) =>
          item._id === offerId ? { ...item, is_favorite: false } : item,
        ),
      );
    }
  };

  const removeFromFavorites = async (offerId, favoriteId) => {
    if (!userId) {
      toast.error("Please log in to remove offers from your favorites.");
      return;
    }

    setOffers((prev) =>
      prev.map((item) =>
        item._id === offerId
          ? { ...item, is_favorite: false, favorite_id: null }
          : item,
      ),
    );

    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/cust_api/remove_from_favorite`,
        {
          data: { favorite_id: favoriteId },
        },
      );
    } catch (error) {
      toast.error("Failed to remove favorite. Please try again.");
    }
  };


  /* =====================================================
     NEW: trust strip under the carousel (static marketing
     copy — makes no claim about any individual property).
  ===================================================== */

  const trustItems = [
    { Icon: FaPercent, title: "Best Prices", sub: "Exclusive deals" },
    { Icon: FaShieldAlt, title: "Verified Properties", sub: "Safe & Secure" },
    { Icon: FaHandshake, title: "Trusted Builders", sub: "Top Developers" },
    { Icon: FaRegClock, title: "Limited Time Offers", sub: "Book Before It's Gone!" },
  ];


  return (
    <div className="bg-white py-4 px-2 sm:px-4 lg:px-2">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-1 sm:px-2 mb-4">

        {/* Title */}

        <div className="flex items-start gap-3">

          {/* NEW: flame mark */}
          <span className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl bg-[#D61F45]/10 flex-shrink-0">
            <FaFire className="text-[#D61F45]" size={20} />
          </span>

          <div>

            <h2 className="text-[22px] sm:text-[24px] lg:text-[25px] font-bold text-[#17253a] leading-tight">
              <span className="text-[#D61F45]">Hot Deals</span> &amp; Exclusive Offers
            </h2>

            <p className="text-[13px] sm:text-[14px] text-gray-500 mt-1">
              Limited-time property deals and special savings
            </p>

          </div>

        </div>


        {/* =====================================================
            RIGHT BUTTONS
        ===================================================== */}

        <div className="flex items-center gap-2 mt-4 sm:mt-0">

          {/* View All Offers */}

          <button
            onClick={() => history.push("/all-offers")}
            className="flex items-center gap-2 bg-white border border-[#D61F45] text-[#D61F45] hover:bg-[#D61F45] hover:text-white transition-all duration-200 rounded-md px-5 py-2 text-xs sm:text-sm font-semibold"
          >
            View All Offers
            <FaArrowRight size={11} />
          </button>


          {/* Previous */}

          <button
            onClick={() =>
              sliderRef.current?.slickPrev()
            }
            className="flex items-center justify-center w-9 h-9 bg-[#D61F45]/10 hover:bg-[#D61F45]/20 rounded-full transition-all duration-200"
          >
            <GoArrowLeft
              className="text-[#D61F45]"
              size={21}
            />
          </button>


          {/* Next */}

          <button
            onClick={() =>
              sliderRef.current?.slickNext()
            }
            className="flex items-center justify-center w-9 h-9 bg-[#D61F45]/10 hover:bg-[#D61F45]/20 rounded-full transition-all duration-200"
          >
            <GoArrowRight
              className="text-[#D61F45]"
              size={21}
            />
          </button>

        </div>

      </div>


      {/* =====================================================
          CARDS
      ===================================================== */}

      <div className="offers-slider">

        <Slider
          ref={sliderRef}
          {...settings}
        >

          {offers.map((offer) => {

            /* =================================================
               FIELD RESOLUTION
               The offer payload today only carries _id,
               offer_img, offer_name, offer_description and
               property_id. Everything richer below is read
               through `pick`, which looks on the offer itself
               and on a nested property object if one is sent,
               and returns null when the field is absent — each
               block then simply does not render. Nothing here
               is invented or hardcoded per-property.
            ================================================= */

            const prop =
              offer?.property ||
              offer?.property_details ||
              offer?.property_data ||
              {};

            const pick = (...keys) => {
              for (const k of keys) {
                const v =
                  offer?.[k] !== undefined && offer?.[k] !== null && offer?.[k] !== ""
                    ? offer[k]
                    : prop?.[k];
                if (v !== undefined && v !== null && v !== "") return v;
              }
              return null;
            };

            const propertyName = pick(
              "property_name",
              "project_name",
              "title",
            );

            const addressArea = pick("address_area", "locality", "area_name");
            const cityName = pick("city_name", "city");
            const locationText =
              addressArea && cityName
                ? addressArea.toLowerCase().includes(cityName.toLowerCase())
                  ? addressArea
                  : `${addressArea}, ${cityName}`
                : addressArea || cityName || null;

            const bhkType = pick("bhk_type", "configuration");
            const propertyType = pick("property_type", "building_type");
            const builtUpArea = pick("area", "built_up_area", "carpet_area");
            const areaUnit = pick("area_in", "area_unit") || "sq.ft";
            const parking = pick("parking", "car_parking", "parking_count");

            // Discounted price, then the original it is discounted from.
            const dealPrice = pick(
              "offer_price",
              "discounted_price",
              "final_price",
              "deal_price",
            );
            const listPrice = pick(
              "original_price",
              "actual_price",
              "base_price",
              "property_price",
              "price",
            );

            const dealNum = Number(dealPrice);
            const listNum = Number(listPrice);
            const hasDeal = !isNaN(dealNum) && dealNum > 0;
            const hasList = !isNaN(listNum) && listNum > 0;
            const showStrike = hasDeal && hasList && listNum > dealNum;

            // Shown price: the discounted one if present, else whatever single
            // price the API gave us.
            const shownPrice = hasDeal ? dealNum : hasList ? listNum : null;

            // Discount: explicit field if sent, otherwise computed from the
            // two prices above. Never fabricated.
            const explicitDiscount = pick(
              "discount_percentage",
              "discount_percent",
              "discount",
            );
            const discountPct = explicitDiscount
              ? Math.round(Number(explicitDiscount))
              : showStrike
                ? Math.round(((listNum - dealNum) / listNum) * 100)
                : null;

            // Badge text on the image: an explicit tag if the API sends one,
            // else the computed discount, else the offer name.
            const badgeLabel =
              pick("offer_tag", "offer_type", "badge", "tag") ||
              (discountPct ? `${discountPct}% OFF` : null) ||
              offer?.offer_name ||
              "Special Offer";

            const badgeLower = String(badgeLabel).toLowerCase();
            const BadgeIcon = badgeLower.includes("free")
              || badgeLower.includes("gift")
              || badgeLower.includes("festive")
              ? FaGift
              : badgeLower.includes("off") || badgeLower.includes("%")
                ? FaFire
                : FaBolt;

            // Secondary pill next to the property name.
            const dealLabel = pick("deal_label", "offer_label", "highlight");
            const DealIcon = dealLabel
              && String(dealLabel).toLowerCase().includes("premium")
              ? FaCrown
              : dealLabel && String(dealLabel).toLowerCase().includes("fest")
                ? FaGift
                : FaRegClock;

            // Gallery behind the 1/N counter.
            const galleryRaw =
              pick("property_images", "offer_images", "images", "gallery") || [];
            const gallery = [
              ...new Set(
                [
                  offer?.offer_img,
                  ...(Array.isArray(galleryRaw) ? galleryRaw : []).map((img) =>
                    typeof img === "string" ? img : img?.image || img?.url,
                  ),
                ].filter(Boolean),
              ),
            ];

            const offerTarget = {
              pathname: `/offerdetail/${offer?.property_id || "#"}`,
              state: { offer },
            };

            const goToOffer = (e) => {
              e.preventDefault();
              e.stopPropagation();
              history.push(offerTarget);
            };

            return (

              <div
                key={offer?._id}
                className="px-[5px] h-full"
              >

                {/* =================================================
                    CARD
                ================================================= */}

                <div className="flex flex-col h-full overflow-hidden rounded-[14px] bg-white border border-[#E2E8F0] shadow-[0_4px_18px_rgba(17,24,39,0.06)] hover:shadow-[0_14px_38px_rgba(17,24,39,0.14)] transition-all duration-300 group">


                  {/* =================================================
                      IMAGE
                  ================================================= */}

                  <div className="relative w-full h-[230px] sm:h-[250px] lg:h-[250px] overflow-hidden flex-shrink-0">

                    <Link
                      to={offerTarget}
                      className="block w-full h-full no-underline hover:no-underline"
                    >
                      <img
                        src={
                          offer?.offer_img
                            ? `${process.env.REACT_APP_API_URL}${offer.offer_img}`
                            : "/image/property-search.jpg"
                        }

                        alt={
                          offer?.offer_name ||
                          "Property Offer"
                        }

                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    </Link>
                    {/* 
                    <img
                      src={getOfferImageUrl(offer?.offer_img)}
                      alt={offer?.offer_name || "Property Offer"}
                      className="block w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                          "/image/property-search.jpg";
                      }}
                    /> */}

                    {/* NEW: gradient so the overlay text stays readable */}
                    <div className="absolute inset-0 z-[5] pointer-events-none bg-gradient-to-b from-black/45 via-black/0 to-black/35" />

                    {/* =================================================
                        OFFER LABEL
                    ================================================= */}

                    <span className="absolute z-20 top-3 left-3 max-w-[70%] flex items-center gap-1.5 bg-gradient-to-r from-[#D61F45] to-[#B91C3C] text-white text-[10px] sm:text-[11px] font-bold px-3 py-1.5 rounded-full shadow-[0_2px_10px_rgba(214,31,69,0.4)]">
                      <BadgeIcon size={11} className="flex-shrink-0" />
                      <span className="truncate">{badgeLabel}</span>
                    </span>

                    {/* NEW: favourite button — see handlers above */}
                    {offer?.property_id && (
                      <button
                        type="button"
                        aria-label="Save this offer"
                        className="absolute z-20 top-3 right-3 w-8 h-8 rounded-full bg-black/55 backdrop-blur flex items-center justify-center hover:scale-110 transition-transform duration-200"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (offer?.is_favorite) {
                            removeFromFavorites(offer._id, offer.favorite_id);
                          } else {
                            addToFavorites(offer._id, offer.property_id);
                          }
                        }}
                      >
                        <FaHeart
                          size={13}
                          className={
                            offer?.is_favorite
                              ? "text-[#D61F45]"
                              : "text-white"
                          }
                        />
                      </button>
                    )}

                    {/* NEW: image counter — only when a gallery is actually sent */}
                    {gallery.length > 1 && (
                      <span className="absolute z-20 bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 text-[10px] font-medium text-white rounded-full bg-black/55 backdrop-blur-md">
                        <FaRegImages size={11} />
                        1/{gallery.length}
                      </span>
                    )}

                  </div>


                  {/* =================================================
                      CARD TITLE
                  ================================================= */}

                  <Link
                    to={offerTarget}
                    className="block flex-1 px-4 pt-4 no-underline hover:no-underline"
                  >

                    <div className="flex items-start justify-between gap-2">

                      <h3 className="text-[16px] sm:text-[17px] font-bold text-[#17253a] leading-tight no-underline truncate">
                        {propertyName ||
                          offer?.offer_name ||
                          "Hot Deals & Exclusive Offers"}
                      </h3>

                      {/* Secondary deal pill — only when the API sends a label */}
                      {dealLabel && (
                        <span className="flex-shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#D61F45]/10 text-[#D61F45] text-[10px] font-semibold whitespace-nowrap">
                          <DealIcon size={10} />
                          {dealLabel}
                        </span>
                      )}

                    </div>

                    {/* Location — only when the API sends it */}
                    {locationText && (
                      <p className="flex items-center gap-1.5 mt-1.5 mb-0 text-[12px] sm:text-[13px] text-gray-500 truncate">
                        <FaMapMarkerAlt className="text-[#D61F45] flex-shrink-0" size={11} />
                        {locationText}
                      </p>
                    )}

                    {/* Price row — only when the API sends a price */}
                    {shownPrice !== null && (
                      <div className="flex flex-wrap items-center gap-2 mt-3">

                        <span className="text-[22px] sm:text-[24px] font-extrabold text-[#D61F45] leading-none">
                          ₹ {formatPrice(shownPrice)}
                          {showStrike && "*"}
                        </span>

                        {showStrike && (
                          <span className="text-[13px] text-gray-400 line-through">
                            ₹ {formatPrice(listNum)}
                          </span>
                        )}

                        {discountPct ? (
                          <span className="px-2 py-0.5 rounded-full bg-[#D61F45]/10 text-[#D61F45] text-[11px] font-bold whitespace-nowrap">
                            {explicitDiscount
                              ? `${discountPct}% OFF`
                              : `Save ${discountPct}%`}
                          </span>
                        ) : null}

                      </div>
                    )}

                    {/* Spec row — each cell renders only when its field exists */}
                    {(bhkType || builtUpArea || parking) && (
                      <div className="flex items-stretch gap-2 mt-3 pt-3 border-t border-[#E2E8F0]">

                        {bhkType && (
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            <FaBed className="text-gray-700 flex-shrink-0" size={15} />
                            <div className="min-w-0">
                              <p className="m-0 text-[12px] font-semibold text-[#17253a] truncate leading-4">
                                {bhkType}
                              </p>
                              {propertyType && (
                                <p className="m-0 text-[10px] text-gray-500 truncate leading-4">
                                  {propertyType}
                                </p>
                              )}
                            </div>
                          </div>
                        )}

                        {builtUpArea && (
                          <div className="flex items-center gap-2 min-w-0 flex-1 border-l border-[#E2E8F0] pl-2">
                            <RiRuler2Line className="text-gray-700 flex-shrink-0" size={15} />
                            <div className="min-w-0">
                              <p className="m-0 text-[12px] font-semibold text-[#17253a] truncate leading-4">
                                {builtUpArea} {areaUnit}
                              </p>
                              <p className="m-0 text-[10px] text-gray-500 truncate leading-4">
                                Built Up Area
                              </p>
                            </div>
                          </div>
                        )}

                        {parking && (
                          <div className="flex items-center gap-2 min-w-0 flex-1 border-l border-[#E2E8F0] pl-2">
                            <FaCar className="text-gray-700 flex-shrink-0" size={15} />
                            <div className="min-w-0">
                              <p className="m-0 text-[12px] font-semibold text-[#17253a] truncate leading-4">
                                {parking} Parking
                              </p>
                              <p className="m-0 text-[10px] text-gray-500 truncate leading-4">
                                Covered
                              </p>
                            </div>
                          </div>
                        )}

                      </div>
                    )}

                  </Link>


                  {/* =================================================
                      NEW: ACTION BUTTONS — both navigate to the same
                      offer detail route the card already linked to
                      (with `state: { offer }` preserved). If you add a
                      dedicated booking route, point "Book Now" at it.
                  ================================================= */}

                  <div className="grid grid-cols-2 gap-2 px-4 pt-3 pb-4 mt-auto">

                    <button
                      type="button"
                      onClick={goToOffer}
                      className="flex items-center justify-center gap-1.5 h-10 rounded-lg bg-[#D61F45] hover:bg-[#B91C3C] text-white text-[12px] font-semibold transition-colors duration-200"
                    >
                      <FaRegCalendarCheck size={12} />
                      Book Now
                    </button>

                    <button
                      type="button"
                      onClick={goToOffer}
                      className="flex items-center justify-center gap-1.5 h-10 rounded-lg border border-[#D61F45] text-[#D61F45] hover:bg-[#D61F45]/5 text-[12px] font-semibold transition-colors duration-200"
                    >
                      View Details
                      <FaArrowRight size={11} />
                    </button>

                  </div>

                </div>

              </div>

            );

          })}

        </Slider>

      </div>


      {/* =====================================================
          NEW: TRUST STRIP
      ===================================================== */}

      {offers.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6 px-1 sm:px-2">
          {trustItems.map(({ Icon, title, sub }, i) => (
            <div
              key={title}
              className={`flex items-center gap-3 px-2 py-2 ${i > 0 ? "lg:border-l lg:border-[#E2E8F0]" : ""
                }`}
            >
              <span className="flex items-center justify-center flex-shrink-0 rounded-full w-9 h-9 bg-[#D61F45]/10">
                <Icon className="text-[#D61F45]" size={15} />
              </span>
              <div className="min-w-0">
                <p className="m-0 text-[13px] font-semibold text-[#17253a] truncate leading-tight">
                  {title}
                </p>
                <p className="m-0 text-[11px] text-gray-500 truncate leading-tight">
                  {sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}


      {/* =====================================================
          SLIDER STYLE
      ===================================================== */}

      <style>{`

        .offers-slider .slick-list {
          margin: 0 -5px;
        }

        .offers-slider .slick-track {
          display: flex;
        }

        .offers-slider .slick-slide {
          height: auto;
        }

        .offers-slider .slick-slide > div {
          height: 100%;
        }

        .offers-slider .slick-dots {
          display: none !important;
        }

        @media (max-width: 768px) {

          .offers-slider .slick-list {
            margin: 0;
          }

          .offers-slider .slick-slide {
            padding: 0;
          }

        }

      `}</style>

    </div>
  );
};

export default OffersForYou;