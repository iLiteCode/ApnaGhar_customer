// import React, { useEffect, useState } from "react";
// import { FaSearch, FaSort } from "react-icons/fa";
// import { FiSmartphone } from "react-icons/fi";
// import { User } from "@phosphor-icons/react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { IoMdClose } from "react-icons/io";
// import { FaRupeeSign } from "react-icons/fa";

// const MyLeads = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalCount, setTotalCount] = useState(0);
//   const [search, setSearch] = useState("");
//   const [sortBy, setSortBy] = useState("latest");
//   const [leads, setLeads] = useState([]);
//   const [activeTab, setActiveTab] = useState("property");
//   const user_id = sessionStorage.getItem("accessToken");
//   const itemsPerPage = 10;
//   const totalPages = Math.ceil(totalCount / itemsPerPage);

//   const formatPrice = (price) => {
//   if (!price) return "";

//   price = Number(price);

//   if (price >= 10000000) {
//     return `${(price / 10000000).toFixed(2).replace(/\.?0+$/, "")} Cr`;
//   } else if (price >= 100000) {
//     return `${(price / 100000).toFixed(2).replace(/\.?0+$/, "")} L`;
//   } else if (price >= 1000) {
//     return `${(price / 1000).toFixed(2).replace(/\.?0+$/, "")} K`;
//   } else {
//     return price.toString();
//   }
// };

//   const formatAverageProjectPrice = (price) => {
//     if (!price) return "";

//     const formatValue = (val) => {
//   if (val === null || val === undefined) return "";
//   return formatPrice(Number(val));
// };
//     let values;
//     if (typeof price === "string" && /[-–—]/.test(price)) {
//       values = price
//         .split(/[-–—]/)
//         .map((p) => p.trim())
//         .filter(Boolean);
//     } else {
//       values = [price];
//     }

//     return (
//       <>
//         {values.map((v, idx) => (
//           <span key={idx} className="inline-flex items-center">
//             <FaRupeeSign className="inline-block mr-1" />
//             {formatValue(v)}
//             {idx === 0 && values.length > 1 && " - "}
//           </span>
//         ))}
//       </>
//     );
//   };

//   useEffect(() => {
//     const fetchLeads = async () => {
//       const formData = new FormData();
//       formData.append("user_id", user_id);
//       formData.append("page", currentPage);
//       formData.append("page_size", itemsPerPage);
//       formData.append("search", search);
//       formData.append("sortby", sortBy);

//       const endpoint =
//         activeTab === "property"
//           ? "/cust_api/get_property_enquiry"
//           : "/cust_api/get_project_enquiry";

//       try {
//         const response = await axios.post(
//           `${process.env.REACT_APP_API_URL}${endpoint}`,
//           formData,
//         );

//         if (response.data.status === 1) {
//           const formattedLeads = response.data.data.map((item, index) => {
//             const isProperty =
//               !!item.enquiry_property_name ||
//               !!item.enquiry_property_price ||
//               !!item.property_id;
//             const isProject =
//               !!item.enquiry_average_project_price ||
//               !!item.enquiry_project_name ||
//               !!item.project_id;

//             return {
//               id: index + 1,
//               property_id: isProperty ? item.property_id : null,
//               project_id: isProject ? item.project_id : null,
//               name: item.name,
//               type: item.user_type || "Individual",
//               phone: item.contact_number,
//               status: item.enquiry_property_category_type,
//               title: item.enquiry_property_name || item.project_name,
//               // location: item.enquiry_address || "Not provided",
//               location:
//                 item?.property_details?.address_area ||
//                 item?.project_details?.address_area ||
//                 "Not provided",
//               price: isProperty
//   ? `₹ ${formatPrice(item.enquiry_property_price)}`
//   : isProject
//     ? `₹ ${formatPrice(item.enquiry_average_project_price)}`
//     : "N/A",
//               rent: item.rent,
//               rent_duration: item.rent_duration,
//               receivedOn: new Date(item.created_at).toLocaleDateString(
//                 "en-GB",
//                 {
//                   day: "2-digit",
//                   month: "short",
//                   year: "numeric",
//                 },
//               ),
//               message: item.message || "",
//               image: item.enquiry_cover_image,
//               profile_image:
//                 item.property_owner_image || item.project_owner_image || null,
//             };
//           });
//           setLeads(formattedLeads);
//           setTotalCount(response.data.total_count);
//         }
//       } catch (error) {
//         console.error("Error fetching leads:", error);
//       }
//     };

