import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Event } from "~/utils/espn";
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

// Declaring type of props - see "Typing Component Props" for more examples
type TcardProps = {
  event: Event;
}; /* use `interface` if exporting so that consumers can extend */

// Easiest way to declare a Function Component; return type is inferred.
export const TournementSummaryCard = ({ event }: TcardProps) => {
  return (
    <Card key={event.id} className="mb-2">
      <CardHeader>
        <CardTitle>{event.label}</CardTitle>
        <CardDescription>{event.locations[0]}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <div>
            {event.status === "post" ? (
              <div className="space-y-1">
                <div>Winner</div>
                <div className="flex">
                  <div className="mr-1">
                    <MaterialSymbolsTrophyOutline />
                  </div>
                  <div>{event.winner?.competitors?.displayName || "N/A"}</div>
                </div>
              </div>
            ) : (
              <div className="space-y-1">
                <div>Defending Champ</div>
                <div className="flex">
                  <div className="mr-1">
                    <MaterialSymbolsTrophyOutline />
                  </div>
                  <div>{event.defendingChampion?.displayName || "N/A"}</div>
                </div>
              </div>
            )}
          </div>
          <div className="space-y-1">
            <div>{event.detail}</div>
            <div>{event.purse?.displayValue}</div>
            <div>
              <Badge>{event.isMajor ? "Major" : "Non Major"}</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
