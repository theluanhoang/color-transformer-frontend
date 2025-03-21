import axios from "axios";
import { useState } from "react";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "https://color-transformer-api.onrender.com"
// const API_URL = "http://localhost:8000"
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

function ColorTransformer({ isDarkMode = false }) {
  const [sourceImage, setSourceImage] = useState(null);
  const [targetImage, setTargetImage] = useState(null);
  const [outputImage, setOutputImage] = useState(null);
  const [overlayImage, setOverlayImage] = useState(null);
  const [openAccordion, setOpenAccordion] = useState(null);

  const handleUpload = async () => {
    if (!sourceImage || !targetImage) {
      toast.warn("Vui lòng chọn cả hai ảnh!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: isDarkMode ? "dark" : "light",
        transition: Bounce,
      });
      return;
    }

    // Kiểm tra kích thước file
    if (sourceImage.size > MAX_FILE_SIZE || targetImage.size > MAX_FILE_SIZE) {
      toast.error("Kích thước ảnh vượt quá 5MB!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: isDarkMode ? "dark" : "light",
        transition: Bounce,
      });
      return;
    }

    const formData = new FormData();
    formData.append("source_file", sourceImage);
    formData.append("target_file", targetImage);

    try {
      const response = await axios.post(`${API_URL}/upload/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob",
        timeout: 60000, // Timeout 60 giây
      });

      const imageUrl = URL.createObjectURL(response.data);
      setOutputImage(imageUrl);

      toast.success("Chuyển đổi thành công!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: isDarkMode ? "dark" : "light",
        transition: Bounce,
      });
    } catch (error) {
      let errorMessage = "Lỗi không xác định";
      if (error.response) {
        errorMessage = `Server trả về lỗi: ${error.response.status}`;
      } else if (error.request) {
        errorMessage = "Không thể kết nối đến server. Kiểm tra mạng hoặc URL.";
      } else {
        errorMessage = error.message;
      }

      toast.error(`Lỗi khi upload ảnh: ${errorMessage}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: isDarkMode ? "dark" : "light",
        transition: Bounce,
      });
      console.error("Lỗi khi upload: ", error);
    }
  };

  const openOverlay = (image) => {
    setOverlayImage(image);
  };

  const closeOverlay = () => {
    setOverlayImage(null);
  };

  const handleDownload = () => {
    if (!outputImage) return;

    const link = document.createElement("a");
    link.href = outputImage;
    link.download = "transformed-image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Đã tải ảnh về thành công!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: isDarkMode ? "dark" : "light",
      transition: Bounce,
    });
  };

  const toggleAccordion = (section) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  // Phần JSX giữ nguyên như code của bạn
  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "dark bg-gray-900" : "bg-gray-100"
      } flex items-center justify-center p-2 sm:p-4`}
    >
      <div
        className={`${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } p-3 sm:p-6 rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto`}
      >
        <div className="mb-3 sm:mb-6">
          <h2
            className={`text-lg sm:text-2xl font-bold ${
              isDarkMode ? "text-gray-100" : "text-gray-800"
            } text-center`}
          >
            Chuyển đổi màu sắc giữa hai ảnh
          </h2>
        </div>
        {/* Input Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 mb-3 sm:mb-6">
          <div className="flex flex-col items-center">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSourceImage(e.target.files[0])}
              className={`block w-full text-xs sm:text-sm ${
                isDarkMode ? "text-gray-300" : "text-gray-500"
              } file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4 file:rounded-full file:border-0 file:text-xs sm:file:text-sm file:font-semibold ${
                isDarkMode
                  ? "file:bg-gray-700 file:text-blue-300 hover:file:bg-gray-600"
                  : "file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              }`}
            />
            <h4
              className={`mt-1 sm:mt-2 text-sm sm:text-lg font-medium ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Ảnh gốc
            </h4>
          </div>
          <div className="flex flex-col items-center">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setTargetImage(e.target.files[0])}
              className={`block w-full text-xs sm:text-sm ${
                isDarkMode ? "text-gray-300" : "text-gray-500"
              } file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4 file:rounded-full file:border-0 file:text-xs sm:file:text-sm file:font-semibold ${
                isDarkMode
                  ? "file:bg-gray-700 file:text-blue-300 hover:file:bg-gray-600"
                  : "file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              }`}
            />
            <h4
              className={`mt-1 sm:mt-2 text-sm sm:text-lg font-medium ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Ảnh tham chiếu
            </h4>
          </div>
        </div>
        {/* Button Section */}
        <div className="text-center mb-3 sm:mb-6">
          <button
            onClick={handleUpload}
            className={`${
              isDarkMode
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white font-semibold py-1 sm:py-2 px-3 sm:px-6 rounded-full transition duration-300 cursor-pointer text-xs sm:text-base`}
          >
            Upload & Chuyển đổi
          </button>
        </div>
        {/* Image Preview Section */}
        {(sourceImage || targetImage || outputImage) && (
          <div className="space-y-2 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0">
            {/* Accordion trên mobile/tablet, grid trên desktop (lg) */}
            <div className="lg:flex lg:flex-col lg:items-center">
              {sourceImage && (
                <div className="w-full">
                  <button
                    onClick={() => toggleAccordion("source")}
                    className={`w-full text-left py-2 px-3 rounded-lg ${
                      isDarkMode
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    } flex justify-between items-center text-xs sm:text-sm lg:hidden`}
                  >
                    Ảnh gốc
                    <span>{openAccordion === "source" ? "▲" : "▼"}</span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 lg:block ${
                      openAccordion === "source" ? "max-h-40" : "max-h-0"
                    } lg:max-h-none`}
                  >
                    <div className="flex flex-col items-center p-2 sm:p-0">
                      <h3
                        className={`text-xs sm:text-md font-semibold ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        } mb-1 sm:mb-2 lg:block hidden`}
                      >
                        Ảnh gốc
                      </h3>
                      <img
                        src={URL.createObjectURL(sourceImage)}
                        alt="Source Preview"
                        className="rounded-lg shadow-md max-h-24 sm:max-h-48 lg:max-h-64 w-auto object-contain cursor-pointer"
                        onClick={() => openOverlay(URL.createObjectURL(sourceImage))}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="lg:flex lg:flex-col lg:items-center">
              {targetImage && (
                <div className="w-full">
                  <button
                    onClick={() => toggleAccordion("target")}
                    className={`w-full text-left py-2 px-3 rounded-lg ${
                      isDarkMode
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    } flex justify-between items-center text-xs sm:text-sm lg:hidden`}
                  >
                    Ảnh tham chiếu
                    <span>{openAccordion === "target" ? "▲" : "▼"}</span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 lg:block ${
                      openAccordion === "target" ? "max-h-40" : "max-h-0"
                    } lg:max-h-none`}
                  >
                    <div className="flex flex-col items-center p-2 sm:p-0">
                      <h3
                        className={`text-xs sm:text-md font-semibold ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        } mb-1 sm:mb-2 lg:block hidden`}
                      >
                        Ảnh tham chiếu
                      </h3>
                      <img
                        src={URL.createObjectURL(targetImage)}
                        alt="Target Preview"
                        className="rounded-lg shadow-md max-h-24 sm:max-h-48 lg:max-h-64 w-auto object-contain cursor-pointer"
                        onClick={() => openOverlay(URL.createObjectURL(targetImage))}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="lg:flex lg:flex-col lg:items-center">
              {outputImage && (
                <div className="w-full">
                  <button
                    onClick={() => toggleAccordion("output")}
                    className={`w-full text-left py-2 px-3 rounded-lg ${
                      isDarkMode
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    } flex justify-between items-center text-xs sm:text-sm lg:hidden`}
                  >
                    Ảnh kết quả
                    <span>{openAccordion === "output" ? "▲" : "▼"}</span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 lg:block ${
                      openAccordion === "output" ? "max-h-40" : "max-h-0"
                    } lg:max-h-none`}
                  >
                    <div className="flex flex-col items-center p-2 sm:p-0">
                      <h3
                        className={`text-xs sm:text-md font-semibold ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        } mb-1 sm:mb-2 lg:block hidden`}
                      >
                        Ảnh kết quả
                      </h3>
                      <img
                        src={outputImage}
                        alt="Output"
                        className="rounded-lg shadow-md max-h-24 sm:max-h-48 lg:max-h-64 w-auto object-contain cursor-pointer"
                        onClick={() => openOverlay(outputImage)}
                      />
                      <button
                        onClick={handleDownload}
                        className={`mt-1 sm:mt-2 ${
                          isDarkMode
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-green-600 hover:bg-green-700"
                        } text-white font-semibold py-0.5 sm:py-1 px-2 sm:px-4 rounded-full transition duration-300 cursor-pointer text-xs sm:text-sm`}
                      >
                        Tải về
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Overlay Modal */}
      {overlayImage && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onClick={closeOverlay}
        >
          <div className="relative p-2 sm:p-0">
            <img
              src={overlayImage}
              alt="Overlay"
              className="max-h-[85vh] sm:max-h-[90vh] max-w-[85vw] sm:max-w-[90vw] rounded-lg"
            />
            <button
              className={`absolute top-2 sm:top-4 right-2 sm:right-4 ${
                isDarkMode
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-[#dc3545] hover:bg-[#c82333]"
              } text-white rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center transition cursor-pointer text-xs sm:text-base`}
              onClick={closeOverlay}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ColorTransformer;