import { LuNotebook } from "react-icons/lu";
import { TiLockClosed } from "react-icons/ti";
import { SiPinboard } from "react-icons/si";
import { HiOutlineTrash } from "react-icons/hi2";
import { useState } from "react";
import { FaLinkedin, FaSquareXTwitter, FaCircleCheck } from "react-icons/fa6";
import { FaGithubSquare, FaInstagramSquare } from "react-icons/fa";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import Profile from '../../../src/assets/Profile.png'

function TodosSideBar({ isOpen, onSelectFolder, todos }) {
    const [activeFolder, setActiveFolder] = useState("All Tasks");

    const allTodosCount = todos.filter(todo => !todo.isDeleted).length;
    const pinnedTodosCount = todos.filter(todo => todo.isPinned && !todo.isDeleted).length;
    const pendingTodosCount = todos.filter(todo => !todo.isCompleted && !todo.isDeleted).length;
    const completedTodosCount = todos.filter(todo => todo.isCompleted && !todo.isDeleted).length;
    const lockedTodosCount = todos.filter(todo => todo.isLocked && !todo.isDeleted).length;
    const recycleBinCount = todos.filter(todo => todo.isDeleted).length;

    const keys = [
        { id: 1, label: 'All Tasks', icon: <LuNotebook />, count: allTodosCount },
        { id: 2, label: 'Pinned Tasks', icon: <SiPinboard className="transform scale-x-[-1]" />, count: pinnedTodosCount },
        { id: 3, label: 'Pending Tasks', icon: <MdCheckBoxOutlineBlank />, count: pendingTodosCount },
        { id: 4, label: 'Completed Tasks', icon: <FaCircleCheck />, count: completedTodosCount },
        { id: 5, label: 'Locked Tasks', icon: <TiLockClosed className="text-xl" />, count: lockedTodosCount },
        { id: 6, label: 'Recycle Bin', icon: <HiOutlineTrash className="text-xl" />, count: recycleBinCount },
    ];

    const displayFolder = (label, icon) => (e) => {
        e.stopPropagation();
        setActiveFolder(label);
        onSelectFolder(label, icon);
    };

    return (
        <div
            className={`absolute lg:static top-0 left-0 h-[95vh] max-[500px]:h-[94vh] w-[65%] sm:w-[50%] md:w-[40%] lg:w-[20%]
            bg-[#ea105c] text-white rounded-tl-md rounded-bl-md py-4 px-3 overflow-hidden shadow-lg
            transform transition-transform duration-500 ease-in-out z-10
             max-lg:rounded-tl-none max-lg:rounded-bl-none max-lg:rounded-tr-md max-lg:rounded-br-md
            ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}

        >

            {/* Glowing dots */}
            <div className="flex gap-4.5 absolute right-5" >
                <div className="bg-red-600 w-0.5 h-0.5 rounded-full shadow-[0px_0px_6px_4px_rgba(255,0,0,1)]"></div>
                <div className="bg-green-400 w-0.5 h-0.5 rounded-full shadow-[0px_0px_6px_4px_rgba(0,255,0,1)]"></div>
                <div className="bg-blue-800 w-0.5 h-0.5 rounded-full shadow-[0px_0px_6px_4px_rgba(0,0,255,1)]"></div>
            </div >

            {/* Sidebar menu */}
            <div className="flex flex-col justify-between h-[100%] mt-15">

                <ul>
                    {
                        keys.map(({ id, label, icon, count }) => {
                            const isActive = label === activeFolder;
                            return (
                                <li
                                    key={id}
                                    onClick={displayFolder(label, icon)}
                                    className={`mb-2 p-3 flex items-center justify-between rounded cursor-pointer
                            transition-colors duration-300 ${isActive ? "bg-[#af0a3e]" : "hover:bg-[#af0a3e]"}`}
                                >
                                    <span className="flex items-center gap-2">{icon} {label}</span>
                                    <span className="text-xs font-semibold">{count}</span>
                                </li>
                            );
                        })
                    }
                </ul >

                {/* Footer links */}
                < ul className="absolute bottom-2 left-0 max-[550px]:bottom-5 w-full border-t border-white/30" >
                    <li className="flex gap-6 max-[550px]:gap-6 pb-3 pt-3 justify-center">
                        <a href="https://www.linkedin.com/in/gaurav-kumar-5b678437a/" target="_blank"><FaLinkedin className="hover:text-[#0077b5]  rounded max-[550px]:text-xl hover:scale-130 duration-150" /></a>
                        <a href="https://github.com/eclipse-dev3" target="_blank"><FaGithubSquare className="hover:text-[#222]  rounded max-[550px]:text-xl hover:scale-130 duration-150" /></a>
                        <a href="https://www.instagram.com/eclipsedev03" target="_blank"><FaInstagramSquare className="hover:text-[#e1306c] hover:bg-white rounded max-[550px]:text-xl hover:scale-130 duration-150" /></a>
                        <a href="https://x.com/eclipse_devX" target="_blank"><FaSquareXTwitter className="hover:text-[#222] rounded max-[550px]:text-xl hover:scale-130 duration-150" /></a>
                    </li>
                </ul >
            </div >
        </div >
    );
}

export default TodosSideBar;
