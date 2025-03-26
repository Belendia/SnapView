"use client";

import { TrendingUp } from "lucide-react";
import ReactECharts from "echarts-for-react";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const months = chartData.map((item) => item.month);
const desktopValues = chartData.map((item) => item.desktop);
const mobileValues = chartData.map((item) => item.mobile);

const barOption = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  legend: {
    data: ["Desktop", "Mobile"],
    bottom: 0,
  },
  grid: {
    top: "12%",
    left: "5%",
    right: "5%",
    bottom: "18%", // extra room for legend
    containLabel: true,
  },
  xAxis: {
    type: "category",
    data: months,
    axisTick: { show: false },
    axisLine: { show: false },
    axisLabel: {
      formatter: (value: string) => value.slice(0, 3),
    },
  },
  yAxis: {
    type: "value",
    axisLine: { show: false },
    splitLine: {
      lineStyle: {
        type: "dashed",
      },
    },
  },
  series: [
    {
      name: "Desktop",
      type: "bar",
      data: desktopValues,
      itemStyle: {
        color: "hsl(220, 90%, 60%)", // match your --chart-1
        borderRadius: [4, 4, 0, 0],
      },
      barGap: "0%",
    },
    {
      name: "Mobile",
      type: "bar",
      data: mobileValues,
      itemStyle: {
        color: "hsl(170, 70%, 50%)", // match your --chart-2
        borderRadius: [4, 4, 0, 0],
      },
    },
  ],
};

export function SnapViewColumnChart() {
  return (
    <div className="w-full h-full flex flex-col justify-between px-4 py-6 bg-background dark:bg-muted text-foreground">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl font-semibold">Column Chart – Multiple</h2>
        <p className="text-sm text-muted-foreground">January - June 2024</p>
      </div>

      {/* Chart Area */}
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
