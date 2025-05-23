import React from "react";
import icon from "../Picture-1.jpg";

class MainPage extends React.Component {
    render() {
        return (
            <div className="main-content">
                <div className="main-content-container">
                    <h1>ESGenius</h1>
                    <p className="project-description">
                        ESG Data-Driven Decision Support System
                    </p>
                    {/* <a>
                        <button>
                            about us
                        </button>
                    </a> */}
                </div>

                {/* <div className="main-content-container">
                    <a href="https://wp2024.cs.hku.hk/fyp24009/">
                        <button>
                            Link to project website
                        </button>
                    </a>
                </div> */}

                <div className="main-content-container">
                    <h2>
                        Background
                    </h2>
                    <p>
                        {/* Environmental, Social, and Governance (ESG) has become a prominent
                        topic in recent years, with ESG investing experiencing exponential growth.
                        However, the ESG ratings provided by various agencies often lack consistency
                        and comparability as they rely on varying methodologies and frameworks. This
                        inconsistency poses significant challenges for investors and companies striving
                        to make informed decisions in the ESG arena. <br /> <br /> */}

                        The central focus of this project is on the development of a robust full-stack web
                        application that empowers users to enhance decision-making in the ESG arena by
                        improving the accuracy and applicability of ESG ratings through the use of machine
                        learning and performance modelling techniques.
                    </p>
                </div>

                <div className="main-content-container">
                    <h2>
                        Objectives
                    </h2>
                    <ul>
                        <li>
                            Build a full-stack and scalable web application
                        </li>
                        <li>
                            Develop an ESG scoring model using Machine Learning and Natural Language Processing techniques
                        </li>
                        <li>
                            Provide user-friendly comparison dashboards across ESG key performance indicators
                        </li>
                        <li>
                            Provide ESG performance feedback and suggestion using Natural Language Processing techniques
                        </li>
                    </ul>
                </div>

                {/* <div style= {{display: "flex", flexDirection: "column", alignItems: "center"}}> 
                    <h1>Project Highlights</h1>
                    <div className="project-highlights-container">
                        <p className="project-highlights">Ratings and qualitative insights generated by NLP techniques</p>
                        <p className="project-highlights">A user-friendly dashboard for ESG performance</p>
                        <p className="project-highlights">performance modelling techniques in managing exposure to ESG-related performances</p>
                        <p className="project-highlights">A full-stack scalable modern web application</p>
                    </div>
                </div> */}
            </div>

        )
    }
}

export default MainPage;