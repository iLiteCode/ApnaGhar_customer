// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { IoCloseCircleOutline } from "react-icons/io5";
// import { IoArrowBackCircleOutline } from "react-icons/io5";
// import { IoIosSearch } from "react-icons/io";
// import axios from "axios";
// import { Trash } from "lucide-react";
// import { Toast } from "bootstrap";
// import { toast } from "react-toastify";
// import { useHistory } from "react-router-dom";
// import { IoMdClose } from "react-icons/io";

// const Offer = () => {
//   const [projects, setProjects] = useState([]);
//   const [offerProjects, setOfferProjects] = useState([]);
//   const [filteredOffers, setFilteredOffers] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [showNextModal, setShowNextModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [TotalCount, setTotalCount] = useState(1);
//   const itemsPerPage = 10;
//   // Use totalPages based on filteredOffers
//   const totalPages = Math.ceil(TotalCount / itemsPerPage);
//   const [loading, setLoading] = useState(false);
//   const userId = sessionStorage.getItem("accessToken");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchOfferTerm, setSearchOfferTerm] = useState("");
//   const [selectedProperties, setSelectedProperties] = useState([]);
//   const [selectedProperty, setSelectedProperty] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [offerToDelete, setOfferToDelete] = useState(null);
//   const [showReasonModal, setShowReasonModal] = useState(false);
//   const [selectedReason, setSelectedReason] = useState("");
//   const history = useHistory();

//   // For Edit a Offer -
//   const [offerName, setOfferName] = useState("");
//   const [offerTime, setOfferTime] = useState("");
//   const [offerDescription, setOfferDescription] = useState("");
//   const [offerPhoto, setOfferPhoto] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState("");

//   // For cretae a new Offer -
//   const [createOfferName, setCreateOfferName] = useState("");
//   const [createOfferDescription, setCreateOfferDescription] = useState("");
//   const [createOfferPhoto, setCreateOfferPhoto] = useState(null);
//   const [offerPhotoPreview, setOfferPhotoPreview] = useState(null);
//   const [showOfferCountModal, setShowOfferCountModal] = useState(false);
//   const [offerCount, setOfferCount] = useState(0);

//   useEffect(() => {
//     const checkPostLimits = async () => {
//       try {
//         const profileForm = new FormData();
//         profileForm.append("user_id", userId);

//         const profileResponse = await axios.post(
//           `${process.env.REACT_APP_API_URL}/cust_api/get_profile`,
//           profileForm,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           },
//         );

//         const countData = profileResponse?.data?.count_data;

//         if (countData) {
//           setOfferCount(countData.offer_count || 0);
//         }
//       } catch (error) {
//         console.error("Error checking post limits:", error);
//       }
//     };

//     if (userId) {
//       checkPostLimits();
//     }
//   }, [userId]);

//   const fetchProjects = async () => {
//     try {
//       const formData2 = new FormData();
//       formData2.append("user_id", userId);
//       formData2.append("page_size", 999999);

//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}/cust_api/get-listing-properties`,
//         formData2,
//       );

//       if (response.data?.data) {
//         setProjects(response.data.data);
//         setOfferPhoto(response.data.offer_img);
//       }
//     } catch (error) {
//       console.error("Failed to fetch properties:", error);
//     }
//   };

//   const fetchOffers = async () => {
//     setLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append("user_id", userId);
//       formData.append("page", currentPage);
//       formData.append("page_size", itemsPerPage);

//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}/cust_api/get_offer`,
//         formData,
//       );

//       if (response.data && response.data.data) {
//         setOfferProjects(response.data.data);
//         setTotalCount(response.data.total_count || 0);
//       } else {
//         setOfferProjects([]);
//         setTotalCount(0);
//       }
//     } catch (error) {
//       console.error("Failed to fetch offers:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (userId) {
//       fetchOffers();
//     }
//   }, [userId, currentPage]);

//   // Filter logic
//   useEffect(() => {
//     const search = searchOfferTerm.toLowerCase().trim();
//     const filtered = offerProjects.filter((offer) => {
//       const name = (offer.offer_name || "").toLowerCase();
//       const desc = (offer.offer_description || "").toLowerCase();
//       return name.includes(search) || desc.includes(search);
//     });
//     setFilteredOffers(filtered);
//     setCurrentPage(1);
//   }, [searchOfferTerm, offerProjects]);

//   // Paginate filtered results
//   const paginatedOffers = filteredOffers.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage,
//   );

//   const toggleSelect = (propertyId) => {
//     if (selectedProperties.includes(propertyId)) {
//       setSelectedProperties([]);
//       setSelectedProperty({});
//     } else {
//       const selected = filteredProjects.find((p) => p._id === propertyId);
//       setSelectedProperties([propertyId]);
//       setSelectedProperty(selected);
//     }
//   };

//   //  Here is for offfer cards -
//   const filteredProjects = (projects || []).filter((project) => {
//     if (!project || typeof project !== "object") return false;

//     const search = String(searchTerm).toLowerCase().trim();
//     const title = String(project.property_name).toLowerCase().trim();
//     const location = String(project.address).toLowerCase().trim();

//     return title.includes(search) || location.includes(search);
//   });

//   const handlePropertyClick = (project) => {
//     setSelectedProperty(project);
//     setOfferName(project.offer_name || "");
//     setOfferDescription(project.offer_description || "");
//     setOfferPhoto(`${process.env.REACT_APP_API_URL}/` + project.offer_img);
//     setShowEditModal(true);
//     console.log("Project: ", offerPhoto);
//   };

//   const handleOfferSubmit = async () => {
//     if (!userId) {
//       toast.error("You must be logged in to create an offer.");
//       return;
//     }

//     if (!offerName || !offerDescription || !selectedProperty?._id) {
//       toast.error("Please fill all fields and upload an image.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("user_id", selectedProperty.user_id);
//     formData.append("offer_auto_id", selectedProperty._id);
//     formData.append("offer_name", offerName);
//     formData.append("offer_description", offerDescription);

//     if (offerPhoto instanceof File) {
//       formData.append("offer_img", offerPhoto);
//     }

//     try {
//       const res = await fetch(
//         `${process.env.REACT_APP_API_URL}/cust_api/update_offer`,
//         {
//           method: "POST",
//           body: formData,
//         },
//       );

//       const data = await res.json();
//       if (res.ok) {
//         toast.success("Offer edited successfully!");
//         fetchOffers();

//         // Clean up
//         if (previewUrl?.startsWith("blob:")) {
//           URL.revokeObjectURL(previewUrl);
//         }

//         setShowNextModal(false);
//         setSelectedProperties([]);
//         setOfferName("");
//         setOfferDescription("");
//         setOfferPhoto(null);
//         setPreviewUrl("");
//         setTotalCount(data.total_pages || 0);
//       } else {
//         setTotalCount(0);
//         toast.error(data?.message || "Something went wrong");
//       }
//     } catch (error) {
//       console.error("Error submitting offer:", error);
//       toast.error("Error submitting offer.");
//     }
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setOfferPhoto(file);
//       setPreviewUrl(URL.createObjectURL(file));
//     }
//   };

//   const handleDeleteImage = () => {
//     if (previewUrl?.startsWith("blob:")) {
//       URL.revokeObjectURL(previewUrl);
//     }
//     setOfferPhoto(null);
//     setPreviewUrl("");
//   };

//   // Load existing property data when modal opens
//   useEffect(() => {
//     if (showEditModal || selectedProperty) {
//       setOfferName(selectedProperty.offer_name);
//       setOfferDescription(selectedProperty.offer_description);

//       const imageUrl = `${process.env.REACT_APP_API_URL}${selectedProperty.offer_img}`;
//       setOfferPhoto(imageUrl);
//       setPreviewUrl(imageUrl);
//     }
//   }, [showEditModal, selectedProperty]);

//   const handleAddOffer = async () => {
//     if (!userId) {
//       toast.error("You must be logged in to create an offer.");
//       return;
//     }

//     if (!createOfferName || !createOfferDescription || !selectedProperty?._id) {
//       toast.error("Please fill all fields and upload an image.");
//       return;
//     }

//     const formData4 = new FormData();
//     formData4.append("user_id", selectedProperty.user_id);
//     formData4.append("property_id", selectedProperty._id);
//     formData4.append("offer_name", createOfferName);
//     formData4.append("offer_description", createOfferDescription);
//     formData4.append("offer_img", createOfferPhoto);

//     const res = await fetch(
//       `${process.env.REACT_APP_API_URL}/cust_api/add_offer`,
//       {
//         method: "POST",
//         body: formData4,
//       },
//     );

//     const data = await res.json();
//     if (res.ok && data.status === 1) {
//       toast.success("Offer created successfully!");
//       // Reset state or close modals
//       setShowNextModal(false);
//       fetchOffers();
//       resetOfferFormFields();
//       setSelectedProperties([]);
//       setSelectedProperty({});
//       setCreateOfferName("");
//       setCreateOfferDescription("");
//       setCreateOfferPhoto(null);
//     } else {
//       setTotalCount(0);
//       toast.error(data?.message || "Something went wrong");
//     }
//   };

//   useEffect(() => {
//     if (showModal || showEditModal || showNextModal) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }

//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [showModal, showEditModal, showNextModal]);

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [currentPage]);

//   const resetOfferFormFields = () => {
//     setSearchTerm("");
//     setCreateOfferName("");
//     setCreateOfferDescription("");
//     setCreateOfferPhoto(null);
//     setSelectedProperty({});
//     setSelectedProperties([]);
//   };

//   return (
//     <>
//       <div className="p-6 max-w-6xl mx-auto">
//         {/* Header Section */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//           <h2 className="text-2xl font-semibold">My Offers</h2>

//           {/* Search Box in the middle */}
//           <div className="relative">
//             {/* Search Icon (no onClick) */}
//             <IoIosSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />

//             {/* Input */}
//             <input
//               type="text"
//               placeholder="Search properties..."
//               className="border rounded-lg px-10 py-2 w-full outline-none focus:ring-2 focus:ring-rose-400 pr-10"
//               value={searchOfferTerm}
//               onChange={(e) => setSearchOfferTerm(e.target.value)}
//             />

