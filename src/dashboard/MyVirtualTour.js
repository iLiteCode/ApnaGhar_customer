// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { AiOutlineUser } from "react-icons/ai";
// import { FaSearch, FaPhoneAlt, FaRegEnvelope, FaSort } from "react-icons/fa";
// import { FiSmartphone } from "react-icons/fi";
// import { User } from "@phosphor-icons/react";
// import { IoCloseCircleOutline } from "react-icons/io5";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import ReScheduleModal from "../containers/ReScheduleModal";
// import { Link } from "react-router-dom";
// import { useHistory } from "react-router-dom";

// const MyVirtualTour = () => {
//   const [activeTab, setActiveTab] = useState("sent");
//   const [appointments, setAppointments] = useState([]);
//   const user_id = sessionStorage.getItem("accessToken");
//   const [activeFilter, setActiveFilter] = useState("all");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [senttotalCount, setSendTotalCount] = useState(0);
//   const [receivedTotalCount, setReceivedTotalCount] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const itemsPerPage = 10;
//   const [showModal, setShowModal] = useState(false);
//   const [selectedAppointment, setSelectedAppointment] = useState(null);
//   const [showPhone, setShowPhone] = useState(false);
//   // state
//   const [isConfirmOpen, setIsConfirmOpen] = useState(false);
//   const [pendingAction, setPendingAction] = useState(null);
//   const [freeViewCount, setFreeViewCount] = useState(0);
//   const [paidViewCount, setPaidViewCount] = useState(0);
//   const [visiblePhoneId, setVisiblePhoneId] = useState(null);

//   const history = useHistory();

//   const checkPostLimits = async () => {
//     try {
//       const profileForm = new FormData();
//       profileForm.append("user_id", user_id);

//       const profileResponse = await axios.post(
//         `${process.env.REACT_APP_API_URL}/cust_api/get_profile`,
//         profileForm,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         },
//       );
//       const countData = profileResponse?.data?.count_data;

//       if (countData) {
//         setFreeViewCount(countData.free_view_count || 0);
//         setPaidViewCount(countData.paid_view_count || 0);
//       }
//     } catch (error) {
//       console.error("Error checking post limits:", error);
//     }
//   };

//   useEffect(() => {
//     if (user_id) {
//       checkPostLimits();
//     }
//   }, [user_id]);

//   const handleAddCount = async (updatedCount) => {
//     try {
//       const addCountFormData = new FormData();
//       if (freeViewCount > 0) {
//         addCountFormData.append("free_view_count", updatedCount);
//       } else {
//         addCountFormData.append("paid_view_count", updatedCount);
//       }
//       addCountFormData.append("user_id", user_id);

//       const response = await fetch(
//         `${process.env.REACT_APP_API_URL}/cust_api/add_count`,
//         {
//           method: "POST",
//           body: addCountFormData,
//         },
//       );

//       const data = await response.json();

//       if (response.ok) {
//         checkPostLimits();
//       } else {
//         console.error("Failed to update count:", data.message);
//       }
//     } catch (error) {
//       console.error("API error:", error);
//     }
//   };

//   const fetchAppointments = async () => {
//     const formData = new FormData();

//     // Conditional formData field based on activeTab
//     if (activeTab === "sent") {
//       formData.append("user_id", user_id);
//     } else if (activeTab === "received") {
//       formData.append("property_owner_id", user_id);
//     }

//     formData.append("page", currentPage);
//     formData.append("page_size", itemsPerPage);

//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}/cust_api/get_virtual_tour_schedule`,
//         formData,
//       );
//       if (response.data.status === 1) {
//         const mappedAppointments = response.data.data.map((item) => {
//           // Use the correct user info depending on the tab
//           const userInfo =
//             activeTab === "sent"
//               ? item.property_owner_details
//               : item.user_details;

//           let status = item.status || "Pending";
//           let borderColor =
//             {
//               Booked: "border-yellow-400",
//               Accepted: "border-green-400",
//               Rejected: "border-red-400",
//               Expired: "border-blue-400",
//             }[status] || "border-yellow-400";

//           // Common keys to be used in UI
//           let appointmentData = {
//             id: item._id,
//             user_id: item.user_id,
//             property_id: item.property_id,
//             tour_type: item.tour_type,
//             property_owner_id: item.property_owner_id,
//             name: userInfo?.full_name || "N/A",
//             role: userInfo?.user_type || "N/A",
//             phone: userInfo?.mobile_number || "N/A",
//             email: userInfo?.email || "N/A",
//             status: item.status,
//             date: new Date(item.schedule_date).toLocaleDateString("en-IN", {
//               day: "2-digit",
//               month: "short",
//               year: "numeric",
//             }),
//             time: item.timeslot,
//             time_unit: item.time_unit,
//             borderColor,
//           };

//           // If the tour type is Property, set the property details
//           if (item.tour_type === "Property") {
//             appointmentData = {
//               ...appointmentData,
//               property_name: item.property_details.property_name,
//               price: item.property_details.property_price,
//               location: item.property_details.address_area,
//               type: item.property_details.property_category_type,
//               image: item.property_details?.cover_image,
//               rent: item.property_details.rent,
//               rent_duration: item.property_details.rent_duration,
//               property_owner_image: item.property_owner_details.profile_image,
//             };
//           }
//           // If the tour type is Project, set the project details
//           else if (item.tour_type === "Project") {
//             appointmentData = {
//               ...appointmentData,
//               property_name: item.project_details.project_name,
//               price: item.project_details.average_project_price,
//               location: item.project_details.address_area,
//               image: item.project_details.cover_image,
//               property_owner_image: item.property_owner_details.profile_image,
//             };
//           }
//           return appointmentData;
//         });
//         setAppointments(mappedAppointments);
//         setTotalPages(response.data.total_pages || 1);
//       } else {
//         setAppointments([]);
//         setTotalPages(0);
//       }
//     } catch (error) {
//       setAppointments([]);
//       setTotalPages(0);
//       console.error("Error fetching filtered properties:", error);
//     }
//   };

//   useEffect(() => {
//     fetchAppointments();
//   }, [currentPage, user_id, activeFilter]);

//   // // Sent Invitation API
//   const handleCount = async () => {
//     try {
//       // Create both FormData objects
//       const sentFormData = new FormData();
//       sentFormData.append("user_id", user_id);

//       const receivedFormData = new FormData();
//       receivedFormData.append("property_owner_id", user_id);

//       // Call both in parallel using Promise.all
//       const [sentResponse, receivedResponse] = await Promise.all([
//         axios.post(
//           `${process.env.REACT_APP_API_URL}/cust_api/get_virtual_tour_schedule`,
//           sentFormData,
//         ),
//         axios.post(
//           `${process.env.REACT_APP_API_URL}/cust_api/get_virtual_tour_schedule`,
//           receivedFormData,
//         ),
//       ]);

//       // Handle sent response
//       if (sentResponse.data?.total_count !== undefined) {
//         setSendTotalCount(sentResponse.data.total_count);
//       }

//       // Handle received response
//       if (receivedResponse.data?.total_count !== undefined) {
//         setReceivedTotalCount(receivedResponse.data.total_count);
//       }
//     } catch (err) {
//       console.error("Error fetching counts:", err);
//     }
//   };

//   // On load
//   useEffect(() => {
//     handleCount();
//   }, [user_id]);

//   const handleStatusUpdate = async (tour_schedule_id, status) => {
//     try {
//       const formData = new FormData();
//       formData.append("tour_schedule_id", tour_schedule_id);
//       formData.append("status", status);

//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}/cust_api/update_tour_status`,
//         formData,
//       );

//       if (response.status === 200) {
//         toast.success(`Tour ${status} successfully!`);
//         // Refresh data
//         setAppointments((prev) =>
//           prev.map((appt) =>
//             appt.id === tour_schedule_id ? { ...appt, status } : appt,
//           ),
//         );
//       }
//     } catch (error) {
//       console.error("Status update failed:", error);
//       toast.error("Failed to update tour status.");
//     }
//   };

