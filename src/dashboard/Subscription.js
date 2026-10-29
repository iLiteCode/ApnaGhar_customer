// import { IoCloseCircleOutline } from "react-icons/io5";
// import React, { useEffect, useState } from "react";
// import { v4 as uuidv4 } from "uuid";
// import moment from "moment";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Subscription = () => {
//   const [activeTab, setActiveTab] = useState("all");
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [allPlans, setAllPlans] = useState([]);
//   const [myPlans, setMyPlans] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const user_id = sessionStorage.getItem("accessToken");
//   const [currentPageAll, setCurrentPageAll] = useState(1);
//   const [currentPageMy, setCurrentPageMy] = useState(1);
//   const [isPlanAlertModalOpen, setIsPlanAlertModalOpen] = useState(false);
//   const itemsPerPage = 10;
//   const BASE_URL = process.env.REACT_APP_API_URL;
//   const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
//   const [isAllPlanModalOpen, setIsAllPlanModalOpen] = useState(false);

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [currentPageAll, currentPageMy]);

//   useEffect(() => {
//     if (isPlanModalOpen || isAllPlanModalOpen || isPlanAlertModalOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }

//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [isPlanModalOpen, isAllPlanModalOpen, isPlanAlertModalOpen]);

//   useEffect(() => {
//     const fetchPlans = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_API_URL}/cust_api/get_subscription_plans`,
//         );
//         if (response.data && response.data.data) {
//           setAllPlans(response.data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching plans:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPlans();
//   }, []);

//   // Fetch user-purchased plans
//   const fetchMyPlans = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("user_id", user_id);

//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}/cust_api/Plan_purchased_History`,
//         formData,
//       );
//       if (response.data?.data) {
//         setMyPlans(response.data.data);
//       }
//     } catch (error) {
//       console.error("Failed to fetch plan history:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMyPlans();
//   }, []);

//   if (loading) return <div>Loading...</div>;

//   // const handlePlanPurchase = async (plan, user_id) => {
//   //   try {
//   //     const today = moment();
//   //     const expiryDate = moment().add(parseInt(plan.validity), plan.validity_unit.toLowerCase());

//   //     const formData = new FormData();
//   //     formData.append("user_id", user_id);
//   //     formData.append("plan_auto_id", plan._id);
//   //     formData.append("plan_name", plan.plan_name);
//   //     formData.append("category_type", plan.category_type);
//   //     formData.append("no_of_units", plan.no_of_units);
//   //     formData.append("payment_mode", "Online");
//   //     formData.append("transaction_id", uuidv4());
//   //     formData.append("transaction_status", "Success");
//   //     formData.append("plan_status", "Active");
//   //     formData.append("plan_purchase_date", today.format("YYYY-MM-DD"));
//   //     formData.append("plan_expiry_date", expiryDate.format("YYYY-MM-DD"));

//   //     const response = await axios.post(`${process.env.REACT_APP_API_URL}/cust_api/purchase_plan`, formData);

//   //     if (response.data.status === 1) {
//   //       toast.success("Plan purchased successfully!");
//   //     } else {
//   //       toast.error(" Failed: " + (response.data.message || "Try again."));
//   //     }
//   //   } catch (error) {
//   //     console.error("Error purchasing plan:", error);
//   //     toast.error("Something went wrong. Please try again.");
//   //   }
//   // };

//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   const handlePlanPurchase = async (plan, user_id) => {
//     try {
//       // Step 0: Load Razorpay SDK dynamically
//       const loaded = await loadRazorpayScript();
//       if (!loaded) {
//         toast.error(
//           "Razorpay SDK failed to load. Check your internet connection.",
//         );
//         return;
//       }

//       // Step 1: Create Razorpay order via backend
//       const orderResponse = await axios.post(
//         `${BASE_URL}/cust_api/create_razorpay_order`,
//         {
//           user_id,
//           plan_auto_id: plan._id,
//         },
//       );

//       if (orderResponse.data.status !== 1) {
//         toast.error("Failed to create Razorpay order");
//         return;
//       }

//       const { order, key_id } = orderResponse.data;

//       // Step 2: Open Razorpay payment modal
//       const options = {
//         key: key_id,
//         amount: order.amount,
//         currency: order.currency,
//         name: "Your App Name",
//         description: plan.plan_name,
//         order_id: order.id,
//         handler: async function (response) {
//           try {
//             // Step 3: Verify payment
//             const verifyRes = await axios.post(
//               `${BASE_URL}/cust_api/verify_payment`,
//               {
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_signature: response.razorpay_signature,
//               },
//             );

//             if (verifyRes.data.status !== 1) {
//               toast.error("Payment verification failed");
//               return;
//             }

//             // Step 4: Save plan purchase in DB
//             const today = moment();
//             const expiryDate = moment().add(
//               parseInt(plan.validity),
//               plan.validity_unit.toLowerCase(),
//             );

//             const formData = new FormData();
//             formData.append("user_id", user_id);
//             formData.append("plan_auto_id", plan._id);
//             formData.append("plan_name", plan.plan_name);
//             formData.append("category_type", plan.category_type);
//             formData.append("no_of_units", plan.no_of_units);
//             formData.append("payment_mode", "Razorpay");
//             formData.append("transaction_id", verifyRes.data.transaction_id);
//             formData.append(
//               "transaction_status",
//               verifyRes.data.transaction_status,
//             );
//             formData.append("plan_purchase_date", today.format("YYYY-MM-DD"));
//             formData.append(
//               "plan_expiry_date",
//               expiryDate.format("YYYY-MM-DD"),
//             );
//             formData.append("plan_status", "Active");

//             const purchaseRes = await axios.post(
//               `${BASE_URL}/cust_api/purchase_plan`,
//               formData,
//             );

