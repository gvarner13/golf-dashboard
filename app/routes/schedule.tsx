import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
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

export const Route = createFileRoute("/schedule")({
  loader: async () => getTourSchedule(),
  component: TourEventsComponent,
});

function TourEventsComponent() {
  const events = Route.useLoaderData();

  return (
    <div className="p-2 m-auto w-1/3">
      {events.map((event: EventData) => {
        return (
          <Card key={event.id} className="mb-2">
            <CardHeader>
              <CardTitle>{event.label}</CardTitle>
              <CardDescription>{event.locations[0]}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between">
                <div>
                  <div>{event.winner?.competitors?.displayName || "N/A"}</div>
                  <div>{event.defendingChampion?.displayName || "N/A"}</div>
                </div>
                <div>
                  <div>
                    <Badge>{event.isMajor ? "Major" : "Non Major"}</Badge>
                  </div>
                  <div>{event.detail}</div>
                  <div>{event.purse?.displayValue}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
