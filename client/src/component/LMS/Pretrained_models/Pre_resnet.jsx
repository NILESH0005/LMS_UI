import React, { useState } from "react";
import FeedbackForm from "../FeedBackForm";

const Pre_resnet = () => {
    const [selectedFileId, setSelectedFileId] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState("");
    const [selectedFileType, setSelectedFileType] = useState("");
    const [feedback, setFeedback] = useState([]);

    // Pre-ResNet files
    const preResnetFiles = [
        {
            id: 1,
            title: "ResNet Guide (PDF)",
            fileId: "1j4-WIz0YJnqTAS4Eh3VuFbXPrJUxQEfL",
            type: "pdf",
            icon: "📄",
            description: "Implementation guide for ResNet"
        },
        {
            id: 2,
            title: "Training Notebook (IPYNB)",
            fileId: "1FAYpq27JJoK3ZYtkbiuZmOhfoPKI3MpZ",
            type: "ipynb",
            icon: "📓",
            description: "Jupyter notebook with training code"
        },
        {
            id: 3,
            title: "Pre-trained Weights (H5)",
            fileId: "1Qr7MY5wMpCCRnb9XokJDx2mXRIgvE9f0",
            type: "h5",
            icon: "⚖️",
            description: "Pre-trained model weights",
            size: "~90MB"
        },
        {
            id: 4,
            title: "Assignment",
            icon: "📓"
        }
    ];

    const handleFeedbackSubmit = (fileId, rating, comment) => {
        const newFeedback = {
            fileId,
            fileName: selectedFileName,
            fileType: selectedFileType,
            rating,
            comment,
            timestamp: new Date().toISOString()
        };
        const updatedFeedback = [...feedback, newFeedback];
        localStorage.setItem("preResnetFeedback", JSON.stringify(updatedFeedback));
        setFeedback(updatedFeedback);
        sendFeedbackToServer(newFeedback);
    };

    const handleDownload = (fileId, fileName, fileType) => {
        const link = document.createElement('a');
        link.href = `https://drive.google.com/uc?export=download&id=${fileId}`;
        link.setAttribute('download', `${fileName.toLowerCase().replace(/\s+/g, '_')}.${fileType}`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Set first file as default on component mount
    useState(() => {
        if (preResnetFiles.length > 0 && !selectedFileId) {
            setSelectedFileId(preResnetFiles[0].fileId);
            setSelectedFileName(preResnetFiles[0].title);
            setSelectedFileType(preResnetFiles[0].type);
        }

        // Security measures
        const disableRightClick = (e) => e.preventDefault();
        const disableShortcuts = (e) => {
            if (e.ctrlKey && (e.key === 's' || e.key === 'p' || e.key === 'c')) e.preventDefault();
        };

        document.addEventListener('contextmenu', disableRightClick);
        document.addEventListener('keydown', disableShortcuts);

        return () => {
            document.removeEventListener('contextmenu', disableRightClick);
            document.removeEventListener('keydown', disableShortcuts);
        };
    }, []);

    const renderFileContent = () => {
        if (!selectedFileId) return null;

        const currentFile = preResnetFiles.find(f => f.fileId === selectedFileId);

        switch(currentFile.type) {
            case "pdf":
                return (
                    <iframe
                        key={selectedFileId}
                        src={`https://drive.google.com/file/d/${selectedFileId}/preview`}
                        className="w-full h-full"
                        allowFullScreen
                        title={`${selectedFileName} Viewer`}
                        sandbox="allow-scripts allow-same-origin"
                    />
                );
            case "ipynb":
                return (
                    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                        <div className="text-6xl mb-4">{currentFile.icon}</div>
                        <h3 className="text-xl font-semibold mb-2">{currentFile.title}</h3>
                        <p className="text-gray-500 mb-6">{currentFile.description}</p>
                        <button
                            onClick={() => handleDownload(currentFile.fileId, currentFile.title, "ipynb")}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Download Notebook
                        </button>
                    </div>
                );
            case "h5":
                return (
                    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                        <div className="text-6xl mb-4">{currentFile.icon}</div>
                        <h3 className="text-xl font-semibold mb-2">{currentFile.title}</h3>
                        <p className="text-gray-500 mb-2">{currentFile.description}</p>
                        <p className="text-gray-400 text-sm mb-6">Size: {currentFile.size}</p>
                        <button
                            onClick={() => handleDownload(currentFile.fileId, currentFile.title, "h5")}
                            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                            Download Weights
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex h-screen bg-background text-foreground">
            {/* Navigation Sidebar */}
            <div className="w-64 bg-gray-800 text-white p-4 border-r border-gray-700">
                <h2 className="text-xl font-bold mb-6">Pre-ResNet Resources</h2>
                <ul className="space-y-3">
                    {preResnetFiles.map(file => (
                        <li key={file.id}>
                            <button
                                onClick={() => {
                                    setSelectedFileId(file.fileId);
                                    setSelectedFileName(file.title);
                                    setSelectedFileType(file.type);
                                }}
                                className={`flex items-center w-full p-3 rounded text-left hover:bg-gray-700 transition-colors ${
                                    selectedFileId === file.fileId ? "bg-gray-700 border-l-4 border-blue-500" : ""
                                }`}
                            >
                                <span className="text-xl mr-2">{file.icon}</span>
                                <div className="flex flex-col">
                                    <span className="font-medium">{file.title}</span>
                                    <span className="text-sm text-gray-300 mt-1">{file.description}</span>
                                    {file.size && <span className="text-xs text-gray-400 mt-1">{file.size}</span>}
                                </div>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col p-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">
                        {selectedFileName || "Select a Resource"}
                    </h1>
                    <p className="text-gray-600 mt-2">
                        {preResnetFiles.find(f => f.fileId === selectedFileId)?.description || ""}
                    </p>
                </div>
                
                <div className="flex-1 w-full border rounded-xl shadow-lg relative overflow-hidden bg-white"
                    onContextMenu={(e) => e.preventDefault()}>
                    {/* Block Google Drive pop-out button */}
                    <div className="absolute top-0 right-0 w-14 h-14 z-10" />
                    
                    {renderFileContent()}
                </div>

                <div className="mt-8 w-full max-w-3xl mx-auto">
                    <FeedbackForm 
                        fileId={selectedFileId}
                        fileName={selectedFileName}
                        fileType={selectedFileType}
                        onSubmit={handleFeedbackSubmit}
                    />
                </div>
            </div>
        </div>
    );
};

const sendFeedbackToServer = (feedback) => {
    // Implement your feedback submission logic
    console.log("Submitting Pre-ResNet feedback:", feedback);
    // Example: axios.post('/api/feedback/pre-resnet', feedback)
};

export default Pre_resnet;