//             if (purchaseRes.data.status === 1) {
//               toast.success("Plan purchased successfully!");
//               fetchMyPlans(); // Refresh user's purchased plans
//             } else {
//               toast.error(
//                 "Purchase failed: " +
//                   (purchaseRes.data.message || "Try again."),
//               );
//             }
//           } catch (err) {
//             console.error(
//               "Error in payment verification or plan purchase:",
//               err,
//             );
//             toast.error("Something went wrong after payment. Contact support.");
//           }
//         },
//         prefill: {
//           name: "",
//           email: "",
//           contact: "",
//         },
//         theme: {
//           color: "#4f46e5",
//         },
//       };

//       const rzp1 = new window.Razorpay(options);
//       rzp1.open();
//     } catch (error) {
//       console.error("Error initiating payment:", error);
//       toast.error("Payment initiation failed. Try again.");
//     }
//   };

//   const totalPagesForAllPlans = Math.ceil(allPlans.length / itemsPerPage);
//   const totalPagesForMyPlans = Math.ceil(myPlans.length / itemsPerPage);

//   const plansToShow = activeTab === "all" ? allPlans : myPlans;
//   const totalPages =
//     activeTab === "all" ? totalPagesForAllPlans : totalPagesForMyPlans;

//   const paginatedPlans =
//     activeTab === "all"
//       ? allPlans.slice(
//           (currentPageAll - 1) * itemsPerPage,
//           currentPageAll * itemsPerPage,
//         )
//       : myPlans.slice(
//           (currentPageMy - 1) * itemsPerPage,
//           currentPageMy * itemsPerPage,
//         );

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//     if (tab === "all") {
//       setCurrentPageAll(1);
//     } else {
//       setCurrentPageMy(1);
//       fetchMyPlans();
//     }
//   };

//   const checkPlanAndPurchase = async (plan, user_id) => {
//     const userId = sessionStorage.getItem("accessToken");

//     try {
//       const formData = new FormData();
//       formData.append("user_id", userId);

//       const res = await axios.post(
//         `${process.env.REACT_APP_API_URL}/cust_api/Plan_purchased_History`,
//         formData,
//       );

//       const planHistory = res.data?.data || [];
//       let isCategoryPlanActive = false;

//       for (let item of planHistory) {
//         if (
//           item.category_type === plan.category_type &&
//           item.plan_status === "Active"
//         ) {
//           isCategoryPlanActive = true;
//           break;
//         }
//       }

//       if (isCategoryPlanActive) {
//         setSelectedPlan(plan);
//         setIsPlanAlertModalOpen(true);
//       } else {
//         handlePlanPurchase(plan, user_id);
//       }
//     } catch (error) {
//       console.error("Error fetching plan history:", error);
//     }
//   };

//   return (
//     <div className="max-w-6xl p-3 mx-auto bg-white rounded-2xl">
//       <h2 className="mb-4 text-2xl font-semibold">Subscription</h2>

//       <div className="flex mb-6 border-b">
//         <button
//           className={`px-4 py-2 font-medium ${activeTab === "all" ? "my-text border-b-2 border-rose-600" : "text-gray-500"}`}
//           onClick={() => handleTabClick("all")}
//         >
//           All Plans
//         </button>
//         <button
//           className={`px-4 py-2 font-medium ${activeTab === "my" ? "my-text border-b-2 border-rose-600" : "text-gray-500"}`}
//           onClick={() => handleTabClick("my")}
//         >
//           My Plans
//         </button>
//       </div>

//       {paginatedPlans.length > 0 ? (
//         <>
//           {paginatedPlans.map((plan) => {
//             const isExpired =
//               activeTab === "my" && plan.plan_status === "Expired";

//             return (
//               <div
//                 key={plan._id}
//                 className={`relative border rounded-2xl shadow-md p-4 flex flex-col md:flex-row items-center md:items-start gap-4 mb-4 ${
//                   isExpired
//                     ? "bg-gray-100 opacity-60 cursor-not-allowed"
//                     : "bg-white"
//                 }`}
//               >
//                 {/* EXPIRED Watermark */}
//                 {isExpired && (
//                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
//                     <div className="text-red-700 text-[60px] font-extrabold opacity-10 transform rotate-[-30deg]">
//                       EXPIRED
//                     </div>
//                   </div>
//                 )}

//                 <img
//                   src={`${BASE_URL}${plan.plan_image}` || plan.plan_image}
//                   alt={plan.plan_name}
//                   className="object-cover w-full h-48 md:w-48 rounded-2xl"
//                 />
//                 <div className="flex-1">
//                   <h3 className="text-xl font-semibold text-gray-800">
//                     {plan.plan_name}
//                   </h3>
//                   <div className="flex items-center mt-1 space-x-2">
//                     {activeTab === "my" && (
//                       <span
//                         className={`${
//                           isExpired
//                             ? "bg-gray-300 text-gray-600"
//                             : "bg-green-200 text-green-700"
//                         } text-xs font-semibold px-2 py-1 rounded-md`}
//                       >
//                         {plan.plan_status}
//                       </span>
//                     )}
//                     {/* <span className="text-sm text-gray-500">Plan ID: {plan._id || plan.id}</span> */}
//                   </div>

//                   <div className="mt-4">
//                     <div className="flex justify-between text-base font-medium text-gray-500">
//                       <span>Price</span>
//                       <span>Validity</span>
//                       {activeTab !== "all" && <span>Expiry Date</span>}
//                     </div>
//                     <div className="flex justify-between mt-1 text-base font-semibold text-gray-800">
//                       <span>₹{plan.final_price}</span>
//                       <span>
//                         {plan.validity} {plan.validity_unit}
//                       </span>
//                       {activeTab !== "all" && (
//                         <span>
//                           {new Date(plan.plan_expiry_date).toLocaleDateString(
//                             "en-GB",
//                             {
//                               day: "2-digit",
//                               month: "short",
//                               year: "numeric",
//                             },
//                           )}
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   <div className="mt-4">
//                     {activeTab === "all" ? (
//                       <>
//                         <button
//                           className="px-4 py-2 mt-3 mr-2 text-sm text-white bg-green-400 rounded-lg sm:px-6"
//                           onClick={() => checkPlanAndPurchase(plan, user_id)}
//                         >
//                           Pay Now
//                         </button>

