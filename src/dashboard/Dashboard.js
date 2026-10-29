// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useHistory } from "react-router-dom";

// import { FaBars, FaTimes } from "react-icons/fa";
// import Profile from "./Profile";
// import MyProperties from "./MyProperties";
// import MyProjects from "./MyProjects";
// import MyLeads from "./MyLeads";
// import MyVirtualTour from "./MyVirtualTour";
// import Subscription from "./Subscription";
// import SavedSerches from "./SavedSerches";
// import MyFavourite from "./MyFavourite";
// import Offer from "./Offer";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { IoCloseCircleOutline } from "react-icons/io5";

// const Dashboard = () => {
//   const location = useLocation();
//   const history = useHistory();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [activeSection, setActiveSection] = useState(
//     location.state?.page || "profile",
//   );
//   const userType = sessionStorage.getItem("user_type");
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   useEffect(() => {
//     if (location.state?.page) {
//       setActiveSection(location.state.page);
//     }
//   }, [location.state]);

//   const handleLogout = () => {
//     setShowModal(true);
//   };

//   const confirmLogout = () => {
//     sessionStorage.clear();
//     history.push("/");
//     toast.success("Logout Successfully");
//     setShowModal(false);
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Navbar */}
//       <nav className="hidden md:flex w-full bg-gray-100 text-black p-4 justify-between items-center px-20">
//         <h1 className="text-xl">Dashboard</h1>
//         <div className="flex items-center gap-4">
//           <div className="text-gray-500 text-sm">
//             <Link to="/" className="hover:text-gray-700">
//               Home
//             </Link>
//             <span className="mx-1">›</span>
//             <span className="my-text font-medium">Dashboard</span>
//           </div>
//         </div>
//       </nav>

//       <div className="flex flex-1 flex-col md:flex-row">
//         {/* Sidebar */}
//         <aside
//           className={`w-full md:w-64 bg-white text-black p-4 md:block h-screen sticky top-0 overflow-y-auto ${
//             isSidebarOpen ? "block" : "hidden"
//           }`}
//         >
//           <nav className="flex flex-col space-y-2">
//             <button
//               onClick={() => setActiveSection("profile")}
//               className={`py-3 px-4 rounded-md text-left ${
//                 activeSection === "profile"
//                   ? "bg-gray-200 my-text"
//                   : "text-gray-700 hover:bg-gray-300"
//               }`}
//             >
//               Profile
//             </button>
//             <button
//               onClick={() => setActiveSection("myProperties")}
//               className={`py-3 px-4 rounded-md text-left ${
//                 activeSection === "myProperties"
//                   ? "bg-gray-200 my-text"
//                   : "text-gray-700 hover:bg-gray-300"
//               }`}
//             >
//               My Properties
//             </button>
//             {userType !== "Owner" && (
//               <button
//                 onClick={() => setActiveSection("myProjects")}
//                 className={`py-3 px-4 rounded-md text-left ${
//                   activeSection === "myProjects"
//                     ? "bg-gray-200 my-text"
//                     : "text-gray-700 hover:bg-gray-300"
//                 }`}
//               >
//                 My Projects
//               </button>
//             )}

//             <button
//               onClick={() => setActiveSection("myLeads")}
//               className={`py-3 px-4 rounded-md text-left ${
//                 activeSection === "myLeads"
//                   ? "bg-gray-200 my-text"
//                   : "text-gray-700 hover:bg-gray-300"
//               }`}
//             >
//               My Leads
//             </button>
//             <button
//               onClick={() => setActiveSection("myVirtualtour")}
//               className={`py-3 px-4 rounded-md text-left ${
//                 activeSection === "myVirtualtour"
//                   ? "bg-gray-200 my-text"
//                   : "text-gray-700 hover:bg-gray-300"
//               }`}
//             >
//               My Virtual Tour
//             </button>
//             <button
//               onClick={() => setActiveSection("mySubscriptions")}
//               className={`py-3 px-4 rounded-md text-left ${
//                 activeSection === "mySubscriptions"
//                   ? "bg-gray-200 my-text"
//                   : "text-gray-700 hover:bg-gray-300"
//               }`}
//             >
//               Subscriptions
//             </button>
//             <button
//               onClick={() => setActiveSection("myFavourite")}
//               className={`py-3 px-4 rounded-md text-left ${
//                 activeSection === "myFavourite"
//                   ? "bg-gray-200 my-text"
//                   : "text-gray-700 hover:bg-gray-300"
//               }`}
//             >
//               My Favourites
//             </button>
//             <button
//               onClick={() => setActiveSection("saveSerches")}
//               className={`py-3 px-4 rounded-md text-left ${
//                 activeSection === "saveSerches"
//                   ? "bg-gray-200 my-text"
//                   : "text-gray-700 hover:bg-gray-300"
//               }`}
//             >
//               Saved Searches
//             </button>
//             <button
//               onClick={() => setActiveSection("offers")}
//               className={`py-3 px-4 rounded-md text-left ${
//                 activeSection === "offers"
//                   ? "bg-gray-200 my-text"
//                   : "text-gray-700 hover:bg-gray-300"
//               }`}
//             >
//               Offers
//             </button>
//             <button
//               onClick={handleLogout}
//               className="py-3 px-4 rounded-md text-left text-gray-700 hover:bg-gray-300"
//             >
//               Logout
//             </button>
//           </nav>
//         </aside>

//         {/* Mobile Sidebar Toggle */}
//         <div className="md:hidden bg-gray-800 text-white p-4 flex justify-between items-center">
//           <h2 className="text-xl font-bold">Dashboard</h2>
//           <button
//             className="text-white"
//             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//           >
//             {isSidebarOpen ? (
//               <FaTimes className="text-2xl" />
//             ) : (
//               <FaBars className="text-2xl" />
//             )}
//           </button>
//         </div>

//         {/* Main Content */}
//         <main className="flex-1">
//           {activeSection === "profile" && <Profile />}
//           {activeSection === "myProperties" && <MyProperties />}
//           {activeSection === "myProjects" && <MyProjects />}
//           {activeSection === "myLeads" && <MyLeads />}
//           {activeSection === "myVirtualtour" && <MyVirtualTour />}
//           {activeSection === "mySubscriptions" && <Subscription />}
//           {activeSection === "saveSerches" && <SavedSerches />}
//           {activeSection === "myFavourite" && <MyFavourite />}
//           {activeSection === "offers" && <Offer />}
//         </main>
//       </div>
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white rounded-2xl p-6 w-96 text-center shadow-lg relative">
//             {/* Close (X) Icon */}
//             <button
//               className="absolute top-2 right-2 text-black text-2xl"
//               onClick={() => setShowModal(false)}
//             >
//               <IoCloseCircleOutline />
//             </button>

//             <h2 className="text-2xl font-semibold">Are you sure?</h2>
//             <p className="text-gray-500 mt-2">You will be logged out!</p>

//             <div className="flex justify-center gap-6 mt-4">
//               <button
//                 className="my-bg text-white px-8 py-2 rounded-md"
//                 onClick={confirmLogout}
//               >
//                 Yes, logout!
//               </button>
//               <button
//                 className="bg-white border border-black text-black px-8 py-2 rounded-md"
//                 onClick={() => setShowModal(false)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;


// ===========================
import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

import {
  FiUser,
  FiHome,
  FiBriefcase,
  FiUsers,
  FiVideo,
  FiCreditCard,
  FiHeart,
  FiSearch,
  FiTag,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { IoCloseCircleOutline } from "react-icons/io5";
import Profile from "./Profile";
import MyProperties from "./MyProperties";
import MyProjects from "./MyProjects";
import MyLeads from "./MyLeads";
import MyVirtualTour from "./MyVirtualTour";
import Subscription from "./Subscription";
import SavedSerches from "./SavedSerches";
import MyFavourite from "./MyFavourite";
import Offer from "./Offer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Same items, keys and icons as the profile dropdown in HorizontalNav.
const NAV_ITEMS = [
  { key: "profile", label: "Profile", icon: FiUser },
  { key: "myProperties", label: "My Properties", icon: FiHome },
  { key: "myProjects", label: "My Projects", icon: FiBriefcase, hideFor: "Owner" },
  { key: "myLeads", label: "My Leads", icon: FiUsers },
  { key: "myVirtualtour", label: "My Virtual Tour", icon: FiVideo },
  { key: "mySubscriptions", label: "Subscriptions", icon: FiCreditCard },
  { key: "myFavourite", label: "My Favourites", icon: FiHeart },
  { key: "saveSerches", label: "Saved Searches", icon: FiSearch },
  { key: "offers", label: "Offers", icon: FiTag },
];

// ==========================================================
// Height of the fixed HorizontalNav header.
// HorizontalNav marks its fixed wrapper with data-fixed-header, so we
// measure it here and stick the sidebar / mobile bar just BELOW it
// instead of at top:0 (where they would slide under the navbar).
// ==========================================================
const useFixedHeaderHeight = () => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = document.querySelector("[data-fixed-header]");
    if (!el) return undefined;

    const update = () => setHeight(el.offsetHeight);
    update();

    let observer;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(update);
      observer.observe(el);
    }
    window.addEventListener("resize", update);

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return height;
};

