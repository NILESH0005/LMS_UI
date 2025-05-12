import React, { useState, useEffect } from "react";


const Heart_disease = () => {
    const [selectedFile, setSelectedFile] = useState(null);
 

    const heartDiseaseFiles = [
        {
            id: "1RRqRddjaQQLd6FvFjqj9A53Krl_p9ag9",
            title: "Workbook",
            type: "notebook",
            description: "Jupyter notebook for heart disease prediction",
            size: "3.1MB",
            lastUpdated: "2024-03-15",
            downloadUrl: "https://drive.google.com/uc?export=download&id=1RRqRddjaQQLd6FvFjqj9A53Krl_p9ag9",
            nbviewerUrl: "https://nbviewer.org/github/YogeshTiwari10/LMS/blob/main/Data%20Sets/Heart%20Disease%20Dataset/heart-disease-prediction.ipynb"
        },
        {
            id: "dataset-link",
            title: "Dataset Link",
            type: "link",
            description: "This dataset contains 14 clinical features such as age, sex, chest pain type, blood pressure, cholesterol levels, and others that are used to predict the presence or absence of heart disease. It is a cleaned and labeled dataset suitable for classification tasks.",
            externalUrl: "https://www.kaggle.com/datasets/johnsmith88/heart-disease-dataset/data?select=heart.csv",
            lastUpdated: "2024-03-20"
        },
        {
            id: "assignment",
            title: "Assessment",
            type: "assessment"
            
          }
    ];

    useEffect(() => {
        if (heartDiseaseFiles.length > 0 && !selectedFile) {
            setSelectedFile(heartDiseaseFiles[0]); // Default to first file
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
  This heart disease dataset consists of 303 records with 14 clinical features such as age, sex, resting blood pressure, cholesterol levels, fasting blood sugar, maximum heart rate, and ST depression. 
  It is commonly used in binary classification tasks to predict whether a patient is likely to have heart disease.
</p>
<div className="mb-6">
  <img 
    src="https://cdn-icons-png.flaticon.com/512/6737/6737181.png" 
    alt="Heart Disease Dataset Icon" 
    className="h-10 mx-auto mb-4"
  />
  <p className="text-sm text-gray-600 text-center">
    Sourced from Kaggle, this dataset enables hands-on practice with supervised machine learning algorithms. It supports healthcare analytics by helping predict heart disease 
    risk based on patient diagnostic data. It is widely used for academic and healthcare research purposes.
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
                        <button 
                            onClick={() => handleDownload({
                                ...file,
                                downloadUrl: `https://drive.google.com/uc?export=download&id=${file.id}`
                            })}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                            Download PDF
                        </button>
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

        // For Notebook files
        return (
            <div className="flex flex-col items-center justify-center h-full border rounded-xl shadow-lg bg-white p-8">
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 bg-indigo-100">
                        <svg className="w-10 h-10 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13 4.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM7 10a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM9.5 15.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM19 10a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{file.title}</h3>
                    <p className="text-gray-500 mb-4">Jupyter notebook for predicting the presence of heart disease using machine learning techniques such as Logistic Regression, KNN, and Random Forest. Includes EDA, feature selection, model training, and evaluation.</p>
                  
                    <button
                        onClick={() => handleDownload(file)}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Download Jupyter Notebook (.ipynb)
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="flex h-screen bg-gray-50 text-gray-800">
            {/* Navigation Sidebar */}
            <div className="w-64 bg-gray-800 text-white p-4 border-r border-gray-700 overflow-y-auto">
                <h2 className="text-xl font-bold mb-6 px-2">Heart Disease Resources</h2>
                <nav className="space-y-2">
                    {heartDiseaseFiles.map(file => (
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

export default Heart_disease;