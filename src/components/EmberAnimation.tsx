"use client";

import React from "react";

interface Ember {
  id: number;
  left: number;
  bottom: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  isAccent: boolean;
}

const STATIC_EMBERS: Ember[] = [
  { id: 0, left: 12, bottom: 5, size: 4, duration: 6.2, delay: 0.5, drift: 25, isAccent: true },
  { id: 1, left: 24, bottom: 8, size: 5, duration: 5.5, delay: 1.8, drift: -30, isAccent: false },
  { id: 2, left: 35, bottom: 12, size: 3, duration: 7.1, delay: 0.2, drift: 15, isAccent: true },
  { id: 3, left: 48, bottom: 4, size: 5, duration: 4.8, delay: 2.4, drift: -20, isAccent: true },
  { id: 4, left: 58, bottom: 9, size: 4, duration: 6.5, delay: 1.1, drift: 35, isAccent: false },
  { id: 5, left: 69, bottom: 6, size: 5, duration: 5.8, delay: 3.0, drift: -15, isAccent: true },
  { id: 6, left: 78, bottom: 11, size: 3, duration: 8.0, delay: 0.8, drift: 28, isAccent: false },
  { id: 7, left: 88, bottom: 7, size: 4, duration: 6.0, delay: 2.1, drift: -25, isAccent: true },
  { id: 8, left: 18, bottom: 15, size: 5, duration: 5.2, delay: 3.5, drift: 18, isAccent: true },
  { id: 9, left: 42, bottom: 14, size: 4, duration: 4.9, delay: 0.9, drift: 22, isAccent: false },
  { id: 10, left: 63, bottom: 16, size: 5, duration: 5.6, delay: 1.3, drift: 30, isAccent: true },
  { id: 11, left: 84, bottom: 13, size: 4, duration: 6.3, delay: 0.4, drift: 14, isAccent: true },
];

export const EmberAnimation: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}
    >
      {STATIC_EMBERS.map((e) => (
        <span
          key={e.id}
          className={`ember-particle absolute ${
            e.isAccent ? "bg-orange" : "bg-ink"
          }`}
          style={
            {
              left: `${e.left}%`,
              bottom: `${e.bottom}%`,
              width: `${e.size}px`,
              height: `${e.size}px`,
              animationDuration: `${e.duration}s`,
              animationDelay: `${e.delay}s`,
              "--drift": `${e.drift}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
};