const Dashboard = () => {
  const location = useLocation();
  const history = useHistory();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(
    location.state?.page || "profile",
  );
  const userType = sessionStorage.getItem("user_type");
  const [showModal, setShowModal] = useState(false);
  const headerHeight = useFixedHeaderHeight();

  // Gap between the fixed navbar and the sticky sidebar card.
  const stickyTop = headerHeight + 16;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (location.state?.page) {
      setActiveSection(location.state.page);
    }
  }, [location.state]);

  const handleNavClick = (key) => {
    setActiveSection(key);
    setIsSidebarOpen(false); // close drawer on mobile after selecting
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    setShowModal(true);
  };

  const confirmLogout = () => {
    sessionStorage.clear();
    history.push("/");
    toast.success("Logout Successfully");
    setShowModal(false);
  };

  const navItemClass = (isActive) =>
    `group flex items-center w-full gap-3 py-2.5 px-3 rounded-xl text-left text-[13px] transition-colors duration-150 ${isActive
      ? "bg-[#FDE8EC] text-[#D61F45] font-semibold"
      : "text-gray-700 font-medium hover:bg-[#FFF1F4] hover:text-[#D61F45]"
    }`;

  const iconClass = (isActive) =>
    `text-[17px] flex-shrink-0 ${isActive ? "text-[#D61F45]" : "text-gray-600 group-hover:text-[#D61F45]"
    }`;

  return (
    <div className="min-h-screen bg-[#FFF7F9]">
      {/* Mobile Top Bar — sticks just under the fixed navbar */}
      <div
        className="md:hidden sticky z-40 mx-3 mt-3 bg-white border border-[#FDE8EC] rounded-2xl px-4 py-3 flex justify-between items-center shadow-[0_8px_24px_rgba(214,31,69,0.08)]"
        style={{ top: headerHeight + 8 }}
      >
        <div className="flex items-center gap-2.5">
          <span className="flex items-center justify-center w-9 h-9 text-white rounded-xl bg-gradient-to-br from-[#D61F45] to-[#B91C3C] shadow-[0_6px_14px_rgba(214,31,69,0.35)]">
            <FiHome className="text-base" />
          </span>
          <h2 className="m-0 text-base font-bold text-[#17253a]">Dashboard</h2>
        </div>
        <button
          className="flex items-center justify-center w-9 h-9 text-[#D61F45] bg-[#FDE8EC] rounded-full"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
        >
          {isSidebarOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
        </button>
      </div>

      <div className="flex flex-col gap-4 p-3 md:flex-row md:gap-5 md:p-4 lg:p-5">
        {/* Sidebar — floating white card, like the design */}
        <aside
          className={`w-full md:w-60 flex-shrink-0 md:block md:sticky md:self-start ${isSidebarOpen ? "block" : "hidden"
            }`}
          style={{ top: stickyTop }}
        >
          <div
            className="bg-white border border-[#FDE8EC] rounded-2xl shadow-[0_10px_30px_rgba(214,31,69,0.08)] overflow-y-auto"
            style={{ maxHeight: `calc(100vh - ${stickyTop + 16}px)` }}
          >
            {/* Sidebar Header (desktop) */}
            <div className="hidden md:flex items-center gap-3 px-4 pt-5 pb-4">
              <span className="flex items-center justify-center w-10 h-10 text-white rounded-xl bg-gradient-to-br from-[#D61F45] to-[#B91C3C] shadow-[0_6px_14px_rgba(214,31,69,0.35)]">
                <FiHome className="text-lg" />
              </span>
              <h1 className="m-0 text-[16px] font-bold text-[#17253a]">Dashboard</h1>
            </div>

            <nav className="flex flex-col gap-1 px-3 pb-4 pt-3 md:pt-0">
              {NAV_ITEMS.filter((item) => item.hideFor !== userType).map(
                ({ key, label, icon: Icon }) => {
                  const isActive = activeSection === key;
                  return (
                    <button
                      key={key}
                      onClick={() => handleNavClick(key)}
                      className={navItemClass(isActive)}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <Icon className={iconClass(isActive)} />
                      <span>{label}</span>
                    </button>
                  );
                },
              )}

              <div className="my-2 border-t border-[#FDE8EC]" />

              <button onClick={handleLogout} className={navItemClass(false)}>
                <FiLogOut className={iconClass(false)} />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {activeSection === "profile" && <Profile />}
          {activeSection === "myProperties" && <MyProperties />}
          {activeSection === "myProjects" && <MyProjects />}
          {activeSection === "myLeads" && <MyLeads />}
          {activeSection === "myVirtualtour" && <MyVirtualTour />}
          {activeSection === "mySubscriptions" && <Subscription />}
          {activeSection === "saveSerches" && <SavedSerches />}
          {activeSection === "myFavourite" && <MyFavourite />}
          {activeSection === "offers" && <Offer />}
        </main>
      </div>

      {/* Logout Confirmation Modal — same as HorizontalNav */}
      {showModal && (
        <div className="fixed inset-0 z-[1100] flex items-center justify-center px-4 bg-black bg-opacity-50">
          <div className="relative w-full max-w-sm p-6 text-center bg-white shadow-xl rounded-2xl">
            <button
              className="absolute text-2xl text-gray-400 top-3 right-3 hover:text-[#D61F45]"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              <IoCloseCircleOutline />
            </button>

            <div className="flex items-center justify-center mx-auto mb-3 rounded-full w-14 h-14 bg-[#FDE8EC]">
              <FiLogOut className="text-2xl text-[#D61F45]" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Are you sure?</h2>
            <p className="mt-1 text-sm text-gray-500">You will be logged out!</p>

            <div className="flex justify-center gap-3 mt-5">
              <button
                className="px-6 py-2 font-medium text-white rounded-lg shadow bg-[#D61F45] hover:bg-[#B91C3C] transition-colors"
                onClick={confirmLogout}
              >
                Yes, logout!
              </button>
              <button
                className="px-6 py-2 font-medium bg-white border rounded-lg border-[#FAD3DB] text-[#D61F45] hover:bg-[#FDE8EC] transition-colors"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;