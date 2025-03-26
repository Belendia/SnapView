"use client";

import { TrendingUp } from "lucide-react";
import ReactECharts from "echarts-for-react";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const months = chartData.map((item) => item.month);
const desktopValues = chartData.map((item) => item.desktop);

const barOption = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  grid: {
    left: "5%",
    right: "5%",
    bottom: "8%",
    top: "10%",
    containLabel: true,
  },
  xAxis: {
    type: "value",
    splitLine: {
      show: false,
    },
  },
  yAxis: {
    type: "category",
    data: months,
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: {
      formatter: (value: string) => value.slice(0, 3),
    },
  },
  series: [
    {
      name: "Desktop",
      type: "bar",
      data: desktopValues,
      barWidth: "50%",
      itemStyle: {
        borderRadius: 5,
        color: "hsl(220, 90%, 60%)", // adjust to match your theme or use a CSS var
      },
    },
  ],
};

export function SnapViewBarChart() {
  return (
    <div className="w-full h-full flex flex-col justify-between px-4 py-6 bg-background dark:bg-muted text-foreground">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl font-semibold">Bar Chart</h2>
        <p className="text-sm text-muted-foreground">January - June 2024</p>
      </div>

      {/* Chart */}
      <div className="flex-1 flex items-center justify-center w-full">
        <div className="w-full h-[400px] max-w-3xl">
          <ReactECharts
            option={barOption}
            style={{ width: "100%", height: "100%" }}
            notMerge={true}
            lazyUpdate={true}
            theme="light"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="text-sm text-center mt-4">
        <div className="font-medium flex items-center justify-center gap-2">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </div>
    </div>
  );
}
