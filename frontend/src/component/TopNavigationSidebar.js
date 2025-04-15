import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { logout } from '../interface/apiClient';


function TopNavigationSidebar({ account, isBarOpen, setIsBarOpen }) {
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

    const switchBar = () => {
        setIsBarOpen(!isBarOpen);
    }

    return (
        <div className="sidebar-content"{...(isBarOpen ? { open: true } : {})}>
            <a>
                <Button style={{justifySelf: "center"}} onClick ={switchBar} variant="primary" className="top-nav-sidebar-button">
                    &gt; 
                </Button>
            </a>
            <a href="/">
                <Button variant="primary" className="top-nav-sidebar-button">
                    Home
                </Button>
            </a>
            {
                account ?
                    (
                        <a href="/dashboard">
                            <Button variant="primary" className="top-nav-sidebar-button">
                                ESG Dashboard
                            </Button>
                        </a>
                    ) : null
            }

            {
                account ?
                    (

                        <a href="/dashboard/ESG-performance-Analysis">
                            <Button variant="primary" className="top-nav-sidebar-button">
                                ESG Performance Analysis
                            </Button>
                        </a>

                    ) : null
            }

            {
                account ?
                    (

                        <a href="/account">
                            <Button variant="primary" className="top-nav-sidebar-button">
                                {account}
                            </Button>
                        </a>

                    ) : null
            }

            {
                account ? (
                    <a>
                        <Button variant="primary" className="top-nav-sidebar-button" onClick={logoutAction}>
                            Logout
                        </Button>
                    </a>
                    
                ) : (
                    <a href="/login">
                        <Button className="top-nav-sidebar-button" variant="primary">
                            Login
                        </Button>
                    </a>
                )
            }
        </div>
    )
}

export default TopNavigationSidebar; 