//     fetchLeads();
//   }, [currentPage, search, sortBy, activeTab]);

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [currentPage]);

//   return (
//     <>
//       <div className="p-6 max-w-6xl mx-auto">
//         {/* Tabs */}
//         <div className="flex gap-4 mb-6 border-b">
//           <button
//             className={`px-4 py-2 font-semibold border-b-2 ${
//               activeTab === "property"
//                 ? "border-rose-600 my-text"
//                 : "border-transparent text-gray-500"
//             }`}
//             onClick={() => {
//               setActiveTab("property");
//               setCurrentPage(1);
//             }}
//           >
//             Leads on Property
//           </button>
//           {!["buyer", "owner"].includes(
//             (sessionStorage.getItem("user_type") || "").toLowerCase(),
//           ) && (
//             <button
//               className={`px-4 py-2 font-semibold border-b-2 ${
//                 activeTab === "project"
//                   ? "border-rose-600 my-text"
//                   : "border-transparent text-gray-500"
//               }`}
//               onClick={() => {
//                 setActiveTab("project");
//                 setCurrentPage(1);
//               }}
//             >
//               Leads on Project
//             </button>
//           )}
//         </div>
//         {/* Header Section */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
//           <h2 className="text-2xl font-semibold">View Leads</h2>
//           <div className="flex flex-col md:flex-row items-center gap-4 mt-3 md:mt-0">
//             <div className="relative">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search listing"
//                   className="border rounded-lg pl-10 pr-10 py-2 w-72 outline-none"
//                   value={search}
//                   onChange={(e) => {
//                     setSearch(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                 />

//                 {/* Clear (cross) button */}
//                 {search && (
//                   <button
//                     onClick={() => {
//                       setSearch("");
//                       setCurrentPage(1);
//                     }}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-900 text-lg"
//                   >
//                     <IoMdClose />
//                   </button>
//                 )}
//               </div>

//               <FaSearch className="absolute left-3 top-3 text-gray-500" />
//             </div>
//             <button
//               className="flex items-center gap-2 border rounded-lg px-4 py-2 text-gray-600"
//               onClick={() => {
//                 setSortBy((prev) => (prev === "latest" ? "oldest" : "latest"));
//                 setCurrentPage(1);
//               }}
//             >
//               <FaSort /> Sort by:{" "}
//               <span className="font-semibold">{sortBy}</span>
//             </button>
//           </div>
//         </div>

//         {leads.length === 0 ? (
//           <p className="text-center text-gray-500 mt-10">
//             {search.trim() !== ""
//               ? "No results found for your search."
//               : "No Data Found"}
//           </p>
//         ) : (
//           leads.map((lead) => (
//             <div key={lead.id} className="bg-white rounded-lg p-3 mb-4 border">
//               <div className="flex justify-between items-center">
//                 <div className="flex items-center gap-4">
//                   <div className="bg-rose-100  rounded-full">
//                     {console.log(lead)}
//                     {lead?.profile_image ? (
//                       <img
//                         src={`${process.env.REACT_APP_API_URL}/media/${lead.profile_image}`}
//                         alt={sessionStorage.getItem("user_type") || "User"}
//                         className="w-10 h-10 rounded-full object-cover"
//                       />
//                     ) : (
//                       <User className="my-text text-4xl" />
//                     )}
//                   </div>

