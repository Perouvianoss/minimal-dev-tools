import { Calculator, CloudSun, Timer } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function HomeApps() {
  const AppsItems = [
    {
      name: "Pomodoro Timer",
      descr:
        "A productivity app that uses the Pomodoro technique to break work into intervals, typically 25 minutes of focused work followed by a 5-minute break.",
      path: "/pomodoro",
      icon: <Timer />,
    },
    {
      name: "Calculator",
      descr:
        "A simple calculator app for performing basic arithmetic operations like addition, subtraction, multiplication, and division.",
      path: "/calculator",
      icon: <Calculator />,
    },
    {
      name: "Weather Checker",
      descr:
        "A lightweight app to check the current weather and forecast for your location or any city worldwide.",
      path: "/weather",
      icon: <CloudSun />,
    },
  ];

  return (
    <div className="flex flex-col text-center">
      <div className="m-4 text-2xl font-bold">
        All my basic apps in the home page
      </div>
      <div className="border rounded-2xl bg-slate-500 h-auto p-4 space-y-3">
        {AppsItems.map((item) => {
          return (
            <div className="flex flex-col">
              <Link
                to={item.path}
                className="flex justify-between items-center p-4 bg-white shadow hover:bg-gray-100 border border-gray-200 rounded-lg transition duration-150"
              >
                <div className="flex justify-center items-center p-4 space-x-1">
                  {item.icon}
                  <h1 className="font-bold text-2xl">{item.name}</h1>
                </div>
                <div className="w-96">
                  <p>{item.descr}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomeApps;
