// import React, { useEffect, useState } from "react";
// import {
//   FaFacebookF,
//   FaXTwitter,
//   FaInstagram,
//   FaWhatsapp
// } from "react-icons/fa6";
// import axios from "axios";
// import { useHistory, Link } from "react-router-dom";

// const Footer = () => {
//   const history = useHistory();

//   /* ================= NAVIGATION ================= */

//   const handleNavigation = (path) => {
//     window.scrollTo(0, 0);
//     history.push(path);
//   };

//   const handleCityClick = (cityName) => {
//     window.scrollTo(0, 0);
//     history.push(`/citywiseproperties/${cityName}`);
//   };

//   /* ================= SOCIAL LINKS ================= */

//   const [socialLinks, setSocialLinks] = useState({
//     facebook: "#",
//     instagram: "#",
//     appstore: "#",
//     playstore: "#",
//     twitter: "#",
//     whatsapp: "#",
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
//             instagram: data.instagram || "#",
//             appstore: data.appstore || "#",
//             playstore: data.playstore || "#",
//             twitter: data.twitter || "#",
//             whatsapp: data.whatsapp || "#",
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching social links:", error);
//       }
//     };

//     fetchSettings();
//   }, []);

//   /* ================= SOCIAL ICONS ================= */

//   const icons = [
//     { icon: FaFacebookF, link: socialLinks.facebook },
//     { icon: FaXTwitter, link: socialLinks.twitter },
//     { icon: FaInstagram, link: socialLinks.instagram },
//     { icon: FaWhatsapp, link: socialLinks.whatsapp },
//   ];

//   /* ================= LINK COLUMNS ================= */

//   const companyLinks = [
//     { label: "About", path: "/about-us" },
//     { label: "Blog", path: "/blog" },
//     { label: "Careers", path: "/careers" },
//     { label: "Contact Us", path: "/contact" },
//     { label: "FAQs", path: "/faq" },
//   ];

//   const cities = [
//     "Ahmedabad",
//     "Bengaluru",
//     "Chennai",
//     "Hyderabad",
//     "Kolkata",
//     "Mumbai",
//     "Pune",
//   ];

//   return (
//     <footer style={styles.footer}>
//       {/* =====================================================
//           TOP FOOTER
//       ===================================================== */}
//       <div style={styles.footerTop}>
//         {/* ================= LOGO + DESCRIPTION ================= */}
//         <div style={styles.footerAbout}>
//           <div style={styles.brandRow}>
//             <div style={styles.logoBox}>A</div>
//             <span style={styles.brandName}>ApnaGhar</span>
//           </div>

//           <p style={styles.aboutText}>
//             We offer full-scale services for all your real estate needs,
//             including home hunting, pay-rent services, and everything
//             buyers, tenants, owners and agents together.
//           </p>

//           <div style={styles.socialIcons}>
//             {icons.map(({ icon: Icon, link }, index) => (
//               <a
//                 key={index}
//                 href={link}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 style={styles.socialIcon}
//               >
//                 <Icon size={14} />
//               </a>
//             ))}
//           </div>
//         </div>

//         {/* ================= COMPANY ================= */}
//         <div>
//           <h3 style={styles.heading}>Company</h3>

//           <ul style={styles.linkList}>
//             {companyLinks.map(({ label, path }) => (
//               <li key={label} style={styles.linkItem}>
//                 <span
//                   onClick={() => handleNavigation(path)}
//                   style={styles.linkText}
//                 >
//                   {label}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* ================= PROPERTIES IN INDIA ================= */}
//         <div>
//           <h3 style={styles.heading}>Properties in India</h3>

//           <ul style={styles.linkList}>
//             {cities.map((city) => (
//               <li key={city} style={styles.linkItem}>
//                 <span
//                   onClick={() => handleCityClick(city)}
//                   style={styles.linkText}
//                 >
//                   Property in {city}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* ================= CONTACT US ================= */}
//         <div>
//           <h3 style={styles.heading}>Contact Us</h3>

//           <p style={styles.contactText}>
//             Toll Free — +91 8127848127
//             +91 8127288127 (India)
//             <br />
//             000 000 000 (Free Zone)
//           </p>