//                         {/* Custom Modal Block */}
//                         {isPlanAlertModalOpen && selectedPlan && (
//                           <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-opacity-10">
//                             <div className="w-full max-w-sm p-4 bg-white rounded-2xl md:p-8">
//                               <h2 className="mb-4 text-lg font-semibold">
//                                 You already purchased this plan.
//                               </h2>
//                               <p className="mb-6">
//                                 Do you want to purchase it again?
//                               </p>
//                               <div className="flex justify-between">
//                                 <button
//                                   onClick={() => {
//                                     handlePlanPurchase(selectedPlan, user_id);
//                                     setIsPlanAlertModalOpen(false);
//                                   }}
//                                   className="px-4 py-2 text-white bg-green-500 rounded"
//                                 >
//                                   Purchase Again
//                                 </button>
//                                 <button
//                                   onClick={() => setIsPlanAlertModalOpen(false)}
//                                   className="px-4 py-2 text-black bg-gray-300 rounded"
//                                 >
//                                   Cancel
//                                 </button>
//                               </div>
//                             </div>
//                           </div>
//                         )}

//                         <button
//                           className="px-4 py-2 mt-3 text-sm text-white bg-green-400 rounded-lg sm:px-6"
//                           onClick={() => {
//                             setSelectedPlan(plan);
//                             setIsAllPlanModalOpen(true);
//                           }}
//                         >
//                           View More Details
//                         </button>
//                       </>
//                     ) : (
//                       <button
//                         disabled={isExpired}
//                         className={`py-2 px-4 sm:px-6 text-sm rounded-lg mt-3 ${
//                           isExpired
//                             ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                             : "bg-green-400 text-white"
//                         }`}
//                         onClick={() => {
//                           if (!isExpired) {
//                             setSelectedPlan(plan);
//                             setIsPlanModalOpen(true);
//                           }
//                         }}
//                       >
//                         View More Details
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}

//           {/* Pagination Controls */}
//           {totalPages > 1 && (
//             <div className="flex items-center justify-center mt-4 space-x-3">
//               <button
//                 className={`px-3 py-2 border rounded-full ${(activeTab === "all" && currentPageAll === 1) || (activeTab === "my" && currentPageMy === 1) ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100"}`}
//                 onClick={() =>
//                   activeTab === "all"
//                     ? setCurrentPageAll((prev) => Math.max(prev - 1, 1))
//                     : setCurrentPageMy((prev) => Math.max(prev - 1, 1))
//                 }
//                 disabled={
//                   (activeTab === "all" && currentPageAll === 1) ||
//                   (activeTab === "my" && currentPageMy === 1)
//                 }
//               >
//                 &lt;
//               </button>

//               {[...Array(totalPages)].map((_, index) => (
//                 <button
//                   key={index}
//                   className={`w-10 h-10 flex items-center justify-center rounded-full text-lg font-medium ${(activeTab === "all" && currentPageAll === index + 1) || (activeTab === "my" && currentPageMy === index + 1) ? "my-border my-text" : "text-gray-500 hover:bg-gray-100"}`}
//                   onClick={() =>
//                     activeTab === "all"
//                       ? setCurrentPageAll(index + 1)
//                       : setCurrentPageMy(index + 1)
//                   }
//                 >
//                   {index + 1}
//                 </button>
//               ))}

//               <button
//                 className={`px-3 py-2 border rounded-full ${(activeTab === "all" && currentPageAll === totalPages) || (activeTab === "my" && currentPageMy === totalPages) ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100"}`}
//                 onClick={() =>
//                   activeTab === "all"
//                     ? setCurrentPageAll((prev) =>
//                         Math.min(prev + 1, totalPages),
//                       )
//                     : setCurrentPageMy((prev) => Math.min(prev + 1, totalPages))
//                 }
//                 disabled={
//                   (activeTab === "all" && currentPageAll === totalPages) ||
//                   (activeTab === "my" && currentPageMy === totalPages)
//                 }
//               >
//                 &gt;
//               </button>
//             </div>
//           )}
//         </>
//       ) : (
//         <div>No Plans Available</div>
//       )}

//       {isPlanModalOpen && selectedPlan && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-xl w-[50%] max-w-lg shadow-2xl relative">
//             <h2 className="mb-4 text-2xl font-bold text-center">
//               Plan Details
//             </h2>

//             <img
//               src={`${BASE_URL}/${selectedPlan.plan_image}`}
//               alt={selectedPlan.plan_name}
//               className="object-cover w-full h-40 mb-4 rounded-md"
//             />

//             <div className="space-y-2 text-sm">
//               <p className="mb-0">
//                 <strong>Plan Name:</strong> {selectedPlan.plan_name}
//               </p>
//               <p>
//                 <strong>Price:</strong> ₹{selectedPlan.plan_price}
//               </p>
//               <p>
//                 <strong>Offer:</strong> {selectedPlan.offer_percentage}%
//               </p>
//               <p>
//                 <strong>Final Price:</strong> ₹{selectedPlan.final_price}
//               </p>
//               <p>
//                 <strong>Validity:</strong> {selectedPlan.validity}{" "}
//                 {selectedPlan.category_type}
//               </p>
//               <p>
//                 <strong>Category Type:</strong> {selectedPlan.category_type}
//               </p>
//               <p>
//                 <strong>No. of Units:</strong> {selectedPlan.no_of_units}
//               </p>
//               <p>
//                 <strong>Features:</strong> {selectedPlan.features}
//               </p>
//               <p>
//                 <strong>Description:</strong> {selectedPlan.description}
//               </p>
//               <p>
//                 <strong>Status:</strong> {selectedPlan.plan_status}
//               </p>
//             </div>

//             <button
//               className="absolute text-xl font-bold top-3 right-4 text-black-500"
//               onClick={() => setIsPlanModalOpen(false)}
//             >
//               ✕
//             </button>
//           </div>
//         </div>
//       )}
//       {isAllPlanModalOpen && selectedPlan && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-xl w-[50%] max-w-lg shadow-2xl relative">
//             <h2 className="mb-4 text-2xl font-bold text-center">
//               Plan Details
//             </h2>

