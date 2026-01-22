import { LuNotebook } from "react-icons/lu";
import { TiLockClosed } from "react-icons/ti";
import { SiPinboard } from "react-icons/si";
import { HiOutlineTrash } from "react-icons/hi2";
import { useState } from "react";
import { FaLinkedin, FaSquareXTwitter } from "react-icons/fa6";
import { FaGithubSquare, FaInstagramSquare } from "react-icons/fa";
import Profile from '../../../src/assets/Profile.png'

function NoteSideBar({ isOpen, onSelectFolder, notes }) {
    const [activeFolder, setActiveFolder] = useState("All Notes");

    const allNotesCount = notes.filter(note => !note.isDeleted).length;
    const pinnedNotesCount = notes.filter(note => note.isPinned && !note.isDeleted).length;
    const lockedNotesCount = notes.filter(note => note.isLocked && !note.isDeleted).length;
    const recycleBinCount = notes.filter(note => note.isDeleted).length;

    const keys = [
        { id: 1, label: 'All Notes', icon: <LuNotebook />, count: allNotesCount },
        { id: 2, label: 'Pinned Notes', icon: <SiPinboard className="transform scale-x-[-1]" />, count: pinnedNotesCount },
        // { id: 3, label: 'Locked Notes', icon: <TiLockClosed className="text-xl" />, count: lockedNotesCount },
        { id: 4, label: 'Recycle Bin', icon: <HiOutlineTrash className="text-xl" />, count: recycleBinCount },
    ];

    const displayFolder = (label, icon) => (e) => {
        e.stopPropagation();
        setActiveFolder(label);
        onSelectFolder(label, icon);
    };

    return (
        <div
            className={`absolute lg:static top-0 left-0 h-[95vh] max-[500px]:h-[94vh] w-[65%] sm:w-[50%] md:w-[40%] lg:w-[20%]
            bg-[#7d5dd3] text-white rounded-tl-md rounded-bl-md py-4 px-3 overflow-hidden shadow-lg
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
            <div className="flex flex-col justify-between h-[90%] mt-15">
                <ul>
                    {
                        keys.map(({ label, icon, count }) => {
                            const isActive = label === activeFolder;
                            return (
                                <li
                                    key={label}
                                    onClick={displayFolder(label, icon)}
                                    className={`mb-2 p-3 flex items-center justify-between rounded cursor-pointer
                            transition-colors duration-300 ${isActive ? "bg-[#5e40b1]" : "hover:bg-[#5e40b1]"}`}
                                >
                                    <span className="flex items-center gap-2">{icon} {label}</span>
                                    <span className="text-xs font-semibold">{count}</span>
                                </li>
                            );
                        })
                    }
                </ul >

                {/* Footer links */}
                < ul className=" max-[550px]:bottom-5 w-full border-t border-white/30" >
                    <li className="p-3 flex items-center justify-evenly gap-2">
                        <span className="text-sm font-bold flex flex-col">Contact</span>
                        <div className="relative group">
                            <a href="https://gauravkumar03.vercel.app" target="_blank">
                                <img src={Profile} alt="Profile" width={45} className="hover:scale-110 duration-200 p-0.5 bg-blue-900 rounded-full" />
                            </a>
                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-semibold text-white bg-[#5e40b1] rounded-md shadow-[0px_0px_8px_2px_rgba(93,64,177,0.8)] opacity-0 group-hover:opacity-100 transition-all duration-300">
                                Portfolio
                            </span>
                        </div>
                    </li>

                    <li className="flex gap-4 max-[550px]:gap-6 pb-3 pt-2 justify-center">
                        <a href="https://www.linkedin.com/in/gaurav-kumar-5b678437a/" target="_blank"><FaLinkedin className="hover:text-[#0077b5]  rounded max-[550px]:text-xl hover:scale-130 duration-150" /></a>
                        <a href="https://github.com/eclipse-dev3" target="_blank"><FaGithubSquare className="hover:text-[#222]  rounded max-[550px]:text-xl hover:scale-130 duration-150" /></a>
                        <a href="https://www.instagram.com/eclipsedev03" target="_blank"><FaInstagramSquare className="hover:text-[#e1306c]  rounded max-[550px]:text-xl hover:scale-130 duration-150" /></a>
                        <a href="https://x.com/eclipse_devX" target="_blank"><FaSquareXTwitter className="hover:text-[#222] rounded max-[550px]:text-xl hover:scale-130 duration-150" /></a>
                    </li>
                </ul >

            </div>

        </div >
    );
}

export default NoteSideBar;
