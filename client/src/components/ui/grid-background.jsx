import { cn } from "@/lib/utils";
import React from "react";

export function GridBackground({ children, className }) {
  return (
    <div
      className={cn(
        "relative flex h-[36rem] w-full items-center justify-center bg-transparent overflow-hidden",
        className
      )}
    >
      {/* Enhanced Grid pattern with better contrast */}
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:50px_50px]",
          "[background-image:linear-gradient(to_right,rgb(226,232,240)_1px,transparent_1px),linear-gradient(to_bottom,rgb(226,232,240)_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
      />

      {/* Enhanced Radial fade mask for depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_70%)] dark:via-black/50 dark:to-black"></div>

      {/* Content goes above background */}
      <div className="relative z-10 text-center">
        {children}
      </div>
    </div>
  );
}
