// import axios from "axios";
// import { useEffect, useState, useRef } from "react";
// import { IoIosSearch } from "react-icons/io";
// import { Link } from "react-router-dom";
// import { Trash } from "@phosphor-icons/react";
// import { IoCloseCircleOutline } from "react-icons/io5";
// import DeleteModal from "./DeleteModal";
// import { useHistory } from "react-router-dom";
// import { toast } from "react-toastify";
// import { IoMdClose } from "react-icons/io";

// const MyProperties = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [properties, setProperties] = useState([]);
//   const userId = sessionStorage.getItem("accessToken");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [searchKeyword, setSearchKeyword] = useState("");
//   const itemsPerPage = 10;
//   const history = useHistory();
//   const [category, setCategory] = useState("");
//   const [city, setCity] = useState("");
//   const [locality, setLocality] = useState("");
//   const [propertyType, setPropertyType] = useState("");
//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [selectedProperty, setSelectedProperty] = useState(null);
//   const [selectedPropertyId, setSelectedPropertyId] = useState(null);
//   const [priceError, setPriceError] = useState("");
//   const [showOfferCountModal, setShowOfferCountModal] = useState(false);
//   const [offerCount, setOfferCount] = useState(0);

//   const priceOptions = [
//     { label: "₹ 5 Lakhs", value: 500000 },
//     { label: "₹ 10 Lakhs", value: 1000000 },
//     { label: "₹ 15 Lakhs", value: 1500000 },
//     { label: "₹ 20 Lakhs", value: 2000000 },
//     { label: "₹ 25 Lakhs", value: 2500000 },
//     { label: "₹ 30 Lakhs", value: 3000000 },
//     { label: "₹ 40 Lakhs", value: 4000000 },
//     { label: "₹ 50 Lakhs", value: 5000000 },
//     { label: "₹ 60 Lakhs", value: 6000000 },
//     { label: "₹ 75 Lakhs", value: 7500000 },
//     { label: "₹ 90 Lakhs", value: 9000000 },
//     { label: "₹ 1 Crore", value: 10000000 },
//     { label: "₹ 1.25 Crore", value: 12500000 },
//     { label: "₹ 1.5 Crore", value: 15000000 },
//     { label: "₹ 1.75 Crore", value: 17500000 },
//     { label: "₹ 2 Crore", value: 20000000 },
//     { label: "₹ 3 Crore", value: 30000000 },
//     { label: "₹ 4 Crore", value: 40000000 },
//     { label: "₹ 5 Crore", value: 50000000 },
//     { label: "₹ 10 Crore", value: 100000000 },
//     { label: "₹ 20 Crore", value: 200000000 },
//     { label: "₹ 30 Crore", value: 300000000 },
//     { label: "₹ 50 Crore", value: 500000000 },
//     { label: "₹ 75 Crore", value: 750000000 },
//   ];


//   const rentAndPgPriceOptions = [

//     { label: "₹ 5 Thousand", value: 5000 },
//     { label: "₹ 6 Thousand", value: 6000 },
//     { label: "₹ 7 Thousand", value: 7000 },
//     { label: "₹ 8 Thousand", value: 8000 },
//     { label: "₹ 9 Thousand", value: 9000 },
//     { label: "₹ 10 Thousand", value: 10000 },
//     { label: "₹ 15 Thousand", value: 15000 },
//     { label: "₹ 20 Thousand", value: 20000 },
//     { label: "₹ 25 Thousand", value: 25000 },
//     { label: "₹ 30 Thousand", value: 30000 },
//     { label: "₹ 40 Thousand", value: 40000 },
//     { label: "₹ 50 Thousand", value: 50000 },
//     { label: "₹ 60 Thousand", value: 60000 },
//     { label: "₹ 70 Thousand", value: 70000 },
//     { label: "₹ 80 Thousand", value: 80000 },
//     { label: "₹ 90 Thousand", value: 90000 },
//     { label: "₹ 1 Lakh", value: 100000 },
//     { label: "₹ 2 Lakhs", value: 200000 },
//     { label: "₹ 3 Lakhs", value: 300000 },
//     { label: "₹ 4 Lakhs", value: 400000 },
//     { label: "₹ 5 Lakhs", value: 500000 },
//     { label: "₹ 6 Lakhs", value: 600000 },
//     { label: "₹ 7 Lakhs", value: 700000 },
//     { label: "₹ 8 Lakhs", value: 800000 },
//     { label: "₹ 9 Lakhs", value: 900000 },
//     { label: "₹ 10 Lakhs", value: 1000000 },
//   ];
//   const budgetOptions =
//     category === "Rent" || category === "PG/Co-living"
//       ? rentAndPgPriceOptions
//       : priceOptions;
//   // State Setup
//   const [showNextModal, setShowNextModal] = useState(false);
//   const [offerName, setOfferName] = useState("");
//   const [offerTime, setOfferTime] = useState("");
//   const [offerDescription, setOfferDescription] = useState("");
//   const [offerPhoto, setOfferPhoto] = useState(null);
//   const [offerPhotoPreview, setOfferPhotoPreview] = useState(null);
//   const [freePostCount, setFreePostCount] = useState(0);

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
//           setFreePostCount(countData.free_post_count || 0);
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

//   const fetchProperties = async () => {
//     const formData = new FormData();
//     formData.append("page", currentPage);
//     formData.append("page_size", itemsPerPage);
//     formData.append("user_id", userId);

//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}/cust_api/get-listing-properties`,
//         formData,
//       );

//       if (response.data.status === 1) {
//         const transformed = response.data.data.map((item) => {
//           let badgeColor = "bg-gray-400";
//           let type = "UNKNOWN";
//           let status = "Available";

//           // Set badge color, type, and status based on property category type
//           switch (item.property_category_type) {
//             case "Buy":
//               badgeColor = "bg-[#8B1E3F]";
//               type = "FOR BUY";
//               status =
//                 item.available_status === "Sold" ? "Sold Out" : "Available";
//               break;

//             case "Rent":
//               badgeColor = "bg-blue-600";
//               type = "FOR RENT";
//               status =
//                 item.available_status === "Sold" ? "Rented Out" : "Available";
//               break;

//             case "Commercial Buy":
//               badgeColor = "bg-purple-600";
//               type = "COMMERCIAL BUY";
//               status =
//                 item.available_status === "Sold" ? "Sold Out" : "Available";
//               break;

//             case "Commercial Lease":
//               badgeColor = "bg-indigo-600";
//               type = "COMMERCIAL LEASE";
//               status =
//                 item.available_status === "Sold" ? "Leased Out" : "Available";
//               break;

//             case "PG/Co-living":
//               badgeColor = "bg-yellow-500";
//               type = "PG / CO-LIVING";
//               status =
//                 item.available_status === "Sold" ? "Occupied" : "Available";
//               break;

//             default:
//               badgeColor = "bg-gray-400";
//               type = item.property_category_type?.toUpperCase() || "UNKNOWN";
//               status = "Available";
//           }

//           return {
//             id: item._id,
//             type,
//             title: item.property_name,
//             location: item.address_area,
//             price: item.property_price,
//             date: item.created_at
//               ? new Date(item.created_at).toLocaleDateString("en-GB", {
//                 day: "2-digit",
//                 month: "long",
//                 year: "numeric",
//               })
//               : "N/A",
//             badgeColor,
//             status,
//             soldOut: item.available_status,
//             image: item.cover_image,
//             published: item.admin_approval,
//             rent: item.rent,
//             rent_duration: item.rent_duration,
//             view_count: item.view_count,
//             leads_count: item.leads_count,
//           };
//         });

//         setProperties(transformed);
//         setTotalPages(response.data.total_pages);
//       } else {
//         setProperties([]);
//         setTotalPages(0);
//       }
//     } catch (err) {
//       setProperties([]);
//       setTotalPages(0);
//       console.error("Failed to fetch property enquiries", err);
//     }
//   };

//   useEffect(() => {
//     fetchProperties();
//   }, [userId, currentPage]);

//   const handleDeleteClick = (property) => {
//     setSelectedProperty(property);
//     setIsModalOpen(true);
//   };

//   const handleMinChange = (e) => {
//     const value = Number(e.target.value);
//     setMinPrice(value);

//     if (maxPrice && value > maxPrice) {
//       setPriceError("Min price should not be greater than Max price");
//     } else {
//       setPriceError("");
//     }
//   };


//   const handleMaxChange = (e) => {
//     let value = e.target.value;

//     if (value === "1000001") {
//       value = "";

//       setMaxPrice(value);
//     };

//     if (minPrice && value < minPrice) {
//       setPriceError("Max price should not be less than Min price");
//     } else {
//       setPriceError("");
//     }
//   };

//   const handleConfirmDelete = async (property_id) => {
//     setIsModalOpen(false);

//     if (!userId) {
//       toast.error("You must be logged in to delete a property.");
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("property_id", property_id);

//       const res = await axios.delete(
//         `${process.env.REACT_APP_API_URL}/cust_api/delete_listing_property`,
//         {
//           data: formData,
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         },
//       );

//       if (res.data.status === 1) {
//         toast.success("Property deleted successfully.");
//         setProperties((prev) => prev.filter((item) => item.id !== property_id));
//       } else {
//         toast.error(res.data.message || "Failed to delete property.");
//         console.error("Failed to delete property:", res.data.message);
//       }
//     } catch (error) {
//       toast.error("An error occurred while deleting the property.");
//       console.error("Error deleting property:", error);
//     }
//   };

//   const handleSearch = async () => {
//     const formData = new FormData();
//     formData.append("user_id", userId);
//     formData.append("search_keyword", searchKeyword);

//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}/cust_api/my_properties_search`,
//         formData,
//       );

//       if (response.data.status === 1) {
//         const transformed = response.data.data.map((item) => {
//           let badgeColor = "bg-gray-400";
//           let type = "UNKNOWN";
//           let status = "Available";

