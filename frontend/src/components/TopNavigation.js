import React, {useState} from 'react';
import {Button} from 'react-bootstrap';
import icon  from '../Picture-1.jpg'; 
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
                <a href="/">
                    <Button variant="primary" class="top-nav-button">
                        Home
                    </Button>
                </a>
                <Button variant="primary" class="top-nav-button">Documents</Button>
                <Button variant="primary" class="top-nav-button">Project Progress</Button>
                {isloggedIn ? 
                    <Button variant="primary">Logout</Button> : 
                    <a href="/loginPage">
                        <Button variant="primary">Login</Button>
                    </a>
                }
            </div>
        </div>
    )
}

export default TopNavigation; 