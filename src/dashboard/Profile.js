// import React, { useState, useEffect, useRef } from "react";
// import { IoCloseCircleOutline } from "react-icons/io5";
// import {
//   HouseSimple,
//   Eye,
//   IdentificationCard,
//   User,
//   CloudArrowUp,
// } from "@phosphor-icons/react";
// import { IoCloudUploadOutline } from "react-icons/io5"; // Updated icon
// import axios from "axios";

// const Profile = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [profileData, setProfileData] = useState(null);
//   const [updatedData, setUpdatedData] = useState({});
//   const [profileImage, setProfileImage] = useState(null);
//   const fileInputRef = useRef(null);
//   const [listingsCount, setListingsCount] = useState(0);
//   const [leadsCount, setLeadsCount] = useState(0);
//   const [virtualTourCount, setVirtualTourCount] = useState(0);
//   const accessToken = sessionStorage.getItem("accessToken");

//   const fetchProfile = async () => {
//     try {
//       const response = await fetch(
//         `${process.env.REACT_APP_API_URL}/cust_api/get_profile`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ user_id: accessToken }),
//         },
//       );

//       const data = await response.json();
//       if (data.status === 1 && data.data) {
//         setProfileData(data.data);
//         setUpdatedData(data.data);
//         // Set profile image if available
//         if (data.data.profile_image) {
//           setProfileImage(data.data.profile_image);
//         }

//         // Access compare_data counts (listings, leads, tours)
//         if (data.compare_data) {
//           setListingsCount(data.compare_data.listings_count || 0);
//           setLeadsCount(data.compare_data.leads_count || 0);
//           setVirtualTourCount(data.compare_data.virtual_tour_count || 0);
//         }
//       }
//     } catch (error) {
//       console.error("API Error:", error);
//     }
//   };

//   useEffect(() => {
//     if (accessToken) {
//       fetchProfile();
//     }
//   }, [accessToken, profileImage]);

//   const displayValue = (value) =>
//     value !== null && value !== "" ? value : "N/A";

//   // Check if the logged-in user is a Builder (used to conditionally show Company Name)
//   const isBuilder =
//     (updatedData.user_type || profileData?.user_type || "")
//       .toString()
//       .toLowerCase() === "builder";

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedData({ ...updatedData, [name]: value });
//   };

//   const handleUpdateProfile = async () => {
//     try {
//       const response = await fetch(
//         `${process.env.REACT_APP_API_URL}/cust_api/edit_profile`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             user_id: accessToken,
//             full_name: updatedData.full_name,
//             email: updatedData.email,
//             mobile_number: updatedData.mobile_number,
//             proprietorship: updatedData.proprietorship,
//             experience: updatedData.experience,
//             city: updatedData.city,
//             company_name: updatedData.company_name,
//           }),
//         },
//       );
//       const result = await response.json();
//       if (result.status === 1) {
//         setProfileData(updatedData);
//         setIsModalOpen(false);
//         // Save email in sessionStorage
//         sessionStorage.setItem("user_email", updatedData.email);
//       } else {
//         console.error("Update failed:", result);
//       }
//     } catch (error) {
//       console.error("API Update Error:", error);
//     }
//   };

//   const handleImageChange = async (e) => {
//     await fetchProfile();
//     const file = e.target.files[0];
//     if (!file) return;

//     const previewURL = URL.createObjectURL(file);
//     setProfileImage(previewURL);

//     const formData = new FormData();
//     formData.append("user_id", accessToken);
//     formData.append("profile_image", file);

//     // Prepare FormData with existing profile fields
//     formData.append("user_id", accessToken);
//     formData.append("profile_image", file);
//     formData.append("full_name", profileData.full_name);
//     formData.append("email", profileData.email);
//     formData.append("mobile_number", profileData.mobile_number);
//     formData.append("experience", profileData.experience || "");
//     formData.append("proprietorship", profileData.proprietorship || "");

//     try {
//       const res = await axios.post(
//         `${process.env.REACT_APP_API_URL}/cust_api/edit_profile`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         },
//       );

//       console.log("Upload success:", res.data);

//       // If backend returns image URL, use it
//       if (res.data.status === 1 && res.data.data?.profile_image) {
//         setProfileImage(res.data.data.profile_image);
//       }
//     } catch (err) {
//       console.error("Upload failed:", err);
//     }
//   };