//                   <div className="mt-3">
//                     <p className="font-semibold mb-0">{lead.name}</p>
//                     <p className="text-gray-500 text-sm">{lead.type}</p>
//                   </div>
//                 </div>
//                 <a
//                   href={`tel:${lead.phone}`}
//                   className="flex items-center gap-1 mr-20 my-text"
//                 >
//                   <FiSmartphone /> {lead.phone}
//                 </a>
//               </div>

//               <hr className="my-4" />

//               <div className="flex gap-4 relative">
//                 <div className="relative w-36 h-24">
//                   <Link
//                     to={
//                       activeTab === "property"
//                         ? `/propertydetails/${lead.property_id}`
//                         : activeTab === "project"
//                           ? `/projectdetail/${lead.project_id}`
//                           : "#"
//                     }
//                   >
//                     <img
//                       src={
//                         lead?.image
//                           ? `${process.env.REACT_APP_API_URL}/media/${lead.image}`
//                           : "https://via.placeholder.com/400x300?text=No+Image"
//                       }
//                       alt={lead?.title || "Image"}
//                       className="w-full h-full object-cover rounded-md cursor-pointer"
//                     />
//                   </Link>
//                   {activeTab === "property" && (
//                     <span
//                       className={`absolute top-0 left-0 text-white text-xs font-semibold px-2 py-1 rounded-md ${
//                         lead.status === "Buy"
//                           ? "bg-green-600"
//                           : lead.status === "Rent"
//                             ? "bg-blue-600"
//                             : lead.status === "Residential"
//                               ? "my-bg"
//                               : "bg-yellow-600"
//                       }`}
//                     >
//                       {lead.status === "Buy"
//                         ? "For Buy"
//                         : lead.status === "Rent"
//                           ? "For Rent"
//                           : lead.status === "Residential"
//                             ? "Residential"
//                             : "Commercial"}
//                     </span>
//                   )}
//                 </div>
//                 <div className="flex-1">
//                   <p className="font-semibold mb-0">{lead.title}</p>
//                   <p className="text-gray-500 text-sm">{lead.location}</p>
//                   {lead.status === "Rent" ? (
//                     <p className="text-black font-semibold">
//                       {formatPrice(lead.rent)} / {lead.rent_duration}
//                     </p>
//                   ) : (
//                     <p className="text-black font-semibold">
//                       {/* {lead.price} */}
//                       {formatAverageProjectPrice(lead.price)}
//                     </p>
//                   )}
//                 </div>
//                 <div className="text-right text-gray-500">
//                   <p className="text-sm">Received On</p>
//                   <p className="font-semibold">{lead.receivedOn}</p>
//                 </div>
//               </div>

//               <div className="mt-3">
//                 <p className="text-gray-500 text-sm">Message</p>
//                 <p className="text-gray-700">{lead.message}</p>
//               </div>
//             </div>
//           ))
//         )}

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="flex justify-center items-center space-x-3 mt-6">
//             <button
//               className={`px-3 py-2 border rounded-full ${
//                 currentPage === 1
//                   ? "text-gray-400 cursor-not-allowed"
//                   : "hover:bg-gray-100"
//               }`}
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//             >
//               &lt;
//             </button>

//             {[...Array(totalPages)].map((_, index) => (
//               <button
//                 key={index}
//                 className={`w-10 h-10 flex items-center justify-center rounded-full text-lg font-medium ${
//                   currentPage === index + 1
//                     ? "my-border my-text"
//                     : "text-gray-500 hover:bg-gray-100"
//                 }`}
//                 onClick={() => setCurrentPage(index + 1)}
//               >
//                 {index + 1}
//               </button>
//             ))}

//             <button
//               className={`px-3 py-2 border rounded-full ${
//                 currentPage === totalPages
//                   ? "text-gray-400 cursor-not-allowed"
//                   : "hover:bg-gray-100"
//               }`}
//               onClick={() =>
//                 setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//               }
//               disabled={currentPage === totalPages}
//             >
//               &gt;
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default MyLeads;


