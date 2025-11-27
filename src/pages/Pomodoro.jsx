import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

// Ρυθμίσεις για κάθε Mode (Χρόνοι και Χρώματα)
const MODES = {
  work: {
    id: "work",
    label: "Focus",
    minutes: 25,
    color: "text-red-800",
    bg: "bg-red-500",
    ring: "stroke-red-500",
  },
  short: {
    id: "short",
    label: "Short Break",
    minutes: 5,
    color: "text-teal-800",
    bg: "bg-teal-800",
    ring: "stroke-teal-800",
  },
  long: {
    id: "long",
    label: "Long Break",
    minutes: 15,
    color: "text-blue-500",
    bg: "bg-blue-500",
    ring: "stroke-blue-500",
  },
};

// Ένας απαλός ήχος "Kitchen Timer"
const timerSound = new Audio(
  "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
);

export default function Pomodoro() {
  const [mode, setMode] = useState("work"); // work | short | long
  const [timeLeft, setTimeLeft] = useState(MODES.work.minutes * 60);
  const [isRunning, setIsRunning] = useState(false);

  // Παίρνουμε τα δεδομένα του τρέχοντος mode
  const currentMode = MODES[mode];
  const totalTime = currentMode.minutes * 60;

  // Υπολογισμός ποσοστού για τον κύκλο (0 έως 100)
  const progress = (timeLeft / totalTime) * 100;

  // Κύκλος SVG: Περίμετρος = 2 * pi * r
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // --- HANDLERS ---
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // --- TIMER LOGIC (ΒΕΛΤΙΩΜΕΝΟ) ---
  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          // Ελέγχουμε την προηγούμενη τιμή (prevTime) ΜΕΣΑ στο callback
          if (prevTime <= 1) {
            clearInterval(interval);
            setIsRunning(false);

            timerSound.play();

            timerSound.currentTime = 0;

            return 0; // Ο χρόνος γίνεται 0
          }
          // Αλλιώς μείωσε κατά 1
          return prevTime - 1;
        });
      }, 1000);
    }

    // Καθαρισμός όταν πατάμε Pause ή αλλάζουμε Mode
    return () => clearInterval(interval);

    // ΠΡΟΣΟΧΗ: Βγάλαμε το 'timeLeft' από τα dependencies!
    // Τώρα το effect τρέχει ΜΟΝΟ όταν πατάς Start/Pause (isRunning)
    // ή αλλάζεις Mode (currentMode).
  }, [isRunning, currentMode]);

  const changeMode = (newMode) => {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(MODES[newMode].minutes * 60); // Reset στο χρόνο του νέου mode
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(currentMode.minutes * 60);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-2xl mx-auto p-4 animate-in fade-in zoom-in duration-500">
      {/* 1. HEADER & MODE SWITCHER */}
      <div className="bg-white p-2 rounded-full shadow-sm mb-12 flex gap-2 border border-slate-200">
        {Object.values(MODES).map((m) => (
          <button
            key={m.id}
            onClick={() => changeMode(m.id)}
            className={`
              px-6 py-2 rounded-full text-sm font-bold transition-all duration-300
              ${
                mode === m.id
                  ? `${m.bg} text-white shadow-md transform scale-105`
                  : "text-slate-500 hover:bg-slate-100"
              }
            `}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* 2. CIRCULAR TIMER DISPLAY */}
      <div className="relative mb-12">
        {/* SVG Circle */}
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
            className={`${currentMode.ring} transition-all duration-1000 ease-linear`}
          />
        </svg>

        {/* Κείμενο στη μέση */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
          <span
            className={`text-6xl font-bold tracking-tighter ${currentMode.color} font-mono transition-colors duration-300`}
          >
            {formatTime(timeLeft)}
          </span>
          <span className="text-slate-400 font-medium mt-2 tracking-widest uppercase text-sm">
            {isRunning ? "Running" : "Paused"}
          </span>
        </div>
      </div>

      {/* 3. CONTROLS */}
      <div className="flex gap-6">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`
            h-16 w-16 rounded-4xl flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-slate-300/50
            transition-all duration-200 active:scale-95 hover:shadow-xl
            ${currentMode.bg}
          `}
        >
          {isRunning ? (
            <Pause size={32} />
          ) : (
            <Play size={32} fill="currentColor" />
          )}
        </button>

        <button
          onClick={resetTimer}
          className="h-16 w-16 bg-slate-200 rounded-4xl flex items-center justify-center text-slate-600 hover:bg-slate-300 hover:text-slate-800 transition-colors"
        >
          <RotateCcw size={28} />
        </button>
      </div>
    </div>
  );
}
