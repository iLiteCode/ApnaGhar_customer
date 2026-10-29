// ===== NEW (UI only): values the card reads more than once =====
const { badgeText, badgeColor } = getCategoryBadge(property);
const isRentLike =
    property.property_category_type === "Rent" ||
    property.property_category_type === "PG/Co-living";
const isFeatured =
    String(property.mark_as_featured).trim().toLowerCase() === "yes";
const hasOwnerImage =
    property.property_owner_image &&
    !property.property_owner_image.includes("default_profile");
const shareUrl = `${window.location.origin}/propertydetails/${property._id}`;

return (
    <div
        key={property._id}
        className={`flex flex-col h-full w-full min-w-0 p-2 overflow-hidden bg-white rounded-[22px] border transition-all duration-300 ${hoveredPropertyId === property._id
            ? "border-[#D61F45]/40 shadow-[0_14px_36px_rgba(214,31,69,0.16)] -translate-y-0.5"
            : "border-[#F1E4E8] shadow-[0_6px_22px_rgba(17,24,39,0.07)]"
            }`}
        onMouseEnter={() =>
            setHoveredPropertyId(property._id)
        }
        onMouseLeave={() => setHoveredPropertyId(null)}
    >
        {/* ===== IMAGE ===== */}
        <div className="relative w-full overflow-hidden rounded-2xl flex-shrink-0">
            <Link
                to={`/propertydetails/${property._id}`}
                className="block overflow-hidden no-underline bg-white hover:no-underline"
            >
                {1 + (property?.property_images?.length || 0) >
                    1 ? (
                    <Slider
                        dots
                        infinite
                        speed={500}
                        slidesToShow={1}
                        slidesToScroll={1}
                        arrows
                        autoplay
                        autoplaySpeed={2000}
                        beforeChange={(current, next) =>
                            setActiveIndexes((prev) => ({
                                ...prev,
                                [property._id]: next,
                            }))
                        }
                        initialSlide={
                            activeIndexes[property._id] || 0
                        }
                        customPaging={(i) => {
                            const activeSlide =
                                activeIndexes[property._id] || 0;
                            const totalImages =
                                1 +
                                (property?.property_images?.length || 0);
                            const isActive =
                                i === activeSlide % totalImages;
                            return (
                                <div
                                    style={{
                                        width: "7px",
                                        height: "7px",
                                        borderRadius: "50%",
                                        background: isActive
                                            ? "#F5B301"
                                            : "rgba(255,255,255,0.85)",
                                        margin: "0 3px",
                                        cursor: "pointer",
                                    }}
                                />
                            );
                        }}
                        appendDots={(dots) => {
                            const totalImages =
                                1 +
                                (property?.property_images?.length || 0);
                            const visibleDots = dots.slice(
                                0,
                                totalImages,
                            );
                            return (
                                <div
                                    style={{
                                        position: "absolute",
                                        bottom: "10px",
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        display: "flex",
                                        justifyContent: "center",
                                        width: "100%",
                                    }}
                                >
                                    {visibleDots}
                                </div>
                            );
                        }}
                        className="rounded-2xl"
                    >
                        {/* First slide: cover image */}
                        <div key={`cover-${property._id}`}>
                            <img
                                src={property.cover_image}
                                alt="Cover"
                                className="w-full aspect-video object-cover rounded-2xl"
                            />
                        </div>

                        {/* Other property images */}
                        {(property?.property_images || []).map(
                            (imgObj) => (
                                <div key={imgObj._id}>
                                    <img
                                        src={imgObj.image}
                                        alt="Property"
                                        className="w-full aspect-video object-cover rounded-2xl"
                                    />
                                </div>
                            ),
                        )}
                    </Slider>
                ) : (
                    // Just one image — no slider
                    <div>
                        <img
                            src={property.cover_image}
                            alt="Cover"
                            className="w-full aspect-video object-cover rounded-2xl"
                        />
                    </div>
                )}
            </Link>

            {/* Top-left: category pill (+ Verified / Ready to Move under it) */}
            <div className="absolute z-20 flex flex-col items-start gap-1.5 top-2.5 left-2.5 max-w-[55%]">
                {badgeText && (
                    <span
                        className={`inline-flex items-center gap-1.5 max-w-full px-3 py-1.5 text-[11px] font-bold tracking-wide text-white rounded-full shadow-md ${badgeColor}`}
                    >
                        <Home size={13} strokeWidth={2.4} className="flex-shrink-0" />
                        <span className="truncate">{badgeText}</span>
                    </span>
                )}

                {property.admin_approval === "Approved" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-semibold text-[#D61F45] bg-white/95 rounded-full shadow">
                        ✓ Verified
                    </span>
                )}

                {property.construction_status === "Ready to Move" && (
                    <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-semibold text-white bg-green-600 rounded-full shadow whitespace-nowrap">
                        Ready to Move
                    </span>
                )}
            </div>

            {/* Top-right: Virtual Tour + Share + Favourite */}
            <div className="absolute z-20 flex items-center gap-1.5 top-2.5 right-2.5">
                {property.virtual_tour_availability === "Yes" && (
                    <span className="flex items-center gap-1.5 h-8 px-2.5 text-[11px] font-medium text-white rounded-full bg-[#1F2937]/70 backdrop-blur-sm whitespace-nowrap">
                        <PiCubeFocus className="text-sm text-white flex-shrink-0" />
                        <span className="hidden sm:inline">Virtual Tour</span>
                    </span>
                )}

                <button
                    type="button"
                    aria-label="Share property"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        openShareModal1(shareUrl, property._id);
                    }}
                    className="flex items-center justify-center flex-shrink-0 w-8 h-8 text-white transition-colors rounded-full bg-[#1F2937]/70 backdrop-blur-sm hover:bg-[#D61F45]"
                >
                    <FontAwesomeIcon icon={faShareNodes} className="text-[13px]" />
                </button>

                <button
                    type="button"
                    aria-label="Add to favourites"
                    onClick={(e) => {
                        e.stopPropagation();
                        if (!accessToken) {
                            setIsLoginModalOpen(true);
                            return;
                        }
                        e.preventDefault();
                        if (property.is_favorite) {
                            removeFromFavorites(property.favorite_id);
                        } else {
                            addToFavorites(property._id);
                        }
                    }}
                    className="flex items-center justify-center flex-shrink-0 w-8 h-8 transition-colors rounded-full bg-[#1F2937]/70 backdrop-blur-sm hover:bg-[#1F2937]/85"
                >
                    <Heart
                        size={17}
                        stroke={property.is_favorite ? "none" : "white"}
                        fill={property.is_favorite ? "#FF3B5C" : "transparent"}
                        strokeWidth={2}
                    />
                </button>
            </div>

            {/* Bottom-right: Featured */}
            {isFeatured && (
                <div className="absolute z-20 bottom-2.5 right-2.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-[#3B2A00] bg-[#F5B301] rounded-full shadow-md whitespace-nowrap">
                        ★ Featured
                    </span>
                </div>
            )}
        </div>
        {/* ===== END IMAGE ===== */}

        {/* ===== DETAILS ===== */}
        <div className="flex flex-col flex-1 min-w-0 px-2 pt-3.5 pb-1">

            {/* Title + furnished pill */}
            <div className="flex items-start justify-between gap-2 min-w-0">
                <h3
                    className="flex-1 min-w-0 m-0 text-[17px] sm:text-lg font-bold leading-6 text-[#172033] truncate"
                    title={property.property_name}
                >
                    {property.property_name || "N/A"}
                </h3>

                <span
                    className="flex-shrink-0 px-3 py-1 text-[11px] sm:text-xs font-semibold text-[#475569] bg-[#EEF1F6] rounded-full whitespace-nowrap"
                    title={property.furnished_type}
                >
                    {property.furnished_type || "Un-Furnished"}
                </span>
            </div>

            {/* Subtitle with pin */}
            <p
                className="flex items-center gap-1.5 mt-1 mb-0 text-[13px] leading-5 text-[#64748B] min-w-0"
                title={subtitle}
            >
                <FaMapMarkerAlt className="text-[12px] text-[#D61F45] flex-shrink-0" />
                <span className="truncate">{subtitle}</span>
            </p>

            {/* Price + Get Best Deal */}
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 mt-2.5 min-w-0">
                <span className="text-[22px] sm:text-2xl font-extrabold leading-none text-[#D61F45] whitespace-nowrap">
                    ₹{" "}
                    {isRentLike
                        ? formatPrice(property.rent).replace("₹ ", "")
                        : formatPrice(property.property_price).replace("₹ ", "")}
                </span>

                {isRentLike && (
                    <span className="text-xs text-[#64748B] whitespace-nowrap">
                        / {property.rent_duration || "Per Month"}
                    </span>
                )}

                <button
                    type="button"
                    onClick={() => handleContactClick(property)}
                    className="inline-flex items-center gap-1.5 h-8 px-3 text-xs font-semibold text-white rounded-full bg-gradient-to-r from-[#D61F45] to-[#B91C3C] shadow-[0_4px_12px_rgba(214,31,69,0.35)] transition hover:brightness-110 whitespace-nowrap"
                >
                    <Building2 size={14} className="flex-shrink-0" />
                    Get Best Deal
                </button>

                {property.property_category_type?.includes("Buy") &&
                    property.possession_status === "Ready To Move" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-[#D61F45] bg-[#FDE8EC] rounded-full whitespace-nowrap">
                            <MdApartment className="text-sm flex-shrink-0" />
                            Ready to Move
                        </span>
                    )}
            </div>

            {/* Deposit (rent / PG) or Possession (buy) */}
            {isRentLike && (
                <p className="mt-1.5 mb-0 text-xs text-[#64748B] whitespace-nowrap">
                    Deposit:
                    <span className="ml-1 font-semibold text-[#172033]">
                        ₹{" "}
                        {property.custom_deposit_amount?.toLocaleString("en-IN")}
                    </span>
                </p>
            )}

            {property.property_category_type?.includes("Buy") &&
                property.possession_status !== "Ready To Move" &&
                property.possession_date && (
                    <p className="mt-1.5 mb-0 text-xs text-[#64748B] whitespace-nowrap">
                        Possession:
                        <span className="ml-1 font-semibold text-[#172033]">
                            {new Date(property.possession_date).toLocaleDateString("en-IN")}
                        </span>
                    </p>
                )}

            {/* Features Row */}
            <div className="grid grid-cols-3 mt-3 py-3 border-t border-b border-[#F1E4E8] min-w-0">
                {/* First Column */}
                <div className="flex items-center gap-2 pr-1 min-w-0">
                    <MdApartment className="text-[18px] text-[#1E3A5F] flex-shrink-0" />
                    <div className="flex flex-col justify-center min-w-0">
                        <p className="m-0 text-[13px] font-semibold leading-4 truncate text-[#172033]">
                            {property.building_type === "Commercial"
                                ? property.property_type === "Office"
                                    ? "Office Space"
                                    : property.property_type === "Retail"
                                        ? "Retail Space"
                                        : property.property_type
                                : property.property_category_type?.includes("PG")
                                    ? `${property.bathroom || 0} Bathrooms`
                                    : property.bhk_type}
                        </p>
                        <p className="m-0 mt-0.5 text-[10.5px] leading-4 text-[#64748B] truncate">
                            {property.building_type === "Commercial"
                                ? "Property Type"
                                : property.property_category_type?.includes("PG")
                                    ? "Bathrooms"
                                    : property.property_type}
                        </p>
                    </div>
                </div>

                {/* Second Column */}
                <div className="flex items-center gap-2 px-2 border-l border-[#F1E4E8] min-w-0">
                    {property.property_category_type?.includes("PG") ? (
                        <FaUser className="text-[15px] text-[#1E3A5F] flex-shrink-0" />
                    ) : (
                        <FaBath className="text-[15px] text-[#1E3A5F] flex-shrink-0" />
                    )}
                    <div className="flex flex-col justify-center min-w-0">
                        <p className="m-0 text-[13px] font-semibold leading-4 truncate text-[#172033]">
                            {property.property_category_type?.includes("PG")
                                ? property.available_for
                                : `${property.bathroom || 0} Baths`}
                        </p>
                        <p className="m-0 mt-0.5 text-[10.5px] leading-4 text-[#64748B] truncate">
                            {property.property_category_type?.includes("PG")
                                ? "Available For"
                                : "Bathrooms"}
                        </p>
                    </div>
                </div>

                {/* Third Column */}
                <div className="flex items-center gap-2 pl-2 border-l border-[#F1E4E8] min-w-0">
                    <RiRuler2Line className="text-[18px] text-[#1E3A5F] flex-shrink-0" />
                    <div className="flex flex-col justify-center min-w-0">
                        <p className="m-0 text-[13px] font-semibold leading-4 truncate text-[#172033]">
                            {property.area} {property.area_in}
                        </p>
                        <p className="m-0 mt-0.5 text-[10.5px] leading-4 text-[#64748B] truncate">
                            Built Up Area
                        </p>
                    </div>
                </div>
            </div>

            {/* Posted by · days · distance  |  Share */}
            <div className="flex items-center justify-between gap-2 pt-2.5 min-w-0">
                <div className="min-w-0 text-xs leading-5 text-[#64748B]">
                    <div className="flex items-center gap-1.5 min-w-0">
                        <AiOutlineClockCircle className="text-[14px] flex-shrink-0" />
                        <span className="truncate">
                            Posted by {property.user_type || "Owner"}
                        </span>
                        <span className="flex-shrink-0 text-[#CBD5E1]">•</span>
                        <span className="flex-shrink-0 whitespace-nowrap">
                            {property.days_since_created
                                ? `${property.days_since_created} days ago`
                                : "Recently"}
                        </span>
                    </div>

                    {distance && (
                        <div className="flex items-center gap-1.5 mt-0.5 whitespace-nowrap">
                            <FaMapMarkerAlt className="text-[11px] text-[#D61F45] flex-shrink-0" />
                            {distance} km from you
                        </div>
                    )}
                </div>

                <button
                    type="button"
                    aria-label="Share property"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        openShareModal1(shareUrl, property._id);
                    }}
                    className="flex items-center justify-center flex-shrink-0 w-8 h-8 text-[#475569] transition-colors rounded-full hover:bg-[#FDE8EC] hover:text-[#D61F45]"
                >
                    <FontAwesomeIcon icon={faShareNodes} className="text-[15px]" />
                </button>
            </div>

            {/* Owner box — click opens contact details (same as before) */}
            <div className="pt-3 mt-auto">
                <div
                    role="button"
                    tabIndex={0}
                    onClick={() => handleContactClick(property)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleContactClick(property);
                        }
                    }}
                    className="group flex items-center gap-2.5 px-3 py-2.5 min-w-0 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] cursor-pointer transition-colors hover:border-[#D61F45]/40 hover:bg-[#FFF7F9]"
                >
                    {/* Avatar */}
                    <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 overflow-hidden bg-white rounded-full shadow-sm ring-1 ring-[#E2E8F0]">
                        {hasOwnerImage ? (
                            <>
                                <img
                                    src={`${process.env.REACT_APP_API_URL}/media/${property.property_owner_image}`}
                                    alt={property.connect_to_name || "Owner"}
                                    className="object-cover w-full h-full rounded-full"
                                    onError={(e) => {
                                        e.target.style.display = "none";
                                        e.target.nextSibling.style.display = "flex";
                                    }}
                                />
                                <div className="items-center justify-center hidden w-full h-full">
                                    <AiOutlineUser className="text-xl text-[#1E3A5F]" />
                                </div>
                            </>
                        ) : (
                            <AiOutlineUser className="text-xl text-[#1E3A5F]" />
                        )}
                    </div>

                    {/* Name | User type */}
                    <div className="flex items-center flex-1 min-w-0 gap-2.5">
                        <span
                            className="min-w-0 text-sm font-semibold truncate text-[#172033]"
                            title={property.connect_to_name}
                        >
                            {property.connect_to_name || "Owner"}
                        </span>
                        <span className="flex-shrink-0 w-px h-4 bg-[#CBD5E1]" />
                        <span className="min-w-0 text-xs truncate text-[#64748B]">
                            {property.user_type || "Owner"}
                        </span>
                    </div>

                    {/* WhatsApp + Call (kept from the old card) */}
                    <a
                        href={`https://wa.me/91${property.connect_to_no}?text=${encodeURIComponent("Hello, I am interested in your property")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="WhatsApp owner"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center justify-center flex-shrink-0 text-white bg-green-500 rounded-full w-7 h-7 hover:bg-green-600"
                    >
                        <FaWhatsapp className="text-sm" />
                    </a>

                    <a
                        href={`tel:+91${property.connect_to_no}`}
                        aria-label="Call owner"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center justify-center flex-shrink-0 text-white bg-blue-500 rounded-full w-7 h-7 hover:bg-blue-600"
                    >
                        <FaPhoneAlt className="text-[11px]" />
                    </a>

                    <MdOutlineNavigateNext className="flex-shrink-0 text-xl transition-colors text-[#94A3B8] group-hover:text-[#D61F45]" />
                </div>
            </div>
        </div>
    </div>
);