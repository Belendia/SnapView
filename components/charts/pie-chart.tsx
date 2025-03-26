"use client";

import { TrendingUp } from "lucide-react";
import ReactECharts from "echarts-for-react";

type SnapViewPieChartProps = {
  title?: string;
  dateRange?: string;
  donut?: boolean; // toggle between pie and donut
};

const chartData = [
  { browser: "Chrome", value: 275 },
  { browser: "Safari", value: 200 },
  { browser: "Firefox", value: 187 },
  { browser: "Edge", value: 173 },
  { browser: "Other", value: 90 },
];

export function SnapViewPieChart({
  title = "Pie Chart – Label",
  dateRange = "January - June 2024",
  donut = false,
}: SnapViewPieChartProps) {
  const colors = [
    "hsl(220, 90%, 60%)", // Chrome
    "hsl(170, 70%, 50%)", // Safari
    "hsl(290, 70%, 50%)", // Firefox
    "hsl(30, 90%, 60%)", // Edge
    "hsl(0, 0%, 60%)", // Other
  ];

  const option = {
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      right: 10,
      top: "center",
      textStyle: {
        fontSize: 12,
      },
    },
    series: [
      {
        name: "Visitors",
        type: "pie",
        radius: donut ? ["40%", "70%"] : "70%",
        center: ["40%", "50%"],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: "outside",
          formatter: "{b}",
        },
        labelLine: {
          show: true,
        },
        itemStyle: {
          borderRadius: 4,
          borderColor: "#fff",
          borderWidth: 2,
        },
        data: chartData.map((item, i) => ({
          name: item.browser,
          value: item.value,
          itemStyle: {
            color: colors[i % colors.length],
          },
        })),
      },
    ],
  };

  return (
    <div className="w-full h-full flex flex-col justify-between px-4 py-6 bg-background dark:bg-muted text-foreground">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{dateRange}</p>
      </div>

      {/* Chart */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-lg aspect-square">
          <ReactECharts
            option={option}
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