//   return (
//     <>
//       <h2 className="text-xl font-semibold mb-4 pt-3">
//         Welcome back,{" "}
//         {profileData ? displayValue(profileData.full_name) : "Loading..."}!
//       </h2>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-white p-6 rounded-md border border-gray-100 flex items-center space-x-4">
//           <div className="w-20 h-20 flex items-center justify-center border border-green-500 rounded-full bg-green-50">
//             <HouseSimple className="text-green-500 text-4xl" />
//           </div>
//           <div>
//             <p className="text-2xl font-bold">{listingsCount}</p>
//             <p className="text-gray-600">Your Listings</p>
//           </div>
//         </div>
//         <div className="bg-white p-6 rounded-md border border-gray-100 flex items-center space-x-4">
//           <div className="w-20 h-20 flex items-center justify-center border border-yellow-500 rounded-full bg-yellow-50">
//             <Eye className="text-yellow-500 text-3xl" />
//           </div>
//           <div>
//             <p className="text-2xl font-bold">{leadsCount}</p>
//             <p className="text-gray-600">Leads</p>
//           </div>
//         </div>
//         <div className="bg-white p-6 rounded-md border border-gray-100 flex items-center space-x-4">
//           <div className="w-20 h-20 flex items-center justify-center border border-rose-500 rounded-full bg-rose-50">
//             <IdentificationCard className="my-text text-3xl" />
//           </div>
//           <div>
//             <p className="text-2xl font-bold">{virtualTourCount}</p>
//             <p className="text-gray-600">Virtual Appointments</p>
//           </div>
//         </div>
//       </div>

//       {profileData && (
//         <div className="bg-white p-6 mt-6 rounded-md shadow-sm flex flex-col md:flex-row items-center md:items-start">
//           <div className="relative w-48 h-48 rounded-xl flex items-center justify-center bg-gray-100">
//             {profileImage ? (
//               <img
//                 src={profileImage}
//                 alt="Profile"
//                 className="w-full h-full object-cover rounded-xl cursor-pointer"
//                 onClick={() => fileInputRef.current.click()}
//               />
//             ) : (
//               <User
//                 className="my-text text-[14rem]"
//                 weight="thin"
//                 onClick={() => fileInputRef.current.click()}
//               />
//             )}

//             <label className="absolute top-[-10px] right-[-10px] my-bg  p-1 rounded-full shadow-md">
//               <CloudArrowUp className="text-white text-xl" />
//               <input
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 ref={fileInputRef}
//                 onChange={handleImageChange}
//               />
//             </label>
//           </div>

//           <div className="ml-12 grid grid-cols-2 gap-x-24">
//             <div>
//               <p className="text-gray-600">Name</p>
//               <h3 className="text-lg font-bold">
//                 {displayValue(profileData.full_name)}
//               </h3>

//               <p className="text-gray-600 mt-4">Email</p>
//               <p className="text-gray-800">{displayValue(profileData.email)}</p>

//               <p className="text-gray-600 mt-4">Mobile</p>
//               <p className="text-gray-800">
//                 {displayValue(profileData.mobile_number)}
//               </p>

//               <p className="text-gray-600 mt-4">City</p>
//               <p className="text-gray-800">{displayValue(profileData.city)}</p>
//             </div>
//             <div>
//               <p className="text-gray-600">Experience</p>
//               <p className="text-gray-800">
//                 {displayValue(profileData.experience)}
//               </p>

//               <p className="text-gray-600 mt-4">Proprietorship</p>
//               <p className="text-gray-800 font-semibold">
//                 {displayValue(profileData.proprietorship)}
//               </p>
//               {isBuilder && (
//                 <>
//                   <p className="text-gray-600 mt-4">Company Name</p>
//                   <p className="text-gray-800 font-semibold">
//                     {displayValue(profileData.company_name)}
//                   </p>
//                 </>
//               )}
//             </div>
//           </div>
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="ml-auto px-4 py-2 bg-white my-text rounded-md mt-4 md:mt-0 border border-rose-500"
//           >
//             Edit Profile
//           </button>
//         </div>
//       )}