//   const handleRescheduleClick = (appointment) => {
//     setSelectedAppointment(appointment);
//     setShowModal(true);
//   };

//   const filteredSentAppointments = appointments.filter((appointment) =>
//     activeFilter === "all"
//       ? true
//       : appointment.status.toLowerCase() === activeFilter,
//   );

//   const filteredReceivedAppointments = appointments.filter((appointment) => {
//     const status = appointment.status.toLowerCase();

//     if (activeFilter === "all") return true;

//     if (activeFilter === "new leads") {
//       return status !== "accepted" && status !== "rejected";
//     }

//     return status === activeFilter;
//   });

//   useEffect(() => {
//     if (showModal) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }

//     // Cleanup when component unmounts
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [showModal]);

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [currentPage]);

//   return (
//     <>
//       <div className="max-w-6xl p-6 mx-auto">
//         <h2 className="text-2xl font-semibold">Virtual Appointment</h2>

//         <div className="flex gap-6 mt-4 border-b">
//           <button
//             className={`pb-2 font-medium text-lg ${
//               activeTab === "sent"
//                 ? "my-text border-b-2 border-rose-600"
//                 : "text-gray-500"
//             }`}
//             onClick={() => setActiveTab("sent")}
//           >
//             Sent Invitations{" "}
//             <span className="p-1 text-black bg-green-400 rounded-full">
//               {" "}
//               {senttotalCount.toString().padStart(2, "0")}
//             </span>
//           </button>
//           <button
//             className={`pb-2 font-medium text-lg ${
//               activeTab === "received"
//                 ? "my-text border-b-2 border-rose-600"
//                 : "text-gray-500"
//             }`}
//             onClick={() => setActiveTab("received")}
//           >
//             Received Invitations{" "}
//             <span className="p-1 text-black bg-green-400 rounded-full">
//               {receivedTotalCount.toString().padStart(2, "0")}
//             </span>
//           </button>
//         </div>

//         {activeTab === "sent" && (
//           <>
//             <div className="flex gap-4 mt-4">
//               {["All", "Pending", "Accepted", "Rejected", "Expired"].map(
//                 (filter) => (
//                   <button
//                     key={filter}
//                     className={`px-4 py-2 rounded-3xl ${
//                       activeFilter === filter.toLowerCase()
//                         ? "bg-rose-100 my-text"
//                         : "bg-gray-100 text-gray-500"
//                     }`}
//                     onClick={() => setActiveFilter(filter.toLowerCase())}
//                   >
//                     {filter}
//                   </button>
//                 ),
//               )}
//             </div>

//             <div className="mt-6 space-y-4">
//               {filteredSentAppointments.map((appointment) => (
//                 <div
//                   key={appointment.id}
//                   className={`border-2 ${
//                     appointment.status === "Accepted"
//                       ? "border-green-400"
//                       : appointment.status === "Rejected"
//                         ? "border-red-400"
//                         : appointment.status === "Expired"
//                           ? "border-blue-400"
//                           : "border-yellow-400"
//                   } bg-white p-6 rounded-lg shadow-md`}
//                 >
//                   {/* Top Section: Name, Role, Phone, Email in a Row */}
//                   <div className="flex flex-wrap items-center justify-between pb-3 border-b">
//                     {/* Name & Role with User Icon */}
//                     <div className="flex items-center gap-3">
//                       {appointment.property_owner_image ? (
//                         <img
//                           src={`${process.env.REACT_APP_API_URL}/media/${appointment.property_owner_image}`}
//                           alt="Owner"
//                           className="object-cover w-10 h-10 rounded-full"
//                         />
//                       ) : (
//                         <div className="p-2 bg-rose-100 rounded-full">
//                           <User className="text-4xl my-text" />
//                         </div>
//                       )}
//                       <div>
//                         <span className="block mb-0 text-lg font-semibold">
//                           {appointment.name}
//                         </span>
//                         <span className="text-sm text-gray-500">
//                           {appointment.role}
//                         </span>
//                       </div>
//                     </div>

//                     {/* Contact Details */}
//                     <div className="flex items-center gap-20 text-sm">
//                       {/* Phone */}
//                       <div className="flex items-center gap-2">
//                         <FiSmartphone className="text-lg my-text" />
//                         {/* {showPhone ? ( */}
//                         {visiblePhoneId === appointment.id ? (
//                           <span className="text-black">
//                             {appointment.phone}
//                           </span>
//                         ) : (
//                           <button
//                             // onClick={() => setShowPhone(true)}
//                             onClick={() => {
//                               if (user_id) {
//                                 if (freeViewCount || paidViewCount) {
//                                   if (freeViewCount > 0) {
//                                     const updatedCount = -1;
//                                     setFreeViewCount(updatedCount);
//                                     handleAddCount(updatedCount);
//                                   } else if (paidViewCount > 0) {
//                                     const updatedCount = -1;
//                                     setPaidViewCount(updatedCount);
//                                     handleAddCount(updatedCount);
//                                   }
//                                   setVisiblePhoneId(appointment.id);
//                                   // setShowPhone(true)
//                                 } else {
//                                   setShowModal(true);
//                                 }
//                               } else {
//                                 toast.success("Plzz Log In To Continue...");
//                               }
//                             }}
//                             className="px-3 py-1 text-sm text-white my-bg rounded-md"
//                           >
//                             Contact
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Bottom Section: Two Columns Layout */}
//                   <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
//                     {/* Left Column: Property Details */}
//                     <div className="flex items-start gap-4">
//                       {/* Image Wrapper */}
//                       <div className="relative w-32 h-24">
//                         <Link
//                           to={{
//                             pathname:
//                               appointment.tour_type === "Property"
//                                 ? `/propertydetails/${appointment.property_id}`
//                                 : `/projectdetail/${appointment.property_id}`,
//                             state: { propertyId: appointment.property_id },
//                           }}
//                         >
//                           <img
//                             src={
//                               appointment.image?.startsWith("http")
//                                 ? appointment.image
//                                 : `${process.env.REACT_APP_API_URL}/${appointment.image}`
//                             }
//                             alt="Property Cover"
//                             className="object-cover w-32 h-24 rounded-md cursor-pointer"
//                           />
//                         </Link>
//                         <span
//                           className={`absolute top-2 left-2 text-white text-xs px-2 py-1 rounded-md ${
//                             appointment.type === "Buy"
//                               ? "bg-green-500"
//                               : appointment.type === "Rent"
//                                 ? "bg-blue-500"
//                                 : "bg-gray-800"
//                           }`}
//                         >
//                           {appointment.type === "Buy"
//                             ? "For Buy"
//                             : appointment.type === "Rent"
//                               ? "For Rent"
//                               : "For Project"}
//                         </span>
//                       </div>
//                       {/* Property Details */}
//                       <div>
//                         <h4 className="mb-0 font-semibold">
//                           {appointment.property_name}
//                         </h4>
//                         <p className="text-gray-500">{appointment.location}</p>
//                         <p className="font-bold">
//                           {appointment.type === "Rent" ? (
//                             <>
//                               ₹{" "}
//                               {Number(appointment.rent) >= 10000000
//                                 ? (Number(appointment.rent) / 10000000)
//                                     .toFixed(1)
//                                     .replace(/\.0$/, "") + " Cr"
//                                 : Number(appointment.rent) >= 100000
//                                   ? (Number(appointment.rent) / 100000)
//                                       .toFixed(1)
//                                       .replace(/\.0$/, "") + " L"
//                                   : Number(appointment.rent) >= 1000
//                                     ? (Number(appointment.rent) / 1000)
//                                         .toFixed(1)
//                                         .replace(/\.0$/, "") + " K"
//                                     : appointment.rent}
//                               {appointment.rent_duration &&
//                               appointment.rent_duration !== "N/A"
//                                 ? ` / ${appointment.rent_duration}`
//                                 : ""}
//                             </>
//                           ) : (
//                             appointment.price &&
//                             appointment.price !== "N/A" && (
//                               <>
//                                 ₹{" "}
//                                 {Number(appointment.price) >= 10000000
//                                   ? (Number(appointment.price) / 10000000)
//                                       .toFixed(1)
//                                       .replace(/\.0$/, "") + " Cr"
//                                   : Number(appointment.price) >= 100000
//                                     ? (Number(appointment.price) / 100000)
//                                         .toFixed(1)
//                                         .replace(/\.0$/, "") + " L"
//                                     : Number(appointment.price) >= 1000
//                                       ? (Number(appointment.price) / 1000)
//                                           .toFixed(1)
//                                           .replace(/\.0$/, "") + " K"
//                                       : appointment.price}
//                               </>
//                             )
//                           )}
//                         </p>
//                         {appointment.status === "Accepted" ? (
//                           <p className="flex items-center gap-2 mt-2 font-medium text-green-600">
//                             <span className="px-2 py-1 text-sm bg-green-100 rounded-md">
//                               Accepted
//                             </span>
//                             <span className="text-black">
//                               {appointment.date}
//                             </span>
//                           </p>
//                         ) : appointment.status === "Rejected" ? (
//                           <p className="flex items-center gap-2 mt-2 font-medium text-red-600">
//                             <span className="px-2 py-1 text-sm bg-red-100 rounded-md">
//                               Rejected
//                             </span>
//                             <span className="text-black">
//                               {appointment.date}
//                             </span>
//                           </p>
//                         ) : (
//                           <p className="mt-2 font-medium text-yellow-600">
//                             {appointment.status}{" "}
//                             <span className="text-black">
//                               {" "}
//                               {appointment.date}
//                             </span>
//                           </p>
//                         )}
//                       </div>
//                     </div>

