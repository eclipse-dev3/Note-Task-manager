
import { UseTodo } from "../../Context/TodosContext";
import TodosCard from "./TodosCard";
import { LuInbox } from "react-icons/lu";

function TodosList({ activeFolder, searchInput }) {
    const { todos } = UseTodo();

    const filteredTodos = todos.filter(todo => {

        const matchSearch = todo.text?.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase());

        if (activeFolder === "All Todos") return !todo.isDeleted && matchSearch;
        if (activeFolder === "Pinned Todos") return todo.isPinned && !todo.isDeleted && matchSearch;
        if (activeFolder === "Pending Todos") return !todo.isCompleted && !todo.isDeleted && matchSearch;
        if (activeFolder === "Completed Todos") return todo.isCompleted && !todo.isDeleted && matchSearch;
        if (activeFolder === "Locked Todos") return todo.isLocked && !todo.isDeleted && matchSearch;
        if (activeFolder === "Recycle Bin") return todo.isDeleted && matchSearch;
        return !todo.isDeleted && matchSearch;

    });

    if (filteredTodos.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-gray-600 animate-fadeIn">
                <LuInbox className="text-6xl mb-3 text-gray-500" />
                <p className="font-semibold text-lg">No tasks found in {activeFolder}.</p>
                <p className="text-sm text-gray-400 mt-1">Try creating or restoring some tasks.</p>
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

export default TodosList;
