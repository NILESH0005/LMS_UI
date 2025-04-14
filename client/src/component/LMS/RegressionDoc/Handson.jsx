import React, { useState, useEffect } from "react";
import FeedbackForm from "../FeedBackForm";

const HandsOn = () => {
    const [selectedSection, setSelectedSection] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [feedback, setFeedback] = useState([]);

    // Hands-on files data
    const handsOnSections = [
        {
            id: 1,
            title: "1. Linear Regression - Multiple Variables",
            description: "Implementation of multiple variable linear regression",
            files: [
                { 
                    id: "1BKFEXU2A6pRicr_ImWLG6rupeC8a7m58", 
                    name: "equation.jpg", 
                    type: "image"
                },
                { 
                    id: "1vw3gnUtGYv44wh-5ubBBt_kyeX1iGwGq", 
                    name: "General equation.jpg", 
                    type: "image"
                },
                { 
                    id: "1RaxiRYNNb1stK5IxqjsexO5hRuwIica0", 
                    name: "home equation.jpg", 
                    type: "image"
                },
                { 
                    id: "1A5RdbslH4YfAfc4vqg9mO22Fs-h1nowX", 
                    name: "Homeprices.jpg", 
                    type: "image"
                },
                { 
                    id: "1kr9ViZopgeQCYNDMc6OtTdqOvpV57mKo", 
                    name: "Implementation.ipynb", 
                    type: "notebook"
                },
                { 
                    id: "1r8RTVkGO6VEuqL7eij_l3sxpIGSLXiZb", 
                    name: "Dataset.csv", 
                    type: "csv",
                    download: true
                }
            ]
        },
        {
            id: 2,
            title: "2. Linear Regression - Single Variable",
            description: "Implementation of single variable linear regression",
            files: [
                { 
                    id: "1kkvcjCy0E8XyrRUw08WBLMiMtLNhA5za", 
                    name: "homepricetable.jpg", 
                    type: "image"
                },
                { 
                    id: "1W27R7K25Tmmz1f2enxJ67M5sXyreac0z", 
                    name: "scatterplot.jpg", 
                    type: "image"
                },
                { 
                    id: "15IH_YfX1UCl64CB_z-dp7QhanoLASn3n", 
                    name: "Implementation.ipynb", 
                    type: "notebook"
                },
                { 
                    id: "1nE6UJCWpasW-RppS0PTjj7BMSfW6_OmH", 
                    name: "Training Data.csv", 
                    type: "csv",
                    download: true
                },
                { 
                    id: "1VQGrBoSmHiW0HOe1t6MRuuBRA6yAps4y", 
                    name: "Test Data.csv", 
                    type: "csv",
                    download: true
                },
                { 
                    id: "1-cuppr8xVrRpX5aFlQmBJ5nx_QPD1-Ti", 
                    name: "equation.png", 
                    type: "image"
                },
                { 
                    id: "1pBUM83NRcfPfIqC-0h_5lKbet7x1fAjb", 
                    name: "linear_equation.png", 
                    type: "image"
                }
            ]
        },
        {
            id: 3,
            title: "3. Logistic Regression - Singleclass",
            description: "Implementation of single class logistic regression",
            files: [
                { 
                    id: "1Fjw-4o-rgNT6qgXxKy7ZQZxhnD6_PhJg", 
                    name: "Implementation.ipynb", 
                    type: "notebook"
                },
                { 
                    id: "1DpbzhaMC5DNORKgxBNW06iIOIGttFjmj", 
                    name: "Dataset.csv", 
                    type: "csv",
                    download: true
                }
            ]
        },
        {
            id: 4,
            title: "4. Logistic Regression - Multiclass",
            description: "Implementation of multiclass logistic regression",
            files: [
                { 
                    id: "1nV2GLrqlO75Jh1USTtS1FM24VhqDDdhF", 
                    name: "Implementation.ipynb", 
                    type: "notebook"
                }
            ]
        },
        {
            id: 5,
            title: "Assignment",
            description: "Hands-on assignment",
            icon: "📓"
        }
    ];

    const handleFeedbackSubmit = (sectionId, rating, comment) => {
        const newFeedback = {
            sectionId,
            sectionTitle: selectedSection?.title,
            rating,
            comment,
            timestamp: new Date().toISOString()
        };
        const updatedFeedback = [...feedback, newFeedback];
        localStorage.setItem("handsOnFeedback", JSON.stringify(updatedFeedback));
        setFeedback(updatedFeedback);
        sendFeedbackToServer(newFeedback);
    };

    useEffect(() => {
        if (handsOnSections.length > 0 && !selectedSection) {
            setSelectedSection(handsOnSections[0]);
            if (handsOnSections[0].files && handsOnSections[0].files.length > 0) {
                setSelectedFile(handsOnSections[0].files[0]);
            }
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
        if (!selectedFile) return (
            <div className="flex justify-center items-center h-full text-gray-400">
                <p>Select a file to preview</p>
            </div>
        );

        // Common iframe props
        const iframeProps = {
            className: "w-full h-full",
            title: selectedFile.name,
            allowFullScreen: true,
            frameBorder: "0"
        };

        switch (selectedFile.type) {
            case "notebook":
                return (
                    <div className="w-full h-full">
                        <iframe
                            src={`https://drive.google.com/file/d/${selectedFile.id}/preview`}
                            {...iframeProps}
                        />
                    </div>
                );
            case "image":
                return (
                    <div className="w-full h-full">
                        <iframe
                            src={`https://drive.google.com/file/d/${selectedFile.id}/preview`}
                            {...iframeProps}
                        />
                    </div>
                );
            case "csv":
                return (
                    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                        <div className="text-6xl mb-4">📊</div>
                        <h3 className="text-xl font-semibold mb-2">{selectedFile.name}</h3>
                        <a
                            href={`https://drive.google.com/uc?export=download&id=${selectedFile.id}`}
                            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            download
                        >
                            Download CSV File
                        </a>
                    </div>
                );
            default:
                return (
                    <div className="flex justify-center items-center h-full text-gray-500">
                        <p>Unsupported file type</p>
                    </div>
                );
        }
    };

    return (
        <div className="flex h-screen bg-background text-foreground">
            {/* Navigation Sidebar */}
            <div className="w-64 bg-gray-800 text-white p-4 border-r border-gray-700">
                <h2 className="text-xl font-bold mb-6">Hands-on Exercises</h2>
                <ul className="space-y-3">
                    {handsOnSections.map(section => (
                        <li key={section.id}>
                            <button
                                onClick={() => {
                                    setSelectedSection(section);
                                    if (section.files && section.files.length > 0) {
                                        setSelectedFile(section.files[0]);
                                    } else {
                                        setSelectedFile(null);
                                    }
                                }}
                                className={`flex flex-col w-full p-3 rounded text-left hover:bg-gray-700 transition-colors ${
                                    selectedSection?.id === section.id ? "bg-gray-700 border-l-4 border-blue-500" : ""
                                }`}
                            >
                                <span className="font-medium">{section.title}</span>
                                <span className="text-sm text-gray-300 mt-1">{section.description}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col p-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">
                        {selectedSection?.title || "Select an Exercise"}
                    </h1>
                    <p className="text-gray-600 mt-2">
                        {selectedSection?.description || ""}
                    </p>
                    
                    {/* File selector tabs */}
                    {selectedSection?.files && (
                        <div className="flex space-x-2 mt-4 overflow-x-auto">
                            {selectedSection.files.map(file => (
                                <button
                                    key={file.id}
                                    onClick={() => setSelectedFile(file)}
                                    className={`px-4 py-2 rounded-t-lg whitespace-nowrap ${
                                        selectedFile?.id === file.id
                                            ? "bg-white text-gray-800 border-t border-l border-r border-gray-300"
                                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                                >
                                    {file.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                
                {/* Content display area */}
                <div className="flex-1 w-full border rounded-b-lg rounded-r-lg shadow-lg bg-white overflow-hidden relative">
                    {/* Block Google Drive pop-out button */}
                    <div className="absolute top-0 right-0 w-14 h-14 z-10" />
                    
                    {renderFileContent()}
                </div>

                {/* Feedback section */}
                {selectedSection && (
                    <div className="mt-8 w-full max-w-3xl mx-auto">
                        <FeedbackForm 
                            fileId={selectedSection.id}
                            fileName={selectedSection.title}
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