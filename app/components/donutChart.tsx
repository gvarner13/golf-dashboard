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

function calculateTotalStats(leaderboard, statNames) {
  // First, accumulate totals into an object
  const totals = leaderboard.reduce((acc, player) => {
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

export function Component({ playerData, currentEvent }) {
  const statData = calculateTotalStats(playerData, statsToSum);
  const totalStrokes = React.useMemo(() => {
    return statData.reduce((acc, curr) => acc + curr.total, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Stroke Breakdown</CardTitle>
        <CardDescription>{currentEvent.label}</CardDescription>
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