//                     {/* Right Column: Appointment Details */}
//                     <div className="flex justify-between text-sm">
//                       {/* Left: Appointment Date */}
//                       <div className="text-gray-500 ">
//                         <p className="mb-0 ">Appointment Date:</p>
//                         <span className="block font-bold text-black">
//                           {appointment.date}
//                         </span>
//                       </div>

//                       {/* Right: Appointment Time */}
//                       <div className="text-gray-500">
//                         <p className="mb-0">Appointment Time:</p>
//                         <span className="block font-bold text-black">
//                           {appointment.time} {appointment.time_unit}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                   {appointment.status === "Accepted" && (
//                     <div className="flex justify-end">
//                       <button
//                         className="px-4 py-2 my-text bg-white border-rose-500 rounded-lg border-1"
//                         onClick={() => setIsModalOpen(true)}
//                       >
//                         Go To Mobile App
//                       </button>
//                     </div>
//                   )}

//                   {/* Modal */}
//                   {isModalOpen && (
//                     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//                       <div className="relative p-6 text-center bg-white shadow-lg rounded-2xl w-80">
//                         {/* Close Button */}
//                         <button
//                           onClick={() => setIsModalOpen(false)}
//                           className="absolute text-gray-500 top-3 right-3"
//                         >
//                           <IoCloseCircleOutline size={18} />
//                         </button>

//                         <h2 className="text-lg font-semibold">
//                           Go to Mobile App
//                         </h2>
//                         <p className="mt-2 text-sm text-gray-500">
//                           This feature works only in the Housezo App.
//                         </p>

//                         <button
//                           className="w-full py-2 mt-4 text-white my-bg rounded-lg"
//                           onClick={() => history.push("/download")}
//                         >
//                           Download
//                         </button>

//                         {/* App Store and Play Store Icons */}
//                         <div className="flex justify-center mt-3 space-x-4">
//                           <img
//                             src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
//                             alt="Google Play"
//                             className="h-10"
//                           />
//                           <img
//                             src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
//                             alt="App Store"
//                             className="h-10"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   {/* {appointment.status === "Rejected" && (
//                     <div className="flex justify-end">
//                       <button
//                         onClick={() => handleRescheduleClick(appointment)}
//                         className="px-4 py-2 text-white my-bg rounded-lg"
//                       >
//                         Resheduled Appointment
//                       </button>
//                     </div>
//                   )}
//                   {showModal && selectedAppointment && (
//                     <ReScheduleModal
//                       setScheduledDateLabel={fetchAppointments}
//                       onClose={() => setShowModal(false)}
//                       propertyDetails={selectedAppointment}
//                       setIsModalOpen={setShowModal}
//                     />
//                   )} */}
//                 </div>
//               ))}
//             </div>
//           </>
//         )}

//         {activeTab === "received" && (
//           <>
//             {/* Filter Buttons */}
//             <div className="flex gap-4 mt-4">
//               {["All", "Pending", "Accepted", "Rejected", "Expired"].map(
//                 (filter) => (
//                   <button
//                     key={filter}
//                     className={`px-4 py-2 rounded-3xl ${
//                       activeFilter === filter.toLowerCase()
//                         ? "bg-rose-100 my-text"
//                         : "bg-gray-100 text-gray-500"
//                     }`}
//                     onClick={() => setActiveFilter(filter.toLowerCase())}
//                   >
//                     {filter}
//                   </button>
//                 ),
//               )}
//             </div>

//             {/* Appointment Cards */}
//             <div className="mt-6 space-y-4">
//               {filteredReceivedAppointments.map((appointment) => (
//                 <div
//                   key={appointment.id}
//                   className={`border-2 ${
//                     appointment.status === "Accepted"
//                       ? "border-green-400"
//                       : appointment.status === "Rejected"
//                         ? "border-red-400"
//                         : appointment.status === "Expired"
//                           ? "border-blue-400"
//                           : "border-yellow-400"
//                   } bg-white p-6 rounded-lg shadow-md`}
//                 >
//                   {/* Top Section: Name, Role, Phone, Email */}
//                   <div className="flex flex-wrap items-center justify-between pb-3 border-b">
//                     {/* Name & Role */}
//                     <div className="flex items-start gap-3">
//                       {/* <div className="p-2 bg-rose-100 rounded-full">
//                         <User className="text-4xl my-text" />
//                       </div> */}
//                       <div className="rounded-full bg-slate-100">
//                         {appointment.property_owner_image ? (
//                           <img
//                             src={`${process.env.REACT_APP_API_URL}/media/${appointment.property_owner_image}`}
//                             alt="Owner"
//                             className="object-cover w-10 h-10 rounded-full"
//                           />
//                         ) : (
//                           <div className="p-2 bg-rose-100 rounded-full">
//                             <User className="text-4xl my-text" />
//                           </div>
//                         )}
//                       </div>

//                       <div>
//                         <span className="block text-lg font-semibold">
//                           {appointment.name}
//                         </span>
//                         <span className="text-sm text-gray-500">
//                           {appointment.role}
//                         </span>
//                       </div>
//                     </div>

//                     {/* Contact Details */}
//                     <div className="flex items-center gap-20 text-sm">
//                       {/* Phone */}
//                       {/* <div className="flex items-center gap-2">
//                         <FiSmartphone className="text-lg my-text" />
//                         {showPhone ? (
//                           <span className="text-black">{appointment.phone}</span>
//                         ) : (
//                           <button
//                             onClick={() => setShowPhone(true)}
//                             className="px-3 py-1 text-sm text-white my-bg rounded-md"
//                           >
//                             Contact
//                           </button>
//                         )}

//                       </div> */}
//                       <div className="flex items-center gap-2">
//                         <FiSmartphone className="text-lg my-text" />
//                         {/* {showPhone ? ( */}
//                         {visiblePhoneId === appointment.id ? (
//                           <span className="text-black">
//                             {appointment.phone}
//                           </span>
//                         ) : (
//                           <button
//                             // onClick={() => setShowPhone(true)}
//                             onClick={() => {
//                               if (user_id) {
//                                 if (freeViewCount || paidViewCount) {
//                                   if (freeViewCount > 0) {
//                                     const updatedCount = -1;
//                                     setFreeViewCount(updatedCount);
//                                     handleAddCount(updatedCount);
//                                   } else if (paidViewCount > 0) {
//                                     const updatedCount = -1;
//                                     setPaidViewCount(updatedCount);
//                                     handleAddCount(updatedCount);
//                                   }
//                                   setVisiblePhoneId(appointment.id);
//                                   // setShowPhone(true)
//                                 } else {
//                                   setShowModal(true);
//                                 }
//                               } else {
//                                 toast.success("Plzz Log In To Continue...");
//                               }
//                             }}
//                             className="px-3 py-1 text-sm text-white my-bg rounded-md"
//                           >
//                             Contact
//                           </button>
//                         )}
//                       </div>