//             {/* Clear Button */}
//             {searchOfferTerm && (
//               <button
//                 onClick={() => setSearchOfferTerm("")}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-900 text-lg"
//               >
//                 <IoMdClose />
//               </button>
//             )}
//           </div>

//           <button
//             className="my-bg text-white px-4 py-2 rounded-lg flex items-center"
//             onClick={() => {
//               if (offerCount <= 0) {
//                 setShowOfferCountModal(true);
//               } else {
//                 resetOfferFormFields();
//                 // Then show modal and fetch projects
//                 setShowModal(true);
//                 fetchProjects();
//               }
//             }}
//           >
//             Create New Offer
//           </button>
//         </div>

//         {/* Property Listings */}
//         <div className="mt-6 space-y-4">
//           {paginatedOffers.length === 0 ? (
//             <p className="text-center text-gray-500 mt-4">
//               {searchOfferTerm.trim() !== ""
//                 ? "No results found for your search."
//                 : "No data available."}
//             </p>
//           ) : (
//             paginatedOffers.map((OfferProject) => (
//               <div
//                 key={OfferProject._id}
//                 className={`bg-white shadow-sm rounded-lg p-4 flex flex-col md:flex-row items-start md:items-center justify-between relative 
//                   ${
//                     OfferProject.status === "Approved"
//                       ? "border-1 border-green-500"
//                       : OfferProject.status === "Rejected" ||
//                           OfferProject.status === "Disapproved"
//                         ? "border-1 border-red-500"
//                         : OfferProject.status === "Pending"
//                           ? "border-1 border-yellow-500"
//                           : ""
//                   }`}
//               >
//                 {/* Published Badge (Top Left Corner) */}
//                 <div
//                   className={`absolute top-2 left-6 text-xs font-medium px-3 py-1 rounded-md ${
//                     OfferProject.status === "Approved"
//                       ? "bg-green-200 text-green-700"
//                       : OfferProject.status === "Rejected" ||
//                           OfferProject.status === "Disapproved"
//                         ? "bg-red-200 text-red-700"
//                         : "bg-yellow-200 text-yellow-700"
//                   }`}
//                 >
//                   {OfferProject.status}
//                 </div>

//                 {/* Left Section (Image + Badge) */}
//                 <div className="relative w-40 h-28 mt-3">
//                   {/* Property Image */}
//                   <Link
//                     to={{
//                       pathname: `/offerdetail/${OfferProject?.property_id}`,
//                       state: { offer: OfferProject },
//                     }}
//                   >
//                     <img
//                       src={
//                         OfferProject.property_data?.cover_image
//                           ? // ? `${process.env.REACT_APP_API_URL}${OfferProject.offer_img}`
//                             `${process.env.REACT_APP_API_URL}${OfferProject.property_data?.cover_image}`
//                           : "/image/app.png"
//                       }
//                       alt="Property Image"
//                       className="w-full h-full object-cover rounded-md"
//                     />
//                   </Link>
//                   <span
//                     className={`absolute top-1 left-1 text-xs px-2 rounded-md ${
//                       OfferProject.property_data?.property_category_type ===
//                       "Buy"
//                         ? "my-bg text-white"
//                         : OfferProject.property_data?.property_category_type ===
//                             "Rent"
//                           ? "bg-green-600 text-white"
//                           : "bg-gray-400 text-white"
//                     }`}
//                   >
//                     {OfferProject.property_data?.property_category_type ===
//                     "Buy"
//                       ? "FOR BUY"
//                       : OfferProject.property_data?.property_category_type ===
//                           "Rent"
//                         ? "FOR RENT"
//                         : "UNKNOWN"}
//                   </span>
//                 </div>

//                 {/* Middle Section (Details) */}
//                 <div className="ml-4 flex-1 mt-3">
//                   <h3 className="text-lg font-semibold mb-0">
//                     {OfferProject.property_data?.property_name}
//                   </h3>
//                   <p className="text-gray-500 text-sm mb-0">
//                     {OfferProject.property_data?.address_area}
//                   </p>
//                   {OfferProject.property_data?.property_category_type ===
//                   "Rent" ? (
//                     <p className="text-black font-bold mt-1">
//                       ₹{" "}
//                       {Number(OfferProject.property_data?.rent) >= 10000000
//                         ? (Number(OfferProject.property_data?.rent) / 10000000)
//                             .toFixed(1)
//                             .replace(/\.0$/, "") + " Cr"
//                         : Number(OfferProject.property_data?.rent) >= 100000
//                           ? (Number(OfferProject.property_data?.rent) / 100000)
//                               .toFixed(1)
//                               .replace(/\.0$/, "") + " L"
//                           : Number(OfferProject.property_data?.rent) >= 1000
//                             ? (Number(OfferProject.property_data?.rent) / 1000)
//                                 .toFixed(1)
//                                 .replace(/\.0$/, "") + " K"
//                             : OfferProject.property_data?.rent}
//                       {OfferProject.property_data?.rent_duration &&
//                       OfferProject.property_data?.rent_duration !== "N/A"
//                         ? ` / ${OfferProject.property_data?.rent_duration}`
//                         : ""}
//                     </p>
//                   ) : (
//                     OfferProject.property_data?.property_price &&
//                     OfferProject.property_data?.property_price !== "N/A" && (
//                       <p className="text-black font-bold mt-1">
//                         ₹{" "}
//                         {Number(OfferProject.property_data?.property_price) >=
//                         10000000
//                           ? (
//                               Number(
//                                 OfferProject.property_data?.property_price,
//                               ) / 10000000
//                             )
//                               .toFixed(1)
//                               .replace(/\.0$/, "") + " Cr"
//                           : Number(
//                                 OfferProject.property_data?.property_price,
//                               ) >= 100000
//                             ? (
//                                 Number(
//                                   OfferProject.property_data?.property_price,
//                                 ) / 100000
//                               )
//                                 .toFixed(1)
//                                 .replace(/\.0$/, "") + " L"
//                             : Number(
//                                   OfferProject.property_data?.property_price,
//                                 ) >= 1000
//                               ? (
//                                   Number(
//                                     OfferProject.property_data?.property_price,
//                                   ) / 1000
//                                 )
//                                   .toFixed(1)
//                                   .replace(/\.0$/, "") + " K"
//                               : OfferProject.property_data?.property_price}
//                       </p>
//                     )
//                   )}

//                   <p className="text-gray-400 text-sm ">
//                     Posted on:{" "}
//                     {new Date(OfferProject.created_at).toLocaleDateString(
//                       "en-GB",
//                       {
//                         day: "2-digit",
//                         month: "short",
//                         year: "numeric",
//                       },
//                     )}
//                   </p>
//                 </div>

//                 {/* Right Section (Stats & Actions) */}
//                 <div className="flex flex-col items-center gap-4 mt-4 md:mt-0">
//                   {/* Views and Leads - Now stacked */}
//                   <div className="flex gap-20 mt-3">
//                     <div className="text-center">
//                       <p className="text-gray-500 text-sm">Views</p>
//                       <p className="text-black font-semibold">
//                         {OfferProject.property_data?.view_count || "0"}
//                       </p>
//                     </div>
//                     <div className="text-center">
//                       <p className="text-gray-500 text-sm">Leads</p>
//                       <p className="text-black font-semibold">
//                         {OfferProject.property_data?.leads_count || "0"}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Buttons - Now positioned below Views & Leads */}
//                   <div className="flex gap-4">
//                     <button
//                       onClick={() => handlePropertyClick(OfferProject)}
//                       className="border-1 border-rose-500 my-text px-4 py-1 rounded-lg"
//                     >
//                       Edit Offer
//                     </button>

//                     {OfferProject.status === "Approved" ? (
//                       <button
//                         className="border bg-white text-red-500 px-4 py-1 rounded-lg border-red-500"
//                         onClick={() => {
//                           setOfferToDelete(OfferProject); // store the offer info
//                           setShowDeleteModal(true); // show modal
//                         }}
//                       >
//                         Delete
//                       </button>
//                     ) : OfferProject.status === "Rejected" ||
//                       OfferProject.status === "Disapproved" ? (
//                       <button
//                         className="border bg-white text-black px-4 py-1 rounded-lg border-black border-1"
//                         onClick={() => {
//                           setSelectedReason(
//                             OfferProject.reason || "No reason provided",
//                           );
//                           setShowReasonModal(true);
//                         }}
//                       >
//                         View Reason
//                       </button>
//                     ) : null}
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

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

//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-gray-100 rounded-lg w-full max-w-md md:max-w-3xl relative">
//             {/* Header */}
//             <div className="bg-white p-4 flex justify-center items-center border-b">
//               <h2 className="text-xl font-semibold">Select Property</h2>
//               <button
//                 className="absolute top-2 right-2 text-black hover:text-black text-2xl"
//                 onClick={() => {
//                   resetOfferFormFields();
//                   setShowModal(false);
//                 }}
//               >
//                 <IoCloseCircleOutline />
//               </button>
//             </div>

//             {/* Search Box */}
//             <div className="px-4 pt-4">
//               <div className="relative w-full">
//                 <IoIosSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
//                 <input
//                   type="text"
//                   placeholder="Search properties..."
//                   className="border rounded-lg px-10 py-2 w-full outline-none focus:ring-2 focus:ring-rose-400"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//             </div>

//             {/* Property List */}
//             <div className="max-h-80 overflow-y-auto px-4 pt-4">
//               {filteredProjects.map((project) => (
//                 <div
//                   key={project._id}
//                   className="flex items-center gap-4 bg-white rounded-xl p-2 mb-3 shadow-sm hover:shadow-md transition"
//                 >
//                   <input
//                     type="checkbox"
//                     checked={selectedProperties.includes(project._id)}
//                     onChange={() => toggleSelect(project._id)}
//                     className="h-5 w-5 accent-rose-600"
//                   />

