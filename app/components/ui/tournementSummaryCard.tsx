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
import { cn } from "~/lib/utils";

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
  className?: string;
}; /* use `interface` if exporting so that consumers can extend */

// Easiest way to declare a Function Component; return type is inferred.
export const TournementSummaryCard = ({ event, className }: TcardProps) => {
  return (
    <Card
      key={event.id}
      className={cn(
        "relative overflow-hidden border-0 bg-emerald-900/60 text-emerald-50 shadow-[0_18px_45px_-32px_rgba(15,118,110,0.6)] backdrop-blur",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.22),_transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(120deg,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(60deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:18px_18px]" />
      <div className="relative">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold tracking-tight text-white">
            {event.label}
          </CardTitle>
          <CardDescription className="text-xs text-emerald-100/70">
            {event?.locations?.[0] || "N/A"}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-5">
          <div className="flex justify-between gap-4 text-sm text-emerald-100/80">
            <div>
              {event.status === "post" ? (
                <div className="space-y-1">
                  <div className="text-xs uppercase tracking-[0.2em] text-emerald-200/70">
                    Winner
                  </div>
                  <div className="flex items-center gap-2">
                    <MaterialSymbolsTrophyOutline className="h-4 w-4 text-amber-200" />
                    <div className="text-sm text-emerald-50">
                      {event.winner?.competitors?.displayName || "N/A"}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="text-xs uppercase tracking-[0.2em] text-emerald-200/70">
                    Defending Champ
                  </div>
                  <div className="flex items-center gap-2">
                    <MaterialSymbolsTrophyOutline className="h-4 w-4 text-amber-200" />
                    <div className="text-sm text-emerald-50">
                      {event.defendingChampion?.displayName || "N/A"}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-1 text-right">
              <div className="text-xs uppercase tracking-[0.2em] text-emerald-200/60">
                {event.detail}
              </div>
              <div className="text-sm text-emerald-100/80">
                {event.purse?.displayValue}
              </div>
              {event.isMajor && (
                <div>
                  <Badge className="border border-emerald-300/40 bg-emerald-300/15 text-[10px] uppercase tracking-[0.3em] text-emerald-100">
                    {"Major"}
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
