import React, { useState, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function Scroll() {
  const [isBottom, setIsBottom] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const bottom = document.body.offsetHeight - 100;
    setIsBottom(scrollPosition >= bottom);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    if (isBottom) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors flex items-center space-x-1"
      aria-label={isBottom ? "Scroll to top" : "Scroll to bottom"}
    >
      <span>{isBottom ? "Top" : "Scroll"}</span>
      {isBottom ? (
        <KeyboardArrowUpIcon className="text-2xl" />
      ) : (
        <KeyboardArrowDownIcon className="text-2xl" />
      )}
    </button>
  );
}

export default Scroll;