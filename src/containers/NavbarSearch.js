// import React, { useContext, useEffect, useRef, useState } from "react";
// import { useHistory, useLocation } from "react-router-dom";
// import axios from "axios";
// import { FiSearch } from "react-icons/fi";
// import { SearchContext } from "../containers/SearchContext";

// const NavbarSearch = () => {
//     const history = useHistory();
//     const location = useLocation();

//     const { searchCity, setSearchCity } = useContext(SearchContext);

//     const [searchQuery, setSearchQuery] = useState(() => {
//         return location.pathname === "/searchdashboard"
//             ? location.state?.searchQuery || ""
//             : "";
//     });
//     const [suggestions, setSuggestions] = useState([]);
//     const [showSuggestions, setShowSuggestions] = useState(false);
//     const [type, setType] = useState("");
//     const [error, setError] = useState("");

//     const inputRef = useRef(null);

//     useEffect(() => {
//         const showSearchBar =
//             [
//                 "/searchdashboard",
//                 "/property",
//                 "/advisordashboard",
//                 "/featuredDashboard",
//                 "/recommendedpropertiesDashboard",
//             ].includes(location.pathname) ||
//             location.pathname.startsWith("/citywiseproperties");

//         if (!showSearchBar) {
//             setSearchCity("");
//             setSearchQuery("");
//             setSuggestions([]);
//             setShowSuggestions(false);
//         }
//     }, [location.pathname, setSearchCity]);

//     useEffect(() => {
//         if (
//             location.pathname === "/searchdashboard" &&
//             location.state?.searchQuery !== undefined
//         ) {
//             setSearchQuery(location.state.searchQuery);
//         }
//     }, [location.pathname, location.state]);

//     const handleSearchChange = async (e) => {
//         const value = e.target.value;

//         setSearchQuery(value);

//         if (!value.trim()) {
//             setSuggestions([]);
//             setShowSuggestions(false);
//             return;
//         }

//         try {
//             const response = await axios.post(
//                 `${process.env.REACT_APP_API_URL}/cust_api/search_suggestions`,
//                 {
//                     query: value,
//                 }
//             );

