import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { getLeaderboard } from "../utils/espn";

export const Route = createFileRoute("/golf")({
  loader: async () => getLeaderboard(),
  component: LeaderBoardComponent,
});

function LeaderBoardComponent() {
  const event = Route.useLoaderData();

  return (
    <div className="p-2 flex gap-2">
      <h1>{event.name}</h1>
    </div>
  );
}
