"use client";

import React, { useEffect, useState, Suspense } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Mousewheel } from "swiper/modules";
import {
  ThumbsUp,
  ThumbsDown,
  Share2,
  SlidersHorizontal,
  ChevronsUp,
  MessageCircle,
  Loader2,
} from "lucide-react";

import "swiper/css";
import "swiper/css/effect-creative";

import { chartMap, ChartKey } from "@/lib/chart-loader";
import { getChartSequence } from "@/actions/get-chart-sequence";

const DashboardPage = () => {
  const [chartSequence, setChartSequence] = useState<{ type: ChartKey }[]>([]);

  useEffect(() => {
    getChartSequence().then(setChartSequence);
  }, []);

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
        {chartSequence.map(({ type }, index) => {
          const Chart = chartMap[type];
          return (
            <SwiperSlide
              key={index}
              className="flex items-center justify-center"
            >
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
                  <div className="w-full">
                    <Suspense
                      fallback={
                        <div className="flex flex-col items-center justify-center w-full h-[300px] text-muted-foreground">
                          <Loader2 className="animate-spin h-6 w-6 mb-2" />
                          Loading chart...
                        </div>
                      }
                    >
                      <Chart />
                    </Suspense>
                  </div>
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
                  <span className="text-xs text-muted-foreground">
                    Swipe up
                  </span>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default DashboardPage;
