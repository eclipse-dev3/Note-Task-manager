import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { TiLockClosed } from "react-icons/ti";
import { RiCloseFill } from "react-icons/ri";

// UX-level PIN gate — NOT real encryption/security. The PIN lives in
// localStorage under 'appPin'. Good enough to demo "locked notes"
// behavior; if this ever needs to be real security, that has to
// happen on a backend with proper hashing.

function PinModal({ onSuccess, onCancel }) {
    const existingPin = localStorage.getItem("appPin");
    const isFirstTimeSetup = !existingPin;

    // mode: 'create' (no PIN exists yet) | 'confirm' (re-type new PIN)
    // | 'unlock' (verify existing PIN) | 'reset' (forgot PIN flow)
    const [mode, setMode] = useState(isFirstTimeSetup ? "create" : "unlock");
    const [pin, setPin] = useState("");
    const [firstPin, setFirstPin] = useState("");
    const [error, setError] = useState("");

    const resetInput = () => setPin("");

    // Close on Escape, same as clicking the backdrop
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onCancel();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onCancel]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (mode === "create") {
            if (pin.length < 4) {
                setError("PIN must be at least 4 digits.");
                return;
            }
            setFirstPin(pin);
            setMode("confirm");
            resetInput();
            setError("");
            return;
        }

        if (mode === "confirm") {
            if (pin !== firstPin) {
                setError("PINs didn't match. Let's try again.");
                setMode("create");
                setFirstPin("");
                resetInput();
                return;
            }
            localStorage.setItem("appPin", pin);
            onSuccess();
            return;
        }

        if (mode === "unlock") {
            if (pin === existingPin) {
                setError("");
                onSuccess();
            } else {
                setError("Wrong PIN, try again.");
                resetInput();
            }
            return;
        }

        if (mode === "reset") {
            // No backend, so "forgot PIN" honestly can only mean:
            // clear the stored PIN and let the user set a fresh one.
            // This intentionally unlocks everything locked, since a
            // local-only PIN has no real recovery path otherwise.
            localStorage.removeItem("appPin");
            setMode("create");
            setFirstPin("");
            resetInput();
            setError("A new PIN has been set up. Your old lock is cleared.");
        }
    };

    const titles = {
        create: "Create a PIN to lock notes",
        confirm: "Re-enter your PIN to confirm",
        unlock: "Enter PIN to unlock",
        reset: "Reset your PIN?",
    };

    return createPortal(
        <div
            className="fixed inset-0 top-0 left-0 w-screen h-screen bg-black/40 backdrop-blur-xs flex items-center justify-center z-[1000] animate-fadeIn"
            onClick={onCancel}
        >
            <form
                onSubmit={handleSubmit}
                onClick={(e) => e.stopPropagation()}
                className="relative bg-white dark:bg-[#1e1e26] rounded-xl shadow-2xl w-72 p-5 flex flex-col items-center gap-3"
            >
                <RiCloseFill
                    onClick={onCancel}
                    className="absolute top-2 right-2 text-2xl text-gray-500 dark:text-gray-400 hover:text-red-500 cursor-pointer transition-all"
                />

                <TiLockClosed className="text-3xl text-[#7d5dd3] dark:text-[#a78bfa]" />
                <h3 className="text-md font-semibold text-gray-900 dark:text-gray-100 text-center">
                    {titles[mode]}
                </h3>

                {mode === "reset" ? (
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                        This clears your current PIN and unlocks everything
                        that was locked. You'll set a new PIN right after.
                    </p>
                ) : (
                    <input
                        type="password"
                        inputMode="numeric"
                        autoFocus
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        placeholder="••••"
                        className="w-full text-center tracking-[0.5em] border border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-gray-100 rounded-md px-3 py-2 outline-none focus:border-[#7d5dd3] dark:focus:border-[#a78bfa] transition-all"
                    />
                )}

                {error && <p className="text-xs text-red-500 dark:text-red-400 text-center">{error}</p>}

                <button
                    type="submit"
                    className="w-full bg-[#7d5dd3] hover:bg-[#6949c1] dark:bg-[#7d5dd3] dark:hover:bg-[#8f6fe0] text-white font-medium rounded-md px-4 py-2 transition-all cursor-pointer"
                >
                    {mode === "create" && "Continue"}
                    {mode === "confirm" && "Confirm PIN"}
                    {mode === "unlock" && "Unlock"}
                    {mode === "reset" && "Reset & set new PIN"}
                </button>

                {mode === "unlock" && (
                    <button
                        type="button"
                        onClick={() => {
                            setMode("reset");
                            setError("");
                            resetInput();
                        }}
                        className="text-xs text-gray-400 dark:text-gray-500 hover:text-[#7d5dd3] dark:hover:text-[#a78bfa] cursor-pointer transition-all"
                    >
                        Forgot PIN?
                    </button>
                )}
            </form>
        </div>,
        document.body
    );
}

export default PinModal;