//                   {/* Image */}
//                   <div className="relative w-24 h-24">
//                     <img
//                       src={project.cover_image}
//                       alt="Cover Image"
//                       className="w-full h-full rounded-lg object-cover"
//                     />
//                     <span
//                       className={`absolute top-1 left-1 text-xs px-2 rounded-md ${
//                         project.property_category_type === "Buy"
//                           ? "my-bg text-white"
//                           : project.property_category_type === "Rent"
//                             ? "bg-green-600 text-white"
//                             : "bg-gray-400 text-white"
//                       }`}
//                     >
//                       {project.property_category_type === "Buy"
//                         ? "FOR BUY"
//                         : project.property_category_type === "Rent"
//                           ? "FOR RENT"
//                           : "UNKNOWN"}
//                     </span>
//                   </div>

//                   {/* Info */}
//                   <div className="flex-1">
//                     <h3 className="text-lg font-medium">
//                       {project.property_name}
//                     </h3>
//                     <p className="text-gray-500 text-sm">
//                       {project.address_area}
//                     </p>

//                     {project.property_category_type === "Rent" ? (
//                       <p className="text-black font-bold mt-1">
//                         ₹{" "}
//                         {Number(project.rent) >= 10000000
//                           ? (Number(project.rent) / 10000000)
//                               .toFixed(1)
//                               .replace(/\.0$/, "") + " Cr"
//                           : Number(project.rent) >= 100000
//                             ? (Number(project.rent) / 100000)
//                                 .toFixed(1)
//                                 .replace(/\.0$/, "") + " L"
//                             : Number(project.rent) >= 1000
//                               ? (Number(project.rent) / 1000)
//                                   .toFixed(1)
//                                   .replace(/\.0$/, "") + " K"
//                               : project.rent}
//                         {project.rent_duration &&
//                         project.rent_duration !== "N/A"
//                           ? ` / ${project.rent_duration}`
//                           : ""}
//                       </p>
//                     ) : (
//                       project.property_price &&
//                       project.property_price !== "N/A" && (
//                         <p className="text-black font-bold mt-1">
//                           ₹{" "}
//                           {Number(project.property_price) >= 10000000
//                             ? (Number(project.property_price) / 10000000)
//                                 .toFixed(1)
//                                 .replace(/\.0$/, "") + " Cr"
//                             : Number(project.property_price) >= 100000
//                               ? (Number(project.property_price) / 100000)
//                                   .toFixed(1)
//                                   .replace(/\.0$/, "") + " L"
//                               : Number(project.property_price) >= 1000
//                                 ? (Number(project.property_price) / 1000)
//                                     .toFixed(1)
//                                     .replace(/\.0$/, "") + " K"
//                                 : project.property_price}
//                         </p>
//                       )
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Footer */}
//             <div className="bg-white flex justify-between items-center p-4 border-t">
//               <p className="text-gray-700">
//                 {selectedProperties.length} Property Selected
//               </p>
//               <button
//                 className="my-bg text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50"
//                 disabled={selectedProperties.length === 0}
//                 onClick={() => {
//                   setShowModal(false);
//                   setShowNextModal(true);
//                 }}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Offer Edite Modal */}
//       {showEditModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-gray-100 rounded-lg w-full max-w-md md:max-w-3xl relative max-h-[90vh] overflow-y-auto">
//             <div className="bg-white p-4 flex justify-center items-center border-b">
//               <h2 className="text-xl font-semibold">Edit A Offer</h2>
//               <button
//                 className="absolute top-2 right-2 text-black hover:text-black text-2xl"
//                 onClick={() => {
//                   fetchOffers();
//                   setShowEditModal(false);
//                   resetOfferFormFields();
//                 }}
//               >
//                 <IoCloseCircleOutline />
//               </button>
//             </div>

//             <div className="flex items-center bg-white p-3 rounded-lg">
//               <div className="relative w-24 h-24">
//                 <img
//                   src={
//                     selectedProperty.property_data?.cover_image
//                       ? `${process.env.REACT_APP_API_URL}${selectedProperty.property_data?.cover_image}`
//                       : "/default-image.jpg"
//                   }
//                   alt="Property Image"
//                   className="w-full h-full rounded-lg object-cover"
//                 />
//                 <span
//                   className={`absolute top-1 left-1 text-xs px-2 rounded-md ${
//                     selectedProperty.property_data?.property_category_type ===
//                     "Buy"
//                       ? "my-bg text-white"
//                       : selectedProperty.property_data
//                             ?.property_category_type === "Rent"
//                         ? "bg-green-600 text-white"
//                         : "bg-gray-400 text-white"
//                   }`}
//                 >
//                   {selectedProperty.property_data?.property_category_type ===
//                   "Buy"
//                     ? "FOR BUY"
//                     : selectedProperty.property_data?.property_category_type ===
//                         "Rent"
//                       ? "FOR RENT"
//                       : "UNKNOWN"}
//                 </span>
//               </div>
//               <div className="ml-3">
//                 <p className="font-semibold">
//                   {selectedProperty.property_data?.property_name}
//                 </p>
//                 <p className="text-gray-500 text-sm">
//                   {selectedProperty.property_data?.address_area}
//                 </p>
//                 {selectedProperty.property_data?.property_category_type ===
//                 "Rent" ? (
//                   <p className="text-black font-bold mt-1">
//                     ₹{" "}
//                     {Number(selectedProperty.property_data?.rent) >= 10000000
//                       ? (
//                           Number(selectedProperty.property_data?.rent) /
//                           10000000
//                         )
//                           .toFixed(1)
//                           .replace(/\.0$/, "") + " Cr"
//                       : Number(selectedProperty.property_data?.rent) >= 100000
//                         ? (
//                             Number(selectedProperty.property_data?.rent) /
//                             100000
//                           )
//                             .toFixed(1)
//                             .replace(/\.0$/, "") + " L"
//                         : Number(selectedProperty.property_data?.rent) >= 1000
//                           ? (
//                               Number(selectedProperty.property_data?.rent) /
//                               1000
//                             )
//                               .toFixed(1)
//                               .replace(/\.0$/, "") + " K"
//                           : selectedProperty.property_data?.rent}
//                     {selectedProperty.property_data?.rent_duration &&
//                     selectedProperty.property_data?.rent_duration !== "N/A"
//                       ? ` / ${selectedProperty.property_data?.rent_duration}`
//                       : ""}
//                   </p>
//                 ) : (
//                   selectedProperty.property_data?.property_price &&
//                   selectedProperty.property_data?.property_price !== "N/A" && (
//                     <p className="text-black font-bold mt-1">
//                       ₹{" "}
//                       {Number(selectedProperty.property_data?.property_price) >=
//                       10000000
//                         ? (
//                             Number(
//                               selectedProperty.property_data?.property_price,
//                             ) / 10000000
//                           )
//                             .toFixed(1)
//                             .replace(/\.0$/, "") + " Cr"
//                         : Number(
//                               selectedProperty.property_data?.property_price,
//                             ) >= 100000
//                           ? (
//                               Number(
//                                 selectedProperty.property_data?.property_price,
//                               ) / 100000
//                             )
//                               .toFixed(1)
//                               .replace(/\.0$/, "") + " L"
//                           : Number(
//                                 selectedProperty.property_data?.property_price,
//                               ) >= 1000
//                             ? (
//                                 Number(
//                                   selectedProperty.property_data
//                                     ?.property_price,
//                                 ) / 1000
//                               )
//                                 .toFixed(1)
//                                 .replace(/\.0$/, "") + " K"
//                             : selectedProperty.property_data?.property_price}
//                     </p>
//                   )
//                 )}
//               </div>
//             </div>

//             <div className="flex flex-col md:flex-row p-4 gap-6 bg-white">
//               {/* Left Section - Upload Images */}
//               <div className="md:w-1/2 flex flex-col items-center justify-center bg-gray-100 p-2 border-dashed border-2 border-gray-300 rounded-xl">
//                 <div className="text-center w-full">
//                   <p className="text-gray-500 mb-2">Upload Offer</p>

//                   {previewUrl ? (
//                     <div className="mb-1 relative inline-block">
//                       <button
//                         onClick={handleDeleteImage}
//                         className="absolute top-2 right-2 bg-black bg-opacity-50 p-1 rounded-full"
//                       >
//                         <Trash className="text-white w-4 h-4" />
//                       </button>
//                       <img
//                         src={previewUrl}
//                         alt="Offer Image"
//                         className="w-40 h-28 object-cover mx-auto rounded-lg border shadow-md"
//                       />
//                       <p className="text-sm text-gray-400 mt-1">
//                         Selected image
//                       </p>
//                     </div>
//                   ) : (
//                     <button
//                       type="button"
//                       className="my-bg text-white px-4 py-2 rounded-lg text-sm"
//                       onClick={() =>
//                         document.getElementById("offer_img").click()
//                       }
//                     >
//                       + Add Photos
//                     </button>
//                   )}

//                   <input
//                     id="offer_img"
//                     type="file"
//                     accept="image/*"
//                     style={{ display: "none" }}
//                     onChange={handleImageUpload}
//                   />
//                 </div>
//               </div>

//               <div className="md:w-1/2">
//                 <input
//                   type="text"
//                   placeholder="Offer Name"
//                   value={offerName}
//                   onChange={(e) => setOfferName(e.target.value)}
//                   className="w-full border rounded-lg p-2 mb-3"
//                 />

//                 <textarea
//                   placeholder="Offer Description"
//                   value={offerDescription}
//                   onChange={(e) => setOfferDescription(e.target.value)}
//                   className="w-full border rounded-lg p-2 mb-3"
//                 />
//               </div>
//             </div>

