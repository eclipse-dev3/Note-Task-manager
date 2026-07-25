import { UseNote } from "../../Context/NotesContext";
import NoteCard from "./NoteCard";
import { LuInbox, LuNotebookPen } from "react-icons/lu";

function NoteList({ activeFolder, searchInput }) {
    const { notes, openForm } = UseNote();

    const filteredNotes = notes.filter(note => {
        const matchSearch = note.title?.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase()) ||
            note.content?.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase());

        if (activeFolder === "All Notes") return !note.isDeleted && matchSearch;
        if (activeFolder === "Pinned Notes") return note.isPinned && !note.isDeleted && matchSearch;
        if (activeFolder === "Locked Notes") return note.isLocked && !note.isDeleted && matchSearch;
        if (activeFolder === "Recycle Bin") return note.isDeleted && matchSearch;
        return !note.isDeleted && matchSearch;
    });

    if (filteredNotes.length === 0) {
        const hasAnyNotesAtAll = notes.length > 0;
        const isSearching = searchInput.trim().length > 0;

        // Case 1: Genuinely brand-new user — nothing created yet anywhere.
        // This is the one moment worth a real onboarding push.
        if (!hasAnyNotesAtAll && activeFolder === "All Notes" && !isSearching) {
            return (
                <div className="w-full flex flex-col items-center justify-center h-[60vh] text-gray-600 animate-fadeIn px-4">
                    <NoteIllustration />
                    <p className="font-semibold text-lg text-gray-800 mt-4">Your notes live here.</p>
                    <p className="text-sm text-gray-400 mt-1 text-center max-w-[260px]">
                        Jot down ideas, lists, or anything worth remembering — nothing here yet, so let's fix that.
                    </p>
                    <button
                        onClick={() => openForm(null)}
                        className="mt-5 flex items-center gap-2 bg-[#7d5dd3] hover:bg-[#6949c1] text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                    >
                        <LuNotebookPen className="text-base" />
                        Create your first note
                    </button>
                    <p className="text-xs text-gray-400 mt-3">or just press <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-gray-600 font-mono">N</kbd></p>
                </div>
            );
        }

        // Case 2: Searching within a folder and nothing matches.
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

        // Case 3: A specific folder/filter (Pinned, Locked, Recycle Bin) is just empty.
        const folderMessages = {
            "Pinned Notes": "Pin a note to see it here — look for the pin icon on any note.",
            "Locked Notes": "Lock a note to see it here — look for the lock icon on any note.",
            "Recycle Bin": "Deleted notes show up here before they're gone for good.",
        };

        return (
            <div className="w-full flex flex-col items-center justify-center h-[60vh] text-gray-600 animate-fadeIn px-4">
                <LuInbox className="text-6xl mb-3 text-gray-400" />
                <p className="font-semibold text-lg text-gray-800">Nothing in {activeFolder} yet</p>
                <p className="text-sm text-gray-400 mt-1 text-center max-w-[260px]">
                    {folderMessages[activeFolder] || "Try creating or restoring some notes."}
                </p>
            </div>
        );
    }

    return (

        <div key={activeFolder}
            className="w-full grid grid-cols-3 max-md:grid-cols-3 max-lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-2.5 p-2  max-[500px]:p-2 max-[500px]:gap-3 overflow-y-auto rounded-md animate-fadeIn scrollbar-hide">
                
            {filteredNotes.map(note => (
                <NoteCard
                    key={note.id}
                    note={note}
                    isRecycleBin={activeFolder === "Recycle Bin"}
                />
            ))}

        </div>

    );
}

// Small inline illustration — no external image asset needed, matches brand color
function NoteIllustration() {
    return (
        <svg width="120" height="100" viewBox="0 0 120 100" fill="none">
            <rect x="22" y="10" width="60" height="76" rx="6" fill="#EDE9FE" />
            <rect x="34" y="4" width="60" height="76" rx="6" fill="#7d5dd3" fillOpacity="0.15" />
            <rect x="34" y="4" width="60" height="76" rx="6" stroke="#7d5dd3" strokeOpacity="0.3" />
            <line x1="44" y1="22" x2="84" y2="22" stroke="#7d5dd3" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.5" />
            <line x1="44" y1="34" x2="84" y2="34" stroke="#7d5dd3" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.35" />
            <line x1="44" y1="46" x2="70" y2="46" stroke="#7d5dd3" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.35" />
            <circle cx="96" cy="66" r="14" fill="#7d5dd3" />
            <path d="M90 66l4 4 8-8" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export default NoteList;