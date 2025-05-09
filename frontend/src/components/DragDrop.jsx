import React, { useRef, useState, useEffect } from "react";
import Drop from "../assets/BsUpload.svg";

const DragDrop = ({ setFilesSend, filesSend }) => {
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);

    setFilesSend((prev) => [...prev, ...files]);

  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      setFilesSend((prev) => [...prev, ...files]);
    }
  };


  return (
    <div className="w-[90%]">
        <div
          className="!p-2 w-full h-2/3 border-2 border-dotted border-[#2C2C2C] flex flex-col justify-center items-center text-center rounded-[30px]"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <label className="cursor-pointer w-full h-full flex items-center justify-center">
            <input
              className="hidden"
              type="file"
              multiple
              onChange={handleFileChange}
            />
            <div className="flex flex-col items-center">
              <div className="mb-2">
                <img src={Drop} alt="imagen-drop" />
              </div>
              <p className="text-sm text-gray-700">
                Arrastre aquí un archivo para cargarlo, o haga clic aquí para
                adjuntarlo.
              </p>
            </div>
          </label>
        </div>
    </div>
  );
};

export default DragDrop;
