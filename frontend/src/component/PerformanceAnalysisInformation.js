import React, { useEffect, useState } from 'react';

function PerformanceAnalysisInformation({ type, data }) {

    const performance_level = data.Performance_Level;
    const explanation = data.Explanation;
    const suggestion = data.Suggestion;

    return (
        <div className="performance-analysis-information">
            <h2 className="performance-analysis-title">Performance in {type} section: </h2>
            <div className="performance-analysis-item">
                <h3>Performance Level:</h3>
                <p>
                    {performance_level}
                </p>
            </div>
            
            <div className="performance-analysis-item">
                <h3>Explanation:</h3>
                <p>
                    {explanation}
                </p>
            </div>
            <div className="performance-analysis-item">
                <h3>Suggestion:</h3>
                <p>
                    {suggestion}
                </p>
            </div>
            
            
        </div>
    );
}

export default PerformanceAnalysisInformation;