//           <p style={styles.contactText}>support@Apnaghar.com</p>
//         </div>

//         {/* ================= DOWNLOAD APP ================= */}
//         <div>
//           <h3 style={styles.heading}>Download Mobile App</h3>

//           <div style={styles.appButtons}>
//             <a
//               href={socialLinks.playstore}
//               target="_blank"
//               rel="noopener noreferrer"
//               style={styles.storeButton}
//             >
//               <span style={styles.storeIcon}>▶</span>
//               Google Play
//             </a>

//             <a
//               href={socialLinks.appstore}
//               target="_blank"
//               rel="noopener noreferrer"
//               style={styles.storeButton}
//             >
//               <span style={styles.storeIcon}></span>
//               App Store
//             </a>
//           </div>

//           <span style={styles.qrText}>
//             Scan the QR code to download the app.
//           </span>
//         </div>
//       </div>

//       {/* =====================================================
//           BOTTOM FOOTER
//       ===================================================== */}
//       <div style={styles.footerBottom}>
//         <span style={styles.copyrightText}>
//           © 2026 Apnaghar.com — All rights reserved.
//         </span>

//         <div style={styles.legalLinks}>
//           <Link to="/privacy-policy" style={styles.legalLink}>
//             Privacy Policy
//           </Link>

//           <Link to="/terms-conditions" style={styles.legalLink}>
//             Terms of Service
//           </Link>
//         </div>
//       </div>
//     </footer>
//   );
// };

// /* =====================================================
//    STYLES
// ===================================================== */

// const styles = {
//   footer: {
//     width: "100%",
//     background: "#0f1b2d",
//     color: "#a9b4c4",
//     fontFamily:
//       "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
//   },

//   /* ---------- TOP ---------- */

//   footerTop: {
//     display: "grid",
//     gridTemplateColumns: "1.6fr 1fr 1.2fr 1fr 1.1fr",
//     gap: "40px",
//     padding: "48px 60px 40px",
//   },

//   footerAbout: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "18px",
//     maxWidth: "320px",
//   },

//   brandRow: {
//     display: "flex",
//     alignItems: "center",
//     gap: "10px",
//   },

//   logoBox: {
//     width: "34px",
//     height: "34px",
//     borderRadius: "8px",
//     background: "#1c2b41",
//     color: "#e9c46a",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     fontWeight: 700,
//     fontSize: "16px",
//   },

//   brandName: {
//     color: "#f5f6f8",
//     fontSize: "19px",
//     fontWeight: 700,
//     fontFamily: "Georgia, 'Times New Roman', serif",
//   },

//   aboutText: {
//     margin: 0,
//     fontSize: "13.5px",
//     lineHeight: "1.7",
//     color: "#8d99ac",
//   },

//   socialIcons: {
//     display: "flex",
//     gap: "10px",
//   },

//   socialIcon: {
//     width: "32px",
//     height: "32px",
//     borderRadius: "50%",
//     border: "1px solid #2c3c53",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     color: "#c3cbd8",
//     textDecoration: "none",
//   },

//   heading: {
//     margin: "0 0 18px",
//     fontSize: "14.5px",
//     fontWeight: 700,
//     color: "#f5f6f8",
//   },

//   linkList: {
//     listStyle: "none",
//     margin: 0,
//     padding: 0,
//     display: "flex",
//     flexDirection: "column",
//     gap: "12px",
//   },

//   linkItem: {
//     fontSize: "13.5px",
//   },

//   linkText: {
//     color: "#8d99ac",
//     cursor: "pointer",
//   },

//   contactText: {
//     margin: "0 0 12px",
//     fontSize: "13.5px",
//     lineHeight: "1.7",
//     color: "#8d99ac",
//   },

//   appButtons: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "10px",
//     marginBottom: "16px",
//   },

//   storeButton: {
//     display: "inline-flex",
//     alignItems: "center",
//     gap: "8px",
//     padding: "8px 14px",
//     borderRadius: "8px",
//     border: "1px solid #2c3c53",
//     color: "#e6e9ee",
//     fontSize: "13px",
//     textDecoration: "none",
//     width: "fit-content",
//   },

