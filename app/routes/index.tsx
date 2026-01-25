import { createFileRoute } from "@tanstack/react-router";
import { getTourDashboard } from "../utils/espn";
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
import { GrandSlamTracker } from "@/components/grandSlamTracker";

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
  const eventLabel = currentEvent?.label ?? postEvent?.label ?? "N/A";

  const topPlayerStats = getHighestStats(favePlayers);
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-950 via-slate-950 to-emerald-900 text-emerald-50">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.25),_transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(120deg,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(60deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:22px_22px]" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-12 pt-10 font-[var(--font-body)]">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.4em] text-emerald-200/70">
              Tour telemetry
            </div>
            <div className="mt-3 text-3xl font-[var(--font-display)] tracking-tight text-white sm:text-4xl">
              Grand Slam Control Room
            </div>
            <div className="mt-3 max-w-xl text-sm text-emerald-100/70">
              Live signal around {eventLabel}. Track majors, favorites, and pace
              of play in one nocturnal cockpit.
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-full border border-emerald-300/40 bg-emerald-400/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-emerald-100/80">
              <MaterialSymbolsTrophyOutline className="h-4 w-4 text-emerald-200" />
              {eventLabel}
            </div>
            <div className="rounded-full border border-emerald-300/20 bg-slate-950/40 px-4 py-2 text-xs uppercase tracking-[0.25em] text-emerald-200/70">
              Favorites {favePlayers.length}
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-12">
          <section className="space-y-6 lg:col-span-4">
            <div className="rounded-2xl border border-emerald-300/10 bg-slate-950/40 p-4 shadow-[0_18px_45px_-32px_rgba(15,118,110,0.6)] backdrop-blur">
              <div className="text-xs uppercase tracking-[0.3em] text-emerald-200/60">
                Tournament Snapshot
              </div>
              <div className="mt-4 flex flex-col gap-3">
                {currentEvent && (
                  <TournementSummaryCard
                    event={currentEvent}
                    className="bg-slate-950/60"
                  />
                )}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  {postEvent && (
                    <TournementSummaryCard
                      event={postEvent}
                      className="bg-slate-950/60"
                    />
                  )}
                  {nextEvent && (
                    <TournementSummaryCard
                      event={nextEvent}
                      className="bg-slate-950/60"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-emerald-300/10 bg-slate-950/50 p-4 text-emerald-100/70 shadow-[0_18px_45px_-32px_rgba(15,118,110,0.6)] backdrop-blur">
              <div className="text-xs uppercase tracking-[0.3em] text-emerald-200/60">
                Roster Focus
              </div>
              <div className="mt-3 text-sm">
                Tracking {favePlayers.length} favorites across the leaderboard.
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.3em] text-emerald-200/50">
                Manual picks only
              </div>
            </div>
          </section>

          <section className="space-y-6 lg:col-span-8">
            <GrandSlamTracker />
            <Card className="relative overflow-hidden border-0 bg-slate-950/50 text-emerald-50 shadow-[0_18px_45px_-32px_rgba(15,118,110,0.6)] backdrop-blur">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.2),_transparent_55%)]" />
              <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(120deg,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(60deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:18px_18px]" />
              <CardHeader className="relative">
                <div className="text-xs uppercase tracking-[0.3em] text-emerald-200/60">
                  Favorite Players
                </div>
                <CardTitle className="mt-2 text-2xl font-[var(--font-display)] tracking-tight text-white">
                  Favorites Leaderboard
                </CardTitle>
                <CardDescription className="text-xs text-emerald-100/70">
                  {eventLabel}
                </CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <Table className="text-emerald-100/80">
                  <TableHeader className="[&_tr]:border-emerald-300/10">
                    <TableRow className="border-emerald-300/10">
                      <TableHead className="text-[10px] uppercase tracking-[0.3em] text-emerald-200/60">
                        Pos
                      </TableHead>
                      <TableHead className="text-[10px] uppercase tracking-[0.3em] text-emerald-200/60">
                        Player
                      </TableHead>
                      <TableHead className="text-[10px] uppercase tracking-[0.3em] text-emerald-200/60">
                        Score
                      </TableHead>
                      <TableHead className="text-[10px] uppercase tracking-[0.3em] text-emerald-200/60">
                        Eagles
                      </TableHead>
                      <TableHead className="text-[10px] uppercase tracking-[0.3em] text-emerald-200/60">
                        Birdies
                      </TableHead>
                      <TableHead className="text-[10px] uppercase tracking-[0.3em] text-emerald-200/60">
                        Pars
                      </TableHead>
                      <TableHead className="text-[10px] uppercase tracking-[0.3em] text-emerald-200/60">
                        Bogeys
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="[&_tr:last-child]:border-0">
                    {favePlayers.length > 0 &&
                      favePlayers.map((player) => {
                        return (
                          <TableRow
                            key={player.id}
                            className="border-emerald-300/10 hover:bg-emerald-500/10"
                          >
                            <TableCell className="text-sm text-emerald-50">
                              {player.isTied
                                ? "T" + player.realRank
                                : player.realRank}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <img
                                  src={player.countryFlag}
                                  className="h-6 w-6 rounded-full ring-1 ring-emerald-300/40"
                                ></img>
                                <div className="text-sm text-emerald-50">
                                  {player.displayName}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm text-emerald-50">
                              {
                                player.stats.find(
                                  (stat) => stat.name === "scoreToPar",
                                )?.displayValue
                              }
                            </TableCell>
                            <TableCell className="text-sm text-emerald-50">
                              {
                                player.stats.find(
                                  (stat) => stat.name === "eagles",
                                )?.displayValue
                              }
                            </TableCell>
                            <TableCell className="text-sm text-emerald-50">
                              {
                                player.stats.find(
                                  (stat) => stat.name === "birdies",
                                )?.displayValue
                              }
                            </TableCell>
                            <TableCell className="text-sm text-emerald-50">
                              {
                                player.stats.find(
                                  (stat) => stat.name === "pars",
                                )?.displayValue
                              }
                            </TableCell>
                            <TableCell className="text-sm text-emerald-50">
                              {
                                player.stats.find(
                                  (stat) => stat.name === "bogeys",
                                )?.displayValue
                              }
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="flex flex-wrap gap-4">
                {favePlayers.length > 0 && (
                  <Card className="relative w-full overflow-hidden border-0 bg-slate-950/50 text-emerald-50 shadow-[0_18px_45px_-32px_rgba(15,118,110,0.6)] backdrop-blur">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_55%)]" />
                    <CardHeader className="relative">
                      <div className="text-xs uppercase tracking-[0.3em] text-emerald-200/60">
                        Player Stats
                      </div>
                      <CardTitle className="mt-2 text-xl font-[var(--font-display)] tracking-tight text-white">
                        Best in the bag
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="relative">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="flex items-center justify-between gap-3">
                          <Avatar className="h-12 w-12 ring-2 ring-emerald-300/50">
                            <AvatarImage
                              src={`https://a.espncdn.com/i/headshots/golf/players/full/${topPlayerStats["driveDistAvg"].id}.png`}
                              className="object-cover"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-2xl text-emerald-50">
                              {topPlayerStats["driveDistAvg"].stat
                                ?.displayValue}{" "}
                              Yds
                            </div>
                            <div className="text-xs uppercase tracking-[0.3em] text-emerald-200/60">
                              {
                                topPlayerStats["driveDistAvg"].stat
                                  ?.displayName
                              }
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <Avatar className="h-12 w-12 ring-2 ring-emerald-300/50">
                            <AvatarImage
                              src={`https://a.espncdn.com/i/headshots/golf/players/full/${topPlayerStats["gir"].id}.png`}
                              className="object-cover"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-2xl text-emerald-50">
                              {topPlayerStats["gir"].stat?.displayValue}%
                            </div>
                            <div className="text-xs uppercase tracking-[0.3em] text-emerald-200/60">
                              GIR
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <Avatar className="h-12 w-12 ring-2 ring-emerald-300/50">
                            <AvatarImage
                              src={`https://a.espncdn.com/i/headshots/golf/players/full/${topPlayerStats["sandSaves"].id}.png`}
                              className="object-cover"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-2xl text-emerald-50">
                              {topPlayerStats["sandSaves"].stat?.displayValue}%
                            </div>
                            <div className="text-xs uppercase tracking-[0.3em] text-emerald-200/60">
                              {
                                topPlayerStats["sandSaves"].stat?.displayName
                              }
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <Avatar className="h-12 w-12 ring-2 ring-emerald-300/50">
                            <AvatarImage
                              src={`https://a.espncdn.com/i/headshots/golf/players/full/${topPlayerStats["puttsGirAvg"].id}.png`}
                              className="object-cover"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-2xl text-emerald-50">
                              {
                                topPlayerStats["puttsGirAvg"].stat
                                  ?.displayValue
                              }
                            </div>
                            <div className="text-xs uppercase tracking-[0.3em] text-emerald-200/60">
                              {
                                topPlayerStats["puttsGirAvg"].stat?.displayName
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
              <div className="w-full">
                <Component
                  playerData={players}
                  currentEvent={currentEvent}
                  postEvent={postEvent}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
