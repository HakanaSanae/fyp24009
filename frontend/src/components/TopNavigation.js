import React, {useState} from 'react';
import {Button} from 'react-bootstrap';
import icon  from '../Picture-1.jpg'; 

function TopNavigation() {

    const [account, setAccount] = useState("");
    const [isloggedIn, setIsLoggedIn] = useState(false);

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
                {isloggedIn ? 
                    <Button variant="primary">Logout</Button> : 
                    <Button variant="primary">Login</Button>
                }
            </div>
        </div>
    )
    
}

export default TopNavigation; 