//             <div className="bg-white flex justify-between items-center p-4 border-t">
//               <p className="text-gray-500 font-bold flex items-center">
//                 1 Property Selected
//               </p>
//               <button
//                 className="my-bg text-white px-4 py-2 rounded-lg"
//                 onClick={() => {
//                   handleOfferSubmit();
//                   setShowEditModal(false);
//                   fetchOffers();
//                 }}
//               >
//                 Edit Offer
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Next Modal */}
//       {showNextModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-gray-100 rounded-lg w-full max-w-md md:max-w-3xl relative max-h-[90vh] overflow-y-auto">
//             <div className="bg-white p-4 flex justify-center items-center border-b">
//               <button
//                 className="absolute top-2 left-2 text-black hover:text-black text-2xl"
//                 onClick={() => {
//                   setShowNextModal(false);
//                   setShowModal(true);
//                 }}
//               >
//                 <IoArrowBackCircleOutline />
//               </button>
//               <h2 className="text-xl font-semibold">Offer Details</h2>
//               <button
//                 className="absolute top-2 right-2 text-black hover:text-black text-2xl"
//                 onClick={() => {
//                   fetchOffers();
//                   setShowNextModal(false);
//                 }}
//               >
//                 <IoCloseCircleOutline />
//               </button>
//             </div>

//             {/* Property Card */}
//             <div className="flex items-center bg-white p-3 rounded-lg">
//               {/* Image */}
//               {console.log(
//                 "Selected Property in Next Modal: ",
//                 selectedProperty,
//               )}
//               <div className="relative w-24 h-24">
//                 <img
//                   src={selectedProperty.cover_image}
//                   alt="Property Image"
//                   className="w-full h-full rounded-lg object-cover"
//                 />
//                 <span
//                   className={`absolute top-1 left-1 text-xs px-2 rounded-md ${
//                     selectedProperty.property_category_type === "Buy"
//                       ? "my-bg text-white"
//                       : selectedProperty.property_category_type === "Rent"
//                         ? "bg-green-600 text-white"
//                         : "bg-gray-400 text-white"
//                   }`}
//                 >
//                   {selectedProperty.property_category_type === "Buy"
//                     ? "FOR SALE"
//                     : selectedProperty.property_category_type === "Rent"
//                       ? "FOR RENT"
//                       : "UNKNOWN"}
//                 </span>
//               </div>
//               <div className="ml-3">
//                 <p className="font-semibold">
//                   {selectedProperty.property_name}
//                 </p>
//                 <p className="text-gray-500 text-sm">
//                   {selectedProperty.address_area}
//                 </p>
//                 {/* {selectedProperty.property_category_type === "Rent" ? (
//                   <p className="text-black font-bold mt-1">
//                     ₹ {selectedProperty.rent}
//                     {selectedProperty.rent_duration && selectedProperty.rent_duration !== "N/A"
//                       ? ` / ${selectedProperty.rent_duration}`
//                       : ""}
//                   </p>
//                 ) : (
//                   selectedProperty.property_price &&
//                   selectedProperty.property_price !== "N/A" && (
//                     <p className="text-black font-bold mt-1">₹ {selectedProperty.property_price}</p>
//                   )
//                 )} */}
//                 {selectedProperty.property_category_type === "Rent" ? (
//                   <p className="text-black font-bold mt-1">
//                     ₹{" "}
//                     {Number(selectedProperty.rent) >= 10000000
//                       ? (Number(selectedProperty.rent) / 10000000)
//                           .toFixed(1)
//                           .replace(/\.0$/, "") + " Cr"
//                       : Number(selectedProperty.rent) >= 100000
//                         ? (Number(selectedProperty.rent) / 100000)
//                             .toFixed(1)
//                             .replace(/\.0$/, "") + " L"
//                         : Number(selectedProperty.rent) >= 1000
//                           ? (Number(selectedProperty.rent) / 1000)
//                               .toFixed(1)
//                               .replace(/\.0$/, "") + " K"
//                           : selectedProperty.rent}
//                     {selectedProperty.rent_duration &&
//                     selectedProperty.rent_duration !== "N/A"
//                       ? ` / ${selectedProperty.rent_duration}`
//                       : ""}
//                   </p>
//                 ) : (
//                   selectedProperty.property_price &&
//                   selectedProperty.property_price !== "N/A" && (
//                     <p className="text-black font-bold mt-1">
//                       ₹{" "}
//                       {Number(selectedProperty.property_price) >= 10000000
//                         ? (Number(selectedProperty.property_price) / 10000000)
//                             .toFixed(1)
//                             .replace(/\.0$/, "") + " Cr"
//                         : Number(selectedProperty.property_price) >= 100000
//                           ? (Number(selectedProperty.property_price) / 100000)
//                               .toFixed(1)
//                               .replace(/\.0$/, "") + " L"
//                           : Number(selectedProperty.property_price) >= 1000
//                             ? (Number(selectedProperty.property_price) / 1000)
//                                 .toFixed(1)
//                                 .replace(/\.0$/, "") + " K"
//                             : selectedProperty.property_price}
//                     </p>
//                   )
//                 )}
//               </div>
//             </div>

//             {/* Modal Body with Two Columns */}
//             <div className="flex flex-col md:flex-row p-4 gap-6 bg-white">
//               {/* Left Section - Upload Images */}
//               <div className="md:w-1/2 flex flex-col items-center justify-center bg-gray-100 p-2 border-dashed border-2 border-gray-300 rounded-xl">
//                 <div className="text-center w-full">
//                   <p className="text-gray-500 mb-2">Upload Images</p>

//                   {/* Show Preview if Image is Selected */}
//                   {createOfferPhoto && (
//                     <div className="relative inline-block">
//                       <button
//                         onClick={() => setCreateOfferPhoto(null)}
//                         className="absolute top-2 right-2 bg-black bg-opacity-50 p-1 rounded-full"
//                       >
//                         <Trash className="text-white w-4 h-4" />
//                       </button>

//                       <img
//                         src={URL.createObjectURL(createOfferPhoto)}
//                         alt="Selected"
//                         className="w-40 h-28 object-cover mx-auto rounded-lg border shadow-md"
//                       />
//                       <p className="text-sm text-gray-400 mt-1 text-center">
//                         Selected image
//                       </p>
//                     </div>
//                   )}

//                   {/* Hide Add Button if Image is Already Uploaded */}
//                   {!createOfferPhoto && (
//                     <>
//                       <button
//                         type="button"
//                         className="my-bg text-white px-4 py-2 rounded-lg text-sm"
//                         onClick={() =>
//                           document.getElementById("offer_img").click()
//                         }
//                       >
//                         + Add Photos
//                       </button>
//                       <input
//                         id="offer_img"
//                         type="file"
//                         accept="image/*"
//                         style={{ display: "none" }}
//                         onChange={(e) => setCreateOfferPhoto(e.target.files[0])}
//                       />
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* Right Section - Form Fields */}
//               <div className="md:w-1/2">
//                 <input
//                   type="text"
//                   placeholder="Offer Name"
//                   value={createOfferName}
//                   onChange={(e) => setCreateOfferName(e.target.value)}
//                   className="w-full border rounded-lg p-2 mb-3"
//                 />

//                 <textarea
//                   placeholder="Offer Description"
//                   value={createOfferDescription}
//                   onChange={(e) => setCreateOfferDescription(e.target.value)}
//                   className="w-full border rounded-lg p-2 mb-3"
//                 />
//               </div>
//             </div>

//             {/* Footer */}
//             <div className="bg-white flex justify-between items-center p-4 border-t">
//               <p className="text-gray-500 text-sm">
//                 {selectedProperties.length} Property
//                 {selectedProperties.length !== 1 && "ies"}
//               </p>
//               <button
//                 className="my-bg text-white px-4 py-2 rounded-lg"
//                 onClick={() => {
//                   handleAddOffer();
//                   fetchOffers();
//                   setShowNextModal(false);
//                 }}
//               >
//                 Create Offer
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showOfferCountModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md">
//             <h2 className="text-xl font-semibold mb-4 text-red-600">
//               Offer Posting Limit Reached
//             </h2>
//             <p className="mb-6 text-gray-700">
//               You have reached your maximum limit for posting offers. Please
//               purchase a plan to continue creating new offers.
//             </p>
//             {/* Align buttons side by side on the right */}
//             <div className="flex justify-between items-center px-1">
//               <button
//                 className="my-bg text-white px-4 py-2 rounded hover:bg-green-700"
//                 onClick={() => {
//                   setShowModal(false);
//                   history.push({
//                     pathname: "/dashboard",
//                     state: { page: "mySubscriptions" },
//                   });
//                 }}
//               >
//                 Purchase Plan
//               </button>
//               <button
//                 className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
//                 onClick={() => {
//                   setShowModal(false); // FIXED
//                   history.push("/");
//                 }}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* this is confirmation model tpo delete offres */}
//       {showDeleteModal && offerToDelete && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white rounded-2xl p-6 w-96 text-center shadow-lg relative">
//             {/* Close Icon */}
//             <button
//               className="absolute top-2 right-2 text-black text-2xl"
//               onClick={() => setShowDeleteModal(false)}
//             >
//               <IoCloseCircleOutline />
//             </button>

//             <h2 className="text-2xl font-semibold">Delete Offer?</h2>
//             <p className="text-gray-500 mt-2">
//               Are you sure you want to delete{" "}
//               <strong>{offerToDelete.offer_name}</strong>?
//             </p>

//             <div className="flex justify-center gap-6 mt-4">
//               <button
//                 className="my-bg text-white px-8 py-2 rounded-md"
//                 onClick={async () => {
//                   try {
//                     const { data } = await axios.delete(
//                       `${process.env.REACT_APP_API_URL}/cust_api/delete_offer`,
//                       {
//                         data: {
//                           user_id: offerToDelete.user_id,
//                           offer_auto_id: offerToDelete._id,
//                         },
//                         headers: { "Content-Type": "application/json" },
//                       },
//                     );

//                     if (data.status === 1) {
//                       // Remove offer from UI
//                       setOfferProjects((prev) =>
//                         prev.filter((o) => o._id !== offerToDelete._id),
//                       );
//                       setShowDeleteModal(false); // Close modal
//                       toast.success("Offer deleted successfully!"); // ✅ Show success toast
//                     } else {
//                       toast.error(data.detail || "Failed to delete offer"); // Show error toast
//                     }
//                   } catch (err) {
//                     console.error(err);
//                     toast.error("Something went wrong"); // Show error toast
//                   }
//                 }}
//               >
//                 Yes, Delete
//               </button>

