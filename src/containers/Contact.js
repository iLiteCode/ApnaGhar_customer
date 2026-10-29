// import React, { useState, useEffect } from "react";
// import { Helmet } from "react-helmet";
// import axios from "axios";
// import { connect } from "react-redux";
// import setAlert from "../store/actions/alert";
// import Loader from "react-loader-spinner";
// import Email from "@mui/icons-material/Email";
// import LocationOn from "@mui/icons-material/LocationOn";
// import Phone from "@mui/icons-material/Phone";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faStar } from "@fortawesome/free-solid-svg-icons";

// const LegacyContact = ({ setAlert }) => {
//   useEffect(() => {
//     window.scrollTo(0, 0);
//     fetchContactInfo(); // Fetch contact info on mount
//   }, []);

//   const [formData, setFormData] = useState({
//     name: "",
//     contact_number: "",
//     email: "",
//     rating: 1,
//     feedback_msg: "",
//   });

//   const { name, contact_number, email, rating, feedback_msg } = formData;

//   const [loading, setLoading] = useState(false);
//   const [alert, setLocalAlert] = useState(null);

//   // State for contact information
//   const [contactInfo, setContactInfo] = useState({
//     address: "",
//     email: "",
//     phone: "",
//     latitude: "",
//     longitude: "",
//   });

//   const fetchContactInfo = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_API_URL}/cust_api/get_setting`,
//       );
//       const { data } = response.data; // Accessing the "data" array from the response
//       if (data && data.length > 0) {
//         const { address, emaild_id, contact, latitude } = data[0]; // Extracting required fields from the first object
//         setContactInfo({ address, email: emaild_id, phone: contact });
//       }
//     } catch (error) {
//       setAlert("Error fetching contact information", "error");
//       setLocalAlert({
//         msg: "Error fetching contact information",
//         type: "danger",
//       });
//     }
//   };

//   const onChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleStarClick = (newRating) => {
//     setFormData({ ...formData, rating: newRating });
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     setLoading(true);
//     axios
//       .post(
//         `${process.env.REACT_APP_API_URL}/cust_api/give_us_feedback`,
//         { name, contact_number, email, rating, feedback_msg },
//         config,
//       )
//       .then((res) => {
//         setAlert("Feedback Submitted", "success");
//         setLocalAlert({
//           msg: "Feedback Submitted Successfully!",
//           type: "success",
//         });
//         setLoading(false);
//         setFormData({
//           name: "",
//           contact_number: "",
//           email: "",
//           rating: 1,
//           feedback_msg: "",
//         });
//         window.scrollTo(0, 0);
//         setTimeout(() => {
//           setLocalAlert(null);
//         }, 3000);
//       })
//       .catch((err) => {
//         setAlert("Error Submitting Feedback", "error");
//         setLocalAlert({ msg: "Error Submitting Feedback", type: "danger" });
//         setLoading(false);
//         window.scrollTo(0, 0);
//         setTimeout(() => {
//           setLocalAlert(null);
//         }, 3000);
//       });
//   };

//   const renderStars = () => {
//     return [...Array(5)].map((_, index) => {
//       const starValue = index + 1;
//       return (
//         <FontAwesomeIcon
//           key={index}
//           icon={faStar}
//           className={`cursor-pointer ${starValue <= rating ? "text-yellow-500" : "text-gray-300"}`}
//           onClick={() => handleStarClick(starValue)}
//         />
//       );
//     });
//   };

//   return (
//     <div className="min-h-screen px-4 bg-gray-100 feedback">
//       <Helmet>
//         <title>Real Estate - Feedback</title>
//         <meta name="description" content="Feedback form" />
//       </Helmet>

//       <div className="container max-w-6xl p-8 mx-auto bg-white rounded-lg shadow-lg">
//         <h2 className="mb-3 text-3xl font-bold text-center text-black-500">
//           Feedback Form
//         </h2>

//         {alert && (
//           <div
//             className={`mb-4 p-4 text-white rounded ${alert.type === "success" ? "bg-green-500" : "bg-red-500"}`}
//           >
//             {alert.msg}
//           </div>
//         )}
//         <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
//           <div>
//             <div className="flex items-start mb-6 address">
//               <LocationOn className="my-text" style={{ fontSize: 40 }} />
//               <div className="ml-4">
//                 <h4 className="text-xl font-semibold">Location:</h4>
//                 <p className="text-gray-600">{contactInfo.address}</p>{" "}
//                 {/* Address is now updated from geocoding */}
//               </div>
//             </div>
//             <div className="flex items-start mb-6 email">
//               <Email className="my-text" style={{ fontSize: 40 }} />
//               <div className="ml-4">
//                 <h4 className="text-xl font-semibold">Email:</h4>
//                 <p className="text-gray-600">{contactInfo.email}</p>
//               </div>
//             </div>
//             <div className="flex items-start mb-6 phone">
//               <Phone className="my-text" style={{ fontSize: 40 }} />
//               <div className="ml-4">
//                 <h4 className="text-xl font-semibold">Phone:</h4>
//                 <p className="text-gray-600">{contactInfo.phone}</p>
//               </div>
//             </div>

