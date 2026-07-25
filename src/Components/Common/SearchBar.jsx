import { useState, useEffect, forwardRef } from "react";
import { IoSearchSharp, IoClose } from "react-icons/io5";

const SearchBar = forwardRef(function SearchBar({ placeholder, searchInput, setSearchInput, className }, ref) {
    const [isFocused, setIsFocused] = useState(false);
    const [showClear, setShowClear] = useState(false);

    useEffect(() => {
        setShowClear(searchInput.trim().length > 0);
    }, [searchInput]);

    const handleClear = () => setSearchInput("");

    return (
        <div
            className={`relative w-[60%] mx-auto transition-all duration-500 ease-in-out max-lg:mb-1 max-sm:w-[75%]
        ${isFocused ? "scale-[1.03]" : "scale-100"}
      `}
        >
            {/* Search Icon */}
            <IoSearchSharp
                className={`z-10
          absolute left-3 top-1/2 -translate-y-1/2 text-lg transition-all duration-300
          ${isFocused ? `${className}` : "text-gray-500"}
        `}
            />

            {/* Input Field */}
            <input
                ref={ref}
                className={`
           w-full pl-10 pr-10 py-2 rounded-3xl text-sm font-semibold
           backdrop-blur-md 
           placeholder:text-gray-700
           outline-none border-b-[2px] bg-gray-100
           focus:bg-white focus:shadow-[0_3px_5px_rgba(105,73,193,0.6)]
           transition-all duration-250 ease-in-out ${className}
        `}
                placeholder={placeholder}
                type="text"
                value={searchInput}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(e) => setSearchInput(e.target.value)}
            />

            {/* Clear Button */}
            {showClear && (
                <button
                    onClick={handleClear}
                    className={`
            absolute right-3 top-1/2 -translate-y-1/2
            text-gray-500 ${className}
            transition-all duration-300
            p-1 rounded-full hover:bg-[#6949c1]/10
          `}
                >
                    <IoClose className="text-lg cursor-pointer" />
                </button>
            )}

            {/* Glow line on focus */}
            <div
                className={`
          absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-[0%] 
          bg-gradient-to-r from-[#6949c1] via-blue-400 to-blue-600
          rounded-full transition-all duration-500 ease-in-out
          ${isFocused ? "w-[94%] max-[500px]:w-[87%]" : "w-0"}
        `}
            ></div>
        </div>
    );
});

export default SearchBar;