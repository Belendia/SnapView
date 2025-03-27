"use client";

import React, { useEffect, useState } from "react";
import { ChevronsUp } from "lucide-react";

const SwipeIndicator = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const cycle = () => {
      if (!isMounted) return;

      setVisible(true); // Show
      setTimeout(() => {
        if (!isMounted) return;

        setVisible(false); // Hide
        setTimeout(() => {
          if (!isMounted) return;
          cycle(); // Repeat
        }, 5000); // Hidden for 5s
      }, 10000); // Visible for 10s
    };

    cycle();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30">
      <div className="flex flex-col items-center animate-bounce bg-white/80 rounded-full px-3 py-1 shadow">
        <ChevronsUp className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">Swipe up</span>
      </div>
    </div>
  );
};

export default SwipeIndicator;
