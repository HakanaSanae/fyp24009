import React, {useState, useEffect} from 'react';
import LoginForm from "../component/LoginForm.js";
import { useNavigate } from 'react-router-dom';

function LoginPage({account, setAccount}) { 
    const navigate = useNavigate();
    
    const loginStatus = () => {
        return (
            account ? true : false
        ) 
    }

    useEffect (() => {
        if (loginStatus()) {
            navigate('/dashboard');
        }
    }, [account])

    return (
        <div>
            {
                loginStatus() ? 
                (
                    <>
                        <p>Redirecting to dashboard...</p>
                        <p>If you are not redirected, click <a href="/dashboard">here</a></p>
                    </>
                ) : 
                (
                    <LoginForm setAccount = {setAccount}/>
                )   
            }
        </div>
    )
}

export default LoginPage;