//                       {/* Email */}
//                       {/* <div className="flex items-center gap-2 my-text">
//                         <FaRegEnvelope className="text-lg my-text" />
//                         <span className="text-black">{appointment.email}</span>
//                       </div> */}
//                     </div>
//                   </div>

//                   {/* Bottom Section: Two Columns Layout */}
//                   <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
//                     {/* Left Column: Property Details */}
//                     <div className="flex items-start gap-4">
//                       {/* Image Wrapper */}
//                       <div className="relative h-24 w-44">
//                         <Link
//                           to={{
//                             pathname:
//                               appointment.tour_type === "Property"
//                                 ? `/propertydetails/${appointment.property_id}`
//                                 : `/projectdetail/${appointment.property_id}`,
//                             state: { propertyId: appointment.property_id },
//                           }}
//                         >
//                           <img
//                             src={
//                               appointment.image?.startsWith("http")
//                                 ? appointment.image
//                                 : `${process.env.REACT_APP_API_URL}/${appointment.image}`
//                             }
//                             alt="Property Cover"
//                             className="object-cover w-32 h-24 rounded-md"
//                           />
//                         </Link>
//                         <span
//                           className={`absolute top-2 left-2 text-white text-xs px-2 py-1 rounded-md ${
//                             appointment.type === "Buy"
//                               ? "bg-green-600"
//                               : appointment.type === "Rent"
//                                 ? "bg-blue-600"
//                                 : "bg-gray-800"
//                           }`}
//                         >
//                           {appointment.type === "Buy"
//                             ? "For Buy"
//                             : appointment.type === "Rent"
//                               ? "For Rent"
//                               : "For Project"}
//                         </span>
//                       </div>
//                       {/* Property Details */}
//                       <div>
//                         <h4 className="mb-0 font-semibold">
//                           {appointment.property_name}
//                         </h4>
//                         <p className="text-gray-500">{appointment.location}</p>
//                         <p className="font-bold">
//                           {appointment.type === "Rent" ? (
//                             <>
//                               ₹{" "}
//                               {Number(appointment.rent) >= 10000000
//                                 ? (Number(appointment.rent) / 10000000)
//                                     .toFixed(1)
//                                     .replace(/\.0$/, "") + " Cr"
//                                 : Number(appointment.rent) >= 100000
//                                   ? (Number(appointment.rent) / 100000)
//                                       .toFixed(1)
//                                       .replace(/\.0$/, "") + " L"
//                                   : Number(appointment.rent) >= 1000
//                                     ? (Number(appointment.rent) / 1000)
//                                         .toFixed(1)
//                                         .replace(/\.0$/, "") + " K"
//                                     : appointment.rent}
//                               {appointment.rent_duration &&
//                               appointment.rent_duration !== "N/A"
//                                 ? ` / ${appointment.rent_duration}`
//                                 : ""}
//                             </>
//                           ) : (
//                             appointment.price &&
//                             appointment.price !== "N/A" && (
//                               <>
//                                 ₹{" "}
//                                 {Number(appointment.price) >= 10000000
//                                   ? (Number(appointment.price) / 10000000)
//                                       .toFixed(1)
//                                       .replace(/\.0$/, "") + " Cr"
//                                   : Number(appointment.price) >= 100000
//                                     ? (Number(appointment.price) / 100000)
//                                         .toFixed(1)
//                                         .replace(/\.0$/, "") + " L"
//                                     : Number(appointment.price) >= 1000
//                                       ? (Number(appointment.price) / 1000)
//                                           .toFixed(1)
//                                           .replace(/\.0$/, "") + " K"
//                                       : appointment.price}
//                               </>
//                             )
//                           )}
//                         </p>
//                         {appointment.status === "Accepted" ? (
//                           <p className="flex items-center gap-2 mt-2 font-medium text-green-600">
//                             <span className="px-2 py-1 text-sm bg-green-100 rounded-md">
//                               Accepted
//                             </span>
//                             <span className="text-black">
//                               {" "}
//                               {appointment.date}
//                             </span>
//                           </p>
//                         ) : appointment.status === "Rejected" ? (
//                           <p className="flex items-center gap-2 mt-2 font-medium text-red-600">
//                             <span className="px-2 py-1 text-sm bg-red-100 rounded-md">
//                               Rejected
//                             </span>
//                             <span className="text-black">
//                               {" "}
//                               {appointment.date}
//                             </span>
//                           </p>
//                         ) : (
//                           <p className="mt-2 font-medium text-yellow-600">
//                             {appointment.status}
//                             <span className="text-black">
//                               {" "}
//                               {appointment.date}
//                             </span>
//                           </p>
//                         )}
//                       </div>
//                     </div>

//                     {/* Right Column: Appointment Details */}
//                     <div className="flex justify-between text-sm">
//                       <p className="text-gray-500">
//                         Appointment Date
//                         <span className="block font-bold text-black">
//                           {appointment.date}
//                         </span>
//                       </p>
//                       <p className="text-gray-500">
//                         Appointment Time
//                         <span className="block font-bold text-black">
//                           {appointment.time} {appointment.time_unit}
//                         </span>
//                       </p>
//                     </div>
//                   </div>

//                   {/* Action Buttons */}
//                   <div className="flex justify-end gap-4 mt-4">
//                     {appointment.status === "Pending" ? (
//                       <>
//                         <button
//                           className="px-4 py-2 text-white bg-green-500 rounded-md"
//                           onClick={() => {
//                             setPendingAction({
//                               id: appointment.id,
//                               status: "Accepted",
//                             });
//                             setIsConfirmOpen(true);
//                           }}
//                         >
//                           Accept
//                         </button>

//                         <button
//                           className="px-4 py-2 text-white bg-red-500 rounded-md"
//                           onClick={() => {
//                             setPendingAction({
//                               id: appointment.id,
//                               status: "Rejected",
//                             });
//                             setIsConfirmOpen(true);
//                           }}
//                         >
//                           Reject
//                         </button>
//                       </>
//                     ) : (
//                       <>
//                         {appointment.status === "Accepted" && (
//                           <div className="flex justify-end">
//                             <button
//                               className="px-4 py-2 my-text bg-white border-rose-500 rounded-lg border-1"
//                               onClick={() => setIsModalOpen(true)}
//                             >
//                               Go To Mobile App
//                             </button>
//                           </div>
//                         )}
//                         {appointment.status === "Rejected" && (
//                           <div className="flex justify-end"></div>
//                         )}
//                       </>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex items-center justify-center mt-6 space-x-3">
//           <button
//             className={`px-3 py-2 border rounded-full ${
//               currentPage === 1
//                 ? "text-gray-400 cursor-not-allowed"
//                 : "hover:bg-gray-100"
//             }`}
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//           >
//             &lt;
//           </button>

//           {[...Array(totalPages)].map((_, index) => (
//             <button
//               key={index}
//               className={`w-10 h-10 flex items-center justify-center rounded-full text-lg font-medium ${
//                 currentPage === index + 1
//                   ? "my-border my-text"
//                   : "text-gray-500 hover:bg-gray-100"
//               }`}
//               onClick={() => setCurrentPage(index + 1)}
//             >
//               {index + 1}
//             </button>
//           ))}

//           <button
//             className={`px-3 py-2 border rounded-full ${
//               currentPage === totalPages
//                 ? "text-gray-400 cursor-not-allowed"
//                 : "hover:bg-gray-100"
//             }`}
//             onClick={() =>
//               setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//             }
//             disabled={currentPage === totalPages}
//           >
//             &gt;
//           </button>
//         </div>
//       )}

