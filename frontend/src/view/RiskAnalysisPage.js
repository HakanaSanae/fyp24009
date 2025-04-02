import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../interface/apiClient';

function RiskAnalysisPage() {

    const [file, setFile] = useState(null);

    const handleFileUpload = (event) => {
        setFile(event.target.files[0]);
    };

    const submitFile = async () => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await apiClient.submitRiskAnalysisFile(formData);

            if (response.success) {
                console.log("File uploaded successfully");
            } else {
                console.error("File upload failed");
            }
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    }

    return (
        <div className = "risk-analysis-page">
            <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
            />

            {file && (
                <div>
                    <h2>File Uploaded: {file.name} </h2>
                    <button onClick={submitFile}>Submit File</button>
                </div>
            )}
        </div>
    )
}

export default RiskAnalysisPage;