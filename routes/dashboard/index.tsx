import { define } from "@/utils.ts";
import { TbCirclePlusFilled } from "@preact-icons/tb";

export default define.page(({ state }) => {
  return (
    <div class="p-4">
      <h2 class="text-2xl">Locations</h2>
      {state.locations.length > 0
        ? (
          <div class="flex flex-wrap mt-4 gap-2">
            {state.locations.map((location) => (
              <div
                class="card card-compact bg-base-300 h-40 w-72"
                key={location.id}
              >
                <div class="card-body">
                  <h3 class="card-title">{location.name}</h3>
                  <p class="card-text">{location.description}</p>
                </div>
              </div>
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