//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
//             <button
//               className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
//               onClick={() => setIsModalOpen(false)}
//             >
//               <IoCloseCircleOutline className="text-2xl" />
//             </button>
//             <h2 className="text-xl font-semibold mb-4 text-center">
//               Edit Profile
//             </h2>
//             <div className="space-y-3">
//               <label className="block">
//                 <span className="text-gray-600">Name</span>
//                 <input
//                   type="text"
//                   name="full_name"
//                   className="w-full border rounded-md p-2"
//                   value={updatedData.full_name}
//                   onChange={handleInputChange}
//                   onKeyDown={(e) => {
//                     const key = e.key;
//                     const isLetter = /^[a-zA-Z\s]$/.test(key);
//                     const isControl = [
//                       "Backspace",
//                       "Tab",
//                       "ArrowLeft",
//                       "ArrowRight",
//                       "Delete",
//                     ].includes(key);

//                     if (!isLetter && !isControl) {
//                       e.preventDefault();
//                     }
//                   }}
//                 />
//               </label>
//               <label className="block">
//                 <span className="text-gray-600">Mobile Number</span>
//                 <input
//                   type="text"
//                   name="mobile_number"
//                   className="w-full border rounded-md p-2"
//                   value={updatedData.mobile_number || ""}
//                   onChange={handleInputChange}
//                   maxLength={10}
//                   readOnly
//                 />
//               </label>
//               <label className="block">
//                 <span className="text-gray-600">Email</span>
//                 <input
//                   type="email"
//                   name="email"
//                   className="w-full border rounded-md p-2"
//                   value={updatedData.email}
//                   onChange={handleInputChange}
//                   pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
//                   title="Please enter a valid email address"
//                 />
//               </label>
//               {isBuilder && (
//                 <label className="block">
//                   <span className="text-gray-600">Company Name</span>
//                   <input
//                     type="text"
//                     name="company_name"
//                     className="w-full border rounded-md p-2"
//                     value={updatedData.company_name || ""}
//                     onChange={handleInputChange}
//                   />
//                 </label>
//               )}
//               <label className="block">
//                 <span className="text-gray-600">City</span>
//                 <input
//                   type="text"
//                   name="city"
//                   className="w-full border rounded-md p-2"
//                   value={updatedData.city || ""}
//                   onChange={handleInputChange}
//                 />
//               </label>
//               <label className="block">
//                 <span className="text-gray-600">Experience</span>
//                 <input
//                   type="text"
//                   name="experience"
//                   className="w-full border rounded-md p-2"
//                   value={updatedData.experience}
//                   onChange={handleInputChange}
//                   onKeyDown={(e) => {
//                     const key = e.key;
//                     const isNumber = /^[0-9]$/.test(key);
//                     const isControlKey = [
//                       "Backspace",
//                       "Tab",
//                       "ArrowLeft",
//                       "ArrowRight",
//                       "Delete",
//                     ].includes(key);

//                     if (!isNumber && !isControlKey) {
//                       e.preventDefault();
//                     }
//                   }}
//                 />
//               </label>
//               <label className="block">
//                 <span className="text-gray-600">Proprietorship</span>
//                 <select
//                   name="proprietorship"
//                   className="w-full border rounded-md p-2"
//                   value={updatedData.proprietorship}
//                   onChange={handleInputChange}
//                 >
//                   <option value="">Select</option>
//                   <option value="Individual">Individual</option>
//                   <option value="Partnership">Partnership</option>
//                   <option value="Private Limited">Private Limited</option>
//                   <option value="LLP">LLP</option>
//                 </select>
//               </label>
//             </div>
//             <button
//               className="mt-4 w-full my-bg text-white py-2 rounded-md"
//               onClick={handleUpdateProfile}
//             >
//               Update Profile
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Profile;





// ==========================               =========================== 

import React, { useState, useEffect, useRef } from "react";
import {
  HouseSimple,
  Eye,
  IdentificationCard,
  User,
  UserCircle,
  CloudArrowUp,
  Phone,
  EnvelopeSimple,
  Buildings,
  MapPin,
  Briefcase,
  Storefront,
  PencilSimple,
  X,
} from "@phosphor-icons/react";
import axios from "axios";

