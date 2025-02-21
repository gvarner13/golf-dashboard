import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { getTourSchedule, Event } from "../utils/espn";
import { TournementSummaryCard } from "@/components/ui/tournementSummaryCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const Route = createFileRoute("/schedule")({
  loader: async () => getTourSchedule(),
  component: TourEventsComponent,
});

function filterSchdule(status: string, events: Event[]) {
  if (status === "all") return events;
  return events.filter((event) => event.status === status);
}

function TourEventsComponent() {
  const events = Route.useLoaderData();
  const [status, setStatus] = useState("all");
  const filteredEvents = filterSchdule(status, events);

  return (
    <div className="p-2 m-auto w-1/3">
      <div className="flex justify-center pb-4 pt-2">
        <Button className="mr-1" onClick={() => setStatus("post")}>
          Played
        </Button>
        <Button className="mr-1" onClick={() => setStatus("in")}>
          In Progress
        </Button>
        <Button className="mr-1" onClick={() => setStatus("pre")}>
          Future
        </Button>
      </div>
      {filteredEvents.map((event: Event) => {
        return <TournementSummaryCard event={event} key={event.id} />;
      })}
    </div>
  );
}
