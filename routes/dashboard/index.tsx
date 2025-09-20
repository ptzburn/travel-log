import { define } from "@/utils.ts";
import { TbCirclePlusFilled } from "@preact-icons/tb";
import { findLocations } from "@/lib/db/queries/location.ts";

export const handler = define.handlers({
  async GET(ctx) {
    const locations = await findLocations(Number(ctx.state.user!.id));
    ctx.state.sideBarItems = locations.map((location) => ({
      label: location.name,
      href: "#",
    }));
    return { data: { locations }, status: 200 };
  },
});

export default define.page<typeof handler>(({ data }) => {
  return (
    <div class="p-4">
      <h2 class="text-2xl">Locations</h2>
      {data.locations.length > 0
        ? (
          <div class="flex flex-wrap mt-4 gap-2">
            {data.locations.map((location) => (
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