import React, { useEffect, useState } from "react";
import {
  Users,
  House,
  Buildings,
  MagnifyingGlass,
  X,
  ArrowsDownUp,
  User,
  Phone,
  MapPin,
  CalendarBlank,
  ChatCircleText,
  CaretLeft,
  CaretRight,
  Tray,
} from "@phosphor-icons/react";
import axios from "axios";
import { Link } from "react-router-dom";

// ==========================================================
// Helpers (outside the component so they never remount)
// ==========================================================

// 4500000 -> "45 L", 12500000 -> "1.25 Cr", 20000 -> "20 K"
const formatPrice = (price) => {
  const n = Number(price);
  if (!price || Number.isNaN(n)) return "";
  const trim = (v) => v.toFixed(2).replace(/\.?0+$/, "");
  if (n >= 10000000) return `${trim(n / 10000000)} Cr`;
  if (n >= 100000) return `${trim(n / 100000)} L`;
  if (n >= 1000) return `${trim(n / 1000)} K`;
  return n.toString();
};

// Raw price or "min-max" range -> "₹ 45 L" / "₹ 30 L - ₹ 72.5 L"
const formatPriceRange = (raw) => {
  if (raw === null || raw === undefined || raw === "") return "";
  const parts = String(raw)
    .split(/[-–—]/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map(formatPrice)
    .filter(Boolean);
  return parts.map((p) => `₹ ${p}`).join(" - ");
};

// Badge on the property photo
const CATEGORY_BADGE = {
  Buy: { label: "For Buy", cls: "bg-[#8B1E3F]" },
  Rent: { label: "For Rent", cls: "bg-blue-600" },
  Residential: { label: "Residential", cls: "bg-[#D61F45]" },
};

const LeadCard = ({ lead, activeTab }) => {
  const badge = CATEGORY_BADGE[lead.status] || {
    label: "Commercial",
    cls: "bg-amber-600",
  };
  const detailsLink =
    activeTab === "property"
      ? `/propertydetails/${lead.property_id}`
      : `/projectdetail/${lead.project_id}`;

  const priceText =
    lead.status === "Rent"
      ? lead.rent
        ? `₹ ${formatPrice(lead.rent)}${lead.rent_duration ? ` / ${lead.rent_duration}` : ""}`
        : ""
      : formatPriceRange(lead.priceRaw);

  return (
    <div className="p-4 mb-4 bg-white border border-[#FDE8EC] md:p-5 rounded-2xl shadow-[0_8px_24px_rgba(214,31,69,0.06)] transition-shadow hover:shadow-[0_12px_32px_rgba(214,31,69,0.12)]">
      {/* Who sent the enquiry */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center min-w-0 gap-3">
          {lead.profile_image ? (
            <img
              src={`${process.env.REACT_APP_API_URL}/media/${lead.profile_image}`}
              alt={lead.name || "User"}
              className="flex-shrink-0 object-cover w-12 h-12 border-2 border-[#FAD3DB] rounded-full"
            />
          ) : (
            <span className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full bg-[#FDE8EC] text-[#D61F45]">
              <User size={24} weight="fill" />
            </span>
          )}
          <div className="min-w-0">
            <p className="m-0 text-[16px] font-bold text-[#17253a] truncate">
              {lead.name || "Unknown"}
            </p>
            <span className="inline-block mt-0.5 px-2 py-0.5 text-[11px] font-semibold rounded-md bg-[#FFF1F4] text-[#D61F45]">
              {lead.type}
            </span>
          </div>
        </div>

        {lead.phone && (
          <a
            href={`tel:${lead.phone}`}
            className="flex items-center gap-2 px-4 py-2 text-[14px] font-semibold no-underline text-[#D61F45] bg-white border-[1.5px] border-[#D61F45] rounded-xl transition-colors hover:bg-[#FDE8EC] hover:no-underline"
          >
            <Phone size={16} weight="fill" />
            {lead.phone}
          </a>
        )}
      </div>

      <div className="my-4 border-t border-dashed border-[#FAD3DB]" />

      {/* Which listing it was about */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-1 min-w-0 gap-4">
          <Link
            to={detailsLink}
            className="relative flex-shrink-0 block w-28 h-20 overflow-hidden sm:w-36 sm:h-24 rounded-xl bg-[#FFF1F4]"
          >
            <img
              src={
                lead.image
                  ? `${process.env.REACT_APP_API_URL}/media/${lead.image}`
                  : "https://via.placeholder.com/400x300?text=No+Image"
              }
              alt={lead.title || "Listing"}
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            />
            {activeTab === "property" && (
              <span
                className={`absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase rounded-md shadow ${badge.cls}`}
              >
                {badge.label}
              </span>
            )}
          </Link>

          <div className="min-w-0 self-center">
            <Link
              to={detailsLink}
              className="block text-[16px] font-bold text-[#17253a] no-underline truncate hover:text-[#D61F45] hover:no-underline"
            >
              {lead.title || "Untitled listing"}
            </Link>
            <p className="flex items-center gap-1 m-0 mt-1 text-[13px] text-gray-500">
              <MapPin size={14} weight="fill" className="flex-shrink-0 text-[#D61F45]" />
              <span className="truncate">{lead.location}</span>
            </p>
            {priceText && (
              <p className="m-0 mt-1 text-[16px] font-bold text-[#D61F45]">{priceText}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#FFF5F7] sm:self-center">
          <CalendarBlank size={22} weight="fill" className="text-[#D61F45]" />
          <div className="leading-tight">
            <p className="m-0 text-[11px] text-gray-500">Received On</p>
            <p className="m-0 text-[14px] font-bold text-[#17253a]">{lead.receivedOn}</p>
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="flex gap-3 p-3 mt-4 rounded-xl bg-[#FFF7F9] border border-[#FDE8EC]">
        <ChatCircleText size={20} weight="fill" className="flex-shrink-0 mt-0.5 text-[#D61F45]" />
        <div className="min-w-0">
          <p className="m-0 text-[12px] font-semibold text-gray-500">Message</p>
          <p className="m-0 mt-0.5 text-[14px] text-[#17253a] break-words">
            {lead.message || <span className="italic text-gray-400">No message added</span>}
          </p>
        </div>
      </div>
    </div>
  );
};

const MyLeads = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [leads, setLeads] = useState([]);
  const [activeTab, setActiveTab] = useState("property");
  const [isLoading, setIsLoading] = useState(false);
  const user_id = sessionStorage.getItem("accessToken");
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const showProjectTab = !["buyer", "owner"].includes(
    (sessionStorage.getItem("user_type") || "").toLowerCase(),
  );

  useEffect(() => {
    const fetchLeads = async () => {
      const formData = new FormData();
      formData.append("user_id", user_id);
      formData.append("page", currentPage);
      formData.append("page_size", itemsPerPage);
      formData.append("search", search);
      formData.append("sortby", sortBy);

      const endpoint =
        activeTab === "property"
          ? "/cust_api/get_property_enquiry"
          : "/cust_api/get_project_enquiry";

      setIsLoading(true);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}${endpoint}`,
          formData,
        );

        if (response.data.status === 1) {
          const formattedLeads = response.data.data.map((item, index) => {
            const isProperty =
              !!item.enquiry_property_name ||
              !!item.enquiry_property_price ||
              !!item.property_id;
            const isProject =
              !!item.enquiry_average_project_price ||
              !!item.enquiry_project_name ||
              !!item.project_id;

            return {
              id: item._id || `${currentPage}-${index}`,
              property_id: isProperty ? item.property_id : null,
              project_id: isProject ? item.project_id : null,
              name: item.name,
              type: item.user_type || "Individual",
              phone: item.contact_number,
              status: item.enquiry_property_category_type,
              title: item.enquiry_property_name || item.project_name,
              location:
                item?.property_details?.address_area ||
                item?.project_details?.address_area ||
                "Not provided",
              // FIX: keep the RAW price and format it once when rendering.
              // It used to be stored as "₹ 45 L" and then formatted again,
              // which turned it into an empty string — so no price showed.
              priceRaw: isProperty
                ? item.enquiry_property_price
                : isProject
                  ? item.enquiry_average_project_price
                  : null,
              rent: item.rent,
              rent_duration: item.rent_duration,
              receivedOn: new Date(item.created_at).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }),
              message: item.message || "",
              image: item.enquiry_cover_image,
              profile_image:
                item.property_owner_image || item.project_owner_image || null,
            };
          });
          setLeads(formattedLeads);
          setTotalCount(response.data.total_count || 0);
        } else {
          // FIX: clear the old list, otherwise the previous tab's leads stayed on screen
          setLeads([]);
          setTotalCount(0);
        }
      } catch (error) {
        console.error("Error fetching leads:", error);
        setLeads([]);
        setTotalCount(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeads();
  }, [currentPage, search, sortBy, activeTab]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const switchTab = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const tabClass = (tab) =>
    `flex items-center justify-center gap-2 px-5 py-2.5 text-[14px] font-semibold rounded-xl transition-all ${activeTab === tab
      ? "bg-gradient-to-r from-[#D61F45] to-[#B91C3C] text-white shadow-[0_6px_16px_rgba(214,31,69,0.3)]"
      : "text-gray-600 hover:text-[#D61F45] hover:bg-[#FFF1F4]"
    }`;

  return (
    <div className="w-full">
      {/* ==================================================
          Header banner
      ================================================== */}
      <div className="relative flex flex-col gap-4 p-5 overflow-hidden border border-[#FDE8EC] rounded-2xl bg-gradient-to-r from-[#FFF1F4] via-[#FDE8EC] to-[#FAD3DB] sm:flex-row sm:items-center sm:justify-between md:px-6">
        <Users
          size={150}
          weight="thin"
          className="absolute hidden pointer-events-none right-4 -bottom-8 text-[#D61F45] opacity-10 md:block"
        />

        <div className="relative flex items-center gap-4">
          <span className="flex items-center justify-center flex-shrink-0 w-16 h-16 text-white rounded-full bg-gradient-to-br from-[#D61F45] to-[#B91C3C] shadow-[0_8px_20px_rgba(214,31,69,0.35)]">
            <Users size={30} weight="fill" />
          </span>
          <div>
            <h2 className="m-0 text-2xl font-bold text-[#17253a] md:text-[28px]">
              My <span className="text-[#D61F45]">Leads</span>
            </h2>
            <p className="m-0 mt-0.5 text-[14px] text-gray-600">
              Every enquiry on your listings, in one place
            </p>
          </div>
        </div>

        <div className="relative flex items-center gap-2 px-4 py-2 bg-white/80 rounded-xl sm:self-center">
          <span className="text-[22px] font-extrabold text-[#D61F45]">{totalCount}</span>
          <span className="text-[13px] font-medium leading-tight text-gray-600">
            {activeTab === "property" ? "Property" : "Project"}
            <br />
            leads
          </span>
        </div>
      </div>

      {/* ==================================================
          Tabs + search + sort
      ================================================== */}
      <div className="flex flex-col gap-3 p-3 mt-4 bg-white border border-[#FDE8EC] lg:flex-row lg:items-center lg:justify-between rounded-2xl shadow-[0_8px_24px_rgba(214,31,69,0.06)]">
        <div className="flex gap-1 p-1 rounded-2xl bg-[#FFF7F9]">
          <button type="button" className={`${tabClass("property")} flex-1 lg:flex-none`} onClick={() => switchTab("property")}>
            <House size={17} weight="fill" />
            <span className="hidden sm:inline">Leads on&nbsp;</span>Property
          </button>
          {showProjectTab && (
            <button type="button" className={`${tabClass("project")} flex-1 lg:flex-none`} onClick={() => switchTab("project")}>
              <Buildings size={17} weight="fill" />
              <span className="hidden sm:inline">Leads on&nbsp;</span>Project
            </button>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1 sm:w-72 sm:flex-none">
            <MagnifyingGlass
              size={17}
              weight="bold"
              className="absolute -translate-y-1/2 pointer-events-none left-3.5 top-1/2 text-[#D61F45]"
            />
            <input
              type="text"
              placeholder="Search leads..."
              className="w-full h-11 pl-10 pr-9 text-[14px] text-[#17253a] bg-[#FFF7F9] border border-[#FDE8EC] rounded-xl outline-none placeholder:text-gray-400 transition-colors focus:bg-white focus:border-[#D61F45] focus:ring-2 focus:ring-[#FDE8EC]"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCurrentPage(1);
                }}
                className="absolute flex items-center justify-center w-6 h-6 text-gray-500 -translate-y-1/2 rounded-full right-2 top-1/2 hover:bg-[#FDE8EC] hover:text-[#D61F45]"
                aria-label="Clear search"
              >
                <X size={14} weight="bold" />
              </button>
            )}
          </div>

          <button
            type="button"
            className="flex items-center justify-center gap-2 h-11 px-4 text-[14px] font-medium text-gray-600 bg-white border border-gray-200 rounded-xl transition-colors hover:border-[#D61F45] hover:text-[#D61F45] whitespace-nowrap"
            onClick={() => {
              setSortBy((prev) => (prev === "latest" ? "oldest" : "latest"));
              setCurrentPage(1);
            }}
            title="Toggle sort order"
          >
            <ArrowsDownUp size={17} weight="bold" className="text-[#D61F45]" />
            Sort by:
            <span className="font-bold capitalize text-[#17253a]">{sortBy}</span>
          </button>
        </div>
      </div>

      {/* ==================================================
          Leads list
      ================================================== */}
      <div className="mt-4">
        {isLoading && leads.length === 0 ? (
          <div className="px-4 py-14 text-center text-[14px] text-gray-500 bg-white border border-[#FDE8EC] rounded-2xl">
            Loading leads...
          </div>
        ) : leads.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-4 py-14 text-center bg-white border border-[#FDE8EC] rounded-2xl">
            <span className="flex items-center justify-center w-16 h-16 mb-3 rounded-full bg-[#FDE8EC] text-[#D61F45]">
              <Tray size={30} weight="fill" />
            </span>
            <p className="m-0 text-[16px] font-semibold text-[#17253a]">
              {search.trim() !== "" ? "No results found for your search" : "No leads yet"}
            </p>
            <p className="m-0 mt-1 text-[13px] text-gray-500">
              {search.trim() !== ""
                ? "Try a different name, phone number or listing."
                : `Enquiries on your ${activeTab === "property" ? "properties" : "projects"} will show up here.`}
            </p>
          </div>
        ) : (
          leads.map((lead) => (
            <LeadCard key={lead.id} lead={lead} activeTab={activeTab} />
          ))
        )}
      </div>

      {/* ==================================================
          Pagination
      ================================================== */}
      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          <button
            className={`flex items-center justify-center w-10 h-10 rounded-full border transition-colors ${currentPage === 1
              ? "text-gray-300 border-gray-200 cursor-not-allowed"
              : "text-[#D61F45] border-[#FAD3DB] hover:bg-[#FDE8EC]"
              }`}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <CaretLeft size={16} weight="bold" />
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`w-10 h-10 flex items-center justify-center rounded-full text-[14px] font-semibold transition-colors ${currentPage === index + 1
                ? "text-white bg-gradient-to-br from-[#D61F45] to-[#B91C3C] shadow-[0_4px_12px_rgba(214,31,69,0.3)]"
                : "text-gray-600 hover:bg-[#FDE8EC] hover:text-[#D61F45]"
                }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className={`flex items-center justify-center w-10 h-10 rounded-full border transition-colors ${currentPage === totalPages
              ? "text-gray-300 border-gray-200 cursor-not-allowed"
              : "text-[#D61F45] border-[#FAD3DB] hover:bg-[#FDE8EC]"
              }`}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <CaretRight size={16} weight="bold" />
          </button>
        </div>
      )}
    </div>
  );
};

export default MyLeads;
