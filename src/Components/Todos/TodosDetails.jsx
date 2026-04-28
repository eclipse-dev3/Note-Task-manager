import { TiLockClosed, TiLockOpen } from "react-icons/ti";
import { SiPinboard } from "react-icons/si";
import { RiUnpinLine } from "react-icons/ri";
import { HiOutlineDownload } from "react-icons/hi";
import { MdDeleteForever } from "react-icons/md";
import ConfirmModal from "../Common/Confirm";
import { useState } from "react";
import { UseTodo } from "../../Context/TodosContext";
import { jsPDF } from "jspdf";
import { FormatDate } from "../Common/FormateDate";

function TodoDetails({ todo, softDelete }) {

    const { togglePin } = UseTodo();
    const [showConfirm, setShowConfirm] = useState(false);

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        setShowConfirm(true);
    };

    const handleConfirmDelete = () => {
        setShowConfirm(false);
        softDelete(note.id);
    };

    const handlePinToggle = (e) => {
        e.stopPropagation();
        togglePin(todo.id);
    };

    const handleDownloadPdf = (todo) => {
        const doc = new jsPDF();
        const content = `Title: ${todo.text}\n\nCreated At: ${todo.createdAt}\nLast Updated: ${todo.lastUpdateAt}`;
        doc.text(content, 10, 10);
        doc.save(`${todo.todo}.pdf`);
    };

    return (
        <>
            <div className="animate-fadeSideIn shadow-[0px_4px_12px_rgba(0,0,0,0.3)] flex flex-col max-[550px]:gap-3 bg-white absolute top-5.5 right-0 max-[550px]:top-7 max-[550px]:p-3 w-40 p-1.5 rounded-lg z-20 border border-gray-200">

                {/* Pin / Unpin */}
                <p onClick={handlePinToggle}
                    className="text-sm text-gray-900 font-semibold flex items-center gap-2 cursor-pointer hover:bg-[#f3e9ff] hover:text-[#ea105c] rounded-md h-10 px-2 transition-all duration-200">
                    {todo?.isPinned ? (
                        <>
                            <RiUnpinLine className="text-[#ea105c] text-lg" /> Unpin
                        </>
                    ) : (
                        <>
                            <SiPinboard className="text-[#ea105c] text-lg transform scale-x-[-1]" /> Pin
                        </>
                    )}
                </p>

                {/* Download Buttons */}
                <p className="text-sm text-gray-900 font-semibold flex items-center gap-2 cursor-pointer hover:bg-[#f3e9ff] hover:text-[#ea105c] rounded-md h-10 px-2 transition-all duration-200"
                    onClick={() => handleDownloadPdf(todo)}>
                    <HiOutlineDownload className="text-[#ea105c] text-lg" /> Download
                </p>

                {/* Created / Updated */}
                <p className="text-sm text-gray-800 font-semibold flex flex-col hover:bg-[#f3e9ff] hover:text-[#ea105c] rounded-md h-10 px-2 transition-all duration-200">
                    Created at: <span className="font-normal text-[11px] text-gray-500">{FormatDate(todo?.createdAt)}</span>
                </p>

                <p className="text-sm text-gray-800 font-semibold flex flex-col hover:bg-[#f3e9ff] hover:text-[#ea105c] rounded-md h-10 px-2 transition-all duration-200">
                    Last updated at: <span className="font-normal text-[11px] text-gray-500">{FormatDate(todo?.lastUpdateAt)}</span>
                </p>

                {/* Footer Actions */}
                <div className="flex border-t border-gray-200 mt-3 items-center justify-end pt-2">
                    {/* <TiLockClosed className="cursor-pointer text-3xl p-1 hover:scale-110 text-gray-700 hover:text-[#ea105c] transition-all duration-200" /> */}
                    <MdDeleteForever onClick={handleDeleteClick} className="cursor-pointer text-3xl p-1.5 hover:scale-115 text-gray-700 hover:text-red-600 transition-all duration-200"
                    />
                </div>

            </div>

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={showConfirm}
                confirmText={"Delete"}
                classes={'bg-red-500 hover:bg-red-600'}
                title={"Move Note to Recycle Bin?"}
                message={"Are you sure you want to move this note to the recycle bin?"}
                onCancel={() => setShowConfirm(false)}
                onConfirm={handleConfirmDelete}
            />

        </>
    );
}

export default TodoDetails;
