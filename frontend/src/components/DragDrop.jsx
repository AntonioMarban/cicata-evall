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
          content: e.target.result, // base64
          url: URL.createObjectURL(file) // previsualización
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
    setFilesSend((prev) => [...prev, ...newFiles]);
  };

  const handleFileChange = async (event) => {
    const newFiles = await Promise.all(
      Array.from(event.target.files).map(processFile)
    );
    setFilesSend((prev) => [...prev, ...newFiles]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDeleteFile = (indexToDelete) => {
    setFilesSend((prev) => prev.filter((_, index) => index !== indexToDelete));
  };
  return (
    <div className="w-[90%]">
      {/* Zona de carga */}
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
              Arrastra aquí un archivo o haz clic para adjuntarlo.
            </p>
          </div>
        </label>
      </div>

      {/* Lista de archivos */}
      {Array.isArray(filesSend) && filesSend.length > 0 && (
        <div className="!p-0 w-full h-1/3 overflow-y-auto flex flex-col justify-center items-center rounded-[30px] mt-2">
          <ul className="!p-2 text-sm text-gray-800 w-[80%]">
            {filesSend.map((file, index) => (
              <li key={index} className="flex justify-between items-center mb-1">
                <span>{file.name || file.filename}</span>
                <button
                  className="text-red-600 cursor-pointer hover:underline"
                  type="button"
                  onClick={() => handleDeleteFile(index)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DragDrop;
