import React, {useState} from 'react';
import {Button} from 'react-bootstrap';
import icon  from '../Picture-1.jpg'; 
import { useNavigate } from 'react-router-dom';
import apiClient from '../interface/apiClient';

function TopNavigation({account, setAccount}) {
    const navigate = useNavigate();

    const logout = async () => {
        const data = await apiClient.logout(); 
        if (data.success){ 
            localStorage.removeItem('account');
            setAccount(null);
            navigate('/');
        }
    }

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
                {
                    account ? 
                    (
                        <>
                            <a href="/dashboard">
                                <Button variant="primary">
                                    {account}
                                </Button> 
                            </a>
                            <Button variant="primary" onClick = {logout}>
                                Logout
                            </Button> 
                        </>
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