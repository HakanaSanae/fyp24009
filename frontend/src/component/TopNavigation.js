import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import icon from '../Picture-1.jpg';
import { useNavigate } from 'react-router-dom';
import { logout } from '../interface/apiClient';

function TopNavigation({ account }) {
    const navigate = useNavigate();

    const logoutAction = async () => {
        const data = await logout(navigate);
        if (data.success) {
            localStorage.removeItem('account');
            navigate('/login');
        } else {
            console.log(data.message);
            localStorage.removeItem('account');
            navigate('/login');
        }
    }

    return (
        <div className="top-nav">
            <div>
                <img id="nav-icon" src={icon}></img>
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

                            <a href="/dashboard">
                                <Button variant="primary" className="top-nav-button">
                                    ESG Dashboard
                                </Button>
                            </a>

                        ) : null
                }

                {

                    account ?
                        (

                            <a href="/dashboard/ESG-Risk-Analysis">
                                <Button variant="primary" className="top-nav-button">
                                    ESG Risk Analysis
                                </Button>
                            </a>

                        ) : null
                }

                {
                    account ?
                        (

                            <a href="/account">
                                <Button variant="primary" className="top-nav-button">
                                    {account}
                                </Button>
                            </a>

                        ) : null
                }

                {
                    account ? (
                        <Button variant="primary" className="top-nav-button" onClick={logoutAction}>
                            Logout
                        </Button>
                    ) : (
                        <a href="/login">
                            <Button className="top-nav-button" variant="primary">
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