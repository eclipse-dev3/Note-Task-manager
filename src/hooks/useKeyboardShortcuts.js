import { useEffect } from "react";

/**
 * Global keyboard shortcuts for an app section (Notes or Todos).
 *
 * - "n"    -> open the "new item" form
 * - "/"    -> focus the search bar
 * - Escape -> close whatever's open (form/modal)
 *
 * Why plain "n" and not Ctrl+N: browsers reserve Ctrl+N (and Ctrl+T,
 * Ctrl+W, etc.) at the OS/browser level for security reasons — a
 * website is not allowed to override them, so calling preventDefault()
 * on them silently does nothing. This is exactly why Gmail uses "c"
 * for compose and GitHub uses "c" for a new issue instead of a
 * Ctrl-based shortcut: a plain letter key, ignored while typing, is
 * the standard way web apps work around this.
 *
 * Shortcuts are ignored while the user is already typing in an input,
 * textarea, or contentEditable element, EXCEPT Escape, which always
 * works — closing a form/modal while typing is exactly when you want it.
 */
export function useKeyboardShortcuts({ onNew, onFocusSearch, onEscape }) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            const active = document.activeElement;
            const isTyping =
                active?.tagName === "INPUT" ||
                active?.tagName === "TEXTAREA" ||
                active?.isContentEditable;

            if (e.key === "Escape") {
                onEscape?.();
                return;
            }

            if (isTyping) return;

            // Ignore if a modifier is held, so we don't hijack unrelated
            // browser/OS shortcuts that happen to use these letters
            if (e.ctrlKey || e.metaKey || e.altKey) return;

            if (e.key.toLowerCase() === "n") {
                e.preventDefault();
                onNew?.();
                return;
            }

            if (e.key === "/") {
                e.preventDefault(); // stops "/" from being typed into the page
                onFocusSearch?.();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onNew, onFocusSearch, onEscape]);
}