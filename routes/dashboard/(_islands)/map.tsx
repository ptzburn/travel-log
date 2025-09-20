import { useEffect, useRef } from "preact/hooks";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useSignal } from "@preact/signals";

function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const isLightMode = useSignal(false);

  useEffect(() => {
    const themeToggle = document.getElementById(
      "theme-toggle",
    ) as HTMLInputElement;

    themeToggle.addEventListener("change", () => {
      isLightMode.value = themeToggle.checked;
    });

    if (!mapContainer.current) return;

    // Initialize the map
    mapRef.current = new maplibregl.Map({
      container: mapContainer.current,
      // style: "https://tiles.openfreemap.org/styles/liberty", // More reliable style URL
      style: isLightMode.value
        ? "https://tiles.openfreemap.org/styles/liberty"
        : "dark.json", // More reliable style URL
      center: [24.945831, 60.192059], // starting position [lng, lat]
      zoom: 8, // starting zoom
    });
  }, [isLightMode.value]);

  return (
    <div
      ref={mapContainer}
      class="border border-base-300 rounded-lg shadow-sm flex-1"
    />
  );
}

export default Map;
