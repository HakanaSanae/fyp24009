import React from "react";
import Highlights from "../components/Highlights";
import icon from "../Picture-1.jpg";

class MainPage extends React.Component {
    render(){
        return (
            <div className="mainClass">
                <div className="main-content">
                    <h1>ESGenius</h1>
                    <p className ="project-description">
                        ESG Data-Driven Decision Support System <br />
                        Full-stack Web Application with Machine Learning
                    </p>
                    <img src= {icon}></img>
                    <p>
                    <span style={{fontWeight: 'bold'}}>Supervisor:</span> Dr. Cheng Reynold <br />
                    <span style={{fontWeight: 'bold'}}>Group Members:</span>
                    Ko Man Sing, Ng Tsz Wai Andrew, Chan Cheuk Hei, Chau Chun Yiu
                    </p>          
                </div>
                <Highlights />
            </div>
        )
    }
}

export default MainPage;