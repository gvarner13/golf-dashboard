import { ColumnDef } from "@tanstack/react-table";
import { PlayerData } from "@/utils/espn";
import { useAtom } from "jotai";
import { favePlayersAtom } from "@/utils/favePlayers";
import type { SVGProps } from "react";

function LightStarRounded(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="m12 16.102l-3.63 2.192q-.16.079-.297.064q-.136-.016-.265-.094q-.13-.08-.196-.226t-.012-.319l.966-4.11l-3.195-2.77q-.135-.11-.178-.263t.019-.293t.165-.23q.104-.087.28-.118l4.216-.368l1.644-3.892q.068-.165.196-.238T12 5.364t.288.073t.195.238l1.644 3.892l4.215.368q.177.03.281.119q.104.088.166.229q.061.14.018.293t-.178.263l-3.195 2.77l.966 4.11q.056.171-.011.318t-.197.226q-.128.08-.265.095q-.136.015-.296-.064z"></path>
    </svg>
  );
}

function PlayerCell({ player, name }: { player: PlayerData; name: string }) {
  const [favePlayers, setFavePlayers] = useAtom(favePlayersAtom);
  const isFavorite = favePlayers.includes(player.id);

  return (
    <div className="flex items-center gap-2">
      <img src={player.athlete.flag.href} className="w-6 h-6"></img>
      <div>{name}</div>
      <button
        type="button"
        onClick={() =>
          setFavePlayers((current) =>
            current.includes(player.id)
              ? current.filter((item) => item !== player.id)
              : [...current, player.id],
          )
        }
        aria-label={
          isFavorite
            ? `Remove ${player.athlete.displayName} from favorites`
            : `Add ${player.athlete.displayName} to favorites`
        }
      >
        <LightStarRounded
          className={isFavorite ? "fill-blue-600" : "fill-gray-400"}
        />
      </button>
    </div>
  );
}

function MovementCell({ movement }: { movement: number }) {
  if (!Number.isFinite(movement) || movement === 0) {
    return <span className="text-gray-500">—</span>;
  }

  const isUp = movement < 0;
  const arrowClass = isUp ? "text-emerald-600" : "text-red-600";
  const label = isUp ? "Up" : "Down";

  return (
    <span className={`inline-flex items-center gap-1 ${arrowClass}`}>
      <span aria-hidden="true">{isUp ? "▲" : "▼"}</span>
      <span className="tabular-nums">{Math.abs(movement)}</span>
      <span className="sr-only">{label}</span>
    </span>
  );
}

export const columns: ColumnDef<PlayerData>[] = [
  {
    accessorKey: "status.position.displayName",
    header: "Pos",
  },
  {
    accessorKey: "movement",
    header: "M",
    cell: (props) => (
      <MovementCell movement={(props.getValue() as number) ?? 0} />
    ),
  },
  {
    accessorKey: "athlete.displayName",
    header: "Player",
    cell: (props) => {
      const player = props.row.original;
      return <PlayerCell player={player} name={props.getValue() as string} />;
    },
  },
  {
    accessorKey: "score.displayValue",
    header: "Score",
  },
  {
    accessorKey: "status.detail",
    header: "Today",
  },
  {
    accessorKey: "linescores.0.value",
    header: "R1",
  },
  {
    accessorKey: "linescores.1.value",
    header: "R2",
  },
  {
    accessorKey: "linescores.2.value",
    header: "R3",
  },
  {
    accessorKey: "linescores.3.value",
    header: "R4",
  },
  {
    accessorKey: "score.value",
    header: "Tot",
  },
];
