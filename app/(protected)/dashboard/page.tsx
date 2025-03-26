"use client";

import dynamic from "next/dynamic";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Mousewheel } from "swiper/modules";
import {
  ThumbsUp,
  ThumbsDown,
  Share2,
  SlidersHorizontal,
  ChevronsUp,
  MessageCircle,
} from "lucide-react";

import "swiper/css";
import "swiper/css/effect-creative";

// Lazy load each chart with named exports
const SnapViewSingleValueChart = dynamic(() =>
  import("@/components/charts/single-value").then(
    (mod) => mod.SnapViewSingleValueChart
  )
);
const SnapViewColumnChart = dynamic(() =>
  import("@/components/charts/column-chart").then(
    (mod) => mod.SnapViewColumnChart
  )
);
const SnapViewStackedAreaChart = dynamic(() =>
  import("@/components/charts/stacked-area-chart").then(
    (mod) => mod.SnapViewStackedAreaChart
  )
);
const SnapViewPieChart = dynamic(() =>
  import("@/components/charts/pie-chart").then((mod) => mod.SnapViewPieChart)
);
const SnapViewStackedChart = dynamic(() =>
  import("@/components/charts/stacked-chart").then(
    (mod) => mod.SnapViewStackedChart
  )
);
const SnapViewLineChart = dynamic(() =>
  import("@/components/charts/line-chart").then((mod) => mod.SnapViewLineChart)
);
const SnapViewBarChart = dynamic(() =>
  import("@/components/charts/bar-chart").then((mod) => mod.SnapViewBarChart)
);
const SnapViewAreaChart = dynamic(() =>
  import("@/components/charts/area-chart").then((mod) => mod.SnapViewAreaChart)
);
const SnapViewRadarChart = dynamic(() =>
  import("@/components/charts/radar-chart").then(
    (mod) => mod.SnapViewRadarChart
  )
);
const SnapViewGaugeChart = dynamic(() =>
  import("@/components/charts/gauge-chart").then(
    (mod) => mod.SnapViewGaugeChart
  )
);
const SnapViewPivotTable = dynamic(() =>
  import("@/components/charts/pivot-table").then(
    (mod) => mod.SnapViewPivotTable
  )
);
const SnapViewScatterChart = dynamic(() =>
  import("@/components/charts/scatter-chart").then(
    (mod) => mod.SnapViewScatterChart
  )
);

// List of charts to render
const charts = [
  <SnapViewSingleValueChart key="single" />,
  <SnapViewColumnChart key="column" />,
  <SnapViewStackedAreaChart key="stackedArea" />,
  <SnapViewPieChart key="pie" />,
  <SnapViewStackedChart key="stacked" />,
  <SnapViewLineChart key="line" />,
  <SnapViewBarChart key="bar" />,
  <SnapViewAreaChart key="area" />,
  <SnapViewRadarChart key="radar" />,
  <SnapViewGaugeChart key="gauge" />,
  <SnapViewPivotTable key="pivot" />,
  <SnapViewScatterChart key="scatter" />,
];

const DashboardPage = () => {
  return (
    <div className="w-full h-screen overflow-hidden">
      <Swiper
        direction="vertical"
        effect="creative"
        grabCursor
        mousewheel
        creativeEffect={{
          prev: { translate: [0, "-100%", 0], opacity: 0, scale: 0.95 },
          next: { translate: [0, "100%", 0], opacity: 0, scale: 0.95 },
        }}
        modules={[EffectCreative, Mousewheel]}
        className="h-full"
      >
        {charts.map((ChartComponent, index) => (
          <SwiperSlide key={index} className="flex items-center justify-center">
            <div
              className="w-full max-w-md sm:max-w-lg mx-auto rounded-2xl bg-white dark:bg-card shadow-xl relative flex flex-col overflow-hidden"
              style={{
                height: "calc(100vh - 64px - 70px)", // account for top and bottom navbars
                paddingTop: "1.5rem",
                paddingBottom: "3.5rem",
              }}
            >
              {/* Chart Content */}
              <div className="flex-1 px-4 flex items-center justify-center">
                <div className="w-full">{ChartComponent}</div>
              </div>

              {/* Action Buttons */}
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-4 items-center z-20">
                {[
                  { icon: <ThumbsUp className="w-5 h-5" />, label: "Like" },
                  {
                    icon: <ThumbsDown className="w-5 h-5" />,
                    label: "Dislike",
                  },
                  {
                    icon: <MessageCircle className="w-5 h-5" />,
                    label: "Comment",
                  },
                  { icon: <Share2 className="w-5 h-5" />, label: "Share" },
                  {
                    icon: <SlidersHorizontal className="w-5 h-5" />,
                    label: "Filter",
                  },
                ].map(({ icon, label }, i) => (
                  <button
                    key={i}
                    className="bg-white dark:bg-muted ring-1 ring-muted shadow-md p-2 rounded-full hover:scale-105 transition"
                    aria-label={label}
                  >
                    {icon}
                  </button>
                ))}
              </div>

              {/* Swipe Indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce z-10">
                <ChevronsUp className="h-5 w-5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Swipe up</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DashboardPage;
