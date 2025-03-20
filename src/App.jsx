import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import ColorTransformer from "./components/ColorTransformer";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      <button
        onClick={toggleDarkMode}
        className={`fixed top-2 sm:top-4 right-2 sm:right-4 z-50 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-semibold py-1 px-2 sm:py-1 sm:px-3 md:py-2 md:px-4 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300 cursor-pointer text-xs sm:text-sm md:text-base`}
      >
        {isDarkMode ? "☀️ Light" : "🌙 Dark"}
      </button>
      <ColorTransformer isDarkMode={isDarkMode} />
    </>
  );
}

export default App;