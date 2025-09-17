import { define } from "@/utils.ts";
import { TbArrowLeft } from "@preact-icons/tb";

export const handler = define.handlers({
  GET(ctx) {
    const error = ctx.url.searchParams.get("error") || "Unknown error";
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
