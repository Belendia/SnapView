"use client";

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
import { SnapViewScatterChart } from "@/components/charts/scatter-chart";

const charts = [
  <SnapViewSingleValueChart />,
  <SnapViewColumnChart />,
  <SnapViewStackedAreaChart />,
  <SnapViewPieChart />,
  <SnapViewStackedChart />,
  <SnapViewLineChart />,
  <SnapViewBarChart />,
  <SnapViewAreaChart />,
  <SnapViewRadarChart />,
  <SnapViewGaugeChart />,
  <SnapViewPivotTable />,
  <SnapViewScatterChart />,
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
                height: "calc(100vh - 64px - 70px)", // adjust for header + bottom navbar
                paddingTop: "1.5rem", // for chart title
                paddingBottom: "3.5rem", // enough room for swipe indicator
              }}
            >
              {/* Scrollable Chart Content */}
              <div className="flex-1 px-4 flex items-center justify-center">
                <div className="w-full">{ChartComponent}</div>
              </div>

              {/* Right Side Buttons */}
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

              {/* Swipe Up Indicator */}
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