//           switch (item.property_category_type) {
//             case "Buy":
//               badgeColor = "bg-green-600";
//               badgeColor = "bg-[#8B1E3F]";
//               status =
//                 item.available_status === "Sold" ? "Sold Out" : "Available";
//               break;

//             case "Rent":
//               badgeColor = "bg-[#8B1E3F]";
//               type = "FOR RENT";
//               status =
//                 item.available_status === "Sold" ? "Rented Out" : "Available";
//               break;

//             case "Commercial Buy":
//               badgeColor = "bg-[#8B1E3F]";
//               type = "COMMERCIAL BUY";
//               status =
//                 item.available_status === "Sold" ? "Sold Out" : "Available";
//               break;

//             case "Commercial Lease":
//               badgeColor = "bg-[#8B1E3F]";
//               type = "COMMERCIAL LEASE";
//               status =
//                 item.available_status === "Sold" ? "Leased Out" : "Available";
//               break;

//             case "PG/Co-living":
//               badgeColor = "bg-[#8B1E3F]";
//               type = "PG / CO-LIVING";
//               status =
//                 item.available_status === "Sold" ? "Occupied" : "Available";
//               break;

//             default:
//               badgeColor = "bg-[#8B1E3F]";
//               type = item.property_category_type?.toUpperCase() || "UNKNOWN";
//               status = "Available";
//           }

//           return {
//             id: item._id,
//             type,
//             title: item.property_name,
//             location: item.address_area,
//             price: item.property_price,
//             date: item.created_at
//               ? new Date(item.created_at).toLocaleDateString("en-GB", {
//                 day: "2-digit",
//                 month: "long",
//                 year: "numeric",
//               })
//               : "N/A",
//             badgeColor,
//             status,
//             soldOut: item.available_status,
//             image:
//               `${process.env.REACT_APP_API_URL}${item.cover_image}` ||
//               "https://via.placeholder.com/300x200?text=No+Image",
//             published: item.admin_approval,
//             rent: item.rent,
//             rent_duration: item.rent_duration,
//             view_count: item.view_count,
//             leads_count: item.leads_count,
//           };
//         });

//         setProperties(transformed);
//         setTotalPages(response.data.total_pages);
//       } else {
//         setProperties([]);
//         setTotalPages(0);
//       }
//     } catch (error) {
//       setProperties([]);
//       setTotalPages(0);
//       console.error("Error calling search API:", error);
//     }
//   };

//   const handleCreateOffer = () => {
//     const accessToken = localStorage.getItem("accessToken");

//     if (accessToken) {
//       history.push("/addoffer");
//     } else {
//       history.push("/login1");
//     }
//   };

//   const firstLoad = useRef(true);

//   const fetchFilteredProperties = async () => {
//     if (!userId) {
//       console.warn("No userId found in session storage.");
//       setProperties([]);
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("user_id", userId);
//       if (category) formData.append("property_category_type", category);
//       if (city) formData.append("city_name", city);
//       if (propertyType) formData.append("property_type", propertyType);
//       if (locality) formData.append("area", locality);
//       if (minPrice) formData.append("min_price", minPrice);
//       if (maxPrice) formData.append("max_price", maxPrice);

//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}/cust_api/filter_property`,
//         formData,
//       );

//       if (response.data.status === 1) {
//         const transformed = response.data.data.map((item) => {
//           let badgeColor = "bg-gray-400";
//           let type = "UNKNOWN";
//           let status = "Available";

//           switch (item.property_category_type) {
//             case "Buy":
//               badgeColor = "bg-green-600";
//               type = "FOR BUY";
//               status =
//                 item.available_status === "Sold" ? "Sold Out" : "Available";
//               break;

//             case "Rent":
//               badgeColor = "bg-blue-600";
//               type = "FOR RENT";
//               status =
//                 item.available_status === "Sold" ? "Rented Out" : "Available";
//               break;

//             case "Commercial Buy":
//               badgeColor = "bg-purple-600";
//               type = "COMMERCIAL BUY";
//               status =
//                 item.available_status === "Sold" ? "Sold Out" : "Available";
//               break;

//             case "Commercial Lease":
//               badgeColor = "bg-indigo-600";
//               type = "COMMERCIAL LEASE";
//               status =
//                 item.available_status === "Sold" ? "Leased Out" : "Available";
//               break;

//             case "PG/Co-living":
//               badgeColor = "bg-yellow-500";
//               type = "PG / CO-LIVING";
//               status =
//                 item.available_status === "Sold" ? "Occupied" : "Available";
//               break;

//             default:
//               badgeColor = "bg-gray-400";
//               type = item.property_category_type?.toUpperCase() || "UNKNOWN";
//               status = "Available";
//           }

//           return {
//             id: item._id,
//             type,
//             title: item.property_name,
//             location: item.address_area,
//             price: item.property_price,
//             date: item.created_at
//               ? new Date(item.created_at).toLocaleDateString("en-GB", {
//                 day: "2-digit",
//                 month: "long",
//                 year: "numeric",
//               })
//               : "N/A",
//             badgeColor,
//             status,
//             soldOut: item.available_status,
//             image:
//               item.cover_image ||
//               "https://via.placeholder.com/300x200?text=No+Image",
//             published: item.admin_approval,
//             rent: item.rent,
//             rent_duration: item.rent_duration,
//             view_count: item.view_count,
//             leads_count: item.leads_count,
//           };
//         });

//         setProperties(transformed);
//         setTotalPages(response.data.total_pages || 0);
//       } else {
//         setProperties([]);
//         setTotalPages(0);
//       }
//     } catch (error) {
//       setProperties([]);
//       setTotalPages(0);
//       console.error("Error fetching filtered properties:", error);
//     }
//   };

//   useEffect(() => {
//     if (firstLoad.current) {
//       firstLoad.current = false;
//     } else if (userId) {
//       fetchFilteredProperties();
//     }
//   }, [category, city, locality, propertyType, minPrice, maxPrice, userId]);

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [currentPage]);

//   const handleMarkAsSold = async () => {
//     if (!selectedPropertyId) return;

//     const formData = new FormData();
//     formData.append("property_id", selectedPropertyId);
//     formData.append("user_id", userId);
//     formData.append(
//       "available_status",
//       selectedProperty.status === "Available" ? "Sold" : "Available",
//     );

//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}/cust_api/change_property_status`,
//         formData,
//       );

//       if (response.data.status === 1) {
//         setShowModal(false);
//         const updatedProperties = properties.map((property) =>
//           property.id === selectedPropertyId
//             ? {
//               ...property,
//               soldOut:
//                 selectedProperty.status === "Available"
//                   ? "Sold"
//                   : "Available",
//               status:
//                 selectedProperty.status === "Available"
//                   ? property.type === "FOR BUY"
//                     ? "Sold Out"
//                     : "Rented Out"
//                   : "Available",
//             }
//             : property,
//         );
//         setProperties(updatedProperties);
//       } else {
//         console.error("Status not updated:", response.data.message);
//       }
//     } catch (error) {
//       console.error("Error updating property status:", error);
//     }
//   };

//   const handleStatusClick = (property) => {
//     setSelectedProperty(property);
//     setSelectedPropertyId(property.id);
//     setShowModal(true);
//   };

//   const handlePropertyClick = (property) => {
//     if (offerCount <= 0) {
//       setShowOfferCountModal(true);
//     } else {
//       setSelectedProperty(property);
//       setShowNextModal(true);
//     }
//   };

//   const handleAddOffer = async () => {
//     if (!userId) {
//       toast.error("You must be logged in to create an offer.");
//       return;
//     }

//     if (!selectedProperty) {
//       toast.error("No property selected.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("property_id", selectedProperty.id);
//     formData.append("user_id", userId);
//     formData.append("offer_name", offerName);
//     formData.append("offer_time", offerTime);
//     formData.append("offer_description", offerDescription);
//     if (offerPhoto) {
//       formData.append("offer_img", offerPhoto);
//     }

//     try {
//       const response = await fetch(
//         `${process.env.REACT_APP_API_URL}/cust_api/add_offer`,
//         {
//           method: "POST",
//           body: formData,
//         },
//       );

//       // if (response.ok) {
//       //   toast.success("Offer created successfully!");
//       //   setShowNextModal(false);
//       //   setOfferName('');
//       //   setOfferTime('');
//       //   setOfferDescription('');
//       //   setOfferPhoto('');
//       //   setOfferPhotoPreview('')
//       // } else {
//       //   toast.error("Failed to create offer.");
//       // }

//       if (response.ok) {
//         const data = await response.json();
//         if (data.status === 1) {
//           toast.success("Offer created successfully!");
//           setShowNextModal(false);
//           setOfferName("");
//           setOfferTime("");
//           setOfferDescription("");
//           setOfferPhoto(null);
//           setOfferPhotoPreview(null);
//         } else if (data.status === 0) {
//           toast.error("Offer already exists!");
//         }
//       } else {
//         toast.error("Something went wrong. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error creating offer:", error);
//       toast.error("An error occurred while creating the offer.");
//     }
//   };

//   const handleCoverImageDelete = () => {
//     setOfferPhoto(null);
//     setOfferPhotoPreview(null);
//   };

//   useEffect(() => {
//     if (searchKeyword.trim() !== "") {
//       handleSearch();
//     }
//   }, [searchKeyword]);

