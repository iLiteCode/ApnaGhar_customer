// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const FAQ = () => {
//   const [content, setContent] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     window.scrollTo(0, 0);

//     const fetchFAQ = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_API_URL}/cust_api/get-faqs`,
//         );
//         if (
//           response.data.status === 1 &&
//           Array.isArray(response.data.data) &&
//           response.data.data.length > 0
//         ) {
//           setContent(response.data.data[0].content);
//         } else {
//           setContent("<p>No FAQs available.</p>");
//         }
//       } catch (err) {
//         console.error("Error fetching FAQ content:", err);
//         setError("Failed to load FAQ content.");
//         setContent("<p>Failed to load FAQ content.</p>");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFAQ();
//   }, []);

//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Navbar */}
//       <nav className="items-center justify-between hidden w-full p-4 px-20 text-black bg-gray-100 md:flex">
//         <h1 className="text-xl">Frequently Asked Questions</h1>
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

//       {/* FAQ Content */}
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

// export default FAQ;



// =========================================================


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// ---------------- Default ApnaGhar FAQs ----------------
// Shown when the Admin Panel has no FAQ content yet, or the API fails.

const DEFAULT_FAQS = [
  {
    q: "What is ApnaGhar?",
    a: "ApnaGhar is a technology-driven real estate platform where buyers, tenants, property owners and builders connect directly to buy, rent and sell residential and commercial properties.",
  },
  {
    q: "Is it free to search for properties on ApnaGhar?",
    a: "Yes. Searching and viewing property listings on ApnaGhar is free for buyers and tenants.",
  },
  {
    q: "How do I post my property?",
    a: "Click “Post Property” at the top of the website, log in with your mobile number, and fill in your property details, price, photos and location. Your listing goes live after review.",
  },
  {
    q: "Can I post my property for free?",
    a: "Yes, basic property posting is free. Premium Property Plans are also available if you want more visibility and enquiries for your listing.",
  },
  {
    q: "Who can post a property?",
    a: "Property owners, builders and developers can post properties for sale or rent, including residential homes, plots, and commercial spaces.",
  },
  {
    q: "How do I contact a property owner or builder?",
    a: "Open the property details page and use the enquiry form or the contact option. Your enquiry is sent directly to the owner or builder.",
  },
  {
    q: "What does “Verified Property” mean?",
    a: "Verified properties and owners have been checked by the ApnaGhar team. We still recommend visiting the property and checking all documents yourself before making any payment.",
  },
  {
    q: "What is a Virtual Tour?",
    a: "A Virtual Tour lets you view a property online through a scheduled video tour, so you can see the property before visiting it in person.",
  },
  {
    q: "What is Nearby Connectivity on the property page?",
    a: "It shows the metro stations, bus stops, main roads, railway stations and airports near the property, with distances and Google Maps directions.",
  },
  {
    q: "How do I save a property I like?",
    a: "Tap the heart icon on any property to add it to your favourites. You can see all your saved properties after logging in.",
  },
  {
    q: "Is there an ApnaGhar mobile app?",
    a: "Yes. Click “Download App” at the top of the website to get the ApnaGhar app for Android or iOS.",
  },
  {
    q: "How can I contact ApnaGhar support?",
    a: "You can reach our customer support team through the Contact Us page. We are happy to help with listings, enquiries, plans and account questions.",
  },
];

const FaqItem = ({ item, open, onToggle }) => (
  <div
    className={`border rounded-xl transition-all ${open ? "border-[#D61F45] shadow-[0_6px_18px_rgba(214,31,69,0.08)]" : "border-gray-200"
      }`}
  >
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      className="flex items-center justify-between w-full gap-4 px-4 py-3.5 text-left md:px-5"
    >
      <span className={`text-[15px] font-semibold ${open ? "text-[#D61F45]" : "text-gray-800"}`}>
        {item.q}
      </span>
      <span
        className={`flex items-center justify-center flex-shrink-0 w-7 h-7 text-lg leading-none rounded-full transition-transform ${open ? "rotate-45 bg-[#D61F45] text-white" : "bg-gray-100 text-gray-600"
          }`}
        aria-hidden="true"
      >
        +
      </span>
    </button>
    {open && <p className="px-4 pb-4 m-0 text-[14.5px] leading-relaxed text-gray-600 md:px-5">{item.a}</p>}
  </div>
);

const DefaultFAQContent = () => {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <>
      <h2 className="mb-1 text-2xl font-bold text-gray-800 md:text-[26px]">ApnaGhar FAQs</h2>
      <p className="mb-5 text-gray-500">Answers to the most common questions about buying, renting and posting property on ApnaGhar.</p>
      <div className="space-y-3">
        {DEFAULT_FAQS.map((item, i) => (
          <FaqItem key={item.q} item={item} open={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? -1 : i)} />
        ))}
      </div>
    </>
  );
};

// Tailwind's reset removes heading/paragraph/list styles from HTML that comes
// from the admin editor, so they are added back here (only inside .faq-content).
const faqStyles = `
  .faq-content h1, .faq-content h2 { font-size: 26px; font-weight: 700; color: #1f2937; margin: 0 0 12px; }
  .faq-content h3, .faq-content h4 { font-size: 17px; font-weight: 700; color: #1f2937; margin: 20px 0 6px; }
  .faq-content p { margin: 0 0 14px; }
  .faq-content strong { color: #1f2937; font-weight: 700; }
  .faq-content ul { list-style: disc; padding-left: 28px; margin: 0 0 14px; }
  .faq-content ol { list-style: decimal; padding-left: 28px; margin: 0 0 14px; }
  .faq-content blockquote { margin: 0 0 14px; padding-left: 28px; }
  .faq-content a { color: #D61F45; text-decoration: underline; }
  @media (max-width: 767px) {
    .faq-content h1, .faq-content h2 { font-size: 24px; }
    .faq-content ul, .faq-content ol, .faq-content blockquote { padding-left: 16px; }
  }
`;

// ---------------- Page ----------------

const FAQ = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchFAQ = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/cust_api/get-faqs`);
        if (
          response.data.status === 1 &&
          Array.isArray(response.data.data) &&
          response.data.data.length > 0
        ) {
          setContent((response.data.data[0].content || "").trim());
        }
      } catch (err) {
        // No error screen: the default ApnaGhar FAQs are shown instead.
        console.error("Error fetching FAQ content:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQ();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <style>{faqStyles}</style>

      {/* ---------- Title bar (now also visible on mobile) ---------- */}
      <nav className="flex items-center justify-between w-full gap-3 px-4 py-5 text-black bg-gray-100 md:px-20">
        <h1 className="m-0 text-lg font-semibold md:text-xl">Frequently Asked Questions</h1>
        <div className="flex-shrink-0 text-sm text-gray-500">
          <Link to="/" className="text-gray-500 no-underline hover:no-underline hover:text-[#D61F45]">
            Home
          </Link>
          <span className="mx-1">›</span>
          <span className="font-medium text-[#D61F45]">FAQs</span>
        </div>
      </nav>

      {/* ---------- FAQ Content ---------- */}
      <div className="faq-content px-4 py-6 text-[15px] leading-relaxed text-gray-700 md:px-20 md:py-8">
        {loading ? (
          <div className="space-y-3 animate-pulse">
            <div className="h-7 w-56 rounded bg-gray-200" />
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-12 w-full rounded-xl bg-gray-100" />
            ))}
          </div>
        ) : content ? (
          <div className="max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
        ) : (
          <DefaultFAQContent />
        )}
      </div>
    </div>
  );
};

export default FAQ;