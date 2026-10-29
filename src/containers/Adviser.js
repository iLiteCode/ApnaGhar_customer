// import { Link } from "react-router-dom";
// import React, { useEffect, useState } from "react";

// const Adviser = ({ data }) => {
//   const [propertyCounts, setPropertyCounts] = useState({
//     Owner: 0,
//     Broker: 0,
//     Developer: 0,
//   });
//   const [ownerPropertyCount, setOwnerPropertyCount] = useState(0);
//   const [agentPropertyCount, setAgentPropertyCount] = useState(0);
//   const [builderPropertyCount, setBuilderPropertyCount] = useState(0);
//   const [upcomingProjectCount, setUpcomingProjectCount] = useState(0);
//   const [rawCounts, setRawCounts] = useState({
//     owner: 0,
//     agent: 0,
//     builder: 0,
//   });

//   const fetchCounts = async () => {
//     try {
//       if (data && data.status === 1 && Array.isArray(data.data)) {
//         const {
//           owner_property_count,
//           agent_property_count,
//           builder_property_count,
//         } = data;

//         animateCount(owner_property_count, setOwnerPropertyCount);
//         animateCount(agent_property_count, setAgentPropertyCount);
//         animateCount(builder_property_count, setBuilderPropertyCount);
//         animateCount(20, setUpcomingProjectCount); 
//       }
//     } catch (error) {
//       console.error("Error fetching property counts:", error);
//     }
//   };

//   useEffect(() => {
//     fetchCounts();
//   }, [data]);

//   const animateCount = (target, setFn) => {
//     let count = 0;
//     const maxDisplay = target > 50 ? 50 : target;

//     const interval = setInterval(() => {
//       count++;
//       if (count >= maxDisplay) {
//         clearInterval(interval);
//         setFn(target > 50 ? "50+" : target);
//       } else {
//         setFn(count);
//       }
//     }, 50);
//   };

//   return (
//     <div className="bg-white py-6">
//       <div className="max-w-9xl mx-auto px-10">
//         <h2 className="text-2xl sm:text-4xl text-gray-900 ">Select Category</h2>
//         <p className="text-gray-500 mb-8 text-[18px]">
//           Go from browsing to buying
//         </p>
//         {/* adviser Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {/* adviser 1 */}
//           <Link
//             to={`/advisordashboard?label=Owner`}
//             className="flex items-center bg-slate-100 rounded-2xl 
//             transform hover:scale-105 p-3 no-underline text-gray-800 hover:no-underline"
//           >
//             <div
//               className="w-1/3
//             "
//             >
//               <div className="w-full h-16 mb-2">
//                 <img
//                   src="/image/commercial.jpg"
//                   alt="Buying property"
//                   className="w-full h-full object-cover rounded-2xl"
//                 />
//               </div>
//               <div className="flex space-x-2">
//                 <div className="w-full h-16">
//                   <img
//                     src="/image/commercial.jpg"
//                     alt="Buying property"
//                     className="w-full h-full object-cover rounded-2xl"
//                   />
//                 </div>
//                 <div className="w-full h-16">
//                   <img
//                     src="/image/commercial.jpg"
//                     alt="Buying property"
//                     className="w-full h-full object-cover rounded-2xl"
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="ml-4 w-1/2">
//               <h3 className="text-3xl font-semibold text-rose-800 mb-2">
//                 {ownerPropertyCount}
//               </h3>
//               <p className="text-md text-gray-600 font-bold">Owner</p>
//               <p className="text-lg my-text flex items-center">
//                 Explore <span className="ml-2 text-rose-800">&#8594;</span>
//               </p>
//             </div>
//           </Link>