//   return (
//     <>
//       <div className="max-w-6xl p-6 mx-auto">
//         {/* Header Section */}
//         <div className="flex flex-col justify-between md:flex-row md:items-center">
//           <h2 className="text-2xl font-semibold">My Properties</h2>
//           <div className="relative md:mt-0">
//             <IoIosSearch
//               className="absolute text-gray-500 transform -translate-y-1/2 cursor-pointer left-3 top-1/2"
//               onClick={handleSearch}
//             />
//             <input
//               type="text"
//               placeholder="Search"
//               value={searchKeyword}
//               onChange={(e) => {
//                 const value = e.target.value;
//                 setSearchKeyword(value);
//                 handleSearch(); // Trigger search as user types
//               }}
//               className="px-10 py-2 pr-10 border rounded-lg outline-none w-72 focus:ring-2 focus:ring-rose-400"
//             />
//             {searchKeyword && (
//               <button
//                 onClick={() => {
//                   setSearchKeyword("");
//                   // fetchProperties();
//                   fetchFilteredProperties();
//                 }}
//                 className="absolute text-lg text-gray-500 transform -translate-y-1/2 right-3 top-1/2 hover:text-gray-900"
//               >
//                 <IoMdClose />
//               </button>
//             )}
//           </div>
//           <Link
//             to="/add_new_property"
//             className="px-4 py-2 text-base font-medium text-center text-white no-underline my-bg border border-gray-300 rounded hover:my-bg hover:no-underline"
//           >
//             Add New Property{" "}
//             {freePostCount > 0 && (
//               <span className="px-2 py-0 ml-2 text-sm text-black bg-green-500 rounded-full">
//                 FREE
//               </span>
//             )}
//           </Link>
//         </div>

//         {/* Filters */}
//         <div className="flex flex-wrap justify-around mt-6 gap-9">
//           <select
//             className="w-40 px-2 py-2 border rounded-lg outline-none"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           >
//             <option value="">Category Type</option>
//             <option value="Buy">Buy</option>
//             <option value="Rent">Rent</option>
//             <option value="Commercial Buy">Commercial Buy</option>
//             <option value="Commercial Lease">Commercial Lease</option>
//             <option value="PG/Co-living">PG/Co-living</option>
//           </select>
//           <select
//             className="w-32 px-2 py-2 border rounded-lg outline-none"
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//           >
//             <option value="">City</option>
//             <option value="Mumbai">Mumbai</option>
//             <option value="Pune">Pune</option>
//             <option value="Delhi">Delhi</option>
//             <option value="Bangalore">Bengaluru</option>
//             <option value="Chennai">Chennai</option>
//             <option value="Hyderabad">Hyderabad</option>
//             <option value="Kolkata">Kolkata</option>
//             <option value="Ahmedabad">Ahmedabad</option>
//           </select>
//           <div className="w-0 md:w-40"></div>
//           {/* <div className="relative md:mt-0">
//             <input
//               type="text"
//               placeholder="Enter locality or projects"
//               value={locality}
//               onChange={(e) => setLocality(e.target.value)}

//               className="w-64 px-4 py-2 border rounded-lg outline-none"
//             />
//             {locality && (
//               <button
//                 onClick={() => {
//                   setLocality("");
//                 }}
//                 className="absolute text-lg text-gray-500 transform -translate-y-1/2 right-3 top-1/2 hover:text-gray-900"
//               >
//                 <IoMdClose />
//               </button>
//             )}
//           </div> */}
//           <select
//             className="w-40 px-2 py-2 border rounded-lg outline-none"
//             value={propertyType}
//             onChange={(e) => setPropertyType(e.target.value)}
//           >
//             <option value="">Property Type</option>
//             <option value="Flat/Apartment">Flat/Apartment</option>
//             <option value="Builder Floor">Builder Floor</option>
//             <option value="Independent House/Villa">
//               Independent House/Villa
//             </option>
//             <option value="Independent/Builder Floor">
//               Independent/Builder Floor
//             </option>
//             <option value="1RK/Studio Apartment">1RK/Studio Apartment</option>
//             <option value="Service Apartment">Service Apartment</option>
//             <option value="Farmhouse">Farmhouse</option>
//             <option value="Plot/Land">Plot/Land</option>
//             <option value="Office">Office</option>
//             <option value="Retail">Retail</option>
//             <option value="Storage">Storage</option>
//             <option value="Industry">Industry</option>
//             <option value="Hospitality">Hospitality</option>
//             <option value="Other">Other</option>
//           </select>
//           <div>
//             <select
//               value={minPrice}
//               onChange={handleMinChange}
//               className="border px-2 py-2 rounded-lg w-28 outline-none"
//             >
//               <option value="">₹ Min</option>
//               {budgetOptions.map((option, index) => (
//                 <option key={index} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>
//             &nbsp;&nbsp;&nbsp;
//             <select
//               value={maxPrice}
//               onChange={handleMaxChange}
//               className="border px-2 py-2 rounded-lg w-28 outline-none"
//             >
//               <option value="">₹ Max</option>
//               {budgetOptions.map((option, index) => (
//                 <option key={index} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>
//             {priceError && (
//               <p className="mt-1 text-sm text-red-500">{priceError}</p>
//             )}
//           </div>
//         </div>

//         {/* Property Listings */}
//         <div className="mt-6 space-y-4">
//           {!properties || properties.length === 0 ? (
//             <p className="mt-10 text-lg text-center text-gray-500">
//               No properties found.
//             </p>
//           ) : (
//             properties.map((property) => (
//               <div
//                 key={property.id}
//                 className={`bg-white shadow-sm rounded-lg p-4 flex flex-col md:flex-row items-start md:items-center justify-between relative
//     ${property.published === "Approved"
//                     ? "border-2 border-green-500"
//                     : property.published === "Pending"
//                       ? "border-2 border-yellow-500"
//                       : "border border-gray-300"
//                   }`}
//               >
//                 {/* Published Badge (Top Left Corner) */}
//                 {/* Published Badge (Top Left Corner) */}
//                 <div
//                   className={`absolute top-2 left-6 text-xs font-medium px-3 py-1 rounded-md 
//     ${property.published === "Approved"
//                       ? "bg-green-200 text-green-700 border border-green-700"
//                       : property.published === "Pending"
//                         ? "bg-yellow-200 text-yellow-700 border border-yellow-700"
//                         : "bg-gray-300 text-gray-600 border border-gray-600"
//                     }`}
//                 >
//                   {property.published === "Approved"
//                     ? "Approved"
//                     : property.published === "Pending"
//                       ? "Pending"
//                       : "Not Published"}
//                 </div>

//                 {/* Left Section (Image + Badge) */}
//                 <div className="relative w-40 h-28">
//                   <Link
//                     to={`/propertydetails/${property.id}`}
//                     key={property.id}
//                     className="block"
//                   >
//                     <img
//                       src={property.image}
//                       alt={property.title}
//                       className="object-cover w-64 h-24 rounded-md"
//                     />
//                   </Link>
//                   <div
//                     className={`absolute top-1 left-1 text-white ${property.badgeColor} text-xs px-2 py-1 rounded-md`}
//                   >
//                     {property.type}
//                   </div>
//                 </div>

//                 {/* Middle Section (Details) */}
//                 <div className="flex-1 mt-3 ml-4">
//                   <h3 className="mb-0 text-lg font-semibold">
//                     {property.title}
//                   </h3>
//                   <p className="mb-0 text-sm text-gray-500">
//                     {property.location}
//                   </p>
//                   {property.type === "FOR RENT" ||
//                     property.type === "PG / CO-LIVING" ? (
//                     <p className="mt-1 font-bold text-black">
//                       ₹{" "}
//                       {property.rent >= 10000000
//                         ? `${(property.rent / 10000000).toFixed(2).replace(/\.?0+$/, "")} Cr`
//                         : property.rent >= 100000
//                           ? `${(property.rent / 100000).toFixed(2).replace(/\.?0+$/, "")} L`
//                           : property.rent >= 1000
//                             ? `${(property.rent / 1000).toFixed(2).replace(/\.?0+$/, "")} K`
//                             : property.rent}
//                       {property.rent_duration &&
//                         property.rent_duration !== "N/A"
//                         ? ` / ${property.rent_duration}`
//                         : ""}
//                     </p>
//                   ) : (
//                     property.price &&
//                     property.price !== "N/A" && (
//                       <p className="mt-1 font-bold text-black">
//                         ₹{" "}
//                         {Number(property.price) >= 10000000
//                           ? `${(Number(property.price) / 10000000).toFixed(2).replace(/\.?0+$/, "")} Cr`
//                           : Number(property.price) >= 100000
//                             ? `${(Number(property.price) / 100000).toFixed(2).replace(/\.?0+$/, "")} L`
//                             : Number(property.price) >= 1000
//                               ? `${(Number(property.price) / 1000).toFixed(2).replace(/\.?0+$/, "")} K`
//                               : property.price}
//                       </p>
//                     )
//                   )}
//                   <p className="mt-1 text-sm text-gray-400">
//                     Posted on: {property.date}
//                   </p>
//                 </div>

//                 {/* Right Section (Stats & Actions) */}
//                 <div className="flex flex-col items-center gap-4 mt-4 md:mt-0">
//                   <div className="flex gap-20 mt-3">
//                     <div className="text-center">
//                       <p className="text-sm text-gray-500">Views</p>
//                       <p className="font-semibold text-black">
//                         {property.view_count || "0"}
//                       </p>
//                     </div>
//                     <div className="text-center">
//                       <p className="text-sm text-gray-500">Leads</p>
//                       <p className="font-semibold text-black">
//                         {property.leads_count || "0"}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Buttons - Now positioned below Views & Leads */}
//                   <div className="flex gap-4">
//                     {property.status === "Available" && (
//                       <>
//                         <button
//                           onClick={() => handlePropertyClick(property)}
//                           className="px-4 py-1 text-white my-bg rounded-lg"
//                         >
//                           Create Offer
//                         </button>
//                         <button
//                           className="px-4 py-1 my-text border-rose-500 rounded-lg border-1"
//                           onClick={(e) => {
//                             e.preventDefault();
//                             history.push(`/edit_property/${property.id}`);
//                           }}
//                         >
//                           Edit Property
//                         </button>
//                         <button
//                           className="p-2 text-red-500 transition border-red-500 rounded-lg hover:bg-red-100 border-1"
//                           onClick={() => handleDeleteClick(property)}
//                         >
//                           <Trash />
//                         </button>
//                       </>
//                     )}
//                   </div>
//                 </div>

