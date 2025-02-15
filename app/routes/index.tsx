import { createFileRoute } from "@tanstack/react-router";
import { getTourSchedule, EventData } from "../utils/espn";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/")({
  loader: async () => getTourSchedule(),
  component: Home,
});

function Home() {
  const events = Route.useLoaderData();
  const postEvent = events.findLast((event) => event.status === "post");
  const currentEvent = events.find((event) => event.status === "in");
  const nextEvent = events.find((event) => event.status === "pre");
  return (
    <div className="p-2 w-1/2 mx-auto">
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
              <div>{currentEvent.defendingChampion?.displayName || "N/A"}</div>
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
  );
}