// ==========================================================
// UI helpers (defined OUTSIDE the component so inputs don't
// remount and lose focus on every keystroke).
// ==========================================================

// One form row: pink icon tile on the left, label + input on the right.
const Field = ({ icon: Icon, label, children, className = "" }) => (
  <div className={`flex items-end gap-3 ${className}`}>
    <span className="flex items-center justify-center flex-shrink-0 w-11 h-11 rounded-xl bg-[#FDE8EC] text-[#D61F45]">
      <Icon size={20} weight="fill" />
    </span>
    <label className="flex-1 block min-w-0">
      <span className="block mb-1 text-[12px] font-semibold text-gray-600">
        {label}
      </span>
      {children}
    </label>
  </div>
);

const inputClass =
  "w-full h-11 px-3 text-[14px] text-[#17253a] bg-white border border-gray-200 rounded-xl outline-none transition-colors focus:border-[#D61F45] focus:ring-2 focus:ring-[#FDE8EC] read-only:bg-gray-50 read-only:text-gray-500";

// One stat card at the top of the page.
const StatCard = ({ icon: Icon, value, label }) => (
  <div className="flex items-center gap-4 p-5 bg-white border border-[#FDE8EC] rounded-2xl shadow-[0_8px_24px_rgba(214,31,69,0.06)]">
    <span className="flex items-center justify-center flex-shrink-0 rounded-full w-14 h-14 bg-[#FDE8EC] text-[#D61F45]">
      <Icon size={26} />
    </span>
    <div>
      <p className="m-0 text-2xl font-bold text-[#17253a]">{value}</p>
      <p className="m-0 text-[13px] text-gray-500">{label}</p>
    </div>
  </div>
);