//       {isConfirmOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="relative p-6 text-center bg-white shadow-lg rounded-2xl w-80">
//             {/* Close Button */}
//             <button
//               onClick={() => setIsConfirmOpen(false)}
//               className="absolute text-gray-500 top-3 right-3"
//             >
//               <IoCloseCircleOutline size={18} />
//             </button>

//             <h2 className="text-lg font-semibold">Confirm Action</h2>
//             <p className="mt-2 text-sm text-gray-500">
//               Are you sure you want to <b>{pendingAction?.status}</b> this tour?
//             </p>

//             <div className="flex justify-between mt-4">
//               <button
//                 className="w-1/2 px-4 py-2 mr-2 text-black bg-gray-300 rounded-lg"
//                 onClick={() => setIsConfirmOpen(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className={`${
//                   pendingAction?.status === "Accepted" ? "my-bg" : "my-bg"
//                 } text-white px-4 py-2 rounded-lg w-1/2`}
//                 onClick={() => {
//                   handleStatusUpdate(pendingAction.id, pendingAction.status);
//                   setIsConfirmOpen(false);
//                 }}
//               >
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       {showModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="w-full max-w-md p-6 bg-white shadow-2xl rounded-xl">
//             <h2 className="mb-4 text-xl font-semibold text-red-600">
//               Free Property Posting Limit Reached
//             </h2>
//             <p className="mb-6 text-gray-700">
//               Your free property posting limit has ended. Please purchase a plan
//               to continue posting properties.
//             </p>
//             {/* Align buttons side by side on the right */}
//             <div className="flex items-center justify-between px-1">
//               <button
//                 className="px-4 py-2 text-white my-bg rounded hover:bg-green-700"
//                 onClick={() => {
//                   setShowModal(false); // FIXED
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
//                   setShowModal(false);
//                   history.push("/dashboard", { page: "myVirtualtour" });
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
// export default MyVirtualTour;




// =================================


import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  CalendarCheck,
  PaperPlaneTilt,
  Tray,
  ListBullets,
  Clock,
  CheckCircle,
  XCircle,
  CalendarX,
  MagnifyingGlass,
  X,
  SortAscending,
  SortDescending,
  MapPin,
  CalendarBlank,
  DeviceMobile,
  DotsThreeVertical,
  User,
  ArrowSquareOut,
  Phone,
  Check,
  WarningCircle,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useHistory } from "react-router-dom";

// ==========================================================
// Helpers (outside the component so they never remount)
// ==========================================================

// 1800000 -> "18 L", 20000 -> "20 K" (same rule the page used before)
const formatAmount = (raw) => {
  const n = Number(raw);
  if (raw === null || raw === undefined || raw === "" || Number.isNaN(n)) return raw;
  const trim = (v) => v.toFixed(1).replace(/\.0$/, "");
  if (n >= 10000000) return `${trim(n / 10000000)} Cr`;
  if (n >= 100000) return `${trim(n / 100000)} L`;
  if (n >= 1000) return `${trim(n / 1000)} K`;
  return n;
};

const getPriceText = (a) => {
  if (a.type === "Rent") {
    if (!a.rent) return "";
    const d = a.rent_duration && a.rent_duration !== "N/A" ? ` / ${a.rent_duration}` : "";
    return `₹ ${formatAmount(a.rent)}${d}`;
  }
  if (!a.price || a.price === "N/A") return "";
  return `₹ ${formatAmount(a.price)}`;
};

// "Booked" from the API means the same as Pending in the UI.
const normalizeStatus = (s) => {
  const v = (s || "Pending").toString().trim().toLowerCase();
  return v === "booked" ? "pending" : v;
};

const STATUS_STYLE = {
  pending: { label: "Pending", cls: "bg-[#FFF4D6] text-[#A16207]" },
  accepted: { label: "Accepted", cls: "bg-green-100 text-green-700" },
  rejected: { label: "Rejected", cls: "bg-red-100 text-red-700" },
  expired: { label: "Expired", cls: "bg-[#FFE7C2] text-[#B45309]" },
};

const FILTERS = [
  { key: "all", label: "All", icon: ListBullets },
  { key: "pending", label: "Pending", icon: Clock },
  { key: "accepted", label: "Accepted", icon: CheckCircle },
  { key: "rejected", label: "Rejected", icon: XCircle },
  { key: "expired", label: "Expired", icon: CalendarX },
];

const TYPE_BADGE = {
  Buy: { label: "For Buy", cls: "bg-green-600" },
  Rent: { label: "For Rent", cls: "bg-blue-600" },
};

