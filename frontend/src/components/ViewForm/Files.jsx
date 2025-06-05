const Files = ({ files }) => {
  const mostrarPdf = (base64) => {
    const blob = new Blob([Uint8Array.from(atob(base64), c => c.charCodeAt(0))], {
      type: "application/pdf",
    });
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl);
  };

  const handleViewFile = (fileBase64) => {
    mostrarPdf(fileBase64);
  };
  return (
    <div className="flex flex-col !p-2 rounded">
      {Array.isArray(files.documents) && files.documents.length > 0 ? (
        files.documents.map((file, index) => (
          <div className="flex justify-between !mb-5" key={index}>
              <p className="flex items-center">📄 {file.name} - {file.tag === 'eticos' ? 'Aspectos éticos' : 'Anexo de proyecto'}</p>
              <button
              className="!p-2 rounded-lg border-none bg-[#5CB7E6] text-white font-normal cursor-pointer shadow-md hover:bg-[#4CA6D5] transition-colors duration-300"
              key={index}
              onClick={() => handleViewFile(file.document)}
              >
                Visualizar archivo
              </button>
          </div>
        ))
      ) : (
        <span className="text-gray-500">No hay archivos</span>
      )}
    </div>
  );
};

export default Files;
