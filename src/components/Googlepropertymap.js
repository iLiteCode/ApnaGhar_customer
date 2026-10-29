import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import "./GooglePropertyMap.css";

// ==========================================================
// Google Maps loader (singleton)
// The script is added to the page once and shared by every map on the site.
// The API key comes from REACT_APP_GOOGLE_MAPS_API_KEY — never hard-coded.
// ==========================================================

const API_KEY = process.env.AIzaSyAUCNwxnNo52kFWJNGhRVj;
const MAP_ID = process.env.AIzaSyAUCNwxnNo52kFWJNGhRVj; // optional: enables Advanced Markers

let loaderPromise = null;
const authFailureListeners = new Set();

function loadGoogleMaps() {
    if (window.google && window.google.maps && window.google.maps.Map) {
        return Promise.resolve(window.google.maps);
    }
    if (loaderPromise) return loaderPromise;

    if (!API_KEY) {
        return Promise.reject(new Error("REACT_APP_GOOGLE_MAPS_API_KEY is not set"));
    }

    // Google calls this global when the key is invalid / restricted / billing is off.
    window.gm_authFailure = () => {
        authFailureListeners.forEach((fn) => fn());
    };

    loaderPromise = new Promise((resolve, reject) => {
        const callbackName = "__apnaGharGoogleMapsReady";

        window[callbackName] = async () => {
            try {
                const gmaps = window.google.maps;
                if (typeof gmaps.importLibrary === "function") {
                    await gmaps.importLibrary("maps");
                    await gmaps.importLibrary("marker");
                }
                resolve(window.google.maps);
            } catch (err) {
                reject(err);
            } finally {
                delete window[callbackName];
            }
        };

        const script = document.createElement("script");
        script.src =
            "https://maps.googleapis.com/maps/api/js" +
            `?key=${encodeURIComponent(API_KEY)}` +
            "&v=weekly&libraries=marker&loading=async" +
            `&callback=${callbackName}`;
        script.async = true;
        script.defer = true;
        script.onerror = () => {
            loaderPromise = null;
            reject(new Error("Google Maps script failed to load"));
        };
        document.head.appendChild(script);
    });

    return loaderPromise;
}

// ==========================================================
// Helpers
// ==========================================================

/** Returns {lat, lng} only for real, in-range coordinates; otherwise null. */
function getCoords(property) {
    if (!property) return null;
    const lat = Number(property.latitude);
    const lng = Number(property.longitude);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return null;
    if (lat === 0 && lng === 0) return null; // "0,0" is an empty value, not a real property
    return { lat, lng };
}

function getLocationText(p) {
    const area = (p.address_area || "").trim();
    const city = (p.city_name || "").trim();
    if (!area) return city;
    if (!city || area.toLowerCase().includes(city.toLowerCase())) return area;
    return `${area}, ${city}`;
}

function getTypeText(p) {
    if (p.property_type === "Office") return "Office Space";
    if (p.property_type === "Retail") return "Retail Space";
    return p.property_type || "";
}

function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = String(text);
    return node;
}

/** InfoWindow content, built with DOM nodes (textContent => no HTML injection). */
function buildInfoContent(property, { priceText, onViewDetails, onToggleFavorite }) {
    const root = el("div", "gpm-info");

    const media = el("div", "gpm-info-media");
    if (property.cover_image) {
        const img = el("img", "gpm-info-img");
        img.src = property.cover_image;
        img.alt = property.property_name || "Property";
        img.loading = "lazy";
        img.onerror = () => {
            img.remove();
            media.classList.add("gpm-info-media--empty");
        };
        media.appendChild(img);
    } else {
        media.classList.add("gpm-info-media--empty");
    }

    if (onToggleFavorite) {
        const fav = el("button", `gpm-info-fav${property.is_favorite ? " is-active" : ""}`);
        fav.type = "button";
        fav.setAttribute("aria-label", "Add to favourites");
        fav.innerHTML =
            '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.9 4.5c2 0 3.6 1.1 5.1 3 1.5-1.9 3.1-3 5.1-3 3.9 0 6 3.9 4.5 7.3C19.5 16.4 12 21 12 21z"/></svg>';
        fav.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            const handled = onToggleFavorite(property);
            if (handled !== false) fav.classList.toggle("is-active");
        });
        media.appendChild(fav);
    }
    root.appendChild(media);

    const body = el("div", "gpm-info-body");
    body.appendChild(el("h4", "gpm-info-title", property.property_name || "Property"));

    const location = getLocationText(property);
    if (location) body.appendChild(el("p", "gpm-info-location", location));

    if (priceText) body.appendChild(el("p", "gpm-info-price", priceText));

    const meta = [getTypeText(property), property.bhk_type].filter(Boolean);
    if (meta.length) {
        const metaRow = el("div", "gpm-info-meta");
        meta.forEach((m) => metaRow.appendChild(el("span", "gpm-info-chip", m)));
        body.appendChild(metaRow);
    }

    const btn = el("button", "gpm-info-btn", "View Details");
    btn.type = "button";
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        onViewDetails(property);
    });
    body.appendChild(btn);

    root.appendChild(body);
    return root;
}

