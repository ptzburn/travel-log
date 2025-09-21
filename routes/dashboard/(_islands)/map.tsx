import { useEffect, useRef } from "preact/hooks";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useSignal } from "@preact/signals";
import { HELSINKI } from "@/lib/constants.ts";
import { mapPoints } from "@/signals/map.ts";

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
        : "/dark.json", // More reliable style URL
      center: HELSINKI, // starting position [lng, lat]
      zoom: 8, // starting zoom
    });

    // Create a one-time event listener for the initial map movement
    const initializeMarkers = () => {
      if (!mapRef.current) return;

      mapPoints.value.forEach((point) => {
        const element = document.createElement("div");

        element.innerHTML = `
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z"></path></svg>
        `;

        element.className = "text-secondary tooltip tooltip-top";
        element.setAttribute("data-tip", point.label);

        new maplibregl.Marker({
          element,
        }).setLngLat([point.long, point.lat]).addTo(mapRef.current!);
      });

      if (mapPoints.value.length > 0) {
        const firstPoint = mapPoints.value[0];
        const bounds = mapPoints.value.reduce(
          (bounds, point) => {
            return bounds.extend([point.long, point.lat]);
          },
          new maplibregl.LngLatBounds(
            [firstPoint.long, firstPoint.lat],
            [firstPoint.long, firstPoint.lat],
          ),
        );

        // Remove the event listener since we only need it once
        mapRef.current.off("moveend", initializeMarkers);

        mapRef.current.fitBounds(bounds, {
          padding: 50,
        });
      }
    };

    mapRef.current.on("load", initializeMarkers);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [isLightMode.value, mapPoints.value]);

  return (
    <div
      ref={mapContainer}
      class="border border-base-300 rounded-lg shadow-sm flex-1"
    />
  );
}

export default Map;
