// import { useEffect, useState } from "react";
// import { FaDollarSign, FaCog } from "react-icons/fa";
// import { AiOutlineUser } from "react-icons/ai";
// import { FaCloudUploadAlt } from "react-icons/fa";
// import { IoCloseCircleOutline } from "react-icons/io5";
// import { IoIosSearch } from "react-icons/io";
// import { FaSearch, FaPhoneAlt, FaEnvelope, FaSort } from "react-icons/fa";
// import { Heart, Share2, Camera, Home, Ruler } from "lucide-react";
// import { FaTrash, FaShareAlt } from "react-icons/fa";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { Link } from "react-router-dom";

// import {
//   FaHome,
//   FaEye,
//   FaVideo,
//   FaUser,
//   FaBars,
//   FaTimes,
// } from "react-icons/fa";

// import { FiSmartphone } from "react-icons/fi";
// import ShareModal from "../containers/ShareModal";

// const SavedSerches = () => {
//   const [activeTa, setActiveTa] = useState("Buy");
//   const [savedSearches, setSavedSearches] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [totalCount, setTotalCount] = useState(0);
//   const itemsPerPage = 10;
//   const user_id = sessionStorage.getItem("accessToken");
//   const [currentShareUrl, setCurrentShareUrl] = useState("");
//   const [isShareModalOpen, setIsShareModalOpen] = useState(false);
//   const [activeShareId, setActiveShareId] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedSearchId, setSelectedSearchId] = useState(null);

//   const tabs = ["Buy", "Rent", "PG", "Commercial"];

//   const fetchSavedSearches = async () => {
//     try {
//       setLoading(true);

//       const formData = new FormData();

//       formData.append("user_id", user_id);
//       formData.append("page", currentPage);
//       formData.append("page_size", itemsPerPage);

//       // =========================
//       //  FIXED PAYLOAD MAPPING
//       // =========================

//       let payloadKey = "property_category_type";
//       let payloadValue = activeTa;

//       if (activeTa === "Commercial") {
//         payloadKey = "building_type";
//         payloadValue = "Commercial";
//       } else if (activeTa === "PG") {
//         payloadKey = "property_category_type";
//         payloadValue = "PG/Co-living"; // MUST match backend
//       }

//       formData.append(payloadKey, payloadValue);

//       // =========================
//       //  DEBUG (REMOVE LATER)
//       // =========================
//       // for (let pair of formData.entries()) {
//       //   console.log(pair[0], pair[1]);
//       // }

//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}/cust_api/get_save_search`,
//         formData,
//       );

//       if (response.data && response.data.data) {
//         setSavedSearches(response.data.data);
//         setTotalCount(response.data.total_count);
//         setTotalPages(Math.ceil(response.data.total_count / itemsPerPage));
//       } else {
//         setSavedSearches([]);
//         setTotalCount(0);
//         setTotalPages(0);
//       }
//     } catch (error) {
//       console.error("Error fetching saved searches:", error);
//       setSavedSearches([]);
//       setTotalCount(0);
//       setTotalPages(0);
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     if (user_id) {
//       fetchSavedSearches();
//     }
//   }, [currentPage, activeTa]);

//   const handleDelete = async (saved_search_id) => {
//     try {
//       // Create FormData and append saved_search_id
//       const formData = new FormData();
//       formData.append("saved_search_id", saved_search_id);
//       console.log("Deleted ID is:", saved_search_id);

//       // Make DELETE request with FormData
//       const response = await axios.delete(
//         `${process.env.REACT_APP_API_URL}/cust_api/delete_save_search`,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//           data: formData,
//         },
//       );

//       if (response.data.status === 1) {
//         toast.success("Saved search deleted successfully!");
//         fetchSavedSearches();
//       } else {
//         toast.error(response.data.message || "Failed to delete saved search.");
//       }
//     } catch (error) {
//       toast.error("Something went wrong while deleting.");
//       console.error("Error deleting saved search:", error);
//     }
//   };

//   const openShareModal1 = (url, propertyId) => {
//     setCurrentShareUrl(url);
//     setActiveShareId(propertyId);
//     setIsShareModalOpen(true);
//   };

//   const handleCloseShareModal = () => {
//     setIsShareModalOpen(false);
//     setActiveShareId(null);
//   };

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [currentPage]);

//   const confirmDelete = () => {
//     if (selectedSearchId) {
//       handleDelete(selectedSearchId);
//       setShowModal(false);
//       setSelectedSearchId(null);
//     }
//   };

//   return (
//     <>
//       <div className="max-w-6xl p-6 mx-auto">
//         <h2 className="mb-4 text-2xl font-semibold text-gray-900">
//           Saved Searches
//         </h2>

