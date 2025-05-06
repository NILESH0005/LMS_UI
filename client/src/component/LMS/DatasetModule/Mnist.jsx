// import React, { useState } from "react";
// import FeedbackForm from "../FeedBackForm";

// const Mnist = () => {
//     const [selectedFileId, setSelectedFileId] = useState(null);
//     const [selectedFileName, setSelectedFileName] = useState("");
//     const [selectedFileType, setSelectedFileType] = useState("");
//     const [feedback, setFeedback] = useState([]);

//     // MNIST files
//     const mnistFiles = [
//         {
//             id: 1,
//             title: "MNIST README (PDF Guide)",
//             fileId: "1hGFbAZPE5n0A8k7emLkKlD-CVO0Smf3C", // Replace with actual PDF ID
//             type: "pdf",
//             description: "Documentation for working with the MNIST dataset"
//         },
//         {
//             id: 2,
//             title: "Use-MNIST (Jupyter Notebook)",
//             fileId: "14ntQf8fpVMKEW0mWbqKf527PXJ_t1Vd3", // Replace with actual notebook ID
//             type: "notebook",
//             description: "Practical implementation using the MNIST dataset"
//         },
//         {
//             id: 4, // New ZIP resource
//             title: "MNIST Dataset (ZIP Archive)",
//             fileId: "1I4wLyVqFf2WXlY_p7lhe4UMyDvoeTzRS", // Replace with actual ZIP ID
//             type: "zip",
//             description: "Compressed dataset files for offline use"
//         },
//         {
//             id: 3,
//             title: "Assignment",
//             icon: "📓"
//         }
//     ];

//     const handleFeedbackSubmit = (fileId, rating, comment) => {
//         const newFeedback = {
//             fileId,
//             fileName: selectedFileName,
//             fileType: selectedFileType,
//             rating,
//             comment,
//             timestamp: new Date().toISOString()
//         };
//         const updatedFeedback = [...feedback, newFeedback];
//         localStorage.setItem("mnistFeedback", JSON.stringify(updatedFeedback));
//         setFeedback(updatedFeedback);
//         sendFeedbackToServer(newFeedback);
//     };

//     // Set first file as default on component mount
//     useState(() => {
//         if (mnistFiles.length > 0 && !selectedFileId) {
//             setSelectedFileId(mnistFiles[0].fileId);
//             setSelectedFileName(mnistFiles[0].title);
//             setSelectedFileType(mnistFiles[0].type);
//         }

//         // Security measures
//         const disableRightClick = (e) => e.preventDefault();
//         const disableShortcuts = (e) => {
//             if (e.ctrlKey && (e.key === 's' || e.key === 'p' || e.key === 'c')) e.preventDefault();
//         };

//         document.addEventListener('contextmenu', disableRightClick);
//         document.addEventListener('keydown', disableShortcuts);

//         return () => {
//             document.removeEventListener('contextmenu', disableRightClick);
//             document.removeEventListener('keydown', disableShortcuts);
//         };
//     }, []);

//     return (
//         <div className="flex h-screen bg-background text-foreground">
//             {/* Navigation Sidebar */}
//             <div className="w-64 bg-gray-800 text-white p-4 border-r border-gray-700">
//                 <h2 className="text-xl font-bold mb-6">MNIST Resources</h2>
//                 <ul className="space-y-3">
//                     {mnistFiles.map(file => (
//                         <li key={file.id}>
//                             <button
//                                 onClick={() => {
//                                     setSelectedFileId(file.fileId);
//                                     setSelectedFileName(file.title);
//                                     setSelectedFileType(file.type);
//                                 }}
//                                 className={`flex flex-col w-full p-3 rounded text-left hover:bg-gray-700 transition-colors ${
//                                     selectedFileId === file.fileId ? "bg-gray-700 border-l-4 border-blue-500" : ""
//                                 }`}
//                             >
//                                 <span className="font-medium">{file.title}</span>
//                                 <span className="text-sm text-gray-300 mt-1">{file.description}</span>
//                             </button>
//                         </li>
//                     ))}
//                 </ul>
//             </div>

//             {/* Main Content Area */}
//             <div className="flex-1 flex flex-col p-6">
//                 <div className="mb-6">
//                     <h1 className="text-3xl font-bold text-gray-800">
//                         {selectedFileName || "Select a Resource"}
//                     </h1>
//                     <p className="text-gray-600 mt-2">
//                         {mnistFiles.find(f => f.fileId === selectedFileId)?.description || ""}
//                     </p>
//                 </div>
                
//                 {selectedFileId && (
//                     <>
//                         <div className="flex-1 w-full border rounded-xl shadow-lg relative overflow-hidden bg-white"
//                             onContextMenu={(e) => e.preventDefault()}>
//                             {/* Block Google Drive pop-out button */}
//                             <div className="absolute top-0 right-0 w-14 h-14 z-10" />
                            
