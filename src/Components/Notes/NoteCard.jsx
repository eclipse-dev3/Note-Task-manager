import { useState } from "react";
import { SiPinboard } from "react-icons/si";
import { MdDeleteForever, MdRestore, MdEdit } from "react-icons/md";
import { TiLockClosed, TiLockOpen } from "react-icons/ti";
import { UseNote } from "../../Context/NotesContext";
import ConfirmModal from "../Common/Confirm";
import PinModal from "../Common/PinModal";
import { FormatDateShort } from "../Common/FormateDate";

function NoteCard({ note, isRecycleBin }) {
    const { openForm, softDelNote, permanentDelNote, restoreNote, toggleLock } = UseNote();

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showRestoreConfirm, setShowRestoreConfirm] = useState(false);

    // Lock feature state
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [showPinPrompt, setShowPinPrompt] = useState(false);

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        setShowDeleteConfirm(true);
    };

    const handleConfirmDelete = () => {
        setShowDeleteConfirm(false);
        if (isRecycleBin) {
            permanentDelNote(note.id);
        } else {
            softDelNote(note.id);
        }
    };

    const handleRestoreClick = (e) => {
        e.stopPropagation();
        setShowRestoreConfirm(true);
    };

    const handleConfirmRestore = () => {
        setShowRestoreConfirm(false);
        restoreNote(note.id);
    };

    const handleLockToggle = (e) => {
        e.stopPropagation();

        if (!note.isLocked) {
            // Abhi locked nahi hai -> lock kar do, PIN ki zaroorat nahi
            toggleLock(note.id);
            setIsUnlocked(false);
        } else if (isUnlocked) {
            // Locked hai but abhi revealed/visible hai -> wapas hide kar do (PIN nahi chahiye, khud lock kar rahe ho)
            setIsUnlocked(false);
        } else {
            // Locked hai aur hidden hai -> dekhne ke liye PIN chahiye
            setShowPinPrompt(true);
        }
    };

    const handleCardClick = () => {
        if (note.isLocked && !isUnlocked) {
            setShowPinPrompt(true);
            return;
        }
        if (!isRecycleBin && window.innerWidth <= 550) {
            openForm(note);
        }
    };

    const handlePinSuccess = () => {
        setIsUnlocked(true);
        setShowPinPrompt(false);
    };

    return (
        <>
            <div
                onClick={handleCardClick}
                className={`
        bg-white 
        rounded-md 
        shadow-[-1px_2px_4px_rgba(0,0,0,0.3)]
        p-2
        relative 
        overflow-hidden 
        flex flex-col 
        items-center
        transition-all duration-300 ease-in-out
        cursor-pointer
        hover:-translate-y-0.5
        h-[140px]
        xs:h-[140px] sm:h-[150px] md:h-[170px] 2xl:h-[200px]
        sm:min-w-[100px] md:min-w-[110px] lg:min-w-[140px] xl:min-w-[170px]
        animate-fadeIn
        ${!isRecycleBin
                        ? "hover:bg-blue-50"
                        : "opacity-80 cursor-not-allowed"
                    }
    `}
            >

                {/* Locked overlay — blurs content until PIN is entered */}
                {note.isLocked && !isUnlocked && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-1.5 bg-white/70 backdrop-blur-sm">
                        <TiLockClosed className="text-2xl text-gray-500" />
                        <span className="text-xs font-semibold text-gray-500">Locked</span>
                    </div>
                )}

                {/* Title...... */}

                <div className={`flex justify-between items-center gap-2 w-[96%] ${note.isLocked && !isUnlocked ? "blur-sm select-none" : ""}`}>

                    <div className="flex items-center gap-3 w-[75%]">
                        {note?.isPinned ? <div className="bg-blue-600 w-0.5 h-0.5 rounded-full shadow-[0px_0px_5px_2.5px_rgba(0,0,255,1)]"></div>
                            : <div className="bg-orange-600 w-0.5 h-0.5 rounded-full shadow-[0px_0px_5px_2.5px_rgba(255,0,0,1)]"></div>
                        }

                        <h2 className="font-semibold text-gray-800 line-clamp-1 text-md max-[550px]:text-sm overflow-hidden">
                            {note.title ? note.title : "No Title"}
                        </h2>
                    </div>

                    {note.isPinned && (
                        <SiPinboard
                            className="text-lg sm:text-xl text-[#7d5dd3] transform scale-x-[-1] opacity-90 group-hover:opacity-100"
                        />
                    )}

                </div>

                {/* Content....... */}
                <div className={`w-full h-full overflow-hidden ${note.isLocked && !isUnlocked ? "blur-sm select-none" : ""}`}>
                    <p className="px-2 max-[550px]:px-1 py-0.5 text-gray-700 text-sm max-sm:text-xs truncate overflow-hidden text-ellipsis whitespace-normal line-clamp-4 max-sm:line-clamp-5">
                        {note.content || "No description..."}
                    </p>
                </div>

                {/* Footer Actions */}

                <div className={`flex items-center justify-between absolute bottom-3 left-3 right-3 max-[550px]:bottom-1.5 max-[550px]:left-2 max-[550px]:right-1.5 ${note.isLocked && !isUnlocked ? "pointer-events-none blur-sm" : ""}`}>

                    {isRecycleBin &&
                        <div className="relative group">
                            <MdRestore
                                onClick={handleRestoreClick}
                                className="cursor-pointer text-lg sm:text-xl text-gray-600 hover:text-blue-600 hover:scale-115 transition-transform duration-200"
                            />
                            <span
                                className="absolute bottom-full left-1/1 -translate-x-1/2 mb-1.5 px-1 py-1 text-xs font-semibold text-white bg-[#7d5dd3] rounded-md shadow-[0px_0px_8px_2px_rgba(93,64,177,0.6)] opacity-0 scale-90 translate-y-1 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-300 ease-out pointer-events-none whitespace-nowrap"
                            >
                                Restore
                            </span>
                        </div>
                    }

                    {!isRecycleBin && (
                        <span className="text-xs max-[550px]:text-[9px] font-semibold text-gray-700">{FormatDateShort(note?.createdAt)}</span>
                    )}

                    <div className="flex items-center gap-6  absolute right-0 bottom-0">

                        {!isRecycleBin && (
                            <div className="relative group max-[550px]:hidden">
                                {note.isLocked && !isUnlocked ? (
                                    <TiLockClosed
                                        onClick={handleLockToggle}
                                        className="cursor-pointer text-md text-gray-600 hover:text-[#7d5dd3] hover:scale-120 transition-transform duration-200"
                                    />
                                ) : (
                                    <TiLockOpen
                                        onClick={handleLockToggle}
                                        className="cursor-pointer text-md text-gray-600 hover:text-[#7d5dd3] hover:scale-120 transition-transform duration-200"
                                    />
                                )}
                                <span
                                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-1 py-1 text-xs font-semibold text-white bg-[#7d5dd3] rounded-md shadow-[0px_0px_8px_2px_rgba(93,64,177,0.6)] opacity-0 scale-90 translate-y-1 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-300 ease-out pointer-events-none whitespace-nowrap"
                                >
                                    {note.isLocked && !isUnlocked ? "Unlock" : "Lock"}
                                </span>
                            </div>
                        )}

                        {!isRecycleBin &&

                            <div className="relative group max-[550px]:hidden">
                                <MdEdit
                                    onClick={() => openForm(note)}
                                    className="cursor-pointer text-md text-gray-600 hover:text-green-600 hover:scale-120 transition-transform duration-200"
                                />
                                <span
                                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-1 py-1 text-xs font-semibold text-white bg-[#7d5dd3] rounded-md shadow-[0px_0px_8px_2px_rgba(93,64,177,0.6)] opacity-0 scale-90 translate-y-1 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-300 ease-out pointer-events-none whitespace-nowrap"
                                >
                                    Edit
                                </span>
                            </div>
                        }

                        <div className="relative group">
                            <MdDeleteForever
                                onClick={handleDeleteClick}
                                className="cursor-pointer text-lg text-gray-600 hover:text-red-600 hover:scale-115 transition-transform duration-200 ml-auto"
                            />
                            <span
                                className="absolute bottom-full left-1/12 -translate-x-1/2 mb-1.5 px-1 py-1 text-xs font-semibold text-white bg-[#7d5dd3] rounded-md shadow-[0px_0px_8px_2px_rgba(93,64,177,0.6)] opacity-0 scale-90 translate-y-1 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-300 ease-out pointer-events-none whitespace-nowrap"
                            >
                                Delete
                            </span>
                        </div>

                    </div>
                </div>

            </div>

            {/* Delete Confirmation */}
            <ConfirmModal
                isOpen={showDeleteConfirm}
                confirmText={"Delete"}
                classes={"bg-red-500 hover:bg-red-600"}
                title={
                    isRecycleBin
                        ? "Permanently Delete Note?"
                        : "Move Note to Recycle Bin?"
                }
                message={
                    isRecycleBin
                        ? "This action cannot be undone. Are you sure you want to delete this note permanently?"
                        : "Are you sure you want to move this note to the recycle bin?"
                }
                onCancel={() => setShowDeleteConfirm(false)}
                onConfirm={handleConfirmDelete}
            />

            {/* Restore Confirmation */}
            {isRecycleBin && (
                <ConfirmModal
                    confirmText={"Restore"}
                    classes={"bg-blue-500 hover:bg-blue-600"}
                    isOpen={showRestoreConfirm}
                    title={"Restore Note?"}
                    message={"Are you sure you want to restore this note from the recycle bin?"}
                    onCancel={() => setShowRestoreConfirm(false)}
                    onConfirm={handleConfirmRestore}
                />
            )}

            {/* PIN prompt for locked notes */}
            {showPinPrompt && (
                <PinModal
                    onSuccess={handlePinSuccess}
                    onCancel={(e) => {
                        e?.stopPropagation?.();
                        setShowPinPrompt(false);
                    }}
                />
            )}
        </>
    );
}

export default NoteCard;