//         {/* Tabs */}
//         <div className="flex space-x-6 border-b">
//           {tabs.map((tab) => (
//             <button
//               key={tab}
//               className={`pb-2 text-lg font-medium ${
//                 activeTa === tab
//                   ? "my-text border-b-2 border-rose-600"
//                   : "text-gray-500"
//               }`}
//               onClick={() => setActiveTa(tab)}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>

//         {/* Search List */}
//         <div className="mt-6 space-y-4">
//           {savedSearches.map((search) => (
//             <div
//               key={search._id}
//               className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md"
//             >
//               <Link
//                 to={`/propertydetails/${search.property_id}`}
//                 className="flex-1 no-underline hover:no-underline"
//               >
//                 <div>
//                   <p className="text-lg font-medium text-gray-800">
//                     <p className="text-lg font-medium text-gray-800">
//                       {search.property_name}{" "}
//                       {search.address ? ` - ${search.address}` : ""}
//                     </p>
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     Saved on:{" "}
//                     {new Date(search.saved_on).toLocaleDateString("en-GB", {
//                       day: "2-digit",
//                       month: "long",
//                       year: "numeric",
//                     })}
//                   </p>
//                 </div>
//               </Link>

//               <div className="flex ml-4 space-x-3">
//                 <button className="relative p-2 bg-gray-100 rounded-lg hover:bg-gray-200">
//                   <FaShareAlt
//                     className="text-gray-600"
//                     onClick={() =>
//                       openShareModal1(
//                         `${window.location.origin}/propertydetails/${search.property_id}`,
//                         search.property_id,
//                       )
//                     }
//                   />
//                   {isShareModalOpen && activeShareId === search.property_id && (
//                     <div className="absolute right-0 z-50">
//                       <ShareModal
//                         currentShareUrl={currentShareUrl}
//                         closeShareModal={handleCloseShareModal}
//                         copyLink={() => {
//                           const url = currentShareUrl;

//                           if (navigator.clipboard && window.isSecureContext) {
//                             navigator.clipboard
//                               .writeText(url)
//                               .then(() => {
//                                 alert("Link copied!");
//                               })
//                               .catch((err) => {
//                                 console.error("Clipboard API failed:", err);
//                                 fallbackCopyTextToClipboard(url);
//                               });
//                           } else {
//                             fallbackCopyTextToClipboard(url);
//                           }

//                           function fallbackCopyTextToClipboard(text) {
//                             const textArea = document.createElement("textarea");
//                             textArea.value = text;
//                             textArea.style.position = "fixed"; // Prevent scroll jump
//                             textArea.style.left = "-9999px";
//                             document.body.appendChild(textArea);
//                             textArea.focus();
//                             textArea.select();

//                             try {
//                               const successful = document.execCommand("copy");
//                               alert(
//                                 successful ? "Link copied!" : "Copy failed",
//                               );
//                             } catch (err) {
//                               console.error("Fallback copy failed:", err);
//                               alert("Copy failed");
//                             }

//                             document.body.removeChild(textArea);
//                           }
//                         }}
//                       />
//                     </div>
//                   )}
//                 </button>
//                 <button
//                   className="p-2 bg-red-100 rounded-lg hover:bg-red-200"
//                   onClick={() => {
//                     setSelectedSearchId(search._id);
//                     setShowModal(true);
//                   }}
//                 >
//                   <FaTrash className="text-red-600" />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="flex items-center justify-center mt-6 space-x-3">
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

//       {showModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="relative p-6 text-center bg-white shadow-lg rounded-2xl w-96">
//             {/* Close (X) Icon */}
//             <button
//               className="absolute text-2xl text-black top-2 right-2"
//               onClick={() => setShowModal(false)}
//             >
//               <IoCloseCircleOutline />
//             </button>

//             <h2 className="text-2xl font-semibold">Are you sure?</h2>
//             <p className="mt-2 text-gray-500">
//               You want to delete this save search!
//             </p>

//             <div className="flex justify-center gap-6 mt-4">
//               <button
//                 className="px-8 py-2 text-white my-bg rounded-md hover:my-bg"
//                 onClick={confirmDelete}
//               >
//                 Yes
//               </button>
//               <button
//                 className="px-8 py-2 text-black bg-white border border-black rounded-md hover:bg-gray-100"
//                 onClick={() => setShowModal(false)}
//               >
//                 No
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };
// export default SavedSerches;


// ===============================  ==================================  




