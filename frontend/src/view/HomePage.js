import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    return (
        <div className="home-page">
            <h1 style={{ textAlign: "center"}}>
                ESG Dashboards
            </h1>
            <div className="home-page-item-container">
                <div class="home-buttons-container">
                    <h4>
                        Overall ESG Performance
                    </h4>
                    <a href="/dashboard/Overall-ESG-Performance" >
                        <button variant="primary">
                            View Here
                        </button>
                    </a>
                </div>

                <div class="home-buttons-container">
                    <h4>
                        Sector-based Comparison
                    </h4>
                    <a href="/dashboard/Sector-based-Comparison">
                        <button variant="primary">
                            View Here
                        </button>
                    </a>
                </div>

                <div class="home-buttons-container">
                    <h4>
                        Top & Bottom Performers
                    </h4>
                    <a href="/dashboard/Top-Bottom-Performers">
                        <button variant="primary">
                            View Here
                        </button>
                    </a>
                </div>

                <div class="home-buttons-container">
                    <h4>
                        ESG Score Breakdown
                    </h4>
                    <a href="/dashboard/ESG-Score-Breakdown">
                        <button variant="primary">
                            View Here
                        </button>
                    </a>
                </div>

                <div class="home-buttons-container">
                    <h4>
                        Sector & Industry Leaders
                    </h4>
                    <a href="/dashboard/Sector-Industry-Leaders">
                        <button variant="primary" class="home-buttons">
                            View Here
                        </button>
                    </a>
                </div>

                <div class="home-buttons-container">
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