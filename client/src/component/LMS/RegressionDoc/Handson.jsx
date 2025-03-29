import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import FeedbackForm from "../FeedBackForm";

const Handson = () => {
    const [selectedFileId, setSelectedFileId] = useState(null);
    const [selectedFileType, setSelectedFileType] = useState(null);
    const [expandedSubcategory, setExpandedSubcategory] = useState(null);
    const [feedback, setFeedback] = useState([]);

    // Hands-on modules data
    const modules = [
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
                    title: "Diagram 2.jpg", 
                    fileId: "YOUR_IMG2_ID", 
                    type: "jpg" 
                },
                { 
                    id: 13, 
                    title: "Diagram 3.jpg", 
                    fileId: "YOUR_IMG3_ID", 
                    type: "jpg" 
                },
                { 
                    id: 14, 
                    title: "Diagram 4.jpg", 
                    fileId: "YOUR_IMG4_ID", 
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
                    fileId: "YOUR_CSV1_ID", 
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
        }
    ];

    const handleFeedbackSubmit = (fileId, rating, comment) => {
        const newFeedback = {
            fileId,
            rating,
            comment,
            timestamp: new Date().toISOString(),
        };
        const updatedFeedback = [...feedback, newFeedback];
        localStorage.setItem("handsonFeedback", JSON.stringify(updatedFeedback));
        setFeedback(updatedFeedback);
        sendFeedbackToServer(newFeedback);
    };

    const getEmbedURL = (fileId, type) => {
        switch(type) {
            case "ipynb":
                return `https://nbviewer.jupyter.org/urls/docs.google.com/uc?export=download&id=${fileId}`;
            case "jpg":
            case "png":
                return `https://drive.google.com/uc?id=${fileId}`;
            case "csv":
                return `https://docs.google.com/spreadsheets/d/${fileId}/preview`;
            default:
                return "";
        }
    };

    const getDownloadURL = (fileId) => {
        return `https://drive.google.com/uc?export=download&id=${fileId}`;
    };

    useEffect(() => {
        if (modules.length > 0 && !selectedFileId) {
            const firstModule = modules[0];
            if (firstModule.nested && firstModule.nested.length > 0) {
                setSelectedFileId(firstModule.nested[0].fileId);
                setSelectedFileType(firstModule.nested[0].type);
            }
        }

        // Security measures
        const disableRightClick = (e) => e.preventDefault();
        const disableKeys = (e) => {
            if (e.ctrlKey && (e.key === 's' || e.key === 'p')) e.preventDefault();
        };

        document.addEventListener('contextmenu', disableRightClick);
        document.addEventListener('keydown', disableKeys);

        return () => {
            document.removeEventListener('contextmenu', disableRightClick);
            document.removeEventListener('keydown', disableKeys);
        };
    }, []);

    const toggleModule = (id) => {
        setExpandedSubcategory(prev => prev === id ? null : id);
    };

    return (
        <div className="flex h-screen bg-background text-foreground">
            {/* Sidebar */}
            <div className="w-72 bg-gray-800 text-white p-4 border-r border-gray-700 overflow-y-auto">
                <h2 className="text-xl font-bold mb-6">Hands-on Regression Modules</h2>
                <ul className="space-y-2">
                    {modules.map(module => (
                        <li key={module.id}>
                            <div
                                className={`flex items-center justify-between p-3 rounded cursor-pointer hover:bg-gray-700 ${
                                    expandedSubcategory === module.id ? "bg-gray-700" : ""
                                }`}
                                onClick={() => toggleModule(module.id)}
                            >
                                <span className="font-medium">{module.title}</span>
                                <span className="text-sm">
                                    {expandedSubcategory === module.id ? '▼' : '▶'}
                                </span>
                            </div>
                            
                            {expandedSubcategory === module.id && (
                                <ul className="pl-4 mt-2 space-y-1">
                                    {module.nested.map(item => (
                                        <li key={item.id}>
                                            <button
                                                onClick={() => {
                                                    setSelectedFileId(item.fileId);
                                                    setSelectedFileType(item.type);
                                                }}
                                                className={`flex items-center w-full p-2 rounded text-left hover:bg-gray-600 ${
                                                    selectedFileId === item.fileId ? "bg-gray-600" : ""
                                                }`}
                                            >
                                                <span className="mr-2">
                                                    {item.type === "ipynb" ? "📓" : 
                                                     item.type === "csv" ? "📊" : 
                                                     item.type === "jpg" || item.type === "png" ? "🖼️" : "📄"}
                                                </span>
                                                <span>{item.title}</span>
                                                {item.download && (
                                                    <a 
                                                        href={getDownloadURL(item.fileId)}
                                                        onClick={e => e.stopPropagation()}
                                                        className="ml-auto text-blue-300 hover:text-blue-100"
                                                        download
                                                    >
                                                        ⬇️
                                                    </a>
                                                )}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 flex flex-col">
                <h1 className="text-3xl font-bold mb-6">Hands-on Regression Exercises</h1>
                
                {selectedFileId && selectedFileType && (
                    <>
                        <div className="flex-1 w-full border rounded-xl shadow-lg overflow-hidden bg-white relative"
                            onContextMenu={e => e.preventDefault()}>
                            {/* Block pop-out buttons */}
                            <div className="absolute top-0 right-0 w-14 h-14 z-10" />
                            
                            {["jpg", "png"].includes(selectedFileType) ? (
                                <img 
                                    src={getEmbedURL(selectedFileId, selectedFileType)}
                                    className="w-full h-full object-contain"
                                    alt="Preview"
                                />
                            ) : selectedFileType === "csv" ? (
                                <iframe
                                    src={getEmbedURL(selectedFileId, selectedFileType)}
                                    className="w-full h-full"
                                    title="CSV Preview"
                                />
                            ) : (
                                <iframe
                                    src={getEmbedURL(selectedFileId, selectedFileType)}
                                    className="w-full h-full"
                                    allowFullScreen
                                    title="Notebook Preview"
                                />
                            )}
                        </div>

                        <div className="mt-6 w-full max-w-4xl mx-auto">
                            <FeedbackForm
                                fileId={selectedFileId}
                                onSubmit={handleFeedbackSubmit}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

const sendFeedbackToServer = (feedback) => {
    // Implement your feedback submission
    console.log("Submitting hands-on feedback:", feedback);
    // Example: axios.post('/api/feedback/handson', feedback)
};

export default Handson;