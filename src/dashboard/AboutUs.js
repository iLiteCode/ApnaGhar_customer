// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const AboutUs = () => {
//   const [content, setContent] = useState("");
//   const [loading, setLoading] = useState(true); // optional loading state
//   const [error, setError] = useState("");

//   useEffect(() => {
//     window.scrollTo(0, 0);

//     const fetchAboutUs = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_API_URL}/cust_api/get-about-us`,
//         );
//         if (
//           response.data.status === 1 &&
//           Array.isArray(response.data.data) &&
//           response.data.data.length > 0
//         ) {
//           setContent(response.data.data[0].content);
//         } else {
//           setContent("<p>No content available.</p>");
//         }
//       } catch (err) {
//         console.error("Error fetching About Us content:", err);
//         setError("Failed to load content.");
//         setContent("<p>Failed to load content.</p>");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAboutUs();
//   }, []);

//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Navbar */}
//       <nav className="items-center justify-between hidden w-full p-4 px-20 text-black bg-gray-100 md:flex">
//         <h1 className="text-xl">About Us</h1>
//         <div className="flex items-center gap-4">
//           <div className="text-sm text-gray-500">
//             <Link
//               to="/"
//               className="text-gray-500 no-underline hover:no-underline hover:text-gray-700"
//             >
//               Home
//             </Link>
//             <span className="mx-1">›</span>
//             <span className="font-medium my-text">Dashboard</span>
//           </div>
//         </div>
//       </nav>

//       {/* Content */}
//       <div className="p-6 md:px-20">
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <div
//             className="prose text-gray-700 max-w-none"
//             dangerouslySetInnerHTML={{ __html: content }}
//           />
//         )}
//         {error && <p className="mt-2 text-red-500">{error}</p>}
//       </div>
//     </div>
//   );
// };

// export default AboutUs;





// =================================================

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// ---------------- Default ApnaGhar content ----------------
// Shown when the Admin Panel has no About Us content yet, or the API fails.

const SERVICES = [
  'Residential Buy',
  'Residential Rent',
  'Commercial Buy',
  'Commercial Rent',
  'Builder Projects',
  'New Launch Projects',
  'Free Property Posting',
  'Virtual Property Tours',
  'Video Property Viewing',
  'Smart Property Search',
  'Map-Based Property Search',
  'Nearby Connectivity (Metro, Bus, Roads, Railway & Airports)',
  'Verified Properties',
  'Verified Owners & Builders',
  'Saved & Favourite Properties',
  'Recommended Properties',
  'Direct Owner Enquiries',
  'Exclusive Offers',
  'Premium Property Plans',
  'Mobile App for Android & iOS',
  'Professional Customer Support',
];

const WHY_CHOOSE = [
  'Verified Properties',
  'Verified Owners & Builders',
  'Free Property Posting',
  'Virtual Tours',
  'Smart Map Search',
  'Nearby Connectivity Details',
  'Direct Contact, No Middlemen',
  'Secure Platform',
  'Transparent Process',
  'Professional Customer Support',
];

const Label = ({ children }) => (
  <strong className="font-bold text-gray-800">
    <em>{children}</em>
  </strong>
);

const DefaultAboutContent = () => (
  <>
    <h2 className="mb-2 text-2xl font-bold text-gray-800 md:text-[26px]">About ApnaGhar</h2>

    <p className="mb-4">
      <Label>Company Overview:</Label> ApnaGhar is a technology-driven real estate platform that helps
      property buyers, tenants, owners, builders, and commercial property seekers connect directly through a
      secure, transparent, and easy-to-use digital marketplace.
    </p>

    <p className="mb-4">
      Our goal is to make finding, buying, renting, and selling property simple, by offering verified
      listings, smart search, virtual property tours, nearby connectivity details, and direct enquiries with
      property owners and builders.
    </p>

    <p className="mb-4">
      <Label>Our Mission:</Label> To make real estate transactions transparent, efficient, and accessible by
      connecting genuine property owners, builders, and customers through technology.
    </p>

    <p className="mb-4">
      <Label>Our Vision:</Label> To become India's most trusted home-finding platform, helping every family
      find their perfect home through verified listings, innovative technology, and exceptional customer
      service. <em>Find. Buy. Rent. Live Better.</em>
    </p>

    <p className="mb-3">
      <Label>Our Services:-</Label>
    </p>
    <p className="mb-4 pl-4 md:pl-7">{SERVICES.join(' • ')}</p>

    <p className="mb-3">
      <Label>Why Choose ApnaGhar ?</Label>
    </p>
    <p className="mb-4 pl-4 md:pl-7">"{WHY_CHOOSE.join(' • ')}"</p>
  </>
);

// Tailwind's reset removes heading/paragraph/blockquote styles from HTML that
// comes from the admin editor, so they are added back here (only inside .about-content).
const aboutStyles = `
  .about-content h1, .about-content h2 { font-size: 26px; font-weight: 700; color: #1f2937; margin: 0 0 8px; }
  .about-content h3 { font-size: 20px; font-weight: 700; color: #1f2937; margin: 18px 0 8px; }
  .about-content p { margin: 0 0 16px; }
  .about-content strong { color: #1f2937; font-weight: 700; }
  .about-content blockquote { margin: 0 0 16px; padding-left: 28px; }
  .about-content ul { list-style: disc; padding-left: 28px; margin: 0 0 16px; }
  .about-content ol { list-style: decimal; padding-left: 28px; margin: 0 0 16px; }
  .about-content a { color: #D61F45; text-decoration: underline; }
  @media (max-width: 767px) {
    .about-content h1, .about-content h2 { font-size: 24px; }
    .about-content blockquote, .about-content ul, .about-content ol { padding-left: 16px; }
  }
`;

// ---------------- Page ----------------

const Aboutus = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/cust_api/get-about-us`);
        if (response.data.status === 1) {
          // Content is in the data array
          const apiContent = response.data.data?.[0]?.content || '';
          setContent(apiContent.trim());
        }
      } catch (error) {
        // No error screen: the default ApnaGhar content is shown instead.
        console.error('About Us fetch failed:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <style>{aboutStyles}</style>

      {/* ---------- Title bar ---------- */}
      <div className="bg-gray-100">
        <div className="flex items-center justify-between px-4 py-5 md:px-6">
          <h1 className="m-0 text-lg font-semibold text-gray-900 md:text-xl">About Us</h1>
          <nav className="text-sm text-gray-500" aria-label="Breadcrumb">
            <Link to="/" className="text-gray-500 no-underline hover:text-[#D61F45]">
              Home
            </Link>
            <span className="mx-1">›</span>
            <span className="font-medium text-[#D61F45]">About Us</span>
          </nav>
        </div>
      </div>

      {/* ---------- Content ---------- */}
      <div className="about-content px-4 py-6 text-[15px] leading-relaxed text-gray-700 md:px-16 md:py-8">
        {loading ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-7 w-64 rounded bg-gray-200" />
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-5/6 rounded bg-gray-200" />
            <div className="h-4 w-4/6 rounded bg-gray-200" />
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-3/4 rounded bg-gray-200" />
          </div>
        ) : content ? (
          <div dangerouslySetInnerHTML={{ __html: content }} />
        ) : (
          <DefaultAboutContent />
        )}
      </div>
    </div>
  );
};

export default Aboutus;