//           {/* adviser 2 */}
//           {/* <Link
//             to={`/advisordashboard?label=Agent`}
//             className="flex items-center bg-slate-100 rounded-2xl  transform hover:scale-105 p-3 no-underline text-gray-800 hover:no-underline"
//           >
//             <div className="w-1/3">
//               <div className="w-full h-16 mb-2">
//                 <img
//                   src="/image/leasing.jpg"
//                   alt="Leasing property"
//                   className="w-full h-full object-cover rounded-2xl"
//                 />
//               </div>
//               <div className="flex space-x-2">
//                 <div className="w-1/2 h-16">
//                   <img
//                     src="/image/leasing.jpg"
//                     alt="Leasing property"
//                     className="w-full h-full object-cover rounded-2xl"
//                   />
//                 </div>
//                 <div className="w-1/2 h-16">
//                   <img
//                     src="/image/leasing.jpg"
//                     alt="Leasing property"
//                     className="w-full h-full object-cover rounded-2xl"
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="ml-4 w-1/2">
//               <h3 className="text-3xl font-semibold text-rose-800 mb-2">
//                 {agentPropertyCount}
//               </h3>
//               <p className="text-md text-gray-600 font-bold">Agent</p>
//               <p className="text-lg my-text flex items-center">
//                 Explore <span className="ml-2 text-rose-800">&#8594;</span>
//               </p>
//             </div>
//           </Link> */}

//           {/* adviser 3 */}
//           <Link
//             to={`/advisordashboard?label=Builder`}
//             className="flex items-center bg-slate-100 rounded-2xl transform hover:scale-105 p-3 no-underline text-gray-800 hover:no-underline"
//           >
//             <div className="w-1/3">
//               <div className="w-full h-16 mb-2">
//                 <img
//                   src="/image/plots.jpg"
//                   alt="Buy Plots/Land"
//                   className="w-full h-full object-cover rounded-2xl"
//                 />
//               </div>
//               <div className="flex space-x-2">
//                 <div className="w-1/2 h-16">
//                   <img
//                     src="/image/plots.jpg"
//                     alt="Buy Plots/Land"
//                     className="w-full h-full object-cover rounded-2xl"
//                   />
//                 </div>
//                 <div className="w-1/2 h-16">
//                   <img
//                     src="/image/plots.jpg"
//                     alt="Buy Plots/Land"
//                     className="w-full h-full object-cover rounded-2xl"
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="ml-4 w-1/2">
//               <h3 className="text-3xl font-semibold text-rose-800 mb-2">
//                 {builderPropertyCount}
//               </h3>
//               <p className="text-md text-gray-600 font-bold">Builders</p>
//               <p className="text-lg my-text flex items-center">
//                 Explore <span className="ml-2 text-rose-800">&#8594;</span>
//               </p>
//             </div>
//           </Link>


//           {/* adviser 3 - Upcoming Projects */}

// <Link
//   to={`/advisordashboard?label=Builder`}
//   className="flex items-center bg-slate-100 rounded-2xl transform hover:scale-105 p-3 no-underline text-gray-800 hover:no-underline"
// >
//   <div className="w-1/3">

//     <div className="w-full h-16 mb-2">
//       <img
//         src="/image/BuilderProject.jpg"
//         alt="Upcoming Projects"
//         className="w-full h-full object-cover rounded-2xl"
//       />
//     </div>

//     <div className="flex gap-2">

//       <div className="w-1/2 h-16">
//         <img
//           src="/image/BuilderProject.jpg"
//           alt=""
//           className="w-full h-full object-cover rounded-2xl"
//         />
//       </div>

//       <div className="w-1/2 h-16">
//         <img
//           src="/image/BuilderProject.jpg"
//           alt=""
//           className="w-full h-full object-cover rounded-2xl"
//         />
//       </div>

//     </div>

//   </div>

//   <div className="ml-4 w-1/2">

//   <h3 className="text-3xl font-semibold text-rose-800 mb-2">
//   {upcomingProjectCount}{typeof upcomingProjectCount === "number" && upcomingProjectCount === 20 ? "+" : ""}
// </h3>

//     <p className="text-md text-gray-700 font-bold">
//       Upcoming Projects
//     </p>

