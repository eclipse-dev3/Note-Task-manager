import { IoChevronBack } from "react-icons/io5";
import { GiCheckMark } from "react-icons/gi";
import { RiCloseFill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useEffect, useState } from "react";
import { UseNote } from "../../Context/NotesContext";
import NoteDetails from "./NoteDetails";

function NoteForm({ selectedNote, closeForm }) {
    const { notes, UpdateNote, addNote, softDelNote, toggleLock } = UseNote();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    useEffect(() => {
        if (selectedNote) {
            setTitle(selectedNote.title || "");
            setContent(selectedNote.content || "");
        } else {
            setTitle("");
            setContent("");
        }
    }, [selectedNote]);

    const currentNote = selectedNote
        ? notes.find((n) => n.id === selectedNote.id)
        : {
            id: "temp",
            title,
            content,
            isPinned: false,
            isDeleted: false,
            createdAt: new Date().toISOString(),
            lastUpdateAt: new Date().toISOString(),
        };

    const handleSave = () => {
        if (!title.trim() && !content.trim()) return;

        if (selectedNote) {
            UpdateNote(selectedNote.id, { title, content });
        } else {
            addNote({
                id: Date.now(),
                title,
                content,
                createdAt: new Date().toISOString(),
                lastUpdateAt: new Date().toISOString(),
                isPinned: false,
                isDeleted: false,
            });
        }

        closeForm();
        setTitle("");
        setContent("");
    };

    const handleDetailsToggle = (e) => {
        e.stopPropagation();
        setIsDetailsOpen(!isDetailsOpen);
    };

    const handleSoftDelete = (id) => {
        softDelNote(id);
        closeForm();
    };

    return (
        <div className="absolute inset-0 top-0 left-0 w-full h-full bg-black/30 backdrop-blur-xs flex items-center justify-center z-50 animate-fadeIn">

            {/* Close Button */}
            <RiCloseFill
                onClick={closeForm}
                className="max-[550px]:hidden absolute top-3 right-3 hover:scale-110 duration-200 cursor-pointer text-3xl text-gray-700 hover:text-red-500 transition-all"
            />

            <div className="relative bg-white backdrop-blur-xl border border-gray-200 w-[85%] max-w-2xl h-[80%] max-[550px]:w-[100%] max-[550px]:h-[100%] max-[550px]:rounded-none rounded-2xl shadow-xl overflow-hidden flex flex-col transition-all duration-300">
                {/* Top Bar */}
                <div className="flex items-center justify-between p-2 border-b border-gray-200">
                    <IoChevronBack
                        onClick={closeForm}
                        className="cursor-pointer hover:scale-110 duration-200 text-2xl text-gray-700 hover:text-gray-500 transition-all"
                    />
                    <GiCheckMark
                        onClick={handleSave}
                        className="cursor-pointer hover:scale-110 duration-200 text-2xl text-[#6949c1] hover:text-purple-700 transition-all"
                    />
                </div>

                {/* Title + Menu */}
                <div className="flex items-center justify-between px-4 py-2">
                    <input
                        type="text"
                        placeholder="Title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-transparent px-3 py-1.5 rounded-md border-b-2 border-gray-300 outline-none focus:border-[#6949c1] text-lg font-semibold placeholder-gray-400 transition-all duration-300"
                        autoFocus
                        spellCheck="false"
                    />
                    <div className="relative ml-2">
                        <BsThreeDotsVertical
                            onClick={handleDetailsToggle}
                            className={`cursor-pointer text-xl hover:scale-110 duration-200 hover:text-[#6949c1] ${isDetailsOpen ? "text-[#6949c1]" : "text-gray-600"} transition-all`}
                        />
                        {isDetailsOpen && (
                            <NoteDetails
                                key={currentNote.id}
                                note={currentNote}
                                softDelete={handleSoftDelete}
                                toggleLock={toggleLock}
                            />
                        )}
                    </div>
                </div>

                {/* Content Area */}
                <textarea
                    placeholder="Take a note..."
                    value={content}
                    spellCheck="false"
                    onChange={(e) => setContent(e.target.value)}
                    className="flex-1 m-4 mt-2 p-4 rounded-xl bg-white/50 border border-gray-200 outline-none shadow-inner resize-none focus:ring-2 focus:ring-[#6949c1]/40 transition-all duration-300"
                ></textarea>
            </div>
        </div>
    );
}

export default NoteForm;
