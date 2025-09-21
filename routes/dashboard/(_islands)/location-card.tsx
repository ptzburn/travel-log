import { SelectLocation } from "@/lib/db/schema/location.ts";
import { selectedMapPoint } from "@/signals/map.ts";
import { useComputed } from "@preact/signals";

function LocationCard({ location }: { location: SelectLocation }) {
  const isSelected = useComputed(() =>
    selectedMapPoint.value?.id === location.id
  );

  const handleMouseEnter = () => {
    selectedMapPoint.value = location;
  };

  const handleMouseLeave = () => {
    selectedMapPoint.value = null;
  };

  return (
    <div
      class={`card card-compact bg-base-300 mb-4 h-40 w-72 border-2 shrink-0 hover:cursor-pointer ${
        isSelected.value ? "border-accent" : "border-transparent"
      }`}
      key={location.id}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div class="card-body">
        <h3 class="card-title">{location.name}</h3>
        <p class="card-text">{location.description}</p>
      </div>
    </div>
  );
}

export default LocationCard;
