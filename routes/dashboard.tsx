import { define } from "@/utils.ts";

export default define.page(function Dashboard(ctx) {
  const { user } = ctx.state;

  return (
    <div>
      <h1>Hello {user?.name}</h1>
    </div>
  );
});
