import React, {useState} from 'react';
import {Button} from 'react-bootstrap';
import icon  from '../Picture-1.jpg'; 

function TopNavigation({account}) {

    return (
        <div className="top-nav">
            <div>
                <img id="nav-icon" src= {icon}></img>
                <span id="proj_Name">ESGenius</span>
            </div>
            <div className="topNavButtons">
                <a href="/">
                    <Button variant="primary" className="top-nav-button">
                        Home
                    </Button>
                </a>
                <Button variant="primary" className="top-nav-button">Documents</Button>
                <Button variant="primary" className="top-nav-button">Project Progress</Button>
                {
                    account ? 
                    (
                        <a href="/dashboard">
                            <Button variant="primary">
                                {account}
                            </Button> 
                        </a>
                    ) : (
                        <a href="/login">
                            <Button variant="primary">
                                Login
                            </Button>
                        </a>
                    ) 
                }
            </div>
        </div>
    )
}

export default TopNavigation; 