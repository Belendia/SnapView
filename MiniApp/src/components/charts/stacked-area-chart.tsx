"use client";

import ReactECharts from "echarts-for-react";
import { TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const months = chartData.map((item) => item.month.slice(0, 3));
const desktopValues = chartData.map((item) => item.desktop);
const mobileValues = chartData.map((item) => item.mobile);

export function SnapViewStackedAreaChart() {
  const [colors, setColors] = useState({
    desktop: "#3366ff",
    mobile: "#00c9a7",
  });

  useEffect(() => {
    const style = getComputedStyle(document.documentElement);
    setColors({
      desktop: style.getPropertyValue("--color-desktop") || "#3366ff",
      mobile: style.getPropertyValue("--color-mobile") || "#00c9a7",
    });
  }, []);

  const option = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      bottom: 10,
      data: ["Desktop", "Mobile"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "20%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: months,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Mobile",
        type: "line",
        stack: "total",
        smooth: true,
        areaStyle: {
          opacity: 0.4,
          color: colors.mobile,
        },
        lineStyle: {
          color: colors.mobile,
        },
        itemStyle: {
          color: colors.mobile,
        },
        data: mobileValues,
      },
      {
        name: "Desktop",
        type: "line",
        stack: "total",
        smooth: true,
        areaStyle: {
          opacity: 0.4,
          color: colors.desktop,
        },
        lineStyle: {
          color: colors.desktop,
        },
        itemStyle: {
          color: colors.desktop,
        },
        data: desktopValues,
      },
    ],
  };

  return (
    <div className="w-full h-full flex flex-col justify-between px-4 py-6 bg-background dark:bg-muted text-foreground">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl font-semibold">Stacked Area Chart</h2>
        <p className="text-sm text-muted-foreground">
          Showing total visitors for the last 6 months
        </p>
      </div>

      {/* Chart */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full h-[400px] max-w-3xl">
          <ReactECharts
            option={option}
            style={{ height: "100%", width: "100%" }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-2 text-sm text-center">
        <div className="font-medium flex justify-center items-center gap-2">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground">January - June 2024</div>
      </div>
    </div>
  );
}
