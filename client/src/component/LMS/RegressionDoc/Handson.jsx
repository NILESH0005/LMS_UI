import React, { useState } from "react";
import FeedbackForm from "../FeedBackForm";

const HandsOn = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [expandedSections, setExpandedSections] = useState({});
    const [feedback, setFeedback] = useState([]);

    // Hands-on files data
    const handsOnFiles = [
        {
            id: 1,
            title: "1. Linear Regression - Multiple Variables",
            nested: [
                { 
                    id: 11, 
                    title: "equation.jpg", 
                    fileId: "1B9ucXC7eCDfjDZaSAR_5yRuYz2l8gYzs", 
                    type: "jpg" 
                },
                { 
                    id: 12, 
                    title: "General equationjpg", 
                    fileId: "1vw3gnUtGYv44wh-5ubBBt_kyeX1iGwGq", 
                    type: "jpg" 
                },
                { 
                    id: 13, 
                    title: "home equation.jpg", 
                    fileId: "1RaxiRYNNb1stK5IxqjsexO5hRuwIica0", 
                    type: "jpg" 
                },
                { 
                    id: 14, 
                    title: "Homeprices.jpg", 
                    fileId: "1A5RdbslH4YfAfc4vqg9mO22Fs-h1nowX", 
                    type: "jpg" 
                },
                { 
                    id: 15, 
                    title: "Implementation.ipynb", 
                    fileId: "YOUR_NB1_ID", 
                    type: "ipynb" 
                },
                { 
                    id: 16, 
                    title: "Dataset.csv", 
                    fileId: "1r8RTVkGO6VEuqL7eij_l3sxpIGSLXiZb", 
                    type: "csv",
                    download: true
                }
            ]
        },
        {
            id: 2,
            title: "2. Linear Regression - Single Variable",
            nested: [
                { 
                    id: 21, 
                    title: "Graph 1.jpg", 
                    fileId: "YOUR_IMG5_ID", 
                    type: "jpg" 
                },
                { 
                    id: 22, 
                    title: "Graph 2.jpg", 
                    fileId: "YOUR_IMG6_ID", 
                    type: "jpg" 
                },
                { 
                    id: 23, 
                    title: "Implementation.ipynb", 
                    fileId: "YOUR_NB2_ID", 
                    type: "ipynb" 
                },
                { 
                    id: 24, 
                    title: "Training Data.csv", 
                    fileId: "YOUR_CSV2_ID", 
                    type: "csv",
                    download: true
                },
                { 
                    id: 25, 
                    title: "Test Data.csv", 
                    fileId: "YOUR_CSV3_ID", 
                    type: "csv",
                    download: true
                },
                { 
                    id: 26, 
                    title: "Results.png", 
                    fileId: "YOUR_PNG1_ID", 
                    type: "png" 
                },
                { 
                    id: 27, 
                    title: "Comparison.png", 
                    fileId: "YOUR_PNG2_ID", 
                    type: "png" 
                }
            ]
        },
        {
            id: 3,
            title: "3. Logistic Regression - Singleclass",
            nested: [
                { 
                    id: 31, 
                    title: "Implementation.ipynb", 
                    fileId: "YOUR_NB3_ID", 
                    type: "ipynb" 
                },
                { 
                    id: 32, 
                    title: "Dataset.csv", 
                    fileId: "YOUR_CSV4_ID", 
                    type: "csv",
                    download: true
                }
            ]
        },
        {
            id: 4,
            title: "4. Logistic Regression - Multiclass",
            nested: [
                { 
                    id: 41, 
                    title: "Implementation.ipynb", 
                    fileId: "YOUR_NB4_ID", 
                    type: "ipynb" 
                }
            ]
        },
        {
            id: 5,
            title: "Assignment",
            icon: "📓"
        }
    ];

    const toggleSection = (sectionId) => {
        setExpandedSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }));
    };

    const handleFeedbackSubmit = (fileId, rating, comment) => {
        const newFeedback = {
            fileId,
            fileName: selectedFile?.title,
            fileType: selectedFile?.type,
            rating,
            comment,
            timestamp: new Date().toISOString()
        };
        const updatedFeedback = [...feedback, newFeedback];
        localStorage.setItem("handsOnFeedback", JSON.stringify(updatedFeedback));
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

    const renderFileContent = () => {
        if (!selectedFile) return (
            <div className="flex items-center justify-center h-full text-gray-500">
                Select a file to preview
            </div>
        );

        const imageTypes = ['jpg', 'jpeg', 'png', 'gif'];
        const isImage = imageTypes.includes(selectedFile.type.toLowerCase());

        if (isImage) {
            return (
                <div className="flex items-center justify-center h-full">
                    <img 
                        src={`https://drive.google.com/uc?export=view&id=${selectedFile.fileId}`}
                        alt={selectedFile.title}
                        className="max-h-full max-w-full object-contain"
                    />
                </div>
            );
        }

        switch(selectedFile.type.toLowerCase()) {
            case "pdf":
                return (
                    <iframe
                        src={`https://drive.google.com/file/d/${selectedFile.fileId}/preview`}
                        className="w-full h-full"
                        allowFullScreen
                        title={`${selectedFile.title} Viewer`}
                        sandbox="allow-scripts allow-same-origin"
                    />
                );
            case "ipynb":
                return (
                    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                        <div className="text-6xl mb-4">📓</div>
                        <h3 className="text-xl font-semibold mb-2">{selectedFile.title}</h3>
                        <button
                            onClick={() => handleDownload(selectedFile.fileId, selectedFile.title, "ipynb")}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Download Notebook
                        </button>
                    </div>
                );
            case "csv":
                return (
                    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                        <div className="text-6xl mb-4">📊</div>
                        <h3 className="text-xl font-semibold mb-2">{selectedFile.title}</h3>
                        <button
                            onClick={() => handleDownload(selectedFile.fileId, selectedFile.title, "csv")}
                            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Download CSV File
                        </button>
                    </div>
                );
            default:
                return (
                    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                        <div className="text-6xl mb-4">📁</div>
                        <h3 className="text-xl font-semibold mb-2">{selectedFile.title}</h3>
                        <button
                            onClick={() => handleDownload(selectedFile.fileId, selectedFile.title, selectedFile.type)}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Download File
                        </button>
                    </div>
                );
        }
    };

    const getFileIcon = (type) => {
        switch(type.toLowerCase()) {
            case 'pdf': return '📄';
            case 'ipynb': return '📓';
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif': return '🖼️';
            case 'csv': return '📊';
            default: return '📁';
        }
    };

    return (
        <div className="flex h-screen bg-background text-foreground">
            {/* Navigation Sidebar */}
            <div className="w-64 bg-gray-800 text-white p-4 border-r border-gray-700 overflow-y-auto">
                <h2 className="text-xl font-bold mb-6">Hands-on Exercises</h2>
                <div className="space-y-2">
                    {handsOnFiles.map(section => (
                        <div key={section.id} className="mb-4">
                            <button
                                onClick={() => toggleSection(section.id)}
                                className="flex items-center justify-between w-full p-3 rounded text-left hover:bg-gray-700 transition-colors"
                            >
                                <span className="font-medium">{section.title}</span>
                                <span>{expandedSections[section.id] ? '▼' : '▶'}</span>
                            </button>
                            
                            {expandedSections[section.id] && (
                                <ul className="ml-4 mt-2 space-y-2">
                                    {section.nested.map(file => (
                                        <li key={file.id}>
                                            <button
                                                onClick={() => setSelectedFile(file)}
                                                className={`flex items-center w-full p-2 rounded text-left hover:bg-gray-700 transition-colors ${
                                                    selectedFile?.id === file.id ? "bg-gray-700" : ""
                                                }`}
                                            >
                                                <span className="mr-2">{getFileIcon(file.type)}</span>
                                                <span className="text-sm">{file.title}</span>
                                                {file.download && (
                                                    <span className="ml-auto text-xs text-gray-400">(download)</span>
                                                )}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col p-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">
                        {selectedFile?.title || "Hands-on Exercises"}
                    </h1>
                    <p className="text-gray-600 mt-2">
                        {selectedFile ? `Viewing ${selectedFile.type.toUpperCase()} file` : "Select a file to view"}
                    </p>
                </div>
                
                <div className="flex-1 w-full border rounded-xl shadow-lg relative overflow-hidden bg-white">
                    {renderFileContent()}
                </div>

                {selectedFile && (
                    <div className="mt-8 w-full max-w-3xl mx-auto">
                        <FeedbackForm 
                            fileId={selectedFile.fileId}
                            fileName={selectedFile.title}
                            fileType={selectedFile.type}
                            onSubmit={handleFeedbackSubmit}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

const sendFeedbackToServer = (feedback) => {
    console.log("Submitting Hands-on feedback:", feedback);
    // Example: axios.post('/api/feedback/hands-on', feedback)
};

export default HandsOn;