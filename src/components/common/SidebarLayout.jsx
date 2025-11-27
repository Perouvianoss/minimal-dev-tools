import {
  Home,
  PanelLeftClose,
  PanelLeftOpen,
  Signature,
  SquareChevronLeft,
  SquareChevronRight,
  Timer,
} from "lucide-react";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

function SidebarLayout() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Apps", path: "/", icon: <Home /> },
    { name: "About Me", path: "/about-me", icon: <Signature /> },
  ];

  return (
    // wrapper div
    <div className="flex">
      {/* div για το toggle button */}
      <div
        className={`fixed top-5 left-5 transition-all duration-500 ease-in-out ${
          isOpen ? "left-52" : "left-5"
        }`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-3xl bg-slate-700 text-slate-300 hover:text-white transition-colors"
        >
          {isOpen ? <PanelLeftClose size={25} /> : <PanelLeftOpen size={25} />}
        </button>
      </div>
      {/* aside για το sidebar */}
      <aside
        className={`flex flex-col h-screen text-white bg-slate-800 transition-all duration-500 ease-in-out ${
          isOpen ? "w-50" : "w-0"
        }`}
      >
        {/* Τα περιεχόμενα του sidebar */}
        <nav className="flex flex-col space-y-1 p-4">
          {menuItems.map((item) => {
            return (
              <Link
                to={item.path}
                className="flex space-x-2 justify-center p-4 hover:bg-slate-700 transition-colors  duration-500 ease-in-out rounded-2xl"
                onClick={() => setIsOpen(!isOpen)}
              >
                <div>{item.icon}</div>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* το main κομμάτι της σελίδας δεξιά από το sidebar */}
      <main className="flex-1 flex justify-center top-0 bg-gray-400 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default SidebarLayout;
