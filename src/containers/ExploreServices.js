
// import { Link } from "react-router-dom";
// import React, { useState } from "react";

// const ExploreServices = () => {
//   const [type, setType] = useState("");

//   const services = [
//     {
//       image: "/image/plots.jpg",
//       title: "Modern Residences",
//       description: "Beautifully curated residential properties perfect for individuals and families from apartments to villas",
//       link: "/property",
//       propertyType: "Residential",
//       payloadKey: "building_type",
//     },
//     {
//       image: "/image/leasing.jpg",
//       title: "Smart Spaces for Business",
//       description: "Top commercial spaces for offices, retail, and startups.",
//       link: "/property",
//       propertyType: "Commercial",
//       payloadKey: "building_type",
//     },
//     {
//       image: "/image/commercial.jpg",
//       title: "Industrial and Investment Land",
//       description: "Warehouses, industrial plots, and raw land - perfect for factories, logistics, or future projects.",
//       link: "/property",
//       propertyType: "Buy",
//       payloadKey: "property_category_type",
//     },
//     {
//       image: "/image/pgpg.jpg",
//       title: "PG and Co-living",
//       description: "Affordable and community-style living for students and working professionals with shared amenities.",
//       link: "/property",
//       propertyType: "PG/Co-living",
//       payloadKey: "property_category_type",
//     }
//   ];

//   return (
//     <div className="bg-white py-8">
//       <div className="max-w-9xl mx-auto px-10">
//         <h2 className="text-2xl sm:text-4xl text-gray-900">
//           Explore our services
//         </h2>
//         <p className="text-gray-500 text-[18px]">Go from browsing to buying</p>

//         {/* Services Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 ">
//           {services.map((service, index) => (
//             <Link
//               key={index}
//               to={{
//                 pathname: service.link,
//                 state: { propertyType: service.propertyType },
//               }}
//               className="flex items-center bg-white rounded-2xl border border-gray-300 transform hover:scale-105 p-3 no-underline text-gray-800 hover:no-underline"
//             >
//               {/* Images Section - Left Side */}
//               <div className="w-1/3">
//                 <div className="w-full h-20 mb-2">
//                   <img
//                     src={service.image}
//                     alt={service.title}
//                     className="w-full h-full object-cover rounded-md"
//                   />
//                 </div>

//                 {/* Vertical Images */}
//                 <div className="flex space-x-2">
//                   <div className="w-1/2 h-12">
//                     <img
//                       src={service.image}
//                       alt={service.title}
//                       className="w-full h-full object-cover rounded-md"
//                     />
//                   </div>
//                   <div className="w-1/2 h-12">
//                     <img
//                       src={service.image}
//                       alt={service.title}
//                       className="w-full h-full object-cover rounded-md"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Text Section - Right Side */}
//               <div className="ml-4 w-1/2">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                   {service.title}
//                 </h3>
//                 <p className="text-base text-gray-600">{service.description}</p>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ExploreServices;



// ==============================


import { Link } from "react-router-dom";
import React, { useState } from "react";
// NEW (UI only): icons for the redesigned service cards + header eyebrow.
import {
  ConciergeBell,
  Home,
  Building2,
  Factory,
  Users,
  ArrowRight,
} from "lucide-react";