//             <div>
//               <iframe
//                 width="100%"
//                 height="250"
//                 title="Contact map"
//                 frameBorder="0"
//                 scrolling="no"
//                 marginHeight="0"
//                 marginWidth="0"
//                 src={`https://maps.google.com/maps?q=${contactInfo.latitude},${contactInfo.address},${contactInfo.longitude}&t=&z=13&ie=UTF8&iwloc=&output=embed`} // Use latitude and longitude from contactInfo
//                 className="rounded-lg"
//               ></iframe>
//             </div>
//           </div>
//           <div>
//             <form className="form" onSubmit={(e) => onSubmit(e)}>
//               <div className="mb-4 form-group">
//                 <label
//                   className="block mb-2 text-sm font-bold text-gray-700"
//                   htmlFor="name"
//                 >
//                   Name <span className="text-red-500"> *</span>
//                 </label>
//                 <input
//                   className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
//                   name="name"
//                   type="text"
//                   placeholder="Full Name"
//                   onChange={(e) => onChange(e)}
//                   value={name}
//                   required
//                 />
//               </div>
//               <div className="mb-4 form-group">
//                 <label
//                   className="block mb-2 text-sm font-bold text-gray-700"
//                   htmlFor="phone"
//                 >
//                   Phone Number <span className="text-red-500"> *</span>
//                 </label>
//                 <input
//                   className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
//                   name="contact_number"
//                   type="tel"
//                   placeholder="+91 1234567890"
//                   onChange={(e) => {
//                     const currentValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters (digits only)
//                     if (currentValue.length < 7 || currentValue.length > 15) {
//                       e.target.setCustomValidity(
//                         "Phone number must be between 7 and 15 digits",
//                       );
//                     } else {
//                       e.target.setCustomValidity(""); // Clear the message if valid
//                     }
//                     onChange(e); // Call your original onChange handler
//                   }}
//                   value={contact_number}
//                   required
//                   onKeyPress={(e) => {
//                     const currentValue = e.target.value.replace(/\D/g, ""); // Get only digits from current value
//                     const key = e.key;
//                     if (!/[0-9\s+]/.test(key)) {
//                       e.preventDefault();
//                     }
//                     if (currentValue.length >= 15 && /[0-9]/.test(key)) {
//                       e.preventDefault();
//                     }
//                   }}
//                   title="Please enter a valid phone number"
//                 />
//               </div>

//               <div className="mb-4 form-group">
//                 <label
//                   className="block mb-2 text-sm font-bold text-gray-700"
//                   htmlFor="email"
//                 >
//                   Email <span className="text-red-500"> *</span>
//                 </label>
//                 <input
//                   className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
//                   name="email"
//                   type="email"
//                   placeholder="example@gmail.com"
//                   onChange={(e) => onChange(e)}
//                   value={email}
//                   required
//                 />
//               </div>

//               <div className="mb-4 form-group">
//                 <label
//                   className="block mb-2 text-sm font-bold text-gray-700"
//                   htmlFor="feedback_msg"
//                 >
//                   Feedback <span className="text-red-500"> *</span>
//                 </label>
//                 <textarea
//                   className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
//                   name="feedback_msg"
//                   placeholder="Your feedback here..."
//                   onChange={(e) => onChange(e)}
//                   value={feedback_msg}
//                   required
//                 ></textarea>
//               </div>

//               <div className="mb-4 form-group">
//                 <label
//                   className="block mb-2 text-sm font-bold text-gray-700"
//                   htmlFor="rating"
//                 >
//                   Rating <span className="text-red-500"> *</span>
//                 </label>
//                 <div className="flex mb-4">{renderStars()}</div>
//               </div>

//               <button
//                 className={`my-bg hover:my-bg text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? "opacity-50 cursor-not-allowed" : ""
//                   }`}
//                 type="submit"
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <Loader
//                     type="ThreeDots"
//                     color="#fff"
//                     height={15}
//                     width={15}
//                   />
//                 ) : (
//                   "Submit"
//                 )}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // export default connect(null, { setAlert })(Contact);

// // import React, { useState, useEffect } from "react";
// // import { Helmet } from "react-helmet";
// // import axios from "axios";
// // import { connect } from "react-redux";
// // import setAlert from "../store/actions/alert";
// // import Loader from "react-loader-spinner";
// // import { Email, LocationOn, Phone } from "@material-ui/icons";

// // const Contact = ({ setAlert }) => {
// //   useEffect(() => {
// //     window.scrollTo(0, 0);
// //   }, []);

// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     subject: "",
// //     message: "",
// //   });

// //   const { name, email, subject, message } = formData;

// //   const [loading, setLoading] = useState(false);

// //   const onChange = (e) =>
// //     setFormData({ ...formData, [e.target.name]: e.target.value });

// //   const onSubmit = (e) => {
// //     e.preventDefault();

// //     const config = {
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //     };

// //     setLoading(true);
// //     axios
// //       .post(
// //         `${process.env.REACT_APP_API_URL}/api/contacts/`,
// //         { name, email, subject, message },
// //         config
// //       )
// //       .then((res) => {
// //         setAlert("Message Sent", "success");
// //         setLoading(false);
// //         setFormData({ name: "", email: "", subject: "", message: "" });
// //         window.scrollTo(0, 0);
// //       })
// //       .catch((err) => {
// //         setAlert("Error with Sending Message", "error");
// //         setLoading(false);
// //         window.scrollTo(0, 0);
// //       });
// //     setFormData({
// //       name: "",
// //       email: "",
// //       subject: "",
// //       message: "",
// //     });
// //   };

// //   return (
// //     <div className="min-h-screen px-4 bg-gray-100 contact">
// //       <Helmet>
// //         <title>Real Estate - Contact</title>
// //         <meta name="description" content="Contact us" />
// //       </Helmet>

