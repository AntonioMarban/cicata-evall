import React, { useRef, useState, useEffect } from "react";
import Drop from "../assets/BsUpload.svg";

const DragDrop = ({ setFilesSend, filesSend }) => {
  const [uploadedFileName, setUploadedFileName] = useState([]);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);

    // Agregar archivos nuevos sin perder los anteriores
    setUploadedFileName((prev) => [...prev, ...files.map((file) => file.name)]);
    setFilesSend((prev) => [...prev, ...files]);

  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      setUploadedFileName((prev) => [...prev, ...files.map((file) => file.name)]);
      setFilesSend((prev) => [...prev, ...files]);
    }
  };
  const handleDeleteFile = (index) => {
    const newFileNames = [...uploadedFileName];
    const newFiles = Array.from(filesSend);
  
    newFileNames.splice(index, 1);
    newFiles.splice(index, 1);
  
    setUploadedFileName(newFileNames);
    setFilesSend(newFiles);
  };

  useEffect(() => {
    if (filesSend.length === 0) {
      setUploadedFileName([]);
    }
  }, [filesSend]);

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
              accept="image/*"
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
      {uploadedFileName.length > 0 && (
        <div className="!p-0 w-full  h-1/3 overflow-y-auto flex flex-col justify-center items-center rounded-[30px]">
          <ul className="!p-2 text-sm text-gray-800  w-[80%]">
              {uploadedFileName.map((name, index) => (
                <li key={index} className="flex justify-between">
                  <p>{name}</p>
                  <button className="cursor-pointer" type="button" onClick={()=>{handleDeleteFile(index)}}>Eliminar</button>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DragDrop;