//                             <iframe
//                                 key={selectedFileId}
//                                 src={`https://drive.google.com/file/d/${selectedFileId}/preview`}
//                                 className="w-full h-full"
//                                 allowFullScreen
//                                 title={`${selectedFileName} Viewer`}
//                                 sandbox="allow-scripts allow-same-origin"
//                             />
//                         </div>

//                         <div className="mt-8 w-full max-w-3xl mx-auto">
//                             <FeedbackForm 
//                                 fileId={selectedFileId}
//                                 fileName={selectedFileName}
//                                 fileType={selectedFileType}
//                                 onSubmit={handleFeedbackSubmit}
//                             />
//                         </div>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };

// const sendFeedbackToServer = (feedback) => {
//     // Implement your feedback submission logic
//     console.log("Submitting MNIST feedback:", feedback);
//     // Example: axios.post('/api/feedback/mnist', feedback)
// };

// export default Mnist;
import React, { useState, useEffect } from "react";
import FeedbackForm from "../FeedBackForm";

const Mnist = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [feedback, setFeedback] = useState([]);

    // File configurations
    const mnistFiles = [
        {
            id: "1oZe4uYUlbRxRE3Qb1FzrThR-Z25RObSj",
            title: "MNIST README (PDF Guide)",
            type: "pdf",
            description: "Complete documentation for MNIST dataset",
            size: "1.2MB",
            lastUpdated: "2024-01-15"
        },
        {
            id: "14ntQf8fpVMKEW0mWbqKf527PXJ_t1Vd3",
            title: "Use-MNIST (Jupyter Notebook)",
            type: "notebook",
            description: "Practical implementation with TensorFlow/Keras",
            size: "3.5MB",
            lastUpdated: "2024-02-10"
        },
        {
            id: "1I4wLyVqFf2WXlY_p7lhe4UMyDvoeTzRS",
            title: "MNIST Dataset (ZIP Archive)",
            type: "zip",
            description: "Compressed dataset files for offline use",
            size: "12.8MB",
            lastUpdated: "2023-12-05"
        },
        {
            id: "assignment",
            title: "MNIST Assignment",
            type: "assignment",
            description: "Hands-on practice tasks",
            size: "850KB",
            lastUpdated: "2024-03-01"
        }
    ];

    // Set first file as default
    useEffect(() => {
        if (mnistFiles.length > 0 && !selectedFile) {
            setSelectedFile(mnistFiles[0]);
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
        const link = document.createElement('a');
        link.href = `https://drive.google.com/uc?export=download&id=${file.id}`;
        link.setAttribute('download', `${file.title}.${file.type}`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Log download event
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
        localStorage.setItem("mnistFeedback", JSON.stringify(updatedFeedback));
        setFeedback(updatedFeedback);
        
        // Send to backend (mock implementation)
        console.log("Feedback submitted:", newFeedback);
    };

    const FileDisplay = ({ file }) => {
        if (file.type === 'pdf') {
            return (
                <div className="w-full h-full border rounded-xl shadow-lg overflow-hidden bg-white">
                    <iframe
                        src={`https://drive.google.com/file/d/${file.id}/preview`}
                        className="w-full h-full min-h-[70vh]"
                        allowFullScreen
                        title={`${file.title} Preview`}
                        sandbox="allow-same-origin allow-scripts"
                    />
                    <div className="p-4 border-t flex justify-end">
                        <button 
                            onClick={() => handleDownload(file)}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                            Download PDF
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className="flex flex-col items-center justify-center h-full border rounded-xl shadow-lg bg-white p-8">
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        {file.type === 'notebook' ? (
                            <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M13 4.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM7 10a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM9.5 15.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM19 10a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                            </svg>
                        ) : (
                            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"/>
                            </svg>
                        )}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{file.title}</h3>
                    <p className="text-gray-500 mb-4">{file.description}</p>
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-sm text-gray-400">Size: {file.size}</span>
                        <span className="text-sm text-gray-400">Updated: {file.lastUpdated}</span>
                    </div>
                    <button
                        onClick={() => handleDownload(file)}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Download {file.type.toUpperCase()}
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="flex h-screen bg-gray-50 text-gray-800">
            {/* Navigation Sidebar */}
            <div className="w-64 bg-gray-800 text-white p-4 border-r border-gray-700 overflow-y-auto">
                <h2 className="text-xl font-bold mb-6 px-2">MNIST Resources</h2>
                <nav className="space-y-2">
                    {mnistFiles.map(file => (
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
                                {file.type === 'zip' && (
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
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

export default Mnist;
