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
    <div className="flex flex-col">
      {Array.isArray(files.documents) && files.documents.length > 0 ? (
        files.documents.map((file, index) => (
          <button
            className="cursor-pointer"
            key={index}
            onClick={() => handleViewFile(file.document)}
          >
            {file.tag}
          </button>
        ))
      ) : (
        <span className="text-gray-500">Cargando...</span>
      )}
    </div>
  );
};

export default Files;
