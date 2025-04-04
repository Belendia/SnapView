"use client";

import ReactECharts from "echarts-for-react";

export function SnapViewSingleValueChart() {
  const value = "$1,250.00";
  const trend = "+12.5%";

  const option = {
    graphic: [
      {
        type: "text",
        left: "center",
        top: "8%",
        style: {
          text: "Single Value Chart",
          fontSize: 20,
          fontWeight: "bold",
          fill: "#0f172a",
        },
      },
      {
        type: "text",
        left: "center",
        top: "16%",
        style: {
          text: "Total Revenue",
          fontSize: 14,
          fill: "#64748b",
        },
      },
      {
        type: "text",
        left: "center",
        top: "38%",
        style: {
          text: value,
          fontSize: 48,
          fontWeight: "bold",
          fill: "#0f172a",
        },
      },
      {
        type: "text",
        right: 20,
        top: 20,
        style: {
          text: `▲ ${trend}`,
          fontSize: 12,
          fill: "#15803d",
          backgroundColor: "#ecfdf5",
          borderColor: "#bbf7d0",
          borderWidth: 1,
          borderRadius: 4,
          padding: [4, 8],
        },
      },
      {
        type: "text",
        left: "center",
        bottom: 60,
        style: {
          text: "Trending up this month",
          fontSize: 14,
          fontWeight: 500,
          fill: "#0f172a",
        },
      },
      {
        type: "text",
        left: "center",
        bottom: 36,
        style: {
          text: "Visitors for the last 6 months",
          fontSize: 12,
          fill: "#94a3b8",
        },
      },
    ],
  };

  return (
    <div className="w-full h-full px-4 py-6 bg-background dark:bg-muted">
      <div className="w-full max-w-xl h-[90vh] mx-auto">
        <ReactECharts
          option={option}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
}
