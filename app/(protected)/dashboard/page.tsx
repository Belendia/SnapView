import React from "react";
import { SnapViewColumnChart } from "@/components/charts/column-chart";
import { SnapViewStackedAreaChart } from "@/components/charts/stacked-area-chart";
import { SnapViewPieChart } from "@/components/charts/pie-chart";
import { SnapViewStackedChart } from "@/components/charts/stacked-chart";
import { SnapViewLineChart } from "@/components/charts/line-chart";
import { SnapViewBarChart } from "@/components/charts/bar-chart";
import { SnapViewAreaChart } from "@/components/charts/area-chart";
import { SnapViewRadarChart } from "@/components/charts/radar-chart";
import { SnapViewGaugeChart } from "@/components/charts/gauge-chart";
import { SnapViewSingleValueChart } from "@/components/charts/single-value";
import { SnapViewPivotTable } from "@/components/charts/pivot-table";

const DashboardPage = () => {
  return (
    <div className="">
      <div className="grid grid-cols-2 gap-6 px-4">
        <SnapViewSingleValueChart />
        <SnapViewColumnChart />
        <SnapViewStackedAreaChart />
        <SnapViewPieChart />
        <SnapViewStackedChart />
        <SnapViewLineChart />
        <SnapViewBarChart />
        <SnapViewAreaChart />
        <SnapViewRadarChart />
        <SnapViewGaugeChart />
        <SnapViewPivotTable />
      </div>
    </div>
  );
};

export default DashboardPage;