//   storeIcon: {
//     fontSize: "12px",
//   },

//   qrText: {
//     fontSize: "12.5px",
//     color: "#7c889b",
//     lineHeight: "1.6",
//   },

//   /* ---------- BOTTOM ---------- */

//   footerBottom: {
//     borderTop: "1px solid #22314a",
//     padding: "22px 60px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     flexWrap: "wrap",
//     gap: "12px",
//   },

//   copyrightText: {
//     fontSize: "12.5px",
//     color: "#7c889b",
//   },

//   legalLinks: {
//     display: "flex",
//     alignItems: "center",
//     gap: "28px",
//   },

//   legalLink: {
//     textDecoration: "none",
//     color: "#7c889b",
//     fontSize: "12.5px",
//   },
// };

// export default Footer;


// =============================================

import React, { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaWhatsapp,
  // NEW (UI only): store glyphs + the icons used beside the contact / location rows.
  FaGooglePlay,
  FaApple,
  FaPhone,
  FaEnvelope,
  FaLocationDot,
  FaAngleRight,
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
    instagram: "#",
    appstore: "#",
    playstore: "#",
    twitter: "#",
    whatsapp: "#",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/cust_api/get_setting`
        );

        if (response.data.status === 1 && response.data.data.length > 0) {
          const data = response.data.data[0];

          setSocialLinks({
            facebook: data.facebook || "#",
            instagram: data.instagram || "#",
            appstore: data.appstore || "#",
            playstore: data.playstore || "#",
            twitter: data.twitter || "#",
            whatsapp: data.whatsapp || "#",
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
    { icon: FaFacebookF, link: socialLinks.facebook },
    { icon: FaXTwitter, link: socialLinks.twitter },
    { icon: FaInstagram, link: socialLinks.instagram },
    { icon: FaWhatsapp, link: socialLinks.whatsapp },
  ];

  /* ================= LINK COLUMNS ================= */

  // UI ONLY: the `label` strings now read as in the reference ("About Us" instead
  // of "About"). Every `path` is unchanged, so routing is exactly as before.
  const companyLinks = [
    { label: "About Us", path: "/about-us" },
    { label: "Blog", path: "/blog" },
    { label: "Contact Us", path: "/contact" },
    { label: "FAQs", path: "/faq" },
  ];

  const cities = [
    "Ahmedabad",
    "Bengaluru",
    "Chennai",
    "Hyderabad",
    "Kolkata",
    "Mumbai",
    "Pune",
  ];

  // ==========================================================
  // NEW (UI only): hover state for the link / city rows, so the
  // red highlight in the design works without a CSS file. This
  // component styles with inline objects, and inline styles
  // cannot express :hover — hence the tiny bit of state.
  // ==========================================================
  const [hoveredKey, setHoveredKey] = useState(null);

  return (
    <footer style={styles.footer}>

      {/* =====================================================
          NEW: red wave along the top edge (decorative)
      ===================================================== */}
      <div style={styles.waveWrap} aria-hidden="true">
        <svg
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          style={styles.waveSvg}
        >
          <path
            d="M0,46 C240,86 420,4 720,26 C1010,47 1200,96 1440,54 L1440,0 L0,0 Z"
            fill="#ffffff"
          />
          <path
            d="M0,46 C240,86 420,4 720,26 C1010,47 1200,96 1440,54 L1440,72 C1200,114 1010,65 720,44 C420,22 240,104 0,64 Z"
            fill="#D61F45"
          />
        </svg>
      </div>

      {/* NEW: faint city skyline watermark across the bottom (decorative) */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1600 200"
        preserveAspectRatio="none"
        style={styles.skyline}
      >
        <g fill="#D61F45" opacity="0.13">
          <rect x="20" y="126" width="34" height="74" />
          <rect x="62" y="88" width="26" height="112" />
          <rect x="96" y="138" width="40" height="62" />
          <rect x="144" y="66" width="24" height="134" />
          <rect x="176" y="110" width="36" height="90" />
          <rect x="220" y="146" width="28" height="54" />
          <rect x="256" y="94" width="32" height="106" />
          <rect x="296" y="124" width="42" height="76" />
          <rect x="346" y="74" width="26" height="126" />
          <rect x="380" y="130" width="36" height="70" />
          <rect x="424" y="102" width="28" height="98" />
          <rect x="460" y="150" width="44" height="50" />
          <rect x="512" y="116" width="30" height="84" />
          <rect x="550" y="80" width="24" height="120" />
          <rect x="582" y="140" width="40" height="60" />
          <rect x="630" y="106" width="28" height="94" />
          <rect x="666" y="128" width="36" height="72" />
          <rect x="710" y="70" width="22" height="130" />
          <rect x="740" y="118" width="44" height="82" />
          <rect x="792" y="152" width="30" height="48" />
          <rect x="830" y="98" width="34" height="102" />
          <rect x="872" y="134" width="40" height="66" />
          <rect x="920" y="78" width="24" height="122" />
          <rect x="952" y="122" width="36" height="78" />
          <rect x="996" y="146" width="30" height="54" />
          <rect x="1034" y="92" width="32" height="108" />
          <rect x="1074" y="130" width="42" height="70" />
          <rect x="1124" y="68" width="24" height="132" />
          <rect x="1158" y="114" width="36" height="86" />
          <rect x="1202" y="148" width="28" height="52" />
          <rect x="1240" y="96" width="34" height="104" />
          <rect x="1282" y="132" width="40" height="68" />
          <rect x="1330" y="76" width="24" height="124" />
          <rect x="1362" y="120" width="36" height="80" />
          <rect x="1406" y="150" width="30" height="50" />
          <rect x="1444" y="100" width="34" height="100" />
          <rect x="1486" y="136" width="40" height="64" />
          <rect x="1534" y="86" width="26" height="114" />
        </g>
        <g stroke="#D61F45" strokeWidth="2" opacity="0.13">
          <line x1="156" y1="66" x2="156" y2="40" />
          <line x1="358" y1="74" x2="358" y2="48" />
          <line x1="721" y1="70" x2="721" y2="42" />
          <line x1="1136" y1="68" x2="1136" y2="40" />
          <line x1="1342" y1="76" x2="1342" y2="50" />
        </g>
      </svg>

      {/* =====================================================
          TOP FOOTER
      ===================================================== */}
      <div style={styles.footerTop}>

        {/* ================= LOGO + DESCRIPTION ================= */}
        <div style={styles.footerAbout}>
          <div style={styles.brandRow}>
            {/* UI: the plain "A" box becomes the red house mark from the design */}
            <div style={styles.logoBox}>
              <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">
                <path
                  d="M12 2.6 1.8 11.1h3v10.3h5.1v-5.6h4.2v5.6h5.1V11.1h3L12 2.6Z"
                  fill="#D61F45"
                />
                <rect x="8" y="12.4" width="2.6" height="2.6" fill="#ffffff" />
                <rect x="13.4" y="12.4" width="2.6" height="2.6" fill="#ffffff" />
              </svg>
            </div>

            <span style={styles.brandName}>
              Apna<span style={styles.brandNameAccent}>Ghar</span>
            </span>
          </div>

          {/* NEW: tagline from the design */}
          <p style={styles.tagline}>Find. Explore. Own. Live Better.</p>

          {/* UI ONLY: copy updated to the reference wording.
              Your original sentence, if you want it back:
              "We offer full-scale services for all your real estate needs,
               including home hunting, pay-rent services, and everything
               buyers, tenants, owners and agents together." */}
          <p style={styles.aboutText}>
            We make property searching simple, transparent and reliable. Explore
            verified listings, connect directly with owners and find the perfect
            home for your lifestyle.
          </p>

          <div style={styles.socialIcons}>
            {icons.map(({ icon: Icon, link }, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  ...styles.socialIcon,
                  ...(hoveredKey === `social-${index}`
                    ? styles.socialIconHover
                    : null),
                }}
                onMouseEnter={() => setHoveredKey(`social-${index}`)}
                onMouseLeave={() => setHoveredKey(null)}
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* ================= COMPANY ================= */}
        <div style={styles.column}>
          {/* UI ONLY: heading text now reads "Quick Links", per the design */}
          <h3 style={styles.heading}>
            Quick Links
            <span style={styles.headingRule} />
          </h3>

          <ul style={styles.linkList}>
            {companyLinks.map(({ label, path }) => (
              <li key={label} style={styles.linkItem}>
                <span
                  onClick={() => handleNavigation(path)}
                  style={{
                    ...styles.linkText,
                    ...(hoveredKey === `link-${label}`
                      ? styles.linkTextHover
                      : null),
                  }}
                  onMouseEnter={() => setHoveredKey(`link-${label}`)}
                  onMouseLeave={() => setHoveredKey(null)}
                >
                  {/* NEW: red chevron from the design */}
                  <FaAngleRight size={13} style={styles.linkChevron} />
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ================= PROPERTIES IN INDIA ================= */}
        <div style={styles.column}>
          {/* UI ONLY: heading text now reads "Top Locations", per the design */}
          <h3 style={styles.heading}>
            Top Locations
            <span style={styles.headingRule} />
          </h3>

          <ul style={styles.linkList}>
            {cities.map((city) => (
              <li key={city} style={styles.linkItem}>
                <span
                  onClick={() => handleCityClick(city)}
                  style={{
                    ...styles.linkText,
                    ...(hoveredKey === `city-${city}`
                      ? styles.linkTextHover
                      : null),
                  }}
                  onMouseEnter={() => setHoveredKey(`city-${city}`)}
                  onMouseLeave={() => setHoveredKey(null)}
                >
                  {/* NEW: red map pin from the design */}
                  <FaLocationDot size={13} style={styles.linkPin} />
                  Property in {city}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ================= CONTACT US ================= */}
        <div style={styles.column}>
          {/* UI ONLY: heading text now reads "Get in Touch", per the design */}
          <h3 style={styles.heading}>
            Get in Touch
            <span style={styles.headingRule} />
          </h3>

          {/* NOTE: the reference image shows a physical-address row under the
              email. It was NOT in your code and you asked for it to be left out,
              so no address block is rendered here — this column is phone + email
              only, exactly as your original content had it. */}

          <div style={styles.contactRow}>
            <span style={styles.contactIcon}>
              <FaPhone size={13} />
            </span>
            <p style={styles.contactText}>
              Toll Free — +91 8127848127
              +91 8127288127 (India)
              <br />
              000 000 000 (Free Zone)
            </p>
          </div>

          <div style={styles.contactRow}>
            <span style={styles.contactIcon}>
              <FaEnvelope size={13} />
            </span>
            <p style={styles.contactText}>support@Apnaghar.com</p>
          </div>
        </div>

        {/* ================= DOWNLOAD APP ================= */}
        <div style={styles.column}>
          {/* UI ONLY: heading text now reads "Download Our Mobile App" */}
          <h3 style={styles.heading}>
            Download Our Mobile App
            <span style={styles.headingRule} />
          </h3>

          <p style={styles.appLead}>Find your dream home on the go.</p>

          <div style={styles.appRow}>
            {/* NEW: QR slot from the design.
                Drop your own QR image at /image/qr-code.png (public folder).
                Until that file exists the tile stays blank rather than showing a
                broken-image icon — nothing else shifts. If you'd rather generate
                it from the store link you already fetch, replace the `src` with
                your QR service and pass `socialLinks.playstore` as the data. */}
            <div style={styles.qrBox}>
              <img
                src="/image/qr-code.png"
                alt="Scan to download the ApnaGhar app"
                style={styles.qrImage}
                onError={(e) => {
                  e.target.style.visibility = "hidden";
                }}
              />
            </div>

            <div style={styles.appButtons}>
              <a
                href={socialLinks.playstore}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  ...styles.storeButton,
                  ...(hoveredKey === "store-play"
                    ? styles.storeButtonHover
                    : null),
                }}
                onMouseEnter={() => setHoveredKey("store-play")}
                onMouseLeave={() => setHoveredKey(null)}
              >
                <span style={styles.storeIcon}>
                  <FaGooglePlay size={20} />
                </span>
                <span style={styles.storeTextWrap}>
                  <span style={styles.storeSmall}>GET IT ON</span>
                  <span style={styles.storeBig}>Google Play</span>
                </span>
              </a>

              <a
                href={socialLinks.appstore}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  ...styles.storeButton,
                  ...(hoveredKey === "store-app"
                    ? styles.storeButtonHover
                    : null),
                }}
                onMouseEnter={() => setHoveredKey("store-app")}
                onMouseLeave={() => setHoveredKey(null)}
              >
                <span style={styles.storeIcon}>
                  <FaApple size={22} />
                </span>
                <span style={styles.storeTextWrap}>
                  <span style={styles.storeSmall}>Download on the</span>
                  <span style={styles.storeBig}>App Store</span>
                </span>
              </a>
            </div>
          </div>

          <span style={styles.qrText}>
            Scan the QR code to download the app.
          </span>
        </div>
      </div>

      {/* =====================================================
          BOTTOM FOOTER
      ===================================================== */}
      <div style={styles.footerBottom}>
        <span style={styles.copyrightText}>
          © 2026 Apnaghar.com — All rights reserved.
        </span>

        <div style={styles.legalLinks}>
          <Link
            to="/privacy-policy"
            style={{
              ...styles.legalLink,
              ...(hoveredKey === "legal-privacy" ? styles.legalLinkHover : null),
            }}
            onMouseEnter={() => setHoveredKey("legal-privacy")}
            onMouseLeave={() => setHoveredKey(null)}
          >
            Privacy Policy
          </Link>

          <span style={styles.legalDivider}>|</span>

          <Link
            to="/terms-conditions"
            style={{
              ...styles.legalLink,
              ...(hoveredKey === "legal-terms" ? styles.legalLinkHover : null),
            }}
            onMouseEnter={() => setHoveredKey("legal-terms")}
            onMouseLeave={() => setHoveredKey(null)}
          >
            Terms of Service
          </Link>

          <span style={styles.legalDivider}>|</span>

          {/* NEW: third link from the design. There was no Sitemap route in your
              code, so this points at /sitemap — create that route, or change the
              `to` below to wherever your sitemap lives. */}
          <Link
            to="/sitemap"
            style={{
              ...styles.legalLink,
              ...(hoveredKey === "legal-sitemap" ? styles.legalLinkHover : null),
            }}
            onMouseEnter={() => setHoveredKey("legal-sitemap")}
            onMouseLeave={() => setHoveredKey(null)}
          >
            Sitemap
          </Link>
        </div>
      </div>
    </footer>
  );
};

/* =====================================================
   STYLES
===================================================== */

const styles = {
  footer: {
    width: "100%",
    // UI: deeper navy from the design + room for the wave on top
    background: "#141d2f",
    color: "#a9b4c4",
    position: "relative",
    overflow: "hidden",
    paddingTop: "90px",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
  },

  /* ---------- NEW: decorative layers ---------- */

  waveWrap: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "90px",
    pointerEvents: "none",
    lineHeight: 0,
  },

  waveSvg: {
    display: "block",
    width: "100%",
    height: "100%",
  },

  skyline: {
    position: "absolute",
    left: 0,
    bottom: "68px",
    width: "100%",
    // UI: kept low and short so it reads as a watermark behind the bottom
    // band rather than a bar chart running through the link columns.
    height: "120px",
    pointerEvents: "none",
    userSelect: "none",
  },

  /* ---------- TOP ---------- */

  footerTop: {
    position: "relative",
    zIndex: 2,
    display: "grid",
    gridTemplateColumns: "1.6fr 1fr 1.2fr 1.1fr 1.2fr",
    gap: "40px",
    padding: "40px 60px 48px",
  },

  footerAbout: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    maxWidth: "340px",
  },

  // NEW: vertical rule between columns, as in the design
  column: {
    borderLeft: "1px solid rgba(255,255,255,0.08)",
    paddingLeft: "34px",
  },

  brandRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  logoBox: {
    width: "38px",
    height: "38px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  brandName: {
    color: "#ffffff",
    fontSize: "28px",
    fontWeight: 800,
    letterSpacing: "-0.2px",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
  },

  brandNameAccent: {
    color: "#D61F45",
  },

  tagline: {
    margin: 0,
    fontSize: "16px",
    fontWeight: 600,
    color: "#ffffff",
  },

  aboutText: {
    margin: 0,
    fontSize: "13.5px",
    lineHeight: "1.75",
    color: "#94a1b5",
  },

  socialIcons: {
    display: "flex",
    gap: "12px",
    marginTop: "4px",
  },

  socialIcon: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.22)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#dfe4ec",
    textDecoration: "none",
    transition: "all .25s ease",
  },

  socialIconHover: {
    background: "#D61F45",
    borderColor: "#D61F45",
    color: "#ffffff",
    transform: "translateY(-2px)",
  },

  heading: {
    position: "relative",
    margin: "0 0 26px",
    paddingBottom: "10px",
    fontSize: "17px",
    fontWeight: 700,
    color: "#ffffff",
  },

  // NEW: short red rule under each heading, as in the design
  headingRule: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "34px",
    height: "3px",
    borderRadius: "2px",
    background: "#D61F45",
  },

  linkList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  linkItem: {
    fontSize: "14px",
  },

  linkText: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    color: "#c2cad8",
    cursor: "pointer",
    transition: "color .2s ease, transform .2s ease",
  },

  linkTextHover: {
    color: "#ffffff",
    transform: "translateX(3px)",
  },

  linkChevron: {
    color: "#D61F45",
    flexShrink: 0,
  },

  linkPin: {
    color: "#D61F45",
    flexShrink: 0,
  },

  /* ---------- CONTACT ---------- */

  contactRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    marginBottom: "18px",
  },

  contactIcon: {
    color: "#D61F45",
    marginTop: "3px",
    flexShrink: 0,
  },

  contactText: {
    margin: 0,
    fontSize: "14px",
    lineHeight: "1.7",
    color: "#c2cad8",
  },

  /* ---------- APP ---------- */

  appLead: {
    margin: "0 0 18px",
    fontSize: "13.5px",
    color: "#94a1b5",
  },

  appRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "16px",
    marginBottom: "14px",
    flexWrap: "wrap",
  },

  qrBox: {
    width: "112px",
    height: "112px",
    borderRadius: "10px",
    background: "#ffffff",
    padding: "8px",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  qrImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    display: "block",
  },

  appButtons: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  storeButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    padding: "8px 16px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.18)",
    background: "#000000",
    color: "#ffffff",
    textDecoration: "none",
    width: "fit-content",
    transition: "all .25s ease",
  },

  storeButtonHover: {
    borderColor: "#D61F45",
    transform: "translateY(-2px)",
  },

  storeIcon: {
    display: "flex",
    alignItems: "center",
    color: "#ffffff",
  },

  storeTextWrap: {
    display: "flex",
    flexDirection: "column",
    lineHeight: 1.15,
  },

  storeSmall: {
    fontSize: "9.5px",
    letterSpacing: "0.4px",
    textTransform: "uppercase",
    color: "#cfd4dd",
  },

  storeBig: {
    fontSize: "15px",
    fontWeight: 700,
    color: "#ffffff",
  },

  qrText: {
    display: "block",
    fontSize: "12.5px",
    color: "#94a1b5",
    lineHeight: "1.6",
  },

  /* ---------- BOTTOM ---------- */

  footerBottom: {
    position: "relative",
    zIndex: 2,
    borderTop: "1px solid rgba(214,31,69,0.35)",
    padding: "22px 60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "12px",
  },

  copyrightText: {
    fontSize: "13px",
    color: "#94a1b5",
  },

  legalLinks: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
  },

  legalLink: {
    textDecoration: "none",
    color: "#94a1b5",
    fontSize: "13px",
    transition: "color .2s ease",
  },

  legalLinkHover: {
    color: "#D61F45",
  },

  legalDivider: {
    color: "rgba(255,255,255,0.22)",
    fontSize: "13px",
  },
};

export default Footer;