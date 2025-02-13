import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { getTourSchedule, EventData } from "../utils/espn";

export const Route = createFileRoute("/schedule")({
  loader: async () => getTourSchedule(),
  component: TourEventsComponent,
});

function TourEventsComponent() {
  const events = Route.useLoaderData();

  return (
    <div>
      {events.map((event: EventData) => {
        return <div key={event.id}>{event.label}</div>;
      })}
    </div>
  );
}