//             if (response.data.status === 1) {
//                 setSuggestions(response.data.data);
//                 setShowSuggestions(true);
//             } else {
//                 setSuggestions([]);
//                 setShowSuggestions(false);
//             }
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const handleSearch = () => {
//         if (!searchQuery && !searchCity && !type) {
//             setError("Please enter what you're looking for.");
//             return;
//         }

//         setError("");

//         history.push({
//             pathname: "/searchdashboard",
//             state: {
//                 searchCity,
//                 searchQuery,
//                 type,
//             },
//         });
//     };

//     return (
//         <div className="relative flex items-center w-full max-w-md">
//             <div className="flex items-center w-full bg-white border border-gray-300 rounded-lg shadow-sm">
//                 <FiSearch className="ml-3 text-gray-500" size={20} />

//                 <input
//                     ref={inputRef}
//                     type="text"
//                     placeholder="Search property, location, BHK..."
//                     className="flex-1 px-3 py-2 bg-transparent outline-none"
//                     value={searchQuery}
//                     onChange={handleSearchChange}
//                     onKeyDown={(e) => {
//                         if (e.key === "Enter") {
//                             handleSearch();
//                         }
//                     }}
//                 />

//                 <button
//                     onClick={handleSearch}
//                     className="px-4 py-2 text-white rounded-r-lg my-bg hover:opacity-90"
//                 >
//                     Search
//                 </button>
//             </div>

//             {showSuggestions && suggestions.length > 0 && (
//                 <div className="absolute left-0 right-0 z-50 mt-1 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg top-full max-h-72">
//                     {suggestions.map((item, index) => (
//                         <div
//                             key={index}
//                             className="px-4 py-3 cursor-pointer hover:bg-gray-100 border-b last:border-b-0"
//                             onClick={() => {
//                                 setSearchQuery(item.text);
//                                 setShowSuggestions(false);
//                             }}
//                         >
//                             {item.text}
//                         </div>
//                     ))}
//                 </div>
//             )}

//             {error && (
//                 <div className="absolute left-0 text-sm text-red-500 top-full mt-20">
//                     {error}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default NavbarSearch;





// ===========================================



import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { FiSearch, FiArrowRight, FiMapPin } from "react-icons/fi";
import { SearchContext } from "../containers/SearchContext";

/* Brand colour: #D61F45  (hover/dark #B8183A, soft tint #FDECEF) */

const SEARCH_PAGES = [
    "/searchdashboard",
    "/property",
    "/advisordashboard",
    "/featuredDashboard",
    "/recommendedpropertiesDashboard",
];

const NavbarSearch = () => {
    const history = useHistory();
    const location = useLocation();
    const { searchCity, setSearchCity } = useContext(SearchContext);

    const [searchQuery, setSearchQuery] = useState(() =>
        location.pathname === "/searchdashboard"
            ? location.state?.searchQuery || ""
            : ""
    );
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [type] = useState("");
    const [error, setError] = useState("");

    const containerRef = useRef(null);
    const inputRef = useRef(null);
    // Value that was set by code (suggestion click / route state) – no suggestion
    // request is needed for it.
    const skipValueRef = useRef(null);
    // True only while the user is typing -> allows live (automatic) search.
    const userTypedRef = useRef(false);

    /* ---------- Reset when leaving pages that show the search bar ---------- */
    useEffect(() => {
        const showSearchBar =
            SEARCH_PAGES.includes(location.pathname) ||
            location.pathname.startsWith("/citywiseproperties");

        if (!showSearchBar) {
            setSearchCity("");
            setSearchQuery("");
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }, [location.pathname, setSearchCity]);

    /* ---------- Sync query from route state ---------- */
    useEffect(() => {
        if (
            location.pathname === "/searchdashboard" &&
            location.state?.searchQuery !== undefined
        ) {
            skipValueRef.current = location.state.searchQuery;
            setSearchQuery(location.state.searchQuery);
        }
    }, [location.pathname, location.state]);

    /* ---------- Debounced suggestions ---------- */
    useEffect(() => {
        if (skipValueRef.current === searchQuery) return undefined;
        skipValueRef.current = null;

        const value = searchQuery.trim();
        if (!value) {
            setSuggestions([]);
            setShowSuggestions(false);
            return undefined;
        }

        let active = true; // ignore stale responses
        const timer = setTimeout(async () => {
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_API_URL}/cust_api/search_suggestions`,
                    { query: value }
                );
                if (!active) return;

                if (response.data.status === 1 && response.data.data?.length) {
                    setSuggestions(response.data.data);
                    setShowSuggestions(true);
                    setActiveIndex(-1);
                } else {
                    setSuggestions([]);
                    setShowSuggestions(false);
                }
            } catch (err) {
                if (active) {
                    console.error("Search suggestions error:", err);
                    setSuggestions([]);
                    setShowSuggestions(false);
                }
            }
        }, 300);

        return () => {
            active = false;
            clearTimeout(timer);
        };
    }, [searchQuery]);

    /* ---------- Live search: properties show automatically while typing ---------- */
    useEffect(() => {
        if (!userTypedRef.current) return undefined;

        const query = searchQuery.trim();
        const onResultsPage = location.pathname === "/searchdashboard";

        // Do not leave the current page for a single character
        if (query.length > 0 && query.length < 2) return undefined;
        // Input cleared on a non-results page -> nothing to show
        if (!query && !onResultsPage) return undefined;

        const timer = setTimeout(() => {
            userTypedRef.current = false;
            const target = {
                pathname: "/searchdashboard",
                state: { searchCity, searchQuery: query, type },
            };
            // replace -> no history spam while typing
            if (onResultsPage) history.replace(target);
            else history.push(target);
        }, 600);

        return () => clearTimeout(timer);
    }, [searchQuery, searchCity, type, location.pathname, history]);

    /* ---------- Close dropdown on outside click ---------- */
    useEffect(() => {
        const onClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", onClickOutside);
        return () => document.removeEventListener("mousedown", onClickOutside);
    }, []);

    /* ---------- Actions ---------- */
    const runSearch = (queryOverride) => {
        const query = (queryOverride ?? searchQuery).trim();

        if (!query && !searchCity && !type) {
            setError("Please enter what you're looking for.");
            inputRef.current?.focus();
            return;
        }

        setError("");
        setShowSuggestions(false);
        userTypedRef.current = false;

        history.push({
            pathname: "/searchdashboard",
            state: { searchCity, searchQuery: query, type },
        });
    };

    const selectSuggestion = (item) => {
        userTypedRef.current = false; // runSearch below handles navigation
        skipValueRef.current = item.text;
        setSearchQuery(item.text);
        setShowSuggestions(false);
        setActiveIndex(-1);
        runSearch(item.text);
    };

    const handleChange = (e) => {
        userTypedRef.current = true;
        setSearchQuery(e.target.value);
        if (error) setError("");
    };

    const handleKeyDown = (e) => {
        const open = showSuggestions && suggestions.length > 0;

        if (e.key === "ArrowDown" && open) {
            e.preventDefault();
            setActiveIndex((i) => (i + 1) % suggestions.length);
        } else if (e.key === "ArrowUp" && open) {
            e.preventDefault();
            setActiveIndex((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (open && activeIndex >= 0) selectSuggestion(suggestions[activeIndex]);
            else runSearch();
        } else if (e.key === "Escape") {
            setShowSuggestions(false);
        }
    };

    /* ---------- UI ---------- */
    return (
        <div ref={containerRef} className="relative w-full max-w-2xl">
            {/* Search bar */}
            <div
                className={`flex h-12 items-stretch overflow-hidden rounded-full border bg-white shadow-[0_8px_24px_rgba(214,31,69,0.12)] transition focus-within:border-[#D61F45]/40 focus-within:ring-2 focus-within:ring-[#D61F45]/20 ${error ? "border-[#D61F45]" : "border-gray-200"
                    }`}
            >
                {/* Icon tile */}
                <div className="my-1.5 ml-2 flex w-9 shrink-0 items-center justify-center rounded-xl bg-[#FDECEF]">
                    <FiSearch className="text-[#D61F45]" size={18} />
                </div>

                {/* Divider */}
                <span className="mx-3 my-3 w-px shrink-0 bg-gray-200" />

                {/* Input */}
                <input
                    ref={inputRef}
                    type="text"
                    role="combobox"
                    aria-expanded={showSuggestions}
                    aria-autocomplete="list"
                    aria-label="Search property, location, BHK"
                    placeholder="Search property, location, BHK..."
                    className="min-w-0 flex-1 bg-transparent text-[15px] text-gray-800 outline-none placeholder:text-gray-400"
                    value={searchQuery}
                    onChange={handleChange}
                    onFocus={() =>
                        suggestions.length > 0 && setShowSuggestions(true)
                    }
                    onKeyDown={handleKeyDown}
                />

                {/* Search button */}
                <button
                    type="button"
                    onClick={() => runSearch()}
                    className="flex shrink-0 items-center gap-2 rounded-l-2xl rounded-r-full bg-gradient-to-br from-[#D61F45] to-[#B8183A] px-5 text-base font-semibold text-white transition hover:from-[#C41B3E] hover:to-[#A31434] sm:px-7"
                >
                    <span className="hidden sm:inline">Search</span>
                    <FiArrowRight size={20} />
                </button>
            </div>

            {/* Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
                <ul
                    role="listbox"
                    className="absolute left-0 right-0 top-full z-50 m-0 mt-2 max-h-72 list-none overflow-y-auto rounded-2xl border border-gray-100 bg-white p-1.5 shadow-xl"
                >
                    {suggestions.map((item, index) => (
                        <li
                            key={`${item.text}-${index}`}
                            role="option"
                            aria-selected={index === activeIndex}
                            onMouseEnter={() => setActiveIndex(index)}
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => selectSuggestion(item)}
                            className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-800 ${index === activeIndex ? "bg-[#FDECEF]" : ""
                                }`}
                        >
                            <FiMapPin className="shrink-0 text-[#D61F45]" size={16} />
                            <span className="truncate">{item.text}</span>
                        </li>
                    ))}
                </ul>
            )}

            {/* Error */}
            {error && (
                <p className="absolute left-4 top-full m-0 mt-1 text-sm text-[#D61F45]">
                    {error}
                </p>
            )}
        </div>
    );
};

export default NavbarSearch;