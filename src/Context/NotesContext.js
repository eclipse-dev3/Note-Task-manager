import { createContext, useContext } from "react";

export const NoteContext = createContext({
    notes: [
        {
            id: 1,
            title: 'First Note.',
            content: 'This is the content for first note.',
            createdAt: new Date().toISOString(),
            lastUpdateAt: new Date().toISOString(),
            isPinned: false,
            isDeleted: false,
        },
    ],
    addNote: (note) => { },
    UpdateNote: (id, updatedNote) => { },
    softDelNote: (id) => { },
    permanentDelNote: (id) => { },
    openForm: (note) => { },
    closeForm: () => { },
    restoreNote: (id) => { },
    togglePin: (id) => { },
    toggleLock: (id) => { }, 
});



export const UseNote = () => {
    return useContext(NoteContext);
}