//             <img
//               src={
//                 `${BASE_URL}${selectedPlan.plan_image}` ||
//                 selectedPlan.plan_image
//               }
//               alt={selectedPlan.plan_name}
//               className="object-cover w-full h-40 mb-4 rounded-md"
//             />

//             <div className="space-y-2 text-sm">
//               <p className="mb-0">
//                 <strong>Plan Name:</strong> {selectedPlan.plan_name}
//               </p>
//               <p>
//                 <strong>Price:</strong> ₹{selectedPlan.plan_price}
//               </p>
//               <p>
//                 <strong>Offer:</strong> {selectedPlan.offer_percentage}%
//               </p>
//               <p>
//                 <strong>Final Price:</strong> ₹{selectedPlan.final_price}
//               </p>
//               <p>
//                 <strong>Validity:</strong> {selectedPlan.validity}{" "}
//                 {selectedPlan.validity_unit}
//               </p>
//               <p>
//                 <strong>Category Type:</strong> {selectedPlan.category_type}
//               </p>
//               <p>
//                 <strong>No. of Units:</strong> {selectedPlan.no_of_units}
//               </p>
//               <p>
//                 <strong>Features:</strong> {selectedPlan.features}
//               </p>
//               <p>
//                 <strong>Description:</strong> {selectedPlan.description}
//               </p>
//             </div>

//             <button
//               className="absolute text-xl font-bold top-3 right-4 text-black-500"
//               onClick={() => setIsAllPlanModalOpen(false)}
//             >
//               ✕
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Subscription;



// ==============================================================================================================================




import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Crown,
  SquaresFour,
  User,
  X,
  CalendarBlank,
  Clock,
  Tag,
  Stack,
  Package,
  CheckCircle,
  Lightning,
  Info,
  WarningCircle,
  CaretLeft,
  CaretRight,
  ListChecks,
  Sparkle,
} from "@phosphor-icons/react";

// ==========================================================
// Helpers (outside the component so they never remount)
// ==========================================================

// Works for both "media/x.png" and "/media/x.png" and full URLs.
// (Before, `${BASE_URL}${img} || img` always took the first part,
// so the fallback never ran and some images broke.)
const planImageSrc = (img) => {
  if (!img) return "https://via.placeholder.com/400x300?text=Plan";
  if (img.startsWith("http")) return img;
  const base = (process.env.REACT_APP_API_URL || "").replace(/\/$/, "");
  return `${base}/${img.replace(/^\//, "")}`;
};

const formatDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    : "—";

const rupee = (v) =>
  v === null || v === undefined || v === ""
    ? "—"
    : `₹${Number(v).toLocaleString("en-IN")}`;

// Shared modal shell — sits above the fixed navbar (z-1000).
const ModalShell = ({ onClose, children, maxWidth = "max-w-sm" }) => (
  <div
    className="fixed inset-0 z-[1100] flex items-center justify-center px-4 bg-black bg-opacity-50"
    onMouseDown={(e) => e.target === e.currentTarget && onClose()}
  >
    <div
      className={`relative flex flex-col w-full ${maxWidth} max-h-[92vh] overflow-hidden bg-white shadow-2xl rounded-3xl`}
      role="dialog"
      aria-modal="true"
    >
      {children}
    </div>
  </div>
);

// One label/value tile in the plan details modal.
const DetailTile = ({ icon: Icon, label, value, accent }) => (
  <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#FFF7F9] border border-[#FDE8EC]">
    <span className="flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-xl bg-[#FDE8EC] text-[#D61F45]">
      <Icon size={18} weight="fill" />
    </span>
    <div className="min-w-0">
      <p className="m-0 text-[11px] font-medium text-gray-500">{label}</p>
      <p
        className={`m-0 mt-0.5 text-[14px] font-bold break-words ${accent ? "text-[#D61F45]" : "text-[#17253a]"
          }`}
      >
        {value || "—"}
      </p>
    </div>
  </div>
);

// Empty state illustration — box with a crown, checklist and confetti,
// drawn with plain divs + icons so no image file is needed.
const EmptyPlans = ({ isMyTab, onBrowse }) => (
  <div className="relative flex flex-col items-center justify-center px-4 py-12 overflow-hidden text-center bg-white border border-[#FDE8EC] md:py-16 rounded-3xl shadow-[0_10px_30px_rgba(214,31,69,0.06)]">
    {/* dotted corners */}
    <div
      aria-hidden="true"
      className="absolute w-32 h-24 top-6 left-6 opacity-40"
      style={{ backgroundImage: "radial-gradient(#F4A7B6 2px, transparent 2px)", backgroundSize: "18px 18px" }}
    />
    <div
      aria-hidden="true"
      className="absolute w-32 h-24 bottom-6 right-6 opacity-40"
      style={{ backgroundImage: "radial-gradient(#F4A7B6 2px, transparent 2px)", backgroundSize: "18px 18px" }}
    />
    <div aria-hidden="true" className="absolute rounded-full -bottom-24 -left-24 w-72 h-72 bg-[#FFF1F4]" />
    <div aria-hidden="true" className="absolute rounded-full -top-24 -right-24 w-72 h-72 bg-[#FFF1F4]" />

    {/* illustration */}
    <div aria-hidden="true" className="relative mb-6 w-60 h-52">
      <div className="absolute inset-x-0 bottom-0 h-40 rounded-full bg-[#FDE8EC]" />
      {/* confetti */}
      <span className="absolute w-1.5 h-4 rounded-full bg-[#D61F45] top-2 left-1/2 rotate-12" />
      <span className="absolute w-1.5 h-4 rounded-full bg-[#D61F45] top-16 left-10 -rotate-45" />
      <span className="absolute w-1.5 h-4 rounded-full bg-[#D61F45] top-14 right-10 rotate-45" />
      <span className="absolute w-2 h-2 rounded-full bg-[#F4A7B6] top-8 left-20" />
      <span className="absolute w-2 h-2 rounded-full bg-[#F4A7B6] top-10 right-16" />
      {/* checklist card */}
      <div className="absolute flex flex-col gap-2 p-3 bg-white shadow-lg left-1/2 top-6 w-24 h-28 rounded-xl -translate-x-1/2 -rotate-6">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-1.5">
            <CheckCircle size={12} weight="fill" className="text-[#D61F45]" />
            <span className="h-1.5 flex-1 rounded-full bg-[#FAD3DB]" />
          </div>
        ))}
      </div>
      {/* box */}
      <div className="absolute bottom-3 left-1/2 w-36 h-24 -translate-x-1/2 rounded-b-xl bg-gradient-to-b from-[#E8456A] to-[#D61F45] shadow-[0_14px_30px_rgba(214,31,69,0.35)] flex items-center justify-center">
        <Crown size={34} weight="fill" className="text-white" />
      </div>
      <div className="absolute left-1/2 w-40 h-5 -translate-x-1/2 bottom-[6.5rem] rounded-md bg-[#F06A88]" />
    </div>

    <h3 className="relative m-0 text-2xl font-bold text-[#17253a] md:text-[30px]">
      No Plans <span className="text-[#D61F45]">{isMyTab ? "Purchased" : "Available"}</span>
    </h3>
    <p className="relative max-w-md m-0 mt-2 text-[14px] md:text-[15px] text-gray-500">
      {isMyTab
        ? "You haven't purchased any plan yet. Pick a plan to get more visibility for your listings."
        : "There are no subscription plans available at the moment. Please check back later."}
    </p>
    {isMyTab && (
      <button
        type="button"
        onClick={onBrowse}
        className="relative flex items-center gap-2 px-6 py-2.5 mt-5 text-[14px] font-semibold text-white rounded-xl bg-gradient-to-r from-[#D61F45] to-[#B91C3C] shadow-[0_6px_18px_rgba(214,31,69,0.35)]"
      >
        <SquaresFour size={17} weight="fill" />
        Browse All Plans
      </button>
    )}
  </div>
);