// //       <div className="container max-w-6xl p-8 mx-auto bg-white rounded-lg shadow-lg">
// //         <h2 className="mb-3 text-3xl font-bold text-center text-black-500">Contact Us</h2>
// //         <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
// //           <div>
// //             <div className="flex items-start mb-6 address">
// //               <LocationOn className="my-text" style={{ fontSize: 40 }} />
// //               <div className="ml-4">
// //                 <h4 className="text-xl font-semibold">Location:</h4>
// //                 <p className="text-gray-600">B2-710, Balewadi High Street, PN, Pune, 123456, Maharashtra</p>
// //               </div>
// //             </div>
// //             <div className="flex items-start mb-6 email">
// //               <Email className="my-text" style={{ fontSize: 40 }} />
// //               <div className="ml-4">
// //                 <h4 className="text-xl font-semibold">Email:</h4>
// //                 <p className="text-gray-600">example@gmail.com</p>
// //               </div>
// //             </div>
// //             <div className="flex items-start mb-6 phone">
// //               <Phone className="my-text" style={{ fontSize: 40 }} />
// //               <div className="ml-4">
// //                 <h4 className="text-xl font-semibold">Phone:</h4>
// //                 <p className="text-gray-600">+91 1234567890</p>
// //               </div>
// //             </div>
// //             <div>
// //               <iframe
// //                 width="100%"
// //                 height="250"
// //                 frameBorder="0"
// //                 scrolling="no"
// //                 marginHeight="0"
// //                 marginWidth="0"
// //                 src="https://maps.google.com/maps?q=Mumbai&t=&z=13&ie=UTF8&iwloc=&output=embed"
// //                 className="rounded-lg"
// //               ></iframe>
// //             </div>
// //           </div>
// //           <div>
// //             <form className="form" onSubmit={(e) => onSubmit(e)}>
// //               <div className="mb-4 form-group">
// //                 <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="name">
// //                   Name <span className="text-red-500"> *</span>
// //                 </label>
// //                 <input
// //                   className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
// //                   name="name"
// //                   type="text"
// //                   placeholder="Full Name"
// //                   onChange={(e) => onChange(e)}
// //                   value={name}
// //                   required
// //                 />
// //               </div>
// //               <div className="mb-4 form-group">
// //                 <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
// //                   Email <span className="text-red-500"> *</span>
// //                 </label>
// //                 <input
// //                   className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
// //                   name="email"
// //                   type="email"
// //                   placeholder="example@gmail.com"
// //                   onChange={(e) => onChange(e)}
// //                   value={email}
// //                   required
// //                 />
// //               </div>
// //               <div className="mb-4 form-group">
// //                 <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="subject">
// //                   Subject <span className="text-red-500"> *</span>
// //                 </label>
// //                 <input
// //                   className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
// //                   name="subject"
// //                   type="text"
// //                   placeholder="Buying Home"
// //                   onChange={(e) => onChange(e)}
// //                   value={subject}
// //                   required
// //                 />
// //               </div>
// //               <div className="mb-4 form-group">
// //                 <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="message">
// //                   Message <span className="text-red-500"> *</span>
// //                 </label>
// //                 <textarea
// //                   className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
// //                   name="message"
// //                   cols="30"
// //                   rows="5"
// //                   placeholder="Message"
// //                   style={{ resize: "none" }}
// //                   onChange={(e) => onChange(e)}
// //                   value={message}
// //                 />
// //               </div>
// //               {loading ? (
// //                 <div className="flex justify-center my-3">
// //                   <Loader type="Oval" color="#424242" height={50} width={50} />
// //                 </div>
// //               ) : (
// //                 <div className="flex justify-center send-btn">
// //                   <button
// //                     className="px-4 py-2 font-bold text-white my-bg rounded hover:my-bg focus:outline-none focus:shadow-outline"
// //                     type="submit"
// //                   >
// //                     Send
// //                   </button>
// //                 </div>
// //               )}
// //             </form>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default connect(null, { setAlert })(Contact);






// // ////////////////////////////////////////ADD NEW CODE//////////////
// const Contact = ({ setAlert }) => {
//   useEffect(() => {
//     window.scrollTo(0, 0);
//     fetchContactInfo(); // Fetch contact info on mount
//   }, []);

//   const [formData, setFormData] = useState({
//     name: "",
//     contact_number: "",
//     email: "",
//     property_name: "",
//     rating: 1,
//     feedback_msg: "",
//   });

//   const { name, contact_number, email, property_name, rating, feedback_msg } = formData;

//   const [loading, setLoading] = useState(false);
//   const [alert, setLocalAlert] = useState(null);

//   // State for contact information
//   const [contactInfo, setContactInfo] = useState({
//     address: "",
//     email: "",
//     phone: "",
//     latitude: "",
//     longitude: "",
//   });

//   const fetchContactInfo = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_API_URL}/cust_api/get_setting`,
//       );
//       const { data } = response.data; // Accessing the "data" array from the response
//       if (data && data.length > 0) {
//         const { address, emaild_id, contact, latitude } = data[0]; // Extracting required fields from the first object
//         setContactInfo({
//           address,
//           email: emaild_id,
//           phone: contact ? `+91 ${contact}` : "",
//         });
//       }
//     } catch (error) {
//       setAlert("Error fetching contact information", "error");
//       setLocalAlert({
//         msg: "Error fetching contact information",
//         type: "danger",
//       });
//     }
//   };

//   const onChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleStarClick = (newRating) => {
//     setFormData({ ...formData, rating: newRating });
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     setLoading(true);
//     axios
//       .post(
//         `${process.env.REACT_APP_API_URL}/cust_api/give_us_feedback`,
//         { name, contact_number, email, property_name, rating, feedback_msg },
//         config,
//       )
//       .then((res) => {
//         setAlert("Feedback Submitted", "success");
//         setLocalAlert({
//           msg: "Feedback Submitted Successfully!",
//           type: "success",
//         });
//         setLoading(false);
//         setFormData({
//           name: "",
//           contact_number: "",
//           email: "",
//           property_name: "",
//           rating: 1,
//           feedback_msg: "",
//         });
//         window.scrollTo(0, 0);
//         setTimeout(() => {
//           setLocalAlert(null);
//         }, 3000);
//       })
//       .catch((err) => {
//         setAlert("Error Submitting Feedback", "error");
//         setLocalAlert({ msg: "Error Submitting Feedback", type: "danger" });
//         setLoading(false);
//         window.scrollTo(0, 0);
//         setTimeout(() => {
//           setLocalAlert(null);
//         }, 3000);
//       });
//   };

//   const renderStars = () => {
//     return [...Array(5)].map((_, index) => {
//       const starValue = index + 1;
//       return (
//         <FontAwesomeIcon
//           key={index}
//           icon={faStar}
//           className={`cursor-pointer ${starValue <= rating ? "text-yellow-500" : "text-gray-300"}`}
//           onClick={() => handleStarClick(starValue)}
//         />
//       );
//     });
//   };

//   return (
//     <div className="min-h-screen px-4 bg-gray-100 feedback">
//       <Helmet>
//         <title>Real Estate - Feedback</title>
//         <meta name="description" content="Feedback form" />
//       </Helmet>

//       <div className="container max-w-6xl p-8 mx-auto bg-white rounded-lg shadow-lg">
//         <h2 className="mb-3 text-3xl font-bold text-center text-black-500">
//           Feedback Form
//         </h2>

//         {alert && (
//           <div
//             className={`mb-4 p-4 text-white rounded ${alert.type === "success" ? "bg-green-500" : "bg-red-500"}`}
//           >
//             {alert.msg}
//           </div>
//         )}
//         <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
//           <div>
//             <div className="flex items-start mb-6 address">
//               <LocationOn className="my-text" style={{ fontSize: 40 }} />
//               <div className="ml-4">
//                 <h4 className="text-xl font-semibold">Location:</h4>
//                 <p className="text-gray-600">{contactInfo.address}</p>{" "}
//                 {/* Address is now updated from geocoding */}
//               </div>
//             </div>
//             <div className="flex items-start mb-6 email">
//               <Email className="my-text" style={{ fontSize: 40 }} />
//               <div className="ml-4">
//                 <h4 className="text-xl font-semibold">Email:</h4>
//                 <p className="text-gray-600">{contactInfo.email}</p>
//               </div>
//             </div>
//             <div className="flex items-start mb-6 phone">
//               <Phone className="my-text" style={{ fontSize: 40 }} />
//               <div className="ml-4">
//                 <h4 className="text-xl font-semibold">Phone:</h4>
//                 <p className="text-gray-600">{contactInfo.phone}</p>
//               </div>
//             </div>

//             <div>
//               <iframe
//                 width="100%"
//                 height="250"
//                 title="Contact map"
//                 frameBorder="0"
//                 scrolling="no"
//                 marginHeight="0"
//                 marginWidth="0"
//                 src={`https://maps.google.com/maps?q=${contactInfo.latitude},${contactInfo.address},${contactInfo.longitude}&t=&z=13&ie=UTF8&iwloc=&output=embed`} // Use latitude and longitude from contactInfo
//                 className="rounded-lg"
//               ></iframe>
//             </div>
//           </div>
//           <div>
//             <form className="form" onSubmit={(e) => onSubmit(e)}>
//               <div className="mb-4 form-group">
//                 <label
//                   className="block mb-2 text-sm font-bold text-gray-700"
//                   htmlFor="name"
//                 >
//                   Name <span className="text-red-500"> *</span>
//                 </label>
//                 <input
//                   className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
//                   name="name"
//                   type="text"
//                   placeholder="Full Name"
//                   onChange={(e) => onChange(e)}
//                   value={name}
//                   required
//                 />
//               </div>
//               <div className="mb-4 form-group">
//                 <label
//                   className="block mb-2 text-sm font-bold text-gray-700"
//                   htmlFor="phone"
//                 >
//                   Phone Number <span className="text-red-500"> *</span>
//                 </label>
//                 <input
//                   className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
//                   name="contact_number"
//                   type="tel"
//                   placeholder="+91 1234567890"
//                   onChange={(e) => {
//                     const currentValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters (digits only)
//                     if (currentValue.length < 7 || currentValue.length > 15) {
//                       e.target.setCustomValidity(
//                         "Phone number must be between 7 and 15 digits",
//                       );
//                     } else {
//                       e.target.setCustomValidity(""); // Clear the message if valid
//                     }
//                     onChange(e); // Call your original onChange handler
//                   }}
//                   value={contact_number}
//                   required
//                   onKeyPress={(e) => {
//                     const currentValue = e.target.value.replace(/\D/g, ""); // Get only digits from current value
//                     const key = e.key;
//                     if (!/[0-9\s+]/.test(key)) {
//                       e.preventDefault();
//                     }
//                     if (currentValue.length >= 15 && /[0-9]/.test(key)) {
//                       e.preventDefault();
//                     }
//                   }}
//                   title="Please enter a valid phone number"
//                 />
//               </div>

//               <div className="mb-4 form-group">
//                 <label
//                   className="block mb-2 text-sm font-bold text-gray-700"
//                   htmlFor="email"
//                 >
//                   Email <span className="text-red-500"> *</span>
//                 </label>
//                 <input
//                   className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
//                   name="email"
//                   type="email"
//                   placeholder="example@gmail.com"
//                   onChange={(e) => onChange(e)}
//                   value={email}
//                   required
//                 />
//               </div>

//               <div className="mb-4 form-group">
//                 <label
//                   className="block mb-2 text-sm font-bold text-gray-700"
//                   htmlFor="property_name"
//                 >
//                   Property/Project Name <span className="text-red-500"> *</span>
//                 </label>
//                 <input
//                   className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
//                   name="property_name"
//                   type="text"
//                   placeholder="Property Name"
//                   onChange={(e) => onChange(e)}
//                   value={property_name}
//                   required
//                 />
//               </div>

//               <div className="mb-4 form-group">
//                 <label
//                   className="block mb-2 text-sm font-bold text-gray-700"
//                   htmlFor="feedback_msg"
//                 >
//                   Feedback <span className="text-red-500"> *</span>
//                 </label>
//                 <div className="relative w-full mt-1">
//                   <textarea
//                     name="feedback_msg"
//                     placeholder="Your feedback here..."
//                     value={feedback_msg}
//                     maxLength={555}
//                     onChange={(e) => onChange(e)}
//                     className="w-full h-32 p-3 pb-7 pr-16 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-rose-500 resize-none block"
//                     required
//                   />
//                   <span className="absolute bottom-2 right-3 text-xs text-gray-400 pointer-events-none select-none z-10">
//                     {(feedback_msg || "").length}/555
//                   </span>
//                 </div>
//               </div>

//               <div className="mb-4 form-group">
//                 <label
//                   className="block mb-2 text-sm font-bold text-gray-700"
//                   htmlFor="rating"
//                 >
//                   Rating <span className="text-red-500"> *</span>
//                 </label>
//                 <div className="flex mb-4">{renderStars()}</div>
//               </div>

//               <button
//                 className={`my-bg hover:my-bg text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? "opacity-50 cursor-not-allowed" : ""
//                   }`}
//                 type="submit"
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <Loader
//                     type="ThreeDots"
//                     color="#fff"
//                     height={15}
//                     width={15}
//                   />
//                 ) : (
//                   "Submit"
//                 )}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default connect(null, { setAlert })(Contact);




// =====================================================================================




// import React, { useState, useEffect } from "react";
// import { Helmet } from "react-helmet";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { connect } from "react-redux";
// import setAlert from "../store/actions/alert";
// import Loader from "react-loader-spinner";
// import Email from "@mui/icons-material/Email";
// import LocationOn from "@mui/icons-material/LocationOn";
// import Phone from "@mui/icons-material/Phone";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faStar } from "@fortawesome/free-solid-svg-icons";

// const EMPTY_FORM = {
//   name: "",
//   contact_number: "",
//   email: "",
//   property_name: "",
//   rating: 1,
//   feedback_msg: "",
// };

// const RATING_LABELS = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

// const inputClass =
//   "w-full px-3 py-2.5 text-[14.5px] text-gray-700 bg-white border border-gray-300 rounded-lg outline-none transition focus:border-[#D61F45] focus:ring-2 focus:ring-[#D61F45]/20";

// const Label = ({ children }) => (
//   <strong className="font-bold text-gray-800">
//     <em>{children}</em>
//   </strong>
// );

// const FieldLabel = ({ htmlFor, children }) => (
//   <label className="block mb-1.5 text-sm font-semibold text-gray-700" htmlFor={htmlFor}>
//     {children} <span className="text-red-500">*</span>
//   </label>
// );

// const Contact = ({ setAlert }) => {
//   const [formData, setFormData] = useState(EMPTY_FORM);
//   const { name, contact_number, email, property_name, rating, feedback_msg } = formData;

//   const [loading, setLoading] = useState(false);
//   const [alert, setLocalAlert] = useState(null);

//   // Contact information from the Admin Panel settings
//   const [contactInfo, setContactInfo] = useState({
//     address: "",
//     email: "",
//     phone: "",
//     latitude: "",
//     longitude: "",
//   });

//   useEffect(() => {
//     window.scrollTo(0, 0);

//     const fetchContactInfo = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API_URL}/cust_api/get_setting`);
//         const { data } = response.data; // "data" array from the response
//         if (data && data.length > 0) {
//           const { address, emaild_id, contact, latitude, longitude } = data[0];
//           setContactInfo({
//             address: address || "",
//             email: emaild_id || "",
//             phone: contact ? `+91 ${contact}` : "",
//             latitude: latitude || "",
//             longitude: longitude || "",
//           });
//         }
//       } catch (error) {
//         setAlert("Error fetching contact information", "error");
//       }
//     };

//     fetchContactInfo();
//   }, [setAlert]);

//   const showLocalAlert = (msg, type) => {
//     setLocalAlert({ msg, type });
//     window.scrollTo(0, 0);
//     setTimeout(() => setLocalAlert(null), 3000);
//   };

//   const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleStarClick = (newRating) => setFormData({ ...formData, rating: newRating });

//   const onSubmit = (e) => {
//     e.preventDefault();
//     const config = { headers: { "Content-Type": "application/json" } };

//     setLoading(true);
//     axios
//       .post(
//         `${process.env.REACT_APP_API_URL}/cust_api/give_us_feedback`,
//         { name, contact_number, email, property_name, rating, feedback_msg },
//         config,
//       )
//       .then(() => {
//         setAlert("Feedback Submitted", "success");
//         showLocalAlert("Thank you! Your feedback has been submitted successfully.", "success");
//         setLoading(false);
//         setFormData(EMPTY_FORM);
//       })
//       .catch(() => {
//         setAlert("Error Submitting Feedback", "error");
//         showLocalAlert("Sorry, we couldn't submit your feedback. Please try again.", "danger");
//         setLoading(false);
//       });
//   };

//   const renderStars = () =>
//     [...Array(5)].map((_, index) => {
//       const starValue = index + 1;
//       return (
//         <button
//           key={starValue}
//           type="button"
//           onClick={() => handleStarClick(starValue)}
//           aria-label={`${starValue} star${starValue > 1 ? "s" : ""}`}
//           className="p-0.5 bg-transparent border-0"
//         >
//           <FontAwesomeIcon
//             icon={faStar}
//             className={`text-2xl transition-colors ${starValue <= rating ? "text-yellow-500" : "text-gray-300"}`}
//           />
//         </button>
//       );
//     });

//   // Map: exact coordinates if the admin saved them, otherwise the address.
//   const mapQuery =
//     contactInfo.latitude && contactInfo.longitude
//       ? `${contactInfo.latitude},${contactInfo.longitude}`
//       : encodeURIComponent(contactInfo.address || "");

//   const contactItems = [
//     { key: "address", Icon: LocationOn, title: "Location", value: contactInfo.address },
//     {
//       key: "email",
//       Icon: Email,
//       title: "Email",
//       value: contactInfo.email,
//       href: contactInfo.email ? `mailto:${contactInfo.email}` : null,
//     },
//     {
//       key: "phone",
//       Icon: Phone,
//       title: "Phone",
//       value: contactInfo.phone,
//       href: contactInfo.phone ? `tel:${contactInfo.phone.replace(/\s/g, "")}` : null,
//     },
//   ];

//   return (
//     <div className="flex flex-col min-h-screen bg-white feedback">
//       <Helmet>
//         <title>Feedback - ApnaGhar</title>
//         <meta name="description" content="Share your feedback with ApnaGhar and help us improve your property search experience." />
//       </Helmet>

//       {/* ---------- Title bar ---------- */}
//       <nav className="flex items-center justify-between w-full gap-3 px-4 py-5 text-black bg-gray-100 md:px-20">
//         <h1 className="m-0 text-lg font-semibold md:text-xl">Feedback</h1>
//         <div className="flex-shrink-0 text-sm text-gray-500">
//           <Link to="/" className="text-gray-500 no-underline hover:no-underline hover:text-[#D61F45]">
//             Home
//           </Link>
//           <span className="mx-1">›</span>
//           <span className="font-medium text-[#D61F45]">Feedback</span>
//         </div>
//       </nav>

//       {/* ---------- Content ---------- */}
//       <div className="px-4 py-6 text-[15px] leading-relaxed text-gray-700 md:px-20 md:py-8">
//         <h2 className="mb-2 text-2xl font-bold text-gray-800 md:text-[26px]">Share Your Feedback</h2>
//         <p className="mb-6">
//           <Label>We Value Your Opinion:</Label> Tell us about your experience with ApnaGhar or with a property
//           you visited. Your feedback helps us improve our platform and serve you better.
//         </p>

//         {alert && (
//           <div
//             className={`mb-5 px-4 py-3 text-[14.5px] font-medium rounded-lg border ${alert.type === "success"
//                 ? "bg-green-50 text-green-700 border-green-200"
//                 : "bg-red-50 text-red-700 border-red-200"
//               }`}
//             role="alert"
//           >
//             {alert.msg}
//           </div>
//         )}

//         <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
//           {/* ---------- Contact details + map ---------- */}
//           <div>
//             <p className="mb-4">
//               <Label>Get In Touch:-</Label>
//             </p>

//             <div className="space-y-3">
//               {contactItems.map(({ key, Icon, title, value, href }) => (
//                 <div key={key} className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl">
//                   <span className="flex items-center justify-center flex-shrink-0 w-11 h-11 rounded-xl bg-[#FFF1F4] text-[#D61F45]">
//                     <Icon style={{ fontSize: 24 }} />
//                   </span>
//                   <div className="min-w-0">
//                     <h4 className="m-0 text-[15px] font-semibold text-gray-800">{title}:</h4>
//                     {value ? (
//                       href ? (
//                         <a href={href} className="text-gray-600 break-words no-underline hover:text-[#D61F45]">
//                           {value}
//                         </a>
//                       ) : (
//                         <p className="m-0 text-gray-600 break-words">{value}</p>
//                       )
//                     ) : (
//                       <div className="w-40 h-4 mt-1.5 rounded bg-gray-100 animate-pulse" />
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {mapQuery && (
//               <iframe
//                 width="100%"
//                 height="250"
//                 title="ApnaGhar office location"
//                 frameBorder="0"
//                 scrolling="no"
//                 loading="lazy"
//                 src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
//                 className="block mt-4 border border-gray-200 rounded-xl"
//               />
//             )}
//           </div>

//           {/* ---------- Feedback form ---------- */}
//           <div>
//             <p className="mb-4">
//               <Label>Feedback Form:-</Label>
//             </p>

//             <form className="p-5 border border-gray-200 rounded-xl md:p-6" onSubmit={onSubmit}>
//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                 <div>
//                   <FieldLabel htmlFor="name">Name</FieldLabel>
//                   <input
//                     id="name"
//                     className={inputClass}
//                     name="name"
//                     type="text"
//                     placeholder="Full Name"
//                     onChange={onChange}
//                     value={name}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <FieldLabel htmlFor="contact_number">Phone Number</FieldLabel>
//                   <input
//                     id="contact_number"
//                     className={inputClass}
//                     name="contact_number"
//                     type="tel"
//                     placeholder="+91 1234567890"
//                     value={contact_number}
//                     required
//                     title="Please enter a valid phone number"
//                     onChange={(e) => {
//                       const digits = e.target.value.replace(/\D/g, "");
//                       e.target.setCustomValidity(
//                         digits.length < 7 || digits.length > 15 ? "Phone number must be between 7 and 15 digits" : "",
//                       );
//                       onChange(e);
//                     }}
//                     onKeyPress={(e) => {
//                       const digits = e.target.value.replace(/\D/g, "");
//                       if (!/[0-9\s+]/.test(e.key)) e.preventDefault();
//                       if (digits.length >= 15 && /[0-9]/.test(e.key)) e.preventDefault();
//                     }}
//                   />
//                 </div>
//               </div>

//               <div className="mt-4">
//                 <FieldLabel htmlFor="email">Email</FieldLabel>
//                 <input
//                   id="email"
//                   className={inputClass}
//                   name="email"
//                   type="email"
//                   placeholder="example@gmail.com"
//                   onChange={onChange}
//                   value={email}
//                   required
//                 />
//               </div>

//               <div className="mt-4">
//                 <FieldLabel htmlFor="property_name">Property/Project Name</FieldLabel>
//                 <input
//                   id="property_name"
//                   className={inputClass}
//                   name="property_name"
//                   type="text"
//                   placeholder="Property Name"
//                   onChange={onChange}
//                   value={property_name}
//                   required
//                 />
//               </div>

//               <div className="mt-4">
//                 <FieldLabel htmlFor="feedback_msg">Feedback</FieldLabel>
//                 <div className="relative">
//                   <textarea
//                     id="feedback_msg"
//                     name="feedback_msg"
//                     placeholder="Your feedback here..."
//                     value={feedback_msg}
//                     maxLength={555}
//                     onChange={onChange}
//                     className={`${inputClass} block h-32 pb-7 resize-none`}
//                     required
//                   />
//                   <span className="absolute text-xs text-gray-400 pointer-events-none select-none bottom-2 right-3">
//                     {(feedback_msg || "").length}/555
//                   </span>
//                 </div>
//               </div>

//               <div className="mt-4">
//                 <FieldLabel htmlFor="rating">Rating</FieldLabel>
//                 <div className="flex items-center gap-1" id="rating">
//                   {renderStars()}
//                   <span className="ml-2 text-sm font-medium text-gray-600">{RATING_LABELS[rating]}</span>
//                 </div>
//               </div>

//               <button
//                 className={`flex items-center justify-center w-full mt-6 px-6 py-2.5 text-[15px] font-semibold text-white rounded-lg bg-[#D61F45] hover:bg-[#B91C3C] focus:outline-none sm:w-auto ${loading ? "opacity-60 cursor-not-allowed" : ""
//                   }`}
//                 type="submit"
//                 disabled={loading}
//               >
//                 {loading ? <Loader type="ThreeDots" color="#fff" height={15} width={30} /> : "Submit Feedback"}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default connect(null, { setAlert })(Contact);





// =====================================================================================


import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import setAlert from "../store/actions/alert";
import Loader from "react-loader-spinner";
import Email from "@mui/icons-material/Email";
import LocationOn from "@mui/icons-material/LocationOn";
import Phone from "@mui/icons-material/Phone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const EMPTY_FORM = {
  name: "",
  contact_number: "",
  email: "",
  property_name: "",
  rating: 1,
  feedback_msg: "",
};

// ApnaGhar contact details shown on this page (always used, whatever the API returns).
const APNAGHAR_EMAIL = "apnaghar@gmail.com";
const APNAGHAR_PHONE = "+91 8127288127";

const RATING_LABELS = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

const inputClass =
  "w-full px-3 py-2.5 text-[14.5px] text-gray-700 bg-white border border-gray-300 rounded-lg outline-none transition focus:border-[#D61F45] focus:ring-2 focus:ring-[#D61F45]/20";

const Label = ({ children }) => (
  <strong className="font-bold text-gray-800">
    <em>{children}</em>
  </strong>
);

const FieldLabel = ({ htmlFor, children }) => (
  <label className="block mb-1.5 text-sm font-semibold text-gray-700" htmlFor={htmlFor}>
    {children} <span className="text-red-500">*</span>
  </label>
);

const Contact = ({ setAlert }) => {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const { name, contact_number, email, property_name, rating, feedback_msg } = formData;

  const [loading, setLoading] = useState(false);
  const [alert, setLocalAlert] = useState(null);

  // Contact information from the Admin Panel settings
  const [contactInfo, setContactInfo] = useState({
    address: "",
    email: APNAGHAR_EMAIL,
    phone: APNAGHAR_PHONE,
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchContactInfo = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/cust_api/get_setting`);
        const { data } = response.data; // "data" array from the response
        if (data && data.length > 0) {
          const { address, latitude, longitude } = data[0];
          setContactInfo({
            address: address || "",
            email: APNAGHAR_EMAIL,
            phone: APNAGHAR_PHONE,
            latitude: latitude || "",
            longitude: longitude || "",
          });
        }
      } catch (error) {
        setAlert("Error fetching contact information", "error");
      }
    };

    fetchContactInfo();
  }, [setAlert]);

  const showLocalAlert = (msg, type) => {
    setLocalAlert({ msg, type });
    window.scrollTo(0, 0);
    setTimeout(() => setLocalAlert(null), 3000);
  };

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleStarClick = (newRating) => setFormData({ ...formData, rating: newRating });

  const onSubmit = (e) => {
    e.preventDefault();
    const config = { headers: { "Content-Type": "application/json" } };

    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/cust_api/give_us_feedback`,
        { name, contact_number, email, property_name, rating, feedback_msg },
        config,
      )
      .then(() => {
        setAlert("Feedback Submitted", "success");
        showLocalAlert("Thank you! Your feedback has been submitted successfully.", "success");
        setLoading(false);
        setFormData(EMPTY_FORM);
      })
      .catch(() => {
        setAlert("Error Submitting Feedback", "error");
        showLocalAlert("Sorry, we couldn't submit your feedback. Please try again.", "danger");
        setLoading(false);
      });
  };

  const renderStars = () =>
    [...Array(5)].map((_, index) => {
      const starValue = index + 1;
      return (
        <button
          key={starValue}
          type="button"
          onClick={() => handleStarClick(starValue)}
          aria-label={`${starValue} star${starValue > 1 ? "s" : ""}`}
          className="p-0.5 bg-transparent border-0"
        >
          <FontAwesomeIcon
            icon={faStar}
            className={`text-2xl transition-colors ${starValue <= rating ? "text-yellow-500" : "text-gray-300"}`}
          />
        </button>
      );
    });

  // Map: exact coordinates if the admin saved them, otherwise the address.
  const mapQuery =
    contactInfo.latitude && contactInfo.longitude
      ? `${contactInfo.latitude},${contactInfo.longitude}`
      : encodeURIComponent(contactInfo.address || "");

  const contactItems = [
    { key: "address", Icon: LocationOn, title: "Location", value: contactInfo.address },
    {
      key: "email",
      Icon: Email,
      title: "Email",
      value: contactInfo.email,
      href: contactInfo.email ? `mailto:${contactInfo.email}` : null,
    },
    {
      key: "phone",
      Icon: Phone,
      title: "Phone",
      value: contactInfo.phone,
      href: contactInfo.phone ? `tel:${contactInfo.phone.replace(/\s/g, "")}` : null,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white feedback">
      <Helmet>
        <title>Feedback - ApnaGhar</title>
        <meta name="description" content="Share your feedback with ApnaGhar and help us improve your property search experience." />
      </Helmet>

      {/* ---------- Title bar ---------- */}
      <nav className="flex items-center justify-between w-full gap-3 px-4 py-5 text-black bg-gray-100 md:px-20">
        <h1 className="m-0 text-lg font-semibold md:text-xl">Feedback</h1>
        <div className="flex-shrink-0 text-sm text-gray-500">
          <Link to="/" className="text-gray-500 no-underline hover:no-underline hover:text-[#D61F45]">
            Home
          </Link>
          <span className="mx-1">›</span>
          <span className="font-medium text-[#D61F45]">Feedback</span>
        </div>
      </nav>

      {/* ---------- Content ---------- */}
      <div className="px-4 py-6 text-[15px] leading-relaxed text-gray-700 md:px-20 md:py-8">
        <h2 className="mb-2 text-2xl font-bold text-gray-800 md:text-[26px]">Share Your Feedback</h2>
        <p className="mb-6">
          <Label>We Value Your Opinion:</Label> Tell us about your experience with ApnaGhar or with a property
          you visited. Your feedback helps us improve our platform and serve you better.
        </p>

        {alert && (
          <div
            className={`mb-5 px-4 py-3 text-[14.5px] font-medium rounded-lg border ${alert.type === "success"
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-red-50 text-red-700 border-red-200"
              }`}
            role="alert"
          >
            {alert.msg}
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* ---------- Contact details + map ---------- */}
          <div>
            <p className="mb-4">
              <Label>Get In Touch:-</Label>
            </p>

            <div className="space-y-3">
              {contactItems.map(({ key, Icon, title, value, href }) => (
                <div key={key} className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl">
                  <span className="flex items-center justify-center flex-shrink-0 w-11 h-11 rounded-xl bg-[#FFF1F4] text-[#D61F45]">
                    <Icon style={{ fontSize: 24 }} />
                  </span>
                  <div className="min-w-0">
                    <h4 className="m-0 text-[15px] font-semibold text-gray-800">{title}:</h4>
                    {value ? (
                      href ? (
                        <a href={href} className="text-gray-600 break-words no-underline hover:text-[#D61F45]">
                          {value}
                        </a>
                      ) : (
                        <p className="m-0 text-gray-600 break-words">{value}</p>
                      )
                    ) : (
                      <div className="w-40 h-4 mt-1.5 rounded bg-gray-100 animate-pulse" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {mapQuery && (
              <iframe
                width="100%"
                height="250"
                title="ApnaGhar office location"
                frameBorder="0"
                scrolling="no"
                loading="lazy"
                src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                className="block mt-4 border border-gray-200 rounded-xl"
              />
            )}
          </div>

          {/* ---------- Feedback form ---------- */}
          <div>
            <p className="mb-4">
              <Label>Feedback Form:-</Label>
            </p>

            <form className="p-5 border border-gray-200 rounded-xl md:p-6" onSubmit={onSubmit}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <input
                    id="name"
                    className={inputClass}
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    onChange={onChange}
                    value={name}
                    required
                  />
                </div>

                <div>
                  <FieldLabel htmlFor="contact_number">Phone Number</FieldLabel>
                  <input
                    id="contact_number"
                    className={inputClass}
                    name="contact_number"
                    type="tel"
                    placeholder="+91 9876543210"
                    value={contact_number}
                    required
                    title="Please enter a valid phone number"
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, "");
                      e.target.setCustomValidity(
                        digits.length < 7 || digits.length > 15 ? "Phone number must be between 7 and 15 digits" : "",
                      );
                      onChange(e);
                    }}
                    onKeyPress={(e) => {
                      const digits = e.target.value.replace(/\D/g, "");
                      if (!/[0-9\s+]/.test(e.key)) e.preventDefault();
                      if (digits.length >= 15 && /[0-9]/.test(e.key)) e.preventDefault();
                    }}
                  />
                </div>
              </div>

              <div className="mt-4">
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <input
                  id="email"
                  className={inputClass}
                  name="email"
                  type="email"
                  placeholder="example@gmail.com"
                  onChange={onChange}
                  value={email}
                  required
                />
              </div>

              <div className="mt-4">
                <FieldLabel htmlFor="property_name">Property/Project Name</FieldLabel>
                <input
                  id="property_name"
                  className={inputClass}
                  name="property_name"
                  type="text"
                  placeholder="Property Name"
                  onChange={onChange}
                  value={property_name}
                  required
                />
              </div>

              <div className="mt-4">
                <FieldLabel htmlFor="feedback_msg">Feedback</FieldLabel>
                <div className="relative">
                  <textarea
                    id="feedback_msg"
                    name="feedback_msg"
                    placeholder="Your feedback here..."
                    value={feedback_msg}
                    maxLength={555}
                    onChange={onChange}
                    className={`${inputClass} block h-32 pb-7 resize-none`}
                    required
                  />
                  <span className="absolute text-xs text-gray-400 pointer-events-none select-none bottom-2 right-3">
                    {(feedback_msg || "").length}/555
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <FieldLabel htmlFor="rating">Rating</FieldLabel>
                <div className="flex items-center gap-1" id="rating">
                  {renderStars()}
                  <span className="ml-2 text-sm font-medium text-gray-600">{RATING_LABELS[rating]}</span>
                </div>
              </div>

              <button
                className={`flex items-center justify-center w-full mt-6 px-6 py-2.5 text-[15px] font-semibold text-white rounded-lg bg-[#D61F45] hover:bg-[#B91C3C] focus:outline-none sm:w-auto ${loading ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                type="submit"
                disabled={loading}
              >
                {loading ? <Loader type="ThreeDots" color="#fff" height={15} width={30} /> : "Submit Feedback"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { setAlert })(Contact);