import React, { useState } from "react";

function Pomodoro() {
  const [workSession, setWorkSession] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center space-y-10">
      <h1 className="text-3xl">Pomodoro Timer</h1>
      <h1 className="text-6xl font-bold">25:00</h1>
      <button
        onClick={() => setWorkSession(!workSession)}
        className="text-white font-bold border bg-slate-700 border-slate-700 rounded-3xl p-4 cursor-pointer"
      >
        {workSession ? "Pause" : "Play"}
      </button>
    </div>
  );
}

export default Pomodoro;
