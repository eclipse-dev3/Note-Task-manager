import { useState } from "react";
import { TiLockClosed } from "react-icons/ti";
import { RiCloseFill } from "react-icons/ri";


function PinModal({ onSuccess, onCancel }) {
    const [pin, setPin] = useState("");
    const [error, setError] = useState("");

    const correctPin = localStorage.getItem("appPin") || "1234";

    const handleSubmit = (e) => {
        e.preventDefault();
        if (pin === correctPin) {
            setPin("");
            setError("");
            onSuccess();
        } else {
            setError("Wrong PIN, try again.");
            setPin("");
        }
    };

    return (
        <div
            className="fixed inset-0 top-0 left-0 w-full h-full bg-black/40 backdrop-blur-xs flex items-center justify-center z-[1000] animate-fadeIn"
            onClick={onCancel}
        >
            <form
                onSubmit={handleSubmit}
                onClick={(e) => e.stopPropagation()}
                className="relative bg-white rounded-xl shadow-2xl w-72 p-5 flex flex-col items-center gap-3"
            >
                <RiCloseFill
                    onClick={onCancel}
                    className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-red-500 cursor-pointer transition-all"
                />

                <TiLockClosed className="text-3xl text-[#7d5dd3]" />
                <h3 className="text-md font-semibold text-gray-900">Enter PIN to unlock</h3>

                <input
                    type="password"
                    inputMode="numeric"
                    autoFocus
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="••••"
                    className="w-full text-center tracking-[0.5em] border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-[#7d5dd3] transition-all"
                />

                {error && <p className="text-xs text-red-500">{error}</p>}

                <button
                    type="submit"
                    className="w-full bg-[#7d5dd3] hover:bg-[#6949c1] text-white font-medium rounded-md px-4 py-2 transition-all cursor-pointer"
                >
                    Unlock
                </button>
            </form>
        </div>
    );
}

export default PinModal;
