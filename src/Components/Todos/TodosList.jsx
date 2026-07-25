import { UseTodo } from "../../Context/TodosContext";
import TodosCard from "./TodosCard";
import { LuInbox, LuListTodo } from "react-icons/lu";

function TodosList({ activeFolder, searchInput }) {
    const { todos, openForm } = UseTodo();

    const filteredTodos = todos.filter(todo => {

        const matchSearch = todo.text?.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase());

        if (activeFolder === "All Todos" || activeFolder === "All Tasks") return !todo.isDeleted && matchSearch;
        if (activeFolder === "Pinned Todos") return todo.isPinned && !todo.isDeleted && matchSearch;
        if (activeFolder === "Pending Todos") return !todo.isCompleted && !todo.isDeleted && matchSearch;
        if (activeFolder === "Completed Todos") return todo.isCompleted && !todo.isDeleted && matchSearch;
        if (activeFolder === "Locked Todos") return todo.isLocked && !todo.isDeleted && matchSearch;
        if (activeFolder === "Recycle Bin") return todo.isDeleted && matchSearch;
        return !todo.isDeleted && matchSearch;

    });

    if (filteredTodos.length === 0) {
        const hasAnyTodosAtAll = todos.length > 0;
        const isSearching = searchInput.trim().length > 0;
        const isAllView = activeFolder === "All Todos" || activeFolder === "All Tasks";

        // Case 1: Genuinely brand-new user — nothing created yet anywhere.
        if (!hasAnyTodosAtAll && isAllView && !isSearching) {
            return (
                <div className="w-full flex flex-col items-center justify-center h-[60vh] text-gray-600 animate-fadeIn px-4">
                    <TodoIllustration />
                    <p className="font-semibold text-lg text-gray-800 mt-4">Nothing on your plate yet.</p>
                    <p className="text-sm text-gray-400 mt-1 text-center max-w-[260px]">
                        Add a task, big or small — this is where you'll track what needs doing.
                    </p>
                    <button
                        onClick={() => openForm(null)}
                        className="mt-5 flex items-center gap-2 bg-[#ea105c] hover:bg-[#d10e52] text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                    >
                        <LuListTodo className="text-base" />
                        Create your first task
                    </button>
                    <p className="text-xs text-gray-400 mt-3">or just press <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-gray-600 font-mono">N</kbd></p>
                </div>
            );
        }

        // Case 2: Searching and nothing matches.
        if (isSearching) {
            return (
                <div className="w-full flex flex-col items-center justify-center h-[60vh] text-gray-600 animate-fadeIn px-4">
                    <LuInbox className="text-6xl mb-3 text-gray-400" />
                    <p className="font-semibold text-lg text-gray-800">No matches for "{searchInput}"</p>
                    <p className="text-sm text-gray-400 mt-1 text-center max-w-[260px]">
                        Try a different search term, or check another folder.
                    </p>
                </div>
            );
        }

        // Case 3: A specific filter (Pinned, Pending, Completed, Locked, Recycle Bin) is just empty.
        const folderMessages = {
            "Pinned Todos": "Pin a task to see it here — look for the pin icon on any task.",
            "Pending Todos": "Nothing pending — you're caught up.",
            "Completed Todos": "Nothing completed yet — finished tasks will show up here.",
            "Locked Todos": "Lock a task to see it here — look for the lock icon on any task.",
            "Recycle Bin": "Deleted tasks show up here before they're gone for good.",
        };

        return (
            <div className="w-full flex flex-col items-center justify-center h-[60vh] text-gray-600 animate-fadeIn px-4">
                <LuInbox className="text-6xl mb-3 text-gray-400" />
                <p className="font-semibold text-lg text-gray-800">Nothing in {activeFolder} yet</p>
                <p className="text-sm text-gray-400 mt-1 text-center max-w-[260px]">
                    {folderMessages[activeFolder] || "Try creating or restoring some tasks."}
                </p>
            </div>
        );
    }

    return (

        <div key={activeFolder}
            className="w-[80%] max-[550px]:w-[95%] flex flex-col gap-4 p-3 pt-4 overflow-y-auto rounded-md animate-fadeIn scrollbar-hide">

            {filteredTodos.map(todo => (
                <TodosCard
                    key={todo.id}
                    todo={todo}
                    isRecycleBin={activeFolder === "Recycle Bin"}
                />
            ))}
        </div>

    );
}

// Small inline illustration — no external image asset needed, matches brand color
function TodoIllustration() {
    return (
        <svg width="120" height="100" viewBox="0 0 120 100" fill="none">
            <rect x="22" y="14" width="76" height="20" rx="6" fill="#FDE6ED" />
            <rect x="22" y="40" width="76" height="20" rx="6" fill="#FDE6ED" />
            <rect x="22" y="66" width="76" height="20" rx="6" fill="#ea105c" fillOpacity="0.12" />
            <rect x="28" y="20" width="8" height="8" rx="2" stroke="#ea105c" strokeWidth="1.8" />
            <rect x="28" y="46" width="8" height="8" rx="2" stroke="#ea105c" strokeWidth="1.8" />
            <path d="M28.5 76.5l2.2 2.2 5-5" stroke="#ea105c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="44" y1="24" x2="82" y2="24" stroke="#ea105c" strokeWidth="2.2" strokeLinecap="round" strokeOpacity="0.4" />
            <line x1="44" y1="50" x2="76" y2="50" stroke="#ea105c" strokeWidth="2.2" strokeLinecap="round" strokeOpacity="0.4" />
            <line x1="44" y1="76" x2="70" y2="76" stroke="#ea105c" strokeWidth="2.2" strokeLinecap="round" strokeOpacity="0.55" />
        </svg>
    );
}

export default TodosList;