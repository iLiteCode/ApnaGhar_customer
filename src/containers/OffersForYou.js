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

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const OffersForYou = ({ data }) => {
  const sliderRef = useRef(null);
  const history = useHistory();

  const [offers, setOffers] = useState([]);

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


  return (
    <div className="bg-white py-4 px-2 sm:px-4 lg:px-2">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-1 sm:px-2 mb-4">

        {/* Title */}

        <div>

          <h2 className="text-[22px] sm:text-[24px] lg:text-[25px] font-bold text-[#17253a] leading-tight">
            Hot Deals & Exclusive Offers
          </h2>

          <p className="text-[13px] sm:text-[14px] text-gray-500 mt-1">
            Limited-time property deals and special savings
          </p>

        </div>


        {/* =====================================================
            RIGHT BUTTONS
        ===================================================== */}

        <div className="flex items-center gap-2 mt-4 sm:mt-0">

          {/* View All Offers */}

          <button
            onClick={() => history.push("/all-offers")}
            className="bg-white border border-[#9b2947] text-[#9b2947] hover:bg-[#9b2947] hover:text-white transition-all duration-200 rounded-md px-5 py-2 text-xs sm:text-sm"
          >
            View All Offers
          </button>


          {/* Previous */}

          <button
            onClick={() =>
              sliderRef.current?.slickPrev()
            }
            className="flex items-center justify-center w-9 h-9 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200"
          >
            <GoArrowLeft
              className="text-black"
              size={21}
            />
          </button>


          {/* Next */}

          <button
            onClick={() =>
              sliderRef.current?.slickNext()
            }
            className="flex items-center justify-center w-9 h-9 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200"
          >
            <GoArrowRight
              className="text-black"
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

          {offers.map((offer) => (

            <div
              key={offer?._id}
              className="px-[5px]"
            >

              <Link
                to={{
                  pathname: `/offerdetail/${offer?.property_id || "#"
                    }`,
                  state: {
                    offer,
                  },
                }}
                className="block no-underline hover:no-underline"
              >

                {/* =================================================
                    CARD
                ================================================= */}

                <div className="overflow-hidden rounded-[14px] bg-[#f4f7fb] h-full transition-all duration-300 hover:shadow-md">


                  {/* =================================================
                      IMAGE
                  ================================================= */}

                  <div className="relative w-full h-[270px] sm:h-[300px] lg:h-[300px] overflow-hidden">

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

                      className="w-full h-full object-cover"
                    />
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

                    {/* =================================================
                        OFFER LABEL
                    ================================================= */}

                    <span className="absolute top-2 left-2 bg-gray-600/80 text-white text-[10px] sm:text-[11px] font-semibold px-2 py-1 rounded-full">
                      {offer?.offer_name ||
                        "Property Offer"}
                    </span>

                  </div>


                  {/* =================================================
                      CARD TITLE
                  ================================================= */}

                  <div className="bg-[#f4f7fb] px-4 py-4 sm:py-5">

                    <h3 className="text-[16px] sm:text-[17px] font-semibold text-[#344054] leading-tight no-underline">
                      {offer?.offer_name ||
                        "Hot Deals & Exclusive Offers"}
                    </h3>

                  </div>

                </div>

              </Link>

            </div>

          ))}

        </Slider>

      </div>


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



