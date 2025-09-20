import { define } from "@/utils.ts";
import { TbArrowLeft } from "@preact-icons/tb";
import { HttpError } from "fresh";

export const handler = define.handlers({
  GET(ctx) {
    // First check if error is passed via search params
    let errorMessage = ctx.url.searchParams.get("error");

    // If no search param error, check ctx.error and narrow down the type
    if (!errorMessage && ctx.error) {
      if (ctx.error instanceof HttpError) {
        // Handle HttpError (has status and message)
        errorMessage = `${ctx.error.status}: ${
          ctx.error.message || "Unknown error"
        }`;
      } else if (ctx.error instanceof Error) {
        // Handle standard Error instances
        errorMessage = ctx.error.message;
      } else {
        // Handle unknown error types
        errorMessage = String(ctx.error);
      }
    }

    // Default error message if nothing else is found
    const error = errorMessage || "An unknown error occurred";

    return { data: { error } };
  },

  POST(ctx) {
    // First check if error is passed via search params
    let errorMessage = ctx.url.searchParams.get("error");

    // If no search param error, check ctx.error and narrow down the type
    if (!errorMessage && ctx.error) {
      if (ctx.error instanceof HttpError) {
        // Handle HttpError (has status and message)
        errorMessage = `${ctx.error.status}: ${
          ctx.error.message || "Unknown error"
        }`;
      } else if (ctx.error instanceof Error) {
        // Handle standard Error instances
        errorMessage = ctx.error.message;
      } else {
        // Handle unknown error types
        errorMessage = String(ctx.error);
      }
    }

    // Default error message if nothing else is found
    const error = errorMessage || "An unknown error occurred";

    return { data: { error } };
  },
});

export default define.page<typeof handler>(function Error({ data }) {
  return (
    <div className="card bg-base-300 container mt-4 min-h-72 mx-auto text-center flex flex-col justify-center items-center gap-4">
      <div role="alert" className="alert alert-error min-w-1/2 text-center">
        <span>Oh no! {data.error}</span>
      </div>
      <a href="/" className="btn btn-primary">
        Home
        <TbArrowLeft size={32} />
      </a>
    </div>
  );
});
