import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

type MajorWinner = {
  name: string;
  id?: string;
  avatarUrl?: string;
};

type MajorEvent = {
  id: string;
  name: string;
  winner?: MajorWinner | null;
};

const defaultMajors: MajorEvent[] = [
  { id: "masters", name: "Masters", winner: null },
  { id: "pga", name: "PGA Championship", winner: null },
  { id: "us-open", name: "U.S. Open", winner: null },
  { id: "open", name: "The Open Championship", winner: null },
];

const getAvatarUrl = (winner?: MajorWinner | null) => {
  if (!winner) return "";
  if (winner.avatarUrl) return winner.avatarUrl;
  if (winner.id) {
    return `https://a.espncdn.com/i/headshots/golf/players/full/${winner.id}.png`;
  }
  return "";
};

const getUniqueWinnerNames = (majors: MajorEvent[]) => {
  return Array.from(
    new Set(
      majors
        .map((major) => major.winner?.name)
        .filter((name): name is string => Boolean(name)),
    ),
  );
};

export function GrandSlamTracker({ majors = defaultMajors }: { majors?: MajorEvent[] }) {
  const uniqueWinners = getUniqueWinnerNames(majors);
  const allMajorsWon = majors.every((major) => Boolean(major.winner?.name));
  const grandSlamWinner =
    allMajorsWon && uniqueWinners.length === 1 ? uniqueWinners[0] : null;

  const answer = grandSlamWinner
    ? "Yes"
    : uniqueWinners.length >= 2
      ? "No"
      : "Maybe";

  return (
    <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-emerald-950 via-slate-950 to-emerald-900 text-slate-100 shadow-[0_18px_45px_-32px_rgba(15,118,110,0.7)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.25),_transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(120deg,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(60deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:18px_18px]" />
      <div className="relative space-y-6 p-5">
        <div className="flex items-start justify-between gap-4 animate-in fade-in-50 duration-700">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">
              Season Majors
            </div>
            <div className="mt-2 text-2xl font-semibold tracking-tight text-white">
              Grand Slam Tracker
            </div>
            <div className="mt-2 text-sm text-emerald-100/70">
              Will there be a grand slam this season?
            </div>
          </div>
          <Badge className="bg-emerald-300/20 text-emerald-100 ring-1 ring-emerald-300/40">
            {answer}
          </Badge>
        </div>

        <div className="rounded-2xl border border-emerald-300/20 bg-emerald-950/40 px-4 py-3 animate-in fade-in-50 slide-in-from-bottom-2 duration-700">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-emerald-200/60">
            Grand Slam Winner
            <span className="text-[10px] tracking-[0.4em] text-emerald-200/40">
              ALL FOUR
            </span>
          </div>
          {grandSlamWinner ? (
            <div className="mt-3 flex items-center gap-3">
              <Avatar className="h-12 w-12 ring-2 ring-emerald-300/60">
                <AvatarImage
                  src={getAvatarUrl(majors.find((major) => major.winner)?.winner)}
                  className="object-cover"
                />
                <AvatarFallback className="bg-emerald-500/30 text-emerald-50">
                  GS
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-lg font-semibold text-white">
                  {grandSlamWinner}
                </div>
                <div className="text-xs uppercase tracking-[0.2em] text-emerald-200/60">
                  Grand Slam Winner
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-3 flex items-center justify-between">
              <div className="text-sm text-emerald-100/70">
                No slam yet. One champion could still sweep.
              </div>
              <div className="h-11 w-11 rounded-full border border-dashed border-emerald-300/50" />
            </div>
          )}
        </div>

        <div className="grid gap-3">
          {majors.map((major, index) => {
            const winner = major.winner;
            return (
              <div
                key={major.id}
                className="flex items-center justify-between rounded-xl border border-emerald-300/10 bg-slate-950/40 px-4 py-3 backdrop-blur animate-in fade-in-50 slide-in-from-bottom-2 duration-700"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div>
                  <div className="text-sm font-semibold text-emerald-100">
                    {major.name}
                  </div>
                  <div className="text-xs text-emerald-100/60">
                    {winner?.name ?? "TBD"}
                  </div>
                </div>
                {winner ? (
                  <Avatar className="h-10 w-10 ring-2 ring-emerald-300/50">
                    <AvatarImage
                      src={getAvatarUrl(winner)}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-emerald-500/30 text-emerald-50">
                      {winner.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="h-10 w-10 rounded-full border border-dashed border-emerald-300/50" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
