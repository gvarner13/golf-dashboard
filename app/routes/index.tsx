import { createFileRoute } from "@tanstack/react-router";
import { getTourDashboard, EventData } from "../utils/espn";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

const favePlayersList = ["9478", "2230", "3470"];

function Home() {
  const { postEvent, currentEvent, nextEvent, players } = Route.useLoaderData();
  const favePlayers = players.filter((player) =>
    favePlayersList.includes(player.id)
  );
  return (
    <div className="flex min-h-screen">
      <div className="p-2 w-1/3 mx-auto">
        <Card key={postEvent.id} className="mb-2">
          <CardHeader>
            <CardTitle>{postEvent.label}</CardTitle>
            <CardDescription>{postEvent.locations[0]}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <div>
                {postEvent.status === "post" ? (
                  <div>
                    <div>Winner</div>
                    <div className="flex">
                      <div className="mr-1">
                        <MaterialSymbolsTrophyOutline />
                      </div>
                      <div>
                        {postEvent.winner?.competitors?.displayName || "N/A"}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div>Defending Champ</div>
                    <div className="flex">
                      <div className="mr-1">
                        <MaterialSymbolsTrophyOutline />
                      </div>
                      <div>
                        {postEvent.defendingChampion?.displayName || "N/A"}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <div>{postEvent.detail}</div>
                <div>{postEvent.purse?.displayValue}</div>
                <div>
                  <Badge>{postEvent.isMajor ? "Major" : "Non Major"}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {currentEvent && (
          <Card key={currentEvent.id} className="mb-2">
            <CardHeader>
              <CardTitle>{currentEvent.label}</CardTitle>
              <CardDescription>{currentEvent.locations[0]}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between">
                <div>
                  {currentEvent.status === "post" ? (
                    <div>
                      <div>Winner</div>
                      <div className="flex">
                        <div className="mr-1">
                          <MaterialSymbolsTrophyOutline />
                        </div>
                        <div>
                          {currentEvent.winner?.competitors?.displayName ||
                            "N/A"}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div>Defending Champ</div>
                      <div className="flex">
                        <div className="mr-1">
                          <MaterialSymbolsTrophyOutline />
                        </div>
                        <div>
                          {currentEvent.defendingChampion?.displayName || "N/A"}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <div>{currentEvent.detail}</div>
                  <div>{currentEvent.purse?.displayValue}</div>
                  <div>
                    <Badge>
                      {currentEvent.isMajor ? "Major" : "Non Major"}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        <Card key={nextEvent.id} className="mb-2">
          <CardHeader>
            <CardTitle>{nextEvent.label}</CardTitle>
            <CardDescription>{nextEvent.locations[0]}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <div>
                {nextEvent.status === "post" ? (
                  <div>
                    <div>Winner</div>
                    <div className="flex">
                      <div className="mr-1">
                        <MaterialSymbolsTrophyOutline />
                      </div>
                      <div>
                        {nextEvent.winner?.competitors?.displayName || "N/A"}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div>Defending Champ</div>
                    <div className="flex">
                      <div className="mr-1">
                        <MaterialSymbolsTrophyOutline />
                      </div>
                      <div>
                        {nextEvent.defendingChampion?.displayName || "N/A"}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <div>{nextEvent.detail}</div>
                <div>{nextEvent.purse?.displayValue}</div>
                <div>
                  <Badge>{nextEvent.isMajor ? "Major" : "Non Major"}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="p-2 w-1/2 mx-auto">
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
                  <TableHead>Birdies</TableHead>
                  <TableHead>Pars</TableHead>
                  <TableHead>Bogeys</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {favePlayers.map((player) => {
                  return (
                    <TableRow key={player.id}>
                      <TableCell>{player.rank}</TableCell>
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
                            (stat) => stat.name === "scoreToPar"
                          )?.displayValue
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
      </div>
    </div>
  );
}
