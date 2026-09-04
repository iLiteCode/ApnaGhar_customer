// import React, { useEffect, useState } from "react";
// import {
//   FaFacebookF,
//   FaYoutube,
//   FaLinkedinIn,
//   FaInstagram,
//   FaXTwitter,
// } from "react-icons/fa6";
// import axios from "axios";
// import { FaHouse } from "react-icons/fa";
// import { useHistory } from "react-router-dom";
// import { Link } from "react-router-dom";

// const Footer = () => {
//   const history = useHistory();

//   const handleNavigation = (path) => {
//     history.push(path);
//   };

//   const handleCityClick = (cityName) => {
//     window.scrollTo(0, 0);
//     history.push(`/citywiseproperties/${cityName}`);
//   };


//   const [socialLinks, setSocialLinks] = useState({
//     facebook: "#",
//     youtube: "#",
//     linkedin: "#",
//     instagram: "#",
//     appstore: "#",
//     playstore: "#",
//     twitter: "#",
//   });

//   useEffect(() => {
//     const fetchSettings = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_API_URL}/cust_api/get_setting`
//         );
//         if (response.data.status === 1 && response.data.data.length > 0) {
//           const data = response.data.data[0];
//           setSocialLinks({
//             facebook: data.facebook || "#",
//             youtube: data.youtube || "#",
//             linkedin: data.linkedin || "#",
//             instagram: data.instagram || "#",
//             appstore: data.appstore || "#",
//             playstore: data.playstore || "#",
//             twitter: data.twitter || "#",
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching social links:", error);
//       }
//     };
//     fetchSettings();
//   }, []);

//   const icons = [
//     { icon: FaFacebookF, link: socialLinks.facebook },
//     { icon: FaYoutube, link: socialLinks.youtube },
//     { icon: FaLinkedinIn, link: socialLinks.linkedin },
//     { icon: FaInstagram, link: socialLinks.instagram },
//     { icon: FaXTwitter, link: socialLinks.twitter }, // Twitter not in API response
//   ];

//   return (
//     <footer
//       className="w-full py-6 overflow-x-hidden bg-white shadow-sm"
//       style={{ boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)" }}
//     >
//       <div className="w-full max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
//         {/* Top Section */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 pb-8 border-b border-gray-300">
//           {/* Company Info */}
//           <div className="flex flex-col items-center text-center sm:items-start sm:text-left sm:col-span-2 lg:col-span-5">
//             <img
//               src="/image/app.png"
//               alt="NoWayBroker Logo"
//               className="object-cover w-20 h-16 mb-4 sm:w-24 sm:h-20"
//             />
//             <p className="text-gray-500 text-[15px] sm:text-[17px] leading-relaxed max-w-md">
//               We offer full-stack services for all real estate needs,
//               including home loans, pay rent, packers and movers, legal
//               assistance, property valuation, and expert advice.
//             </p>
//           </div>

//           {/* Company Links */}
//           <div className="flex flex-col items-center text-center sm:items-start sm:text-left lg:col-span-2">
//             <h3 className="text-gray-700 text-[17px] sm:text-[18px] font-semibold mb-4 sm:ml-4">
//               COMPANY
//             </h3>
//             <ul className="space-y-3">
//               <li>
//                 <span
//                   onClick={() => handleNavigation("/about-us")}
//                   className="text-gray-500 hover:text-gray-700 text-[15px] sm:text-[17px] font-medium no-underline hover:no-underline cursor-pointer"
//                 >
//                   About
//                 </span>
//               </li>
//               <li>
//                 <span
//                   onClick={() => handleNavigation("/faq")}
//                   className="text-gray-500 hover:text-gray-700 text-[15px] sm:text-[17px] font-medium no-underline hover:no-underline cursor-pointer"
//                 >
//                   FAQ
//                 </span>
//               </li>
//               <li>
//                 <span
//                   onClick={() => handleNavigation("/contact")}
//                   className="text-gray-500 hover:text-gray-700 text-[15px] sm:text-[17px] font-medium no-underline hover:no-underline cursor-pointer"
//                 >
//                   Contact Us
//                 </span>
//               </li>