//                 {/* Status Badge */}
//                 <div
//                   className={`absolute top-2 right-2 px-3 py-2 text-sm rounded-lg cursor-pointer ${property.status === "Rented Out" ||
//                     property.status === "Sold Out"
//                     ? "bg-gray-300 text-gray-600"
//                     : "border border-black"
//                     }`}
//                   //             onClick={() => {
//                   //  handleStatusClick(property);
//                   //  setSelectedPropertyId(property.id);
//                   //  setShowModal(true);
//                   // }}
//                   onClick={() => handleStatusClick(property)}
//                 >
//                   {property.status}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="flex items-center justify-center mt-6 space-x-3">
//             <button
//               className={`px-3 py-2 border rounded-full ${currentPage === 1
//                 ? "text-gray-400 cursor-not-allowed"
//                 : "hover:bg-gray-100"
//                 }`}
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//             >
//               &lt;
//             </button>
//             {[...Array(totalPages)].map((_, index) => (
//               <button
//                 key={index}
//                 className={`w-10 h-10 flex items-center justify-center rounded-full text-lg font-medium ${currentPage === index + 1
//                   ? "my-border my-text"
//                   : "text-gray-500 hover:bg-gray-100"
//                   }`}
//                 onClick={() => setCurrentPage(index + 1)}
//               >
//                 {index + 1}
//               </button>
//             ))}
//             <button
//               className={`px-3 py-2 border rounded-full ${currentPage === totalPages
//                 ? "text-gray-400 cursor-not-allowed"
//                 : "hover:bg-gray-100"
//                 }`}
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

//       {/* MODAL */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="relative p-6 text-center bg-white shadow-lg rounded-2xl w-96">
//             <button
//               className="absolute text-2xl text-black top-2 right-2 hover:text-black"
//               onClick={() => setShowModal(false)}
//             >
//               <IoCloseCircleOutline />
//             </button>
//             <h2 className="text-2xl font-semibold">
//               {selectedProperty?.status === "Available"
//                 ? selectedProperty?.type === "FOR BUY"
//                   ? "Mark as Sold Out"
//                   : "Mark as Rented Out"
//                 : selectedProperty?.status === "Sold Out" ||
//                   selectedProperty?.status === "Rented Out"
//                   ? "Mark as Available"
//                   : null}
//             </h2>
//             <p className="mt-2 text-gray-500">
//               {selectedProperty?.status === "Available"
//                 ? `Are you sure you want to mark this property as ${selectedProperty?.type === "FOR BUY"
//                   ? "Sold Out"
//                   : "Rented Out"
//                 }?`
//                 : `Are you sure you want to mark this property as Available?`}
//             </p>
//             <div className="flex justify-center gap-8 mt-4">
//               <button
//                 className="px-16 py-2 text-white my-bg rounded-md"
//                 onClick={async () => {
//                   await handleMarkAsSold();
//                   setShowModal(false);
//                   fetchProperties();
//                 }}
//               >
//                 Yes
//               </button>
//               <button
//                 className="px-16 py-2 text-black bg-white border-black rounded-md border-1"
//                 onClick={() => setShowModal(false)}
//               >
//                 No
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <DeleteModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onConfirm={() => handleConfirmDelete(selectedProperty?.id)}
//       />

//       {showNextModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-gray-100 rounded-lg w-full max-w-md md:max-w-3xl relative max-h-[90vh] overflow-y-auto">
//             <div className="flex items-center justify-center p-4 bg-white border-b">
//               <h2 className="text-xl font-semibold">Offer Details</h2>
//               <button
//                 className="absolute text-2xl text-black top-2 right-2 hover:text-black"
//                 onClick={() => setShowNextModal(false)}
//               >
//                 <IoCloseCircleOutline />
//               </button>
//             </div>

//             {/* Property Card */}
//             <div className="flex items-center p-3 bg-white rounded-lg">
//               <div className="relative w-24 h-24">
//                 <img
//                   src={selectedProperty.image}
//                   alt="Property Image"
//                   className="object-cover w-full h-full rounded-lg"
//                 />
//                 <span
//                   className={`absolute top-1 left-1 text-xs px-2 rounded-md text-white ${selectedProperty.badgeColor}`}
//                 >
//                   {selectedProperty.type || "UNKNOWN"}
//                 </span>
//               </div>
//               <div className="ml-3">
//                 <p className="font-semibold">{selectedProperty.title}</p>
//                 <p className="text-sm text-gray-500">
//                   {selectedProperty.location}
//                 </p>
//                 <p className="mt-1 font-bold text-black">
//                   ₹{" "}
//                   {Number(selectedProperty.price) >= 10000000
//                     ? `${(Number(selectedProperty.price) / 10000000).toFixed(1).replace(/\.0$/, "")} Cr`
//                     : Number(selectedProperty.price) >= 100000
//                       ? `${(Number(selectedProperty.price) / 100000).toFixed(1).replace(/\.0$/, "")} L`
//                       : Number(selectedProperty.price) >= 1000
//                         ? `${(Number(selectedProperty.price) / 1000).toFixed(1).replace(/\.0$/, "")} K`
//                         : selectedProperty.price}
//                   {selectedProperty.type?.toLowerCase() === "for rent" && (
//                     <span className="text-gray-500"> /month</span>
//                   )}
//                 </p>
//               </div>
//             </div>

//             {/* Modal Body with Two Columns */}
//             <div className="flex flex-col gap-6 p-4 bg-white md:flex-row">
//               {/* Left Section - Upload Images */}
//               <div className="flex flex-col items-center justify-center p-2 bg-gray-100 border-2 border-gray-300 border-dashed md:w-1/2 rounded-xl">
//                 <div className="w-full p-6 text-center">
//                   {offerPhotoPreview ? (
//                     <div className="relative inline-block w-full">
//                       <img
//                         src={offerPhotoPreview}
//                         alt="Offer Preview"
//                         className="object-cover w-full h-40 rounded-lg shadow"
//                       />
//                       <button
//                         onClick={handleCoverImageDelete}
//                         className="absolute z-10 p-1 bg-black rounded-full top-2 right-2 bg-opacity-60"
//                       >
//                         <Trash className="w-5 h-5 text-white" />
//                       </button>
//                     </div>
//                   ) : (
//                     <>
//                       <p className="mb-2 text-gray-500">Upload Offer</p>
//                       <button
//                         type="button"
//                         className="px-4 py-2 text-sm text-white my-bg rounded-lg"
//                         onClick={() =>
//                           document.getElementById("offer_img").click()
//                         }
//                       >
//                         + Add Photos
//                       </button>
//                     </>
//                   )}
//                   <input
//                     id="offer_img"
//                     type="file"
//                     accept="image/*"
//                     style={{ display: "none" }}
//                     onChange={(e) => {
//                       const file = e.target.files[0];
//                       if (file) {
//                         setOfferPhoto(file);
//                         setOfferPhotoPreview(URL.createObjectURL(file));
//                       }
//                     }}
//                   />
//                 </div>
//               </div>
//               <div className="my-auto md:w-1/2">
//                 <input
//                   type="text"
//                   placeholder="Offer Name"
//                   value={offerName}
//                   onChange={(e) => setOfferName(e.target.value)}
//                   className="w-full p-2 mb-3 border rounded-lg"
//                 />
//                 <textarea
//                   placeholder="Offer Description"
//                   value={offerDescription}
//                   onChange={(e) => setOfferDescription(e.target.value)}
//                   className="w-full p-2 mb-3 border rounded-lg"
//                 />
//               </div>
//             </div>
//             <div className="flex items-center justify-between p-4 bg-white border-t">
//               <p className="flex items-center font-bold text-gray-500">
//                 1 Property Selected
//               </p>
//               <button
//                 className="px-4 py-2 text-white my-bg rounded-lg"
//                 onClick={() => {
//                   handleAddOffer();
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
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="w-full max-w-md p-6 bg-white shadow-2xl rounded-xl">
//             <h2 className="mb-4 text-xl font-semibold text-red-600">
//               Offer Posting Limit Reached
//             </h2>
//             <p className="mb-6 text-gray-700">
//               You have reached your maximum limit for posting offers. Please
//               purchase a plan to continue creating new offers.
//             </p>
//             {/* Align buttons side by side on the right */}
//             <div className="flex items-center justify-between px-1">
//               <button
//                 className="px-4 py-2 text-white my-bg rounded hover:bg-green-700"
//                 onClick={() => {
//                   setShowOfferCountModal(false);
//                   history.push({
//                     pathname: "/dashboard",
//                     state: { page: "mySubscriptions" },
//                   });
//                 }}
//               >
//                 Purchase Plan
//               </button>
//               <button
//                 className="px-4 py-2 text-black bg-gray-300 rounded hover:bg-gray-400"
//                 onClick={() => {
//                   setShowOfferCountModal(false);
//                 }}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default MyProperties;




import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Trash,
  House,
  MagnifyingGlass,
  Stack,
  MapPin,
  HouseLine,
  CurrencyInr,
  CaretDown,
  Eye,
  Users,
  Tag,
  PencilSimple,
  CalendarBlank,
  Plus,
  X,
  Buildings,
  ImageSquare,
  WarningCircle,
  ArrowsClockwise,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";
import DeleteModal from "./DeleteModal";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

// ==========================================================
// UI helpers (outside the component so they don't remount on every render)
// ==========================================================

