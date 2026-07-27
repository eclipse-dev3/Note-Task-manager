import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

function ConfirmModal({ isOpen, title, message, onCancel, onConfirm, classes, confirmText }) {

    // Close on Escape, same as clicking the backdrop
    useEffect(() => {
        if (!isOpen) return;
        const handleEsc = (e) => {
            if (e.key === "Escape") onCancel();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [isOpen, onCancel]);

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 top-0 left-0 w-screen h-screen bg-black/40 backdrop-blur-xs flex items-center justify-center z-[1000] animate-fadeIn"
                    onClick={onCancel}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white dark:bg-[#1e1e26] rounded-xl shadow-2xl w-80 text-center p-5"
                    >
                        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">{title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-5">{message}</p>

                        <div className="flex justify-center gap-4">
                            <button
                                onClick={onCancel}
                                className="px-4 py-2 rounded-md border cursor-pointer border-gray-300 dark:border-white/10 bg-gray-100 dark:bg-white/5 text-gray-800 dark:text-gray-200 font-medium hover:bg-gray-200 dark:hover:bg-white/10 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirm}
                                className={`px-4 py-2 rounded-md cursor-pointer text-white font-medium  transition ${classes}`}
                            >
                                {confirmText}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )
            }
        </AnimatePresence >,
        document.body
    );
}

export default ConfirmModal;