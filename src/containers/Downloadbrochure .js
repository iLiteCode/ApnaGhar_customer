// ==========================================================
// Project brochure download helpers
//
// Backend facts (from models.py / serializers.py / views.py):
//   • Model field ........ Project.brochure_doc = FileField(upload_to="project_docs/")
//   • Detail API ......... GetProjectDetailsView -> response.data.data.project_details.brochure_doc
//   • Serializer ......... ProjectSerializer (fields="__all__") with context={"request": request}
//     -> DRF returns an ABSOLUTE url, e.g. https://api.example.com/media/project_docs/skyline.pdf
//     -> other endpoints that serialize without `request` return "/media/project_docs/skyline.pdf"
//     -> no file uploaded => null
//   • Media files are public (no auth on /media/), so no token is sent.
// ==========================================================

import { toast } from "react-toastify";

const API_BASE = (process.env.REACT_APP_API_URL || "").replace(/\/+$/, "");

/**
 * Turns whatever the API returned for `brochure_doc` into one usable URL.
 * Handles absolute URLs, "/media/..." paths and bare "project_docs/..." names
 * without doubling the domain or "/media/".
 */
export function resolveBrochureUrl(raw) {
    if (typeof raw !== "string") return "";

    let value = raw.trim();
    if (!value || value === "null" || value === "undefined") return "";

    // 1. Already absolute
    if (/^https?:\/\//i.test(value)) {
        // Django behind an HTTPS proxy can build "http://" media links.
        // An https page cannot fetch those (mixed content), so upgrade our own host only.
        if (window.location.protocol === "https:" && /^http:\/\//i.test(value)) {
            try {
                const fileUrl = new URL(value);
                const apiUrl = new URL(API_BASE);
                if (fileUrl.host === apiUrl.host) {
                    fileUrl.protocol = "https:";
                    value = fileUrl.toString();
                }
            } catch (err) {
                // leave value unchanged
            }
        }
        return value;
    }

    // 2. Protocol-relative
    if (value.startsWith("//")) return `${window.location.protocol}${value}`;

    if (!API_BASE) return "";

    // 3. "/media/project_docs/x.pdf"
    if (value.startsWith("/")) return `${API_BASE}${value}`;

    // 4. "media/project_docs/x.pdf"
    if (value.startsWith("media/")) return `${API_BASE}/${value}`;

    // 5. "project_docs/x.pdf" (raw FileField name) — same pattern the app already
    //    uses for other media: `${REACT_APP_API_URL}/media/${path}`
    return `${API_BASE}/media/${value}`;
}

/** "SkylineHub Realty" -> "SkylineHub-Realty-Brochure.pdf" (keeps the file's real extension). */
export function brochureFileName(projectName, url) {
    const safeName =
        String(projectName || "")
            .normalize("NFKD")
            .replace(/[̀-ͯ]/g, "")
            .replace(/[^a-zA-Z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "")
            .slice(0, 80) || "Project";

    let ext = "pdf";
    try {
        const match = new URL(url).pathname.match(/\.([a-z0-9]{2,5})$/i);
        if (match) ext = match[1].toLowerCase();
    } catch (err) {
        // keep "pdf"
    }

    return `${safeName}-Brochure.${ext}`;
}

function openInNewTab(url) {
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) {
        toast.error("Please allow pop-ups for this site to view the brochure.");
        return false;
    }
    toast.info("Opening the brochure in a new tab.");
    return true;
}

/**
 * Downloads the brochure as a file named after the project.
 * If the browser is not allowed to read the file (CORS / network),
 * it falls back to opening the PDF in a new tab so the user can still view/save it.
 * Returns true when the brochure was downloaded or opened.
 */
export async function downloadBrochure({ url, projectName }) {
    if (!url) {
        toast.error("Brochure is not available for this project.");
        return false;
    }

    let response;
    try {
        response = await fetch(url, { method: "GET", credentials: "omit" });
    } catch (err) {
        // TypeError here = CORS block or network failure. The file itself may be fine,
        // so let the browser open it directly instead of hiding the problem.
        console.error("Brochure fetch failed (CORS or network):", url, err);
        return openInNewTab(url);
    }

    if (response.status === 404) {
        console.error("Brochure 404:", url);
        toast.error("The brochure file was not found on the server.");
        return false;
    }
    if (response.status === 401 || response.status === 403) {
        console.error(`Brochure ${response.status}:`, url);
        toast.error("You don't have permission to download this brochure.");
        return false;
    }
    if (!response.ok) {
        console.error(`Brochure HTTP ${response.status}:`, url);
        toast.error(`Unable to download the brochure (error ${response.status}).`);
        return false;
    }

    let blob;
    try {
        blob = await response.blob();
    } catch (err) {
        console.error("Brochure read failed:", err);
        return openInNewTab(url);
    }

    const contentType = (response.headers.get("content-type") || blob.type || "").toLowerCase();

    // A wrong URL often returns the site's HTML page with status 200 — that is not a brochure.
    if (!blob.size || contentType.includes("text/html")) {
        console.error("Brochure response is not a file:", url, contentType, blob.size);
        toast.error("The brochure link is invalid. Please contact the builder.");
        return false;
    }

    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = brochureFileName(projectName, url);
    link.rel = "noopener";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Give the browser a moment to start the download before freeing the blob.
    setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1500);
    return true;
}