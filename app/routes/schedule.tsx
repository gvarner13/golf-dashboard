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
            <CardContent>
              <div className="flex justify-between pt-6">
                <div>
                  <div>{event.label}</div>
                  <div>{event.locations[0]}</div>
                  <div>{event.winner?.competitors?.displayName || "N/A"}</div>
                  <div>{event.defendingChampion?.displayName || "N/A"}</div>
                </div>
                <div>
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
