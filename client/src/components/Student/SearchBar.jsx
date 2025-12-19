import React, { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

function SearchBar({ data }) {
  const navigate = useNavigate();
  const [input, setInput] = useState(data ? data : '');
  const [isFocused, setIsFocused] = useState(false);

  const onSearchHandler = (e) => {
    e.preventDefault();
    if (input.trim()) {
      navigate(`/course-list?search=${encodeURIComponent(input.trim())}`);
    } else {
      navigate('/course-list');
    }
  };

  return (
    <form
      onSubmit={onSearchHandler}
      className={`max-w-2xl w-full flex items-center bg-white/70 backdrop-blur-xl border-2 rounded-2xl shadow-2xl shadow-blue-200/30 overflow-hidden transition-all duration-300 ${isFocused
          ? 'border-blue-400 shadow-blue-300/50 ring-4 ring-blue-100/50 scale-[1.02]'
          : 'border-white/80 hover:border-blue-300 hover:shadow-blue-200/40'
        }`}
    >
      {/* Search Icon with animation */}
      <div className="pl-5 flex items-center justify-center">
        <Search className={`w-5 h-5 transition-all duration-300 ${isFocused ? 'text-blue-600 scale-110' : 'text-gray-400'
          }`} />
      </div>

      {/* Input Field */}
      <input
        onChange={e => setInput(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={input}
        type="text"
        placeholder="Search for courses..."
        className="flex-1 h-14 md:h-16 px-4 text-gray-700 placeholder-gray-400 outline-none border-none bg-transparent font-medium"
      />

      {/* Search Button with enhanced gradient */}
      <button
        type="submit"
        className="h-14 md:h-16 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-bold px-8 md:px-10 transition-all duration-300 flex items-center justify-center shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-600/40 hover:scale-105 active:scale-95"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
