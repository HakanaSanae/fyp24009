import React, { useState } from 'react';

function HomePage() {
    return (
        <div className="home-page">
            <h1 style={{ textAlign: "center"}}>
                ESG Dashboards
            </h1>
            <div className="home-page-item-container">
                <div className="home-buttons-container">
                    <h4>
                        Overall ESG Performance
                    </h4>
                    <a href="/dashboard/Overall-ESG-Performance" >
                        <button variant="primary">
                            View Here
                        </button>
                    </a>
                </div>

                <div className="home-buttons-container">
                    <h4>
                        Year-over-Year ESG Change
                    </h4>
                    <a href="/dashboard/YOY-ESG-Change">
                        <button variant="primary">
                            View Here
                        </button>
                    </a>
                </div>

                <div className="home-buttons-container">
                    <h4>
                        Sector-wise ESG Performance
                    </h4>
                    <a href="/dashboard/Sector-Wise-ESG-Performance">
                        <button variant="primary">
                            View Here
                        </button>
                    </a>
                </div>

                <div className="home-buttons-container">
                    <h4>
                        E, S, G Score Breakdown
                    </h4>
                    <a href="/dashboard/ESG-Score-Breakdown">
                        <button variant="primary">
                            View Here
                        </button>
                    </a>
                </div>

                <div className="home-buttons-container">
                    <h4>
                        ESG Score Distribution
                    </h4>
                    <a href="/dashboard/ESG-Score-Distribution">
                        <button variant="primary" className="home-buttons">
                            View Here
                        </button>
                    </a>
                </div>

                <div className="home-buttons-container">
                    <h4>
                        Custom Comparison
                    </h4>
                    <a href="/dashboard/Custom-Comparison">
                        <button variant="primary" className="home-buttons">
                            View Here
                        </button>
                    </a>
                </div>

                <div className="home-buttons-container">
                    <h4>
                        ESG Risk Analysis
                    </h4>
                    <a href="/dashboard/ESG-Risk-Analysis">
                        <button variant="primary">
                            View Here
                        </button>
                    </a>
                </div>

            </div>
        </div>
    )
}

export default HomePage;