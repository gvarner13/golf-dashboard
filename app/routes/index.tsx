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

const favePlayersList = ["9478", "2230", "3470"];

function Home() {
  const { postEvent, currentEvent, nextEvent, players } = Route.useLoaderData();
  const favePlayers = players.filter((player) =>
    favePlayersList.includes(player.id)
  );
  return (
    <div className="flex">
      <div className="p-2 w-1/3 mx-auto">
        <Card key={postEvent.id} className="mb-2">
          <CardHeader>
            <CardTitle>{postEvent.label}</CardTitle>
            <CardDescription>{postEvent.locations[0]}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <div>
                <div>{postEvent.winner?.competitors?.displayName || "N/A"}</div>
                <div>{postEvent.defendingChampion?.displayName || "N/A"}</div>
              </div>
              <div>
                <div>
                  <Badge>{postEvent.isMajor ? "Major" : "Non Major"}</Badge>
                </div>
                <div>{postEvent.detail}</div>
                <div>{postEvent.purse?.displayValue}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card key={currentEvent.id} className="mb-2">
          <CardHeader>
            <CardTitle>{currentEvent.label}</CardTitle>
            <CardDescription>{currentEvent.locations[0]}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <div>
                <div>
                  {currentEvent.winner?.competitors?.displayName || "N/A"}
                </div>
                <div>
                  {currentEvent.defendingChampion?.displayName || "N/A"}
                </div>
              </div>
              <div>
                <div>
                  <Badge>{currentEvent.isMajor ? "Major" : "Non Major"}</Badge>
                </div>
                <div>{currentEvent.detail}</div>
                <div>{currentEvent.purse?.displayValue}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card key={nextEvent.id} className="mb-2">
          <CardHeader>
            <CardTitle>{nextEvent.label}</CardTitle>
            <CardDescription>{nextEvent.locations[0]}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <div>
                <div>{nextEvent.winner?.competitors?.displayName || "N/A"}</div>
                <div>{nextEvent.defendingChampion?.displayName || "N/A"}</div>
              </div>
              <div>
                <div>
                  <Badge>{nextEvent.isMajor ? "Major" : "Non Major"}</Badge>
                </div>
                <div>{nextEvent.detail}</div>
                <div>{nextEvent.purse?.displayValue}</div>
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
