"use client";

import ReactECharts from "echarts-for-react";
import { TrendingUp } from "lucide-react";

// Setup your values
const target = 10000;
const achieved = 3000;
const percentage = ((achieved / target) * 100).toFixed(1);
const remaining = target - achieved;

const halfDonutOption = {
  tooltip: {
    trigger: "item",
    formatter: "{b}: {c} ({d}%)",
  },
  legend: {
    show: false,
  },
  series: [
    {
      name: "Progress",
      type: "pie",
      radius: ["60%", "85%"],
      center: ["50%", "70%"],
      startAngle: 180,
      endAngle: 360,
      avoidLabelOverlap: false,
      label: {
        show: false,
      },
      data: [
        {
          value: achieved,
          name: "Achieved",
          itemStyle: {
            color: "hsl(220, 90%, 60%)", // Change to your theme color
          },
        },
        {
          value: remaining,
          name: "Remaining",
          itemStyle: {
            color: "#e5e7eb", // Light gray
          },
          tooltip: { show: false },
        },
      ],
    },
  ],
  graphic: {
    elements: [
      {
        type: "group",
        left: "center",
        top: "center",
        children: [
          {
            type: "text",
            style: {
              text: `${percentage}%`,
              fontSize: 26,
              fontWeight: "bold",
              fill: "#111",
              textAlign: "center",
            },
          },
          {
            type: "text",
            top: 30,
            style: {
              text: `${achieved.toLocaleString()} of ${target.toLocaleString()}`,
              fontSize: 14,
              fill: "#666",
              textAlign: "center",
            },
          },
        ],
      },
    ],
  },
};

export function SnapViewGaugeChart() {
  return (
    <div className="w-full h-full flex flex-col justify-between px-4 py-6 bg-background dark:bg-muted text-foreground">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl font-semibold">Half Donut – Progress</h2>
        <p className="text-sm text-muted-foreground">January - June 2024</p>
      </div>

      {/* Chart */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full h-[400px] max-w-sm">
          <ReactECharts
            option={halfDonutOption}
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
          Showing progress toward {target.toLocaleString()} units
        </div>
      </div>
    </div>
  );
}
