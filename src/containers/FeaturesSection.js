import React from "react";
import PercentIcon from "@mui/icons-material/Percent";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import VideocamIcon from "@mui/icons-material/Videocam";
import SecurityIcon from "@mui/icons-material/Security";

const features = [
    {
        // COLOR: brand red updated from #8B1E3F -> #D61F45
        icon: <PercentIcon sx={{ fontSize: 28, color: "#D61F45" }} />,
        title: "Zero Brokerage",
        subtitle: "No hidden charges",
    },
    {
        icon: <VerifiedUserIcon sx={{ fontSize: 28 }} />,
        title: "Verified Owners",
        subtitle: "100% verified listings",
    },
    {
        icon: <AutoAwesomeIcon sx={{ fontSize: 28 }} />,
        title: "AI Technology Match",
        subtitle: "Smart recommendation",
    },
    {
        icon: <VideocamIcon sx={{ fontSize: 28 }} />,
        title: "Virtual Tour",
        subtitle: "360° property view",
    },
    {
        icon: <SecurityIcon sx={{ fontSize: 28 }} />,
        title: "Secure & Safe",
        subtitle: "Fraud detection",
    },
];

const FeaturesSection = () => {
    return (
        // NEW: `relative` + `overflow-hidden` so the decorative layers below can be positioned
        <section className="relative w-full mt-2 mb-2 overflow-hidden">

            {/* ==================== NEW: soft radial glow behind the heading ==================== */}
            <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 pointer-events-none h-[320px]"
                style={{
                    background:
                        "radial-gradient(60% 100% at 50% 0%, #FBE3E9 0%, rgba(255,255,255,0) 72%)",
                }}
            />

            {/* ==================== NEW: faint city skyline watermark ==================== */}
            <svg
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 w-full pointer-events-none select-none h-[230px] sm:h-[250px]"
                viewBox="0 0 1600 170"
                preserveAspectRatio="none"
            >
                <g fill="#D61F45" opacity="0.07">
                    <rect x="20" y="96" width="46" height="74" />
                    <rect x="74" y="64" width="34" height="106" />
                    <rect x="116" y="110" width="52" height="60" />
                    <rect x="176" y="46" width="30" height="124" />
                    <rect x="214" y="88" width="48" height="82" />
                    <rect x="270" y="118" width="38" height="52" />
                    <rect x="316" y="70" width="40" height="100" />
                    <rect x="364" y="100" width="54" height="70" />
                    <rect x="426" y="56" width="32" height="114" />
                    <rect x="466" y="106" width="46" height="64" />
                    <rect x="520" y="80" width="36" height="90" />
                    <rect x="564" y="122" width="56" height="48" />
                    <rect x="628" y="92" width="38" height="78" />
                    <rect x="674" y="60" width="30" height="110" />
                    <rect x="712" y="114" width="50" height="56" />
                    <rect x="770" y="84" width="34" height="86" />
                    <rect x="812" y="104" width="44" height="66" />
                    <rect x="864" y="52" width="28" height="118" />
                    <rect x="900" y="98" width="52" height="72" />
                    <rect x="960" y="126" width="36" height="44" />
                    <rect x="1004" y="74" width="42" height="96" />
                    <rect x="1054" y="108" width="48" height="62" />
                    <rect x="1110" y="66" width="30" height="104" />
                    <rect x="1148" y="112" width="54" height="58" />
                    <rect x="1210" y="86" width="36" height="84" />
                    <rect x="1254" y="120" width="46" height="50" />
                    <rect x="1308" y="78" width="32" height="92" />
                    <rect x="1348" y="102" width="50" height="68" />
                    <rect x="1406" y="58" width="28" height="112" />
                    <rect x="1442" y="110" width="44" height="60" />
                    <rect x="1494" y="90" width="38" height="80" />
                    <rect x="1540" y="124" width="48" height="46" />
                </g>
            </svg>

            {/* NEW: z-10 keeps the real content above the decorative layers */}
            <div className="relative z-10 max-w-[94%] xl:max-w-[93%] mx-auto">

                {/* ==================== NEW: SECTION HEADING ==================== */}
                <div className="mb-12 text-center sm:mb-16">

                    {/* Eyebrow pill with rules on either side */}
                    <div className="inline-flex items-center gap-3">
                        <span className="hidden w-10 h-px sm:block bg-[#D61F45]/30" />
                        <span className="inline-block px-4 py-1.5 rounded-full border border-[#D61F45]/40 text-[#D61F45] text-[10px] sm:text-[11px] font-bold tracking-[0.18em] uppercase">
                            Why Choose Us
                        </span>
                        <span className="hidden w-10 h-px sm:block bg-[#D61F45]/30" />
                    </div>

                    {/* Two-tone headline */}
                    <h2 className="mt-4 text-2xl font-bold leading-tight text-[#17253a] sm:text-3xl lg:text-4xl">
                        A Smarter Way to Find Your{" "}
                        <span className="text-[#D61F45]">Dream Home</span>
                    </h2>

                    <p className="max-w-3xl mx-auto mt-3 text-sm sm:text-base text-[#64748B]">
                        Experience a secure, transparent and hassle-free property search
                        with powerful tools and verified listings.
                    </p>
                </div>

                {/* CARD: softer corners + lifted shadow to match the design */}
                <div className="overflow-hidden bg-white border border-gray-200 rounded-3xl shadow-[0_10px_40px_rgba(17,24,39,0.06)]">

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">

                        {features.map((item, index) => (
                            <div
                                key={index}
                                className={`
                        flex items-center gap-4
                        px-5 py-6
                        transition-all duration-300
                        hover:bg-[#FFF7F9]
                        group

                        border-b lg:border-b-0 border-gray-200
                        ${index !== features.length - 1 ? "lg:border-r" : ""}
                    `}
                            >
                                {/* Icon — COLOR: #8B1E3F -> #D61F45, flat pink -> soft gradient badge */}
                                <div className="flex items-center justify-center flex-shrink-0 transition-transform duration-300 rounded-full w-14 h-14 bg-gradient-to-br from-[#FDE8EC] to-[#FAD3DB] text-[#D61F45] ring-1 ring-white shadow-[0_4px_14px_rgba(214,31,69,0.16)] group-hover:scale-105">
                                    {item.icon}
                                </div>

                                {/* Text */}
                                <div>
                                    <h3 className="text-[17px] font-semibold text-[#1E293B] leading-5">
                                        {item.title}
                                    </h3>

                                    <p className="mt-1 text-[12px] text-[#6B7280] leading-5">
                                        {item.subtitle}
                                    </p>
                                </div>
                            </div>
                        ))}

                    </div>

                </div>

            </div>
        </section>
    );
};

export default FeaturesSection;