// lib/chart-loader.ts
import dynamic from "next/dynamic";

export const chartMap = {
  single: dynamic(() =>
    import("@/components/charts/single-value").then(
      (mod) => mod.SnapViewSingleValueChart
    )
  ),
  column: dynamic(() =>
    import("@/components/charts/column-chart").then(
      (mod) => mod.SnapViewColumnChart
    )
  ),
  stackedArea: dynamic(() =>
    import("@/components/charts/stacked-area-chart").then(
      (mod) => mod.SnapViewStackedAreaChart
    )
  ),
  pie: dynamic(() =>
    import("@/components/charts/pie-chart").then((mod) => mod.SnapViewPieChart)
  ),
  stacked: dynamic(() =>
    import("@/components/charts/stacked-chart").then(
      (mod) => mod.SnapViewStackedChart
    )
  ),
  line: dynamic(() =>
    import("@/components/charts/line-chart").then(
      (mod) => mod.SnapViewLineChart
    )
  ),
  bar: dynamic(() =>
    import("@/components/charts/bar-chart").then((mod) => mod.SnapViewBarChart)
  ),
  area: dynamic(() =>
    import("@/components/charts/area-chart").then(
      (mod) => mod.SnapViewAreaChart
    )
  ),
  radar: dynamic(() =>
    import("@/components/charts/radar-chart").then(
      (mod) => mod.SnapViewRadarChart
    )
  ),
  gauge: dynamic(() =>
    import("@/components/charts/gauge-chart").then(
      (mod) => mod.SnapViewGaugeChart
    )
  ),
  pivot: dynamic(() =>
    import("@/components/charts/pivot-table").then(
      (mod) => mod.SnapViewPivotTable
    )
  ),
  scatter: dynamic(() =>
    import("@/components/charts/scatter-chart").then(
      (mod) => mod.SnapViewScatterChart
    )
  ),
};

export type ChartKey = keyof typeof chartMap;