/** Marker used when no Map ID is configured: a custom HTML overlay (no Map ID needed). */
function createOverlayClass(gmaps) {
    return class PriceOverlay extends gmaps.OverlayView {
        constructor(position, node) {
            super();
            this.position = position;
            this.node = node;
        }

        onAdd() {
            this.getPanes().overlayMouseTarget.appendChild(this.node);
        }

        draw() {
            const projection = this.getProjection();
            if (!projection) return;
            const point = projection.fromLatLngToDivPixel(new gmaps.LatLng(this.position));
            if (!point) return;
            this.node.style.left = `${point.x}px`;
            this.node.style.top = `${point.y}px`;
        }

        onRemove() {
            if (this.node.parentNode) this.node.parentNode.removeChild(this.node);
        }

        setPosition(position) {
            this.position = position;
            this.draw();
        }
    };
}

// ==========================================================
// Component
// ==========================================================

/**
 * props
 *  properties       – the page's existing property array (API data, unchanged)
 *  highlightedId    – id of the property whose card is hovered / active
 *  onMarkerHover    – (id | null) => void   keeps card <-> marker highlight in sync
 *  getPriceLabel    – (property) => string  text for the price marker ("₹ 15 K")
 *  onToggleFavorite – (property) => false | void   (return false = not handled, e.g. login needed)
 *  loading          – page is fetching properties
 */
