
import { useState } from "react";
import { SiPinboard } from "react-icons/si";
import { MdDeleteForever, MdRestore, MdEdit } from "react-icons/md";
import { UseTodo } from "../../Context/TodosContext";
import ConfirmModal from "../Common/Confirm";
import { FormatDateShort, FormatDate } from "../Common/FormateDate";
import { BsCalendar2Check } from "react-icons/bs";

function TodosCard({ todo, isRecycleBin }) {
    const { openForm, softDelTodo, permanentDelTodo, restoreTodo, toggleComplete } = UseTodo();

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showRestoreConfirm, setShowRestoreConfirm] = useState(false);

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        setShowDeleteConfirm(true);
    };

    const handleConfirmDelete = () => {
        setShowDeleteConfirm(false);
        if (isRecycleBin) {
            permanentDelTodo(todo.id);
        } else {
            softDelTodo(todo.id);
        }
    };

    const handleRestoreClick = (e) => {
        e.stopPropagation();
        setShowRestoreConfirm(true);
    };

    const handleConfirmRestore = () => {
        setShowRestoreConfirm(false);
        restoreTodo(todo.id);
    };

    return (
        <>
            <div
                onClick={() => {
                    if (!isRecycleBin && !todo.isCompleted && window.innerWidth <= 550) {
                        openForm(todo);
                    }
                }}
                className={`
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
                    sm:h-[80px] lg:h-[80px] max-[640px]:h-[60px]
                    sm:min-w-[100px] md:min-w-[110px] lg:min-w-[140px] xl:min-w-[170px]
                    animate-fadeIn
                    ${todo.isCompleted ? 'bg-gray-300' : 'bg-white'}
            ${!isRecycleBin && !todo?.isCompleted ? " hover:bg-red-100" : "opacity-80 cursor-not-allowed"}
                `}
            >

                {/* Title...... */}

                <div className="flex items-center gap-5 w-[96%]">
                    {!isRecycleBin &&
                        <input
                            onChange={() => toggleComplete(todo.id)}
                            onClick={e => e.stopPropagation()}
                            checked={todo.isCompleted}
                            type="checkbox"
                            className="cursor-pointer"
                        />
                    }

                    <div className="flex items-center gap-3 w-[80%]">
                        {todo?.isPinned ? <div className="bg-orange-600 w-0.5 h-0.5 rounded-full shadow-[0px_0px_5px_2.5px_rgba(255,0,0,1)]"></div>
                            : <div className="bg-blue-600 w-0.5 h-0.5 rounded-full shadow-[0px_0px_5px_2.5px_rgba(0,0,255,1)]"></div>
                        }
                        <h2 className={`font-semibold  line-clamp-1 text-md max-[550px]:text-xs ${todo.isCompleted ? 'line-through text-gray-600' : ''}`}>
                            {todo.text}
                        </h2>

                    </div>

                    {todo.isPinned && (
                        <SiPinboard
                            className="absolute top-2 right-3 max-[550px]:right-2.5 text-md text-[#ea105c] transform scale-x-[-1] group-hover:opacity-100"
                        />
                    )}

                </div>


                {/* Footer Actions */}

                <div className="flex items-center justify-between absolute bottom-3 left-3 right-3 max-[550px]:bottom-1.5 max-[550px]:left-2 max-[550px]:right-1.5">

                    {isRecycleBin &&
                        <div className="relative group">
                            <MdRestore
                                onClick={handleRestoreClick}
                                className="cursor-pointer text-lg sm:text-xl text-gray-600 hover:text-blue-600 hover:scale-115 transition-transform duration-200"
                            />
                            <span
                                className="absolute bottom-full left-1/1 -translate-x-1/2 mb-1.5 px-1 py-1 text-xs font-semibold text-white bg-[#ea105c] rounded-md shadow-[0px_0px_8px_2px_rgba(234,16,92,0.5)] opacity-0 scale-90 translate-y-1 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-300 ease-out pointer-events-none whitespace-nowrap"
                            >
                                Restore
                            </span>
                        </div>
                    }

                    {!isRecycleBin && (
                        todo.isCompleted ?
                            <div>
                                < span className="flex items-center gap-2 text-xs max-[550px]:text-[9px] font-semibold text-gray-700">
                                    <BsCalendar2Check className="max-[550px]:text-[10px] font-bold" />
                                    {FormatDate(todo?.completedAt)}</span>
                            </div>
                            : < span className="text-xs max-[550px]:text-[9px] font-semibold text-gray-700">{FormatDateShort(todo?.createdAt)}</span>
                    )}

                    <div className="flex items-center gap-6  absolute right-0 bottom-0">
                        {!isRecycleBin &&

                            <div className="relative group">
                                {!todo.isCompleted &&
                                    <div>
                                        <MdEdit
                                            onClick={() => openForm(todo)}
                                            className="max-[550px]:hidden cursor-pointer text-md text-gray-600 hover:text-green-600 hover:scale-120 transition-transform duration-200"
                                        />
                                        <span
                                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-1 py-1 text-xs font-semibold text-white bg-[#ea105c] rounded-md shadow-[0px_0px_8px_2px_rgba(234,16,92,0.5)] opacity-0 scale-90 translate-y-1 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-300 ease-out pointer-events-none whitespace-nowrap"
                                        >
                                            Edit
                                        </span>
                                    </div>
                                }
                            </div>
                        }

                        <div className="relative group">
                            <MdDeleteForever
                                onClick={handleDeleteClick}
                                className="cursor-pointer text-lg text-gray-600 hover:text-red-600 hover:scale-115 transition-transform duration-200 ml-auto"
                            />
                            <span
                                className="absolute bottom-full left-1/12 -translate-x-1/2 mb-1.5 px-1 py-1 text-xs font-semibold text-white bg-[#ea105c] rounded-md shadow-[0px_0px_8px_2px_rgba(234,16,92,0.5)] opacity-0 scale-90 translate-y-1 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-300 ease-out pointer-events-none whitespace-nowrap"
                            >
                                Delete
                            </span>
                        </div>

                    </div>
                </div>
            </div >

            {/* Delete Confirmation */}
            < ConfirmModal
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
                onCancel={() => setShowDeleteConfirm(false)
                }
                onConfirm={handleConfirmDelete}
            />

            {/* Restore Confirmation */}
            {
                isRecycleBin && (
                    <ConfirmModal
                        confirmText={"Restore"}
                        classes={"bg-blue-500 hover:bg-blue-600"}
                        isOpen={showRestoreConfirm}
                        title={"Restore Note?"}
                        message={"Are you sure you want to restore this note from the recycle bin?"}
                        onCancel={() => setShowRestoreConfirm(false)}
                        onConfirm={handleConfirmRestore}
                    />
                )
            }
        </>
    );
}

export default TodosCard;
