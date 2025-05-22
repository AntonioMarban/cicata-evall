import React from "react";
import Drop from "../assets/BsUpload.svg";

const DragDrop = ({ setFilesSend, filesSend, tagType = "Etico" }) => {

    const processFile = async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve({
          lastModified: file.lastModified,
          name: file.name,
          size: file.size,
          type: file.type,
          tag: tagType,
          content: e.target.result, // Contenido en base64
          url: URL.createObjectURL(file) // URL para previsualización
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    const newFiles = await Promise.all(
      Array.from(event.dataTransfer.files).map(processFile)
    );
    setFilesSend(prev => [...prev, ...newFiles]);
  };

  const handleFileChange = async (event) => {
    const newFiles = await Promise.all(
      Array.from(event.target.files).map(processFile)
    );
    setFilesSend(prev => [...prev, ...newFiles]);
  };
  const handleDragOver = (event) => {
    event.preventDefault();
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
            accept="application/pdf"
            multiple
            onChange={handleFileChange}
          />
          <div className="flex flex-col items-center">
            <div className="mb-2">
              <img src={Drop} alt="imagen-drop" />
            </div>
            <p className="text-sm text-gray-700">
              Arrastre aquí un archivo para cargarlo, o haga clic aquí para adjuntarlo.
            </p>
          </div>
        </label>
      </div>
    </div>
  );
};

export default DragDrop;