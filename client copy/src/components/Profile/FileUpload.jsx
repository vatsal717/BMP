const FileUpload = ({
  label,
  accept,
  onChange,
  file,
  clearFile,
  cURL,
  document_name,
  viewFile,
}) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-black">{label}</label>

    <div className="flex items-center justify-center gap-4">
      {/* Upload Button */}
      <button
        type="button"
        className={`upload-btn p-2 bg-slate-700 text-white rounded-lg ${
          file ? "hover:bg-slate-600" : "hover:bg-slate-800"
        }`}
        onClick={() => document.getElementById(label).click()}
      >
        {file ? document_name : cURL ? document_name : "Choose a file"}
      </button>

      {cURL && (
        <button
          type="button"
          className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300"
          onClick={clearFile}
        >
          <div className="text-lg text-black font-bold rounded-lg">X</div>
        </button>
      )}

      {cURL && (
        <button
          type="button"
          onClick={() => viewFile(cURL)}
          className="px-4 py-2 bg-[#0076FF] text-white font-semibold rounded-md shadow-md hover:shadow-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 transition-all duration-300"
        >
          View
        </button>
      )}
    </div>

    <input
      type="file"
      id={label}
      accept={accept}
      onChange={onChange}
      style={{ display: "none" }}
    />
  </div>
);

export default FileUpload;
