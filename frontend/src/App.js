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
    componentDidMount(){                   
        var divElement = document.getElementById('viz1736230714700');                    
        var vizElement = divElement.getElementsByTagName('object')[0];                    
        vizElement.style.width='1016px';
        vizElement.style.height='991px';                    
        var scriptElement = document.createElement('script');                    
        scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    
        vizElement.parentNode.insertBefore(scriptElement, vizElement);         
    }

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
                <div class='tableauPlaceholder' id='viz1736230714700' style={{position: 'relative'}}>
                    <noscript>
                        <a href='#'>
                            <img alt='ESGenius ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;ES&#47;ESG_17362298565400&#47;Story1&#47;1_rss.png' style='border: none' />
                        </a>
                    </noscript>
                    <object class='tableauViz'  style={{display: 'none'}}>
                        <param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> 
                        <param name='embed_code_version' value='3' /> 
                        <param name='site_root' value='' />
                        <param name='name' value='ESG_17362298565400&#47;Story1' />
                        <param name='tabs' value='no' />
                        <param name='toolbar' value='yes' />
                        <param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;ES&#47;ESG_17362298565400&#47;Story1&#47;1.png' /> 
                        <param name='animate_transition' value='yes' />
                        <param name='display_static_image' value='yes' />
                        <param name='display_spinner' value='yes' />
                        <param name='display_overlay' value='yes' />
                        <param name='display_count' value='yes' />
                        <param name='language' value='en-GB' />
                    </object>
                </div>                
                
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
                    this is a testing highlight.
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
                <Highlights />
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
            </div>
        )
    }
}

export default App;
