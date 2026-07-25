import { useEffect, useState, useRef } from "react"
import { NoteContext } from "../../Context/NotesContext"
import SearchBar from "../Common/SearchBar"
import NoteList from "./NoteList"
import NoteForm from "./NoteForm"
import { FaRegPenToSquare, FaBars } from "react-icons/fa6";
import { RiCloseFill } from "react-icons/ri";
import NoteSideBar from "./NoteSideBar"
import { LuNotebook } from "react-icons/lu";
import { useKeyboardShortcuts } from "../../hooks/useKeyboardShortcuts";

function NoteApp() {

    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const [activeFolder, setActiveFolder] = useState('All Notes');
    const [searchInput, setSearchInput] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [activeFolderView, setActiveFolderView] = useState(
        <div className="flex items-center gap-2 h-6">
            <LuNotebook /> All Notes
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
        const storedNotes = JSON.parse(localStorage.getItem('myNotes'));
        if (storedNotes && storedNotes.length > 0) setNotes(storedNotes);
    }, []);

    // Save notes to local storage
    useEffect(() => {
        localStorage.setItem('myNotes', JSON.stringify(notes));
    }, [notes]);

    // CRUD logic
    const addNote = (note) => {
        setNotes(prevNotes => [{ id: Date.now(), ...note }, ...prevNotes])
    };

    const UpdateNote = (id, updatedNote) => {
        setNotes(prevNotes =>
            prevNotes.map(note =>
                note.id === id ? { ...note, ...updatedNote, lastUpdateAt: new Date().toISOString() } : note
            )
        );
    };

    const softDelNote = (id) => {
        setNotes(prevNotes => prevNotes.map(note => note.id === id ? { ...note, isDeleted: true } : note));
    };

    const restoreNote = (id) => {
        setNotes(prevNotes => prevNotes.map(note => note.id === id ? { ...note, isDeleted: false } : note));
    };

    const togglePin = (id) => {
        setNotes(prevNotes => prevNotes.map(note => note.id === id ? { ...note, isPinned: !note.isPinned } : note));
    };

    const toggleLock = (id) => {
        setNotes(prevNotes => prevNotes.map(note => note.id === id ? { ...note, isLocked: !note.isLocked } : note));
    };

    const permanentDelNote = (id) => {
        setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    };

    const openForm = (note) => {
        setSelectedNote(note);
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setSelectedNote(null);
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

    // Keyboard shortcuts: Ctrl/Cmd+N -> new note, "/" -> focus search, Esc -> close form
    useKeyboardShortcuts({
        onNew: () => openForm(null),
        onFocusSearch: () => searchInputRef.current?.focus(),
        onEscape: () => {
            if (isFormOpen) closeForm();
        },
    });

    return (
        <NoteContext.Provider value={{ notes, addNote, UpdateNote, softDelNote, permanentDelNote, togglePin, toggleLock, restoreNote, openForm, closeForm }}>

            <div className="flex relative animate-fadeIn">

                {/* Sidebar (hidden on small screens) */}
                <NoteSideBar
                    isOpen={isSideBarOpen}
                    onSelectFolder={handleSelectFolder}
                    notes={notes}
                />

                {/* Main Content */}
                <div className="relative w-full lg:w-[80%] h-[95vh] bg-gray-100 rounded-tr-md rounded-br-md p-2 pb-9 flex flex-col items-center gap-2 max-[550px]:gap-3.5 overflow-hidden">

                    {/* Search Bar */}
                    <SearchBar
                        ref={searchInputRef}
                        placeholder={'Search notes... (press / to focus)'}
                        searchInput={searchInput} setSearchInput={setSearchInput}
                        className='text-[#7d5dd3] hover:text-[#7d5dd3]'
                    />

                    {/* Folder Header */}
                    <div className="flex items-center justify-center text-xs font-semibold h-6 text-white rounded px-3 cursor-pointer bg-[#7d5dd3]">
                        {activeFolderView}
                    </div>

                    <NoteList activeFolder={activeFolder} searchInput={debouncedSearch} />

                    {isFormOpen && <NoteForm selectedNote={selectedNote} closeForm={closeForm} />}

                    {/* Floating Add Button */}
                    <div
                        onClick={() => setIsFormOpen(true)}
                        className="group absolute bottom-20 right-10 max-[550px]:right-6 bg-white rounded-full shadow-xl p-4 max-[550px]:p-4.5 cursor-pointer text-red-500 hover:scale-[1.1] hover:shadow-3xl transition-all duration-300 animate-fadeIn"
                    >
                        <FaRegPenToSquare className="text-xl" />
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-1 py-1 text-xs font-semibold text-white bg-[#7d5dd3] rounded-md shadow-[0px_0px_8px_2px_rgba(93,64,177,0.6)] opacity-0 scale-90 translate-y-1 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-300 ease-out pointer-events-none whitespace-nowrap">
                            New Note <span className="opacity-70">(press N)</span>
                        </span>
                    </div>

                    {/* Toggle Sidebar Button (visible only on small screens) */}
                    {!isSideBarOpen ? (
                        <FaBars
                            onClick={toggleSideBar}
                            className="lg:hidden absolute top-4 left-3.5 text-xl max-[550px]:text-2xl text-[#6949c1] cursor-pointer animate-fadeIn"
                        />
                    ) : (
                        <RiCloseFill
                            onClick={toggleSideBar}
                            className="lg:hidden absolute  top-3 left-2.5 text-3xl max-[550px]:text-4xl text-white font-bold cursor-pointer animate-fadeIn z-100"
                        />
                    )}

                </div>
            </div>
        </NoteContext.Provider>
    );
}

export default NoteApp;