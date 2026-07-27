import { useState } from "react";
import { motion } from "framer-motion";
import { LuSun, LuMoon } from "react-icons/lu";
import NoteApp from "./Components/Notes/NoteApp";
import TodosApp from "./Components/Todos/TodosApp";
import { ThemeProvider, useTheme } from "./Context/ThemeContext";
import profile from "./assets/profilecopy.png";
import "./App.css";

const TABS = [
  { id: "notes", label: "Notes", color: "#6D4FE0" },
  { id: "todos", label: "Tasks", color: "#E11D74" },
];

function AppShell() {
  const [activeTab, setActiveTab] = useState("notes");
  const { theme, toggleTheme } = useTheme();
  const activeColor = TABS.find((t) => t.id === activeTab).color;

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7FB] dark:bg-[#0B0B10] transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-[#15151d]/80 backdrop-blur-md border-b border-black/5 dark:border-white/10 transition-colors duration-300">
        <div className="flex items-center justify-between px-4 sm:px-6 h-16 max-w-6xl mx-auto w-full">

          {/* Logo mark */}
          <div className="flex items-center gap-2.5 select-none shrink-0">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" className="shrink-0">
              <rect x="9" y="4" width="17" height="21" rx="4" fill="#1F2028" fillOpacity="0.08" />
              <rect
                x="4" y="6" width="17" height="21" rx="4"
                fill={activeColor}
                style={{ transition: "fill 0.5s ease" }}
              />
              <path d="M8.5 16.5l2.8 2.8L17 13" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span
              className="font-semibold text-[18px] tracking-tight text-gray-900 dark:text-gray-100 max-[400px]:hidden"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Own
              <span style={{ color: activeColor, transition: "color 0.5s ease" }}>
                Docs
              </span>
            </span>
          </div>

          {/* Segmented tab switcher */}
          <nav aria-label="Switch view" className="relative flex items-center bg-gray-100/50 rounded-full p-1 gap-2 dark:bg-white/10">

            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  aria-pressed={isActive}
                  className={`relative h-9 px-5 sm:px-7 rounded-full text-sm font-medium cursor-pointer
                    transition-colors duration-300 ease-out
                   focus-visible:outline-offset-2 focus-visible:outline-violet-900
                    ${isActive ? "text-white" : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"}`}
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

          {/* Right side: theme toggle + profile placeholder */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 border border-black/5 dark:border-white/10
                flex items-center justify-center text-gray-500 dark:text-gray-300 cursor-pointer
                hover:text-gray-900 dark:hover:text-white transition-colors duration-300
                 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
            >
              {theme === "dark" ? <LuSun className="text-sm" /> : <LuMoon className="text-sm" />}
            </button>

            <div
              className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 border border-black/5 dark:border-white/10 flex items-center justify-center text-gray-500 dark:text-gray-300 text-[11px] font-semibold"
              title="Signed out — local device only"
            >
              <a href="https://gauravk.vercel.app" target="_blank">
                <img src={profile} alt="Profile" className="hover:scale-110 duration-200 p-0.5" />
              </a>
            </div>
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

function App() {
  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  );
}

export default App;