// "₹ 20 K", "₹ 1.25 Cr" … same rules the cards already used.
const formatAmount = (raw) => {
  const n = Number(raw);
  if (raw === null || raw === undefined || raw === "" || Number.isNaN(n)) return raw;
  const trim = (v) => v.toFixed(2).replace(/\.?0+$/, "");
  if (n >= 10000000) return `${trim(n / 10000000)} Cr`;
  if (n >= 100000) return `${trim(n / 100000)} L`;
  if (n >= 1000) return `${trim(n / 1000)} K`;
  return n;
};

// Rent / PG show the rent (+ duration); everything else shows the price.
const getDisplayPrice = (property) => {
  if (!property) return null;
  if (property.type === "FOR RENT" || property.type === "PG / CO-LIVING") {
    if (property.rent === null || property.rent === undefined || property.rent === "") return null;
    const duration =
      property.rent_duration && property.rent_duration !== "N/A"
        ? ` / ${property.rent_duration}`
        : "";
    return `₹ ${formatAmount(property.rent)}${duration}`;
  }
  if (!property.price || property.price === "N/A") return null;
  return `₹ ${formatAmount(property.price)}`;
};

// Select with an icon on the left and a caret on the right (filter bar).
const FilterSelect = ({ icon: Icon, value, onChange, children, className = "" }) => (
  <div className={`relative ${className}`}>
    <Icon
      size={16}
      weight="bold"
      className="absolute -translate-y-1/2 pointer-events-none left-3 top-1/2 text-[#17253a]"
    />
    <select
      value={value}
      onChange={onChange}
      className="w-full h-10 pl-9 pr-8 text-[13px] font-medium text-[#17253a] bg-white border border-gray-200 rounded-xl outline-none appearance-none cursor-pointer transition-colors focus:border-[#D61F45] focus:ring-2 focus:ring-[#FDE8EC]"
    >
      {children}
    </select>
    <CaretDown
      size={14}
      weight="bold"
      className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2"
    />
  </div>
);

// Pink stat tile (Views / Leads).
const StatTile = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#FFF1F4] min-w-[110px]">
    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FDE8EC] text-[#D61F45]">
      <Icon size={18} weight="fill" />
    </span>
    <div className="leading-tight">
      <p className="m-0 text-[11px] text-gray-500">{label}</p>
      <p className="m-0 text-[15px] font-bold text-[#17253a]">{value}</p>
    </div>
  </div>
);

// Approval pill (Approved / Pending / Not Published).
const ApprovalPill = ({ published }) => {
  const styles =
    published === "Approved"
      ? "bg-green-100 text-green-700"
      : published === "Pending"
        ? "bg-[#FFE58A] text-[#7A5A00]"
        : "bg-gray-200 text-gray-600";
  const label =
    published === "Approved" ? "Approved" : published === "Pending" ? "Pending" : "Not Published";
  return (
    <span className={`inline-block px-2.5 py-0.5 text-[11px] font-semibold rounded-md ${styles}`}>
      {label}
    </span>
  );
};

// Shared modal shell — sits above the fixed navbar (z-1000).
const ModalShell = ({ onClose, children, maxWidth = "max-w-md" }) => (
  <div
    className="fixed inset-0 z-[1100] flex items-center justify-center px-4 bg-black bg-opacity-50"
    onMouseDown={(e) => e.target === e.currentTarget && onClose()}
  >
    <div
      className={`relative w-full ${maxWidth} max-h-[92vh] flex flex-col overflow-hidden bg-white shadow-2xl rounded-3xl`}
      role="dialog"
      aria-modal="true"
    >
      {children}
    </div>
  </div>
);

