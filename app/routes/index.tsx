import { createFileRoute } from "@tanstack/react-router";
import { getTourDashboard, EventData } from "../utils/espn";
import { useAtomValue } from "jotai";
import { assignRealRanks, getHighestStats } from "../utils/golf";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { favePlayersAtom } from "@/utils/favePlayers";
import { TournementSummaryCard } from "@/components/ui/tournementSummaryCard";
import { Component } from "@/components/donutChart";

export const Route = createFileRoute("/")({
  loader: async () => getTourDashboard(),
  component: Home,
});

import type { SVGProps } from "react";

export function MaterialSymbolsTrophyOutline(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M7 21v-2h4v-3.1q-1.225-.275-2.187-1.037T7.4 12.95q-1.875-.225-3.137-1.637T3 8V7q0-.825.588-1.412T5 5h2V3h10v2h2q.825 0 1.413.588T21 7v1q0 1.9-1.263 3.313T16.6 12.95q-.45 1.15-1.412 1.913T13 15.9V19h4v2zm0-10.2V7H5v1q0 .95.55 1.713T7 10.8m5 3.2q1.25 0 2.125-.875T15 11V5H9v6q0 1.25.875 2.125T12 14m5-3.2q.9-.325 1.45-1.088T19 8V7h-2zm-5-1.3"
      ></path>
    </svg>
  );
}

function Home() {
  const { postEvent, currentEvent, nextEvent, players } = Route.useLoaderData();
  const sortedPlayers = assignRealRanks(players || []);
  const favePlayersList = useAtomValue(favePlayersAtom);
  const favePlayers = sortedPlayers.filter((player) =>
    favePlayersList.includes(player.id),
  );
  console.log(favePlayersList);
  const topPlayerStats = getHighestStats(favePlayers);
  return (
    <div className="md:flex min-h-screen pt-4">
      <div className="p-2 md:w-1/3 mx-auto">
        <div className="flex flex-col gap-2">
          {currentEvent && <TournementSummaryCard event={currentEvent} />}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <TournementSummaryCard event={postEvent} />
            <TournementSummaryCard event={nextEvent} />
          </div>
        </div>
      </div>
      <div className="p-2 md:w-1/2 mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Favorite Players</CardTitle>
            <CardDescription>
              {currentEvent ? currentEvent.label : postEvent.label}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pos</TableHead>
                  <TableHead>Player</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Eagles</TableHead>
                  <TableHead>Birdies</TableHead>
                  <TableHead>Pars</TableHead>
                  <TableHead>Bogeys</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {favePlayers.length > 0 &&
                  favePlayers.map((player) => {
                    return (
                      <TableRow key={player.id}>
                        <TableCell>
                          {player.isTied
                            ? "T" + player.realRank
                            : player.realRank}
                        </TableCell>
                        <TableCell>
                          <div className="flex">
                            <div>
                              <img
                                src={player.countryFlag}
                                className="w-6 h-6"
                              ></img>
                            </div>
                            <div className="ml-1">{player.displayName}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {
                            player.stats.find(
                              (stat) => stat.name === "scoreToPar",
                            )?.displayValue
                          }
                        </TableCell>
                        <TableCell>
                          {
                            player.stats.find((stat) => stat.name === "eagles")
                              ?.displayValue
                          }
                        </TableCell>
                        <TableCell>
                          {
                            player.stats.find((stat) => stat.name === "birdies")
                              ?.displayValue
                          }
                        </TableCell>
                        <TableCell>
                          {
                            player.stats.find((stat) => stat.name === "pars")
                              ?.displayValue
                          }
                        </TableCell>
                        <TableCell>
                          {
                            player.stats.find((stat) => stat.name === "bogeys")
                              ?.displayValue
                          }
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <div className="md:flex gap-2">
          <div className="pt-2 w-full md:w-1/2 flex flex-wrap gap-2">
            {favePlayers.length > 0 && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Player Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="flex justify-between">
                        <Avatar>
                          <AvatarImage
                            src={`https://a.espncdn.com/i/headshots/golf/players/full/${topPlayerStats["driveDistAvg"].id}.png`}
                            className="object-cover"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <div className="text-2xl">
                            {topPlayerStats["driveDistAvg"].stat?.displayValue}{" "}
                            Yds
                          </div>
                          <div>
                            {topPlayerStats["driveDistAvg"].stat?.displayName}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <Avatar>
                          <AvatarImage
                            src={`https://a.espncdn.com/i/headshots/golf/players/full/${topPlayerStats["gir"].id}.png`}
                            className="object-cover"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <div className="text-2xl">
                            {topPlayerStats["gir"].stat?.displayValue}%
                          </div>
                          <div>GIR</div>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <Avatar>
                          <AvatarImage
                            src={`https://a.espncdn.com/i/headshots/golf/players/full/${topPlayerStats["sandSaves"].id}.png`}
                            className="object-cover"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <div className="text-2xl">
                            {topPlayerStats["sandSaves"].stat?.displayValue}%
                          </div>
                          <div>
                            {topPlayerStats["sandSaves"].stat?.displayName}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <Avatar>
                          <AvatarImage
                            src={`https://a.espncdn.com/i/headshots/golf/players/full/${topPlayerStats["puttsGirAvg"].id}.png`}
                            className="object-cover"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <div className="text-2xl">
                            {topPlayerStats["puttsGirAvg"].stat?.displayValue}
                          </div>
                          <div>
                            {topPlayerStats["puttsGirAvg"].stat?.displayName}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
          <div className="w-full md:w-1/2 pt-2 mx-auto">
            <Component
              playerData={players}
              currentEvent={currentEvent}
              postEvent={postEvent}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
