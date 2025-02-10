import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { getScoreboard } from "../utils/espn";

export const Route = createFileRoute("/golf")({
  loader: async () => getScoreboard(),
  component: LeaderBoardComponent,
});

function LeaderBoardComponent() {
  const event = Route.useLoaderData();
  const players = event.competitions[0].competitors.slice(0, 20);

  return (
    <div className="p-2 m-auto w-1/2">
      <div>
        <h1>{event.name}</h1>
      </div>
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead>
            <tr>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Player
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Score
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                R1
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                R2
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                R3
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                R4
              </th>
            </tr>
          </thead>
          {players.map((player) => {
            return (
              <tr key={player.id} className="p-2">
                <td className="p-2 align-middle">
                  <div className="flex">
                    <div>
                      <img
                        src={player.athlete.flag.href}
                        className="w-6 h-6 rounded-full"
                      ></img>
                    </div>
                    <div>{player.athlete.displayName}</div>
                  </div>
                </td>
                <td>{player.score}</td>
                <td>{player.linescores[0].value}</td>
                <td>{player.linescores[1].value}</td>
                <td>{player.linescores[2].value}</td>
                <td>{player.linescores[3].value}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}
