import axios from "axios";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import ColorTransformer from "./components/ColorTransformer";

function App() {
  // Khởi tạo state từ localStorage, mặc định là false (light mode)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("themeMode") === "dark";
  });

  // Hàm toggle dark/light mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("themeMode", newMode ? "dark" : "light");
  };

  const handleTest = async () => {
    const res = await axios.post("https://color-transformer-api.onrender.com/",
      "Luan"
    , {
      headers: { "Content-Type": "application/json" }, // Đảm bảo gửi JSON
    });
    alert(res.data.message)
  }

  // Đảm bảo Tailwind CSS nhận diện dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <>
      <div className="fixed top-2 sm:top-4 right-2 sm:right-4 z-50">
        <button
          onClick={toggleDarkMode}
          className={`relative w-16 h-8 sm:w-20 sm:h-10 rounded-full p-1 transition-colors duration-300 focus:outline-none ${
            isDarkMode ? "bg-black" : "bg-orange-500"
          }`}
        >
          <div
            className={`absolute top-1 left-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white transition-transform duration-300 transform ${
              isDarkMode ? "translate-x-8 sm:translate-x-10" : "translate-x-0"
            }`}
          />
          <span
            className={`absolute top-1/2 transform -translate-y-1/2 ${
              isDarkMode ? "left-2" : "right-2"
            } text-white text-lg sm:text-xl`}
          >
            {isDarkMode ? "🌙" : "☀️"}
          </span>
        </button>
        <button
          onClick={handleTest}
          className={`relative w-16 h-8 sm:w-20 sm:h-10 rounded-full p-1 transition-colors duration-300 focus:outline-none ${
            isDarkMode ? "bg-black" : "bg-orange-500"
          }`}
        >
          {"GET MESSAGE"}
        </button>
      </div>
      <ColorTransformer isDarkMode={isDarkMode} />
    </>
  );
}

export default App;