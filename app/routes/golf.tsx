import { useState } from "react";
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

import type { SVGProps } from "react";

export function LightStarRounded(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        // fill="currentColor"
        d="m12 16.102l-3.63 2.192q-.16.079-.297.064q-.136-.016-.265-.094q-.13-.08-.196-.226t-.012-.319l.966-4.11l-3.195-2.77q-.135-.11-.178-.263t.019-.293t.165-.23q.104-.087.28-.118l4.216-.368l1.644-3.892q.068-.165.196-.238T12 5.364t.288.073t.195.238l1.644 3.892l4.215.368q.177.03.281.119q.104.088.166.229q.061.14.018.293t-.178.263l-3.195 2.77l.966 4.11q.056.171-.011.318t-.197.226q-.128.08-.265.095q-.136.015-.296-.064z"
      ></path>
    </svg>
  );
}

function LeaderBoardComponent() {
  const event = Route.useLoaderData();
  const players: PlayerData[] = event.competitions[0].competitors.slice(0, 20);

  const [favePlayers, setFavePlayers] = useState(["9478", "2230", "3470"]);

  return (
    <div>
      <div className="p-2 m-auto w-1/2">
        <div>
          <h1 className="font-semibold text-2xl">{event.name}</h1>
        </div>
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pos</TableHead>
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
                    <TableCell>{player.order}</TableCell>
                    <TableCell>
                      <div className="flex">
                        <div>
                          <img
                            src={player.athlete.flag.href}
                            className="w-6 h-6"
                          ></img>
                        </div>
                        <div className="ml-1">{player.athlete.displayName}</div>
                        <div>
                          <button
                            onClick={() =>
                              setFavePlayers((players) => [
                                ...players,
                                player.id,
                              ])
                            }
                          >
                            <LightStarRounded
                              className={`${favePlayers.includes(player.id) ? "fill-blue-600" : "fill-gray-400"}`}
                            />
                          </button>
                        </div>
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
