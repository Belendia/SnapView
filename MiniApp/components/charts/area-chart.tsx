"use client";

import { TrendingUp } from "lucide-react";
import dynamic from "next/dynamic";
import ReactECharts from "echarts-for-react";

// Chart Data
const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

// Extract labels and values
const months = chartData.map((item) => item.month);
const desktopValues = chartData.map((item) => item.desktop);

// Chart config
const areaOption = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "line",
    },
  },
  grid: {
    left: "5%",
    right: "5%",
    bottom: "8%",
    top: "15%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    data: months,
    boundaryGap: false,
    axisLine: { show: false },
    axisTick: { show: false },
  },
  yAxis: {
    type: "value",
    axisLine: { show: false },
    axisTick: { show: false },
    splitLine: {
      lineStyle: {
        type: "dashed",
      },
    },
  },
  series: [
    {
      name: "Desktop",
      type: "line",
      smooth: true,
      areaStyle: {
        opacity: 0.4,
      },
      itemStyle: {
        color: "hsl(220, 90%, 60%)", // or use a CSS variable if available
      },
      lineStyle: {
        width: 3,
      },
      data: desktopValues,
    },
  ],
};

export function SnapViewAreaChart() {
  return (
    <div className="w-full h-full flex flex-col justify-between px-4 py-6 bg-background dark:bg-muted text-foreground">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl font-semibold">Area Chart – Linear</h2>
        <p className="text-sm text-muted-foreground">
          Showing total visitors for the last 6 months
        </p>
      </div>

      {/* Chart */}
      <div className="flex-1 flex items-center justify-center w-full">
        <div className="w-full h-[400px] max-w-3xl">
          <ReactECharts
            option={areaOption}
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
        <div className="text-muted-foreground">January - June 2024</div>
      </div>
    </div>
  );
}
