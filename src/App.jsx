import { useState } from "react";
import NoteApp from "./Components/Notes/NoteApp";
import TodosApp from "./Components/Todos/TodosApp";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("notes");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-gray-200 mb-1 flex items-center gap-1 relative">
        {["notes", "todos"].map((tab) => {
          const isActive = activeTab === tab;
          const activeColor = tab === "notes" ? "#5e40b1" : "#ea105c";

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative w-[50%] p-2.5 cursor-pointer transition-all duration-200 font-medium
                ${isActive
                  ? "bg-gray-200 shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:text-gray-900"
                }`}
              style={{
                color: isActive ? activeColor : "",
              }}
            >
              {tab === "notes" ? "Notes" : "Tasks"}

              {/* Animated underline */}
              <span
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] 
                rounded-md transition-all duration-500 ease-in-out 
                ${isActive ? "w-[100%]" : "w-0"}`}
                style={{
                  background: `linear-gradient(to right, ${activeColor}, ${tab === "notes" ? "#8a6df8" : "#ff6b8a"
                    })`,
                }}
              ></span>
            </button>
          );
        })}
      </header>

      {/* Content */}
      <main className="flex-1">
        {activeTab === "notes" ? <NoteApp /> : <TodosApp />}
      </main>
    </div>
  );
}

export default App;
