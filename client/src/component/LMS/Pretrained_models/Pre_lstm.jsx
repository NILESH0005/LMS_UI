import React, { useState, useEffect } from "react";
import FeedbackForm from "../FeedBackForm";

const Pre_lstm = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [feedback, setFeedback] = useState([]);

    // Files array will be provided by you
    const Pre_lstmFiles = [
        {
    
            title: "README",
            id: "1rrEAkJKTTlvw5QhmkCODhjZjYb_iW2o5",
            type: "pdf",
            description: "Complete guide to LSTM implementation"
        },  
{
    
    title: "Research Paper",
    id: "1vTzUkVtWJmDKiSdFocLrDvUKmZ71RSxp",
    type: "pdf",
    description: ""
},
{
    id: "dataset-link",
    title: "Model ",
    type: "link",
    description: "",
    externalUrl: "http://nlp.stanford.edu/data/glove.6B.zip",

},
{
    title: "Workbook",
    id: "WUMm8uBZVYbAr-mF5cvoZp87PaznifVf",
    type: "notebook",
    description: "Jupyter notebook with data preprocessing steps",
    downloadUrl: "https://drive.google.com/uc?export=download&id=WUMm8uBZVYbAr-mF5cvoZp87PaznifVf"
},
{
  
    title: "Assessment",
    type: "assessment"
    
}
    ];

    useEffect(() => {
        if (Pre_lstmFiles.length > 0 && !selectedFile) {
            setSelectedFile(Pre_lstmFiles[0]); // Default to first file
        }

        // Security measures
        const disableRightClick = (e) => e.preventDefault();
        const disableDevTools = (e) => {
            if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) {
                e.preventDefault();
            }
        };

        document.addEventListener('contextmenu', disableRightClick);
        document.addEventListener('keydown', disableDevTools);

        return () => {
            document.removeEventListener('contextmenu', disableRightClick);
            document.removeEventListener('keydown', disableDevTools);
        };
    }, []);

    const handleDownload = (file) => {
        if (!file.downloadUrl) {
            console.error("No download URL available for this file");
            return;
        }

        const link = document.createElement('a');
        link.href = file.downloadUrl;
        link.setAttribute('download', `${file.title}.${file.type === 'notebook' ? 'ipynb' : file.type}`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        console.log(`Downloaded: ${file.title}`);
    };

    const handleExternalLink = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    

    const FileDisplay = ({ file }) => {
        // Previewable file types (pdf, images, videos)
        if (file.type === 'link') {
            return (
                <div className="flex flex-col items-center justify-center h-full border rounded-xl shadow-lg bg-white p-8">
                <div className="text-center max-w-md">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 bg-yellow-100">
                    <svg className="w-10 h-10 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a1 1 0 000 2h1v10H4a1 1 0 100 2h12a1 1 0 100-2h-1V5h1a1 1 0 100-2H4zm3 2v10h6V5H7z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">GloVe 6B Embeddings</h3>
                  <p className="text-gray-500 mb-4">
                    GloVe (Global Vectors) is an unsupervised learning algorithm for obtaining vector representations for words, trained on 6 billion tokens from Wikipedia and Gigaword.
                  </p>
                  <div className="mb-6">
                    <img 
                      src="https://nlp.stanford.edu/images/glove-icon.png" 
                      alt="GloVe Logo" 
                      className="h-10 mx-auto mb-4"
                      onError={(e) => { e.target.style.display = 'none'; }} // hide image if it fails to load
                    />
                    <p className="text-sm text-gray-600 text-center">
                      Hosted by Stanford NLP, the GloVe 6B dataset includes word embeddings with 50, 100, 200, and 300 dimensions, ideal for NLP tasks like semantic similarity and word analogy.
                    </p>
                  </div>
              
                  <button
                    onClick={() => handleExternalLink("http://nlp.stanford.edu/data/glove.6B.zip")}
                    className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                  >
                    Download GloVe 6B
                  </button>
                </div>
              </div>
              
            );
        }
        if (['pdf', 'jpg', 'jpeg', 'png', 'gif', 'mp4', 'webm'].includes(file.type)) {
            return (
                <div className="w-full h-full border rounded-xl shadow-lg overflow-hidden bg-white">
                    <iframe
                        src={`https://drive.google.com/file/d/${file.id}/preview`}
                        className="w-full min-h-[70vh]"
                        allowFullScreen
                        title={`${file.title} Preview`}
                        sandbox="allow-same-origin allow-scripts"
                    />
                  
                </div>
            );
        }

        // Non-previewable files (download only)
        if (['txt','notebook'].includes(file.type)){
        return (
            <div className="flex flex-col items-center justify-center h-full border rounded-xl shadow-lg bg-white p-8">
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 bg-indigo-100">
                        <svg className="w-10 h-10 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13 4.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM7 10a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM9.5 15.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM19 10a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{file.title}</h3>
                    <p className="text-gray-500 mb-4">{file.description}</p>
                
                    <button
                        onClick={() => handleDownload(file)}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Download {file.type === 'notebook' ? 'Jupyter Notebook (.ipynb)' : `${file.type.toUpperCase()} File`}
                    </button>
                </div>
            </div>
        );}
    };

    return (
        <div className="flex h-screen bg-gray-50 text-gray-800">
            {/* Navigation Sidebar */}
            <div className="w-64 bg-gray-800 text-white p-4 border-r border-gray-700 overflow-y-auto">
                <h2 className="text-xl font-bold mb-6 px-2">LSTM Resources</h2>
                <nav className="space-y-2">
                    {Pre_lstmFiles.map(file => (
                        <button
                            key={file.id}
                            onClick={() => setSelectedFile(file)}
                            className={`w-full text-left p-3 rounded-lg transition-colors ${
                                selectedFile?.id === file.id 
                                    ? "bg-gray-700 border-l-4 border-blue-500" 
                                    : "hover:bg-gray-700"
                            }`}
                        >
                            <div className="flex items-center">
                                 {file.type === 'pdf' && (
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"/>
                                    </svg>
                                )}
                                {file.type === 'notebook' && (
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M13 4.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM7 10a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM9.5 15.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM19 10a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                                    </svg>
                                )}
                                {file.type === 'link' && (
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
                                </svg>
                                )}
                                {file.type === 'assessment' && (
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                                    </svg>
                                )}
                                <span className="font-medium">{file.title}</span>
                            </div>
                            <p className="text-xs text-gray-300 mt-1 truncate">{file.description}</p>
                        </button>
                    ))}
                </nav>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="p-6 pb-0">
                    <h1 className="text-2xl font-bold text-gray-800">
                        {selectedFile?.title }
                    </h1>
                    <p className="text-gray-600 mt-1">
                        {selectedFile?.description }
                    </p>
                </div>
                
                <div className="flex-1 overflow-auto p-6">
                    {selectedFile ? (
                        <div className="h-full">
                            <FileDisplay file={selectedFile} />
                            
                            
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-500">
                            Please select a resource from the sidebar
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Pre_lstm; 
