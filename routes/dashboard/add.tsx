import { define } from "@/utils.ts";
import { TbArrowLeft, TbCirclePlusFilled } from "@preact-icons/tb";
import { InsertLocationSchema } from "@/lib/db/schema/location.ts";
import { ZodError } from "zod";

interface HandlerData {
  message: string;
  errors: { field: string; message: string }[];
}

export const handler = define.handlers({
  GET() {
    return { data: { message: "", errors: [] } as HandlerData };
  },
  async POST(ctx) {
    const form = await ctx.req.formData();

    try {
      const formData = {
        name: form.get("name")?.toString().trim(),
        description: form.get("description")?.toString().trim(),
        lat: form.get("lat")
          ? parseFloat(form.get("lat")!.toString().trim())
          : undefined,
        long: form.get("long")
          ? parseFloat(form.get("long")!.toString().trim())
          : undefined,
      };

      const validatedData = InsertLocationSchema.parse(formData);

      // Process the validated data
      console.log("Creating location:", validatedData);

      // TODO: Add user ID and slug generation
      // const user = await getCurrentUser(ctx);
      // const slug = generateSlug(validatedData.name);
      // const locationData = { ...validatedData, userId: user.id, slug };

      // TODO: Save to database
      // await db.insert(location).values(locationData);

      return new Response(null, {
        status: 303,
        headers: { location: "/dashboard" },
      });
    } catch (error) {
      if (error instanceof ZodError) {
        // Return validation errors in a user-friendly format
        return {
          data: {
            message: "Validation failed",
            errors: error.issues.map((issue) => ({
              field: issue.path.join("."),
              message: issue.message,
            })),
          },
        };
      }

      console.error("Unexpected error:", error);
      return {
        data: { message: "Internal server error", errors: [] } as HandlerData,
      };
    }
  },
});

export default define.page<typeof handler>(function Add({ data }) {
  return (
    <div class="container max-w-md mx-auto mt-4">
      <div class="my-4">
        <h1 class="text-lg">Add Location</h1>
        <p class="text-sm">
          A location is a place you have travelled or will travel to. It can be
          a city, country, state or point of interest. You can add specific
          times you visited this location after adding it.
        </p>
      </div>
      <form method="post" class="flex flex-col gap-2" autocomplete="off">
        <fieldset class="fieldset">
          <legend class="fieldset-legend">Name</legend>
          <input
            name="name"
            type="text"
            minlength={1}
            maxlength={100}
            required
            class={`input w-full ${
              data.errors.find((e) => e.field === "name")
                ? "input-error"
                : "validator"
            }`}
          />
          {data.errors.find((e) => e.field === "name") && (
            <p class="fieldset-label text-error">
              {data.errors.find((e) => e.field === "name")?.message}
            </p>
          )}
          <p class="validator-hint">Must be between 1 and 100 characters</p>
        </fieldset>
        <fieldset class="fieldset">
          <legend class="fieldset-legend">Description</legend>
          <textarea
            name="description"
            maxlength={1000}
            class={`textarea w-full ${
              data.errors.find((e) => e.field === "description")
                ? "input-error"
                : "validator"
            }`}
          />
          {data.errors.find((e) => e.field === "description") && (
            <p class="fieldset-label text-error">
              {data.errors.find((e) => e.field === "description")?.message}
            </p>
          )}
          <p class="validator-hint">Must be less than 1000 characters</p>
        </fieldset>
        <fieldset class="fieldset">
          <legend class="fieldset-legend">Latitude</legend>
          <input
            name="lat"
            type="number"
            min="-90"
            max="90"
            required
            class={`input w-full ${
              data.errors.find((e) => e.field === "lat")
                ? "input-error"
                : "validator"
            }`}
          />
          {data.errors.find((e) => e.field === "lat") && (
            <p class="fieldset-label text-error">
              {data.errors.find((e) => e.field === "lat")?.message}
            </p>
          )}
          <p class="validator-hint">Must be between -90 and 90</p>
        </fieldset>
        <fieldset class="fieldset">
          <legend class="fieldset-legend">Longitude</legend>
          <input
            name="long"
            type="number"
            min="-180"
            max="180"
            required
            class={`input w-full ${
              data.errors.find((e) => e.field === "long")
                ? "input-error"
                : "validator"
            }`}
          />

          {data.errors.find((e) => e.field === "long") && (
            <p class="fieldset-label text-error">
              {data.errors.find((e) => e.field === "long")?.message}
            </p>
          )}
          <p class="validator-hint">Must be between -180 and 180</p>
        </fieldset>
        <div class="flex justify-end gap-2">
          <button type="button" class="btn btn-outline">
            <TbArrowLeft size={24} />
            Cancel
          </button>
          <button type="submit" class="btn btn-primary">
            Add
            <TbCirclePlusFilled size={24} />
          </button>
        </div>
      </form>
    </div>
  );
});
