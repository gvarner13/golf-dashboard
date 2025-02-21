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
const chartData = [
  { browser: "par", visitors: 275, fill: "var(--color-par)" },
  { browser: "eagle", visitors: 30, fill: "var(--color-eagle)" },
  { browser: "birdies", visitors: 287, fill: "var(--color-birdies)" },
  { browser: "bogeys", visitors: 173, fill: "var(--color-bogeys)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  par: {
    label: "Par",
    color: "hsl(var(--chart-1))",
  },
  eagle: {
    label: "Eagle",
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
} satisfies ChartConfig;

export function Component() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Stroke Breakdown</CardTitle>
        <CardDescription>Mexico Open at VidantaWorld</CardDescription>
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
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
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
                          {totalVisitors.toLocaleString()}
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