const GooglePropertyMap = ({
    properties,
    highlightedId,
    onMarkerHover,
    getPriceLabel,
    onToggleFavorite,
    loading,
}) => {
    const history = useHistory();

    const containerRef = useRef(null);
    const mapRef = useRef(null);
    const infoWindowRef = useRef(null);
    const markersRef = useRef(new Map()); // id -> { marker, node, property, position, advanced }
    const overlayClassRef = useRef(null);
    const lastBoundsKeyRef = useRef("");

    // Latest callbacks in refs, so markers never need rebuilding when the parent re-renders.
    const callbacksRef = useRef({});
    callbacksRef.current = { onMarkerHover, getPriceLabel, onToggleFavorite };

    const [status, setStatus] = useState("loading"); // loading | ready | error
    const [validCount, setValidCount] = useState(0);

    // ---------- 1. Load Google Maps + create the map ONCE ----------
    useEffect(() => {
        let cancelled = false;

        const onAuthFailure = () => {
            if (!cancelled) setStatus("error");
        };
        authFailureListeners.add(onAuthFailure);

        loadGoogleMaps()
            .then((gmaps) => {
                if (cancelled || !containerRef.current) return;

                const coarsePointer =
                    window.matchMedia && window.matchMedia("(pointer: coarse)").matches;

                const map = new gmaps.Map(containerRef.current, {
                    center: { lat: 20.5937, lng: 78.9629 }, // India overview until bounds are fitted
                    zoom: 5,
                    mapTypeId: "roadmap",
                    ...(MAP_ID ? { mapId: MAP_ID } : {}),
                    zoomControl: true,
                    fullscreenControl: true,
                    streetViewControl: true,
                    mapTypeControl: true,
                    mapTypeControlOptions: {
                        style: gmaps.MapTypeControlStyle.DROPDOWN_MENU,
                    },
                    clickableIcons: false,
                    // Desktop: wheel zooms when the pointer is over the map (like before).
                    // Touch: two fingers to move the map, so one finger still scrolls the page.
                    gestureHandling: coarsePointer ? "cooperative" : "greedy",
                });

                mapRef.current = map;
                infoWindowRef.current = new gmaps.InfoWindow({ maxWidth: 280 });
                overlayClassRef.current = createOverlayClass(gmaps);
                setStatus("ready");
            })
            .catch((err) => {
                console.error("Google Maps:", err);
                if (!cancelled) setStatus("error");
            });

        return () => {
            cancelled = true;
            authFailureListeners.delete(onAuthFailure);

            if (infoWindowRef.current) infoWindowRef.current.close();
            markersRef.current.forEach(({ marker, advanced }) => {
                if (advanced) marker.map = null;
                else marker.setMap(null);
            });
            markersRef.current.clear();
            mapRef.current = null;
            infoWindowRef.current = null;
        };
    }, []);

    // ---------- 2. Sync markers with the property list (add / update / remove) ----------
    useEffect(() => {
        if (status !== "ready" || !mapRef.current) return;

        const gmaps = window.google.maps;
        const map = mapRef.current;
        const useAdvanced = Boolean(MAP_ID && gmaps.marker && gmaps.marker.AdvancedMarkerElement);

        const list = Array.isArray(properties) ? properties : [];
        const seen = new Set();
        const bounds = new gmaps.LatLngBounds();
        const boundsKeyParts = [];
        let count = 0;

        list.forEach((property) => {
            const id = property && property._id;
            const position = getCoords(property);
            if (!id || !position) return; // skip invalid coordinates — no fake markers

            seen.add(id);
            count += 1;
            bounds.extend(position);
            boundsKeyParts.push(`${id}:${position.lat},${position.lng}`);

            const label = (callbacksRef.current.getPriceLabel?.(property) || "").trim();
            const existing = markersRef.current.get(id);

            if (existing) {
                // Update in place — no re-creation.
                existing.property = property;
                existing.position = position;
                existing.priceNode.textContent = label;
                existing.node.classList.toggle("gpm-marker--dot", !label);
                if (existing.advanced) existing.marker.position = position;
                else existing.marker.setPosition(position);
                return;
            }

            // --- create marker element ---
            const node = el("div", `gpm-marker${useAdvanced ? "" : " gpm-marker--overlay"}${label ? "" : " gpm-marker--dot"}`);
            const priceNode = el("span", "gpm-marker-price", label);
            node.appendChild(priceNode);
            node.appendChild(el("span", "gpm-marker-pointer"));
            node.setAttribute("role", "button");
            node.setAttribute("tabindex", "0");
            node.setAttribute("aria-label", property.property_name || "Property");

            const record = { node, priceNode, property, position, advanced: useAdvanced, marker: null };

            const openInfo = () => {
                const info = infoWindowRef.current;
                if (!info) return;
                const current = record.property;
                const priceText = (callbacksRef.current.getPriceLabel?.(current) || "").trim();

                info.setContent(
                    buildInfoContent(current, {
                        priceText,
                        onViewDetails: (p) => history.push(`/propertydetails/${p._id}`),
                        onToggleFavorite: callbacksRef.current.onToggleFavorite,
                    }),
                );

                if (record.advanced) {
                    info.open({ map, anchor: record.marker });
                } else {
                    info.setOptions({ pixelOffset: new gmaps.Size(0, -44) });
                    info.setPosition(record.position);
                    info.open({ map });
                }
            };

            node.addEventListener("click", (e) => {
                e.stopPropagation();
                openInfo();
            });
            node.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openInfo();
                }
            });
            node.addEventListener("mouseenter", () => callbacksRef.current.onMarkerHover?.(id));
            node.addEventListener("mouseleave", () => callbacksRef.current.onMarkerHover?.(null));

            if (useAdvanced) {
                record.marker = new gmaps.marker.AdvancedMarkerElement({
                    map,
                    position,
                    content: node,
                    title: property.property_name || "",
                });
            } else {
                const Overlay = overlayClassRef.current;
                gmaps.OverlayView.preventMapHitsAndGesturesFrom(node);
                record.marker = new Overlay(position, node);
                record.marker.setMap(map);
            }

            markersRef.current.set(id, record);
        });

        // Remove markers whose property is no longer in the list.
        markersRef.current.forEach((record, id) => {
            if (seen.has(id)) return;
            if (record.advanced) record.marker.map = null;
            else record.marker.setMap(null);
            markersRef.current.delete(id);
        });

        setValidCount(count);

        // Fit the view only when the SET of locations changed (not on every re-render).
        const boundsKey = boundsKeyParts.sort().join("|");
        if (boundsKey !== lastBoundsKeyRef.current) {
            lastBoundsKeyRef.current = boundsKey;
            if (infoWindowRef.current) infoWindowRef.current.close();

            if (count === 1) {
                map.setCenter(bounds.getCenter());
                map.setZoom(15);
            } else if (count > 1) {
                map.fitBounds(bounds, { top: 70, right: 50, bottom: 50, left: 50 });
            }
        }
    }, [properties, status, history]);

    // ---------- 3. Highlight the marker for the hovered / active card ----------
    useEffect(() => {
        markersRef.current.forEach((record, id) => {
            const active = id === highlightedId;
            record.node.classList.toggle("is-active", active);
            if (record.advanced) {
                record.marker.zIndex = active ? 1000 : null;
            } else {
                record.node.style.zIndex = active ? "1000" : "";
            }
        });
    }, [highlightedId, properties, status]);

    // ---------- render ----------
    const showEmpty = status === "ready" && !loading && validCount === 0;

    return (
        <div className="gpm-wrapper">
            <div ref={containerRef} className="gpm-map" />

            {status === "loading" && (
                <div className="gpm-state">
                    <span className="gpm-spinner" aria-hidden="true" />
                    Loading map...
                </div>
            )}

            {status === "error" && (
                <div className="gpm-state gpm-state--error">
                    Unable to load Google Map
                    {!API_KEY && (
                        <small>REACT_APP_GOOGLE_MAPS_API_KEY is missing in your .env file.</small>
                    )}
                </div>
            )}

            {showEmpty && <div className="gpm-state">No property locations available</div>}

            {status === "ready" && loading && (
                <div className="gpm-pill" role="status">Loading properties...</div>
            )}
        </div>
    );
};

export default React.memo(GooglePropertyMap);