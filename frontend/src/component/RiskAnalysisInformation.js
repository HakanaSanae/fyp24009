import React, { useEffect, useState } from 'react';

function RiskAnalysisInformation({ type, data }) {

    const risk_level = data.Risk_Level;
    const explanation = data.Explanation;
    const suggestion = data.Suggestion;

    return (
        <div className="risk-analysis-information">
            <h2 className="risk-analysis-title">Performance in {type} section: </h2>
            <div className="risk-analysis-item">
                <h3>Risk Level:</h3>
                <p>
                    {risk_level}
                </p>
            </div>
            
            <div className="risk-analysis-item">
                <h3>Explanation:</h3>
                <p>
                    {explanation}
                </p>
            </div>
            <div className="risk-analysis-item">
                <h3>Suggestion:</h3>
                <p>
                    {suggestion}
                </p>
            </div>
            
            
        </div>
    );
}

export default RiskAnalysisInformation;
