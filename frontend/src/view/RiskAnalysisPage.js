import React, { useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../interface/apiClient';
import RiskAnalysisInformation from '../component/RiskAnalysisInformation';

function RiskAnalysisPage() {

    const [file, setFile] = useState(null);
    const [E_data, setEData] = useState(null);
    const [S_data, setSData] = useState(null);  
    const [G_data, setGData] = useState(null);
    const [risk_level, setRiskLevel] = useState(null);
    const fileInputRef = useRef(null);
    const [resetSubmission, setResetSubmission] = useState(false); 

    const handleFileUpload = (event) => {
        setFile(event.target.files[0]);
        setResetSubmission(true); 
    };

    const reset = () => {
        setFile(null);
        setEData(null);
        setSData(null);
        setGData(null);
        setRiskLevel(null);
        fileInputRef.current.value = null;
        setResetSubmission(false);
    }; 

    const submitFile = async () => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await apiClient.submitRiskAnalysisFile(formData);

            if (response.success) {
                console.log("File uploaded successfully");
                fileInputRef.current.value = null;
                const data = response.message;
                setRiskLevel(data.Total_Risk_Level);
                setEData(data.E);
                setSData(data.S);
                setGData(data.G);
                setFile(null); 
                setResetSubmission(true);
            } else {
                console.error("File upload failed");
            }
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    }

    return (
        <div className = "risk-analysis-page">
            
            {
                risk_level && (
                    <div className="risk-level" style={{justifySelf: "center"}}>
                        <h1>Total Risk Level: {risk_level}</h1>
                    </div>
                )
            }
            {
                E_data && (
                    <RiskAnalysisInformation type="Environmental" data={E_data} />
                )
            }
            {
                S_data && (
                    <RiskAnalysisInformation type="Social" data={S_data} />
                )   
            }
            {
                G_data && (
                    <RiskAnalysisInformation type="Governance" data={G_data} />
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
    )
}

export default RiskAnalysisPage;