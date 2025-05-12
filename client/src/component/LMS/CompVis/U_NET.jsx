import React, { useState, useEffect } from "react";
import FeedbackForm from "../FeedBackForm";

const U_NET = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [feedback, setFeedback] = useState([]);

    // Files array will be provided by you
    const U_NETFiles = [
        {
            id: "1ihgjdms_V472wQ5GwENyPh3Y0CUyJPAQ",
            title: "Research Paper",
            type: "pdf",
            description: "Describes the U-Net architecture designed for biomedical image segmentation. It features a contracting path to capture context and a symmetric expanding path for precise localization. The guide emphasizes U-Net's efficiency with limited training data and its successful performance in cell segmentation challenges.",
            size: "2.3MB",
            lastUpdated: "2024-03-10"
        },
        {
            id: "15aYU1C5tmBeCrLElBtKPHwLicyckvGGh",
            title: "Workbook",
            type: "notebook",
            description: "This notebook implements the U-Net architecture for semantic segmentation tasks, commonly used in biomedical image processing. It provides code for model building, training on labeled image datasets, and evaluating segmentation results. ",
            size: "3.1MB",
            lastUpdated: "2024-03-15",
            downloadUrl: "https://drive.google.com/uc?export=download&id=15aYU1C5tmBeCrLElBtKPHwLicyckvGGh"
        },
        {
  
            title: "Assessment",
            type: "assessment"
            
        }
    ];

    useEffect(() => {
        if (U_NETFiles.length > 0 && !selectedFile) {
            setSelectedFile(U_NETFiles[0]); // Default to first file
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
        localStorage.setItem("U_NETFeedback", JSON.stringify(updatedFeedback));
        setFeedback(updatedFeedback);
        
        console.log("Feedback submitted:", newFeedback);
    };

    const FileDisplay = ({ file }) => {
        // Previewable file types (pdf, images, videos)
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
                <h2 className="text-xl font-bold mb-6 px-2">U-Net Resources</h2>
                <nav className="space-y-2">
                    {U_NETFiles.map(file => (
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

export default U_NET;