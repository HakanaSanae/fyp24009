import React, { useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { submitPerformanceAnalysisFile } from '../interface/apiClient';
import PerformanceAnalysisInformation from '../component/PerformanceAnalysisInformation';

function PerformanceAnalysisPage() {
    
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [E_data, setEData] = useState(null);
    const [S_data, setSData] = useState(null);  
    const [G_data, setGData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [performance_level, setPerformanceLevel] = useState(null);
    const fileInputRef = useRef(null);
    const [resetSubmission, setResetSubmission] = useState(false); 

    const handleFileUpload = (event) => {
        setIsLoading(true);
        setFile(event.target.files[0]);
        setResetSubmission(true); 
        setIsLoading(false);
    };

    const reset = () => {
        setFile(null);
        setEData(null);
        setSData(null);
        setGData(null);
        setPerformanceLevel(null);
        fileInputRef.current.value = null;
        setResetSubmission(false);
    }; 

    const submitFile = async () => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            console.log('starting file upload...');
            const response = await submitPerformanceAnalysisFile(formData, navigate);

            if (response.success) {
                console.log("File uploaded successfully");
                fileInputRef.current.value = null;
                const data = response.message;
                setPerformanceLevel(data.Total_Performance_Level);
                setEData(data.E);
                setSData(data.S);
                setGData(data.G);
                setFile(null); 
                setResetSubmission(true);
            } else {
                console.error("File upload failed");
            }
            setIsLoading(false);
        } catch (error) {
            console.error("Error uploading file:", error);
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className = "performance-analysis-page">
                
                {
                    performance_level && (
                        <div className="performance-level" style={{justifySelf: "center"}}>
                            <h1>Total Performance Level: {performance_level}</h1>
                        </div>
                    )
                }
                {
                    E_data && (
                        <PerformanceAnalysisInformation type="Environmental" data={E_data} />
                    )
                }
                {
                    S_data && (
                        <PerformanceAnalysisInformation type="Social" data={S_data} />
                    )   
                }
                {
                    G_data && (
                        <PerformanceAnalysisInformation type="Governance" data={G_data} />
                    )
                }

                <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    ref = {fileInputRef}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between' , marginBottom: "3vh"}}>

                    {resetSubmission && (
                        <button onClick={reset}>Reset</button>
                    )}

                    {file && (
                        <button onClick={submitFile}>Submit File</button>
                    )}

                    
                </div>
                
                
            </div>
            {isLoading && (
                <div className="loading-mask" >
                    <h2>Loading...</h2>
                </div>
            )}
        </>
        
        
    )
}

export default PerformanceAnalysisPage;