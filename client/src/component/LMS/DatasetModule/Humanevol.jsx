import React, { useState, useEffect } from "react";
import FeedbackForm from "../FeedBackForm";

const Humanevol = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [feedback, setFeedback] = useState([]);
    const [videoDimensions, setVideoDimensions] = useState({ width: '100%', height: '70vh' });

    const humanEvolFiles = [
        {
            id: "1Gsv58Cnk4xJ6XgLEK5aVMpoe9b0m0ZDa",
            title: "README",
            type: "pdf",
            description: "Project documentation and instructions",
            size: "2.1MB",
            lastUpdated: "2024-03-15"
        },
        {
            id: "1q6z37kH0KUPdHM07_woU6o-kNBJiR-DG",
            title: "Workbook",
            type: "notebook",
            description: "Jupyter notebook for human evolution process using DCGAN",
            size: "4.2MB",
            lastUpdated: "2024-03-20",
            downloadUrl: "https://drive.google.com/uc?export=download&id=1q6z37kH0KUPdHM07_woU6o-kNBJiR-DG",
            nbviewerUrl: "https://nbviewer.org/github/YogeshTiwari10/LMS/blob/main/Data%20Sets/Human%20Evolution%20Vid%20Dataset/human-evolution-process-dcgan.ipynb"
        },
        {
            id: "1cNvPv98Rjr4ONB91Sbz7HDndLzvk4TFR",
            title: "Dataset",
            type: "video",
            description: "Video demonstration of human evolution process",
            size: "15.7MB",
            lastUpdated: "2024-03-18",
            downloadUrl: "https://drive.google.com/uc?export=download&id=1cNvPv98Rjr4ONB91Sbz7HDndLzvk4TFR"
        },
        {
            id: "assignment",
            title: "Assessment",
            type: "assessment",
            description: "",
            size: "1.2MB",
            lastUpdated: "2024-04-05"
        }
        
        
       
    ];

    useEffect(() => {
        if (humanEvolFiles.length > 0 && !selectedFile) {
            setSelectedFile(humanEvolFiles[0]); // Default to notebook
        }

        // Adjust video size based on window dimensions
        const handleResize = () => {
            if (window.innerWidth > 1024) {
                setVideoDimensions({ width: '90%', height: '80vh' });
            } else if (window.innerWidth > 768) {
                setVideoDimensions({ width: '95%', height: '75vh' });
            } else {
                setVideoDimensions({ width: '100%', height: '70vh' });
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial call

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
            window.removeEventListener('resize', handleResize);
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
    const FileDisplay = ({ file }) => {
        if (file.type === 'pdf') {
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

        if (file.type === 'video') {
            return (
                <div className="w-full h-full flex flex-col items-center justify-center p-4">
                    <div className="w-full max-w-6xl bg-black rounded-xl overflow-hidden shadow-2xl">
                        <div className="relative pb-[56.25%] h-0"> {/* 16:9 Aspect Ratio */}
                            <iframe
                                src={`https://drive.google.com/file/d/${file.id}/preview`}
                                className="absolute top-0 left-0 w-full h-full"
                                allowFullScreen
                                title={`${file.title} Video Player`}
                                sandbox="allow-same-origin allow-scripts"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            />
                        </div>
                        <div className="p-4 bg-gray-800 flex justify-between items-center">
                            <span className="text-white font-medium">{file.title}</span>
                            <button 
                                onClick={() => handleDownload(file)}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                            >
                                Download Video
                            </button>
                        </div>
                    </div>
                </div>
            );
        }
        if (file.type === 'notebook') {
            return (
                <div className="w-full h-full flex flex-col">
                    <div className="flex-1 border rounded-t-xl shadow-lg overflow-hidden bg-white">
                        <iframe
                            src={file.nbviewerUrl}
                            className="w-full h-full"
                            style={{ minHeight: '60vh' }}
                            title={`${file.title} Preview`}
                            sandbox="allow-same-origin allow-scripts"
                        />
                    </div>
                    <div className="p-4 border border-t-0 rounded-b-xl bg-gray-50 flex justify-center">
                        <button
                            onClick={() => handleDownload(file)}
                            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Download Jupyter Notebook (.ipynb)
                        </button>
                    </div>
                </div>
            );
        }

        // For Notebook and Assignment files
        return (
            <div className="flex flex-col items-center justify-center h-full border rounded-xl shadow-lg bg-white p-8">
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                         style={{
                             backgroundColor: file.type === 'notebook' ? '#E0E7FF' : '#FEF3C7',
                         }}>
                        {file.type === 'notebook' ? (
                            <svg className="w-10 h-10 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M13 4.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM7 10a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM9.5 15.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM19 10a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                            </svg>
                        ) : (
                            <svg className="w-10 h-10 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                            </svg>
                        )}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{file.title}</h3>
                    <p className="text-gray-500 mb-4">{file.description}</p>
                        
                    <button
                        onClick={() => handleDownload({
                            ...file,
                            downloadUrl: file.downloadUrl || `https://drive.google.com/uc?export=download&id=${file.id}`
                        })}
                        className={`px-6 py-3 rounded-lg text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                            file.type === 'notebook' 
                                ? 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
                                : 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500'
                        }`}
                    >
                        {file.type === 'notebook' 
                            ? 'Download Jupyter Notebook (.ipynb)' 
                            : 'Download Assignment'}
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="flex h-screen bg-gray-50 text-gray-800">
            {/* Navigation Sidebar */}
            <div className="w-64 bg-gray-800 text-white p-4 border-r border-gray-700 overflow-y-auto">
                <h2 className="text-xl font-bold mb-6 px-2">Human Evolution Resources</h2>
                <nav className="space-y-2">
                    {humanEvolFiles.map(file => (
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
                                {file.type === 'video' && (
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
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
                        {selectedFile?.title || "Select a Resource"}
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

export default Humanevol;