import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  House,
  Key,
  Bed,
  Buildings,
  MagnifyingGlass,
  CalendarBlank,
  ShareNetwork,
  Trash,
  CaretRight,
  CaretLeft,
  X,
  WarningCircle,
} from "@phosphor-icons/react";
import ShareModal from "../containers/ShareModal";

// ==========================================================
// Helpers (outside the component so they never remount)
// ==========================================================

const TABS = [
  { key: "Buy", icon: House },
  { key: "Rent", icon: Key },
  { key: "PG", icon: Bed },
  { key: "Commercial", icon: Buildings },
];

// FIX: a missing/invalid date used to print "Invalid Date".
const formatSavedOn = (value) => {
  const d = value ? new Date(value) : null;
  return d && !isNaN(d.getTime())
    ? d.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })
    : "—";
};

const copyToClipboard = (url) => {
  const fallback = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed"; // prevent scroll jump
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      alert(document.execCommand("copy") ? "Link copied!" : "Copy failed");
    } catch (err) {
      console.error("Fallback copy failed:", err);
      alert("Copy failed");
    }
    document.body.removeChild(textArea);
  };

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
      .writeText(url)
      .then(() => alert("Link copied!"))
      .catch((err) => {
        console.error("Clipboard API failed:", err);
        fallback(url);
      });
  } else {
    fallback(url);
  }
};