//               <li>
//                 <span
//                   onClick={() => handleNavigation("/nri")}
//                   className="text-gray-500 hover:text-gray-700 text-[15px] sm:text-[17px] font-medium no-underline hover:no-underline cursor-pointer"
//                 >
//                   NRIPage
//                 </span>
//               </li>
//             </ul>
//           </div>

//           {/* Properties in India */}
//           <div className="sm:col-span-2 lg:col-span-5">
//             <h3 className="text-gray-700 text-[17px] sm:text-[18px] font-semibold mb-4 text-center sm:text-left">
//               PROPERTIES IN INDIA
//             </h3>
//             <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
//               {[
//                 "Ahmedabad",
//                 "Bengaluru",
//                 "Chennai",
//                 "Delhi",
//                 "Hyderabad",
//                 "Kolkata",
//                 "Mumbai",
//                 "Pune",
//               ].map((city) => (
//                 <button
//                   key={city}
//                   onClick={() => handleCityClick(city)}
//                   className="text-left text-gray-500 hover:text-gray-700 text-[15px] sm:text-[17px] font-medium hover:no-underline no-underline whitespace-nowrap"
//                 >
//                   Property in {city}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//         {/* Middle Section */}
//         <div className="flex flex-col items-center justify-between py-8 border-b border-gray-300 md:flex-row">
//           <div className="flex flex-col items-center mb-6 md:items-start md:mb-0">
//             <h4 className="text-gray-700 text-[18px] font-semibold mb-4">
//               DOWNLOAD MOBILE APP
//             </h4>
//             <div className="flex space-x-4">
//               <a
//                 // href={socialLinks.playstore}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <img
//                   src="/image/abc.jpg"
//                   alt="Google Play"
//                   className="object-cover h-12 rounded-lg"
//                 />
//               </a>
//               <a
//                 //href={socialLinks.appstore}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <img
//                   src="/image/apl.png"
//                   alt="App Store"
//                   className="object-cover h-12 rounded-lg"
//                 />
//               </a>
//             </div>
//             <div className="flex items-center mb-6 md:mb-0">
//               <img
//                 src="/image/qrbar.jpg"
//                 alt="QR Code"
//                 className="object-cover h-24"
//               />
//               <p className="text-[17px] text-gray-600 ml-4 break-words">
//                 Scan the QR code to download the app.
//               </p>
//             </div>
//           </div>

//           {/* Social Links */}
//           <div className="flex flex-col items-center md:items-start">
//             <h4 className="text-gray-700 text-[18px] font-semibold mb-4">
//               WE IN SOCIAL
//             </h4>
//             <div className="flex space-x-4">
//               {icons.map(({ icon: Icon, link }, index) => (
//                 <a
//                   key={index}
//                   href={link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="p-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700"
//                 >
//                   <Icon size={20} />
//                 </a>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Bottom Section */}
//         <div className="flex flex-col items-center justify-between gap-4 py-4 text-center sm:flex-row sm:text-left sm:gap-2">
//           <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
//             <img src="/image/app.png" alt="ApnaGhar Logo" className="w-9 sm:w-11" />
//             <span className="text-xs sm:text-sm text-gray-500">
//               © 2026  APNAGHAR ALL RIGHTS RESERVED
//             </span>
//           </div>
//           <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
//             <Link
//               to="/privacy-policy"
//               className="text-xs text-gray-500 no-underline hover:text-gray-700 hover:no-underline whitespace-nowrap"
//             >
//               PRIVACY POLICY
//             </Link>
//             <Link
//               to="/terms-conditions"
//               className="text-xs text-gray-500 no-underline hover:text-gray-700 hover:no-underline whitespace-nowrap"
//             >
//               TERMS OF SERVICE
//             </Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import React, { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
  FaInstagram,
  FaXTwitter,
  FaLocationDot,
} from "react-icons/fa6";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