//               <button
//                 className="bg-white border border-black text-black px-8 py-2 rounded-md"
//                 onClick={() => setShowDeleteModal(false)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showReasonModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white rounded-2xl p-6 w-96 text-center shadow-lg relative">
//             {/* Close (X) Icon */}
//             <button
//               className="absolute top-2 right-2 text-black text-2xl"
//               onClick={() => setShowReasonModal(false)}
//             >
//               <IoCloseCircleOutline />
//             </button>

//             <h2 className="text-2xl font-semibold my-text">Reason</h2>
//             <p className="text-gray-500 mt-2">{selectedReason}</p>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };
// export default Offer;

import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Tag,
  House,
  MagnifyingGlass,
  X,
  Plus,
  MapPin,
  CalendarBlank,
  Eye,
  Users,
  PencilSimple,
  Trash,
  Info,
  ArrowLeft,
  ArrowRight,
  ImageSquare,
  CheckCircle,
  WarningCircle,
  CaretLeft,
  CaretRight,
  Sparkle,
  Buildings,
} from "@phosphor-icons/react";

// ==========================================================
// Helpers (outside the component so they never remount)
// ==========================================================

const API = (process.env.REACT_APP_API_URL || "").replace(/\/$/, "");

// Works for "/media/x.jpg", "media/x.jpg" and full URLs.
// (Before, some paths were joined with a "/" and some without.)
const imgSrc = (path, fallback = "/image/app.png") => {
  if (!path || path === "null" || path === "undefined") return fallback;
  if (/^(https?:|data:|blob:)/.test(path)) return path;
  return `${API}/${String(path).replace(/^\//, "")}`;
};

// 1800000 -> "18 L", 20000 -> "20 K"
const formatAmount = (raw) => {
  const n = Number(raw);
  if (raw === null || raw === undefined || raw === "" || Number.isNaN(n)) return raw;
  const trim = (v) => v.toFixed(1).replace(/\.0$/, "");
  if (n >= 10000000) return `${trim(n / 10000000)} Cr`;
  if (n >= 100000) return `${trim(n / 100000)} L`;
  if (n >= 1000) return `${trim(n / 1000)} K`;
  return n;
};

// One price line for any property object (rent / PG show rent + duration).
const priceText = (p) => {
  if (!p) return "";
  if (p.property_category_type === "Rent" || p.property_category_type === "PG/Co-living") {
    if (!p.rent) return "";
    const d = p.rent_duration && p.rent_duration !== "N/A" ? ` / ${p.rent_duration}` : "";
    return `₹ ${formatAmount(p.rent)}${d}`;
  }
  if (!p.property_price || p.property_price === "N/A") return "";
  return `₹ ${formatAmount(p.property_price)}`;
};

// FIX: anything other than Buy / Rent used to show "UNKNOWN".
const CATEGORY = {
  Buy: { label: "For Buy", cls: "bg-[#D61F45]" },
  Rent: { label: "For Rent", cls: "bg-blue-600" },
  "Commercial Buy": { label: "Commercial Buy", cls: "bg-purple-600" },
  "Commercial Lease": { label: "Commercial Lease", cls: "bg-indigo-600" },
  "PG/Co-living": { label: "PG / Co-living", cls: "bg-amber-500" },
};
const badgeFor = (cat) => CATEGORY[cat] || { label: cat || "Property", cls: "bg-gray-500" };

const STATUS = {
  Approved: "bg-green-100 text-green-700",
  Pending: "bg-[#FFF4D6] text-[#A16207]",
  Rejected: "bg-red-100 text-red-700",
  Disapproved: "bg-red-100 text-red-700",
};

const formatDate = (d) => {
  const date = d ? new Date(d) : null;
  return date && !isNaN(date.getTime())
    ? date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    : "—";
};

// ---------- Small UI pieces ----------

const ModalShell = ({ onClose, children, maxWidth = "max-w-3xl" }) => (
  <div
    className="fixed inset-0 z-[1100] flex items-center justify-center px-4 bg-black bg-opacity-50"
    onMouseDown={(e) => e.target === e.currentTarget && onClose()}
  >
    <div
      className={`relative flex flex-col w-full ${maxWidth} max-h-[90vh] overflow-hidden bg-white shadow-2xl rounded-3xl`}
      role="dialog"
      aria-modal="true"
    >
      {children}
    </div>
  </div>
);

const ModalHeader = ({ icon: Icon, title, subtitle, onClose, onBack }) => (
  <div className="relative flex items-center gap-3 px-6 py-5 text-white bg-gradient-to-r from-[#D61F45] to-[#E8456A]">
    {onBack && (
      <button
        type="button"
        onClick={onBack}
        aria-label="Back"
        className="flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30"
      >
        <ArrowLeft size={18} weight="bold" />
      </button>
    )}
    <span className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full bg-white/20 ring-2 ring-white/40">
      <Icon size={24} weight="fill" />
    </span>
    <div className="min-w-0 pr-10">
      <h2 className="m-0 text-xl font-bold text-white">{title}</h2>
      {subtitle && <p className="m-0 text-[13px] text-white/85">{subtitle}</p>}
    </div>
    <button
      type="button"
      onClick={onClose}
      aria-label="Close"
      className="absolute flex items-center justify-center w-8 h-8 text-[#D61F45] bg-white rounded-full shadow top-4 right-4 hover:scale-105 transition-transform"
    >
      <X size={16} weight="bold" />
    </button>
  </div>
);

// Selected property strip used in the Create / Edit popups
const PropertySummary = ({ p }) => {
  if (!p) return null;
  const badge = badgeFor(p.property_category_type);
  return (
    <div className="flex items-center gap-4 p-3 rounded-2xl bg-[#FFF7F9] border border-[#FDE8EC]">
      <div className="relative flex-shrink-0 w-24 h-20 overflow-hidden rounded-xl bg-[#FFF1F4]">
        <img src={imgSrc(p.cover_image)} alt={p.property_name || "Property"} className="object-cover w-full h-full" />
        <span className={`absolute top-1 left-1 px-1.5 py-0.5 text-[9px] font-bold text-white uppercase rounded ${badge.cls}`}>
          {badge.label}
        </span>
      </div>
      <div className="min-w-0">
        <p className="m-0 font-bold text-[#17253a] truncate">{p.property_name}</p>
        <p className="flex items-center gap-1 m-0 mt-0.5 text-[13px] text-gray-500">
          <MapPin size={13} weight="fill" className="flex-shrink-0 text-[#D61F45]" />
          <span className="truncate">{p.address_area}</span>
        </p>
        {priceText(p) && <p className="m-0 mt-1 font-bold text-[#D61F45]">{priceText(p)}</p>}
      </div>
    </div>
  );
};

