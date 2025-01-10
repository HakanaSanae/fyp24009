import React from 'react';

class Highlights extends React.Component {
    render(){
        return (
            <div className = "main-content">
                <h1>ESGenius</h1>
                <p className = "project-description">
                    this is a testing highlight.
                </p>
                <p className = "project-team">
                    <span className = "project-team-highlight">Supervisor:</span> Dr. Cheng Reynold <br />
                    <span className = "project-team-highlight">Group Members:</span>
                    Ko Man Sing, Ng Tsz Wai Andrew, Chan Cheuk Hei, Chau Chun Yiu
                </p>
            </div>
        )
    }
}

export default Highlights;