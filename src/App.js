import React from "react";
import PDFUploaderViewer from "./components/PDFUploaderViewer";

const App = () => {
  return (
    <div className="bg-[#758283] min-h-screen">
      <div className="w-11/12 mx-auto pt-5 ">
      <h1 className="sm:text-3xl text-lg text-center text-white ">PDF Uploader and Viewer App</h1>
      <PDFUploaderViewer />
      </div>
    </div>
  );
};

export default App;
