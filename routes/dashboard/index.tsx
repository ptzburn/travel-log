import { define } from "@/utils.ts";
import { TbCirclePlusFilled } from "@preact-icons/tb";
import LocationCard from "./(_islands)/location-card.tsx";

export default define.page(({ state }) => {
  return (
    <div class="p-4">
      <h2 class="text-2xl">Locations</h2>
      {state.locations.length > 0
        ? (
          <div class="flex flex-nowrap mt-4 gap-2 overflow-auto">
            {state.locations.map((location) => (
              <LocationCard location={location} />
            ))}
          </div>
        )
        : (
          <div class="flex flex-col gap-2 mt-4">
            <p>Add a location to get started</p>
            <a href="/dashboard/add" class="btn btn-primary w-40">
              Add Location <TbCirclePlusFilled size={24} />
            </a>
          </div>
        )}
    </div>
  );
});