//     <p className="text-lg my-text flex items-center">
//       Explore
//       <span className="ml-2 text-rose-800">
//         →
//       </span>
//     </p>

//   </div>

// </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Adviser;


// ============================================================================================================


import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
// NEW (UI only): icons for the redesigned category cards + header eyebrow.
import { LayoutGrid, UserRound, Building2, Rocket, ArrowRight } from "lucide-react";

const Adviser = ({ data }) => {
  const [propertyCounts, setPropertyCounts] = useState({
    Owner: 0,
    Broker: 0,
    Developer: 0,
  });
  const [ownerPropertyCount, setOwnerPropertyCount] = useState(0);
  const [agentPropertyCount, setAgentPropertyCount] = useState(0);
  const [builderPropertyCount, setBuilderPropertyCount] = useState(0);
  const [upcomingProjectCount, setUpcomingProjectCount] = useState(0);
  const [rawCounts, setRawCounts] = useState({
    owner: 0,
    agent: 0,
    builder: 0,
  });

  const fetchCounts = async () => {
    try {
      if (data && data.status === 1 && Array.isArray(data.data)) {
        const {
          owner_property_count,
          agent_property_count,
          builder_property_count,
        } = data;

        animateCount(owner_property_count, setOwnerPropertyCount);
        animateCount(agent_property_count, setAgentPropertyCount);
        animateCount(builder_property_count, setBuilderPropertyCount);
        animateCount(20, setUpcomingProjectCount);
      }
    } catch (error) {
      console.error("Error fetching property counts:", error);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, [data]);

  const animateCount = (target, setFn) => {
    let count = 0;
    const maxDisplay = target > 50 ? 50 : target;

    const interval = setInterval(() => {
      count++;
      if (count >= maxDisplay) {
        clearInterval(interval);
        setFn(target > 50 ? "50+" : target);
      } else {
        setFn(count);
      }
    }, 50);
  };

  return (
    <div className="bg-white py-6">

      {/* ==================== NEW (UI ONLY): animations + brand styling ====================
          Purely presentational. Class names are `ad-` prefixed so they can never clash
          with the other sections when several render on the same page. */}
      <style>{`
        @keyframes adFadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ad-fade-up { animation: adFadeUp .55s cubic-bezier(.22,.61,.36,1) both; }
        .ad-delay-1 { animation-delay: .06s; }
        .ad-delay-2 { animation-delay: .12s; }
        .ad-delay-3 { animation-delay: .18s; }
        .ad-delay-4 { animation-delay: .26s; }
        .ad-delay-5 { animation-delay: .34s; }

        @keyframes adSweep { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .ad-sweep { transform-origin: left center; animation: adSweep .7s .3s ease-out both; }

        @keyframes adPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(214,31,69,0.22); }
          50%      { box-shadow: 0 0 0 7px rgba(214,31,69,0); }
        }
        .ad-pulse { animation: adPulse 2.8s ease-out infinite; }
      `}</style>

      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* UI: soft pink panel wrapping the header + the category grid */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#FDF5F7] to-[#FBEEF1] px-4 pt-6 pb-8 sm:px-6 lg:px-8">

          {/* NEW: faint skyline watermark with birds (decorative) */}
          <svg
            aria-hidden="true"
            className="absolute top-0 right-0 pointer-events-none select-none w-[60%] h-[210px] sm:h-[240px]"
            viewBox="0 0 900 240"
            preserveAspectRatio="none"
          >
            <g fill="#D61F45" opacity="0.07">
              <rect x="20" y="150" width="34" height="90" />
              <rect x="62" y="110" width="26" height="130" />
              <rect x="96" y="164" width="40" height="76" />
              <rect x="144" y="88" width="24" height="152" />
              <rect x="176" y="134" width="36" height="106" />
              <rect x="220" y="172" width="28" height="68" />
              <rect x="256" y="116" width="32" height="124" />
              <rect x="296" y="148" width="42" height="92" />
              <rect x="346" y="96" width="26" height="144" />
              <rect x="380" y="156" width="36" height="84" />
              <rect x="424" y="126" width="28" height="114" />
              <rect x="460" y="176" width="44" height="64" />
              <rect x="512" y="140" width="30" height="100" />
              <rect x="550" y="102" width="24" height="138" />
              <rect x="582" y="166" width="40" height="74" />
              <rect x="630" y="130" width="28" height="110" />
              <rect x="666" y="152" width="36" height="88" />
              <rect x="710" y="92" width="22" height="148" />
              <rect x="740" y="142" width="44" height="98" />
              <rect x="792" y="180" width="30" height="60" />
              <rect x="830" y="122" width="34" height="118" />
            </g>
            {/* birds */}
            <g stroke="#D61F45" strokeWidth="2" fill="none" opacity="0.16">
              <path d="M690 42 q7 -7 14 0 q7 -7 14 0" />
              <path d="M736 26 q5 -5 10 0 q5 -5 10 0" />
              <path d="M762 56 q6 -6 12 0 q6 -6 12 0" />
              <path d="M812 36 q6 -6 12 0 q6 -6 12 0" />
            </g>
          </svg>

          {/* z-10 keeps the real content above the watermark */}
          <div className="relative z-10">

            {/* ==================== NEW HEADER ==================== */}
            <div className="flex flex-col gap-3 mb-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex flex-col">

                {/* NEW: eyebrow with grid icon + trailing rule */}
                <div className="flex items-center gap-2 mb-2 ad-fade-up">
                  <LayoutGrid size={16} className="text-[#D61F45] flex-shrink-0" strokeWidth={2.4} />
                  <span className="text-[11px] sm:text-xs font-bold tracking-[0.18em] text-[#D61F45] uppercase whitespace-nowrap">
                    Explore by Category
                  </span>
                  <span className="hidden sm:block h-px w-12 bg-[#D61F45]/35" />
                </div>

                {/* UI: two-tone headline replaces the old "Select Category" h2 */}
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-[#172033] sm:text-3xl lg:text-4xl ad-fade-up ad-delay-1">
                  Find Your Perfect{" "}
                  <span className="text-[#D61F45]">Property Category</span>
                </h2>

                <p className="text-[15px] text-[#64748B] sm:text-base ad-fade-up ad-delay-2">
                  Choose from top real estate categories to start your property journey.
                </p>
              </div>

              {/* NEW: handwritten accent (decorative only) */}
              <div
                className="flex-shrink-0 hidden leading-tight text-right xl:block text-[#D61F45] ad-fade-up ad-delay-3"
                style={{
                  fontFamily:
                    "'Segoe Script','Bradley Hand','Brush Script MT',cursive",
                }}
              >
                <span className="block text-lg">Explore</span>
                <span className="block text-lg">More Options</span>
                <span className="block w-28 h-px mt-1 ml-auto bg-[#D61F45]/60 ad-sweep" />
              </div>
            </div>

            {/* adviser Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">

              {/* adviser 1 */}
              {/* UI: white card, collage on the left, icon + count + copy + Explore pill on the right.
                  The `to` target and {ownerPropertyCount} are unchanged. */}
              <Link
                to={`/advisordashboard?label=Owner`}
                className="group flex items-center gap-3 bg-white rounded-2xl border border-[#F1D9DF] shadow-[0_2px_12px_rgba(17,24,39,0.05)] p-3 no-underline text-gray-800 hover:no-underline transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(214,31,69,0.14)] hover:border-[#F7C3CE] ad-fade-up ad-delay-3"
              >
                {/* Image collage — same three <img> tags and same src as before */}
                <div className="flex flex-shrink-0 gap-2 w-[42%] overflow-hidden">
                  <div className="w-3/5 h-[118px] overflow-hidden rounded-xl">
                    <img
                      src="/image/commercial.jpg"
                      alt="Buying property"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-col w-2/5 gap-2">
                    <div className="h-[55px] overflow-hidden rounded-xl">
                      <img
                        src="/image/commercial.jpg"
                        alt="Buying property"
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                      />
                    </div>
                    <div className="h-[55px] overflow-hidden rounded-xl">
                      <img
                        src="/image/commercial.jpg"
                        alt="Buying property"
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5">
                    <span className="flex items-center justify-center flex-shrink-0 rounded-full w-11 h-11 bg-[#FDE8EC] ad-pulse">
                      <UserRound size={20} className="text-[#D61F45]" strokeWidth={2.2} />
                    </span>
                    <div className="min-w-0">
                      {/* Count — value unchanged. The trailing "+" only renders when
                          the animated value is a real number above zero, so it can
                          never read "0+". Delete the {…} to show the bare number. */}
                      <h3 className="m-0 text-2xl font-extrabold leading-none text-[#D61F45]">
                        {ownerPropertyCount}
                        {typeof ownerPropertyCount === "number" && ownerPropertyCount > 0 ? "+" : ""}
                      </h3>
                      <p className="mt-1 mb-0 text-[13px] font-bold leading-tight text-[#172033]">
                        Owner Properties
                      </p>
                    </div>
                  </div>

                  {/* NEW: static description copy */}
                  <p className="mt-2 mb-0 text-[12px] leading-4 text-[#64748B]">
                    Direct owner listings for better deals
                  </p>

                  <div className="flex justify-end mt-3">
                    <span className="my-text inline-flex items-center gap-1.5 px-4 py-1.5 text-[12px] font-semibold text-white rounded-full bg-[#D61F45] shadow-sm transition-all duration-300 group-hover:bg-[#B91C3C] group-hover:shadow-md">
                      Explore
                      <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>

              {/* adviser 2 */}
              {/* <Link
            to={`/advisordashboard?label=Agent`}
            className="flex items-center bg-slate-100 rounded-2xl  transform hover:scale-105 p-3 no-underline text-gray-800 hover:no-underline"
          >
            <div className="w-1/3">
              <div className="w-full h-16 mb-2">
                <img
                  src="/image/leasing.jpg"
                  alt="Leasing property"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              <div className="flex space-x-2">
                <div className="w-1/2 h-16">
                  <img
                    src="/image/leasing.jpg"
                    alt="Leasing property"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
                <div className="w-1/2 h-16">
                  <img
                    src="/image/leasing.jpg"
                    alt="Leasing property"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              </div>
            </div>
            <div className="ml-4 w-1/2">
              <h3 className="text-3xl font-semibold text-rose-800 mb-2">
                {agentPropertyCount}
              </h3>
              <p className="text-md text-gray-600 font-bold">Agent</p>
              <p className="text-lg my-text flex items-center">
                Explore <span className="ml-2 text-rose-800">&#8594;</span>
              </p>
            </div>
          </Link> */}

              {/* adviser 3 */}
              <Link
                to={`/advisordashboard?label=Builder`}
                className="group flex items-center gap-3 bg-white rounded-2xl border border-[#F1D9DF] shadow-[0_2px_12px_rgba(17,24,39,0.05)] p-3 no-underline text-gray-800 hover:no-underline transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(214,31,69,0.14)] hover:border-[#F7C3CE] ad-fade-up ad-delay-4"
              >
                <div className="flex flex-shrink-0 gap-2 w-[42%] overflow-hidden">
                  <div className="w-3/5 h-[118px] overflow-hidden rounded-xl">
                    <img
                      src="/image/plots.jpg"
                      alt="Buy Plots/Land"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-col w-2/5 gap-2">
                    <div className="h-[55px] overflow-hidden rounded-xl">
                      <img
                        src="/image/plots.jpg"
                        alt="Buy Plots/Land"
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                      />
                    </div>
                    <div className="h-[55px] overflow-hidden rounded-xl">
                      <img
                        src="/image/plots.jpg"
                        alt="Buy Plots/Land"
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5">
                    <span className="flex items-center justify-center flex-shrink-0 rounded-full w-11 h-11 bg-[#FDE8EC]">
                      <Building2 size={20} className="text-[#D61F45]" strokeWidth={2.2} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="m-0 text-2xl font-extrabold leading-none text-[#D61F45]">
                        {builderPropertyCount}
                        {typeof builderPropertyCount === "number" && builderPropertyCount > 0 ? "+" : ""}
                      </h3>
                      <p className="mt-1 mb-0 text-[13px] font-bold leading-tight text-[#172033]">
                        Builder Projects
                      </p>
                    </div>
                  </div>

                  {/* NEW: static description copy */}
                  <p className="mt-2 mb-0 text-[12px] leading-4 text-[#64748B]">
                    Explore premium projects from top builders
                  </p>

                  <div className="flex justify-end mt-3">
                    <span className="my-text inline-flex items-center gap-1.5 px-4 py-1.5 text-[12px] font-semibold text-white rounded-full bg-[#D61F45] shadow-sm transition-all duration-300 group-hover:bg-[#B91C3C] group-hover:shadow-md">
                      Explore
                      <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>


              {/* adviser 3 - Upcoming Projects */}

              <Link
                to={`/advisordashboard?label=Builder`}
                className="group flex items-center gap-3 bg-white rounded-2xl border border-[#F1D9DF] shadow-[0_2px_12px_rgba(17,24,39,0.05)] p-3 no-underline text-gray-800 hover:no-underline transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(214,31,69,0.14)] hover:border-[#F7C3CE] ad-fade-up ad-delay-5"
              >
                <div className="flex flex-shrink-0 gap-2 w-[42%] overflow-hidden">

                  <div className="w-3/5 h-[118px] overflow-hidden rounded-xl">
                    <img
                      src="/image/BuilderProject.jpg"
                      alt="Upcoming Projects"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                  </div>

                  <div className="flex flex-col w-2/5 gap-2">

                    <div className="h-[55px] overflow-hidden rounded-xl">
                      <img
                        src="/image/BuilderProject.jpg"
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                      />
                    </div>

                    <div className="h-[55px] overflow-hidden rounded-xl">
                      <img
                        src="/image/BuilderProject.jpg"
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                      />
                    </div>

                  </div>

                </div>

                <div className="flex-1 min-w-0">

                  <div className="flex items-center gap-2.5">
                    <span className="flex items-center justify-center flex-shrink-0 rounded-full w-11 h-11 bg-[#FDE8EC]">
                      <Rocket size={20} className="text-[#D61F45]" strokeWidth={2.2} />
                    </span>
                    <div className="min-w-0">
                      {/* Count + "+" — the original condition (=== 20) is preserved and
                          widened to `>= 20` so it still shows if that seed value changes. */}
                      <h3 className="m-0 text-2xl font-extrabold leading-none text-[#D61F45]">
                        {upcomingProjectCount}{typeof upcomingProjectCount === "number" && upcomingProjectCount >= 20 ? "+" : ""}
                      </h3>
                      <p className="mt-1 mb-0 text-[13px] font-bold leading-tight text-[#172033]">
                        Upcoming Projects
                      </p>
                    </div>
                  </div>

                  {/* NEW: static description copy */}
                  <p className="mt-2 mb-0 text-[12px] leading-4 text-[#64748B]">
                    Discover upcoming projects in prime locations
                  </p>

                  <div className="flex justify-end mt-3">
                    <span className="my-text inline-flex items-center gap-1.5 px-4 py-1.5 text-[12px] font-semibold text-white rounded-full bg-[#D61F45] shadow-sm transition-all duration-300 group-hover:bg-[#B91C3C] group-hover:shadow-md">
                      Explore
                      <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>

                </div>

              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Adviser;