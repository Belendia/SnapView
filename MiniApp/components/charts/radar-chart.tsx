"use client";

import { TrendingUp } from "lucide-react";
import ReactECharts from "echarts-for-react";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 273 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

export function SnapViewRadarChart() {
  const indicators = chartData.map((item) => ({
    name: item.month,
    max: 400,
  }));

  const option = {
    tooltip: {
      trigger: "item",
    },
    radar: {
      indicator: indicators,
      radius: "70%",
      axisName: {
        fontSize: 12,
      },
      splitLine: {
        lineStyle: {
          color: ["#e5e7eb"],
        },
      },
      splitArea: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: "#94a3b8",
        },
      },
    },
    series: [
      {
        name: "Desktop Visitors",
        type: "radar",
        data: [
          {
            value: chartData.map((item) => item.desktop),
            name: "Desktop",
            areaStyle: {
              opacity: 0.4,
            },
            lineStyle: {
              color: "hsl(220, 90%, 60%)",
            },
            symbol: "circle",
            symbolSize: 6,
            itemStyle: {
              color: "hsl(220, 90%, 60%)",
              borderColor: "#fff",
              borderWidth: 1,
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="w-full h-full flex flex-col justify-between px-4 py-6 bg-background dark:bg-muted text-foreground">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl font-semibold">Radar Chart – Dots</h2>
        <p className="text-sm text-muted-foreground">
          Showing total visitors for the last 6 months
        </p>
      </div>

      {/* Chart Area */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full h-[400px] max-w-lg">
          <ReactECharts
            option={option}
            notMerge
            lazyUpdate
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="text-sm text-center mt-4">
        <div className="font-medium flex items-center justify-center gap-2">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground">January - June 2024</div>
      </div>
    </div>
  );
}
