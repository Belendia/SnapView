"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronsUp } from "lucide-react";

const SwipeIndicator = () => {
  const [visible, setVisible] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const cycleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startCycle = () => {
    setVisible(true);
    timeoutRef.current = setTimeout(() => {
      setVisible(false);
      cycleTimeoutRef.current = setTimeout(() => {
        startCycle(); // Repeat the cycle
      }, 5000); // hidden for 5s
    }, 10000); // visible for 10s
  };

  useEffect(() => {
    startCycle(); // Begin on mount
    return () => {
      clearTimeout(timeoutRef.current as NodeJS.Timeout);
      clearTimeout(cycleTimeoutRef.current as NodeJS.Timeout);
    };
  }, []);

  const handleClick = () => {
    clearTimeout(timeoutRef.current as NodeJS.Timeout);
    clearTimeout(cycleTimeoutRef.current as NodeJS.Timeout);
    setVisible(false);

    // Resume cycle after 10s hidden manually
    timeoutRef.current = setTimeout(() => {
      startCycle();
    }, 10000);
  };

  if (!visible) return null;

  return (
    <div
      onClick={handleClick}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 cursor-pointer"
    >
      <div className="flex flex-col items-center animate-bounce bg-white/80 rounded-full px-3 py-1 shadow">
        <ChevronsUp className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">Swipe up</span>
      </div>
    </div>
  );
};

export default SwipeIndicator;
