import { createFileRoute } from "@tanstack/react-router";
import { PlayerData, getLeaderboard } from "../utils/espn";
import { DataTable } from "@/components/playersTable/data-table";
import { columns } from "@/components/playersTable/columns";

export const Route = createFileRoute("/golf")({
  loader: async () => getLeaderboard(),
  component: LeaderBoardComponent,
});

function LeaderBoardComponent() {
  const event = Route.useLoaderData();
  const players: PlayerData[] = event.competitions[0].competitors
    .slice()
    .sort(
      (a, b) =>
        (a.sortOrder ?? Number.POSITIVE_INFINITY) -
        (b.sortOrder ?? Number.POSITIVE_INFINITY),
    );

  return (
    <div>
      <div className="p-2 m-auto md:w-1/2">
        <div className="py-4">
          <h1 className="font-semibold text-2xl">{event.name}</h1>
          <div>{event.competitions[0].status.type.detail}</div>
        </div>
        <div>
          <DataTable columns={columns} data={players} />
        </div>
      </div>
    </div>
  );
}
