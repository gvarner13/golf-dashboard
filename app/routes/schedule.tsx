import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { getTourSchedule, Event } from "../utils/espn";
import { TournementSummaryCard } from "@/components/ui/tournementSummaryCard";

export const Route = createFileRoute("/schedule")({
  loader: async () => getTourSchedule(),
  component: TourEventsComponent,
});

function TourEventsComponent() {
  const events = Route.useLoaderData();

  return (
    <div className="p-2 m-auto w-1/3">
      {events.map((event: Event) => {
        return <TournementSummaryCard event={event} key={event.id} />;
      })}
    </div>
  );
}
