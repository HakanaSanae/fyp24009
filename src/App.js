import React from 'react';
import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {RegisterForm} from './RegisterForm';
import icon  from './Picture-1.jpg'; 

class TopNavigation extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.login_logout = this.login_logout.bind(this);
        this.state = {
            account: "",
        }
    }

    login_logout() {
        return (<Button variant="primary"  onClick={this.walletInteraction}>Login</Button>)
    }

    render() {
        return (
            <div className="top-nav">
                <div>
                    <img id="nav-icon" src= {icon}></img>
                    <span id="proj_Name">ESGenius</span>
                </div>
                <div class="topNavButtons">
                    <Button variant="primary" class="top-nav-button">Home</Button>
                    <Button variant="primary" class="top-nav-button">Documents</Button>
                    <Button variant="primary" class="top-nav-button">Project Progress</Button>
                    {this.login_logout()}
                </div>
            </div>
        )
    }
}

class MainContent extends React.Component {
    render(){
        return (
            <div className="main-content">
                
                <h1>ESGenius</h1>
                <p class ="project-description">
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
        )
    }
}

class Highlights extends React.Component {
    render(){
        return (
            <div className = "main-content">
                <h1>ESGenius</h1>
                <p class = "project-description">
                    ESG Data-Driven Decisionsad Support System <br />
                    Full-stack Web Application with Machine Learning
                </p>
                <p class = "project-team">
                    <span class = "project-team-highlight">Supervisor:</span> Dr. Cheng Reynold <br />
                    <span class = "project-team-highlight">Group Members:</span>
                    Ko Man Sing, Ng Tsz Wai Andrew, Chan Cheuk Hei, Chau Chun Yiu
                </p>
            </div>
        )
    }
}


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            connected: false,
            contract: null,
        }
        this.setConnectionState = this.setConnectionState.bind(this);
    }

    setConnectionState(_account, _connected, _contract=null) {
      this.setState({account: _account});
      this.setState({connected: _connected});
      if (_contract) {
        this.setState({contract: _contract});
      }
    }

    render() {
        return (
            <div className="mainClass">
                <TopNavigation connected={this.state.connected} setConnectionState={this.setConnectionState}/>
                <MainContent />
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
            </div>
        )
    }
}

export default App;