// One label/value pair in the profile details card.
const Detail = ({ label, value, strong }) => (
  <div>
    <p className="m-0 text-[12px] font-medium text-gray-500">{label}</p>
    <p
      className={`m-0 mt-0.5 text-[14px] text-[#17253a] break-words ${strong ? "font-semibold" : ""
        }`}
    >
      {value}
    </p>
  </div>
);

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);
  const [listingsCount, setListingsCount] = useState(0);
  const [leadsCount, setLeadsCount] = useState(0);
  const [virtualTourCount, setVirtualTourCount] = useState(0);
  const accessToken = sessionStorage.getItem("accessToken");

  const fetchProfile = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/cust_api/get_profile`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: accessToken }),
        },
      );

      const data = await response.json();
      if (data.status === 1 && data.data) {
        setProfileData(data.data);
        setUpdatedData(data.data);
        // Set profile image if available
        if (data.data.profile_image) {
          setProfileImage(data.data.profile_image);
        }

        // Access compare_data counts (listings, leads, tours)
        if (data.compare_data) {
          setListingsCount(data.compare_data.listings_count || 0);
          setLeadsCount(data.compare_data.leads_count || 0);
          setVirtualTourCount(data.compare_data.virtual_tour_count || 0);
        }
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchProfile();
    }
  }, [accessToken, profileImage]);

  // Close the Edit Profile modal with the Escape key.
  useEffect(() => {
    if (!isModalOpen) return undefined;
    const onKey = (e) => e.key === "Escape" && setIsModalOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isModalOpen]);

  const displayValue = (value) =>
    value !== null && value !== undefined && value !== "" ? value : "N/A";

  // Check if the logged-in user is a Builder (used to conditionally show Company Name)
  const isBuilder =
    (updatedData.user_type || profileData?.user_type || "")
      .toString()
      .toLowerCase() === "builder";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const openEditModal = () => {
    // Start each edit from the saved values, so a cancelled edit doesn't linger.
    if (profileData) setUpdatedData(profileData);
    setIsModalOpen(true);
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/cust_api/edit_profile`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: accessToken,
            full_name: updatedData.full_name,
            email: updatedData.email,
            mobile_number: updatedData.mobile_number,
            proprietorship: updatedData.proprietorship,
            experience: updatedData.experience,
            city: updatedData.city,
            company_name: updatedData.company_name,
          }),
        },
      );
      const result = await response.json();
      if (result.status === 1) {
        setProfileData(updatedData);
        setIsModalOpen(false);
        // Save email in sessionStorage
        sessionStorage.setItem("user_email", updatedData.email);
      } else {
        console.error("Update failed:", result);
      }
    } catch (error) {
      console.error("API Update Error:", error);
    }
  };

  const handleImageChange = async (e) => {
    await fetchProfile();
    const file = e.target.files[0];
    if (!file) return;

    const previewURL = URL.createObjectURL(file);
    setProfileImage(previewURL);

    // FormData with the image + existing profile fields
    // (user_id and profile_image are appended once — they were duplicated before).
    const formData = new FormData();
    formData.append("user_id", accessToken);
    formData.append("profile_image", file);
    formData.append("full_name", profileData.full_name);
    formData.append("email", profileData.email);
    formData.append("mobile_number", profileData.mobile_number);
    formData.append("experience", profileData.experience || "");
    formData.append("proprietorship", profileData.proprietorship || "");

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/cust_api/edit_profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      // If backend returns image URL, use it
      if (res.data.status === 1 && res.data.data?.profile_image) {
        setProfileImage(res.data.data.profile_image);
      }
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  const openFilePicker = () => fileInputRef.current?.click();

  return (
    <>
      <h2 className="mb-4 text-xl font-bold text-[#17253a]">
        Welcome back,{" "}
        <span className="text-[#D61F45]">
          {profileData ? displayValue(profileData.full_name) : "Loading..."}
        </span>
        !
      </h2>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-5">
        <StatCard icon={HouseSimple} value={listingsCount} label="Your Listings" />
        <StatCard icon={Eye} value={leadsCount} label="Leads" />
        <StatCard
          icon={IdentificationCard}
          value={virtualTourCount}
          label="Virtual Appointments"
        />
      </div>

      {/* Profile card */}
      {profileData && (
        <div className="relative flex flex-col items-center gap-6 p-5 mt-5 bg-white border border-[#FDE8EC] rounded-2xl shadow-[0_8px_24px_rgba(214,31,69,0.06)] md:flex-row md:items-start md:p-6">
          {/* Photo with upload badge */}
          <div className="relative flex-shrink-0">
            <button
              type="button"
              onClick={openFilePicker}
              className="flex items-center justify-center w-40 h-40 overflow-hidden border-4 border-white rounded-2xl bg-[#FFF1F4] shadow-[0_8px_20px_rgba(214,31,69,0.15)]"
              title="Change photo"
            >
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              ) : (
                <User size={96} weight="thin" className="text-[#D61F45]" />
              )}
            </button>

            <label
              className="absolute flex items-center justify-center text-white rounded-full shadow-md cursor-pointer w-9 h-9 -top-2 -right-2 bg-gradient-to-br from-[#D61F45] to-[#B91C3C] ring-4 ring-white"
              title="Upload photo"
            >
              <CloudArrowUp size={18} weight="bold" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageChange}
              />
            </label>
          </div>

          {/* Details */}
          <div className="grid flex-1 w-full grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
            <Detail label="Name" value={displayValue(profileData.full_name)} strong />
            <Detail label="Experience" value={displayValue(profileData.experience)} />
            <Detail label="Email" value={displayValue(profileData.email)} />
            <Detail
              label="Proprietorship"
              value={displayValue(profileData.proprietorship)}
              strong
            />
            <Detail label="Mobile" value={displayValue(profileData.mobile_number)} />
            {isBuilder && (
              <Detail
                label="Company Name"
                value={displayValue(profileData.company_name)}
                strong
              />
            )}
            <Detail label="City" value={displayValue(profileData.city)} />
          </div>

          <button
            onClick={openEditModal}
            className="flex items-center gap-2 px-4 py-2 text-[13px] font-semibold text-[#D61F45] bg-white border-[1.5px] border-[#D61F45] rounded-xl transition-colors hover:bg-[#FDE8EC] md:self-start whitespace-nowrap"
          >
            <PencilSimple size={16} weight="bold" />
            Edit Profile
          </button>
        </div>
      )}

      {/* ==================================================
          Edit Profile modal — red header card + icon rows,
          per the design. z above the fixed navbar (1000).
      ================================================== */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[1100] flex items-center justify-center px-4 bg-black bg-opacity-50"
          onMouseDown={(e) => e.target === e.currentTarget && setIsModalOpen(false)}
        >
          <div
            className="flex flex-col w-full max-w-lg max-h-[92vh] overflow-hidden bg-white shadow-2xl rounded-3xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-profile-title"
          >
            {/* Header */}
            <div className="relative flex items-center gap-3 px-6 py-5 text-white bg-gradient-to-r from-[#D61F45] to-[#E8456A]">
              <span className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full bg-white/20 ring-2 ring-white/40">
                <UserCircle size={30} weight="fill" />
              </span>
              <div>
                <h2 id="edit-profile-title" className="m-0 text-xl font-bold text-white">
                  Edit Profile
                </h2>
                <p className="m-0 text-[13px] text-white/85">
                  Update your personal and company details
                </p>
              </div>
              <button
                type="button"
                className="absolute flex items-center justify-center w-8 h-8 text-[#D61F45] bg-white rounded-full top-4 right-4 shadow hover:scale-105 transition-transform"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close"
              >
                <X size={16} weight="bold" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 px-6 py-5 space-y-4 overflow-y-auto">
              <Field icon={User} label="Name">
                <input
                  type="text"
                  name="full_name"
                  className={inputClass}
                  value={updatedData.full_name || ""}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    const key = e.key;
                    const isLetter = /^[a-zA-Z\s]$/.test(key);
                    const isControl = [
                      "Backspace",
                      "Tab",
                      "ArrowLeft",
                      "ArrowRight",
                      "Delete",
                    ].includes(key);

                    if (!isLetter && !isControl) {
                      e.preventDefault();
                    }
                  }}
                />
              </Field>

              <Field icon={Phone} label="Mobile Number">
                <input
                  type="text"
                  name="mobile_number"
                  className={inputClass}
                  value={updatedData.mobile_number || ""}
                  onChange={handleInputChange}
                  maxLength={10}
                  readOnly
                />
              </Field>

              <Field icon={EnvelopeSimple} label="Email">
                <input
                  type="email"
                  name="email"
                  className={inputClass}
                  value={updatedData.email || ""}
                  onChange={handleInputChange}
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  title="Please enter a valid email address"
                />
              </Field>

              {isBuilder && (
                <Field icon={Buildings} label="Company Name">
                  <input
                    type="text"
                    name="company_name"
                    className={inputClass}
                    value={updatedData.company_name || ""}
                    onChange={handleInputChange}
                  />
                </Field>
              )}

              {/* City + Experience side by side */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field icon={MapPin} label="City">
                  <input
                    type="text"
                    name="city"
                    className={inputClass}
                    value={updatedData.city || ""}
                    onChange={handleInputChange}
                  />
                </Field>

                <Field icon={Briefcase} label="Experience (Years)">
                  <input
                    type="text"
                    inputMode="numeric"
                    name="experience"
                    className={inputClass}
                    value={updatedData.experience || ""}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                      const key = e.key;
                      const isNumber = /^[0-9]$/.test(key);
                      const isControlKey = [
                        "Backspace",
                        "Tab",
                        "ArrowLeft",
                        "ArrowRight",
                        "Delete",
                      ].includes(key);

                      if (!isNumber && !isControlKey) {
                        e.preventDefault();
                      }
                    }}
                  />
                </Field>
              </div>

              <Field icon={Storefront} label="Proprietorship">
                <select
                  name="proprietorship"
                  className={`${inputClass} cursor-pointer`}
                  value={updatedData.proprietorship || ""}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="Individual">Individual</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Private Limited">Private Limited</option>
                  <option value="LLP">LLP</option>
                </select>
              </Field>
            </div>

            {/* Footer */}
            <div className="grid grid-cols-2 gap-3 px-6 py-4 border-t border-[#FDE8EC] bg-[#FFF7F9]">
              <button
                type="button"
                className="py-2.5 text-[14px] font-semibold text-[#D61F45] bg-white border-[1.5px] border-[#D61F45] rounded-xl transition-colors hover:bg-[#FDE8EC]"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="py-2.5 text-[14px] font-semibold text-white rounded-xl bg-gradient-to-r from-[#D61F45] to-[#B91C3C] shadow-[0_6px_18px_rgba(214,31,69,0.35)] transition-all hover:shadow-[0_10px_24px_rgba(214,31,69,0.45)]"
                onClick={handleUpdateProfile}
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;