const ExploreServices = () => {
  const [type, setType] = useState("");

  const services = [
    {
      image: "/image/plots.jpg",
      title: "Modern Residences",
      description: "Beautifully curated residential properties perfect for individuals and families from apartments to villas",
      link: "/property",
      propertyType: "Residential",
      payloadKey: "building_type",
    },
    {
      image: "/image/leasing.jpg",
      title: "Smart Spaces for Business",
      description: "Top commercial spaces for offices, retail, and startups.",
      link: "/property",
      propertyType: "Commercial",
      payloadKey: "building_type",
    },
    {
      image: "/image/commercial.jpg",
      title: "Industrial and Investment Land",
      description: "Warehouses, industrial plots, and raw land - perfect for factories, logistics, or future projects.",
      link: "/property",
      propertyType: "Buy",
      payloadKey: "property_category_type",
    },
    {
      image: "/image/pgpg.jpg",
      title: "PG and Co-living",
      description: "Affordable and community-style living for students and working professionals with shared amenities.",
      link: "/property",
      propertyType: "PG/Co-living",
      payloadKey: "property_category_type",
    }
  ];

  // ==========================================================
  // NEW (UI only): picks the card icon from the EXISTING
  // `propertyType` value already in the services array above.
  // Nothing was added to that array and no icon is hardcoded
  // per card — change a propertyType and the icon follows.
  // ==========================================================
  const getServiceIcon = (propertyType) => {
    switch (propertyType) {
      case "Residential":
        return Home;
      case "Commercial":
        return Building2;
      case "PG/Co-living":
        return Users;
      default:
        // "Buy" -> Industrial and Investment Land
        return Factory;
    }
  };

  return (
    <div className="bg-white py-8">

      {/* ==================== NEW (UI ONLY): animations + brand styling ====================
          Purely presentational. Class names are `es-` prefixed so they can never clash
          with the other sections when several render on the same page. */}
      <style>{`
        @keyframes esFadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .es-fade-up { animation: esFadeUp .55s cubic-bezier(.22,.61,.36,1) both; }
        .es-delay-1 { animation-delay: .06s; }
        .es-delay-2 { animation-delay: .12s; }
        .es-delay-3 { animation-delay: .18s; }

        @keyframes esPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(214,31,69,0.22); }
          50%      { box-shadow: 0 0 0 7px rgba(214,31,69,0); }
        }
        .es-pulse { animation: esPulse 2.8s ease-out infinite; }
      `}</style>

      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* UI: soft pink panel wrapping the header + the services grid */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#FDF5F7] to-[#FBEEF1] px-4 pt-6 pb-8 sm:px-6 lg:px-8">

          {/* NEW: faint skyline watermark behind the header (decorative) */}
          <svg
            aria-hidden="true"
            className="absolute top-0 right-0 pointer-events-none select-none w-[55%] h-[190px] sm:h-[210px]"
            viewBox="0 0 900 210"
            preserveAspectRatio="none"
          >
            <g fill="#D61F45" opacity="0.07">
              <rect x="26" y="126" width="34" height="84" />
              <rect x="68" y="88" width="26" height="122" />
              <rect x="102" y="138" width="40" height="72" />
              <rect x="150" y="66" width="24" height="144" />
              <rect x="182" y="110" width="36" height="100" />
              <rect x="226" y="146" width="30" height="64" />
              <rect x="264" y="94" width="32" height="116" />
              <rect x="304" y="124" width="42" height="86" />
              <rect x="356" y="74" width="26" height="136" />
              <rect x="390" y="130" width="36" height="80" />
              <rect x="434" y="102" width="28" height="108" />
              <rect x="470" y="150" width="44" height="60" />
              <rect x="522" y="116" width="30" height="94" />
              <rect x="560" y="80" width="24" height="130" />
              <rect x="592" y="140" width="40" height="70" />
              <rect x="640" y="106" width="28" height="104" />
              <rect x="676" y="128" width="36" height="82" />
              <rect x="720" y="70" width="22" height="140" />
              <rect x="750" y="118" width="44" height="92" />
              <rect x="802" y="152" width="30" height="58" />
              <rect x="840" y="98" width="34" height="112" />
            </g>
          </svg>

          {/* z-10 keeps the real content above the watermark */}
          <div className="relative z-10">

            {/* ==================== NEW HEADER ==================== */}
            <div className="flex flex-col gap-3 mb-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex flex-col">

                {/* NEW: eyebrow with service icon + trailing rule */}
                <div className="flex items-center gap-2 mb-2 es-fade-up">
                  <span className="flex items-center justify-center flex-shrink-0 rounded-full w-6 h-6 bg-[#D61F45]">
                    <ConciergeBell size={13} className="text-white" strokeWidth={2.4} />
                  </span>
                  <span className="text-[11px] sm:text-xs font-bold tracking-[0.18em] text-[#D61F45] uppercase whitespace-nowrap">
                    Our Services
                  </span>
                  <span className="hidden sm:block h-px w-12 bg-[#D61F45]/35" />
                </div>

                {/* UI: two-tone headline replaces the old "Explore our services" h2 */}
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-[#172033] sm:text-3xl lg:text-4xl es-fade-up es-delay-1">
                  Explore Premium{" "}
                  <span className="text-[#D61F45]">Real Estate Services</span>
                </h2>

                <p className="text-[15px] text-[#64748B] sm:text-base es-fade-up es-delay-2">
                  From modern homes to commercial spaces — find the perfect property for every need.
                </p>
              </div>

              {/* NEW: "View All Services" pill.
                  Every service card below already routes to /property, so this points
                  at the same place with no propertyType filter (i.e. "all"). Repoint
                  the `to` here if you have a dedicated services page. */}
              <Link
                to={{ pathname: "/property" }}
                className="group inline-flex items-center justify-center flex-shrink-0 gap-2 self-start px-5 py-2.5 text-sm font-semibold text-[#D61F45] bg-white border border-[#D61F45] rounded-full no-underline hover:no-underline transition-all duration-300 hover:bg-[#D61F45] hover:text-white hover:shadow-lg hover:shadow-[#D61F45]/25 sm:px-6 es-fade-up es-delay-3"
              >
                View All Services
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 lg:gap-6 ">
              {services.map((service, index) => {
                // Icon derived from this service's own propertyType (see helper above)
                const ServiceIcon = getServiceIcon(service.propertyType);

                return (
                  <Link
                    key={index}
                    to={{
                      pathname: service.link,
                      state: { propertyType: service.propertyType },
                    }}
                    className="group flex items-center gap-3 bg-white rounded-2xl border border-[#F1D9DF] shadow-[0_2px_12px_rgba(17,24,39,0.05)] p-3 no-underline text-gray-800 hover:no-underline transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(214,31,69,0.14)] hover:border-[#F7C3CE] es-fade-up"
                    style={{ animationDelay: `${0.18 + index * 0.07}s` }}
                  >
                    {/* Images Section - Left Side */}
                    {/* UI: collage re-laid out to 1 tall image + 2 stacked, per the
                        design. Same three <img> tags and the same service.image src. */}
                    <div className="flex flex-shrink-0 gap-2 w-[36%] lg:w-[40%] overflow-hidden">
                      <div className="w-3/5 h-[104px] overflow-hidden rounded-lg">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        />
                      </div>

                      {/* Vertical Images */}
                      <div className="flex flex-col w-2/5 gap-2">
                        <div className="h-[48px] overflow-hidden rounded-lg">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                          />
                        </div>
                        <div className="h-[48px] overflow-hidden rounded-lg">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                          />
                        </div>
                      </div>
                    </div>

                    {/* NEW: pink icon badge, derived from service.propertyType */}
                    <span
                      className={`flex items-center justify-center flex-shrink-0 rounded-full w-10 h-10 lg:w-12 lg:h-12 bg-[#FDE8EC] transition-transform duration-300 group-hover:scale-110 ${index === 0 ? "es-pulse" : ""
                        }`}
                    >
                      <ServiceIcon size={21} className="text-[#D61F45]" strokeWidth={2.2} />
                    </span>

                    {/* Text Section - Right Side */}
                    <div className="flex-1 min-w-0">
                      <h3 className="mb-1 text-[15px] sm:text-base font-bold leading-snug text-[#172033]">
                        {service.title}
                      </h3>
                      <p className="m-0 text-[12.5px] leading-[1.45] text-[#64748B]">
                        {service.description}
                      </p>
                    </div>

                    {/* NEW: circular go arrow on the right, per the design */}
                    <span className="hidden lg:flex items-center justify-center flex-shrink-0 rounded-full w-9 h-9 bg-[#FDE8EC] transition-all duration-300 group-hover:bg-[#D61F45]">
                      <ArrowRight
                        size={15}
                        className="text-[#D61F45] transition-colors duration-300 group-hover:text-white"
                      />
                    </span>
                  </Link>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreServices;