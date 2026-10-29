// import React, { useState, useEffect, useRef } from "react";
// import { IoIosInformationCircle } from "react-icons/io";
// import { ToWords } from "to-words";
// import { Plus } from "lucide-react"; // Using Lucide Icons for delete button
// import { MdOutlineDriveFolderUpload } from "react-icons/md";
// import axios from "axios";
// import { Trash } from "@phosphor-icons/react";
// import { FaFilePdf } from "react-icons/fa";
// import { useHistory } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { IoMdClose } from "react-icons/io";
// import Select from "react-select";
// import {
//   GoogleMap,
//   Marker,
//   Autocomplete,
//   useJsApiLoader,
// } from "@react-google-maps/api";
// import { MdErrorOutline } from "react-icons/md";
// import { Country, State } from "country-state-city";
// import { FaRupeeSign } from "react-icons/fa";

// const AddNewProject = () => {
//   // Define state for the form fields
//   const [projectName, setProjectName] = useState("");
//   const [isFeatured, setIsFeatured] = useState(false);
//   const userId = sessionStorage.getItem("accessToken");
//   const user_type = sessionStorage.getItem("user_type");
//   const user_name = sessionStorage.getItem("user_name");
//   const Mobile_Number = sessionStorage.getItem("Mobile_Number");
//   const user_email = sessionStorage.getItem("user_email");
//   const [buildingType, setBuildingType] = useState("Residential");
//   const [propertyType, setPropertyType] = useState("Apartment");
//   const [allCountries, setAllCountries] = useState([]);
//   const [allStates, setAllStates] = useState([]);
//   const [address, setAddress] = useState("");
//   const [addressArea, setAddressArea] = useState("");
//   const [city, setCity] = useState("");
//   const [locality, setLocality] = useState("");
//   const [subLocality, setSubLocality] = useState("");
//   const [state, setState] = useState("");
//   const [country, setCountry] = useState("");
//   const [zipCode, setZipCode] = useState("");
//   const [latitude, setLatitude] = useState("");
//   const [longitude, setLongitude] = useState("");
//   const autoCompleteRef = useRef(null);
//   const GOOGLE_MAPS_API_KEY = "AIzaSyAUCNwxnNo52kFWJNGhRVj-AnkoffmzYe0";
//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: GOOGLE_MAPS_API_KEY,
//     libraries: ["places"],
//   });

//   const [totalProjectSize, setTotalProjectSize] = useState("");
//   const [averagePrice, setAveragePrice] = useState("");

//   const [configurations, setConfigurations] = useState("");
//   const [launchDate, setLaunchDate] = useState("");
//   const [possessionStart, setPossessionStart] = useState("");
//   const [constructionStatus, setConstructionStatus] = useState("");
//   const [reraId, setReraId] = useState("");
//   const [floorLivingDining, setFloorLivingDining] = useState("");
//   const [floorKitchenToilet, setFloorKitchenToilet] = useState("");
//   const [floorBedroom, setFloorBedroom] = useState("");
//   const [floorBalcony, setFloorBalcony] = useState("");
//   const [wallsLivingDining, setWallsLivingDining] = useState("");
//   const [wallServantRoom, setWallCeilingsServantRoom] = useState("");
//   const [wallsKitchenToilet, setWallsKitchenToilet] = useState("");
//   const [wallsServantRoom, setWallsServantRoom] = useState("");
//   const [ceiling, setCeiling] = useState("");
//   const [ceilingsServantRoom, setCeilingsServantRoom] = useState("");
//   const [countersKitchenToilet, setCountersKitchenToilet] = useState("");
//   const [fittingsKitchenToilet, setFittingsKitchenToilet] = useState("");
//   const [fittingsServantRoomToilet, setFittingsServantRoomToilet] =
//     useState("");
//   const [internalDoor, setInternalDoor] = useState("");
//   const [externalGlazing, setExternalGlazing] = useState("");
//   const [electrical, setElectrical] = useState("");
//   const [backup, setBackup] = useState("");
//   const [securitySystem, setSecuritySystem] = useState("");
//   const [description, setDescription] = useState("");
//   const [coverImage, setCoverImage] = useState("");
//   const [videoUrl, setVideoUrl] = useState("");
//   const [video, setVideo] = useState(null);
//   const [videoFile, setVideoFile] = useState(null);
//   const videoInputRef = useRef(null);
//   const [videoSource, setVideoSource] = useState("");
//   const [videoURL, setVideoURL] = useState("");
//   const [virtualTourLink, setVirtualTourLink] = useState("");
//   const history = useHistory();
//   const [mapCenter, setMapCenter] = useState({ lat: 18.5204, lng: 73.8567 });
//   const [amenitiesList, setAmenitiesList] = useState([]);
//   const calendarRef = useRef(null);
//   const possessionStartRef = useRef(null);
//   const [showUpcomingProjectCount, setShowUpcomingProjectCount] =
//     useState(false);
//   const [showFeaturePopup, setShowFeaturePopup] = useState(false);
//   const [isCountLoaded, setIsCountLoaded] = useState(false);
//   const [upcomingProjectCount, setUpcomingProjectCount] = useState(0);
//   const [featureCount, setFeatureCount] = useState(0);
//   const [brochureDoc, setBrochureDoc] = useState(null);
//   const brochureInputRef = useRef(null);
//   const [errors, setErrors] = useState({});
//   const [completedSteps, setCompletedSteps] = useState([]);
//   const [companyLogo, setCompanyLogo] = useState(null);
//   const companyLogoInputRef = useRef(null);
//   //const [officeSubType, setOfficeSubType] = useState("");
//   //const [landType, setLandType] = useState("");
//   //const [retailType, setRetailType] = useState("");
//   // const [storageType, setStorageType] = useState("");
//   // const [industryType, setIndustryType] = useState("");
//   // const [hospitalityType, setHospitalityType] = useState("");
//   // const [RetailSubType, setRetailSubType] = useState("");
//   // const [retailLocation, setRetailLocation] = useState("");
//   const [retailWashroom, setRetailWashroom] = useState("");
//   const [totalNumberParking, setTotalNumberParking] = useState("");
//   const [parkingTypes, setParkingTypes] = useState("");
//   const [formErrors, setFormErrors] = useState({});
//   const emptyProjectProperty = {
//     project_type: "",
//     sub_project_type: "",
//     retail_location: "",
//     sub_sub_project_type: "",
//     price: "",
//     bhk_type: "",
//     carpet_area: "",
//     carpet_area_in: "",
//     area: "",
//     area_in: "",
//     bathroom: "",
//     commercial_washroom: "",
//     total_floor: "",
//     project_floor: "",
//     no_of_cabines: "",
//     no_of_meeting_Rooms: "",
//     no_of_conference_room: "",
//     total_number_of_rooms: "",
//     facing: "",
//     property_dimensions_length: "",
//     property_dimensions_breadth: "",
//     no_of_open_sides: "",
//     parking_types: "",
//     number_of_seats_available: "",
//     purchase_type: "",
//     age_of_property: "",
//     furnished_type: "",
//     balcony: "",
//     pantry_option: "",
//     central_AC: "",
//     reception_area: "",
//     personal_washroom: "",
//   };

//   const [projectProperties, setProjectProperties] = useState([
//     { ...emptyProjectProperty },
//   ]);
//   const handleProjectPropertyChange = (index, key, value) => {
//     setProjectProperties((prev) => {
//       const updated = [...prev];
//       updated[index] = {
//         ...updated[index],
//         [key]: value,
//       };
//       return updated;
//     });
//   };
//   const handleDeleteProjectProperty = (index) => {
//     if (projectProperties.length === 1) {
//       toast.error("At least one project property is required.");
//       return;
//     }

//     setProjectProperties((prev) =>
//       prev.filter((_, i) => i !== index)
//     );
//   };
//   const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);

//   const buildPrompt = () => {
//     return `
// Write a professional real estate project description.

// STRICT INSTRUCTIONS:
// - The description MUST be between 600 and 700 characters ONLY
// - Do NOT exceed 700 characters
// - Do NOT go below 600 characters
// - Write everything in ONE paragraph
// - Do NOT use bullet points or line breaks

// Project Details:
// - Project Name: ${projectName?.trim() || ""}
// - Type: ${propertyType || ""}
// - Building Type: ${buildingType || ""}
// - City: ${city?.trim() || ""}
// - Area: ${addressArea || ""}
// - Average Price: ₹${averagePrice || ""}
// - Configurations: ${configurations || ""}
// - Construction Status: ${constructionStatus || ""}
// - Total Project Size: ${totalProjectSize || ""}
// - Launch Date: ${launchDate || ""}
// - Possession Start: ${possessionStart || ""}

// Make it engaging, attractive, and human-like.
// `;
//   };

//   const generateDescription = async () => {
//     try {
//       setIsGeneratingDescription(true);

//       const response = await axios.post(
//         "https://api.openai.com/v1/chat/completions",
//         {
//           model: "gpt-4o-mini",
//           messages: [
//             {
//               role: "user",
//               content: buildPrompt(),
//             },
//           ],
//           temperature: 0.7,
//           max_tokens: 200,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
//             "Content-Type": "application/json",
//           },
//         },
//       );

//       const generatedDescription =
//         response?.data?.choices?.[0]?.message?.content || "";

//       setDescription(generatedDescription);

//       toast.success("Description generated successfully");
//     } catch (error) {
//       console.error("Generate Description Error:", error);
//       toast.error("Failed to generate description");
//     } finally {
//       setIsGeneratingDescription(false);
//     }
//   };

//   const options = [
//     { value: "Pooja Room", label: "Pooja Room" },
//     { value: "Study Room", label: "Study Room" },
//     { value: "Servant Room", label: "Servant Room" },
//     { value: "Store Room", label: "Store Room" },
//   ];
//   const builderFloorOptions = ["Single Floor", "Duplex", "Triplex"];
//   const constructionOptions = ["Shed", "Rooms", "Washroom", "Others"];

//   const CustomMultiValue = (props) => {
//     return (
//       <div className="flex items-center bg-purple-100 text-purple-700 px-2 py-1 rounded">
//         {props.children}
//       </div>
//     );
//   };
//   const officeOptions = [
//     "Ready to move office space",
//     "Bare shell office space",
//     "Co-working office space",
//   ];

//   const landOptions = [
//     "Commercial Land/Inst. Land",
//     "Industrial Lands/Plots",
//     "Agricultural/Farm Land",
//   ];

//   const retailOptions = ["Commercial Shops", "Commercial Showrooms"];

//   const storageOptions = ["Ware House", "Cold Storage"];

//   const industryOptions = ["Factory", "Manufacturing"];

//   const hospitalityOptions = ["Hotel/Resorts", "Guest-House/Banquet-Halls"];
//   const retailLocationOptions = [
//     "Mall",
//     "Commercial Project",
//     "Residential Project",
//     "Retail Complex/Building",
//     "Market/High Street",
//     "Others",
//   ];

//   const handleInputChange = (eOrKey, value) => {
//     if (typeof eOrKey === "string") {
//       setFormData((prev) => ({
//         ...prev,
//         [eOrKey]: value,
//       }));
//     } else {
//       const { name, value } = eOrKey.target;

//       setFormData((prev) => {
//         const updatedData = {
//           ...prev,
//           [name]: value,
//         };

//         return updatedData;
//       });
//     }
//   };
//   //   const handleProjectPropertyChange = (index, field, value) => {
//   //   const updated = [...projectProperties];

//   //   updated[index] = {
//   //     ...updated[index],
//   //     [field]: value,
//   //   };

//   //   setProjectProperties(updated);
//   // };

//   useEffect(() => {
//     const countries = Country.getAllCountries();
//     setAllCountries(countries);
//   }, []);

//   useEffect(() => {
//     if (country) {
//       const states = State.getStatesOfCountry(country);
//       setAllStates(states);
//     } else {
//       setAllStates([]);
//     }
//   }, [country]);
//   useEffect(() => {
//     const prices = projectProperties
//       .map((property) => Number(property.price))
//       .filter((price) => !isNaN(price) && price > 0);

//     if (prices.length === 0) {
//       setAveragePrice("");
//       return;
//     }

//     const minPrice = Math.min(...prices);
//     const maxPrice = Math.max(...prices);

//     setAveragePrice(
//       minPrice === maxPrice
//         ? `${minPrice}`
//         : `${minPrice}-${maxPrice}`
//     );
//   }, [projectProperties]);
//   useEffect(() => {
//     const bhkOrder = [
//       "Studio/Single Room",
//       "1 BHK",
//       "1.5 BHK",
//       "2 BHK",
//       "2.5 BHK",
//       "3 BHK",
//       "3.5 BHK",
//       "4 BHK",
//       "5 BHK",
//       "6 BHK",
//       "6+ BHK",
//     ];

//     const selected = [
//       ...new Set(
//         projectProperties
//           .map((property) => property.bhk_type)
//           .filter(Boolean)
//       ),
//     ];

//     const sorted = bhkOrder.filter((bhk) => selected.includes(bhk));

//     const formatted = sorted.map((bhk) => {
//       if (bhk === "Studio/Single Room") return bhk;
//       return bhk.replace(" BHK", "");
//     });

//     if (formatted.length === 0) {
//       setConfigurations("");
//       return;
//     }

//     const hasStudio = formatted.includes("Studio/Single Room");
//     const onlyNumbers = formatted.filter((item) => item !== "Studio/Single Room");

//     let result = "";

//     if (hasStudio) {
//       result += "Studio/Single Room";
//       if (onlyNumbers.length) {
//         result += ", ";
//       }
//     }

//     if (onlyNumbers.length) {
//       result += `${onlyNumbers.join(", ")} BHK`;
//     }

//     setConfigurations(result);
//   }, [projectProperties]);

//   const formatAverageProjectPrice = (price) => {
//     if (!price) return "";

//     if (typeof price === "string" && price.includes("-")) {
//       const parts = price.split("-").map((p) => p.trim());
//       return (
//         <>
//           {parts.map((p, idx) => {
//             const num = parseInt(p);
//             if (isNaN(num)) return null;

//             return (
//               <span key={idx} className="inline-flex items-center">
//                 <FaRupeeSign className="inline-block mr-1" />
//                 {num}
//                 {idx === 0 && " - "}
//               </span>
//             );
//           })}
//         </>
//       );
//     }

//     const num = parseInt(price);
//     if (isNaN(num)) return "";

//     return (
//       <span className="inline-flex items-center">
//         <FaRupeeSign className="inline-block mr-1" />
//         {num}
//       </span>
//     );
//   };

//   const handleBrochureUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const fileSizeMB = file.size / (1024 * 1024);
//     if (fileSizeMB > 50) {
//       alert("File size exceeds 50MB limit");
//       return;
//     }

//     setBrochureDoc(file);
//   };

//   const handleBrochureDelete = () => {
//     setBrochureDoc(null);
//   };

//   const checkPostLimits = async () => {
//     try {
//       const profileForm = new FormData();
//       profileForm.append("user_id", userId);

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
//       console.log(countData);

//       if (countData) {
//         const upcomingCount = countData.upcoming_project_count || 0;
//         const featureCount = countData.mark_as_developer_count || 0;

//         setUpcomingProjectCount(upcomingCount);
//         setFeatureCount(featureCount);

//         // Check conditions *after* setting count
//         if (upcomingCount <= 0) {
//           setShowUpcomingProjectCount(true);
//         } else {
//           setShowUpcomingProjectCount(false);
//         }
//       }

//       setIsCountLoaded(true);
//     } catch (error) {
//       console.error("Error checking post limits:", error);
//       setIsCountLoaded(true); // prevent infinite loading state
//     }
//   };

//   useEffect(() => {
//     if (userId) {
//       checkPostLimits();
//     }
//   }, [userId]);

//   const handlePossessionStartChange = (e) => {
//     setPossessionStart(e.target.value);
//   };

//   const openPossessionStartCalendar = () => {
//     if (possessionStartRef.current) {
//       possessionStartRef.current.showPicker();
//     }
//   };

//   const handleDateChange = (e) => {
//     setLaunchDate(e.target.value);
//   };

//   const openCalendar = () => {
//     if (calendarRef.current) {
//       calendarRef.current.showPicker();
//     }
//   };

//   const steps = [
//     "Basic Info",
//     "Address",
//     "Project Details",
//     "Amenities",
//     "Photos / Videos",
//   ];
//   const [activeStep, setActiveStep] = useState(0);

//   const nextStep = () =>
//     setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
//   const prevStep = () => setActiveStep((prev) => Math.max(prev - 1, 0));

//   const buildingTypes = ["Residential", "Commercial"];
//   const residentialTypes = [
//     "Apartment",
//     // "Plot",
//     "Independent House/Villa",
//     "Independent/Builder Floor",
//     "1RK/Studio Apartment",
//     "Service Apartment",
//     "Farmhouse",
//     "Other",
//   ];

//   const commercialTypes = [
//     "Office",
//     "Retail",
//     "Plot/Land",
//     // "Office Space in IT/SEZ",
//     "Storage",
//     // "Warehouse",
//     "Industry",
//     "Hospitality",
//     "Other",
//   ];

//   const [selectedAmenities, setSelectedAmenities] = useState([]);

//   const toggleAmenity = (amenity) => {
//     console.log("Clicked Amenity:", amenity);
//     setSelectedAmenities((prev) =>
//       prev.includes(amenity)
//         ? prev.filter((item) => item !== amenity)
//         : [...prev, amenity],
//     );
//   };

//   useEffect(() => {
//     const fetchAmenities = async () => {
//       try {
//         const response = await axios.post(
//           `${process.env.REACT_APP_API_URL}/cust_api/get_amenities`,
//         );
//         if (response.data.status === 1) {
//           setAmenitiesList(response.data.data);
//         } else {
//           console.error("Failed to fetch amenities");
//         }
//       } catch (error) {
//         console.error("Error fetching amenities:", error);
//       }
//     };

//     fetchAmenities();
//   }, []);

//   const [formData, setFormData] = useState({
//     step1: {},
//     step2: {},
//     step3: {},
//     step4: {},

//     average_project_price: "",
//     bhk_type: "",
//     area: "",
//     area_in: "",
//     carpet_area: "",
//     carpet_area_in: "",

//     custom_deposit_amount: "",
//     total_beds: "",
//     all_inclusive_price: "No",
//     price_onwards: "No",
//     price_negotiable: "No",
//     tax_and_goverment_charges: "No",
//   });
//   const handleNext = () => {
//     const updatedData = { ...formData };
//     updatedData[`step${activeStep + 1}`] = currentStepData;
//     setFormData(updatedData);

//     // Add current step to completedSteps
//     setCompletedSteps((prev) => [...new Set([...prev, activeStep])]);

//     nextStep();
//   };

//   const [currentStepData, setCurrentStepData] = useState({});

//   const [fileData, setFileData] = useState([]);

//   const handleDelete = (index) => {
//     setImages((prev) => prev.filter((_, i) => i !== index));
//     setFileData((prev) => prev.filter((_, i) => i !== index));
//   };

//   const imageInputRef = useRef(null);

//   const [images, setImages] = useState([]);

//   const imageInputRef2 = useRef(null);

//   const handleImageUpload2 = (e) => {
//     const files = Array.from(e.target.files);
//     const maxSize = 10 * 1024 * 1024; // 10MB

//     let oversizeFound = false;
//     let oversizedFiles = [];
//     let newImages = [];
//     let newFiles = []; // <-- for original file objects

//     for (let file of files) {
//       if (file.size > maxSize) {
//         oversizeFound = true;
//         oversizedFiles.push(file.name);
//       } else {
//         newImages.push(URL.createObjectURL(file)); // for preview
//         newFiles.push(file); // for backend upload
//       }
//     }

//     if (oversizeFound) {
//       toast.error(
//         `The following images are larger than 10MB: ${oversizedFiles.join(", ")}`,
//       );
//     }

//     setImages((prev) => [...prev, ...newImages]);
//     setFileData((prev) => [...prev, ...newFiles]);

//     e.target.value = "";
//   };

//   const handleVideoUpload = (e) => {
//     const file = e.target.files[0];
//     const maxSize = 50 * 1024 * 1024; // 50MB

//     if (file.size > maxSize) {
//       toast.error(
//         "Video file is larger than 50MB. Please upload a smaller file.",
//       );
//       return;
//     }

//     if (video) {
//       toast.error("You can only upload one video.");
//       return;
//     }

//     setVideo(URL.createObjectURL(file));
//     setVideoFile(file);
//   };

//   const handleVideoDelete = () => {
//     setVideo(null);
//   };

//   const handelCoverImageDelete = () => {
//     setCoverImage(null);
//   };

//   // Inside your component
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async () => {
//     if (!userId) {
//       toast.error("You must be logged in to submit a project.");
//       return;
//     }
//     const isValid = validateStepFields();
//     if (!isValid) {
//       toast.error("Please fill all required fields before submitting.");
//       return;
//     }

//     setIsSubmitting(true);
//     const apiFormData = new FormData();
//     //const projectPropertyFormData = new FormData();
//     // console.log("Furnished:", formData.furnished_type);
//     // console.log("React State:", formData);
//     // console.log("Furnished Value:", formData.furnished_type);
//     const projectData = {
//       user_id: userId,
//       user_type: user_type,
//       custom_deposit_amount: formData.custom_deposit_amount,
//       project_floor: formData.project_floor,
//       total_floor: formData.total_floor,
//       parking_availability: formData.parking_availability,
//       sub_sub_project_type: formData.sub_sub_project_type,
//       investment_options: formData.investment_options,
//       quality_rating: formData.quality_rating,
//       commercial_washroom: formData.commercial_washroom,
//       connect_to_name: user_name,
//       connect_to_no: Mobile_Number,
//       connect_to_email: user_email,
//       project_name: projectName,
//       mark_as_featured: isFeatured ? "Yes" : "No",
//       building_type: buildingType,
//       //project_type: propertyType,
//       address: address,
//       city_name: city,
//       state: state,
//       country: country,
//       zip_code: zipCode,
//       latitude: latitude,
//       longitude: longitude,
//       total_project_size: totalProjectSize,
//       congfigurations: configurations,
//       launch_date: launchDate,
//       possession_start: possessionStart,
//       construction_status: constructionStatus,
//       rera_id: reraId,
//       floor_living_dining: floorLivingDining,
//       floor_kitchen_toilet: floorKitchenToilet,
//       floor_bedroom: floorBedroom,
//       floor_balcony: floorBalcony,
//       walls_living_dining: wallsLivingDining,
//       walls_kitchen_toilet: wallsKitchenToilet,
//       walls_servant_room: wallsServantRoom,
//       ceiling: ceiling,
//       ceilings_servant_room: ceilingsServantRoom,
//       counters_kitchen_toilet: countersKitchenToilet,
//       fittings_fixtures_kitchen_toilet: fittingsKitchenToilet,
//       fittings_fixtures_servant_room_toilet: fittingsServantRoomToilet,
//       door_window_internal_door: internalDoor,
//       door_window_external_glazing: externalGlazing,
//       electrical: electrical,
//       backup: backup,
//       security_system: securitySystem,
//       virtual_tour_availability: virtualTourLink ? "Yes" : "No",
//       project_description: description,
//       amenities: selectedAmenities,
//       video_url: videoUrl,
//       video_url_type: videoSource,
//       land_type: formData.land_type,
//       selectedConstructionOnLand: formData.selectedConstructionOnLand,
//       openSidesOfLand: formData.openSidesOfLand,
//       length_of_land: formData.length_of_land,
//       breadthOfLand: formData.breadthOfLand,
//       //no_of_open_sides: formData.no_of_open_sides,
//       type_of_construction: formData.type_of_construction,
//       furnished_type: formData.furnished_type,
//       total_beds: formData.total_beds,
//       office_type: formData.office_type,
//       //parking_types: formData.parking_types,
//       //purchase_type: formData.purchase_type,
//       average_project_price: formData.average_project_price,
//       bhk_type: formData.bhk_type,
//       area: 1,
//       area_in: formData.area_in,
//       carpet_area: formData.carpet_area,
//       carpet_area_in: formData.carpet_area_in,
//       bathroom: formData.bathroom,
//       all_inclusive_price: formData.all_inclusive_price,
//       price_negotiable: formData.price_negotiable,
//       tax_and_goverment_charges: formData.tax_and_goverment_charges,
//       //number_of_seats_available: formData.number_of_seats_available,

//       personal_washroom: formData.personal_washroom,
//       lift_availability: formData.lift_availability,
//       property_dimensions_breadth: formData.property_dimensions_breadth,
//       property_dimensions_length: formData.property_dimensions_length,
//       central_AC: formData.central_AC,
//       total_number_parking: formData.total_number_parking,
//       possession_date: formData.possession_date,
//       age_of_property: formData.age_of_property,
//       room_type: formData.room_type,
//       no_of_peoples: formData.no_of_peoples,
//       available_beds: formData.available_beds,
//       covered_parking: formData.covered_parking,
//       uncovered_parking: formData.uncovered_parking,
//       attached_bathroom: formData.attached_bathroom,
//       attached_balcony: formData.attached_balcony,
//       available_for: formData.available_for,
//       pantry_option: formData.pantry_option,
//       no_of_cabines: formData.no_of_cabines,
//       no_of_meeting_Rooms: formData.no_of_meeting_Rooms,
//       no_of_conference_room: formData.no_of_conference_room,
//       builder_floor_type: formData.builder_floor_type,
//       possession_status: formData.possession_status,
//       possession_by: formData.possession_by,
//       total_number_of_rooms: formData.total_number_of_rooms,
//       reception_area: formData.reception_area,
//       balcony: formData.balcony,
//     };

//     Object.entries(projectData).forEach(([key, value]) => {
//       apiFormData.append(key, value ?? "");
//     });

//     if (coverImage instanceof File) {
//       apiFormData.append("cover_image", coverImage);
//     }
//     if (videoFile) {
//       apiFormData.append("property_video", videoFile);
//     }
//     if (virtualTourLink) {
//       apiFormData.append("virtual_tour_availability", virtualTourLink);
//     }
//     if (brochureDoc instanceof File) {
//       apiFormData.append("brochure_doc", brochureDoc);
//     }
//     if (companyLogo instanceof File) {
//       apiFormData.append("logo", companyLogo);
//     }
//     if (addressArea) {
//       apiFormData.append("address_area", addressArea);
//     }

//     try {
//       console.log([...apiFormData.entries()]);
//       const res = await fetch(
//         `${process.env.REACT_APP_API_URL}/cust_api/post_project`,
//         {
//           method: "POST",
//           body: apiFormData,
//         },
//       );

//       const result = await res.json();

//       if (result.status === "1") {
//         const projectId = result.data._id;

//         // ✅ NEW: Upload gallery images
//         if (fileData && fileData.length > 0) {
//           const imagesFormData = new FormData();
//           imagesFormData.append("project_id", projectId);
//           fileData.forEach((file) => {
//             imagesFormData.append("project_image", file); // matches request.FILES.getlist('project_image')
//           });

//           const imagesRes = await fetch(
//             `${process.env.REACT_APP_API_URL}/cust_api/add_project_images`, // apna actual URL path lagao
//             {
//               method: "POST",
//               body: imagesFormData,
//             },
//           );

//           const imagesResult = await imagesRes.json();
//           console.log("Project Images Upload:", imagesResult);

//           if (imagesResult?.error) {
//             toast.error(imagesResult.error);
//           }
//         }

//         console.log("Project ID:", projectId);
//         console.log("Project Properties:", projectProperties);
//         for (const property of projectProperties) {
//           const projectPropertyFormData = new FormData();

//           projectPropertyFormData.append("project_id", projectId);
//           projectPropertyFormData.append(
//             "price",
//             property.price ?? ""
//           );

//           Object.entries(property).forEach(([key, value]) => {
//             if (key !== "price") {
//               projectPropertyFormData.append(key, value ?? "");
//             }
//           });

//           console.log(
//             "Project Property FormData:",
//             [...projectPropertyFormData.entries()]
//           );

//           const propertyRes = await fetch(
//             `${process.env.REACT_APP_API_URL}/cust_api/add_project_property`,
//             {
//               method: "POST",
//               body: projectPropertyFormData,
//             }
//           );

//           const propertyResult = await propertyRes.json();

//           console.log(propertyResult);
//         }




//         toast.success("Project Data Uploaded successfully.");

//         history.push({
//           pathname: "/dashboard",
//           state: { page: "myProjects" },
//         });
//       } else {
//         toast.error(result.msg || "Failed to upload project.");
//       }

//     } catch (error) {
//       toast.error("An unexpected error occurred. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handlePlaceChanged = () => {
//     const place = autoCompleteRef.current.getPlace();
//     if (!place.geometry || !place.address_components) return;

//     const location = place.geometry.location;
//     setMapCenter({
//       lat: location.lat(),
//       lng: location.lng(),
//     });

//     setLatitude(location.lat().toString()); // Set latitude
//     setLongitude(location.lng().toString());

//     setAddress(place.formatted_address || "");

//     let extractedCountry = "";
//     let extractedState = "";
//     let extractedCity = "";
//     let extractedZip = "";
//     let extractedArea = "";

//     place.address_components.forEach((component) => {
//       const types = component.types;

//       if (types.includes("country")) {
//         extractedCountry = component.short_name; // Use "IN", "US", etc.
//       }

//       if (types.includes("administrative_area_level_1")) {
//         extractedState = component.long_name; // Like "Maharashtra"
//       }

//       if (types.includes("locality")) {
//         extractedCity = component.long_name;
//       }

//       if (types.includes("postal_code")) {
//         extractedZip = component.long_name;
//       }

//       if (
//         types.includes("sublocality") ||
//         types.includes("sublocality_level_1") ||
//         types.includes("neighborhood")
//       ) {
//         extractedArea = component.long_name; // Extract area (e.g., neighborhood or sublocality)
//       }
//     });

//     // Set address fields
//     setCity(extractedCity);
//     setZipCode(extractedZip);

//     const addressArea =
//       extractedArea && extractedCity
//         ? `${extractedArea}, ${extractedCity}`
//         : extractedCity || extractedArea || "";
//     setAddressArea(addressArea);

//     // Match the country from allCountries by ISO code
//     const matchedCountry = allCountries.find(
//       (c) => c.isoCode === extractedCountry,
//     );
//     if (matchedCountry) {
//       setCountry(matchedCountry.isoCode);

//       // Now set matching state
//       const states = State.getStatesOfCountry(matchedCountry.isoCode);
//       setAllStates(states);

//       const matchedState = states.find(
//         (s) => s.name.toLowerCase() === extractedState.toLowerCase(),
//       );
//       if (matchedState) {
//         setState(matchedState.name);
//       } else {
//         setState("");
//       }
//     } else {
//       setCountry("");
//       setState("");
//     }
//   };

//   useEffect(() => {
//     if (showUpcomingProjectCount) {
//       document.body.classList.add("overflow-hidden");
//     } else {
//       document.body.classList.remove("overflow-hidden");
//     }

//     return () => {
//       document.body.classList.remove("overflow-hidden");
//     };
//   }, [showUpcomingProjectCount]);

//   const validateStepFields = () => {
//     const newErrors = {};

//     if (activeStep === 0) {
//       if (!projectName.trim()) {
//         newErrors.projectName = "Project name is required.";
//       }
//     }

//     if (activeStep === 1) {
//       if (!address?.trim()) {
//         newErrors.address = "Address is required";
//       }
//       if (!city?.trim()) {
//         newErrors.city = "City is required";
//       }
//       if (!country?.trim()) {
//         newErrors.country = "Country is required";
//       }
//       if (!state?.trim()) {
//         newErrors.state = "State is required";
//       }
//       if (!zipCode?.trim()) {
//         newErrors.zipCode = "Zip code is required";
//       }
//     }

//     if (activeStep === 2) {
//       projectProperties.forEach((property, index) => {
//         if (!property.price) {
//           newErrors[`price_${index}`] = "Price is required";
//         }

//         if (buildingType !== "Commercial" && propertyType !== "Plot/Land") {
//           if (!property.bhk_type) {
//             newErrors[`bhk_type_${index}`] = "BHK is required";
//           }
//         }

//         if (!property.carpet_area) {
//           newErrors[`carpet_area_${index}`] = "Carpet area is required";
//         }

//         if (!property.carpet_area_in) {
//           newErrors[`carpet_area_in_${index}`] = "Carpet area unit is required";
//         }

//         if (!property.area) {
//           newErrors[`area_${index}`] = "Built-up area is required";
//         }

//         if (!property.area_in) {
//           newErrors[`area_in_${index}`] = "Built-up area unit is required";
//         }

//         // if (!property.possession_status) {
//         //   newErrors[`possession_status_${index}`] =
//         //     "Construction Status is required";
//         // }

//         // if (
//         //   property.possession_status === "Under Construction" &&
//         //   !property.possession_date
//         // ) {
//         //   newErrors[`possession_date_${index}`] =
//         //     "Possession Date is required";
//         // }
//       });
//     }

//     if (activeStep === 3) {
//       if (selectedAmenities.length === 0) {
//         newErrors.amenities = "At least one amenity must be selected.";
//       } else {
//         delete newErrors.amenities;
//       }
//     }

//     if (activeStep === 4) {
//       if (!coverImage) {
//         newErrors.coverImage = "Please upload a cover image";
//       } else {
//         delete newErrors.coverImage;
//       }

//       if (!companyLogo) {
//         newErrors.companyLogo = "Please upload a company logo";
//       } else {
//         delete newErrors.companyLogo;
//       }
//     }
//     console.log("Validation Errors:", newErrors);
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   if (!isLoaded) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         Loading Maps...
//       </div>
//     );
//   }
//   const toWords = new ToWords({
//     localeCode: "en-IN",
//   });
//   if (!isLoaded) {
//     return <div>Loading Google Maps...</div>;
//   }
//   return (
//     <>
//       <div className="flex flex-col items-center min-h-screen bg-white">
//         {/* Navbar */}
//         <nav className="items-center justify-center hidden w-full p-4 text-black bg-gray-200 md:flex">
//           <h1 className="text-xl">Add New Project</h1>
//         </nav>

//         {/* Stepper Navigation */}
//         <div className="flex flex-wrap justify-center w-full gap-2 p-3 bg-white">
//           {steps.map((step, index) => (
//             <button
//               key={index}
//               className={`px-4 py-2 rounded-full text-sm font-medium transition ${activeStep === index
//                 ? "bg-gray-200 my-text"
//                 : completedSteps.includes(index)
//                   ? "text-green-600"
//                   : "text-gray-600"
//                 }`}
//               onClick={() => {
//                 // Only allow clicking back to completed steps or current
//                 if (completedSteps.includes(index) || index === activeStep) {
//                   setActiveStep(index);
//                 }
//               }}
//             >
//               {index + 1}. {step}
//             </button>
//           ))}
//         </div>

//         {/* Form Card */}
//         <div className="w-full p-6 bg-white max-w-7xl">
//           {/* Render Step Content */}
//           {activeStep === 0 && (
//             <>
//               <div className="max-w-3xl p-3 mx-auto mb-20 border border-gray-300 rounded-xl">
//                 <h2 className="mb-4 text-xl font-semibold text-gray-800">
//                   Basic Details
//                 </h2>

//                 {/* Property Name */}
//                 <div className="mb-4">
//                   <label className="block mb-1 font-medium text-gray-700">
//                     Project Name{" "}
//                     <span className="text-xl font-bold text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="Enter Project Name"
//                     value={projectName}
//                     onChange={(e) => {
//                       const value = e.target.value;
//                       const alphaNumericOnly = value.replace(
//                         /[^a-zA-Z0-9 ]/g,
//                         "",
//                       );
//                       setProjectName(alphaNumericOnly);
//                     }}
//                     className={`w-full p-3 rounded-lg outline-none focus:ring-2 focus:ring-rose-500 ${errors.projectName
//                       ? "border border-red-600"
//                       : "border border-gray-300"
//                       }`}
//                   />
//                   {errors.projectName && (
//                     <p className="flex items-center gap-1 mt-1 text-sm text-red-500">
//                       <MdErrorOutline className="text-lg" />
//                       {errors.projectName}
//                     </p>
//                   )}
//                 </div>

//                 {/* Featured Checkbox */}
//                 <div className="flex items-center mb-4">
//                   <input
//                     type="checkbox"
//                     id="featured"
//                     className="mb-2 mr-2"
//                     checked={isFeatured}
//                     onChange={(e) => {
//                       if (e.target.checked && featureCount === 0) {
//                         setShowFeaturePopup(true);
//                       } else {
//                         setIsFeatured(e.target.checked);
//                       }
//                     }}
//                   />
//                   <label
//                     htmlFor="featured"
//                     className="flex items-center text-gray-700"
//                   >
//                     Showcase Your Project in the Top Projects{" "}
//                     <IoIosInformationCircle className="ml-1 text-lg text-yellow-500 cursor-pointer" />
//                   </label>
//                 </div>

//                 {/* Building Type */}
//                 <div className="mb-4">
//                   <label className="block mb-1 font-medium text-gray-700">
//                     Building Type
//                   </label>

//                   <div className="flex gap-3">
//                     {["Residential", "Commercial"].map((type) => (
//                       <button
//                         key={type}
//                         type="button"
//                         onClick={() => {
//                           setBuildingType(type); // change type
//                           setPropertyType(""); // reset property type

//                           //  IMPORTANT: reset only extra fields (not all)
//                           setFormData((prev) => ({
//                             ...prev,
//                             bhk_type: "",
//                           }));
//                         }}
//                         className={`px-4 py-2 rounded-full border ${buildingType === type
//                           ? "bg-rose-100 text-rose-700 border-rose-500"
//                           : "border-gray-300 text-gray-600"
//                           }`}
//                       >
//                         {type}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* {buildingType === "Commercial" && (
//   <div className="col-span-2">
//     <label className="block mb-1 font-medium text-gray-700">
//       Office Type
//     </label>

//     <select
//       value={formData?.office_type || ""}
//       onChange={(e) =>
//         handleInputChange("office_type", e.target.value)
//       }
//       className="w-full p-2 border rounded"
//     >
//       <option value="">Select Office Type</option>
//       <option value="Ready">Ready</option>
//       <option value="Bare Shell">Bare Shell</option>
//     </select>
//   </div>
// )} */}

//                 {/* Property Type */}
//                 {/* <div className="mb-4">
//                   <label className="block mb-1 font-medium text-gray-700">
//                     Project Type{" "}
//                     <span className="text-xl font-bold text-red-500">*</span>
//                   </label>
//                   <div className="flex flex-wrap gap-1">
//                     <div className="flex flex-wrap gap-1">
//                       {(buildingType === "Residential"
//                         ? residentialTypes
//                         : commercialTypes
//                       ).map((type) => (
//                         <button
//                           key={type}
//                           onClick={() => setPropertyType(type)}
//                           className={`px-4 py-2 rounded-full border ${
//                             propertyType === type
//                               ? "bg-rose-100 text-rose-700 border-rose-500"
//                               : "border-gray-300 text-gray-600"
//                           }`}
//                         >
//                           {type === "Plot/Land" ? "Land" : type}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//                 {propertyType === "Hospitality" && (
//                   <div className="mt-4">
//                     <label className="block mb-1 font-medium text-gray-700">
//                       What kind of hospitality?
//                     </label>

//                     <div className="flex flex-wrap gap-2">
//                       {hospitalityOptions.map((type) => (
//                         <button
//                           key={type}
//                           type="button"
//                           className={`px-4 py-2 rounded-full border transition ${
//                             hospitalityType === type
//                               ? "bg-rose-100 text-rose-700 border-rose-500"
//                               : "border-gray-300 text-gray-600 hover:bg-gray-100"
//                           }`}
//                           onClick={() => {
//                             setHospitalityType(type);

//                             setFormData((prev) => ({
//                               ...prev,
//                               office_type: type,
//                             }));
//                           }}
//                         >
//                           {type}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//                 {propertyType === "Plot/Land" && (
//                   <div className="mt-4">
//                     <label className="block mb-1 font-medium text-gray-700">
//                       What kind of land?
//                     </label>

//                     <div className="flex flex-wrap gap-2">
//                       {landOptions.map((type) => (
//                         <button
//                           key={type}
//                           type="button"
//                           className={`px-4 py-2 rounded-full border transition ${
//                             landType === type
//                               ? "bg-rose-100 text-rose-700 border-rose-500"
//                               : "border-gray-300 text-gray-600 hover:bg-gray-100"
//                           }`}
//                           onClick={() => {
//                             setLandType(type);

//                             setFormData((prev) => ({
//                               ...prev,
//                               office_type: type,
//                             }));
//                           }}
//                         >
//                           {type}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//                 {propertyType === "Industry" && (
//                   <div className="mt-4">
//                     <label className="block mb-1 font-medium text-gray-700">
//                       What kind of industry?
//                     </label>

//                     <div className="flex flex-wrap gap-2">
//                       {industryOptions.map((type) => (
//                         <button
//                           key={type}
//                           type="button"
//                           className={`px-4 py-2 rounded-full border transition ${
//                             industryType === type
//                               ? "bg-rose-100 text-rose-700 border-rose-500"
//                               : "border-gray-300 text-gray-600 hover:bg-gray-100"
//                           }`}
//                           onClick={() => {
//                             setIndustryType(type);

//                             setFormData((prev) => ({
//                               ...prev,
//                               office_type: type,
//                             }));
//                           }}
//                         >
//                           {type}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//                 {propertyType === "Storage" && (
//                   <div className="mt-4">
//                     <label className="block mb-1 font-medium text-gray-700">
//                       What kind of storage?
//                     </label>

//                     <div className="flex flex-wrap gap-2">
//                       {storageOptions.map((type) => (
//                         <button
//                           key={type}
//                           type="button"
//                           className={`px-4 py-2 rounded-full border transition ${
//                             storageType === type
//                               ? "bg-rose-100 text-rose-700 border-rose-500"
//                               : "border-gray-300 text-gray-600 hover:bg-gray-100"
//                           }`}
//                           onClick={() => {
//                             setStorageType(type);

//                             setFormData((prev) => ({
//                               ...prev,
//                               office_type: type,
//                             }));
//                           }}
//                         >
//                           {type}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//                 {propertyType === "Office" && (
//                   <div className="mt-4">
//                     <label className="block mb-1 font-medium text-gray-700">
//                       What kind of office?
//                     </label>

//                     <div className="flex flex-wrap gap-2">
//                       {officeOptions.map((type) => (
//                         <button
//                           key={type}
//                           type="button"
//                           className={`px-4 py-2 rounded-full border transition ${
//                             officeSubType === type
//                               ? "bg-rose-100 text-rose-700 border-rose-500"
//                               : "border-gray-300 text-gray-600 hover:bg-gray-100"
//                           }`}
//                           onClick={() => {
//                             setOfficeSubType(type);

//                             setFormData((prev) => ({
//                               ...prev,
//                               office_type: type,
//                             }));
//                           }}
//                         >
//                           {type}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//                 {propertyType === "Retail" && (
//                   <div className="mt-4">
//                     <label className="block mb-1 font-medium text-gray-700">
//                       What kind of retail?
//                     </label>

//                     <div className="flex flex-wrap gap-2">
//                       {retailOptions.map((type) => (
//                         <button
//                           key={type}
//                           type="button"
//                           className={`px-4 py-2 rounded-full border transition ${
//                             RetailSubType === type
//                               ? "bg-rose-100 text-rose-700 border-rose-500"
//                               : "border-gray-300 text-gray-600 hover:bg-gray-100"
//                           }`}
//                           onClick={() => {
//                             setRetailSubType(type);
//                             setFormData((prev) => ({
//                               ...prev,
//                               office_type: type,
//                             }));
//                           }}
//                         >
//                           {type}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//                 {propertyType === "Retail" && RetailSubType && (
//                   <div className="mt-4">
//                     <label className="block mb-1 font-medium text-gray-700">
//                       Your Retail located inside?
//                     </label>

//                     <div className="flex flex-wrap gap-2">
//                       {retailLocationOptions.map((type) => (
//                         <button
//                           key={type}
//                           type="button"
//                           className={`px-4 py-2 rounded-full border transition ${
//                             retailLocation === type
//                               ? "bg-rose-100 text-rose-700 border-rose-500"
//                               : "border-gray-300 text-gray-600 hover:bg-gray-100"
//                           }`}
//                           onClick={() => {
//                             setRetailLocation(type);
//                             setFormData((prev) => ({
//                               ...prev,
//                               sub_sub_project_type: type,
//                             }));
//                           }}
//                         >
//                           {type}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 )} */}
//               </div>
//             </>
//           )}

//           {activeStep === 1 && (
//             <>
//               <div className="max-w-5xl mx-auto mb-32 bg-white rounded-xl">
//                 <h2 className="text-2xl text-gray-900">Project Address</h2>
//                 <p className="mt-1 text-gray-500">
//                   Place the listing pin on the map
//                 </p>
//                 <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2">
//                   {/* <div className="w-full overflow-hidden bg-gray-200 rounded-lg h-80">
//                              <LoadScript
//                                googleMapsApiKey={GOOGLE_MAPS_API_KEY}
//                                libraries={["places"]}
//                              >
//                                <GoogleMap
//                                  mapContainerStyle={{ width: "100%", height: "100%" }}
//                                  center={mapCenter}
//                                  zoom={14}
//                                >
//                                  <Marker position={mapCenter} />
//                                </GoogleMap>
//                              </LoadScript>
//                            </div> */}

//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="col-span-2">
//                       <label className="font-medium text-gray-700">
//                         Address{" "}
//                         <span className="text-xl font-bold text-red-500">
//                           *
//                         </span>
//                       </label>
//                       {isLoaded ? (
//                         <Autocomplete
//                           onLoad={(ac) => (autoCompleteRef.current = ac)}
//                           onPlaceChanged={handlePlaceChanged}
//                         >
//                           <input
//                             type="text"
//                             value={address}
//                             onChange={(e) => {
//                               const value = e.target.value;
//                               const isValid = /^[a-zA-Z0-9\s]*$/.test(value);
//                               if (isValid) {
//                                 setAddress(value);
//                               }
//                             }}
//                             className={`w-full border rounded-md p-3 text-gray-700 focus:ring-2 focus:ring-rose-500 outline-none ${formErrors.address
//                               ? "border-red-600"
//                               : "border-gray-300"
//                               }`}
//                           />
//                         </Autocomplete>
//                       ) : (
//                         <input
//                           type="text"
//                           disabled
//                           placeholder="Loading Google Maps..."
//                           className={`w-full border rounded-md p-3 text-gray-700 border-gray-300`}
//                         />
//                       )}

//                       {formErrors.address && (
//                         <p className="flex items-center gap-1 mt-1 text-sm text-red-500">
//                           <MdErrorOutline className="text-lg" />
//                           {formErrors.address}
//                         </p>
//                       )}
//                     </div>

//                     {/* Country Dropdown */}
//                     <div>
//                       <label className="font-medium text-gray-700">
//                         Country{" "}
//                         <span className="text-xl font-bold text-red-500">
//                           *
//                         </span>
//                       </label>
//                       <select
//                         value={country}
//                         onChange={(e) => {
//                           setCountry(e.target.value);
//                           setState("");
//                         }}
//                         className={`w-full border rounded-md p-3 text-gray-700 focus:ring-2 focus:ring-rose-500 outline-none ${formErrors.country
//                           ? "border-red-600"
//                           : "border-gray-300"
//                           }`}
//                       >
//                         <option value="">Select Country</option>
//                         {allCountries.map((c) => (
//                           <option key={c.isoCode} value={c.isoCode}>
//                             {c.name}
//                           </option>
//                         ))}
//                       </select>
//                       {formErrors.country && (
//                         <p className="flex items-center gap-1 mt-1 text-sm text-red-500">
//                           <MdErrorOutline className="text-lg" />
//                           {formErrors.country}
//                         </p>
//                       )}
//                     </div>

//                     {/* State Dropdown */}
//                     <div>
//                       <label className="font-medium text-gray-700">
//                         State{" "}
//                         <span className="text-xl font-bold text-red-500">
//                           *
//                         </span>
//                       </label>
//                       <select
//                         value={state}
//                         onChange={(e) => setState(e.target.value)}
//                         className={`w-full border rounded-md p-3 text-gray-700 focus:ring-2 focus:ring-rose-500 outline-none ${formErrors.state
//                           ? "border-red-600"
//                           : "border-gray-300"
//                           }`}
//                       >
//                         <option value="">Select State</option>
//                         {allStates.map((s) => (
//                           <option key={s.isoCode} value={s.name}>
//                             {s.name}
//                           </option>
//                         ))}
//                       </select>
//                       {formErrors.state && (
//                         <p className="flex items-center gap-1 mt-1 text-sm text-red-500">
//                           <MdErrorOutline className="text-lg" />
//                           {formErrors.state}
//                         </p>
//                       )}
//                     </div>

//                     <div>
//                       <label className="font-medium text-gray-700">
//                         City{" "}
//                         <span className="text-xl font-bold text-red-500">
//                           *
//                         </span>
//                       </label>
//                       <input
//                         type="text"
//                         value={city}
//                         onChange={(e) => {
//                           const value = e.target.value;
//                           const isValid = /^[a-zA-Z0-9\s]*$/.test(value);
//                           if (isValid) {
//                             setCity(value);
//                           }
//                         }}
//                         placeholder="Enter City"
//                         className={`w-full border rounded-md p-3 text-gray-700 focus:ring-2 focus:ring-rose-500 outline-none ${formErrors.city ? "border-red-600" : "border-gray-300"
//                           }`}
//                       />
//                       {formErrors.city && (
//                         <p className="flex items-center gap-1 mt-1 text-sm text-red-500">
//                           <MdErrorOutline className="text-lg" />
//                           {formErrors.city}
//                         </p>
//                       )}
//                     </div>
//                     {/* Locality */}
//                     {/* <div>
//                       <label className="font-medium text-gray-700">
//                         Locality{" "}
//                         <span className="invisible text-xl font-bold">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         value={locality}
//                         onChange={(e) => setLocality(e.target.value)}
//                         placeholder="Enter Locality"
//                         className="w-full border rounded-md p-3 text-gray-700 focus:ring-2 focus:ring-rose-500 outline-none border-gray-300"
//                       />
//                     </div> */}

//                     {/* Sub Locality */}
//                     {/* <div>
//                       <label className="font-medium text-gray-700">
//                         Sub Locality{" "}
//                         <span className="invisible text-xl font-bold">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         value={subLocality}
//                         onChange={(e) => setSubLocality(e.target.value)}
//                         placeholder="Enter Sub Locality"
//                         className="w-full border rounded-md p-3 text-gray-700 focus:ring-2 focus:ring-rose-500 outline-none border-gray-300"
//                       />
//                     </div> */}
//                     {/* Zip Code */}
//                     <div>
//                       <label className="font-medium text-gray-700">
//                         Zip <span className="text-xl text-red-500">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         placeholder="Zip Code"
//                         value={zipCode}
//                         onChange={(e) => {
//                           const value = e.target.value;
//                           if (/^\d{0,10}$/.test(value)) {
//                             setZipCode(value);
//                           }
//                         }}
//                         className={`w-full border rounded-md p-3 text-gray-700 focus:ring-2 focus:ring-rose-500 outline-none ${formErrors.zipCode
//                           ? "border-red-600"
//                           : "border-gray-300"
//                           }`}
//                       />
//                       {formErrors.zipCode && (
//                         <p className="flex items-center gap-1 mt-1 text-sm text-red-500">
//                           <MdErrorOutline className="text-lg" />
//                           {formErrors.zipCode}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </>
//           )}

//           {activeStep === 2 && (
//             <>
//               <div className="p-3 mx-auto mb-3 bg-white border max-w-7xl rounded-xl">
//                 <div className="mb-6">
//                   <h2 className="text-2xl font-semibold text-gray-900">
//                     Project Details
//                   </h2>
//                   <p className="text-gray-500">
//                     Enter and manage essential information related to your
//                     project Properties.
//                   </p>
//                 </div>
//                 {projectProperties.map((projectProperty, index) => (
//                   <div
//                     key={index}
//                     className="mb-6 border border-gray-200 rounded-xl p-4"
//                   >
//                     <div className="flex items-center justify-between mb-4">
//                       <h3 className="text-lg font-semibold">
//                         Property {index + 1}
//                       </h3>

//                       {projectProperties.length > 1 && (
//                         <button
//                           type="button"
//                           onClick={() => handleDeleteProjectProperty(index)}
//                           className="px-3 py-1 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600"
//                         >
//                           Delete
//                         </button>
//                       )}
//                     </div>
//                     <div className="grid items-start grid-cols-6 gap-4 p-4 mt-4 rounded-lg">
//                       <div className="col-span-6">
//                         <div className="mb-4">
//                           <label className="block mb-1 font-medium text-gray-700">
//                             Project Type{" "}
//                             <span className="text-xl font-bold text-red-500">*</span>
//                           </label>
//                           <div className="flex flex-wrap gap-1">
//                             <div className="flex flex-wrap gap-1">
//                               {(buildingType === "Residential"
//                                 ? residentialTypes
//                                 : commercialTypes
//                               ).map((type) => (
//                                 <button
//                                   key={type}
//                                   type="button"
//                                   onClick={() =>
//                                     handleProjectPropertyChange(index, "project_type", type)
//                                   }
//                                   className={`px-4 py-2 rounded-full border ${projectProperty.project_type === type
//                                     ? "bg-rose-100 text-rose-700 border-rose-500"
//                                     : "border-gray-300 text-gray-600"
//                                     }`}
//                                 >
//                                   {type === "Plot/Land" ? "Land" : type}
//                                 </button>
//                               ))}
//                             </div>
//                           </div>
//                         </div>
//                         {projectProperty.project_type === "Hospitality" && (
//                           <div className="mt-4">
//                             <label className="block mb-1 font-medium text-gray-700">
//                               What kind of hospitality?
//                             </label>

//                             <div className="flex flex-wrap gap-2">
//                               {hospitalityOptions.map((type) => (
//                                 <button
//                                   key={type}
//                                   type="button"
//                                   className={`px-4 py-2 rounded-full border transition ${projectProperty.sub_project_type === type
//                                     ? "bg-rose-100 text-rose-700 border-rose-500"
//                                     : "border-gray-300 text-gray-600 hover:bg-gray-100"
//                                     }`}
//                                   onClick={() => {
//                                     handleProjectPropertyChange(index, "sub_project_type", type);
//                                   }}
//                                 >
//                                   {type}
//                                 </button>
//                               ))}
//                             </div>
//                           </div>
//                         )}
//                         {projectProperty.project_type === "Plot/Land" && (
//                           <div className="mt-4">
//                             <label className="block mb-1 font-medium text-gray-700">
//                               What kind of land?
//                             </label>

//                             <div className="flex flex-wrap gap-2">
//                               {landOptions.map((type) => (
//                                 <button
//                                   key={type}
//                                   type="button"
//                                   className={`px-4 py-2 rounded-full border transition ${projectProperty.sub_project_type === type
//                                     ? "bg-rose-100 text-rose-700 border-rose-500"
//                                     : "border-gray-300 text-gray-600 hover:bg-gray-100"
//                                     }`}
//                                   onClick={() => {
//                                     handleProjectPropertyChange(index, "sub_project_type", type);
//                                   }}
//                                 >
//                                   {type}
//                                 </button>
//                               ))}
//                             </div>
//                           </div>
//                         )}
//                         {projectProperty.project_type === "Industry" && (
//                           <div className="mt-4">
//                             <label className="block mb-1 font-medium text-gray-700">
//                               What kind of industry?
//                             </label>

//                             <div className="flex flex-wrap gap-2">
//                               {industryOptions.map((type) => (
//                                 <button
//                                   key={type}
//                                   type="button"
//                                   className={`px-4 py-2 rounded-full border transition ${projectProperty.sub_project_type === type
//                                     ? "bg-rose-100 text-rose-700 border-rose-500"
//                                     : "border-gray-300 text-gray-600 hover:bg-gray-100"
//                                     }`}
//                                   onClick={() => {
//                                     handleProjectPropertyChange(index, "sub_project_type", type);
//                                   }}
//                                 >
//                                   {type}
//                                 </button>
//                               ))}
//                             </div>
//                           </div>
//                         )}
//                         {projectProperty.project_type === "Storage" && (
//                           <div className="mt-4">
//                             <label className="block mb-1 font-medium text-gray-700">
//                               What kind of storage?
//                             </label>

//                             <div className="flex flex-wrap gap-2">
//                               {storageOptions.map((type) => (
//                                 <button
//                                   key={type}
//                                   type="button"
//                                   className={`px-4 py-2 rounded-full border transition ${projectProperty.sub_project_type === type
//                                     ? "bg-rose-100 text-rose-700 border-rose-500"
//                                     : "border-gray-300 text-gray-600 hover:bg-gray-100"
//                                     }`}
//                                   onClick={() => {
//                                     handleProjectPropertyChange(index, "sub_project_type", type);
//                                   }}
//                                 >
//                                   {type}
//                                 </button>
//                               ))}
//                             </div>
//                           </div>
//                         )}
//                         {projectProperty.project_type === "Office" && (
//                           <div className="mt-4">
//                             <label className="block mb-1 font-medium text-gray-700">
//                               What kind of office?
//                             </label>

//                             <div className="flex flex-wrap gap-2">
//                               {officeOptions.map((type) => (
//                                 <button
//                                   key={type}
//                                   type="button"
//                                   className={`px-4 py-2 rounded-full border transition ${projectProperty.sub_project_type === type
//                                     ? "bg-rose-100 text-rose-700 border-rose-500"
//                                     : "border-gray-300 text-gray-600 hover:bg-gray-100"
//                                     }`}
//                                   onClick={() => {
//                                     handleProjectPropertyChange(index, "sub_project_type", type);
//                                   }}
//                                 >
//                                   {type}
//                                 </button>
//                               ))}
//                             </div>
//                           </div>
//                         )}
//                         {projectProperty.project_type === "Retail" && (
//                           <div className="mt-4">
//                             <label className="block mb-1 font-medium text-gray-700">
//                               What kind of retail?
//                             </label>

//                             <div className="flex flex-wrap gap-2">
//                               {retailOptions.map((type) => (
//                                 <button
//                                   key={type}
//                                   type="button"
//                                   className={`px-4 py-2 rounded-full border transition ${projectProperty.sub_project_type === type
//                                     ? "bg-rose-100 text-rose-700 border-rose-500"
//                                     : "border-gray-300 text-gray-600 hover:bg-gray-100"
//                                     }`}
//                                   onClick={() => {
//                                     handleProjectPropertyChange(index, "sub_project_type", type);
//                                   }}
//                                 >
//                                   {type}
//                                 </button>
//                               ))}
//                             </div>
//                           </div>
//                         )}
//                         {projectProperty.project_type === "Retail" &&
//                           projectProperty.sub_project_type && (
//                             <div className="mt-4">
//                               <label className="block mb-1 font-medium text-gray-700">
//                                 Your Retail located inside?
//                               </label>

//                               <div className="flex flex-wrap gap-2">
//                                 {retailLocationOptions.map((type) => (
//                                   <button
//                                     key={type}
//                                     type="button"
//                                     className={`px-4 py-2 rounded-full border transition ${projectProperty.retail_location === type
//                                       ? "bg-rose-100 text-rose-700 border-rose-500"
//                                       : "border-gray-300 text-gray-600 hover:bg-gray-100"
//                                       }`}
//                                     onClick={() => {
//                                       handleProjectPropertyChange(index, "retail_location", type);
//                                     }}
//                                   >
//                                     {type}
//                                   </button>
//                                 ))}
//                               </div>
//                             </div>
//                           )}
//                       </div>
//                       {/* Property Price */}
//                       <div className="w-full">
//                         <label className="block mb-0 text-sm font-medium text-gray-700">
//                           Price{" "}
//                           <span className="text-xl font-bold text-red-500">*</span>
//                         </label>
//                         <input
//                           type="text"
//                           value={
//                             projectProperty.price
//                               ? Number(projectProperty.price).toLocaleString("en-IN")
//                               : ""
//                           }
//                           onChange={(e) => {
//                             const rawValue = e.target.value.replace(/,/g, "");

//                             if (/^\d{0,20}$/.test(rawValue)) {
//                               handleProjectPropertyChange(index, "price", rawValue);
//                             }
//                           }}
//                           placeholder="₹"
//                           className="w-full mt-1 p-3 border rounded-lg text-gray-700 outline-none focus:ring-2 focus:ring-rose-500"
//                         />
//                         {projectProperty.price && (
//                           <p className="mt-2 text-sm font-medium text-gray-600">
//                             {toWords.convert(Number(projectProperty.price))}
//                           </p>
//                         )}
//                         {errors[`price_${index}`] && (
//                           <p className="flex items-center gap-1 mt-1 text-sm text-red-500">
//                             <MdErrorOutline className="text-lg" />
//                             {errors[`price_${index}`]}
//                           </p>
//                         )}
//                       </div>

//                       {/* BHK */}
//                       {!(
//                         buildingType === "Commercial" ||
//                         propertyType.project_type === "Plot/Land"
//                       ) && (
//                           <div className="w-full">
//                             <label className="block mb-1 text-sm font-medium text-gray-700">
//                               BHK{" "}
//                               <span className="text-xl font-bold text-red-500">
//                                 *
//                               </span>
//                             </label>

//                             <select
//                               value={projectProperty.bhk_type || ""}
//                               onChange={(e) => {
//                                 handleProjectPropertyChange(index, "bhk_type", e.target.value);
//                                 setConfigurations(e.target.value);
//                               }}
//                               className="w-full mt-1 p-3 border rounded-lg text-gray-700 outline-none focus:ring-2 focus:ring-rose-500"
//                             >
//                               <option value="">Select BHK Type</option>

//                               {(propertyType.project_type === "1RK/Studio Apartment"
//                                 ? ["1 BHK"]
//                                 : [
//                                   "Studio/Single Room",
//                                   "1 BHK",
//                                   "1.5 BHK",
//                                   "2 BHK",
//                                   "2.5 BHK",
//                                   "3 BHK",
//                                   "3.5 BHK",
//                                   "4 BHK",
//                                   "5 BHK",
//                                   "6 BHK",
//                                   "6+ BHK",
//                                 ]
//                               ).map((bhk) => (
//                                 <option key={bhk} value={bhk}>
//                                   {bhk}
//                                 </option>
//                               ))}
//                             </select>

//                             {errors.bhk_type && (
//                               <p className="flex items-center gap-1 mt-1 text-sm text-red-500">
//                                 <MdErrorOutline className="text-lg" />
//                                 {errors.bhk_type}
//                               </p>
//                             )}
//                           </div>
//                         )}

//                       {/* Carpet Area */}
//                       <div>
//                         <label className="font-medium text-gray-700">
//                           Carpet Area <span className="text-red-500">*</span>
//                         </label>
//                         <input
//                           type="text"
//                           value={projectProperty.carpet_area || ""}
//                           onChange={(e) => {
//                             const value = e.target.value;
//                             if (/^\d{0,10}$/.test(value)) {
//                               handleProjectPropertyChange(index, "carpet_area", value);
//                             }
//                           }}
//                           className="w-full mt-1 p-3 border rounded-lg"
//                         />
//                       </div>

//                       <div>
//                         <label className="font-medium text-gray-700">Unit</label>
//                         <select
//                           value={projectProperty.carpet_area_in || ""}
//                           onChange={(e) =>
//                             handleProjectPropertyChange(index, "carpet_area_in", e.target.value)
//                           }
//                           className="w-full mt-1 p-3 border rounded-lg"
//                         >
//                           <option value="">Select</option>
//                           <option value="sq.ft">sq.ft</option>
//                           <option value="sq.yards">sq.yards</option>
//                           <option value="sq.m">sq.m</option>
//                           <option value="acre">acre</option>
//                           <option value="marla">marla</option>
//                           <option value="cents">cents</option>
//                           <option value="bigha">bigha</option>
//                           <option value="kottah">kottah</option>
//                           <option value="kanal">kanal</option>
//                           <option value="grounds">grounds</option>
//                           <option value="ares">ares</option>
//                           <option value="biswa">biswa</option>
//                           <option value="guntha">guntha</option>
//                           <option value="aankadam">aankadam</option>
//                           <option value="hectares">hectares</option>
//                           <option value="rood">rood</option>
//                           <option value="chataks">chataks</option>
//                           <option value="perch">perch</option>
//                         </select>
//                       </div>

//                       {/* Built-up Area */}
//                       <div>
//                         <label className="font-medium text-gray-700">
//                           Built-up Area <span className="text-red-500">*</span>
//                         </label>
//                         <input
//                           type="text"
//                           value={projectProperty.area || ""}
//                           onChange={(e) => {
//                             const value = e.target.value;
//                             if (/^\d{0,10}$/.test(value)) {
//                               handleProjectPropertyChange(index, "area", value);
//                             }
//                           }}
//                           className="w-full mt-1 p-3 border rounded-lg"
//                         />
//                       </div>

//                       <div>
//                         <label className="font-medium text-gray-700">Unit</label>
//                         <select
//                           value={projectProperty.area_in || ""}
//                           onChange={(e) =>
//                             handleProjectPropertyChange(index, "area_in", e.target.value)
//                           }
//                           className="w-full mt-1 p-3 border rounded-lg"
//                         >
//                           <option value="">Select</option>
//                           <option value="sq.ft">sq.ft</option>
//                           <option value="sq.yards">sq.yards</option>
//                           <option value="sq.m">sq.m</option>
//                           <option value="acre">acre</option>
//                           <option value="marla">marla</option>
//                           <option value="cents">cents</option>
//                           <option value="bigha">bigha</option>
//                           <option value="kottah">kottah</option>
//                           <option value="kanal">kanal</option>
//                           <option value="grounds">grounds</option>
//                           <option value="ares">ares</option>
//                           <option value="biswa">biswa</option>
//                           <option value="guntha">guntha</option>
//                           <option value="aankadam">aankadam</option>
//                           <option value="hectares">hectares</option>
//                           <option value="rood">rood</option>
//                           <option value="chataks">chataks</option>
//                           <option value="perch">perch</option>
//                         </select>
//                       </div>

//                       {!(
//                         (buildingType === "Residential" &&
//                           projectProperty.project_type === "Plot/Land") ||
//                         (buildingType === "Commercial" &&
//                           [
//                             "Land",
//                             "Storage",
//                             "Hospitality",
//                             "Industry",
//                             "Retail",
//                             "Warehouse",
//                             "Plot/Land",
//                           ].includes(projectProperty.project_type))
//                       ) && (
//                           <div>
//                             <label className="font-medium text-gray-700">
//                               Bathroom
//                             </label>

//                             <select
//                               className="w-full p-3 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                               value={projectProperty.bathroom || ""}
//                               onChange={(e) =>
//                                 handleProjectPropertyChange(index, "bathroom", Number(e.target.value))
//                               }
//                             >
//                               <option value="">Select Bathrooms</option>
//                               <option value="0">0</option>
//                               <option value="1">1</option>
//                               <option value="2">2</option>
//                               <option value="3">3</option>
//                               <option value="4">4</option>
//                               <option value="4">+4</option>
//                             </select>
//                           </div>
//                         )}
//                       {buildingType === "Commercial" &&
//                         projectProperty.project_type === "Retail" && (
//                           <div>
//                             <label className="font-medium text-gray-700">
//                               Washroom
//                             </label>

//                             <select
//                               value={projectProperty.commercial_washroom || ""}
//                               onChange={(e) =>
//                                 handleProjectPropertyChange(
//                                   index,
//                                   "commercial_washroom",
//                                   e.target.value
//                                 )
//                               }
//                               className="w-full p-3 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                             >
//                               <option value="">Select Washroom</option>
//                               <option value="Private Washrooms">
//                                 Private Washrooms
//                               </option>
//                               <option value="Public Washrooms">
//                                 Public Washrooms
//                               </option>
//                               <option value="Not Available">Not Available</option>
//                             </select>
//                           </div>
//                         )}
//                       {buildingType === "Commercial" &&
//                         ["Storage", "Industry", "Hospitality"].includes(
//                           projectProperty.project_type
//                         ) && (
//                           <div>
//                             <label className="font-medium text-gray-700">
//                               Washroom
//                             </label>

//                             <select
//                               value={projectProperty.commercial_washroom || ""}
//                               onChange={(e) =>
//                                 handleProjectPropertyChange(
//                                   index,
//                                   "commercial_washroom",
//                                   e.target.value
//                                 )
//                               }
//                               className="w-full p-3 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                             >
//                               <option value="">Select Washrooms</option>
//                               <option value="None">None</option>
//                               <option value="Shared">Shared</option>
//                               <option value="1">1</option>
//                               <option value="2">2</option>
//                               <option value="3">3</option>
//                               <option value="4">4</option>
//                               <option value="4+">4+</option>
//                             </select>
//                           </div>
//                         )}
//                       {!(
//                         (buildingType === "Residential" && projectProperty.project_type === "Plot/Land") ||
//                         (buildingType === "Commercial" &&
//                           [
//                             "Land",
//                             "Plot/Land",
//                             "Warehouse",
//                             "Storage",
//                             "Industry",
//                             "Hospitality",
//                           ].includes(projectProperty.project_type))
//                       ) && (
//                           <div>
//                             <label className="font-medium text-gray-700">
//                               Total Floor
//                             </label>

//                             <input
//                               type="text"
//                               name="total_floor"
//                               value={projectProperty.total_floor || ""}
//                               onChange={(e) => {
//                                 const value = e.target.value;
//                                 if (/^[a-zA-Z0-9]{0,10}$/.test(value)) {
//                                   handleProjectPropertyChange(index, "total_floor", value);
//                                 }
//                               }}
//                               className="w-full p-3 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                             />
//                           </div>
//                         )}
//                       {!(
//                         (buildingType === "Residential" && projectProperty.project_type === "Plot/Land") ||
//                         (buildingType === "Commercial" &&
//                           [
//                             "Land",
//                             "Plot/Land",
//                             "Warehouse",
//                             "Industry",
//                             "Storage",
//                             "Hospitality",
//                           ].includes(projectProperty.project_type))
//                       ) && (
//                           <div>
//                             <label className="font-medium text-gray-700">
//                               Flat on the floor
//                             </label>

//                             <select
//                               name="project_floor"
//                               value={projectProperty.project_floor || ""}
//                               onChange={(e) => handleProjectPropertyChange(index, "project_floor", e.target.value)}
//                               className="w-full p-3 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                             >
//                               <option value="">Select Floor</option>

//                               <option value="Lower Basement">Lower Basement</option>

//                               <option value="Basement">Basement</option>

//                               <option value="Lower Ground">Lower Ground</option>

//                               <option value="Ground">Ground</option>

//                               <option value="Rooftop/Terrace">Rooftop/Terrace</option>

//                               {[...Array(Number(projectProperty.total_floor) || 0)].map(
//                                 (_, floorIndex) => (
//                                   <option key={floorIndex + 1} value={`${floorIndex + 1}`}>
//                                     {floorIndex + 1}
//                                   </option>
//                                 ),
//                               )}
//                             </select>
//                           </div>
//                         )}
//                       {buildingType === "Commercial" &&
//                         projectProperty.project_type === "Office" && (
//                           <div>
//                             <label className="font-medium text-gray-700">
//                               No. of Cabines
//                             </label>

//                             <select
//                               value={projectProperty.no_of_cabines || ""}
//                               onChange={(e) =>
//                                 handleProjectPropertyChange(
//                                   index,
//                                   "no_of_cabines",
//                                   e.target.value
//                                 )
//                               }
//                               className="w-full p-3 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                             >
//                               <option value="">Select Cabines</option>
//                               <option value="1">1</option>
//                               <option value="2">2</option>
//                               <option value="3">3</option>
//                               <option value="4">4</option>
//                               <option value="5">5</option>
//                               <option value="10+">10+</option>
//                             </select>
//                           </div>
//                         )}
//                       {buildingType === "Commercial" && projectProperty.project_type === "Office" && (
//                         <div>
//                           <label className="font-medium text-gray-700">
//                             No. of Meeting Rooms
//                           </label>

//                           <select
//                             value={projectProperty.no_of_meeting_Rooms || ""}
//                             onChange={(e) =>
//                               handleProjectPropertyChange(
//                                 index,
//                                 "no_of_meeting_Rooms",
//                                 e.target.value
//                               )
//                             }
//                             className="w-full p-3 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                           >
//                             <option value="">Select Meeting Rooms</option>
//                             <option value="1">1</option>
//                             <option value="2">2</option>
//                             <option value="3">3</option>
//                             <option value="4">4</option>
//                             <option value="5+">5+</option>
//                           </select>
//                         </div>
//                       )}
//                       {buildingType === "Commercial" &&
//                         projectProperty.project_type === "Office" && (
//                           <div>
//                             <label className="font-medium text-gray-700">
//                               No. of Conference Room
//                             </label>

//                             <select
//                               value={projectProperty.no_of_conference_room || ""}
//                               onChange={(e) =>
//                                 handleProjectPropertyChange(
//                                   index,
//                                   "no_of_conference_room",
//                                   e.target.value
//                                 )
//                               }
//                               className="w-full p-3 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                             >
//                               <option value="">Select Conference Room</option>
//                               <option value="0">0</option>
//                               <option value="1">1</option>
//                               <option value="2">2</option>
//                               <option value="3+">3+</option>
//                             </select>
//                           </div>
//                         )}

//                       {buildingType === "Commercial" &&
//                         projectProperty.project_type === "Hospitality" && (
//                           <div>
//                             <label className="font-medium text-gray-700">
//                               Total Number of Rooms
//                             </label>

//                             <input
//                               type="text"
//                               value={projectProperty.total_number_of_rooms || ""}
//                               onChange={(e) => {
//                                 const value = e.target.value;
//                                 if (/^\d*$/.test(value)) {
//                                   handleProjectPropertyChange(
//                                     index,
//                                     "total_number_of_rooms",
//                                     value
//                                   );
//                                 }
//                               }}
//                               placeholder="Enter Total Rooms"
//                               className="w-full p-3 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                             />
//                           </div>
//                         )}
//                       {((buildingType === "Residential" && projectProperty.project_type === "Plot/Land") ||
//                         (buildingType === "Commercial" &&
//                           ["Land", "Plot/Land"].includes(projectProperty.project_type))) && (
//                           <div>
//                             <label className="font-medium text-gray-700">Facing</label>

//                             <select

//                               value={projectProperty.facing || ""}
//                               onChange={(e) =>
//                                 handleProjectPropertyChange(index, "facing", e.target.value)
//                               }
//                               className="w-full p-3 mt-1 border rounded-lg"
//                             >
//                               <option value="">Select Facing</option>

//                               <option value="East">East</option>
//                               <option value="West">West</option>
//                               <option value="North">North</option>
//                               <option value="South">South</option>
//                               <option value="North East">North East</option>
//                               <option value="North West">North West</option>
//                               <option value="South East">South East</option>
//                               <option value="South West">South West</option>
//                             </select>
//                           </div>
//                         )}
//                       {((buildingType === "Residential" && projectProperty.project_type === "Plot/Land") ||
//                         (buildingType === "Commercial" &&
//                           projectProperty.project_type === "Plot/Land")) && (
//                           <>
//                             {/* Length */}
//                             <div>
//                               <label className="font-medium text-gray-700">
//                                 Length of Plot (ft){" "}
//                                 <span className="text-red-500">*</span>
//                               </label>

//                               <input
//                                 type="text"
//                                 value={projectProperty.property_dimensions_length || ""}
//                                 onChange={(e) => {
//                                   const value = e.target.value;
//                                   if (/^\d*$/.test(value)) {
//                                     handleProjectPropertyChange(
//                                       index,
//                                       "property_dimensions_length",
//                                       value
//                                     );
//                                   }
//                                 }}
//                                 placeholder="Enter Length"
//                                 className={`w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-rose-500 outline-none ${errors?.property_dimensions_length
//                                   ? "border-red-600"
//                                   : "border-gray-300"
//                                   }`}
//                               />

//                               {errors?.property_dimensions_length && (
//                                 <p className="text-sm text-red-500 mt-1">
//                                   {errors.property_dimensions_length}
//                                 </p>
//                               )}
//                             </div>

//                             {/* Breadth */}
//                             <div>
//                               <label className="font-medium text-gray-700">
//                                 Breadth of Plot (ft){" "}
//                                 <span className="text-red-500">*</span>
//                               </label>

//                               <input
//                                 type="text"
//                                 value={projectProperty.property_dimensions_breadth || ""}
//                                 onChange={(e) => {
//                                   const value = e.target.value;
//                                   if (/^\d*$/.test(value)) {
//                                     handleProjectPropertyChange(
//                                       index,
//                                       "property_dimensions_breadth",
//                                       value
//                                     );
//                                   }
//                                 }}
//                                 placeholder="Enter Breadth"
//                                 className={`w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-rose-500 outline-none ${errors?.property_dimensions_breadth
//                                   ? "border-red-600"
//                                   : "border-gray-300"
//                                   }`}
//                               />

//                               {errors?.property_dimensions_breadth && (
//                                 <p className="text-sm text-red-500 mt-1">
//                                   {errors.property_dimensions_breadth}
//                                 </p>
//                               )}
//                             </div>
//                           </>
//                         )}
//                       {!(
//                         (buildingType === "Residential" && projectProperty.project_type === "Plot/Land") ||
//                         (buildingType === "Commercial" &&
//                           [
//                             //"Land",
//                             "Plot/Land",
//                             "Industry",
//                             "Storage",
//                             "Hospitality",
//                           ].includes(projectProperty.project_type)) ||
//                         formData.possession_status === "Under Construction"
//                       ) && (
//                           <div>
//                             <label className="font-medium text-gray-700">
//                               Age of Property
//                             </label>

//                             <select
//                               value={projectProperty.age_of_property || ""}
//                               onChange={(e) =>
//                                 handleProjectPropertyChange(
//                                   index,
//                                   "age_of_property",
//                                   e.target.value
//                                 )
//                               }
//                               className="w-full p-3 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                             >
//                               <option value="">Select Age of Property</option>
//                               <option value="0-1">0-1</option>
//                               <option value="2-4">2-4</option>
//                               <option value="5-7">5-7</option>
//                               <option value="8-10">8-10</option>
//                               <option value="10+">10+</option>
//                               {/* <option value="0-1">1 to 5 Years</option>
//                       <option value="2-4">5 to 10 Years</option>
//                       <option value="5-7">10 to 15 Years</option>
//                       <option value="8-10">15 to 20 Years</option>
//                       <option value="10+">Above 20 Years</option>
//                       <option value="10+">New Construction</option> */}
//                             </select>
//                           </div>
//                         )}
//                       {projectProperty.project_type !== "Plot/Land" && (
//                         <div>
//                           <label className="font-medium text-gray-700">
//                             Furnishing Type{" "}
//                             <span className="text-xl font-bold text-red-500">*</span>
//                           </label>

//                           <select
//                             value={projectProperty.furnished_type || ""}
//                             onChange={(e) =>
//                               handleProjectPropertyChange(
//                                 index,
//                                 "furnished_type",
//                                 e.target.value
//                               )
//                             }
//                             className="w-full p-3 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                           >
//                             <option value="">Select Furnishing Type</option>
//                             <option value="Furnished">Furnished</option>
//                             <option value="Semi-Furnished">Semi-Furnished</option>
//                             <option value="Unfurnished">Unfurnished</option>
//                           </select>

//                           {errors?.furnished_type && (
//                             <p className="flex items-center gap-1 mt-1 text-sm text-red-500">
//                               <MdErrorOutline className="text-lg" />
//                               {errors.furnished_type}
//                             </p>
//                           )}
//                         </div>
//                       )}
//                       {buildingType === "Residential" && projectProperty.project_type !== "Plot" && (
//                         <div>
//                           <label className="font-medium text-gray-700">Balcony</label>

//                           <select

//                             value={projectProperty.balcony || ""}
//                             onChange={(e) =>
//                               handleProjectPropertyChange(
//                                 index,
//                                 "balcony",
//                                 e.target.value
//                               )
//                             }
//                             className="w-full p-3 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                           >
//                             <option value="">Select No. of Balconies</option>
//                             <option value="0">0</option>
//                             <option value="1">1</option>
//                             <option value="2">2</option>
//                             <option value="3">3</option>
//                             <option value="more than 3">More than 3</option>
//                           </select>
//                         </div>
//                       )}
//                       {buildingType === "Commercial" &&
//                         projectProperty.project_type === "Office" &&
//                         [
//                           "Bare shell office space",
//                           "Ready to move office space",
//                         ].includes(projectProperty.sub_project_type) && (
//                           <div>
//                             <label className="font-medium text-gray-700">
//                               Pantry
//                             </label>

//                             <select
//                               value={projectProperty.pantry_option || ""}
//                               onChange={(e) =>
//                                 handleProjectPropertyChange(
//                                   index,
//                                   "pantry_option",
//                                   e.target.value
//                                 )
//                               }
//                               className="w-full p-3 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                             >
//                               <option value="">Select Pantry</option>
//                               <option value="Wet">Wet</option>
//                               <option value="Dry">Dry</option>
//                               <option value="None">None</option>
//                             </select>
//                           </div>
//                         )}

//                       {buildingType === "Commercial" &&
//                         projectProperty.project_type === "Office" && (
//                           <div>
//                             <label className="font-medium text-gray-700">
//                               Central AC
//                             </label>

//                             <select
//                               value={projectProperty.central_AC || ""}
//                               onChange={(e) =>
//                                 handleProjectPropertyChange(
//                                   index,
//                                   "central_AC",
//                                   e.target.value
//                                 )
//                               }
//                               className="w-full p-3 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                             >
//                               <option value="">Select Option</option>

//                               {projectProperty.sub_project_type === "Ready to move office space" ? (
//                                 <>
//                                   <option value="Available">Available</option>

//                                   <option value="Not Available">Not Available</option>
//                                 </>
//                               ) : (
//                                 <>
//                                   <option value="Duct Only">Duct Only</option>

//                                   <option value="Available">Available</option>

//                                   <option value="Not Available">Not Available</option>
//                                 </>
//                               )}
//                             </select>
//                           </div>
//                         )}
//                       {buildingType === "Commercial" && projectProperty.project_type === "Office" && (
//                         <div>
//                           <label className="font-medium text-gray-700">
//                             Reception Area
//                           </label>

//                           <select
//                             value={projectProperty.reception_area || ""}
//                             onChange={(e) =>
//                               handleProjectPropertyChange(
//                                 index,
//                                 "reception_area",
//                                 e.target.value
//                               )
//                             }
//                             className="w-full p-3 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                           >
//                             <option value="">Select Option</option>
//                             <option value="Yes">Yes</option>
//                             <option value="No">No</option>
//                           </select>
//                         </div>
//                       )}
//                       {buildingType === "Commercial" &&
//                         projectProperty.project_type === "Office" && (
//                           <div>
//                             <label className="font-medium text-gray-700">
//                               Personal Washroom
//                             </label>

//                             <select

//                               value={projectProperty.personal_washroom || ""}
//                               onChange={(e) =>
//                                 handleProjectPropertyChange(
//                                   index,
//                                   "personal_washroom",
//                                   e.target.value
//                                 )
//                               }
//                               className="w-full p-3 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                             >
//                               <option value="">Select</option>
//                               <option value="Yes">Yes</option>
//                               <option value="No">No</option>
//                             </select>
//                           </div>
//                         )}
//                       {buildingType === "Commercial" &&
//                         projectProperty.project_type === "Retail" && (
//                           <div>
//                             <label className="font-medium text-gray-700">
//                               Parking Type
//                             </label>

//                             <Select
//                               isMulti
//                               name="parking_types"
//                               options={[
//                                 { value: "Private Parking", label: "Private Parking" },
//                                 { value: "Public Parking", label: "Public Parking" },
//                                 { value: "Multilevel Parking", label: "Multilevel Parking" },
//                                 { value: "Not Available", label: "Not Available" },
//                               ]}
//                               value={[
//                                 { value: "Private Parking", label: "Private Parking" },
//                                 { value: "Public Parking", label: "Public Parking" },
//                                 { value: "Multilevel Parking", label: "Multilevel Parking" },
//                                 { value: "Not Available", label: "Not Available" },
//                               ].filter((opt) =>
//                                 (projectProperty.parking_types || "")
//                                   .split(",")
//                                   .includes(opt.value)
//                               )}
//                               onChange={(selectedOptions) => {
//                                 const values = selectedOptions
//                                   ? selectedOptions.map((opt) => opt.value)
//                                   : [];

//                                 let finalValues = values;

//                                 if (values.includes("Not Available")) {
//                                   finalValues = ["Not Available"];
//                                 }

//                                 handleProjectPropertyChange(
//                                   index,
//                                   "parking_types",
//                                   finalValues.join(",")
//                                 );
//                               }}
//                               components={{ MultiValue: CustomMultiValue }}
//                               placeholder="Select Parking Type"
//                               classNamePrefix="react-select"
//                               styles={{
//                                 control: (base, state) => ({
//                                   ...base,
//                                   minHeight: "60px",
//                                   padding: "6px",
//                                   borderColor: state.isFocused ? "#a855f7" : "#d1d5db",
//                                   boxShadow: state.isFocused
//                                     ? "0 0 0 2px #a855f7"
//                                     : "none",
//                                   borderRadius: "0.5rem",
//                                   fontSize: "16px",
//                                   display: "flex",
//                                   flexWrap: "nowrap",
//                                   overflowX: "auto",
//                                 }),
//                                 valueContainer: (base) => ({
//                                   ...base,
//                                   padding: "0 6px",
//                                   display: "flex",
//                                   flexWrap: "nowrap",
//                                   gap: "6px",
//                                   overflowX: "auto",
//                                   scrollbarWidth: "thin",
//                                   alignItems: "center",
//                                 }),
//                                 placeholder: (base) => ({
//                                   ...base,
//                                   color: "#1f2937",
//                                   fontSize: "16px",
//                                 }),
//                                 multiValue: (base) => ({
//                                   ...base,
//                                   backgroundColor: "#ede9fe",
//                                   borderRadius: "0.375rem",
//                                   display: "flex",
//                                   alignItems: "center",
//                                   padding: "2px 6px",
//                                   whiteSpace: "nowrap",
//                                 }),
//                                 multiValueLabel: (base) => ({
//                                   ...base,
//                                   color: "#6b21a8",
//                                   fontWeight: "500",
//                                 }),
//                                 multiValueRemove: (base) => ({
//                                   ...base,
//                                   color: "#6b21a8",
//                                   ":hover": {
//                                     backgroundColor: "#ddd6fe",
//                                     color: "#4c1d95",
//                                   },
//                                 }),
//                               }}
//                             />
//                           </div>
//                         )}
//                       {((buildingType === "Residential" && projectProperty.project_type === "Plot/Land") ||
//                         (buildingType === "Commercial" &&
//                           projectProperty.project_type === "Plot/Land")) && (
//                           <div>
//                             <label className="font-medium text-gray-700">
//                               No. of Open Sides
//                             </label>

//                             <select
//                               value={projectProperty.no_of_open_sides || ""}
//                               onChange={(e) =>
//                                 handleProjectPropertyChange(
//                                   index,
//                                   "no_of_open_sides",
//                                   e.target.value
//                                 )
//                               }
//                               className="w-full p-3 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                             >
//                               <option value="">Select Open Sides</option>
//                               <option value="1">1</option>
//                               <option value="2">2</option>
//                               <option value="3">3</option>
//                               <option value="4">4</option>
//                             </select>
//                           </div>
//                         )}
//                       {(buildingType === "Commercial" ||
//                         (buildingType === "Residential" &&
//                           projectProperty.project_type === "Other")) && (
//                           <div>
//                             <label className="font-medium text-gray-700">
//                               Purchase Type
//                             </label>

//                             <select
//                               value={projectProperty.purchase_type || ""}
//                               onChange={(e) =>
//                                 handleProjectPropertyChange(
//                                   index,
//                                   "purchase_type",
//                                   e.target.value
//                                 )
//                               }
//                               className="w-full p-3 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                             >
//                               <option value="">Select Purchase Type</option>
//                               <option value="Resale">Resale</option>
//                               <option value="New bookings">New Bookings</option>
//                             </select>
//                           </div>
//                         )}
//                       {buildingType === "Commercial" && projectProperty.project_type === "Office" && (
//                         <div>
//                           <label className="font-medium text-gray-700">
//                             Number of Seats Available
//                           </label>

//                           <input
//                             type="text"
//                             value={projectProperty.number_of_seats_available || ""}
//                             onChange={(e) => {
//                               const value = e.target.value;
//                               if (/^\d*$/.test(value)) {
//                                 handleProjectPropertyChange(
//                                   index,
//                                   "number_of_seats_available",
//                                   value
//                                 );
//                               }
//                             }}
//                             placeholder="Enter number of seats"
//                             className="w-full p-3 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                           />
//                         </div>
//                       )}
//                       {/* <div className="md:col-span-3 mt-2"> */}
//                       {/* <label className="font-medium text-gray-700">
//                       Price Details
//                     </label> */}

//                       {/* <div className="flex flex-wrap gap-4 mt-2"> */}
//                       {/* All Inclusive Price */}
//                       {/* <label className="flex items-center gap-2">
//                         <input
//                           type="checkbox"
//                           checked={formData.all_inclusive_price === "Yes"}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               all_inclusive_price: e.target.checked
//                                 ? "Yes"
//                                 : "No",
//                             })
//                           }
//                         />
//                         All Inclusive Price
//                       </label> */}
//                       {/* Price Onwards */}
//                       {/* <label className="flex items-center gap-2">
//                         <input
//                           type="checkbox"
//                           checked={formData.price_onwards === "Yes"}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               price_onwards: e.target.checked ? "Yes" : "No",
//                             })
//                           }
//                         />
//                         Price Onwards
//                       </label> */}
//                       {/* Price Negotiable */}
//                       {/* <label className="flex items-center gap-2">
//                         <input
//                           type="checkbox"
//                           checked={formData.price_negotiable === "Yes"}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               price_negotiable: e.target.checked ? "Yes" : "No",
//                             })
//                           }
//                         />
//                         Price Negotiable
//                       </label> */}

//                       {/* Tax & Govt Charges */}
//                       {/* <label className="flex items-center gap-2">
//                         <input
//                           type="checkbox"
//                           checked={formData.tax_and_goverment_charges === "Yes"}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               tax_and_goverment_charges: e.target.checked
//                                 ? "Yes"
//                                 : "No",
//                             })
//                           }
//                         />
//                         Tax & Government Charges Excluded
//                       </label>
//                     </div> */}
//                       {/* </div> */}

//                     </div>
//                     <div className="flex justify-end mt-4">
//                       <button
//                         type="button"
//                         onClick={() =>
//                           setProjectProperties([
//                             ...projectProperties,
//                             { ...emptyProjectProperty },
//                           ])
//                         }
//                         className="flex items-center gap-2 px-4 py-2 text-white rounded-lg bg-rose-600 hover:bg-rose-700"
//                       >
//                         <Plus size={18} />
//                         Add Property
//                       </button>
//                     </div>
//                   </div>

//                 ))}

//                 <div className="p-3 mx-auto mb-3 bg-white border max-w-7xl rounded-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                   {/*  Header full width */}
//                   <div className="mb-6 col-span-1 md:col-span-2 lg:col-span-4">
//                     <h2 className="text-2xl font-semibold text-gray-900">
//                       More Details
//                     </h2>
//                     <p className="text-gray-500">
//                       Comprehensive overview covering scale, financials, features,
//                       timeline, and compliance of the project
//                     </p>
//                   </div>
//                   <div>
//                     <label className="font-medium text-gray-700">
//                       Price Range
//                     </label>

//                     <input
//                       type="text"
//                       value={averagePrice}
//                       readOnly
//                       className="w-full p-3 mt-1 border rounded-lg bg-gray-100"
//                     />
//                   </div>
//                   {buildingType === "Residential" ? (
//                     <div>
//                       <label className="block mb-2 font-medium text-gray-700">
//                         Configurations
//                       </label>

//                       <input
//                         type="text"
//                         value={configurations}
//                         readOnly
//                         className="w-full p-3 text-gray-700 bg-gray-100 border rounded-md outline-none"
//                       />
//                     </div>
//                   ) : (
//                     <div>
//                       <label className="block mb-2 font-medium text-gray-700">
//                         Available Property Types
//                       </label>

//                       <input
//                         type="text"
//                         value={[
//                           ...new Set(
//                             projectProperties
//                               .map((p) => p.project_type)
//                               .filter(Boolean)
//                           ),
//                         ].join(", ")}
//                         readOnly
//                         className="w-full p-3 text-gray-700 bg-gray-100 border rounded-md outline-none"
//                       />
//                     </div>
//                   )}
//                   {/* {buildingType === "Commercial" &&
//                   !["Land", "Plot/Land"].includes(propertyType) && (
//                     <div>
//                       <label className="font-medium text-gray-700">
//                         Security Deposit Amount{" "}
//                         <span className="text-xl font-bold text-red-500">
//                           *
//                         </span>
//                       </label>

//                       <input
//                         type="text"
//                         name="custom_deposit_amount"
//                         value={formData.custom_deposit_amount || ""}
//                         onChange={(e) => {
//                           const value = e.target.value;

//                           if (/^\d{0,10}$/.test(value)) {
//                             handleInputChange(e);
//                           }
//                         }}
//                         placeholder="Enter Security Deposit Amount"
//                         className="w-full p-3 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                       />

//                       {errors?.custom_deposit_amount && (
//                         <p className="flex items-center gap-1 mt-1 text-sm text-red-500">
//                           <MdErrorOutline className="text-lg" />
//                           {errors.custom_deposit_amount}
//                         </p>
//                       )}
//                     </div>
//                   )} */}
//                   <div>
//                     <label className="font-medium text-gray-700">
//                       Possession Status
//                     </label>

//                     <select
//                       className="w-full p-3 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                       value={formData.possession_status || ""}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           possession_status: e.target.value,
//                         })
//                       }
//                     >
//                       <option value="">Select Status</option>

//                       <option value="Ready To Move">Ready To Move</option>

//                       <option value="Under Construction">
//                         Under Construction
//                       </option>
//                     </select>

//                     {errors?.possession_status && (
//                       <p className="flex items-center gap-1 mt-1 text-sm text-red-500">
//                         <MdErrorOutline className="text-lg" />
//                         {errors.possession_status}
//                       </p>
//                     )}
//                   </div>
//                   {formData.possession_status === "Under Construction" && (
//                     <div>
//                       <label className="font-medium text-gray-700">
//                         Possession Date{" "}
//                       </label>

//                       <input
//                         type="date"
//                         value={formData.possession_date || ""}
//                         onChange={(e) =>
//                           setFormData({
//                             ...formData,
//                             possession_date: e.target.value,
//                           })
//                         }
//                         className="w-full p-3 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                       />

//                       {errors?.possession_date && (
//                         <p className="flex items-center gap-1 mt-1 text-sm text-red-500">
//                           <MdErrorOutline className="text-lg" />
//                           {errors.possession_date}
//                         </p>
//                       )}
//                     </div>
//                   )}
//                   {/* {!(
//                   (buildingType === "Residential" && propertyType === "Plot/Land") ||
//                   (buildingType === "Commercial" &&
//                     [
//                       "Land",
//                       "Plot/Land",
//                       "Warehouse",
//                       "Storage",
//                       "Industry",
//                       "Hospitality",
//                     ].includes(propertyType))
//                 ) && (
//                   <div>
//                     <label className="font-medium text-gray-700">
//                       Total Floor
//                     </label>

//                     <input
//                       type="text"
//                       name="total_floor"
//                       value={formData.total_floor}
//                       onChange={(e) => {
//                         const value = e.target.value;
//                         if (/^[a-zA-Z0-9]{0,10}$/.test(value)) {
//                           handleInputChange(e);
//                         }
//                       }}
//                       className="w-full p-3 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                     />
//                   </div>
//                 )} */}
//                   {/* {!(
//                   (buildingType === "Residential" && propertyType === "Plot") ||
//                   (buildingType === "Commercial" &&
//                     [
//                       "Land",
//                       "Plot/Land",
//                       "Warehouse",
//                       "Industry",
//                       "Storage",
//                       "Hospitality",
//                     ].includes(propertyType))
//                 ) && (
//                   <div>
//                     <label className="font-medium text-gray-700">
//                       Flat on the floor
//                     </label>

//                     <select
//                       name="project_floor"
//                       value={formData.project_floor || ""}
//                       onChange={handleInputChange}
//                       className="w-full p-3 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                     >
//                       <option value="">Select Floor</option>

//                       <option value="Lower Basement">Lower Basement</option>

//                       <option value="Basement">Basement</option>

//                       <option value="Lower Ground">Lower Ground</option>

//                       <option value="Ground">Ground</option>

//                       <option value="Rooftop/Terrace">Rooftop/Terrace</option>

//                       {[...Array(Number(formData.total_floor) || 0)].map(
//                         (_, index) => (
//                           <option key={index + 1} value={`${index + 1}`}>
//                             {index + 1}
//                           </option>
//                         ),
//                       )}
//                     </select>
//                   </div>
//                 )} */}
//                   {/* {[
//                   "Apartment",
//                   "1RK/Studio Apartment",
//                   "Service Apartment",
//                   "Office",
//                 ].includes(propertyType) && (
//                   <div>
//                     <label className="font-medium text-gray-700">
//                       Total Number of Parking
//                     </label>

//                     <input
//                       type="text"
//                       value={formData.total_number_parking || ""}
//                       onChange={(e) =>
//                         handleInputChange(
//                           "total_number_parking",
//                           e.target.value,
//                         )
//                       }
//                       className="w-full p-3 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                       placeholder="Enter total parking"
//                     />
//                   </div>
//                 )} */}
//                   {/* {buildingType === "Commercial" && propertyType === "Retail" && (
//                   <div>
//                     <label className="font-medium text-gray-700">
//                       Parking Type
//                     </label>

//                     <Select
//                       isMulti
//                       name="parking_types"
//                       options={[
//                         {
//                           value: "Private Parking",
//                           label: "Private Parking",
//                         },
//                         {
//                           value: "Public Parking",
//                           label: "Public Parking",
//                         },
//                         {
//                           value: "Multilevel Parking",
//                           label: "Multilevel Parking",
//                         },
//                         {
//                           value: "Not Available",
//                           label: "Not Available",
//                         },
//                       ]}
//                       value={[
//                         {
//                           value: "Private Parking",
//                           label: "Private Parking",
//                         },
//                         {
//                           value: "Public Parking",
//                           label: "Public Parking",
//                         },
//                         {
//                           value: "Multilevel Parking",
//                           label: "Multilevel Parking",
//                         },
//                         {
//                           value: "Not Available",
//                           label: "Not Available",
//                         },
//                       ].filter((opt) =>
//                         (formData.parking_types || "")
//                           .split(",")
//                           .includes(opt.value),
//                       )}
//                       onChange={(selectedOptions) => {
//                         const values = selectedOptions.map((opt) => opt.value);

//                         let finalValues = values;

//                         if (values.includes("Not Available")) {
//                           finalValues = ["Not Available"];
//                         }

//                         handleInputChange({
//                           target: {
//                             name: "parking_types",
//                             value: finalValues.join(","),
//                           },
//                         });
//                       }}
//                       components={{ MultiValue: CustomMultiValue }}
//                       placeholder="Select Parking Type"
//                       classNamePrefix="react-select"
//                       styles={{
//                         control: (base, state) => ({
//                           ...base,
//                           minHeight: "60px",
//                           padding: "6px",
//                           borderColor: state.isFocused ? "#a855f7" : "#d1d5db",
//                           boxShadow: state.isFocused
//                             ? "0 0 0 2px #a855f7"
//                             : "none",
//                           borderRadius: "0.5rem",
//                           fontSize: "16px",
//                           display: "flex",
//                           flexWrap: "nowrap",
//                           overflowX: "auto",
//                         }),

//                         valueContainer: (base) => ({
//                           ...base,
//                           padding: "0 6px",
//                           display: "flex",
//                           flexWrap: "nowrap",
//                           gap: "6px",
//                           overflowX: "auto",
//                           scrollbarWidth: "thin",
//                           alignItems: "center",
//                         }),

//                         placeholder: (base) => ({
//                           ...base,
//                           color: "#1f2937",
//                           fontSize: "16px",
//                         }),

//                         multiValue: (base) => ({
//                           ...base,
//                           backgroundColor: "#ede9fe",
//                           borderRadius: "0.375rem",
//                           display: "flex",
//                           alignItems: "center",
//                           padding: "2px 6px",
//                           whiteSpace: "nowrap",
//                         }),

//                         multiValueLabel: (base) => ({
//                           ...base,
//                           color: "#6b21a8",
//                           fontWeight: "500",
//                         }),

//                         multiValueRemove: (base) => ({
//                           ...base,
//                           color: "#6b21a8",
//                           ":hover": {
//                             backgroundColor: "#ddd6fe",
//                             color: "#4c1d95",
//                           },
//                         }),
//                       }}
//                     />
//                   </div>
//                 )} */}
//                   {/* {buildingType === "Commercial" && propertyType === "Office" && (
//                   <div>
//                     <label className="font-medium text-gray-700">
//                       No. of Cabines
//                     </label>

//                     <select
//                       value={formData.no_of_cabines || ""}
//                       onChange={(e) =>
//                         handleInputChange("no_of_cabines", e.target.value)
//                       }
//                       className="w-full p-3 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                     >
//                       <option value="">Select Cabines</option>
//                       <option value="1">1</option>
//                       <option value="2">2</option>
//                       <option value="3">3</option>
//                       <option value="4">4</option>
//                       <option value="5">5</option>
//                       <option value="10+">10+</option>
//                     </select>
//                   </div>
//                 )} */}
//                   {/* {buildingType === "Commercial" && propertyType === "Office" && (
//                   <div>
//                     <label className="font-medium text-gray-700">
//                       No. of Meeting Rooms
//                     </label>

//                     <select
//                       value={formData.no_of_meeting_Rooms || ""}
//                       onChange={(e) =>
//                         handleInputChange("no_of_meeting_Rooms", e.target.value)
//                       }
//                       className="w-full p-3 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                     >
//                       <option value="">Select Meeting Rooms</option>
//                       <option value="1">1</option>
//                       <option value="2">2</option>
//                       <option value="3">3</option>
//                       <option value="4">4</option>
//                       <option value="5+">5+</option>
//                     </select>
//                   </div>
//                 )} */}
//                   {/* {buildingType === "Commercial" && propertyType === "Office" && (
//                   <div>
//                     <label className="font-medium text-gray-700">
//                       No. of Conference Room
//                     </label>

//                     <select
//                       value={formData.no_of_conference_room || ""}
//                       onChange={(e) =>
//                         handleInputChange(
//                           "no_of_conference_room",
//                           e.target.value,
//                         )
//                       }
//                       className="w-full p-3 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                     >
//                       <option value="">Select Conference Room</option>
//                       <option value="0">0</option>
//                       <option value="1">1</option>
//                       <option value="2">2</option>
//                       <option value="3+">3+</option>
//                     </select>
//                   </div>
//                 )} */}

//                   {/* {buildingType === "Commercial" &&
//                   propertyType === "Hospitality" && (
//                     <div>
//                       <label className="font-medium text-gray-700">
//                         Total Number of Rooms
//                       </label>

//                       <input
//                         type="text"
//                         value={formData.total_number_of_rooms || ""}
//                         onChange={(e) => {
//                           const value = e.target.value;
//                           if (/^\d*$/.test(value)) {
//                             handleInputChange("total_number_of_rooms", value);
//                           }
//                         }}
//                         placeholder="Enter Total Rooms"
//                         className="w-full p-3 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                       />
//                     </div>
//                   )} */}
//                   <div>
//                     <label className="block mb-2 font-medium text-gray-700">
//                       RERA ID
//                     </label>

//                     <input
//                       type="text"
//                       value={reraId}
//                       onChange={(e) => setReraId(e.target.value)}
//                       placeholder="Enter RERA ID"
//                       className="w-full p-3 border rounded-lg outline-none"
//                     />
//                   </div>
//                   {buildingType === "Commercial" &&
//                     propertyType === "Hospitality" && (
//                       <div>
//                         <label className="font-medium text-gray-700">
//                           Quality Rating
//                         </label>

//                         <select
//                           value={formData.quality_rating || ""}
//                           onChange={(e) =>
//                             handleInputChange("quality_rating", e.target.value)
//                           }
//                           className="w-full p-3 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                         >
//                           <option value="">Select Rating</option>
//                           <option value="No Rating">No Rating</option>
//                           <option value="1 Star">1 Star</option>
//                           <option value="2 Star">2 Star</option>
//                           <option value="3 Star">3 Star</option>
//                           <option value="4 Star">4 Star</option>
//                           <option value="5 Star">5 Star</option>
//                           <option value="6 Star">6 Star</option>
//                           <option value="7 Star">7 Star</option>
//                         </select>
//                       </div>
//                     )}

//                   {/* {((buildingType === "Residential" && propertyType === "Plot") ||
//                   (buildingType === "Commercial" &&
//                     ["Land", "Plot/Land"].includes(propertyType))) && (
//                   <div>
//                     <label className="font-medium text-gray-700">Facing</label>

//                     <select
//                       name="facing"
//                       value={formData.facing || ""}
//                       onChange={handleInputChange}
//                       className="w-full p-3 mt-1 border rounded-lg"
//                     >
//                       <option value="">Select Facing</option>

//                       <option value="East">East</option>
//                       <option value="West">West</option>
//                       <option value="North">North</option>
//                       <option value="South">South</option>
//                       <option value="North East">North East</option>
//                       <option value="North West">North West</option>
//                       <option value="South East">South East</option>
//                       <option value="South West">South West</option>
//                     </select>
//                   </div>
//                 )} */}
//                   {buildingType === "Residential" &&
//                     propertyType === "Independent/Builder Floor" && (
//                       <div>
//                         <label className="font-medium text-gray-700">
//                           Builder Floor Type{" "}
//                           <span className="text-red-500">*</span>
//                         </label>

//                         <select
//                           value={formData.builder_floor_type || ""}
//                           onChange={(e) =>
//                             handleInputChange(
//                               "builder_floor_type",
//                               e.target.value,
//                             )
//                           }
//                           className="w-full p-3 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                         >
//                           <option value="">Select Floor Type</option>
//                           {builderFloorOptions.map((item) => (
//                             <option key={item} value={item}>
//                               {item}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     )}
//                   {/* {((buildingType === "Residential" && propertyType === "Plot") ||
//                   (buildingType === "Commercial" &&
//                     propertyType === "Plot/Land")) && (
//                   <>

//                     <div>
//                       <label className="font-medium text-gray-700">
//                         Length of Plot (ft){" "}
//                         <span className="text-red-500">*</span>
//                       </label>

//                       <input
//                         type="text"
//                         value={formData.property_dimensions_length || ""}
//                         onChange={(e) => {
//                           const value = e.target.value;
//                           if (/^\d*$/.test(value)) {
//                             handleInputChange(
//                               "property_dimensions_length",
//                               value,
//                             );
//                           }
//                         }}
//                         placeholder="Enter Length"
//                         className={`w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-rose-500 outline-none ${
//                           errors?.property_dimensions_length
//                             ? "border-red-600"
//                             : "border-gray-300"
//                         }`}
//                       />

//                       {errors?.property_dimensions_length && (
//                         <p className="text-sm text-red-500 mt-1">
//                           {errors.property_dimensions_length}
//                         </p>
//                       )}
//                     </div>


//                     <div>
//                       <label className="font-medium text-gray-700">
//                         Breadth of Plot (ft){" "}
//                         <span className="text-red-500">*</span>
//                       </label>

//                       <input
//                         type="text"
//                         value={formData.property_dimensions_breadth || ""}
//                         onChange={(e) => {
//                           const value = e.target.value;
//                           if (/^\d*$/.test(value)) {
//                             handleInputChange(
//                               "property_dimensions_breadth",
//                               value,
//                             );
//                           }
//                         }}
//                         placeholder="Enter Breadth"
//                         className={`w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-rose-500 outline-none ${
//                           errors?.property_dimensions_breadth
//                             ? "border-red-600"
//                             : "border-gray-300"
//                         }`}
//                       />

//                       {errors?.property_dimensions_breadth && (
//                         <p className="text-sm text-red-500 mt-1">
//                           {errors.property_dimensions_breadth}
//                         </p>
//                       )}
//                     </div>
//                   </>
//                 )} */}

//                   {((buildingType === "Residential" && propertyType === "Plot/Land") ||
//                     (buildingType === "Commercial" &&
//                       propertyType === "Plot/Land")) && (
//                       <div>
//                         <label className="block mb-2 font-medium text-gray-700">
//                           Any Construction on Property
//                         </label>

//                         <select
//                           name="type_of_construction"
//                           value={formData.type_of_construction || ""}
//                           onChange={handleInputChange}
//                           className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                         >
//                           <option value="">Select Construction Type</option>
//                           {constructionOptions.map((item) => (
//                             <option key={item} value={item}>
//                               {item}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     )}
//                   {/* {((buildingType === "Residential" && propertyType === "Plot") ||
//                   (buildingType === "Commercial" &&
//                     propertyType === "Plot/Land")) && (
//                   <div>
//                     <label className="font-medium text-gray-700">
//                       Possession By
//                     </label>

//                     <select
//                       value={formData.possession_by || ""}
//                       onChange={(e) =>
//                         handleInputChange("possession_by", e.target.value)
//                       }
//                       className="w-full p-3 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                     >
//                       <option value="">Select Possession</option>
//                       <option value="Immediate">Immediate</option>
//                       <option value="Within 3 Months">Within 3 Months</option>
//                       <option value="Within 6 Months">Within 6 Months</option>
//                       <option value="By 2026">By 2026</option>
//                       <option value="By 2027">By 2027</option>
//                       <option value="By 2028">By 2028</option>
//                       <option value="By 2029">By 2029</option>
//                       <option value="By 2030">By 2030</option>
//                       <option value="By 2031">By 2031</option>
//                       <option value="By 2032">By 2032</option>
//                     </select>
//                   </div>
//                 )} */}
//                   {/* {!(
//                   (buildingType === "Residential" && propertyType === "Plot") ||
//                   (buildingType === "Commercial" &&
//                     [
//                       "Land",
//                       "Plot/Land",
//                       "Industry",
//                       "Storage",
//                       "Hospitality",
//                     ].includes(propertyType)) ||
//                   formData.possession_status === "Under Construction"
//                 ) && (
//                   <div>
//                     <label className="font-medium text-gray-700">
//                       Age of Property
//                     </label>

//                     <select
//                       value={formData.age_of_property || ""}
//                       onChange={(e) =>
//                         handleInputChange("age_of_property", e.target.value)
//                       }
//                       className="w-full p-3 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                     >
//                       <option value="">Select Age of Property</option>
//                       <option value="0-1">0-1</option>
//                       <option value="2-4">2-4</option>
//                       <option value="5-7">5-7</option>
//                       <option value="8-10">8-10</option>
//                       <option value="10+">10+</option>
//                       <option value="0-1">1 to 5 Years</option>
//                       <option value="2-4">5 to 10 Years</option>
//                       <option value="5-7">10 to 15 Years</option>
//                       <option value="8-10">15 to 20 Years</option>
//                       <option value="10+">Above 20 Years</option>
//                       <option value="10+">New Construction</option>
//                     </select>
//                   </div>
//                 )} */}
//                   {/* {propertyType !== "Plot/Land" && (
//                   <div>
//                     <label className="font-medium text-gray-700">
//                       Furnishing Type{" "}
//                       <span className="text-xl font-bold text-red-500">*</span>
//                     </label>

//                     <select
//                       value={formData.furnished_type || ""}
//                       onChange={(e) =>
//                         setFormData((prev) => ({
//                           ...prev,
//                           furnished_type: e.target.value,
//                         }))
//                       }
//                       className="w-full p-3 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                     >
//                       <option value="">Select Furnishing Type</option>
//                       <option value="Furnished">Furnished</option>
//                       <option value="Semi-Furnished">Semi-Furnished</option>
//                       <option value="Unfurnished">Unfurnished</option>
//                     </select>

//                     {errors?.furnished_type && (
//                       <p className="flex items-center gap-1 mt-1 text-sm text-red-500">
//                         <MdErrorOutline className="text-lg" />
//                         {errors.furnished_type}
//                       </p>
//                     )}
//                   </div>
//                 )} */}
//                   {/* {buildingType === "Residential" && propertyType !== "Plot" && (
//                   <div>
//                     <label className="font-medium text-gray-700">Balcony</label>

//                     <select
//                       name="balcony"
//                       value={formData.balcony || ""}
//                       onChange={handleInputChange}
//                       className="w-full p-3 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                     >
//                       <option value="">Select No. of Balconies</option>
//                       <option value="0">0</option>
//                       <option value="1">1</option>
//                       <option value="2">2</option>
//                       <option value="3">3</option>
//                       <option value="more than 3">More than 3</option>
//                     </select>
//                   </div>
//                 )} */}

//                   {/* {!(
//                   (buildingType === "Residential" && propertyType === "Plot") ||
//                   (buildingType === "Commercial" &&
//                     [
//                       "Land",
//                       "Plot/Land",
//                       "Warehouse",
//                       "Storage",
//                       "Industry",
//                       "Hospitality",
//                     ].includes(propertyType))
//                 ) && (
//                   <div>
//                     <label className="font-medium text-gray-700">Balcony</label>

//                     <select
//                       name="balcony"
//                       value={formData.balcony || ""}
//                       onChange={handleInputChange}
//                       className="w-full p-3 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                     >
//                       <option value="">Select No. of Balconies</option>
//                       <option value="0">0</option>
//                       <option value="1">1</option>
//                       <option value="2">2</option>
//                       <option value="3">3</option>
//                       <option value="more than 3">More than 3</option>
//                     </select>
//                   </div>
//                 )} */}
//                   {!(
//                     (buildingType === "Residential" && propertyType === "Plot/Land") ||
//                     (buildingType === "Commercial" &&
//                       [
//                         "Land",
//                         "Plot/Land",
//                         "Warehouse",
//                         "Storage",
//                         "Industry",
//                         "Hospitality",
//                       ].includes(propertyType))
//                   ) && (
//                       <div>
//                         <label className="font-medium text-gray-700">
//                           Lift Availability
//                         </label>

//                         <select
//                           value={formData.lift_availability || ""}
//                           onChange={(e) =>
//                             handleInputChange("lift_availability", e.target.value)
//                           }
//                           className="w-full p-3 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                         >
//                           <option value="">Select Lift Availability</option>
//                           <option value="Yes">Yes</option>
//                           <option value="No">No</option>
//                         </select>
//                       </div>
//                     )}
//                   {/* {buildingType === "Commercial" &&
//                   propertyType === "Office" &&
//                   [
//                     "Bare shell office space",
//                     "Ready to move office space",
//                   ].includes(officeSubType) && (
//                     <div>
//                       <label className="font-medium text-gray-700">
//                         Pantry
//                       </label>

//                       <select
//                         value={formData.pantry_option || ""}
//                         onChange={(e) =>
//                           handleInputChange("pantry_option", e.target.value)
//                         }
//                         className="w-full p-3 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                       >
//                         <option value="">Select Pantry</option>
//                         <option value="Wet">Wet</option>
//                         <option value="Dry">Dry</option>
//                         <option value="None">None</option>
//                       </select>
//                     </div>
//                   )}

//                 {buildingType === "Commercial" && propertyType === "Office" && (
//                   <div>
//                     <label className="font-medium text-gray-700">
//                       Central AC
//                     </label>

//                     <select
//                       value={formData.central_AC || ""}
//                       onChange={(e) =>
//                         handleInputChange("central_AC", e.target.value)
//                       }
//                       className="w-full p-3 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                     >
//                       <option value="">Select Option</option>

//                       {formData.office_type === "Ready to move office space" ? (
//                         <>
//                           <option value="Available">Available</option>

//                           <option value="Not Available">Not Available</option>
//                         </>
//                       ) : (
//                         <>
//                           <option value="Duct Only">Duct Only</option>

//                           <option value="Available">Available</option>

//                           <option value="Not Available">Not Available</option>
//                         </>
//                       )}
//                     </select>
//                   </div>
//                 )}
//                 {buildingType === "Commercial" && propertyType === "Office" && (
//                   <div>
//                     <label className="font-medium text-gray-700">
//                       Reception Area
//                     </label>

//                     <select
//                       value={formData.reception_area || ""}
//                       onChange={(e) =>
//                         handleInputChange("reception_area", e.target.value)
//                       }
//                       className="w-full p-3 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                     >
//                       <option value="">Select Option</option>
//                       <option value="Yes">Yes</option>
//                       <option value="No">No</option>
//                     </select>
//                   </div>
//                 )} */}

//                   {/* {buildingType === "Commercial" &&
//                   [
//                     "Office",
//                     "Retail",
//                     "Storage",
//                     "Industry",
//                     "Hospitality",
//                     "Other",
//                   ].includes(propertyType) && (
//                     <div>
//                       <label className="font-medium text-gray-700">
//                         Investment Option
//                       </label>

//                       <select
//                         name="investment_options"
//                         value={formData.investment_options || ""}
//                         onChange={handleInputChange}
//                         className="w-full p-3 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                       >
//                         <option value="">Select Investment Option</option>
//                         <option value="Pre-Leased Spaces">
//                           Pre-Leased Spaces
//                         </option>
//                         <option value="Restaurants">Restaurants</option>
//                         <option value="SCO Plots">SCO Plots</option>
//                         <option value="Business Center">Business Center</option>
//                         <option value="Food Court">Food Court</option>
//                         <option value="Multiplex">Multiplex</option>
//                         <option value="Co-working">Co-working</option>
//                       </select>
//                     </div>
//                   )}
//                 {((buildingType === "Commercial" &&
//                   [
//                     "Office",
//                     "Retail",
//                     "Storage",
//                     "Industry",
//                     "Hospitality",
//                     "Other",
//                   ].includes(propertyType)) ||
//                   (buildingType === "Residential" &&
//                     propertyType === "Other")) && (
//                   <div>
//                     <label className="font-medium text-gray-700">
//                       Purchase Type
//                     </label>

//                     <select
//                       name="purchase_type"
//                       value={formData.purchase_type || ""}
//                       onChange={handleInputChange}
//                       className="w-full p-3 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                     >
//                       <option value="">Select Purchase Type</option>
//                       <option value="Resale">Resale</option>
//                       <option value="New Bookings">New Bookings</option>
//                     </select>
//                   </div>
//                 )} */}
//                   {/* {buildingType === "Commercial" &&
//                   ["Office Space"].includes(propertyType) && (
//                     <div>
//                       <label className="font-medium text-gray-700">
//                         Personal Washroom
//                       </label>

//                       <select
//                         name="personal_washroom"
//                         value={formData.personal_washroom || ""}
//                         onChange={handleInputChange}
//                         className="w-full p-3 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                       >
//                         <option value="">Select</option>
//                         <option value="Yes">Yes</option>
//                         <option value="No">No</option>
//                       </select>
//                     </div>
//                   )} */}

//                   {buildingType === "Residential" && propertyType === "PG" && (
//                     <div>
//                       <label className="font-medium text-gray-700">
//                         Available For{" "}
//                         <span className="text-xl font-bold text-red-500">*</span>
//                       </label>

//                       <select
//                         value={formData.available_for || ""}
//                         onChange={(e) =>
//                           handleInputChange("available_for", e.target.value)
//                         }
//                         className="w-full p-3 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                       >
//                         <option value="">Select Availability</option>
//                         <option value="Girls">Girls</option>
//                         <option value="Boys">Boys</option>
//                         <option value="Family">Family</option>
//                         <option value="Single women">Single women</option>
//                         <option value="Single Men">Single Men</option>
//                       </select>

//                       {errors?.available_for && (
//                         <p className="flex items-center gap-1 mt-1 text-sm text-red-500">
//                           <MdErrorOutline className="text-lg" />
//                           {errors.available_for}
//                         </p>
//                       )}
//                     </div>
//                   )}
//                   {buildingType === "Residential" && propertyType === "PG" && (
//                     <div>
//                       <label className="font-medium text-gray-700">
//                         Room Type <span className="text-red-500">*</span>
//                       </label>

//                       <select
//                         value={formData.room_type || ""}
//                         onChange={(e) =>
//                           handleInputChange("room_type", e.target.value)
//                         }
//                         className="w-full p-3 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                       >
//                         <option value="">Select Room Type</option>
//                         <option value="Private">Private</option>
//                         <option value="Sharing">Sharing</option>
//                       </select>

//                       {errors?.room_type && (
//                         <p className="text-sm text-red-500 mt-1">
//                           {errors.room_type}
//                         </p>
//                       )}
//                     </div>
//                   )}
//                   {buildingType === "Residential" &&
//                     propertyType === "PG" &&
//                     formData.room_type === "Sharing" && (
//                       <div>
//                         <label className="block mb-1 font-medium text-gray-700">
//                           How many people can share this room?
//                         </label>

//                         <select
//                           value={formData.no_of_peoples || ""}
//                           onChange={(e) =>
//                             handleInputChange("no_of_peoples", e.target.value)
//                           }
//                           className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                         >
//                           <option value="">Select</option>
//                           <option value="2">2</option>
//                           <option value="3">3</option>
//                           <option value="4">4</option>
//                           <option value="4">4+</option>
//                         </select>
//                       </div>
//                     )}
//                   {buildingType === "Residential" && propertyType === "PG" && (
//                     <div>
//                       <label className="font-medium text-gray-700">
//                         Total Beds
//                       </label>

//                       <input
//                         type="text"
//                         value={formData.total_beds || ""}
//                         onChange={(e) => {
//                           const value = e.target.value;
//                           if (/^\d*$/.test(value)) {
//                             handleInputChange("total_beds", value);
//                           }
//                         }}
//                         className="w-full p-3 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                       />
//                     </div>
//                   )}
//                   {buildingType === "Residential" && propertyType === "PG" && (
//                     <div>
//                       <label className="block mb-1 font-medium text-gray-700">
//                         Available Beds
//                       </label>

//                       <input
//                         type="text"
//                         value={formData.available_beds || ""}
//                         placeholder="Enter Available Beds"
//                         onChange={(e) => {
//                           const value = e.target.value;

//                           if (/^\d*$/.test(value)) {
//                             handleInputChange("available_beds", value);
//                           }
//                         }}
//                         className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                       />
//                     </div>
//                   )}
//                   {buildingType === "Residential" && propertyType === "PG" && (
//                     <div className="md:col-span-3 mt-4">
//                       <div className="flex flex-wrap gap-4">
//                         {/* Attached Balcony */}
//                         <label className="flex items-center gap-2">
//                           <input
//                             type="checkbox"
//                             checked={formData.attached_balcony === "Yes"}
//                             onChange={(e) =>
//                               handleInputChange(
//                                 "attached_balcony",
//                                 e.target.checked ? "Yes" : "No",
//                               )
//                             }
//                           />
//                           Attached Balcony
//                         </label>

//                         {/* Attached Bathroom */}
//                         <label className="flex items-center gap-2">
//                           <input
//                             type="checkbox"
//                             checked={formData.attached_bathroom === "Yes"}
//                             onChange={(e) =>
//                               handleInputChange(
//                                 "attached_bathroom",
//                                 e.target.checked ? "Yes" : "No",
//                               )
//                             }
//                           />
//                           Attached Bathroom
//                         </label>
//                       </div>
//                     </div>
//                   )}
//                   {!(
//                     (buildingType === "Residential" && propertyType === "Plot/Land") ||
//                     (buildingType === "Commercial" &&
//                       [
//                         "Land",
//                         "Plot/Land",
//                         "Industry",
//                         "Storage",
//                         "Hospitality",
//                         "Retail",
//                       ].includes(propertyType))
//                   ) && (
//                       <div>
//                         <label className="font-medium text-gray-700">
//                           Parking Availability
//                         </label>

//                         <select
//                           value={formData.parking_availability || ""}
//                           onChange={(e) =>
//                             handleInputChange(
//                               "parking_availability",
//                               e.target.value,
//                             )
//                           }
//                           className="w-full p-3 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                         >
//                           <option value="">Select Option</option>
//                           <option value="Yes">Yes</option>
//                           <option value="No">No</option>
//                         </select>
//                       </div>
//                     )}
//                   {!(
//                     (buildingType === "Residential" && propertyType === "Plot/Land") ||
//                     (buildingType === "Commercial" &&
//                       [
//                         "Land",
//                         "Plot/Land",
//                         "Industry",
//                         "Storage",
//                         "Hospitality",
//                       ].includes(propertyType))
//                   ) &&
//                     formData.parking_availability === "Yes" && (
//                       <div>
//                         <label className="font-medium text-gray-700">
//                           Covered Car Parking
//                         </label>

//                         <select
//                           value={formData.covered_parking || ""}
//                           onChange={(e) =>
//                             handleInputChange("covered_parking", e.target.value)
//                           }
//                           className="w-full p-3 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                         >
//                           <option value="">Select Covered Car Parking</option>
//                           <option value="1">1</option>
//                           <option value="2">2</option>
//                           <option value="3">3</option>
//                           <option value="4">4</option>
//                           <option value="5">5</option>
//                           <option value="6">6</option>
//                           <option value="6+">6+</option>
//                           <option value="NA">NA</option>
//                         </select>
//                       </div>
//                     )}
//                   {!(
//                     (buildingType === "Residential" && propertyType === "Plot/Land") ||
//                     (buildingType === "Commercial" &&
//                       [
//                         "Land",
//                         "Plot/Land",
//                         "Industry",
//                         "Storage",
//                         "Hospitality",
//                       ].includes(propertyType))
//                   ) &&
//                     formData.parking_availability === "Yes" && (
//                       <div>
//                         <label className="font-medium text-gray-700">
//                           Open Car Parking
//                         </label>

//                         <select
//                           value={formData.uncovered_parking || ""}
//                           onChange={(e) =>
//                             handleInputChange("uncovered_parking", e.target.value)
//                           }
//                           className="w-full p-3 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-rose-500"
//                         >
//                           <option value="">Select Open Car Parking</option>
//                           <option value="1">1</option>
//                           <option value="2">2</option>
//                           <option value="3">3</option>
//                           <option value="4">4</option>
//                           <option value="5">5</option>
//                           <option value="6">6</option>
//                           <option value="6+">6+</option>
//                           <option value="NA">NA</option>
//                         </select>
//                       </div>
//                     )}
//                   <div className="md:col-span-3 mt-2">
//                     {/* <label className="font-medium text-gray-700">
//                       Price Details
//                     </label> */}

//                     <div className="flex flex-wrap gap-4 mt-2">
//                       {/* All Inclusive Price */}
//                       <label className="flex items-center gap-2">
//                         <input
//                           type="checkbox"
//                           checked={formData.all_inclusive_price === "Yes"}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               all_inclusive_price: e.target.checked
//                                 ? "Yes"
//                                 : "No",
//                             })
//                           }
//                         />
//                         All Inclusive Price
//                       </label>
//                       {/* Price Onwards */}
//                       <label className="flex items-center gap-2">
//                         <input
//                           type="checkbox"
//                           checked={formData.price_onwards === "Yes"}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               price_onwards: e.target.checked ? "Yes" : "No",
//                             })
//                           }
//                         />
//                         Price Onwards
//                       </label>
//                       {/* Price Negotiable */}
//                       <label className="flex items-center gap-2">
//                         <input
//                           type="checkbox"
//                           checked={formData.price_negotiable === "Yes"}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               price_negotiable: e.target.checked ? "Yes" : "No",
//                             })
//                           }
//                         />
//                         Price Negotiable
//                       </label>

//                       {/* Tax & Govt Charges */}
//                       <label className="flex items-center gap-2">
//                         <input
//                           type="checkbox"
//                           checked={formData.tax_and_goverment_charges === "Yes"}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               tax_and_goverment_charges: e.target.checked
//                                 ? "Yes"
//                                 : "No",
//                             })
//                           }
//                         />
//                         Tax & Government Charges Excluded
//                       </label>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="p-3 mx-auto mb-16 bg-white border max-w-7xl rounded-xl">
//                   {/* Header Section */}
//                   <div className="mb-6">
//                     <h2 className="text-2xl font-semibold text-gray-900">
//                       Generate Project Information with AI
//                     </h2>
//                     <p className="text-gray-500">
//                       Details about the project, including an overview and
//                       description that provides insight into the project's
//                       purpose, goals, and unique aspects.
//                     </p>
//                   </div>

//                   {/* Form Grid */}
//                   <div className="grid grid-cols-1 sm:grid-cols-[2.9fr_1fr]">
//                     {/* About Project */}
//                     <div>
//                       <div className="flex items-center justify-between mb-2">
//                         <label className="font-medium text-gray-700">
//                           About Project
//                         </label>
//                         <button
//                           type="button"
//                           onClick={generateDescription}
//                           disabled={isGeneratingDescription}
//                           className="px-4 py-2 text-sm text-white transition rounded-lg bg-rose-500 hover:bg-rose-600 disabled:opacity-50"
//                         >
//                           {isGeneratingDescription
//                             ? "Generating..."
//                             : "Generate Description"}
//                         </button>
//                       </div>

//                       <div className="relative w-full mt-1">
//                         <textarea
//                           value={description}
//                           maxLength={800}
//                           onChange={(e) => {
//                             const value = e.target.value;
//                             setDescription(value);
//                           }}
//                           placeholder="Enter Project Description"
//                           className="w-full h-40 p-3 pb-7 pr-16 text-gray-700 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-rose-500 resize-none block"
//                         />
//                         <span className="absolute bottom-2 right-3 text-xs text-gray-400 pointer-events-none select-none z-10">
//                           {(description || "").length}/800
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </>
//           )}

//           {activeStep === 3 && (
//             <>
//               <div className="max-w-4xl p-6 mx-auto mb-24 bg-white border border-gray-300 shadow-sm rounded-xl">
//                 {/* Title & Subtitle */}
//                 <div className="mb-6">
//                   <h2 className="text-2xl font-semibold text-gray-900">
//                     Amenities
//                   </h2>
//                   <p className="mt-2 text-sm text-gray-500">
//                     Select the amenities available in your project. The
//                     checkboxes below are dynamically generated from your
//                     settings.
//                   </p>
//                 </div>

//                 {/* Error Message for Amenities */}
//                 {errors.amenities && (
//                   <p className="flex items-center gap-1 mb-4 text-sm text-red-500">
//                     <MdErrorOutline className="text-lg" />
//                     {errors.amenities}
//                   </p>
//                 )}

//                 {/* Amenities List */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
//                   {amenitiesList.map((amenity, index) => (
//                     <label
//                       key={index}
//                       className="flex items-center p-2 space-x-3 transition rounded-lg cursor-pointer hover:bg-gray-50"
//                     >
//                       <input
//                         type="checkbox"
//                         checked={selectedAmenities.includes(amenity._id)}
//                         onChange={() => toggleAmenity(amenity._id)}
//                         className="w-5 h-5 my-text border-gray-300 form-checkbox focus:ring-rose-500"
//                       />
//                       <span
//                         className={`text-gray-700 ${selectedAmenities.includes(amenity._id) ? "my-text font-semibold" : ""}`}
//                       >
//                         {amenity.amenity_name}
//                       </span>
//                     </label>
//                   ))}

//                 </div>
//               </div>
//             </>
//           )}

//           {activeStep === 4 && (
//             <div className="max-w-5xl p-6 pt-0 mx-auto">
//               {/* Company Logo Upload */}
//               <div className="p-6 bg-white border border-gray-200 rounded-xl">
//                 <h2 className="text-xl text-gray-900">Upload Company Logo</h2>
//                 <p className="mt-1 text-gray-500">
//                   Upload your project's or company's logo here.
//                 </p>
//                 <div
//                   className="relative flex flex-col items-center p-6 mt-4 border-2 border-gray-300 border-dashed rounded-lg"
//                   onDragOver={(e) => e.preventDefault()}
//                   onDrop={(e) => {
//                     e.preventDefault();
//                     const file = e.dataTransfer.files[0];
//                     if (file && file.type.startsWith("image/"))
//                       setCompanyLogo(file);
//                   }}
//                 >
//                   {companyLogo ? (
//                     <div className="relative w-32 h-32">
//                       <img
//                         src={URL.createObjectURL(companyLogo)}
//                         alt="Company Logo"
//                         className="object-contain w-full h-full border rounded"
//                       />
//                       <button
//                         onClick={() => setCompanyLogo(null)}
//                         className="absolute flex items-center justify-center w-6 h-6 text-white bg-black bg-opacity-50 rounded-full top-1 right-1"
//                       >
//                         <Trash className="w-4 h-4" />
//                       </button>
//                     </div>
//                   ) : (
//                     <>
//                       <MdOutlineDriveFolderUpload className="text-6xl text-gray-400" />
//                       <p className="mt-2 text-gray-700">
//                         Drag & Drop or Click to Upload Logo
//                       </p>
//                       <button
//                         onClick={() => companyLogoInputRef.current.click()}
//                         className="px-4 py-2 mt-3 text-white my-bg rounded-md hover:my-bg"
//                       >
//                         + Upload Logo
//                       </button>
//                       <p className="mt-2 text-xs text-center text-gray-400">
//                         Accepted formats: .jpg, .png, .jpeg | Max size: 5MB
//                       </p>
//                     </>
//                   )}
//                   <input
//                     type="file"
//                     accept="image/*"
//                     ref={companyLogoInputRef}
//                     onChange={(e) =>
//                       e.target.files[0] && setCompanyLogo(e.target.files[0])
//                     }
//                     className="hidden"
//                   />
//                 </div>
//                 {errors.companyLogo && (
//                   <p className="flex items-center gap-1 mt-2 text-sm text-red-500">
//                     <MdErrorOutline className="text-lg" />
//                     {errors.companyLogo}
//                   </p>
//                 )}
//               </div>

//               {/* Cover Photo and Video */}
//               <div className="grid grid-cols-1 gap-6 my-6 md:grid-cols-2">
//                 {/* Cover Image Upload */}
//                 <div
//                   className="p-6 bg-white border border-gray-200 rounded-xl"
//                   onDragOver={(e) => e.preventDefault()}
//                   onDrop={(e) => {
//                     e.preventDefault();
//                     const file = e.dataTransfer.files[0];
//                     if (file && file.type.startsWith("image/"))
//                       setCoverImage(file);
//                   }}
//                 >
//                   <h2 className="text-xl text-gray-900">
//                     Upload Project Cover Photo
//                   </h2>
//                   <p className="mt-1 text-gray-500">
//                     This step allows users to upload cover photo.
//                   </p>
//                   <div className="relative flex flex-col items-center p-6 mt-4 border-2 border-gray-300 border-dashed rounded-lg">
//                     {coverImage ? (
//                       <div className="relative w-full">
//                         <img
//                           src={URL.createObjectURL(coverImage)}
//                           alt="Cover"
//                           className="object-cover w-full h-64 rounded-md"
//                         />
//                         <button
//                           onClick={handelCoverImageDelete}
//                           className="absolute p-1 bg-black bg-opacity-50 rounded-full top-2 right-2"
//                         >
//                           <Trash className="w-4 h-4 text-white" />
//                         </button>
//                       </div>
//                     ) : (
//                       <>
//                         <MdOutlineDriveFolderUpload className="text-gray-400 text-8xl" />
//                         <p className="mt-2 text-gray-500">
//                           Drag and Drop Image or Upload
//                         </p>
//                         <button
//                           onClick={() => imageInputRef.current.click()}
//                           className="px-4 py-2 mt-2 text-white my-bg rounded-md hover:my-bg"
//                         >
//                           + Add Photo
//                         </button>
//                         <p className="mt-2 text-xs text-center text-gray-400">
//                           Accepted formats: .jpg, .gif, .bmp, .png | Max size:
//                           50MB
//                         </p>
//                       </>
//                     )}
//                     <input
//                       type="file"
//                       accept="image/*"
//                       ref={imageInputRef}
//                       onChange={(e) => setCoverImage(e.target.files[0])}
//                       className="hidden"
//                     />
//                   </div>
//                   {errors.coverImage && (
//                     <p className="flex items-center gap-1 mt-2 text-sm text-red-500">
//                       <MdErrorOutline className="text-lg" />
//                       {errors.coverImage}
//                     </p>
//                   )}
//                 </div>

//                 {/* Video Upload */}
//                 <div className="flex flex-col gap-6">
//                   <div
//                     className="p-6 bg-white border border-gray-200 rounded-xl"
//                     onDragOver={(e) => e.preventDefault()}
//                     onDrop={(e) => {
//                       e.preventDefault();
//                       const file = e.dataTransfer.files[0];
//                       if (file && file.type.startsWith("video/"))
//                         handleVideoUpload({ target: { files: [file] } });
//                     }}
//                   >
//                     <h2 className="text-xl text-gray-900">
//                       Upload Project Video
//                     </h2>
//                     <p className="mt-1 text-gray-500">
//                       Upload a video showcasing the project.
//                     </p>
//                     {video ? (
//                       <div className="relative">
//                         <video
//                           controls
//                           src={video}
//                           className="object-cover w-full rounded-lg h-72"
//                         />
//                         <button
//                           onClick={handleVideoDelete}
//                           className="px-4 py-2 mt-4 text-white my-bg rounded-md hover:my-bg"
//                         >
//                           <Trash className="w-4 h-4 text-white" />
//                         </button>
//                       </div>
//                     ) : (
//                       <button
//                         onClick={() => videoInputRef.current.click()}
//                         className="px-4 py-2 mt-4 text-white my-bg rounded-md hover:my-bg"
//                       >
//                         Upload Video
//                       </button>
//                     )}
//                     <input
//                       ref={videoInputRef}
//                       type="file"
//                       accept="video/*"
//                       onChange={handleVideoUpload}
//                       className="hidden"
//                     />
//                   </div>

//                   {/* Video URL Option */}
//                   <div className="p-6 bg-white border border-gray-200 rounded-xl">
//                     <h2 className="text-xl text-gray-900">Video Option</h2>
//                     <div className="flex gap-4 mt-4">
//                       <div className="w-1/2">
//                         <label className="block mb-2 text-gray-700">
//                           Select Video Source
//                         </label>
//                         <select
//                           value={videoSource}
//                           onChange={(e) => setVideoSource(e.target.value)}
//                           className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                         >
//                           <option value="">Select</option>
//                           <option value="YouTube">YouTube</option>
//                           <option value="Vimeo">Vimeo</option>
//                           <option value="Other">Other</option>
//                         </select>
//                       </div>
//                       <div className="w-1/2">
//                         <label className="block mb-2 text-gray-700">
//                           Enter Video URL
//                         </label>
//                         <input
//                           type="text"
//                           value={videoURL}
//                           onChange={(e) => setVideoURL(e.target.value)}
//                           className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Images and Virtual Tour */}
//               <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                 {/* Property Images */}
//                 <div className="p-6 bg-white border border-gray-200 rounded-xl">
//                   <h2 className="text-xl text-gray-900">
//                     Upload Project Images
//                   </h2>
//                   <p className="mt-1 text-gray-500">
//                     Add multiple images to showcase the Project.
//                   </p>
//                   <div
//                     className="flex flex-col items-center p-8 mt-4 border-2 border-gray-300 border-dashed rounded-lg"
//                     onDragOver={(e) => e.preventDefault()}
//                     onDrop={(e) => {
//                       e.preventDefault();
//                       const dropped = Array.from(e.dataTransfer.files).filter(
//                         (file) => file.type.startsWith("image/"),
//                       );
//                       if (dropped.length > 0)
//                         handleImageUpload2({ target: { files: dropped } });
//                     }}
//                   >
//                     <MdOutlineDriveFolderUpload className="text-gray-400 text-8xl" />
//                     <p className="mt-2 text-gray-700">
//                       Drag and Drop or Upload
//                     </p>
//                     <button
//                       onClick={() => imageInputRef2.current.click()}
//                       className="px-4 py-2 mt-3 text-white my-bg rounded-md hover:my-bg"
//                     >
//                       + Add Photos
//                     </button>
//                     <input
//                       type="file"
//                       multiple
//                       accept="image/*"
//                       ref={imageInputRef2}
//                       onChange={handleImageUpload2}
//                       className="hidden"
//                     />
//                   </div>
//                   <div className="grid grid-cols-4 gap-3 mt-6">
//                     {images.map((img, index) => (
//                       <div key={index} className="relative">
//                         <img
//                           src={img}
//                           alt={`img-${index}`}
//                           className="object-cover w-full h-24 rounded-lg"
//                         />
//                         <button
//                           onClick={() => handleDelete(index)}
//                           className="absolute p-1 bg-black bg-opacity-50 rounded-md top-1 right-1"
//                         >
//                           <Trash className="w-4 h-4 text-white" />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Virtual Tour + Brochure */}
//                 <div className="flex flex-col gap-6">
//                   <div className="p-6 bg-white border border-gray-200 rounded-xl">
//                     <h2 className="text-xl font-semibold text-gray-900">
//                       Virtual Tour
//                     </h2>
//                     <p className="mt-1 text-gray-500">
//                       Is a virtual tour available?
//                     </p>
//                     <select
//                       value={virtualTourLink}
//                       onChange={(e) => setVirtualTourLink(e.target.value)}
//                       className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
//                     >
//                       {/* <option value="">Select Virtual Tour Available?</option> */}
//                       <option value="No">No</option>
//                       <option value="Yes">Yes</option>
//                     </select>
//                   </div>

//                   {/* Brochure Upload */}
//                   <div
//                     className="flex flex-col items-center p-8 border-2 border-gray-300 border-dashed rounded-lg"
//                     onDragOver={(e) => e.preventDefault()}
//                     onDrop={(e) => {
//                       e.preventDefault();
//                       const file = e.dataTransfer.files[0];
//                       if (
//                         file &&
//                         (file.type === "application/pdf" ||
//                           file.type.startsWith("image/"))
//                       ) {
//                         handleBrochureUpload({ target: { files: [file] } });
//                       }
//                     }}
//                   >
//                     <MdOutlineDriveFolderUpload className="text-gray-400 text-8xl" />
//                     <p className="mt-2 text-gray-700">
//                       Upload Brochure (PDF/Image)
//                     </p>
//                     {brochureDoc && (
//                       <div className="relative flex flex-col items-center w-full mt-4">
//                         <button
//                           onClick={handleBrochureDelete}
//                           className="absolute top-0 right-0 z-10 flex items-center justify-center w-6 h-6 text-white bg-black bg-opacity-50 rounded-full"
//                           title="Delete Brochure"
//                         >
//                           <Trash className="w-4 h-4 text-white" />
//                         </button>
//                         {brochureDoc.type === "application/pdf" ? (
//                           <div className="flex items-center gap-2">
//                             <FaFilePdf className="text-lg text-red-600" />
//                             <span className="text-sm text-gray-600">
//                               {brochureDoc.name}
//                             </span>
//                           </div>
//                         ) : (
//                           <img
//                             src={URL.createObjectURL(brochureDoc)}
//                             alt="Brochure Preview"
//                             className="w-48 h-auto rounded shadow"
//                           />
//                         )}
//                       </div>
//                     )}
//                     {!brochureDoc && (
//                       <button
//                         onClick={() => brochureInputRef.current.click()}
//                         className="px-4 py-2 mt-3 text-white my-bg rounded-md hover:my-bg"
//                       >
//                         + Upload Brochure
//                       </button>
//                     )}
//                     <input
//                       type="file"
//                       accept="image/*,.pdf"
//                       ref={brochureInputRef}
//                       onChange={handleBrochureUpload}
//                       className="hidden"
//                     />
//                     <p className="mt-2 text-xs text-center text-gray-400">
//                       Accepted formats: .jpg, .png, .jpeg, .pdf | Max size: 50MB
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Navigation Buttons - Fixed at Bottom */}
//           <div
//             className={`fixed bottom-0 left-0 right-0 bg-white p-4 shadow-md flex mx-32 ${activeStep === 0 ? "justify-end" : "justify-between"
//               }`}
//           >
//             {" "}
//             {activeStep > 0 && (
//               <button
//                 onClick={prevStep}
//                 className="px-5 py-2 text-gray-700 bg-gray-300 rounded-lg hover:bg-gray-400"
//               >
//                 Back
//               </button>
//             )}
//             {activeStep < steps.length - 1 ? (
//               <button
//                 type="button"
//                 onClick={() => {
//                   const isValid = validateStepFields();
//                   if (isValid) {
//                     handleNext();
//                   }
//                 }}
//                 className="px-5 py-2 text-white my-bg rounded-lg hover:my-bg"
//               >
//                 Continue
//               </button>
//             ) : (
//               <button
//                 onClick={handleSubmit}
//                 disabled={isSubmitting}
//                 className={`mt-4 px-4 py-2 rounded ${isSubmitting ? "bg-gray-400" : "bg-green-600 hover:my-bg"} text-white`}
//               >
//                 {isSubmitting ? "Submitting..." : "Submit"}
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       {showUpcomingProjectCount && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="w-full max-w-md p-6 bg-white shadow-2xl rounded-xl">
//             <h2 className="mb-4 text-xl font-semibold text-red-600">
//               Project Posting Limit Reached
//             </h2>
//             <p className="mb-6 text-gray-700">
//               You have reached your maximum limit for posting projects. Please
//               purchase a plan to continue creating new projects.
//             </p>
//             {/* Align buttons at opposite ends with padding */}
//             <div className="flex items-center justify-between px-1">
//               <button
//                 className="px-4 py-2 text-white my-bg rounded hover:bg-green-700"
//                 onClick={() => {
//                   setShowUpcomingProjectCount(false);
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
//                   setShowUpcomingProjectCount(false);
//                   history.push("/");
//                 }}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showFeaturePopup && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="w-full max-w-md p-6 bg-white shadow-2xl rounded-xl">
//             <h2 className="mb-4 text-xl font-semibold text-red-600">
//               Purchase feature Subscription Plan
//             </h2>
//             <p className="mb-6 text-gray-700">
//               Please purchase a plan to feature more properties and showcase
//               your project in the top projects.
//             </p>
//             <div className="flex items-center justify-between px-1">
//               <button
//                 className="px-4 py-2 text-white my-bg rounded hover:bg-green-700"
//                 onClick={() => {
//                   setShowFeaturePopup(false);
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
//                   setShowFeaturePopup(false);
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
// export default AddNewProject;





// =================================================0000000000000=================================


import React, { useState, useEffect, useRef } from "react";
import { IoIosInformationCircle } from "react-icons/io";
import { ToWords } from "to-words";
import { Plus } from "lucide-react"; // Using Lucide Icons for delete button
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import axios from "axios";
import {
  Trash,
  Buildings,
  FileText,
  MapPin,
  ClipboardText,
  Sparkle,
  Star,
  Images,
  Check,
  ArrowLeft,
  ArrowRight,
  PaperPlaneTilt,
  WarningCircle,
  Crown,
} from "@phosphor-icons/react";
import { FaFilePdf } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdClose } from "react-icons/io";
import Select from "react-select";
import {
  GoogleMap,
  Marker,
  Autocomplete,
  useJsApiLoader,
} from "@react-google-maps/api";
import { MdErrorOutline } from "react-icons/md";
import { Country, State } from "country-state-city";
import { FaRupeeSign } from "react-icons/fa";

// ==========================================================
// UI helpers — brand #D61F45 (kept outside the component so
// nothing remounts on every keystroke).
// ==========================================================
const BRAND = "#D61F45";

// Card title: pink icon tile + title + grey subtitle ("Basic Details").
const SectionHeader = ({ icon: Icon, title, accent, subtitle, action }) => (
  <div className="flex flex-wrap items-start gap-4 mb-6">
    <span className="flex items-center justify-center flex-shrink-0 w-14 h-14 rounded-2xl bg-[#FDE8EC] text-[#D61F45]">
      <Icon size={28} weight="fill" />
    </span>
    <div className="flex-1 min-w-0 pt-1">
      <h2 className="m-0 text-xl font-bold md:text-[22px] text-[#17253a]">
        {title} {accent && <span className="text-[#D61F45]">{accent}</span>}
      </h2>
      {subtitle && (
        <p className="m-0 mt-1 text-[14px] text-gray-500">{subtitle}</p>
      )}
    </div>
    {action}
  </div>
);

// White card used for every step.
const sectionCard =
  "p-5 mb-5 bg-white border border-[#F3D7DD] md:p-8 rounded-2xl shadow-[0_10px_30px_rgba(214,31,69,0.06)]";

// Red inline error with icon (used for fields that had no message before).
const FieldError = ({ msg }) =>
  msg ? (
    <p className="flex items-center gap-1 mt-1 text-[12px] font-medium text-[#D61F45]">
      <MdErrorOutline className="text-lg" />
      {msg}
    </p>
  ) : null;

// Faint pink skyline used on both sides of the hero title.
const Skyline = ({ className = "" }) => (
  <div
    aria-hidden="true"
    className={`absolute bottom-0 items-end hidden gap-1 pointer-events-none md:flex text-[#D61F45] ${className}`}
  >
    <Buildings size={60} weight="fill" className="opacity-[0.18]" />
    <Buildings size={120} weight="fill" className="opacity-[0.22]" />
    <Buildings size={84} weight="fill" className="opacity-[0.16]" />
    <Buildings size={104} weight="fill" className="opacity-[0.2]" />
    <Buildings size={66} weight="fill" className="opacity-[0.14]" />
  </div>
);

// FIX: previews used URL.createObjectURL(file) inside render, which made a
// new blob URL on every keystroke and never released it. This hook makes one
// URL per file and frees it when the file changes or the page closes.
const useObjectUrl = (file) => {
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (!(file instanceof Blob)) {
      setUrl("");
      return undefined;
    }
    const next = URL.createObjectURL(file);
    setUrl(next);
    return () => URL.revokeObjectURL(next);
  }, [file]);
  return url;
};

const AddNewProject = () => {
  // Define state for the form fields
  const [projectName, setProjectName] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const userId = sessionStorage.getItem("accessToken");
  const user_type = sessionStorage.getItem("user_type");
  const user_name = sessionStorage.getItem("user_name");
  const Mobile_Number = sessionStorage.getItem("Mobile_Number");
  const user_email = sessionStorage.getItem("user_email");
  const [buildingType, setBuildingType] = useState("Residential");
  const [propertyType, setPropertyType] = useState("Apartment");
  const [allCountries, setAllCountries] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [address, setAddress] = useState("");
  const [addressArea, setAddressArea] = useState("");
  const [city, setCity] = useState("");
  const [locality, setLocality] = useState("");
  const [subLocality, setSubLocality] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const autoCompleteRef = useRef(null);
  const GOOGLE_MAPS_API_KEY = "AIzaSyAUCNwxnNo52kFWJNGhRVj-AnkoffmzYe0";
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [totalProjectSize, setTotalProjectSize] = useState("");
  const [averagePrice, setAveragePrice] = useState("");

  const [configurations, setConfigurations] = useState("");
  const [launchDate, setLaunchDate] = useState("");
  const [possessionStart, setPossessionStart] = useState("");
  const [constructionStatus, setConstructionStatus] = useState("");
  const [reraId, setReraId] = useState("");
  const [floorLivingDining, setFloorLivingDining] = useState("");
  const [floorKitchenToilet, setFloorKitchenToilet] = useState("");
  const [floorBedroom, setFloorBedroom] = useState("");
  const [floorBalcony, setFloorBalcony] = useState("");
  const [wallsLivingDining, setWallsLivingDining] = useState("");
  const [wallServantRoom, setWallCeilingsServantRoom] = useState("");
  const [wallsKitchenToilet, setWallsKitchenToilet] = useState("");
  const [wallsServantRoom, setWallsServantRoom] = useState("");
  const [ceiling, setCeiling] = useState("");
  const [ceilingsServantRoom, setCeilingsServantRoom] = useState("");
  const [countersKitchenToilet, setCountersKitchenToilet] = useState("");
  const [fittingsKitchenToilet, setFittingsKitchenToilet] = useState("");
  const [fittingsServantRoomToilet, setFittingsServantRoomToilet] =
    useState("");
  const [internalDoor, setInternalDoor] = useState("");
  const [externalGlazing, setExternalGlazing] = useState("");
  const [electrical, setElectrical] = useState("");
  const [backup, setBackup] = useState("");
  const [securitySystem, setSecuritySystem] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [video, setVideo] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const videoInputRef = useRef(null);
  const [videoSource, setVideoSource] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [virtualTourLink, setVirtualTourLink] = useState("");
  const history = useHistory();
  const [mapCenter, setMapCenter] = useState({ lat: 18.5204, lng: 73.8567 });
  const [amenitiesList, setAmenitiesList] = useState([]);
  const calendarRef = useRef(null);
  const possessionStartRef = useRef(null);
  const [showUpcomingProjectCount, setShowUpcomingProjectCount] =
    useState(false);
  const [showFeaturePopup, setShowFeaturePopup] = useState(false);
  const [isCountLoaded, setIsCountLoaded] = useState(false);
  const [upcomingProjectCount, setUpcomingProjectCount] = useState(0);
  const [featureCount, setFeatureCount] = useState(0);
  const [brochureDoc, setBrochureDoc] = useState(null);
  const brochureInputRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [completedSteps, setCompletedSteps] = useState([]);
  const [companyLogo, setCompanyLogo] = useState(null);
  const companyLogoInputRef = useRef(null);
  const companyLogoUrl = useObjectUrl(companyLogo);
  //const [officeSubType, setOfficeSubType] = useState("");
  //const [landType, setLandType] = useState("");
  //const [retailType, setRetailType] = useState("");
  // const [storageType, setStorageType] = useState("");
  // const [industryType, setIndustryType] = useState("");
  // const [hospitalityType, setHospitalityType] = useState("");
  // const [RetailSubType, setRetailSubType] = useState("");
  // const [retailLocation, setRetailLocation] = useState("");
  const [retailWashroom, setRetailWashroom] = useState("");
  const [totalNumberParking, setTotalNumberParking] = useState("");
  const [parkingTypes, setParkingTypes] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const emptyProjectProperty = {
    project_type: "",
    sub_project_type: "",
    retail_location: "",
    sub_sub_project_type: "",
    price: "",
    bhk_type: "",
    carpet_area: "",
    carpet_area_in: "",
    area: "",
    area_in: "",
    bathroom: "",
    commercial_washroom: "",
    total_floor: "",
    project_floor: "",
    no_of_cabines: "",
    no_of_meeting_Rooms: "",
    no_of_conference_room: "",
    total_number_of_rooms: "",
    facing: "",
    property_dimensions_length: "",
    property_dimensions_breadth: "",
    no_of_open_sides: "",
    parking_types: "",
    number_of_seats_available: "",
    purchase_type: "",
    age_of_property: "",
    furnished_type: "",
    balcony: "",
    pantry_option: "",
    central_AC: "",
    reception_area: "",
    personal_washroom: "",
  };

  const [projectProperties, setProjectProperties] = useState([
    { ...emptyProjectProperty },
  ]);
  const handleProjectPropertyChange = (index, key, value) => {
    setProjectProperties((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [key]: value,
      };
      return updated;
    });
  };
  const handleDeleteProjectProperty = (index) => {
    if (projectProperties.length === 1) {
      toast.error("At least one project property is required.");
      return;
    }

    setProjectProperties((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);

  const buildPrompt = () => {
    return `
Write a professional real estate project description.

STRICT INSTRUCTIONS:
- The description MUST be between 600 and 700 characters ONLY
- Do NOT exceed 700 characters
- Do NOT go below 600 characters
- Write everything in ONE paragraph
- Do NOT use bullet points or line breaks

Project Details:
- Project Name: ${projectName?.trim() || ""}
- Type: ${propertyType || ""}
- Building Type: ${buildingType || ""}
- City: ${city?.trim() || ""}
- Area: ${addressArea || ""}
- Average Price: ₹${averagePrice || ""}
- Configurations: ${configurations || ""}
- Construction Status: ${constructionStatus || ""}
- Total Project Size: ${totalProjectSize || ""}
- Launch Date: ${launchDate || ""}
- Possession Start: ${possessionStart || ""}

Make it engaging, attractive, and human-like.
`;
  };

  const generateDescription = async () => {
    try {
      setIsGeneratingDescription(true);

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: buildPrompt(),
            },
          ],
          temperature: 0.7,
          max_tokens: 200,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        },
      );

      const generatedDescription =
        response?.data?.choices?.[0]?.message?.content || "";

      setDescription(generatedDescription);

      toast.success("Description generated successfully");
    } catch (error) {
      console.error("Generate Description Error:", error);
      toast.error("Failed to generate description");
    } finally {
      setIsGeneratingDescription(false);
    }
  };

  const options = [
    { value: "Pooja Room", label: "Pooja Room" },
    { value: "Study Room", label: "Study Room" },
    { value: "Servant Room", label: "Servant Room" },
    { value: "Store Room", label: "Store Room" },
  ];
  const builderFloorOptions = ["Single Floor", "Duplex", "Triplex"];
  const constructionOptions = ["Shed", "Rooms", "Washroom", "Others"];

  const CustomMultiValue = (props) => {
    return (
      <div className="flex items-center bg-[#FDE8EC] text-[#D61F45] px-2 py-1 rounded">
        {props.children}
      </div>
    );
  };
  const officeOptions = [
    "Ready to move office space",
    "Bare shell office space",
    "Co-working office space",
  ];

  const landOptions = [
    "Commercial Land/Inst. Land",
    "Industrial Lands/Plots",
    "Agricultural/Farm Land",
  ];

  const retailOptions = ["Commercial Shops", "Commercial Showrooms"];

  const storageOptions = ["Ware House", "Cold Storage"];

  const industryOptions = ["Factory", "Manufacturing"];

  const hospitalityOptions = ["Hotel/Resorts", "Guest-House/Banquet-Halls"];
  const retailLocationOptions = [
    "Mall",
    "Commercial Project",
    "Residential Project",
    "Retail Complex/Building",
    "Market/High Street",
    "Others",
  ];

  const handleInputChange = (eOrKey, value) => {
    if (typeof eOrKey === "string") {
      setFormData((prev) => ({
        ...prev,
        [eOrKey]: value,
      }));
    } else {
      const { name, value } = eOrKey.target;

      setFormData((prev) => {
        const updatedData = {
          ...prev,
          [name]: value,
        };

        return updatedData;
      });
    }
  };
  //   const handleProjectPropertyChange = (index, field, value) => {
  //   const updated = [...projectProperties];

  //   updated[index] = {
  //     ...updated[index],
  //     [field]: value,
  //   };

  //   setProjectProperties(updated);
  // };

  useEffect(() => {
    const countries = Country.getAllCountries();
    setAllCountries(countries);
  }, []);

  useEffect(() => {
    if (country) {
      const states = State.getStatesOfCountry(country);
      setAllStates(states);
    } else {
      setAllStates([]);
    }
  }, [country]);
  useEffect(() => {
    const prices = projectProperties
      .map((property) => Number(property.price))
      .filter((price) => !isNaN(price) && price > 0);

    if (prices.length === 0) {
      setAveragePrice("");
      return;
    }

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    setAveragePrice(
      minPrice === maxPrice
        ? `${minPrice}`
        : `${minPrice}-${maxPrice}`
    );
  }, [projectProperties]);
  useEffect(() => {
    const bhkOrder = [
      "Studio/Single Room",
      "1 BHK",
      "1.5 BHK",
      "2 BHK",
      "2.5 BHK",
      "3 BHK",
      "3.5 BHK",
      "4 BHK",
      "5 BHK",
      "6 BHK",
      "6+ BHK",
    ];

    const selected = [
      ...new Set(
        projectProperties
          .map((property) => property.bhk_type)
          .filter(Boolean)
      ),
    ];

    const sorted = bhkOrder.filter((bhk) => selected.includes(bhk));

    const formatted = sorted.map((bhk) => {
      if (bhk === "Studio/Single Room") return bhk;
      return bhk.replace(" BHK", "");
    });

    if (formatted.length === 0) {
      setConfigurations("");
      return;
    }

    const hasStudio = formatted.includes("Studio/Single Room");
    const onlyNumbers = formatted.filter((item) => item !== "Studio/Single Room");

    let result = "";

    if (hasStudio) {
      result += "Studio/Single Room";
      if (onlyNumbers.length) {
        result += ", ";
      }
    }

    if (onlyNumbers.length) {
      result += `${onlyNumbers.join(", ")} BHK`;
    }

    setConfigurations(result);
  }, [projectProperties]);

  const formatAverageProjectPrice = (price) => {
    if (!price) return "";

    if (typeof price === "string" && price.includes("-")) {
      const parts = price.split("-").map((p) => p.trim());
      return (
        <>
          {parts.map((p, idx) => {
            const num = parseInt(p);
            if (isNaN(num)) return null;

            return (
              <span key={idx} className="inline-flex items-center">
                <FaRupeeSign className="inline-block mr-1" />
                {num}
                {idx === 0 && " - "}
              </span>
            );
          })}
        </>
      );
    }

    const num = parseInt(price);
    if (isNaN(num)) return "";

    return (
      <span className="inline-flex items-center">
        <FaRupeeSign className="inline-block mr-1" />
        {num}
      </span>
    );
  };

  const handleBrochureUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > 50) {
      toast.error("File size exceeds 50MB limit");
      return;
    }

    setBrochureDoc(file);
  };

  const handleBrochureDelete = () => {
    setBrochureDoc(null);
  };

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
        const upcomingCount = countData.upcoming_project_count || 0;
        const featureCount = countData.mark_as_developer_count || 0;

        setUpcomingProjectCount(upcomingCount);
        setFeatureCount(featureCount);

        // Check conditions *after* setting count
        if (upcomingCount <= 0) {
          setShowUpcomingProjectCount(true);
        } else {
          setShowUpcomingProjectCount(false);
        }
      }

      setIsCountLoaded(true);
    } catch (error) {
      console.error("Error checking post limits:", error);
      setIsCountLoaded(true); // prevent infinite loading state
    }
  };

  useEffect(() => {
    if (userId) {
      checkPostLimits();
    }
  }, [userId]);

  const handlePossessionStartChange = (e) => {
    setPossessionStart(e.target.value);
  };

  const openPossessionStartCalendar = () => {
    if (possessionStartRef.current) {
      possessionStartRef.current.showPicker();
    }
  };

  const handleDateChange = (e) => {
    setLaunchDate(e.target.value);
  };

  const openCalendar = () => {
    if (calendarRef.current) {
      calendarRef.current.showPicker();
    }
  };

  const steps = [
    "Basic Info",
    "Address",
    "Project Details",
    "Amenities",
    "Photos / Videos",
  ];
  const [activeStep, setActiveStep] = useState(0);

  const nextStep = () =>
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setActiveStep((prev) => Math.max(prev - 1, 0));

  const buildingTypes = ["Residential", "Commercial"];
  const residentialTypes = [
    "Apartment",
    // "Plot",
    "Independent House/Villa",
    "Independent/Builder Floor",
    "1RK/Studio Apartment",
    "Service Apartment",
    "Farmhouse",
    "Other",
  ];

  const commercialTypes = [
    "Office",
    "Retail",
    "Plot/Land",
    // "Office Space in IT/SEZ",
    "Storage",
    // "Warehouse",
    "Industry",
    "Hospitality",
    "Other",
  ];

  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity],
    );
  };

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/cust_api/get_amenities`,
        );
        if (response.data.status === 1) {
          setAmenitiesList(response.data.data);
        } else {
          console.error("Failed to fetch amenities");
        }
      } catch (error) {
        console.error("Error fetching amenities:", error);
      }
    };

    fetchAmenities();
  }, []);

  const [formData, setFormData] = useState({
    step1: {},
    step2: {},
    step3: {},
    step4: {},

    average_project_price: "",
    bhk_type: "",
    area: "",
    area_in: "",
    carpet_area: "",
    carpet_area_in: "",

    custom_deposit_amount: "",
    total_beds: "",
    all_inclusive_price: "No",
    price_onwards: "No",
    price_negotiable: "No",
    tax_and_goverment_charges: "No",
  });
  const handleNext = () => {
    const updatedData = { ...formData };
    updatedData[`step${activeStep + 1}`] = currentStepData;
    setFormData(updatedData);

    // Add current step to completedSteps
    setCompletedSteps((prev) => [...new Set([...prev, activeStep])]);

    nextStep();
  };

  const [currentStepData, setCurrentStepData] = useState({});

  const [fileData, setFileData] = useState([]);

  const handleDelete = (index) => {
    if (images[index]) URL.revokeObjectURL(images[index]);
    setImages((prev) => prev.filter((_, i) => i !== index));
    setFileData((prev) => prev.filter((_, i) => i !== index));
  };

  const imageInputRef = useRef(null);

  const [images, setImages] = useState([]);

  const imageInputRef2 = useRef(null);

  const handleImageUpload2 = (e) => {
    const files = Array.from(e.target.files);
    const maxSize = 10 * 1024 * 1024; // 10MB

    let oversizeFound = false;
    let oversizedFiles = [];
    let newImages = [];
    let newFiles = []; // <-- for original file objects

    for (let file of files) {
      if (file.size > maxSize) {
        oversizeFound = true;
        oversizedFiles.push(file.name);
      } else {
        newImages.push(URL.createObjectURL(file)); // for preview
        newFiles.push(file); // for backend upload
      }
    }

    if (oversizeFound) {
      toast.error(
        `The following images are larger than 10MB: ${oversizedFiles.join(", ")}`,
      );
    }

    setImages((prev) => [...prev, ...newImages]);
    setFileData((prev) => [...prev, ...newFiles]);

    e.target.value = "";
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const maxSize = 50 * 1024 * 1024; // 50MB

    if (file.size > maxSize) {
      toast.error(
        "Video file is larger than 50MB. Please upload a smaller file.",
      );
      return;
    }

    if (video) {
      toast.error("You can only upload one video.");
      return;
    }

    setVideo(URL.createObjectURL(file));
    setVideoFile(file);
  };

  const handleVideoDelete = () => {
    if (video) URL.revokeObjectURL(video);
    setVideo(null);
    setVideoFile(null);
    if (videoInputRef.current) videoInputRef.current.value = "";
  };

  const handelCoverImageDelete = () => {
    setCoverImage(null);
  };

  // Inside your component
  const [isSubmitting, setIsSubmitting] = useState(false);
  const coverImageUrl = useObjectUrl(coverImage);
  const brochureUrl = useObjectUrl(brochureDoc);

  // Jump back to the top whenever the step changes.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeStep]);

  const handleSubmit = async () => {
    if (!userId) {
      toast.error("You must be logged in to submit a project.");
      return;
    }
    const isValid = validateStepFields();
    if (!isValid) {
      toast.error("Please fill all required fields before submitting.");
      return;
    }

    setIsSubmitting(true);
    const apiFormData = new FormData();
    //const projectPropertyFormData = new FormData();
    // console.log("Furnished:", formData.furnished_type);
    // console.log("React State:", formData);
    // console.log("Furnished Value:", formData.furnished_type);
    const projectData = {
      user_id: userId,
      user_type: user_type,
      custom_deposit_amount: formData.custom_deposit_amount,
      project_floor: formData.project_floor,
      total_floor: formData.total_floor,
      parking_availability: formData.parking_availability,
      sub_sub_project_type: formData.sub_sub_project_type,
      investment_options: formData.investment_options,
      quality_rating: formData.quality_rating,
      commercial_washroom: formData.commercial_washroom,
      connect_to_name: user_name,
      connect_to_no: Mobile_Number,
      connect_to_email: user_email,
      project_name: projectName,
      mark_as_featured: isFeatured ? "Yes" : "No",
      building_type: buildingType,
      //project_type: propertyType,
      address: address,
      city_name: city,
      state: state,
      country: country,
      zip_code: zipCode,
      latitude: latitude,
      longitude: longitude,
      total_project_size: totalProjectSize,
      congfigurations: configurations,
      launch_date: launchDate,
      possession_start: possessionStart,
      construction_status: constructionStatus,
      rera_id: reraId,
      floor_living_dining: floorLivingDining,
      floor_kitchen_toilet: floorKitchenToilet,
      floor_bedroom: floorBedroom,
      floor_balcony: floorBalcony,
      walls_living_dining: wallsLivingDining,
      walls_kitchen_toilet: wallsKitchenToilet,
      walls_servant_room: wallsServantRoom,
      ceiling: ceiling,
      ceilings_servant_room: ceilingsServantRoom,
      counters_kitchen_toilet: countersKitchenToilet,
      fittings_fixtures_kitchen_toilet: fittingsKitchenToilet,
      fittings_fixtures_servant_room_toilet: fittingsServantRoomToilet,
      door_window_internal_door: internalDoor,
      door_window_external_glazing: externalGlazing,
      electrical: electrical,
      backup: backup,
      security_system: securitySystem,
      virtual_tour_availability: virtualTourLink ? "Yes" : "No",
      project_description: description,
      amenities: selectedAmenities,
      video_url: videoUrl,
      video_url_type: videoSource,
      land_type: formData.land_type,
      selectedConstructionOnLand: formData.selectedConstructionOnLand,
      openSidesOfLand: formData.openSidesOfLand,
      length_of_land: formData.length_of_land,
      breadthOfLand: formData.breadthOfLand,
      //no_of_open_sides: formData.no_of_open_sides,
      type_of_construction: formData.type_of_construction,
      furnished_type: formData.furnished_type,
      total_beds: formData.total_beds,
      office_type: formData.office_type,
      //parking_types: formData.parking_types,
      //purchase_type: formData.purchase_type,
      average_project_price: formData.average_project_price,
      bhk_type: formData.bhk_type,
      area: 1,
      area_in: formData.area_in,
      carpet_area: formData.carpet_area,
      carpet_area_in: formData.carpet_area_in,
      bathroom: formData.bathroom,
      all_inclusive_price: formData.all_inclusive_price,
      price_negotiable: formData.price_negotiable,
      tax_and_goverment_charges: formData.tax_and_goverment_charges,
      //number_of_seats_available: formData.number_of_seats_available,

      personal_washroom: formData.personal_washroom,
      lift_availability: formData.lift_availability,
      property_dimensions_breadth: formData.property_dimensions_breadth,
      property_dimensions_length: formData.property_dimensions_length,
      central_AC: formData.central_AC,
      total_number_parking: formData.total_number_parking,
      possession_date: formData.possession_date,
      age_of_property: formData.age_of_property,
      room_type: formData.room_type,
      no_of_peoples: formData.no_of_peoples,
      available_beds: formData.available_beds,
      covered_parking: formData.covered_parking,
      uncovered_parking: formData.uncovered_parking,
      attached_bathroom: formData.attached_bathroom,
      attached_balcony: formData.attached_balcony,
      available_for: formData.available_for,
      pantry_option: formData.pantry_option,
      no_of_cabines: formData.no_of_cabines,
      no_of_meeting_Rooms: formData.no_of_meeting_Rooms,
      no_of_conference_room: formData.no_of_conference_room,
      builder_floor_type: formData.builder_floor_type,
      possession_status: formData.possession_status,
      possession_by: formData.possession_by,
      total_number_of_rooms: formData.total_number_of_rooms,
      reception_area: formData.reception_area,
      balcony: formData.balcony,
    };

    Object.entries(projectData).forEach(([key, value]) => {
      apiFormData.append(key, value ?? "");
    });

    if (coverImage instanceof File) {
      apiFormData.append("cover_image", coverImage);
    }
    if (videoFile) {
      apiFormData.append("property_video", videoFile);
    }
    if (virtualTourLink) {
      apiFormData.append("virtual_tour_availability", virtualTourLink);
    }
    if (brochureDoc instanceof File) {
      apiFormData.append("brochure_doc", brochureDoc);
    }
    if (companyLogo instanceof File) {
      apiFormData.append("logo", companyLogo);
    }
    if (addressArea) {
      apiFormData.append("address_area", addressArea);
    }

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/cust_api/post_project`,
        {
          method: "POST",
          body: apiFormData,
        },
      );

      const result = await res.json();

      if (result.status === "1") {
        const projectId = result.data._id;

        // ✅ NEW: Upload gallery images
        if (fileData && fileData.length > 0) {
          const imagesFormData = new FormData();
          imagesFormData.append("project_id", projectId);
          fileData.forEach((file) => {
            imagesFormData.append("project_image", file); // matches request.FILES.getlist('project_image')
          });

          const imagesRes = await fetch(
            `${process.env.REACT_APP_API_URL}/cust_api/add_project_images`, // apna actual URL path lagao
            {
              method: "POST",
              body: imagesFormData,
            },
          );

          const imagesResult = await imagesRes.json();

          if (imagesResult?.error) {
            toast.error(imagesResult.error);
          }
        }

        for (const property of projectProperties) {
          const projectPropertyFormData = new FormData();

          projectPropertyFormData.append("project_id", projectId);
          projectPropertyFormData.append(
            "price",
            property.price ?? ""
          );

          Object.entries(property).forEach(([key, value]) => {
            if (key !== "price") {
              projectPropertyFormData.append(key, value ?? "");
            }
          });


          const propertyRes = await fetch(
            `${process.env.REACT_APP_API_URL}/cust_api/add_project_property`,
            {
              method: "POST",
              body: projectPropertyFormData,
            }
          );

          await propertyRes.json();
        }




        toast.success("Project Data Uploaded successfully.");

        history.push({
          pathname: "/dashboard",
          state: { page: "myProjects" },
        });
      } else {
        toast.error(result.msg || "Failed to upload project.");
      }

    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePlaceChanged = () => {
    const place = autoCompleteRef.current.getPlace();
    if (!place.geometry || !place.address_components) return;

    const location = place.geometry.location;
    setMapCenter({
      lat: location.lat(),
      lng: location.lng(),
    });

    setLatitude(location.lat().toString()); // Set latitude
    setLongitude(location.lng().toString());

    setAddress(place.formatted_address || "");

    let extractedCountry = "";
    let extractedState = "";
    let extractedCity = "";
    let extractedZip = "";
    let extractedArea = "";

    place.address_components.forEach((component) => {
      const types = component.types;

      if (types.includes("country")) {
        extractedCountry = component.short_name; // Use "IN", "US", etc.
      }

      if (types.includes("administrative_area_level_1")) {
        extractedState = component.long_name; // Like "Maharashtra"
      }

      if (types.includes("locality")) {
        extractedCity = component.long_name;
      }

      if (types.includes("postal_code")) {
        extractedZip = component.long_name;
      }

      if (
        types.includes("sublocality") ||
        types.includes("sublocality_level_1") ||
        types.includes("neighborhood")
      ) {
        extractedArea = component.long_name; // Extract area (e.g., neighborhood or sublocality)
      }
    });

    // Set address fields
    setCity(extractedCity);
    setZipCode(extractedZip);

    const addressArea =
      extractedArea && extractedCity
        ? `${extractedArea}, ${extractedCity}`
        : extractedCity || extractedArea || "";
    setAddressArea(addressArea);

    // Match the country from allCountries by ISO code
    const matchedCountry = allCountries.find(
      (c) => c.isoCode === extractedCountry,
    );
    if (matchedCountry) {
      setCountry(matchedCountry.isoCode);

      // Now set matching state
      const states = State.getStatesOfCountry(matchedCountry.isoCode);
      setAllStates(states);

      const matchedState = states.find(
        (s) => s.name.toLowerCase() === extractedState.toLowerCase(),
      );
      if (matchedState) {
        setState(matchedState.name);
      } else {
        setState("");
      }
    } else {
      setCountry("");
      setState("");
    }
  };

  useEffect(() => {
    if (showUpcomingProjectCount) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showUpcomingProjectCount]);

  const validateStepFields = () => {
    const newErrors = {};

    if (activeStep === 0) {
      if (!projectName.trim()) {
        newErrors.projectName = "Project name is required.";
      }
    }

    if (activeStep === 1) {
      if (!address?.trim()) {
        newErrors.address = "Address is required";
      }
      if (!city?.trim()) {
        newErrors.city = "City is required";
      }
      if (!country?.trim()) {
        newErrors.country = "Country is required";
      }
      if (!state?.trim()) {
        newErrors.state = "State is required";
      }
      if (!zipCode?.trim()) {
        newErrors.zipCode = "Zip code is required";
      }
    }

    if (activeStep === 2) {
      projectProperties.forEach((property, index) => {
        if (!property.price) {
          newErrors[`price_${index}`] = "Price is required";
        }

        if (buildingType !== "Commercial" && property.project_type !== "Plot/Land") {
          if (!property.bhk_type) {
            newErrors[`bhk_type_${index}`] = "BHK is required";
          }
        }

        if (!property.carpet_area) {
          newErrors[`carpet_area_${index}`] = "Carpet area is required";
        }

        if (!property.carpet_area_in) {
          newErrors[`carpet_area_in_${index}`] = "Carpet area unit is required";
        }

        if (!property.area) {
          newErrors[`area_${index}`] = "Built-up area is required";
        }

        if (!property.area_in) {
          newErrors[`area_in_${index}`] = "Built-up area unit is required";
        }

        // if (!property.possession_status) {
        //   newErrors[`possession_status_${index}`] =
        //     "Construction Status is required";
        // }

        // if (
        //   property.possession_status === "Under Construction" &&
        //   !property.possession_date
        // ) {
        //   newErrors[`possession_date_${index}`] =
        //     "Possession Date is required";
        // }
      });
    }

    if (activeStep === 3) {
      if (selectedAmenities.length === 0) {
        newErrors.amenities = "At least one amenity must be selected.";
      } else {
        delete newErrors.amenities;
      }
    }

    if (activeStep === 4) {
      if (!coverImage) {
        newErrors.coverImage = "Please upload a cover image";
      } else {
        delete newErrors.coverImage;
      }

      if (!companyLogo) {
        newErrors.companyLogo = "Please upload a company logo";
      } else {
        delete newErrors.companyLogo;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-3 bg-[#FFF7F9]">
        <span className="w-12 h-12 border-4 rounded-full border-[#FDE8EC] border-t-[#D61F45] animate-spin" />
        <p className="m-0 text-[15px] font-medium text-gray-600">Loading Maps...</p>
      </div>
    );
  }
  const toWords = new ToWords({
    localeCode: "en-IN",
  });
  return (
    <>
      <div className="ag-add relative min-h-screen overflow-x-hidden bg-white">
        {/* Brand colour for every checkbox on this page */}
        <style>{`
          .ag-add input[type="checkbox"] { accent-color: ${BRAND}; width: 18px; height: 18px; }
        `}</style>

        {/* soft dotted corners like the reference */}
        <div
          aria-hidden="true"
          className="absolute left-0 hidden w-24 h-48 pointer-events-none top-[420px] md:block opacity-40"
          style={{ backgroundImage: "radial-gradient(#F3A8B8 1.5px, transparent 1.5px)", backgroundSize: "14px 14px" }}
        />
        <div
          aria-hidden="true"
          className="absolute right-0 hidden w-24 h-48 pointer-events-none top-[560px] md:block opacity-40"
          style={{ backgroundImage: "radial-gradient(#F3A8B8 1.5px, transparent 1.5px)", backgroundSize: "14px 14px" }}
        />

        {/* ==================================================
            Hero title — "Add New Project"
        ================================================== */}
        <div className="relative px-4 pt-8 pb-8 overflow-hidden text-center md:pt-10 md:pb-16 bg-gradient-to-b from-[#FDE8EC] via-[#FFF4F6] to-white">
          <Skyline className="left-4 lg:left-10" />
          <Skyline className="right-4 lg:right-10 flex-row-reverse" />
          <h1 className="relative m-0 text-[28px] font-extrabold leading-tight md:text-[40px] text-[#17253a]">
            Add New <span className="text-[#D61F45]">Project</span>
          </h1>
          <p className="relative max-w-xl mx-auto mt-2 mb-0 text-[14px] md:text-[17px] text-gray-500">
            List your project and reach the right buyers, tenants and investors.
          </p>
        </div>

        {/* ==================================================
            Stepper — pill for current step, red ✓ for done steps
        ================================================== */}
        <div className="relative w-full px-3 mx-auto mt-4 max-w-6xl md:px-6">
          <ol className="flex items-center justify-start gap-0.5 p-0 pb-2 m-0 overflow-x-auto list-none md:justify-center md:gap-0 [scrollbar-width:none]">
            {steps.map((step, index) => {
              const isActive = index === activeStep;
              const isDone = completedSteps.includes(index) && !isActive;
              const clickable = completedSteps.includes(index) || isActive;
              const lineRed = index < activeStep || completedSteps.includes(index);

              return (
                <li key={index} className="flex items-center flex-shrink-0">
                  <button
                    type="button"
                    disabled={!clickable}
                    onClick={() => clickable && setActiveStep(index)}
                    aria-current={isActive ? "step" : undefined}
                    className={`flex items-center gap-2 sm:gap-2.5 p-1 sm:py-1.5 sm:pl-1.5 ${isActive ? "pr-4" : "sm:pr-4"} rounded-full transition-colors ${isActive
                      ? "bg-[#FDE8EC]"
                      : clickable
                        ? "hover:bg-[#FFF1F4] cursor-pointer"
                        : "cursor-not-allowed"
                      }`}
                  >
                    <span
                      className={`flex items-center justify-center w-9 h-9 text-[14px] font-bold rounded-full ${isActive
                        ? "bg-[#D61F45] text-white shadow-[0_4px_12px_rgba(214,31,69,0.4)]"
                        : isDone
                          ? "bg-[#D61F45] text-white"
                          : "bg-[#FFF7F9] text-gray-600 text-[#17253a] border border-gray-200"
                        }`}
                    >
                      {isDone ? <Check size={16} weight="bold" /> : index + 1}
                    </span>
                    <span
                      className={`whitespace-nowrap text-[13px] md:text-[15px] ${isActive
                        ? "font-semibold text-[#D61F45]"
                        : isDone
                          ? "font-semibold text-[#17253a]"
                          : "font-medium text-gray-500"
                        } ${isActive ? "" : "hidden sm:inline"}`}
                    >
                      {step}
                    </span>
                  </button>

                  {/* connector to the next step */}
                  {index < steps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className={`block w-3 sm:w-8 lg:w-12 h-[2px] mx-0.5 sm:mx-1 rounded-full ${lineRed ? "bg-[#D61F45]" : "bg-gray-200"}`}
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </div>

        {/* Form Card */}
        <div className="relative w-full px-3 pt-6 pb-36 mx-auto max-w-6xl md:px-6">
          {/* Render Step Content */}
          {activeStep === 0 && (
            <>
              <div className={`${sectionCard} max-w-4xl mx-auto`}>
                <SectionHeader
                  icon={FileText}
                  title="Basic Details"
                  subtitle="Provide the basic information about your project."
                />

                {/* Property Name */}
                <div className="mb-4">
                  <label className="block mb-2 text-[14px] font-semibold text-[#17253a]">
                    Project Name{" "}
                    <span className="text-[#D61F45]">*</span>
                  </label>
                  <div className="relative">
                    <Buildings
                      size={22}
                      weight="duotone"
                      className="absolute -translate-y-1/2 pointer-events-none left-4 top-1/2 text-[#D61F45]"
                    />
                    <input
                      type="text"
                      placeholder="Enter Project Name"
                      value={projectName}
                      onChange={(e) => {
                        const value = e.target.value;
                        const alphaNumericOnly = value.replace(
                          /[^a-zA-Z0-9 ]/g,
                          "",
                        );
                        setProjectName(alphaNumericOnly);
                      }}
                      className={`w-full py-3.5 pl-12 pr-4 text-[15px] text-[#17253a] bg-white rounded-xl outline-none transition focus:ring-4 focus:ring-[#FDE8EC] focus:border-[#D61F45] ${errors.projectName
                        ? "border border-[#D61F45]"
                        : "border border-gray-200"
                        }`}
                    />
                  </div>
                  {errors.projectName && (
                    <p className="flex items-center gap-1 mt-1 text-[12px] font-medium text-[#D61F45]">
                      <MdErrorOutline className="text-lg" />
                      {errors.projectName}
                    </p>
                  )}
                </div>

                {/* Featured Checkbox */}
                <div className="flex items-center gap-2.5 mt-6 mb-7">
                  <input
                    type="checkbox"
                    id="featured"
                    className="m-0 cursor-pointer"
                    checked={isFeatured}
                    onChange={(e) => {
                      if (e.target.checked && featureCount === 0) {
                        setShowFeaturePopup(true);
                      } else {
                        setIsFeatured(e.target.checked);
                      }
                    }}
                  />
                  <label
                    htmlFor="featured"
                    className="text-[15px] leading-snug text-gray-600 cursor-pointer"
                  >
                    Showcase Your Project in the Top Projects{" "}
                    <IoIosInformationCircle className="inline-block ml-1 text-[22px] align-[-5px] text-amber-400" />
                  </label>
                </div>

                {/* Building Type */}
                <div className="mb-4">
                  <label className="block mb-3 text-[17px] font-bold text-[#17253a]">
                    Building Type
                  </label>

                  <div className="flex flex-wrap gap-3">
                    {["Residential", "Commercial"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          setBuildingType(type); // change type
                          setPropertyType(""); // reset property type

                          //  IMPORTANT: reset only extra fields (not all)
                          setFormData((prev) => ({
                            ...prev,
                            bhk_type: "",
                          }));
                        }}
                        className={`px-7 py-2.5 text-[15px] rounded-full border transition ${buildingType === type
                          ? "bg-[#FDE8EC] text-[#D61F45] border-[#FDE8EC] font-semibold"
                          : "bg-white border-gray-200 text-[#17253a] font-medium hover:border-[#D61F45] hover:text-[#D61F45]"
                          }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* {buildingType === "Commercial" && (
  <div className="col-span-2">
    <label className="block mb-2 text-[14px] font-semibold text-[#17253a]">
      Office Type
    </label>

    <select
      value={formData?.office_type || ""}
      onChange={(e) =>
        handleInputChange("office_type", e.target.value)
      }
      className="w-full p-2 border rounded text-[14px] text-[#17253a] outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] bg-white border-gray-200"
    >
      <option value="">Select Office Type</option>
      <option value="Ready">Ready</option>
      <option value="Bare Shell">Bare Shell</option>
    </select>
  </div>
)} */}

                {/* Property Type */}
                {/* <div className="mb-4">
                  <label className="block mb-2 text-[14px] font-semibold text-[#17253a]">
                    Project Type{" "}
                    <span className="text-[#D61F45]">*</span>
                  </label>
                  <div className="flex flex-wrap gap-1">
                    <div className="flex flex-wrap gap-1">
                      {(buildingType === "Residential"
                        ? residentialTypes
                        : commercialTypes
                      ).map((type) => (
                        <button
                          key={type}
                          onClick={() => setPropertyType(type)}
                          className={`px-4 py-2 text-[13px] font-medium rounded-full border transition ${
                            propertyType === type
                              ? "bg-[#FDE8EC] text-[#D61F45] border-[#D61F45] font-semibold"
                              : "bg-white border-gray-200 text-gray-600 hover:border-[#D61F45] hover:text-[#D61F45]"
                          }`}
                        >
                          {type === "Plot/Land" ? "Land" : type}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                {propertyType === "Hospitality" && (
                  <div className="mt-4">
                    <label className="block mb-2 text-[14px] font-semibold text-[#17253a]">
                      What kind of hospitality?
                    </label>

                    <div className="flex flex-wrap gap-2">
                      {hospitalityOptions.map((type) => (
                        <button
                          key={type}
                          type="button"
                          className={`px-4 py-2 text-[13px] font-medium rounded-full border transition transition ${
                            hospitalityType === type
                              ? "bg-[#FDE8EC] text-[#D61F45] border-[#D61F45] font-semibold"
                              : "bg-white border-gray-200 text-gray-600 hover:border-[#D61F45] hover:text-[#D61F45]"
                          }`}
                          onClick={() => {
                            setHospitalityType(type);

                            setFormData((prev) => ({
                              ...prev,
                              office_type: type,
                            }));
                          }}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {propertyType === "Plot/Land" && (
                  <div className="mt-4">
                    <label className="block mb-2 text-[14px] font-semibold text-[#17253a]">
                      What kind of land?
                    </label>

                    <div className="flex flex-wrap gap-2">
                      {landOptions.map((type) => (
                        <button
                          key={type}
                          type="button"
                          className={`px-4 py-2 text-[13px] font-medium rounded-full border transition transition ${
                            landType === type
                              ? "bg-[#FDE8EC] text-[#D61F45] border-[#D61F45] font-semibold"
                              : "bg-white border-gray-200 text-gray-600 hover:border-[#D61F45] hover:text-[#D61F45]"
                          }`}
                          onClick={() => {
                            setLandType(type);

                            setFormData((prev) => ({
                              ...prev,
                              office_type: type,
                            }));
                          }}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {propertyType === "Industry" && (
                  <div className="mt-4">
                    <label className="block mb-2 text-[14px] font-semibold text-[#17253a]">
                      What kind of industry?
                    </label>

                    <div className="flex flex-wrap gap-2">
                      {industryOptions.map((type) => (
                        <button
                          key={type}
                          type="button"
                          className={`px-4 py-2 text-[13px] font-medium rounded-full border transition transition ${
                            industryType === type
                              ? "bg-[#FDE8EC] text-[#D61F45] border-[#D61F45] font-semibold"
                              : "bg-white border-gray-200 text-gray-600 hover:border-[#D61F45] hover:text-[#D61F45]"
                          }`}
                          onClick={() => {
                            setIndustryType(type);

                            setFormData((prev) => ({
                              ...prev,
                              office_type: type,
                            }));
                          }}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {propertyType === "Storage" && (
                  <div className="mt-4">
                    <label className="block mb-2 text-[14px] font-semibold text-[#17253a]">
                      What kind of storage?
                    </label>

                    <div className="flex flex-wrap gap-2">
                      {storageOptions.map((type) => (
                        <button
                          key={type}
                          type="button"
                          className={`px-4 py-2 text-[13px] font-medium rounded-full border transition transition ${
                            storageType === type
                              ? "bg-[#FDE8EC] text-[#D61F45] border-[#D61F45] font-semibold"
                              : "bg-white border-gray-200 text-gray-600 hover:border-[#D61F45] hover:text-[#D61F45]"
                          }`}
                          onClick={() => {
                            setStorageType(type);

                            setFormData((prev) => ({
                              ...prev,
                              office_type: type,
                            }));
                          }}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {propertyType === "Office" && (
                  <div className="mt-4">
                    <label className="block mb-2 text-[14px] font-semibold text-[#17253a]">
                      What kind of office?
                    </label>

                    <div className="flex flex-wrap gap-2">
                      {officeOptions.map((type) => (
                        <button
                          key={type}
                          type="button"
                          className={`px-4 py-2 text-[13px] font-medium rounded-full border transition transition ${
                            officeSubType === type
                              ? "bg-[#FDE8EC] text-[#D61F45] border-[#D61F45] font-semibold"
                              : "bg-white border-gray-200 text-gray-600 hover:border-[#D61F45] hover:text-[#D61F45]"
                          }`}
                          onClick={() => {
                            setOfficeSubType(type);

                            setFormData((prev) => ({
                              ...prev,
                              office_type: type,
                            }));
                          }}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {propertyType === "Retail" && (
                  <div className="mt-4">
                    <label className="block mb-2 text-[14px] font-semibold text-[#17253a]">
                      What kind of retail?
                    </label>

                    <div className="flex flex-wrap gap-2">
                      {retailOptions.map((type) => (
                        <button
                          key={type}
                          type="button"
                          className={`px-4 py-2 text-[13px] font-medium rounded-full border transition transition ${
                            RetailSubType === type
                              ? "bg-[#FDE8EC] text-[#D61F45] border-[#D61F45] font-semibold"
                              : "bg-white border-gray-200 text-gray-600 hover:border-[#D61F45] hover:text-[#D61F45]"
                          }`}
                          onClick={() => {
                            setRetailSubType(type);
                            setFormData((prev) => ({
                              ...prev,
                              office_type: type,
                            }));
                          }}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {propertyType === "Retail" && RetailSubType && (
                  <div className="mt-4">
                    <label className="block mb-2 text-[14px] font-semibold text-[#17253a]">
                      Your Retail located inside?
                    </label>

                    <div className="flex flex-wrap gap-2">
                      {retailLocationOptions.map((type) => (
                        <button
                          key={type}
                          type="button"
                          className={`px-4 py-2 text-[13px] font-medium rounded-full border transition transition ${
                            retailLocation === type
                              ? "bg-[#FDE8EC] text-[#D61F45] border-[#D61F45] font-semibold"
                              : "bg-white border-gray-200 text-gray-600 hover:border-[#D61F45] hover:text-[#D61F45]"
                          }`}
                          onClick={() => {
                            setRetailLocation(type);
                            setFormData((prev) => ({
                              ...prev,
                              sub_sub_project_type: type,
                            }));
                          }}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                )} */}
              </div>
            </>
          )}

          {activeStep === 1 && (
            <>
              <div className={`${sectionCard} max-w-4xl mx-auto`}>
                <SectionHeader
                  icon={MapPin}
                  title="Project Address"
                  subtitle="Place the listing pin on the map"
                />
                <div className="grid grid-cols-1 gap-6">
                  {/* <div className="w-full overflow-hidden bg-gray-200 rounded-xl h-80">
                             <LoadScript
                               googleMapsApiKey={GOOGLE_MAPS_API_KEY}
                               libraries={["places"]}
                             >
                               <GoogleMap
                                 mapContainerStyle={{ width: "100%", height: "100%" }}
                                 center={mapCenter}
                                 zoom={14}
                               >
                                 <Marker position={mapCenter} />
                               </GoogleMap>
                             </LoadScript>
                           </div> */}

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="text-[14px] font-semibold text-[#17253a]">
                        Address{" "}
                        <span className="text-[#D61F45]">
                          *
                        </span>
                      </label>
                      {isLoaded ? (
                        <Autocomplete
                          onLoad={(ac) => (autoCompleteRef.current = ac)}
                          onPlaceChanged={handlePlaceChanged}
                        >
                          <input
                            type="text"
                            value={address}
                            onChange={(e) => {
                              const value = e.target.value;
                              const isValid = /^[a-zA-Z0-9\s]*$/.test(value);
                              if (isValid) {
                                setAddress(value);
                              }
                            }}
                            className={`w-full px-3.5 py-3 text-[14px] text-[#17253a] bg-white border rounded-xl focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] outline-none ${errors.address
                              ? "border-[#D61F45]"
                              : "border-gray-200"
                              }`}
                          />
                        </Autocomplete>
                      ) : (
                        <input
                          type="text"
                          disabled
                          placeholder="Loading Google Maps..."
                          className={`w-full px-3.5 py-3 text-[14px] text-[#17253a] bg-white border rounded-xl border-gray-200`}
                        />
                      )}

                      {errors.address && (
                        <p className="flex items-center gap-1 mt-1 text-[12px] font-medium text-[#D61F45]">
                          <MdErrorOutline className="text-lg" />
                          {errors.address}
                        </p>
                      )}
                    </div>

                    {/* Country Dropdown */}
                    <div>
                      <label className="text-[14px] font-semibold text-[#17253a]">
                        Country{" "}
                        <span className="text-[#D61F45]">
                          *
                        </span>
                      </label>
                      <select
                        value={country}
                        onChange={(e) => {
                          setCountry(e.target.value);
                          setState("");
                        }}
                        className={`w-full px-3.5 py-3 text-[14px] text-[#17253a] bg-white border rounded-xl focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] outline-none ${errors.country
                          ? "border-[#D61F45]"
                          : "border-gray-200"
                          }`}
                      >
                        <option value="">Select Country</option>
                        {allCountries.map((c) => (
                          <option key={c.isoCode} value={c.isoCode}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                      {errors.country && (
                        <p className="flex items-center gap-1 mt-1 text-[12px] font-medium text-[#D61F45]">
                          <MdErrorOutline className="text-lg" />
                          {errors.country}
                        </p>
                      )}
                    </div>

                    {/* State Dropdown */}
                    <div>
                      <label className="text-[14px] font-semibold text-[#17253a]">
                        State{" "}
                        <span className="text-[#D61F45]">
                          *
                        </span>
                      </label>
                      <select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className={`w-full px-3.5 py-3 text-[14px] text-[#17253a] bg-white border rounded-xl focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] outline-none ${errors.state
                          ? "border-[#D61F45]"
                          : "border-gray-200"
                          }`}
                      >
                        <option value="">Select State</option>
                        {allStates.map((s) => (
                          <option key={s.isoCode} value={s.name}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                      {errors.state && (
                        <p className="flex items-center gap-1 mt-1 text-[12px] font-medium text-[#D61F45]">
                          <MdErrorOutline className="text-lg" />
                          {errors.state}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-[14px] font-semibold text-[#17253a]">
                        City{" "}
                        <span className="text-[#D61F45]">
                          *
                        </span>
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => {
                          const value = e.target.value;
                          const isValid = /^[a-zA-Z0-9\s]*$/.test(value);
                          if (isValid) {
                            setCity(value);
                          }
                        }}
                        placeholder="Enter City"
                        className={`w-full px-3.5 py-3 text-[14px] text-[#17253a] bg-white border rounded-xl focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] outline-none ${errors.city ? "border-[#D61F45]" : "border-gray-200"
                          }`}
                      />
                      {errors.city && (
                        <p className="flex items-center gap-1 mt-1 text-[12px] font-medium text-[#D61F45]">
                          <MdErrorOutline className="text-lg" />
                          {errors.city}
                        </p>
                      )}
                    </div>
                    {/* Locality */}
                    {/* <div>
                      <label className="text-[14px] font-semibold text-[#17253a]">
                        Locality{" "}
                        <span className="invisible text-xl font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        value={locality}
                        onChange={(e) => setLocality(e.target.value)}
                        placeholder="Enter Locality"
                        className="w-full border rounded-xl px-3.5 py-3 focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] outline-none border-gray-200 text-[14px] text-[#17253a] bg-white"
                      />
                    </div> */}

                    {/* Sub Locality */}
                    {/* <div>
                      <label className="text-[14px] font-semibold text-[#17253a]">
                        Sub Locality{" "}
                        <span className="invisible text-xl font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        value={subLocality}
                        onChange={(e) => setSubLocality(e.target.value)}
                        placeholder="Enter Sub Locality"
                        className="w-full border rounded-xl px-3.5 py-3 focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] outline-none border-gray-200 text-[14px] text-[#17253a] bg-white"
                      />
                    </div> */}
                    {/* Zip Code */}
                    <div>
                      <label className="text-[14px] font-semibold text-[#17253a]">
                        Zip <span className="text-[#D61F45]">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Zip Code"
                        value={zipCode}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d{0,10}$/.test(value)) {
                            setZipCode(value);
                          }
                        }}
                        className={`w-full px-3.5 py-3 text-[14px] text-[#17253a] bg-white border rounded-xl focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] outline-none ${errors.zipCode
                          ? "border-[#D61F45]"
                          : "border-gray-200"
                          }`}
                      />
                      {errors.zipCode && (
                        <p className="flex items-center gap-1 mt-1 text-[12px] font-medium text-[#D61F45]">
                          <MdErrorOutline className="text-lg" />
                          {errors.zipCode}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeStep === 2 && (
            <>
              <div className={sectionCard}>
                <SectionHeader
                  icon={Buildings}
                  title="Project Details"
                  subtitle="Enter and manage essential information related to your project Properties."
                />
                {projectProperties.map((projectProperty, index) => (
                  <div
                    key={index}
                    className="mb-5 overflow-hidden bg-white border border-[#FAD3DB] rounded-2xl"
                  >
                    <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-[#FDE8EC] bg-gradient-to-r from-[#FFF1F4] to-[#FFF7F9]">
                      <h3 className="flex items-center gap-2 m-0 text-[16px] font-bold text-[#17253a]">
                        <span className="flex items-center justify-center text-[13px] text-white rounded-full w-7 h-7 bg-[#D61F45]">
                          {index + 1}
                        </span>
                        Property {index + 1}
                      </h3>

                      {projectProperties.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleDeleteProjectProperty(index)}
                          className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold text-[#D61F45] bg-white border border-[#FAD3DB] rounded-xl hover:bg-[#D61F45] hover:text-white transition-colors"
                        >
                          <Trash size={15} weight="bold" />
                          Delete
                        </button>
                      )}
                    </div>
                    <div className="grid items-start grid-cols-1 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                      <div className="col-span-full">
                        <div className="mb-4">
                          <label className="block mb-2 text-[14px] font-semibold text-[#17253a]">
                            Project Type{" "}
                            <span className="text-[#D61F45]">*</span>
                          </label>
                          <div className="flex flex-wrap gap-1">
                            <div className="flex flex-wrap gap-1">
                              {(buildingType === "Residential"
                                ? residentialTypes
                                : commercialTypes
                              ).map((type) => (
                                <button
                                  key={type}
                                  type="button"
                                  onClick={() =>
                                    handleProjectPropertyChange(index, "project_type", type)
                                  }
                                  className={`px-4 py-2 text-[13px] font-medium rounded-full border transition ${projectProperty.project_type === type
                                    ? "bg-[#FDE8EC] text-[#D61F45] border-[#D61F45] font-semibold"
                                    : "bg-white border-gray-200 text-gray-600 hover:border-[#D61F45] hover:text-[#D61F45]"
                                    }`}
                                >
                                  {type === "Plot/Land" ? "Land" : type}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                        {projectProperty.project_type === "Hospitality" && (
                          <div className="mt-4">
                            <label className="block mb-2 text-[14px] font-semibold text-[#17253a]">
                              What kind of hospitality?
                            </label>

                            <div className="flex flex-wrap gap-2">
                              {hospitalityOptions.map((type) => (
                                <button
                                  key={type}
                                  type="button"
                                  className={`px-4 py-2 text-[13px] font-medium rounded-full border transition transition ${projectProperty.sub_project_type === type
                                    ? "bg-[#FDE8EC] text-[#D61F45] border-[#D61F45] font-semibold"
                                    : "bg-white border-gray-200 text-gray-600 hover:border-[#D61F45] hover:text-[#D61F45]"
                                    }`}
                                  onClick={() => {
                                    handleProjectPropertyChange(index, "sub_project_type", type);
                                  }}
                                >
                                  {type}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                        {projectProperty.project_type === "Plot/Land" && (
                          <div className="mt-4">
                            <label className="block mb-2 text-[14px] font-semibold text-[#17253a]">
                              What kind of land?
                            </label>

                            <div className="flex flex-wrap gap-2">
                              {landOptions.map((type) => (
                                <button
                                  key={type}
                                  type="button"
                                  className={`px-4 py-2 text-[13px] font-medium rounded-full border transition transition ${projectProperty.sub_project_type === type
                                    ? "bg-[#FDE8EC] text-[#D61F45] border-[#D61F45] font-semibold"
                                    : "bg-white border-gray-200 text-gray-600 hover:border-[#D61F45] hover:text-[#D61F45]"
                                    }`}
                                  onClick={() => {
                                    handleProjectPropertyChange(index, "sub_project_type", type);
                                  }}
                                >
                                  {type}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                        {projectProperty.project_type === "Industry" && (
                          <div className="mt-4">
                            <label className="block mb-2 text-[14px] font-semibold text-[#17253a]">
                              What kind of industry?
                            </label>

                            <div className="flex flex-wrap gap-2">
                              {industryOptions.map((type) => (
                                <button
                                  key={type}
                                  type="button"
                                  className={`px-4 py-2 text-[13px] font-medium rounded-full border transition transition ${projectProperty.sub_project_type === type
                                    ? "bg-[#FDE8EC] text-[#D61F45] border-[#D61F45] font-semibold"
                                    : "bg-white border-gray-200 text-gray-600 hover:border-[#D61F45] hover:text-[#D61F45]"
                                    }`}
                                  onClick={() => {
                                    handleProjectPropertyChange(index, "sub_project_type", type);
                                  }}
                                >
                                  {type}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                        {projectProperty.project_type === "Storage" && (
                          <div className="mt-4">
                            <label className="block mb-2 text-[14px] font-semibold text-[#17253a]">
                              What kind of storage?
                            </label>

                            <div className="flex flex-wrap gap-2">
                              {storageOptions.map((type) => (
                                <button
                                  key={type}
                                  type="button"
                                  className={`px-4 py-2 text-[13px] font-medium rounded-full border transition transition ${projectProperty.sub_project_type === type
                                    ? "bg-[#FDE8EC] text-[#D61F45] border-[#D61F45] font-semibold"
                                    : "bg-white border-gray-200 text-gray-600 hover:border-[#D61F45] hover:text-[#D61F45]"
                                    }`}
                                  onClick={() => {
                                    handleProjectPropertyChange(index, "sub_project_type", type);
                                  }}
                                >
                                  {type}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                        {projectProperty.project_type === "Office" && (
                          <div className="mt-4">
                            <label className="block mb-2 text-[14px] font-semibold text-[#17253a]">
                              What kind of office?
                            </label>

                            <div className="flex flex-wrap gap-2">
                              {officeOptions.map((type) => (
                                <button
                                  key={type}
                                  type="button"
                                  className={`px-4 py-2 text-[13px] font-medium rounded-full border transition transition ${projectProperty.sub_project_type === type
                                    ? "bg-[#FDE8EC] text-[#D61F45] border-[#D61F45] font-semibold"
                                    : "bg-white border-gray-200 text-gray-600 hover:border-[#D61F45] hover:text-[#D61F45]"
                                    }`}
                                  onClick={() => {
                                    handleProjectPropertyChange(index, "sub_project_type", type);
                                  }}
                                >
                                  {type}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                        {projectProperty.project_type === "Retail" && (
                          <div className="mt-4">
                            <label className="block mb-2 text-[14px] font-semibold text-[#17253a]">
                              What kind of retail?
                            </label>

                            <div className="flex flex-wrap gap-2">
                              {retailOptions.map((type) => (
                                <button
                                  key={type}
                                  type="button"
                                  className={`px-4 py-2 text-[13px] font-medium rounded-full border transition transition ${projectProperty.sub_project_type === type
                                    ? "bg-[#FDE8EC] text-[#D61F45] border-[#D61F45] font-semibold"
                                    : "bg-white border-gray-200 text-gray-600 hover:border-[#D61F45] hover:text-[#D61F45]"
                                    }`}
                                  onClick={() => {
                                    handleProjectPropertyChange(index, "sub_project_type", type);
                                  }}
                                >
                                  {type}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                        {projectProperty.project_type === "Retail" &&
                          projectProperty.sub_project_type && (
                            <div className="mt-4">
                              <label className="block mb-2 text-[14px] font-semibold text-[#17253a]">
                                Your Retail located inside?
                              </label>

                              <div className="flex flex-wrap gap-2">
                                {retailLocationOptions.map((type) => (
                                  <button
                                    key={type}
                                    type="button"
                                    className={`px-4 py-2 text-[13px] font-medium rounded-full border transition transition ${projectProperty.retail_location === type
                                      ? "bg-[#FDE8EC] text-[#D61F45] border-[#D61F45] font-semibold"
                                      : "bg-white border-gray-200 text-gray-600 hover:border-[#D61F45] hover:text-[#D61F45]"
                                      }`}
                                    onClick={() => {
                                      handleProjectPropertyChange(index, "retail_location", type);
                                    }}
                                  >
                                    {type}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                      </div>
                      {/* Property Price */}
                      <div className="w-full">
                        <label className="block mb-1 text-[14px] font-semibold text-[#17253a]">
                          Price{" "}
                          <span className="text-[#D61F45]">*</span>
                        </label>
                        <input
                          type="text"
                          value={
                            projectProperty.price
                              ? Number(projectProperty.price).toLocaleString("en-IN")
                              : ""
                          }
                          onChange={(e) => {
                            const rawValue = e.target.value.replace(/,/g, "");

                            if (/^\d{0,20}$/.test(rawValue)) {
                              handleProjectPropertyChange(index, "price", rawValue);
                            }
                          }}
                          placeholder="₹"
                          className="w-full mt-1 px-3.5 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                        />
                        {projectProperty.price && (
                          <p className="mt-2 text-sm font-medium text-gray-600">
                            {toWords.convert(Number(projectProperty.price))}
                          </p>
                        )}
                        {errors[`price_${index}`] && (
                          <p className="flex items-center gap-1 mt-1 text-[12px] font-medium text-[#D61F45]">
                            <MdErrorOutline className="text-lg" />
                            {errors[`price_${index}`]}
                          </p>
                        )}
                      </div>

                      {/* BHK */}
                      {!(
                        buildingType === "Commercial" ||
                        projectProperty.project_type === "Plot/Land"
                      ) && (
                          <div className="w-full">
                            <label className="block mb-1 text-[14px] font-semibold text-[#17253a]">
                              BHK{" "}
                              <span className="text-[#D61F45]">
                                *
                              </span>
                            </label>

                            <select
                              value={projectProperty.bhk_type || ""}
                              onChange={(e) => {
                                handleProjectPropertyChange(index, "bhk_type", e.target.value);
                                setConfigurations(e.target.value);
                              }}
                              className="w-full mt-1 px-3.5 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                            >
                              <option value="">Select BHK Type</option>

                              {(projectProperty.project_type === "1RK/Studio Apartment"
                                ? ["1 BHK"]
                                : [
                                  "Studio/Single Room",
                                  "1 BHK",
                                  "1.5 BHK",
                                  "2 BHK",
                                  "2.5 BHK",
                                  "3 BHK",
                                  "3.5 BHK",
                                  "4 BHK",
                                  "5 BHK",
                                  "6 BHK",
                                  "6+ BHK",
                                ]
                              ).map((bhk) => (
                                <option key={bhk} value={bhk}>
                                  {bhk}
                                </option>
                              ))}
                            </select>

                            {errors[`bhk_type_${index}`] && (
                              <p className="flex items-center gap-1 mt-1 text-[12px] font-medium text-[#D61F45]">
                                <MdErrorOutline className="text-lg" />
                                {errors[`bhk_type_${index}`]}
                              </p>
                            )}
                          </div>
                        )}

                      {/* Carpet Area */}
                      <div>
                        <label className="text-[14px] font-semibold text-[#17253a]">
                          Carpet Area <span className="text-[#D61F45]">*</span>
                        </label>
                        <input
                          type="text"
                          value={projectProperty.carpet_area || ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d{0,10}$/.test(value)) {
                              handleProjectPropertyChange(index, "carpet_area", value);
                            }
                          }}
                          placeholder="Enter carpet area"
                          className={`w-full mt-1 px-3.5 py-3 text-[14px] text-[#17253a] bg-white border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] ${errors[`carpet_area_${index}`] ? "border-[#D61F45]" : "border-gray-200"}`}
                        />
                        <FieldError msg={errors[`carpet_area_${index}`]} />
                      </div>

                      <div>
                        <label className="text-[14px] font-semibold text-[#17253a]">Unit</label>
                        <select
                          value={projectProperty.carpet_area_in || ""}
                          onChange={(e) =>
                            handleProjectPropertyChange(index, "carpet_area_in", e.target.value)
                          }
                          className="w-full mt-1 px-3.5 py-3 border rounded-xl text-[14px] text-[#17253a] outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] bg-white border-gray-200"
                        >
                          <option value="">Select</option>
                          <option value="sq.ft">sq.ft</option>
                          <option value="sq.yards">sq.yards</option>
                          <option value="sq.m">sq.m</option>
                          <option value="acre">acre</option>
                          <option value="marla">marla</option>
                          <option value="cents">cents</option>
                          <option value="bigha">bigha</option>
                          <option value="kottah">kottah</option>
                          <option value="kanal">kanal</option>
                          <option value="grounds">grounds</option>
                          <option value="ares">ares</option>
                          <option value="biswa">biswa</option>
                          <option value="guntha">guntha</option>
                          <option value="aankadam">aankadam</option>
                          <option value="hectares">hectares</option>
                          <option value="rood">rood</option>
                          <option value="chataks">chataks</option>
                          <option value="perch">perch</option>
                        </select>
                        <FieldError msg={errors[`carpet_area_in_${index}`]} />
                      </div>

                      {/* Built-up Area */}
                      <div>
                        <label className="text-[14px] font-semibold text-[#17253a]">
                          Built-up Area <span className="text-[#D61F45]">*</span>
                        </label>
                        <input
                          type="text"
                          value={projectProperty.area || ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d{0,10}$/.test(value)) {
                              handleProjectPropertyChange(index, "area", value);
                            }
                          }}
                          placeholder="Enter built-up area"
                          className={`w-full mt-1 px-3.5 py-3 text-[14px] text-[#17253a] bg-white border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] ${errors[`area_${index}`] ? "border-[#D61F45]" : "border-gray-200"}`}
                        />
                        <FieldError msg={errors[`area_${index}`]} />
                      </div>

                      <div>
                        <label className="text-[14px] font-semibold text-[#17253a]">Unit</label>
                        <select
                          value={projectProperty.area_in || ""}
                          onChange={(e) =>
                            handleProjectPropertyChange(index, "area_in", e.target.value)
                          }
                          className="w-full mt-1 px-3.5 py-3 border rounded-xl text-[14px] text-[#17253a] outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] bg-white border-gray-200"
                        >
                          <option value="">Select</option>
                          <option value="sq.ft">sq.ft</option>
                          <option value="sq.yards">sq.yards</option>
                          <option value="sq.m">sq.m</option>
                          <option value="acre">acre</option>
                          <option value="marla">marla</option>
                          <option value="cents">cents</option>
                          <option value="bigha">bigha</option>
                          <option value="kottah">kottah</option>
                          <option value="kanal">kanal</option>
                          <option value="grounds">grounds</option>
                          <option value="ares">ares</option>
                          <option value="biswa">biswa</option>
                          <option value="guntha">guntha</option>
                          <option value="aankadam">aankadam</option>
                          <option value="hectares">hectares</option>
                          <option value="rood">rood</option>
                          <option value="chataks">chataks</option>
                          <option value="perch">perch</option>
                        </select>
                        <FieldError msg={errors[`area_in_${index}`]} />
                      </div>

                      {!(
                        (buildingType === "Residential" &&
                          projectProperty.project_type === "Plot/Land") ||
                        (buildingType === "Commercial" &&
                          [
                            "Land",
                            "Storage",
                            "Hospitality",
                            "Industry",
                            "Retail",
                            "Warehouse",
                            "Plot/Land",
                          ].includes(projectProperty.project_type))
                      ) && (
                          <div>
                            <label className="text-[14px] font-semibold text-[#17253a]">
                              Bathroom
                            </label>

                            <select
                              className="w-full px-3.5 py-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                              value={projectProperty.bathroom || ""}
                              onChange={(e) =>
                                handleProjectPropertyChange(index, "bathroom", Number(e.target.value))
                              }
                            >
                              <option value="">Select Bathrooms</option>
                              <option value="0">0</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="4">+4</option>
                            </select>
                          </div>
                        )}
                      {buildingType === "Commercial" &&
                        projectProperty.project_type === "Retail" && (
                          <div>
                            <label className="text-[14px] font-semibold text-[#17253a]">
                              Washroom
                            </label>

                            <select
                              value={projectProperty.commercial_washroom || ""}
                              onChange={(e) =>
                                handleProjectPropertyChange(
                                  index,
                                  "commercial_washroom",
                                  e.target.value
                                )
                              }
                              className="w-full px-3.5 py-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                            >
                              <option value="">Select Washroom</option>
                              <option value="Private Washrooms">
                                Private Washrooms
                              </option>
                              <option value="Public Washrooms">
                                Public Washrooms
                              </option>
                              <option value="Not Available">Not Available</option>
                            </select>
                          </div>
                        )}
                      {buildingType === "Commercial" &&
                        ["Storage", "Industry", "Hospitality"].includes(
                          projectProperty.project_type
                        ) && (
                          <div>
                            <label className="text-[14px] font-semibold text-[#17253a]">
                              Washroom
                            </label>

                            <select
                              value={projectProperty.commercial_washroom || ""}
                              onChange={(e) =>
                                handleProjectPropertyChange(
                                  index,
                                  "commercial_washroom",
                                  e.target.value
                                )
                              }
                              className="w-full px-3.5 py-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                            >
                              <option value="">Select Washrooms</option>
                              <option value="None">None</option>
                              <option value="Shared">Shared</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="4+">4+</option>
                            </select>
                          </div>
                        )}
                      {!(
                        (buildingType === "Residential" && projectProperty.project_type === "Plot/Land") ||
                        (buildingType === "Commercial" &&
                          [
                            "Land",
                            "Plot/Land",
                            "Warehouse",
                            "Storage",
                            "Industry",
                            "Hospitality",
                          ].includes(projectProperty.project_type))
                      ) && (
                          <div>
                            <label className="text-[14px] font-semibold text-[#17253a]">
                              Total Floor
                            </label>

                            <input
                              type="text"
                              name="total_floor"
                              value={projectProperty.total_floor || ""}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (/^[a-zA-Z0-9]{0,10}$/.test(value)) {
                                  handleProjectPropertyChange(index, "total_floor", value);
                                }
                              }}
                              className="w-full px-3.5 py-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                            />
                          </div>
                        )}
                      {!(
                        (buildingType === "Residential" && projectProperty.project_type === "Plot/Land") ||
                        (buildingType === "Commercial" &&
                          [
                            "Land",
                            "Plot/Land",
                            "Warehouse",
                            "Industry",
                            "Storage",
                            "Hospitality",
                          ].includes(projectProperty.project_type))
                      ) && (
                          <div>
                            <label className="text-[14px] font-semibold text-[#17253a]">
                              Flat on the floor
                            </label>

                            <select
                              name="project_floor"
                              value={projectProperty.project_floor || ""}
                              onChange={(e) => handleProjectPropertyChange(index, "project_floor", e.target.value)}
                              className="w-full px-3.5 py-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                            >
                              <option value="">Select Floor</option>

                              <option value="Lower Basement">Lower Basement</option>

                              <option value="Basement">Basement</option>

                              <option value="Lower Ground">Lower Ground</option>

                              <option value="Ground">Ground</option>

                              <option value="Rooftop/Terrace">Rooftop/Terrace</option>

                              {[...Array(Number(projectProperty.total_floor) || 0)].map(
                                (_, floorIndex) => (
                                  <option key={floorIndex + 1} value={`${floorIndex + 1}`}>
                                    {floorIndex + 1}
                                  </option>
                                ),
                              )}
                            </select>
                          </div>
                        )}
                      {buildingType === "Commercial" &&
                        projectProperty.project_type === "Office" && (
                          <div>
                            <label className="text-[14px] font-semibold text-[#17253a]">
                              No. of Cabines
                            </label>

                            <select
                              value={projectProperty.no_of_cabines || ""}
                              onChange={(e) =>
                                handleProjectPropertyChange(
                                  index,
                                  "no_of_cabines",
                                  e.target.value
                                )
                              }
                              className="w-full px-3.5 py-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                            >
                              <option value="">Select Cabines</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="10+">10+</option>
                            </select>
                          </div>
                        )}
                      {buildingType === "Commercial" && projectProperty.project_type === "Office" && (
                        <div>
                          <label className="text-[14px] font-semibold text-[#17253a]">
                            No. of Meeting Rooms
                          </label>

                          <select
                            value={projectProperty.no_of_meeting_Rooms || ""}
                            onChange={(e) =>
                              handleProjectPropertyChange(
                                index,
                                "no_of_meeting_Rooms",
                                e.target.value
                              )
                            }
                            className="w-full px-3.5 py-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                          >
                            <option value="">Select Meeting Rooms</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5+">5+</option>
                          </select>
                        </div>
                      )}
                      {buildingType === "Commercial" &&
                        projectProperty.project_type === "Office" && (
                          <div>
                            <label className="text-[14px] font-semibold text-[#17253a]">
                              No. of Conference Room
                            </label>

                            <select
                              value={projectProperty.no_of_conference_room || ""}
                              onChange={(e) =>
                                handleProjectPropertyChange(
                                  index,
                                  "no_of_conference_room",
                                  e.target.value
                                )
                              }
                              className="w-full px-3.5 py-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                            >
                              <option value="">Select Conference Room</option>
                              <option value="0">0</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3+">3+</option>
                            </select>
                          </div>
                        )}

                      {buildingType === "Commercial" &&
                        projectProperty.project_type === "Hospitality" && (
                          <div>
                            <label className="text-[14px] font-semibold text-[#17253a]">
                              Total Number of Rooms
                            </label>

                            <input
                              type="text"
                              value={projectProperty.total_number_of_rooms || ""}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d*$/.test(value)) {
                                  handleProjectPropertyChange(
                                    index,
                                    "total_number_of_rooms",
                                    value
                                  );
                                }
                              }}
                              placeholder="Enter Total Rooms"
                              className="w-full px-3.5 py-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                            />
                          </div>
                        )}
                      {((buildingType === "Residential" && projectProperty.project_type === "Plot/Land") ||
                        (buildingType === "Commercial" &&
                          ["Land", "Plot/Land"].includes(projectProperty.project_type))) && (
                          <div>
                            <label className="text-[14px] font-semibold text-[#17253a]">Facing</label>

                            <select

                              value={projectProperty.facing || ""}
                              onChange={(e) =>
                                handleProjectPropertyChange(index, "facing", e.target.value)
                              }
                              className="w-full px-3.5 py-3 mt-1 border rounded-xl text-[14px] text-[#17253a] outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] bg-white border-gray-200"
                            >
                              <option value="">Select Facing</option>

                              <option value="East">East</option>
                              <option value="West">West</option>
                              <option value="North">North</option>
                              <option value="South">South</option>
                              <option value="North East">North East</option>
                              <option value="North West">North West</option>
                              <option value="South East">South East</option>
                              <option value="South West">South West</option>
                            </select>
                          </div>
                        )}
                      {((buildingType === "Residential" && projectProperty.project_type === "Plot/Land") ||
                        (buildingType === "Commercial" &&
                          projectProperty.project_type === "Plot/Land")) && (
                          <>
                            {/* Length */}
                            <div>
                              <label className="text-[14px] font-semibold text-[#17253a]">
                                Length of Plot (ft){" "}
                                <span className="text-[#D61F45]">*</span>
                              </label>

                              <input
                                type="text"
                                value={projectProperty.property_dimensions_length || ""}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (/^\d*$/.test(value)) {
                                    handleProjectPropertyChange(
                                      index,
                                      "property_dimensions_length",
                                      value
                                    );
                                  }
                                }}
                                placeholder="Enter Length"
                                className={`w-full p-3 mt-1 border rounded-xl focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] outline-none ${errors?.property_dimensions_length
                                  ? "border-[#D61F45]"
                                  : "border-gray-200"
                                  }`}
                              />

                              {errors?.property_dimensions_length && (
                                <p className="text-[12px] font-medium text-[#D61F45] mt-1">
                                  {errors.property_dimensions_length}
                                </p>
                              )}
                            </div>

                            {/* Breadth */}
                            <div>
                              <label className="text-[14px] font-semibold text-[#17253a]">
                                Breadth of Plot (ft){" "}
                                <span className="text-[#D61F45]">*</span>
                              </label>

                              <input
                                type="text"
                                value={projectProperty.property_dimensions_breadth || ""}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (/^\d*$/.test(value)) {
                                    handleProjectPropertyChange(
                                      index,
                                      "property_dimensions_breadth",
                                      value
                                    );
                                  }
                                }}
                                placeholder="Enter Breadth"
                                className={`w-full p-3 mt-1 border rounded-xl focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] outline-none ${errors?.property_dimensions_breadth
                                  ? "border-[#D61F45]"
                                  : "border-gray-200"
                                  }`}
                              />

                              {errors?.property_dimensions_breadth && (
                                <p className="text-[12px] font-medium text-[#D61F45] mt-1">
                                  {errors.property_dimensions_breadth}
                                </p>
                              )}
                            </div>
                          </>
                        )}
                      {!(
                        (buildingType === "Residential" && projectProperty.project_type === "Plot/Land") ||
                        (buildingType === "Commercial" &&
                          [
                            //"Land",
                            "Plot/Land",
                            "Industry",
                            "Storage",
                            "Hospitality",
                          ].includes(projectProperty.project_type)) ||
                        formData.possession_status === "Under Construction"
                      ) && (
                          <div>
                            <label className="text-[14px] font-semibold text-[#17253a]">
                              Age of Property
                            </label>

                            <select
                              value={projectProperty.age_of_property || ""}
                              onChange={(e) =>
                                handleProjectPropertyChange(
                                  index,
                                  "age_of_property",
                                  e.target.value
                                )
                              }
                              className="w-full px-3.5 py-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                            >
                              <option value="">Select Age of Property</option>
                              <option value="0-1">0-1</option>
                              <option value="2-4">2-4</option>
                              <option value="5-7">5-7</option>
                              <option value="8-10">8-10</option>
                              <option value="10+">10+</option>
                              {/* <option value="0-1">1 to 5 Years</option>
                      <option value="2-4">5 to 10 Years</option>
                      <option value="5-7">10 to 15 Years</option>
                      <option value="8-10">15 to 20 Years</option>
                      <option value="10+">Above 20 Years</option>
                      <option value="10+">New Construction</option> */}
                            </select>
                          </div>
                        )}
                      {projectProperty.project_type !== "Plot/Land" && (
                        <div>
                          <label className="text-[14px] font-semibold text-[#17253a]">
                            Furnishing Type{" "}
                            <span className="text-[#D61F45]">*</span>
                          </label>

                          <select
                            value={projectProperty.furnished_type || ""}
                            onChange={(e) =>
                              handleProjectPropertyChange(
                                index,
                                "furnished_type",
                                e.target.value
                              )
                            }
                            className="w-full px-3.5 py-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                          >
                            <option value="">Select Furnishing Type</option>
                            <option value="Furnished">Furnished</option>
                            <option value="Semi-Furnished">Semi-Furnished</option>
                            <option value="Unfurnished">Unfurnished</option>
                          </select>

                          {errors?.furnished_type && (
                            <p className="flex items-center gap-1 mt-1 text-[12px] font-medium text-[#D61F45]">
                              <MdErrorOutline className="text-lg" />
                              {errors.furnished_type}
                            </p>
                          )}
                        </div>
                      )}
                      {buildingType === "Residential" && projectProperty.project_type !== "Plot" && (
                        <div>
                          <label className="text-[14px] font-semibold text-[#17253a]">Balcony</label>

                          <select

                            value={projectProperty.balcony || ""}
                            onChange={(e) =>
                              handleProjectPropertyChange(
                                index,
                                "balcony",
                                e.target.value
                              )
                            }
                            className="w-full px-3.5 py-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                          >
                            <option value="">Select No. of Balconies</option>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="more than 3">More than 3</option>
                          </select>
                        </div>
                      )}
                      {buildingType === "Commercial" &&
                        projectProperty.project_type === "Office" &&
                        [
                          "Bare shell office space",
                          "Ready to move office space",
                        ].includes(projectProperty.sub_project_type) && (
                          <div>
                            <label className="text-[14px] font-semibold text-[#17253a]">
                              Pantry
                            </label>

                            <select
                              value={projectProperty.pantry_option || ""}
                              onChange={(e) =>
                                handleProjectPropertyChange(
                                  index,
                                  "pantry_option",
                                  e.target.value
                                )
                              }
                              className="w-full px-3.5 py-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                            >
                              <option value="">Select Pantry</option>
                              <option value="Wet">Wet</option>
                              <option value="Dry">Dry</option>
                              <option value="None">None</option>
                            </select>
                          </div>
                        )}

                      {buildingType === "Commercial" &&
                        projectProperty.project_type === "Office" && (
                          <div>
                            <label className="text-[14px] font-semibold text-[#17253a]">
                              Central AC
                            </label>

                            <select
                              value={projectProperty.central_AC || ""}
                              onChange={(e) =>
                                handleProjectPropertyChange(
                                  index,
                                  "central_AC",
                                  e.target.value
                                )
                              }
                              className="w-full px-3.5 py-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                            >
                              <option value="">Select Option</option>

                              {projectProperty.sub_project_type === "Ready to move office space" ? (
                                <>
                                  <option value="Available">Available</option>

                                  <option value="Not Available">Not Available</option>
                                </>
                              ) : (
                                <>
                                  <option value="Duct Only">Duct Only</option>

                                  <option value="Available">Available</option>

                                  <option value="Not Available">Not Available</option>
                                </>
                              )}
                            </select>
                          </div>
                        )}
                      {buildingType === "Commercial" && projectProperty.project_type === "Office" && (
                        <div>
                          <label className="text-[14px] font-semibold text-[#17253a]">
                            Reception Area
                          </label>

                          <select
                            value={projectProperty.reception_area || ""}
                            onChange={(e) =>
                              handleProjectPropertyChange(
                                index,
                                "reception_area",
                                e.target.value
                              )
                            }
                            className="w-full px-3.5 py-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                          >
                            <option value="">Select Option</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                      )}
                      {buildingType === "Commercial" &&
                        projectProperty.project_type === "Office" && (
                          <div>
                            <label className="text-[14px] font-semibold text-[#17253a]">
                              Personal Washroom
                            </label>

                            <select

                              value={projectProperty.personal_washroom || ""}
                              onChange={(e) =>
                                handleProjectPropertyChange(
                                  index,
                                  "personal_washroom",
                                  e.target.value
                                )
                              }
                              className="w-full px-3.5 py-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                            >
                              <option value="">Select</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </div>
                        )}
                      {buildingType === "Commercial" &&
                        projectProperty.project_type === "Retail" && (
                          <div>
                            <label className="text-[14px] font-semibold text-[#17253a]">
                              Parking Type
                            </label>

                            <Select
                              isMulti
                              name="parking_types"
                              options={[
                                { value: "Private Parking", label: "Private Parking" },
                                { value: "Public Parking", label: "Public Parking" },
                                { value: "Multilevel Parking", label: "Multilevel Parking" },
                                { value: "Not Available", label: "Not Available" },
                              ]}
                              value={[
                                { value: "Private Parking", label: "Private Parking" },
                                { value: "Public Parking", label: "Public Parking" },
                                { value: "Multilevel Parking", label: "Multilevel Parking" },
                                { value: "Not Available", label: "Not Available" },
                              ].filter((opt) =>
                                (projectProperty.parking_types || "")
                                  .split(",")
                                  .includes(opt.value)
                              )}
                              onChange={(selectedOptions) => {
                                const values = selectedOptions
                                  ? selectedOptions.map((opt) => opt.value)
                                  : [];

                                let finalValues = values;

                                if (values.includes("Not Available")) {
                                  finalValues = ["Not Available"];
                                }

                                handleProjectPropertyChange(
                                  index,
                                  "parking_types",
                                  finalValues.join(",")
                                );
                              }}
                              components={{ MultiValue: CustomMultiValue }}
                              placeholder="Select Parking Type"
                              classNamePrefix="react-select"
                              styles={{
                                control: (base, state) => ({
                                  ...base,
                                  minHeight: "46px",
                                  padding: "6px",
                                  borderColor: state.isFocused ? "#D61F45" : "#d1d5db",
                                  boxShadow: state.isFocused
                                    ? "0 0 0 3px #FDE8EC"
                                    : "none",
                                  borderRadius: "0.75rem",
                                  fontSize: "16px",
                                  display: "flex",
                                  flexWrap: "nowrap",
                                  overflowX: "auto",
                                }),
                                valueContainer: (base) => ({
                                  ...base,
                                  padding: "0 6px",
                                  display: "flex",
                                  flexWrap: "nowrap",
                                  gap: "6px",
                                  overflowX: "auto",
                                  scrollbarWidth: "thin",
                                  alignItems: "center",
                                }),
                                placeholder: (base) => ({
                                  ...base,
                                  color: "#1f2937",
                                  fontSize: "16px",
                                }),
                                multiValue: (base) => ({
                                  ...base,
                                  backgroundColor: "#FDE8EC",
                                  borderRadius: "0.375rem",
                                  display: "flex",
                                  alignItems: "center",
                                  padding: "2px 6px",
                                  whiteSpace: "nowrap",
                                }),
                                multiValueLabel: (base) => ({
                                  ...base,
                                  color: "#D61F45",
                                  fontWeight: "500",
                                }),
                                multiValueRemove: (base) => ({
                                  ...base,
                                  color: "#D61F45",
                                  ":hover": {
                                    backgroundColor: "#FAD3DB",
                                    color: "#B91C3C",
                                  },
                                }),
                              }}
                            />
                          </div>
                        )}
                      {((buildingType === "Residential" && projectProperty.project_type === "Plot/Land") ||
                        (buildingType === "Commercial" &&
                          projectProperty.project_type === "Plot/Land")) && (
                          <div>
                            <label className="text-[14px] font-semibold text-[#17253a]">
                              No. of Open Sides
                            </label>

                            <select
                              value={projectProperty.no_of_open_sides || ""}
                              onChange={(e) =>
                                handleProjectPropertyChange(
                                  index,
                                  "no_of_open_sides",
                                  e.target.value
                                )
                              }
                              className="w-full px-3.5 py-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                            >
                              <option value="">Select Open Sides</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                            </select>
                          </div>
                        )}
                      {(buildingType === "Commercial" ||
                        (buildingType === "Residential" &&
                          projectProperty.project_type === "Other")) && (
                          <div>
                            <label className="text-[14px] font-semibold text-[#17253a]">
                              Purchase Type
                            </label>

                            <select
                              value={projectProperty.purchase_type || ""}
                              onChange={(e) =>
                                handleProjectPropertyChange(
                                  index,
                                  "purchase_type",
                                  e.target.value
                                )
                              }
                              className="w-full px-3.5 py-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                            >
                              <option value="">Select Purchase Type</option>
                              <option value="Resale">Resale</option>
                              <option value="New bookings">New Bookings</option>
                            </select>
                          </div>
                        )}
                      {buildingType === "Commercial" && projectProperty.project_type === "Office" && (
                        <div>
                          <label className="text-[14px] font-semibold text-[#17253a]">
                            Number of Seats Available
                          </label>

                          <input
                            type="text"
                            value={projectProperty.number_of_seats_available || ""}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (/^\d*$/.test(value)) {
                                handleProjectPropertyChange(
                                  index,
                                  "number_of_seats_available",
                                  value
                                );
                              }
                            }}
                            placeholder="Enter number of seats"
                            className="w-full px-3.5 py-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                          />
                        </div>
                      )}
                      {/* <div className="md:col-span-3 mt-2"> */}
                      {/* <label className="text-[14px] font-semibold text-[#17253a]">
                      Price Details
                    </label> */}

                      {/* <div className="flex flex-wrap gap-4 mt-2"> */}
                      {/* All Inclusive Price */}
                      {/* <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.all_inclusive_price === "Yes"}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              all_inclusive_price: e.target.checked
                                ? "Yes"
                                : "No",
                            })
                          }
                        />
                        All Inclusive Price
                      </label> */}
                      {/* Price Onwards */}
                      {/* <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.price_onwards === "Yes"}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              price_onwards: e.target.checked ? "Yes" : "No",
                            })
                          }
                        />
                        Price Onwards
                      </label> */}
                      {/* Price Negotiable */}
                      {/* <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.price_negotiable === "Yes"}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              price_negotiable: e.target.checked ? "Yes" : "No",
                            })
                          }
                        />
                        Price Negotiable
                      </label> */}

                      {/* Tax & Govt Charges */}
                      {/* <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.tax_and_goverment_charges === "Yes"}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              tax_and_goverment_charges: e.target.checked
                                ? "Yes"
                                : "No",
                            })
                          }
                        />
                        Tax & Government Charges Excluded
                      </label>
                    </div> */}
                      {/* </div> */}

                    </div>
                    <div className="flex justify-end px-5 pb-5">
                      <button
                        type="button"
                        onClick={() =>
                          setProjectProperties([
                            ...projectProperties,
                            { ...emptyProjectProperty },
                          ])
                        }
                        className="flex items-center gap-2 px-5 py-2.5 text-[14px] font-semibold text-white rounded-xl bg-gradient-to-r from-[#D61F45] to-[#B91C3C] shadow-[0_6px_16px_rgba(214,31,69,0.35)] hover:shadow-[0_10px_22px_rgba(214,31,69,0.45)] transition-shadow"
                      >
                        <Plus size={18} />
                        Add Property
                      </button>
                    </div>
                  </div>

                ))}

                <div className="grid grid-cols-1 gap-4 p-5 mb-5 bg-white border border-[#FAD3DB] md:grid-cols-2 lg:grid-cols-4 rounded-2xl">
                  {/*  Header full width */}
                  <div className="col-span-full">
                    <SectionHeader
                      icon={ClipboardText}
                      title="More Details"
                      subtitle="Comprehensive overview covering scale, financials, features, timeline, and compliance of the project"
                    />
                  </div>
                  <div>
                    <label className="text-[14px] font-semibold text-[#17253a]">
                      Price Range
                    </label>

                    <input
                      type="text"
                      value={averagePrice}
                      readOnly
                      className="w-full px-3.5 py-3 mt-1 border rounded-xl bg-[#FFF7F9] text-gray-600 text-[14px] text-[#17253a] outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] border-gray-200"
                    />
                  </div>
                  {buildingType === "Residential" ? (
                    <div>
                      <label className="block mb-2 text-[14px] font-semibold text-[#17253a]">
                        Configurations
                      </label>

                      <input
                        type="text"
                        value={configurations}
                        readOnly
                        className="w-full px-3.5 py-3 bg-[#FFF7F9] text-gray-600 border rounded-xl outline-none text-[14px] text-[#17253a] focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] border-gray-200"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block mb-2 text-[14px] font-semibold text-[#17253a]">
                        Available Property Types
                      </label>

                      <input
                        type="text"
                        value={[
                          ...new Set(
                            projectProperties
                              .map((p) => p.project_type)
                              .filter(Boolean)
                          ),
                        ].join(", ")}
                        readOnly
                        className="w-full px-3.5 py-3 bg-[#FFF7F9] text-gray-600 border rounded-xl outline-none text-[14px] text-[#17253a] focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] border-gray-200"
                      />
                    </div>
                  )}
                  {/* {buildingType === "Commercial" &&
                  !["Land", "Plot/Land"].includes(propertyType) && (
                    <div>
                      <label className="text-[14px] font-semibold text-[#17253a]">
                        Security Deposit Amount{" "}
                        <span className="text-[#D61F45]">
                          *
                        </span>
                      </label>

                      <input
                        type="text"
                        name="custom_deposit_amount"
                        value={formData.custom_deposit_amount || ""}
                        onChange={(e) => {
                          const value = e.target.value;

                          if (/^\d{0,10}$/.test(value)) {
                            handleInputChange(e);
                          }
                        }}
                        placeholder="Enter Security Deposit Amount"
                        className="w-full px-3.5 py-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                      />

                      {errors?.custom_deposit_amount && (
                        <p className="flex items-center gap-1 mt-1 text-[12px] font-medium text-[#D61F45]">
                          <MdErrorOutline className="text-lg" />
                          {errors.custom_deposit_amount}
                        </p>
                      )}
                    </div>
                  )} */}
                  <div>
                    <label className="text-[14px] font-semibold text-[#17253a]">
                      Possession Status
                    </label>

                    <select
                      className="w-full px-3.5 py-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                      value={formData.possession_status || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          possession_status: e.target.value,
                        })
                      }
                    >
                      <option value="">Select Status</option>

                      <option value="Ready To Move">Ready To Move</option>

                      <option value="Under Construction">
                        Under Construction
                      </option>
                    </select>

                    {errors?.possession_status && (
                      <p className="flex items-center gap-1 mt-1 text-[12px] font-medium text-[#D61F45]">
                        <MdErrorOutline className="text-lg" />
                        {errors.possession_status}
                      </p>
                    )}
                  </div>
                  {formData.possession_status === "Under Construction" && (
                    <div>
                      <label className="text-[14px] font-semibold text-[#17253a]">
                        Possession Date{" "}
                      </label>

                      <input
                        type="date"
                        value={formData.possession_date || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            possession_date: e.target.value,
                          })
                        }
                        className="w-full px-3.5 py-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                      />

                      {errors?.possession_date && (
                        <p className="flex items-center gap-1 mt-1 text-[12px] font-medium text-[#D61F45]">
                          <MdErrorOutline className="text-lg" />
                          {errors.possession_date}
                        </p>
                      )}
                    </div>
                  )}
                  {/* {!(
                  (buildingType === "Residential" && propertyType === "Plot/Land") ||
                  (buildingType === "Commercial" &&
                    [
                      "Land",
                      "Plot/Land",
                      "Warehouse",
                      "Storage",
                      "Industry",
                      "Hospitality",
                    ].includes(propertyType))
                ) && (
                  <div>
                    <label className="text-[14px] font-semibold text-[#17253a]">
                      Total Floor
                    </label>

                    <input
                      type="text"
                      name="total_floor"
                      value={formData.total_floor}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^[a-zA-Z0-9]{0,10}$/.test(value)) {
                          handleInputChange(e);
                        }
                      }}
                      className="w-full px-3.5 py-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                    />
                  </div>
                )} */}
                  {/* {!(
                  (buildingType === "Residential" && propertyType === "Plot") ||
                  (buildingType === "Commercial" &&
                    [
                      "Land",
                      "Plot/Land",
                      "Warehouse",
                      "Industry",
                      "Storage",
                      "Hospitality",
                    ].includes(propertyType))
                ) && (
                  <div>
                    <label className="text-[14px] font-semibold text-[#17253a]">
                      Flat on the floor
                    </label>

                    <select
                      name="project_floor"
                      value={formData.project_floor || ""}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                    >
                      <option value="">Select Floor</option>

                      <option value="Lower Basement">Lower Basement</option>

                      <option value="Basement">Basement</option>

                      <option value="Lower Ground">Lower Ground</option>

                      <option value="Ground">Ground</option>

                      <option value="Rooftop/Terrace">Rooftop/Terrace</option>

                      {[...Array(Number(formData.total_floor) || 0)].map(
                        (_, index) => (
                          <option key={index + 1} value={`${index + 1}`}>
                            {index + 1}
                          </option>
                        ),
                      )}
                    </select>
                  </div>
                )} */}
                  {/* {[
                  "Apartment",
                  "1RK/Studio Apartment",
                  "Service Apartment",
                  "Office",
                ].includes(propertyType) && (
                  <div>
                    <label className="text-[14px] font-semibold text-[#17253a]">
                      Total Number of Parking
                    </label>

                    <input
                      type="text"
                      value={formData.total_number_parking || ""}
                      onChange={(e) =>
                        handleInputChange(
                          "total_number_parking",
                          e.target.value,
                        )
                      }
                      className="w-full px-3.5 py-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                      placeholder="Enter total parking"
                    />
                  </div>
                )} */}
                  {/* {buildingType === "Commercial" && propertyType === "Retail" && (
                  <div>
                    <label className="text-[14px] font-semibold text-[#17253a]">
                      Parking Type
                    </label>

                    <Select
                      isMulti
                      name="parking_types"
                      options={[
                        {
                          value: "Private Parking",
                          label: "Private Parking",
                        },
                        {
                          value: "Public Parking",
                          label: "Public Parking",
                        },
                        {
                          value: "Multilevel Parking",
                          label: "Multilevel Parking",
                        },
                        {
                          value: "Not Available",
                          label: "Not Available",
                        },
                      ]}
                      value={[
                        {
                          value: "Private Parking",
                          label: "Private Parking",
                        },
                        {
                          value: "Public Parking",
                          label: "Public Parking",
                        },
                        {
                          value: "Multilevel Parking",
                          label: "Multilevel Parking",
                        },
                        {
                          value: "Not Available",
                          label: "Not Available",
                        },
                      ].filter((opt) =>
                        (formData.parking_types || "")
                          .split(",")
                          .includes(opt.value),
                      )}
                      onChange={(selectedOptions) => {
                        const values = selectedOptions.map((opt) => opt.value);

                        let finalValues = values;

                        if (values.includes("Not Available")) {
                          finalValues = ["Not Available"];
                        }

                        handleInputChange({
                          target: {
                            name: "parking_types",
                            value: finalValues.join(","),
                          },
                        });
                      }}
                      components={{ MultiValue: CustomMultiValue }}
                      placeholder="Select Parking Type"
                      classNamePrefix="react-select"
                      styles={{
                        control: (base, state) => ({
                          ...base,
                          minHeight: "46px",
                          padding: "6px",
                          borderColor: state.isFocused ? "#D61F45" : "#d1d5db",
                          boxShadow: state.isFocused
                            ? "0 0 0 3px #FDE8EC"
                            : "none",
                          borderRadius: "0.75rem",
                          fontSize: "16px",
                          display: "flex",
                          flexWrap: "nowrap",
                          overflowX: "auto",
                        }),

                        valueContainer: (base) => ({
                          ...base,
                          padding: "0 6px",
                          display: "flex",
                          flexWrap: "nowrap",
                          gap: "6px",
                          overflowX: "auto",
                          scrollbarWidth: "thin",
                          alignItems: "center",
                        }),

                        placeholder: (base) => ({
                          ...base,
                          color: "#1f2937",
                          fontSize: "16px",
                        }),

                        multiValue: (base) => ({
                          ...base,
                          backgroundColor: "#FDE8EC",
                          borderRadius: "0.375rem",
                          display: "flex",
                          alignItems: "center",
                          padding: "2px 6px",
                          whiteSpace: "nowrap",
                        }),

                        multiValueLabel: (base) => ({
                          ...base,
                          color: "#D61F45",
                          fontWeight: "500",
                        }),

                        multiValueRemove: (base) => ({
                          ...base,
                          color: "#D61F45",
                          ":hover": {
                            backgroundColor: "#FAD3DB",
                            color: "#B91C3C",
                          },
                        }),
                      }}
                    />
                  </div>
                )} */}
                  {/* {buildingType === "Commercial" && propertyType === "Office" && (
                  <div>
                    <label className="text-[14px] font-semibold text-[#17253a]">
                      No. of Cabines
                    </label>

                    <select
                      value={formData.no_of_cabines || ""}
                      onChange={(e) =>
                        handleInputChange("no_of_cabines", e.target.value)
                      }
                      className="w-full px-3.5 py-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                    >
                      <option value="">Select Cabines</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="10+">10+</option>
                    </select>
                  </div>
                )} */}
                  {/* {buildingType === "Commercial" && propertyType === "Office" && (
                  <div>
                    <label className="text-[14px] font-semibold text-[#17253a]">
                      No. of Meeting Rooms
                    </label>

                    <select
                      value={formData.no_of_meeting_Rooms || ""}
                      onChange={(e) =>
                        handleInputChange("no_of_meeting_Rooms", e.target.value)
                      }
                      className="w-full px-3.5 py-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                    >
                      <option value="">Select Meeting Rooms</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5+">5+</option>
                    </select>
                  </div>
                )} */}
                  {/* {buildingType === "Commercial" && propertyType === "Office" && (
                  <div>
                    <label className="text-[14px] font-semibold text-[#17253a]">
                      No. of Conference Room
                    </label>

                    <select
                      value={formData.no_of_conference_room || ""}
                      onChange={(e) =>
                        handleInputChange(
                          "no_of_conference_room",
                          e.target.value,
                        )
                      }
                      className="w-full px-3.5 py-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                    >
                      <option value="">Select Conference Room</option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3+">3+</option>
                    </select>
                  </div>
                )} */}

                  {/* {buildingType === "Commercial" &&
                  propertyType === "Hospitality" && (
                    <div>
                      <label className="text-[14px] font-semibold text-[#17253a]">
                        Total Number of Rooms
                      </label>

                      <input
                        type="text"
                        value={formData.total_number_of_rooms || ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d*$/.test(value)) {
                            handleInputChange("total_number_of_rooms", value);
                          }
                        }}
                        placeholder="Enter Total Rooms"
                        className="w-full px-3.5 py-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                      />
                    </div>
                  )} */}
                  <div>
                    <label className="block mb-2 text-[14px] font-semibold text-[#17253a]">
                      RERA ID
                    </label>

                    <input
                      type="text"
                      value={reraId}
                      onChange={(e) => setReraId(e.target.value)}
                      placeholder="Enter RERA ID"
                      className="w-full px-3.5 py-3 border rounded-xl outline-none text-[14px] text-[#17253a] focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] bg-white border-gray-200"
                    />
                  </div>
                  {buildingType === "Commercial" &&
                    propertyType === "Hospitality" && (
                      <div>
                        <label className="text-[14px] font-semibold text-[#17253a]">
                          Quality Rating
                        </label>

                        <select
                          value={formData.quality_rating || ""}
                          onChange={(e) =>
                            handleInputChange("quality_rating", e.target.value)
                          }
                          className="w-full px-3.5 py-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                        >
                          <option value="">Select Rating</option>
                          <option value="No Rating">No Rating</option>
                          <option value="1 Star">1 Star</option>
                          <option value="2 Star">2 Star</option>
                          <option value="3 Star">3 Star</option>
                          <option value="4 Star">4 Star</option>
                          <option value="5 Star">5 Star</option>
                          <option value="6 Star">6 Star</option>
                          <option value="7 Star">7 Star</option>
                        </select>
                      </div>
                    )}

                  {/* {((buildingType === "Residential" && propertyType === "Plot") ||
                  (buildingType === "Commercial" &&
                    ["Land", "Plot/Land"].includes(propertyType))) && (
                  <div>
                    <label className="text-[14px] font-semibold text-[#17253a]">Facing</label>

                    <select
                      name="facing"
                      value={formData.facing || ""}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-3 mt-1 border rounded-xl text-[14px] text-[#17253a] outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] bg-white border-gray-200"
                    >
                      <option value="">Select Facing</option>

                      <option value="East">East</option>
                      <option value="West">West</option>
                      <option value="North">North</option>
                      <option value="South">South</option>
                      <option value="North East">North East</option>
                      <option value="North West">North West</option>
                      <option value="South East">South East</option>
                      <option value="South West">South West</option>
                    </select>
                  </div>
                )} */}
                  {buildingType === "Residential" &&
                    propertyType === "Independent/Builder Floor" && (
                      <div>
                        <label className="text-[14px] font-semibold text-[#17253a]">
                          Builder Floor Type{" "}
                          <span className="text-[#D61F45]">*</span>
                        </label>

                        <select
                          value={formData.builder_floor_type || ""}
                          onChange={(e) =>
                            handleInputChange(
                              "builder_floor_type",
                              e.target.value,
                            )
                          }
                          className="w-full px-3.5 py-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                        >
                          <option value="">Select Floor Type</option>
                          {builderFloorOptions.map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  {/* {((buildingType === "Residential" && propertyType === "Plot") ||
                  (buildingType === "Commercial" &&
                    propertyType === "Plot/Land")) && (
                  <>
                    
                    <div>
                      <label className="text-[14px] font-semibold text-[#17253a]">
                        Length of Plot (ft){" "}
                        <span className="text-[#D61F45]">*</span>
                      </label>

                      <input
                        type="text"
                        value={formData.property_dimensions_length || ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d*$/.test(value)) {
                            handleInputChange(
                              "property_dimensions_length",
                              value,
                            );
                          }
                        }}
                        placeholder="Enter Length"
                        className={`w-full p-3 mt-1 border rounded-xl focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] outline-none ${
                          errors?.property_dimensions_length
                            ? "border-[#D61F45]"
                            : "border-gray-200"
                        }`}
                      />

                      {errors?.property_dimensions_length && (
                        <p className="text-[12px] font-medium text-[#D61F45] mt-1">
                          {errors.property_dimensions_length}
                        </p>
                      )}
                    </div>

                    
                    <div>
                      <label className="text-[14px] font-semibold text-[#17253a]">
                        Breadth of Plot (ft){" "}
                        <span className="text-[#D61F45]">*</span>
                      </label>

                      <input
                        type="text"
                        value={formData.property_dimensions_breadth || ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d*$/.test(value)) {
                            handleInputChange(
                              "property_dimensions_breadth",
                              value,
                            );
                          }
                        }}
                        placeholder="Enter Breadth"
                        className={`w-full p-3 mt-1 border rounded-xl focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] outline-none ${
                          errors?.property_dimensions_breadth
                            ? "border-[#D61F45]"
                            : "border-gray-200"
                        }`}
                      />

                      {errors?.property_dimensions_breadth && (
                        <p className="text-[12px] font-medium text-[#D61F45] mt-1">
                          {errors.property_dimensions_breadth}
                        </p>
                      )}
                    </div>
                  </>
                )} */}

                  {((buildingType === "Residential" && propertyType === "Plot/Land") ||
                    (buildingType === "Commercial" &&
                      propertyType === "Plot/Land")) && (
                      <div>
                        <label className="block mb-2 text-[14px] font-semibold text-[#17253a]">
                          Any Construction on Property
                        </label>

                        <select
                          name="type_of_construction"
                          value={formData.type_of_construction || ""}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                        >
                          <option value="">Select Construction Type</option>
                          {constructionOptions.map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  {/* {((buildingType === "Residential" && propertyType === "Plot") ||
                  (buildingType === "Commercial" &&
                    propertyType === "Plot/Land")) && (
                  <div>
                    <label className="text-[14px] font-semibold text-[#17253a]">
                      Possession By
                    </label>

                    <select
                      value={formData.possession_by || ""}
                      onChange={(e) =>
                        handleInputChange("possession_by", e.target.value)
                      }
                      className="w-full px-3.5 py-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                    >
                      <option value="">Select Possession</option>
                      <option value="Immediate">Immediate</option>
                      <option value="Within 3 Months">Within 3 Months</option>
                      <option value="Within 6 Months">Within 6 Months</option>
                      <option value="By 2026">By 2026</option>
                      <option value="By 2027">By 2027</option>
                      <option value="By 2028">By 2028</option>
                      <option value="By 2029">By 2029</option>
                      <option value="By 2030">By 2030</option>
                      <option value="By 2031">By 2031</option>
                      <option value="By 2032">By 2032</option>
                    </select>
                  </div>
                )} */}
                  {/* {!(
                  (buildingType === "Residential" && propertyType === "Plot") ||
                  (buildingType === "Commercial" &&
                    [
                      "Land",
                      "Plot/Land",
                      "Industry",
                      "Storage",
                      "Hospitality",
                    ].includes(propertyType)) ||
                  formData.possession_status === "Under Construction"
                ) && (
                  <div>
                    <label className="text-[14px] font-semibold text-[#17253a]">
                      Age of Property
                    </label>

                    <select
                      value={formData.age_of_property || ""}
                      onChange={(e) =>
                        handleInputChange("age_of_property", e.target.value)
                      }
                      className="w-full px-3.5 py-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                    >
                      <option value="">Select Age of Property</option>
                      <option value="0-1">0-1</option>
                      <option value="2-4">2-4</option>
                      <option value="5-7">5-7</option>
                      <option value="8-10">8-10</option>
                      <option value="10+">10+</option>
                      <option value="0-1">1 to 5 Years</option>
                      <option value="2-4">5 to 10 Years</option>
                      <option value="5-7">10 to 15 Years</option>
                      <option value="8-10">15 to 20 Years</option>
                      <option value="10+">Above 20 Years</option>
                      <option value="10+">New Construction</option>
                    </select>
                  </div>
                )} */}
                  {/* {propertyType !== "Plot/Land" && (
                  <div>
                    <label className="text-[14px] font-semibold text-[#17253a]">
                      Furnishing Type{" "}
                      <span className="text-[#D61F45]">*</span>
                    </label>

                    <select
                      value={formData.furnished_type || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          furnished_type: e.target.value,
                        }))
                      }
                      className="w-full px-3.5 py-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                    >
                      <option value="">Select Furnishing Type</option>
                      <option value="Furnished">Furnished</option>
                      <option value="Semi-Furnished">Semi-Furnished</option>
                      <option value="Unfurnished">Unfurnished</option>
                    </select>

                    {errors?.furnished_type && (
                      <p className="flex items-center gap-1 mt-1 text-[12px] font-medium text-[#D61F45]">
                        <MdErrorOutline className="text-lg" />
                        {errors.furnished_type}
                      </p>
                    )}
                  </div>
                )} */}
                  {/* {buildingType === "Residential" && propertyType !== "Plot" && (
                  <div>
                    <label className="text-[14px] font-semibold text-[#17253a]">Balcony</label>

                    <select
                      name="balcony"
                      value={formData.balcony || ""}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                    >
                      <option value="">Select No. of Balconies</option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="more than 3">More than 3</option>
                    </select>
                  </div>
                )} */}

                  {/* {!(
                  (buildingType === "Residential" && propertyType === "Plot") ||
                  (buildingType === "Commercial" &&
                    [
                      "Land",
                      "Plot/Land",
                      "Warehouse",
                      "Storage",
                      "Industry",
                      "Hospitality",
                    ].includes(propertyType))
                ) && (
                  <div>
                    <label className="text-[14px] font-semibold text-[#17253a]">Balcony</label>

                    <select
                      name="balcony"
                      value={formData.balcony || ""}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                    >
                      <option value="">Select No. of Balconies</option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="more than 3">More than 3</option>
                    </select>
                  </div>
                )} */}
                  {!(
                    (buildingType === "Residential" && propertyType === "Plot/Land") ||
                    (buildingType === "Commercial" &&
                      [
                        "Land",
                        "Plot/Land",
                        "Warehouse",
                        "Storage",
                        "Industry",
                        "Hospitality",
                      ].includes(propertyType))
                  ) && (
                      <div>
                        <label className="text-[14px] font-semibold text-[#17253a]">
                          Lift Availability
                        </label>

                        <select
                          value={formData.lift_availability || ""}
                          onChange={(e) =>
                            handleInputChange("lift_availability", e.target.value)
                          }
                          className="w-full px-3.5 py-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                        >
                          <option value="">Select Lift Availability</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                    )}
                  {/* {buildingType === "Commercial" &&
                  propertyType === "Office" &&
                  [
                    "Bare shell office space",
                    "Ready to move office space",
                  ].includes(officeSubType) && (
                    <div>
                      <label className="text-[14px] font-semibold text-[#17253a]">
                        Pantry
                      </label>

                      <select
                        value={formData.pantry_option || ""}
                        onChange={(e) =>
                          handleInputChange("pantry_option", e.target.value)
                        }
                        className="w-full px-3.5 py-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                      >
                        <option value="">Select Pantry</option>
                        <option value="Wet">Wet</option>
                        <option value="Dry">Dry</option>
                        <option value="None">None</option>
                      </select>
                    </div>
                  )}

                {buildingType === "Commercial" && propertyType === "Office" && (
                  <div>
                    <label className="text-[14px] font-semibold text-[#17253a]">
                      Central AC
                    </label>

                    <select
                      value={formData.central_AC || ""}
                      onChange={(e) =>
                        handleInputChange("central_AC", e.target.value)
                      }
                      className="w-full px-3.5 py-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                    >
                      <option value="">Select Option</option>

                      {formData.office_type === "Ready to move office space" ? (
                        <>
                          <option value="Available">Available</option>

                          <option value="Not Available">Not Available</option>
                        </>
                      ) : (
                        <>
                          <option value="Duct Only">Duct Only</option>

                          <option value="Available">Available</option>

                          <option value="Not Available">Not Available</option>
                        </>
                      )}
                    </select>
                  </div>
                )}
                {buildingType === "Commercial" && propertyType === "Office" && (
                  <div>
                    <label className="text-[14px] font-semibold text-[#17253a]">
                      Reception Area
                    </label>

                    <select
                      value={formData.reception_area || ""}
                      onChange={(e) =>
                        handleInputChange("reception_area", e.target.value)
                      }
                      className="w-full px-3.5 py-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                    >
                      <option value="">Select Option</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                )} */}

                  {/* {buildingType === "Commercial" &&
                  [
                    "Office",
                    "Retail",
                    "Storage",
                    "Industry",
                    "Hospitality",
                    "Other",
                  ].includes(propertyType) && (
                    <div>
                      <label className="text-[14px] font-semibold text-[#17253a]">
                        Investment Option
                      </label>

                      <select
                        name="investment_options"
                        value={formData.investment_options || ""}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                      >
                        <option value="">Select Investment Option</option>
                        <option value="Pre-Leased Spaces">
                          Pre-Leased Spaces
                        </option>
                        <option value="Restaurants">Restaurants</option>
                        <option value="SCO Plots">SCO Plots</option>
                        <option value="Business Center">Business Center</option>
                        <option value="Food Court">Food Court</option>
                        <option value="Multiplex">Multiplex</option>
                        <option value="Co-working">Co-working</option>
                      </select>
                    </div>
                  )}
                {((buildingType === "Commercial" &&
                  [
                    "Office",
                    "Retail",
                    "Storage",
                    "Industry",
                    "Hospitality",
                    "Other",
                  ].includes(propertyType)) ||
                  (buildingType === "Residential" &&
                    propertyType === "Other")) && (
                  <div>
                    <label className="text-[14px] font-semibold text-[#17253a]">
                      Purchase Type
                    </label>

                    <select
                      name="purchase_type"
                      value={formData.purchase_type || ""}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                    >
                      <option value="">Select Purchase Type</option>
                      <option value="Resale">Resale</option>
                      <option value="New Bookings">New Bookings</option>
                    </select>
                  </div>
                )} */}
                  {/* {buildingType === "Commercial" &&
                  ["Office Space"].includes(propertyType) && (
                    <div>
                      <label className="text-[14px] font-semibold text-[#17253a]">
                        Personal Washroom
                      </label>

                      <select
                        name="personal_washroom"
                        value={formData.personal_washroom || ""}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                      >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  )} */}

                  {buildingType === "Residential" && propertyType === "PG" && (
                    <div>
                      <label className="text-[14px] font-semibold text-[#17253a]">
                        Available For{" "}
                        <span className="text-[#D61F45]">*</span>
                      </label>

                      <select
                        value={formData.available_for || ""}
                        onChange={(e) =>
                          handleInputChange("available_for", e.target.value)
                        }
                        className="w-full px-3.5 py-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                      >
                        <option value="">Select Availability</option>
                        <option value="Girls">Girls</option>
                        <option value="Boys">Boys</option>
                        <option value="Family">Family</option>
                        <option value="Single women">Single women</option>
                        <option value="Single Men">Single Men</option>
                      </select>

                      {errors?.available_for && (
                        <p className="flex items-center gap-1 mt-1 text-[12px] font-medium text-[#D61F45]">
                          <MdErrorOutline className="text-lg" />
                          {errors.available_for}
                        </p>
                      )}
                    </div>
                  )}
                  {buildingType === "Residential" && propertyType === "PG" && (
                    <div>
                      <label className="text-[14px] font-semibold text-[#17253a]">
                        Room Type <span className="text-[#D61F45]">*</span>
                      </label>

                      <select
                        value={formData.room_type || ""}
                        onChange={(e) =>
                          handleInputChange("room_type", e.target.value)
                        }
                        className="w-full px-3.5 py-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                      >
                        <option value="">Select Room Type</option>
                        <option value="Private">Private</option>
                        <option value="Sharing">Sharing</option>
                      </select>

                      {errors?.room_type && (
                        <p className="text-[12px] font-medium text-[#D61F45] mt-1">
                          {errors.room_type}
                        </p>
                      )}
                    </div>
                  )}
                  {buildingType === "Residential" &&
                    propertyType === "PG" &&
                    formData.room_type === "Sharing" && (
                      <div>
                        <label className="block mb-2 text-[14px] font-semibold text-[#17253a]">
                          How many people can share this room?
                        </label>

                        <select
                          value={formData.no_of_peoples || ""}
                          onChange={(e) =>
                            handleInputChange("no_of_peoples", e.target.value)
                          }
                          className="w-full px-3.5 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white"
                        >
                          <option value="">Select</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="4">4+</option>
                        </select>
                      </div>
                    )}
                  {buildingType === "Residential" && propertyType === "PG" && (
                    <div>
                      <label className="text-[14px] font-semibold text-[#17253a]">
                        Total Beds
                      </label>

                      <input
                        type="text"
                        value={formData.total_beds || ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d*$/.test(value)) {
                            handleInputChange("total_beds", value);
                          }
                        }}
                        className="w-full px-3.5 py-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                      />
                    </div>
                  )}
                  {buildingType === "Residential" && propertyType === "PG" && (
                    <div>
                      <label className="block mb-2 text-[14px] font-semibold text-[#17253a]">
                        Available Beds
                      </label>

                      <input
                        type="text"
                        value={formData.available_beds || ""}
                        placeholder="Enter Available Beds"
                        onChange={(e) => {
                          const value = e.target.value;

                          if (/^\d*$/.test(value)) {
                            handleInputChange("available_beds", value);
                          }
                        }}
                        className="w-full px-3.5 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white"
                      />
                    </div>
                  )}
                  {buildingType === "Residential" && propertyType === "PG" && (
                    <div className="md:col-span-3 mt-4">
                      <div className="flex flex-wrap gap-4">
                        {/* Attached Balcony */}
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={formData.attached_balcony === "Yes"}
                            onChange={(e) =>
                              handleInputChange(
                                "attached_balcony",
                                e.target.checked ? "Yes" : "No",
                              )
                            }
                          />
                          Attached Balcony
                        </label>

                        {/* Attached Bathroom */}
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={formData.attached_bathroom === "Yes"}
                            onChange={(e) =>
                              handleInputChange(
                                "attached_bathroom",
                                e.target.checked ? "Yes" : "No",
                              )
                            }
                          />
                          Attached Bathroom
                        </label>
                      </div>
                    </div>
                  )}
                  {!(
                    (buildingType === "Residential" && propertyType === "Plot/Land") ||
                    (buildingType === "Commercial" &&
                      [
                        "Land",
                        "Plot/Land",
                        "Industry",
                        "Storage",
                        "Hospitality",
                        "Retail",
                      ].includes(propertyType))
                  ) && (
                      <div>
                        <label className="text-[14px] font-semibold text-[#17253a]">
                          Parking Availability
                        </label>

                        <select
                          value={formData.parking_availability || ""}
                          onChange={(e) =>
                            handleInputChange(
                              "parking_availability",
                              e.target.value,
                            )
                          }
                          className="w-full px-3.5 py-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                        >
                          <option value="">Select Option</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                    )}
                  {!(
                    (buildingType === "Residential" && propertyType === "Plot/Land") ||
                    (buildingType === "Commercial" &&
                      [
                        "Land",
                        "Plot/Land",
                        "Industry",
                        "Storage",
                        "Hospitality",
                      ].includes(propertyType))
                  ) &&
                    formData.parking_availability === "Yes" && (
                      <div>
                        <label className="text-[14px] font-semibold text-[#17253a]">
                          Covered Car Parking
                        </label>

                        <select
                          value={formData.covered_parking || ""}
                          onChange={(e) =>
                            handleInputChange("covered_parking", e.target.value)
                          }
                          className="w-full px-3.5 py-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                        >
                          <option value="">Select Covered Car Parking</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="6+">6+</option>
                          <option value="NA">NA</option>
                        </select>
                      </div>
                    )}
                  {!(
                    (buildingType === "Residential" && propertyType === "Plot/Land") ||
                    (buildingType === "Commercial" &&
                      [
                        "Land",
                        "Plot/Land",
                        "Industry",
                        "Storage",
                        "Hospitality",
                      ].includes(propertyType))
                  ) &&
                    formData.parking_availability === "Yes" && (
                      <div>
                        <label className="text-[14px] font-semibold text-[#17253a]">
                          Open Car Parking
                        </label>

                        <select
                          value={formData.uncovered_parking || ""}
                          onChange={(e) =>
                            handleInputChange("uncovered_parking", e.target.value)
                          }
                          className="w-full px-3.5 py-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] text-[14px] text-[#17253a] bg-white border-gray-200"
                        >
                          <option value="">Select Open Car Parking</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="6+">6+</option>
                          <option value="NA">NA</option>
                        </select>
                      </div>
                    )}
                  <div className="md:col-span-3 mt-2">
                    {/* <label className="text-[14px] font-semibold text-[#17253a]">
                      Price Details
                    </label> */}

                    <div className="flex flex-wrap gap-4 mt-2">
                      {/* All Inclusive Price */}
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.all_inclusive_price === "Yes"}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              all_inclusive_price: e.target.checked
                                ? "Yes"
                                : "No",
                            })
                          }
                        />
                        All Inclusive Price
                      </label>
                      {/* Price Onwards */}
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.price_onwards === "Yes"}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              price_onwards: e.target.checked ? "Yes" : "No",
                            })
                          }
                        />
                        Price Onwards
                      </label>
                      {/* Price Negotiable */}
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.price_negotiable === "Yes"}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              price_negotiable: e.target.checked ? "Yes" : "No",
                            })
                          }
                        />
                        Price Negotiable
                      </label>

                      {/* Tax & Govt Charges */}
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.tax_and_goverment_charges === "Yes"}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              tax_and_goverment_charges: e.target.checked
                                ? "Yes"
                                : "No",
                            })
                          }
                        />
                        Tax & Government Charges Excluded
                      </label>
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-white border border-[#FAD3DB] rounded-2xl">
                  {/* Header Section */}
                  <SectionHeader
                    icon={Sparkle}
                    title="Generate Project Information"
                    accent="with AI"
                    subtitle="Details about the project, including an overview and description that provides insight into the project's purpose, goals, and unique aspects."
                  />

                  {/* Form Grid */}
                  <div className="grid grid-cols-1">
                    {/* About Project */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-[14px] font-semibold text-[#17253a]">
                          About Project
                        </label>
                        <button
                          type="button"
                          onClick={generateDescription}
                          disabled={isGeneratingDescription}
                          className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold text-white transition rounded-xl bg-gradient-to-r from-[#D61F45] to-[#B91C3C] shadow-[0_4px_12px_rgba(214,31,69,0.3)] disabled:opacity-50"
                        >
                          <Sparkle size={15} weight="fill" />
                          {isGeneratingDescription
                            ? "Generating..."
                            : "Generate Description"}
                        </button>
                      </div>

                      <div className="relative w-full mt-1">
                        <textarea
                          value={description}
                          maxLength={800}
                          onChange={(e) => {
                            const value = e.target.value;
                            setDescription(value);
                          }}
                          placeholder="Enter Project Description"
                          className="w-full h-40 px-3.5 py-3 pb-7 pr-16 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] resize-none block text-[14px] text-[#17253a] bg-white"
                        />
                        <span className="absolute bottom-2 right-3 text-xs text-gray-400 pointer-events-none select-none z-10">
                          {(description || "").length}/800
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeStep === 3 && (
            <>
              <div className={sectionCard}>
                {/* Title & Subtitle */}
                <SectionHeader
                  icon={Star}
                  title="Amenities"
                  subtitle={`Select the amenities available in your project · ${selectedAmenities.length} selected`}
                />

                {/* Error Message for Amenities */}
                {errors.amenities && (
                  <p className="flex items-center gap-1 mb-4 text-[12px] font-medium text-[#D61F45]">
                    <MdErrorOutline className="text-lg" />
                    {errors.amenities}
                  </p>
                )}

                {/* Amenities List */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                  {amenitiesList.map((amenity, index) => (
                    <label
                      key={index}
                      className={`flex items-center gap-3 px-3 py-3 transition border cursor-pointer rounded-xl ${selectedAmenities.includes(amenity._id)
                        ? "bg-[#FFF1F4] border-[#D61F45]"
                        : "bg-white border-gray-200 hover:border-[#D61F45]"
                        }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedAmenities.includes(amenity._id)}
                        onChange={() => toggleAmenity(amenity._id)}
                        className="w-5 h-5 text-[#D61F45] border-gray-200 form-checkbox focus:ring-[#FDE8EC]"
                      />
                      <span
                        className={`text-gray-700 ${selectedAmenities.includes(amenity._id) ? "text-[#D61F45] font-semibold" : ""}`}
                      >
                        {amenity.amenity_name}
                      </span>
                    </label>
                  ))}

                </div>
              </div>
            </>
          )}

          {activeStep === 4 && (
            <div>
              <div className={sectionCard}>
                <SectionHeader
                  icon={Images}
                  title="Photos / Videos"
                  subtitle="Add your logo, cover photo, gallery, video and brochure."
                />
              </div>
              {/* Company Logo Upload */}
              <div className="p-5 mb-5 bg-white border border-[#F3D7DD] md:p-6 rounded-2xl shadow-[0_10px_30px_rgba(214,31,69,0.06)]">
                <h2 className="m-0 text-lg font-bold text-[#17253a]">Upload Company Logo</h2>
                <p className="mt-1 text-gray-500">
                  Upload your project's or company's logo here.
                </p>
                <div
                  className="relative flex flex-col items-center p-6 mt-4 border-2 border-[#FAD3DB] border-dashed bg-[#FFF7F9] rounded-xl"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files[0];
                    if (file && file.type.startsWith("image/"))
                      setCompanyLogo(file);
                  }}
                >
                  {companyLogo ? (
                    <div className="relative w-32 h-32">
                      <img
                        src={companyLogoUrl}
                        alt="Company Logo"
                        className="object-contain w-full h-full border rounded text-[14px] text-[#17253a] outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] bg-white border-gray-200"
                      />
                      <button
                        onClick={() => setCompanyLogo(null)}
                        className="absolute flex items-center justify-center w-6 h-6 text-white bg-black bg-opacity-50 rounded-full top-1 right-1"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <MdOutlineDriveFolderUpload className="text-6xl text-[#D61F45]" />
                      <p className="mt-2 text-gray-700">
                        Drag & Drop or Click to Upload Logo
                      </p>
                      <button
                        onClick={() => companyLogoInputRef.current.click()}
                        className="px-4 py-2 mt-3 text-white bg-[#D61F45] rounded-xl hover:bg-[#B91C3C]"
                      >
                        + Upload Logo
                      </button>
                      <p className="mt-2 text-xs text-center text-gray-400">
                        Accepted formats: .jpg, .png, .jpeg | Max size: 5MB
                      </p>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    ref={companyLogoInputRef}
                    onChange={(e) =>
                      e.target.files[0] && setCompanyLogo(e.target.files[0])
                    }
                    className="hidden"
                  />
                </div>
                {errors.companyLogo && (
                  <p className="flex items-center gap-1 mt-2 text-[12px] font-medium text-[#D61F45]">
                    <MdErrorOutline className="text-lg" />
                    {errors.companyLogo}
                  </p>
                )}
              </div>

              {/* Cover Photo and Video */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Cover Image Upload */}
                <div
                  className="p-5 mb-5 bg-white border border-[#F3D7DD] md:p-6 rounded-2xl shadow-[0_10px_30px_rgba(214,31,69,0.06)]"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files[0];
                    if (file && file.type.startsWith("image/"))
                      setCoverImage(file);
                  }}
                >
                  <h2 className="m-0 text-lg font-bold text-[#17253a]">
                    Upload Project Cover Photo
                  </h2>
                  <p className="mt-1 text-gray-500">
                    This step allows users to upload cover photo.
                  </p>
                  <div className="relative flex flex-col items-center p-6 mt-4 border-2 border-[#FAD3DB] border-dashed bg-[#FFF7F9] rounded-xl">
                    {coverImage ? (
                      <div className="relative w-full">
                        <img
                          src={coverImageUrl}
                          alt="Cover"
                          className="object-cover w-full h-64 rounded-xl"
                        />
                        <button
                          onClick={handelCoverImageDelete}
                          className="absolute p-1 bg-black bg-opacity-50 rounded-full top-2 right-2"
                        >
                          <Trash className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <MdOutlineDriveFolderUpload className="text-7xl text-[#D61F45]" />
                        <p className="mt-2 text-gray-500">
                          Drag and Drop Image or Upload
                        </p>
                        <button
                          onClick={() => imageInputRef.current.click()}
                          className="px-4 py-2 mt-2 text-white bg-[#D61F45] rounded-xl hover:bg-[#B91C3C]"
                        >
                          + Add Photo
                        </button>
                        <p className="mt-2 text-xs text-center text-gray-400">
                          Accepted formats: .jpg, .gif, .bmp, .png | Max size:
                          50MB
                        </p>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      ref={imageInputRef}
                      onChange={(e) => setCoverImage(e.target.files[0])}
                      className="hidden"
                    />
                  </div>
                  {errors.coverImage && (
                    <p className="flex items-center gap-1 mt-2 text-[12px] font-medium text-[#D61F45]">
                      <MdErrorOutline className="text-lg" />
                      {errors.coverImage}
                    </p>
                  )}
                </div>

                {/* Video Upload */}
                <div className="flex flex-col gap-6">
                  <div
                    className="p-5 mb-5 bg-white border border-[#F3D7DD] md:p-6 rounded-2xl shadow-[0_10px_30px_rgba(214,31,69,0.06)]"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const file = e.dataTransfer.files[0];
                      if (file && file.type.startsWith("video/"))
                        handleVideoUpload({ target: { files: [file] } });
                    }}
                  >
                    <h2 className="m-0 text-lg font-bold text-[#17253a]">
                      Upload Project Video
                    </h2>
                    <p className="mt-1 text-gray-500">
                      Upload a video showcasing the project.
                    </p>
                    {video ? (
                      <div className="relative">
                        <video
                          controls
                          src={video}
                          className="object-cover w-full rounded-xl h-72"
                        />
                        <button
                          onClick={handleVideoDelete}
                          className="px-4 py-2 mt-4 text-white bg-[#D61F45] rounded-xl hover:bg-[#B91C3C]"
                        >
                          <Trash className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => videoInputRef.current.click()}
                        className="px-4 py-2 mt-4 text-white bg-[#D61F45] rounded-xl hover:bg-[#B91C3C]"
                      >
                        Upload Video
                      </button>
                    )}
                    <input
                      ref={videoInputRef}
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                    />
                  </div>

                  {/* Video URL Option */}
                  <div className="p-5 mb-5 bg-white border border-[#F3D7DD] md:p-6 rounded-2xl shadow-[0_10px_30px_rgba(214,31,69,0.06)]">
                    <h2 className="m-0 text-lg font-bold text-[#17253a]">Video Option</h2>
                    <div className="flex gap-4 mt-4">
                      <div className="w-1/2">
                        <label className="block mb-2 text-gray-700">
                          Select Video Source
                        </label>
                        <select
                          value={videoSource}
                          onChange={(e) => setVideoSource(e.target.value)}
                          className="w-full px-3.5 py-3 border border-gray-200 rounded-xl text-[14px] text-[#17253a] outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] bg-white"
                        >
                          <option value="">Select</option>
                          <option value="YouTube">YouTube</option>
                          <option value="Vimeo">Vimeo</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="w-1/2">
                        <label className="block mb-2 text-gray-700">
                          Enter Video URL
                        </label>
                        <input
                          type="text"
                          value={videoURL}
                          onChange={(e) => setVideoURL(e.target.value)}
                          className="w-full px-3.5 py-3 border border-gray-200 rounded-xl text-[14px] text-[#17253a] outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Images and Virtual Tour */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Property Images */}
                <div className="p-5 mb-5 bg-white border border-[#F3D7DD] md:p-6 rounded-2xl shadow-[0_10px_30px_rgba(214,31,69,0.06)]">
                  <h2 className="m-0 text-lg font-bold text-[#17253a]">
                    Upload Project Images
                  </h2>
                  <p className="mt-1 text-gray-500">
                    Add multiple images to showcase the Project.
                  </p>
                  <div
                    className="flex flex-col items-center p-8 mt-4 border-2 border-[#FAD3DB] border-dashed bg-[#FFF7F9] rounded-xl"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const dropped = Array.from(e.dataTransfer.files).filter(
                        (file) => file.type.startsWith("image/"),
                      );
                      if (dropped.length > 0)
                        handleImageUpload2({ target: { files: dropped } });
                    }}
                  >
                    <MdOutlineDriveFolderUpload className="text-7xl text-[#D61F45]" />
                    <p className="mt-2 text-gray-700">
                      Drag and Drop or Upload
                    </p>
                    <button
                      onClick={() => imageInputRef2.current.click()}
                      className="px-4 py-2 mt-3 text-white bg-[#D61F45] rounded-xl hover:bg-[#B91C3C]"
                    >
                      + Add Photos
                    </button>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      ref={imageInputRef2}
                      onChange={handleImageUpload2}
                      className="hidden"
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-3 mt-6">
                    {images.map((img, index) => (
                      <div key={index} className="relative">
                        <img
                          src={img}
                          alt={`img-${index}`}
                          className="object-cover w-full h-24 rounded-xl"
                        />
                        <button
                          onClick={() => handleDelete(index)}
                          className="absolute p-1 bg-black bg-opacity-50 rounded-xl top-1 right-1"
                        >
                          <Trash className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Virtual Tour + Brochure */}
                <div className="flex flex-col gap-6">
                  <div className="p-5 mb-5 bg-white border border-[#F3D7DD] md:p-6 rounded-2xl shadow-[0_10px_30px_rgba(214,31,69,0.06)]">
                    <h2 className="m-0 text-lg font-bold text-[#17253a]">
                      Virtual Tour
                    </h2>
                    <p className="mt-1 text-gray-500">
                      Is a virtual tour available?
                    </p>
                    <select
                      value={virtualTourLink}
                      onChange={(e) => setVirtualTourLink(e.target.value)}
                      className="w-full px-3.5 py-3 mt-2 border border-gray-200 rounded-xl text-[14px] text-[#17253a] outline-none focus:ring-2 focus:ring-[#FDE8EC] focus:border-[#D61F45] bg-white"
                    >
                      {/* <option value="">Select Virtual Tour Available?</option> */}
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </div>

                  {/* Brochure Upload */}
                  <div
                    className="flex flex-col items-center p-8 border-2 border-[#FAD3DB] border-dashed bg-[#FFF7F9] rounded-xl"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const file = e.dataTransfer.files[0];
                      if (
                        file &&
                        (file.type === "application/pdf" ||
                          file.type.startsWith("image/"))
                      ) {
                        handleBrochureUpload({ target: { files: [file] } });
                      }
                    }}
                  >
                    <MdOutlineDriveFolderUpload className="text-7xl text-[#D61F45]" />
                    <p className="mt-2 text-gray-700">
                      Upload Brochure (PDF/Image)
                    </p>
                    {brochureDoc && (
                      <div className="relative flex flex-col items-center w-full mt-4">
                        <button
                          onClick={handleBrochureDelete}
                          className="absolute top-0 right-0 z-10 flex items-center justify-center w-6 h-6 text-white bg-black bg-opacity-50 rounded-full"
                          title="Delete Brochure"
                        >
                          <Trash className="w-4 h-4 text-white" />
                        </button>
                        {brochureDoc.type === "application/pdf" ? (
                          <div className="flex items-center gap-2">
                            <FaFilePdf className="text-lg text-red-600" />
                            <span className="text-sm text-gray-600">
                              {brochureDoc.name}
                            </span>
                          </div>
                        ) : (
                          <img
                            src={brochureUrl}
                            alt="Brochure Preview"
                            className="w-48 h-auto rounded shadow"
                          />
                        )}
                      </div>
                    )}
                    {!brochureDoc && (
                      <button
                        onClick={() => brochureInputRef.current.click()}
                        className="px-4 py-2 mt-3 text-white bg-[#D61F45] rounded-xl hover:bg-[#B91C3C]"
                      >
                        + Upload Brochure
                      </button>
                    )}
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      ref={brochureInputRef}
                      onChange={handleBrochureUpload}
                      className="hidden"
                    />
                    <p className="mt-2 text-xs text-center text-gray-400">
                      Accepted formats: .jpg, .png, .jpeg, .pdf | Max size: 50MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons - Fixed at Bottom */}
          <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur border-t border-gray-200 shadow-[0_-6px_24px_rgba(23,37,58,0.06)]">
            <div className="flex items-center justify-between gap-3 px-4 py-3 mx-auto md:py-4 max-w-6xl md:px-6">
              {activeStep > 0 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center gap-2 px-5 py-3 md:px-8 text-[15px] font-semibold text-[#D61F45] bg-white border-[1.5px] border-[#D61F45] rounded-xl hover:bg-[#FDE8EC] transition-colors"
                >
                  <ArrowLeft size={18} weight="bold" />
                  Back
                </button>
              ) : (
                <span />
              )}

              <span className="hidden text-[13px] font-medium text-gray-500 sm:block">
                Step <span className="font-bold text-[#D61F45]">{activeStep + 1}</span> of {steps.length}
              </span>

              {activeStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={() => {
                    const isValid = validateStepFields();
                    if (isValid) {
                      handleNext();
                    } else {
                      // FIX: tell the user why nothing happened
                      toast.error("Please fill all required fields.");
                    }
                  }}
                  className="flex items-center gap-2 px-7 py-3 md:px-12 text-[16px] font-semibold text-white rounded-xl bg-gradient-to-r from-[#B91C3C] to-[#9B1734] shadow-[0_6px_18px_rgba(185,28,60,0.35)] hover:from-[#D61F45] hover:to-[#B91C3C] transition-all"
                >
                  Continue
                  <ArrowRight size={18} weight="bold" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-7 py-3 md:px-12 text-[16px] font-semibold text-white rounded-xl bg-gradient-to-r from-[#D61F45] to-[#B91C3C] shadow-[0_6px_18px_rgba(214,31,69,0.35)] disabled:opacity-60 disabled:cursor-wait transition-all"
                >
                  {isSubmitting ? (
                    <span className="w-4 h-4 border-2 rounded-full border-white/40 border-t-white animate-spin" />
                  ) : (
                    <PaperPlaneTilt size={18} weight="fill" />
                  )}
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {showUpcomingProjectCount && (
        <div className="fixed inset-0 z-[1100] flex items-center justify-center px-4 bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 text-center bg-white shadow-2xl rounded-3xl">
            <div className="flex items-center justify-center mx-auto mb-3 rounded-full w-14 h-14 bg-[#FDE8EC] text-[#D61F45]">
              <WarningCircle size={28} weight="fill" />
            </div>
            <h2 className="mb-2 text-xl font-bold text-[#17253a]">
              Project Posting Limit Reached
            </h2>
            <p className="mb-6 text-sm text-gray-500">
              You have reached your maximum limit for posting projects. Please
              purchase a plan to continue creating new projects.
            </p>
            {/* Align buttons at opposite ends with padding */}
            <div className="grid grid-cols-2 gap-3">
              <button
                className="order-2 py-2.5 font-semibold text-white rounded-xl bg-gradient-to-r from-[#D61F45] to-[#B91C3C] shadow-[0_6px_18px_rgba(214,31,69,0.35)]"
                onClick={() => {
                  setShowUpcomingProjectCount(false);
                  history.push({
                    pathname: "/dashboard",
                    state: { page: "mySubscriptions" },
                  });
                }}
              >
                Purchase Plan
              </button>
              <button
                className="order-1 py-2.5 font-semibold text-[#D61F45] bg-white border-[1.5px] border-[#D61F45] rounded-xl hover:bg-[#FDE8EC]"
                onClick={() => {
                  setShowUpcomingProjectCount(false);
                  history.push("/");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showFeaturePopup && (
        <div className="fixed inset-0 z-[1100] flex items-center justify-center px-4 bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 text-center bg-white shadow-2xl rounded-3xl">
            <div className="flex items-center justify-center mx-auto mb-3 rounded-full w-14 h-14 bg-[#FDE8EC] text-[#D61F45]">
              <Crown size={28} weight="fill" />
            </div>
            <h2 className="mb-2 text-xl font-bold text-[#17253a]">
              Purchase feature Subscription Plan
            </h2>
            <p className="mb-6 text-sm text-gray-500">
              Please purchase a plan to feature more properties and showcase
              your project in the top projects.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                className="order-2 py-2.5 font-semibold text-white rounded-xl bg-gradient-to-r from-[#D61F45] to-[#B91C3C] shadow-[0_6px_18px_rgba(214,31,69,0.35)]"
                onClick={() => {
                  setShowFeaturePopup(false);
                  history.push({
                    pathname: "/dashboard",
                    state: { page: "mySubscriptions" },
                  });
                }}
              >
                Purchase Plan
              </button>
              <button
                className="order-1 py-2.5 font-semibold text-[#D61F45] bg-white border-[1.5px] border-[#D61F45] rounded-xl hover:bg-[#FDE8EC]"
                onClick={() => {
                  setShowFeaturePopup(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default AddNewProject;

