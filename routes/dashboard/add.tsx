import { define } from "@/utils.ts";
import { InsertLocationSchema, location } from "@/lib/db/schema/location.ts";
import { ZodError } from "zod";
import UnsavedChanges from "./(_islands)/unsaved-changes.tsx";
import CancelLocationButton from "./(_islands)/cancel-location-button.tsx";
import AddLocationButton from "./(_islands)/add-location-button.tsx";
import { isLoading } from "@/utils.ts";
import db from "@/lib/db/db.ts";

interface HandlerData {
  message: string;
  errors: { field: string; message: string }[];
}

export const handler = define.handlers({
  GET() {
    return { data: { message: "", errors: [] } as HandlerData };
  },
  async POST(ctx) {
    if (!ctx.state.user) {
      const headers = new Headers();
      headers.set("location", "/");
      return new Response(null, {
        status: 401, // Unauthorized
        headers,
      });
    }

    await new Promise((resolve) => setTimeout(resolve, 5000));
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

      const [created] = await db.insert(location).values({
        ...validatedData,
        userId: Number(ctx.state.user?.id),
        slug: validatedData.name.replaceAll(" ", "-").toLowerCase(),
      }).returning();

      console.log(created);

      // Redirect user to dashboard.
      const headers = new Headers();
      headers.set("location", "/dashboard");
      return new Response(null, {
        status: 303, // See Other
        headers,
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
          status: 422,
        };
      }

      if (error instanceof Error) {
        return {
          data: {
            message: error.message,
            errors: [],
          },
          status: 500,
        };
      }

      return {
        data: {
          message: "Internal server error",
          errors: [],
        },
        status: 500,
      };
    }
  },
});

export default define.page<typeof handler>(function Add({ data }) {
  return (
    <div class="container max-w-md mx-auto mt-4">
      <UnsavedChanges />
      <div class="my-4">
        <h1 class="text-lg">Add Location</h1>
        <p class="text-sm">
          A location is a place you have travelled or will travel to. It can be
          a city, country, state or point of interest. You can add specific
          times you visited this location after adding it.
        </p>
      </div>
      {data.message && data.errors.length === 0 && (
        <div role="alert" class="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{data.message}</span>
        </div>
      )}
      <form
        method="post"
        class="flex flex-col gap-2"
        autocomplete="off"
        f-client-nav={false}
        id="add-location-form"
      >
        <fieldset class="fieldset">
          <legend class="fieldset-legend">Name</legend>
          <input
            name="name"
            type="text"
            disabled={isLoading.peek()}
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
            disabled={isLoading.peek()}
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
            disabled={isLoading.peek()}
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
            disabled={isLoading.peek()}
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
          <CancelLocationButton />
          <AddLocationButton />
        </div>
      </form>
    </div>
  );
});
