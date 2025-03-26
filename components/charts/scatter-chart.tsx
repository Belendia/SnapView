"use client";

import ReactECharts from "echarts-for-react";
import { TrendingUp } from "lucide-react";

// Sample data for scatter plot
const chartData = [
  [10, 20],
  [15, 35],
  [22, 18],
  [30, 50],
  [40, 32],
  [50, 48],
  [60, 28],
];

export function SnapViewScatterChart() {
  const option = {
    tooltip: {
      trigger: "item",
      formatter: (params: any) =>
        `X: ${params.value[0]}<br/>Y: ${params.value[1]}`,
    },
    xAxis: {
      type: "value",
      name: "X Axis",
      nameLocation: "middle",
      nameGap: 25,
    },
    yAxis: {
      type: "value",
      name: "Y Axis",
      nameLocation: "middle",
      nameGap: 40,
    },
    series: [
      {
        symbolSize: 12,
        type: "scatter",
        data: chartData,
        itemStyle: {
          color: "hsl(220, 80%, 60%)",
        },
      },
    ],
    grid: {
      left: "10%",
      right: "10%",
      bottom: "15%",
      top: "10%",
    },
  };

  return (
    <div className="w-full h-full flex flex-col justify-between px-4 py-6 bg-background dark:bg-muted text-foreground">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl font-semibold">Scatter Plot</h2>
        <p className="text-sm text-muted-foreground">
          Sample X vs Y Visualization
        </p>
      </div>

      {/* Chart Area */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-3xl h-[400px]">
          <ReactECharts
            option={option}
            style={{ height: "100%", width: "100%" }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="text-sm text-center mt-4">
        <div className="font-medium flex items-center justify-center gap-2">
          Trending up with strong correlation <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground">Data collected March 2025</div>
      </div>
    </div>
  );
}
