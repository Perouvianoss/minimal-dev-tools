import React from "react";

function Timer() {
  const progress = 60;

  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg width="300" height="300" className="transform -rotate-90">
      {/* Background Circle (Γκρι) */}
      <circle
        cx="150"
        cy="150"
        r={radius}
        stroke="currentColor"
        strokeWidth="15"
        fill="transparent"
        className="text-slate-200"
      />
      {/* Progress Circle (Χρωματιστό) */}
      <circle
        cx="150"
        cy="150"
        r={radius}
        stroke="currentColor"
        strokeWidth="15"
        fill="transparent"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
      />
    </svg>
  );

  //   <h1 className="text-6xl font-bold">25:00</h1>
}

export default Timer;
