"use client";

import React, { useEffect, useRef, useState, Suspense } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Mousewheel } from "swiper/modules";
import {
  ThumbsUp,
  ThumbsDown,
  Share2,
  SlidersHorizontal,
  MessageCircle,
  Loader2,
} from "lucide-react";

import "swiper/css";
import "swiper/css/effect-creative";

import { chartMap, ChartKey } from "@/lib/chart-loader";
import { getChartSequence } from "@/actions/chart-sequence";
import SwipeIndicator from "../_components/swipe-indicator";

const DashboardPage = () => {
  const [chartSequence, setChartSequence] = useState<{ type: ChartKey }[]>([]);
  const [chartHeight, setChartHeight] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getChartSequence().then(setChartSequence);
  }, []);

  useEffect(() => {
    const updateHeight = () => {
      const topNav = 64; // or querySelector('.top-nav')?.offsetHeight || 64;
      const newHeight = window.innerHeight - topNav;

      // Add a small delay to ensure Swiper & fonts are loaded
      requestAnimationFrame(() => {
        setChartHeight(newHeight);
      });

      // Safety: reset again after fonts/layout settle
      setTimeout(() => {
        setChartHeight(window.innerHeight - topNav);
      }, 100); // adjust delay if needed
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden" ref={containerRef}>
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
                className="w-full mx-auto bg-white dark:bg-card shadow-xl relative flex flex-col overflow-hidden"
                style={{
                  height: chartHeight,
                  paddingTop: "1.5rem",
                  // paddingBottom: "3.5rem",
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
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <SwipeIndicator />
    </div>
  );
};

export default DashboardPage;