const MyProperties = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [properties, setProperties] = useState([]);
  const userId = sessionStorage.getItem("accessToken");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const itemsPerPage = 10;
  const history = useHistory();
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [locality, setLocality] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [priceError, setPriceError] = useState("");
  const [showOfferCountModal, setShowOfferCountModal] = useState(false);
  const [offerCount, setOfferCount] = useState(0);

  const priceOptions = [
    { label: "₹ 5 Lakhs", value: 500000 },
    { label: "₹ 10 Lakhs", value: 1000000 },
    { label: "₹ 15 Lakhs", value: 1500000 },
    { label: "₹ 20 Lakhs", value: 2000000 },
    { label: "₹ 25 Lakhs", value: 2500000 },
    { label: "₹ 30 Lakhs", value: 3000000 },
    { label: "₹ 40 Lakhs", value: 4000000 },
    { label: "₹ 50 Lakhs", value: 5000000 },
    { label: "₹ 60 Lakhs", value: 6000000 },
    { label: "₹ 75 Lakhs", value: 7500000 },
    { label: "₹ 90 Lakhs", value: 9000000 },
    { label: "₹ 1 Crore", value: 10000000 },
    { label: "₹ 1.25 Crore", value: 12500000 },
    { label: "₹ 1.5 Crore", value: 15000000 },
    { label: "₹ 1.75 Crore", value: 17500000 },
    { label: "₹ 2 Crore", value: 20000000 },
    { label: "₹ 3 Crore", value: 30000000 },
    { label: "₹ 4 Crore", value: 40000000 },
    { label: "₹ 5 Crore", value: 50000000 },
    { label: "₹ 10 Crore", value: 100000000 },
    { label: "₹ 20 Crore", value: 200000000 },
    { label: "₹ 30 Crore", value: 300000000 },
    { label: "₹ 50 Crore", value: 500000000 },
    { label: "₹ 75 Crore", value: 750000000 },
  ];

  const rentAndPgPriceOptions = [
    { label: "₹ 5 Thousand", value: 5000 },
    { label: "₹ 6 Thousand", value: 6000 },
    { label: "₹ 7 Thousand", value: 7000 },
    { label: "₹ 8 Thousand", value: 8000 },
    { label: "₹ 9 Thousand", value: 9000 },
    { label: "₹ 10 Thousand", value: 10000 },
    { label: "₹ 15 Thousand", value: 15000 },
    { label: "₹ 20 Thousand", value: 20000 },
    { label: "₹ 25 Thousand", value: 25000 },
    { label: "₹ 30 Thousand", value: 30000 },
    { label: "₹ 40 Thousand", value: 40000 },
    { label: "₹ 50 Thousand", value: 50000 },
    { label: "₹ 60 Thousand", value: 60000 },
    { label: "₹ 70 Thousand", value: 70000 },
    { label: "₹ 80 Thousand", value: 80000 },
    { label: "₹ 90 Thousand", value: 90000 },
    { label: "₹ 1 Lakh", value: 100000 },
    { label: "₹ 2 Lakhs", value: 200000 },
    { label: "₹ 3 Lakhs", value: 300000 },
    { label: "₹ 4 Lakhs", value: 400000 },
    { label: "₹ 5 Lakhs", value: 500000 },
    { label: "₹ 6 Lakhs", value: 600000 },
    { label: "₹ 7 Lakhs", value: 700000 },
    { label: "₹ 8 Lakhs", value: 800000 },
    { label: "₹ 9 Lakhs", value: 900000 },
    { label: "₹ 10 Lakhs", value: 1000000 },
  ];
  const budgetOptions =
    category === "Rent" || category === "PG/Co-living"
      ? rentAndPgPriceOptions
      : priceOptions;

  // State Setup
  const [showNextModal, setShowNextModal] = useState(false);
  const [offerName, setOfferName] = useState("");
  const [offerTime, setOfferTime] = useState("");
  const [offerDescription, setOfferDescription] = useState("");
  const [offerPhoto, setOfferPhoto] = useState(null);
  const [offerPhotoPreview, setOfferPhotoPreview] = useState(null);
  const [freePostCount, setFreePostCount] = useState(0);

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
          setFreePostCount(countData.free_post_count || 0);
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

  const fetchProperties = async () => {
    const formData = new FormData();
    formData.append("page", currentPage);
    formData.append("page_size", itemsPerPage);
    formData.append("user_id", userId);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/cust_api/get-listing-properties`,
        formData,
      );

      if (response.data.status === 1) {
        const transformed = response.data.data.map((item) => {
          let badgeColor = "bg-gray-400";
          let type = "UNKNOWN";
          let status = "Available";

          // Set badge color, type, and status based on property category type
          switch (item.property_category_type) {
            case "Buy":
              badgeColor = "bg-[#8B1E3F]";
              type = "FOR BUY";
              status =
                item.available_status === "Sold" ? "Sold Out" : "Available";
              break;

            case "Rent":
              badgeColor = "bg-blue-600";
              type = "FOR RENT";
              status =
                item.available_status === "Sold" ? "Rented Out" : "Available";
              break;

            case "Commercial Buy":
              badgeColor = "bg-purple-600";
              type = "COMMERCIAL BUY";
              status =
                item.available_status === "Sold" ? "Sold Out" : "Available";
              break;

            case "Commercial Lease":
              badgeColor = "bg-indigo-600";
              type = "COMMERCIAL LEASE";
              status =
                item.available_status === "Sold" ? "Leased Out" : "Available";
              break;

            case "PG/Co-living":
              badgeColor = "bg-yellow-500";
              type = "PG / CO-LIVING";
              status =
                item.available_status === "Sold" ? "Occupied" : "Available";
              break;

            default:
              badgeColor = "bg-gray-400";
              type = item.property_category_type?.toUpperCase() || "UNKNOWN";
              status = "Available";
          }

          return {
            id: item._id,
            type,
            title: item.property_name,
            location: item.address_area,
            price: item.property_price,
            date: item.created_at
              ? new Date(item.created_at).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
              : "N/A",
            badgeColor,
            status,
            soldOut: item.available_status,
            image: item.cover_image,
            published: item.admin_approval,
            rent: item.rent,
            rent_duration: item.rent_duration,
            view_count: item.view_count,
            leads_count: item.leads_count,
          };
        });

        setProperties(transformed);
        setTotalPages(response.data.total_pages);
      } else {
        setProperties([]);
        setTotalPages(0);
      }
    } catch (err) {
      setProperties([]);
      setTotalPages(0);
      console.error("Failed to fetch property enquiries", err);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [userId, currentPage]);

  const handleDeleteClick = (property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handleMinChange = (e) => {
    const value = e.target.value === "" ? "" : Number(e.target.value);
    setMinPrice(value);

    if (maxPrice && value && value > maxPrice) {
      setPriceError("Min price should not be greater than Max price");
    } else {
      setPriceError("");
    }
  };

  // FIX: Max price was never saved before (setMaxPrice only ran for one
  // special value), so the Max filter did nothing. It is now stored.
  const handleMaxChange = (e) => {
    let value = e.target.value;
    if (value === "1000001") value = "";
    value = value === "" ? "" : Number(value);
    setMaxPrice(value);

    if (minPrice && value && value < minPrice) {
      setPriceError("Max price should not be less than Min price");
    } else {
      setPriceError("");
    }
  };

  const handleConfirmDelete = async (property_id) => {
    setIsModalOpen(false);

    if (!userId) {
      toast.error("You must be logged in to delete a property.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("property_id", property_id);

      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}/cust_api/delete_listing_property`,
        {
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (res.data.status === 1) {
        toast.success("Property deleted successfully.");
        setProperties((prev) => prev.filter((item) => item.id !== property_id));
      } else {
        toast.error(res.data.message || "Failed to delete property.");
        console.error("Failed to delete property:", res.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while deleting the property.");
      console.error("Error deleting property:", error);
    }
  };

  const handleSearch = async () => {
    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("search_keyword", searchKeyword);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/cust_api/my_properties_search`,
        formData,
      );

      if (response.data.status === 1) {
        const transformed = response.data.data.map((item) => {
          let badgeColor = "bg-gray-400";
          let type = "UNKNOWN";
          let status = "Available";

          switch (item.property_category_type) {
            case "Buy":
              badgeColor = "bg-[#8B1E3F]";
              type = "FOR BUY"; // FIX: was missing, so search results showed "UNKNOWN"
              status =
                item.available_status === "Sold" ? "Sold Out" : "Available";
              break;

            case "Rent":
              badgeColor = "bg-[#8B1E3F]";
              type = "FOR RENT";
              status =
                item.available_status === "Sold" ? "Rented Out" : "Available";
              break;

            case "Commercial Buy":
              badgeColor = "bg-[#8B1E3F]";
              type = "COMMERCIAL BUY";
              status =
                item.available_status === "Sold" ? "Sold Out" : "Available";
              break;

            case "Commercial Lease":
              badgeColor = "bg-[#8B1E3F]";
              type = "COMMERCIAL LEASE";
              status =
                item.available_status === "Sold" ? "Leased Out" : "Available";
              break;

            case "PG/Co-living":
              badgeColor = "bg-[#8B1E3F]";
              type = "PG / CO-LIVING";
              status =
                item.available_status === "Sold" ? "Occupied" : "Available";
              break;

            default:
              badgeColor = "bg-[#8B1E3F]";
              type = item.property_category_type?.toUpperCase() || "UNKNOWN";
              status = "Available";
          }

          return {
            id: item._id,
            type,
            title: item.property_name,
            location: item.address_area,
            price: item.property_price,
            date: item.created_at
              ? new Date(item.created_at).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
              : "N/A",
            badgeColor,
            status,
            soldOut: item.available_status,
            image:
              `${process.env.REACT_APP_API_URL}${item.cover_image}` ||
              "https://via.placeholder.com/300x200?text=No+Image",
            published: item.admin_approval,
            rent: item.rent,
            rent_duration: item.rent_duration,
            view_count: item.view_count,
            leads_count: item.leads_count,
          };
        });

        setProperties(transformed);
        setTotalPages(response.data.total_pages);
      } else {
        setProperties([]);
        setTotalPages(0);
      }
    } catch (error) {
      setProperties([]);
      setTotalPages(0);
      console.error("Error calling search API:", error);
    }
  };

  const handleCreateOffer = () => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      history.push("/addoffer");
    } else {
      history.push("/login1");
    }
  };

  const firstLoad = useRef(true);

  const fetchFilteredProperties = async () => {
    if (!userId) {
      console.warn("No userId found in session storage.");
      setProperties([]);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("user_id", userId);
      if (category) formData.append("property_category_type", category);
      if (city) formData.append("city_name", city);
      if (propertyType) formData.append("property_type", propertyType);
      if (locality) formData.append("area", locality);
      if (minPrice) formData.append("min_price", minPrice);
      if (maxPrice) formData.append("max_price", maxPrice);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/cust_api/filter_property`,
        formData,
      );

      if (response.data.status === 1) {
        const transformed = response.data.data.map((item) => {
          let badgeColor = "bg-gray-400";
          let type = "UNKNOWN";
          let status = "Available";

          switch (item.property_category_type) {
            case "Buy":
              badgeColor = "bg-[#8B1E3F]";
              type = "FOR BUY";
              status =
                item.available_status === "Sold" ? "Sold Out" : "Available";
              break;

            case "Rent":
              badgeColor = "bg-blue-600";
              type = "FOR RENT";
              status =
                item.available_status === "Sold" ? "Rented Out" : "Available";
              break;

            case "Commercial Buy":
              badgeColor = "bg-purple-600";
              type = "COMMERCIAL BUY";
              status =
                item.available_status === "Sold" ? "Sold Out" : "Available";
              break;

            case "Commercial Lease":
              badgeColor = "bg-indigo-600";
              type = "COMMERCIAL LEASE";
              status =
                item.available_status === "Sold" ? "Leased Out" : "Available";
              break;

            case "PG/Co-living":
              badgeColor = "bg-yellow-500";
              type = "PG / CO-LIVING";
              status =
                item.available_status === "Sold" ? "Occupied" : "Available";
              break;

            default:
              badgeColor = "bg-gray-400";
              type = item.property_category_type?.toUpperCase() || "UNKNOWN";
              status = "Available";
          }

          return {
            id: item._id,
            type,
            title: item.property_name,
            location: item.address_area,
            price: item.property_price,
            date: item.created_at
              ? new Date(item.created_at).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
              : "N/A",
            badgeColor,
            status,
            soldOut: item.available_status,
            image:
              item.cover_image ||
              "https://via.placeholder.com/300x200?text=No+Image",
            published: item.admin_approval,
            rent: item.rent,
            rent_duration: item.rent_duration,
            view_count: item.view_count,
            leads_count: item.leads_count,
          };
        });

        setProperties(transformed);
        setTotalPages(response.data.total_pages || 0);
      } else {
        setProperties([]);
        setTotalPages(0);
      }
    } catch (error) {
      setProperties([]);
      setTotalPages(0);
      console.error("Error fetching filtered properties:", error);
    }
  };

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
    } else if (userId) {
      fetchFilteredProperties();
    }
  }, [category, city, locality, propertyType, minPrice, maxPrice, userId]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handleMarkAsSold = async () => {
    if (!selectedPropertyId) return;

    const formData = new FormData();
    formData.append("property_id", selectedPropertyId);
    formData.append("user_id", userId);
    formData.append(
      "available_status",
      selectedProperty.status === "Available" ? "Sold" : "Available",
    );

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/cust_api/change_property_status`,
        formData,
      );

      if (response.data.status === 1) {
        setShowModal(false);
        const updatedProperties = properties.map((property) =>
          property.id === selectedPropertyId
            ? {
              ...property,
              soldOut:
                selectedProperty.status === "Available"
                  ? "Sold"
                  : "Available",
              status:
                selectedProperty.status === "Available"
                  ? property.type === "FOR BUY"
                    ? "Sold Out"
                    : "Rented Out"
                  : "Available",
            }
            : property,
        );
        setProperties(updatedProperties);
      } else {
        console.error("Status not updated:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating property status:", error);
    }
  };

  const handleStatusClick = (property) => {
    setSelectedProperty(property);
    setSelectedPropertyId(property.id);
    setShowModal(true);
  };

  const handlePropertyClick = (property) => {
    if (offerCount <= 0) {
      setShowOfferCountModal(true);
    } else {
      setSelectedProperty(property);
      setShowNextModal(true);
    }
  };

  const handleAddOffer = async () => {
    if (!userId) {
      toast.error("You must be logged in to create an offer.");
      return;
    }

    if (!selectedProperty) {
      toast.error("No property selected.");
      return;
    }

    const formData = new FormData();
    formData.append("property_id", selectedProperty.id);
    formData.append("user_id", userId);
    formData.append("offer_name", offerName);
    formData.append("offer_time", offerTime);
    formData.append("offer_description", offerDescription);
    if (offerPhoto) {
      formData.append("offer_img", offerPhoto);
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/cust_api/add_offer`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (response.ok) {
        const data = await response.json();
        if (data.status === 1) {
          toast.success("Offer created successfully!");
          setShowNextModal(false);
          setOfferName("");
          setOfferTime("");
          setOfferDescription("");
          setOfferPhoto(null);
          setOfferPhotoPreview(null);
        } else if (data.status === 0) {
          toast.error("Offer already exists!");
        }
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error creating offer:", error);
      toast.error("An error occurred while creating the offer.");
    }
  };

  const handleCoverImageDelete = () => {
    setOfferPhoto(null);
    setOfferPhotoPreview(null);
  };

  // Search runs here whenever the keyword changes (it was also called from
  // onChange with the OLD keyword, which sent a stale duplicate request).
  useEffect(() => {
    if (searchKeyword.trim() !== "") {
      handleSearch();
    }
  }, [searchKeyword]);

  // Status pill text for the confirm modal
  const isAvailable = selectedProperty?.status === "Available";
  const targetStatus = isAvailable
    ? selectedProperty?.type === "FOR BUY"
      ? "Sold Out"
      : "Rented Out"
    : "Available";

  return (
    <>
      <div className="w-full">
        {/* ==================================================
            Header banner
        ================================================== */}
        <div className="relative flex flex-col gap-4 p-5 overflow-hidden border border-[#FDE8EC] rounded-2xl bg-gradient-to-r from-[#FFF1F4] via-[#FDE8EC] to-[#FAD3DB] sm:flex-row sm:items-center sm:justify-between md:px-6">
          {/* faint building art, like the design */}
          <Buildings
            size={140}
            weight="thin"
            className="absolute hidden pointer-events-none -right-4 -bottom-6 text-[#D61F45] opacity-10 md:block"
          />

          <div className="relative flex items-center gap-4">
            <span className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-white rounded-2xl bg-gradient-to-br from-[#D61F45] to-[#B91C3C] shadow-[0_8px_18px_rgba(214,31,69,0.35)]">
              <House size={24} weight="fill" />
            </span>
            <div>
              <h2 className="m-0 text-2xl font-bold text-[#17253a]">My Properties</h2>
              <p className="m-0 mt-0.5 text-[13px] text-gray-600">
                Manage, track and grow your property listings
              </p>
            </div>
          </div>

          <Link
            to="/add_new_property"
            className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 text-[14px] font-semibold text-white no-underline rounded-xl bg-gradient-to-r from-[#D61F45] to-[#B91C3C] shadow-[0_6px_18px_rgba(214,31,69,0.35)] transition-all hover:shadow-[0_10px_24px_rgba(214,31,69,0.45)] hover:-translate-y-0.5 hover:no-underline hover:text-white whitespace-nowrap"
          >
            <Plus size={16} weight="bold" />
            Add New Property
            {freePostCount > 0 && (
              <span className="px-2 py-0.5 text-[10px] font-bold text-white bg-green-500 rounded-full">
                FREE
              </span>
            )}
          </Link>
        </div>

        {/* ==================================================
            Search + filters bar
        ================================================== */}
        <div className="p-3 mt-4 bg-white border border-[#FDE8EC] rounded-2xl shadow-[0_8px_24px_rgba(214,31,69,0.06)]">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-[1.6fr_repeat(5,1fr)]">
            {/* Search */}
            <div className="relative col-span-2 md:col-span-3 xl:col-span-1">
              <MagnifyingGlass
                size={17}
                weight="bold"
                className="absolute -translate-y-1/2 cursor-pointer left-3 top-1/2 text-[#D61F45]"
                onClick={handleSearch}
              />
              <input
                type="text"
                placeholder="Search your properties..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full h-10 pl-10 pr-9 text-[13px] text-[#17253a] bg-[#FFF1F4] border border-transparent rounded-xl outline-none placeholder:text-gray-400 transition-colors focus:bg-white focus:border-[#D61F45] focus:ring-2 focus:ring-[#FDE8EC]"
              />
              {searchKeyword && (
                <button
                  onClick={() => {
                    setSearchKeyword("");
                    fetchFilteredProperties();
                  }}
                  className="absolute flex items-center justify-center w-6 h-6 text-gray-500 -translate-y-1/2 rounded-full right-2 top-1/2 hover:bg-[#FDE8EC] hover:text-[#D61F45]"
                  aria-label="Clear search"
                >
                  <X size={14} weight="bold" />
                </button>
              )}
            </div>

            <FilterSelect icon={Stack} value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Category Type</option>
              <option value="Buy">Buy</option>
              <option value="Rent">Rent</option>
              <option value="Commercial Buy">Commercial Buy</option>
              <option value="Commercial Lease">Commercial Lease</option>
              <option value="PG/Co-living">PG/Co-living</option>
            </FilterSelect>

            <FilterSelect icon={MapPin} value={city} onChange={(e) => setCity(e.target.value)}>
              <option value="">City</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Pune">Pune</option>
              <option value="Delhi">Delhi</option>
              <option value="Bangalore">Bengaluru</option>
              <option value="Chennai">Chennai</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Ahmedabad">Ahmedabad</option>
            </FilterSelect>

            <FilterSelect icon={HouseLine} value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
              <option value="">Property Type</option>
              <option value="Flat/Apartment">Flat/Apartment</option>
              <option value="Builder Floor">Builder Floor</option>
              <option value="Independent House/Villa">Independent House/Villa</option>
              <option value="Independent/Builder Floor">Independent/Builder Floor</option>
              <option value="1RK/Studio Apartment">1RK/Studio Apartment</option>
              <option value="Service Apartment">Service Apartment</option>
              <option value="Farmhouse">Farmhouse</option>
              <option value="Plot/Land">Plot/Land</option>
              <option value="Office">Office</option>
              <option value="Retail">Retail</option>
              <option value="Storage">Storage</option>
              <option value="Industry">Industry</option>
              <option value="Hospitality">Hospitality</option>
              <option value="Other">Other</option>
            </FilterSelect>

            <FilterSelect icon={CurrencyInr} value={minPrice} onChange={handleMinChange}>
              <option value="">Min</option>
              {budgetOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </FilterSelect>

            <FilterSelect icon={CurrencyInr} value={maxPrice} onChange={handleMaxChange}>
              <option value="">Max</option>
              {budgetOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </FilterSelect>
          </div>

          {priceError && (
            <p className="flex items-center gap-1.5 m-0 mt-2 text-[12px] font-medium text-[#D61F45]">
              <WarningCircle size={14} weight="fill" />
              {priceError}
            </p>
          )}
        </div>

        {/* ==================================================
            Property cards
        ================================================== */}
        <div className="mt-4 space-y-4">
          {!properties || properties.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-4 py-14 text-center bg-white border border-[#FDE8EC] rounded-2xl">
              <span className="flex items-center justify-center w-16 h-16 mb-3 rounded-full bg-[#FDE8EC] text-[#D61F45]">
                <House size={30} weight="fill" />
              </span>
              <p className="m-0 text-[16px] font-semibold text-[#17253a]">No properties found</p>
              <p className="m-0 mt-1 text-[13px] text-gray-500">
                Try changing your filters, or add a new property.
              </p>
            </div>
          ) : (
            properties.map((property) => {
              const displayPrice = getDisplayPrice(property);
              const available = property.status === "Available";

              return (
                <div
                  key={property.id}
                  className="flex flex-col gap-4 p-4 bg-white border border-[#FDE8EC] rounded-2xl shadow-[0_8px_24px_rgba(214,31,69,0.06)] transition-shadow hover:shadow-[0_12px_32px_rgba(214,31,69,0.12)] lg:flex-row lg:items-center"
                >
                  {/* Left: image + details */}
                  <div className="flex flex-1 min-w-0 gap-4">
                    <Link
                      to={`/propertydetails/${property.id}`}
                      className="relative flex-shrink-0 block w-32 overflow-hidden h-28 sm:w-40 rounded-xl bg-[#FFF1F4]"
                    >
                      <img
                        src={property.image}
                        alt={property.title}
                        className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                      />
                      <span
                        className={`absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold tracking-wide text-white rounded-md shadow ${property.badgeColor}`}
                      >
                        {property.type}
                      </span>
                    </Link>

                    <div className="min-w-0">
                      <ApprovalPill published={property.published} />
                      <h3 className="m-0 mt-1.5 text-[17px] font-bold text-[#17253a] truncate">
                        {property.title}
                      </h3>
                      <p className="flex items-center gap-1 m-0 mt-1 text-[13px] text-gray-500">
                        <MapPin size={14} weight="fill" className="flex-shrink-0 text-[#D61F45]" />
                        <span className="truncate">{property.location}</span>
                      </p>
                      {displayPrice && (
                        <p className="m-0 mt-1 text-[17px] font-bold text-[#D61F45]">
                          {displayPrice}
                        </p>
                      )}
                      <p className="flex items-center gap-1 m-0 mt-1 text-[12px] text-gray-400">
                        <CalendarBlank size={14} />
                        Posted on: {property.date}
                      </p>
                    </div>
                  </div>

                  {/* Right: stats + status, then actions */}
                  <div className="flex flex-col gap-3 lg:items-end">
                    <div className="flex flex-wrap items-center justify-between gap-3 lg:justify-end">
                      <div className="flex gap-3">
                        <StatTile icon={Eye} label="Views" value={property.view_count || "0"} />
                        <StatTile icon={Users} label="Leads" value={property.leads_count || "0"} />
                      </div>

                      {/* Status pill — click to toggle Available / Sold */}
                      <button
                        type="button"
                        onClick={() => handleStatusClick(property)}
                        title="Change availability"
                        className={`flex items-center gap-2 px-4 py-2 text-[13px] font-semibold rounded-full transition-colors ${available
                          ? "bg-[#E6F6F1] text-[#17253a] hover:bg-[#D3EFE5]"
                          : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                          }`}
                      >
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${available ? "bg-green-500" : "bg-gray-500"}`}
                        />
                        {property.status}
                      </button>
                    </div>

                    {available && (
                      <div className="flex flex-wrap gap-2.5">
                        <button
                          onClick={() => handlePropertyClick(property)}
                          className="flex items-center justify-center flex-1 gap-2 px-5 py-2 text-[13px] font-semibold text-white rounded-xl bg-gradient-to-r from-[#D61F45] to-[#B91C3C] shadow-[0_4px_12px_rgba(214,31,69,0.3)] transition-all hover:shadow-[0_8px_18px_rgba(214,31,69,0.4)] sm:flex-none sm:min-w-[150px]"
                        >
                          <Tag size={16} weight="fill" />
                          Create Offer
                        </button>
                        <button
                          className="flex items-center justify-center flex-1 gap-2 px-5 py-2 text-[13px] font-semibold text-[#D61F45] bg-white border-[1.5px] border-[#D61F45] rounded-xl transition-colors hover:bg-[#FDE8EC] sm:flex-none sm:min-w-[150px]"
                          onClick={(e) => {
                            e.preventDefault();
                            history.push(`/edit_property/${property.id}`);
                          }}
                        >
                          <PencilSimple size={16} weight="bold" />
                          Edit Property
                        </button>
                        <button
                          className="flex items-center justify-center w-10 h-10 text-[#D61F45] bg-white border-[1.5px] border-[#D61F45] rounded-xl transition-colors hover:bg-[#FDE8EC]"
                          onClick={() => handleDeleteClick(property)}
                          aria-label="Delete property"
                          title="Delete property"
                        >
                          <Trash size={18} weight="bold" />
                        </button>
                      </div>
                    )}
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
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <CaretRight size={16} weight="bold" />
            </button>
          </div>
        )}
      </div>

      {/* ==================================================
          Status confirm modal (Available <-> Sold / Rented)
      ================================================== */}
      {showModal && (
        <ModalShell onClose={() => setShowModal(false)} maxWidth="max-w-sm">
          <div className="p-6 text-center">
            <button
              className="absolute flex items-center justify-center w-8 h-8 text-gray-400 rounded-full top-3 right-3 hover:bg-[#FDE8EC] hover:text-[#D61F45]"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              <X size={16} weight="bold" />
            </button>

            <div className="flex items-center justify-center mx-auto mb-3 rounded-full w-14 h-14 bg-[#FDE8EC] text-[#D61F45]">
              <ArrowsClockwise size={26} weight="bold" />
            </div>
            <h2 className="text-xl font-bold text-[#17253a]">Mark as {targetStatus}</h2>
            <p className="mt-1 text-sm text-gray-500">
              Are you sure you want to mark this property as {targetStatus}?
            </p>

            <div className="grid grid-cols-2 gap-3 mt-5">
              <button
                className="py-2.5 font-semibold bg-white border-[1.5px] rounded-xl border-[#D61F45] text-[#D61F45] hover:bg-[#FDE8EC] transition-colors"
                onClick={() => setShowModal(false)}
              >
                No
              </button>
              <button
                className="py-2.5 font-semibold text-white rounded-xl bg-gradient-to-r from-[#D61F45] to-[#B91C3C] shadow-[0_6px_18px_rgba(214,31,69,0.35)]"
                onClick={async () => {
                  await handleMarkAsSold();
                  setShowModal(false);
                  fetchProperties();
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </ModalShell>
      )}

      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => handleConfirmDelete(selectedProperty?.id)}
      />

      {/* ==================================================
          Create Offer modal
      ================================================== */}
      {showNextModal && selectedProperty && (
        <ModalShell onClose={() => setShowNextModal(false)} maxWidth="max-w-3xl">
          {/* Header */}
          <div className="relative flex items-center gap-3 px-6 py-5 text-white bg-gradient-to-r from-[#D61F45] to-[#E8456A]">
            <span className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full bg-white/20 ring-2 ring-white/40">
              <Tag size={24} weight="fill" />
            </span>
            <div>
              <h2 className="m-0 text-xl font-bold text-white">Offer Details</h2>
              <p className="m-0 text-[13px] text-white/85">
                Create a special offer for this property
              </p>
            </div>
            <button
              type="button"
              className="absolute flex items-center justify-center w-8 h-8 text-[#D61F45] bg-white rounded-full shadow top-4 right-4 hover:scale-105 transition-transform"
              onClick={() => setShowNextModal(false)}
              aria-label="Close"
            >
              <X size={16} weight="bold" />
            </button>
          </div>

          <div className="flex-1 p-5 space-y-5 overflow-y-auto">
            {/* Selected property */}
            <div className="flex items-center gap-4 p-3 rounded-2xl bg-[#FFF7F9] border border-[#FDE8EC]">
              <div className="relative flex-shrink-0 w-24 h-20 overflow-hidden rounded-xl">
                <img
                  src={selectedProperty.image}
                  alt={selectedProperty.title}
                  className="object-cover w-full h-full"
                />
                <span
                  className={`absolute top-1 left-1 px-1.5 py-0.5 text-[9px] font-bold text-white rounded ${selectedProperty.badgeColor}`}
                >
                  {selectedProperty.type || "UNKNOWN"}
                </span>
              </div>
              <div className="min-w-0">
                <p className="m-0 font-bold text-[#17253a] truncate">{selectedProperty.title}</p>
                <p className="flex items-center gap-1 m-0 mt-0.5 text-[13px] text-gray-500">
                  <MapPin size={13} weight="fill" className="text-[#D61F45]" />
                  {selectedProperty.location}
                </p>
                {getDisplayPrice(selectedProperty) && (
                  <p className="m-0 mt-1 font-bold text-[#D61F45]">
                    {getDisplayPrice(selectedProperty)}
                  </p>
                )}
              </div>
            </div>

            {/* Two columns: photo + fields */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="flex items-center justify-center p-3 border-2 border-dashed rounded-2xl border-[#FAD3DB] bg-[#FFF7F9] min-h-[190px]">
                {offerPhotoPreview ? (
                  <div className="relative w-full">
                    <img
                      src={offerPhotoPreview}
                      alt="Offer Preview"
                      className="object-cover w-full h-44 rounded-xl"
                    />
                    <button
                      onClick={handleCoverImageDelete}
                      className="absolute flex items-center justify-center w-8 h-8 text-[#D61F45] bg-white rounded-full shadow top-2 right-2 hover:bg-[#FDE8EC]"
                      aria-label="Remove photo"
                    >
                      <Trash size={16} weight="bold" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <span className="flex items-center justify-center mx-auto mb-2 rounded-full w-14 h-14 bg-[#FDE8EC] text-[#D61F45]">
                      <ImageSquare size={26} />
                    </span>
                    <p className="m-0 mb-3 text-[13px] text-gray-500">Upload an offer banner</p>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold text-white rounded-xl bg-gradient-to-r from-[#D61F45] to-[#B91C3C]"
                      onClick={() => document.getElementById("offer_img").click()}
                    >
                      <Plus size={14} weight="bold" />
                      Add Photo
                    </button>
                  </div>
                )}
                <input
                  id="offer_img"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setOfferPhoto(file);
                      setOfferPhotoPreview(URL.createObjectURL(file));
                    }
                  }}
                />
              </div>

              <div className="space-y-4">
                <label className="block">
                  <span className="block mb-1 text-[12px] font-semibold text-gray-600">Offer Name</span>
                  <input
                    type="text"
                    placeholder="e.g. Festive Discount"
                    value={offerName}
                    onChange={(e) => setOfferName(e.target.value)}
                    className="w-full h-11 px-3 text-[14px] text-[#17253a] bg-white border border-gray-200 rounded-xl outline-none focus:border-[#D61F45] focus:ring-2 focus:ring-[#FDE8EC]"
                  />
                </label>
                <label className="block">
                  <span className="block mb-1 text-[12px] font-semibold text-gray-600">Offer Description</span>
                  <textarea
                    placeholder="Describe the offer"
                    rows={4}
                    value={offerDescription}
                    onChange={(e) => setOfferDescription(e.target.value)}
                    className="w-full px-3 py-2 text-[14px] text-[#17253a] bg-white border border-gray-200 rounded-xl outline-none resize-none focus:border-[#D61F45] focus:ring-2 focus:ring-[#FDE8EC]"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col gap-3 px-6 py-4 border-t border-[#FDE8EC] bg-[#FFF7F9] sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-1.5 m-0 text-[13px] font-semibold text-gray-600">
              <House size={16} weight="fill" className="text-[#D61F45]" />
              1 Property Selected
            </p>
            <div className="grid grid-cols-2 gap-3 sm:flex">
              <button
                className="px-5 py-2.5 text-[14px] font-semibold text-[#D61F45] bg-white border-[1.5px] border-[#D61F45] rounded-xl hover:bg-[#FDE8EC] transition-colors"
                onClick={() => setShowNextModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-5 py-2.5 text-[14px] font-semibold text-white rounded-xl bg-gradient-to-r from-[#D61F45] to-[#B91C3C] shadow-[0_6px_18px_rgba(214,31,69,0.35)]"
                onClick={() => {
                  handleAddOffer();
                  setShowNextModal(false);
                }}
              >
                Create Offer
              </button>
            </div>
          </div>
        </ModalShell>
      )}

      {/* ==================================================
          Offer limit reached modal
      ================================================== */}
      {showOfferCountModal && (
        <ModalShell onClose={() => setShowOfferCountModal(false)}>
          <div className="p-6 text-center">
            <div className="flex items-center justify-center mx-auto mb-3 rounded-full w-14 h-14 bg-[#FDE8EC] text-[#D61F45]">
              <WarningCircle size={28} weight="fill" />
            </div>
            <h2 className="text-xl font-bold text-[#17253a]">Offer Posting Limit Reached</h2>
            <p className="mt-2 text-sm text-gray-500">
              You have reached your maximum limit for posting offers. Please
              purchase a plan to continue creating new offers.
            </p>
            <div className="grid grid-cols-2 gap-3 mt-5">
              <button
                className="py-2.5 font-semibold bg-white border-[1.5px] rounded-xl border-[#D61F45] text-[#D61F45] hover:bg-[#FDE8EC] transition-colors"
                onClick={() => setShowOfferCountModal(false)}
              >
                Cancel
              </button>
              <button
                className="py-2.5 font-semibold text-white rounded-xl bg-gradient-to-r from-[#D61F45] to-[#B91C3C] shadow-[0_6px_18px_rgba(214,31,69,0.35)]"
                onClick={() => {
                  setShowOfferCountModal(false);
                  history.push({
                    pathname: "/dashboard",
                    state: { page: "mySubscriptions" },
                  });
                }}
              >
                Purchase Plan
              </button>
            </div>
          </div>
        </ModalShell>
      )}
    </>
  );
};

export default MyProperties;