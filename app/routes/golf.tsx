import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { getScoreboard, PlayerData } from "../utils/espn";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/golf")({
  loader: async () => getScoreboard(),
  component: LeaderBoardComponent,
});

function LeaderBoardComponent() {
  const event = Route.useLoaderData();
  const players: PlayerData[] = event.competitions[0].competitors.slice(0, 20);

  return (
    <div>
      <div className="p-2 m-auto w-1/2">
        <div>
          <h1 className="text-3xl p-2">{event.name}</h1>
        </div>
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Player</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>R1</TableHead>
                <TableHead>R2</TableHead>
                <TableHead>R3</TableHead>
                <TableHead>R4</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {players.map((player) => {
                return (
                  <TableRow key={player.id}>
                    <TableCell>
                      <div className="flex">
                        <div>
                          <img
                            src={player.athlete.flag.href}
                            className="w-6 h-6"
                          ></img>
                        </div>
                        <div className="ml-1">{player.athlete.displayName}</div>
                      </div>
                    </TableCell>
                    <TableCell>{player.score}</TableCell>
                    <TableCell>{player.linescores[0]?.value || 0}</TableCell>
                    <TableCell>{player.linescores[1]?.value || 0}</TableCell>
                    <TableCell>{player.linescores[2]?.value || 0}</TableCell>
                    <TableCell>{player.linescores[3]?.value || 0}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
