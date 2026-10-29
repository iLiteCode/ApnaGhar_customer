import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// >>> CHANGE THIS to the email address where you want to receive resumes <<<
const CAREERS_EMAIL = "careers@apnaghar.com";

// Add real openings here. While this list is empty, the page shows the
// "Don't see a role for you?" message so visitors can still send a resume.
// Example:
// { title: "React Developer", department: "Technology", location: "Pune", type: "Full-time", experience: "1–3 years",
//   description: "Build and improve the ApnaGhar website using React and Tailwind CSS." },
const JOB_OPENINGS = [];

const WHY_WORK_WITH_US = [
    {
        title: "Meaningful Work",
        text: "Help families and businesses across India find the right home or workspace, every single day.",
    },
    {
        title: "Learn & Grow",
        text: "Work on real products used by buyers, tenants, owners and builders, and grow your skills with a supportive team.",
    },
    {
        title: "Ownership",
        text: "Take responsibility for your work, share ideas openly, and see your contributions go live quickly.",
    },
    {
        title: "Friendly Culture",
        text: "A transparent, respectful and collaborative workplace where every voice matters.",
    },
];

const TEAMS = [
    "Technology & Development",
    "Product & Design",
    "Sales & Business Development",
    "Customer Support",
    "Marketing & Digital Growth",
    "Property Verification & Operations",
];

const Label = ({ children }) => (
    <strong className="font-bold text-gray-800">
        <em>{children}</em>
    </strong>
);

const applyLink = (role) =>
    `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(`Application: ${role}`)}&body=${encodeURIComponent(
        "Hello ApnaGhar Team,\n\nPlease find my resume attached.\n\nName:\nPhone:\nCurrent city:\nExperience:\n",
    )}`;

const JobCard = ({ job }) => (
    <div className="flex flex-col p-5 bg-white border border-gray-200 rounded-xl transition-all hover:border-[#D61F45] hover:shadow-[0_8px_20px_rgba(214,31,69,0.08)]">
        <h3 className="m-0 text-[17px] font-bold text-gray-800">{job.title}</h3>
        <div className="flex flex-wrap gap-2 mt-2 text-[12.5px]">
            {[job.department, job.location, job.type, job.experience].filter(Boolean).map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
                    {tag}
                </span>
            ))}
        </div>
        {job.description && <p className="m-0 mt-3 text-[14px] text-gray-600">{job.description}</p>}
        <a
            href={applyLink(job.title)}
            className="self-start inline-flex items-center px-4 py-2 mt-4 text-[13px] font-semibold text-white no-underline rounded-lg bg-[#D61F45] hover:bg-[#B91C3C] hover:no-underline"
        >
            Apply Now
        </a>
    </div>
);

const Careers = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* ---------- Title bar ---------- */}
            <nav className="flex items-center justify-between w-full gap-3 px-4 py-5 text-black bg-gray-100 md:px-20">
                <h1 className="m-0 text-lg font-semibold md:text-xl">Careers</h1>
                <div className="flex-shrink-0 text-sm text-gray-500">
                    <Link to="/" className="text-gray-500 no-underline hover:no-underline hover:text-[#D61F45]">
                        Home
                    </Link>
                    <span className="mx-1">›</span>
                    <span className="font-medium text-[#D61F45]">Careers</span>
                </div>
            </nav>

            {/* ---------- Content ---------- */}
            <div className="px-4 py-6 text-[15px] leading-relaxed text-gray-700 md:px-20 md:py-8">
                <h2 className="mb-2 text-2xl font-bold text-gray-800 md:text-[26px]">Careers at ApnaGhar</h2>

                <p className="mb-4">
                    <Label>Join Our Team:</Label> At ApnaGhar, we are building a simpler, more transparent way for people to
                    find, buy, rent and sell property. If you enjoy solving real problems and want your work to make a
                    difference in people's lives, we would love to hear from you.
                </p>

                <p className="mb-6">
                    <Label>Our Culture:</Label> We believe in honesty, teamwork, and putting our customers first. Every member
                    of the ApnaGhar team plays an important role in helping families find their perfect home.{" "}
                    <em>Find. Buy. Rent. Live Better.</em>
                </p>

                {/* Why work with us */}
                <p className="mb-3">
                    <Label>Why Work With Us ?</Label>
                </p>
                <div className="grid grid-cols-1 gap-3 mb-6 sm:grid-cols-2 lg:grid-cols-4">
                    {WHY_WORK_WITH_US.map((item) => (
                        <div key={item.title} className="p-4 border border-gray-200 rounded-xl bg-[#FFF7F9]">
                            <h3 className="m-0 text-[15px] font-bold text-[#D61F45]">{item.title}</h3>
                            <p className="m-0 mt-1 text-[14px] text-gray-600">{item.text}</p>
                        </div>
                    ))}
                </div>

                {/* Teams */}
                <p className="mb-3">
                    <Label>Teams We Hire For:-</Label>
                </p>
                <p className="mb-6 pl-4 md:pl-7">{TEAMS.join(" • ")}</p>

                {/* Openings */}
                <p className="mb-3">
                    <Label>Current Openings:-</Label>
                </p>
                {JOB_OPENINGS.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2 xl:grid-cols-3">
                        {JOB_OPENINGS.map((job) => (
                            <JobCard key={`${job.title}-${job.location}`} job={job} />
                        ))}
                    </div>
                ) : (
                    <div className="p-5 mb-6 text-center border border-dashed rounded-xl border-[#FAD3DB] bg-[#FFF7F9]">
                        <p className="m-0 text-[15px] font-semibold text-gray-800">Don't see a role for you right now?</p>
                        <p className="m-0 mt-1 text-[14px] text-gray-600">
                            We're always happy to meet talented people. Send us your resume and we'll contact you when a
                            suitable role opens.
                        </p>
                        <a
                            href={applyLink("General Application")}
                            className="inline-flex items-center px-4 py-2 mt-4 text-[13px] font-semibold text-white no-underline rounded-lg bg-[#D61F45] hover:bg-[#B91C3C] hover:no-underline"
                        >
                            Send Your Resume
                        </a>
                    </div>
                )}

                {/* How to apply */}
                <p className="mb-3">
                    <Label>How To Apply ?</Label>
                </p>
                <p className="mb-4 pl-4 md:pl-7">
                    Email your resume to{" "}
                    <a href={`mailto:${CAREERS_EMAIL}`} className="font-semibold text-[#D61F45] underline">
                        {CAREERS_EMAIL}
                    </a>{" "}
                    with the role you are applying for in the subject line. Please include your name, phone number, current
                    city and years of experience. Our team will review your application and contact shortlisted candidates.
                </p>
            </div>
        </div>
    );
};

export default Careers;