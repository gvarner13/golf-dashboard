import { ColumnDef } from "@tanstack/react-table";
import { PlayerData } from "@/utils/espn";

export const columns: ColumnDef<PlayerData>[] = [
  {
    accessorKey: "status.position.displayName",
    header: "Pos",
  },
  {
    accessorKey: "movement",
    header: "M",
  },
  {
    accessorKey: "athlete.displayName",
    header: "Player",
    cell: (props) => {
      return (
        <div className="flex">
          <div>
            <img
              src={props.row.original.athlete.flag.href}
              className="w-6 h-6"
            ></img>
          </div>
          <div className="ml-1">{props.getValue()}</div>
        </div>
      );
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
