// app/actions/get-chart-sequence.ts

import type { ChartKey } from "@/lib/chart-loader";

export const getChartSequence = async (): Promise<{ type: ChartKey }[]> => {
  // In real case, fetch from DB, user preferences, etc.
  return [
    { type: "single" },
    { type: "column" },
    { type: "stackedArea" },
    { type: "pie" },
    { type: "stacked" },
    { type: "line" },
    { type: "bar" },
    { type: "area" },
    { type: "radar" },
    { type: "gauge" },
    { type: "pivot" },
    { type: "scatter" },
  ];
};