const SavedSerches = () => {
  const [activeTa, setActiveTa] = useState("Buy");
  const [savedSearches, setSavedSearches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 10;
  const user_id = sessionStorage.getItem("accessToken");
  const [currentShareUrl, setCurrentShareUrl] = useState("");
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [activeShareId, setActiveShareId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedSearchId, setSelectedSearchId] = useState(null);

  const fetchSavedSearches = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("user_id", user_id);
      formData.append("page", currentPage);
      formData.append("page_size", itemsPerPage);

      // Tab -> API filter
      let payloadKey = "property_category_type";
      let payloadValue = activeTa;

      if (activeTa === "Commercial") {
        payloadKey = "building_type";
        payloadValue = "Commercial";
      } else if (activeTa === "PG") {
        payloadKey = "property_category_type";
        payloadValue = "PG/Co-living"; // MUST match backend
      }

      formData.append(payloadKey, payloadValue);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/cust_api/get_save_search`,
        formData,
      );

      if (response.data && response.data.data) {
        setSavedSearches(response.data.data);
        setTotalCount(response.data.total_count || 0);
        setTotalPages(Math.ceil((response.data.total_count || 0) / itemsPerPage));
      } else {
        setSavedSearches([]);
        setTotalCount(0);
        setTotalPages(0);
      }
    } catch (error) {
      console.error("Error fetching saved searches:", error);
      setSavedSearches([]);
      setTotalCount(0);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user_id) {
      fetchSavedSearches();
    } else {
      // FIX: without a login the page used to stay in "loading" forever.
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, activeTa]);

  // FIX: switching tabs now starts from page 1 (it kept the old page number,
  // so e.g. page 3 of "Buy" asked for page 3 of "PG" and showed nothing).
  const switchTab = (tab) => {
    if (tab === activeTa) return;
    setActiveTa(tab);
    setCurrentPage(1);
    handleCloseShareModal();
  };

  const handleDelete = async (saved_search_id) => {
    try {
      const formData = new FormData();
      formData.append("saved_search_id", saved_search_id);

      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/cust_api/delete_save_search`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        },
      );

      if (response.data.status === 1) {
        toast.success("Saved search deleted successfully!");
        // FIX: deleting the last item on a page now goes back a page
        // instead of leaving an empty page.
        if (savedSearches.length <= 1 && currentPage > 1) {
          setCurrentPage((p) => p - 1);
        } else {
          fetchSavedSearches();
        }
      } else {
        toast.error(response.data.message || "Failed to delete saved search.");
      }
    } catch (error) {
      toast.error("Something went wrong while deleting.");
      console.error("Error deleting saved search:", error);
    }
  };

  const openShareModal1 = (url, propertyId) => {
    setCurrentShareUrl(url);
    setActiveShareId(propertyId);
    setIsShareModalOpen(true);
  };

  const handleCloseShareModal = () => {
    setIsShareModalOpen(false);
    setActiveShareId(null);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Lock page scroll while the delete popup is open
  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  const confirmDelete = () => {
    if (selectedSearchId) {
      handleDelete(selectedSearchId);
      setShowModal(false);
      setSelectedSearchId(null);
    }
  };

  return (
    <>
      <div className="w-full">
        {/* ==================================================
            Header banner — "Saved Searches"
        ================================================== */}
        <div className="relative overflow-hidden border border-[#FDE8EC] rounded-2xl bg-gradient-to-r from-[#FFF7F9] via-[#FDE8EC] to-[#FAD3DB]">
          {/* house + magnifier art */}
          <div aria-hidden="true" className="absolute hidden pointer-events-none right-8 bottom-0 md:block">
            <div className="relative w-56 h-36">
              <span className="absolute bottom-0 w-40 rounded-full right-6 h-28 bg-white/60" />
              <House size={120} weight="fill" className="absolute bottom-2 right-16 text-[#D61F45] opacity-25" />
              <span className="absolute flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-[0_10px_24px_rgba(214,31,69,0.25)] right-2 bottom-6">
                <MagnifyingGlass size={44} weight="bold" className="text-[#D61F45]" />
              </span>
            </div>
          </div>

          <div className="relative px-5 py-6 md:px-8 md:py-8">
            <p className="flex items-center gap-3 m-0 text-[12px] font-semibold tracking-[0.3em] text-[#D61F45] uppercase">
              My Account
              <span className="w-8 h-[2px] rounded-full bg-[#D61F45]" />
            </p>
            <h2 className="m-0 mt-2 text-3xl font-extrabold md:text-[44px] leading-tight text-[#17253a]">
              Saved <span className="text-[#D61F45]">Searches</span>
            </h2>
            <p className="m-0 mt-2 text-[14px] md:text-[16px] text-gray-600">
              Quickly access and manage your saved property searches.
            </p>
          </div>
        </div>

        {/* ==================================================
            Tabs
        ================================================== */}
        <div className="flex gap-1 mt-5 overflow-x-auto border-b border-[#FAD3DB]">
          {TABS.map(({ key, icon: Icon }) => {
            const active = activeTa === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => switchTab(key)}
                aria-pressed={active}
                className={`relative flex items-center flex-shrink-0 gap-2 px-4 pb-3 pt-2 text-[16px] transition-colors ${active ? "font-bold text-[#D61F45]" : "font-medium text-gray-500 hover:text-[#D61F45]"
                  }`}
              >
                <Icon size={18} weight={active ? "fill" : "regular"} />
                {key}
                {active && !loading && totalCount > 0 && (
                  <span className="px-1.5 text-[11px] font-bold rounded-full bg-[#FDE8EC] text-[#D61F45]">
                    {totalCount}
                  </span>
                )}
                <span
                  className={`absolute left-2 right-2 -bottom-px h-[3px] rounded-full bg-[#D61F45] transition-opacity ${active ? "opacity-100" : "opacity-0"
                    }`}
                />
              </button>
            );
          })}
        </div>

        {/* ==================================================
            List
        ================================================== */}
        <div className="mt-5 space-y-4">
          {loading ? (
            [0, 1].map((i) => (
              <div key={i} className="flex items-center gap-4 p-5 bg-white border border-[#FDE8EC] rounded-2xl animate-pulse">
                <span className="w-14 h-14 rounded-full bg-[#FDE8EC]" />
                <div className="flex-1 space-y-2">
                  <div className="w-2/3 h-5 rounded bg-[#FDE8EC]" />
                  <div className="w-1/3 h-4 rounded bg-[#FFF1F4]" />
                </div>
              </div>
            ))
          ) : !user_id ? (
            <div className="flex flex-col items-center justify-center px-4 py-14 text-center bg-white border border-[#FDE8EC] rounded-3xl">
              <span className="flex items-center justify-center w-16 h-16 mb-3 rounded-full bg-[#FDE8EC] text-[#D61F45]">
                <MagnifyingGlass size={30} weight="bold" />
              </span>
              <p className="m-0 text-[16px] font-semibold text-[#17253a]">Please log in to see your saved searches</p>
            </div>
          ) : savedSearches.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-4 py-14 text-center bg-white border border-[#FDE8EC] rounded-3xl">
              <span className="relative flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-[#FDE8EC]">
                <MagnifyingGlass size={36} weight="bold" className="text-[#D61F45]" />
                <span className="absolute w-3 h-3 rounded-full -top-1 -right-1 bg-[#F4A7B6]" />
                <span className="absolute w-2 h-2 rounded-full bottom-1 -left-2 bg-[#D61F45]" />
              </span>
              <h3 className="m-0 text-xl font-bold text-[#17253a] md:text-2xl">
                No saved searches <span className="text-[#D61F45]">yet</span>
              </h3>
              <p className="max-w-md m-0 mt-2 text-[14px] text-gray-500">
                Searches you save under {activeTa} will show up here.
              </p>
            </div>
          ) : (
            savedSearches.map((search) => {
              const url = `${window.location.origin}/propertydetails/${search.property_id}`;
              return (
                <div
                  key={search._id}
                  className="relative flex items-center gap-4 p-4 bg-white border border-[#FDE8EC] md:p-5 rounded-2xl shadow-[0_8px_24px_rgba(214,31,69,0.06)] transition-all hover:border-[#FAD3DB] hover:shadow-[0_12px_32px_rgba(214,31,69,0.12)] group"
                >
                  <Link
                    to={`/propertydetails/${search.property_id}`}
                    className="flex items-center flex-1 min-w-0 gap-4 no-underline hover:no-underline"
                  >
                    <span className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full md:w-14 md:h-14 bg-[#FDE8EC] text-[#D61F45] transition-colors group-hover:bg-[#D61F45] group-hover:text-white">
                      <House size={26} weight="fill" />
                    </span>
                    <div className="min-w-0">
                      {/* FIX: was a <p> inside a <p> (invalid HTML + React warning) */}
                      <p className="m-0 text-[15px] md:text-[17px] font-bold leading-snug text-[#17253a] break-words group-hover:text-[#D61F45] transition-colors">
                        {search.property_name}
                        {search.address ? ` - ${search.address}` : ""}
                      </p>
                      <p className="flex items-center gap-1.5 m-0 mt-1.5 text-[13px] text-gray-500">
                        <CalendarBlank size={16} />
                        Saved on: {formatSavedOn(search.saved_on)}
                      </p>
                    </div>
                  </Link>

                  <div className="flex items-center flex-shrink-0 gap-2">
                    <div className="relative">
                      {/* FIX: the click was only on the tiny icon, not the button */}
                      <button
                        type="button"
                        title="Share"
                        aria-label="Share"
                        onClick={() =>
                          isShareModalOpen && activeShareId === search.property_id
                            ? handleCloseShareModal()
                            : openShareModal1(url, search.property_id)
                        }
                        className="flex items-center justify-center w-11 h-11 text-gray-600 bg-gray-100 rounded-xl hover:bg-[#FDE8EC] hover:text-[#D61F45] transition-colors"
                      >
                        <ShareNetwork size={20} weight="bold" />
                      </button>
                      {isShareModalOpen && activeShareId === search.property_id && (
                        <div className="absolute right-0 z-50 top-12">
                          <ShareModal
                            currentShareUrl={currentShareUrl}
                            closeShareModal={handleCloseShareModal}
                            copyLink={() => copyToClipboard(currentShareUrl)}
                          />
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      title="Delete"
                      aria-label="Delete saved search"
                      onClick={() => {
                        setSelectedSearchId(search._id);
                        setShowModal(true);
                      }}
                      className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#FDE8EC] text-[#D61F45] hover:bg-[#D61F45] hover:text-white transition-colors"
                    >
                      <Trash size={20} weight="fill" />
                    </button>
                    <CaretRight size={18} weight="bold" className="hidden text-gray-300 sm:block group-hover:text-[#D61F45]" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* ==================================================
            Pagination
        ================================================== */}
        {!loading && totalPages > 1 && (
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

      {/* ==================================================
          Delete confirmation — above the fixed navbar
      ================================================== */}
      {showModal && (
        <div
          className="fixed inset-0 z-[1100] flex items-center justify-center px-4 bg-black bg-opacity-50"
          onMouseDown={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <div className="relative w-full max-w-sm p-6 text-center bg-white shadow-2xl rounded-3xl" role="dialog" aria-modal="true">
            <button
              type="button"
              className="absolute flex items-center justify-center w-8 h-8 text-gray-400 rounded-full top-3 right-3 hover:bg-[#FDE8EC] hover:text-[#D61F45]"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              <X size={16} weight="bold" />
            </button>

            <div className="flex items-center justify-center mx-auto mb-3 rounded-full w-14 h-14 bg-[#FDE8EC] text-[#D61F45]">
              <WarningCircle size={30} weight="fill" />
            </div>
            <h2 className="text-xl font-bold text-[#17253a]">Are you sure?</h2>
            <p className="mt-1 text-sm text-gray-500">You want to delete this save search!</p>

            <div className="grid grid-cols-2 gap-3 mt-5">
              <button
                type="button"
                className="py-2.5 font-semibold bg-white border-[1.5px] rounded-xl border-[#D61F45] text-[#D61F45] hover:bg-[#FDE8EC] transition-colors"
                onClick={() => setShowModal(false)}
              >
                No
              </button>
              <button
                type="button"
                className="py-2.5 font-semibold text-white rounded-xl bg-gradient-to-r from-[#D61F45] to-[#B91C3C] shadow-[0_6px_18px_rgba(214,31,69,0.35)]"
                onClick={confirmDelete}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default SavedSerches;