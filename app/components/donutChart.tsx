import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { Event } from "@/utils/espn";

const chartConfig = {
  total: {
    label: "Strokes",
  },
  pars: {
    label: "Pars",
    color: "hsl(var(--chart-1))",
  },
  eagles: {
    label: "Eagles",
    color: "hsl(var(--chart-2))",
  },
  birdies: {
    label: "Birdies",
    color: "hsl(var(--chart-3))",
  },
  bogeys: {
    label: "Bogeys",
    color: "hsl(var(--chart-4))",
  },
  doubles: {
    label: "Doubles",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

type Stat = {
  name: string;
  displayName?: string;
  abbreviation?: string;
  value?: number;
  displayValue?: string;
};

type Player = {
  id: string;
  displayName: string;
  countryFlag?: string;
  stats: Stat[];
  rank?: number;
};

type TotalStat = {
  statName: string;
  total: number;
  fill: string;
};

function calculateTotalStats(
  leaderboard: Player[],
  statNames: string[],
): TotalStat[] {
  // First, accumulate totals into an object
  const totals = leaderboard.reduce<Record<string, number>>((acc, player) => {
    player.stats.forEach((stat) => {
      if (statNames.includes(stat.name) && stat.value !== undefined) {
        acc[stat.name] = (acc[stat.name] || 0) + stat.value;
      }
    });
    return acc;
  }, {});

  // Convert the totals object into an array of objects with the desired format
  return Object.entries(totals).map(([statName, total]) => ({
    statName,
    total,
    fill: `var(--color-${statName})`,
  }));
}

const statsToSum = ["birdies", "eagles", "pars", "bogeys", "doubles"];

type DonutChartProps = {
  playerData: Player[];
  currentEvent?: Event;
  postEvent?: Event;
};

export function Component({ playerData, currentEvent, postEvent }: DonutChartProps) {
  const statData = calculateTotalStats(playerData, statsToSum);
  const totalStrokes = React.useMemo(() => {
    return statData.reduce((acc, curr) => acc + curr.total, 0);
  }, [statData]);
  const eventLabel = currentEvent?.label ?? postEvent?.label ?? "N/A";

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Stroke Breakdown</CardTitle>
        <CardDescription>{eventLabel}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={statData}
              dataKey="total"
              nameKey="statName"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalStrokes.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Strokes
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total strokes
        </div>
      </CardFooter>
    </Card>
  );
}
