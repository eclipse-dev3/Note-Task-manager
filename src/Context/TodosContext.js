import { createContext, useContext } from "react";

export const TodoContext = createContext({
    todos: [
        {
            id: 1,
            text: 'First Todo.',
            isCompleted: false,
            isPinned: false,
            isDeleted: false,
            createdAt: new Date().toISOString(),
            lastUpdateAt: new Date().toISOString(),
            completedAt: new Date().toISOString(),
        },
    ],

    addTodo: (todo) => { },
    UpdateTodo: (id, updatedTodo) => { },
    softDelTodo: (id) => { },
    permanentDelTodo: (id) => { },
    openForm: (note) => { },
    closeForm: () => { },
    restoreTodo: (id) => { },
    togglePin: (id) => { },
    toggleComplete: (id) => { },
    toggleLock: (id) => { },
});

export const UseTodo = () => {
    return useContext(TodoContext);
}