// Shared modal shell — sits above the fixed navbar (z-1000).
const ModalShell = ({ onClose, children }) => (
  <div
    className="fixed inset-0 z-[1100] flex items-center justify-center px-4 bg-black bg-opacity-50"
    onMouseDown={(e) => e.target === e.currentTarget && onClose()}
  >
    <div
      className="relative w-full max-w-sm p-6 text-center bg-white shadow-2xl rounded-3xl"
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute flex items-center justify-center w-8 h-8 text-gray-400 rounded-full top-3 right-3 hover:bg-[#FDE8EC] hover:text-[#D61F45]"
        aria-label="Close"
      >
        <X size={16} weight="bold" />
      </button>
      {children}
    </div>
  </div>
);

const MyVirtualTour = () => {
  const [activeTab, setActiveTab] = useState("sent");
  const [appointments, setAppointments] = useState([]);
  const user_id = sessionStorage.getItem("accessToken");
  const [activeFilter, setActiveFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false); // "Go to Mobile App"
  const [currentPage, setCurrentPage] = useState(1);
  const [senttotalCount, setSendTotalCount] = useState(0);
  const [receivedTotalCount, setReceivedTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;
  const [showModal, setShowModal] = useState(false); // limit reached
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [freeViewCount, setFreeViewCount] = useState(0);
  const [paidViewCount, setPaidViewCount] = useState(0);
  // FIX: every revealed number stays revealed (it used to be one at a time,
  // so opening a second contact hid the first and used up another view).
  const [revealedPhones, setRevealedPhones] = useState(() => new Set());
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const checkPostLimits = async () => {
    try {
      const profileForm = new FormData();
      profileForm.append("user_id", user_id);

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
        setFreeViewCount(countData.free_view_count || 0);
        setPaidViewCount(countData.paid_view_count || 0);
      }
    } catch (error) {
      console.error("Error checking post limits:", error);
    }
  };

  useEffect(() => {
    if (user_id) {
      checkPostLimits();
    }
  }, [user_id]);

  const handleAddCount = async (updatedCount) => {
    try {
      const addCountFormData = new FormData();
      if (freeViewCount > 0) {
        addCountFormData.append("free_view_count", updatedCount);
      } else {
        addCountFormData.append("paid_view_count", updatedCount);
      }
      addCountFormData.append("user_id", user_id);

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/cust_api/add_count`,
        {
          method: "POST",
          body: addCountFormData,
        },
      );

      const data = await response.json();

      if (response.ok) {
        checkPostLimits();
      } else {
        console.error("Failed to update count:", data.message);
      }
    } catch (error) {
      console.error("API error:", error);
    }
  };

  // Reveal a phone number, using one free view (or one paid view).
  const handleContactClick = (appointment) => {
    if (!user_id) {
      toast.error("Please log in to continue.");
      return;
    }
    if (revealedPhones.has(appointment.id)) return;

    if (freeViewCount > 0) {
      // FIX: decrement the count — it was being SET to -1 before.
      setFreeViewCount((c) => c - 1);
      handleAddCount(-1);
    } else if (paidViewCount > 0) {
      setPaidViewCount((c) => c - 1);
      handleAddCount(-1);
    } else {
      setShowModal(true);
      return;
    }
    setRevealedPhones((prev) => new Set(prev).add(appointment.id));
  };

  const fetchAppointments = async () => {
    const formData = new FormData();

    // Conditional formData field based on activeTab
    if (activeTab === "sent") {
      formData.append("user_id", user_id);
    } else if (activeTab === "received") {
      formData.append("property_owner_id", user_id);
    }

    formData.append("page", currentPage);
    formData.append("page_size", itemsPerPage);

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/cust_api/get_virtual_tour_schedule`,
        formData,
      );
      if (response.data.status === 1) {
        const mappedAppointments = response.data.data.map((item) => {
          // Sent tab shows the owner, Received tab shows the visitor
          const userInfo =
            activeTab === "sent" ? item.property_owner_details : item.user_details;

          let appointmentData = {
            id: item._id,
            user_id: item.user_id,
            property_id: item.property_id,
            tour_type: item.tour_type,
            property_owner_id: item.property_owner_id,
            name: userInfo?.full_name || "N/A",
            role: userInfo?.user_type || "N/A",
            phone: userInfo?.mobile_number || "N/A",
            email: userInfo?.email || "N/A",
            status: item.status || "Pending",
            rawDate: item.schedule_date,
            date: new Date(item.schedule_date).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }),
            time: item.timeslot,
            time_unit: item.time_unit,
            person_image:
              activeTab === "sent"
                ? item.property_owner_details?.profile_image
                : item.user_details?.profile_image,
          };

          if (item.tour_type === "Property") {
            appointmentData = {
              ...appointmentData,
              property_name: item.property_details?.property_name,
              price: item.property_details?.property_price,
              location: item.property_details?.address_area,
              type: item.property_details?.property_category_type,
              image: item.property_details?.cover_image,
              rent: item.property_details?.rent,
              rent_duration: item.property_details?.rent_duration,
            };
          } else if (item.tour_type === "Project") {
            appointmentData = {
              ...appointmentData,
              property_name: item.project_details?.project_name,
              price: item.project_details?.average_project_price,
              location: item.project_details?.address_area,
              image: item.project_details?.cover_image,
            };
          }
          return appointmentData;
        });
        setAppointments(mappedAppointments);
        setTotalPages(response.data.total_pages || 1);
      } else {
        setAppointments([]);
        setTotalPages(0);
      }
    } catch (error) {
      setAppointments([]);
      setTotalPages(0);
      console.error("Error fetching appointments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // FIX: refetch when the TAB changes too. Before, switching to "Received"
  // kept showing the Sent list until a filter chip was clicked. The status
  // chips only filter on screen, so they no longer refetch.
  useEffect(() => {
    fetchAppointments();
  }, [currentPage, user_id, activeTab]);

  // Sent / Received counts
  const handleCount = async () => {
    try {
      const sentFormData = new FormData();
      sentFormData.append("user_id", user_id);

      const receivedFormData = new FormData();
      receivedFormData.append("property_owner_id", user_id);

      const [sentResponse, receivedResponse] = await Promise.all([
        axios.post(
          `${process.env.REACT_APP_API_URL}/cust_api/get_virtual_tour_schedule`,
          sentFormData,
        ),
        axios.post(
          `${process.env.REACT_APP_API_URL}/cust_api/get_virtual_tour_schedule`,
          receivedFormData,
        ),
      ]);

      if (sentResponse.data?.total_count !== undefined) {
        setSendTotalCount(sentResponse.data.total_count);
      }
      if (receivedResponse.data?.total_count !== undefined) {
        setReceivedTotalCount(receivedResponse.data.total_count);
      }
    } catch (err) {
      console.error("Error fetching counts:", err);
    }
  };

  useEffect(() => {
    handleCount();
  }, [user_id]);

  const handleStatusUpdate = async (tour_schedule_id, status) => {
    try {
      const formData = new FormData();
      formData.append("tour_schedule_id", tour_schedule_id);
      formData.append("status", status);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/cust_api/update_tour_status`,
        formData,
      );

      if (response.status === 200) {
        toast.success(`Tour ${status} successfully!`);
        setAppointments((prev) =>
          prev.map((appt) =>
            appt.id === tour_schedule_id ? { ...appt, status } : appt,
          ),
        );
      }
    } catch (error) {
      console.error("Status update failed:", error);
      toast.error("Failed to update tour status.");
    }
  };

  const switchTab = (tab) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setActiveFilter("all");
    setCurrentPage(1);
    setMenuOpenId(null);
  };

  // Status chip + search + date sort, all on screen
  const visibleAppointments = useMemo(() => {
    const q = search.trim().toLowerCase();
    return appointments
      .filter((a) => activeFilter === "all" || normalizeStatus(a.status) === activeFilter)
      .filter(
        (a) =>
          !q ||
          [a.property_name, a.location, a.name]
            .filter(Boolean)
            .some((v) => v.toString().toLowerCase().includes(q)),
      )
      .sort((a, b) => {
        const d = new Date(a.rawDate) - new Date(b.rawDate);
        return sortOrder === "newest" ? -d : d;
      });
  }, [appointments, activeFilter, search, sortOrder]);

  // Count per status chip (current page)
  const statusCounts = useMemo(() => {
    const c = { all: appointments.length };
    appointments.forEach((a) => {
      const s = normalizeStatus(a.status);
      c[s] = (c[s] || 0) + 1;
    });
    return c;
  }, [appointments]);

  useEffect(() => {
    const anyModal = showModal || isModalOpen || isConfirmOpen;
    document.body.style.overflow = anyModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal, isModalOpen, isConfirmOpen]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const listingLink = (a) => ({
    pathname:
      a.tour_type === "Property"
        ? `/propertydetails/${a.property_id}`
        : `/projectdetail/${a.property_id}`,
    state: { propertyId: a.property_id },
  });

  const imageSrc = (img) =>
    !img
      ? "https://via.placeholder.com/400x300?text=No+Image"
      : img.startsWith("http")
        ? img
        : `${process.env.REACT_APP_API_URL}/${img}`;

  const InviteTab = ({ tab, icon: Icon, label, count }) => {
    const active = activeTab === tab;
    return (
      <button
        type="button"
        onClick={() => switchTab(tab)}
        aria-pressed={active}
        className={`flex items-center justify-between flex-1 gap-4 px-4 py-3 text-left transition-all border rounded-2xl sm:flex-none sm:min-w-[300px] ${active
          ? "bg-white border-[#D61F45] shadow-[0_10px_24px_rgba(214,31,69,0.15)]"
          : "bg-white/70 border-[#FDE8EC] hover:border-[#FAD3DB]"
          }`}
      >
        <span className="flex items-center gap-3">
          <span
            className={`flex items-center justify-center w-11 h-11 rounded-full ${active ? "bg-[#D61F45] text-white" : "bg-[#FDE8EC] text-[#D61F45]"
              }`}
          >
            <Icon size={22} weight="fill" />
          </span>
          <span className={`text-[15px] font-bold ${active ? "text-[#17253a]" : "text-gray-600"}`}>
            {label}
          </span>
        </span>
        <span
          className={`px-3 py-1 text-[18px] font-extrabold rounded-full ${active ? "bg-[#FDE8EC] text-[#D61F45]" : "bg-[#FFF1F4] text-[#D61F45]/80"
            }`}
        >
          {count.toString().padStart(2, "0")}
        </span>
      </button>
    );
  };

  return (
    <>
      <div className="w-full">
        {/* ==================================================
            Header banner — "Virtual Appointments"
        ================================================== */}
        <div className="relative overflow-hidden border border-[#FDE8EC] rounded-2xl bg-gradient-to-r from-[#FFF1F4] via-[#FDE8EC] to-[#FAD3DB]">
          <CalendarCheck
            size={150}
            weight="thin"
            className="absolute hidden pointer-events-none right-6 -top-4 text-[#D61F45] opacity-10 md:block"
          />

          <div className="relative flex items-center gap-4 px-5 pt-5 md:px-6">
            <span className="flex items-center justify-center flex-shrink-0 w-16 h-16 text-white rounded-full bg-gradient-to-br from-[#D61F45] to-[#B91C3C] shadow-[0_8px_20px_rgba(214,31,69,0.35)]">
              <CalendarCheck size={30} weight="fill" />
            </span>
            <div className="min-w-0">
              <h2 className="m-0 text-2xl font-bold text-[#17253a] md:text-[30px]">
                Virtual <span className="text-[#D61F45]">Appointments</span>
              </h2>
              <p className="m-0 mt-0.5 text-[13px] md:text-[14px] text-gray-600">
                Manage your virtual property appointments, track invitations and connect with clients.
              </p>
            </div>
          </div>

          {/* Sent / Received invitation tabs */}
          <div className="relative flex flex-col gap-3 p-5 sm:flex-row md:px-6">
            <InviteTab tab="sent" icon={PaperPlaneTilt} label="Sent Invitations" count={senttotalCount} />
            <InviteTab tab="received" icon={Tray} label="Received Invitations" count={receivedTotalCount} />
          </div>
        </div>

        {/* ==================================================
            Status chips + search + sort
        ================================================== */}
        <div className="flex flex-col gap-3 mt-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex gap-2 pb-1 overflow-x-auto">
            {FILTERS.map(({ key, label, icon: Icon }) => {
              const active = activeFilter === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveFilter(key)}
                  className={`flex items-center flex-shrink-0 gap-2 px-5 py-2.5 text-[14px] font-semibold rounded-full border transition-all ${active
                    ? "bg-gradient-to-r from-[#D61F45] to-[#B91C3C] text-white border-transparent shadow-[0_6px_16px_rgba(214,31,69,0.3)]"
                    : "bg-white text-gray-600 border-[#FDE8EC] hover:border-[#D61F45] hover:text-[#D61F45]"
                    }`}
                >
                  <Icon size={17} weight={active ? "fill" : "regular"} />
                  {label}
                  {statusCounts[key] > 0 && (
                    <span
                      className={`px-1.5 text-[11px] font-bold rounded-full ${active ? "bg-white/25 text-white" : "bg-[#FDE8EC] text-[#D61F45]"
                        }`}
                    >
                      {statusCounts[key]}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1 xl:w-72 xl:flex-none">
              <MagnifyingGlass
                size={17}
                weight="bold"
                className="absolute text-gray-400 -translate-y-1/2 pointer-events-none left-3.5 top-1/2"
              />
              <input
                type="text"
                placeholder="Search appointment..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-11 pl-10 pr-9 text-[14px] text-[#17253a] bg-white border border-[#FDE8EC] rounded-xl outline-none placeholder:text-gray-400 transition-colors focus:border-[#D61F45] focus:ring-2 focus:ring-[#FDE8EC]"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute flex items-center justify-center w-6 h-6 text-gray-500 -translate-y-1/2 rounded-full right-2 top-1/2 hover:bg-[#FDE8EC] hover:text-[#D61F45]"
                  aria-label="Clear search"
                >
                  <X size={14} weight="bold" />
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => setSortOrder((s) => (s === "newest" ? "oldest" : "newest"))}
              title={`Sorted by date: ${sortOrder} first`}
              aria-label="Toggle date sort"
              className="flex items-center justify-center flex-shrink-0 w-11 h-11 text-[#D61F45] bg-white border-[1.5px] border-[#D61F45] rounded-xl hover:bg-[#FDE8EC] transition-colors"
            >
              {sortOrder === "newest" ? (
                <SortDescending size={20} weight="bold" />
              ) : (
                <SortAscending size={20} weight="bold" />
              )}
            </button>
          </div>
        </div>

        {/* ==================================================
            Appointment cards
        ================================================== */}
        <div className="mt-4 space-y-4">
          {isLoading && appointments.length === 0 ? (
            <div className="px-4 py-14 text-center text-[14px] text-gray-500 bg-white border border-[#FDE8EC] rounded-2xl">
              Loading appointments...
            </div>
          ) : visibleAppointments.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-4 py-14 text-center bg-white border border-[#FDE8EC] rounded-2xl">
              <span className="flex items-center justify-center w-16 h-16 mb-3 rounded-full bg-[#FDE8EC] text-[#D61F45]">
                <CalendarBlank size={30} weight="fill" />
              </span>
              <p className="m-0 text-[16px] font-semibold text-[#17253a]">No appointments found</p>
              <p className="m-0 mt-1 text-[13px] text-gray-500">
                {search || activeFilter !== "all"
                  ? "Try another status or search."
                  : activeTab === "sent"
                    ? "Tours you book on listings will show up here."
                    : "Tour requests on your listings will show up here."}
              </p>
            </div>
          ) : (
            visibleAppointments.map((a) => {
              const statusKey = normalizeStatus(a.status);
              const status = STATUS_STYLE[statusKey] || {
                label: a.status,
                cls: "bg-gray-100 text-gray-600",
              };
              const badge = TYPE_BADGE[a.type] || { label: "For Project", cls: "bg-[#17253a]" };
              const priceText = getPriceText(a);
              const phoneVisible = revealedPhones.has(a.id);
              const isReceivedPending = activeTab === "received" && statusKey === "pending";

              return (
                <div
                  key={a.id}
                  className="relative grid grid-cols-1 gap-4 p-4 bg-white border border-[#FDE8EC] md:p-5 rounded-2xl shadow-[0_8px_24px_rgba(214,31,69,0.06)] transition-all hover:border-[#D61F45] hover:shadow-[0_12px_32px_rgba(214,31,69,0.12)] lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:items-center"
                >
                  {/* ⋮ menu */}
                  <div className="absolute z-20 top-3 right-3">
                    <button
                      type="button"
                      onClick={() => setMenuOpenId(menuOpenId === a.id ? null : a.id)}
                      className="flex items-center justify-center w-8 h-8 text-gray-500 rounded-full hover:bg-[#FDE8EC] hover:text-[#D61F45]"
                      aria-label="More options"
                    >
                      <DotsThreeVertical size={22} weight="bold" />
                    </button>
                    {menuOpenId === a.id && (
                      <>
                        <button
                          type="button"
                          aria-hidden="true"
                          tabIndex={-1}
                          className="fixed inset-0 cursor-default"
                          onClick={() => setMenuOpenId(null)}
                        />
                        <div className="absolute right-0 w-48 p-1.5 mt-1 bg-white border border-[#FDE8EC] rounded-xl shadow-[0_16px_40px_rgba(214,31,69,0.18)]">
                          <Link
                            to={listingLink(a)}
                            className="flex items-center gap-2 px-3 py-2 text-[13px] font-medium text-gray-700 no-underline rounded-lg hover:bg-[#FDE8EC] hover:text-[#D61F45] hover:no-underline"
                          >
                            <ArrowSquareOut size={16} /> View listing
                          </Link>
                          {phoneVisible && a.phone !== "N/A" && (
                            <a
                              href={`tel:${a.phone}`}
                              className="flex items-center gap-2 px-3 py-2 text-[13px] font-medium text-gray-700 no-underline rounded-lg hover:bg-[#FDE8EC] hover:text-[#D61F45] hover:no-underline"
                            >
                              <Phone size={16} /> Call {a.name.split(" ")[0]}
                            </a>
                          )}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Listing */}
                  <div className="flex min-w-0 gap-4 pr-8 lg:pr-0">
                    <Link
                      to={listingLink(a)}
                      className="relative flex-shrink-0 block overflow-hidden w-32 h-28 sm:w-48 sm:h-32 rounded-xl bg-[#FFF1F4]"
                    >
                      <img
                        src={imageSrc(a.image)}
                        alt={a.property_name || "Listing"}
                        className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                      />
                      <span
                        className={`absolute top-2 left-2 px-2 py-0.5 text-[11px] font-bold text-white rounded-md shadow ${badge.cls}`}
                      >
                        {badge.label}
                      </span>
                    </Link>

                    <div className="min-w-0 self-center">
                      <h4 className="m-0 text-[18px] font-bold text-[#17253a] truncate sm:text-[20px]">
                        {a.property_name || "Untitled listing"}
                      </h4>
                      <p className="flex items-center gap-1 m-0 mt-1 text-[13px] text-gray-500">
                        <MapPin size={15} weight="fill" className="flex-shrink-0 text-[#D61F45]" />
                        <span className="truncate">{a.location}</span>
                      </p>
                      {priceText && (
                        <p className="m-0 mt-1 text-[17px] font-bold text-[#17253a]">{priceText}</p>
                      )}
                      <p className="flex flex-wrap items-center gap-2 m-0 mt-2">
                        <span className={`px-2.5 py-0.5 text-[12px] font-bold rounded-md ${status.cls}`}>
                          {status.label}
                        </span>
                        <span className="text-[13px] font-medium text-[#17253a]">{a.date}</span>
                      </p>
                    </div>
                  </div>

                  {/* Date + time */}
                  <div className="flex gap-6 px-1 py-3 border-y border-[#FDE8EC] lg:border-y-0 lg:border-l lg:pl-6 lg:py-1">
                    <div className="flex items-center gap-2.5">
                      <CalendarBlank size={26} className="text-[#D61F45]" />
                      <div className="leading-tight">
                        <p className="m-0 text-[12px] text-gray-500">Appointment Date</p>
                        <p className="m-0 mt-0.5 text-[15px] font-bold text-[#17253a]">{a.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 pl-6 border-l border-[#FDE8EC]">
                      <Clock size={26} className="text-[#D61F45]" />
                      <div className="leading-tight">
                        <p className="m-0 text-[12px] text-gray-500">Appointment Time</p>
                        <p className="m-0 mt-0.5 text-[15px] font-bold text-[#17253a]">
                          {a.time} {a.time_unit}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Person + actions */}
                  <div className="flex flex-col gap-2.5 lg:items-end lg:min-w-[210px] lg:pt-6">
                    <div className="flex items-center gap-2.5">
                      {a.person_image ? (
                        <img
                          src={`${process.env.REACT_APP_API_URL}/media/${a.person_image}`}
                          alt={a.name}
                          className="object-cover w-9 h-9 border-2 border-[#FAD3DB] rounded-full"
                        />
                      ) : (
                        <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#FDE8EC] text-[#D61F45]">
                          <User size={18} weight="fill" />
                        </span>
                      )}
                      <div className="leading-tight lg:text-right">
                        <p className="m-0 text-[14px] font-bold text-[#17253a]">{a.name}</p>
                        <p className="m-0 text-[12px] text-gray-500">{a.role}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <DeviceMobile size={24} className="text-[#D61F45]" />
                      {phoneVisible ? (
                        <a
                          href={`tel:${a.phone}`}
                          className="px-4 py-2 text-[15px] font-bold no-underline text-[#D61F45] bg-[#FFF1F4] rounded-xl hover:no-underline"
                        >
                          {a.phone}
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleContactClick(a)}
                          className="px-8 py-2.5 text-[15px] font-semibold text-white rounded-xl bg-gradient-to-r from-[#D61F45] to-[#B91C3C] shadow-[0_6px_16px_rgba(214,31,69,0.3)] hover:shadow-[0_10px_22px_rgba(214,31,69,0.4)] transition-shadow"
                        >
                          Contact
                        </button>
                      )}
                    </div>

                    {isReceivedPending && (
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setPendingAction({ id: a.id, status: "Accepted" });
                            setIsConfirmOpen(true);
                          }}
                          className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold text-white bg-green-600 rounded-xl hover:bg-green-700"
                        >
                          <Check size={15} weight="bold" /> Accept
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setPendingAction({ id: a.id, status: "Rejected" });
                            setIsConfirmOpen(true);
                          }}
                          className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold text-[#D61F45] bg-white border-[1.5px] border-[#D61F45] rounded-xl hover:bg-[#FDE8EC]"
                        >
                          <X size={15} weight="bold" /> Reject
                        </button>
                      </div>
                    )}

                    {statusKey === "accepted" && (
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold text-[#D61F45] bg-white border-[1.5px] border-[#D61F45] rounded-xl hover:bg-[#FDE8EC]"
                      >
                        <DeviceMobile size={15} weight="bold" /> Go To Mobile App
                      </button>
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
          Go to Mobile App — rendered once (it used to be rendered
          inside every card, stacking one modal per appointment)
      ================================================== */}
      {isModalOpen && (
        <ModalShell onClose={() => setIsModalOpen(false)}>
          <div className="flex items-center justify-center mx-auto mb-3 rounded-full w-14 h-14 bg-[#FDE8EC] text-[#D61F45]">
            <DeviceMobile size={28} weight="fill" />
          </div>
          <h2 className="text-xl font-bold text-[#17253a]">Go to Mobile App</h2>
          <p className="mt-1 text-sm text-gray-500">This feature works only in the Housezo App.</p>
          <button
            type="button"
            className="w-full py-2.5 mt-4 font-semibold text-white rounded-xl bg-gradient-to-r from-[#D61F45] to-[#B91C3C] shadow-[0_6px_18px_rgba(214,31,69,0.35)]"
            onClick={() => history.push("/download")}
          >
            Download
          </button>
          <div className="flex justify-center gap-3 mt-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              className="h-10"
            />
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
              className="h-10"
            />
          </div>
        </ModalShell>
      )}

      {/* Accept / Reject confirmation */}
      {isConfirmOpen && (
        <ModalShell onClose={() => setIsConfirmOpen(false)}>
          <div
            className={`flex items-center justify-center mx-auto mb-3 rounded-full w-14 h-14 ${pendingAction?.status === "Accepted"
              ? "bg-green-100 text-green-600"
              : "bg-[#FDE8EC] text-[#D61F45]"
              }`}
          >
            {pendingAction?.status === "Accepted" ? (
              <CheckCircle size={30} weight="fill" />
            ) : (
              <XCircle size={30} weight="fill" />
            )}
          </div>
          <h2 className="text-xl font-bold text-[#17253a]">Confirm Action</h2>
          <p className="mt-1 text-sm text-gray-500">
            Are you sure you want to <b>{pendingAction?.status}</b> this tour?
          </p>
          <div className="grid grid-cols-2 gap-3 mt-5">
            <button
              type="button"
              className="py-2.5 font-semibold bg-white border-[1.5px] rounded-xl border-[#D61F45] text-[#D61F45] hover:bg-[#FDE8EC] transition-colors"
              onClick={() => setIsConfirmOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="py-2.5 font-semibold text-white rounded-xl bg-gradient-to-r from-[#D61F45] to-[#B91C3C] shadow-[0_6px_18px_rgba(214,31,69,0.35)]"
              onClick={() => {
                handleStatusUpdate(pendingAction.id, pendingAction.status);
                setIsConfirmOpen(false);
              }}
            >
              Confirm
            </button>
          </div>
        </ModalShell>
      )}

      {/* View limit reached */}
      {showModal && (
        <ModalShell onClose={() => setShowModal(false)}>
          <div className="flex items-center justify-center mx-auto mb-3 rounded-full w-14 h-14 bg-[#FDE8EC] text-[#D61F45]">
            <WarningCircle size={30} weight="fill" />
          </div>
          <h2 className="text-xl font-bold text-[#17253a]">Free Property Posting Limit Reached</h2>
          <p className="mt-2 text-sm text-gray-500">
            Your free property posting limit has ended. Please purchase a plan
            to continue posting properties.
          </p>
          <div className="grid grid-cols-2 gap-3 mt-5">
            <button
              type="button"
              className="py-2.5 font-semibold bg-white border-[1.5px] rounded-xl border-[#D61F45] text-[#D61F45] hover:bg-[#FDE8EC] transition-colors"
              onClick={() => {
                setShowModal(false);
                history.push("/dashboard", { page: "myVirtualtour" });
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              className="py-2.5 font-semibold text-white rounded-xl bg-gradient-to-r from-[#D61F45] to-[#B91C3C] shadow-[0_6px_18px_rgba(214,31,69,0.35)]"
              onClick={() => {
                setShowModal(false);
                history.push({
                  pathname: "/dashboard",
                  state: { page: "mySubscriptions" },
                });
              }}
            >
              Purchase Plan
            </button>
          </div>
        </ModalShell>
      )}
    </>
  );
};
export default MyVirtualTour;