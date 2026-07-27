import { TiLockClosed, TiLockOpen } from "react-icons/ti";
import { SiPinboard } from "react-icons/si";
import { RiUnpinLine } from "react-icons/ri";
import { HiOutlineDownload } from "react-icons/hi";
import { MdDeleteForever } from "react-icons/md";
import ConfirmModal from "../Common/Confirm";
import { useState } from "react";
import { UseNote } from "../../Context/NotesContext";
import { jsPDF } from "jspdf";
import { FormatDate } from "../../hooks/FormateDate";

function NoteDetails({ note, softDelete }) {

  // toggleLock pulled from context, same as togglePin — previously this
  // was expected as a prop that NoteForm never actually passed, which
  // crashed the app the moment "Lock" was clicked from this menu.
  const { togglePin, toggleLock } = UseNote();
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
    togglePin(note.id);
  };

  const handleLockToggle = (e) => {
    e.stopPropagation();
    toggleLock(note.id);
  };

  const handleDownloadPdf = (note) => {
    const doc = new jsPDF();
    const content = `Title: ${note.title}\n\n${note.content}\n\nCreated At: ${note.createdAt}\nLast Updated: ${note.lastUpdateAt}`;
    doc.text(content, 10, 10);
    doc.save(`${note.title || "Untitled Note"}.pdf`);
  };

  return (
    <>
      <div className="animate-fadeSideIn shadow-[0px_4px_12px_rgba(0,0,0,0.3)] flex flex-col max-[550px]:gap-3 bg-white dark:bg-[#25252f] absolute top-5.5 right-0 max-[550px]:top-7 max-[550px]:p-3 w-40 p-1.5 rounded-lg z-20 border border-gray-200 dark:border-white/10">

        {/* Pin / Unpin */}
        <p onClick={handlePinToggle}
          className="text-sm text-gray-900 dark:text-gray-100 font-semibold flex items-center gap-2 cursor-pointer hover:bg-[#f3e9ff] dark:hover:bg-white/10 hover:text-[#6949c1] dark:hover:text-[#a78bfa] rounded-md h-10 px-2 transition-all duration-200"
        >
          {note?.isPinned ? (
            <>
              <RiUnpinLine className="text-[#6949c1] dark:text-[#a78bfa]" /> Unpin
            </>
          ) : (
            <>
              <SiPinboard className="text-[#6949c1] dark:text-[#a78bfa] transform scale-x-[-1]" /> Pin
            </>
          )}
        </p>

        {/* Lock / Unlock */}

        <p onClick={handleLockToggle}
          className="text-sm text-gray-900 dark:text-gray-100 font-semibold flex items-center gap-2 cursor-pointer hover:bg-[#f3e9ff] dark:hover:bg-white/10 rounded-md h-10 px-2 transition-all duration-200">
          {note?.isLocked ? <><TiLockOpen className="text-[#6949c1] dark:text-[#a78bfa]" /> Unlock</> : <><TiLockClosed className="text-[#6949c1] dark:text-[#a78bfa]" /> Lock</>}
        </p>

        {/* Download Button */}
        <p className="text-sm text-gray-900 dark:text-gray-100 font-semibold flex items-center gap-2 cursor-pointer hover:bg-[#f3e9ff] dark:hover:bg-white/10 hover:text-[#6949c1] dark:hover:text-[#a78bfa] rounded-md h-10 px-2 transition-all duration-200"
          onClick={() => handleDownloadPdf(note)}
        >
          <HiOutlineDownload className="text-[#6949c1] dark:text-[#a78bfa]" /> Download
        </p>

        {/* Created / Updated */}
        <p className="text-sm text-gray-800 dark:text-gray-200 font-semibold flex flex-col hover:bg-[#f3e9ff] dark:hover:bg-white/10 hover:text-[#6949c1] dark:hover:text-[#a78bfa] rounded-md h-10 px-2 transition-all duration-200">
          Created at:
          <span className="font-normal text-[11px] text-gray-500 dark:text-gray-400">
            {FormatDate(note?.createdAt)}
          </span>
        </p>

        <p className="text-sm text-gray-800 dark:text-gray-200 font-semibold flex flex-col hover:bg-[#f3e9ff] dark:hover:bg-white/10 hover:text-[#6949c1] dark:hover:text-[#a78bfa] rounded-md h-10 px-2 transition-all duration-200">
          Last updated:
          <span className="font-normal text-[11px] text-gray-500 dark:text-gray-400">
            {FormatDate(note?.lastUpdateAt)}
          </span>
        </p>

        {/* Footer Actions */}
        <div className="flex border-t border-gray-200 dark:border-white/10 mt-3 items-center justify-end pt-2">
          <MdDeleteForever
            onClick={handleDeleteClick}
            className="cursor-pointer text-3xl p-1.5 hover:scale-115 text-gray-700 dark:text-gray-300 hover:text-red-600 transition-all duration-200"
          />
        </div>

      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showConfirm}
        confirmText={"Delete"}
        classes={"bg-red-500 hover:bg-red-600"}
        title={"Move Note to Recycle Bin?"}
        message={"Are you sure you want to move this note to the recycle bin?"}
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}

export default NoteDetails;