const Footer = () => {
  const history = useHistory();

  /* ================= NAVIGATION ================= */

  const handleNavigation = (path) => {
    window.scrollTo(0, 0);
    history.push(path);
  };

  const handleCityClick = (cityName) => {
    window.scrollTo(0, 0);
    history.push(`/citywiseproperties/${cityName}`);
  };

  /* ================= SOCIAL LINKS ================= */

  const [socialLinks, setSocialLinks] = useState({
    facebook: "#",
    youtube: "#",
    linkedin: "#",
    instagram: "#",
    appstore: "#",
    playstore: "#",
    twitter: "#",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/cust_api/get_setting`
        );

        if (
          response.data.status === 1 &&
          response.data.data.length > 0
        ) {
          const data = response.data.data[0];

          setSocialLinks({
            facebook: data.facebook || "#",
            youtube: data.youtube || "#",
            linkedin: data.linkedin || "#",
            instagram: data.instagram || "#",
            appstore: data.appstore || "#",
            playstore: data.playstore || "#",
            twitter: data.twitter || "#",
          });
        }
      } catch (error) {
        console.error("Error fetching social links:", error);
      }
    };

    fetchSettings();
  }, []);

  /* ================= SOCIAL ICONS ================= */

  const icons = [
    {
      icon: FaFacebookF,
      link: socialLinks.facebook,
    },
    {
      icon: FaYoutube,
      link: socialLinks.youtube,
    },
    {
      icon: FaLinkedinIn,
      link: socialLinks.linkedin,
    },
    {
      icon: FaInstagram,
      link: socialLinks.instagram,
    },
    {
      icon: FaXTwitter,
      link: socialLinks.twitter,
    },
  ];

  /* ================= CITIES ================= */

  const cities = [
    "Ahmedabad",
    "Bengaluru",
    "Chennai",
    "Delhi",
    "Hyderabad",
    "Kolkata",
    "Mumbai",
    "Pune",
  ];

  return (
    <footer style={styles.footer}>

      {/* =====================================================
          TOP FOOTER
      ===================================================== */}

      <div style={styles.footerTop}>

        {/* ================= LOGO + DESCRIPTION ================= */}

        <div style={styles.footerAbout}>

          <div style={styles.logoBox}>
            <img
              src="/image/app.png"
              alt="ApnaGhar Logo"
              style={styles.logo}
            />
          </div>

          <p style={styles.aboutText}>
            We offer full-stack services for all real estate needs,
            including home loans, pay rent, packers and movers, legal
            assistance, property valuation, and expert advice.
          </p>

        </div>


        {/* ================= COMPANY ================= */}

        <div>

          <h3 style={styles.heading}>
            COMPANY
          </h3>

          <ul style={styles.companyList}>

            <li style={styles.companyItem}>
              <span style={styles.arrow}>›</span>

              <span
                onClick={() => handleNavigation("/about-us")}
                style={styles.companyLink}
              >
                About
              </span>
            </li>

            <li style={styles.companyItem}>
              <span style={styles.arrow}>›</span>

              <span
                onClick={() => handleNavigation("/faq")}
                style={styles.companyLink}
              >
                FAQ
              </span>
            </li>

            <li style={styles.companyItem}>
              <span style={styles.arrow}>›</span>

              <span
                onClick={() => handleNavigation("/contact")}
                style={styles.companyLink}
              >
                Contact Us
              </span>
            </li>

            <li style={styles.companyItem}>
              <span style={styles.arrow}>›</span>

              <span
                onClick={() => handleNavigation("/nri")}
                style={styles.companyLink}
              >
                NRI Page
              </span>
            </li>

          </ul>

        </div>


        {/* ================= PROPERTIES IN INDIA ================= */}

        <div>

          <h3 style={styles.heading}>
            PROPERTIES IN INDIA
          </h3>

          <div style={styles.propertyGrid}>

            {cities.map((city) => (
              <button
                key={city}
                onClick={() => handleCityClick(city)}
                style={styles.propertyButton}
              >
                <FaLocationDot style={styles.locationIcon} />

                <span>
                  Property in {city}
                </span>
              </button>
            ))}

          </div>

        </div>

      </div>


      {/* =====================================================
          MIDDLE FOOTER
      ===================================================== */}

      <div style={styles.footerMiddle}>

        {/* ================= DOWNLOAD APP ================= */}

        <div>

          <h3 style={styles.heading}>
            DOWNLOAD MOBILE APP
          </h3>

          <div style={styles.yellowLine}></div>

          <div style={styles.appButtons}>

            {/* Google Play */}

            <a
              href={socialLinks.playstore}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/image/abc.jpg"
                alt="Google Play"
                style={styles.appImage}
              />
            </a>

            {/* App Store */}

            <a
              href={socialLinks.appstore}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/image/apl.png"
                alt="App Store"
                style={styles.appImage}
              />
            </a>

          </div>

          {/* QR */}

          <div style={styles.qrSection}>

            <img
              src="/image/qrbar.jpg"
              alt="QR Code"
              style={styles.qrCode}
            />

            <span style={styles.qrText}>
              Scan the QR code to download the app.
            </span>

          </div>

        </div>


        {/* ================= CONTACT US ================= */}

        <div>

          <h3 style={styles.heading}>
            CONTACT US
          </h3>

          <div style={styles.yellowLine}></div>

          <p style={styles.contactText}>
            <strong>Toll Free -</strong>{" "}
            +91 8600199570
          </p>

          <span style={styles.timing}>
            9:30 AM to 6:30 PM (Mon-Sun)
          </span>

          <p style={styles.email}>
            <strong>Email -</strong>{" "}
            support@apnaghar.com
          </p>

        </div>


        {/* ================= FOLLOW US ================= */}

        <div>

          <h3 style={styles.heading}>
            FOLLOW US
          </h3>

          <div style={styles.yellowLine}></div>

          <div style={styles.socialIcons}>

            {icons.map(({ icon: Icon, link }, index) => (

              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.socialIcon}
              >
                <Icon size={18} />
              </a>

            ))}

          </div>

        </div>

      </div>


      {/* =====================================================
          BOTTOM FOOTER
      ===================================================== */}

      <div style={styles.footerBottom}>

        {/* Copyright */}

        <div style={styles.copyright}>

          <img
            src="/image/app.png"
            alt="ApnaGhar Logo"
            style={styles.bottomLogo}
          />

          <span style={styles.copyrightText}>
            © 2026 APNAGHAR ALL RIGHTS RESERVED
          </span>

        </div>


        {/* Privacy + Terms */}

        <div style={styles.legalLinks}>

          <Link
            to="/privacy-policy"
            style={styles.legalLink}
          >
            PRIVACY POLICY
          </Link>

          <Link
            to="/terms-conditions"
            style={styles.legalLink}
          >
            TERMS OF SERVICE
          </Link>

        </div>

      </div>

    </footer>
  );
};


/* =====================================================
   STYLES
   DESIGN ONLY FROM YOUR SECOND CODE
===================================================== */

const styles = {

  /* ================= FOOTER ================= */

  footer: {
    width: "100%",
    background: "#ffffff",
    color: "#53657d",
    fontFamily: "Arial, Helvetica, sans-serif",
    borderTop: "1px solid #eeeeee",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },


  /* ================= TOP SECTION ================= */

  footerTop: {
    display: "grid",
    gridTemplateColumns: "1.4fr 0.7fr 2.2fr",
    gap: "55px",
    padding: "35px 50px 28px",
    borderBottom: "1px solid #dddddd",
  },


  /* ================= ABOUT ================= */

  footerAbout: {
    display: "flex",
    alignItems: "center",
    gap: "30px",
  },

  logoBox: {
    minWidth: "105px",
    height: "100px",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    borderRight: "1px solid #d5d5d5",
    paddingRight: "20px",
  },

  logo: {
    width: "70px",
    height: "auto",
    objectFit: "contain",
  },

  aboutText: {
    margin: 0,
    maxWidth: "420px",
    fontSize: "14px",
    lineHeight: "1.7",
    color: "#68788f",
  },


  /* ================= HEADINGS ================= */

  heading: {
    margin: "0 0 15px",
    fontSize: "15px",
    fontWeight: 600,
    color: "#243b5a",
    letterSpacing: "0.2px",
  },


  /* ================= COMPANY ================= */

  companyList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
  },

  companyItem: {
    marginBottom: "9px",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
  },

  arrow: {
    color: "#d3a23b",
    fontSize: "20px",
    marginRight: "8px",
    lineHeight: 1,
  },

  companyLink: {
    color: "#53657d",
    textDecoration: "none",
    cursor: "pointer",
    fontSize: "14px",
  },


  /* ================= PROPERTY ================= */

  propertyGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    columnGap: "30px",
    rowGap: "15px",
  },

  propertyButton: {
    display: "flex",
    alignItems: "flex-start",
    gap: "8px",

    padding: 0,
    margin: 0,

    border: "none",
    background: "transparent",

    color: "#53657d",
    fontSize: "14px",
    lineHeight: "1.4",

    cursor: "pointer",
    textAlign: "left",
  },

  locationIcon: {
    flexShrink: 0,
    marginTop: "2px",
    fontSize: "12px",
    color: "#d39f2e",
  },


  /* ================= MIDDLE ================= */

  footerMiddle: {
    display: "grid",
    gridTemplateColumns: "1.2fr 1.3fr 1.2fr",
    gap: "60px",
    padding: "16px 50px 22px",
  },


  /* ================= YELLOW LINE ================= */

  yellowLine: {
    width: "36px",
    height: "3px",
    background: "#d5a02e",
    marginBottom: "9px",
  },


  /* ================= APP ================= */

  appButtons: {
    display: "flex",
    gap: "20px",
    marginTop: "9px",
  },

  appImage: {
    width: "100px",
    height: "auto",
    display: "block",
    objectFit: "cover",
    borderRadius: "5px",
  },

  qrSection: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginTop: "14px",
  },

  qrCode: {
    width: "55px",
    height: "55px",
    objectFit: "contain",
  },

  qrText: {
    fontSize: "13px",
    color: "#68788f",
  },


  /* ================= CONTACT ================= */

  contactText: {
    margin: "10px 0 0",
    fontSize: "14px",
    color: "#53657d",
  },

  timing: {
    display: "block",
    marginTop: "8px",
    fontSize: "12px",
    color: "#7b8798",
  },

  email: {
    marginTop: "18px",
    fontSize: "14px",
    color: "#53657d",
  },


  /* ================= SOCIAL ================= */

  socialIcons: {
    display: "flex",
    gap: "8px",
    marginTop: "5px",
  },

  socialIcon: {
    width: "35px",
    height: "35px",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    border: "1px solid #dfe3e8",
    borderRadius: "5px",

    color: "#536274",
    background: "#ffffff",

    textDecoration: "none",
  },


  /* ================= BOTTOM ================= */

  footerBottom: {
    borderTop: "1px solid #dddddd",
    minHeight: "65px",
    padding: "0 30px",

    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  copyright: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },

  bottomLogo: {
    width: "22px",
    height: "22px",
    objectFit: "contain",
  },

  copyrightText: {
    fontSize: "12px",
    color: "#718096",
  },

  legalLinks: {
    display: "flex",
    alignItems: "center",
    gap: "25px",
  },

  legalLink: {
    textDecoration: "none",
    color: "#68788f",
    fontSize: "12px",
  },
};

export default Footer;