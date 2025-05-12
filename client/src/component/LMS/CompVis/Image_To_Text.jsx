import React, { useState, useEffect } from "react";
import FeedbackForm from "../FeedBackForm";

const Image_To_Text = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [feedback, setFeedback] = useState([]);

    // Files array will be provided by you
    const Image_To_TextFiles = [
        {
            id: "1nrCtKrKyypIqXqzazr_E_ohWDDmEqN79",
            title: "README",
            type: "pdf",
            description: "Guide to using all module resources ",
            size: "1.2MB",
            lastUpdated: "2024-01-15"
          },
        {
            id: "1OJGOr3T5dZ-pCELPEumJpiX2rnz5kfrZ",
            title: "Workbook",
            type: "notebook",
            description: " This notebook demonstrates the use of EasyOCR, a ready-to-use Optical Character Recognition (OCR) library that supports multiple languages. It includes examples of reading text from images using pre-trained models.",
            size: "3.1MB",
            lastUpdated: "2024-03-15",
            downloadUrl: "https://drive.google.com/uc?export=download&id=1OJGOr3T5dZ-pCELPEumJpiX2rnz5kfrZ"
        },
        {
            id: "dataset-link",
            title: "Dataset Link",
            type: "link",
            description: "EasyOCR is a ready-to-use Optical Character Recognition (OCR) library built on PyTorch. It supports multiple languages and can extract text from images with high accuracy.",
            externalUrl: "https://github.com/JaidedAI/EasyOCR",
            lastUpdated: "2024-03-20"
        },
        {
  
            title: "Assessment",
            type: "assessment"
            
        }
    ];

    useEffect(() => {
        if (Image_To_TextFiles.length > 0 && !selectedFile) {
            setSelectedFile(Image_To_TextFiles[0]); // Default to first file
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
    
    const handleFeedbackSubmit = (rating, comment) => {
        const newFeedback = {
            fileId: selectedFile.id,
            fileName: selectedFile.title,
            fileType: selectedFile.type,
            rating,
            comment,
            timestamp: new Date().toISOString()
        };
        
        const updatedFeedback = [...feedback, newFeedback];
        localStorage.setItem("Image_To_TextFeedback", JSON.stringify(updatedFeedback));
        setFeedback(updatedFeedback);
        
        console.log("Feedback submitted:", newFeedback);
    };

    const FileDisplay = ({ file }) => {
        // Previewable file types (pdf, images, videos)
        if (file.type === 'link') {
            return (
                <div className="flex flex-col items-center justify-center h-full border rounded-xl shadow-lg bg-white p-8">
                    <div className="text-center max-w-md">
                        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 bg-indigo-100">
                            <svg className="w-10 h-10 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{file.title}</h3>
                        <p className="text-gray-500 mb-4">
  EasyOCR is an open-source Optical Character Recognition (OCR) library that supports over 80 languages and uses deep learning models to extract text from images.
</p>
<div className="mb-6">
  <img 
    src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png" 
    alt="OCR Icon" 
    className="h-10 mx-auto mb-4"
  />
  <p className="text-sm text-gray-600 text-center">
    Developed using PyTorch, EasyOCR offers pre-trained models and simple APIs, making it ideal for real-world text extraction tasks across multiple scripts.
  </p>
</div>


                        <button
                            onClick={() => handleExternalLink(file.externalUrl)}
                            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Open Dataset Page
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
                    <div className="p-4 border-t flex justify-end">
                    </div>
                </div>
            );
        }

        // Non-previewable files (download only)
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
        );
    };

    return (
        <div className="flex h-screen bg-gray-50 text-gray-800">
            {/* Navigation Sidebar */}
            <div className="w-64 bg-gray-800 text-white p-4 border-r border-gray-700 overflow-y-auto">
                <h2 className="text-xl font-bold mb-6 px-2">Text Extraction Resources</h2>
                <nav className="space-y-2">
                    {Image_To_TextFiles.map(file => (
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
                                {['pdf', 'jpg', 'jpeg', 'png', 'gif', 'mp4'].includes(file.type) ? (
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"/>
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M13 4.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM7 10a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM9.5 15.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM19 10a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
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
                        {selectedFile?.title || "Select a Resource"}
                    </h1>
                    <p className="text-gray-600 mt-1">
                        {selectedFile?.description || "Choose from the sidebar"}
                    </p>
                </div>
                
                <div className="flex-1 overflow-auto p-6">
                    {selectedFile ? (
                        <div className="h-full">
                            <FileDisplay file={selectedFile} />
                            
                            <div className="mt-8 max-w-3xl mx-auto">
                                <FeedbackForm 
                                    fileId={selectedFile.id}
                                    fileName={selectedFile.title}
                                    fileType={selectedFile.type}
                                    onSubmit={handleFeedbackSubmit}
                                />
                            </div>
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

export default Image_To_Text;