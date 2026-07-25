import { useEffect, useState, useRef } from "react"
import { TodoContext } from "../../Context/TodosContext"
import SearchBar from "../Common/SearchBar"
import TodosList from "./TodosList"
import TodosForm from "./TodosForm"
import { FaRegPenToSquare, FaBars } from "react-icons/fa6";
import { RiCloseFill } from "react-icons/ri";
import { LuNotebook } from "react-icons/lu";
import TodosSideBar from './TodosSidebar'
import { useKeyboardShortcuts } from "../../hooks/useKeyboardShortcuts";

function TodosApp() {

    const [todos, setTodos] = useState([]);
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const [activeFolder, setActiveFolder] = useState('All Tasks');
    const [searchInput, setSearchInput] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [activeFolderView, setActiveFolderView] = useState(
        <div className="flex items-center gap-2 h-6">
            <LuNotebook /> All Tasks
        </div>
    );

    const searchInputRef = useRef(null);

    // Debounce search input
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchInput);
        }, 300);
        return () => clearTimeout(handler);
    }, [searchInput]);

    // Load saved notes
    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem('myTasks'));
        if (todos && todos.length > 0) setTodos(todos);
    }, []);

    // Save notes to local storage
    useEffect(() => {
        localStorage.setItem('myTasks', JSON.stringify(todos));
    }, [todos]);

    // CRUD logic
    const addTodo = (todos) => {
        setTodos(prevTodos => [{ id: Date.now(), ...todos }, ...prevTodos])
    };

    const UpdateTodo = (id, updatedTodo) => {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === id ? { ...todo, ...updatedTodo, lastUpdateAt: new Date().toISOString() } : todo
            )
        );
    };

    const softDelTodo = (id) => {
        setTodos(prevTodos => prevTodos.map(todo => todo.id === id ? { ...todo, isDeleted: true } : todo));
    };

    const restoreTodo = (id) => {
        setTodos(prevTodos => prevTodos.map(todo => todo.id === id ? { ...todo, isDeleted: false } : todo));
    };

    const togglePin = (id) => {
        setTodos(prevTodos => prevTodos.map(todo => todo.id === id ? { ...todo, isPinned: !todo.isPinned } : todo));
    };

    const toggleComplete = (id) => {
        setTodos(prevTodos => prevTodos.map(todo => todo.id === id ? { ...todo, isCompleted: !todo.isCompleted, completedAt: new Date().toISOString() } : todo));
    }

    const permanentDelTodo = (id) => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    };

    const openForm = (todo) => {
        setSelectedTodo(todo);
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setSelectedTodo(null);
        setIsFormOpen(false);
    };

    const toggleSideBar = () => {
        setIsSideBarOpen(prev => !prev);
    };

    const handleSelectFolder = (folderLabel, FolderIcon) => {
        setActiveFolder(folderLabel);
        setActiveFolderView(
            <div className="flex items-center gap-2 justify-center h-6">
                {FolderIcon} {folderLabel}
            </div>
        );
    };

    // Keyboard shortcuts: Ctrl/Cmd+N -> new task, "/" -> focus search, Esc -> close form
    useKeyboardShortcuts({
        onNew: () => openForm(null),
        onFocusSearch: () => searchInputRef.current?.focus(),
        onEscape: () => {
            if (isFormOpen) closeForm();
        },
    });

    return (
        <TodoContext.Provider value={{ todos, addTodo, UpdateTodo, softDelTodo, permanentDelTodo, togglePin, restoreTodo, toggleComplete, openForm, closeForm }}>

            <div className="flex relative animate-fadeIn">

                {/* Sidebar (hidden on small screens) */}
                <TodosSideBar
                    isOpen={isSideBarOpen}
                    onSelectFolder={handleSelectFolder}
                    todos={todos}
                />

                {/* Main Content */}
                <div className="relative w-full lg:w-[80%] h-[95vh] bg-gray-100 rounded-tr-md rounded-br-md p-2 pb-9 flex flex-col items-center gap-2 max-[550px]:gap-3.5 overflow-hidden">

                    {/* Search Bar */}
                    <SearchBar
                        ref={searchInputRef}
                        placeholder={'Search tasks... (press / to focus)'}
                        searchInput={searchInput} setSearchInput={setSearchInput}
                        className='text-[#ea105c] hover:text-[#ea105c]'
                    />

                    {/* Folder Header */}
                    <div className="flex items-center justify-center text-xs font-semibold h-6 text-white rounded px-3 cursor-pointer bg-[#ea105c]">
                        {activeFolderView}
                    </div>

                    <TodosList activeFolder={activeFolder} searchInput={debouncedSearch} />

                    {isFormOpen && <TodosForm selectedTodo={selectedTodo} closeForm={closeForm} />}

                    {/* Floating Add Button */}
                    <div
                        onClick={() => openForm(null)}
                        className="group absolute bottom-20 right-10 max-[550px]:right-6 bg-white rounded-full shadow-xl p-4 max-[550px]:p-4.5 cursor-pointer text-red-500 hover:scale-[1.1] hover:shadow-3xl transition-all duration-300 animate-fadeIn"
                    >
                        <FaRegPenToSquare className="text-xl" />
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-1 py-1 text-xs font-semibold text-white bg-[#ea105c] rounded-md shadow-[0px_0px_8px_2px_rgba(93,64,177,0.6)] opacity-0 scale-90 translate-y-1 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-300 ease-out pointer-events-none whitespace-nowrap">
                            New Task <span className="opacity-70">(press N)</span>
                        </span>
                    </div>

                    {/* Toggle Sidebar Button (visible only on small screens) */}
                    {!isSideBarOpen ? (
                        <FaBars
                            onClick={toggleSideBar}
                            className="lg:hidden absolute top-4 left-3.5 text-xl max-[550px]:text-2xl text-[#ea105c] cursor-pointer animate-fadeIn"
                        />
                    ) : (
                        <RiCloseFill
                            onClick={toggleSideBar}
                            className="lg:hidden absolute  top-3 left-2.5 text-3xl max-[550px]:text-4xl text-white font-bold cursor-pointer animate-fadeIn z-100"
                        />
                    )}

                </div>
            </div>
        </TodoContext.Provider>
    );
}

export default TodosApp;