const Subscription = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [allPlans, setAllPlans] = useState([]);
  const [myPlans, setMyPlans] = useState([]);
  const [loadingAll, setLoadingAll] = useState(true);
  const [loadingMy, setLoadingMy] = useState(true);
  const user_id = sessionStorage.getItem("accessToken");
  const [currentPageAll, setCurrentPageAll] = useState(1);
  const [currentPageMy, setCurrentPageMy] = useState(1);
  const [isPlanAlertModalOpen, setIsPlanAlertModalOpen] = useState(false);
  const itemsPerPage = 10;
  const BASE_URL = process.env.REACT_APP_API_URL;
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [isAllPlanModalOpen, setIsAllPlanModalOpen] = useState(false);
  const [payingPlanId, setPayingPlanId] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPageAll, currentPageMy]);

  useEffect(() => {
    const anyModal = isPlanModalOpen || isAllPlanModalOpen || isPlanAlertModalOpen;
    document.body.style.overflow = anyModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isPlanModalOpen, isAllPlanModalOpen, isPlanAlertModalOpen]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/cust_api/get_subscription_plans`,
        );
        if (response.data && response.data.data) {
          setAllPlans(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
      } finally {
        setLoadingAll(false);
      }
    };

    fetchPlans();
  }, []);

  // Fetch user-purchased plans
  const fetchMyPlans = async () => {
    try {
      const formData = new FormData();
      formData.append("user_id", user_id);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/cust_api/Plan_purchased_History`,
        formData,
      );
      if (response.data?.data) {
        setMyPlans(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch plan history:", error);
    } finally {
      setLoadingMy(false);
    }
  };

  useEffect(() => {
    fetchMyPlans();
  }, []);

  // Load the Razorpay SDK once (it used to add a new <script> on every click).
  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const existing = document.getElementById("razorpay-sdk");
      if (existing) {
        existing.addEventListener("load", () => resolve(true));
        existing.addEventListener("error", () => resolve(false));
        return;
      }
      const script = document.createElement("script");
      script.id = "razorpay-sdk";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePlanPurchase = async (plan, user_id) => {
    setPayingPlanId(plan._id);
    try {
      // Step 0: Load Razorpay SDK
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        toast.error("Razorpay SDK failed to load. Check your internet connection.");
        return;
      }

      // Step 1: Create Razorpay order via backend
      const orderResponse = await axios.post(
        `${BASE_URL}/cust_api/create_razorpay_order`,
        {
          user_id,
          plan_auto_id: plan._id,
        },
      );

      if (orderResponse.data.status !== 1) {
        toast.error("Failed to create Razorpay order");
        return;
      }

      const { order, key_id } = orderResponse.data;

      // Step 2: Open Razorpay payment modal
      const options = {
        key: key_id,
        amount: order.amount,
        currency: order.currency,
        name: "ApnaGhar",
        description: plan.plan_name,
        order_id: order.id,
        handler: async function (response) {
          try {
            // Step 3: Verify payment
            const verifyRes = await axios.post(
              `${BASE_URL}/cust_api/verify_payment`,
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              },
            );

            if (verifyRes.data.status !== 1) {
              toast.error("Payment verification failed");
              return;
            }

            // Step 4: Save plan purchase in DB
            const today = moment();
            const expiryDate = moment().add(
              parseInt(plan.validity),
              (plan.validity_unit || "days").toLowerCase(),
            );

            const formData = new FormData();
            formData.append("user_id", user_id);
            formData.append("plan_auto_id", plan._id);
            formData.append("plan_name", plan.plan_name);
            formData.append("category_type", plan.category_type);
            formData.append("no_of_units", plan.no_of_units);
            formData.append("payment_mode", "Razorpay");
            formData.append("transaction_id", verifyRes.data.transaction_id);
            formData.append("transaction_status", verifyRes.data.transaction_status);
            formData.append("plan_purchase_date", today.format("YYYY-MM-DD"));
            formData.append("plan_expiry_date", expiryDate.format("YYYY-MM-DD"));
            formData.append("plan_status", "Active");

            const purchaseRes = await axios.post(
              `${BASE_URL}/cust_api/purchase_plan`,
              formData,
            );

            if (purchaseRes.data.status === 1) {
              toast.success("Plan purchased successfully!");
              fetchMyPlans(); // Refresh user's purchased plans
            } else {
              toast.error(
                "Purchase failed: " + (purchaseRes.data.message || "Try again."),
              );
            }
          } catch (err) {
            console.error("Error in payment verification or plan purchase:", err);
            toast.error("Something went wrong after payment. Contact support.");
          }
        },
        prefill: {
          name: sessionStorage.getItem("user_name") || "",
          email: sessionStorage.getItem("user_email") || "",
          contact: sessionStorage.getItem("Mobile_Number") || "",
        },
        theme: {
          color: "#D61F45",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
      toast.error("Payment initiation failed. Try again.");
    } finally {
      setPayingPlanId(null);
    }
  };

  const loading = activeTab === "all" ? loadingAll : loadingMy;

  const totalPagesForAllPlans = Math.ceil(allPlans.length / itemsPerPage);
  const totalPagesForMyPlans = Math.ceil(myPlans.length / itemsPerPage);
  const totalPages = activeTab === "all" ? totalPagesForAllPlans : totalPagesForMyPlans;
  const currentPage = activeTab === "all" ? currentPageAll : currentPageMy;
  const setCurrentPage = activeTab === "all" ? setCurrentPageAll : setCurrentPageMy;

  const paginatedPlans = (activeTab === "all" ? allPlans : myPlans).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const activePlansCount = myPlans.filter((p) => p.plan_status === "Active").length;

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "all") {
      setCurrentPageAll(1);
    } else {
      setCurrentPageMy(1);
      fetchMyPlans();
    }
  };

  const checkPlanAndPurchase = async (plan, user_id) => {
    const userId = sessionStorage.getItem("accessToken");
    if (!userId) {
      toast.error("Please log in to purchase a plan.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("user_id", userId);

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/cust_api/Plan_purchased_History`,
        formData,
      );

      const planHistory = res.data?.data || [];
      const isCategoryPlanActive = planHistory.some(
        (item) =>
          item.category_type === plan.category_type && item.plan_status === "Active",
      );

      if (isCategoryPlanActive) {
        setSelectedPlan(plan);
        setIsPlanAlertModalOpen(true);
      } else {
        handlePlanPurchase(plan, user_id);
      }
    } catch (error) {
      console.error("Error fetching plan history:", error);
      toast.error("Could not check your plans. Please try again.");
    }
  };

  const tabClass = (tab) =>
    `flex items-center justify-center gap-2 px-6 py-2.5 text-[14px] font-semibold rounded-xl transition-all ${activeTab === tab
      ? "bg-gradient-to-r from-[#D61F45] to-[#B91C3C] text-white shadow-[0_6px_16px_rgba(214,31,69,0.3)]"
      : "text-gray-600 hover:text-[#D61F45] hover:bg-[#FFF1F4]"
    }`;

  // ==========================================================
  // Plan card
  // ==========================================================
  const PlanCard = ({ plan }) => {
    const isMy = activeTab === "my";
    const isExpired = isMy && plan.plan_status === "Expired";
    const hasOffer = Number(plan.offer_percentage) > 0;
    const showOriginal =
      hasOffer && plan.plan_price && Number(plan.plan_price) !== Number(plan.final_price);

    return (
      <div
        className={`relative flex flex-col gap-4 p-4 overflow-hidden border sm:flex-row rounded-2xl transition-all ${isExpired
          ? "bg-gray-50 border-gray-200"
          : "bg-white border-[#FDE8EC] shadow-[0_8px_24px_rgba(214,31,69,0.06)] hover:border-[#D61F45] hover:shadow-[0_12px_32px_rgba(214,31,69,0.12)]"
          }`}
      >
        {/* EXPIRED watermark */}
        {isExpired && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <span className="text-[56px] font-extrabold text-[#D61F45] opacity-10 -rotate-[20deg]">
              EXPIRED
            </span>
          </div>
        )}

        <div className="relative flex-shrink-0 w-full overflow-hidden h-44 sm:w-44 sm:h-auto sm:min-h-[150px] rounded-xl bg-[#FFF1F4]">
          <img
            src={planImageSrc(plan.plan_image)}
            alt={plan.plan_name}
            className={`object-cover w-full h-full ${isExpired ? "grayscale" : ""}`}
          />
          {hasOffer && !isMy && (
            <span className="absolute flex items-center gap-1 px-2 py-0.5 text-[11px] font-bold text-white rounded-md shadow top-2 left-2 bg-[#D61F45]">
              <Lightning size={12} weight="fill" />
              {plan.offer_percentage}% OFF
            </span>
          )}
        </div>

        <div className={`relative flex flex-col flex-1 min-w-0 ${isExpired ? "opacity-70" : ""}`}>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="m-0 text-[18px] font-bold text-[#17253a]">{plan.plan_name}</h3>
            {isMy && (
              <span
                className={`px-2.5 py-0.5 text-[11px] font-bold rounded-md ${isExpired ? "bg-gray-200 text-gray-600" : "bg-green-100 text-green-700"
                  }`}
              >
                {plan.plan_status}
              </span>
            )}
          </div>
          {plan.category_type && (
            <p className="flex items-center gap-1 m-0 mt-1 text-[13px] text-gray-500">
              <Stack size={14} weight="fill" className="text-[#D61F45]" />
              {plan.category_type}
              {plan.no_of_units ? ` · ${plan.no_of_units} units` : ""}
            </p>
          )}

          <div className="grid grid-cols-2 gap-3 mt-3 sm:grid-cols-3">
            <div className="px-3 py-2 rounded-xl bg-[#FFF7F9]">
              <p className="m-0 text-[11px] text-gray-500">Price</p>
              <p className="m-0 text-[17px] font-extrabold text-[#D61F45]">
                {rupee(plan.final_price)}
                {showOriginal && (
                  <span className="ml-1.5 text-[12px] font-medium text-gray-400 line-through">
                    {rupee(plan.plan_price)}
                  </span>
                )}
              </p>
            </div>
            <div className="px-3 py-2 rounded-xl bg-[#FFF7F9]">
              <p className="m-0 text-[11px] text-gray-500">Validity</p>
              <p className="m-0 text-[15px] font-bold text-[#17253a]">
                {plan.validity} {plan.validity_unit}
              </p>
            </div>
            {isMy && (
              <div className="px-3 py-2 rounded-xl bg-[#FFF7F9]">
                <p className="m-0 text-[11px] text-gray-500">Expiry Date</p>
                <p className="m-0 text-[15px] font-bold text-[#17253a]">
                  {formatDate(plan.plan_expiry_date)}
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2.5 mt-4 sm:mt-auto sm:pt-4">
            {!isMy && (
              <button
                type="button"
                disabled={payingPlanId === plan._id}
                onClick={() => checkPlanAndPurchase(plan, user_id)}
                className="flex items-center justify-center flex-1 gap-2 px-6 py-2.5 text-[14px] font-semibold text-white rounded-xl bg-gradient-to-r from-[#D61F45] to-[#B91C3C] shadow-[0_6px_16px_rgba(214,31,69,0.3)] hover:shadow-[0_10px_22px_rgba(214,31,69,0.4)] disabled:opacity-60 disabled:cursor-wait sm:flex-none"
              >
                <Crown size={16} weight="fill" />
                {payingPlanId === plan._id ? "Opening..." : "Pay Now"}
              </button>
            )}
            <button
              type="button"
              disabled={isExpired}
              onClick={() => {
                setSelectedPlan(plan);
                if (isMy) setIsPlanModalOpen(true);
                else setIsAllPlanModalOpen(true);
              }}
              className="flex items-center justify-center flex-1 gap-2 px-6 py-2.5 text-[14px] font-semibold text-[#D61F45] bg-white border-[1.5px] border-[#D61F45] rounded-xl transition-colors hover:bg-[#FDE8EC] disabled:border-gray-300 disabled:text-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed sm:flex-none"
            >
              <Info size={16} weight="bold" />
              View More Details
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ==========================================================
  // Plan details modal (shared by both tabs)
  // ==========================================================
  const PlanDetailsModal = ({ plan, showStatus, onClose }) => (
    <ModalShell onClose={onClose} maxWidth="max-w-lg">
      <div className="relative flex items-center gap-3 px-6 py-5 text-white bg-gradient-to-r from-[#D61F45] to-[#E8456A]">
        <span className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full bg-white/20 ring-2 ring-white/40">
          <Crown size={24} weight="fill" />
        </span>
        <div className="min-w-0 pr-8">
          <h2 className="m-0 text-xl font-bold text-white">Plan Details</h2>
          <p className="m-0 text-[13px] text-white/85 truncate">{plan.plan_name}</p>
        </div>
        <button
          type="button"
          className="absolute flex items-center justify-center w-8 h-8 text-[#D61F45] bg-white rounded-full shadow top-4 right-4 hover:scale-105 transition-transform"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={16} weight="bold" />
        </button>
      </div>

      <div className="flex-1 p-5 space-y-4 overflow-y-auto">
        <img
          src={planImageSrc(plan.plan_image)}
          alt={plan.plan_name}
          className="object-cover w-full h-40 rounded-2xl"
        />

        <div className="grid grid-cols-2 gap-3">
          <DetailTile icon={Tag} label="Price" value={rupee(plan.plan_price)} />
          <DetailTile
            icon={Lightning}
            label="Offer"
            value={plan.offer_percentage ? `${plan.offer_percentage}%` : "—"}
          />
          <DetailTile icon={Crown} label="Final Price" value={rupee(plan.final_price)} accent />
          {/* FIX: My Plans showed category_type here instead of the unit */}
          <DetailTile
            icon={Clock}
            label="Validity"
            value={`${plan.validity ?? ""} ${plan.validity_unit ?? ""}`.trim()}
          />
          <DetailTile icon={Stack} label="Category Type" value={plan.category_type} />
          <DetailTile icon={Package} label="No. of Units" value={plan.no_of_units} />
          {showStatus && (
            <>
              <DetailTile icon={CheckCircle} label="Status" value={plan.plan_status} />
              <DetailTile
                icon={CalendarBlank}
                label="Expiry Date"
                value={formatDate(plan.plan_expiry_date)}
              />
            </>
          )}
        </div>

        {plan.features && (
          <div className="p-4 rounded-2xl bg-[#FFF7F9] border border-[#FDE8EC]">
            <p className="flex items-center gap-1.5 m-0 text-[13px] font-bold text-[#17253a]">
              <ListChecks size={17} weight="fill" className="text-[#D61F45]" />
              Features
            </p>
            <p className="m-0 mt-1 text-[14px] text-gray-600 whitespace-pre-line">{plan.features}</p>
          </div>
        )}

        {plan.description && (
          <div className="p-4 rounded-2xl bg-[#FFF7F9] border border-[#FDE8EC]">
            <p className="flex items-center gap-1.5 m-0 text-[13px] font-bold text-[#17253a]">
              <Sparkle size={17} weight="fill" className="text-[#D61F45]" />
              Description
            </p>
            <p className="m-0 mt-1 text-[14px] text-gray-600 whitespace-pre-line">{plan.description}</p>
          </div>
        )}
      </div>

      {!showStatus && (
        <div className="px-5 py-4 border-t border-[#FDE8EC] bg-[#FFF7F9]">
          <button
            type="button"
            onClick={() => {
              onClose();
              checkPlanAndPurchase(plan, user_id);
            }}
            className="flex items-center justify-center w-full gap-2 py-2.5 text-[15px] font-semibold text-white rounded-xl bg-gradient-to-r from-[#D61F45] to-[#B91C3C] shadow-[0_6px_18px_rgba(214,31,69,0.35)]"
          >
            <Crown size={17} weight="fill" />
            Pay Now · {rupee(plan.final_price)}
          </button>
        </div>
      )}
    </ModalShell>
  );

  return (
    <div className="w-full">
      {/* ==================================================
          Header banner — "Subscription Plans"
      ================================================== */}
      <div className="relative flex flex-col gap-4 p-5 overflow-hidden border border-[#FDE8EC] rounded-2xl bg-gradient-to-r from-[#FFF1F4] via-[#FDE8EC] to-[#FAD3DB] sm:flex-row sm:items-center sm:justify-between md:px-6">
        <Crown
          size={150}
          weight="thin"
          className="absolute hidden pointer-events-none right-6 -bottom-8 text-[#D61F45] opacity-10 md:block"
        />

        <div className="relative flex items-center gap-4">
          <span className="flex items-center justify-center flex-shrink-0 w-16 h-16 text-white rounded-full md:w-20 md:h-20 bg-gradient-to-br from-[#D61F45] to-[#B91C3C] shadow-[0_8px_20px_rgba(214,31,69,0.35)]">
            <Crown size={34} weight="fill" />
          </span>
          <div>
            <h2 className="m-0 text-2xl font-bold text-[#17253a] md:text-[32px]">
              Subscription <span className="text-[#D61F45]">Plans</span>
            </h2>
            <p className="m-0 mt-0.5 text-[13px] md:text-[15px] text-gray-600">
              Choose the right plan to get more visibility and grow your property business.
            </p>
          </div>
        </div>

        {activePlansCount > 0 && (
          <div className="relative flex items-center gap-2 px-4 py-2 bg-white/80 rounded-xl sm:self-center">
            <CheckCircle size={22} weight="fill" className="text-green-600" />
            <span className="text-[13px] font-semibold text-[#17253a]">
              {activePlansCount} active plan{activePlansCount > 1 ? "s" : ""}
            </span>
          </div>
        )}
      </div>

      {/* ==================================================
          Tabs
      ================================================== */}
      <div className="flex p-2 mt-4 bg-white border border-[#FDE8EC] rounded-2xl shadow-[0_8px_24px_rgba(214,31,69,0.06)]">
        <div className="flex flex-1 gap-1 p-1 rounded-2xl bg-[#FFF7F9] sm:flex-none">
          <button type="button" className={`${tabClass("all")} flex-1 sm:flex-none`} onClick={() => handleTabClick("all")}>
            <SquaresFour size={18} weight="fill" />
            All Plans
            {allPlans.length > 0 && (
              <span className={`px-1.5 text-[11px] font-bold rounded-full ${activeTab === "all" ? "bg-white/25" : "bg-[#FDE8EC] text-[#D61F45]"}`}>
                {allPlans.length}
              </span>
            )}
          </button>
          <button type="button" className={`${tabClass("my")} flex-1 sm:flex-none`} onClick={() => handleTabClick("my")}>
            <User size={18} weight="fill" />
            My Plans
            {myPlans.length > 0 && (
              <span className={`px-1.5 text-[11px] font-bold rounded-full ${activeTab === "my" ? "bg-white/25" : "bg-[#FDE8EC] text-[#D61F45]"}`}>
                {myPlans.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ==================================================
          Plans / empty state
          (The whole page used to show a bare "Loading..." until
          BOTH requests finished — now each tab has its own state.)
      ================================================== */}
      <div className="mt-4">
        {loading ? (
          <div className="grid grid-cols-1 gap-4 2xl:grid-cols-2">
            {[0, 1].map((i) => (
              <div key={i} className="flex gap-4 p-4 bg-white border border-[#FDE8EC] rounded-2xl animate-pulse">
                <div className="w-44 h-36 rounded-xl bg-[#FDE8EC]" />
                <div className="flex-1 space-y-3">
                  <div className="w-1/2 h-5 rounded bg-[#FDE8EC]" />
                  <div className="w-1/3 h-4 rounded bg-[#FFF1F4]" />
                  <div className="w-2/3 h-10 rounded-xl bg-[#FFF1F4]" />
                </div>
              </div>
            ))}
          </div>
        ) : paginatedPlans.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 2xl:grid-cols-2">
            {paginatedPlans.map((plan, i) => (
              <PlanCard key={plan._id || i} plan={plan} />
            ))}
          </div>
        ) : (
          <EmptyPlans isMyTab={activeTab === "my"} onBrowse={() => handleTabClick("all")} />
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

      {/* ==================================================
          "Already purchased" alert — rendered ONCE (it used to be
          rendered inside every plan card, stacking copies).
      ================================================== */}
      {isPlanAlertModalOpen && selectedPlan && (
        <ModalShell onClose={() => setIsPlanAlertModalOpen(false)}>
          <div className="p-6 text-center">
            <div className="flex items-center justify-center mx-auto mb-3 rounded-full w-14 h-14 bg-[#FDE8EC] text-[#D61F45]">
              <WarningCircle size={30} weight="fill" />
            </div>
            <h2 className="text-xl font-bold text-[#17253a]">You already purchased this plan.</h2>
            <p className="mt-1 text-sm text-gray-500">Do you want to purchase it again?</p>
            <div className="grid grid-cols-2 gap-3 mt-5">
              <button
                type="button"
                onClick={() => setIsPlanAlertModalOpen(false)}
                className="py-2.5 font-semibold bg-white border-[1.5px] rounded-xl border-[#D61F45] text-[#D61F45] hover:bg-[#FDE8EC] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  handlePlanPurchase(selectedPlan, user_id);
                  setIsPlanAlertModalOpen(false);
                }}
                className="py-2.5 font-semibold text-white rounded-xl bg-gradient-to-r from-[#D61F45] to-[#B91C3C] shadow-[0_6px_18px_rgba(214,31,69,0.35)]"
              >
                Purchase Again
              </button>
            </div>
          </div>
        </ModalShell>
      )}

      {isPlanModalOpen && selectedPlan && (
        <PlanDetailsModal plan={selectedPlan} showStatus onClose={() => setIsPlanModalOpen(false)} />
      )}
      {isAllPlanModalOpen && selectedPlan && (
        <PlanDetailsModal plan={selectedPlan} showStatus={false} onClose={() => setIsAllPlanModalOpen(false)} />
      )}
    </div>
  );
};

export default Subscription;