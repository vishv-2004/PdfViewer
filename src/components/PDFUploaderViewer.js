import React, { useEffect, useState } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import {MdZoomInMap,MdZoomOutMap} from "react-icons/md"

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
const PDFUploaderViewer = () => {
  const [file, setFile] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const onFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = (e) => {
      setFile(reader.result);
    };
  };
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  const toggleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullScreen(false);
    } else {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    }
  };

  return (
    <div className="pdf-uploader-viewer">
      <div className="pdf-viewer pt-20 flex flex-col gap-5">
        {file && (
          <button onClick={toggleFullScreen} className=" w-fit self-end px-7 py-2 bg-[#383CC1] text-white rounded-lg ">
            {isFullScreen ? <div className="flex gap-2 bg-[] rounded-lg items-center "> <MdZoomInMap/> {"Exit Full Screen"} </div>  : <div className="flex gap-2 bg-[] rounded-lg items-center "><MdZoomOutMap/>  {"Full Screen"} </div> }
          </button>
        )}

        {file && (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.js">
            <div className="pb-10 min-h-[300px]">
              <Viewer
                fileUrl={file}
                plugins={[defaultLayoutPluginInstance]}
                style={
                  isFullScreen
                    ? {
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 1000,
                      }
                    : null
                }
              />
            </div>
          </Worker>
        )}
      </div>
      <div className="pdf-upload">
        {!file && (
          <label>
            <input
              type="file"
              accept=".pdf"
              onChange={onFileChange}
              className="hidden"
            />
            <div className="flex justify-center sm:w-[60%] w-[90%] mx-auto my-10 h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
              <span className="flex items-center space-x-2 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span className="font-medium text-gray-600">
                  Drop files to Attach, or
                  <span className="text-blue-600 underline">browse</span>
                </span>
              </span>
            </div>
          </label>
        )}
      </div>
    </div>
  );
};

export default PDFUploaderViewer;
