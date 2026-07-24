import { useState } from "react";
import { motion } from "framer-motion";
import NoteApp from "./Components/Notes/NoteApp";
import TodosApp from "./Components/Todos/TodosApp";
import profile from '../src/assets/profile.png';
import "./App.css";

const TABS = [
  { id: "notes", label: "Notes", color: "#6D4FE0" },
  { id: "todos", label: "Tasks", color: "#E11D74" },
];

function App() {
  const [activeTab, setActiveTab] = useState("notes");
  const activeColor = TABS.find((t) => t.id === activeTab).color;

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7FB]">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md ">
        <div className="flex items-center justify-between px-4 sm:px-6 h-16 max-w-6xl mx-auto w-full">

          {/* Logo mark */}
          <div className="flex items-center gap-2.5 select-none shrink-0">
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              className="shrink-0"
            >
              <rect
                x="9"
                y="4"
                width="17"
                height="21"
                rx="4"
                fill="#1F2028"
                fillOpacity="0.08"
              />
              <rect
                x="4"
                y="6"
                width="17"
                height="21"
                rx="4"
                fill={activeColor}
                style={{ transition: "fill 0.5s ease" }}
              />
              <path
                d="M8.5 16.5l2.8 2.8L17 13"
                stroke="white"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              className="font-semibold text-[18px] tracking-tight text-gray-900 max-[400px]:hidden"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Own
              <span
                style={{ color: activeColor, transition: "color 0.5s ease" }}
              >
                Docs
              </span>
            </span>
          </div>

          {/* Segmented tab switcher */}
          <nav
            aria-label="Switch view"
            className="relative flex items-center bg-gray-100/80 rounded-full p-1 gap-1"
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  aria-pressed={isActive}
                  className={`relative h-9 px-5 sm:px-7 rounded-full text-sm font-medium cursor-pointer
                    transition-colors duration-300 ease-out
                     focus-visible:outline-offset-2 focus-visible:outline-violet-400
                    ${isActive ? "text-white" : "text-gray-600 hover:text-gray-900"}`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="tab-pill"
                      className="absolute inset-0 rounded-full -z-10"
                      style={{ background: tab.color }}
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Status / profile placeholder — quiet, reserved for future account UI */}
          <div
            className="w-10 h-10 rounded-full bg-gray-100 border border-black/5 flex items-center justify-center text-gray-500 text-[11px] font-semibold shrink-0"
            title="Signed out — local device only"
          >
            <a href="https://gauravk.vercel.app" target="_blank" className="relative group">
              <img src={profile} alt="Profile" width={45} className="hover:scale-110 duration-200 p-0.5  rounded-full" />
            </a>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1">
        {activeTab === "notes" ? <NoteApp /> : <TodosApp />}
      </main>
    </div>
  );
}

export default App;
