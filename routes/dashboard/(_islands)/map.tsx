import { useEffect, useRef } from "preact/hooks";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useSignal } from "@preact/signals";
import { HELSINKI } from "@/lib/constants.ts";
import {
  mapPoints,
  selectPointWithoutFly,
  shouldFlyTo,
} from "@/signals/map.ts";
import { selectedMapPoint } from "@/signals/map.ts";

function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const isLightMode = useSignal(false);
  const padding = 50;

  // Effect for map initialization and bounds fitting - runs only on mount and when points change
  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize the map
    mapRef.current = new maplibregl.Map({
      container: mapContainer.current,
      style: isLightMode.value
        ? "https://tiles.openfreemap.org/styles/liberty"
        : "/dark.json",
      center: HELSINKI,
      zoom: 8,
    });

    if (!mapRef.current) return;

    // Fit bounds if there are points
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

      mapRef.current.fitBounds(bounds, {
        padding,
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [isLightMode.value, mapPoints.value]);

  // Effect for theme toggle listener
  useEffect(() => {
    const themeToggle = document.getElementById(
      "theme-toggle",
    ) as HTMLInputElement;

    const handler = () => {
      isLightMode.value = themeToggle.checked;
    };

    themeToggle.addEventListener("change", handler);
    return () => themeToggle.removeEventListener("change", handler);
  }, []);

  // Effect for markers - updates when points or selection changes
  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing markers
    const markers = mapRef.current.getCanvasContainer().getElementsByClassName(
      "maplibregl-marker",
    );
    while (markers.length > 0) {
      markers[0].remove();
    }

    // Add new markers
    mapPoints.value.forEach((point) => {
      const element = document.createElement("div");

      element.innerHTML = `
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z"></path></svg>
        `;

      element.className = `tooltip tooltip-top cursor-pointer ${
        selectedMapPoint.value?.id === point.id
          ? "text-accent tooltip-open"
          : "text-secondary"
      }`;
      element.setAttribute("data-tip", point.name);

      // Add mouse event listeners
      element.addEventListener("mouseenter", () => {
        selectPointWithoutFly(point);
      });
      element.addEventListener("mouseleave", () => {
        selectPointWithoutFly(null);
      });

      const popup = new maplibregl.Popup().setHTML(
        `<h3 class="text-xl">${point.name}</h1>
          <p class="text-sm">${point.description}</p>
          `,
      );

      new maplibregl.Marker({
        element,
      }).setLngLat([point.long, point.lat]).setPopup(popup).addTo(
        mapRef.current!,
      );
    });

    if (selectedMapPoint.value) {
      if (shouldFlyTo.value) {
        mapRef.current?.flyTo({
          center: [selectedMapPoint.value.long, selectedMapPoint.value.lat],
          zoom: 5,
          speed: 0.8,
        });
      } else {
        shouldFlyTo.value = true;
      }
    } else {
      mapRef.current?.fitBounds(
        mapPoints.value.reduce(
          (bounds, point) => bounds.extend([point.long, point.lat]),
          new maplibregl.LngLatBounds([0, 0], [0, 0]),
        ),
        { padding },
      );
    }
  }, [mapPoints.value, selectedMapPoint.value]);

  return (
    <div
      ref={mapContainer}
      class="border border-base-300 rounded-lg shadow-sm flex-1"
    />
  );
}

export default Map;