// Photo picker (dashed box) used in the Create / Edit popups
const PhotoPicker = ({ preview, onPick, onRemove, label = "Upload an offer banner" }) => {
  const inputRef = useRef(null);
  return (
    <div className="flex items-center justify-center p-3 border-2 border-dashed rounded-2xl border-[#FAD3DB] bg-[#FFF7F9] min-h-[200px]">
      {preview ? (
        <div className="relative w-full">
          <img src={preview} alt="Offer" className="object-cover w-full h-44 rounded-xl" />
          <button
            type="button"
            onClick={onRemove}
            aria-label="Remove photo"
            className="absolute flex items-center justify-center w-8 h-8 text-[#D61F45] bg-white rounded-full shadow top-2 right-2 hover:bg-[#FDE8EC]"
          >
            <Trash size={16} weight="bold" />
          </button>
        </div>
      ) : (
        <div className="text-center">
          <span className="flex items-center justify-center mx-auto mb-2 rounded-full w-14 h-14 bg-[#FDE8EC] text-[#D61F45]">
            <ImageSquare size={26} />
          </span>
          <p className="m-0 mb-3 text-[13px] text-gray-500">{label}</p>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold text-white rounded-xl bg-gradient-to-r from-[#D61F45] to-[#B91C3C]"
          >
            <Plus size={14} weight="bold" />
            Add Photos
          </button>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onPick(file);
          e.target.value = "";
        }}
      />
    </div>
  );
};

const fieldClass =
  "w-full px-3 text-[14px] text-[#17253a] bg-white border border-gray-200 rounded-xl outline-none focus:border-[#D61F45] focus:ring-2 focus:ring-[#FDE8EC]";

const OfferFields = ({ name, setName, description, setDescription }) => (
  <div className="space-y-4">
    <label className="block">
      <span className="block mb-1 text-[12px] font-semibold text-gray-600">Offer Name</span>
      <input
        type="text"
        placeholder="Offer Name"
        value={name || ""}
        onChange={(e) => setName(e.target.value)}
        className={`${fieldClass} h-11`}
      />
    </label>
    <label className="block">
      <span className="block mb-1 text-[12px] font-semibold text-gray-600">Offer Description</span>
      <textarea
        placeholder="Offer Description"
        rows={5}
        value={description || ""}
        onChange={(e) => setDescription(e.target.value)}
        className={`${fieldClass} py-2.5 resize-none`}
      />
    </label>
  </div>
);

// Empty state illustration — offer sheet with a house and a red price tag
const EmptyOffers = ({ searching }) => (
  <div className="relative flex flex-col items-center justify-center px-4 py-14 overflow-hidden text-center">
    <div aria-hidden="true" className="relative mb-5 w-60 h-48">
      <span className="absolute w-40 h-40 -translate-x-1/2 rounded-full left-1/2 top-4 bg-[#FDE8EC]" />
      <Sparkle size={18} weight="fill" className="absolute top-0 text-[#F4A7B6] left-24" />
      <Sparkle size={26} weight="fill" className="absolute top-6 right-6 text-[#F4A7B6]" />
      <Sparkle size={20} weight="fill" className="absolute left-4 bottom-16 text-[#F4A7B6]" />
      <div className="absolute flex flex-col gap-2 p-4 -translate-x-1/2 bg-white shadow-[0_14px_30px_rgba(214,31,69,0.18)] w-36 h-40 left-1/2 top-4 rounded-2xl">
        <div className="flex items-center gap-2">
          <House size={30} weight="fill" className="text-[#D61F45]" />
          <div className="flex-1 space-y-1.5">
            <span className="block h-1.5 rounded-full bg-[#FAD3DB]" />
            <span className="block w-2/3 h-1.5 rounded-full bg-[#FAD3DB]" />
          </div>
        </div>
        <span className="block h-1.5 mt-2 rounded-full bg-[#FDE8EC]" />
        <span className="block h-1.5 rounded-full bg-[#FDE8EC]" />
        <span className="block w-3/4 h-1.5 rounded-full bg-[#FDE8EC]" />
        <span className="block w-1/2 h-1.5 rounded-full bg-[#FDE8EC]" />
      </div>
      <span className="absolute flex items-center justify-center w-16 h-16 text-white rounded-full shadow-[0_10px_22px_rgba(214,31,69,0.4)] bg-gradient-to-br from-[#E8456A] to-[#D61F45] right-10 bottom-0">
        <Tag size={30} weight="fill" />
      </span>
    </div>
    <p className="m-0 text-[16px] text-gray-500">
      {searching ? "No results found for your search." : "No data available."}
    </p>
  </div>
);

const Offer = () => {
  const [projects, setProjects] = useState([]);
  const [offerProjects, setOfferProjects] = useState([]);
  const [showModal, setShowModal] = useState(false); // Select property
  const [showNextModal, setShowNextModal] = useState(false); // Create offer
  const [showEditModal, setShowEditModal] = useState(false); // Edit offer
  const [currentPage, setCurrentPage] = useState(1);
  const [TotalCount, setTotalCount] = useState(0);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(TotalCount / itemsPerPage);
  const [loading, setLoading] = useState(false);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const userId = sessionStorage.getItem("accessToken");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOfferTerm, setSearchOfferTerm] = useState("");
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [offerToDelete, setOfferToDelete] = useState(null);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const history = useHistory();

  // Edit an offer
  const [offerName, setOfferName] = useState("");
  const [offerDescription, setOfferDescription] = useState("");
  const [offerPhoto, setOfferPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  // Create a new offer
  const [createOfferName, setCreateOfferName] = useState("");
  const [createOfferDescription, setCreateOfferDescription] = useState("");
  const [createOfferPhoto, setCreateOfferPhoto] = useState(null);
  const [showOfferCountModal, setShowOfferCountModal] = useState(false);
  const [offerCount, setOfferCount] = useState(0);

  // FIX: the preview URL was re-created on every render (memory leak).
  const createPreview = useMemo(
    () => (createOfferPhoto ? URL.createObjectURL(createOfferPhoto) : ""),
    [createOfferPhoto],
  );
  useEffect(() => () => createPreview && URL.revokeObjectURL(createPreview), [createPreview]);

  useEffect(() => {
    const checkPostLimits = async () => {
      try {
        const profileForm = new FormData();
        profileForm.append("user_id", userId);

        const profileResponse = await axios.post(
          `${process.env.REACT_APP_API_URL}/cust_api/get_profile`,
          profileForm,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        const countData = profileResponse?.data?.count_data;
        if (countData) {
          setOfferCount(countData.offer_count || 0);
        }
      } catch (error) {
        console.error("Error checking post limits:", error);
      }
    };

    if (userId) {
      checkPostLimits();
    }
  }, [userId]);

  const fetchProjects = async () => {
    setProjectsLoading(true);
    try {
      const formData2 = new FormData();
      formData2.append("user_id", userId);
      formData2.append("page_size", 999999);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/cust_api/get-listing-properties`,
        formData2,
      );

      if (response.data?.data) {
        setProjects(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    } finally {
      setProjectsLoading(false);
    }
  };

  const fetchOffers = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("user_id", userId);
      formData.append("page", currentPage);
      formData.append("page_size", itemsPerPage);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/cust_api/get_offer`,
        formData,
      );

      if (response.data && response.data.data) {
        setOfferProjects(response.data.data);
        setTotalCount(response.data.total_count || 0);
      } else {
        setOfferProjects([]);
        setTotalCount(0);
      }
    } catch (error) {
      console.error("Failed to fetch offers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchOffers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, currentPage]);

  // FIX: offers already come one page at a time from the API. The old code
  // sliced that page AGAIN by page number (so page 2+ was always empty) and
  // reset to page 1 every time new offers loaded (so you could never leave
  // page 1). Search now filters the loaded page, and only a new search
  // term goes back to page 1.
  const filteredOffers = useMemo(() => {
    const search = searchOfferTerm.toLowerCase().trim();
    if (!search) return offerProjects;
    return offerProjects.filter((offer) =>
      [
        offer.offer_name,
        offer.offer_description,
        offer.property_data?.property_name,
        offer.property_data?.address_area,
      ]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(search)),
    );
  }, [searchOfferTerm, offerProjects]);

  const firstSearch = useRef(true);
  useEffect(() => {
    if (firstSearch.current) {
      firstSearch.current = false;
      return;
    }
    setCurrentPage(1);
  }, [searchOfferTerm]);

  // Properties for the "Select Property" popup
  const filteredProjects = (projects || []).filter((project) => {
    if (!project || typeof project !== "object") return false;
    const search = String(searchTerm).toLowerCase().trim();
    const title = String(project.property_name || "").toLowerCase();
    const location = String(project.address || project.address_area || "").toLowerCase();
    return title.includes(search) || location.includes(search);
  });

  const toggleSelect = (propertyId) => {
    if (selectedProperties.includes(propertyId)) {
      setSelectedProperties([]);
      setSelectedProperty(null);
    } else {
      const selected = filteredProjects.find((p) => p._id === propertyId);
      setSelectedProperties([propertyId]);
      setSelectedProperty(selected);
    }
  };

  // Open the Edit popup with this offer's saved values.
  // FIX: an effect used to overwrite these fields whenever ANY property was
  // selected (including in the Create flow), with undefined values.
  const handlePropertyClick = (offer) => {
    setSelectedProperty(offer);
    setOfferName(offer.offer_name || "");
    setOfferDescription(offer.offer_description || "");
    const url = offer.offer_img ? imgSrc(offer.offer_img, "") : "";
    setOfferPhoto(url || null);
    setPreviewUrl(url);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    setShowEditModal(false);
    setSelectedProperty(null);
    setOfferName("");
    setOfferDescription("");
    setOfferPhoto(null);
    setPreviewUrl("");
  };

  const handleOfferSubmit = async () => {
    if (!userId) {
      toast.error("You must be logged in to create an offer.");
      return;
    }

    if (!offerName || !offerDescription || !selectedProperty?._id) {
      toast.error("Please fill all fields and upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("user_id", selectedProperty.user_id);
    formData.append("offer_auto_id", selectedProperty._id);
    formData.append("offer_name", offerName);
    formData.append("offer_description", offerDescription);

    if (offerPhoto instanceof File) {
      formData.append("offer_img", offerPhoto);
    }

    setSaving(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/cust_api/update_offer`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Offer edited successfully!");
        closeEditModal();
        fetchOffers();
        // FIX: this used to overwrite the offer COUNT with total_pages.
      } else {
        toast.error(data?.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error submitting offer:", error);
      toast.error("Error submitting offer.");
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = (file) => {
    if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    setOfferPhoto(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleDeleteImage = () => {
    if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    setOfferPhoto(null);
    setPreviewUrl("");
  };

  const handleAddOffer = async () => {
    if (!userId) {
      toast.error("You must be logged in to create an offer.");
      return;
    }

    if (!createOfferName || !createOfferDescription || !selectedProperty?._id) {
      toast.error("Please fill all fields and upload an image.");
      return;
    }

    const formData4 = new FormData();
    formData4.append("user_id", selectedProperty.user_id);
    formData4.append("property_id", selectedProperty._id);
    formData4.append("offer_name", createOfferName);
    formData4.append("offer_description", createOfferDescription);
    // FIX: used to send the text "null" when no photo was picked.
    if (createOfferPhoto instanceof File) {
      formData4.append("offer_img", createOfferPhoto);
    }

    setSaving(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/cust_api/add_offer`, {
        method: "POST",
        body: formData4,
      });

      const data = await res.json();
      if (res.ok && data.status === 1) {
        toast.success("Offer created successfully!");
        setShowNextModal(false);
        resetOfferFormFields();
        fetchOffers();
      } else {
        // FIX: keeps the popup open so nothing typed is lost, and no longer
        // wipes the offer count on an error.
        toast.error(data?.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error creating offer:", error);
      toast.error("Error creating offer.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteOffer = async () => {
    if (!offerToDelete) return;
    try {
      const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}/cust_api/delete_offer`, {
        data: {
          user_id: offerToDelete.user_id,
          offer_auto_id: offerToDelete._id,
        },
        headers: { "Content-Type": "application/json" },
      });

      if (data.status === 1) {
        setOfferProjects((prev) => prev.filter((o) => o._id !== offerToDelete._id));
        setTotalCount((c) => Math.max(0, c - 1));
        setShowDeleteModal(false);
        setOfferToDelete(null);
        toast.success("Offer deleted successfully!");
      } else {
        toast.error(data.detail || "Failed to delete offer");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    const anyOpen =
      showModal ||
      showEditModal ||
      showNextModal ||
      showDeleteModal ||
      showReasonModal ||
      showOfferCountModal;
    document.body.style.overflow = anyOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal, showEditModal, showNextModal, showDeleteModal, showReasonModal, showOfferCountModal]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const resetOfferFormFields = () => {
    setSearchTerm("");
    setCreateOfferName("");
    setCreateOfferDescription("");
    setCreateOfferPhoto(null);
    setSelectedProperty(null);
    setSelectedProperties([]);
  };

  const openCreateFlow = () => {
    if (offerCount <= 0) {
      setShowOfferCountModal(true);
    } else {
      resetOfferFormFields();
      setShowModal(true);
      fetchProjects();
    }
  };

  const selectedCount = selectedProperties.length;

  return (
    <>
      <div className="relative w-full overflow-hidden bg-white border border-[#FDE8EC] rounded-3xl shadow-[0_10px_30px_rgba(214,31,69,0.06)] min-h-[560px]">
        {/* soft background shapes */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <span className="absolute rounded-full -left-32 top-48 w-80 h-80 bg-[#FFF1F4]" />
          <span className="absolute rounded-full -right-24 top-40 w-72 h-72 bg-[#FFF1F4]" />
          <div className="absolute bottom-0 right-6 flex items-end gap-1 text-[#D61F45] opacity-[0.12]">
            <Buildings size={90} weight="fill" />
            <House size={130} weight="fill" />
          </div>
        </div>

        <div className="relative p-5 md:p-8">
          {/* ==================================================
              Header — "My Offers" + search + Create
          ================================================== */}
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0">
              <p className="flex items-center gap-3 m-0 text-[12px] font-semibold tracking-[0.3em] text-[#D61F45] uppercase">
                My Account
                <span className="w-12 h-[2px] rounded-full bg-[#FAD3DB]" />
              </p>
              <h2 className="m-0 mt-2 text-3xl font-extrabold leading-tight md:text-[44px] text-[#17253a]">
                My <span className="text-[#D61F45]">Offers</span>
              </h2>
              <p className="m-0 mt-2 text-[14px] md:text-[16px] text-gray-600">
                View and manage all offers on your properties.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row xl:flex-shrink-0">
              <div className="relative sm:w-80">
                <MagnifyingGlass
                  size={18}
                  weight="bold"
                  className="absolute text-gray-400 -translate-y-1/2 pointer-events-none left-3.5 top-1/2"
                />
                <input
                  type="text"
                  placeholder="Search properties..."
                  className="w-full h-12 pl-11 pr-10 text-[14px] text-[#17253a] bg-white border border-gray-200 rounded-xl outline-none placeholder:text-gray-400 focus:border-[#D61F45] focus:ring-2 focus:ring-[#FDE8EC]"
                  value={searchOfferTerm}
                  onChange={(e) => setSearchOfferTerm(e.target.value)}
                />
                {searchOfferTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchOfferTerm("")}
                    className="absolute flex items-center justify-center w-6 h-6 text-gray-500 -translate-y-1/2 rounded-full right-3 top-1/2 hover:bg-[#FDE8EC] hover:text-[#D61F45]"
                    aria-label="Clear search"
                  >
                    <X size={14} weight="bold" />
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={openCreateFlow}
                className="flex items-center justify-center gap-2 px-6 h-12 text-[15px] font-semibold text-white rounded-xl bg-gradient-to-r from-[#D61F45] to-[#B91C3C] shadow-[0_6px_18px_rgba(214,31,69,0.35)] hover:shadow-[0_10px_24px_rgba(214,31,69,0.45)] transition-shadow whitespace-nowrap"
              >
                <Plus size={17} weight="bold" />
                Create New Offer
              </button>
            </div>
          </div>

          {/* ==================================================
              Offer cards
          ================================================== */}
          <div className="mt-6 space-y-4">
            {loading && offerProjects.length === 0 ? (
              [0, 1].map((i) => (
                <div key={i} className="flex gap-4 p-4 bg-white border border-[#FDE8EC] rounded-2xl animate-pulse">
                  <div className="w-40 h-28 rounded-xl bg-[#FDE8EC]" />
                  <div className="flex-1 space-y-3">
                    <div className="w-1/3 h-4 rounded bg-[#FDE8EC]" />
                    <div className="w-1/2 h-5 rounded bg-[#FFF1F4]" />
                    <div className="w-1/4 h-4 rounded bg-[#FFF1F4]" />
                  </div>
                </div>
              ))
            ) : filteredOffers.length === 0 ? (
              <EmptyOffers searching={searchOfferTerm.trim() !== ""} />
            ) : (
              filteredOffers.map((offer) => {
                const p = offer.property_data || {};
                const badge = badgeFor(p.property_category_type);
                const rejected = offer.status === "Rejected" || offer.status === "Disapproved";
                return (
                  <div
                    key={offer._id}
                    className="flex flex-col gap-4 p-4 bg-white border border-[#FDE8EC] rounded-2xl shadow-[0_8px_24px_rgba(214,31,69,0.06)] transition-shadow hover:shadow-[0_12px_32px_rgba(214,31,69,0.12)] lg:flex-row lg:items-center"
                  >
                    {/* Image + details */}
                    <div className="flex flex-1 min-w-0 gap-4">
                      <Link
                        to={{ pathname: `/offerdetail/${offer?.property_id}`, state: { offer } }}
                        className="relative flex-shrink-0 block w-32 overflow-hidden h-28 sm:w-44 sm:h-32 rounded-xl bg-[#FFF1F4]"
                      >
                        <img
                          src={imgSrc(p.cover_image)}
                          alt={p.property_name || "Property"}
                          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                        />
                        <span className={`absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase rounded-md shadow ${badge.cls}`}>
                          {badge.label}
                        </span>
                      </Link>

                      <div className="min-w-0 self-center">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`px-2.5 py-0.5 text-[11px] font-bold rounded-md ${STATUS[offer.status] || "bg-gray-100 text-gray-600"}`}>
                            {offer.status || "Pending"}
                          </span>
                          {offer.offer_name && (
                            <span className="flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-semibold rounded-md bg-[#FDE8EC] text-[#D61F45] max-w-[220px]">
                              <Tag size={12} weight="fill" className="flex-shrink-0" />
                              <span className="truncate">{offer.offer_name}</span>
                            </span>
                          )}
                        </div>
                        <h3 className="m-0 mt-1.5 text-[17px] font-bold text-[#17253a] truncate">{p.property_name}</h3>
                        <p className="flex items-center gap-1 m-0 mt-1 text-[13px] text-gray-500">
                          <MapPin size={14} weight="fill" className="flex-shrink-0 text-[#D61F45]" />
                          <span className="truncate">{p.address_area}</span>
                        </p>
                        {priceText(p) && (
                          <p className="m-0 mt-1 text-[17px] font-bold text-[#D61F45]">{priceText(p)}</p>
                        )}
                        <p className="flex items-center gap-1 m-0 mt-1 text-[12px] text-gray-400">
                          <CalendarBlank size={14} />
                          Posted on: {formatDate(offer.created_at)}
                        </p>
                      </div>
                    </div>

                    {/* Stats + actions */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:flex-col lg:items-end">
                      <div className="flex gap-3">
                        {[
                          { icon: Eye, label: "Views", value: p.view_count || "0" },
                          { icon: Users, label: "Leads", value: p.leads_count || "0" },
                        ].map(({ icon: Icon, label, value }) => (
                          <div key={label} className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#FFF1F4] min-w-[110px]">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FDE8EC] text-[#D61F45]">
                              <Icon size={18} weight="fill" />
                            </span>
                            <div className="leading-tight">
                              <p className="m-0 text-[11px] text-gray-500">{label}</p>
                              <p className="m-0 text-[15px] font-bold text-[#17253a]">{value}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-2.5">
                        <button
                          type="button"
                          onClick={() => handlePropertyClick(offer)}
                          className="flex items-center justify-center gap-2 px-5 py-2 text-[13px] font-semibold text-[#D61F45] bg-white border-[1.5px] border-[#D61F45] rounded-xl transition-colors hover:bg-[#FDE8EC]"
                        >
                          <PencilSimple size={16} weight="bold" />
                          Edit Offer
                        </button>

                        {offer.status === "Approved" ? (
                          <button
                            type="button"
                            onClick={() => {
                              setOfferToDelete(offer);
                              setShowDeleteModal(true);
                            }}
                            className="flex items-center justify-center gap-2 px-5 py-2 text-[13px] font-semibold text-white rounded-xl bg-gradient-to-r from-[#D61F45] to-[#B91C3C] shadow-[0_4px_12px_rgba(214,31,69,0.3)]"
                          >
                            <Trash size={16} weight="bold" />
                            Delete
                          </button>
                        ) : rejected ? (
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedReason(offer.reason || "No reason provided");
                              setShowReasonModal(true);
                            }}
                            className="flex items-center justify-center gap-2 px-5 py-2 text-[13px] font-semibold text-[#17253a] bg-white border-[1.5px] border-gray-300 rounded-xl hover:bg-gray-50"
                          >
                            <Info size={16} weight="bold" />
                            View Reason
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })
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
      </div>

      {/* ==================================================
          Step 1 — Select Property
      ================================================== */}
      {showModal && (
        <ModalShell
          onClose={() => {
            resetOfferFormFields();
            setShowModal(false);
          }}
        >
          <ModalHeader
            icon={House}
            title="Select Property"
            subtitle="Choose the property this offer is for"
            onClose={() => {
              resetOfferFormFields();
              setShowModal(false);
            }}
          />

          <div className="px-5 pt-4">
            <div className="relative">
              <MagnifyingGlass size={18} weight="bold" className="absolute text-gray-400 -translate-y-1/2 pointer-events-none left-3.5 top-1/2" />
              <input
                type="text"
                placeholder="Search properties..."
                className="w-full h-11 pl-11 pr-3 text-[14px] text-[#17253a] bg-[#FFF7F9] border border-[#FDE8EC] rounded-xl outline-none focus:bg-white focus:border-[#D61F45] focus:ring-2 focus:ring-[#FDE8EC]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 px-5 py-4 space-y-3 overflow-y-auto">
            {projectsLoading ? (
              <p className="py-10 m-0 text-center text-[14px] text-gray-500">Loading your properties...</p>
            ) : filteredProjects.length === 0 ? (
              <p className="py-10 m-0 text-center text-[14px] text-gray-500">No properties found.</p>
            ) : (
              filteredProjects.map((project) => {
                const checked = selectedProperties.includes(project._id);
                const badge = badgeFor(project.property_category_type);
                return (
                  <label
                    key={project._id}
                    className={`flex items-center gap-4 p-3 border cursor-pointer rounded-2xl transition-all ${checked
                      ? "bg-[#FFF1F4] border-[#D61F45] shadow-[0_6px_16px_rgba(214,31,69,0.12)]"
                      : "bg-white border-[#FDE8EC] hover:border-[#FAD3DB]"
                      }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleSelect(project._id)}
                      className="flex-shrink-0 w-5 h-5"
                      style={{ accentColor: "#D61F45" }}
                    />
                    <div className="relative flex-shrink-0 w-24 h-20 overflow-hidden rounded-xl bg-[#FFF1F4]">
                      <img src={imgSrc(project.cover_image)} alt={project.property_name || "Property"} className="object-cover w-full h-full" />
                      <span className={`absolute top-1 left-1 px-1.5 py-0.5 text-[9px] font-bold text-white uppercase rounded ${badge.cls}`}>
                        {badge.label}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="m-0 text-[15px] font-bold text-[#17253a] truncate">{project.property_name}</h3>
                      <p className="flex items-center gap-1 m-0 mt-0.5 text-[13px] text-gray-500">
                        <MapPin size={13} weight="fill" className="flex-shrink-0 text-[#D61F45]" />
                        <span className="truncate">{project.address_area}</span>
                      </p>
                      {priceText(project) && (
                        <p className="m-0 mt-1 text-[15px] font-bold text-[#D61F45]">{priceText(project)}</p>
                      )}
                    </div>
                    {checked && <CheckCircle size={24} weight="fill" className="flex-shrink-0 text-[#D61F45]" />}
                  </label>
                );
              })
            )}
          </div>

          <div className="flex items-center justify-between gap-3 px-5 py-4 border-t border-[#FDE8EC] bg-[#FFF7F9]">
            <p className="flex items-center gap-1.5 m-0 text-[13px] font-semibold text-gray-600">
              <House size={16} weight="fill" className="text-[#D61F45]" />
              {selectedCount} Property Selected
            </p>
            <button
              type="button"
              className="flex items-center gap-2 px-6 py-2.5 text-[14px] font-semibold text-white rounded-xl bg-gradient-to-r from-[#D61F45] to-[#B91C3C] shadow-[0_6px_18px_rgba(214,31,69,0.35)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
              disabled={selectedCount === 0}
              onClick={() => {
                setShowModal(false);
                setShowNextModal(true);
              }}
            >
              Next
              <ArrowRight size={16} weight="bold" />
            </button>
          </div>
        </ModalShell>
      )}

      {/* ==================================================
          Step 2 — Offer Details (create)
      ================================================== */}
      {showNextModal && selectedProperty && (
        <ModalShell
          onClose={() => {
            setShowNextModal(false);
            fetchOffers();
          }}
        >
          <ModalHeader
            icon={Tag}
            title="Offer Details"
            subtitle="Create a special offer for this property"
            onBack={() => {
              setShowNextModal(false);
              setShowModal(true);
            }}
            onClose={() => {
              setShowNextModal(false);
              fetchOffers();
            }}
          />
          <div className="flex-1 p-5 space-y-5 overflow-y-auto">
            <PropertySummary p={selectedProperty} />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <PhotoPicker
                preview={createPreview}
                onPick={(file) => setCreateOfferPhoto(file)}
                onRemove={() => setCreateOfferPhoto(null)}
                label="Upload Images"
              />
              <OfferFields
                name={createOfferName}
                setName={setCreateOfferName}
                description={createOfferDescription}
                setDescription={setCreateOfferDescription}
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-3 px-5 py-4 border-t border-[#FDE8EC] bg-[#FFF7F9]">
            {/* FIX: used to read "1 Property" / "2 Propertyies" */}
            <p className="flex items-center gap-1.5 m-0 text-[13px] font-semibold text-gray-600">
              <House size={16} weight="fill" className="text-[#D61F45]" />
              {selectedCount} {selectedCount === 1 ? "Property" : "Properties"} Selected
            </p>
            <button
              type="button"
              disabled={saving}
              onClick={handleAddOffer}
              className="flex items-center gap-2 px-6 py-2.5 text-[14px] font-semibold text-white rounded-xl bg-gradient-to-r from-[#D61F45] to-[#B91C3C] shadow-[0_6px_18px_rgba(214,31,69,0.35)] disabled:opacity-60 disabled:cursor-wait"
            >
              <Tag size={16} weight="fill" />
              {saving ? "Creating..." : "Create Offer"}
            </button>
          </div>
        </ModalShell>
      )}

      {/* ==================================================
          Edit Offer
      ================================================== */}
      {showEditModal && selectedProperty && (
        <ModalShell onClose={closeEditModal}>
          <ModalHeader
            icon={PencilSimple}
            title="Edit Offer"
            subtitle={selectedProperty.offer_name || "Update your offer details"}
            onClose={closeEditModal}
          />
          <div className="flex-1 p-5 space-y-5 overflow-y-auto">
            <PropertySummary p={selectedProperty.property_data} />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <PhotoPicker
                preview={previewUrl}
                onPick={handleImageUpload}
                onRemove={handleDeleteImage}
                label="Upload Offer"
              />
              <OfferFields
                name={offerName}
                setName={setOfferName}
                description={offerDescription}
                setDescription={setOfferDescription}
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-3 px-5 py-4 border-t border-[#FDE8EC] bg-[#FFF7F9]">
            <p className="flex items-center gap-1.5 m-0 text-[13px] font-semibold text-gray-600">
              <House size={16} weight="fill" className="text-[#D61F45]" />1 Property Selected
            </p>
            {/* FIX: the popup used to close before the save finished */}
            <button
              type="button"
              disabled={saving}
              onClick={handleOfferSubmit}
              className="flex items-center gap-2 px-6 py-2.5 text-[14px] font-semibold text-white rounded-xl bg-gradient-to-r from-[#D61F45] to-[#B91C3C] shadow-[0_6px_18px_rgba(214,31,69,0.35)] disabled:opacity-60 disabled:cursor-wait"
            >
              <PencilSimple size={16} weight="bold" />
              {saving ? "Saving..." : "Edit Offer"}
            </button>
          </div>
        </ModalShell>
      )}

      {/* ==================================================
          Offer limit reached
          FIX: the buttons closed the wrong popup, so this one never closed,
          and Cancel sent you to the home page.
      ================================================== */}
      {showOfferCountModal && (
        <ModalShell onClose={() => setShowOfferCountModal(false)} maxWidth="max-w-md">
          <div className="p-6 text-center">
            <div className="flex items-center justify-center mx-auto mb-3 rounded-full w-14 h-14 bg-[#FDE8EC] text-[#D61F45]">
              <WarningCircle size={30} weight="fill" />
            </div>
            <h2 className="text-xl font-bold text-[#17253a]">Offer Posting Limit Reached</h2>
            <p className="mt-2 text-sm text-gray-500">
              You have reached your maximum limit for posting offers. Please
              purchase a plan to continue creating new offers.
            </p>
            <div className="grid grid-cols-2 gap-3 mt-5">
              <button
                type="button"
                className="py-2.5 font-semibold bg-white border-[1.5px] rounded-xl border-[#D61F45] text-[#D61F45] hover:bg-[#FDE8EC]"
                onClick={() => setShowOfferCountModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="py-2.5 font-semibold text-white rounded-xl bg-gradient-to-r from-[#D61F45] to-[#B91C3C] shadow-[0_6px_18px_rgba(214,31,69,0.35)]"
                onClick={() => {
                  setShowOfferCountModal(false);
                  history.push({ pathname: "/dashboard", state: { page: "mySubscriptions" } });
                }}
              >
                Purchase Plan
              </button>
            </div>
          </div>
        </ModalShell>
      )}

      {/* Delete confirmation */}
      {showDeleteModal && offerToDelete && (
        <ModalShell onClose={() => setShowDeleteModal(false)} maxWidth="max-w-sm">
          <div className="p-6 text-center">
            <div className="flex items-center justify-center mx-auto mb-3 rounded-full w-14 h-14 bg-[#FDE8EC] text-[#D61F45]">
              <Trash size={28} weight="fill" />
            </div>
            <h2 className="text-xl font-bold text-[#17253a]">Delete Offer?</h2>
            <p className="mt-1 text-sm text-gray-500">
              Are you sure you want to delete <strong>{offerToDelete.offer_name}</strong>?
            </p>
            <div className="grid grid-cols-2 gap-3 mt-5">
              <button
                type="button"
                className="py-2.5 font-semibold bg-white border-[1.5px] rounded-xl border-[#D61F45] text-[#D61F45] hover:bg-[#FDE8EC]"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="py-2.5 font-semibold text-white rounded-xl bg-gradient-to-r from-[#D61F45] to-[#B91C3C] shadow-[0_6px_18px_rgba(214,31,69,0.35)]"
                onClick={handleDeleteOffer}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </ModalShell>
      )}

      {/* Rejection reason */}
      {showReasonModal && (
        <ModalShell onClose={() => setShowReasonModal(false)} maxWidth="max-w-sm">
          <div className="relative p-6 text-center">
            <button
              type="button"
              className="absolute flex items-center justify-center w-8 h-8 text-gray-400 rounded-full top-3 right-3 hover:bg-[#FDE8EC] hover:text-[#D61F45]"
              onClick={() => setShowReasonModal(false)}
              aria-label="Close"
            >
              <X size={16} weight="bold" />
            </button>
            <div className="flex items-center justify-center mx-auto mb-3 rounded-full w-14 h-14 bg-[#FDE8EC] text-[#D61F45]">
              <Info size={30} weight="fill" />
            </div>
            <h2 className="text-xl font-bold text-[#D61F45]">Reason</h2>
            <p className="mt-2 text-sm text-gray-600 whitespace-pre-line">{selectedReason}</p>
          </div>
        </ModalShell>
      )}
    </>
  );
};
export default Offer;
